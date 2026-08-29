# Plan 5b-01 · Brief 01 Tide — vision judgment recorded in the gallery

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Record the completed blind vision judgment for comparison brief 01 (Tide) into `test/compare/gallery/01-tide-podcast/verdict.md` — per-gate verdicts with evidence for BOTH candidates — and commit the brief-01 gallery evidence, losses included.

**Architecture:** The harness (`run-comparison.mjs`) has already rendered and engine-scored both candidates into `test/compare/gallery/01-tide-podcast/` (`hallmark/score.json`: 41/57 rows, 42/48, failed gates 18/20/26/40/51/54; `keystone/score.json`: 47/47 rows, 48/48 clean). The brainstorm phase judged the four fold captures (1280 + 375 per candidate) against the 18-question prompt. This plan writes that judgment to `verdict.md` (the protocol's vision-row record), keeping it strictly separate from the engine rows, and commits the brief-01 evidence. No design files are touched; no scores are altered.

**Tech Stack:** Markdown + git only. No build step.

## Global Constraints

- **Blind protocol:** the judgment is from the rendered PNGs only (already complete — this plan records it verbatim; do not re-derive, do not amend verdicts).
- **Losses are published** (`test/compare/README.md` § The protocol): Hallmark lost brief 01 on the engine (42/48 vs 48/48) and the vision concurs (G44 FAIL) — record as-is, no softening.
- **Vision rows are separate from engine rows:** the engine's deterministic G44-rect check passed for Hallmark; the vision FAIL (primary CTA below the fold in the 800px capture) is recorded as the human/model judgment alongside, without editing the engine rows.
- **Exact-path `git add`** — brief-01 gallery dir only. Briefs 02–08 gallery dirs are pending their own judgment dispatches; `test/compare/build-gallery.mjs` is orchestrator-owned; `docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md` is that lane's untracked artifact. None are committed by this plan.
- No AI attribution; one focused commit; 2-space indent; EOF newline.

## Execution status note

This plan records a judgment that has already been produced by the brainstorm phase; Task 1 writes the record, Task 2 commits it. A reviewer re-verifies by re-reading the four PNGs against the table.

---

### Task 1: Write the verdict record

**Files:**
- Create: `test/compare/gallery/01-tide-podcast/verdict.md`

**Interfaces:**
- Consumes: `verdict.json`/`score.json` (engine rows), the four fold captures, and the brainstorm phase's completed 18-question judgment (reproduced verbatim below).
- Produces: the gallery's vision-row record for brief 01 — the file the gallery step and the published verdict read.

- [ ] **Step 1: Write the file with exactly this content**

```markdown
# Brief 01 · Tide — blind vision judgment

Brief (verbatim): "build me a landing page for my indie podcast called Tide."
Judged from the fold captures: hallmark/keystone-render/screenshot-{1280,375}.png and
keystone/keystone-render/screenshot-{1280,375}.png (18-question prompt, gates.md
§ The vision pass). Engine rows below are from verdict.json — recorded separately,
not judged here.

## Engine scores (harness, for context)

- Hallmark — 41/57 rows · **42/48** · failed gates: 18, 20, 26, 40, 51, 54
- Keystone — 47/47 rows · **48/48** · no failed gate numbers

## Vision judgment — Candidate A (Hallmark)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | masthead is centred but the headline/lede are left-anchored — not one centred axis |
| G9 equal-whitespace sections | PASS (1280) | nothing above the fold repeats; the void → headline sequence is one rhythm, not two identical ones |
| G29 abstract background | PASS (1280) | flat warm cream; a single blue accent word in the headline |
| G42 nav fingerprint | PASS (1280) | centred masthead with 3 links beneath — not wordmark-left + 4–5 links + button + hairline |
| G43 footer fingerprint | PASS | no footer visible in the fold; no link grid or social row anywhere in the capture |
| G44 hero fit | FAIL (1280) | no primary CTA visible without scrolling; a ~340px dead band separates the masthead from the headline, and the lede is clipped at the fold edge |
| G45 decorative-without-purpose | PASS (1280) | no ornament — the dead band is empty space, not decoration |
| G38a italic headers | PASS (both) | masthead and headline roman |
| G30 icon tells | PASS (both) | no icons, no emoji |
| G46 invented metrics | clean (both) | no numeric claims visible in the fold |
| G47 re-drawn chrome | PASS (both) | no frames |
| G35 highlighter band | PASS (both) | no highlighter band; the accent is a coloured word in the headline |
| G36 flex align | PASS (1280) | nav links align with the masthead text; no button/text height mismatch |
| S1 looks AI-generated? | NO 0.25 | tells: the dead band mid-fold reads like a layout artifact, and the lede is clipped at the fold edge; the serif masthead and restrained palette otherwise read hand-made |
| S2 feels like this brief? | YES | "Conversations that come in with the tide," ferrymen, marine researchers, lighthouse keepers — the Tide brief, not a generic page |

Mobile (375): masthead stacks cleanly (est. line wraps to two lines, wordmark, 3
single-line links), hairline, headline begins immediately — no dead band, no
overflow. Structure gates unaffected.

## Vision judgment — Candidate B (Keystone)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | masthead is centred but the lede and episode list sit left in the measure — off-axis content carries the page |
| G9 equal-whitespace sections | PASS (1280) | nav → letter lede → hairline-separated episode rows: three distinct rhythms |
| G29 abstract background | PASS (1280) | flat rose paper; the cyan/magenta inks are foreground punctuation (wordmark shadow, double rule), the background is one flat colour |
| G42 nav fingerprint | PASS (1280) | centred masthead + 3 links beneath; not the wordmark-left + 4–5-link + button + hairline cluster |
| G43 footer fingerprint | PASS | no footer visible in the fold; no link grid or social row anywhere in the capture |
| G44 hero fit | PASS (1280) | est. line, wordmark, nav, lede, and the first listen link all sit inside the fold |
| G45 decorative-without-purpose | PASS (1280) | the off-register wordmark shadow and two-ink double rule are the page's identity device — motivated by the print/tide idea |
| G38a italic headers | PASS (both) | everything roman |
| G30 icon tells | PASS (both) | no icons, no emoji |
| G46 invented metrics | clean (both) | only episode metadata (№ 14 · 28 min · 12 June 2026) — episode facts, not proof-metrics |
| G47 re-drawn chrome | PASS (both) | bare typographic rows; no window frames |
| G35 highlighter band | PASS (both) | no highlighter band |
| G36 flex align | PASS (1280) | nav links align; no button/text height mismatch |
| S1 looks AI-generated? | NO 0.15 | tells: the two-ink shadow is unusual (reads deliberate), episode-row rhythm is uniform; otherwise reads hand-set |
| S2 feels like this brief? | YES | fortnightly sea-walks, Falmouth chandlery, lighthouse-keeper's ledger — this brief, not a generic page |

Mobile (375): masthead stacks (est. line, wordmark, 3 single-line links), two-ink
rule intact, no overflow. Structure gates unaffected.

## Judgment summary

Vision concurs with the engine: Keystone 48/48 vs Hallmark 42/48, and the vision's
one FAIL (A/G44 — no CTA in the fold, dead band above the headline) is the fold-level
version of Hallmark's own engine findings (G51 wrap guards missing across eight
masthead/hero rules; G54 episode label-beside-heading). Losses published: Hallmark
loses brief 01.
```

- [ ] **Step 2: Verify**

Run: `head -6 test/compare/gallery/01-tide-podcast/verdict.md && grep -c '^|' test/compare/gallery/01-tide-podcast/verdict.md`
Expected: the title block; `grep -c` counts 36 table rows (2×16 gate/verdict rows + 2×2 header/separator rows) — a count of 36 or 37 (trailing newline variance) is fine; the file ends with the judgment-summary paragraph.

---

### Task 2: Commit the brief-01 gallery evidence + judgment

**Files:**
- Commit: `test/compare/gallery/01-tide-podcast/` (verdict.md, both score.json, both keystone-render/ evidence dirs)

**Interfaces:**
- Consumes: Task 1's verdict.md; the pre-existing harness output in the same directory.
- Produces: the brief-01 evidence committed on `feat/comparison-5b`; briefs 02–08 gallery dirs remain untracked pending their own judgment dispatches.

- [ ] **Step 1: Commit (exact paths — brief 01 only)**

```bash
cd /Users/rector/local-dev/getpipher/keystone
git add test/compare/gallery/01-tide-podcast
git commit -m "gallery(01): tide blind judgment — keystone 48/48 vs hallmark 42/48, vision concurs (G44)"
```

Expected: one commit containing the brief-01 dir (verdict.md, hallmark/keystone score.json, 10 PNGs + dumps across both keystone-render dirs). Briefs 02–08 dirs stay untracked (their judgment dispatches follow). `.gitignore` already negates `!test/compare/gallery/**/*.png`, so no ignore change is needed.

- [ ] **Step 2: Verify the commit contents**

```bash
git show --stat --oneline HEAD | head -25
git status --short
```

Expected: HEAD lists only paths under `test/compare/gallery/01-tide-podcast/` (verdict.md, 2×score.json, 2×10 render files); `git status` still shows briefs 02–08 gallery dirs, `build-gallery.mjs`, and the brief02-verify plan doc as untracked — all owned elsewhere.

---

## Final verification

1. `test/compare/gallery/01-tide-podcast/verdict.md` exists with both candidate tables, the fold-limit and engine-context sections, and the judgment summary.
2. The vision rows are byte-stable against the brainstorm phase's output (the table above) — no re-derivation, no softening of the G44 FAIL.
3. `git status --short` shows briefs 02–08 gallery dirs + `build-gallery.mjs` + the brief02-verify plan doc untracked — nothing else.
4. No design file anywhere in `candidates/` changed.

## Out of scope (owned elsewhere)

- **Judging briefs 02–08** — one blind-judgment dispatch per brief, each writing its own `verdict.md` and committing its own dir.
- **Applying `index.template.html` over `index.json`** — after all eight verdicts are recorded (orchestrator).
- **`test/compare/build-gallery.mjs`** — orchestrator-owned untracked tooling.
- **Any design changes to candidates/** — none, ever, post-run.
