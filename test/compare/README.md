# The comparison harness (executed in Plan 5b)

The Tier-4 proof: **the same brief, run through both skills, scored by the same
engine.** This directory ships the tooling; the runs are Plan 5b.

## The 8 briefs

Verbatim prompts from Hallmark's own test suite (`site/_tests/`, MIT, credited
in NOTICE) — selected to span consumer / dev tool / local / editorial / B2B /
personal / enterprise / education. See `briefs/*.md`.

## The protocol (airtight, from spec §8)

1. **Same brief verbatim** into each skill — the `briefs/NN-slug.md` prompt, unedited.
2. **Both run with NO human intervention** — the brief already says "go ahead"
   where Hallmark's flow offers the opt-out; Keystone's context gate is answered
   by the brief's audience/use/tone.
3. **Same model both sides.** The comparison must measure the *skills*, not the
   model. One strong model, both skills, recorded in the gallery.
4. **Both outputs rendered by our Playwright** at 1280 / 768 / 414 / 375 / 320.
5. **Both scored by our engine** — the same 48 gate numbers we score our own
   examples with (`run-comparison.mjs` does the render + score).
6. **Vision S1** ("does this look AI-generated?") asked of both screenshots,
   same 18-question prompt, verdicts appended to the gallery.
7. **Losses are published.** If Hallmark wins a brief, the gallery says so. A
   rigged demo destroys the "trust the gates" thesis.

## Running it

1. Build candidates (5b): for each brief dir, run BOTH skills with the verbatim
   prompt, no intervention, and lay the outputs out as:
   ```
   candidates/01-tide-podcast/
   ├── hallmark/{index.html, style.css}
   └── keystone/{index.html, style.css}
   ```
2. Score + collect:
   ```bash
   node --import tsx test/compare/run-comparison.mjs --candidates candidates --out test/compare/gallery
   ```
3. Apply `gallery/index.template.html` over `gallery/index.json`, append the
   vision rows to each `gallery/<brief>/verdict.md`, commit everything
   — including the losses.

## Success criteria (spec §8) — measured 2026-08-29

| Criterion | Target | Measured | Verdict |
|---|---|---|---|
| Engine-score margin | Keystone ≥ Hallmark by ≥5 gates avg | **+4.5** (48.0 vs 43.5) | **MISSED** by 0.5 |
| Vision S1 (Keystone avg) | ≤ 0.30 | **0.25** (0/8 YES) | **PASSED** |
| Vision S1 (Hallmark avg) | ≥ 0.50 | **0.39** (2/8 YES) | **MISSED** |
| Moat check | ≥8 real gate failures in Hallmark output | **12 distinct gates / 28 instances** | **PASSED** |

Full conditions and the sensitivity note (the stamp-metadata gate G20) in
[`gallery/PROTOCOL.md`](gallery/PROTOCOL.md). Headlines:

- Keystone shipped 48/48 on all 8 briefs through the real engine loop; no
  brief was lost, with two near-ties (03, 06) published as the ties they are.
- The moat exists: every Hallmark build shipped real failures its prose
  Step-7 could not see — contrast pairs below floor, missing interaction
  states, nested cards, two-line clickables, wrap-prop gaps — and on brief 05
  a page whose hero is unreachable behind a ⌘K palette stuck open at load.
- 1.0.0 was NOT cut on this run: the headline margin missed by half a gate.

The executed gallery (both pages per brief, screenshots at 5 viewports,
scores, per-brief verdicts): [`gallery/index.html`](gallery/index.html) —
served or opened directly; entries are inlined.
