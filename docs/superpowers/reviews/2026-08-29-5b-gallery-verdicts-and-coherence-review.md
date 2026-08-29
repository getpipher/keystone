# Review · Plan 5b gallery verdicts (brief 02) + gallery-wide coherence audit

Reviewer: implement/review phase, 2026-08-29. Scope: the brief-02 gallery-verdicts
implementation (`docs/superpowers/plans/2026-08-29-5b-brief02-gallery-verdicts.md`,
executed via `dd96455`/`1d4d3e8`) against its plan, plus a coherence audit of the
complete 8-brief gallery now that every brief carries both candidate sides.
Read-only review; no candidate or gallery file was modified.

## Plan conformance — brief02-gallery-verdicts

| Plan task | Status | Evidence |
|---|---|---|
| Task 1: verdict.md written (A/B lines, moat table, G46 quotes) | pass | committed `dd96455`; final form merged with the parallel lane's head-to-head table at `c0ea355` |
| Task 2: scores cross-checked vs verdict.json | pass | re-run twice (execution + review): keystone 47/47 → 48/48; hallmark 43/61 → 44/48, gates 20/26/40/49 — matches verdict.json exactly |
| Task 3: exact-path commit | pass | `dd96455` = 15 files, all under `gallery/02-streampipe-cli/` + plan doc; sweep check clean |
| Plan doc status accuracy | fixed this review | header claimed "Not yet executed" after execution; corrected + committed `1da6351` |

Concurrent-lane incidents during execution (resolved): the orchestrator summary pass
(`cf8d79b`) clobbered verdict.md files repo-wide with compact rows; `c0ea355` restored
the blind verdicts with the engine table as addendum. Final committed verdict.md retains
the full per-gate A/B judgment — verified complete.

## Gallery-wide coherence audit — all 8 briefs

- **index.json == per-brief verdict.json**: 8/8 briefs, both sides, exact match
  (rows, totals, score48, distinctFailedGates).
- **score.json present**: 16/16 (8 briefs × 2 sides).
- **index.html faithful to index.json**: all 8 brief names + all 16 per-side score48
  values present in the committed gallery HTML.
- **Aggregate scores**: keystone 384/384 (perfect 48/48 on all eight builds — zero
  failed gate numbers anywhere in the keystone set); hallmark 348/384; delta +36
  gates total, +4.5 per brief.

## Findings

### Important

1. **Headline success criterion measures +4.5 gates/brief — below the stated ≥5**
   (`test/compare/README.md` § Success criteria: "Keystone ≥ Hallmark by ≥5 gates on
   average across the 8 briefs"). Measured: keystone avg 48.0 vs hallmark avg 43.5
   (delta 36/8 = 4.5). The shortfall is driven entirely by briefs 03 and 06, where
   Hallmark's *only* failed gate is G20 (missing Keystone stamp — a cross-skill
   convention, not a craft defect). Excluding G20 as convention, the craft-only delta
   is lower still (28 hallmark instances vs 0 keystone → avg 3.5). **Orchestrator
   decision needed**: either refine the criterion (convention-adjusted basis) or
   publish the 4.5 result as measured — the losses/limits-honesty clause cuts both
   ways, and redefining the bar post-hoc to clear it would be the rigged-demo move
   the protocol exists to prevent. Not a build defect; a criteria-vs-measurement
   decision on a committed claim.

### Minor

2. **Brief 03 has two verdict files** — `verdict.md` (committed with its finalize
   plan) and `verdict-blind.md` (untracked, the parallel judging lane's record), plus
   a filename inconsistent with the other 7 lanes' `verdict.md`. The sibling lane is
   mid-flight; consolidate to one authoritative `verdict.md` when it lands.
3. **verdict.md format heterogeneity across lanes** — brief 01 uses "blind vision
   judgment" with A=Hallmark/B=Keystone ordering; briefs 02–08 use "verdict —
   Keystone vs Hallmark". No build risk (`build-gallery.mjs` consumes `index.json`
   only, never verdict.md), but a one-paragraph format note in PROTOCOL.md would
   spare the next reader the archaeology.
4. **Moat evidence worth surfacing in the final gallery**: brief 05's Hallmark side
   failed 10 gates including G1 (banned fonts), G4 (nested cards), G23 (accent wash),
   G39 (input states) — the strongest single demonstration that the engine catches
   real Hallmark defects. The moat criterion passes decisively: 36 distinct
   failed-gate instances across 8 briefs (28 excluding the G20 convention) vs the
   ≥8 bar.

### Strengths

- Keystone set is **perfect**: 48/48 on all eight builds, zero failed gate numbers —
  the deterministic-gate discipline (deep contrast tokens, per-selector state
  quartets, no-inline-comment/no-hr/no-clamp-without-guards trap knowledge) held
  across five different theme/macro combinations.
- The full evidence chain is committed and coherent: candidates → renders → dumps →
  scores → verdict.json → verdict.md → index.json → index.html, cross-checked at
  every layer.
- Both Hallmark losses-with-dignity cases (briefs 03/06, G20-only) are recorded as
  convention differences rather than inflated into wins — the protocol's honesty
  held on both sides.

## Assessment

The reviewed implementation conforms to its plan; the gallery is coherent end-to-end.
The one decision above the implement phase's authority is finding 1: the stated ≥5-gate
success criterion measures 4.5 as-defined, and the orchestrator should either refine the
criterion (documenting the G20 convention adjustment) or publish 4.5 as the honest result
alongside the decisive moat check. Briefs 07–08 keystone sides are already committed; no
blocking work remains in the reviewed scope.
