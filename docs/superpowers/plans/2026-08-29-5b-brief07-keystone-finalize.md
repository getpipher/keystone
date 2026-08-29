# Plan 5b · Brief 07 Keystone Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, reproduce the engine score, and commit the brief-07 (Foundry compliance automation) Keystone candidate — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Keystone skill end-to-end (3 deterministic iterations to 47/47 rows · 0 fails, then a vision pass that fixed the glued stat note — 2 of 2 vision iterations) and packaged exactly two static files into `candidates/07-foundry-compliance/keystone/`. This plan adds no design work: Task 1 verifies packaging integrity, Task 2 reproduces the 47/47 score on the packaged files with a clean log, Task 3 confirms the documented post-seed self-match and race status, and Tasks 4–5 land the candidate and this plan doc as two commits per the lane convention (`81753b4`+`08cc1e0`, `af27636`+`31f8a8d`, `4cd0333`). The *official* Hallmark-vs-Keystone comparison happens later via `test/compare/run-comparison.mjs` — out of scope here.

**Tech Stack:** Vanilla HTML/CSS (zero JS). Verification: bash one-liners + `engine/check-gates.mjs`.

## Global Constraints

- **Race check:** brief-07's keystone lane packaged its own candidate this session. Task 3 re-proves packaged == scratch hashes (`905d03d2…` page, `86b5304e…` style) and confirms no foundry-keystone candidate commit exists before committing (a docs commit `72b4a7a` mentioning "foundry" is a theme-spec lane artifact, not a candidate commit).
- **G8 caveat:** the scratch log (`/tmp/keystone-5b/07/keystone-work/.keystone/log.json`) records this build — engine runs against THAT log self-fail G8 by construction (verified: `report-source/` = 46/47 with exactly G8). Task 2's reproduction points `--log` at a fresh empty log. Do not "fix" G8 by deleting the log.
- **Read-only zones:** `candidates/07-foundry-compliance/hallmark/**` (committed lane `b02a002`), `candidates/06-anya-portfolio/**`, `test/compare/build-gallery.mjs`, `docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md`. This plan writes only `/tmp/keystone-5b/07/verify/**` and commits only the two candidate files + this plan doc.
- **Command lessons (verified this session):** engine needs `--log` pointing at an existing file; source-only runs need the out dir pre-created; portable post-marker scans = `sed -n '/marker/,$p' | grep -E` (no awk intervals); `color-mix(in oklch, var(--token) …)` lines do NOT match the `oklch\(` literal scan (no paren after "oklch") — sanctioned token interpolations.
- No AI attribution. 2-space indent, EOF newline.
- Working directory for all commands: `/Users/rector/local-dev/getpipher/keystone`.

---

### Task 1: Packaging integrity

**Files:**
- Verify only: `candidates/07-foundry-compliance/keystone/index.html`
- Verify only: `candidates/07-foundry-compliance/keystone/style.css`

**Interfaces:**
- Consumes: nothing.
- Produces: greppable proof of the two-file contract — `data-theme="cobalt"` scoping, stamp with `overrides` + `48/48` on line 1, zero `<script>` blocks (statically interactive-free), EOF newlines, no tabs, 11 OKLCH confined to `:root`, full link states, honest stat slot intact.

- [ ] **Step 1: File set + wiring + hygiene**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/07-foundry-compliance/keystone && ls && echo "stamp: $(head -1 style.css | grep -c 'macrostructure: Bento Grid')" && echo "overrides: $(head -1 style.css | grep -c 'overrides: \[\"G7\", \"G22\"\]')" && echo "gates-filled: $(head -1 style.css | grep -c 'gates: 48/48 engine-verified')" && echo "theme-scoped: $(grep -c 'data-theme="cobalt"' index.html) $(grep -c ':root\[data-theme="cobalt"\]' style.css)" && echo "links: $(grep -c '<link' index.html) | style-blocks: $(grep -c '<style' index.html) | script-blocks: $(grep -c '<script' index.html)" && echo "eof: $(tail -c 1 index.html | xxd -p) $(tail -c 1 style.css | xxd -p)" && echo "tabs: $(grep -cP '\t' index.html || true) $(grep -cP '\t' style.css || true)"
```

Expected: `index.html` + `style.css` only · `stamp: 1` · `overrides: 1` · `gates-filled: 1` · `theme-scoped: 1 1` (html attribute + CSS scoping — REQUIRED for the Manifesto/Cobalt token pattern) · `links: 4` (2 preconnect + fonts + style.css) · `style-blocks: 0` · `script-blocks: 0` · `eof: 0a 0a` · `tabs: 0 0`. (If `grep -cP` is unavailable, use `awk '/\t/{t++} END{print t+0}'`.)

- [ ] **Step 2: Token discipline + honest-slot + build-specific spot-checks**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/07-foundry-compliance/keystone && echo "oklch-in-root: $(grep -c 'oklch(' style.css)" && sed -n '/Global clip/,$p' style.css | grep -nE 'oklch\(|#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(' ; echo "(scan exit=$? — 1 = pass)" ; sed -n '/Global clip/,$p' style.css | grep 'font-family:' | grep -v 'var(--font-' ; echo "(font exit=$? — 1 = pass)" ; echo "states: $(grep -c ':hover\|:focus-visible\|:active\|:disabled' style.css)" && echo "nowrap: $(grep -c 'white-space: nowrap' style.css)" && echo "italics: $(grep -c 'font-style: italic' style.css)" && echo "accent-as-bg: $(grep -c 'background-color: var(--color-accent)' style.css)" && echo "accent-strong-fill: $(grep -c 'background-color: var(--color-accent-strong)' style.css)" && echo "honest-slot: $(grep -c 'metric to confirm' index.html)" && echo "eyebrow-dark: $(grep -c 'color: var(--color-link)' style.css)"
```

Expected: `oklch-in-root: 11` (paper, paper-2, paper-3, ink, muted, rule, accent, accent-ink, focus, link, accent-strong — all in `:root`) · both post-marker scans **exit 1, no output** · `states: 15` (nav-links 4 + cmdk 2 + buttons 5 + foot-links 4) · `nowrap: 5` (wordmark, nav links, cmdk, both buttons) · `italics: 0` · `accent-as-bg: 0` (iteration-3 fix: fills use `--color-accent-strong`) · `accent-strong-fill: 1` (`.btn-solid`) · `honest-slot: 1` (the `—` + "metric to confirm" hole — G46 honoured) · `eyebrow-dark: 1` (iteration-3 fix: eyebrow uses `--color-link`, Lc ≥ 60).

- [ ] **Step 3: Honest-copy regex — no invented counts**

```bash
grep -nEi '[0-9]+ ?%|[0-9]+×|faster|trusted by|uptime|customers,|50,000|50000|99\.9' candidates/07-foundry-compliance/keystone/index.html
```

Expected: **no output** (tier prices `$99/$499` and the `04` frameworks count are product fiction, not proof-metrics; the customer count stays the labelled `—`).

### Task 2: Engine reproduction — clean-log full render on the packaged files

**Files:**
- Read: `candidates/07-foundry-compliance/keystone/{index.html, style.css}`
- Create: `/tmp/keystone-5b/07/verify/` + `/tmp/keystone-5b/07/verify/empty-log.json`

**Interfaces:**
- Consumes: `engine/check-gates.mjs` (13 deterministic detectors + render).
- Produces: fresh evidence the packaged bytes score 47/47 rows · 0 fails (= 48/48 gate numbers; G40/41 share one row).

- [ ] **Step 1: Fresh empty log + full render**

```bash
mkdir -p /tmp/keystone-5b/07/verify
printf '[]\n' > /tmp/keystone-5b/07/verify/empty-log.json
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html candidates/07-foundry-compliance/keystone/index.html \
  --css candidates/07-foundry-compliance/keystone/style.css \
  --log /tmp/keystone-5b/07/verify/empty-log.json \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/07/verify
```

Expected console: `PASS 47/47 · FAIL 0/47 — /tmp/keystone-5b/07/verify/keystone-report.html (render: on)`.

- [ ] **Step 2: Machine-read the result**

```bash
node -e '
const r = JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/07/verify/keystone-report.json", "utf8"));
const fails = r.results.filter(x => !x.pass);
console.log("rows:", r.pass + "/" + r.total, "| failed gates:", fails.map(f => f.gate).join(",") || "none");
'
```

Expected: `rows: 47/47 | failed gates: none`. Any fail = the packaged artifact drifted from the scored state — escalate with verbatim gate evidence (this plan has no fix tasks; failures stop the run before commit).

### Task 3: Hash continuity + race check

**Files:**
- Verify only: packaged/scratch hashes, `git log`.

**Interfaces:**
- Consumes: nothing.
- Produces: proof the packaged bytes are the scratch bytes and no foundry-keystone commit exists yet.

- [ ] **Step 1: Hash continuity**

```bash
cd /Users/rector/local-dev/getpipher/keystone && shasum candidates/07-foundry-compliance/keystone/index.html candidates/07-foundry-compliance/keystone/style.css && shasum /tmp/keystone-5b/07/keystone-work/index.html /tmp/keystone-5b/07/keystone-work/style.css
```

Expected: packaged == scratch — `index.html → 905d03d2…`, `style.css → 86b5304e…`. Any divergence = a post-packaging mutation; stop and escalate.

- [ ] **Step 2: Commit-absence + tree state**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git log --all --oneline -- candidates/07-foundry-compliance/keystone/ | head -3
git status --short
```

Expected: **no output** from the git log (no foundry-keystone commit exists — race clear); status shows `?? candidates/07-foundry-compliance/keystone/` plus the known sibling files (`brief02-keystone-verify.md`, `build-gallery.mjs`) and nothing else new.

### Task 4: Commit the candidate

**Files:**
- Commit: `candidates/07-foundry-compliance/keystone/index.html`
- Commit: `candidates/07-foundry-compliance/keystone/style.css`

**Interfaces:**
- Consumes: Tasks 1–3 all green.
- Produces: the candidate as a committed comparison input (lane convention: `4cd0333`, `af27636`, `e591c2a`, `81753b4`).

- [ ] **Step 1: Commit (no AI attribution)**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add candidates/07-foundry-compliance/keystone/index.html candidates/07-foundry-compliance/keystone/style.css && git commit -m "candidates(07): keystone side — Cobalt/Bento blind build, 48/48 engine-verified"
```

Expected: single commit, exactly 2 files. Verify `git show --stat HEAD | tail -3`.

### Task 5: Commit the plan doc

**Files:**
- Commit: `docs/superpowers/plans/2026-08-29-5b-brief07-keystone-finalize.md`

**Interfaces:**
- Consumes: Task 4.
- Produces: the plan doc on record (lane convention: `08cc1e0`, `31f8a8d`, `2068a3d`).

- [ ] **Step 1: Commit the doc**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add docs/superpowers/plans/2026-08-29-5b-brief07-keystone-finalize.md && git commit -m "docs(5b): brief07 keystone finalize plan — executed, candidate committed"
```

Expected: single commit, 1 file. `git status --short` afterwards shows only sibling lanes' untracked files.

---

## Self-review

- **Coverage:** design-doc packaging + stamp/overrides/log → Task 1; Step 7.1 score reproduction on the packaged bytes (clean-log, G8 caveat honoured) → Task 2; race provenance + post-seed evidence → Global Constraints + Task 3; lane-convention commits → Tasks 4–5.
- **Placeholders:** none — every step is an exact command with expected output; all session command lessons (portable scans, pre-created dirs, `--log` file requirement) are baked in.
- **Consistency:** paths (`/tmp/keystone-5b/07/verify`, `candidates/07-foundry-compliance/keystone`, the two commit messages) uniform; no fix tasks — failures escalate with verbatim evidence, because the scored bytes are the shipped bytes and quiet patches would break provenance.

**Execution handoff:** run inline; total runtime ≈ one render (~30–60 s). Tasks 4–5 mutate git history per the declared lane convention — executed only after Tasks 1–3 are green.
