# Plan 5b · Brief 05 Hallmark Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, smoke-render, and commit the brief-05 (Tracejam) Hallmark candidate produced by the blind skill run — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Hallmark skill end-to-end (Steps 0–7, slop test self-scored 58/58 with 4 mid-sweep fixes) and packaged exactly two static files into `candidates/05-tracejam-saas/hallmark/`. This plan adds no design work: Task 1 re-verifies packaging integrity (including the theme-mandated inline `<script>` — Cobalt's working ⌘K palette and reveal observer), Task 2 smoke-renders at the five protocol viewports into a throwaway directory (harness compatibility only), Task 3 proves hash continuity and race status, and Tasks 4–5 land the candidate and this plan doc as two commits per the lane convention (`19ba4b6`, `d9cf845`, `af16fdd`+`2068a3d`, `e9974db`+`b8fb740`). The *official* Hallmark-vs-Keystone comparison happens later via `test/compare/run-comparison.mjs` — out of scope here.

**Tech Stack:** Vanilla HTML/CSS + one inline vanilla `<script>` (⌘K palette, reveal observer, nav frost, hero type-in — Cobalt signature moves; no build step, no dependencies). Verification: bash one-liners + `extensions/render.ts` `render()` via `node --import tsx --input-type=module`.

## Global Constraints

- **Blind-run integrity:** render/engine output in this plan is harness-compatibility evidence (loads, no overflow) — NEVER a design score. The Hallmark self-score (58/58) lives in the scratch design doc.
- **Race check:** a duplicate dispatch raced the brief-02 keystone scratch earlier in this run. Task 3 re-proves packaged == scratch hashes and confirms no tracejam commit exists before committing.
- **Read-only zones:** `candidates/05-tracejam-saas/keystone/**` (parallel lane, if it appears), `candidates/03-*`, `candidates/04-*`, `test/compare/build-gallery.mjs`, `docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md` (sibling lane's). This plan writes only `/tmp/keystone-5b/05/smoke/**` and commits only the two candidate files + this plan doc.
- **Command lessons (macOS/BSD + this repo, verified in the brief-04 finalize execution):** `grep` alternation needs `-E`; the render extension exports `render()` (not `keystone_render`) and requires `--input-type=module` for the eval; render writes only to `--outDir`.
- No AI attribution. 2-space indent, EOF newline.
- Working directory for all commands: `/Users/rector/local-dev/getpipher/keystone`.

---

### Task 1: Packaging integrity

**Files:**
- Verify only: `candidates/05-tracejam-saas/hallmark/index.html`
- Verify only: `candidates/05-tracejam-saas/hallmark/style.css`

**Interfaces:**
- Consumes: nothing.
- Produces: greppable proof of the two-file contract — self-contained CSS, fonts in head, exactly one inline theme-interactivity script (Cobalt signature 5), zero external script sources.

- [ ] **Step 1: File set + wiring + hygiene**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/hallmark && ls && echo "stamp-line1: $(head -1 style.css | grep -c "Hallmark · genre: modern-minimal · macrostructure: Workbench")" && echo "links: $(grep -c "<link" index.html) | style-blocks: $(grep -c "<style" index.html) | script-blocks: $(grep -c "<script>" index.html) | external-scripts: $(grep -c "<script src" index.html)" && echo "root-in-css: $(grep -c ":root" style.css)" && echo "eof: $(tail -c 1 index.html | xxd -p) $(tail -c 1 style.css | xxd -p)" && echo "tabs: $(awk '/\t/{t++} END{print t+0}' index.html) $(awk '/\t/{t++} END{print t+0}' style.css)"
```

Expected: `index.html` + `style.css` only · `stamp-line1: 1` · `links: 4` (2 preconnect + fonts + style.css) · `style-blocks: 0` · `script-blocks: 1` (the inline ⌘K/reveal script) · `external-scripts: 0` · `root-in-css: 1` · `eof: 0a 0a` · `tabs: 0 0`.

- [ ] **Step 2: Token discipline + design-doc spot-checks**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/hallmark && node -e '
const css = require("fs").readFileSync("style.css", "utf8");
const rs = css.indexOf(":root"), re = css.indexOf("}", rs);
const bad = [...css.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\(\s*[0-9]|hsla?\(\s*[0-9]|oklch\(\s*[0-9.]/g)].filter(m => m.index < rs || m.index > re);
console.log("literal-colours-outside-root:", bad.length);
' && grep -qE "Every request, on one timeline" index.html && echo "h1 ok" && grep -c "linear-gradient" style.css > /dev/null; echo "no-mark-gradient (cobalt bans texture): $(grep -c "linear-gradient" style.css) — expected 0" && grep -qE "cmdk-trigger|palette__input" style.css && echo "palette styles ok"
```

Expected: `literal-colours-outside-root: 0` (the `color-mix(in oklch, var(…))` wrappers are interpolation spaces over tokens, not literal values) · `h1 ok` · `no-mark-gradient…: 0` · `palette styles ok`.

### Task 2: Smoke render — harness compatibility at the five protocol viewports

**Files:**
- Read: `candidates/05-tracejam-saas/hallmark/index.html`
- Create: `/tmp/keystone-5b/05/smoke/**` (throwaway; never the repo gallery)

**Interfaces:**
- Consumes: `extensions/render.ts` → `render({ htmlPath, viewports, outDir })` (verified export).
- Produces: `viewportMetrics` proving `scrollWidth <= innerWidth` at 1280/375/320/414/768, plus five screenshots. The inline palette JS runs headless (hidden by default) — a render crash here means the gallery would ship a broken page.

- [ ] **Step 1: Render into the throwaway dir**

```bash
mkdir -p /tmp/keystone-5b/05/smoke && cd /Users/rector/local-dev/getpipher/keystone && node --import tsx --input-type=module -e '
const { render } = await import("./extensions/render.ts");
const out = await render({
  htmlPath: "candidates/05-tracejam-saas/hallmark/index.html",
  viewports: [1280, 375, 320, 414, 768],
  outDir: "/tmp/keystone-5b/05/smoke/keystone-render",
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
ls /tmp/keystone-5b/05/smoke/keystone-render/*.png | wc -l
```

Expected: `5`.

### Task 3: Tree hygiene + race check

**Files:**
- Verify only: `git status`, scratch/packaged hashes.

**Interfaces:**
- Consumes: nothing.
- Produces: proof the packaged bytes are the scratch bytes, and that no tracejam commit already exists.

- [ ] **Step 1: Hash continuity + commit-absence**

```bash
cd /Users/rector/local-dev/getpipher/keystone && shasum candidates/05-tracejam-saas/hallmark/index.html candidates/05-tracejam-saas/hallmark/style.css && shasum /tmp/keystone-5b/05/hallmark-work/index.html /tmp/keystone-5b/05/hallmark-work/style.css && git log --oneline --all -i --grep="tracejam" | head -3
```

Expected: packaged hashes == scratch hashes (`f9ed0b57…` page, `4f0e8dc3…` style — the smoke render is read-only); the git log prints no commit lines. If a tracejam commit DOES exist, skip Tasks 4–5 and report it.

- [ ] **Step 2: Tree state**

```bash
git status --short
```

Expected untracked set: `?? candidates/05-tracejam-saas/`, `?? docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md` (sibling lane's, leave alone), `?? test/compare/build-gallery.mjs` (parallel lane's, leave alone), plus this plan doc once written. Tracked diff: empty.

### Task 4: Commit the candidate

**Files:**
- Commit: `candidates/05-tracejam-saas/hallmark/index.html`
- Commit: `candidates/05-tracejam-saas/hallmark/style.css`

**Interfaces:**
- Consumes: Tasks 1–3 all green.
- Produces: the candidate as a committed comparison input (lane convention: `19ba4b6`, `d9cf845`, `af16fdd`, `e9974db`).

- [ ] **Step 1: Commit (no AI attribution)**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add candidates/05-tracejam-saas/hallmark/index.html candidates/05-tracejam-saas/hallmark/style.css && git commit -m "candidates(05): hallmark side — Workbench/Cobalt blind build"
```

Expected: single commit, exactly 2 files. Verify `git show --stat HEAD | tail -3`.

### Task 5: Commit the plan doc

**Files:**
- Commit: `docs/superpowers/plans/2026-08-29-5b-brief05-hallmark-finalize.md`

**Interfaces:**
- Consumes: Task 4.
- Produces: the plan doc on record (lane convention: `2068a3d`, `b8fb740`, `31f8a8d`).

- [ ] **Step 1: Commit the doc**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add docs/superpowers/plans/2026-08-29-5b-brief05-hallmark-finalize.md && git commit -m "docs(5b): brief05 hallmark candidate plan — executed, candidate committed"
```

Expected: single commit, 1 file. `git status --short` afterwards shows only sibling lanes' untracked files.

---

## Self-review

- **Coverage:** design-doc packaging section → Task 1; harness compatibility (the E1 clip makes overflow the top risk — the +12vw media width is exactly the G34 pattern) → Task 2; race provenance → Global Constraints + Task 3; lane-convention commits → Tasks 4–5.
- **Placeholders:** none — every step is an exact command with expected output; the one adaptive step (render invocation) is pre-resolved with the verified `render()` export and `--input-type=module` from the brief-04 execution.
- **Consistency:** paths (`/tmp/keystone-5b/05/smoke`, `candidates/05-tracejam-saas/hallmark`, commit messages) uniform across tasks; the inline `<script>` is asserted as PRESENT (Cobalt signature), with external scripts asserted ABSENT.

**Execution handoff:** run inline; total runtime ≈ one render (~30–60 s). Task 4–5 mutate git history — they are the plan's declared purpose (lane convention), executed only after Tasks 1–3 are green.
