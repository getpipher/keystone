# Plan 5b · Brief 03 Maple Bakery Hallmark Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, smoke-render, and commit the brief-03 (Maple Street Bread) Hallmark candidate produced by the blind skill run — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Hallmark skill end-to-end (Steps 0–7, slop test self-scored 58/58) and packaged exactly two static files into `candidates/03-maple-bakery/hallmark/`. This plan adds no design work: Task 1 re-verifies packaging integrity with greppable checks — including the two lessons learned on brief 02 (**packaging-transformation check**: committed CSS must equal `stamps + tokens + page CSS` concatenated, committed HTML must equal the work copy minus the `tokens.css` link; **exact-path `git add`** so sibling candidate dirs are never swept in). Task 2 render-smokes the page through this repo's own engine at the five protocol viewports into a throwaway directory, Task 3 records the verification report and commits the candidate. The *official* render + score happens later for both sides via `test/compare/run-comparison.mjs` (see `test/compare/README.md` steps 2–3) — explicitly out of scope here.

**Tech Stack:** vanilla static HTML/CSS (no build step) · Node ≥ 20 (`engine/check-gates.mjs`) · Playwright via the repo's render path (playwright-core 1.62.0 pinned) · git.

## Global Constraints

- **Blind protocol (from `test/compare/README.md` § The protocol):** the candidate is the skill's verbatim output. **No design edits after the run.** If any verification below fails, record the failure in the verification report — do **not** hand-fix the page. Only the orchestrator may order a rebuild, and a rebuild means re-running the skill, not patching files.
- **Layout contract:** `candidates/03-maple-bakery/hallmark/` contains exactly `index.html` and `style.css`. Nothing else is added to this directory.
- **Packaging contract (this build's shape):** committed `style.css` = the two stamp comment lines (pre-emit critique, then genre stamp) + the `:root` token block + page CSS, concatenated byte-exactly as `head -2 work/style.css + cat work/tokens.css + tail -n +3 work/style.css`. Committed `index.html` = work copy with the `tokens.css` link line removed; Google Fonts `<link>` tags stay in the head; no inline `<style>` block.
- **File hygiene:** both files end with a newline (EOF newline); line 1 of `style.css` is `/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V5 */` and line 2 is the genre stamp.
- **Commit message:** no AI attribution, no Co-Authored-By. Workspace convention: one focused commit.
- **Smoke data is throwaway:** Task 2's output goes to `/tmp/keystone-5b/03/smoke/` and is never committed. Engine gate rows from the smoke are **not** the candidate's official score — the official score comes from the harness run against both sides. Engine failures in Hallmark output are *expected* (the moat check) — record, never patch.
- **Working directory for every command in this plan:** the repo root `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.
- **Source-only candidate files commit cleanly:** `*.png` is globally gitignored and no un-ignore exists for `candidates/**` — the two source files need no `.gitignore` change.
- **Known trap from the brief-02 dispatch:** a source-only engine run (`--render` omitted) requires the out dir to pre-exist (`mkdir -p` first) or it dies with `ENOENT`.

## Background (read this if you have zero context)

- Repo: `/Users/rector/local-dev/getpipher/keystone` (Keystone — anti-slop gate engine + skill), branch `feat/comparison-5b`.
- Plan 5b executes the comparison harness in `test/compare/`: 8 verbatim briefs, each built by BOTH skills with no human intervention, rendered + scored by this repo's engine, losses published.
- The brainstorm phase ran Hallmark's skill on `test/compare/briefs/03-maple-bakery.md` (verbatim: *"Landing page for Maple Street Bread. Audience: locals who want to buy bread. Use: see what's available + visit. Tone: warm, hand-set, considered."*). Hallmark picked: genre **editorial** (silent default) · macrostructure **Long Document (02)** · nav **N6** (newspaper masthead) · footer **Ft6** (letter close, set roman for G38a) · theme **Garden** (warm cream paper, leaf-green accent) · Fraunces 600 + Newsreader + IBM Plex Mono outlier · enrichment none (typography only; the image-need table's food row resolved to Tier 0 with no assets available).
- The built page claims Hallmark's slop test at 58/58. Keystone's engine will independently score it later — do not pre-optimise for it, do not fear it.

---

### Task 1: Mechanical artifact verification

**Files:**
- Read-only: `candidates/03-maple-bakery/hallmark/index.html`
- Read-only: `candidates/03-maple-bakery/hallmark/style.css`
- Read-only (transformation sources): `/tmp/keystone-5b/03/hallmark-work/{index.html, style.css, tokens.css}`
- Create: nothing (failures are noted for the Task 3 report)

**Interfaces:**
- Consumes: the two packaged files plus their scratch transformation sources.
- Produces: a pass/fail result per check, consumed by Task 3's verification report. Any mismatch is a **recorded failure**, not a fix.

- [ ] **Step 1: Verify the directory contract — exactly two files**

```bash
ls candidates/03-maple-bakery/hallmark/
```

Expected output (exactly two lines, nothing else):

```
index.html
style.css
```

- [ ] **Step 2: Verify stylesheet wiring — fonts + one local sheet, no tokens.css, no inline style**

```bash
grep -c 'rel="stylesheet"' candidates/03-maple-bakery/hallmark/index.html
grep -c 'href="tokens.css"' candidates/03-maple-bakery/hallmark/index.html
grep -c '<style' candidates/03-maple-bakery/hallmark/index.html
```

Expected: `2`, then `0`, then `0`. (Two stylesheets = the Google Fonts css2 link + `style.css`.)

```bash
grep -n 'href="style.css"' candidates/03-maple-bakery/hallmark/index.html
```

Expected: exactly one hit, in `<head>`.

- [ ] **Step 3: Verify the packaging transformation byte-exactly (brief-02 lesson)**

```bash
cat /tmp/keystone-5b/03/hallmark-work/tokens.css /tmp/keystone-5b/03/hallmark-work/style.css \
  | diff - candidates/03-maple-bakery/hallmark/style.css \
  && echo "CSS-contract FAIL (pre-packaging concat)" || true
{ head -2 /tmp/keystone-5b/03/hallmark-work/style.css; \
  cat /tmp/keystone-5b/03/hallmark-work/tokens.css; \
  tail -n +3 /tmp/keystone-5b/03/hallmark-work/style.css; } \
  | diff - candidates/03-maple-bakery/hallmark/style.css && echo "CSS-contract OK"
python3 - <<'EOF'
work = open('/tmp/keystone-5b/03/hallmark-work/index.html').read()
expect = work.replace('  <link rel="stylesheet" href="tokens.css">\n', '')
committed = open('candidates/03-maple-bakery/hallmark/index.html').read()
print('INDEX-contract OK' if committed == expect else 'INDEX-contract FAIL')
EOF
```

Expected: the first diff prints differences (pre-packaging concat is the WRONG shape — proves the stamps weren't lost), then `CSS-contract OK`, then `INDEX-contract OK`.

- [ ] **Step 4: Verify the two-line stamp head**

```bash
head -2 candidates/03-maple-bakery/hallmark/style.css
```

Expected output (exactly):

```
/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V5 */
/* Hallmark · genre: editorial · macrostructure: Long Document · theme: Garden · enrichment: none · nav: N6 · footer: Ft6 */
```

- [ ] **Step 5: Verify EOF newlines**

```bash
tail -c 1 candidates/03-maple-bakery/hallmark/index.html | od -An -c
tail -c 1 candidates/03-maple-bakery/hallmark/style.css | od -An -c
```

Expected: both print `\n`.

- [ ] **Step 6: Verify token discipline — no raw colour values in the page CSS**

The token block ends at the `:root` closing brace; the page CSS begins at the `Global clip` comment. Scan everything after it:

```bash
awk '/Global clip/{found=1} found && (/oklch\(/ || /#[0-9a-fA-F]{3,8}/ || /rgb\(/ || /hsl\(/) {print FNR": "$0}' candidates/03-maple-bakery/hallmark/style.css
awk '/Global clip/{found=1} found && /font-family:/ && !/var\(--font-/ {print FNR": "$0}' candidates/03-maple-bakery/hallmark/style.css
```

Expected: **no output** from either. Also confirm the token count:

```bash
grep -c 'oklch(' candidates/03-maple-bakery/hallmark/style.css
```

Expected: `7` (paper, ink, muted, rule, accent, link, focus — all inside `:root`).

- [ ] **Step 7: Verify link-state and nowrap discipline (this page's interactive surface)**

```bash
grep -c ':hover\|:focus-visible\|:active\|:disabled' candidates/03-maple-bakery/hallmark/style.css
grep -c 'white-space: nowrap' candidates/03-maple-bakery/hallmark/style.css
grep -c 'font-style: italic' candidates/03-maple-bakery/hallmark/style.css
```

Expected: `4` states × 2 selector groups = **8** lines (all four states present on both), then `1` (nav links; the letter-close email wraps legally inside running prose if ever needed — the nav must not), then `0` (G38a: no italics anywhere).

- [ ] **Step 8: Verify honest copy — no fabricated proof-metric patterns**

```bash
grep -nEi '[0-9]+ ?%|[0-9]+×|faster|trusted by|uptime|customers|testimonials' candidates/03-maple-bakery/hallmark/index.html
```

Expected: **no output**. (`$9`–`$11` prices, `est. 2019`, `© 2026` are the shop's own labelled fiction; none match these patterns.)

- [ ] **Step 9: Verify head hygiene — viewport meta and lang**

```bash
grep -n 'name="viewport"' candidates/03-maple-bakery/hallmark/index.html
grep -n '<html lang="en">' candidates/03-maple-bakery/hallmark/index.html
```

Expected: one hit each.

**Deliverable of Task 1:** every check green, or a written list of failures carried into Task 3's report. Do not proceed to Task 2 with failures unless the failure is environmental (re-read the file and confirm before recording).

---

### Task 2: Render smoke at the protocol viewports (throwaway output)

**Files:**
- Read-only: `candidates/03-maple-bakery/hallmark/{index.html,style.css}`
- Create (throwaway, never committed): `/tmp/keystone-5b/03/smoke/**`

**Interfaces:**
- Consumes: `engine/check-gates.mjs --render` (the same Playwright render path the harness uses).
- Produces: five screenshots + an engine report in `/tmp`, and a one-line smoke verdict plus recorded engine findings for the Task 3 report. This is **not** the official comparison score.

- [ ] **Step 1: Run the render + engine pass into the throwaway dir**

```bash
node engine/check-gates.mjs \
  --html candidates/03-maple-bakery/hallmark/index.html \
  --css candidates/03-maple-bakery/hallmark/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/03/smoke
```

Expected: exit 0 and the engine's usual one-line summary. (If Playwright cannot launch a browser: `pnpm exec playwright install chromium` once, then repeat.)

- [ ] **Step 2: Verify the five screenshots exist**

```bash
ls /tmp/keystone-5b/03/smoke/keystone-render/
```

Expected to include: `screenshot-1280.png`, `screenshot-768.png`, `screenshot-414.png`, `screenshot-375.png`, `screenshot-320.png`.

- [ ] **Step 3: Read the engine findings — record, don't fix**

```bash
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/03/smoke/keystone-report.json","utf8")); const f=r.results.filter(x=>!x.pass); console.log("rows:",r.total,"pass:",r.pass,"fail:",r.fail,"| failed gates:",[...new Set(f.map(x=>x.gate))].join(", "))'
```

Record the printed line for the Task 3 report. Engine failures here are expected findings (the moat check) — the candidate is the skill's verbatim output and is **not** patched. Optionally eyeball `screenshot-320.png` for gross breakage; the official responsive verdicts come from the harness.

**Deliverable of Task 2:** smoke evidence in `/tmp/keystone-5b/03/smoke/` plus the recorded findings line for Task 3.

---

### Task 3: Verification report + commit the candidate

**Files:**
- Create: `.superpowers/sdd/brief03-hallmark-verification.md` (local SDD artifact — written, **not** committed, matching the repo's existing `.superpowers` practice)
- Commit: `candidates/03-maple-bakery/hallmark/{index.html,style.css}` and this plan document

**Interfaces:**
- Consumes: Task 1's per-check results and Task 2's smoke verdict/findings.
- Produces: the committed candidate pair on `feat/comparison-5b`, ready for the keystone-side sibling dispatch and the harness run.

- [ ] **Step 1: Write the verification report**

```bash
mkdir -p .superpowers/sdd
```

Create `.superpowers/sdd/brief03-hallmark-verification.md` with this exact structure, filling the Result column from Tasks 1–2:

```markdown
# Brief 03 · Hallmark candidate — verification report

Blind run, no design changes. Checks per plan
`docs/superpowers/plans/2026-08-29-5b-brief03-hallmark-finalize.md`.

| Check | Result |
|---|---|
| Directory contract (2 files) | pass |
| Stylesheet wiring (2 stylesheet links, 0 tokens.css, 0 <style>) | pass |
| Packaging transformation (stamps+tokens+page concat; index minus tokens link) | pass |
| Two-line stamp head | pass |
| EOF newlines (both files) | pass |
| Token discipline (7 oklch in :root; none after Global clip; fonts via var()) | pass |
| Link states (4 states) + nav nowrap + zero italics | pass |
| Honest copy (no fabricated proof-metric patterns) | pass |
| Head hygiene (viewport meta, lang=en) | pass |
| Render smoke (5 viewports, exit 0) | pass |

Smoke engine findings (recorded, not patched): <paste the Task 2 Step 3 line and the
failed-gate list; interpretation only where cross-skill conventions differ>.

Smoke engine rows: local only (/tmp/keystone-5b/03/smoke) — not the official score.
Official scoring: test/compare/run-comparison.mjs after both sides exist.

Attestation: no design edits were made to candidates/03-maple-bakery/hallmark/
during verification. Any failure above is recorded verbatim, not patched.
```

If any Task 1 check failed: replace that row's `pass` with `FAIL: <verbatim finding>` and stop after writing the report — report to the orchestrator instead of committing.

- [ ] **Step 2: Commit the candidate + the plan document (exact paths — never a directory sweep)**

```bash
git add candidates/03-maple-bakery/hallmark/index.html \
        candidates/03-maple-bakery/hallmark/style.css \
        docs/superpowers/plans/2026-08-29-5b-brief03-hallmark-finalize.md
git commit -m "candidates(03): hallmark side — Garden/Long-Document blind build"
```

Expected: one commit containing exactly the two candidate files + the plan doc. Do **not** `git add` the `.superpowers` report, `/tmp` smoke output, or any sibling candidate directory.

- [ ] **Step 3: Verify the commit contents**

```bash
git show --stat --oneline HEAD
git status --short
```

Expected: `git show` lists exactly `candidates/03-maple-bakery/hallmark/index.html`, `candidates/03-maple-bakery/hallmark/style.css`, and the plan doc; `git status` still shows `test/compare/build-gallery.mjs` as untracked (orchestrator-owned) and nothing else new.

**Deliverable of Task 3:** the candidate pair committed on `feat/comparison-5b`, verification report on disk.

---

## Final verification

1. `git log --oneline -1` shows `candidates(03): hallmark side — Garden/Long-Document blind build`.
2. `git ls-files candidates/03-maple-bakery/hallmark/` lists exactly `index.html` and `style.css`.
3. `.superpowers/sdd/brief03-hallmark-verification.md` exists with all checks recorded.
4. No file outside `candidates/03-maple-bakery/hallmark/`, `docs/superpowers/plans/`, and `.superpowers/sdd/` was created or modified.

## Out of scope (owned elsewhere — do not do in this plan)

- **Keystone-side build for brief 03** — a separate skill dispatch lays its output at `candidates/03-maple-bakery/keystone/{index.html,style.css}`. Building it by hand here would break the blind protocol.
- **Harness scoring, gallery, vision S1 rows, verdicts** — `test/compare/README.md` steps 2–3, run after briefs have both sides.
- **`test/compare/build-gallery.mjs`** — untracked tooling owned by the orchestrator; leave it alone.
- **Any `.gitignore` changes** — gallery screenshots are the gallery step's concern (`!test/compare/gallery/**/*.png` negations already exist).
