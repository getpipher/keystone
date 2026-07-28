# Colour

Most AI-generated UI fails on colour. It picks blue. It uses pure black. It draws a purple-to-cyan gradient. It leaves accents on 30% of the page. Fix all of this.

## Principles

- **OKLCH only.** Perceptually uniform, predictable lightness, consistent hue across tints. `hsl()` and `rgb()` lie about brightness.
- **One accent.** Maximum two. Everything else is neutral. Accent occupies **3% or less** of any viewport. → gate G23
- **No pure extremes.** No `#000`, no `#fff`. Tint with a trace of chroma toward the anchor hue. → gate G7
- **Tint the greys.** If the anchor hue is orange, neutrals lean warm. If blue, they lean cool. Warm accent + cool grey body copy looks wrong and most people can't name why. → gate G22
- **Every colour references a named token.** No inline hex, no inline oklch outside `:root`. → gate G48

## Palette construction

A complete palette has four layers:

1. **Paper** — base surface. `oklch(96–98% 0.005–0.015 <hue>)` light, `oklch(12–16% 0.008–0.015 <hue>)` dark.
2. **Ink** — primary text. `oklch(16–22% 0.005–0.015 <hue>)` light, `oklch(92–96% 0.005–0.01 <hue>)` dark.
3. **Neutrals** — 5 to 9 steps between paper and ink, each with the anchor's chroma tint (0.005–0.015).
4. **Accent** — one saturated colour (chroma 0.12–0.22). Links, active states, highlights, focus rings. Never a background fill covering more than a few percent.

Example (warm-oat anchor, hue 80):
```css
:root {
  --color-paper:    oklch(96%  0.012 80);
  --color-paper-2:  oklch(93%  0.014 80);
  --color-rule:     oklch(82%  0.010 80);
  --color-neutral:  oklch(56%  0.008 80);
  --color-muted:    oklch(40%  0.008 70);
  --color-ink:      oklch(18%  0.010 60);
  --color-accent:   #FC4C02;
  --color-focus:    oklch(55%  0.19  55);
}
```

Example (midnight anchor, hue 40):
```css
:root {
  --color-paper:    oklch(14%  0.008 40);
  --color-paper-2:  oklch(18%  0.010 40);
  --color-rule:     oklch(30%  0.008 40);
  --color-neutral:  oklch(58%  0.008 40);
  --color-muted:    oklch(72%  0.006 40);
  --color-ink:      oklch(94%  0.006 80);
  --color-accent:   #FC4C02;
  --color-focus:    oklch(70%  0.19  55);
}
```

## Contrast → gate G40 + G41

Use APCA contrast check when possible; otherwise WCAG 2.1 ratios.

| Content | Minimum | Target |
| --- | --- | --- |
| Body text | 4.5:1 | 7:1 |
| Large text (≥ 18.66px bold or 24px) | 3:1 | 4.5:1 |
| UI component boundaries | 3:1 | 4.5:1 |
| Placeholder / helper text | 4.5:1 | 4.5:1 |

Most-missed cases: text inside a card that inherits color but the card switched background; muted text on a darker surface; a focus ring that clears 3:1 against the element but not the page surface. Verify with browser devtools vision-deficiency emulator before shipping.

## Dark mode recipe

- Paper: lightness 12–18% (not `#000`). → gate G7
- Ink: lightness 92–96% (not `#fff`). → gate G7
- Body font-weight: reduce by 50 units (400 → 350) to compensate for the optical weight of light text on dark.
- Accent: reduce chroma by 0.02–0.04; increase lightness by 5–10%.
- Elevation: higher surfaces are *lighter*, not darker. Add ~3% lightness per level.
- Never switch the hue between modes. Keep the anchor. Only lightness and chroma move.

## Bans → gate G7 + G22

- Pure `#000000` anywhere. Use `oklch(16% 0.01 <hue>)`. → gate G7
- Pure `#ffffff` as a base surface. Use a tinted paper. → gate G7
- Flat grey (`oklch(L 0 H)` with zero chroma). Add at least 0.005. → gate G22
- Purple-to-cyan, purple-to-blue, orange-to-pink gradients. Every LLM picks these. → gate G2 + G29
- Accent as background fill covering more than ~5% of any view. → gate G23
- Grey text on coloured background. Always reads washed out.
- Red–green pairing as the only signal. Add an icon or pattern.
- Alpha transparency as the definition of a colour. If it's a named token, it's opaque.
- Three-colour gradients. Two-stop only. The third stop is vanity.

## Use of the accent → gate G23

The accent is a highlighter, not a colour block. Reach for it to:
- Mark an active nav item.
- Draw a focus ring.
- Underline a link on hover.
- Indicate a primary CTA's border or text.
- Place a small square beside a heading as a visual anchor.

Do not fill giant buttons with it. Do not set whole sections on it. Do not use it for decorative gradients. If you feel the urge to use more, that's the slop defaulting. Use less.
