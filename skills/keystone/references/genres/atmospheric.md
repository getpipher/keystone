# Genre — atmospheric

For the AI-creative product page. Dark canvas with warm radial blooms, confident sans display, expressive but plain-English copy, single warm accent. The aesthetic of a tool you'd want to use after dark — generative music, video, image, voice.

## When to pick it

Brief mentions: *AI tool, generative, music, video, image, voice, late-night, atmospheric, dark mode, expressive, creative tool, model playground, vibe-coded, dreamlike, nocturnal*. Also pick when the user names a mood requiring darkness ("moody", "cinematic", "after hours").

## Themes that belong

**Midnight** — the dark-canvas atmospheric theme. Warm radial blooms behind content, single warm accent, Geist Sans display on dark paper.

**Terminal** is atmospheric-adjacent; it lives in the catalog as a mono/phosphor theme and may be picked here when the brief is technical/CLI. It shares the dark canvas but trades the radial bloom for a phosphor-grid ground.

One theme in v1 (Midnight). Plan 2b adds depth not breadth — Midnight is the v1 set; Terminal is the cross-genre neighbour.

## Voice

- **Display** — Geist Sans 600 or similar weighty sans, plain English, no ornament. Letter-spacing tight (`-0.03em` or tighter).
- **Body** — same family, 400. Light grey on dark (`oklch(86% 0.008 40)`).
- **Accent** — single warm hue (orange / amber / red / pink). Used in radial-gradient blooms on canvas, focus rings, small tags. Never on display text. → gate G2
- **Layout** — centred or near-centred heroes. The canvas itself is the design.
- **Motion** — fade-in only. No slide, no bounce. The atmosphere does the work.
- **Copy tone** — direct, slightly poetic, specific. *"Make a house song about quitting your job."* is the calibration.

## What this genre allows

- **Radial-gradient bloom** on body background — up to two blooms, each ~20–30% footprint, fixed-attached, no animation. → gate G29 is loosened for this genre.
- **Centred heroes** — → gate G6 is loosened. The canvas frames the type.
- **Pill-rounded CTAs** with accent fill.
- **Glow shadows** on hover (cards lift with a soft warm shadow).
- **Larger expressive type** — display can hit 6rem (`clamp(3rem, 6vw + 1rem, 6rem)`).

## What this genre disallows

- **Light-paper aesthetics** — the default canvas is dark. Don't sneak white sections into a dark-paper build.
- **Italic in headers** — banned globally. → gate G38a. Display is roman; emphasis via accent colour + drawn underline.
- **Hairlines** — uses elevated cards (`paper-2`, `paper-3`) instead of hairline-on-paper.
- **Multiple accent hues** — one warm bloom + one secondary (pink/red) max. No teal-and-amber juggling.
- **Glassmorphism** — atmospheric is atmospheric, not glass.
- **Gradient text**. → gate G2

## Voice fixtures

- *"Built for the dark."*
- *"The page should feel like a place you could sit in."*
- *"A canvas, then a tool."*
- *"Generate, refine, ship — between Tuesday and Wednesday."*
- *"The instrument is dark. The output is yours."*

## Nav and footer voice

- **Default nav:** N5 Floating pill — blur backdrop sells the atmospheric mood; pill sits over the dark canvas.
- **Acceptable:** N9 Edge-aligned minimal (canvas loud enough that nav disappears); N4 ⌘K-only (technical audience).
- **Default footer:** Ft5 Statement — atmospheric pages argue something; the footer states it.
- **Acceptable:** Ft1 Mast-headed; Ft2 Inline single line.
- **Banned:** N6 Newspaper masthead (editorial); N7 Brutal slab (fights the calm); Ft8 Marquee scroll (kinetic, breaks dark canvas); Ft3 Index columns (AI-footer → gate G43).

See `component-cookbook.md` § Navigation and § Footers.

## Stamp signature

```css
/* Keystone · genre: atmospheric · macrostructure: <name> · theme: <name> · enrichment: <tier> · nav: <N#> · footer: <Ft#> */
```

## Reference register

Dark canvas with two warm blooms behind content, plain-English heroic display, single warm accent on small surfaces. Hand-built, not stock-AI.
