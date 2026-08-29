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

## Success criteria (spec §8)

- Keystone ≥ Hallmark by ≥5 gates on average across the 8 briefs.
- Vision S1 confidence: Keystone ≤ 0.30, Hallmark ≥ 0.50 (averaged).
- **The moat check:** our engine finds ≥8 real gate failures in Hallmark's
  output across the 8 briefs — failures Hallmark's own model claimed passed.
  If the engine can't catch Hallmark cutting corners, the moat doesn't exist.
