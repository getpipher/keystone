# Typography

Type carries the design. If the type is wrong, nothing else matters.

## Principles

- A page is a pairing, not a single font. Display + body, minimum. Single-font pages are allowed only when the single font IS the design choice (terminal aesthetic, manifesto poster). The default is a pairing.
- Commit to extremes. Weight 200 next to weight 800 reads as intentional. Weight 400 next to weight 600 reads as a default setting.
- Size steps are ratios, not increments. Major third (1.25), perfect fourth (1.333), perfect fifth (1.5), or golden (1.618). Pick one.
- Line-height changes with size. Tight for display (1.05–1.2), comfortable for body (1.5–1.65).
- Measure lives between 45 and 75 characters. `max-width: 65ch` is the default.

## The 2+1 rule → gate G37

A page may use at most three distinct font families: one **display**, one **body**, and an optional **outlier** for a single typographic moment — wordmark, hero stat, pull quote, masthead. Four families is slop. → gate G37

```css
:root {
  --font-display:  "Fraunces", ui-serif, Georgia, serif;
  --font-body:     "Geist", ui-sans-serif, system-ui, sans;
  --font-outlier:  "Geist Mono", ui-monospace, monospace;  /* wordmark + hero stat ONLY */
}
```

The outlier is a register, not a third surface:
- **Appears in ≤ 2 places** on the page. Wordmark + hero stat, or pull quote + masthead. A third slot means you have a third body font. → gate G38
- **Carries one role.** It tags a specific kind of content. Every instance of that role uses it.
- **Mono counts as a face.** Fraunces display + Geist body + Geist Mono in code blocks = three families. That's the ceiling.
- **Same family at different weights is one family.** Geist 400 + Geist 700 is one font.

Two families is the right answer for most pages. Three is for SaaS / brand-heavy / editorial-rich pages.

## Banned defaults → gate G1

These fonts are on-distribution for every LLM. Don't reach for them without a deliberate reason:
- **Sans-serif:** Inter, Roboto, Open Sans, Lato, Poppins, Source Sans, Nunito, Montserrat, Raleway, Work Sans, DM Sans, system-ui, Arial, Helvetica.
- **Serif:** Merriweather, Playfair Display (banned as body; ok as display in moderation), Lora, Source Serif, Georgia-as-default.
- **Mono:** Courier New, Consolas-as-default, system mono.

If the user insists on one, do it. Otherwise pick from the catalog below. → gate G1

## The font catalog

Three sources, priority order:
1. **Google Fonts** — free, CDN, everywhere. Default source.
2. **Fontshare** (Indian Type Foundry) — free for commercial use, foundry-grade. Drop-in via `<link href="https://api.fontshare.com/v2/css?f=...">`.
3. **Foundry-licensed** — Klim, Pangram Pangram, Production Type, Lineto, Colophon. Only when the user confirms they're licensed.

### Free display faces

| Family | Source | Voice | Best for |
| --- | --- | --- | --- |
| Fraunces | Google | Variable serif, expressive italic, optical-size axis | Editorial, Atelier, brand-heavy |
| Newsreader | Google | Roman serif, optical-size + italic | Editorial, magazine, long-form |
| Instrument Serif | Google | Tight contrast, italic available | Brand, atelier, intimate editorial |
| Cormorant Garamond | Google | Classical, high contrast, luxury register | Luxury, fashion, fine arts |
| EB Garamond | Google | Honest classical Garamond, body-grade | Editorial body, longform |
| Cardo | Google | Scholarly serif, generous x-height | Reference, academic |
| Source Serif 4 | Google | Modern transitional, big OT family | SaaS marketing with serif tone |
| DM Serif Display | Google | Bracketed serif, high-contrast | Headlines that need to feel printed |
| Bodoni Moda | Google | Modern Bodoni revival, dramatic | Fashion, editorial, luxury |
| Playfair Display | Google | Display only; banned as body | Marketing display — sparingly |
| Geist | Google | Modern grotesque, geometric, 7 weights | Modern minimal, SaaS, dev tools |
| Inter Tight | Google | Tighter Inter — body fallback only, never display | UI body in restrained themes |
| Bricolage Grotesque | Google | Variable display sans, condensable | Brutal, playful, riso-bold |
| Space Grotesk | Google | Geometric grotesque, slightly quirky | Brutalist, technical |
| Anton | Google | Heavy condensed grotesque | Posters, manifestos |
| Big Shoulders Display | Google | Industrial condensed | Sports, manifestos, declarative |
| Tomorrow | Google | Variable optical condensed | Tech, atmospheric, near-future |
| Outfit | Google | Modern geometric (banned as default; use only when picked deliberately) | Restrained tech — sparingly |
| General Sans | Fontshare | Modern grotesque, Geist-adjacent | Modern minimal alternative |
| Switzer | Fontshare | Neutral sans, broad weight range | SaaS body, restrained |
| Cabinet Grotesk | Fontshare | Display grotesque, 9 weights | Editorial display, magazine |
| Clash Display | Fontshare | Ultra-condensed display | Posters, brand moments |
| Satoshi | Fontshare | Playful geometric sans | Playful, consumer |
| Sentient | Fontshare | Variable serif, soft contrast | Soft editorial, atmospheric |
| Erode | Fontshare | Distressed serif, hand-set feel | Riso, tactile-rebellion, brand-y |
| Tanker | Fontshare | Heavy condensed, pure display | One-word posters, mastheads |

### Free body faces

| Family | Source | Voice | Best for |
| --- | --- | --- | --- |
| Geist | Google | Default modern body sans | Modern minimal, SaaS, atmospheric |
| The Future | in-repo | Keystone's body workhorse | Default Keystone tone |
| Newsreader | Google | Reading serif, optical-size aware | Editorial body, longform |
| Source Serif 4 | Google | Body-grade serif | Editorial mid-weight |
| EB Garamond | Google | Classical body | Editorial slow reading |
| Spectral | Google | Slab-ish serif, screen-tuned | Long-form on screen |
| Lora | Google | Calligraphic serif, body-grade | Body — sparingly (over-used) |
| Crimson Pro | Google | Old-style body, generous | Editorial slow body |
| IBM Plex Sans | Google | Engineering sans, broad family | Technical body |
| Switzer | Fontshare | Neutral sans body | SaaS body, restrained |
| General Sans | Fontshare | Geist-adjacent body | Modern minimal body |

### Free mono / outlier faces

| Family | Source | Voice | Best for |
| --- | --- | --- | --- |
| Geist Mono | Google | Geist's mono companion | Default mono, code, captions |
| JetBrains Mono | Google | Engineering mono, ligatures | Code, terminal, technical |
| IBM Plex Mono | Google | Engineering mono, broad family | Technical body-grade |
| Commit Mono | Google | Tighter mono, modern | Code, modern terminal |
| Space Mono | Google | Quirky, slightly retro | Playful tech, riso |

## Tone-based pairing patterns

Each tone gets a free baseline (Google/Fontshare) and a paid upgrade (foundry-licensed). The free row is canon. Never name a paid font in code without confirming the user is licensed.

| Tone | Tier | Display | Body | Outlier |
| --- | --- | --- | --- | --- |
| Editorial | Free | Fraunces · Newsreader · EB Garamond · Instrument Serif · Cabinet Grotesk | IBM Plex Sans · Switzer · Source Serif 4 | JetBrains Mono · Geist Mono · Erode |
| | Paid | Tiempos Headline · Söhne Breit · Reckless Display · Migra · Tobias | Söhne · Haffer · Untitled Sans | Söhne Mono · GT America Mono |
| Technical | Free | JetBrains Mono · Geist Mono · Geist (700) · Commit Mono | Geist · IBM Plex Sans · Switzer | Tomorrow · Cabinet Grotesk |
| | Paid | Berkeley Mono · Söhne Mono · GT Pressura · ABC Diatype Mono | Söhne · Untitled Sans · ABC Diatype | Berkeley Mono · GT Pressura Mono |
| Brutalist | Free | Bricolage Grotesque (800) · Anton · Tanker · Big Shoulders Display | Geist · Switzer | Space Grotesk · Geist Mono |
| | Paid | Druk · Monument Extended · NaN Jaune · Migra · ABC Pressura | Söhne Breit · GT America | GT America Mono |
| Soft | Free | Geist · Bricolage Grotesque (500) · Sentient · Newsreader | Geist · Crimson Pro · Switzer | Geist Mono · Satoshi |
| | Paid | Söhne · GT Pressura · Pangaia · Tobias | Söhne · Halyard Text · Satoshi | Söhne Mono · GT Maru Mono |
| Luxury | Free | Cormorant Garamond · Fraunces · Cardo · DM Serif Display · Bodoni Moda | EB Garamond · Crimson Pro · Source Serif 4 | (rare; small caps from display) |
| | Paid | Canela · Tiempos Headline · GT Super · Domaine Display · Migra | Tiempos Text · Suisse Int'l · Domaine Text | (rarely used) |
| Playful | Free | Bricolage Grotesque · Fraunces (italic) · Satoshi · Newsreader (italic) · Sentient | Geist · Newsreader · Satoshi | Geist Mono · Space Mono |
| | Paid | Clash Display · Cabinet Grotesk · Migra · Tobias · Pangaia | Satoshi · Plus Jakarta Sans · GT Maru | Space Mono · GT Maru Mono |
| Austere | Free | system-ui · Inter Tight (regular) · Geist (400) · Switzer (regular) | system-ui · Geist · Switzer | system-ui mono · Geist Mono |
| | Paid | ABC Diatype · ABC Monument Grotesk · Söhne (regular) · ABC Pressura | ABC Diatype · Söhne | ABC Diatype Mono · Söhne Mono |
| Atmospheric | Free | Geist (600) · Sentient · Tomorrow · Bricolage Grotesque | Geist (400) · Switzer | Geist Mono · JetBrains Mono |
| | Paid | Söhne · GT Pressura · ABC Diatype | Söhne · ABC Diatype | Berkeley Mono · Söhne Mono |
| Workshop | Free | The Future · Geist · Cabinet Grotesk | The Future · Switzer | The Future Mono · Geist Mono |
| | Paid | Avenir Next · GT Walsheim | Söhne · GT Walsheim | Berkeley Mono |

Default to the free pairings. Fraunces, Geist, Bricolage Grotesque, Cabinet Grotesk, Sentient, and JetBrains Mono are first-rate faces in 2026. The paid row is a cited alternative, not a consolation prize.

## Wordmark / logo typography

The wordmark may use a different display face than the body. On tone-rich themes (Editorial, Atelier, Specimen) it **should** — collapsing the wordmark into the body family flattens the hierarchy.

```css
.wordmark { font-family: var(--font-wordmark); font-weight: 600; letter-spacing: -0.015em; }
```

Recommended pairings (free first):
- Geist body → Fraunces wordmark, IBM Plex Mono wordmark, or Bricolage Grotesque (heavy)
- Fraunces body → Geist Mono wordmark, Inter Tight wordmark
- System-ui body → JetBrains Mono wordmark, Newsreader wordmark
- Inter Tight body → Fraunces wordmark, EB Garamond wordmark

Same-family collapse works for Editorial · Letter · Manifesto · Long Document (the body voice carries the brand). Contrasting family needed for Bento Grid · Stat-Led · Workbench · Marquee Hero (visually generic archetypes need the wordmark to do the differentiation work).

Avoid same-family collapse on SaaS pages — a Geist-only page where the wordmark is also Geist 600 reads as un-designed.

## Scale

Default ratio: **1.25** (major third) from a 16px body.

```css
:root {
  --text-xs:   0.64rem;    /* 10.24px */
  --text-sm:   0.8rem;     /* 12.8px  */
  --text-base: 1rem;       /* 16px    */
  --text-md:   1.25rem;    /* 20px    */
  --text-lg:   1.5625rem;  /* 25px    */
  --text-xl:   1.9531rem;  /* 31.25px */
  --text-2xl:  2.4414rem;
  --text-3xl:  3.0518rem;
  --text-4xl:  3.8147rem;
  --text-display: clamp(2.75rem, 5vw + 1rem, 5.25rem);
}
```

Display max ≤ 5.5rem (88px). Above that, hero headlines crowd on 1280–1440px viewports. Even on display-heavy themes, cap at 6rem (96px). Exception: single-line, single-word display (≤ 12ch) can grow to 7rem. Default emit: `clamp(2.75rem, 5vw + 1rem, 5.25rem)`.

### Hero headline sizing — match size to copy length

Count characters in the rendered hero `h1`. Pick the cap by bucket:

| Headline length | Size cap | Notes |
| --- | --- | --- |
| ≤ 20 chars | full `--text-display`; single-word can grow to 7rem | Display-heavy themes only |
| 21–50 chars (sweet spot) | `--text-display` | If wraps past 2 lines at 414px, step down to `--text-display-s` |
| 51–90 chars | cap at `--text-display-s` | Consider splitting into eyebrow + headline |
| > 90 chars | rewrite shorter, or cap at `--text-4xl` with tighter leading | A 100-char headline at display size is an AI tell |

Aggressive-display themes (Brutal, Riso, Manifesto) step down one rung when headline > 50 chars. When you write the headline yourself, aim for ≤ 7 words and ≤ 50 chars — imperative or nominal phrase, never a gerund opener.

Use no more than five sizes on a single page. If you need more hierarchy, use weight and colour.

## Weights

- Body: one weight (typically 400 or 350). Bold for emphasis only.
- Headings: contrast body by at least 300 units. Body 400 → headings 700 or 200, not 500 or 600.
- Never synthesise. Load the weight you need; don't rely on `font-weight: bold` against a single-weight file.

## Required features

- `font-display: swap` on every web font.
- Match fallback metrics with `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` to prevent CLS.
- Tabular numbers on any data display: `font-variant-numeric: tabular-nums;`.
- Oldstyle figures for body copy where the face supports them: `font-variant-numeric: oldstyle-nums;`.
- Proper typographic punctuation: curly quotes, em-dashes, ellipses. Never straight quotes, `--`, or `...`. → no gate (manual review)

## Body text rules

- Minimum 16px. Below 14px is accessibility-hostile.
- Line-height 1.5–1.65 on body, tighter (1.1–1.3) on display. **Floor for all-caps display heads is `1.0` — recommended 1.02–1.08.** Below 1.0, cap-tops of line N+1 collide with the baseline of line N. → gate G55
- Measure 45–75 characters (`max-width: 65ch`). → gate G25
- Never all-caps body copy. Never justified text without hyphenation. Never letter-spacing above 0.05em on body.

## Headings rules → gate G38a

- Tight tracking on display sizes (`letter-spacing: -0.02em` to `-0.04em`).
- Loose tracking on small caps / labels (`letter-spacing: 0.08em` to `0.14em`, `text-transform: uppercase`, `font-variant-caps: all-small-caps;`).
- Skip no levels. `h1` → `h2` → `h3`. Style visually however you like; keep semantic order.
- **No italic headers.** `font-style: normal` on all headings. Emphasis via weight, accent colour, or drawn underline. Italic for body-copy emphasis only. → gate G38a

## Bans

- No Inter, Roboto, Open Sans. No system stack as the only stack. → gate G1
- No gradient text on headings. → gate G2
- No single-font pages (unless the single font IS the design choice).
- No all-caps paragraphs.
- No font-size below 14px for body, below 10px anywhere.
- No hard-synthesised bold or italic.
- No more than three font families on a page. → gate G37
- No outlier face in more than two slots. → gate G38
- No italic headers. → gate G38a
- No raw hex/oklch values outside the token block. → gate G48
