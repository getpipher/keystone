# Genre — playful

For the consumer / friendly / onboarding-led page. Soft surfaces, mild colour, motion that responds to hover, friendlier voice. Closer to Notion's marketing or Figma's onboarding than to Stripe's API docs.

## When to pick it

Brief mentions: *fun, consumer, casual, family, kids, friendly, approachable, onboarding-heavy, community, social, tactile-but-soft*. Pick sparingly — most consumer briefs still belong to editorial (warm-paper, hand-set) unless the user explicitly asks for *softer* and *friendlier*.

## Themes that belong

**Hum** — vibrant, alive. Multi-accent cream + pear + cyan + coral, mandatory motion, a single character moment. The post-Brilliant-alive register: a learning platform for curious adults, a daily-curiosity app, a habit tracker with character. Hum is the catalog's only rounded-sans-multi-accent theme — it relaxes several defaults: bouncy spring easings are canonical on its primary CTA, accent chroma goes higher than 0.16, motion is mandatory not optional.

For the quieter end of friendly — "friendly but soft" rather than "alive" — reach for modern-minimal (Cobalt): near-white paper, cool blue accent, geometric-grotesk display, motion optional.

One theme in v1 (Hum). Plan 2b adds depth not breadth — Hum is the v1 set.

## Voice

- **Display** — Geist Sans 600 with tighter tracking (`-0.025em`), or Bricolage Grotesque at 700. Friendly, not childish.
- **Body** — Geist Sans 400 in slightly muted ink (not pure black).
- **Accent** — soft indigo, warm coral, or muted rose at low chroma. Always low — never saturated consumer-app pop. (Hum is the documented exception — chroma up to 0.24.)
- **Layout** — slightly rounded surfaces, soft drop shadows, friendlier card edges (12px radius upper bound).
- **Motion** — responsive on hover (cards lift slightly). One small bounce-free reveal per section. No spring physics on UI state. (Hum exception: spring overshoot on primary CTA + character moment, one each per page.)
- **Copy tone** — warm, direct, specific. *"Made for teams who write together."* over *"For the squad ✨"*.

## What this genre allows

- **Soft drop shadows** on cards (`0 8px 24px -10px <accent at low chroma>`). Restrained.
- **12px radius** on cards, 8px on inputs, 999px on pills.
- **Hover-lift animations** on cards (`translateY(-2px)` + shadow expansion).
- **Mild tinted backgrounds** on alternating sections (paper-2 vs paper).
- **Soft accent colours** — `oklch(50% 0.13 282)` (indigo), never above 0.16 chroma. (Hum exception: pear 0.18, cyan 0.18, coral 0.24 — canonical for Hum only.)

## What this genre disallows

- **Saturated consumer-app pinks/purples** — playful keeps chroma low by default. Hum is the documented exception.
- **Emoji-as-decoration** — emoji in copy ("we built X 🌱") is fine; emoji replacing iconography is not. → gate G30
- **Comic Sans, Comic Neue, anything zany** — playful stays sophisticated, even at full vibrancy.
- **Bouncy / overshoot easings** — smooth easings by default. Hum exception: `cubic-bezier(0.34, 1.56, 0.64, 1)` canonical on primary CTA + character moment only. → gate G12 is loosened for Hum only.
- **Glassmorphism** — banned across all genres.
- **Gradient text**. → gate G2

## Voice fixtures

- *"Made for teams who write together."* — Hum
- *"Soft, but exact."* — Hum
- *"Software can be soft and exact at once. That's the trick."* — Hum
- *"A small tool, gently opinionated."* — Hum
- *"Your daily 30-second curio."* — Hum
- *"Learn something genuinely new today."* — Hum

## Nav and footer voice

- **Default nav:** N7 Brutal slab — heavy uppercase wordmark + tracked uppercase links + 2px border-bottom. Loud but composed.
- **Acceptable:** N1 Wordmark + 2 links (minimal destinations); N3 Side-rail (long-scroll, section-numbered).
- **Default footer:** Ft8 Marquee scroll — horizontal repeating tagline + dot separator. Honours `prefers-reduced-motion: reduce`.
- **Acceptable:** Ft5 Statement; Ft3 Index columns (only when the page is a hub).
- **Banned:** N5 Floating pill (modern-minimal vocabulary); N6 Newspaper masthead (editorial); Ft6 Letter close (warm-quiet; wrong genre).

See `component-cookbook.md` § Navigation and § Footers.

## Stamp signature

```css
/* Keystone · genre: playful · macrostructure: <name> · theme: <name> · enrichment: <tier> · nav: <N#> · footer: <Ft#> */
```

## Reference register

Soft surfaces, low-chroma colour, friendly-but-restrained type, hover-responsive motion. The post-Linear soft school. Never childish, never quirk-for-quirk.
