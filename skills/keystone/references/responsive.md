# Responsive

Mobile-first. Content-driven breakpoints. No desktop-only interactions.

## Mobile — non-negotiable → gate G34 + G49 + G50–57

Every output must render flawlessly at **320px, 375px, 414px, and 768px** CSS-pixel widths. Eyeball each viewport before marking complete:

- No horizontal scroll. → gate G34
- No clickable text wrapping to two lines. → gate G49
- No image-bearing grid pushing layout past viewport — use `minmax(0, 1fr)`, never bare `1fr`, on tracks containing images. → gate G50
- Root carries `overflow-x: clip` on both `html` and `body` — never `hidden`. → gate G34
- Display headers wrap inside long words via `overflow-wrap: anywhere; min-width: 0`. → gate G51
- Section heads collapse to one column on mobile across every theme variant — per-theme overrides need a matching mobile rule. → gate G52
- No scroll-jump on radio-tab clicks — radios in normal flow OR JS guard with `focus({ preventScroll: true })`. → gate G53
- All-caps display heads: `line-height` ≥ 1.0 or cap-tops collide on wrap. → gate G55
- Sticky `top: 0` elements: offset secondary sticky by `--banner-height` or they bleed into the nav. → gate G56

This is a hard floor, not a wish list. A page that fails any of these on any of those four widths is not done.

## Principles

- Base styles are for the smallest viewport. `min-width` media queries add as you go up. Never `max-width` as the primary direction.
- Breakpoints are where the *content* breaks, not where a device sits. If the headline reflows awkwardly at 720px, that's a breakpoint.
- Use `pointer` and `hover` media queries instead of width to detect *interaction capability*.

## Breakpoints

Three or four, content-driven. Default:

```css
@media (min-width: 40rem) { /* ~640px — tablet, small laptop */ }
@media (min-width: 60rem) { /* ~960px — desktop baseline */ }
@media (min-width: 90rem) { /* ~1440px — wide */ }
```

Use `rem` so breakpoints respect the user's font size. Two thresholds to remember: **60rem** is the layout breakpoint (desktop grid activates), **40rem** is the type breakpoint (mobile collapse: section heads → 1fr, nav → sheet).

## Fluid scaling

Prefer `clamp()` for sizes that change continuously; use media queries for layouts that change discretely.

```css
h1 { font-size: clamp(2.5rem, 4vw + 1rem, 6rem); }
.container { padding-inline: clamp(1rem, 4vw, 4rem); }
```

## Pointer and hover queries

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-2px); }
}
@media (pointer: coarse) {
  .btn { min-height: 48px; }
}
```

Never build a mouse-hover interaction that has no touch equivalent. → gate G26

## Clickable text — never wraps → gate G49

Buttons, nav links, footer links, tab labels, breadcrumbs, and CTAs must read as **single-line affordances at every viewport between 320px and 1920px**. A button wrapping to two lines looks broken — visitors read it as a styling error.

```css
.btn, .nav__link, .foot__link, .cta { white-space: nowrap; }
```

**Order of fixes** when something wraps:
1. **Shorten the label.** "Get started free" → "Start free". "Read the documentation" → "Read docs". Most CTA labels are 30–40% longer than needed.
2. **`white-space: nowrap`** on the affordance, let the parent flex/grid reflow.
3. **`hidden=until-found`** the lowest-priority nav item at narrow widths.
4. **Collapse the nav** into a sheet / off-canvas / disclosure menu below a content-driven breakpoint.

Never let a primary CTA or top-level nav link wrap. Long footer-link labels can wrap *only* in a footer column where wrapping is part of the column's rhythm — not in the inline footer link strip (Ft2). → gate G49

## Viewport units

- Use `dvh` / `svh` / `lvh` instead of `vh` for heights that interact with mobile chrome.
- Never `width: 100vw`. Use `width: 100%` with padding; `100vw` includes the scrollbar on desktop and causes overflow. → gate G34

## Safe areas

For iOS notch / Android navigation bars:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

```css
body {
  padding-inline: max(1rem, env(safe-area-inset-left));
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

## Tables on small screens

Tables that won't fit: collapse to cards. `display: block` on `<tr>` with `data-label` attributes keyed from `<th>`, rendered via `::before`. Or better: redesign the data for small screens — tables are rarely the right mobile representation.

## Images

- `srcset` with width descriptors for responsive sizing.
- `<picture>` for art direction (different crop at different widths).
- `loading="lazy"` on anything below the fold.
- `width` and `height` attributes on every image, always, to avoid CLS.

## Internationalisation

- Reserve 30–40% extra horizontal space for German, Russian, and Finnish translations.
- Use logical properties: `margin-inline-start`, `padding-block`, `border-inline-end`. Not `margin-left`. RTL comes for free.
- Don't hard-code language-specific punctuation or date formats.

## Bans

- Desktop-first media queries (`max-width: 768px` as the primary direction).
- `vh` on full-height layouts (use `dvh`).
- `width: 100vw`. → gate G34
- Device-sniffing UA strings instead of feature queries.
- Hover-only interactions. → gate G26
- Ignoring `prefers-color-scheme` when the app claims to support dark mode.
- Fixed pixel breakpoints that don't respect `rem`.
- Tables of 10+ columns on mobile without a redesign.
