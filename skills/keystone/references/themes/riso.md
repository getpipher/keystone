# Theme — Riso

Riso is tactile-rebellion: an off-register two-ink print feel that reads "made, not generated." Warm toothy paper, cyan and magenta misregistered by a few pixels, a static grain overlay — the digital surface pretending it was pulled on a riso in a garage.

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

Riso is the second two-accent theme (after Hum) — cyan (`oklch(68% 0.22 195)`) + magenta (`oklch(65% 0.20 350)`) as the two inks. They NEVER blend in a gradient (G2) — the off-register effect is a transform/shadow offset, not a blend. `--color-accent-ink` is the ink colour so a cyan- or magenta-filled badge keeps its label readable. Warm toothy paper `oklch(95% 0.02 15)` — never pure white (G7).

## Fonts (free)
- **Display:** Bricolage Grotesque (Google Fonts)
- **Body:** Geist (Vercel)
- **Mono:** IBM Plex Mono (Google Fonts)

Bricolage Grotesque — the "risograph-bold" register, chunky and slightly awkward, warm — for headlines; Geist body so the prose stays readable. The display has character; the body gets out of the way. Three families = ceiling (G37); mono for ordinals/edition marks only.

## Signature moves

A Riso build must exhibit at least two of these three.

### 1 — Off-register two-colour print feel
Cyan and magenta are the two inks, deliberately misregistered by 1–3px on display text and shapes via `text-shadow` or `transform: translate(...)`. The offset is the signature — it reads "made, not generated." A typical headline gets `text-shadow: 2px 0 var(--color-accent), -2px 0 var(--color-accent-2)`. Never a blend or gradient between the inks (G2). Calibrates against a risograph print / a zine cover pulled in two passes where the second plate is a hair off — the imperfection is the proof it was hand-pulled.

### 2 — Bricolage Grotesque at chunky display scale
Bricolage Grotesque carries the risograph-bold register: chunky, slightly awkward, warm. Set it at 600 weight, -0.03em tracking, large sizes (48px+). Geist handles body at 400/500 — it gets out of the way. The display has character; the body provides quiet. Three families = ceiling (G37). The display weight is 600, never 700 — Bricolage at 700 gets brittle and the riso feel needs warmth, not hardness.

### 3 — Tactile paper + visible grain
Warm toothy paper `oklch(95% 0.02 15)` with a subtle SVG grain overlay (`aria-hidden="true"` — G33) at ~3% opacity covering the whole page. The grain is the only background ornament; no gradients (G2), no mesh (G29). The grain is static — it never animates or drifts (G27). Calibrates against uncoated stock pulled through a riso drum — the paper itself carries texture, the ink sits on top.

## Macrostructure affinity

**Loves:**
- Catalogue — grid of entries, each a print edition; the grain and two-ink feel make every card tactile.
- Specimen — type-forward page that lets Bricolage Grotesque breathe at chunky scale.
- Split Studio — two-column with the grain behind both halves; the seam itself can carry an off-register rule.
- Narrative Workflow — sequential steps read like passes on a press; each step a different ink.

**Rejects:**
- Workbench — the tool-heavy dashboard register clashes with print-feel rebellion.
- Stat-Led — big numbers in Bricolage Grotesque read costume, not tactile; route to a heavier editorial theme.

## Voice fixtures

Tactile, print-feel, rebellion, hand-made, anti-digital, specific. Sentence case. Concrete nouns over abstract verbs.

Headlines: "Made, not generated." · "Off-register on purpose." · "Printed in two colours, by hand." · "The grain is real. The misregistration is the point."
Body: "Each poster is pulled on a riso in a garage in Yogyakarta." · "Two inks, one pass, no bleed."
Labels (mono): `№ 04` · `INK · CYAN + MAGENTA` · `EDITION · 200`
Never: supercharge, unlock, seamless, AI-powered, intelligent, transformative, journey, holistic, ecosystem, leverage, revolutionize, digital-first, next-generation, world-class.

## Anti-patterns (theme-specific)

- NEVER use a third accent — two inks only (cyan + magenta); route to Hum for multi-accent.
- NEVER blend the two inks in a gradient (G2 — the off-register is a transform/shadow offset, not a gradient).
- NEVER use pure white paper (G7 — warm toothy paper `oklch(95% 0.02 15)` only).
- NEVER use pure black ink (G7 — `oklch(25% 0.03 30)` floor).
- NEVER use zero-chroma neutrals (G22 — tint toward 15–30°).
- NEVER use gradient text (G2 — the misregistration is a shadow, not a fill blend).
- NEVER use italic headers (G38a — Bricolage Grotesque is upright; emphasis from weight or accent colour).
- NEVER ship a grain overlay without `aria-hidden="true"` (G33).
- NEVER animate or drift the grain (G27 + G29 — grain is static).
- NEVER use `transition: all` (G10 — list specific properties).
- NEVER invent edition numbers or run counts (G46 — editions must be real).
- NEVER use emoji as feature icons (G30 — draw marks in CSS/SVG).

## Nav & footer routing

**Nav:** N7 (brutal slab) — chunky slab bar that matches Bricolage Grotesque's weight register. · N6 (newspaper masthead) — the print-feel masthead is native to Riso's editorial rebellion. · N9 (edge-aligned minimal) — a quiet bar that lets the grain and headlines carry the page.
**Footer:** Ft3 (index-style category list) — reads like a print catalogue index. · Ft8 (marquee scroll) — a scrolling edition ticker; static or slow, never fast.
**Avoid:** N13 (inline cmdk pill — too dev-tool for print-feel). · Ft7 (newsletter-first — too SaaS, wrong register).

## Worked example

A chunky headline with the off-register cyan+magenta text-shadow and a static SVG grain overlay — the two signature moves in one slice.

```html
<div class="grain" aria-hidden="true"></div>
<section class="hero">
  <p class="eyebrow">№ 04 · INK CYAN + MAGENTA</p>
  <h1>Off-register on purpose.</h1>
  <p class="lede">Each poster is pulled on a riso in a garage in Yogyakarta.</p>
  <a class="cta" href="#catalogue">View the edition</a>
</section>
```
```css
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
  z-index: 9999;
}
.hero { padding: 6rem 2rem; max-width: 640px; }
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in oklch, var(--color-ink) 60%, transparent);
  margin: 0 0 1.5rem;
}
h1 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 3.5rem;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--color-ink);
  text-shadow: 2px 0 var(--color-accent), -2px 0 var(--color-accent-2);
  margin: 0 0 1.5rem;
}
.lede {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.6;
  color: color-mix(in oklch, var(--color-ink) 80%, transparent);
  margin: 0 0 2rem;
}
.cta {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-ink);
  text-decoration: underline;
  text-underline-offset: 4px;
}
.cta:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 4px;
}
.cta:active { color: var(--color-accent); }
.cta:disabled { opacity: 0.4; pointer-events: none; }
/* Riso grain is static (no animation) — this guard is belt-and-suspenders:
   if a future build animates the grain, it collapses here. */
@media (prefers-reduced-motion: reduce) {
  .grain { opacity: 0.03; }
}
```

## Gate overrides

Riso is **editorial** (light). Stamp `overrides:` field: `["G6", "G21"]`.

- **G6** — a centred-narrow hero is allowed, but the eyebrow or CTA sits off-axis (asymmetric balance, not dead-centre everything).
- **G21** — the Specimen macrostructure is permitted on editorial signal (a type-forward page that lets Bricolage Grotesque breathe).

Everything else binds at full strength:

- **G7** — no pure white; warm toothy paper `oklch(95% 0.02 15)` only. No pure black ink; `oklch(25% 0.03 30)` floor.
- **G22** — no zero-chroma neutrals; tint toward 15–30°.
- **G2** — no gradient text AND no cyan-to-magenta gradient. The off-register is a transform/shadow, never a blend.
- **G33** — grain overlay must carry `aria-hidden="true"`.
- **G29** — grain ≤5% opacity, static; no mesh, no animated texture.
- **G40-41** — verify contrast for both inks on paper: cyan `oklch(68% 0.22 195)` and magenta `oklch(65% 0.20 350)` on `oklch(95% 0.02 15)`.

## Engine cross-ref

| Signature move | Police gates | How the engine catches drift |
|---|---|---|
| Off-register two-colour print feel | G2 (no gradient text — misregistration is a shadow/transform) · G23 (accent footprint — two inks, area discipline) · G48 (token discipline — both inks are named tokens) | CSS parser flags any `background: linear-gradient(... var(--color-accent) ... var(--color-accent-2) ...)` or `background-clip: text` with a gradient fill. Token audit flags raw oklch/hex outside `:root`. |
| Bricolage Grotesque at chunky display | G1 (banned fonts) · G37 (≤3 families) · G38a (no italic) | Font scanner checks `font-family` declarations against the allowlist; flags a 4th family or `font-style: italic` on any heading element. |
| Tactile paper + visible grain | G29 (abstract bg overuse — grain ≤5%, fine) · G33 (SVG aria-hidden) · G45 (grain is motivated — the print metaphor) · G27 (grain is static; if any drift animates, add fallback) | DOM parser checks the grain `<div>` for `aria-hidden="true"`; CSS scanner flags `opacity` >0.05 on overlay layers and any `animation`/`transition` on the grain element. |
| Two-ink discipline (cross-cutting) | G2 (no accent-to-accent gradient) · G48 (both inks named tokens) | CSS parser flags any gradient containing two accent tokens; token audit flags any raw colour value used where a token exists. |
