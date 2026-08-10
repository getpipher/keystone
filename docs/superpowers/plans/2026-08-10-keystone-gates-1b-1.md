# Plan 1b-1 — Structural + a11y deterministic gates

**Project:** @getpipher/keystone
**Branch:** `feat/gates-1b-1` (off `master` `2c0e468`)
**Date:** 2026-08-10
**Predecessor:** Plan 4 (audit verb, PR #5 merged)
**Execution model:** controller-authored (per Plan 4 — providers were down; the detectors are small + mechanical + the patterns are fresh). Dispatch to glm-5.2:cloud in batches IF providers are up; else controller-finish. SCOPE GUARD on every dispatch.

---

## Goal

Implement the 16 structural + a11y + motion deterministic gates (G4, G5, G6, G10–G15, G17–G21, G42, G47) following the established g1–g54 detector pattern. Bundle two carry-forward fixes (G40 head-element false-positive filter, G26 combined-selector heuristic). Raises the engine from 13 → 29 shipped detectors (15 → 31 gate numbers) and the audit punch list from ~7 → ~18 rows. The ~17 craft gates (G23, G24, G25, G27, G28, G31, G33, G35, G37–G39, G49, G51–G53, G55, G56) ship in Plan 1b-2.

## Locked constraints (do not re-litigate)

- pi-first. MIT + NOTICE (shipped).
- **Do NOT change the Plan-3/4 wiring** (the build CLI, audit CLI, orchestrate signature, render build path). Additive only — new detector files + orchestrate `DETECTORS` array entries + audit-report map entries.
- **Do NOT change the 8 deep theme specs** (Plan 2b, frozen).
- 2-space indent, trailing newline at EOF, no AI attribution. Author `RECTOR <rector@rectorspace.com>`, GPG `BF47B9DC1FA320FA`.
- One commit per detector (one feature = one commit). Branch `feat/gates-1b-1`, PR #6, merge `--merge --delete-branch`.
- Vision gates (G9, G16, G29, G30, G36, G38a, G43, G45, G46) + manual G57 are NOT in this plan — they ship via the 18-question prompt (already done) or human judgment.

## Carry-forward fixes (first — they touch shared code)

### CF1 — G40 head-element false-positive filter
`extensions/render.ts`: the computed-pairs dump uses `document.querySelectorAll("*")` which includes `<style>/<meta>/<title>/<link>/<script>` (no visible text → spurious APCA Lc 0 contrast fails). Change to `document.querySelectorAll("body *")` — `<head>` is a sibling of `<body>`, so this skips head children entirely. Benefits build + audit. +1 render test (a `<style>` in head must not produce a computed pair).

### CF2 — G26 combined-selector heuristic
`engine/gates/g26-missing-states.mjs`: split each rule's selector on `,` so `.btn:hover, .btn:focus-visible` registers BOTH states for `.btn` (currently the exact-match `r.selector === `${base}:hover`` misses combined selectors — a Phase-1 carryover). Rewrite: iterate all selector parts, extract the base (strip the trailing `:state`), track states per base in a `Map`, flag interactive bases missing any of the 4 required states. +1 test for a combined selector.

## The 16 detectors

Each: detector `engine/gates/gN-*.mjs` + test `test/engine/gates/gN.test.mjs` + wire into `orchestrate.mjs` DETECTORS + (for non-excluded gates) tier/effort entry in `audit-report.mjs` + gates.md `Checker:` line `(shipped)`. The detector pattern: `import { parseCss/parseHtml } + pass/fail`, `export default function detect(ctx)`, pure function over `ctx.css`/`ctx.html`/`ctx.computedPairs`/`ctx.viewports`.

| Gate | Layer | What it checks | Tier | Effort |
|---|---|---|---|---|
| G4 | Det (DOM) | Nested cards — card-in-card (card-indicative class descendant of card) | 1 | trivial |
| G5 | Det (CSS) | Card side-stripe border — `border-left/right` ≥4px non-neutral on a card class | 1 | trivial |
| G6 | Det+Vis (CSS partial) | Hero centred-everything — `text-align:center`/`margin:0 auto` on all hero children (vision asks the axis question) | 1 | medium |
| G10 | Det (CSS) | `transition: all` — any `transition` declaration containing `all` | 3 | trivial |
| G11 | Det (CSS) | Uniform hover-scale — `transform: scale()` in `:hover` on 3+ unrelated selectors | 3 | low |
| G12 | Det (CSS) | Bouncy/overshoot easings — cubic-bezier with a control point >1.0 on a UI element | 3 | low |
| G13 | Det (CSS) | Multiple simultaneous hover effects — 3+ property groups change on one `:hover` | 3 | low |
| G14 | Det (CSS) | Animating layout properties — `@keyframes`/`transition` animating width/height/top/left/margin/padding | 3 | low |
| G15 | Det (CSS) | Focus ring fades in — `:focus-visible` with `transition` on outline/box-shadow/border-color >0ms | 2 | trivial |
| G17 | Det (CSS) | Tooltip hover-delay = focus-delay — same `transition-delay` on `:hover` and `:focus-visible` >0 | 2 | medium |
| G18 | Det (CSS+DOM) | Auto-rotating content without pause-on-hover/focus — carousel/marquee lacking `:hover`/`:focus-within` pause | 2 | medium |
| G19 | Det (DOM) | Placeholder names / startup clichés — Jane Doe / John Smith / Acme / Nexus / Seamless / Unleash in text | 1 | trivial |
| G20 | Det (extract-stamp) | Missing CSS stamp — `extractStamp(css)` returns null | excluded | trivial |
| G21 | Det (stamp) | Specimen fall-through — stamp macrostructure is Specimen but genre not editorial | excluded | low |
| G42 | Det+Vis (DOM partial) | Nav fingerprint — `<nav>` with wordmark + 4-5 inline links + button + hairline border + white bg | 1 | medium |
| G47 | Det+Vis (DOM partial) | Re-drawn UI chrome — `.browser-bar` + dots / `.phone-frame` + notch / mock window-chrome around `<pre>` | 1 | medium |

## Audit exclusion detail (important)

G20 + G21 are **build-flow-only** — they depend on the Keystone CSS stamp, which external code doesn't have. Per spec §6, audit excludes them. So `audit-report.mjs` `EXCLUDED_GATES` grows from `[8, 32]` → `[8, 20, 21, 32]` (G57 is manual, not a detector — never in orchestrate). The audit report footer's N/A count grows accordingly. G20/G21 get no tier/effort entry (they're excluded, not tiered).

## Architecture

```
engine/gates/g4-nested-cards.mjs              (NEW) — +14 more detector files
engine/gates/g26-missing-states.mjs           (MOD) — combined-selector fix (CF2)
engine/orchestrate.mjs                        (MOD) — +16 DETECTORS entries
engine/audit-report.mjs                       (MOD) — +14 tier/effort entries (G20/G21 excluded, not tiered) + EXCLUDED_GATES += 20, 21
extensions/render.ts                           (MOD) — querySelectorAll("body *") (CF1)
skills/keystone/references/gates.md            (MOD) — 16 Checker lines → (shipped)
test/engine/gates/g{4,5,6,10..15,17..21,42,47}.test.mjs  (NEW) — 16 test files
test/extensions/render.test.mjs                (MOD) — +1 head-element-filter test
test/lint-skill.mjs                            (MOD) — +1 assertion: every "(shipped)" Checker line has a real detector file
```

## Task breakdown (one commit per detector)

1. **CF1** — render.ts `body *` + test. (controller)
2. **CF2** — g26 combined-selector rewrite + test. (controller)
3–18. **G4, G5, G6, G10, G11, G12, G13, G14, G15, G17, G18, G19, G20, G21, G42, G47** — one detector + test + orchestrate wire + audit-report map + gates.md "shipped" each. (controller, or dispatch in batches of 3-4 if providers up)
19. **Wiring** — audit-report EXCLUDED_GATES += 20/21; audit.md note the new N/A count; lint assertion for "(shipped)" Checker lines. (controller)
20. **Final review + PR #6.** Dispatch glm-5.2:cloud reviewer (controller-finish if down); merge `--merge --delete-branch`; update handoff.

## Test strategy

Each detector: a pass fixture + a fail fixture (inline CSS/HTML strings, no network). The orchestrate test confirms the new detectors run. The audit-report test confirms the new tier/effort entries + the grown EXCLUDED_GATES. The render test confirms head elements are filtered. The lint asserts "(shipped)" Checker lines have files.

## Acceptance criteria

- [ ] 16 new detectors ship, each with a pass + fail test.
- [ ] G26 handles combined selectors (`.btn:hover, .btn:focus-visible` → both states registered).
- [ ] G40 no longer false-positives on `<style>/<meta>` (render dump is `body *`).
- [ ] audit-report EXCLUDED_GATES = [8, 20, 21, 32]; audit report footer shows 4 N/A.
- [ ] gates.md: 16 Checker lines say `(shipped)`.
- [ ] `npm test` green; render 3+1; lint 102+1.
- [ ] Build flow unchanged (check-gates.mjs CLI byte-identical; Plan-3/4 tests green).
- [ ] PR #6 merged, GPG-signed, branch deleted.

## Deferred (out of 1b-1)

- **Full APCA W3 lookup** — the current approximation (apca.mjs) is documented + tested + works for gate-catching. The full W3 lookup table is a nice-to-have, not correctness. Ships in 1b-2 or a follow-up.
- **The 17 craft gates** (G23, G24, G25, G27, G28, G31, G33, G35, G37–G39, G49, G51–G53, G55, G56) — Plan 1b-2.
- **DNS-rebinding mitigation** — documented known limitation, low priority.