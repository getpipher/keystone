# Component cookbook

Fifty component archetypes you compose into any macrostructure. Each entry: a shape, a one-line "use when", and a short structural sketch. Pick from this file when building a section and don't know which shape to reach for.

The macrostructure picks the *page shape*; this file picks the *components inside it*.

**Diversification rule:** within a single page, no two sections use the same archetype. A Bento Grid might pair F1 Bento + C2 Inline form + T2 Logo wall. The next Keystone build picks different archetypes from the same categories.

---

## Archetype index

A typical build needs 5–7 picks: 1 hero + 1 section head + 1–2 features + 1 CTA + 1 footer + 1 nav.

### Heroes

- **H1 · Marquee** — A single statement fills the fold. No subhead, no CTA in view.
- **H2 · Split diptych** — Headline + lede on one side, image or product capture on the other. 6/6 or 7/5 columns.
- **H3 · Quote led** — A pull-quote with attribution is the hero. Borrowed credibility.
- **H4 · Stat led** — A giant number or metric is the hero. Small qualifier line below.
- **H5 · Letter hero** — First-person opening — "Dear reader,". No buttons in fold.
- **H6 · Photographic fold** — Single full-bleed image fills the viewport. Caption in a corner.
- **H7 · Demo video clipped by viewport edge** — Display headline left, demo video right, rightmost ~10–20% extending past viewport. The clip is the design — implies "there's more product."
- **H8 · Mockup split browser framed** — Headline left, browser-frame mockup right, tilted 1–3°. Frame: browser chrome, macOS toolbar, hairline, or floating no-frame.
- **H9 · Custom illustration centerpiece** — A single hand-built SVG (Tier B) or pure-CSS (Tier A) sitting on the hero as one illustrative element.

### Section heads

- **S1 · Left margin numbered** — Narrow left column holds `01 — LABEL.`; wide right column holds heading and content. → gate G54 (must stack, not tag-left/heading-right).
- **S2 · Hanging** — Heading floats above the section in negative space; no border, no rule.
- **S3 · Sticky pinned** — Heading stays in viewport while content scrolls beneath.
- **S4 · Inline no break** — Heading is a small caps phrase emerging inside body flow; no spatial break.
- **S5 · Bottom anchored** — Label or heading sits below the section's content. Inverts hierarchy.

### Feature blocks

- **F1 · Bento grid** — Asymmetric grid of 8–15 tiles in mixed spans. Rhythm via size.
- **F2 · Sticky scroll stack** — Sticky left pane, scrolling right pane cycling through screenshots.
- **F3 · Tabular spec sheet** — Each row is a feature; columns hold name, value, footnote. Tabular nums.
- **F4 · Step sequence** — Numbered stages flow vertically. Each has heading + paragraph + optional visual.
- **F5 · Annotated screenshot** — Product capture centre-stage with arrows/labels pointing to UI details.
- **F6 · Product card grid** — Each card is a product: image · name · price · micro-action. Shop floor, not marketing.

### CTAs / signups

- **C1 · Outlined chip** — Bordered, transparent button with a typographic verb.
- **C2 · Inline form as CTA** — The CTA IS the form — email input + "Submit →" beside it.
- **C3 · Typographic link** — A word, an arrow, a 1px underline. No box, no fill.
- **C4 · Sticky bottom bar** — Horizontal bar pinned to viewport bottom, CTA + reassurance line.

### Testimonials / proof

- **T1 · Pull quote with marginalia** — Quote in wide column; attribution + source link in narrow margin.
- **T2 · Logo wall hairline** — Row of customer logos, monochrome, hairline-separated. No card boxes.
- **T3 · Single huge quote** — One quote, big, centred, whole section. Attribution is small caps beneath.
- **T4 · Numbered stat strip** — Horizontal strip of 3–5 stats (count + qualifier). Tabular nums.

### Footers

- **Ft1 · Mast headed** — Wordmark + tagline anchor a horizontal band. Small links beside, address below.
- **Ft2 · Inline rule single line** — Single line of credits, address, copyright. Hairline rule above. No columns.
- **Ft3 · Index style category list** — 3–4 short columns, category in small caps, 4–6 links each.
- **Ft4 · Dense typographic** — One block of text — credits, references, licence — in small monospace. Colophon energy.
- **Ft5 · Statement** — One display sentence dominates the footer — a closing line, not a sitemap.
- **Ft6 · Letter close** — Closes like a letter — `Yours, the team. 2026.` Optional postscript.
- **Ft7 · Newsletter first** — Form (label + input + submit) is primary; wordmark + links muted beneath.
- **Ft8 · Marquee scroll** — Horizontal infinite-scroll of repeating tagline + dot separator.

### Navigation

- **N1 (N1a) · Wordmark 2 links** — Wordmark left, two text links right. Minimal variant. For dense SaaS use N1b.
- **N1b · Canonical SaaS three-section** — Wordmark-left · centred 4–6-link cluster · sign-in + filled CTA right. The dominant modern marketing nav.
- **N2 · Floating chip** — Small fixed chip in a corner — wordmark + single action. Doesn't sit in document flow.
- **N3 · Side rail** — Thin vertical strip on left edge — wordmark rotated + dot-indicators. Editorial/portfolio.
- **N4 · Hidden behind ⌘K** — No visible nav. Command palette via ⌘K. Keyboard-first audiences.
- **N5 · Floating pill** — Rounded full-pill nav, visibly detached from edges, blur backdrop, soft shadow. Modern-minimal.
- **N6 · Newspaper masthead** — Full-width header, large centred wordmark, issue/date line in serif small caps, double-rule below.
- **N7 · Brutal slab** — Heavy full-width nav, 2px border-bottom, all-caps wordmark, tracked uppercase links.
- **N8 · Terminal command** — Nav as CLI prompt: `> studio --catalog --voice --get▮`. Links are command flags.
- **N9 · Edge aligned minimal** — Wordmark hard-left, CTA hard-right, vast empty space between. Absence is the design.
- **N10 · Floating on scroll morph** — Sticky bar that morphs into a floating pill on scroll past threshold.
- **N11 · Mega-menu panel** — Triggers open full-width multi-column panel (icon · title · description per item). For hubs.
- **N12 · Announcement banner + retracting nav** — Coloured promo banner above nav; retracts on scroll-down, returns on scroll-up.
- **N13 · Inline ⌘K search pill** — Visible search pill (placeholder + ⌘K hint) opening a spotlight modal. The visible opposite of N4.

---

## Within-archetype variation knobs

Picking an archetype is the first axis of variety. The second is *how you build it*. Two pages with the same archetype should not be identical — each has 2–3 variation knobs. Pick one value per knob per output.

State knob values in the macrostructure stamp: `/* Keystone · macrostructure: Bento Grid · F1 knobs: tiles=6, spans=irregular, accent=corner-only · ... */`

| Archetype | Knob A | Knob B | Knob C |
| --- | --- | --- | --- |
| **H1 Marquee** | Display size: xxl (4–12rem) · xl (3–8rem) | Alignment: left-bias · centred · right-bias | Underlay: none · rule above · rule below |
| **H2 Split Diptych** | Ratio: 7/5 · 6/6 · 5/7 | Right side: photo · proof column · pull-quote | Divider: hairline · negative space · vertical rule |
| **H3 Quote-Led** | Quote weight: italic display · roman display · roman body | Attribution: under · margin-aligned · right-flush | Length: ≤80 chars · 80–160 chars |
| **H4 Stat-Led** | Number style: tabular · italic · monospace | Qualifier: below · inline-right · stacked-above | Secondary stats: none · two below · row of four |
| **H5 Letter** | Salutation: greeting · "Dear X," · time-stamp | Body: 1 para · 2 para · 3 para | Signoff: typed name · drawn SVG · initials |
| **H6 Photographic** | Image area: full-bleed · 16/7 · 4/3 · 1/1 | Caption: lower-left · upper-right · margin | Text below or overlaid |
| **H7 Demo Video Clipped** | Clip side: right · left · both | Aspect: 16/10 · 16/9 · 4/3 | Frame: hairline · browser chrome · none |
| **H8 Mockup Split** | Frame: browser · macOS toolbar · hairline · no-frame | Tilt: 0° · 1.5° · 3° | Screenshots: 1 · stack-of-3 · orbit-of-3 |
| **H9 Custom Illustration** | Build: Tier-A CSS · Tier-B SVG · Tier-C generated · Tier-D library | Animation: none · loop · scroll-linked | Scale: small accent · dominant |
| **F1 Bento** | Tiles: 4 · 6 · 7 · 9 | Spans: regular · irregular · mosaic | Border: hairline all · accent corners · none |
| **F2 Sticky-scroll** | Pinned side: left · right | Right pane: code · screenshot · diagram | Pin steps: 3 · 4 · 5 |
| **F3 Tabular spec** | Columns: 2 · 3 · 4 | Rule density: every row · groups of 3 · headers only | Numbers: tabular · proportional |
| **F4 Step sequence** | Numbering: I/II/III · 01/02/03 · 1.0/2.0/3.0 | Layout: vertical · horizontal · diagonal | Connector: line · arrow · none |
| **F5 Annotated screenshot** | Callouts: numbered pins · margin labels · inline arrows | Frame: device · plain · floating | Anchor: image-led or text-led |
| **F6 Product card grid** | Card ratio: 3/4 · 1/1 · 4/3 | Density: 3-up · 4-up · 5-up | Micro-action: Add · Save · View → · none |
| **C1 Outlined chip** | Shape: rectangular · pill (tactile/playful only) · slab | Density: spacious · compact | Adornment: arrow · plus · none |
| **C2 Inline form CTA** | Fields: 1 · 2 · 3 | Submit: end-of-row · separate line · embedded | Helper: above · below · none |
| **C3 Typographic link** | Underline: solid · dashed · double · none | Hover: thicken · slide · colour shift | Arrow: → · ↗ · none |
| **C4 Sticky bottom bar** | Reveal: always · scroll-up · after fold | Anchored: viewport bottom · top · inline | Shadow: hairline · none · subtle |
| **T1 Pull quote marginalia** | Quote: italic display · roman large · serif italic | Attribution: signed · stamped · timestamped | Marginalia: none · timeline · footnote |
| **T2 Logo wall** | Layout: single row · 2 rows · grid 3×N | Treatment: monochrome · brand colour · ghosted | Divider: hairline cells · none |
| **T3 Single huge quote** | Face: serif italic · roman display · italic mono | Width: full-bleed · 60ch · 40ch | Attribution: same line · separate band |
| **T4 Numbered stat strip** | Layout: 3-up · 4-up · 5-up · 6-up | Number weight: display · body large | Qualifier: under · inline · above |
| **Ft1 Mast-headed** | Wordmark: 3xl · 2xl · xl | Tagline: italic serif · roman body · none | Links: inline · 2-line stack |
| **Ft2 Inline single line** | Order: wordmark/links/credit · credit/wordmark/links | Separator: middot · pipe · em-dash · rule | Density: dense · spaced |
| **Ft3 Index columns** | Columns: 3 · 4 · 5 | Heading: small caps · italic · monospace | Bullet: hairline · none |
| **Ft4 Dense colophon** | Family: monospace · serif · sans | Layout: single block · paragraphs · log-style | Includes: build hash · date · attribution |
| **Ft5 Statement** | Sentence width: 28ch · 38ch · 50ch | Wordmark: under · top-right · none | Rule above meta: hairline · double · none |
| **Ft6 Letter close** | Signoff: italic · roman · monogram | Postscript: yes · no | Width: 40ch · 60ch · 80ch |
| **Ft7 Newsletter-first** | Layout: stacked · inline · split | Submit: filled · outline · arrow link | Privacy line: yes · no |
| **Ft8 Marquee scroll** | Speed: 24s · 32s · 48s | Direction: left · right · alternate | Glyph: middot · em-dash · slash |
| **N1 Wordmark + 2 links** | Position: left/right · centred · right-flush | Links: text · text+icon · pill | Sticky: yes · no |
| **N1b SaaS three-section** | Centre links: 3 · 4 · 5–6 | Dropdowns: none · 1 · 2 | Scroll: frost · always-solid · transparent |
| **N2 Floating chip** | Anchor: top · bottom · top-right · bottom-left | Content: theme picker · search · nav | Backdrop: blur · solid · none |
| **N3 Side-rail** | Side: left · right | Width: 12ch · 16ch · 20ch | Indicator: filled bar · text · numbered |
| **N4 Hidden ⌘K** | Trigger: button · keyboard · both | Surface: modal · sheet · spotlight | Recents: shown · hidden |
| **N5 Floating pill** | Width: content · max 720px · max 560px | Backdrop: blur+saturate · solid · gradient | Anchor: top-centred · top-right · top-left |
| **N6 Newspaper masthead** | Issue line: above · below · none | Wordmark: 3xl · 2xl · xl | Rule: double · single · none |
| **N7 Brutal slab** | Border: 2px · 3px · 4px | Letter-spacing: tracked · normal | CTA: filled slab · outline · text-only |
| **N8 Terminal command** | Prompt: `>` · `$` · `~/$` | Cursor: in-line · after flag · none | Width: full bleed · content · ~80ch |
| **N9 Edge-aligned minimal** | CTA: outlined · filled pill · text+arrow | Wordmark: serif italic · sans · monospace | Padding: tight · default · spacious |
| **N10 Scroll morph** | Threshold: 200px · 400px · 600px | Bar look: solid · translucent · none | Pill anchor: centred · right · left |
| **N11 Mega-menu** | Columns: 2 · 3 · 4 | Feature cell: none · promo · code sample | Scrim: dim+blur · dim · none |
| **N12 Banner + retract** | Banner fill: solid · gradient · tint+ink | Dismiss: yes · no | Bar scroll: sticky · also-frosts |
| **N13 Inline ⌘K pill** | Pill: centred · right-of-brand | Results: flat · grouped | Footer hints: shown · hidden |

**Anti-pattern:** picking the same knob values across two outputs is the same templating as picking the same archetype. If your last Bento was `tiles=6, spans=irregular, accent=corner-only`, the next must change at least one knob.

---

## Routing — which footer fits which genre

| Genre | Default | Also OK |
| --- | --- | --- |
| editorial (Garden · Specimen · Manifesto · Riso) | **Ft1 Mast-headed** | Ft2, Ft4, Ft6, Ft7 |
| modern-minimal (Cobalt) | **Ft2 Inline single line** | Ft1, Ft5 |
| atmospheric (Midnight) | **Ft5 Statement** | Ft1, Ft2 |
| playful (Hum) | **Ft8 Marquee scroll** | Ft5, Ft3 |
| terminal (Terminal — atmospheric-adjacent) | **Ft4 Dense colophon** | Ft2 |
| docs / reference | **Ft3 Index columns** | Ft1 |

**Default away from Ft3.** The 4-column index footer is the AI fingerprint when used reflexively. Reach for Ft3 only on a genuine hub/docs-root. → gate G43

---

## Routing — which nav fits which genre / theme

| Genre / cluster | Default nav | Acceptable also |
| --- | --- | --- |
| editorial (Garden · Specimen · Manifesto · Riso) | **N6 Masthead** | N1a, N9, N12 |
| modern-minimal (Cobalt) | **N1b SaaS three-section** | N5, N11, N13, N9 |
| atmospheric (Midnight) | **N5 Floating pill** | N9, N4, N13, N1b |
| playful (Hum) | **N1b SaaS three-section** | N5, N11, N12, N13, N7 |
| terminal / CLI (Terminal — atmospheric-adjacent) | **N8 Terminal command** | N4, N13 |
| docs / reference | **N3 Side-rail** | N13, N1a, N4 |
| commerce / product launch | **N12 Banner + retract** | N1b, N11, N9 |

**Diversification — state it out loud.** Across consecutive Keystone runs in the same project, no two outputs share the same nav archetype. Before writing nav markup, write: *"Previous nav: <X>. This build: <Y>, because <reason>."* A theme with 4 builds should show 4 different navs. Reaching for the genre default on every build is the failure this rule prevents. → gate G42

**Default away from N1a.** The most-recognised AI fingerprint is N1a used reflexively. For a real product nav reach for N1b, N5, N11, or N13 first; N1a only when the page genuinely has 2 destinations.

---

## Picking from this file

1. Identify the section's role (hero / section-head / feature / CTA / testimonial / footer / nav).
2. Glance at the archetypes in that category.
3. Pick the one whose "use when" fits the brief.
4. No two sections in the same page use the same archetype.
5. If the macrostructure suggests a default (e.g. Bento Grid → F1), use it; otherwise vary deliberately.

The goal: within a page, sections feel different from each other; across pages Keystone builds, sections feel different from the last.

---

## Mobile collapse — per archetype

Two breakpoints:
- **60rem (~960px)** — layout breakpoint. Multi-column grids collapse to 1-col. Tilts drop. Sticky panes unstick.
- **40rem (~640px)** — typography breakpoint. Display sizes shrink one step. Side-margin labels move inline.

| Archetype | Below 60rem | Below 40rem |
| --- | --- | --- |
| **H1 Marquee** | unchanged | display step down; reduce side padding |
| **H2 Split Diptych** | grid `1fr` (text top, proof below); hairline divider | proof column → 2-col compact grid |
| **H3 Quote-Led** | quote full width; attribution wraps own line | quote + attribution size step down |
| **H4 Stat-Led** | number full width, text stacks below; secondary stats 2-up | number size step down; qualifier wraps |
| **H5 Letter** | unchanged single column; aside moves below | salutation step down; signoff tightens |
| **H6 Photographic** | image full-bleed; caption moves inline below | caption step down; corner caption never overlaps text |
| **H7 Demo Video Clipped** | drops clip; `1fr` stacked; tilt removed | media 16/9; poster image (autoplay on cellular is hostile) |
| **H8 Mockup Split** | drops tilt; `1fr`; mockup full-width below text | annotation pins consolidate; legend moves below |
| **H9 Custom Illustration** | `1fr`; illustration moves below/above text | illustration ≤ 40% viewport; never dominates |
| **F1 Bento** | 6/4-col → 2-col; large tiles span 2 | 1-col; tile order respects info priority |
| **F2 Sticky-scroll** | sticky unsticks; linear text+visual pairs | visuals shrink to 16/9 inline; no sticky |
| **F3 Tabular spec** | 4-col → 2 (key+value); drop unit+footnote | vertical `dt`/`dd` per row |
| **F4 Step sequence** | numbering moves inline with step | containers tighten; connectors drop |
| **F5 Annotated screenshot** | screenshot full-width; annotations restack as list | 16/9; annotations consolidate into legend |
| **F6 Product card grid** | 3-up → 2-up | 2-up → 1-up; card height flexible |
| **C1 Outlined chip** | unchanged (chips wrap if needed) | full-width; min-height 44px |
| **C2 Inline form CTA** | input + button stack; full-width | label above input; button full-width below |
| **C3 Typographic link** | unchanged | unchanged |
| **C4 Sticky bottom bar** | unchanged; 44px min-height | label truncates; CTA stays right-aligned |
| **T1 Pull quote marginalia** | marginalia below quote; hairline divider | marginalia consolidate to single line |
| **T2 Logo wall** | 6-up → 3-up | 3-up → 2-up; logo height 32px → 24px |
| **T3 Single huge quote** | full width; attribution wraps below | quote size step down 1.4× |
| **T4 Numbered stat strip** | 4-up → 2-up | vertical; 1 stat per row |
| **Ft1 Mast-headed** | links wrap 2 lines; tagline below wordmark | wordmark step down; tagline italicises |
| **Ft2 Inline single line** | links wrap; separator → soft return | vertical list |
| **Ft3 Index columns** | 4-col → 2-col | 2-col → 1-col; column heads remain |
| **Ft4 Dense colophon** | unchanged; reduce padding | font-size step down |
| **Ft5 Statement** | sentence full width; meta stacks | sentence step down; meta wraps |
| **Ft6 Letter close** | unchanged; postscript wraps | signoff step down; postscript italicises |
| **Ft7 Newsletter-first** | input + button stack; full-width | label above input; button full-width below |
| **Ft8 Marquee scroll** | unchanged; slow speed ~25% | speed slows further; track height step down |
| **N1 Wordmark + 2 links** | unchanged | links wrap if long; wordmark stays |
| **N2 Floating chip** | chip floating; reduce padding | chip widens to 44px hit target; ≥ 280px |
| **N3 Side-rail** | rail unsticks → hamburger trigger | hamburger is the only nav |
| **N4 ⌘K-only** | hamburger appears for non-⌘K users | unchanged (⌘K equivalent is on-screen tap) |
| **N5 Floating pill** | pill drops links, keeps wordmark + CTA | top-anchored corner chip — wordmark left, hamburger right |
| **N6 Newspaper masthead** | issue line stacks above wordmark; links wrap | wordmark step down; nav collapses behind "menu" |
| **N7 Brutal slab** | links wrap to second line; CTA right-aligned | links → hamburger; wordmark + hamburger |
| **N8 Terminal command** | flags wrap to second `>` line; cursor stays | single hamburger `> menu`; cursor visible |
| **N9 Edge-aligned minimal** | unchanged | wordmark + CTA stay edge-aligned; CTA pads to 44px |

**Cross-cutting rules:**
- All hit targets ≥ 44×44px below 40rem (WCAG AA).
- Padding-inline ≥ `clamp(1rem, 4vw, 1.5rem)` on the page container.
- Disable scroll-linked animation below 40rem. → gate G27
- Image `loading="lazy"` below fold only; **never on LCP regardless of viewport.** → gate G28
- Auto-play video respects `data-saver` — replaces with poster when set.
