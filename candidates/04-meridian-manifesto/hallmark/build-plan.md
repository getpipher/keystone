# Plan 5b · Brief 04 Hallmark Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, smoke-render, and commit the brief-04 (Meridian manifesto) Hallmark candidate produced by the blind skill run — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Hallmark skill end-to-end (Steps 0–7, slop test self-scored 58/58 with 2 mid-sweep fixes) and packaged exactly two static files into `candidates/04-meridian-manifesto/hallmark/`. This plan adds no design work: Task 1 re-verifies packaging integrity with greppable checks, Task 2 smoke-renders the page at the five protocol viewports into a throwaway directory (harness compatibility only), Task 3 confirms tree hygiene and race status, and Tasks 4–5 land the candidate and this plan doc as two commits per the established lane convention (`19ba4b6`, `d9cf845`, `af16fdd`+`2068a3d`). The *official* Hallmark-vs-Keystone comparison happens later for both sides via `test/compare/run-comparison.mjs` — explicitly out of scope here.

**Tech Stack:** Vanilla HTML/CSS (static, no build step). Verification: bash one-liners + `extensions/render.ts` via tsx (playwright-core 1.62.0).

## Global Constraints

- **Blind-run integrity:** any engine/render output in this plan is harness-compatibility evidence (does the page load, does it overflow) — NEVER a design score. The Hallmark self-score (58/58) lives in the scratch design doc and is not re-judged here.
- **Race check:** a duplicate dispatch raced the brief-02 keystone scratch earlier in this run. Before committing, Task 3 re-proves hash continuity between the scratch bytes and the packaged bytes, and confirms no meridian commit already exists.
- **Read-only zones:** `candidates/04-meridian-manifesto/keystone/**` (if it appears — parallel lane), `candidates/03-*`, `test/compare/build-gallery.mjs`. This plan writes only `/tmp/keystone-5b/04/smoke/**` and commits only the two candidate files + this plan doc.
- No AI attribution. 2-space indent, EOF newline on any written file.
- Working directory for all commands: `/Users/rector/local-dev/getpipher/keystone`.

---

### Task 1: Packaging integrity

**Files:**
- Verify only: `candidates/04-meridian-manifesto/hallmark/index.html`
- Verify only: `candidates/04-meridian-manifesto/hallmark/style.css`

**Interfaces:**
- Consumes: nothing.
- Produces: greppable proof the two-file contract holds (self-contained CSS, fonts in head, no scripts).

- [ ] **Step 1: File set + wiring + hygiene**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/04-meridian-manifesto/hallmark && ls && head -1 style.css | grep -c "macrostructure: Manifesto" && grep -c "gates" style.css > /dev/null; echo "stamp-line1: $(head -1 style.css | grep -c "Hallmark · genre: editorial · macrostructure: Manifesto")" && echo "links: $(grep -c "<link" index.html) | style/script: $(grep -c "<style\|<script" index.html)" && echo "root-in-css: $(grep -c ":root" style.css)" && echo "eof: $(tail -c 1 index.html | xxd -p) $(tail -c 1 style.css | xxd -p)" && echo "tabs: $(awk '/\t/{t++} END{print t+0}' index.html) $(awk '/\t/{t++} END{print t+0}' style.css)"
```

Expected: `index.html` + `style.css` only · `stamp-line1: 1` · `links: 4` · `style/script: 0` · `root-in-css: 1` (self-contained) · `eof: 0a 0a` · `tabs: 0 0`.

- [ ] **Step 2: Content spot-checks (the design doc's locked decisions)**

```bash
cd /Users/rector/local-dev/getpipher/keystone/candidates/04-meridian-manifesto/hallmark && grep -q "WE MAKE THINGS THE WORLD CAN" index.html && echo "h1 ok" && grep -c "linear-gradient(180deg, transparent 38%" style.css | grep -q 1 && echo "mark-band x-height formula ok" && grep -c "Fraunces\|Newsreader" style.css | grep -q 2 && echo "fonts ok"
```

Expected: `h1 ok` · `mark-band x-height formula ok` · `fonts ok`.

### Task 2: Smoke render — harness compatibility at the five protocol viewports

**Files:**
- Read: `candidates/04-meridian-manifesto/hallmark/index.html`
- Create: `/tmp/keystone-5b/04/smoke/**` (throwaway; never the repo gallery)

**Interfaces:**
- Consumes: `extensions/render.ts` → `keystone_render({ htmlPath, viewports, outDir })`.
- Produces: `viewportMetrics` proving `scrollWidth <= innerWidth` at 1280/375/320/414/768 (the harness renders file:// pages at exact CSS px — if the page overflows anywhere, the comparison gallery would ship a broken screenshot), plus five screenshots.

- [ ] **Step 1: Render into the throwaway dir**

```bash
mkdir -p /tmp/keystone-5b/04/smoke && cd /Users/rector/local-dev/getpipher/keystone && node --import tsx --input-type=module -e '
const { keystone_render } = await import("./extensions/render.ts");
const out = await keystone_render({
  htmlPath: "candidates/04-meridian-manifesto/hallmark/index.html",
  viewports: [1280, 375, 320, 414, 768],
  outDir: "/tmp/keystone-5b/04/smoke/keystone-render",
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

Expected: five `PASS` lines and `SMOKE PASS`. Requires Chromium (installed for the repo's render suites). If the module API differs, read `extensions/render.ts` exports first and adapt the invocation — the assertion under test is only `scrollWidth <= innerWidth` per viewport.

- [ ] **Step 2: Screenshots exist**

```bash
ls /tmp/keystone-5b/04/smoke/keystone-render/*.png | wc -l
```

Expected: `5`.

### Task 3: Tree hygiene + race check

**Files:**
- Verify only: `git status`, scratch/packaged hashes.

**Interfaces:**
- Consumes: nothing.
- Produces: proof the packaged bytes are the scratch bytes, and that no meridian commit already exists.

- [ ] **Step 1: Hash continuity + commit-absence**

```bash
cd /Users/rector/local-dev/getpipher/keystone && shasum candidates/04-meridian-manifesto/hallmark/index.html candidates/04-meridian-manifesto/hallmark/style.css && shasum /tmp/keystone-5b/04/hallmark-work/index.html /tmp/keystone-5b/04/hallmark-work/style.css && git log --oneline --all -i --grep="meridian" | head -3
```

Expected: packaged hashes == scratch hashes (the smoke render is read-only, hashes must not change); the git log prints no commit lines (no meridian commit exists yet — if one DOES, skip Tasks 4–5 entirely and report the existing commit).

- [ ] **Step 2: Tree state**

```bash
git status --short
```

Expected: `?? candidates/04-meridian-manifesto/`, `?? docs/superpowers/plans/2026-08-29-5b-brief04-hallmark-finalize.md`, `?? docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md` (sibling lane's, leave alone), `?? test/compare/build-gallery.mjs` (parallel lane's, leave alone). Tracked diff: empty.

### Task 4: Commit the candidate

**Files:**
- Commit: `candidates/04-meridian-manifesto/hallmark/index.html`
- Commit: `candidates/04-meridian-manifesto/hallmark/style.css`

**Interfaces:**
- Consumes: Tasks 1–3 all green.
- Produces: the candidate as a committed comparison input (lane convention: `19ba4b6`, `d9cf845`, `af16fdd`).

- [ ] **Step 1: Commit (no AI attribution)**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add candidates/04-meridian-manifesto/hallmark/index.html candidates/04-meridian-manifesto/hallmark/style.css && git commit -m "candidates(04): hallmark side — Manifesto/Garden blind build"
```

Expected: single commit, exactly 2 files. Verify `git show --stat HEAD | tail -3`.

### Task 5: Commit the plan doc

**Files:**
- Commit: `docs/superpowers/plans/2026-08-29-5b-brief04-hallmark-finalize.md`

**Interfaces:**
- Consumes: Task 4.
- Produces: the plan doc on record (lane convention: `2068a3d`).

- [ ] **Step 1: Commit the doc**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git add docs/superpowers/plans/2026-08-29-5b-brief04-hallmark-finalize.md && git commit -m "docs(5b): brief04 hallmark candidate plan — executed, candidate committed"
```

Expected: single commit, 1 file. `git status --short` afterwards shows only the sibling lanes' untracked files.
