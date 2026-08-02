# Layout and space

Layout is where "AI-generated" gets caught. Equal columns, everything centred, every card identical — these are the tells.

## Principles

- A layout has a **primary axis**. Left-biased, right-biased, top-heavy, or bottom-weighted. Centre-biased is a default, not a choice.
- **Asymmetry reads as intentional.** Symmetry reads as generated. When in doubt, shift.
- **Spacing is a scale, not a value.** Pick one scale. Use it everywhere. Don't type raw px.
- **Varied spacing.** If every gap is 24px, the page is a template. Mix small, medium, and large within the same layout.
- **Break the grid on purpose.** A page with one element crossing the grid is stronger than one that never does.

## The spacing scale → gate G24

4pt base. Named by role, not size.

```css
:root {
  --space-3xs: 0.125rem;  /*  2px */
  --space-2xs: 0.25rem;   /*  4px */
  --space-xs:  0.5rem;    /*  8px */
  --space-sm:  0.75rem;   /* 12px */
  --space-md:  1rem;      /* 16px */
  --space-lg:  1.5rem;    /* 24px */
  --space-xl:  2.5rem;    /* 40px */
  --space-2xl: 4rem;      /* 64px */
  --space-3xl: 6rem;      /* 96px */
  --space-4xl: 9rem;      /* 144px */
}
```

- Use `gap` for sibling spacing. Cleaner than stacked margins, participates in flex/grid, collapses predictably.
- Use `margin` only for optical adjustments or breaking out of flow. Never `margin` for a list of siblings.
- No padding/gap/margin that isn't on this scale or a `--space-*` token. Arbitrary `padding: 17px` is a tell. → gate G24

## Grids

- **Prefer CSS Grid** for page layout, **Flexbox** for component internals.
- `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for fluid responsive grids without media queries.
- **Don't default to 3 equal columns with icon-above-heading-above-copy.** This is *the* AI feature-grid. Break it: `1.2fr 1fr 0.8fr`, or a 12-column grid with different spans, or 4-up with a 2-span hero. → gate G3
- Use **named grid areas** for complex layouts; rename them at breakpoints.

## Asymmetry techniques

- **Wide left margin.** Left as permanent negative space — narrow column of labels, wide column of content. Labels must NOT be section eyebrows/numbers paired with the heading — that's gate-54-banned. Reserve for body-level micro-labels (caption, footnote, date) alongside body copy. → gate G54
- **Hanging headers.** ⚠️ Opt-in only. Permitted only when the user explicitly asks for an editorial/hanging-header layout AND no eyebrow/number/chapter tag sits in the left margin. The eyebrow-left/heading-right pattern is banned — it's the most reliable templated-editorial AI tell. Default to stacked single-column. → gate G54
- **Offset grids.** Odd columns wider than even, or the reverse.
- **Grid-breaks.** One element deliberately extending past a column boundary: a pull-quote, photograph, rule, number.
- **Generous top, tight bottom** (or vice-versa). Sections don't need even padding.
- **Alignment coherence.** A section head's alignment should *cohere* with the body it introduces — match it (left head over left-flush body) or break from it on purpose. What reads as an AI mistake is the *accidental* mismatch: a narrow head block auto-centred floating over full-width left-flush content.

## Depth

- Depth is **weight and scale**, not shadow. A heavier weight, a larger size, a warmer hue — these create hierarchy better than drop shadows.
- If you use shadow, use one:
  - **Whisper** — `0 1px 2px oklch(20% 0.01 <hue> / 0.05)` for hovering cards.
  - **Hairline** — `0 0 0 1px oklch(30% 0.01 <hue> / 0.06)` as an alternative to a 1px border.
- Never stack multiple shadows. Never use a coloured glow on a light background. Never a shadow-glow halo on dark surfaces — use lightness for elevation (brighter = higher).
- Z-index has **six levels, named.** Don't freestyle numbers.

```css
:root {
  --z-base:     1;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-modal:    400;
  --z-toast:    500;
  --z-tooltip:  600;
}
```

Split `--z-sticky` (in-page, e.g. 200) from `--z-sticky-nav` (top nav, e.g. 300) so the nav always out-paints when sticky boxes overlap. → gate G56

## Bans

- Centre-aligned everything. Headings + body + CTA all centred is the landing-page template. → gate G6
- `min-height: 100vh` hero with one centred sentence. → gate G6
- Card-in-card. Pick one containment layer. → gate G4
- Identical feature grid. Three columns, three icons, three headings, three bodies. Change *something*. → gate G3
- Equal padding on everything. If card padding = section padding = page padding, the rhythm is flat. → gate G9
- `z-index: 9999` and ad-hoc z values. Use the scale.
- Shadow-on-dark accidental glow. Drop shadow on a dark card creates a glow; use lightness instead.

## Page-edge clipping → gate G34

The clipped-edge enrichment archetype — and any deliberately overflowing element (full-bleed marquee, oversized headline, tilted figure) — needs a parent that visually shows overflow without letting the document scroll horizontally.

**Always pair clipped-edge with a global clip.** At the top of the stylesheet:

```css
html { overflow-x: clip; }
body { overflow-x: clip; }   /* fallback for older Safari */
```

Use `overflow-x: clip`, not `overflow-x: hidden`:
- `clip` preserves `position: sticky` and `position: fixed` on descendants.
- `hidden` creates a new scroll container, breaks sticky, can trap focus on overflowing inputs.

The hero or section containing the overflowing element keeps `overflow: visible` (so the figure renders past the parent edge); the global clip on `html` and `body` is the only safety net needed. → gate G34

## When in doubt

If the layout looks fine but flat, do one before shipping:
1. Add one break-out element.
2. Unbalance a column width.
3. Move the primary CTA out of the centre.
4. Remove a card and replace it with negative space.
5. Change one section's padding so the rhythm is uneven.
