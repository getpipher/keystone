# Plan 5b · Brief 02 Hallmark Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, smoke-render, and commit the brief-02 (Streampipe CLI) Hallmark candidate produced by the blind skill run — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Hallmark skill end-to-end (Steps 0–7, slop test self-scored 58/58) and packaged exactly two static files into `candidates/02-streampipe-cli/hallmark/`. This plan adds no design work: Task 1 re-verifies packaging integrity with greppable checks, Task 2 render-smokes the page through this repo's own engine at the five protocol viewports into a throwaway directory, Task 3 records the verification report and commits the candidate. The *official* render + score happens later for both sides via `test/compare/run-comparison.mjs` (see `test/compare/README.md` steps 2–3) — explicitly out of scope here.

**Tech Stack:** vanilla static HTML/CSS (no build step) · Node ≥ 20 (repo engine scripts) · Playwright via `engine/check-gates.mjs --render` (repo pins playwright-core 1.62.0) · git.

## Global Constraints

- **Blind protocol (from `test/compare/README.md` § The protocol):** the candidate is the skill's verbatim output. **No design edits after the run.** If any verification below fails, record the failure in the verification report — do **not** hand-fix the page. Only the orchestrator may order a rebuild, and a rebuild means re-running the skill, not patching files.
- **Layout contract:** `candidates/02-streampipe-cli/hallmark/` contains exactly `index.html` and `style.css`. Nothing else is added to this directory.
- **Packaging contract:** `style.css` = tokens block (top) + page CSS; `index.html` links exactly one local stylesheet (`style.css`); the Google Fonts `<link>` tags stay in the head; no inline `<style>` block.
- **File hygiene:** both files end with a newline (EOF newline); line 1 of `style.css` is the Hallmark stamp comment.
- **Commit message:** no AI attribution, no Co-Authored-By. Workspace convention: one focused commit.
- **Smoke data is throwaway:** Task 2's output goes to `/tmp/keystone-5b/02/smoke/` and is never committed. Engine gate rows from the smoke are **not** the candidate's official score — the official score comes from the harness run against both sides.
- **Working directory for every command in this plan:** the repo root `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.
- **Source-only candidate files commit cleanly:** `*.png` is globally gitignored and no un-ignore exists for `candidates/**` — this plan commits the two source files only, so no `.gitignore` change is needed. (Screenshot commits are the gallery step's concern, out of scope.)

## Background (read this if you have zero context)

- Repo: `/Users/rector/local-dev/getpipher/keystone` (Keystone — anti-slop gate engine + skill), branch `feat/comparison-5b`.
- Plan 5b executes the comparison harness in `test/compare/`: 8 verbatim briefs, each built by BOTH skills (Hallmark and Keystone) with no human intervention, then rendered + scored by this repo's engine, losses published.
- The brainstorm phase ran Hallmark's skill on `test/compare/briefs/02-streampipe-cli.md` (verbatim: *"Make a docs landing for an open-source CLI called Streampipe. It does stream parsing for log/event pipelines. Use the Terminal theme. Audience: backend developers. Use case: install the tool and read the docs. Tone: technical, terse."*). Hallmark picked: genre atmospheric (terminal/CLI cluster) · macrostructure Index-First · theme Terminal · nav N8 (terminal command) · footer Ft4 (dense typographic) · JetBrains Mono single-face · dark phosphor OKLCH palette.
- The built page claims the Hallmark slop test at 58/58. Keystone's engine will independently score it later (the "moat check" counts real engine failures in Hallmark output — do not pre-optimise for it, do not fear it).

---

### Task 1: Mechanical artifact verification

**Files:**
- Read-only: `candidates/02-streampipe-cli/hallmark/index.html`
- Read-only: `candidates/02-streampipe-cli/hallmark/style.css`
- Create: nothing (failures are noted for the Task 3 report)

**Interfaces:**
- Consumes: the two packaged files from the brainstorm phase.
- Produces: a pass/fail result per check, consumed by Task 3's verification report. Every check below prints exactly what to run and the expected output; any mismatch is a **recorded failure**, not a fix.

- [ ] **Step 1: Verify the directory contract — exactly two files**

```bash
ls candidates/02-streampipe-cli/hallmark/
```

Expected output (exactly two lines, nothing else):

```
index.html
style.css
```

- [ ] **Step 2: Verify stylesheet wiring — fonts + one local sheet, no tokens.css, no inline style**

```bash
grep -c 'rel="stylesheet"' candidates/02-streampipe-cli/hallmark/index.html
grep -c 'href="tokens.css"' candidates/02-streampipe-cli/hallmark/index.html
grep -c '<style' candidates/02-streampipe-cli/hallmark/index.html
```

Expected: `2`, then `0`, then `0`. (Two stylesheets = the Google Fonts css2 link + `style.css`.)

```bash
grep -n 'href="style.css"' candidates/02-streampipe-cli/hallmark/index.html
```

Expected: exactly one hit, in `<head>`.

- [ ] **Step 3: Verify EOF newlines**

```bash
tail -c 1 candidates/02-streampipe-cli/hallmark/index.html | od -An -c
tail -c 1 candidates/02-streampipe-cli/hallmark/style.css | od -An -c
```

Expected: both print `\n`.

- [ ] **Step 4: Verify the stamp is line 1 of style.css**

```bash
head -1 candidates/02-streampipe-cli/hallmark/style.css
```

Expected output (first non-empty line is the pre-emit critique stamp):

```
/* Hallmark · pre-emit critique: P5 H4 E4 S5 R5 V5 */
```

- [ ] **Step 5: Verify token discipline — no raw colour values in the page CSS**

The page-CSS section starts at the `── Base` comment marker; everything before it is the token block (`:root`) where raw OKLCH values are legal.

```bash
awk '/── Base/{found=1} found && (/oklch\(/ || /#[0-9a-fA-F]{3,8}/ || /rgb\(/ || /hsl\(/) {print FNR": "$0}' candidates/02-streampipe-cli/hallmark/style.css
```

Expected: **no output** (exit status 1 from awk's implicit "no lines matched" is fine).

```bash
awk '/── Base/{found=1} found && /font-family:/ && !/var\(--font-/ {print FNR": "$0}' candidates/02-streampipe-cli/hallmark/style.css
```

Expected: **no output** — every `font-family:` in the page CSS goes through `var(--font-body)`.

- [ ] **Step 6: Verify caret discipline — exactly two carets, both aria-hidden**

```bash
grep -c 'class="caret" aria-hidden="true"' candidates/02-streampipe-cli/hallmark/index.html
grep -n '▮' candidates/02-streampipe-cli/hallmark/index.html
```

Expected: `2`, then two lines — both caret spans sitting **inside `<pre>` lines** (the N8 nav line and the `streampipe --version` install line), never as standalone decoration.

- [ ] **Step 7: Verify honest copy — no fabricated-metric patterns**

```bash
grep -nEi '[0-9]+ ?%|[0-9]+×|faster|trusted by|uptime|customers|testimonials' candidates/02-streampipe-cli/hallmark/index.html
```

Expected: **no output**. (`streampipe 0.9.2` is product versioning, not a metric claim; `5xx` matches none of these patterns.)

- [ ] **Step 8: Verify head hygiene — viewport meta and lang**

```bash
grep -n 'name="viewport"' candidates/02-streampipe-cli/hallmark/index.html
grep -n '<html lang="en">' candidates/02-streampipe-cli/hallmark/index.html
```

Expected: one hit each.

**Deliverable of Task 1:** every check green, or a written list of failures carried into Task 3's report. Do not proceed to Task 2 with failures unless the failure is environmental (e.g. a grep pattern mismatch on this exact file — re-read the file and confirm before recording).

---

### Task 2: Render smoke at the protocol viewports (throwaway output)

**Files:**
- Read-only: `candidates/02-streampipe-cli/hallmark/{index.html,style.css}`
- Create (throwaway, never committed): `/tmp/keystone-5b/02/smoke/**`

**Interfaces:**
- Consumes: `engine/check-gates.mjs --render` (the same Playwright render path the harness uses).
- Produces: five screenshots + an engine report in `/tmp`, and a one-line smoke verdict for the Task 3 report. This is **not** the official comparison score.

- [ ] **Step 1: Run the render + engine pass into the throwaway dir**

```bash
node engine/check-gates.mjs \
  --html candidates/02-streampipe-cli/hallmark/index.html \
  --css candidates/02-streampipe-cli/hallmark/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/02/smoke
```

Expected: exit 0; the command prints its usual report summary to stdout.

- [ ] **Step 2: Verify the five screenshots exist**

```bash
ls /tmp/keystone-5b/02/smoke/keystone-render/
```

Expected to include: `screenshot-1280.png`, `screenshot-768.png`, `screenshot-414.png`, `screenshot-375.png`, `screenshot-320.png`.

If Playwright fails to launch a browser: run `pnpm exec playwright install chromium` once, then repeat Step 1. (Repo pins playwright-core 1.62.0; the examples flow renders with the same path, so a working checkout usually has Chromium already.)

- [ ] **Step 3: Eyeball the smoke — record, don't fix**

Open (or view) the five PNGs. Confirm informally: no obvious layout breakage at 320 px; dark green-tinted paper; the caret visible in the nav line. Note the engine's gate rows **for the report only** — any engine failures here are expected findings (this is the moat working), not defects to patch. The candidate's official verdicts come from the harness run against both sides.

**Deliverable of Task 2:** smoke evidence in `/tmp/keystone-5b/02/smoke/` and a one-line verdict for Task 3 (e.g. `smoke: rendered 5/5 viewports, exit 0`).

---

### Task 3: Verification report + commit the candidate

**Files:**
- Create: `.superpowers/sdd/brief02-hallmark-verification.md` (local SDD artifact — written, **not** committed, matching the repo's existing `.superpowers` practice)
- Commit: `candidates/02-streampipe-cli/hallmark/{index.html,style.css}` and this plan document

**Interfaces:**
- Consumes: Task 1's per-check results and Task 2's smoke verdict.
- Produces: the committed candidate pair on `feat/comparison-5b`, ready for the keystone-side sibling dispatch and the harness run.

- [ ] **Step 1: Write the verification report**

```bash
mkdir -p .superpowers/sdd
```

Create `.superpowers/sdd/brief02-hallmark-verification.md` with this exact structure, filling the Result column from Tasks 1–2:

```markdown
# Brief 02 · Hallmark candidate — verification report

Blind run, no design changes. Checks per plan
`docs/superpowers/plans/2026-08-29-5b-brief02-hallmark-finalize.md`.

| Check | Result |
|---|---|
| Directory contract (2 files) | pass |
| Stylesheet wiring (2 stylesheet links, 0 tokens.css, 0 <style>) | pass |
| EOF newlines (both files) | pass |
| Stamp at line 1 | pass |
| Token discipline (no raw colour / non-token font-family after Base marker) | pass |
| Caret discipline (2 carets, both aria-hidden, both inside pre) | pass |
| Honest copy (no fabricated-metric patterns) | pass |
| Head hygiene (viewport meta, lang=en) | pass |
| Render smoke (5 viewports, exit 0) | pass |

Smoke engine rows: local only (/tmp/keystone-5b/02/smoke) — not the official score.
Official scoring: test/compare/run-comparison.mjs after both sides exist.

Attestation: no design edits were made to candidates/02-streampipe-cli/hallmark/
during verification. Any failure above is recorded verbatim, not patched.
```

If any Task 1 check failed: replace that row's `pass` with `FAIL: <verbatim finding>` and stop after Step 2 — report to the orchestrator instead of committing. (Environmental false alarms may be corrected after re-reading the file, per Task 1's note.)

- [ ] **Step 2: Commit the candidate + the plan document**

```bash
git add candidates/02-streampipe-cli/hallmark/index.html \
        candidates/02-streampipe-cli/hallmark/style.css \
        docs/superpowers/plans/2026-08-29-5b-brief02-hallmark-finalize.md
git commit -m "candidates(02): hallmark side — Terminal/Index-First blind build"
```

Expected: one commit containing exactly the two candidate files + the plan doc. Do **not** `git add` the `.superpowers` report or `/tmp` smoke output.

- [ ] **Step 3: Verify the commit contents**

```bash
git show --stat --oneline HEAD
git status --short
```

Expected: `git show` lists exactly `candidates/02-streampipe-cli/hallmark/index.html`, `candidates/02-streampipe-cli/hallmark/style.css`, and the plan doc; `git status` still shows `test/compare/build-gallery.mjs` and `.superpowers/` as untracked (both owned elsewhere / local-by-convention).

**Deliverable of Task 3:** the candidate pair committed on `feat/comparison-5b`, verification report on disk.

---

## Final verification

1. `git log --oneline -1` shows `candidates(02): hallmark side — Terminal/Index-First blind build`.
2. `git ls-files candidates/02-streampipe-cli/hallmark/` lists exactly `index.html` and `style.css`.
3. `.superpowers/sdd/brief02-hallmark-verification.md` exists with all checks recorded.
4. No file outside `candidates/02-streampipe-cli/hallmark/`, `docs/superpowers/plans/`, and `.superpowers/sdd/` was created or modified (`git status --short` matches the pre-plan state plus the new commit).

## Out of scope (owned elsewhere — do not do in this plan)

- **Keystone-side build for brief 02** — a separate skill dispatch lays its output at `candidates/02-streampipe-cli/keystone/{index.html,style.css}`. Building it by hand here would break the blind protocol.
- **Harness scoring, gallery, vision S1 rows, verdicts** — `test/compare/README.md` steps 2–3, run after all briefs have both sides: `node --import tsx test/compare/run-comparison.mjs --candidates candidates --out test/compare/gallery`.
- **`test/compare/build-gallery.mjs`** — untracked tooling owned by the orchestrator; leave it alone.
- **Any `.gitignore` changes** — candidate PNG commits (if any) are decided by the gallery step, which already has `!test/compare/gallery/**/*.png` negations.
