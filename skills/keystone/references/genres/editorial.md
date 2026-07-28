# Genre — editorial (default)

The canonical Keystone voice. Content-led briefs: portfolios, manifestos, type specimens, agency sites, magazine pieces, considered B2C marketing. The silent default — when no other genre signal fires.

## When to pick it

Default. Pick editorial when the brief does not name a specialised aesthetic — "a landing page for X" without telling you whether X is enterprise, atmospheric, or playful. Most briefs land here.

## Themes that belong

**Garden**, **Specimen**, **Manifesto**, **Riso** — four themes, all editorial. Plenty of variety within the genre: Garden is warm-paper organic, Specimen is numbered-label foundry, Manifesto is declarative poster, Riso is tactile-rebellion print.

Plan 2b adds depth not breadth — these 4 are the v1 set.

## Voice

- **Display** — roman serif or condensed sans. Not Inter, not Geist. Weight commits to an extreme (300 or 700+). Italic is body-emphasis only — never headers. → gate G38a
- **Body** — workhorse serif (Newsreader, EB Garamond) or a plain non-default sans. Readable at 45–75ch.
- **Accent** — single warm or cool hue, < 5% of any viewport. → gate G23
- **Layout** — asymmetric. Hairlines, not card borders. Generous whitespace.
- **Motion** — quiet. One orchestrated entrance. No bounces. → gate G12
- **Copy tone** — specific, hand-set, slightly literary. Verbs over adjectives.

## What this genre allows

- Hairline rules, fleurons, drop caps, double rules.
- Italic body in long-form content (never headers).
- Asymmetric column counts (2:5, 3:7) on prose pages.
- Hand-built SVG illustrations, pure-CSS art (Tier A enrichment).
- Numbered display labels, edge-aligned headlines.
- Single-accent-colour highlighting (`<mark>` band at x-height).

## What this genre disallows

- **Pill-rounded buttons with gradient fill** — pill is fine, gradient on a pill is not. → gate G2
- **Centred-everything heroes** — editorial heroes are left-biased or asymmetric. → gate G6
- **Card-in-card** layouts. → gate G4
- **Three-column equal-icon-tile feature grid**. → gate G3
- **Glassmorphism** — the medium is paper, not glass.
- **Pure black or pure white** as paper or ink. → gate G7

## Voice fixtures

Imitate the shape, not the wording:
- *"Type, set with care."*
- *"Print discipline, on screen."*
- *"A small skill that argues against the average."*
- *"We compose the page like a broadsheet — hairlines, columns, restraint."*
- *"Restraint, repeated, becomes a signature."*

## Nav and footer voice

- **Default nav:** N6 Newspaper masthead — full-width, large centred wordmark, thin issue/date row in serif small caps, double-rule below.
- **Acceptable:** N1a Wordmark + 2 links (minimal destinations); N9 Edge-aligned minimal (atelier-quiet).
- **Default footer:** Ft1 Mast-headed.
- **Acceptable:** Ft2 Inline single line; Ft4 Dense colophon (newsprint); Ft6 Letter close (atelier/garden).
- **Banned:** N5 Floating pill (modern-minimal vocabulary); N7 Brutal slab (fights restraint); Ft8 Marquee scroll (kinetic).

See `component-cookbook.md` § Navigation and § Footers for full archetypes.

## Stamp signature

```css
/* Keystone · genre: editorial · macrostructure: <name> · theme: <name> · enrichment: <tier> · nav: <N#> · footer: <Ft#> */
```
