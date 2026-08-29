# Plan 5b-05 · Brief 05 Tracejam blind-critique verdicts — record in the house format

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `test/compare/gallery/05-tracejam-saas/verdict.md` to the house verdict format — adding the completed blind-critique per-gate record (headline finding: **A/G44 FAIL — the ⌘K command palette renders stuck open over the hero on BOTH viewports**, occluding the headline; A also carries the set's largest engine deficit), preserving the Vision S1 rows, and correcting the moat-note failed-gate list to match `verdict.json` — then commit with exact paths.

**Architecture:** Everything else is already in place and committed: both candidate sides (`e591c2a` keystone / hallmark side), the harness scores (`verdict.json`: keystone 47/47 rows → 48/48 clean; hallmark 37/114 rows → 38/48, failed gates **1, 4, 20, 23, 26, 39, 40, 49, 51, 54** — the largest deficit in the set, +10), and the raw blind record (`verdict-blind.md`, committed in `bcd7983`). The bulk-format `verdict.md` predates the blind critique and (a) has no per-gate record, (b) misquotes the failed gates as "G40/G49/G51/G54" when the JSON lists ten. This plan folds the blind record in, preserves the S1 rows, and corrects the list. No candidate file is touched.

**Tech Stack:** Markdown + git. No build step.

## Global Constraints

- **Blind protocol:** the per-gate record is the completed blind judgment (embedded from `verdict-blind.md` verbatim) — record as-is; do not re-derive, do not soften A's G44 FAIL or the S1 rows.
- **Preserve, don't clobber:** the bulk file's Vision S1 rows are a lane's judging record — carried forward; this dispatch's lighter re-read (A: NO ~0.30, same stuck-palette tell) is appended as a noted second read, not substituted.
- **Failed-gate list must match `verdict.json`:** hallmark distinct failed gates are **1, 4, 20, 23, 26, 39, 40, 49, 51, 54** — the current "G40/G49/G51/G54" note is incomplete and gets corrected.
- **Exact-path `git add`**: `verdict.md` + this plan doc only. All other gallery files (renders, scores, `verdict-blind.md`, `verdict.json`) are already committed — do not re-add or modify them.
- Commit message: no AI attribution; one focused commit.
- Working directory: `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.

---

### Task 1: Rewrite the verdict record in the house format

**Files:**
- Modify: `test/compare/gallery/05-tracejam-saas/verdict.md`

**Interfaces:**
- Consumes: the existing bulk-format verdict.md (engine table + S1 rows — preserved), the committed `verdict-blind.md` (the per-gate record — folded in), and `verdict.json` (the corrected gate list source).
- Produces: the house-format verdict record — gate verdicts first, Vision S1 preserved (with the second-read note), corrected engine summary, losses published.

- [ ] **Step 1: Replace the file content with exactly this**

```markdown
# Brief 05 · Tracejam — blind-critique verdicts

Two candidate renders, judged blind (Candidate A / Candidate B) from the fold captures
`hallmark/keystone-render/screenshot-{1280,375}.png` and
`keystone/keystone-render/screenshot-{1280,375}.png` (18-question prompt, gates.md
§ The vision pass). Mapping by directory provenance, recorded after judging. The raw
A/B record also lives in `verdict-blind.md` (same judgment, verbatim).

Brief (verbatim): "Build a landing page for Tracejam — a tracing/observability tool for
distributed systems. Audience: SREs and platform engineers. Use case: try it / contact
sales. Tone: technical."

## Gate verdicts — blind judgment, both candidates

A: G6 P | G9 P | G29 P | G42 P | G43 P | G44 F | G45 P | G38a P | G30 P | G46 clean: no
metric claims visible | G47 P | G35 P | G36 P | S1 YES 0.55 | S2 Register matches the
brief (technical SaaS tracing), but it reads as a product-template draft with a broken
overlay state.

B: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 flag:
"212 spans · 3 services · 186ms" — demo-output fiction inside the terminal blocks, not a
page claim | G47 P | G35 P | G36 P | S1 NO 0.20 | S2 Feels like this brief — capture /
query / diff beside their real terminal proofs, OpenTelemetry and sidecars in the prose:
an SRE's tool page.

## Gate notes (where the one-word verdict needs the sentence)

- **G44 (A — the headline finding)**: the ⌘K command palette renders **stuck open over
  the hero on BOTH viewports**, dimming and occluding the headline — at first paint the
  page presents a broken overlay state, not the product. On mobile the palette covers
  the entire viewport.
- **G44 (B)**: eyebrow, headline, lede, and the primary CTA are all inside the 800px
  fold; nothing critical below it.
- **G43 (both)**: the footer is below the fold in both captures; judged from the shipped
  structure — neither side shows the 4-column + social-row fingerprint.
- **G46 (A)**: clean — the demo panel is abstract bars, no figures visible in the fold.
- **G46 (B)**: "212 spans · 3 services · 186ms" sit inside the terminal blocks — the
  command's own stdout fiction, not a page proof-claim. Flagged for completeness.
- **G38a (both)**: zero italics in either render.

## Vision S1 — both sides, same 18-question prompt

| Side | S1 | Confidence | Evidence (1280 + 375) |
|---|---|---|---|
| Keystone | NO | ~0.20 | ink-filled buttons, mono-in-prose, span waterfall with one deep-cobalt hit bar — reads Linear-era tool |
| Hallmark | YES | ~0.50 | the ⌘K command palette renders OPEN over the hero on BOTH viewports — a stuck-overlay broken-state tell; greyed hero beneath; logo wall row — reads product-template |

Second independent read (this dispatch): the palette-stuck-open finding was confirmed;
confidence landed NO ~0.30 for A on the view that the register itself is
well-executed — the divergence is weighting of the same tell, recorded here for the
published record's honesty.

## Engine summary (from verdict.json — the moat check)

| Side | Score | Distinct failed gates |
|---|---|---|
| Keystone | **48/48 (rows 47/47)** | none |
| Hallmark | **38/48 (rows 37/114)** | G1, G4, G20, G23, G26, G39, G40, G49, G51, G54 |

Moat notes: G20 (missing *Keystone* stamp) is a cross-skill convention difference;
G1 (banned display font), G4 (nested cards), G23 (accent wash >5%), G26 (missing
interaction states), G39 (input field states), G40 (contrast, Lc < 60), G49 (two-line
clickable text), G51 (display headers without long-word wrap), and G54 (tag-left /
heading-right) are craft failures the moat exists to catch — brief 05 carries the
largest single-brief deficit in the set (keystone +10). Vision concurs with the
engine: the palette-stuck-open state is both the vision headline and an engine G26/G39
signal. Losses published: Hallmark loses brief 05, by the widest margin recorded.
```

- [ ] **Step 2: Verify**

Run: `grep -n "stuck open" test/compare/gallery/05-tracejam-saas/verdict.md && grep -n "G1, G4, G20, G23, G26, G39, G40, G49, G51, G54" test/compare/gallery/05-tracejam-saas/verdict.md && grep -c '^|' test/compare/gallery/05-tracejam-saas/verdict.md`
Expected: the G44 headline finding present; the corrected ten-gate list present; table-row count ≥ 8 (engine table 4 + S1 table 4, plus any split rows).

---

### Task 2: Commit

**Files:**
- Commit: `test/compare/gallery/05-tracejam-saas/verdict.md` (modified) and `docs/superpowers/plans/2026-08-29-5b-brief05-blind-critique-verdicts.md` (this plan document)

**Interfaces:**
- Consumes: Task 1.
- Produces: the house-format verdict record committed on `feat/comparison-5b`.

- [ ] **Step 1: Stage exact paths and commit**

```bash
cd /Users/rector/local-dev/getpipher/keystone
git add test/compare/gallery/05-tracejam-saas/verdict.md docs/superpowers/plans/2026-08-29-5b-brief05-blind-critique-verdicts.md
git commit -m "gallery(05): tracejam blind-critique verdicts — A/G44 stuck-palette fail recorded, gate list corrected"
```

Expected: one commit, exactly the modified verdict.md + this plan doc. If the parallel lane has already committed a house-format verdict.md for brief 05, diff before overwriting: keep whichever carries the G44 headline finding and the corrected gate list, and never delete the other lane's evidence.

- [ ] **Step 2: Verify the commit contents**

```bash
git show --stat --oneline HEAD | tail -4
git status --short
```

Expected: HEAD lists exactly the verdict.md + the plan doc; `git status` clean (the sibling lanes committed everything else in the bulk passes).

---

## Final verification

1. `test/compare/gallery/05-tracejam-saas/verdict.md` carries: the blind-critique gate verdicts (A with the G44 FAIL; B all-P with the G46 flag), the preserved Vision S1 table (+ second-read note), the engine summary with the **corrected** ten-gate failed list, and the losses-published summary.
2. `git status --short` clean — nothing this plan doesn't own left behind.
3. The A/G44 FAIL is recorded verbatim — the largest published deficit and its headline vision finding, per the protocol.

## Out of scope (owned elsewhere)

- **Hallmark/keystone-side candidate builds for briefs 05–08** — committed; no candidate file is touched.
- **Briefs 01–04 verdict records, other gallery dirs, harness scoring** — recorded by their lanes.
- **`test/compare/build-gallery.mjs`, `index.html`, `PROTOCOL.md`** — gallery tooling/state, owned by the orchestrator lanes.
- **Any `.gitignore` changes.**
