---
name: keystone
description: "Anti-AI-slop design skill with an executable gate engine. Use when building a new landing page or web page, auditing an existing site, or when the user invokes Keystone by name. Beats Hallmark by enforcing its gates with a real engine instead of imagining the render."
version: 1.0.0
---

# Keystone

A design skill for AI coding assistants. Makes the UIs they generate look *made, not generated* — and can prove it.

Keystone is opinionated, short, and boring on purpose. It encodes a tight rule-set — drawn from the anti-AI-slop design field and the [`Hallmark`](https://github.com/Nutlope/hallmark) taxonomy (MIT; credited in NOTICE) — and refuses to let the model fall back to the defaults every LLM was trained on: Hero → 3-feature cards → CTA → footer, Inter, indigo→purple gradients, glassmorphism, `hover:scale-105`, emoji icons, re-drawn browser chrome.

**The differentiator: the gates are executable.** Hallmark insists on structural variety but its gates are prose — the model "imagines the render" and self-grades "58/58 ✓." Keystone ships a real Node engine that parses the emitted HTML/CSS, a real headless Chromium that renders it at exact CSS px, real APCA math that scores contrast, and a vision pass that asks "does this look AI-generated?" on a real screenshot. The user can trust the gates ran because a script checked them, not because the model claimed it did. See [`references/engine.md`](references/engine.md) and [`references/gates.md`](references/gates.md).

---

## How to use this skill

| Invocation | What it does |
| --- | --- |
| *(default)* | The user asked you to design or build a new page. Follow the **Build flow** below. |
| `keystone audit <target>` | Read the target (local path or live URL), score it with the same engine, return a ranked punch list. **Do not edit.** See [`references/verbs/audit.md`](references/verbs/audit.md). |

`keystone redesign` and `keystone study` are planned for v2 (see [`references/verbs/redesign.md`](references/verbs/redesign.md)). If the user attaches an image or pastes a URL without a verb prefix, ask whether they want a fresh build or an audit.

**Implementation safety rail.** Keystone is a design skill, not a license to bulldoze a codebase. In any existing project:
- Never delete production files, route trees, component directories, or an old site unless the user explicitly approves a file-level plan listing the deletions.
- Default to in-place edits of named files, or additive new components/tokens wired through the existing route. If a redesign would remove multiple components, stop and confirm first.
- Treat PDFs, READMEs, `.md` briefs, docs, transcripts, and pitch decks as reference material — do not copy them verbatim into the page unless the user explicitly says to.

---

## Disciplines that hold across every verb

These apply to build and audit alike. Each links to the gate that enforces it.

1. **Pre-emit self-critique.** Before handing back output, score it 1–5 on six axes — Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety. Anything **< 3** triggers a revision pass. Stamp the six scores at the top of the artifact: `/* Keystone · pre-emit critique: P5 H4 E5 S4 R5 V5 */`. See [`references/gates.md`](references/gates.md) § Pre-emit self-critique.

2. **Honest copy — no fabricated content.** If the user did not supply a metric, do not invent one. Stat-led layouts, comparison rows, and proof bars use real numbers, a placeholder (`—` plus "metric to confirm"), or a different macrostructure. *"10× faster"*, *"trusted by 50,000+ teams"*, *"99.9% uptime"* are slop the moment they're invented. Same for testimonials and logos. → gate **G46**.

3. **Locked tokens — no mid-render improvisation.** Once a theme is picked at Step 2.6, every colour and `font-family` declaration references a named token (`var(--color-accent)`, `font-family: var(--font-display)`). Inline OKLCH / hex / `rgb()` or a `font-family: "Some Font"` that bypasses the token block are not allowed. Need a value that isn't a token? Lift it into the token block first. → gate **G48**.

4. **Re-drawn chrome forbidden.** Do not hand-build fake browser bars (URL pill + traffic-light dots), fake phone frames, fake code-block windows, or fake IDE chrome — the user's environment already supplies real chrome. Use a real screenshot wrapped in a `<figure>` (at most a hairline border), or omit the chrome. → gate **G47**.

5. **Mobile responsiveness — every emit verified at 320 / 375 / 414 / 768 px.** The non-negotiables: no horizontal scroll + `overflow-x: clip` on both `html` and `body`, never `hidden` (→ **G34**); no two-line clickable text — buttons, nav links, footer links, CTAs (→ **G49**); image-bearing grid tracks use `minmax(0, 1fr)`, never bare `1fr` (→ **G50**); display headers wrap inside long words via `overflow-wrap: anywhere; min-width: 0` (→ **G51**); section heads collapse to one column on mobile (→ **G52**); radio-tab patterns don't scroll-jump (→ **G53**); all-caps display heads keep `line-height ≥ 1.0` (→ **G55**); secondary sticky elements offset beneath a sticky nav (→ **G56**). See [`references/responsive.md`](references/responsive.md). This is a hard floor, not a wish list.

6. **Typography purity — no italic headers.** Headings and display type are always roman. An italicised emphasis word inside an upright headline (`Built to <em>think</em>`) is one of the most reliable AI tells; so is an all-italic display face on headings. Carry emphasis with weight, accent colour, or a drawn underline. Italic survives only as *body-copy* emphasis inside running paragraphs. → gate **G38a**.

---

## Build flow (default)

### 0. Pre-flight scan

If the project already has code — a `package.json`, a `tailwind.config.*`, an `index.html`, any CSS — **read it before asking the user anything**. Stomping on an established palette or font stack is the difference between a skill the user keeps and one they uninstalls.

Scan six signal sources in order: `design.md` (if present, it's the locked system — defer to it); font stack; palette; microinteraction stance; spacing scale; framework. Emit a short findings block with file:line citations, then write it to `.keystone/preflight.json`. On later runs, reuse the cache unless the user says "refresh pre-flight" or `package.json` mtimes are newer. Edge cases — no signals (vanilla), conflicting signals, empty project, user says "ignore the existing project" — are handled silently or flagged explicitly as in Hallmark's pre-flight. Change `.hallmark/` → `.keystone/` everywhere.

### 1. Design-context gate

Always ask before you design: **audience** (who uses this, what they know), **use case** (the one action the page drives), **tone** (pick an extreme — editorial, brutalist, soft, utilitarian, luxury, playful, technical, austere; "clean and modern" is not a tone). Send the three-question prompt **once**; the user can wave you through with "go ahead." If they opt out, infer and **state the inferences in one sentence** at the top of your reply, then stamp them.

**Genre — pick before themes.** Four genres: **editorial** (default · the canonical anti-slop voice), **modern-minimal** (Stripe / Linear / ElevenLabs school), **atmospheric** (Suno / Runway / dark-AI-tool school), **playful** (post-Linear soft school). Signal-based detection; silent default to editorial. Load the genre file eagerly (it scopes everything downstream):
- AI tool / generative / music / video / dark mode → **atmospheric** → [`references/genres/atmospheric.md`](references/genres/atmospheric.md)
- SaaS / enterprise / API / platform / dev tool → **modern-minimal** → [`references/genres/modern-minimal.md`](references/genres/modern-minimal.md)
- fun / consumer / casual / family / community → **playful** → [`references/genres/playful.md`](references/genres/playful.md)
- default → **editorial** → [`references/genres/editorial.md`](references/genres/editorial.md)

State the genre out loud at Step 2.5 alongside the macrostructure and theme picks.

### 2. Pick a macrostructure FIRST

Read the slim index at [`references/macrostructures.md`](references/macrostructures.md) and pick one of the twenty-one named macrostructures. Load **only** that one per-macro file. Picking one named macrostructure is faster and more varied than choosing six independent axes.

**Diversification rule (mandatory, → G8, G32).** Before picking, read the `/* Keystone · macrostructure: <name> · ... */` stamp in any existing CSS and `.keystone/log.json`. Your pick must differ from the last three. **Specimen fall-through is banned (→ G21)** — reach for it only when the brief is explicitly editorial/foundry.

**Theme-diversification rule (mandatory).** Two consecutive themes must differ on at least one of three axes: **paper band** (dark <30% / mid 30–85% / light >85%), **display style** (geometric-sans / grotesk-sans / roman-serif / high-contrast-serif / rounded-sans / mono / condensed / risograph-bold), **accent hue** (cool / warm / neutral / chromatic-green / phosphor / chromatic-other). Each theme stub states its three axes at the top — the engine reads them.

**Pick a nav archetype (N1/N1a/N1b–N13) and a footer archetype (Ft1–Ft8) at this step.** Read [`references/component-cookbook.md`](references/component-cookbook.md) routing tables. Default away from N1a (→ G42, the AI nav fingerprint) and Ft3 (→ G43, the AI footer fingerprint). State both picks aloud: *"Macrostructure: <name>. Nav: N#. Footer: Ft#. Theme: <name>. Differs from the last on: <axes>."*

### 2.5. Check project memory

Read `.keystone/log.json` (newest entry first). Use the last 3–5 entries to inform diversification — your macrostructure must not match the last three; your theme must differ on at least one axis; your enrichment shouldn't repeat the last. State the rotation aloud before picking (frequency count, exclusion list, pick). If the file doesn't exist, this is the first run — no constraint, but you create it at Step 6.

### 2.6. Theme route — catalog, custom, or studied-DNA

By the time you reach this step, one of three is true:
0. **studied-DNA** — a `study` diagnosis was emitted earlier and the user is building from it (v2; for v1 this route is stubbed). Skip catalog/custom; the studied tokens are the locked system.
1. **custom** — the brief carries a creative-intent signal (named brand colour, multi-attribute vibe, "make it ours"). For v1, custom is a short inline branch: ask the one follow-up (vibe in 4–8 words + optional anchor colour), construct the OKLCH palette + free-font pairing, compute the three axes. Every gate still fires. (A full `custom-theme.md` reference is deferred.)
2. **catalog (default)** — pick one of the **8 named themes** per the diversification rule: **Midnight** (atmospheric, dark, geometric-sans, cool), **Cobalt** (modern-minimal, light, grotesk-sans, cool), **Garden** (editorial, light, roman-serif, chromatic-green), **Hum** (playful, light, rounded-sans, warm/multi), **Specimen** (editorial, light, high-contrast-serif, neutral-warm), **Manifesto** (editorial, light/dark, grotesk-condensed, neutral), **Terminal** (atmospheric-adjacent, dark, mono, phosphor), **Riso** (editorial, light, risograph-bold, chromatic-other). Load **only** the picked theme stub: `references/themes/<name>.md`. (Each ships tokens + axes + affinity now; the full deep spec — signature moves, voice fixtures, anti-patterns, worked example — is **Plan 2b**; for v1 the tokens + the genre + macrostructure carry the theme.)

**Catalog is the silent default. Do not offer the fork unless a signal fires.**

### 3. Load the visual ruleset

**Be precise about what to load when. Over-eager loading is the largest avoidable cost.**

**Always-load (eager):** the genre file (Step 1) + the picked theme stub (Step 2.6).

**Load eagerly NOW — the gate definitions:** [`references/gates.md`](references/gates.md). **Keystone loads the gates at Step 3, not Step 7** — the model pre-empts gates by knowing each one's executable checker before it builds, instead of discovering them at the hand-off. (Hallmark loads its slop-test at Step 7; that is too late to pre-empt.) Each gate in `gates.md` is annotated with its checker (`engine/gates/gN-*.mjs`, vision `describe_image` Q, or `manual`), so you know what the engine will catch.

**Index-then-pick:** [`references/macrostructures.md`](references/macrostructures.md) (slim index, then load only the one per-macro file) and [`references/component-cookbook.md`](references/component-cookbook.md) (slim index, then load only the 5–7 archetype files you picked). Never load the whole cookbook.

**Load-per-build (universal):** [`typography.md`](references/typography.md), [`color.md`](references/color.md), [`layout-and-space.md`](references/layout-and-space.md), [`motion.md`](references/motion.md), [`copy.md`](references/copy.md), [`anti-patterns.md`](references/anti-patterns.md).

**Load-conditionally (only when the page needs it — be honest, don't pre-load "for safety"):** [`responsive.md`](references/responsive.md) (when mobile is in scope); the engine references [`engine.md`](references/engine.md) (load at Step 7).

**Verb-specific:** [`references/verbs/audit.md`](references/verbs/audit.md) only when `audit` runs.

### 4. Decide on hero enrichment

Most pages don't need it. The strongest hero is often a typographic one. Default to **typography only**. If the brief points to imagery (SaaS demo video, bakery illustration), reach for the highest tier you can ship: typography → Tier A pure CSS art → Tier B hand-built SVG → Tier C generated still → Tier D library → **Tier E Lottie last resort**. State the decision in one sentence (*"Enrichment: none — typography only."* or *"E1 Clipped-Edge Demo Video, Tier-A CSS-art mockup."*). The full `hero-enrichment.md` / `custom-craft.md` / `assets.md` references are deferred to a later plan; for v1 keep enrichment guidance inline + terse.

### 5. Preview

Before emitting code, output a tight summary the user can scan in five seconds and redirect *before* you write 500 lines of CSS:

```markdown
**Keystone · v0.1.0**

- **Macrostructure** · <name>
- **Theme** · <name> (<paper band> · <accent hue> · <display style>)
- **Enrichment** · <archetype + tier | none (typography only)>
- **Sections** · <section names in DOM order, ·-separated>
- **Motion** · <primitives ·-separated | none — typography only>
- **Slop test** · pending — engine runs at Step 7
- **Diversification** · differs from <last> on <axes>  *(only when log.json has prior entries)*
```

**The Slop test row reads `pending — engine runs at Step 7`.** Never claim `58/58 ✓` in the preview — the engine hasn't run yet. (This is the Keystone honesty contract; Hallmark's preview claims the score before the test.)

### 6. Build

Emit code that satisfies the tone and structural fingerprint. Match code complexity to tone ambition.

Always:
- **Hero headline — match font-size to copy length.** ≤7 words / ≤50 chars from the start; for longer, step down per the brackets in [`typography.md`](references/typography.md) § Hero headline sizing.
- **Section tags / eyebrows — default OFF.** Do not emit `01 · THE TOUR` / `02 / FEATURES` unless the user asked for numbering or the macrostructure is genuinely ordinal. Cap at 1–2 per page. **When a tag IS used, stack vertical — tag above, heading directly underneath in the same column.** The tag-left / heading-right two-column pattern is banned (→ **G54**).
- Use OKLCH for every colour; declare tokens as CSS custom properties at `:root`.
- Use a 4pt spacing scale with semantic names.
- Pair a distinctive display face with a refined body face (the 2+1 rule — three families max, → **G37**).
- Design every interactive element for its full eight states (default · hover · `:focus-visible` · `:active` · disabled · loading · error · success); see [`references/motion.md`](references/motion.md) + gates **G26**, **G39**.
- Animate `transform` and `opacity` only — never layout properties (→ **G14**).
- Use the three named easings (`--ease-out`, `--ease-in`, `--ease-in-out`) — never the browser default `ease`, never bounce/overshoot on UI state (→ **G12**).
- Support `prefers-reduced-motion: reduce` (→ **G27**). Include `:focus-visible` with a visible ring at ≥3:1 contrast; **never animate the ring's appearance** (→ **G15**).
- Cut motion before adding it. Most pages have too much, not too little.
- **Stamp the output.** The first non-empty line of the CSS file MUST be:
  `/* Keystone · macrostructure: <name> · tone: <tone> · anchor hue: <hue> · gates: <N>/58 engine-verified */`
  (the `gates:` value is filled at Step 7.4 — leave a placeholder `gates: pending` until then).
- **Append to project memory.** Update (or create) `.keystone/log.json` at the project root, newest entry first: `{ "date": "<YYYY-MM-DD>", "macrostructure": "<name>", "theme": "<name>", "enrichment": "<E# or 'none'>", "brief": "<one-line>" }`. Trim to the last 20.
- **Never clobber an existing global stylesheet.** An existing entry stylesheet (`app/globals.css`, `src/index.css`) is append-only — keep its framework directives, add Keystone's `:root` + base rules below them, reuse the project's own token names where they exist.
- **Always emit `tokens.css`.** After the page CSS, write `tokens.css` at the project root with every `--color-*`, `--font-*`, `--space-*`, `--text-*`, `--ease-*` token used in the build. The page CSS references tokens by name, never inlines raw values. This is what makes the system portable.

### 7. The slop test (engine-verified)

**Run the engine — do not imagine the render.** Hallmark's Step 7 asks the model to "run 58 gates in your head"; Keystone's Step 7 runs a real engine. See [`references/engine.md`](references/engine.md) for the loop and [`references/gates.md`](references/gates.md) for the gate list (and § The vision pass for the 18-question prompt).

- **7.1 DETERMINISTIC PASS**
  `bash: node engine/check-gates.mjs --html <path> --css <path> --log .keystone/log.json --render --viewports 1280,375,320,414,768 --out <dir>`
  → `keystone-report.json` + `keystone-report.html` + `keystone-render/` (screenshots + `computed.json` + `viewports.json`).
  All 13 detectors run: the 11 CSS/HTML-only gates parse the source; G34 (horizontal scroll) + G44 (hero fit) read the viewport metrics; G40-41 (contrast) read the OKLCH computed pairs; G8/G32 (diversification) diff the CSS stamp against `.keystone/log.json`.
  If any Deterministic gate FAILs: read the fix suggestions, apply, re-emit, re-run.
  **Cap: 3 deterministic iterations.** (Fast path: drop `--render` to run only the 11 source-only gates between full renders — cheaper iteration for pure-token fixes.)

- **7.2 VISION PASS**
  `keystone_render({ htmlPath, viewports: [1280, 375] })` → `describe_image({ image_paths: [<1280.png>, <375.png>], prompt: <the 18-question prompt from gates.md § The vision pass> })`.
  Read each verdict. Any FAIL (except G46, which flags rather than auto-fails) → apply the fix, re-render, re-vision.
  **Cap: 2 vision iterations.** S1 (*"does this look AI-generated?"*) is the thesis gate Hallmark cannot ask.

- **7.3 RESOLUTION**
  - 58/58 pass → preview row: `Slop test · 58/58 ✓ (engine-verified) — ./keystone-report.html`
  - Failures remain → preview row: `Slop test · N/58 — fails: <gate #s> (engine-verified)` — **ship with declared failures, never silently claim pass.**

- **7.4 STAMP + LOG**
  - Fill the CSS stamp's `gates:` field: `gates: 58/58 engine-verified` (or `gates: 52/58 — fails: 3,47,54 engine-verified`).
  - Append the gate result to `.keystone/log.json`.

**The honesty contract:** unlimited iterations are token inferno. 3 + 2 is the cap. Saying "52/58, here's what I couldn't fix" is better than claiming 58/58 on imagination. Re-emit the Step 5 preview block with the real score after the engine runs — the preview is the durable summary; it's wrong to ship if it lies.

---

## `keystone audit`

Load [`references/verbs/audit.md`](references/verbs/audit.md) and follow it. Same engine as Build's Step 7, pointed at external code — a read-only ranked punch list (4 severity tiers, computed APCA numbers, real file:line evidence). No iterate loop; audit scores, it doesn't fix.

```bash
node engine/audit.mjs ./site --out .                # path mode (file or dir)
node engine/audit.mjs https://app.com --out .        # URL mode (SSRF guard)
node engine/audit.mjs ./site --no-render --out .      # static-only (no Playwright)
```

The CLI produces the **Tier 1-3 deterministic** punch list + screenshots. **Then** run the vision pass yourself: `describe_image` on `keystone-audit/screenshot-1280.png` + `keystone-audit/screenshot-375.png` with the 18-question prompt ([`references/gates.md`](references/gates.md) § The vision pass), and append the **Tier 4** rows (S1-S3, G38a, G46) to `keystone-audit-report.md`. Tier 4 is confidence-weighted and never auto-fails alone. The engine does not call vision — the protocol-level split is identical to Build's Step 7. `--fix` is deliberately NOT in v1 (audit stays read-only; fixing is `redesign` in v2).

---

## Output contract & scope

- **Two files minimum:** the page artifact (HTML/CSS or framework component) + `tokens.css`. The CSS opens with the `/* Keystone · ... */` stamp.
- **Scope of skill:** Keystone is a taste skill for pages + audits. It does not do business-logic checks, performance audits (Lighthouse), SEO, or cross-browser testing (Chromium only for v1).
- **No bulldozing:** never delete production files without an approved file-level plan (see the safety rail above).
- **Reference, not source:** PDFs, briefs, docs, transcripts are reference material — never copy verbatim unless the user says to.
