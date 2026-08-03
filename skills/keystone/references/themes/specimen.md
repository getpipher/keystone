# Theme — Specimen

A high-contrast serif, foundry-editorial register — the type IS the product. Reach for it only when the brief is explicitly editorial, foundry, or journal; it is NOT a default.

## Axes (diversification)
- **Paper band** — light
- **Display style** — high-contrast-serif
- **Accent hue** — neutral-warm

## Palette
```css
:root[data-theme="specimen"] {
  --color-paper:    oklch(96% 0.01 80);
  --color-paper-2:  oklch(93% 0.012 80);
  --color-paper-3:  oklch(89% 0.015 80);
  --color-ink:      oklch(20% 0.01 60);
  --color-accent:   oklch(58% 0.13 45);
  --color-accent-ink: oklch(98% 0.01 80);
  --color-focus:    oklch(58% 0.13 45);
  --font-display:   "Fraunces", ui-serif, Georgia, serif;
  --font-body:      "Source Serif 4", ui-serif, Georgia, serif;
  --font-mono:      "IBM Plex Mono", monospace;
}
```
Warm oat paper `oklch(96% 0.01 80)` — never pure white (G7; editorial does NOT take the modern-minimal override). One accent `oklch(58% 0.13 45)` — a warm ochre used only for labels, rules, and links, never a fill. `--color-accent-ink` is near-paper for the rare ochre-filled badge where contrast must hold.

## Fonts (free)
- **Display:** Fraunces (Google Fonts)
- **Body:** Source Serif 4 (Google Fonts)
- **Mono:** IBM Plex Mono (Google Fonts)
The high-contrast serif IS the identity. Fraunces (display, optical-size axis) for headlines; Source Serif 4 for all body prose; IBM Plex Mono for labels, ordinals, and metadata only — never prose. No sans in the body. Three families = ceiling (G37); mono = outlier, ≤2 slots (G38).

## Signature moves
A Specimen build must exhibit at least two of these three.

### 1 — High-contrast serif as the whole identity
Fraunces (display, optical-size axis) headlines, Source Serif 4 body. The type IS the product — no sans, no fallback. If a sans sneaks into the body, the theme is misapplied (route to Cobalt for sans-led). Calibrates against Klim Type Foundry and Grilli Type foundry pages where the specimen face carries the entire page identity. Display weight 600 with `optical-size: 144` for large headlines; body at 400/16 with measure 55-70ch.

### 2 — Specimen-sheet macrostructure as the spine
The page is a catalogue of types/specimens; each entry is a labelled specimen card — character set, pangram, metadata strip — separated by hairline rules. Calibrates against a type-foundry catalogue or a printed specimen book. Each card has an asymmetric internal grid (the metadata strip is a narrow column; the character set is a wide block). The catalogue reads top-to-bottom, never side-by-side equal columns.

### 3 — Neutral-warm anchor, ink-on-paper restraint
Paper `oklch(96% 0.01 80)` (warm oat), accent `oklch(58% 0.13 45)` used only for labels, rules, and links — the accent is punctuation, never a fill. Calibrates against a journal's spot-colour plates: one ink for the body, one ink for the highlights, and the paper does the rest. If the ochre covers more than 5% of any viewport, the restraint is broken.

## Macrostructure affinity
**Loves:**
- Specimen — the namesake macro; the page is a catalogue of labelled entries.
- Type Specimen — each entry showcases one face with a character set and pangram.
- Catalogue — a numbered, indexed sequence of specimens.
- Index-First — an editorial table-of-contents leads before the specimens.

**Rejects:**
- Workbench — interactive tool surfaces break the foundry reading register.
- Stat-Led when the brief is editorial — large numbers crowd out the type specimens; route to a stat-led theme instead.

## Voice fixtures
Foundry, editorial, precise, declarative, specific. Sentence case. Nouns over verbs.
Headlines: "A catalogue of type, set with care." · "Specimens, not slogans." · "Twelve faces, one workshop." · "Each cut drawn from a single skeleton."
Body: "Each cut is drawn from a single skeleton." · "The specimen book updates with each release."
Labels (mono): `Nº 04` · `CUT · DISPLAY` · `YEAR · 2026`
Never: supercharge, leverage, ecosystem, holistic, AI-powered, intelligent, transformative, journey, seamless, unlock, empower, revolutionize, next-generation, world-class.

## Anti-patterns (theme-specific)
- NEVER use a sans-serif body — Source Serif 4 only; if the brief needs sans, route to Cobalt.
- NEVER use pure white paper — `oklch(96% 0.01 80)` is the floor (G7; editorial takes no modern-minimal override).
- NEVER use pure black ink — `oklch(20% 0.01 60)` is the ceiling (G7).
- NEVER use zero-chroma neutrals — tint toward 60-80° (G22); the warmth is the identity.
- NEVER introduce a second accent — single ochre only; if two inks are needed, route to Riso.
- NEVER use gradient text (G2) — the serif carries the voice, not a colour ramp.
- NEVER use an accent surface wash — ochre is punctuation for labels/rules/links (G23, ≤5% footprint).
- NEVER set headers in italic — Fraunces is upright; emphasis comes from weight or the ochre key-word (G38a).
- NEVER use tag-left/heading-right layouts — stack the eyebrow above the heading (G54).
- NEVER use a 3-equal-column card grid — specimens are asymmetric (G3).
- NEVER nest cards inside cards (G4) — each specimen is a single flat entry.
- NEVER invent metrics — type specimens cite real character counts, weights, and optical sizes (G46).

## Nav & footer routing
**Nav:** N1 (wordmark + 2 links) — the quietest possible nav; the type does the talking. N9 (edge-aligned minimal) — left-edge wordmark, right-edge index link, nothing between.
**Footer:** Ft3 (index-style category list) — a printed-table-of-contents footer that doubles as a sitemap. Ft1 (mast-headed) — a wordmark-led footer that closes the book.
**Avoid:** N2/N5 (floating-pill dev-tool navs — wrong register for a foundry). Ft8 (marquee scroll — too playful for editorial).

## Worked example
A single specimen-card entry showing the high-contrast serif identity and the specimen-sheet spine.

```html
<article class="specimen-card">
  <div class="specimen-card__strip">
    <span class="label">Nº 04</span>
    <span class="label">CUT · DISPLAY</span>
    <span class="label">YEAR · 2026</span>
  </div>
  <h2 class="specimen-card__title">Fraunces</h2>
  <p class="specimen-card__charset">ABCDEFG abcdefg 0123456789 &amp; ?</p>
  <p class="specimen-card__pangram">The quick brown fox jumps over the lazy dog.</p>
  <a class="specimen-card__link" href="#fraunces">View full specimen →</a>
</article>
```
```css
.specimen-card {
  border-top: 1px solid var(--color-accent);
  padding: 2rem 0;
  max-width: 65ch;
}
.specimen-card__strip {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
.label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.specimen-card__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 2.5rem;
  font-variation-settings: "opsz" 144;
  line-height: 1.1;
  color: var(--color-ink);
  margin: 0 0 0.75rem;
}
.specimen-card__charset {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-ink);
  margin: 0 0 0.5rem;
}
.specimen-card__pangram {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: color-mix(in oklch, var(--color-ink) 85%, transparent);
  margin: 0 0 1rem;
}
.specimen-card__link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
.specimen-card__link:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 0.2em;
}
```

## Gate overrides
Specimen is **editorial** (light). Overrides:
- **G6** — a centred-narrow hero is allowed, but the eyebrow or CTA sits off-axis (editorial does NOT inherit the atmospheric centred-everything allowance).
- **G21** — the Specimen macrostructure is ALLOWED when the brief signals editorial/foundry/journal. Specimen is the one theme whose namesake macro it may default to — but only on signal, never as a fall-through.

Everything else binds at full strength: G7 (no pure white — editorial takes no modern-minimal override; the warm oat tint is enforced), G22 (no zero-chroma neutrals), G25 (prose measure 45-75ch), G54 (stack eyebrow), G3/G4 (no 3-col grid / no nested cards). Stamp `overrides: ["G6", "G21"]`.

## Engine cross-ref
| Signature move | Police gates | How the engine catches drift |
|---|---|---|
| High-contrast serif identity | G1 (banned fonts) · G37 (≤3 families) · G38a (no italic headers) | Parser flags sans-serif font-family in body; family count >3 fails; italic font-style on a heading element fails |
| Specimen-sheet spine | G3 (no 3-equal-col card grid) · G4 (no nested cards) · G54 (no tag-left/heading-right) | DOM scan detects 3-col equal grid; nested `<article>` inside `<article>` fails; inline tag-left + heading-right on same row fails |
| Neutral-warm ink-on-paper restraint | G22 (no zero-chroma) · G48 (token discipline) · G40-41 (contrast) | CSS parser flags `oklch(L 0 H)` zero-chroma; raw hex/oklch outside `:root` fails; contrast engine computes accent-ink on ochre fills |
| Warm-tinted paper (cross-cutting) | G7 (no pure white — editorial takes no override) | CSS parser flags `#fff` / `oklch(100% 0 0)` on paper tokens; the override table confirms editorial gets no G7 pass |
