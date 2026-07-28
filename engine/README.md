# Keystone engine

The executable gate engine. Runs ~40 deterministic anti-slop gates against an HTML/CSS page and emits a report.

## Run

```bash
node engine/check-gates.mjs --html path/to/page.html --css path/to/page.css --out ./reports
```

Writes `keystone-report.json` + `keystone-report.html` to `--out`.

## Gate coverage (Phase 1)

G1 banned fonts · G2 gradient text · G3 three-col cards · G7 pure black/white · G22 zero-chroma · G26 missing states · G34 horizontal scroll · G40-41 contrast · G44 hero fit · G48 token improvisation · G50 image-grid minmax · G54 tag-left/heading-right · G8/32 diversification.

The remaining ~28 deterministic gates follow the same detector pattern and ship in Plan 1b. Vision gates (~18) ship in Plan 3 with the `@getpipher/vision` integration.

## Architecture

See `docs/superpowers/specs/2026-07-27-keystone-design.md` §4 and `docs/superpowers/plans/2026-07-27-keystone-engine.md`.