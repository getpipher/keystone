# Theme — Garden

Light-paper editorial register with a chromatic-green anchor — warm, organic, studio-built. The canonical editorial-friendly theme: a field-guide, a small-batch roastery, a botanical journal. Reads like it was set by hand on warm paper, not generated on a whiteboard.

## Axes (diversification)

- **Paper band** — light
- **Display style** — roman-serif
- **Accent hue** — chromatic-green

## Palette

```css
:root[data-theme="garden"] {
  --color-paper:    oklch(97% 0.015 120);
  --color-paper-2:  oklch(94% 0.02 120);
  --color-paper-3:  oklch(90% 0.025 120);
  --color-ink:      oklch(22% 0.015 140);
  --color-accent:   oklch(52% 0.13 145);
  --color-accent-ink: oklch(98% 0.01 120);
  --color-focus:    oklch(52% 0.13 145);
  --font-display:   "Newsreader", ui-serif, Georgia, serif;
  --font-body:      "Source Serif 4", ui-serif, Georgia, serif;
  --font-mono:      "IBM Plex Mono", monospace;
}
```

One accent — a chromatic green at hue 145°, the botanical anchor. Paper is warm-green-tinted (`oklch(97% 0.015 120)`, hue 120 — a hair off the accent's 145° so the ground and the accent read as one garden). Never pure white (G7 — the editorial genre does not take the modern-minimal `#fff` override); the warmth is the point. `--color-accent-ink` is near-paper so a green-filled badge or link keeps its label readable (G40-41).

## Fonts (free)

- **Display:** Newsreader (Google Fonts)
- **Body:** Source Serif 4 (Google Fonts)
- **Mono:** IBM Plex Mono (Google Fonts)

Type discipline: the serif IS the design. Newsreader (display, optical-size axis) for headlines and the wordmark; Source Serif 4 for all body prose; IBM Plex Mono only for labels, ordinals, and metadata — never for prose. No sans anywhere in the prose. Three families is the ceiling (G37); the mono is the outlier, used in at most two slots per page (G38 — labels + one metadata strip, no more).

## Signature moves

A Garden build must exhibit **at least two of these three**. They are the theme's vocabulary — which appear is shared, how they compose must differ every build.

### 1. Serif-led editorial hierarchy

Newsreader for headlines, Source Serif 4 for body. The serif carries the whole page; there is no sans fallback in the prose. Headlines use the display optical size; body uses a comfortable reading size at a 65ch measure. Calibrates against a printed field-guide and a small-batch roastery's catalogue — the type is the product, not a container for it. The discipline: if a sans sneaks into the body, the theme is misapplied (route to Cobalt for a sans-led editorial-adjacent register).

### 2. Chromatic-green as the single editorial anchor

One accent (`oklch(52% 0.13 145)`), used for key-words in a headline, link underlines, section rules at hairline weight, and the focus ring. It never fills a surface larger than a badge — no green sections, no green hero blocks. The green is punctuation, not paint. Calibrates against a botanical journal's spot-colour plates. The discipline: if the green covers more than ~5% of a viewport, it has stopped being an anchor and become a wash (G23).

### 3. Long-document rhythm with marginalia

Generous measure (65ch body, 50ch lede), hanging-indent side-notes in the margin (S2), section rules in the accent at 1px hairline weight, and varied section padding — the page reads like a printed journal with a real rhythm, not a stack of equal-height blocks. Side-notes are mono, small, and sit in the wide margin; they annotate, they don't decorate.

## Macrostructure affinity

**Loves:**
- **Long Document** — Garden's native shape: a measured, marginalia-rich essay or guide.
- **Catalogue** — a grid of specimens/items where each entry is a labelled card with a metadata strip; the botanical-catalogue register.
- **Letter** — a single open letter or statement; the serif voice carries warmth that Midnight's dark register cannot.
- **Specimen** — a type-foundry / editorial catalogue; the serif-led display has range for it (G21 — Specimen macrostructure allowed when the brief signals editorial).

**Rejects:**
- **Marquee Hero** — the big atmospheric single-card hero fights the quiet editorial voice.
- **Workbench** — a live demo panel surrounded by chrome is the dev-tool register, not the studio register.

## Voice fixtures

Warm editorial, botanical, specific. Nouns over verbs. Concrete detail over abstraction. Sentence case. No hype, no exclamation marks, no em-dash piles (one per paragraph max).

Headlines:
- "Grown slowly, picked by hand."
- "A field guide to making things."
- "Notes from the garden, week twelve."
- "Seven raised beds on a quarter-acre."

Body patterns:
- "We tend seven raised beds on a quarter-acre in the river valley."
- "The catalogue updates each Sunday at dawn."
- "Pressed, dried, and labelled — in that order."

Mono labels — UPPERCASE, used for ordinals, issue numbers, and section markers:
- `ISSUE · 04`
- `SEASON · LATE SUMMER`
- `№ 12`
- `FIELD · B`

Never: supercharge, leverage, ecosystem, holistic, mindful, AI-powered, journey, seamless, unlock, transform, empower, revolutionize, next-generation, world-class.

## Anti-patterns (theme-specific)

- **NEVER a sans-serif body.** Source Serif 4 is the body face. A sans body means the wrong theme (route to Cobalt for a sans-led register).
- **NEVER pure white paper.** `oklch(97% 0.015 120)` is the ground. Pure `#fff` drains the warmth and reads clinical, not editorial (G7 — editorial does not take the modern-minimal override).
- **NEVER pure black ink.** `oklch(22% 0.015 140)` is the ceiling. Pure `#000` on warm paper is harsh and breaks the tint (G7).
- **NEVER zero-chroma neutrals.** Every surface tinted toward 120–145° (G22). A flat `oklch(94% 0 0)` panel reads untuned.
- **NEVER a second accent.** Garden is single-accent (chromatic-green). A second spot-colour means the wrong theme (route to Riso for two-ink print, Hum for multi-accent).
- **NEVER gradient text.** A green key-word, a drawn underline, or a hairline rule — never `background-clip: text` (G2).
- **NEVER an accent surface wash.** The green is punctuation. A full-bleed green section or a green hero block is a wash — retreat it (G23).
- **NEVER italic headers.** Headings are upright Newsreader; emphasis comes from weight, the green key-word, or a drawn underline — never `font-style: italic` (G38a).
- **NEVER tag-left / heading-right.** An eyebrow beside a heading on one row is the AI section-head tell (G54). Stack the eyebrow above the heading in one column.
- **NEVER equal-whitespace sections.** A garden has varied rhythm — vary section padding, add a hairline rule or a colour shift between sections (G9).
- **NEVER invented metrics.** Every figure must be real or absent. "Seventy-two varieties" is honest only if there are seventy-two.

## Nav & footer routing

**Nav:**
- **N6 (newspaper masthead)** — a masthead with the wordmark centred-left and a thin rule beneath; the editorial native.
- **N1 (wordmark + 2 links)** — the quietest option; wordmark left, two links right, no border.
- **N9 (edge-aligned minimal)** — wordmark left, a single link right, flush to the edges.

**Footer:**
- **Ft3 (index-style category list)** — a dense linked index of sections/categories; reads as a table of contents, not a sitemap.
- **Ft6 (letter close)** — a short signed-off close; fits the letter/editorial voice.

**Avoid:** N2 / N5 (the floating-pill / floating-chip dev-tool navs — wrong register), Ft7 (newsletter-first — too SaaS for this voice).

## Worked example

A minimal Long-Document opening showing moves 1 + 2 + 3. Engine-clean: tokens via `var()`, `:focus-visible` on the link (G26), no gradient text (G2), no pure black/white (G7), 65ch measure (G25), stacked eyebrow+heading (G54).

```html
<article class="entry">
  <header class="entry__head">
    <p class="eyebrow">ISSUE · 04 · FIELD B</p>
    <h1>A field guide to making <span class="hl">things</span>.</h1>
    <p class="lede">Notes from the garden, week twelve. Seven raised beds, one river valley, and a catalogue that updates each Sunday at dawn.</p>
  </header>
  <section class="entry__body">
    <p>We tend seven raised beds on a quarter-acre in the river valley. The catalogue updates each Sunday at dawn, pressed, dried, and labelled — in that order.</p>
    <p><a href="#more">Read the full field guide</a></p>
  </section>
</article>
```

```css
.entry { max-width: var(--shell); margin-inline: auto; padding: var(--space-3xl) var(--page-gutter); }
.entry__head { max-width: 50ch; }
.eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em;
  text-transform: uppercase; color: var(--color-accent); }
.entry h1 { font-family: var(--font-display); font-weight: 500; font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.08; letter-spacing: -0.01em; color: var(--color-ink); }
.entry .hl { color: var(--color-accent); }
.lede { font-family: var(--font-body); font-size: 1.15rem; line-height: 1.5; color: oklch(35% 0.02 140); }
.entry__body { max-width: 65ch; font-family: var(--font-body); line-height: 1.6; color: var(--color-ink); }
.entry__body p + p { margin-top: var(--space-m); }
.entry a { color: var(--color-accent); text-decoration: underline; text-underline-offset: 2px;
  text-decoration-thickness: 1px; }
.entry a:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
```

## Gate overrides

Garden is **editorial** (light). The genre loosens these global rules — cite them in the CSS stamp's `overrides:` field:

- **G6** — a centred-narrow hero is allowed, but the eyebrow or CTA sits off-axis. Editorial does not inherit the atmospheric "centred-everything" allowance; the off-axis requirement stays.
- **G21** — the Specimen macrostructure is allowed when the brief signals editorial / foundry / journal. Garden is the editorial theme that may reach for Specimen — but only on signal, never as a fall-through.

Everything else binds at full strength: G7 (no pure white — editorial does not take the modern-minimal override; the warm tint is the point), G22 (no zero-chroma neutrals), G25 (prose measure 45-75ch), G54 (no tag-left/heading-right — stack the eyebrow).

## Engine cross-ref

The gates that police Garden's signature moves. If a build drifts, these are the checkers that fire.

| Signature move | Police gates | How the engine catches drift |
|---|---|---|
| Serif-led editorial hierarchy | G1 · G37 · G38a | G1 fails a banned display font (Inter/Roboto/Open Sans/Poppins/Lato); G37 fails >3 families (Newsreader + Source Serif 4 + IBM Plex Mono = 3, the ceiling); G38a (vision) fails an italic header. |
| Chromatic-green as the single editorial anchor | G23 · G48 · G22 | G23 fails an accent area >5% of viewport (a wash); G48 fails any raw colour value outside `:root` — the green must be the `--color-accent` token, never a mid-render hex; G22 fails a zero-chroma neutral panel. |
| Long-document rhythm with marginalia | G25 · G54 · G9 · G40-41 | G25 fails a prose `max-width` outside 45-75ch; G54 fails an eyebrow beside a heading on a multi-column row (stack it); G9 (vision) fails two adjacent sections with identical rhythm; G40-41 fails a lede/body contrast pair below Lc 60. |
| Warm-tinted paper (cross-cutting) | G7 | G7 fails pure `#fff` / `oklch(100% 0 0)` paper — editorial does not take the modern-minimal override, so the warm tint is enforced, not optional. |
