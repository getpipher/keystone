# Plan 5b · Brief 07 Foundry Compliance Hallmark Candidate — Finalize & Commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically verify, smoke-render, and commit the brief-07 (Foundry compliance automation) Hallmark candidate produced by the blind skill run — with **zero design changes** to the built page.

**Architecture:** The brainstorm phase already executed the Hallmark skill end-to-end (Steps 0–7, slop test self-scored 58/58 after 5 fixes) and packaged exactly two static files into `candidates/07-foundry-compliance/hallmark/`. This plan adds no design work: Task 1 verifies packaging integrity with greppable checks — including every accumulated lesson (**portable sed+grep scans**, the **packaging-transformation contract**, **exact-path `git add`**, the **parallel-lane hash-continuity fallback**) plus this build's own surface (honest `—` stat slot unpatched into a fake number, 9 OKLCH confined, full link states across five selector groups, darkened pill hovers). Task 2 render-smokes through the repo engine into a throwaway dir; Task 3 records the report and commits. The *official* score comes later from `test/compare/run-comparison.mjs` — out of scope.

**Tech Stack:** vanilla static HTML/CSS · Node ≥20 (`engine/check-gates.mjs`) · Playwright via the repo render path · git.

## Global Constraints

- **Blind protocol:** the candidate is the skill's verbatim output. **No design edits.** Failures are recorded and escalated, never patched. Only the orchestrator may order a rebuild (re-run the skill, not hand-edit).
- **Layout contract:** `candidates/07-foundry-compliance/hallmark/` contains exactly `index.html` and `style.css`.
- **Packaging contract:** committed `style.css` = two stamp lines + `:root` token block + page CSS (`head -2 work/style.css + cat work/tokens.css + tail -n +3 work/style.css`); committed `index.html` = work copy minus the `tokens.css` link; Google Fonts links stay in head; no inline `<style>`.
- **File hygiene:** EOF newline on both files; line 1 = `/* Hallmark · pre-emit critique: P5 H4 E4 S4 R5 V5 */`, line 2 = the genre stamp.
- **Commit message:** no AI attribution; one focused commit; **exact-path `git add`**.
- **Smoke data is throwaway** (`/tmp/keystone-5b/07/smoke/`); engine findings in Hallmark output are expected (moat check) — record, never patch.
- **Portable scanning:** macOS awk mishandles `{n,m}` intervals — use `sed -n '/marker/,$p' | grep -E` for post-marker scans.
- **Source-only engine runs need the out dir pre-created** (`mkdir -p`).
- **Working directory:** `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.

## Background (read this if you have zero context)

- Repo: `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`. Plan 5b executes the comparison harness in `test/compare/`: 8 briefs × both skills, scored by this repo's engine, losses published.
- The brainstorm phase ran Hallmark's skill on `test/compare/briefs/07-foundry-compliance.md` (verbatim: *"Build a landing page for Foundry — SOC2 and ISO 27001 compliance automation for B2B SaaS. Show: how many companies got compliant, what it costs, who uses it. Audience: founders + CTOs. Tone: technical but trustworthy."*). Hallmark picked: genre **modern-minimal** · macrostructure **Bento Grid** · nav **N1b** (SaaS three-section, Coral-styled) · footer **Ft2** (inline single line) · theme **Coral** (warm-grey paper, warm coral accent, Geist throughout) · enrichment none.
- **The build's defining move:** the brief asks to show the customer count but supplies no number — the honest-copy discipline applies the *number-shaped hole*: one bento tile carries `—` + "number to confirm before launch". The engine may flag contrast or label patterns on that tile; findings are recorded, never patched. The page claims Hallmark's slop test at 58/58.

---

### Task 1: Mechanical artifact verification

**Files:**
- Verify only: `candidates/07-foundry-compliance/hallmark/{index.html,style.css}`
- Verify only (transformation sources): `/tmp/keystone-5b/07/hallmark-work/{index.html,style.css,tokens.css}`

**Interfaces:**
- Consumes: the packaged files and their scratch transformation sources.
- Produces: pass/fail per check for the Task 3 report.

- [ ] **Step 1: Directory contract**

```bash
ls candidates/07-foundry-compliance/hallmark/
```

Expected: exactly `index.html` and `style.css`.

- [ ] **Step 2: Stylesheet wiring**

```bash
grep -c 'rel="stylesheet"' candidates/07-foundry-compliance/hallmark/index.html
grep -c 'href="tokens.css"' candidates/07-foundry-compliance/hallmark/index.html
grep -c '<style' candidates/07-foundry-compliance/hallmark/index.html
grep -n 'href="style.css"' candidates/07-foundry-compliance/hallmark/index.html
```

Expected: `2`, `0`, `0`; exactly one `style.css` hit in `<head>`.

- [ ] **Step 3: Packaging transformation — byte-exact**

```bash
{ head -2 /tmp/keystone-5b/07/hallmark-work/style.css; \
  cat /tmp/keystone-5b/07/hallmark-work/tokens.css; \
  tail -n +3 /tmp/keystone-5b/07/hallmark-work/style.css; } \
  | diff - candidates/07-foundry-compliance/hallmark/style.css && echo "CSS-contract OK"
python3 - <<'EOF'
work = open('/tmp/keystone-5b/07/hallmark-work/index.html').read()
expect = work.replace('  <link rel="stylesheet" href="tokens.css">\n', '')
committed = open('candidates/07-foundry-compliance/hallmark/index.html').read()
print('INDEX-contract OK' if committed == expect else 'INDEX-contract FAIL')
EOF
```

Expected: `CSS-contract OK` and `INDEX-contract OK`.

- [ ] **Step 4: Two-line stamp head**

```bash
head -2 candidates/07-foundry-compliance/hallmark/style.css
```

Expected, exactly:

```
/* Hallmark · pre-emit critique: P5 H4 E4 S4 R5 V5 */
/* Hallmark · genre: modern-minimal · macrostructure: Bento Grid · theme: Coral · enrichment: none · nav: N1b · footer: Ft2 */
```

- [ ] **Step 5: EOF newlines**

```bash
tail -c 1 candidates/07-foundry-compliance/hallmark/index.html | od -An -c
tail -c 1 candidates/07-foundry-compliance/hallmark/style.css | od -An -c
```

Expected: both `\n`.

- [ ] **Step 6: Token discipline — 9 OKLCH confined; portable post-marker scan**

```bash
grep -c 'oklch(' candidates/07-foundry-compliance/hallmark/style.css
sed -n '/Global clip/,$p' candidates/07-foundry-compliance/hallmark/style.css | grep -nE 'oklch\(|#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\('
sed -n '/Global clip/,$p' candidates/07-foundry-compliance/hallmark/style.css | grep 'font-family:' | grep -v 'var(--font-'
```

Expected: `9` (paper, paper-2, ink, muted, rule, rule-strong, accent, focus, link — all in `:root`); then **no output** from both scans.

- [ ] **Step 7: Link states, pills, mono-outlier budget, darkened hovers — this build's surface**

```bash
grep -c ':hover\|:focus-visible\|:active\|:disabled' candidates/07-foundry-compliance/hallmark/style.css
grep -c 'white-space: nowrap' candidates/07-foundry-compliance/hallmark/style.css
grep -c 'font-style: italic' candidates/07-foundry-compliance/hallmark/style.css
grep -c 'var(--font-mono)' candidates/07-foundry-compliance/hallmark/style.css
grep -n 'hover {' candidates/07-foundry-compliance/hallmark/style.css | grep -c 'nav-cta\|solid'
grep -n 'background-color: var(--color-accent)' candidates/07-foundry-compliance/hallmark/style.css
```

Expected: `20` state lines (5 selector groups × 4 states: `.nav-links a`, `.nav-cta`, the `.cta-solid/.cta-outline/.tier-cta` group, `.wordmark`, `.foot-inline a`); `4` nowrap lines (wordmark, nav links, nav pill, CTA group); `0` italics; `2` mono slots (stat number + framework chips); **0** pill hovers flipping to the light accent (iteration-2 fix: `.nav-cta:hover`/`.cta-solid:hover` use `--color-link`) — the accent-as-background grep returns **no output**.

- [ ] **Step 8: Honest copy — no proof-metrics, and the stat slot stays a labelled hole**

```bash
grep -nEi '[0-9]+ ?%|[0-9]+×|faster|trusted by|uptime|customers,|50000|50,000' candidates/07-foundry-compliance/hallmark/index.html
grep -n 'number to confirm' candidates/07-foundry-compliance/hallmark/index.html
```

Expected: **no output** from the metric regex (prices `$99/$499` don't match; testimonial quotes are number-free), then exactly **1** hit — the honest stat slot keeps its labelled `—`.

- [ ] **Step 9: Head hygiene**

```bash
grep -n 'name="viewport"' candidates/07-foundry-compliance/hallmark/index.html
grep -n '<html lang="en">' candidates/07-foundry-compliance/hallmark/index.html
```

Expected: one hit each.

**Deliverable of Task 1:** per-check results for the Task 3 report.

---

### Task 2: Render smoke at the protocol viewports (throwaway output)

**Files:**
- Read: `candidates/07-foundry-compliance/hallmark/{index.html,style.css}`
- Create (throwaway): `/tmp/keystone-5b/07/smoke/**`

**Interfaces:**
- Consumes: `engine/check-gates.mjs --render`.
- Produces: five screenshots + the recorded engine-findings line for the Task 3 report. Not the official score.

- [ ] **Step 1: Full render**

```bash
node engine/check-gates.mjs \
  --html candidates/07-foundry-compliance/hallmark/index.html \
  --css candidates/07-foundry-compliance/hallmark/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/07/smoke
```

Expected: exit 0. (If Playwright cannot launch: `pnpm exec playwright install chromium` once, repeat.)

- [ ] **Step 2: Verify screenshots + read findings**

```bash
ls /tmp/keystone-5b/07/smoke/keystone-render/screenshot-*.png | wc -l
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/07/smoke/keystone-report.json","utf8")); const f=r.results.filter(x=>!x.pass); console.log("rows:",r.total,"pass:",r.pass,"fail:",r.fail,"| failed gates:",[...new Set(f.map(x=>x.gate))].join(", ")||"none"); for(const x of f) console.log(`  G${x.gate} ${x.name}: ${(x.evidence||"").slice(0,120)}`)'
```

Expected: `5`; then the engine's findings line — recorded verbatim for the report. Engine failures in Hallmark output are expected (moat check); interpret only where cross-skill conventions differ (e.g. G20 wants a *Keystone* stamp). **Do not patch.**

**Deliverable of Task 2:** smoke evidence + the findings line for Task 3.

---

### Task 3: Verification report + commit

**Files:**
- Create: `.superpowers/sdd/brief07-hallmark-verification.md` (local SDD artifact — written, **not** committed)
- Commit: `candidates/07-foundry-compliance/hallmark/{index.html,style.css}` and this plan document

**Interfaces:**
- Consumes: Tasks 1–2.
- Produces: the committed candidate pair on `feat/comparison-5b`.

- [ ] **Step 1: Write the verification report**

```bash
mkdir -p .superpowers/sdd
```

Create `.superpowers/sdd/brief07-hallmark-verification.md`:

```markdown
# Brief 07 · Hallmark candidate — verification report

Blind run, no design changes. Checks per plan
`docs/superpowers/plans/2026-08-29-5b-brief07-hallmark-finalize.md`.

| Check | Result |
|---|---|
| Directory contract (2 files) | pass |
| Stylesheet wiring (2 stylesheet links, 0 tokens.css, 0 <style>) | pass |
| Packaging transformation (stamps+tokens+page concat; index minus tokens link) | pass |
| Two-line stamp head | pass |
| EOF newlines (both files) | pass |
| Token discipline (9 oklch in :root; none after Global clip; fonts via var()) | pass |
| Link states (5 groups × 4 states = 20 lines); 4 nowrap; 0 italics; 2 mono slots | pass |
| Darkened pill hovers (no accent-as-background) | pass |
| Honest copy (no proof-metrics; stat slot keeps labelled —) | pass |
| Head hygiene (viewport meta, lang=en) | pass |
| Render smoke (5 viewports, exit 0) | pass |

Smoke engine findings (recorded, not patched): <paste the Task 2 Step 2 line;
interpret only where cross-skill conventions differ, e.g. G20 wants a Keystone stamp>.

Smoke engine rows: local only (/tmp/keystone-5b/07/smoke) — not the official score.
Official scoring: test/compare/run-comparison.mjs after both sides exist.

Attestation: no design edits were made to candidates/07-foundry-compliance/hallmark/
during verification. Any failure above is recorded verbatim, not patched.
```

If any Task 1 check failed: `FAIL: <verbatim finding>` in that row, stop, escalate — no commit.

- [ ] **Step 2: Commit (exact paths; hash-continuity fallback if a parallel lane committed first)**

```bash
git add candidates/07-foundry-compliance/hallmark/index.html \
        candidates/07-foundry-compliance/hallmark/style.css \
        docs/superpowers/plans/2026-08-29-5b-brief07-hallmark-finalize.md
git commit -m "candidates(07): hallmark side — Coral/Bento blind build"
```

If `git commit` reports nothing staged (parallel-lane race, as on brief-04): verify hash continuity instead of re-committing —

```bash
git log --oneline -- candidates/07-foundry-compliance/hallmark/
shasum candidates/07-foundry-compliance/hallmark/style.css
git show <their-commit>:candidates/07-foundry-compliance/hallmark/style.css | shasum | cut -d' ' -f1
```

Accept only if the committed hash equals the working-file hash recorded in Task 1 context; otherwise escalate.

- [ ] **Step 3: Verify the commit contents**

```bash
git show --stat --oneline HEAD
git status --short
git ls-files candidates/07-foundry-compliance/hallmark/
```

Expected: exactly the three files in the commit (or the accepted parallel-lane state); status shows only the known untracked lane files.

**Deliverable of Task 3:** the committed candidate pair + the local report.

---

## Final verification

1. `git log --oneline -- candidates/07-foundry-compliance/hallmark/` shows the candidate commit (or the accepted parallel-lane commit).
2. `git ls-files candidates/07-foundry-compliance/hallmark/` lists exactly `index.html` and `style.css`.
3. The verification report exists with all checks recorded.
4. No file outside `candidates/07-foundry-compliance/hallmark/`, `docs/superpowers/plans/`, and `.superpowers/sdd/` was created or modified by this plan.

## Out of scope (owned elsewhere — do not do in this plan)

- **Keystone-side build for brief 07** — separate skill dispatch at `candidates/07-foundry-compliance/keystone/`.
- **Harness scoring, gallery, vision rows, verdict commits** — `test/compare/README.md` steps 2–3.
- **`test/compare/build-gallery.mjs`** — orchestrator-owned untracked tooling.
- **Any `.gitignore` changes.**
