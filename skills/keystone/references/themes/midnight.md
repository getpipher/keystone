# Theme — Midnight

Dark-paper atmospheric canvas with a single cool-accent signal — the default dark mode for modern product pages. The AI-tool / dev-tool dark school anchor: Linear, Vercel, Raycast energy. The page reads like a quiet instrument panel at 03:00.

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

One accent. Every neutral is tinted toward the accent's hue 260–200° — the paper is never pure black, the ink is never pure white. `--color-accent-ink` is the paper colour itself: when the accent fills a surface (a button, a badge), the label drops to paper-dark so the contrast clears G40.

## Fonts (free)

- **Display:** Space Grotesk (Google Fonts)
- **Body:** Geist (Vercel)
- **Mono:** Geist Mono

Type discipline: Space Grotesk carries words (display, headings, the wordmark); Geist Mono carries figures (stats, timestamps, version numbers, log lines). Geist body sits between. Three families is the ceiling (G37); the mono never appears in a heading (G38a — no italic, and no mono-as-display either; the split is words vs figures, not faces vs faces). Display tracking `-0.02em`; body `tabular-nums` on.

## Signature moves

A Midnight build must exhibit **at least two of these three**. They are the theme's vocabulary, not a layout — which appear is shared, but how they compose must differ every build.

### 1. Single cool-accent signal on a tinted-dark canvas

One accent (`oklch(72% 0.17 200)`) used as a *signal*, never as a surface wash. It marks: the primary CTA, a key link underline, a single status dot, the focus ring. Everything else is ink-on-paper. The canvas is tinted toward the accent hue (`oklch(15% 0.02 260)` — hue 260, a hair off the accent's 200°, so the dark ground and the accent read as one temperature). Calibrates against Linear's near-black-with-violet and Raycast's crimson-on-coal. The discipline: if the accent covers more than ~5% of any viewport, it has stopped being a signal and become a wash — retreat it (G23).

### 2. Atmospheric radial bloom behind one hero

One fixed-attachment radial gradient bloom behind the hero only, up to ~20% of the canvas, in the accent at low alpha (`oklch(72% 0.17 200 / 0.18)`). The rest of the page is flat tinted-dark — no second bloom, no section-level gradients. The bloom is the only background ornament on the entire page; it earns its place because the hero is the page's one atmospheric moment. Calibrates against Vercel's hero glow. Never on text (G2), never animated (G29), never extends past the hero's block.

### 3. Monospaced numerals as the data voice

Every figure — stats, timestamps, latency, version, region labels — is set in Geist Mono. The display (Space Grotesk) carries the words around them. A Stat-Led hero reads "P99 **42ms**" with the number in mono and the unit in mono-space; a changelog reads `v4.2.0 · 2026-08-02` in mono. The mono is the data register; the geometric sans is the human register. Two voices, clear job split.

## Macrostructure affinity

**Loves:**
- **Marquee Hero** — the bloom + a single centred-or-off-centre hero is Midnight's canonical opening; the canvas is the design (G6 atmospheric override applies).
- **Workbench** — a live product/demo panel surrounded by quiet dark chrome; the dev-tool register.
- **Stat-Led** — big mono numerals carry the story; the accent marks the one number that matters.
- **Ecosystem Index** — a dense, dark, indexed catalogue of integrations; reads like a registry, not a marketing page.

**Rejects:**
- **Letter** — too literary for a dark instrument panel; the warm-paper register is wrong.
- **Long Document** — Midnight is not a 2,000-word essay theme; prose-heavy long-form wants Garden or Specimen.
- **Manifesto** — the polemical all-caps poster register fights the quiet-instrument voice.

## Voice fixtures

Cool, technical, sparse. Declarative. Nouns and verbs over adjectives. No hype, no exclamation marks, no em-dash piles (one per paragraph max).

Headlines:
- "Ship at 03:00."
- "Latency you don't feel."
- "The runtime is the product."
- "One process. No noise."

Body patterns:
- "Deploys in under a second. No build step to wait on."
- "Runs in your terminal. Returns a report."
- "Built for the night shift."

Mono labels — UPPERCASE, tabular-nums, used for ordinals and metrics:
- `01 · UPTIME`
- `REGION · US-EAST-2`
- `P99 · 42MS`
- `v4.2.0`

Never: supercharge, unlock, revolutionize, seamless, intelligent, AI-powered, transformative, journey, holistic, empower, leverage, game-changing, next-generation.

## Anti-patterns (theme-specific)

- **NEVER pure black paper.** `oklch(15% 0.02 260)` is the floor. Pure `#000` / `oklch(0 0 0)` flattens the tint and reads as a void, not a canvas (G7).
- **NEVER pure white ink.** `oklch(96% 0.008 260)` is the ceiling. Pure `#fff` on a dark ground is harsh and breaks the tint temperature (G7).
- **NEVER zero-chroma neutrals.** Every surface tinted toward 260° (G22). A `oklch(20% 0 0)` grey panel is a tell — it reads flat and untuned.
- **NEVER a second accent.** Midnight is single-accent. A warm pop colour or a second cool hue means the wrong theme (route to Hum for multi-accent, Cobalt for a lighter single-cool register).
- **NEVER gradient text.** Accent-on-dark headline, or a drawn underline — never `background-clip: text` (G2).
- **NEVER an accent surface wash.** The accent is a signal (links, CTA, focus, one dot). A full-bleed accent section, an accent-tinted half-page, or a big accent headline block is a wash — retreat it (G23).
- **NEVER more than one radial bloom.** One, behind the hero, ≤20% canvas, fixed, not animated (G29). A second bloom anywhere is overuse.
- **NEVER italic headers.** Headings are upright Space Grotesk; emphasis comes from weight or the accent, never `font-style: italic` (G38a).
- **NEVER re-drawn browser/terminal chrome around a demo.** Use a real `<figure>` + screenshot, or let the Workbench panel stand on its own (G47). Midnight's chrome is the page itself — don't fake more.
- **NEVER invented metrics.** Every mono numeral must be real or absent — `—` in a grey block beats a fabricated "99.9%" (G46).

## Nav & footer routing

**Nav:**
- **N3 (side rail)** — a left-edge rail of icons is Midnight's native nav; it stays out of the hero's way and reads as tooling, not marketing.
- **N5 (floating pill)** — a floating accent-outlined pill for the primary actions; suits the atmospheric canvas.
- **N9 (edge-aligned minimal)** — wordmark left, two links right, no border; the quietest option.

**Footer:**
- **Ft5 (statement)** — one short line, mono, bottom-anchored; fits the instrument-panel voice.
- **Ft3 (index-style category list)** — a dense linked index; reads as a registry, not a sitemap.

**Avoid:** N1 / N1b (the wordmark + inline links + button-right + hairline default — the AI nav fingerprint, G42), Ft1 (the mast-headed giant meta grid — too SaaS for this register).

## Worked example

A minimal Stat-Led hero showing moves 1 + 2 + 3. Engine-clean: tokens via `var()`, `:focus-visible` present (G26), no gradient text (G2), no pure black/white (G7), bloom is one fixed radial ≤20% (G29).

```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__bloom" aria-hidden="true"></div>
  <p class="eyebrow">01 · UPTIME</p>
  <h1 id="hero-title">Latency you don't <span class="hl">feel</span>.</h1>
  <p class="lede">Deploys in under a second. No build step to wait on.</p>
  <a class="btn" href="#start">Read the brief</a>
  <dl class="stats">
    <div><dt>P99</dt><dd><b>42</b>ms</dd></div>
    <div><dt>Region</dt><dd>us-east-2</dd></div>
  </dl>
</section>
```

```css
.hero {
  position: relative; min-height: 88vh; padding: var(--space-3xl) var(--page-gutter);
  max-width: var(--shell); margin-inline: auto; display: grid; gap: var(--space-l);
}
.hero__bloom {
  position: absolute; inset: -20% 30% auto auto; width: 60vw; height: 60vw; max-width: 720px; max-height: 720px;
  background: radial-gradient(circle at 50% 50%, oklch(72% 0.17 200 / 0.18), transparent 62%);
  background-attachment: fixed; pointer-events: none; z-index: 0;
}
.hero > * { position: relative; z-index: 1; }
.eyebrow { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.10em;
  text-transform: uppercase; color: var(--color-accent); }
.hero h1 { font-family: var(--font-display); font-weight: 600; font-size: clamp(2.4rem, 6vw, 4.2rem);
  line-height: 1.04; letter-spacing: -0.02em; max-width: 16ch; }
.hero .hl { color: var(--color-accent); }
.lede { max-width: 52ch; color: oklch(80% 0.01 260); }
.btn { display: inline-flex; align-items: center; gap: 0.5em; padding: 0.8rem 1.4rem;
  border: 1px solid var(--color-accent); border-radius: 999px; color: var(--color-accent);
  background: transparent; font-weight: 600; text-decoration: none;
  transition: background-color 160ms, color 160ms; }
.btn:hover { background: var(--color-accent); color: var(--color-accent-ink); }
.btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
.stats { display: flex; gap: var(--space-xl); font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
.stats dt { font-size: 11px; letter-spacing: 0.10em; text-transform: uppercase; color: oklch(70% 0.01 260); }
.stats dd { color: var(--color-ink); }
.stats b { font-size: 1.6rem; color: var(--color-accent); }
@media (prefers-reduced-motion: reduce) { .hero__bloom { background-attachment: scroll; } }
```

## Gate overrides

Midnight is **atmospheric** (dark). The genre loosens these global rules — cite them in the CSS stamp's `overrides:` field:

- **G2** — radial gradients allowed on the background only (the hero bloom). Never on text, never on pill buttons.
- **G6** — a centred hero is allowed when the canvas itself is the design (the bloom + a single anchored hero). The eyebrow or CTA should still sit off-axis when the bloom is asymmetrical.
- **G23 / G29** — one accent-tinted radial bloom up to ~20% of the canvas, fixed-attached, no animation. Beyond the hero, the accent stays a signal (~5% footprint).

Everything else binds at full strength: G7 (no pure black/white — the tint is the point), G22 (no zero-chroma neutrals), G40-41 (contrast on dark — verify every ink-on-paper and accent-on-paper pair clears Lc 60).

## Engine cross-ref

The gates that police Midnight's signature moves. If a build drifts, these are the checkers that fire.

| Signature move | Police gates | How the engine catches drift |
|---|---|---|
| Single cool-accent signal on tinted-dark canvas | G7 · G22 · G23 · G40-41 | G7 fails pure `#000`/`#fff` tokens; G22 fails a `oklch(L 0 H)` neutral panel; G23 fails an accent area >5% of viewport (a wash); G40-41 fails an ink/paper or accent-ink/accent pair below Lc 60. |
| Atmospheric radial bloom behind one hero | G2 · G29 · G23 | G2 fails a `linear-gradient` + `background-clip: text` (gradient text); G29 (vision) fails >1 accent colour or an animating mesh on the whole page; G23 fails a bloom footprint beyond the ~20% atmospheric allowance. |
| Monospaced numerals as the data voice | G1 · G37 · G38a | G1 fails a banned display font (Inter/Roboto/etc.); G37 fails >3 families (Space Grotesk + Geist + Geist Mono = 3, the ceiling); G38a (vision) fails an italic header. |
| Tinted-dark neutrals (cross-cutting) | G48 | G48 fails any `color:`/`background:` raw value outside `:root` — every tint must be a named token, never a mid-render hex. |
