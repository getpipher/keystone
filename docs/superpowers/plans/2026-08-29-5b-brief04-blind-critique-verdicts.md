# Plan 5b-04 · Brief 04 Meridian blind-critique verdicts — record in the house format

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `test/compare/gallery/04-meridian-manifesto/verdict.md` to the house verdict format — preserving the existing engine-summary and Vision S1 rows, adding the completed blind-critique per-gate record (including Candidate B's G35 highlighter failure), and correcting the failed-gate list to match `verdict.json` — then commit it with exact paths.

**Architecture:** The harness already scored both candidates (`verdict.json`: keystone 47/47 rows → 48/48 clean; hallmark 43/48 rows → 44/48, failed gates 20/27/49/51). The current `verdict.md` (from the bulk pass) carries the engine table and Vision S1 rows but lacks the per-gate blind-critique section and misquotes the failed gates in its moat note (says G40/G49/G51/G54). The brainstorm phase has since judged the four fold captures blind and produced the per-gate record below. This plan writes that record in the same shape the brief-02 restore established (gate verdicts first, Vision S1 preserved, engine summary as the closing anchor).

**Tech Stack:** Markdown + git. No build step.

## Global Constraints

- **Blind protocol:** the per-gate critique is the brainstorm phase's completed judgment — record verbatim; do not re-derive or soften the G35 FAIL.
- **Preserve, don't clobber:** the existing file's engine table and Vision S1 rows are the sibling lane's judging record — carried forward byte-for-byte in substance (S1 confidence ~0.25 stays ~0.25; do not replace with this lane's 0.2 read).
- **Failed-gate list must match `verdict.json`:** hallmark distinct failed gates are **20, 27, 49, 51** — the current file's "G40/G49/G51/G54" note is wrong and gets corrected.
- **Exact-path `git add`**: the verdict.md and this plan doc only. `candidates/07-foundry-compliance/`, other gallery dirs, and `build-gallery.mjs`-related files are owned elsewhere.
- Commit message: no AI attribution; one focused commit.
- Working directory: `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.

---

### Task 1: Rewrite the verdict record in the house format

**Files:**
- Modify: `test/compare/gallery/04-meridian-manifesto/verdict.md`

**Interfaces:**
- Consumes: the existing verdict.md (engine table + S1 rows), the harness `verdict.json` (score source of truth), and the brainstorm phase's completed blind critique (embedded below).
- Produces: the house-format verdict record — gate verdicts, S1 table, engine summary, corrected moat notes.

- [ ] **Step 1: Replace the file content with exactly this**

```markdown
# Brief 04 · Meridian — blind-critique verdicts

Two candidate renders, judged blind (Candidate A / Candidate B) from the fold captures
`keystone/keystone-render/screenshot-{1280,375}.png` and
`hallmark/keystone-render/screenshot-{1280,375}.png` (18-question prompt, gates.md
§ The vision pass). Mapping by directory provenance, recorded after judging.

Brief (verbatim): "Make me a manifesto for my new studio called Meridian. We work on
environmental products. No flashy stuff."

## Gate verdicts — blind judgment, both candidates

A: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 clean:
no numeric claims in the fold | G47 P | G35 P | G36 P | S1 NO 0.15 | S2 A manifesto for
an environmental studio that leads with durability and repair-over-replacement — the
brief, not a generic page.

B: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 clean:
no numeric claims in the fold | G47 P | G35 F | G36 P | S1 NO 0.20 | S2 "We make things
the world can keep," repair more than replace — the environmental-studio brief, precisely.

## Gate notes (where the one-word verdict needs the sentence)

- **G35 (B)**: the light-green highlighter band behind pale "KEEP." sits low — it
  extends below the serif's baseline like a fat underline, and where the band crosses
  the letters it washes the pale strokes out against the dark ground. A fails in both
  the documented senses: position (band at/below baseline, not behind the x-height of
  the caps) and legibility at the crossing.
- **G44 (A + B)**: all hero content sits inside the 800px fold on both sides; neither
  page defines a hero button (manifesto register — the nav links carry contact), so
  there is no CTA to push below the fold.
- **G43 (both)**: the footer is below the fold in both captures; judged from the
  shipped structure — neither side shows the 4-column + social-row fingerprint.
- **G29 (both)**: A is near-white with a single ink and one muted-red ordinal accent;
  B alternates a dark-green hero band with light sage prose — one green family, flat
  surfaces, no mesh.
- **G46 (both)**: clean — no counts, percentages, or multipliers anywhere in the folds.

## Vision S1 — both sides, same 18-question prompt

| Side | S1 | Confidence | Evidence (1280 + 375) |
|---|---|---|---|
| Keystone | NO | ~0.15 | near-white/black poster simplicity borders on generic brutalist; the muted-red ordinals read deliberate |
| Hallmark | NO | ~0.25 | all-caps serif display with a green band behind KEEP. — striking but theatrical; italic body emphasis |

Mobile (375): A — wordmark + Contact link hold, headline scales, no overflow; B —
wordmark + "Write to us" hold, display wraps cleanly on the dark band.

## Engine summary (from verdict.json — the moat check)

| Side | Score | Distinct failed gates |
|---|---|---|
| Keystone | **48/48 (rows 47/47)** | none |
| Hallmark | **44/48 (rows 43/48)** | G20, G27, G49, G51 |

Moat notes: G20 (missing *Keystone* stamp) is a cross-skill convention difference;
G27 (motion without reduced-motion fallback), G49 (two-line clickable text), and G51
(display headers without long-word wrap) are craft failures the moat exists to catch.
Vision concurs with the engine: keystone clean, and the vision's one FAIL (B/G35 —
highlighter band low + letter washout) is a craft finding the engine's G51 sweep on the
same page corroborates in spirit. Losses published: Hallmark loses brief 04.
```

- [ ] **Step 2: Verify**

Run: `grep -c '^|' test/compare/gallery/04-meridian-manifesto/verdict.md && grep -n "G20, G27, G49, G51" test/compare/gallery/04-meridian-manifesto/verdict.md && grep -c "G35 F" test/compare/gallery/04-meridian-manifesto/verdict.md`
Expected: table-row count ≥ 8 (engine table 4 + S1 table 4); the corrected gate list present; the G35 FAIL recorded.

---

### Task 2: Commit

**Files:**
- Commit: `test/compare/gallery/04-meridian-manifesto/verdict.md` (modified) and `docs/superpowers/plans/2026-08-29-5b-brief04-blind-critique-verdicts.md` (this plan document)

**Interfaces:**
- Consumes: Task 1.
- Produces: the house-format verdict record committed on `feat/comparison-5b`.

- [ ] **Step 1: Stage exact paths and commit**

```bash
cd /Users/rector/local-dev/getpipher/keystone
git add test/compare/gallery/04-meridian-manifesto/verdict.md docs/superpowers/plans/2026-08-29-5b-brief04-blind-critique-verdicts.md
git commit -m "gallery(04): meridian blind-critique verdicts — G35 highlighter fail recorded, gate list corrected"
```

Expected: one commit, exactly the modified verdict.md + this plan doc. If the parallel lane has already committed a house-format verdict.md for brief 04, diff before overwriting: keep whichever is more complete, and never delete the other lane's G35/G44 evidence.

- [ ] **Step 2: Verify the commit contents**

```bash
git show --stat --oneline HEAD | tail -4
git status --short
```

Expected: HEAD lists exactly the verdict.md + the plan doc; `git status` shows only the sibling lanes' known-untracked files (`candidates/07…/08…` residue if any, `build-gallery.mjs`, the brief02-verify plan doc).

---

## Final verification

1. `test/compare/gallery/04-meridian-manifesto/verdict.md` carries: gate verdicts (A all-P; B with the G35 F), the preserved Vision S1 table, the engine summary with the **corrected** failed-gate list (20, 27, 49, 51), and the judgment summary.
2. `git status --short` clean of anything this plan doesn't own.
3. The B/G35 FAIL is recorded verbatim — published losses and findings, per the protocol.

## Out of scope (owned elsewhere)

- **Keystone-side brief 07/08 finalize plans**, **harness/gallery tooling**, **briefs 05–08 gallery verdicts** (already recorded by their lanes), and **any design changes to candidates/** — none belong to this plan.
