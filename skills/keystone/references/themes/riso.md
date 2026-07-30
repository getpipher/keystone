# Theme — Riso

Light-paper register with risograph-bold display and a chromatic-other accent (cyan + magenta) — tactile, off-register, print-feel. The editorial-rebellion theme.

> **Deep spec (signature moves, voice fixtures, anti-patterns, worked example):** Plan 2b. This stub ships the tokens + axes + affinity only.

## Axes (diversification)

- **Paper band** — light
- **Display style** — risograph-bold
- **Accent hue** — chromatic-other

## Palette

```css
:root[data-theme="riso"] {
  --color-paper:    oklch(95% 0.02 15);
  --color-paper-2:  oklch(91% 0.025 15);
  --color-paper-3:  oklch(87% 0.03 15);
  --color-ink:      oklch(25% 0.03 30);
  --color-accent:   oklch(68% 0.22 195);    /* cyan */
  --color-accent-2: oklch(65% 0.20 350);    /* magenta */
  --color-accent-ink: oklch(25% 0.03 30);
  --color-focus:    oklch(68% 0.22 195);
  --font-display:   "Bricolage Grotesque", sans-serif;
  --font-body:      "Geist", sans-serif;
  --font-mono:      "IBM Plex Mono", monospace;
}
```

## Fonts (free)

- **Display:** Bricolage Grotesque (Google Fonts)
- **Body:** Geist (Vercel)
- **Mono:** IBM Plex Mono (Google Fonts)

## Macrostructure affinity (short — full spec in Plan 2b)

**Loves:** Catalogue, Portfolio Grid, Specimen, Split Studio. **Rejects:** Workbench, Stat-Led.
