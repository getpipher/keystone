# Plan 5b · Brief 08 Hallmark Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, smoke-render, and commit the brief-08 (Cohort) Hallmark candidate produced by the blind skill run — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Hallmark skill end-to-end (Steps 0–7, slop test self-scored 58/58 with 1 mid-sweep fix — G36 align-items on the footer form row) and packaged exactly two static files into `candidates/08-cohort-courses/hallmark/`. This plan adds no design work: Task 1 re-verifies packaging integrity (including the Ft7 form's G39 input-state conditions, greppable), Task 2 smoke-renders at the five protocol viewports into a throwaway directory (harness compatibility only), Task 3 proves hash continuity and race status, and Tasks 4–5 land the candidate and this plan doc as two commits per the lane convention (`19ba4b6`, `d9cf845`, `b02a002`). The *official* Hallmark-vs-Keystone comparison happens later via `test/compare/run-comparison.mjs` — out of scope here.

**Tech Stack:** Vanilla HTML/CSS (static, no build step, no JS). Verification: bash one-liners + `extensions/render.ts` `render()` via `node --import tsx --input-type=module` (verified export; macOS lessons: `grep -E` for alternation, `--input-type=module` required for top-level await).

## Global Constraints

- **Blind-run integrity:** render output in this plan is harness-compatibility evidence (loads, no overflow) — NEVER a design score. The Hallmark self-score (58/58) lives in the scratch design doc.
- **Race check:** a duplicate dispatch raced the brief-02 keystone scratch earlier in this run. Task 3 re-proves packaged == scratch hashes (`5ca41864…` page, `d074a4c6…` style) and confirms no cohort commit exists before committing.
- **Read-only zones:** `candidates/08-cohort-courses/keystone/**` (parallel lane, if it appears), `candidates/07-*`, `test/compare/build-gallery.mjs`, `docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md`, `docs/superpowers/plans/2026-08-29-5b-brief07-keystone-finalize.md`. This plan writes only `/tmp/keystone-5b/08/smoke/**` and commits only the two candidate files + this plan doc.
- No AI attribution. 2-space indent, EOF newline.
- Working directory for all commands: `/Users/rector/local-dev/getpipher/keystone`.

---

### Task 1: Packaging integrity

**Files:**
- Verify only: `candidates/08-cohort-courses/hallmark/index.html`
- Verify only: `candidates/08-cohort-courses/hallmark/style.css`

**Interfaces:**
- Consumes: nothing.
- Produces: greppable proof of the two-file contract — self-contained `:root`, stamp line 1 (editorial/Bento), 4 `<link>` lines, 0 `<style>`/`<script>` blocks (this build is JS-free by design), EOF newlines, no tabs, zero literal colours outside `:root`, plus the design doc's locked decisions (h1 line, Ft7 form with G39 conditions, bento tiles).

- [ ] **Step 1: File set + wiring + hygiene**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/08-cohort-courses/hallmark && ls && echo "stamp-line1: $(head -1 style.css | grep -c "Hallmark · genre: editorial · macrostructure: Bento")" && echo "links: $(grep -c "<link" index.html) | style/script: $(grep -c "<style\|<script" index.html)" && echo "root-in-css: $(grep -c ":root" style.css)" && echo "eof: $(tail -c 1 index.html | xxd -p) $(tail -c 1 style.css | xxd -p)" && echo "tabs: $(awk '/\t/{t++} END{print t+0}' index.html) $(awk '/\t/{t++} END{print t+0}' style.css)"
```

Expected: `index.html` + `style.css` only · `stamp-line1: 1` · `links: 4` (2 preconnect + fonts + style.css) · `style/script: 0` · `root-in-css: 1` · `eof: 0a 0a` · `tabs: 0 0`.

- [ ] **Step 2: Token discipline (literal colours outside `:root`)**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/08-cohort-courses/hallmark && node -e '
const css = require("fs").readFileSync("style.css", "utf8");
const rs = css.indexOf(":root"), re = css.indexOf("}", rs);
const bad = [...css.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\(\s*[0-9]|hsla?\(\s*[0-9]|oklch\(\s*[0-9.]/g)].filter(m => m.index < rs || m.index > re);
console.log("literal-colours-outside-root:", bad.length, bad.map(m => JSON.stringify(m[0]) + " @" + m.index).join(", "));
'
```

Expected: `literal-colours-outside-root: 0` (the pattern ignores `color-mix(in oklch, var(…))` interpolation spaces — none exist in this build, but the pattern is the corrected one from the brief-05 lesson).

- [ ] **Step 3: Design-doc spot-checks**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/08-cohort-courses/hallmark && grep -qE "Run your course like a salon" index.html && echo "h1 ok" && grep -qE "foot-news__row input" style.css && echo "ft7-form ok" && grep -c "min-height: 44px" style.css | grep -q 2 && echo "44px height-match ok" && grep -q "min-height: 1lh" style.css && echo "helper-slot ok" && grep -qE "Instrument Serif" style.css && grep -qE "Newsreader" style.css && echo "fonts ok"
```

Expected: all four lines `ok` (h1 line present; the Ft7 form styled; exactly two `min-height: 44px` declarations — input + button, the G39 height match; the `1lh` helper slot; the two font tokens).

### Task 2: Smoke render — harness compatibility at the five protocol viewports

**Files:**
- Read: `candidates/08-cohort-courses/hallmark/index.html`
- Create: `/tmp/keystone-5b/08/smoke/**` (throwaway; never the repo gallery)

**Interfaces:**
- Consumes: `extensions/render.ts` → `render({ htmlPath, viewports, outDir })` (verified export; `--input-type=module` required for top-level await).
- Produces: `viewportMetrics` proving `scrollWidth <= innerWidth` at 1280/375/320/414/768, plus five screenshots. The bento grid folds 4→2→1 columns; the overflow risk to rule out is the N6 double-rule and the nowrap masthead links at 320.

- [ ] **Step 1: Render into the throwaway dir**

```bash
mkdir -p /tmp/keystone-5b/08/smoke && cd /Users/rector/local-dev/getpipher/keystone && node --import tsx --input-type=module -e '
const { render } = await import("./extensions/render.ts");
const out = await render({
  htmlPath: "candidates/08-cohort-courses/hallmark/index.html",
  viewports: [1280, 375, 320, 414, 768],
  outDir: "/tmp/keystone-5b/08/smoke/keystone-render",
});
let fail = 0;
for (const v of out.viewportMetrics) {
  const ok = v.scrollWidth <= v.innerWidth;
  if (!ok) fail++;
  console.log(`${v.width}px: scrollWidth ${v.scrollWidth} <= innerWidth ${v.innerWidth} ? ${ok ? "PASS" : "FAIL"}`);
}
console.log(fail === 0 ? "SMOKE PASS" : `SMOKE FAIL (${fail} viewports overflow)`);
'
```

Expected: five `PASS` lines and `SMOKE PASS`.

- [ ] **Step 2: Screenshots exist**

```bash
ls /tmp/keystone-5b/08/smoke/keystone-render/*.png | wc -l
```

Expected: `5`.

### Task 3: Tree hygiene + race check

**Files:**
- Verify only: `git status`, packaged/scratch hashes.

**Interfaces:**
- Consumes: nothing.
- Produces: proof the packaged bytes are the scratch bytes, and that no cohort commit already exists.

- [ ] **Step 1: Hash continuity + commit-absence**

```bash
cd /Users/rector/local-dev/getpipher/keystone && shasum candidates/08-cohort-courses/hallmark/index.html candidates/08-cohort-courses/hallmark/style.css && shasum /tmp/keystone-5b/08/hallmark-work/index.html /tmp/keystone-5b/08/hallmark-work/style.css && git log --oneline --all -i --grep="cohort" | head -3
```

Expected: packaged == scratch (`5ca41864…` page, `d074a4c6…` style); the git log prints no commit lines. If a cohort commit DOES exist, skip Tasks 4–5 and report it.

- [ ] **Step 2: Tree state**

```bash
git status --short
```

Expected untracked: `?? candidates/08-cohort-courses/`, `?? docs/superpowers/plans/2026-08-29-5b-brief08-hallmark-finalize.md` (this plan), `?? docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md` (sibling), `?? test/compare/build-gallery.mjs`. Tracked diff: empty.

### Task 4: Commit the candidate

**Files:**
- Commit: `candidates/08-cohort-courses/hallmark/index.html`
- Commit: `candidates/08-cohort-courses/hallmark/style.css`

**Interfaces:**
- Consumes: Tasks 1–3 all green.
- Produces: the candidate as a committed comparison input (lane convention: `19ba4b6`, `d9cf845`, `b02a002`).

- [ ] **Step 1: Commit (no AI attribution)**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add candidates/08-cohort-courses/hallmark/index.html candidates/08-cohort-courses/hallmark/style.css && git commit -m "candidates(08): hallmark side — Bento/Newsprint blind build"
```

Expected: single commit, exactly 2 files. Verify `git show --stat HEAD | tail -3`.

### Task 5: Commit the plan doc

**Files:**
- Commit: `docs/superpowers/plans/2026-08-29-5b-brief08-hallmark-finalize.md`

**Interfaces:**
- Consumes: Task 4.
- Produces: the plan doc on record (lane convention: `2068a3d`, `b8fb740`, `31f8a8d`).

- [ ] **Step 1: Commit the doc**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add docs/superpowers/plans/2026-08-29-5b-brief08-hallmark-finalize.md && git commit -m "docs(5b): brief08 hallmark candidate plan — executed, candidate committed"
```

Expected: single commit, 1 file. `git status --short` afterwards shows only sibling lanes' untracked files.

---

## Self-review

- **Coverage:** design-doc packaging section → Task 1 (incl. the Ft7 form's G39 conditions as greppable spot-checks); harness compatibility (masthead nowrap links + double-rule at 320 are the named overflow risks) → Task 2; race provenance → Global Constraints + Task 3; lane-convention commits → Tasks 4–5.
- **Placeholders:** none — every step is an exact command with expected output; the render invocation carries the two verified lessons (`render()` export, `--input-type=module`); the token-discipline pattern is the corrected literal-value matcher.
- **Consistency:** paths (`/tmp/keystone-5b/08/smoke`, `candidates/08-cohort-courses/hallmark`, `5ca41864`/`d074a4c6` hashes) uniform across tasks; no fix tasks — the plan is verification + commit only, matching the sibling finalize lanes.

**Execution handoff:** run inline; total runtime ≈ one render (~30–60 s). Tasks 4–5 mutate git history per the declared lane convention — executed only after Tasks 1–3 are green.
