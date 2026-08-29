# Plan 5b · Brief 02 Keystone Candidate — Verification & Reproduction

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove the already-committed Keystone candidate for brief 02 (`candidates/02-streampipe-cli/keystone/`, commit `4cd0333`) is hash-continuous with the engine-passed build and reproduces 47/47 rows · 0 fails on a clean-log full render — with zero mutations to the repo.

**Architecture:** The build shipped during the brainstorm phase and was committed mid-race by a duplicate dispatch (`4cd0333`, exactly 2 files). Every task here is read-only verification: hash-chain provenance (scratch → packaged → committed), a clean-log engine reproduction of the scored state, packaging-contract checks, and tree hygiene. No file is written; nothing is committed by this plan.

**Tech Stack:** Node ≥20 (`engine/check-gates.mjs`), headless Chromium via the repo's render extension, shasum/git one-liners.

## Global Constraints

- **Read-only plan.** This plan writes nothing to the repo. All render output goes to `/tmp/keystone-5b/02/verify/`.
- **Provenance (race disclosure):** the scratch was raced by a duplicate dispatch of the same brief; the shipped bytes were adopted because they passed the engine, and the hash chain below proves continuity. Expected fingerprints: committed == working == scratch (`eccce629…` style.css, `6bb9eabc…` index.html).
- **G8 caveat:** the scratch log (`/tmp/keystone-5b/02/keystone-work/.keystone/log.json`) now records this build, so engine runs against THAT log self-fail G8 by construction. Reproduction runs (Task 2) must point `--log` at a fresh empty log to reproduce the pre-seed scored state.
- Blind-run integrity: keystone engine scores are evidence for the Plan 5b comparison, never acceptance gates on design.
- Working directory for all commands: `/Users/rector/local-dev/getpipher/keystone`.

---

### Task 1: Provenance hash chain

**Files:**
- Verify only: `candidates/02-streampipe-cli/keystone/{index.html, style.css}` (committed + working)
- Verify only: `/tmp/keystone-5b/02/keystone-work/{index.html, style.css}` (engine-passed scratch bytes)

**Interfaces:**
- Consumes: nothing.
- Produces: proof that committed == working == engine-passed bytes, so the Task 2 reproduction scores the exact shipped artifact.

- [x] **Step 1: Hash the three states**

```bash
cd /Users/rector/local-dev/getpipher/keystone && for f in index.html style.css; do
  echo "$f committed: $(git show 4cd0333:candidates/02-streampipe-cli/keystone/$f | shasum | cut -d" " -f1)"
  echo "$f working:  $(shasum candidates/02-streampipe-cli/keystone/$f | cut -d" " -f1)"
  echo "$f scratch:  $(shasum /tmp/keystone-5b/02/keystone-work/$f | cut -d" " -f1)"
done
```

Expected: for each file, all three hashes identical — `index.html → 6bb9eabc1148e76a4c9f45059ad87bd6ac7b128d`, `style.css → eccce629f81553611a847346bba23b5c8e01ce35`. Any divergence = a post-commit mutation; stop and investigate before Task 2.

### Task 2: Engine reproduction — clean-log full render

**Files:**
- Read: `candidates/02-streampipe-cli/keystone/{index.html, style.css}`
- Create: `/tmp/keystone-5b/02/verify/` (scratch output)
- Create: `/tmp/keystone-5b/02/verify/empty-log.json` (fresh log — reproduces the pre-seed state)

**Interfaces:**
- Consumes: `engine/check-gates.mjs` (13 deterministic detectors + render at 1280/375/320/414/768).
- Produces: `/tmp/keystone-5b/02/verify/keystone-report.json` — fresh evidence that the committed bytes score 47/47 rows · 0 fails (= 48/48 gate numbers; G40/41 share one row).

- [x] **Step 1: Fresh empty log + full render**

```bash
mkdir -p /tmp/keystone-5b/02/verify
printf '[]\n' > /tmp/keystone-5b/02/verify/empty-log.json
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html candidates/02-streampipe-cli/keystone/index.html \
  --css candidates/02-streampipe-cli/keystone/style.css \
  --log /tmp/keystone-5b/02/verify/empty-log.json \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/02/verify
```

Expected console: `PASS 47/47 · FAIL 0/47 — /tmp/keystone-5b/02/verify/keystone-report.html (render: on)`.

- [x] **Step 2: Machine-read the result**

```bash
node -e '
const r = JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/02/verify/keystone-report.json", "utf8"));
const fails = r.results.filter(x => !x.pass);
console.log("rows:", r.pass + "/" + r.total, "| failed gates:", fails.map(f => f.gate).join(",") || "none");
'
```

Expected: `rows: 47/47 | failed gates: none`. Any fail = the committed artifact regressed from the scored state — read the gate evidence, compare against the scratch design doc's emit history, and escalate rather than patch silently (this plan has no fix tasks by design).

- [x] **Step 3: G8 caveat — documented, not a defect**

A run against the SEEDED scratch log (`/tmp/keystone-5b/02/keystone-work/.keystone/log.json`) will report a single G8 fail (`Index-First matches a prior run`). That is the skill's diversification log doing its job post-hoc: the log records THIS build, so reuse detection self-matches. The official score evidence is the pre-seed render (this task's clean-log reproduction, and `/tmp/keystone-5b/02/keystone-work/report/keystone-report.json`). Do not "fix" G8 by deleting the log.

### Task 3: Packaging contract

**Files:**
- Verify only: `candidates/02-streampipe-cli/keystone/{index.html, style.css}`

**Interfaces:**
- Consumes: nothing.
- Produces: confirmation the committed candidate matches the two-file self-contained contract.

- [x] **Step 1: Contract checks**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/02-streampipe-cli/keystone && ls && head -1 style.css | grep -c "gates: 48/48 engine-verified" && echo "style/script tags: $(grep -c "<style\|<script" index.html)" && echo "eof: $(tail -c 1 index.html | xxd -p) $(tail -c 1 style.css | xxd -p)" && echo "tokens-in-root-only: $(node -e '
const css = require("fs").readFileSync("style.css", "utf8");
const rs = css.indexOf(":root"), re = css.indexOf("}", rs);
const bad = [...css.matchAll(/oklch\(|#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/g)].filter(m => m.index < rs || m.index > re);
console.log(bad.length === 0 ? "PASS" : "FAIL " + bad.length);')"
```

Expected: directory lists exactly `index.html` + `style.css` · stamp check `1` · `style/script tags: 0` · `eof: 0a 0a` · `tokens-in-root-only: PASS`.

### Task 4: Tree hygiene

**Files:**
- Verify only: `git status` / `git diff`

**Interfaces:**
- Consumes: nothing.
- Produces: confirmation this plan mutated nothing.

- [x] **Step 1: Clean tree**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git diff --stat && git status --short
```

Expected: `git diff --stat` empty; `git status --short` shows only `?? test/compare/build-gallery.mjs` (a parallel lane's untracked file — leave it alone). Any `candidates/02-streampipe-cli/keystone` entry or `docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md` in the list is THIS plan's own artifact — expected as untracked until the orchestrator's bulk pass commits it.

### Task 5: Report the evidence

**Files:**
- No file writes. The evidence line goes into the phase report.

**Interfaces:**
- Consumes: Tasks 1–4.
- Produces: the one-line verification verdict for the run ledger.

- [x] **Step 1: Emit the verdict line**

Format: `brief-02 keystone candidate @ 4cd0333 — provenance chain intact (3/3 hash matches) · clean-log reproduction 47/47 rows, 0 failed gates · packaging contract PASS · tree clean.`

If any task failed, the verdict line names the failing task and the gate/hash evidence verbatim instead.

---

## Self-review

- **Coverage:** the design doc's packaging section → Task 1/3; Step 7.1 score reproduction → Task 2; G8 caveat → Task 2 Step 3; race provenance → Global Constraints + Task 1; honesty contract (no silent claims) → Task 2 Step 2 + Task 5.
- **Placeholders:** none — every step is an exact command with expected output.
- **Consistency:** all paths (`/tmp/keystone-5b/02/verify`, `candidates/02-streampipe-cli/keystone`, commit `4cd0333`) used identically across tasks; no fix tasks exist because the plan is verification-only by design — failures escalate, not patch.

**Execution handoff:** run inline (every task is a one-command verification); total runtime ≈ one render (~30–60 s). Nothing here is orchestrator-gated because nothing mutates.
