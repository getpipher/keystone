# The 58 gates — annotated with executable checkers

Every answer must be NO. Unlike Hallmark, you do not imagine the render — the engine renders.
Gates marked **Deterministic** are checked by a script you cannot fool. Gates marked **Vision**
are checked by a vision model on a real screenshot. Gates marked **manual** are the only ones on
your honor; they are few.

For how the engine works, see `engine.md`. For the gate definitions alone (without checker
annotations), this IS the file.

## Pre-emit self-critique (six axes)

Run this **before** the gate list, not after. Score the planned output 1–5 on each axis. Anything
< 3 on any axis triggers a revision pass before the gate sweep — don't bring known weakness into a
fifty-eight-gate review. Two passes is normal. Three means the brief is wrong, not the design.

| # | Axis | What you're scoring |
|---|---|---|
| A | Philosophy | Is there a clear *why* — a position the page is taking? Or is it just a layout? |
| B | Hierarchy | Can a reader tell, in 2 seconds, what's primary, secondary, tertiary? Or is everything the same weight? |
| C | Execution | Are the details (rule weight, accent footprint, text-wrap, focus rings, contrast) all in spec, or is there sloppiness even if the bones are right? |
| D | Specificity | Does this look like *this brief* — or does it look like a generic "page that could be anyone"? |
| E | Restraint | Have you removed everything that isn't earning its place? Decoration, redundancy, padding-for-padding's-sake? |
| F | Variety | Does this output share a structural fingerprint with a previous Keystone output in the project? Score by structural distance, not visual distance — colour-swaps don't count as variety. |

Record the six scores in a one-line stamp comment at the top of the file:
`/* Keystone · pre-emit critique: P5 H4 E5 S4 R5 V5 */`. Future runs should be able to find this and
avoid repeating the same weakness.

---

## Visual

### G1 · Banned display fonts
The display font must not be Inter, Roboto, Open Sans, Poppins, Lato, or a system default.
**Layer:** Deterministic
**Checker:** `engine/gates/g1-banned-fonts.mjs` (shipped)
**The check:** Parses `--font-display` and all `font-family` declarations. Comma-splits the value,
strips quotes, lowercases, and exact-matches each against the ban list (Inter, Roboto, Open Sans,
Poppins, Lato, system-ui, -apple-system, BlinkMacSystemFont, arial, helvetica, sans-serif). Any
match fails.
**Fix:** Choose a face with character — Newsreader, Fraunces, Anton, Inter Tight at 900, etc.

### G2 · Gradient text
No `background-clip: text` + `background-image: linear-gradient` co-occurring anywhere. No genre
allows gradient text. Atmospheric allows radial gradients on background only.
**Layer:** Deterministic
**Checker:** `engine/gates/g2-gradient-text.mjs` (shipped)
**Genre note:** Atmospheric allows radial gradients on background only — never on text or pill
buttons.
**The check:** Scans all CSS rules for `background-clip: text` (or `-webkit-background-clip: text`)
co-occurring with `background-image: linear-gradient` in the same rule or element. Any co-occurrence
fails.
**Fix:** Use accent color for the headline, or a drawn underline / stroke for emphasis.

### G3 · Three-equal-column card grid
No `grid-template-columns: 1fr 1fr 1fr` with icon-above-heading card children.
**Layer:** Deterministic
**Checker:** `engine/gates/g3-three-col-cards.mjs` (shipped)
**The check:** Parses `grid-template-columns` for three equal tracks (`1fr 1fr 1fr` or equal
fractions). If found, checks children for card structure (icon/heading/description stacking). Any
match fails.
**Fix:** Use a bento grid, asymmetric spans, or a non-grid layout for the same content.

### G4 · Nested cards
No card inside another card. If a card is a child of a card element, that's a tell.
**Layer:** Deterministic
**Checker:** `engine/gates/g4-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** DOM parse: any element with a card-indicative class (`.card`, `__card`, panel, tile)
that is a descendant of another card-indicative element.
**Fix:** Flatten the structure — the outer card becomes a section, the inner cards stand alone.

### G5 · Card side-stripe border
No card with a thick coloured left/right side-stripe border (4px+).
**Layer:** Deterministic
**Checker:** `engine/gates/g5-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: any element with a card-indicative class that declares `border-left` or
`border-right` with width ≥ 4px and a non-neutral color.
**Fix:** Remove the stripe; use a top-edge accent bar (2px) or a subtle background tint instead.

### G6 · Hero centred-everything
The hero must not be `min-height: 100vh` with everything centred, nor have eyebrow + title + lede +
CTA all stacked on the same centred vertical axis. At most two centred elements; the eyebrow or CTA
should sit off-axis.
**Layer:** Det+Vis
**Checker:** `engine/gates/g6-*.mjs` (Plan 1b — partial det for text-align/margin) + vision:
`describe_image` Q1 (Plan 3)
**Genre note:** Atmospheric and playful allow a centred hero when the canvas itself is the design.
Editorial / atelier allow a centred-narrow hero, but even then the eyebrow or CTA sits off-axis.
**The check:** Det: parse hero children for `text-align: center` / `margin: 0 auto` on all children.
Vision: "all on one centred axis?" on the 1280px screenshot.
**Fix:** Break alignment — anchor the eyebrow left, right-flush the CTA, or use a numeral anchor.

### G7 · Pure black/white base
No pure `#000` or `#fff` (or `oklch(0 0 0)` / `oklch(100% 0 0)`) as a base colour.
**Layer:** Deterministic
**Checker:** `engine/gates/g7-pure-black-white.mjs` (shipped)
**Genre note:** Modern-minimal allows pure `#fff` paper.
**The check:** Scans `:root` and `[data-theme]` color tokens for `#000`, `#fff`, `oklch(0 0 0)`,
`oklch(100% 0 0)`, `rgb(0,0,0)`, `rgb(255,255,255)`. Any match in a base/surface/paper/ink role
fails.
**Fix:** Shift the paper to `oklch(99% 0.002 240)` or the ink to `oklch(12% 0.01 240)` — tint every
neutral.

## Structural

### G8 · Structural reuse — macrostructure fingerprint
The page must not reuse the generic AI template (hero → 3 features → CTA → footer) nor the same
macrostructure fingerprint as a previous Keystone output in this project. Read `.keystone/log.json`
and the CSS macrostructure stamp; this build's macrostructure must differ from the last.
**Layer:** Deterministic
**Checker:** `engine/gates/g8-32-diversification.mjs` (shipped — G8 and G32 share this file)
**The check:** `extract-stamp.mjs` parses the CSS stamp for the `macrostructure:` field. The
detector diffs against the last entries in `.keystone/log.json`. If the macrostructure name
matches a recent entry, fail. If no stamp is present, fail.
**Fix:** Pick a different macrostructure from the catalog, or pick different variation knobs within
the same archetype (stated in the stamp).

### G9 · Equal-whitespace sections
No sections separated only by equal whitespace, with no rule, no ornament, no colour shift — every
section identical in rhythm.
**Layer:** Vision
**Checker:** vision: `describe_image` Q2 (Plan 3)
**The check:** Vision question on 1280px screenshot: "any two adjacent sections identical in
rhythm?" If yes, fail.
**Fix:** Vary section padding, add a rule or colour shift between sections, or use a different
section-break pattern.

## Microinteractions

### G10 · `transition: all`
No `transition: all` (or `transition-all`) used anywhere. Specify the properties being transitioned.
**Layer:** Deterministic
**Checker:** `engine/gates/g10-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: any `transition` declaration containing `all` as a property keyword.
**Fix:** Replace `transition: all 200ms` with `transition: background-color 200ms, color 200ms`
— list only the properties that actually change.

### G11 · Uniform hover-scale
No `hover:scale-105` (or any uniform hover-scale) applied across multiple unrelated elements.
**Layer:** Deterministic
**Checker:** `engine/gates/g11-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: count elements with `transform: scale(...)` in `:hover` rules. If the
same scale value appears on 3+ unrelated selectors, fail.
**Fix:** Use varied hover effects per element type — color shift on buttons, underline on links,
shadow on cards. Drop the uniform scale.

### G12 · Bouncy/overshoot easings on UI state changes
No bouncy/overshoot easings (`cubic-bezier(0.34, 1.56, ...)`, etc.) on UI state changes — buttons,
modals, tooltips. Reserve overshoots for physical interactions only.
**Layer:** Deterministic
**Checker:** `engine/gates/g12-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: any `transition-timing-function` or `animation-timing-function` with a
cubic-bezier where the second or fourth control point exceeds 1.0 (overshoot). If on a UI element
(button, modal, tooltip, nav), fail.
**Fix:** Use `ease-out` or `cubic-bezier(0.22, 1, 0.36, 1)` for UI state changes. Reserve overshoot
for drag/throw/physical interactions.

### G13 · Multiple simultaneous hover effects
No element with more than one hover effect at the same time (translate + scale + shadow + color +
rotate).
**Layer:** Deterministic
**Checker:** `engine/gates/g13-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: for each `:hover` rule, count distinct property groups that change
(transform, box-shadow, color, background, border). If 3+ groups change on one element's hover,
fail.
**Fix:** Pick one hover effect. Color shift OR shadow OR subtle translate — not all three.

### G14 · Animating layout properties
No `@keyframes` or `transition` animating `width`, `height`, `top`, `left`, `margin`, or `padding`.
**Layer:** Deterministic
**Checker:** `engine/gates/g14-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: scan all `@keyframes` and `transition` property lists for layout-shifting
properties (`width`, `height`, `top`, `left`, `margin`, `padding`). Any match fails.
**Fix:** Animate `transform: translateX/Y/scale` and `opacity` instead — compositor-only, no
layout thrash.

### G15 · Focus ring fades in
No focus ring that transitions into existence (fade in). Focus rings must appear instantly.
**Layer:** Deterministic
**Checker:** `engine/gates/g15-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: any `:focus-visible` rule that includes `transition` on `outline`,
`box-shadow`, or `border-color` with a duration > 0ms. Any match fails.
**Fix:** Remove the transition on the focus ring. The ring appears instantly on focus — keyboard
users need an immediate indicator.

### G16 · Celebratory success toast
No celebratory success toast for an action whose effect the user can already see. Toasts are for
failures and invisible effects.
**Layer:** Vision
**Checker:** vision: `describe_image` (Plan 3 — not in the 18 core questions; ad-hoc vision check)
**The check:** Vision: "any toast/notification visible that celebrates a success the user can
already see on screen?"
**Fix:** Remove the success toast. Silent success is taste. Toasts are for errors and invisible
effects only.

### G17 · Tooltip hover-delay = focus-delay
Tooltip hover-delay should be 800–1000ms; focus-delay should be 0ms. Equal delays fail.
**Layer:** Deterministic
**Checker:** `engine/gates/g17-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: any `transition-delay` on tooltip elements that applies the same delay
to both `:hover` and `:focus-visible`. If equal and > 0, fail.
**Fix:** Set hover-delay 800–1000ms, focus-delay 0ms. Keyboard users need instant access.

### G18 · Auto-rotating content without pause-on-hover/focus
No auto-rotating content (carousel, banner, stats) lacking pause-on-hover-and-focus (WCAG 2.2.2).
**Layer:** Deterministic
**Checker:** `engine/gates/g18-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse + DOM: any element with auto-rotation behavior (carousel, banner,
marquee) that lacks `:hover` pause and `:focus-within` pause rules.
**Fix:** Add `animation-play-state: paused` on `:hover` and `:focus-within` for the rotating
element.

### G19 · Placeholder names / startup clichés
No placeholder name "Jane Doe / John Smith" or startup cliché (Acme, Nexus, Seamless, Unleash).
**Layer:** Deterministic
**Checker:** `engine/gates/g19-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** DOM parse: scan text content for placeholder names and startup cliché terms.
Any match fails.
**Fix:** Use real names from the brief, or leave a labelled placeholder the user can replace.

## Variety

### G20 · Missing CSS stamp
The `/* Keystone · macrostructure: <name> · ... */` stamp must be present at the top of the CSS.
**Layer:** Deterministic
**Checker:** `engine/gates/g20-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** `extract-stamp.mjs` parses the CSS. If no `/* Keystone ·` stamp is found, fail.
**Fix:** Add the stamp to the top of the CSS file: `/* Keystone · macrostructure: <name> ·
theme: <name> · gates: <n>/58 engine-verified */`.

### G21 · Specimen fall-through
Do not default to the Specimen macrostructure when the brief did not explicitly call for editorial /
foundry / specimen energy. Specimen fall-through is banned.
**Layer:** Deterministic
**Checker:** `engine/gates/g21-*.mjs` (Plan 1b — detector pattern TBD)
**Genre note:** Atmospheric, modern-minimal, and playful never default to Specimen — only
editorial does, and only when the brief signals it.
**The check:** Parse the CSS stamp for `macrostructure: Specimen`. If present and the genre is not
editorial, fail. If the brief did not signal specimen/editorial, fail.
**Fix:** Pick a macrostructure appropriate to the genre and brief signal.

## Implementation

### G22 · Zero-chroma neutrals
No neutral/surface colour with `oklch(... 0 ...)` (zero chroma). Pure greys read as flat. Tint every
neutral toward the anchor hue — minimum 0.005 chroma.
**Layer:** Deterministic
**Checker:** `engine/gates/g22-zero-chroma.mjs` (shipped)
**Genre note:** Modern-minimal allows zero-chroma neutrals.
**The check:** Scans `:root` and `[data-theme]` tokens for `oklch(L 0 H)` where the chroma
component is exactly 0. If the token is in a neutral/surface/paper/ink role and the genre is not
modern-minimal, fail.
**Fix:** Add a tiny chroma toward the anchor hue — `oklch(50% 0.01 240)` instead of
`oklch(50% 0 240)`.

### G23 · Accent >5% viewport
The accent colour must not cover more than ~5% of any single viewport (count by area: solid fills,
large headings in accent, full-bleed accent backgrounds).
**Layer:** Deterministic
**Checker:** `engine/gates/g23-*.mjs` (Plan 1b — detector pattern TBD)
**Genre note:** Atmospheric allows accent-tinted radial blooms covering up to ~20% of the canvas.
**The check:** Computed-styles dump: sum the bounding-box area of all elements whose computed
`color` or `background-color` matches the accent token. If total area > 5% of viewport area, fail.
**Fix:** Retreat the accent — use it for emphasis (links, key buttons, small accents), not for
filling surfaces.

### G24 · Off-scale spacing values
No padding/gap/margin that isn't on the named spacing scale (`--space-3xs` … `--space-5xl`,
multiples of 4px). Arbitrary `padding: 17px` is a tell.
**Layer:** Deterministic
**Checker:** `engine/gates/g24-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: scan all `padding`, `gap`, `margin` declarations for px values not
divisible by 4 or not referencing a `--space-*` token. Any match fails.
**Fix:** Round to the nearest spacing-scale value or use the appropriate `--space-*` token.

### G25 · Prose container max-width outside 45–75ch
No prose container with `max-width` outside the 45–75ch range. Under 45ch is choppy, over 75ch
loses the eye.
**Layer:** Deterministic
**Checker:** `engine/gates/g25-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: any element with `max-width` in `ch` units outside 45–75. If the element
contains prose (paragraph, article body, lede), fail.
**Fix:** Set `max-width: 65ch` for body prose, `max-width: 50ch` for ledes. Stay in the 45–75ch
range.

### G26 · Missing interaction states
Every interactive element must have `:hover`, `:focus-visible`, `:active`, and `:disabled` styling.
Default + hover is two states; you need at least four.
**Layer:** Deterministic
**Checker:** `engine/gates/g26-missing-states.mjs` (shipped)
**The check:** For each interactive selector (`a`, `button`, `input`, `select`, `textarea`,
`[role="button"]`, `[tabindex]`), scans the CSS for `:hover`, `:focus-visible`, `:active`, and
`:disabled` rules. If any of the four is missing, fail.
**Fix:** Add the missing state rules. At minimum: default + hover + focus-visible + active +
disabled.

### G27 · Motion without reduced-motion fallback
No `transform`/`animation` keyframe that is NOT covered by a `@media (prefers-reduced-motion:
reduce)` fallback. Every motion gets a reduced-motion alternative.
**Layer:** Deterministic
**Checker:** `engine/gates/g27-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: collect all `@keyframes` and `transition` declarations. Check for a
`@media (prefers-reduced-motion: reduce)` block that neutralizes them. If any motion has no
reduced-motion counterpart, fail.
**Fix:** Add `@media (prefers-reduced-motion: reduce) { * { animation: none !important;
transition: none !important; } }` or scope it per-element.

## Hero enrichment

### G28 · LCP-killing demo video
If the page has a demo video, it must not autoplay with sound, lack a `poster`, lack
`fetchpriority="high"`, or use `loading="lazy"` on the LCP element.
**Layer:** Deterministic
**Checker:** `engine/gates/g28-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** DOM parse: any `<video>` element with `autoplay` + `muted` absent, no `poster`,
or any `<img>` with `loading="lazy"` inside the hero section. Any match fails.
**Fix:** Add `poster`, `fetchpriority="high"`, remove `loading="lazy"` from LCP, mute autoplay.

### G29 · Abstract background overuse
No abstract background with more than one accent colour, more than ~5% footprint, or animating
mesh-gradient on the whole page.
**Layer:** Vision
**Checker:** vision: `describe_image` Q3 (Plan 3)
**Genre note:** Atmospheric allows up to two warm-toned radial blooms covering ~20–30% of the
canvas, fixed-attached, no animation.
**The check:** Vision question on 1280px screenshot: "more than one accent colour, or animating
mesh on whole page?"
**Fix:** Limit to one accent colour, reduce footprint to ~5%, or use fixed-attachment radial
blooms (atmospheric genre only).

### G30 · Icon tells — mixed libraries or emoji-as-icon
No mixing two or more icon libraries (Material + Heroicons + Lucide on the same page), and no emoji
glyph (✨ 🚀 ⚡ 🔥 🎯 ✅) as a feature-card/value-prop/step/pricing-tier icon.
**Layer:** Vision
**Checker:** vision: `describe_image` Q9 (Plan 3)
**The check:** Vision question on 1280px screenshot: "mixed icon libraries, or emoji-as-feature-
icon (✨🚀⚡)?"
**Fix:** Pick one icon library (Lucide/Phosphor/Heroicons), build a custom SVG, or drop the icon
and lead with typography.

### G31 · Lottie as default
No defaulting to a Lottie library when a hand-built SVG or pure-CSS shape would have worked. Lottie
is last resort, not the default.
**Layer:** Deterministic
**Checker:** `engine/gates/g31-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** DOM parse: any `<lottie-player>` or `lottie-viewer` element. If present, fail unless
the brief explicitly calls for Lottie.
**Fix:** Replace with a hand-built SVG or pure-CSS shape. Lottie is last resort.

## Diversification

### G32 · Same archetype, same knobs
If using the same archetype as a previous Keystone output, pick at least one different variation
knob. Two Bento Grids with `tiles=6, spans=irregular, accent=corner-only` are the same Bento.
**Layer:** Deterministic
**Checker:** `engine/gates/g8-32-diversification.mjs` (shipped — G8 and G32 share this file)
**The check:** `extract-stamp.mjs` parses the CSS stamp for archetype + knob deltas. Diffs against
`.keystone/log.json` last entries. If the archetype matches and no knob deltas are stated, fail.
**Fix:** Pick at least one different variation knob and state it in the stamp.

### G33 · Decorative SVG without aria
No visual-only `<svg>`, custom-art `<div>`, `<canvas>`, or decorative figure lacking `aria-label`
or `aria-hidden="true"`.
**Layer:** Deterministic
**Checker:** `engine/gates/g33-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** DOM parse: any `<svg>`, `<canvas>`, or decorative `<div>` (role="img" or class
containing "art"/"decorative") that lacks both `aria-label` and `aria-hidden="true"`. Any match
fails.
**Fix:** Add `aria-hidden="true"` to decorative elements, or `aria-label="<description>"` if
the element conveys information.

## Layout-safety

### G34 · Horizontal scroll on any viewport
The page must not horizontally scroll on any viewport between 320px and 1920px. The required fix
is `overflow-x: clip` on both `html` and `body`.
**Layer:** Deterministic
**Checker:** `engine/gates/g34-horizontal-scroll.mjs` (shipped)
**The check:** Playwright: for each viewport in the list, checks `document.scrollWidth >
window.innerWidth`. If scrollWidth exceeds innerWidth at any viewport, fail.
**Fix:** Add `overflow-x: clip` to both `html` and `body`. Use `clip`, not `hidden` — `clip`
preserves `position: sticky` and `position: fixed` on descendants.

### G35 · Decorative text effect position
For every decorative effect on text — highlighter `<mark>`, `<em>` band, accent stroke, underline
— the position and size must be visually confirmed. A highlighter band must sit behind the x-height,
not at the baseline (which reads as a fat underline). Underlines must be 1–2px and offset 1–2px
from the baseline.
**Layer:** Det+Vis
**Checker:** `engine/gates/g35-*.mjs` (Plan 1b — partial det for gradient position) + vision:
`describe_image` Q13 (Plan 3)
**The check:** Det: parse `linear-gradient` in `background-image` on text elements — check if the
gradient band is positioned at the baseline vs behind the x-height. Vision: "highlighter band at
baseline (fat underline) vs behind x-height?"
**Fix:** Position the highlighter band behind the x-height: `linear-gradient(180deg, transparent
~38%, accent ~38%, accent ~92%, transparent ~92%)`. Underlines: 1–2px, offset 1–2px from baseline.

### G36 · Flex align-items not centered
Interactive bars (nav, toolbar, command bar, hero CTA row, footer link strip) must declare
`align-items: center` and `line-height: 1` on items with intrinsic height. Inheriting
`align-items: stretch` makes a button taller than its sibling text.
**Layer:** Vision
**Checker:** vision: `describe_image` Q14 (Plan 3)
**The check:** Vision question on 1280px screenshot: "any nav/toolbar/CTA row where button is
taller than sibling text?"
**Fix:** Add `align-items: center` and `line-height: 1` to flex rows mixing height-different
elements (button + text, icon + text, mark + body).

### G37 · More than three font families
The page must not use more than three distinct `font-family` families. Count: `--font-display`,
`--font-body`, and at most one outlier (`--font-outlier` for wordmark/hero stat/pull quote). Same
family at different weights counts as one family. Mono counts as a family if used in any non-code
context.
**Layer:** Deterministic
**Checker:** `engine/gates/g37-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: collect all distinct `font-family` values. Count unique families
(same family at different weights = one). If count > 3, fail. If mono is used outside code
blocks, count it as a family.
**Fix:** Drop the fourth family back to the body or display face. Three is the ceiling.

### G38 · Outlier face in more than two slots
The outlier face must not appear in more than two slots on the page. The outlier is a register,
not a third surface — wordmark + hero stat is the canonical pair.
**Layer:** Deterministic
**Checker:** `engine/gates/g38-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: count selectors that reference `--font-outlier`. If count > 2, fail.
**Fix:** Collapse the third outlier usage back to the body face. The outlier is wordmark + one
other slot, no more.

### G38a · Italic headers
No heading or display type in `font-style: italic` — including `h1`–`h6`, `.*__title`,
`.hero__title`, wordmarks, stat figures, footer statements, or `<em>`/`<i>` inside headings. Italic
headers are a top AI tell. Headers are roman; emphasis comes from weight, accent colour, or a drawn
underline.
**Layer:** Vision
**Checker:** vision: `describe_image` Q8 (Plan 3)
**The check:** Vision question on 1280px screenshot: "any heading/display in italic? (italic
emphasis word in upright headline = FAIL)"
**Fix:** Set `font-style: normal` on all headings. Use weight, accent color, or a drawn underline
for emphasis — never italic.

## Input-state

### G39 · Input field states
Input/textarea/select fields must handle every state correctly. Fail on any of these five:
border-width shifts between states; focus ring built from `border` instead of `outline`; input
height ≠ adjacent button height; helper-text slot collapses when empty; disabled signalled by
`opacity` alone.
**Layer:** Deterministic
**Checker:** `engine/gates/g39-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: for each input/textarea/select selector, check all five conditions.
Border-width must be constant across states. Focus ring must use `outline`. Input height must
match adjacent button height. Helper-text must have `min-height: 1lh`. Disabled must use
`opacity` + `cursor: not-allowed` + `disabled` attribute or `aria-disabled`.
**Fix:** Keep border-width 1px across all states. Use `outline: 2px solid var(--color-focus)`
with `outline-offset: 1px` for focus. Share one base height (44px floor). Reserve `min-height:
1lh` for helper-text. Use three channels for disabled.

## Contrast & readability

### G40 · Contrast thresholds
No text, icon, or `:focus-visible` ring fails its threshold against its computed background.
Body text (under 24px regular / under 18px bold) needs WCAG 4.5:1 / APCA Lc ≥ 60. Large text,
icons, and focus rings need WCAG 3:1 / APCA Lc ≥ 45.
**Layer:** Deterministic
**Checker:** `engine/gates/g40-41-contrast.mjs` (shipped — G40 and G41 share this file)
**The check:** Computed `(color, background-color)` pairs from the render dump. For each pair,
run APCA Lc formula. If body text pair < Lc 60 or large/icon/focus pair < Lc 45, fail. The most-
missed cases: text inside a card that inherits color but the card switched background; muted text
on a darker surface; a focus ring that clears 3:1 against the element but not the page surface.
**Fix:** Swap the text color to a higher-contrast token. Define `--color-accent-ink` whenever
accent fills a surface with text. Verify the pair with an APCA calculator.

### G41 · Common contrast failures that ship
Fail on any: button text ≈ button fill (within 5% lightness AND 0.05 chroma in OKLCH);
`--color-accent-ink` missing or unused when accent fills a text-bearing surface; dark-section
ink-on-ink (background OKLCH lightness < 50% but text not swapped to light).
**Layer:** Deterministic
**Checker:** `engine/gates/g40-41-contrast.mjs` (shipped — G40 and G41 share this file)
**The check:** Same computed-pairs dump as G40. Additionally: check if any `(color, bg)` pair
has OKLCH lightness within 5% and chroma within 0.05 (button-on-button). Check if
`--color-accent-ink` is defined when `--color-accent` fills a text surface. Check if any section
with dark background has children inheriting dark text.
**Fix:** Define and apply `--color-accent-ink` on accent-filled surfaces. Swap text to
`--color-paper` on dark sections. Verify button text vs fill lightness gap.

## Nav · footer · hero structural

### G42 · Nav fingerprint — AI default
The page's `<nav>` must not be the AI default: wordmark-left + 4–5 inline text links centred-or-right
+ button-right + 1px hairline border-bottom + white background.
**Layer:** Det+Vis
**Checker:** `engine/gates/g42-*.mjs` (Plan 1b — partial det for nav structure) + vision:
`describe_image` Q4 (Plan 3)
**The check:** Det: parse `<nav>` structure for wordmark + inline links + button + hairline border.
Vision: "wordmark-left + 4-5 inline links + button-right + hairline border?"
**Fix:** Rotate to a non-default nav pattern (N1b, N2, N3, N4, N5, N6–N13 from the component
cookbook). Vary the structure, not just the colors.

### G43 · Footer fingerprint — AI default
The `<footer>` must not be the AI default: 4 columns of links + social-icon row + tiny copyright +
1px hairline top-border + neutral grey background.
**Layer:** Vision
**Checker:** vision: `describe_image` Q5 (Plan 3)
**The check:** Vision question on 1280px screenshot: "4-col links + social row + tiny copyright?"
**Fix:** Rotate to a non-default footer pattern (Ft1, Ft2, Ft4–Ft8 from the component cookbook).
Vary the structure, not just the colors.

### G44 · Hero fits the fold
Two checks, both on the rendered hero at 1280×800: (a) `padding-block-end` ≥ 1.3×
`padding-block-start` (heavier bottom padding pulls the hero into the next section's rhythm); (b)
the hero's essential content (eyebrow, headline, lede, and primary CTA) must all be visible without
scrolling.
**Layer:** Det+Vis
**Checker:** `engine/gates/g44-hero-fit.mjs` (shipped — deterministic 1280×800 bounding-rect check)
+ vision: `describe_image` Q6 (Plan 3)
**The check:** Det: Playwright at 1280×800 — hero eyebrow + headline + lede + CTA bounding rect
must be within `window.innerHeight`. Vision: "eyebrow+headline+lede+primary CTA visible without
scrolling (1280 only)?"
**Fix:** Pull the display `clamp()` max down until the headline fits 2–3 lines. Set display
line-height 1.0–1.1. Hold the lede to ~2 lines (≤ ~60ch). Trim hero padding. Don't overcorrect — a
hero that already fits passes untouched.

### G45 · Decorative without purpose
The hero must not contain a decorative element (cursor, scanline, gradient blob, abstract shape,
ornament, badge, sticker) that has no semantic anchor in the content. Decoration must be motivated.
**Layer:** Vision
**Checker:** vision: `describe_image` Q7 (Plan 3)
**The check:** Vision question on 1280px screenshot: "ornament with no semantic anchor?"
**Fix:** Remove unmotivated decoration. A cursor inside a typed command, a numeral that names an
issue/year/version, a gradient that responds to interaction — these are motivated. Random
ornaments are slop.

## Honest copy

### G46 · Invented metrics
No quantitative claim ("10× faster", "50,000+ teams", "99.9% uptime") that the user did not supply,
that has no source, and that the model fabricated to fill a stat-led layout. A stat is also never
the hero's sole headline.
**Layer:** Vision
**Checker:** vision: `describe_image` Q10 (Plan 3 — flag, not auto-fail)
**The check:** Vision question on 1280px screenshot: "any '10× faster', '50,000+ teams', '99.9%
uptime' pattern?" Flag for user, not auto-fail alone.
**Fix:** Replace the invented number with `—` and a labelled grey block, or rebuild the section
without the proof slot. A stat is never the hero's sole headline — pair it with a worded headline.

## Re-drawn chrome

### G47 · Re-drawn UI chrome
No hand-built fake browser bar (URL pill + traffic-light dots), fake phone frame, fake code-block
frame, fake terminal frame, or fake IDE chrome using HTML/CSS or SVG. Re-drawn chrome is one of
the strongest "looks AI-generated" tells.
**Layer:** Det+Vis
**Checker:** `engine/gates/g47-*.mjs` (Plan 1b — partial det for chrome patterns) + vision:
`describe_image` Q11 (Plan 3)
**The check:** Det: parse for chrome patterns (`.browser-bar` + dots, `.phone-frame` + notch, mock
window-chrome around `<pre>`). Vision: "fake browser/phone/code-block/IDE frame?"
**Fix:** Use a `<picture>` or `<figure>` containing a real screenshot, or omit the chrome and let
the content stand on its own.

## Token discipline

### G48 · Mid-render token improvisation
No colour value (`#hex`, `oklch(...)`, `rgb(...)`, `hsl(...)`) or `font-family` declaration outside
the design tokens defined in `:root` / `[data-theme]`. Every colour and font must reference a named
token.
**Layer:** Deterministic
**Checker:** `engine/gates/g48-token-improvisation.mjs` (shipped)
**The check:** Scans all CSS rules outside `:root` and `[data-theme]` blocks. Any `color:`,
`background-color:`, `border-color:`, `fill:`, `stroke:`, or `font-family:` declaration with a raw
value (not `var(--...)`) fails. Inline OKLCH or one-off hexes are mid-render improvisation.
**Fix:** Lift the value into the token block as a new named variable, or replace it with an
existing token reference.

## Responsive — clickable affordances

### G49 · Two-line clickable text
No button label, primary nav link, footer link, tab label, breadcrumb, or CTA text wraps to two or
more lines at any viewport between 320px and 1920px.
**Layer:** Deterministic
**Checker:** `engine/gates/g49-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** Playwright per viewport: button/nav-link/CTA `offsetHeight` vs computed
`line-height`. If `offsetHeight > line-height * 1.5` (approximately 2+ lines), fail.
**Fix:** Shorten the label ("Get started free" → "Start free"), set `white-space: nowrap` on the
affordance, or collapse the nav into a sheet/menu at narrow widths.

## Mobile-responsiveness

### G50 · Image grid track without minmax(0,1fr)
Any `grid-template-columns` containing a `1fr` track that renders an `<img>` / `<picture>` /
image-bearing element must use `minmax(0, 1fr)` instead. Plain `1fr` resolves to
`minmax(auto, 1fr)` — the `auto` minimum is the image's intrinsic width, which overflows on phones.
**Layer:** Deterministic
**Checker:** `engine/gates/g50-image-grid-minmax.mjs` (shipped)
**The check:** Parses `grid-template-columns` for `1fr` tracks. Checks if any `<img>` / `<picture>`
is a child of the grid container. If `1fr` is used instead of `minmax(0, 1fr)` and an image is
present, fail.
**Fix:** Replace `1fr` with `minmax(0, 1fr)` for each track containing an image. One character per
track.

### G51 · Display headers without long-word wrap
No element rendering display-size text (`h1`, `.hero__display`, `.section__title`) may lack
`overflow-wrap: anywhere; min-width: 0`. Long hyphenated words overflow viewport without it.
**Layer:** Deterministic
**Checker:** `engine/gates/g51-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: for each display-size selector, check for `overflow-wrap: anywhere` and
`min-width: 0`. If either is missing, fail.
**Fix:** Add `overflow-wrap: anywhere; min-width: 0` to all display-size elements.

### G52 · Theme section-head override without mobile collapse
When a theme overrides `.section__head { grid-template-columns: ... }` to anything other than `1fr`,
it must also include a mobile-collapse rule at `@media (max-width: 48rem)` with matching specificity.
**Layer:** Deterministic
**Checker:** `engine/gates/g52-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: collect all `.section__head` (or equivalent) rules with
`grid-template-columns` ≠ `1fr`. Check for a corresponding `@media (max-width: 48rem)` rule that
collapses to `1fr`. If missing, fail.
**Fix:** Add `@media (max-width: 48rem) { [data-theme] .section__head { grid-template-columns: 1fr;
} }` with matching specificity.

### G53 · CSS-only radio tabs that scroll-jump
When implementing tab toggles via `<input type="radio">` + `:checked` selectors, the radios must
either stay in normal document flow (no `position: absolute; top: 0`) or ship a JS handler that
intercepts clicks with `{ preventScroll: true }`.
**Layer:** Deterministic
**Checker:** `engine/gates/g53-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** DOM + CSS parse: any `<input type="radio">` used for tab toggling with
`position: absolute; top: 0` and no corresponding JS `preventDefault` / `preventScroll` handler.
If found, fail.
**Fix:** Keep radios in normal document flow with zero size + opacity 0, or add a JS handler that
intercepts label clicks, calls `e.preventDefault()`, sets `radio.checked = true`, dispatches
`change`, and focuses with `{ preventScroll: true }`.

### G54 · Tag-left / heading-right
No section may render an eyebrow/number/mono-cap label in a column beside the section heading on
the same horizontal row. Any wrapper containing both an eyebrow element AND a heading element must
resolve to single-column layout (`display: block`, `flex-direction: column`, or
`grid-template-columns: 1fr`).
**Layer:** Deterministic
**Checker:** `engine/gates/g54-tag-left-heading-right.mjs` (shipped)
**The check:** DOM parse: any `<header>`, `<div>`, or `<section>` wrapper containing both an
eyebrow/label/number/kicker element AND a heading element. Checks the wrapper's
`grid-template-columns` — if anything other than `1fr` (or `minmax(0, 1fr)`), fail. The rule binds on
the content shape (eyebrow + heading in the same wrapper), not on a class-name allowlist.
**Fix:** Set the wrapper to `display: block` or `grid-template-columns: 1fr`. The heading goes
directly beneath the eyebrow in the same column, vertical stack only.

### G55 · All-caps display with line-height < 1.0
No display-size element with both `text-transform: uppercase` AND `line-height` below 1.0.
Uppercase glyphs have no descenders — at line-height < 1.0, cap-tops of line N+1 collide with the
baseline of line N when the title wraps.
**Layer:** Deterministic
**Checker:** `engine/gates/g55-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: for any display-size element (`h1`, `h2`, `.hero__display`,
`.section__title`, anything ≥ `--text-2xl`) with `text-transform: uppercase`, check `line-height`.
If < 1.0, fail.
**Fix:** Bump `line-height` to ≥ 1.0 (recommended 1.02–1.08), or drop `text-transform: uppercase`
on the display element.

### G56 · Sticky top:0 below a sticky page-level nav
No element with `position: sticky; top: 0` when a sticky page-level `<header>`/`<nav>` also exists
at `top: 0`. Both stick to the viewport top and overlap — the deeper element paints over the nav.
**Layer:** Deterministic
**Checker:** `engine/gates/g56-*.mjs` (Plan 1b — detector pattern TBD)
**The check:** CSS parse: collect all elements with `position: sticky; top: 0`. If more than one
exists (and one is the page-level nav/header), fail. Check for a `--banner-height` offset on
secondary sticky elements.
**Fix:** Define a `--banner-height` token (44–64px) and offset every secondary sticky to
`top: var(--banner-height)`. Split `--z-sticky` (in-page) from `--z-sticky-nav` (top nav) so the
nav always out-paints.

### G57 · Studied DNA discarded for a catalog theme
If a `study` diagnosis emitted earlier in the conversation AND the build's CSS stamp names a
catalog theme (Specimen, Midnight, Brutal, etc.) instead of `studied-DNA (source: ...)`, without the
user explicitly pivoting — fail. The studied DNA was meant to be the system.
**Layer:** manual
**Checker:** manual (no checker — human judgment: compare the stamp's `theme:` field against the
conversation's study output)
**The check:** Read the CSS stamp's `theme:` field. If it names a catalog theme and a study
diagnosis exists in conversation scope and the user did not explicitly pivot, fail.
**Fix:** Re-emit using the studied DNA's tokens directly. Update the stamp to `theme: studied-DNA
(source: <URL or image>)` with the inline values.

---

The CSS stamp at Step 6 records results: `· contrast: pass (40–41) · nav: N# · footer: Ft# ·
slop: pass (42–45) · honest: pass (46) · chrome: pass (47) · tokens: pass (48) · responsive: pass
(49) · icons: pass (30) · mobile: pass (34, 49, 50–57)`. Any failure must be fixed before shipping.
