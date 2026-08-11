# Plan 1b-2 — Craft deterministic gates

**Project:** @getpipher/keystone
**Branch:** `feat/gates-1b-2` (off `master` `bca3fd3`)
**Date:** 2026-08-10
**Predecessor:** Plan 1b-1 (structural/a11y/motion gates, PR #6 merged)

## Goal

The final ~17 craft deterministic gates (G23, G24, G25, G27, G28, G31, G33, G35, G37, G38, G39, G49, G51, G52, G53, G55, G56), completing the deterministic engine (29 → 46 detectors). Two of them (G23 accent-area, G49 two-line clickables) need render data the current dump doesn't provide — ship an additive render enhancement (bounding boxes + clickable metrics) for both; build flow ignores the new fields. This is the last gate plan before Plan 5 (examples + publish).

## Locked constraints (do not re-litigate)

- pi-first. MIT + NOTICE (shipped). 2-space indent, trailing newline at EOF, no AI attribution. Author `RECTOR <rector@rectorspace.com>`, GPG `BF47B9DC1FA320FA`.
- **Additive only.** Do NOT change the Plan-2b theme specs, Plan-3/4 wiring, or Plan-1b-1 detectors. The render enhancement adds fields to the computed-pairs dump + a new `clickableMetrics` array — build flow (which reads `computedPairs[].color/bg` + `viewportMetrics`) is unaffected.
- Branch `feat/gates-1b-2`, PR #7, merge `--merge --delete-branch`. Coherent-slice commits (per Plan 1b-1: detectors+tests+gates.md, then wiring).

## The 17 gates

| Gate | Layer | What it checks | Tier | Effort |
|---|---|---|---|---|
| G23 | Det (render) | Accent >5% viewport — sum bounding-box area of accent-colored elements | 3 | medium |
| G24 | Det (CSS) | Off-scale spacing — padding/gap/margin px not ÷4 or not `--space-*` | 3 | trivial |
| G25 | Det (CSS) | Prose max-width outside 45–75ch | 3 | trivial |
| G27 | Det (CSS) | Motion without reduced-motion fallback (`@media prefers-reduced-motion`) | 2 | low |
| G28 | Det (DOM) | LCP-killing demo video — autoplay+unmuted, no poster, lazy LCP img | 3 | low |
| G31 | Det (DOM) | Lottie as default — `<lottie-player>`/`<lottie-viewer>` | 3 | trivial |
| G33 | Det (DOM) | Decorative SVG/canvas without aria | 2 | trivial |
| G35 | Det+Vis (CSS partial) | Decorative text-effect position — linear-gradient band at baseline | 3 | medium |
| G37 | Det (CSS) | More than 3 font families | 3 | low |
| G38 | Det (CSS) | Outlier face in >2 slots (selectors referencing `--font-outlier`) | 3 | trivial |
| G39 | Det (CSS) | Input field states — 5 conditions (border-width, focus via outline, height, helper min-height, disabled channels) | 2 | medium |
| G49 | Det (render) | Two-line clickable text — button/nav/CTA `offsetHeight > line-height*1.5` at any viewport | 3 | medium |
| G51 | Det (CSS) | Display headers without `overflow-wrap: anywhere; min-width: 0` | 3 | trivial |
| G52 | Det (CSS) | Theme section-head override without mobile-collapse `@media (max-width:48rem)` | 3 | low |
| G53 | Det (DOM+CSS) | CSS-only radio tabs that scroll-jump (`position:absolute; top:0` + no preventScroll) | 3 | low |
| G55 | Det (CSS) | All-caps display with line-height <1.0 | 3 | trivial |
| G56 | Det (CSS) | Sticky top:0 below a sticky page-level nav (overlap) | 3 | low |

None are excluded from audit (all are meaningful on external code). G28 references the hero section (DOM); G23/G49 need the render dump.

## Render enhancement (additive — for G23 + G49)

`extensions/render.ts`:
- Each computed pair gains `width` + `height` (the element's bounding rect at the 1280px pass). G23 sums these for accent-colored elements.
- A new `clickableMetrics` array: `[{selector, viewport, offsetHeight, lineHeight}]` for `button, a.btn, a.cta, [role=button], nav a` at 1280 + 375. G49 checks `offsetHeight > lineHeight * 1.5`.
- Both additive to `RenderOutput`; build flow (`check-gates.mjs`) reads only `computedPairs[].color/bg` + `viewportMetrics` — unaffected.

## Architecture

```
engine/gates/g23-accent-viewport.mjs ... g56-sticky-nav-overlap.mjs   (NEW, 17)
engine/orchestrate.mjs                         (MOD) — +17 DETECTORS (46 total)
engine/audit-report.mjs                        (MOD) — +17 tier/effort entries
extensions/render.ts                           (MOD, additive) — bounding boxes + clickableMetrics
skills/keystone/references/gates.md            (MOD) — 17 Checker lines → (shipped)
test/engine/gates/g{23,24,25,27,28,31,33,35,37,38,39,49,51,52,53,55,56}.test.mjs  (NEW)
test/extensions/render.test.mjs                (MOD) — +1 assertion: computed pairs have width/height
test/lint-skill.mjs                            (MOD) — update the 27→44-gate map test
```

## Execution (controller-authored; per Plan 1b-1 the bug-fix loop is the norm — probe linkedom/postcss before asserting tests)

1. Render enhancement (additive) + test.
2. 17 detectors + tests (one pass/fail each, render gates get a ctx.viewports/computedPairs fixture).
3. Wire orchestrate + audit-report + gates.md + lint count (27→44).
4. Final review + PR #7 + handoff update.

## Deferred (out of 1b-2)

- **Full APCA W3 lookup** — the approximation works for gate-catching. Defer to a follow-up.
- **DNS-rebinding mitigation** — documented known limitation.

## Acceptance criteria

- [ ] 17 new detectors ship, each with pass + fail test.
- [ ] Render dump emits bounding boxes + clickableMetrics (build flow unaffected — Plan-3 tests green).
- [ ] orchestrate runs 46 detectors; audit-report tiers/effort cover 44 audited gates (G8/G20/G21/G32 excluded = 4 N/A).
- [ ] gates.md: 17 Checker lines say `(shipped)`.
- [ ] `npm test` green; render green; lint green.
- [ ] PR #7 merged, GPG-signed, branch deleted.