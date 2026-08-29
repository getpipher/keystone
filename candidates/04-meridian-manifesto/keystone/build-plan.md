# Plan 5b · Brief 04 Meridian Keystone Candidate — Verify & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify the packaged brief-04 Keystone candidate (`candidates/04-meridian-manifesto/keystone/`) against the engine-passed, vision-passed build — hash continuity, clean-log engine reproduction, packaging contract — and commit it with a recorded verification report.

**Architecture:** The brainstorm phase built the page in scratch, drove the real engine to 47/47 rows · 0 failed gate numbers (= 48/48; G40/41 share one row) in 2 of 3 deterministic iterations, passed the vision pass in 1 of 2 iterations (fixing a mid-word poster break), and copied the verified bytes into the candidates tree. This plan is the finalize gate: Task 1 proves packaged == scratch byte-exactly and runs the mechanical checks (including the two engine-parser traps this build actually hit: the G51 media-query rule and G23 accent-fill area); Task 2 reproduces the scored state on a fresh empty log; Task 3 re-confirms the documented post-seed self-match behavior; Task 4 writes the report and commits with exact paths.

**Tech Stack:** Node ≥20 (`engine/check-gates.mjs`), headless Chromium via the repo render path (playwright-core 1.62.0), shasum/git/python3 one-liners.

## Global Constraints

- **Blind protocol:** the candidate is the skill's verbatim output. **No design edits.** Any verification failure is recorded in the report and escalated — never patched.
- **Repo writes are limited to:** the commit of `candidates/04-meridian-manifesto/keystone/{index.html,style.css}` + this plan document, and the local `.superpowers/sdd/` report. Scratch (`/tmp/keystone-5b/04/keystone-work/`) is never committed.
- **G8/G32 caveat:** the scratch log now records this build, so any engine run against THAT log self-fails G8 (macro) + G32 (nav/footer) by construction. Reproduction runs (Task 2) must point `--log` at a fresh empty log. Never "fix" this by deleting the log.
- **Commit message:** no AI attribution, no Co-Authored-By; one focused commit; **exact-path `git add`** (the brief-01 lesson — never a directory sweep).
- **Smoke/render output is throwaway:** everything under `/tmp/keystone-5b/04/verify/` is evidence only, never committed.
- **Known traps (from this build's own emit history):** source-only engine runs need the out dir pre-created (`mkdir -p`) or they die with `ENOENT`; the engine parser scores `@media` inner rules standalone — a display rule inside `@media` needs its own `overflow-wrap: anywhere; min-width: 0`.
- **Working directory for all commands:** `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.

## Background (read this if you have zero context)

- Repo: `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`. Plan 5b executes the comparison harness in `test/compare/`: 8 verbatim briefs × both skills, scored by this repo's engine, losses published.
- The brainstorm phase ran the **Keystone** skill on `test/compare/briefs/04-meridian-manifesto.md` (verbatim: *"Make me a manifesto for my new studio called Meridian. We work on environmental products. No flashy stuff."*). Picks: macrostructure **Manifesto (07)** · nav **N9** (edge-aligned minimal) · footer **Ft5** (statement) · theme **Manifesto** (light · grotesk-condensed · neutral warm-red accent; Anton display above the fold only, Geist body, Geist Mono ordinals) · enrichment none · motion none.
- Engine history: iteration 1 = 43/53 rows (G23 accent fill 22.7%, G25 28ch cap, G40 ×7, G51 media-rule); iteration 2 = **47/47 rows · 0 fails**; post-seed source-only = 45/47 with exactly G8 + G32 self-matches. Vision: iteration 1 fixed a mid-word poster wrap ("AFTE / R."); final read PASS on both viewports, S1 NO (~0.15).

---

### Task 1: Pre-commit integrity — hash continuity + mechanical checks

**Files:**
- Verify only: `candidates/04-meridian-manifesto/keystone/{index.html,style.css}`
- Verify only: `/tmp/keystone-5b/04/keystone-work/{index.html,style.css}`
- Create: nothing (failures are noted for the Task 4 report)

**Interfaces:**
- Consumes: the packaged files and their scratch sources.
- Produces: recorded fingerprints + pass/fail per check for the Task 4 report.

- [ ] **Step 1: Hash continuity — packaged == scratch, both files**

```bash
cd /Users/rector/local-dev/getpipher/keystone && for f in index.html style.css; do
  echo "$f packaged: $(shasum candidates/04-meridian-manifesto/keystone/$f | cut -d' ' -f1)"
  echo "$f scratch:  $(shasum /tmp/keystone-5b/04/keystone-work/$f | cut -d' ' -f1)"
done
```

Expected: for each file, packaged and scratch hashes **identical** (the brainstorm phase already diff-verified byte-identity; this re-proves it from the committed-to-be tree). Record the two hashes in the report — they become the candidate's fingerprints. Any divergence = stop and escalate.

- [ ] **Step 2: Directory contract**

```bash
ls candidates/04-meridian-manifesto/keystone/
```

Expected: exactly `index.html` and `style.css`.

- [ ] **Step 3: Stamp line 1 — filled, engine-verified**

```bash
head -1 candidates/04-meridian-manifesto/keystone/style.css
```

Expected, exactly:

```
/* Keystone · macrostructure: Manifesto · tone: austere-declarative · anchor hue: 25 warm-neutral red · gates: 48/48 engine-verified */
```

- [ ] **Step 4: EOF newlines**

```bash
tail -c 1 candidates/04-meridian-manifesto/keystone/index.html | od -An -c
tail -c 1 candidates/04-meridian-manifesto/keystone/style.css | od -An -c
```

Expected: both `\n`.

- [ ] **Step 5: Token discipline — 9 OKLCH confined to `:root`; fonts via var()**

```bash
grep -c 'oklch(' candidates/04-meridian-manifesto/keystone/style.css
awk '/Global clip/{found=1} found && (/oklch\(|#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\()/ {print FNR": "$0}' candidates/04-meridian-manifesto/keystone/style.css
awk '/Global clip/{found=1} found && /font-family:/ && !/var\(--font-/ {print FNR": "$0}' candidates/04-meridian-manifesto/keystone/style.css
```

Expected: `9` (paper, paper-2, ink, muted, rule, accent, accent-ink, focus, link — all in `:root`); then **no output** from either scan.

- [ ] **Step 6: The two traps this build hit — G51 media rule + G23 accent retreat**

```bash
grep -n -A6 '@media (max-width: 40rem)' candidates/04-meridian-manifesto/keystone/style.css | grep -c 'overflow-wrap\|min-width'
grep -c 'block-accent' candidates/04-meridian-manifesto/keystone/style.css candidates/04-meridian-manifesto/keystone/index.html
grep -n 'color: var(--color-accent)' candidates/04-meridian-manifesto/keystone/style.css
```

Expected: the media-query `.statement` rule carries **both** wrap properties (`2` matching lines inside the media block); `block-accent` occurrences `0` and `0` (the G23 accent fill is gone); the accent appears as text color only inside the two `:hover` rules (`.nav-cta:hover`, `.foot-meta a:hover` — hover-state pairs are not in the engine's default-state computed dump, and the smoke passed G40 after ordinals moved to `--color-link`), so expected: **2 hits, both `:hover` lines**.

- [ ] **Step 7: Link states + honest copy + head hygiene**

```bash
grep -c ':hover\|:focus-visible\|:active\|:disabled' candidates/04-meridian-manifesto/keystone/style.css
grep -nEi '[0-9]+ ?%|[0-9]+×|faster|trusted by|uptime|customers|testimonials' candidates/04-meridian-manifesto/keystone/index.html
grep -n 'name="viewport"' candidates/04-meridian-manifesto/keystone/index.html
grep -n '<html lang="en">' candidates/04-meridian-manifesto/keystone/index.html
```

Expected: `8` (4 states × 2 selector groups: `.nav-cta`, `.foot-meta a`); honest-copy scan **no output**; one hit each for viewport + lang.

**Deliverable of Task 1:** fingerprints + per-check results for the Task 4 report.

---

### Task 2: Clean-log engine reproduction (the scored state)

**Files:**
- Read: `candidates/04-meridian-manifesto/keystone/{index.html,style.css}`
- Create (throwaway): `/tmp/keystone-5b/04/verify/**`

**Interfaces:**
- Consumes: `engine/check-gates.mjs --render` at the five protocol viewports.
- Produces: fresh evidence that the packaged bytes score 47/47 rows · 0 fails.

- [ ] **Step 1: Fresh log + full render from the packaged files**

```bash
mkdir -p /tmp/keystone-5b/04/verify
printf '[]\n' > /tmp/keystone-5b/04/verify/empty-log.json
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html candidates/04-meridian-manifesto/keystone/index.html \
  --css candidates/04-meridian-manifesto/keystone/style.css \
  --log /tmp/keystone-5b/04/verify/empty-log.json \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/04/verify
```

Expected: `PASS 47/47 · FAIL 0/47 … (render: on)`.

- [ ] **Step 2: Machine-read the result**

```bash
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/04/verify/keystone-report.json","utf8")); const f=r.results.filter(x=>!x.pass); console.log("rows:",r.pass+"/"+r.total,"| failed gates:",f.map(x=>x.gate).join(",")||"none")'
```

Expected: `rows: 47/47 | failed gates: none`. Any fail = escalation (record verbatim; no patch tasks exist in this plan).

**Deliverable of Task 2:** the reproduction evidence line for the Task 4 report.

---

### Task 3: Post-seed behavior — documented self-matches (verification, not a run requirement)

**Files:**
- Read only: `/tmp/keystone-5b/04/keystone-work/report-source/keystone-report.json` (already produced by the brainstorm phase's Step 7.4 check — do NOT re-run unless missing)

**Interfaces:**
- Consumes: the post-seed source-only report from the build.
- Produces: confirmation the only post-seed fails are the two documented by-construction self-matches.

- [ ] **Step 1: Confirm the recorded post-seed state**

```bash
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/04/keystone-work/report-source/keystone-report.json","utf8")); const f=r.results.filter(x=>!x.pass); console.log(f.map(x=>x.gate+": "+x.evidence).join(" | ")||"none")'
```

Expected: exactly `8: current Manifesto matches a prior run | 32: nav undefined or footer undefined matches last run` (the build's own log entry causes both — by construction, not defect). If the file is missing, re-run the source-only command from the brainstorm report against the scratch log and confirm the same two fails.

**Deliverable of Task 3:** the post-seed line for the Task 4 report.

---

### Task 4: Verification report + commit

**Files:**
- Create: `.superpowers/sdd/brief04-keystone-verification.md` (local SDD artifact — written, **not** committed)
- Commit: `candidates/04-meridian-manifesto/keystone/{index.html,style.css}` and this plan document

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: the committed candidate pair on `feat/comparison-5b`.

- [ ] **Step 1: Write the verification report**

Create `.superpowers/sdd/brief04-keystone-verification.md`:

```markdown
# Brief 04 · Keystone candidate — verification report

Blind run, no design changes. Checks per plan
`docs/superpowers/plans/2026-08-29-5b-brief04-keystone-finalize.md`.

| Check | Result |
|---|---|
| Hash continuity (packaged == scratch, both files) | pass — index <hash-a>, style <hash-b> |
| Directory contract (2 files) | pass |
| Stamp line 1 (48/48 engine-verified) | pass |
| EOF newlines (both files) | pass |
| Token discipline (9 oklch in :root; none after Global clip; fonts via var()) | pass |
| G51 media rule carries wrap props; G23 accent retreat (0 block-accent) | pass |
| Link states (4 states × 2 groups = 8 lines) | pass |
| Honest copy (no fabricated proof-metric patterns) | pass |
| Head hygiene (viewport meta, lang=en) | pass |
| Clean-log reproduction (47/47 rows, 0 fails) | pass |
| Post-seed behavior (exactly G8 + G32 self-matches) | pass |

Attestation: no design edits were made to candidates/04-meridian-manifesto/keystone/
during verification. Any failure above is recorded verbatim, not patched.
```

Fill `<hash-a>`/`<hash-b>` from Task 1 Step 1. If any check failed: replace that row's `pass` with `FAIL: <verbatim finding>` and stop — escalate to the orchestrator instead of committing.

- [ ] **Step 2: Commit (exact paths)**

```bash
git add candidates/04-meridian-manifesto/keystone/index.html \
        candidates/04-meridian-manifesto/keystone/style.css \
        docs/superpowers/plans/2026-08-29-5b-brief04-keystone-finalize.md
git commit -m "candidates(04): keystone side — Manifesto/Manifesto blind build, 48/48 engine-verified"
```

Expected: one commit, exactly the two candidate files + the plan doc.

- [ ] **Step 3: Verify the commit contents**

```bash
git show --stat --oneline HEAD
git status --short
git log --oneline -1
```

Expected: `git show` lists exactly the three files; `git status` shows only `?? test/compare/build-gallery.mjs` and `?? docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md` (both owned elsewhere — the verify plan stays untracked by its own terms); `git log` head is this commit.

**Deliverable of Task 4:** the committed candidate pair + the local report.

---

## Final verification

1. `git log --oneline -1` shows `candidates(04): keystone side — Manifesto/Manifesto blind build, 48/48 engine-verified`.
2. `git ls-files candidates/04-meridian-manifesto/keystone/` lists exactly `index.html` and `style.css`.
3. The verification report exists with all checks recorded and the two fingerprints.
4. `git status --short` matches the pre-plan state plus this commit.

## Out of scope (owned elsewhere — do not do in this plan)

- **Hallmark-side build for brief 04** — separate skill dispatch at `candidates/04-meridian-manifesto/hallmark/`.
- **Harness scoring, gallery, vision rows, verdict commits** — `test/compare/README.md` steps 2–3, after briefs complete.
- **`test/compare/build-gallery.mjs`** — orchestrator-owned untracked tooling.
- **The brief-02 verify plan doc** (`2026-08-29-5b-brief02-keystone-verify.md`) — that lane's local artifact; leave untracked.
