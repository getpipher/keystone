# Theme — Terminal

Dark-paper mono register with phosphor-green accent — CLI / dev-tool / terminal vibes. The only Keystone theme that uses mono everywhere.

> **Deep spec (signature moves, voice fixtures, anti-patterns, worked example):** Plan 2b. This stub ships the tokens + axes + affinity only.

## Axes (diversification)

- **Paper band** — dark
- **Display style** — mono
- **Accent hue** — phosphor

## Palette

```css
:root[data-theme="terminal"] {
  --color-paper:    oklch(13% 0.01 145);
  --color-paper-2:  oklch(18% 0.012 145);
  --color-paper-3:  oklch(23% 0.015 145);
  --color-ink:      oklch(92% 0.02 145);
  --color-accent:   oklch(78% 0.20 145);
  --color-accent-ink: oklch(13% 0.01 145);
  --color-focus:    oklch(78% 0.20 145);
  --font-display:   "JetBrains Mono", monospace;
  --font-body:      "JetBrains Mono", monospace;
  --font-mono:      "JetBrains Mono", monospace;
}
```

## Fonts (free)

- **Display:** JetBrains Mono (Google Fonts)
- **Body:** JetBrains Mono (Google Fonts)
- **Mono:** JetBrains Mono (Google Fonts)

## Macrostructure affinity (short — full spec in Plan 2b)

**Loves:** Workbench, Component Playground, Index-First, Map/Diagram. **Rejects:** Letter, Photographic, Quote-Led.
