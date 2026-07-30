# Theme — Cobalt

Light-paper dev-tool register — cool engineered near-white with one electric cobalt signal. The canonical modern-minimal / dev-tool / API theme.

> **Deep spec (signature moves, voice fixtures, anti-patterns, worked example):** Plan 2b. This stub ships the tokens + axes + affinity only.

## Axes (diversification)

- **Paper band** — light
- **Display style** — grotesk-sans
- **Accent hue** — cool

## Palette

```css
:root[data-theme="cobalt"] {
  --color-paper:    oklch(99% 0.002 250);
  --color-paper-2:  oklch(96% 0.004 250);
  --color-paper-3:  oklch(92% 0.006 250);
  --color-ink:      oklch(25% 0.01 250);
  --color-accent:   oklch(55% 0.20 255);
  --color-accent-ink: oklch(99% 0.002 250);
  --color-focus:    oklch(55% 0.20 255);
  --font-display:   "Space Grotesk", sans-serif;
  --font-body:      "Geist", sans-serif;
  --font-mono:      "Geist Mono", monospace;
}
```

## Fonts (free)

- **Display:** Space Grotesk (Google Fonts)
- **Body:** Geist (Vercel)
- **Mono:** Geist Mono

## Macrostructure affinity (short — full spec in Plan 2b)

**Loves:** Bento Grid, Workbench, Stat-Led, Feature Stack. **Rejects:** Manifesto, Letter.
