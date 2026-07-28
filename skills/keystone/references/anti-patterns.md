# Anti-patterns — the named tells

Each tell is a signature of AI-generated UI. One is a problem; two in the same view is a confirmation. Each entry cross-references the gate that catches it (see `gates.md`).

---

## Critical — ships as slop

### Purple-gradient hero → gate G2 + G29
Hero with a purple-to-blue or purple-to-pink gradient background, white centred text. The single most-recognised AI aesthetic. **Fix:** One anchor hue, no gradient backgrounds on heroes. Tint neutrals for warmth.

### Inter-everywhere → gate G1
Inter (or Roboto, Open Sans) as both display and body, no pairing face. A one-font page is a template page. **Fix:** Pair a distinctive display face with a refined body face.

### 3-column feature grid → gate G3
Three equal columns, icon-above-heading-above-body, full-width, 24px gap. Every LLM emits this. **Fix:** Break the grid — asymmetric spans, varied heights, inline icons, or typographic rhythm instead of cards.

### Card-in-card → gate G4
A bordered container with cards inside it, or nested micro-cards with no semantic reason. **Fix:** One containment layer. Usually the outer one is wrong — flatten to a section.

### Gradient headline → gate G2
`background-clip: text` fill set to a linear gradient (usually purple-to-pink or blue-to-cyan). Signals "AI generated" faster than almost anything else. **Fix:** Solid ink. Use weight, a display face, or a drawn underline for emphasis — not a gradient fill.

### Side-stripe card → gate G5
Card with a thick coloured border on one edge (4–6px, usually left, purple or green). Very 2018-SaaS-AI. **Fix:** Hairline border all around, or no border, or a small accent square beside the heading. Never an asymmetric thick stripe.

### Full-viewport centred hero → gate G6
`min-height: 100vh` (or `100dvh`), everything centred, one short sentence, one big CTA. The default LLM landing page. **Fix:** Let the hero be the height of its content. Bias left or right. Put more than a sentence in it.

### Pure black, pure white → gate G7
`#000000` background or `#ffffff` surface. Both read as flat and synthetic. **Fix:** Tint toward the anchor hue — `oklch(99% 0.002 240)` for paper, `oklch(12% 0.01 240)` for ink.

### Default-attractor sameness → gate G8 + G32
Two consecutive outputs in the same project reuse the same macrostructure. The page looks redesigned only because copy changed. Repeating a macrostructure is the structural fingerprint of templating — the AI tell Keystone exists to defeat. **Fix:** Check `.keystone/log.json` and the CSS stamp. Pick a categorically different macrostructure, not a colour-swap variant.

### Specimen fall-through → gate G21
Producing the Specimen macrostructure (numbered left-margin labels + huge serif + asymmetric spans + hairline rules + typographic-only CTA) when the brief didn't request editorial energy. The single most-repeated AI output. **Fix:** Specimen is one of twenty-one choices, not a default. Reach for it only when the brief explicitly says "editorial", "specimen sheet", or "type foundry".

### AI nav → gate G42
Wordmark-left + 4–5 inline text links centred-or-right + CTA button-right + 1px hairline border-bottom + white background. Every SaaS site that fed the training data shipped this. Genre-blind: it lands the same on a bakery, a B2B SaaS, and a manifesto. **Fix:** Rotate to N5–N9 from the component cookbook (floating pill, newspaper masthead, brutal slab, terminal command, edge-aligned minimal). N1 only when the page has 2 destinations.

### AI footer → gate G43
4 columns of links (Product/Company/Resources/Legal) + social-icon row + tiny copyright + 1px top-border + grey background. Genre-blind catalogue. A bakery doesn't have a "Resources" column. **Fix:** Pick Ft1–Ft8 from the cookbook. Ft3 (index columns) only on a genuine hub or docs root with a real sitemap — never with the social-row + tiny-copyright tail.

### Aurora-blob background → gate G29
Flowing organic mesh blobs in purple-to-pink-to-cyan behind hero text. The 2022–2023 generated-design default. Audiences pattern-match this in milliseconds. **Fix:** Solid surface, or a subtle two-stop gradient + SVG `<feTurbulence>` grain at < 0.1 opacity.

### Floating-orb decoration → gate G45
Ambient 3D spheres or blurred coloured circles drifting behind the hero with no semantic role. The new corporate-stock-photo. **Fix:** Cut them. The hero needs a typographic anchor, not depth.

### Sound-on autoplay → gate G28
Hero video that auto-plays with audio. Browsers block it, but intent matters — a video shipped without `muted` wanted to shout at the user. Hostile, accessibility fail, SEO penalty. **Fix:** `<video autoplay muted loop playsinline>` — always all four. Separate audio toggle if sound is genuinely useful.

### Lazy-loaded LCP → gate G28
`loading="lazy"` on the hero image or video — the LCP element. The page waits to download the thing the user is already looking at. Tanks Largest Contentful Paint (~2× slower, 4× more "poor" experiences). **Fix:** `fetchpriority="high"` and `preload="metadata"` on the LCP element. Lazy-load only below-the-fold media.

---

## Major — looks AI-generated

### Bounce/elastic easing → gate G12
Buttons that bounce in, icons that wobble on hover. Trendy a decade ago. **Fix:** Exponential ease-out. Reserve overshoots for physical interactions (drag, throw).

### Centred everything → gate G6
Headline centred, body centred, button centred — section after section of centred columns. **Fix:** Bias the layout. Break symmetry once — wide left, narrow right, or the reverse.

### Italic headers → gate G38a
A roman headline with one word flipped to italic — *"Built to think in real time"* — or an all-italic display face. The italicised emphasis-word-in-a-header is among the most reliable AI tells. **Fix:** `font-style: normal` on all headings. Emphasis via weight, accent colour, or drawn underline. Italic for body-copy emphasis only.

### Eyebrow on every section → gate G54
Every section starts with an uppercase mono-cap eyebrow (`01 / EXAMPLES`, `02 / INSTALL`) above (or beside) its heading. The page becomes a list of labelled lists. Eyebrows are default OFF — valid only when the section is genuinely ordinal. **Fix:** Zero eyebrows unless the user asked for chapter/step numbering AND the content is genuinely sequential. Cap at 1–2 per page. Hard ban: tag-left/header-right two-column heads — heading goes directly beneath the eyebrow, single column. Not bypassable by "match the reference build" instructions.

### Shadow-glow on dark → no gate
Card on a dark background with a `box-shadow` that leaves a soft coloured halo. Reads as "trying to look premium." **Fix:** On dark surfaces, use lightness for elevation (brighter = higher). If you must shadow, keep it tight and dark.

### Icon-tile feature card → gate G3
Rounded rectangle, icon in coloured square top-left, heading below, two lines of copy, "Learn more →" link. The universal template. **Fix:** Vary sizes, vary alignments, pull icons inline with the heading, or drop icons entirely.

### Glassmorphism without purpose → gate G45
Frosted-glass panels everywhere, usually layered over a gradient you also shouldn't have. **Fix:** Glassmorphism works when it communicates depth (overlay over content). Not as decoration.

### Hover-only affordances → gate G26
Hover reveals a menu; hover shows a delete button; hover triggers a tooltip with crucial info. Touch users get nothing. **Fix:** Every hover affordance needs a focus state and tap/click access on coarse pointers.

### Tabular data without tabular-nums → no gate
Prices, dates, or metrics where numbers don't align vertically — proportional figures shift columns. **Fix:** `font-variant-numeric: tabular-nums;` on any container displaying columns of numbers.

### Animate-on-scroll on everything → gate G27
Every section fades in when it enters the viewport. Every list staggers. The page never settles. **Fix:** One orchestrated entrance on first load. Let the rest just be there.

### Mismatched icon sets → gate G30
Material Icons in the navbar, Heroicons in the cards, Lucide in the footer, an emoji in a badge. Each library has its own stroke voice — mixing them is the icon-set tell. **Fix:** One library per project. Lucide for SaaS, Phosphor for weight variants, Heroicons for Tailwind/shadcn.

### AI-illustration look → gate G45
Smooth-mesh-blob characters with no joint articulation, mid-2010s "modern flat" stock poses, Midjourney-default symmetric lighting, corporate-doodle humans. The 2026 audience pattern-matches this faster than any other tell. **Fix:** Hand-build in CSS or SVG. If generated, use reference images + asymmetric crop + grain post-processing. Never raw output.

### Invented metrics → gate G46
Stats the user never supplied — "10× faster", "saves 5 hours per week", "50,000+ teams", "99.9% uptime". A page that lies on its proof bar can't be trusted on its claims. **Fix:** Replace with `—` and a labelled grey block ("metric to confirm"), ask the user, or rebuild without the proof slot. A stat is never the hero's sole headline.

### Generic emoji as feature icon → gate G30
`✨` `🚀` `⚡` `🔥` `🎯` `✅` as the primary icon for a feature card, value prop, or pricing tier. OS-rendered, breaks the icon stroke voice, recognisably AI-default. **Fix:** One icon library, a custom SVG mark, or omit the icon and lead with typography.

### Re-drawn UI chrome → gate G47
Fake browser bar (URL pill + traffic-light dots), fake phone frame, fake code-block window, fake IDE chrome — all hand-built in HTML/CSS or SVG. The user already has the chrome; redrawing it is printing a photograph of a picture frame inside a real picture frame. **Fix:** Real screenshot in `<figure>` (hairline border at most). For code blocks, use system `<pre>` with a typographic frame. For phone mockups, use a real product photograph.

### Mid-render token improvisation → gate G48
Inline `#hex` or `oklch(...)` values outside the token block. The model picked the theme, then drifted. By the third edit pass, the page has eight colours instead of three. **Fix:** Every colour and font references a named token. Need a new value? Add it to `:root` first, then reference it.

### Wrap-to-two-lines clickable text → gate G49
Button label, nav link, footer link, or CTA wraps to two lines at narrow widths. Reads as a styling error — the second line is often one word ("free", "more", "started"). **Fix:** Shorten the label ("Get started free" → "Start free"), `white-space: nowrap`, drop non-essential nav items at narrow widths, or collapse nav into a sheet.

### Lottie shortcut → gate G31
Reaching for a LottieFiles community animation when CSS or SVG would be lighter and stronger. 50–500 KB JSON + runtime cost for zero-byte CSS work. **Fix:** Build custom. Spinning logo → CSS `@keyframes rotate`. Checkmark → SVG `stroke-dasharray`. Lottie is last resort — only for genuinely articulated character motion.

### Three.js for a still object → no gate
A WebGL hero where the 3D doesn't earn its place by being interactive. A stationary spinning thing the user can't touch, reorient, or customise. 100–300 KB bundle + GPU work for a static photograph. **Fix:** If the user can't manipulate it, it doesn't justify Three.js. Use a still photograph or hand-built SVG.

---

## Microinteraction tells

### `transition-all` → gate G10
Every property animating, including ones that should be instant (visibility, focus rings). **Fix:** Specify properties: `transition: background-color var(--dur-short) var(--ease-out), transform 100ms var(--ease-out)`.

### Universal `hover:scale-105` → gate G11
Every card lifts on hover, no shadow change, no easing, no purpose. **Fix:** One signal per element — a 1px translate, or a colour shift, or an underline thickening. Never all four.

### Bouncy overshoot easings on UI → gate G12
`cubic-bezier(0.34, 1.56, 0.64, 1)` on buttons, modals, tooltips. Tasteless throwback. **Fix:** `--ease-out` for UI state. Reserve overshoot for genuine physical interactions (drag-and-drop release).

### Animated hover gradients → gate G13
Background gradient slides through colour space on hover. **Fix:** Cut. Or pick one colour shift, instant.

### Cursor follower dots → gate G45
A trailing dot that lags behind the pointer. No semantic role. **Fix:** Cut.

### Auto-rotating carousels with no pause → gate G18
WCAG 2.2.2 failure. **Fix:** Manual advance only, or pause-on-hover-and-focus, or autoplay disabled by default.

### Celebratory success toasts → gate G16
"Done!" when the user just saved a thing they can see was saved. **Fix:** Silent success. Toasts for failures and invisible effects only.

### Confirmation dialogs for reversible actions → no gate
"Are you sure you want to delete this?" before a one-row delete. **Fix:** Optimistic delete + 5–10s undo toast. Reserve the modal for irreversible destruction — type-the-name confirmation, not click-OK.

### Tooltips with same delay on hover and focus → gate G17
Both delay 800ms. Different intents, same timing. **Fix:** Hover 800–1000ms. Focus 0ms. Keyboard users need instant access.

### Focus rings that animate in → gate G15
The ring fades in over 200ms — keyboard users have no indicator at transition start. **Fix:** Focus rings appear instantly. Don't transition `outline` or `box-shadow` on focus gain.

### Toasts that shift layout → gate G14
New toast pushes content down; dismissed toast lets it spring back. **Fix:** Stack at a viewport corner, fixed positioning. Existing toasts don't move when a new one arrives.

### Universal scroll-triggered fade-up → gate G27
Every section fades in on intersection. The page never settles. **Fix:** One orchestrated entrance on first load. After that, content is just there.

### Spinners that flash → no gate
A spinner appears for 50ms while a fast action completes. **Fix:** Delay-show (150ms) or enforce minimum visible duration (300ms). Skeletons over spinners when layout is known.

---

## Minor — small taste issues

### Straight quotes → no gate
`"Hello"` and `'word'` in rendered text. A sign nothing was proof-read. **Fix:** Curly quotes — `"Hello"`, `'word'`.

### Double-hyphen dashes → no gate
`--` in body copy where an em-dash belongs. **Fix:** `—` (U+2014).

### Three periods instead of ellipsis → no gate
`...` in body copy. **Fix:** `…` (U+2026).

### Placeholder names → gate G19
"Jane Doe", "John Smith", "Example User". **Fix:** Plausible names reflecting the audience — "Maya Okonkwo", "Sam Tan", "Elena Ruiz".

### Startup-cliché product names → gate G19
"Acme", "Nexus", "Pulse", "Unleash", "Seamless", "Supercharge". **Fix:** Name the thing concretely. Domain-specific placeholders — "Maple Weekly", "Ridgeline Inventory" — not startup bingo.

### `z-index: 9999` → no gate
Arbitrary large z-values. **Fix:** Use the six-level named scale.

### Every section padded the same → gate G9
Top, bottom, horizontal padding all equal across every section. **Fix:** Vary. Tighten one, expand another. Add a rule or colour shift between sections.

### `100vw` widths → gate G34
`width: 100vw` on anything. Breaks on scrollbar-visible desktops. **Fix:** `width: 100%` with container padding.

---

## Reporting format

```
[severity] Tell name — file:line
  why it's a tell (one line)
  → fix (one line)

Summary — N critical · M major · K minor
Verdict — [ships as slop | reads as AI-generated | close, fix the minors]
```
