# Theme — Manifesto

Light-paper (with dark variant) register with condensed grotesk display and a neutral anchor — polemical, declarative. The "belief before product" theme.

> **Deep spec (signature moves, voice fixtures, anti-patterns, worked example):** Plan 2b. This stub ships the tokens + axes + affinity only.

## Axes (diversification)

- **Paper band** — light (dark variant)
- **Display style** — grotesk-sans (condensed)
- **Accent hue** — neutral

## Palette

```css
:root[data-theme="manifesto"] {
  --color-paper:    oklch(98% 0.004 0);
  --color-paper-2:  oklch(94% 0.006 0);
  --color-paper-3:  oklch(88% 0.008 0);
  --color-ink:      oklch(15% 0.005 0);
  --color-accent:   oklch(55% 0.08 25);
  --color-accent-ink: oklch(98% 0.004 0);
  --color-focus:    oklch(55% 0.08 25);
  --font-display:   "Anton", sans-serif;
  --font-body:      "Geist", sans-serif;
  --font-mono:      "Geist Mono", monospace;
}
```

## Fonts (free)

- **Display:** Anton (Google Fonts)
- **Body:** Geist (Vercel)
- **Mono:** Geist Mono

## Macrostructure affinity (short — full spec in Plan 2b)

**Loves:** Manifesto, Letter, Marquee Hero. **Rejects:** Bento Grid, Conversational FAQ.
