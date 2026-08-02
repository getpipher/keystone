# The Keystone engine

How the executable gate engine works. The model reads this to orchestrate
Step 7 (the engine-verified slop test). For the gate definitions themselves,
see gates.md. For the render extension, see the render tool.

## Three tiers (recap)

| Tier | What | Where | Runs via |
|---|---|---|---|
| Skill | rule-set, catalog, gate definitions | skills/keystone/ | the model reads it |
| Engine | deterministic gate checkers (math + DOM + CSS parse) | engine/ | `node engine/check-gates.mjs` (bash) |
| Extension | headless render + screenshot + computed-styles dump | extensions/render.ts | the `keystone_render` tool |

## The deterministic gates (Phase 1 — shipped)

13 gates are implemented as detector modules in `engine/gates/`:

| Gate | File | What it checks |
|---|---|---|
| G1 banned fonts | `g1-banned-fonts.mjs` | font-family vs ban list (Inter, Roboto, Open Sans, Poppins, Lato) |
| G2 gradient text | `g2-gradient-text.mjs` | background-clip:text + linear-gradient co-occurring |
| G3 three-col cards | `g3-three-col-cards.mjs` | grid-template-columns: 1fr 1fr 1fr with card children |
| G7 pure black/white | `g7-pure-black-white.mjs` | color tokens for #000/#fff/oklch(0 0 0)/oklch(100% 0 0) |
| G8/32 diversification | `g8-32-diversification.mjs` | CSS stamp vs .keystone/log.json last entries |
| G22 zero-chroma | `g22-zero-chroma.mjs` | oklch(L 0 H) in neutral/surface role |
| G26 missing states | `g26-missing-states.mjs` | :hover/:focus-visible/:active/:disabled per interactive selector |
| G34 horizontal scroll | `g34-horizontal-scroll.mjs` | Playwright: scrollWidth > innerWidth per viewport |
| G40-41 contrast | `g40-41-contrast.mjs` | APCA Lc + WCAG ratio on computed color/bg pairs |
| G44 hero fit | `g44-hero-fit.mjs` | Playwright 1280x800: hero bounding rect within innerHeight |
| G48 token improvisation | `g48-token-improvisation.mjs` | color/font-family decls outside :root referencing non-var() values |
| G50 image-grid minmax | `g50-image-grid-minmax.mjs` | 1fr grid track with `<img>` without minmax(0,1fr) |
| G54 tag-left/heading-right | `g54-tag-left-heading-right.mjs` | section head wrapper with eyebrow+heading AND grid-template-columns != 1fr |

The remaining ~28 deterministic gates (G4-6, G9-21, G23-25, G27-33, G35-39,
G42-43, G45-47, G49, G51-53, G55-57) ship in Plan 1b following the same
detector pattern. Vision gates (~18: G6/G29/G42/G43/G44-vis/G45/G30/G46/G47-vis/
G35-vis/G38a/S1-S3) ship in Plan 3 with the @getpipher/vision integration.

## The CLI

```bash
node engine/check-gates.mjs --html <path> --css <path> --out <dir>
```

Flags (from `check-gates.mjs`):
- `--html` — path to the HTML file (required for non-empty `ctx.html`)
- `--css` — path to the CSS file (required for non-empty `ctx.css`)
- `--out` — output directory (default: `.`)

Writes `keystone-report.json` + `keystone-report.html` to `--out`.
Console prints: `PASS <n>/<total> · FAIL <n>/<total> — <out>/keystone-report.html`.

Phase-1 CLI runs the 13 detectors with `viewports: []` and `computedPairs: []`
(empty arrays). The 2 Playwright gates (G34, G44) and the contrast gates
(G40-41) consume render-dump data — until Plan 3 wires `--render`/`--viewports`
flags, pass the dump directly via the orchestrator API or extend the CLI.

## The orchestrator API

```js
import { orchestrate } from "./engine/orchestrate.mjs"

const summary = orchestrate({ html, css, viewports, computedPairs })
// -> { results: GateResult[], pass: number, fail: number, total: number }
```

`orchestrate()` imports all 13 detectors, builds `ctx.projectMemory` from the
CSS stamp (via `extractStamp`) if not supplied, runs each detector, flattens
array results, and returns the summary. **Note:** `orchestrate` mutates `ctx`
(sets `ctx.projectMemory`) — matters for the iterate loop; pass a fresh `ctx`
per iteration or clone.

Each detector is a pure function `(ctx: DetectorContext) => GateResult[]`
(or single `GateResult`). Detectors use `pass(gate, name)` and
`fail(gate, name, evidence, fix, file?, line?)` from `engine/types.mjs`.

## The render extension

```
keystone_render({ htmlPath, viewports?: [1280, 375, 320, 414, 768], outDir?: string })
  -> { screenshots: [{ width, path }], computedStylesPath, domSnapshotPath }
```

Headless Chromium (via `playwright-core`) at exact CSS px widths. Returns
screenshot paths + a computed-styles JSON dump (`computed.json` — up to 200
`{ selector, color, backgroundColor }` pairs from the 1280px pass) + a DOM
snapshot (`dom.html`). Does NOT do contrast math or gate-checking — that's
`check-gates.mjs`. The extension is thin on purpose: rare updates when gates
change.

## The iterate-until-pass loop (Step 7)

7.1 DETERMINISTIC — run `check-gates.mjs`. If any Det gate FAILs, read the
    fix suggestions, apply, re-emit, re-run. Cap: 3 iterations.
7.2 VISION — `keystone_render` at [1280, 375], then `describe_image` with the
    18 vision-gate questions. If any Vis gate FAILs, fix, re-render, re-vision.
    Cap: 2 iterations. (Plan 3.)
7.3 RESOLUTION — 58/58 → "58/58 (engine-verified) — ./keystone-report.html".
    Failures remain → "N/58 — fails: <#s> (engine-verified)". Ship with
    declared failures, never silently claim pass.
7.4 STAMP + LOG — CSS stamp: `/* Keystone · macrostructure: <name> · ... ·
    gates: 58/58 engine-verified */`; append `.keystone/log.json`.

## The report

`keystone-report.html` is openable in a browser. Shows:
`PASS <n> / <total> · FAIL <n> / <total>` summary, timestamp, and a table with
columns: `#` (gate number), `Gate` (name), `Result` (✓/✗), `Evidence`
(monospace, the exact value/selector that triggered), `Fix` (suggestion),
`File:Line` (source location if available).

`keystone-report.json` is the raw `{ results, pass, fail, total }` object —
machine-readable for the iterate loop.

## Known Plan-3 deferrals (do not fix in Plan 2)

- RGB→OKLCH conversion (render returns RGB computed styles; G40-41 expects
  OKLCH — the `lightnessOf` helper in `g40-41-contrast.mjs` matches `oklch()`
  strings, so RGB pairs from the render dump won't produce contrast results)
- `--render`/`--viewports`/`--log` CLI flags (CLI currently passes
  `viewports: []` and `computedPairs: []` — only the 11 CSS/HTML-only gates
  produce results via the CLI; G34/G44/G40-41 need the render dump)
- orchestrator `ctx` mutation (`orchestrate.mjs` sets `ctx.projectMemory` —
  pass a fresh `ctx` per iteration to avoid stale projectMemory across runs)
