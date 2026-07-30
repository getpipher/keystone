# Theme — Specimen

Light-paper editorial register with high-contrast serif and a neutral-warm anchor — the type-foundry / editorial voice. Not a default; reach for it only when the brief is explicitly editorial/foundry/journal.

> **Deep spec (signature moves, voice fixtures, anti-patterns, worked example):** Plan 2b. This stub ships the tokens + axes + affinity only.

## Axes (diversification)

- **Paper band** — light
- **Display style** — high-contrast-serif
- **Accent hue** — neutral-warm

## Palette

```css
:root[data-theme="specimen"] {
  --color-paper:    oklch(96% 0.01 80);
  --color-paper-2:  oklch(93% 0.012 80);
  --color-paper-3:  oklch(89% 0.015 80);
  --color-ink:      oklch(20% 0.01 60);
  --color-accent:   oklch(58% 0.13 45);
  --color-accent-ink: oklch(98% 0.01 80);
  --color-focus:    oklch(58% 0.13 45);
  --font-display:   "Fraunces", ui-serif, Georgia, serif;
  --font-body:      "Source Serif 4", ui-serif, Georgia, serif;
  --font-mono:      "IBM Plex Mono", monospace;
}
```

## Fonts (free)

- **Display:** Fraunces (Google Fonts)
- **Body:** Source Serif 4 (Google Fonts)
- **Mono:** IBM Plex Mono (Google Fonts)

## Macrostructure affinity (short — full spec in Plan 2b)

**Loves:** Specimen, Type Specimen, Catalogue, Index-First. **Rejects:** Workbench, Stat-Led (when editorial brief).
