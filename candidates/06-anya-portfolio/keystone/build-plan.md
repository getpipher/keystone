# Plan 5b · Brief 06 Keystone Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, reproduce the engine score, and commit the brief-06 (Anya one-pager) Keystone candidate — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Keystone skill end-to-end (Steps 0–7: 3 deterministic iterations to 47/47 rows · 0 fails, then a vision pass that caught and fixed a mobile-nav clip — 1 of 2 vision iterations) and packaged exactly two static files into `candidates/06-anya-portfolio/keystone/`. This plan adds no design work: Task 1 re-verifies packaging integrity, Task 2 reproduces the 47/47 score on the packaged files with a clean log, Task 3 proves hash continuity and race status, and Tasks 4–5 land the candidate and this plan doc as two commits per the lane convention (`4866930`+tide-doc, `af27636`+`31f8a8d`, `4cd0333`). The *official* Hallmark-vs-Keystone comparison happens later via `test/compare/run-comparison.mjs` — out of scope here.

**Tech Stack:** Vanilla HTML/CSS (zero JS — this build is statically interactive-free by design). Verification: bash one-liners + `engine/check-gates.mjs` + `extensions/render.ts` `render()` via `node --import tsx --input-type=module`.

## Global Constraints

- **Race check:** a duplicate dispatch raced the brief-02 keystone scratch earlier in this run; brief-07's lane is active now. Task 3 re-proves packaged == scratch hashes (`b298ef44…` page, `e9c8532a…` style) and confirms no anya commit exists before committing.
- **G8 caveat:** the scratch log (`/tmp/keystone-5b/06/keystone-work/.keystone/log.json`) records this build — engine runs against THAT log self-fail G8 by construction. Task 2's reproduction points `--log` at a fresh empty log to reproduce the scored state. Do not "fix" G8 by deleting the log.
- **Read-only zones:** `candidates/06-anya-portfolio/hallmark/**` (committed sibling lane `37a6f52`), `candidates/07-foundry-compliance/**` (brief-07 lane), `test/compare/build-gallery.mjs`, `docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md`, `docs/superpowers/plans/2026-08-29-5b-brief07-hallmark-finalize.md`. This plan writes only `/tmp/keystone-5b/06/verify/**` and commits only the two candidate files + this plan doc.
- **Command lessons (verified this session):** `render()` export + `--input-type=module`; `grep -E` for alternation on macOS; the engine needs `--log` to point at an existing file (`printf '[]\n'` first); buttons sized by `line-height` not block padding (G49); wrap-pair required per matched display selector, not just globally (G51).
- No AI attribution. 2-space indent, EOF newline.
- Working directory for all commands: `/Users/rector/local-dev/getpipher/keystone`.

---

### Task 1: Packaging integrity

**Files:**
- Verify only: `candidates/06-anya-portfolio/keystone/index.html`
- Verify only: `candidates/06-anya-portfolio/keystone/style.css`

**Interfaces:**
- Consumes: nothing.
- Produces: greppable proof of the two-file contract — self-contained `:root[data-theme="cobalt"]`, stamp `48/48` on line 1, **zero `<script>` blocks** (this build is JS-free by design, unlike the Cobalt canonical which uses one), 4 `<link>` lines, EOF newlines, no tabs, zero literal colours outside `:root`.

- [ ] **Step 1: File set + wiring + hygiene**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/06-anya-portfolio/keystone && ls && echo "stamp-line1: $(head -1 style.css | grep -c "Keystone · genre: modern-minimal · macrostructure: Bento Grid")" && echo "gates-filled: $(head -1 style.css | grep -c "gates: 48/48 engine-verified")" && echo "links: $(grep -c "<link" index.html) | style-blocks: $(grep -c "<style" index.html) | script-blocks: $(grep -c "<script" index.html)" && echo "root-in-css: $(grep -c ":root" style.css)" && echo "eof: $(tail -c 1 index.html | xxd -p) $(tail -c 1 style.css | xxd -p)" && echo "tabs: $(awk '/\t/{t++} END{print t+0}' index.html) $(awk '/\t/{t++} END{print t+0}' style.css)"
```

Expected: `index.html` + `style.css` only · `stamp-line1: 1` · `gates-filled: 1` · `links: 4` (2 preconnect + fonts + style.css) · `style-blocks: 0` · `script-blocks: 0` · `root-in-css: 1` · `eof: 0a 0a` · `tabs: 0 0`.

- [ ] **Step 2: Token discipline + design-doc spot-checks**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/06-anya-portfolio/keystone && node -e '
const css = require("fs").readFileSync("style.css", "utf8");
const rs = css.indexOf(":root"), re = css.indexOf("}", rs);
const bad = [...css.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\(\s*[0-9]|hsla?\(\s*[0-9]|oklch\(\s*[0-9.]/g)].filter(m => m.index < rs || m.index > re);
console.log("literal-colours-outside-root:", bad.length, bad.map(m => JSON.stringify(m[0]) + " @" + m.index).join(", "));
' && grep -qE "Systems that stay simple at scale" index.html && echo "h1 ok" && grep -qE "clip|overflow-x: clip" style.css && echo "clip ok" && grep -q "prefers-reduced-motion: reduce" style.css && echo "reduced-motion ok" && grep -qE "Ledgerline|Carepath|Stockwell" index.html && echo "work tiles ok"
```

Expected: `literal-colours-outside-root: 0` (the `color-mix(in oklch, var(…))` wrappers are token interpolations, not literal values) · `h1 ok` · `clip ok` · `reduced-motion ok` · `work tiles ok`.

### Task 2: Engine reproduction — clean-log full render on the packaged files

**Files:**
- Read: `candidates/06-anya-portfolio/keystone/{index.html, style.css}`
- Create: `/tmp/keystone-5b/06/verify/` + `/tmp/keystone-5b/06/verify/empty-log.json`

**Interfaces:**
- Consumes: `engine/check-gates.mjs` (13 deterministic detectors + render).
- Produces: fresh evidence the packaged bytes score 47/47 rows · 0 fails (= 48/48 gate numbers; G40/41 share one row).

- [ ] **Step 1: Fresh empty log + full render**

```bash
mkdir -p /tmp/keystone-5b/06/verify
printf '[]\n' > /tmp/keystone-5b/06/verify/empty-log.json
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html candidates/06-anya-portfolio/keystone/index.html \
  --css candidates/06-anya-portfolio/keystone/style.css \
  --log /tmp/keystone-5b/06/verify/empty-log.json \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/06/verify
```

Expected console: `PASS 47/47 · FAIL 0/47 — /tmp/keystone-5b/06/verify/keystone-report.html (render: on)`.

- [ ] **Step 2: Machine-read the result**

```bash
node -e '
const r = JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/06/verify/keystone-report.json", "utf8"));
const fails = r.results.filter(x => !x.pass);
console.log("rows:", r.pass + "/" + r.total, "| failed gates:", fails.map(f => f.gate).join(",") || "none");
'
```

Expected: `rows: 47/47 | failed gates: none`. Any fail = the packaged artifact drifted from the scored state — escalate with verbatim gate evidence (this plan has no fix tasks; the candidate is committed-by-convention only after this reproduction).

### Task 3: Tree hygiene + race check

**Files:**
- Verify only: `git status`, packaged/scratch hashes.

**Interfaces:**
- Consumes: nothing.
- Produces: proof the packaged bytes are the scratch bytes and no anya commit exists yet.

- [ ] **Step 1: Hash continuity + commit-absence**

```bash
cd /Users/rector/local-dev/getpipher/keystone && shasum candidates/06-anya-portfolio/keystone/index.html candidates/06-anya-portfolio/keystone/style.css && shasum /tmp/keystone-5b/06/keystone-work/index.html /tmp/keystone-5b/06/keystone-work/style.css && git log --oneline --all -i --grep="anya" | head -3
```

Expected: packaged == scratch (`b298ef44…` page, `e9c8532a…` style); the git log prints no commit lines. If an anya commit DOES exist, skip Tasks 4–5 and report it.

- [ ] **Step 2: Tree state**

```bash
git status --short
```

Expected untracked: `?? candidates/06-anya-portfolio/keystone/`, `?? docs/superpowers/plans/2026-08-29-5b-brief06-keystone-finalize.md` (this plan), `?? docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md` (sibling), `?? docs/superpowers/plans/2026-08-29-5b-brief07-hallmark-finalize.md` (brief-07 lane), `?? test/compare/build-gallery.mjs`. Tracked diff: empty.

### Task 4: Commit the candidate

**Files:**
- Commit: `candidates/06-anya-portfolio/keystone/index.html`
- Commit: `candidates/06-anya-portfolio/keystone/style.css`

**Interfaces:**
- Consumes: Tasks 1–3 all green.
- Produces: the candidate as a committed comparison input (lane convention: `4cd0333`, `af27636`, `e591c2a`).

- [ ] **Step 1: Commit (no AI attribution)**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add candidates/06-anya-portfolio/keystone/index.html candidates/06-anya-portfolio/keystone/style.css && git commit -m "candidates(06): keystone side — Bento/Cobalt blind build, 48/48 engine-verified"
```

Expected: single commit, exactly 2 files. Verify `git show --stat HEAD | tail -3`.

### Task 5: Commit the plan doc

**Files:**
- Commit: `docs/superpowers/plans/2026-08-29-5b-brief06-keystone-finalize.md`

**Interfaces:**
- Consumes: Task 4.
- Produces: the plan doc on record (lane convention: `31f8a8d`).

- [ ] **Step 1: Commit the doc**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add docs/superpowers/plans/2026-08-29-5b-brief06-keystone-finalize.md && git commit -m "docs(5b): brief06 keystone finalize plan — executed, candidate committed"
```

Expected: single commit, 1 file. `git status --short` afterwards shows only sibling lanes' untracked files.

---

## Self-review

- **Coverage:** design-doc packaging + stamp/log → Task 1; Step 7.1 score reproduction on the packaged bytes (clean-log, G8 caveat honoured) → Task 2; race provenance → Global Constraints + Task 3; lane-convention commits → Tasks 4–5.
- **Placeholders:** none — every step is an exact command with expected output; all command lessons from this session's executions are baked in.
- **Consistency:** paths (`/tmp/keystone-5b/06/verify`, `candidates/06-anya-portfolio/keystone`, commit `4cd0333`-style conventions) uniform; no fix tasks — failures escalate with verbatim evidence, because the scored bytes are the shipped bytes and quiet patches would break provenance.

**Execution handoff:** run inline; total runtime ≈ one render (~30–60 s). Tasks 4–5 mutate git history per the declared lane convention — executed only after Tasks 1–3 are green.
