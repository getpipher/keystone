# @getpipher/keystone

**Anti-AI-slop design skill with an executable gate engine.** Makes the UIs an
AI coding assistant generates look *made, not generated* — and can prove it.

Every LLM has on-distribution defaults: hero → 3 feature cards → CTA → footer,
Inter font, indigo gradients, glassmorphism, `hover:scale-105`, emoji icons,
re-drawn browser chrome. [Hallmark](https://github.com/Nutlope/hallmark) (MIT)
encodes the best existing rule-set against this — 58 anti-slop gates, 21
macrostructures, 50 component archetypes — but its gates are **prose**: the
model is told to "imagine the rendered output," then claims "58/58 ✓" on its
own honor. There is no enforcement.

Keystone reuses the taxonomy (credited in [NOTICE](NOTICE)) and makes the gates
**executable**: a real Node engine parses the emitted HTML/CSS, a real headless
Chromium renders it at exact CSS px, real APCA math scores every contrast pair,
and a vision pass asks *"does this look AI-generated?"* on the actual
screenshots — the one question Hallmark cannot ask its model, because its model
never sees the page.

> The user can trust the gates ran because a script checked them, not because
> the model claimed it did.

## Install

```bash
pi install npm:@getpipher/keystone
```

Exposes the `keystone` skill (Build + Audit verbs) and the `keystone_render`
tool in one pi package.

## What you get

**`keystone build`** — a 7-step design flow: design-context gate →
macrostructure pick (21, diversification-enforced against project memory) →
theme (8 deep specs) → build → **Step 7, the engine-verified slop test**:
deterministic gates first (≤3 iterations), then the vision pass (≤2), then the
honest resolution — the stamp in your CSS says the real score, whatever it is.

**`keystone audit <path|URL>`** — the same engine pointed at someone else's
code. Read-only, ranked punch list, four severity tiers, computed APCA numbers,
real file:line evidence. Path mode renders from disk; URL mode navigates live
(behind an SSRF guard).

**The engine** — 46 deterministic detectors covering 48 gate numbers: banned
fonts, gradient text, 3-equal card grids, pure black/white, transition-all,
animating layout props, contrast (WCAG + APCA on every computed pair),
horizontal scroll at 320–768, two-line clickables, hero-fit-the-fold, token
discipline, the nav/footer AI fingerprints, re-drawn chrome, accent-area
budget, missing interaction states, input states, reduced-motion coverage, and
more. Every gate in [`skills/keystone/references/gates.md`](skills/keystone/references/gates.md)
is annotated with its checker — the model pre-empts the gates because it knows
what the engine will catch.

## Quick start (standalone, no pi)

```bash
npm i -g @getpipher/keystone

# audit a local page (renders it, scores 48 gates, writes a ranked report)
keystone audit ./my-page/

# audit a live URL (SSRF-guarded)
keystone audit https://example.com

# or the build CLIs directly
node engine/check-gates.mjs --html page.html --css page.css \
  --render --viewports 1280,375,320,414,768 --out .
```

## Examples — the proof

Five complete builds, five different macrostructures, five themes spanning all
four genres, every one scored by its own engine:

| Build | Theme · Macro | Score |
|---|---|---|
| [Kestrel — observability](examples/01-cobalt-observability/) | Cobalt · Split Studio | **48/48** (+ self-audit 43/43) |
| [Fern & Fog — plant shop](examples/02-garden-plantshop/) | Garden · Long Document | **48/48** |
| [capstan — deploy CLI](examples/03-terminal-cli/) | Terminal · Manifesto | **48/48** |
| [Two Drum Press — riso studio](examples/04-riso-printstudio/) | Riso · Catalogue | **48/48** |
| [Lingua Potluck — language co-op](examples/05-hum-languages/) | Hum · Bento Grid | **48/48** |

Each directory carries its evidence: the openable `keystone-report.html`, the
five viewport screenshots the vision pass judged, and a `brief.md` recording
every decision and verdict — including the honest ones. See
[examples/README.md](examples/README.md).

## How Keystone relates to Hallmark

The thesis is falsifiable: run the *same brief* through both skills, with the
same model, no human intervention — then render and score both outputs with
*our* engine, and ask the vision question of both screenshots. Executed
2026-08-29 across 8 verbatim briefs from Hallmark's own MIT test suite —
full conditions in [`test/compare/gallery/PROTOCOL.md`](test/compare/gallery/PROTOCOL.md),
per-brief verdicts in [`test/compare/gallery/`](test/compare/gallery/).

| Metric (8 briefs, same model both sides) | Hallmark | Keystone |
|---|---|---|
| Engine score, average of 48 gates | 43.5 | **48.0** (48/48 × 8) |
| Vision S1 "looks AI-generated?" (avg confidence) | 0.39 — 2/8 YES | **0.25 — 0/8 YES** |
| Real gate failures the other side's flow couldn't see | 12 distinct gates / 28 instances | 0 |

No brief was lost — but the two near-ties (03, 06) are published as ties, the
S1 target for Hallmark (≥ 0.50) was NOT reached, and the headline margin
(+4.5) missed the ≥5 target by half a gate, so 1.0.0 waits. What the run
did prove is the moat: every Hallmark build shipped failures its prose
"Step 7" could not see — and on brief 05 the page loads with a ⌘K palette
stuck open over its own hero, which nobody who looked at the render even once
would have shipped.

**The honesty clause, kept:** the losses, the near-ties, and the missed
targets are all in the gallery. A rigged demo would destroy the very thing
this project sells.

## Status

| Layer | State |
|---|---|
| Engine | ✅ complete — 46 detectors / 48 gate numbers, 275 tests |
| Skill catalog | ✅ SKILL.md + 21 macros + 50 archetypes + 8 deep theme specs |
| Audit verb | ✅ path + URL mode, SSRF guard, ranked punch list |
| Examples | ✅ 5 builds, all 48/48, committed evidence |
| Comparison gallery | ✅ executed 2026-08-29 — 8 briefs × 2 skills, scored + vision-passed, losses published |

## Development

```bash
pnpm install
pnpm test            # engine + gates (162)
pnpm test:lint       # skill structural lint (103)
pnpm typecheck       # extensions/render.ts
KEYSTONE_RENDER_TEST=1 pnpm test:render     # render extension (needs Chromium)
KEYSTONE_RENDER_TEST=1 pnpm test:examples   # example regression (needs Chromium)
```

Releases: push a `v*` tag → CI gates → npm publish (org NPM_TOKEN).

## Attribution & license

MIT — see [LICENSE](LICENSE) and [NOTICE](NOTICE). Keystone reuses Hallmark's
taxonomy (macrostructure names, archetype codes, gate concepts, the 7-step
skeleton) under MIT with credit; all prose, theme specs, tokens, the engine,
and the examples are original work.
