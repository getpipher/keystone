# Theme — Midnight

Dark-paper atmospheric canvas with a single warm-accent signal — the default dark mode for modern product pages.

> **Deep spec (signature moves, voice fixtures, anti-patterns, worked example):** Plan 2b. This stub ships the tokens + axes + affinity only.

## Axes (diversification)

- **Paper band** — dark
- **Display style** — geometric-sans
- **Accent hue** — cool

## Palette

```css
:root[data-theme="midnight"] {
  --color-paper:    oklch(15% 0.02 260);
  --color-paper-2:  oklch(20% 0.028 260);
  --color-paper-3:  oklch(25% 0.035 260);
  --color-ink:      oklch(96% 0.008 260);
  --color-accent:   oklch(72% 0.17 200);
  --color-accent-ink: oklch(15% 0.02 260);
  --color-focus:    oklch(72% 0.17 200);
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

**Loves:** Marquee Hero, Workbench, Stat-Led, Ecosystem Index. **Rejects:** Letter, Long Document.
