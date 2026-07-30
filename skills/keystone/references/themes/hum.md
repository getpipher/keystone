# Theme — Hum

Light-paper playful register with a multi-accent palette (pear + cyan + coral) — rounded, warm, alive. The only Keystone theme that allows multi-accent.

> **Deep spec (signature moves, voice fixtures, anti-patterns, worked example):** Plan 2b. This stub ships the tokens + axes + affinity only.

## Axes (diversification)

- **Paper band** — light
- **Display style** — rounded-sans
- **Accent hue** — warm (multi)

## Palette

```css
:root[data-theme="hum"] {
  --color-paper:    oklch(97% 0.012 95);
  --color-paper-2:  oklch(94% 0.016 95);
  --color-paper-3:  oklch(91% 0.020 95);
  --color-ink:      oklch(20% 0.012 250);
  --color-accent:   oklch(86% 0.18 95);      /* pear */
  --color-accent-2: oklch(66% 0.18 235);    /* cyan */
  --color-accent-3: oklch(68% 0.24 18);     /* coral */
  --color-accent-ink: oklch(20% 0.012 250);
  --color-focus:    oklch(86% 0.18 95);
  --font-display:   "Plus Jakarta Sans", sans-serif;
  --font-body:      "Plus Jakarta Sans", sans-serif;
  --font-mono:      "JetBrains Mono", monospace;
}
```

## Fonts (free)

- **Display:** Plus Jakarta Sans (Google Fonts)
- **Body:** Plus Jakarta Sans (Google Fonts)
- **Mono:** JetBrains Mono (Google Fonts)

## Macrostructure affinity (short — full spec in Plan 2b)

**Loves:** Marquee Hero, Bento Grid, Stat-Led, Catalogue, Narrative Workflow. **Rejects:** Long Document, Manifesto, Quote-Led, Type Specimen, Photographic.
