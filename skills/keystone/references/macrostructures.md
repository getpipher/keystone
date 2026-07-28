# Macrostructures

Twenty-one named landing-page shapes. **Pick one before you write code.** Each is a complete fingerprint — heading placement, body composition, divider language, button voice, image treatment, reveal pattern — bundled as a single named choice.

The Specimen macrostructure is one of these twenty-one. **It is not a default.** Reach for it only when the brief is explicitly editorial, foundry-adjacent, or the user has named it. → gate G21

## Diversification rule → gate G8 + G32

Before picking, check the codebase for a `/* Keystone · macrostructure: <name> · ... */` stamp in any existing CSS file. If found, **your pick must be a different macrostructure.** No two consecutive Keystone outputs in the same project share a macrostructure. → gate G8 (structural reuse) + G32 (same archetype, same knobs).

When the brief is vague (no theme, no tone), pick from the *first ten* below before reaching for 11–21. The first ten are the strongest non-Specimen shapes; they cover ~80% of briefs.

## Hero polish patterns

Hero macrostructures (Marquee Hero · Stat-Led · Quote-Led · Letter · Photographic) admit one optional **polish pattern**: HP1 Vertical-rail · HP2 Marquee-overflow · HP3 Cursor-spotlight · HP4 Decorative-numeral. Polish patterns are structural (layout/type/motion), not decorative. A hero may carry one enrichment archetype (E1–E8) AND one polish pattern (HP1–HP4) — never two polish patterns at once.

## Nav and footer voice

Each macrostructure implies a **nav archetype** (N1–N9) and a **footer archetype** (Ft1–Ft8). Defaults sit in the routing tables in `component-cookbook.md` § Navigation and § Footers. Don't ship a hero macrostructure without picking nav + footer — they are part of the page shape, not optional chrome.

---

## The 21 macrostructures — index

Pick one. Then read ONLY that one file from `macrostructures/`. Slugs are stable; the diversification stamp reads the `<name>`.

- **01 · Bento Grid** — Modular blocks of varying sizes as an irregular grid. [`01-bento-grid.md`](macrostructures/01-bento-grid.md)
- **02 · Long Document** — Memo, letter, or journal entry. Continuous prose with inline heads. [`02-long-document.md`](macrostructures/02-long-document.md)
- **03 · Marquee Hero** — The hero IS the page above the fold. [`03-marquee-hero.md`](macrostructures/03-marquee-hero.md)
- **04 · Stat-Led** — Giant number as hero; data is the narrative. [`04-stat-led.md`](macrostructures/04-stat-led.md)
- **05 · Workbench** — Product screenshots in frames; guided tour of the app. [`05-workbench.md`](macrostructures/05-workbench.md)
- **06 · Conversational FAQ** — Bold questions, brief answers. [`06-conversational-faq.md`](macrostructures/06-conversational-faq.md)
- **07 · Manifesto** — Polemical large type. Declaration energy. [`07-manifesto.md`](macrostructures/07-manifesto.md)
- **08 · Photographic** — A single huge image dominates each fold.
- **09 · Quote-Led** — Hero is a pull-quote with attribution.
- **10 · Specimen** — Numbered left-margin labels, huge serif, asymmetric spans. Editorial/foundry energy.
- **11 · Catalogue** — Uniform grid of variations of the same thing.
- **12 · Letter** — First-person, written, intimate. Opens with a greeting.
- **13 · Index-First** — The page IS a list of links. Pure navigation as design.
- **14 · Narrative Workflow** — Numbered stages; process timeline.
- **15 · Split Studio** — Diptych. Every block divides the screen.
- **16 · Feature Stack** — Sticky left pane + scroll-synced right pane.
- **17 · Type Specimen** — The typeface IS the design.
- **18 · Portfolio Grid** — Filterable cards of projects.
- **19 · Map / Diagram** — A single large spatial diagram organises the page.
- **20 · Ecosystem Index** — Multiple discovery surfaces; browsing, not declaration.
- **21 · Component Playground** — Interactive code-and-preview blocks.

---

## SaaS page sequence

When the macrostructure is Bento Grid · Stat-Led · Workbench · Marquee Hero and the brief is B2B SaaS, ship these sections roughly in order. Skipping more than two reads as incomplete:

1. **Hero** — macrostructure-specific. Two CTAs (primary + "Talk to sales").
2. **Social proof** — 6–8 customer logos in monochrome.
3. **Features** — 3–6 feature cards (Bento has them inline; Stat-Led puts them after the supporting-stats grid).
4. **Testimonials** — 2–4 quote cards. Quote + name + role + company. Never "Jane Doe"/"John Smith". → gate G19
5. **Pricing** — 2–3 tiers in a comparison table. Show the actual price; "Contact sales" on every tier signals distrust.
6. **FAQ** — 5–10 questions.
7. **Final CTA strip** — single button + one-sentence prompt.
8. **Footer** — index-style or tabular, theme-appropriate.

Section transitions use `--space-3xl` minimum. Don't subdivide into sub-rows with sub-rules.

**Voice rules for SaaS sections:**
- **Pricing:** show the actual price. Sales-led pricing on every tier is a tell.
- **Testimonials:** include role AND company. Abstract "Engineering Manager" is slop. → gate G19
- **FAQ:** answer like a person, not a sales doc. "Yes — Stripe and Adyen are both supported" beats "integrates with leading providers."
- **CTA strip:** one button. Not two.

For non-SaaS work (Editorial, Manifesto, Letter, Long Document, Quote-Led), this sequence does NOT apply. A bakery doesn't need a pricing tier comparison.

---

## How to pick

1. **Read the brief.** Note signal words ("data heavy", "tell a story", "a list of links", "many small features", "personal note").
2. **Check the codebase** for a `/* Keystone · macrostructure: <name> · ... */` stamp. If found, exclude that name.
3. **Match brief energy** to "Reach for it" lines. Pick the one most categorically distant from past output.
4. **State your pick** before writing code: "Macrostructure: Bento Grid." Then open the CSS with the required stamp.
5. If torn, offer the user three choices from different categories and let them pick.

The goal: two pages for two different briefs look like different sites, not colour-swaps of one template.
