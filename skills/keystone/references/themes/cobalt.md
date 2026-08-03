# Theme — Cobalt

Light-paper modern-minimal register with one electric cool-blue signal — the dev-tool / API-product anchor. Stripe docs, Linear, Vercel energy: a calm engineered canvas, ruler-drawn hairlines, code as content.

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

The modern-minimal genre allows pure `#fff` paper (G7 override) and zero-chroma neutrals (G22 override), but Cobalt stays a hair off pure white — `oklch(99% 0.002 250)` — for a cool engineered warmth. Every neutral is tinted toward 250° so the ground and the cobalt accent read as one temperature. `--color-accent-ink` is near-paper so a cobalt-filled button keeps its label readable (G40-41).

## Fonts (free)

- **Display:** Space Grotesk (Google Fonts)
- **Body:** Geist (Vercel)
- **Mono:** Geist Mono

Type discipline: Space Grotesk carries headlines and the wordmark; Geist body sits between; Geist Mono carries code, inline commands, and stats. The dev-tool register — code is content, not decoration. Three families is the ceiling (G37); the mono never appears in a heading (G38a — no italic, and no mono-as-display either; the split is words vs figures vs code).

## Signature moves

A Cobalt build must exhibit **at least two of these three**. They are the theme's vocabulary, not a layout — which appear is shared, but how they compose must differ every build.

### 1. Engineered near-white with one electric cobalt signal

Paper at `oklch(99% 0.002 250)` — near-white, the modern-minimal genre allows pure `#fff` but Cobalt stays a hair off it for warmth. One accent (`oklch(55% 0.20 255)`) used as a *signal*: the primary CTA, a link underline, a status chip, the focus ring. Everything else is ink-on-paper. Calibrates against Stripe's cobalt-on-white, Linear's accent restraint, Vercel's signal discipline. If the accent covers more than ~5% of any viewport, it has stopped being a signal and become a wash — retreat it (G23).

### 2. Grotesk display + humanist body, mono for code

Space Grotesk headlines, Geist body, Geist Mono for code blocks, inline commands, and spec tables. The dev-tool register: code is content, not decoration — a syntax-highlighted block is the hero, not a screenshot. Calibrates against Stripe docs' mono-in-prose and Vercel's Geist discipline. Two sans voices plus one mono voice; three families is the ceiling (G37).

### 3. Hairline rules and tabular numerals

1px dividers in the accent at low alpha or in a muted ink, `font-variant-numeric: tabular-nums` on every stat table, pricing grid, and spec sheet. The precision read — numbers align, rules divide, no drop shadows. Calibrates against Linear's changelog tables and Stripe's pricing grid. Depth comes from borders and alignment, not from blur or fill.

## Macrostructure affinity

**Loves:**
- **Bento Grid** — asymmetric cells of code, stats, and features; the dev-tool dashboard register.
- **Workbench** — a live demo panel surrounded by quiet hairline chrome; the API playground.
- **Stat-Led** — big mono numerals carry the story; the accent marks the one metric that matters.
- **Feature Stack** — code-example-plus-benefit rows; the docs-home shape.

**Rejects:**
- **Manifesto** — the polemical all-caps poster register fights the calm infrastructure voice.
- **Letter** — too intimate and literary for a product page; the dev-tool register is declarative, not personal.

## Voice fixtures

Engineered, precise, dev-tool, confident. Sentence case. Nouns and verbs over adjectives. No hype, no exclamation marks, no em-dash piles (one per paragraph max).

Headlines:
- "An API that scales to your traffic."
- "Type-safe to the edge."
- "Ship the types, not the typescript."
- "One SDK. Three runtimes. No config."

Body patterns:
- "Returns in under 40ms at the 99th percentile."
- "One SDK. Three runtimes. No config."

Mono labels — UPPERCASE, tabular-nums, used for versions, metrics, and status:
- `v4.2.0`
- `P99 · 40MS`
- `STATUS · STABLE`

Never: supercharge, unlock, revolutionize, seamless, intelligent, AI-powered, transformative, journey, holistic, empower, leverage, game-changing, next-generation.

## Anti-patterns (theme-specific)

- **NEVER a second accent.** Cobalt is single-accent cool. A warm pop or a second cool hue means the wrong theme (route to Hum for multi-accent, Midnight for a dark single-cool register).
- **NEVER gradient text.** Accent-coloured headline or a drawn underline — never `background-clip: text` (G2).
- **NEVER an accent surface wash.** The cobalt is a signal (links, CTA, focus, one chip). A full-bleed cobalt section or a cobalt-tinted half-page is a wash — retreat it (G23).
- **NEVER pure black ink.** `oklch(25% 0.01 250)` is the ceiling. Pure `#000` on near-white is harsh and breaks the cool tint (G7 — modern-minimal allows pure `#fff` *paper*, but the ink stays tinted).
- **NEVER italic headers.** Headings are upright Space Grotesk; emphasis comes from weight or the cobalt accent, never `font-style: italic` (G38a).
- **NEVER re-drawn browser/terminal chrome around a demo.** Use a real `<figure>` + screenshot, or let the code block stand on its own (G47). Cobalt's chrome is the hairline rule — don't fake more.
- **NEVER invented metrics.** Every mono numeral must be real or absent — `—` in a muted block beats a fabricated "99.99%" (G46).
- **NEVER tag-left / heading-right.** An eyebrow beside a heading on one row is the AI section-head tell (G54). Stack the eyebrow above the heading.
- **NEVER `transition: all`.** List the specific properties being transitioned (G10).
- **NEVER zero-chroma neutrals as a default.** The genre allows them (G22 override), but Cobalt's discipline is to tint every neutral toward 250° — a flat `oklch(96% 0 0)` panel reads untuned.

## Nav & footer routing

**Nav:**
- **N1b (saas three-section)** — wordmark + links + a cobalt primary button; the canonical dev-tool nav.
- **N13 (inline cmdk pill)** — a ⌘K command-bar affordance in the nav; the page behaves like a tool, not a brochure.
- **N2 (floating chip)** — a compact floating accent-outlined chip; suits the near-white canvas.

**Footer:**
- **Ft1 (mast-headed)** — a structured meta grid with links, status, and version; the docs-home footer.
- **Ft7 (newsletter-first)** — a changelog or release-notes signup; the dev-tool engagement pattern.

**Avoid:** N6 (newspaper masthead — the editorial register is wrong), Ft6 (letter close — too literary for a product page).

## Worked example

A Stat-Led hero slice showing moves 1 + 2 + 3 — electric cobalt signal, grotesk display, hairline rules with tabular numerals. Engine-clean: tokens via `var()`, muted text via `color-mix`, `:focus-visible` on the link (G26), no gradient text (G2), no `transition: all` (G10), no pure `#000`/`#fff` (G7).

```html
<section class="hero" aria-labelledby="hero-title">
  <p class="eyebrow">v4.2.0 · STATUS · STABLE</p>
  <h1 id="hero-title">An API that scales to your <span class="hl">traffic</span>.</h1>
  <p class="lede">Returns in under 40ms at the 99th percentile. One SDK. Three runtimes. No config.</p>
  <a class="btn" href="#docs">Read the docs</a>
  <dl class="stats">
    <div><dt>P99</dt><dd><b>40</b>ms</dd></div>
    <div><dt>Uptime</dt><dd>99.97<span class="unit">%</span></dd></div>
    <div><dt>Regions</dt><dd>14</dd></div>
  </dl>
</section>
```

```css
.hero {
  max-width: var(--shell); margin-inline: auto; padding: var(--space-3xl) var(--page-gutter);
  display: grid; gap: var(--space-l); border-top: 1px solid
    color-mix(in oklch, var(--color-accent) 30%, transparent);
}
.eyebrow { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--color-accent); font-variant-numeric: tabular-nums; }
.hero h1 { font-family: var(--font-display); font-weight: 600; font-size: clamp(2.2rem, 5vw, 3.8rem);
  line-height: 1.06; letter-spacing: -0.02em; max-width: 18ch; color: var(--color-ink); }
.hero .hl { color: var(--color-accent); }
.lede { max-width: 52ch; font-family: var(--font-body); font-size: 1.1rem; line-height: 1.5;
  color: color-mix(in oklch, var(--color-ink) 72%, transparent); }
.btn { display: inline-flex; align-items: center; gap: 0.5em; padding: 0.7rem 1.3rem;
  border: 1px solid var(--color-accent); border-radius: 6px; color: var(--color-accent-ink);
  background: var(--color-accent); font-family: var(--font-body); font-weight: 600;
  text-decoration: none; transition: background-color 160ms, border-color 160ms; }
.btn:hover { background: color-mix(in oklch, var(--color-accent) 88%, var(--color-ink)); }
.btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
.stats { display: flex; gap: var(--space-xl); border-top: 1px solid
  color-mix(in oklch, var(--color-ink) 12%, transparent); padding-top: var(--space-m);
  font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
.stats dt { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: color-mix(in oklch, var(--color-ink) 55%, transparent); }
.stats dd { color: var(--color-ink); }
.stats b { font-size: 1.5rem; color: var(--color-accent); }
.stats .unit { color: color-mix(in oklch, var(--color-ink) 50%, transparent); }
@media (prefers-reduced-motion: reduce) { .btn { transition: none; } }
```

## Gate overrides

Cobalt is **modern-minimal** (light). The genre loosens these global rules — cite them in the CSS stamp's `overrides:` field:

- **G7** — allows pure `#fff` / `oklch(100% 0 0)` paper. Cobalt uses `oklch(99% 0.002 250)` — a hair off pure white — but the override permits pure white if a build needs it.
- **G22** — allows zero-chroma neutrals (`oklch(L 0 H)`). Cobalt's discipline is to tint anyway, but the override is available.

Everything else binds at full strength: G2 (no gradient text), G23 (accent footprint ≤5% — cobalt is a signal, not a wash), G40-41 (contrast — cobalt on near-white must clear Lc 60), G48 (token discipline — every colour a named token, no mid-render hex).

## Engine cross-ref

The gates that police Cobalt's signature moves. If a build drifts, these are the checkers that fire.

| Signature move | Police gates | How the engine catches drift |
|---|---|---|
| Engineered near-white with one electric cobalt signal | G7 · G22 · G23 · G40-41 | G7 fails pure `#000` ink (override covers paper only, not ink); G22 override is available but the engine still flags zero-chroma neutrals unless the stamp declares it; G23 fails an accent area >5% of viewport (a wash); G40-41 fails a cobalt-on-near-white pair below Lc 60. |
| Grotesk display + humanist body, mono for code | G1 · G37 · G38a | G1 fails a banned display font (Inter/Roboto/Open Sans/Poppins/Lato); G37 fails >3 families (Space Grotesk + Geist + Geist Mono = 3, the ceiling); G38a (vision) fails an italic header. |
| Hairline rules and tabular numerals | G24 · G48 | G24 fails off-scale spacing values (1px hairline is on-scale); G48 fails any `color:`/`background:` raw value outside `:root` — every tint must be a named token or a `color-mix` on a token. |
| Token discipline (cross-cutting) | G48 | G48 fails any raw hex or oklch value outside `:root` — muted text must use `color-mix(in oklch, var(--color-ink) N%, transparent)`, never a mid-render literal. |
