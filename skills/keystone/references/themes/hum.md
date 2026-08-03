# Theme — Hum

Light, playful, alive — the only Keystone theme that allows multi-accent. Cream paper, three accents on stage simultaneously, rounded sans throughout, soft lifting shadows, mandatory press-feedback on every interactive element.

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
  --color-accent-deep: oklch(76% 0.20 95);  /* pear edge/cast — the button's solid thickness + ground shadow */
  --color-accent-ink: oklch(20% 0.012 250);
  --color-focus:    oklch(86% 0.18 95);
  --font-display:   "Plus Jakarta Sans", sans-serif;
  --font-body:      "Plus Jakarta Sans", sans-serif;
  --font-mono:      "JetBrains Mono", monospace;
}
```

Hum is the ONLY multi-accent theme in the catalog. The rule that makes three accents not fight: pear = primary action, cyan = link/hover, coral = ONE single high-energy moment per page (a streak hit, a badge, the one big number). Accents never blend in a gradient (G2). Keep EXACTLY three accents — do not add mint or lavender; the stub ships three and three is the ceiling.

## Fonts (free)

- **Display:** Plus Jakarta Sans (Google Fonts)
- **Body:** Plus Jakarta Sans (Google Fonts)
- **Mono:** JetBrains Mono (Google Fonts)

Rounded sans throughout — Hum has NO serif anywhere. Display weight 600, tracking -0.025em. Body 400 with 500 for inline emphasis. Mono for ordinals/streak counters/tabular numerals only. Three families = ceiling (G37).

## Signature moves

A Hum build must exhibit at least two of these three.

### 1. The press is the feedback — three-state button system

One `.btn` base: push = solid colour edge (`box-shadow: 0 4px 0 0 var(--color-accent-deep)`) plus a soft ground shadow. `:hover` lifts 2px (edge grows to 6px). `:active` presses DOWN 3px (edge shrinks to 1px) so it physically depresses. Snappy `cubic-bezier(0.2, 0.7, 0.3, 1)` 140ms hover / 70ms active. NO `scale()`, NO spring overshoot on the button — the press is the feedback, not a bounce. Calibrates against Brilliant's CTA and PostHog's push-button. `:focus-visible` gets a 3px outline at `color-mix(in oklch, var(--color-accent) 70%, var(--color-focus))`; `:disabled` drops to 50% opacity with `pointer-events: none`. All four interaction states present (G26).

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5em;
  padding: 0.8rem 1.4rem; font-weight: 600; border: 0; border-radius: 999px;
  color: var(--color-accent-ink); background: var(--color-accent); cursor: pointer;
  box-shadow: 0 4px 0 0 var(--color-accent-deep), 0 6px 12px -3px color-mix(in oklch, var(--color-accent-deep) 45%, transparent);
  transform: translateY(0);
  transition: transform 140ms cubic-bezier(0.2,0.7,0.3,1),
              box-shadow 140ms cubic-bezier(0.2,0.7,0.3,1),
              background-color 160ms;
}
.btn:hover  { transform: translateY(-2px); box-shadow: 0 6px 0 0 var(--color-accent-deep), 0 12px 22px -4px color-mix(in oklch, var(--color-accent-deep) 45%, transparent); }
.btn:active { transform: translateY(3px);  box-shadow: 0 1px 0 0 var(--color-accent-deep), 0 2px 6px -2px color-mix(in oklch, var(--color-accent-deep) 45%, transparent); transition-duration: 70ms; }
.btn:focus-visible { outline: 3px solid color-mix(in oklch, var(--color-accent) 70%, var(--color-focus)); outline-offset: 3px; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; transform: none; box-shadow: 0 4px 0 0 var(--color-accent-deep); }
```

### 2. Multi-accent section bands (no gradients between accents)

Sections alternate cream / pear-tint / cyan-tint / coral-tint backgrounds; each accent owns its surface. Bands transition via simple `background-color` changes — never a gradient between accents (G2). Coral appears on ONE section per page maximum (the high-energy moment: a streak count, a badge wall, the one big number). Calibrates against Duolingo's named-colour system where each hue has a semantic role and never bleeds into the next.

### 3. One reacting character moment

A single small CSS-built mark (NO `<img>`, NO Lottie) that pulses gently at rest (`transform: scale(1)` to `scale(1.04)` over 4s, infinite alternate) and bursts a 4-point star on CTA click. Pear-yellow by default — that is the character's colour. ONE per page, never more. The star-burst is coral, 24px, fires once on completion, fades over 420ms. Calibrates against PostHog's mascot discipline: one character, strict model sheet, never decorative for its own sake.

## Macrostructure affinity

**Loves:**
- **Marquee Hero** — big centred "today's thing" card, CTA below, character mark anchored to one side.
- **Bento Grid** — multi-accent tiles, one accent per tile; the bento is Hum's natural shape.
- **Stat-Led** — big rounded counters carry the story; coral owns the one headline number.
- **Catalogue** — each tile uses a different accent tint; the grid is the palette's showcase.
- **Narrative Workflow** — numbered stages, each owning its own accent band, connecting rail between them.

**Rejects:**
- **Long Document** — Hum is not a 2,000-word essay theme.
- **Manifesto** — too serious; the register is warm and alive, not declarative.
- **Quote-Led** — too literary; Hum leads with shape and colour, not pull-quotes.
- **Type Specimen** — typography is rounded sans only; specimens want range across families.
- **Photographic** — Hum is pure shape + colour; photography in a tile is fine but never a section's spine.

## Voice fixtures

Warm, smart, casual, direct. Sentence case allowed. Verbs over nouns. Confident but not knowing.

Headlines: "Your daily 30-second curio." · "Notice yourself, in 30 seconds." · "A small daily thing, kept for a long time." · "Learn something genuinely new today."

Body: "Free for the first seven days. $5 a month after that." · "Made by three people in Lisbon and Amsterdam."

Labels (mono UPPERCASE tabular-nums): `01 · TODAY` · `STREAK · 47 DAYS` · `LEARNED · 312 THINGS`

Never: revolutionize, supercharge, unlock, leverage, unleash, transform, journey, holistic, mindful, ecosystem, platform, AI-powered, intelligent.

## Anti-patterns (theme-specific)

- NEVER serif anywhere — Hum is rounded-sans only; route to Garden or Specimen for serif.
- NEVER pure white paper — cream `oklch(97% 0.012 95)` only (G7).
- NEVER pure black ink — `oklch(20% 0.012 250)` floor (G7).
- NEVER square corners — cards 20px, pills 999px, inputs 12px.
- NEVER a gradient between accents — pear-to-cyan or cyan-to-coral is banned (G2).
- NEVER more than one character moment per page.
- NEVER `font-style: italic` for emphasis (G38a) — Hum is not an italic-theme; emphasis from weight 500 or accent color.
- NEVER invented metrics (G46) — streaks must be honest, the user's actual data.
- NEVER emoji as feature icons (G30) — draw marks in CSS or SVG.
- NEVER a bento with more than 8 tiles.
- NEVER `transition: all` (G10) — list specific properties.
- NEVER motion without a reduced-motion fallback (G27).

## Nav & footer routing

**Nav:** N5 (floating pill) — playful floating energy matches Hum's rounded, lifted register. · N2 (floating chip) — lighter-weight variant for dense pages. · N10 (floating on scroll morph) — the morph itself is a character moment, fitting Hum's alive aesthetic.

**Footer:** Ft8 (marquee scroll) — a scrolling name-wall or streak-strip carries Hum's energy into the footer. · Ft2 (inline rule single line) — compact, warm, one honest line for small pages.

**Avoid:** N6 (newspaper masthead — wrong register, Hum is not editorial). · Ft1 (mast-headed giant meta grid — too SaaS, too serious for the playful register).

## Worked example

A Marquee Hero slice showing all three signature moves: the press-button (move 1), a pear-tint section band against cream (move 2), and a small CSS character that pulses and bursts on CTA click (move 3).

```html
<section class="hero" style="background: var(--color-paper); padding: 4rem 1.5rem; border-radius: 20px;">
  <div class="hero__char" aria-hidden="true"></div>
  <p style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em;
    text-transform: uppercase; color: color-mix(in oklch, var(--color-ink) 60%, transparent);
    margin: 0 0 0.75rem;">01 · TODAY</p>
  <h1 style="font-family: var(--font-display); font-weight: 600; letter-spacing: -0.025em;
    font-size: clamp(2rem, 4vw + 1rem, 3.5rem); margin: 0 0 1rem;
    color: var(--color-ink); max-width: 18ch;">
    Your daily 30-second curio.
  </h1>
  <p style="font-size: 1.125rem; line-height: 1.6; margin: 0 0 2rem;
    color: color-mix(in oklch, var(--color-ink) 70%, transparent); max-width: 42ch;">
    One small interesting thing, every morning at 8 a.m.
  </p>
  <button class="btn hero__cta">Start your streak</button>
</section>
<section class="band" style="background: var(--color-paper-2); padding: 3rem 1.5rem;
  border-radius: 20px; margin-top: 1rem;">
  <p style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em;
    text-transform: uppercase; color: color-mix(in oklch, var(--color-ink) 60%, transparent);">
    STREAK · 47 DAYS
  </p>
</section>
```

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5em;
  padding: 0.8rem 1.4rem; font-weight: 600; border: 0; border-radius: 999px;
  color: var(--color-accent-ink); background: var(--color-accent); cursor: pointer;
  box-shadow: 0 4px 0 0 var(--color-accent-deep), 0 6px 12px -3px color-mix(in oklch, var(--color-accent-deep) 45%, transparent);
  transform: translateY(0);
  transition: transform 140ms cubic-bezier(0.2,0.7,0.3,1),
              box-shadow 140ms cubic-bezier(0.2,0.7,0.3,1),
              background-color 160ms;
}
.btn:hover  { transform: translateY(-2px); box-shadow: 0 6px 0 0 var(--color-accent-deep), 0 12px 22px -4px color-mix(in oklch, var(--color-accent-deep) 45%, transparent); }
.btn:active { transform: translateY(3px);  box-shadow: 0 1px 0 0 var(--color-accent-deep), 0 2px 6px -2px color-mix(in oklch, var(--color-accent-deep) 45%, transparent); transition-duration: 70ms; }
.btn:focus-visible { outline: 3px solid color-mix(in oklch, var(--color-accent) 70%, var(--color-focus)); outline-offset: 3px; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; transform: none; box-shadow: 0 4px 0 0 var(--color-accent-deep); }

.hero__char {
  width: 36px; height: 36px; border-radius: 999px;
  background: var(--color-accent);
  animation: char-pulse 4s ease-in-out infinite alternate;
}
@keyframes char-pulse {
  from { transform: scale(1); }
  to   { transform: scale(1.04); }
}
.hero__cta:active ~ .hero__char,
.hero__cta:focus-visible ~ .hero__char {
  animation: char-burst 420ms ease-out forwards;
}
@keyframes char-burst {
  0%   { transform: scale(1); }
  60%  { transform: scale(1.3); }
  100% { transform: scale(1.04); }
}

@media (prefers-reduced-motion: reduce) {
  .hero__char { animation: none; }
  .btn:hover  { transform: none; box-shadow: 0 4px 0 0 var(--color-accent-deep), 0 6px 12px -3px color-mix(in oklch, var(--color-accent-deep) 45%, transparent); }
  .btn:active { transform: none; box-shadow: 0 4px 0 0 var(--color-accent-deep); transition-duration: 70ms; }
}
```

## Gate overrides

Hum is **playful** (light). The `overrides:` stamp carries:

```json
{ "theme": "hum", "genre": "playful", "overrides": { "G6": "allowed" } }
```

- **G6** — a centred hero is allowed when the canvas itself is the design; the playful register permits the centred big-card hero.

Everything else binds at full strength:

- **G2** — no gradient text AND no accent-to-accent gradients (pear-to-cyan banned).
- **G23** — accent footprint: three accents need area discipline, each fill covers no more than 5% of viewport.
- **G26** — all four interaction states present on every interactive element (`:hover`, `:active`, `:focus-visible`, `:disabled`).
- **G27** — reduced-motion fallback for the character pulse and all hover transforms.
- **G29** — no abstract mesh backgrounds; Hum's surfaces are flat colour bands.
- **G30** — no emoji icons; marks drawn in CSS or SVG only.
- **G40-41** — contrast: verify `--color-accent-ink` on each accent fill (pear, cyan, coral). The engine computes APCA Lc against each pair.

## Engine cross-ref

| Signature move | Police gates | How the engine catches drift |
|---|---|---|
| Press-button system | G11 (no uniform hover-scale — the press is translate, not scale) · G12 (no overshoot on UI) · G13 (one hover effect) · G26 (all four states incl `:focus-visible`/`:active`/`:disabled`) | `parse-css.mjs` scans for `transform: scale(` in `:hover` rules and flags G11; `parse-html.mjs` checks for `:focus-visible` and `:active` selectors on every `<button>` and flags G26 if missing. |
| Multi-accent section bands | G2 (no gradient text / no accent-to-accent gradient) · G23 (accent footprint — three accents need area discipline) · G29 (no abstract bg overuse — no mesh) | `parse-css.mjs` detects `linear-gradient` or `radial-gradient` containing two `--color-accent` tokens and flags G2; area estimation compares accent-fill coverage against the 5% viewport threshold for G23. |
| One reacting character moment | G33 (decorative SVG needs `aria-hidden` or `aria-label`) · G45 (decoration must be motivated — the character reacts, not random) · G31 (no Lottie default — CSS-built only) | `parse-html.mjs` flags `<img>` or `<lottie-player>` inside `.hero__char` for G31; flags missing `aria-hidden` on decorative marks for G33; `orchestrate.mjs` cross-references animation properties against the CTA to verify the character reacts (G45). |
| Motion discipline (cross-cutting) | G27 (reduced-motion fallback) · G14 (no animating layout props — animate transform/opacity only) | `parse-css.mjs` checks every `@keyframes` and `transition` for a corresponding `@media (prefers-reduced-motion: reduce)` block (G27); flags `transition: all` or animations on `width`/`height`/`padding` (G14, G10). |
