# Theme — Manifesto

Polemical poster register — "belief before product." Condensed grotesk display at poster scale, cream paper, one restrained warm-red accent. The page is a sequence of numbered declarations, not feature cards. Light by default with a tinted dark variant.

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
```css
:root[data-theme="manifesto"][data-mode="dark"] {
  --color-paper:    oklch(15% 0.005 0);
  --color-paper-2:  oklch(20% 0.006 0);
  --color-paper-3:  oklch(26% 0.008 0);
  --color-ink:      oklch(96% 0.004 0);
  --color-accent:   oklch(70% 0.10 25);
  --color-accent-ink: oklch(15% 0.005 0);
  --color-focus:    oklch(70% 0.10 25);
}
```
Black-on-cream by default; the dark variant inverts to tinted near-black paper with near-white ink — both modes tinted, never pure `#000`/`#fff` (G7). One accent `oklch(55% 0.08 25)` — a restrained warm-neutral red, used for the one emphatic mark per page.

## Fonts (free)
- **Display:** Anton (Google Fonts)
- **Body:** Geist (Vercel)
- **Mono:** Geist Mono

Anton — a condensed grotesk — at poster scale for the hero statement ONLY. ALL-CAPS allowed for the hero statement but watch G55 (line-height ≥ 1.0 for all-caps display). Geist body. Geist Mono for ordinals/section markers. Three families = ceiling (G37).

## Signature moves

A Manifesto build must exhibit at least two of these three.

### 1 — Condensed grotesk display at poster scale
Anton at huge `clamp()` sizes — `clamp(3rem, 12vw, 9rem)` — for the hero statement only. ALL-CAPS permitted on that one headline (G55: line-height ≥ 1.0). The register is polemical, declarative: "We believe the browser is the runtime." Calibrates against a political-poster tradition and a punk-zine cover — type as weapon, not decoration. Every subsequent heading drops to Geist body weight; Anton never appears below the fold.

### 2 — Black-on-cream (and the inverted dark variant)
Paper `oklch(98% 0.004 0)` (near-white, warm-neutral), ink `oklch(15% 0.005 0)` (near-black, never pure — G7). The dark variant inverts to `oklch(15% 0.005 0)` paper with `oklch(96% 0.004 0)` ink — same tinted neutral family, no chroma crash. Two modes, one register. The accent `oklch(55% 0.08 25)` stays warm-red in both; it darkens slightly in dark mode for contrast (G40-41).

### 3 — The statement as the spine
The page is a sequence of short numbered declarations (Manifesto macrostructure), each one line, heavy leading (`line-height: 1.5`+ on body), generous negative space between them. No feature cards, no testimonials, no logo walls. Section rhythm varies deliberately (G9) — a two-line declaration gets a different vertical beat than a five-line one. The mono ordinals (`01.` `02.` `03.`) are the only structural ornament.

## Macrostructure affinity

**Loves:**
- Manifesto — the theme's namesake; numbered declarations are the spine.
- Letter — first-person plural voice fits the epistolary single-column register.
- Marquee Hero — one giant Anton statement, nothing else above the fold.

**Rejects:**
- Bento Grid — tiled cards are the opposite of declarative sequence.
- Conversational FAQ — question-answer pairs dilute the polemical stance.

## Voice fixtures

Polemical, declarative, first-person plural, belief not benefit. Sentence case or ALL-CAPS for the hero statement only.
Headlines: "We believe the browser is the runtime." · "Software is a position." · "No dashboards. No telemetry. No apology." · "Ship the thing, then explain it."
Body: "We ship the thing, then we explain it." · "The roadmap is this page."
Labels (mono): `01.` · `PRINCIPLE` · `§ 3`
Never: supercharge, unlock, leverage, seamless, AI-powered, intelligent, transformative, journey, holistic, ecosystem, empower, revolutionize, next-generation, world-class, game-changing.

## Anti-patterns (theme-specific)

- NEVER use pure black ink (`#000`) or pure white paper (`#fff`) in EITHER mode — both are tinted oklch neutrals (G7).
- NEVER ship a zero-chroma neutral — the warm hue axis (h=0/25) gives the paper its living quality (G22).
- NEVER introduce a second accent — one restrained warm-red, one emphatic mark per page.
- NEVER apply gradient text or background-clip:text — the poster register is solid colour on solid paper (G2).
- NEVER set italic headers — Anton is upright; emphasis comes from ALL-CAPS or scale, not slant (G38a).
- NEVER set all-caps display below line-height 1.0 — condensed grotesks tighten vertically and collide (G55).
- NEVER build a 3-equal-column feature card row — Manifesto is declarations, not a product grid (G3).
- NEVER give every section equal whitespace — declarations need varied rhythm to read as a sequence, not a list (G9).
- NEVER invent metrics or stakes — manifestos cite real numbers or none at all (G46).
- NEVER use `transition: all` — animate specific properties only (G10).
- NEVER use tag-left/heading-right — the declaration is the heading; no eyebrow tag steals its line (G54).

## Nav & footer routing

**Nav:** N7 (brutal slab) — the condensed uppercase nav matches the poster register. · N8 (terminal command) — mono nav labels (`§ 1` `§ 2`) reinforce the declaration structure. · N9 (edge-aligned minimal) — left-anchored, no centring; the page is asymmetric on purpose.
**Footer:** Ft5 (statement) — one closing line, Anton or Geist bold, is the sign-off. · Ft2 (inline rule single line) — a hairline above the final declaration; no multi-column footer.
**Avoid:** N1b (saas three-section — the opposite register). · Ft7 (newsletter-first — too SaaS, breaks the polemic).

## Worked example

A numbered declaration sequence with the Anton poster headline — moves 1 + 3 on one page.

```html
<section class="manifesto">
  <h1 class="statement">We believe the browser is the runtime.</h1>
  <ol class="declarations">
    <li><span class="ordinal">01.</span> Software is a position.</li>
    <li><span class="ordinal">02.</span> No dashboards. No telemetry. No apology.</li>
    <li><span class="ordinal">03.</span> Ship the thing, then explain it.</li>
  </ol>
  <p class="roadmap">The roadmap is this page.</p>
</section>
```
```css
.manifesto {
  max-width: 42rem;
  margin: 0 auto;
  padding: 8rem 1.5rem;
}
.statement {
  font-family: var(--font-display);
  font-size: clamp(3rem, 12vw, 9rem);
  line-height: 1.0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  margin: 0 0 6rem;
}
.declarations {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}
.declarations li:nth-child(2) { margin-left: 4rem; }
.declarations li:nth-child(3) { margin-left: 1rem; }
.declarations li {
  font-family: var(--font-body);
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--color-ink);
}
.ordinal {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-accent);
  margin-right: 1rem;
}
.roadmap {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: color-mix(in oklch, var(--color-ink) 60%, transparent);
  margin-top: 6rem;
}
.roadmap a {
  color: var(--color-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.roadmap a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
```

## Gate overrides

Manifesto is **editorial** (light + dark variant). Overrides:

- **G6** — a centred-narrow hero is allowed, but the eyebrow or CTA sits off-axis.
- **G21** — the Specimen macrostructure only on editorial signal (Manifesto is NOT Specimen — it reaches for Manifesto/Letter, not Specimen).

Everything else binds at full strength — G7 (no pure black/white in EITHER mode — both tinted), G22 (no zero-chroma), G55 (all-caps display line-height ≥ 1.0), G3 (no 3-col cards), G9 (no equal-whitespace sections), G46 (no invented metrics).

Stamp: `overrides: ["G6", "G21"]`

## Engine cross-ref

| Signature move | Police gates | How the engine catches drift |
|---|---|---|
| Condensed all-caps display | G55 · G1 · G38a | Engine parses the DOM, finds all-caps display elements, checks computed `line-height` ≥ 1.0; flags banned fonts not in the theme's `--font-display` allowlist; detects `font-style: italic` on any heading. |
| Black-on-cream + dark variant | G7 · G22 · G40-41 | Engine renders both `:root[data-mode]` variants, computes oklch from raw CSS values, flags any `#000`/`#fff` or zero-chroma neutral; runs APCA contrast on ink-vs-paper in both modes. |
| Statement spine | G3 · G9 · G46 | Engine counts columns in section layouts (rejects 3-equal-col), measures vertical rhythm variance between sections (rejects uniform spacing), scans for metric patterns (`%`, `×`, numbers) and flags unattributed invented stats. |
| Token discipline (cross-cutting) | G48 | Engine parses every colour value; any raw oklch/hex outside `:root` or `:root[data-mode]` blocks is flagged as an improvisation. |
