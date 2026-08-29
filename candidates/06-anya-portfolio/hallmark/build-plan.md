# Plan 5b · Brief 06 Anya Portfolio Hallmark Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, smoke-render, and commit the brief-06 (Anya portfolio) Hallmark candidate produced by the blind skill run — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Hallmark skill end-to-end (Steps 0–7, slop test self-scored 58/58) and packaged exactly two static files into `candidates/06-anya-portfolio/hallmark/`. This plan adds no design work: Task 1 verifies packaging integrity with greppable checks — carrying forward every accumulated lesson (**portable scans**: sed-slice + `grep -E`, never awk interval expressions; **packaging-transformation check**: committed CSS == `stamps + tokens + page CSS`; **exact-path `git add`**). Task 2 render-smokes through the repo engine at the five protocol viewports into a throwaway dir; Task 3 records the report and commits. The *official* score comes later from `test/compare/run-comparison.mjs` — out of scope.

**Tech Stack:** vanilla static HTML/CSS · Node ≥20 (`engine/check-gates.mjs`) · Playwright via the repo render path · git.

## Global Constraints

- **Blind protocol:** the candidate is the skill's verbatim output. **No design edits.** Failures are recorded and escalated, never patched. Only the orchestrator may order a rebuild (re-run the skill, not hand-edit).
- **Layout contract:** `candidates/06-anya-portfolio/hallmark/` contains exactly `index.html` and `style.css`.
- **Packaging contract:** committed `style.css` = two stamp lines + `:root` token block + page CSS (`head -2 work/style.css + cat work/tokens.css + tail -n +3 work/style.css`); committed `index.html` = work copy minus the `tokens.css` link; Google Fonts links stay in head; no inline `<style>`.
- **File hygiene:** EOF newline on both files; line 1 = `/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V5 */`, line 2 = the genre stamp.
- **Commit message:** no AI attribution; one focused commit; **exact-path `git add`** (never a directory sweep — brief-01 lesson).
- **Smoke data is throwaway** (`/tmp/keystone-5b/06/smoke/`), never committed; engine rows from the smoke are not the official score; engine findings in Hallmark output are expected (moat check) — record, never patch.
- **Portable scanning:** macOS awk mishandles `{n,m}` intervals — use `sed -n '/marker/,$p' | grep -E` form for all post-marker scans.
- **Source-only engine runs need the out dir pre-created** (`mkdir -p`) or they die with `ENOENT`.
- **Working directory:** `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.

## Background (read this if you have zero context)

- Repo: `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`. Plan 5b executes the comparison harness in `test/compare/`: 8 briefs × both skills, scored by this repo's engine, losses published.
- The brainstorm phase ran Hallmark's skill on `test/compare/briefs/06-anya-portfolio.md` (verbatim: *"I'm Anya, a software architect. Build me a one-pager. Don't ask me questions, just figure it out."*). Hallmark picked: genre **editorial** (silent default) · macrostructure **Letter (12)** · nav **N1a** (wordmark + 2 links — justified: a one-pager genuinely has 2 destinations) · footer **Ft6** (letter close, roman per G38a) · theme **Almanac** (warm light paper, slate link accent) · EB Garamond + IBM Plex Sans + IBM Plex Mono outlier · enrichment none. Honesty: the famous "One HTML file." boast was deliberately NOT claimed (packaging ships two files).
- The page claims Hallmark's slop test at 58/58. The engine will score it independently later — findings expected, recorded, never patched.

---

### Task 1: Mechanical artifact verification

**Files:**
- Verify only: `candidates/06-anya-portfolio/hallmark/{index.html,style.css}`
- Verify only (transformation sources): `/tmp/keystone-5b/06/hallmark-work/{index.html,style.css,tokens.css}`

**Interfaces:**
- Consumes: the packaged files and their scratch transformation sources.
- Produces: pass/fail per check for the Task 3 report.

- [ ] **Step 1: Directory contract**

```bash
ls candidates/06-anya-portfolio/hallmark/
```

Expected: exactly `index.html` and `style.css`.

- [ ] **Step 2: Stylesheet wiring**

```bash
grep -c 'rel="stylesheet"' candidates/06-anya-portfolio/hallmark/index.html
grep -c 'href="tokens.css"' candidates/06-anya-portfolio/hallmark/index.html
grep -c '<style' candidates/06-anya-portfolio/hallmark/index.html
grep -n 'href="style.css"' candidates/06-anya-portfolio/hallmark/index.html
```

Expected: `2`, `0`, `0`; exactly one `style.css` hit in `<head>`.

- [ ] **Step 3: Packaging transformation — byte-exact (brief-02/03 lesson)**

```bash
{ head -2 /tmp/keystone-5b/06/hallmark-work/style.css; \
  cat /tmp/keystone-5b/06/hallmark-work/tokens.css; \
  tail -n +3 /tmp/keystone-5b/06/hallmark-work/style.css; } \
  | diff - candidates/06-anya-portfolio/hallmark/style.css && echo "CSS-contract OK"
python3 - <<'EOF'
work = open('/tmp/keystone-5b/06/hallmark-work/index.html').read()
expect = work.replace('  <link rel="stylesheet" href="tokens.css">\n', '')
committed = open('candidates/06-anya-portfolio/hallmark/index.html').read()
print('INDEX-contract OK' if committed == expect else 'INDEX-contract FAIL')
EOF
```

Expected: `CSS-contract OK` and `INDEX-contract OK`.

- [ ] **Step 4: Two-line stamp head**

```bash
head -2 candidates/06-anya-portfolio/hallmark/style.css
```

Expected, exactly:

```
/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V5 */
/* Hallmark · genre: editorial · macrostructure: Letter · theme: Almanac · enrichment: none · nav: N1a · footer: Ft6 */
```

- [ ] **Step 5: EOF newlines**

```bash
tail -c 1 candidates/06-anya-portfolio/hallmark/index.html | od -An -c
tail -c 1 candidates/06-anya-portfolio/hallmark/style.css | od -An -c
```

Expected: both `\n`.

- [ ] **Step 6: Token discipline — portable post-marker scan**

```bash
grep -c 'oklch(' candidates/06-anya-portfolio/hallmark/style.css
sed -n '/Global clip/,$p' candidates/06-anya-portfolio/hallmark/style.css | grep -nE 'oklch\(|#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\('
sed -n '/Global clip/,$p' candidates/06-anya-portfolio/hallmark/style.css | grep 'font-family:' | grep -v 'var(--font-'
```

Expected: `7` (paper, ink, muted, rule, accent, link, focus — all in `:root`); then **no output** from both scans (exit 1 = pass).

- [ ] **Step 7: Link states, nowrap, italics — this page's interactive surface**

```bash
grep -c ':hover\|:focus-visible\|:active\|:disabled' candidates/06-anya-portfolio/hallmark/style.css
grep -c 'white-space: nowrap' candidates/06-anya-portfolio/hallmark/style.css
grep -c 'font-style: italic' candidates/06-anya-portfolio/hallmark/style.css
```

Expected: `8` (4 states × 2 selector groups: `.nav-links a`, the mailto/ps group); `2` (`.wordmark` + `.nav-links a` — nav affordances; the inline prose email may wrap legally); `0` (G38a).

- [ ] **Step 8: Honest copy — no fabricated proof-metrics, and the file-count boast stays unclaimed**

```bash
grep -nEi '[0-9]+ ?%|[0-9]+×|faster|trusted by|uptime|customers|testimonials' candidates/06-anya-portfolio/hallmark/index.html
grep -ci 'one html file' candidates/06-anya-portfolio/hallmark/index.html
```

Expected: **no output**, then `0`. (The famous Anya boast would be false — packaging ships two files; the P.S. claims only "no framework, no analytics, no build step".)

- [ ] **Step 9: Head hygiene**

```bash
grep -n 'name="viewport"' candidates/06-anya-portfolio/hallmark/index.html
grep -n '<html lang="en">' candidates/06-anya-portfolio/hallmark/index.html
```

Expected: one hit each.

**Deliverable of Task 1:** per-check results for the Task 3 report.

---

### Task 2: Render smoke at the protocol viewports (throwaway output)

**Files:**
- Read: `candidates/06-anya-portfolio/hallmark/{index.html,style.css}`
- Create (throwaway): `/tmp/keystone-5b/06/smoke/**`

**Interfaces:**
- Consumes: `engine/check-gates.mjs --render`.
- Produces: five screenshots + the recorded engine-findings line for the Task 3 report. Not the official score.

- [ ] **Step 1: Full render**

```bash
node engine/check-gates.mjs \
  --html candidates/06-anya-portfolio/hallmark/index.html \
  --css candidates/06-anya-portfolio/hallmark/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/06/smoke
```

Expected: exit 0. (If Playwright cannot launch: `pnpm exec playwright install chromium` once, repeat.)

- [ ] **Step 2: Verify screenshots + read findings**

```bash
ls /tmp/keystone-5b/06/smoke/keystone-render/screenshot-*.png | wc -l
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/06/smoke/keystone-report.json","utf8")); const f=r.results.filter(x=>!x.pass); console.log("rows:",r.total,"pass:",r.pass,"fail:",r.fail,"| failed gates:",[...new Set(f.map(x=>x.gate))].join(", ")||"none"); for(const x of f) console.log(`  G${x.gate} ${x.name}: ${(x.evidence||"").slice(0,120)}`)'
```

Expected: `5`; then the engine's findings line. Engine failures in Hallmark output are expected (moat check) — record verbatim for the report; interpret only where cross-skill conventions differ (e.g. G20 wants a *Keystone* stamp). **Do not patch.**

**Deliverable of Task 2:** smoke evidence + the findings line for Task 3.

---

### Task 3: Verification report + commit

**Files:**
- Create: `.superpowers/sdd/brief06-hallmark-verification.md` (local SDD artifact — written, **not** committed)
- Commit: `candidates/06-anya-portfolio/hallmark/{index.html,style.css}` and this plan document

**Interfaces:**
- Consumes: Tasks 1–2.
- Produces: the committed candidate pair on `feat/comparison-5b`.

- [ ] **Step 1: Write the verification report**

```bash
mkdir -p .superpowers/sdd
```

Create `.superpowers/sdd/brief06-hallmark-verification.md`:

```markdown
# Brief 06 · Hallmark candidate — verification report

Blind run, no design changes. Checks per plan
`docs/superpowers/plans/2026-08-29-5b-brief06-hallmark-finalize.md`.

| Check | Result |
|---|---|
| Directory contract (2 files) | pass |
| Stylesheet wiring (2 stylesheet links, 0 tokens.css, 0 <style>) | pass |
| Packaging transformation (stamps+tokens+page concat; index minus tokens link) | pass |
| Two-line stamp head | pass |
| EOF newlines (both files) | pass |
| Token discipline (7 oklch in :root; none after Global clip; fonts via var()) | pass |
| Link states (4 states × 2 groups = 8 lines); nav/prices nowrap; zero italics | pass |
| Honest copy (no proof-metrics; "one HTML file" boast unclaimed) | pass |
| Head hygiene (viewport meta, lang=en) | pass |
| Render smoke (5 viewports, exit 0) | pass |

Smoke engine findings (recorded, not patched): <paste the Task 2 Step 2 line;
interpret only where cross-skill conventions differ, e.g. G20 wants a Keystone stamp>.

Smoke engine rows: local only (/tmp/keystone-5b/06/smoke) — not the official score.
Official scoring: test/compare/run-comparison.mjs after both sides exist.

Attestation: no design edits were made to candidates/06-anya-portfolio/hallmark/
during verification. Any failure above is recorded verbatim, not patched.
```

If any Task 1 check failed: `FAIL: <verbatim finding>` in that row, stop, escalate — no commit.

- [ ] **Step 2: Commit (exact paths)**

```bash
git add candidates/06-anya-portfolio/hallmark/index.html \
        candidates/06-anya-portfolio/hallmark/style.css \
        docs/superpowers/plans/2026-08-29-5b-brief06-hallmark-finalize.md
git commit -m "candidates(06): hallmark side — Almanac/Letter blind build"
```

Expected: one commit, exactly the two candidate files + the plan doc. If `git commit` reports nothing staged, a parallel lane has already committed these bytes — verify with `git log --oneline -- candidates/06-anya-portfolio/hallmark/` and confirm the committed hash matches `shasum` of the working files before accepting (same resolution path as the brief-04 dispatch).

- [ ] **Step 3: Verify the commit contents**

```bash
git show --stat --oneline HEAD
git status --short
git ls-files candidates/06-anya-portfolio/hallmark/
```

Expected: exactly the three files in the commit; status shows only the known untracked lane files (`brief02-keystone-verify.md`, `build-gallery.mjs`, plus any newer parallel-lane artifacts); `git ls-files` lists exactly the two candidate files.

**Deliverable of Task 3:** the committed candidate pair + the local report.

---

## Final verification

1. `git log --oneline -- candidates/06-anya-portfolio/hallmark/` shows the candidate commit.
2. `git ls-files candidates/06-anya-portfolio/hallmark/` lists exactly `index.html` and `style.css`.
3. The verification report exists with all checks recorded.
4. No file outside `candidates/06-anya-portfolio/hallmark/`, `docs/superpowers/plans/`, and `.superpowers/sdd/` was created or modified by this plan.

## Out of scope (owned elsewhere — do not do in this plan)

- **Keystone-side build for brief 06** — separate skill dispatch at `candidates/06-anya-portfolio/keystone/`.
- **Harness scoring, gallery, vision rows, verdict commits** — `test/compare/README.md` steps 2–3.
- **`test/compare/build-gallery.mjs`** — orchestrator-owned untracked tooling.
- **Any `.gitignore` changes.**
