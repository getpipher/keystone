# Genre — modern-minimal

For the polished enterprise / dev-tool / API page. Stripe / Linear / ElevenLabs school: Geist sans, large confident displays, generous whitespace, pill CTAs, monochrome with optional accent. Minimalism with conviction, not the absence of choice.

## When to pick it

Brief mentions: *SaaS, enterprise, API, platform, developer tool, infra, B2B, dashboard, billing, Stripe-like, Linear-like, dev experience, ship fast*. Also pick when the user names a brand colour but the rest is restrained.

## Themes that belong

**Cobalt** — the cool dev-tool / API / docs register. Cool engineered near-white paper, one electric cobalt signal accent, Space Grotesk display + Inter body + JetBrains Mono code, ruler-drawn hairlines, tight 6px radii, bordered ⌘K nav, live code/API request–response hero.

One theme in v1. Plan 2b adds depth not breadth — Cobalt is the v1 set for this genre.

## Voice

- **Display** — Geist Sans 500–700, Inter Tight Display 600+. Letter-spacing tight (`-0.02em` to `-0.035em`).
- **Body** — Geist Sans 400, Inter 400. Same family as display (single-family discipline).
- **Accent** — monochrome (accent IS ink) or a single restrained hue on focus rings only. No chromatic floods.
- **Layout** — two-column heroes (title left, lede right), generous whitespace, refined card surfaces with subtle borders.
- **Motion** — minimal. Reveals are off; the page is composed.
- **Copy tone** — declarative, specific, technical. "Built for X" is not banned but must name the X concretely.

## What this genre allows

- **Pill-rounded CTAs** — filled and outlined. Black-filled primary + white-outlined secondary is canonical.
- **Pure white paper** (`#fff` / `oklch(100% 0 0)`) — → gate G7 is loosened for this genre.
- **Zero-chroma neutrals** — → gate G22 is loosened. The Stripe / ElevenLabs school is monochrome by design.
- **Two-column hero** with title-left + paragraph-right — canonical.
- **Refined card surface** with subtle border (`oklch(91% 0 0)`) and 8px radius.
- **Large tight-set displays** (`clamp(2.5rem, 5vw + 0.5rem, 4.75rem)`).

## What this genre disallows

- **Italic serif body** — stays sans top-to-bottom.
- **Hairline-everything** — borders are thin but visible, not editorial 0.5px hairlines.
- **Asymmetric prose columns** — aligns left, justified to a regular grid.
- **Drop caps, fleurons, ornament** — none.
- **Bouncy / overshoot easings**. → gate G12
- **Gradient text**. → gate G2
- **Glassmorphism** — banned.

## Voice fixtures

- *"Built to ship."*
- *"The platform that scales with you."*
- *"From idea to production in an afternoon."*
- *"One API. Every channel."*

## Nav and footer voice

- **Default nav:** N5 Floating pill — content-sized, detached from edges, blur backdrop, soft shadow. Vercel / Linear / Framer vocabulary.
- **Acceptable:** N1 Wordmark + 2 links (minimal); N9 Edge-aligned minimal (brand earns the silence).
- **Default footer:** Ft2 Inline single line — wordmark + tagline + tiny credit, hairline rule above.
- **Acceptable:** Ft1 Mast-headed; Ft5 Statement.
- **Banned:** N6 Newspaper masthead (editorial); N7 Brutal slab (fights restraint); Ft8 Marquee scroll (kinetic); Ft3 Index columns (AI-footer fingerprint → gate G43).

See `component-cookbook.md` § Navigation and § Footers.

## Stamp signature

```css
/* Keystone · genre: modern-minimal · macrostructure: <name> · theme: <name> · enrichment: <tier> · nav: <N#> · footer: <Ft#> */
```

## Reference register

Confident sans display, clean white canvas, two-column hero, pill CTAs, mono accent. Do not name external sites in the output.
