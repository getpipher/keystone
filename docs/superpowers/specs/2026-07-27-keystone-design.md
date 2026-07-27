# Keystone — Design Spec

- **Status:** Approved (brainstorm complete 2026-07-27)
- **Author:** CIPHER (design partner) · RECTOR (product owner)
- **Next step:** writing-plans skill → implementation plan

---

## 1. Problem & Thesis

Every LLM has *on-distribution defaults* — Hero → 3-feature cards → CTA → footer, Inter font, indigo→purple gradients, glassmorphism, `hover:scale-105`, emoji icons, re-drawn browser/phone/IDE chrome. These are the "AI slop" fingerprint. The strongest existing counter — [`Nutlope/hallmark`](https://github.com/Nutlope/hallmark) (18.4k ⭐, v1.1.0, MIT) — encodes a tight rule-set of 58 anti-slop gates, 21 macrostructures, 50 component archetypes, and a diversification system.

**Hallmark's structural weakness: its gates are prose, not executable.** The skill instructs the model to "imagine the rendered output" (gate 35), "drag the dev-tools width slider" (gate 34), and "eyeball each viewport" (mobile gates) — then claim "58/58 ✓" on its own honor. The model can't see the page, can't compute APCA contrast, can't parse a DOM it never rendered. There is no enforcement. Verified: Hallmark's `package.json` has **zero dependencies**; the only headless-browser reference in the repo is a *deferred TODO* in `site/_tests/README.md`.

**Keystone's thesis:** beat Hallmark on output quality by making the gates *executable* — render the emitted page with real headless Chromium, compute contrast with real APCA math, parse the real DOM, and ask a vision model "does this look AI-generated?" on a real screenshot. The user can trust the gates ran because a script checked them, not because the model claimed it did.

**Win axis:** output quality (locked). **Home:** `getpipher/keystone/`, npm `@getpipher/keystone`, pi-first (locked). **Project scope:** all — pages + components (locked, Q5). **v1 thin slice:** Build + Audit verbs, pages only; component-scope flow deferred to v2 (per Q2 — Build+Audit chosen over Build+Component).

---

## 2. Locked Decisions (from brainstorm)

| # | Decision | Choice | Rationale |
|---|---|---|---|
| Q1 | Enforcement architecture | **Hybrid** — bash-invoked Node scripts for deterministic gates; small pi extension only for the render→screenshot loop (reusing `@getpipher/vision` for the vision-critique step) | Deterministic logic stays auditable/readable; extension surface stays small (fewer pi-API gotchas); public product selling "trust the gates" wants the gates readable, not black-boxed |
| Q2 | v1 thin slice | **Build + Audit** (pages only; component-scope deferred to v2) | Audit reuses Build's gate engine pointed at external code — nearly free, and it's the sharper marketing story ("point it at your real site, get a computed score Hallmark can't give you") |
| Q3 | Catalog reuse | **Curated rewrite, smaller + deeper** — reuse the 21-macro / 50-archetype / 58-gate *taxonomy*, rewrite all *prose*, ship 8 deep theme specs (vs Hallmark's 4/20 deep) | Ties Hallmark on rules, beats them on rules + enforcement; deeper per-theme specs = less model inference = more consistent output over time |
| Q4 | Name | **Keystone** (`@getpipher/keystone`) | "The thing that makes the structure hold" — fits macrostructure-first; clean npm/skill name; low SEO collision (defunct KeystoneJS) |
| Q5 | Render target | **Playwright headless Chromium** | Real rendering at exact CSS px (1280×800, 320/375/414/768) is non-negotiable for the thesis; `term` can't hit 375 CSS px; `browser`-skill CDP is for driving, not automation; the ~3MB dep is the price of determinism |
| Arch | Package shape | **One pi-package** shipping both `pi.skills` and `pi.extensions` (pi supports both in one manifest) | atomic versioning, single install, no drift, one repo tells the whole story |

---

## 3. Section 1 — Package Architecture

One pi-package, `@getpipher/keystone`, at `~/local-dev/getpipher/keystone/`.

```
getpipher/keystone/
├── package.json                 # pi: { skills: ["./skills"], extensions: ["./extensions/render.ts"] }
├── skills/
│   └── keystone/
│       ├── SKILL.md             # orchestrator (rewritten tighter than Hallmark's 558 lines; target ~350-400)
│       └── references/          # curated rewrite of the catalog
│           ├── macrostructures/ # 21 macros (taxonomy reused, prose ours)
│           ├── components/      # 50 archetypes (codes reused, prose ours)
│           ├── themes/          # 8 DEEP theme specs (vs Hallmark's 4/20)
│           ├── genres/          # 4 genres (editorial/modern-minimal/atmospheric/playful)
│           ├── gates.md         # the 58 gates — each annotated with its executable checker
│           ├── anti-patterns.md
│           ├── copy.md · typography.md · color.md · motion.md · layout-and-space.md · responsive.md
│           ├── verbs/           # audit.md (v1), redesign.md (v2 stub)
│           └── engine.md        # how the enforcement engine works (for model orchestration)
├── extensions/
│   └── render.ts                # the ONLY extension code: Playwright render → screenshots → return paths
├── engine/                      # bash-invoked Node scripts (auditable, NOT an extension)
│   ├── check-gates.mjs          # deterministic gates: parse HTML/CSS, APCA contrast, DOM structure, stamp/log diff
│   ├── extract-stamp.mjs        # parse the /* Keystone · ... */ stamp from a CSS file
│   └── report-template.html     # human-readable gate report template
├── examples/                    # 5 demo sites (side-by-side evidence)
│   └── 01-<brief>/ { index.html, style.css, tokens.css, brief.md }
├── docs/superpowers/specs/      # this design doc lives here
├── test/                        # unit tests for engine/ (contrast math, stamp parser, DOM detectors)
└── README.md
```

### Three execution tiers

| Tier | What | Where | Why |
|---|---|---|---|
| **Skill (Markdown)** | Rule-set, catalog, 7-step flow, gate *definitions* | `skills/keystone/` | The model reads this — the "taste," same surface as Hallmark's references |
| **Engine (Node scripts)** | Deterministic gate *checkers* — contrast math, DOM parsing, stamp/log diff | `engine/` (invoked via `bash`) | Auditable, readable, no pi-API surface. The "trust the gates" proof. |
| **Extension (TS)** | The one thing bash can't do: headless render + screenshot at exact CSS px | `extensions/render.ts` | Small surface = fewer pi-API gotchas. Reuses `@getpipher/vision` for the vision-critique step. |

### `render.ts` tool surface

```
keystone_render({ htmlPath, viewports?: [1280, 375, 320, 414, 768] })
  → { screenshots: [{ width, path }], computedStyles: <path>, domSnapshot: <path> }
```

The extension does **not** do contrast math or gate-checking — that's `engine/check-gates.mjs`. The extension only renders + screenshots + dumps computed styles + DOM snapshot. Keeps the extension thin (rare updates when gates change) and the deterministic logic in auditable Node the user can `cat`.

---

## 4. Section 2 — The Gate Engine

### Two enforcement layers

| Layer | ~Gates | Checker | Model can fake? |
|---|---|---|---|
| **Deterministic** | ~40 of 58 | `engine/check-gates.mjs` (Node, bash-invoked) — parses HTML/CSS + Playwright computed-styles + DOM snapshot; math + structure, no judgment | No — it's a script |
| **Vision** | ~18 of 58 | `describe_image` (existing `@getpipher/vision`) on the Playwright screenshot — vision model answers targeted yes/no questions | Harder — it's a model second-opinion, not math. Treated as such. |

The split rule: "can a script answer this yes/no?" → deterministic. "Does it need eyes?" → vision.

### Representative gate → checker mapping

| Gate # | Gate | Layer | The check |
|---|---|---|---|
| 1 | Banned display fonts | Det | Parse `--font-display` + all `font-family`; regex vs ban list |
| 2 | Gradient text | Det | Computed styles: `background-clip: text` + `background-image: linear-gradient` co-occurring |
| 3 | 3-equal-col card grid | Det | `grid-template-columns: 1fr 1fr 1fr` (or equal tracks) with card children in icon>heading order |
| 6 | Hero centred-everything | Det + Vis | Det: `text-align`/`margin` on hero children. Vision: "all on one centred axis?" |
| 7 | Pure #000 / #fff base | Det | Scan color tokens for `oklch(0 0 0)` / `oklch(100 0 0)` / `#000` / `#fff` as base |
| 14 | Animating layout props | Det | Parse `@keyframes` + `transition` properties; flag width/height/top/left/margin/padding |
| 22 | Zero-chroma neutrals | Det | Scan tokens + computed styles for `oklch(L 0 H)` in neutral/surface role |
| 23 | Accent >5% viewport | Det | Bounding-box area of accent-colored elements vs viewport area |
| 26 | Missing interaction states | Det | For each interactive selector, confirm `:hover` + `:focus-visible` + `:active` + `:disabled` rules exist |
| 34 | Horizontal scroll 320–1920 | Det | Playwright: `document.scrollWidth > window.innerWidth` at each viewport |
| 40-41 | Contrast (WCAG 4.5:1 / APCA) | Det | Computed `(color, background-color)` pairs from Playwright dump; APCA Lc formula |
| 44 | Hero fits 1280×800 fold | Det | Playwright 1280×800: hero eyebrow+headline+lede+CTA bounding rect within `innerHeight` |
| 46 | Invented metrics | Vis | Vision: "any '10× faster', '50,000+ teams', '99.9% uptime' pattern?" — flag for user, not auto-fail |
| 47 | Re-drawn chrome | Det + Vis | Det: chrome patterns (`.browser-bar` + dots, phone-notch divs). Vision: "fake browser/phone/IDE frame?" |
| 48 | Mid-render token improvisation | Det | All `color:`/`background:`/`font-family:` decls; flag values not `var(--...)` outside `:root`/`[data-theme]` |
| 49 | Two-line clickable text 320–1920 | Det | Playwright per viewport: button/nav-link/CTA `offsetHeight` vs `line-height` — >1 line fails |
| 50 | Image grid track w/o `minmax(0,1fr)` | Det | `grid-template-columns` with `1fr` track containing `<img>` → fail |
| 54 | Tag-left / heading-right | Det | Section head wrapper with eyebrow + heading AND `grid-template-columns` ≠ `1fr` → fail |
| 8/32 | Macro/nav/footer reuse vs log.json | Det | `extract-stamp.mjs` parses CSS stamp; diff vs `.keystone/log.json` last 3 entries |

The full 58-gate → checker table is an appendix to be produced during implementation.

### The gate report (the "trust" artifact)

`check-gates.mjs` emits `keystone-report.html` — human-readable, openable in a browser:

```
Keystone · gate report · <timestamp>
PASS 38 / 58  (engine-verified)
FAIL 20 / 58  → see below

DETERMINISTIC (40 gates)
  ✓ 1   Banned display fonts        — font-display: "Newsreader"
  ✗ 3   3-equal-col card grid       — .features grid-template-columns: 1fr 1fr 1fr
                                      fix: bento or asymmetric spans
  ✗ 48  Mid-render token improv.    — app/globals.css:42 `color: #c0392b` outside :root
                                      fix: lift to --color-accent or use var()

VISION (18 gates)
  ✓ 6   Hero centred-everything     — vision: "no, hero is left-anchored"
  ✗ 47  Re-drawn chrome             — vision: "yes, fake browser bar at line 88" (conf 0.88)

SCREENSHOTS
  [1280×800]  [375×812]  [320×568]  [414×896]  [768×1024]
```

Each FAIL row: gate # + name, **exact file:line** or selector, **evidence** (parsed value / computed style / DOM selector), **fix suggestion**. Screenshots linked so the user sees what the vision model saw.

### The iterate-until-pass loop

```
Step 6 (Build) → emit HTML/CSS/tokens
Step 7 (Engine-verified slop test):
  7.1 DETERMINISTIC PASS
      bash: node engine/check-gates.mjs --html <path> --css <path> \
              --log .keystone/log.json --viewports 1280,375,320,414,768
      → keystone-report.json + keystone-report.html
      If any Det gate FAILs: read fix suggestions, apply, re-emit, re-run
      cap: 3 deterministic iterations
  7.2 VISION PASS
      keystone_render({ htmlPath, viewports: [1280, 375] })
      describe_image({ image_paths: [<1280.png>, <375.png>], prompt: <18 vision-gate questions> })
      If any Vis gate FAILs: read verdicts, apply fixes, re-render, re-vision
      cap: 2 vision iterations
  7.3 RESOLUTION
      58/58 pass → preview row: "58/58 ✓ (engine-verified) — ./keystone-report.html"
      failures remain → preview row: "N/58 — fails: <#s> (engine-verified)" — ship with declared failures, never silently claim pass
  7.4 STAMP + LOG
      CSS stamp appended: /* Keystone · ... · gates: 58/58 engine-verified */
      .keystone/log.json appended with gate result
```

**Iteration cap: 3 deterministic + 2 vision.** Unlimited = token inferno. The "ship with declared failures" exit is the honesty contract — better to say "52/58, here's what I couldn't fix" than claim 58/58 on imagination.

### The 18 vision-gate questions (single structured prompt, both screenshots via `image_paths`)

```
You are a design critic. For each gate, answer PASS or FAIL with one-sentence evidence.
Answer for BOTH desktop (1280) and mobile (375) screenshots.

STRUCTURE
  G6  Hero centred-everything: eyebrow+title+lede+CTA all on one centred axis?
  G9  Equal-whitespace sections: any two adjacent sections identical in rhythm?
  G29 Abstract background: >1 accent colour, or animating mesh on whole page?
  G42 Nav fingerprint: wordmark-left + 4-5 inline links + button-right + hairline border?
  G43 Footer fingerprint: 4-col links + social row + tiny copyright?
  G44 Hero fit: eyebrow+headline+lede+primary CTA visible without scrolling (1280 only)?
  G45 Decorative-without-purpose: ornament with no semantic anchor?
TYPOGRAPHY
  G38a Italic headers: any heading/display in italic? (italic emphasis word in upright headline = FAIL)
CHROME & CONTENT
  G30 Icon tells: mixed libraries, or emoji-as-feature-icon (✨🚀⚡)?
  G46 Invented metrics: "10× faster", "50,000+ teams", "99.9% uptime"? (flag, not auto-fail)
  G47 Re-drawn chrome: fake browser/phone/code-block/IDE frame?
CRAFT
  G35 Decorative stroke position: highlighter band at baseline (fat underline) vs behind x-height?
  G36 Flex align-items: any nav/toolbar/CTA row where button is taller than sibling text?
SUBJECTIVE (confidence-weighted, never auto-fail alone)
  S1  Does this page look AI-generated? (if yes, name top 3 tells)
  S2  Does this feel like this specific brief, or a generic page?
  S3  Two pages from this skill for two briefs — would they feel like different sites?
```

S1 ("does this look AI-generated?") is the question Hallmark *cannot ask its model* — its model never sees the page.

### Deliberately out of the engine

| Excluded | Why |
|---|---|
| Business-logic checks (form submit, state) | Out of scope — Keystone is a taste skill |
| Performance audits (Lighthouse, bundle) | YAGNI v1; roadmap |
| SEO / structured-data checks | Hallmark open issue too (#49); not v1 |
| Cross-browser (Firefox/Safari) | Playwright Chromium only for v1 |

---

## 5. Section 3 — The Build Verb Flow

Inherits Hallmark's 7-step skeleton (the skeleton is good); every "model imagines a check" step hands off to the engine.

### Step delta

| Step | Hallmark | Keystone |
|---|---|---|
| 0 · Pre-flight scan | `.hallmark/preflight.json` | `.keystone/preflight.json` + `.keystone/log.json` (namespace only) |
| 1 · Design-context gate | always ask audience/use/tone; genre detect | identical (Hallmark's gate is right) |
| 2 · Macro + nav + footer pick | 21 macros, N1a–N13, Ft1–Ft8; diversification stated | identical taxonomy, **diversification enforced** (gate 8/32 runs as real diff vs `.keystone/log.json`) |
| 2.5 · Check project memory | reads `.hallmark/log.json` | reads `.keystone/log.json` |
| 2.6 · Theme route | catalog (20) / custom / studied-DNA | catalog (**8 deep**) / custom / studied-DNA |
| 3 · Load ruleset | lazy-load discipline | identical discipline, **each gate file annotated with its checker** (`engine.md` cross-ref) so the model pre-empts |
| 4 · Hero enrichment | typography-default; tier hierarchy A→E | identical |
| 5 · Preview | "Slop test: 58/58 ✓" (honor system) | **"Slop test: pending — engine runs at Step 7"** |
| 6 · Build | emit HTML/CSS/tokens; stamp CSS; append log; never clobber globals | identical, **stamp format `/* Keystone · ... */`** (the engine's parse target) |
| 7 · Slop test | "run 58 gates in your head" | **run the engine** (Section 2 loop) |

### Revised Step 7 (the only material change)

See Section 2's iterate-until-pass loop. The preview block's Slop test row reads either `"58/58 ✓ (engine-verified) — ./keystone-report.html"` or `"N/58 — fails: <gate#s> (engine-verified)"` — never an unverified claim.

### Experience delta

| Moment | Hallmark | Keystone |
|---|---|---|
| After "build me a landing page" | page + "Slop test: 58/58 ✓" | page + "58/58 ✓ (engine-verified) — open ./keystone-report.html" |
| Skeptical | trust the model | open the report — real APCA numbers, detected DOM patterns, screenshots the vision judged |
| Gate failed | nothing (model claimed pass) | preview says "52/58 — fails: 3, 47, 54" + report; CSS stamp carries it |
| Next build | model "remembers" | engine reads `.keystone/log.json` and *refuses* a same-macrostructure pick (gate 8 fails before build starts) |

---

## 6. Section 4 — The Audit Verb

Same engine as Build's Step 7, pointed at someone else's code. "Point it at your real site, get a computed score Hallmark can't give you."

### Build vs Audit

| | Build | Audit |
|---|---|---|
| Engine | identical (`check-gates.mjs` + `keystone_render` + `describe_image`) | identical |
| Target | freshly-emitted HTML/CSS | existing HTML/CSS — local path OR live URL |
| Render | Playwright loads emitted file | Playwright navigates URL (or loads local) — same dep, doubled value |
| Diversification gates (8, 20, 21, 32, 57) | apply | **excluded** — meaningless externally |
| Honest-copy gate (46) | applies (did we invent?) | applies, **read-only flag** — can't know what user supplied |
| Mid-render token gate (48) | applies (did we improvise?) | applies (does their CSS have inline values outside tokens?) — real audit finding |
| Stamp gate (20) | applies | excluded — external code has no Keystone stamp |
| Output | page + pass/fail stamp + log append | **report IS the deliverable** — no code emitted, no edits (read-only, matches Hallmark's "punch list, no edits") |
| Iteration loop | yes (3+2) | **no** — audit scores, doesn't fix. Fixing = `redesign` (v2) |
| Gate count | 58 | **52** (58 minus 6 diversification/stamp gates) |

### Two input modes

| Mode | Invocation | How |
|---|---|---|
| Path mode | `keystone audit ./site` or `keystone audit index.html styles.css` | Playwright loads local file(s) via `file://` or temp `http-server` |
| URL mode | `keystone audit https://yourapp.com` | Playwright navigates headless, waits network-idle, extracts rendered DOM + computed styles + reachable CSS. **Playwright earns its dep twice** — Hallmark's audit reads code and can't catch rendering-only gates (hero fit, horizontal scroll, mobile breakpoints). We render the real site. |

URL mode reuses the adversarial-fetch safety posture from Hallmark's `study` verb (refuse private IPs, localhost, metadata endpoints, non-web schemes) — same class of risk.

### The audit report (ranked punch list, not pass/fail card)

```
Keystone · audit report · https://yourapp.com · <timestamp>
52 gates run · 34 PASS · 18 FAIL · 2 N/A

RANKED PUNCH LIST (highest-impact first)

TIER 1 · STRUCTURAL TELLS (fix first)
  ✗ G3   3-equal-col card grid
        .features grid-template-columns: 1fr 1fr 1fr  (styles.css:142)
        fix: bento grid or asymmetric spans · effort: medium

  ✗ G42  Nav fingerprint — AI default
        wordmark + 5 inline links + button-right + hairline border  (header.nav)
        fix: rotate to N5 floating-pill or N1b · effort: medium

  ✗ G47  Re-drawn chrome — fake browser bar
        .demo-frame::before contains 3 traffic-light dots  (styles.css:88)
        fix: real <figure> + screenshot, or drop chrome · effort: low

TIER 2 · ACCESSIBILITY
  ✗ G40  Contrast — 4 pairs fail 4.5:1
        .btn-text on .btn  2.1:1  ← button-text ≈ button-fill bug
        fix: raise paper-2 lightness or define --color-accent-ink · effort: low

  ✗ G26  Missing interaction states
        .btn has :hover but no :focus-visible, :active, :disabled
        fix: add the four state rules · effort: low

TIER 3 · CRAFT
  ✗ G22  Zero-chroma neutrals (3 surfaces) · effort: trivial
  ✗ G49  Two-line clickable text at 375px · effort: trivial
  ✗ G35  Decorative stroke position (fat underline) · effort: low

TIER 4 · SUBJECTIVE (vision-verdict, confidence-weighted, never auto-fail alone)
  ⚠ S1   "Does this look AI-generated?" — YES (0.82)
        top tells: 3-col grid, gradient hero, centred-everything
        → covered by TIER 1 fixes
  ⚠ G38a Italic headers — "Built to <em>think</em>" (index.html:24) · effort: low

N/A (2): G8 diversification, G20 stamp

SCREENSHOTS: [1280×800] [375×812] [320×568] [414×896] [768×1024]
RAW DATA: ./keystone-audit/{computed.json, dom.html, vision.json}
```

### Severity tiers

| Tier | What | Ranking signal |
|---|---|---|
| 1 · Structural tells | gates that scream "AI-generated" in 2s (3, 6, 7, 30, 42, 43, 45, 47, 54) | perceptual auto-fails |
| 2 · Accessibility | contrast (40-41), states (26), reduced-motion (27), focus ring (15) | WCAG/legal + real-user harm |
| 3 · Craft | spacing (24), max-width (25), neutrals (22), accent footprint (23), stroke (35), two-line clickables (49), mobile grid (50-53) | polish — page works but reads sloppy |
| 4 · Subjective | S1-S3 + italic-headers (38a) + invented-metrics (46) | vision-verdict, confidence-weighted, never auto-fail alone |

Each FAIL row: gate # + name, **file:line** or selector, **evidence value** (actual APCA number, actual grid-template-columns string), **fix suggestion**, **effort** (trivial/low/medium/high — heuristic from files/rules touched).

### `--fix` deliberately NOT in v1

`keystone audit --fix` blurs into `redesign`. Audit stays read-only in v1 (matches Hallmark's contract). The user reads the report, then runs `redesign` (v2) or fixes manually.

---

## 7. Section 5 — The Curated Catalog

### Taxonomy reuse — what we lift vs rewrite

| Asset | Hallmark | Keystone | Basis |
|---|---|---|---|
| 21 macrostructure names + concepts | Specimen, Bento Grid, … | **Names reused**, one-liners reworded | Names are short factual labels; concepts uncopyrightable. MIT NOTICE. |
| 50 archetype codes | H1–H9, S1–S5, F1–F6, C1–C4, T1–T4, Ft1–Ft8, N1–N13 | **Codes reused** (stable IDs), prose rewritten, each annotated with which gates police it | Codes are a taxonomy. |
| 58 gate concepts | "3-col card grid," "gradient text," "italic headers," "re-drawn chrome" | **Concepts reused** (facts about AI slop), prose rewritten tighter, **each annotated with its executable checker** (new) | Anti-patterns are uncopyrightable observations. |
| 4 genres | editorial/modern-minimal/atmospheric/playful | **Reused**, genre files rewritten | — |
| 7-step flow skeleton | Pre-flight → context gate → macro → memory → theme → load → build → slop test | **Skeleton reused**, prose rewritten, Step 7 replaced by engine loop | Process, not expression. |
| Theme specs | 4 deep (carnival, cobalt, hum, lumen), 16 tokens-only | **All 8 deep** | — |
| Theme token values | Hallmark's | **Ours** — re-derived per theme | Numbers independently derived. |
| SKILL.md prose | 558 lines | **Rewritten**, target ~350-400 | — |
| examples/ | 15+ demos | **Ours** — 5 fresh briefs | — |
| NOTICE / attribution | — | **NOTICE** credits Hallmark as taxonomy origin; MIT header on any verbatim-forked file (minimal) | MIT + good public-product practice. |

**The line we hold:** reuse the taxonomy (the *what*), rewrite all expression (the *how it's said*), add the enforcement annotations (the *how it's checked*) — our original contribution.

### The 8 deep themes

| # | Theme | Genre | Paper | Display style | Accent hue | Why in the 8 |
|---|---|---|---|---|---|---|
| 1 | Midnight | atmospheric | dark | geometric-sans | cool | dark-AI-tool school anchor |
| 2 | Cobalt | modern-minimal | light | grotesk-sans | cool | Stripe/Linear school anchor |
| 3 | Garden | editorial | light | roman-serif | chromatic-green | warm botanical editorial |
| 4 | Hum | playful | light | rounded-sans | warm | post-Linear soft anchor (Hallmark's flagship) |
| 5 | Specimen | editorial | light | high-contrast-serif | neutral/warm | canonical editorial voice — kept but **not a default** (inherits Hallmark's fall-through ban) |
| 6 | Manifesto | editorial | light/dark | grotesk-sans (condensed) | neutral | polemical poster — anti-SaaS |
| 7 | Terminal | atmospheric-adjacent | dark | mono | phosphor | technical/CLI — mono purity |
| 8 | Riso | editorial | light | risograph-bold | chromatic-other | tactile-rebellion anchor — "made not generated" embodied |

**Axis coverage:** paper (dark + light + mid) ✓ · display style (7 of ~10 axis values) ✓ · accent hue (cool + warm + chromatic-green + neutral + phosphor + chromatic-other) ✓. The diversification rule is satisfiable from this set. (Hallmark's 20 satisfy it too, but 16 make the model *infer* display style from tokens — ours state it explicitly.)

### What "deep" means — theme spec template (all 8 ship this)

| Section | Hallmark deep (4) | Hallmark shallow (16) | Keystone (8) |
|---|---|---|---|
| Paper + accent OKLCH values | ✓ | ✓ | ✓ |
| Display + body font pairing (free fonts) | ✓ | ✓ | ✓ |
| Signature moves (2-3 things that make this theme *this*) | ✓ | ✗ | ✓ |
| Macrostructure affinity (loves / rejects) | ✓ | ✗ | ✓ |
| Voice fixtures (example copy in register) | partial | ✗ | ✓ — fixes Hallmark's "bends toward 'Built for the modern team'" problem |
| Theme-specific anti-patterns | partial | ✗ | ✓ |
| Nav/footer archetype routing | ✓ (in cookbook) | ✗ | ✓ — pulled into the spec for one-stop loading |
| Worked example (small HTML/CSS sketch) | ✗ | ✗ | ✓ — new |
| 3 diversification axes stated explicitly | ✗ (buried in tokens.css) | ✗ | ✓ — at the top; the engine reads them |
| Gate overrides (genre-scoped loosen/tighten) | partial | ✗ | ✓ — per-theme |
| Engine cross-ref (which gates check this theme's signature moves) | n/a | n/a | ✓ — new, our original contribution |

The last row is the key differentiator: Hallmark's specs tell the model what to do; Keystone's tell the model what to do **and** which gate the engine will catch if it drifts. Spec and checker are co-documented.

### Why 8

| Count | Trade-off |
|---|---|
| 6 | fastest, but axis coverage thins (can't span 4 genres × 3 axes without overlap) |
| **8** ✅ | covers all 4 genres, spans all 3 axes, each gets a full spec — ~3-4 wks writing |
| 12 | more variety, but writing effort scales linearly; v1 ships later |
| 20 | contradicts "smaller + deeper" — matches Hallmark's breadth, not depth |

8 is the smallest count satisfying the diversification coverage. Adding themes later is additive/non-breaking (engine reads axis values from the spec, not a hardcoded list) → 8 → 12 → 20 is a clean roadmap.

---

## 8. Section 6 — Testing, CI & "Do We Actually Beat Hallmark"

### Four test tiers

| Tier | What | Where | When |
|---|---|---|---|
| 1 · Engine unit tests | Each gate detector vs known-pass + known-fail fixtures. APCA math. Stamp parser. DOM detectors (3-col grid, tag-left/header-right, minmax). | `test/engine/*.test.mjs` (node:test) | every commit (CI) |
| 2 · Skill structural lint | Every gate in `gates.md` has a checker annotation. Every theme spec has the 11 required sections. Macro names stable vs `log.json` history. No token outside `:root`. | `test/lint-skill.mjs` | every commit (CI) |
| 3 · Example regression | Each of 5 `examples/` runs the engine; floor ≥50/58 (v1 threshold, raises over time). | `test/examples.test.mjs` | every commit + on example edit |
| 4 · Comparison harness | The "do we beat Hallmark" proof. N briefs through both skills, scored with our engine, screenshots both. | `test/compare/` | on tag/release + on demand |

### Tier 4 — the comparison harness (marketing artifact)

```
test/compare/
├── briefs/                       # 8 neutral briefs (same 8 Hallmark uses in their _tests, MIT)
├── run-comparison.mjs            # per brief: invoke Hallmark, invoke Keystone, score both
├── score-with-keystone.mjs       # run OUR engine on Hallmark's output too (the killer)
└── gallery/                      # generated public demo
    ├── index.html                # side-by-side: brief → Hallmark | Keystone | both scores
    └── 01-<brief>/
        ├── hallmark.html  hallmark.css  hallmark-score.json  hallmark-1280.png
        ├── keystone.html   keystone.css   keystone-score.json   keystone-1280.png
        └── verdict.md
```

### Methodology (airtight)

| Step | What | Why fair |
|---|---|---|
| 1 | Same brief verbatim into each skill (Hallmark via `npx skills add`; Keystone local) | identical input |
| 2 | Both run with NO human intervention ("go ahead" opt-out on both) | identical delegation |
| 3 | Both outputs rendered by **our** Playwright at the same 5 viewports | identical render pipeline |
| 4 | Both scored by **our** engine (same 52 gates, deterministic + vision) | identical scoring — we score ourselves with the same engine we score them with. Rigging avoided. |
| 5 | Vision S1 ("looks AI-generated?") asked of both screenshots, same prompt | identical question |
| 6 | Gallery published: both pages live, both scores, both screenshots, both raw reports | full transparency |

**Honesty clause:** if Hallmark beats Keystone on a brief, the gallery shows it. A gallery that only shows Keystone winning is a rigged demo, and a rigged demo destroys the "trust the gates" thesis. Losses published with a note on what we'll fix.

### Verdict report (per brief)

```
Brief 03 · Maple Street Bakery (artisan bakery, warm editorial)

HALLMARK              KEYSTONE
─────────             ────────
macrostructure: Catalogue   macrostructure: Long Document
theme:        Almanac       theme:        Garden
enrichment:   Tier-A SVG    enrichment:   none (typography)

ENGINE SCORE (52 gates)
  PASS 41  FAIL 11           PASS 49  FAIL 3
  fails: G3, G23, G40(x2),    fails: G35 → fixed in 1 iter
        G42, G47, G49(x2),    → final: 52/52 ✓
        G54, G38a, S1=YES(0.71)

VISION S1 "looks AI-generated?"
  YES (0.71)                   NO (0.18)

OPEN BOTH  [hallmark] [keystone]  ·  [full hallmark report] [full keystone report]
```

### CI pipeline

| Stage | Tool | Gate |
|---|---|---|
| Lint | eslint + skill structural lint | blocks merge |
| Engine tests | `node --test test/engine/` | blocks merge |
| Example regression | `node --test test/examples.test.mjs` (≥50/58 per example) | blocks merge |
| Typecheck | `tsc --noEmit` on `extensions/render.ts` | blocks merge |
| Comparison harness | `node test/compare/run-comparison.mjs` | informational on PR; publishes on tag |

### Success criteria (concrete, falsifiable)

| Metric | v1.0 target | Measured by |
|---|---|---|
| Engine score: Keystone avg vs Hallmark avg (8 briefs) | Keystone ≥ Hallmark by ≥5 gates | comparison harness, deterministic gates |
| Vision S1 confidence: Keystone vs Hallmark | Keystone ≤ 0.30, Hallmark ≥ 0.50 | vision pass, averaged |
| Keystone self-audit (engine on our output) | ≥50/58 avg, ≥3 examples at 58/58 | examples regression tier |
| Ship-with-declared-failures rate | <20% (>80% reach 58/58 within 3+2 cap) | examples regression tier |
| Hallmark output scored by our engine catches real failures | ≥8 gates fail on Hallmark's output across 8 briefs | the "Hallmark can't self-grade" proof — confirms the moat exists |

**The last row is the most important:** if our engine can't find failures in Hallmark's output that Hallmark's model claimed passed, the moat doesn't exist. If it does (and it will — Hallmark ships gates 34/40/47/48 failures regularly), we have demonstrable proof.

### Out of scope for v1 testing

| Excluded | Why |
|---|---|
| Cross-browser CI (Firefox/Safari) | Playwright Chromium only v1; roadmap |
| Visual regression via pixel-diff | brittle; vision pass covers layout-shift better |
| Performance budgets (Lighthouse) | YAGNI v1 |
| Full a11y audit (axe-core) | contrast + states gates cover high-value subset; axe-core is roadmap |

---

## 9. v1 Scope Summary

### In v1

- `keystone build` (default verb) — full 7-step flow with engine-verified Step 7
- `keystone audit <path|URL>` — read-only ranked punch list
- 8 deep themes (Midnight, Cobalt, Garden, Hum, Specimen, Manifesto, Terminal, Riso)
- 21 macrostructures + 50 archetypes (taxonomy reused)
- 58 gates, ~40 deterministic + ~18 vision
- Engine: `check-gates.mjs` + `extract-stamp.mjs` + `keystone_render` extension
- `.keystone/log.json` + `.keystone/preflight.json` project memory
- 5 example sites
- 4-tier test suite + comparison harness gallery
- pi package `@getpipher/keystone` (skill + extension in one manifest)

### Deferred to v2+

| Item | Why deferred |
|---|---|
| `keystone redesign` verb | blurs with audit --fix; build + audit prove the thesis first |
| `keystone study` verb (DNA extraction) | whole separate protocol (URL adversarial-fetch, image-mode vision pass); ship after build/audit land |
| Component-scope flow (buttons/cards/8-state) | valuable but separate flow; v1 focuses on pages where structural-variety differentiator shows hardest |
| `audit --fix` | keeps audit read-only in v1 |
| Themes 9-20 | additive; 8 covers diversification; ship 8 → 12 → 20 |
| Cross-browser CI, axe-core, Lighthouse | YAGNI v1 |
| Nanobanana image hook, brand-first flow, `keystone variant`, charts/data-viz ref, live-preview MCP server | Hallmark roadmap items we share; defer |

---

## 10. Open Questions (none blocking — all resolved in brainstorm)

All five strategic forks resolved (Q1-Q5 + package architecture). No blocking unknowns remain. Implementation-phase questions (exact font pairings per theme, exact OKLCH values, the full 58-gate → checker appendix, the 5 example briefs) are deferred to the writing-plans → implementation flow.

---

## 11. References

- Hallmark repo (MIT): https://github.com/Nutlope/hallmark — taxonomy origin, credited in NOTICE
- `@getpipher/vision` (v0.5.2) — capability-aware `describe_image`, reused for the vision-critique step
- Pi packages docs: `~/.nvm/.../pi-coding-agent/docs/packages.md` — confirms `pi.skills` + `pi.extensions` in one manifest
- getpipher AGENTS.md — pi-extension-API gotchas (theme typing, shortcut keys) that `render.ts` must respect

---

## 12. Success Definition

Keystone v1 ships when:
1. `pi install npm:@getpipher/keystone` works and exposes both the skill and the `keystone_render` tool
2. `keystone build` produces a page that scores ≥50/58 on its own engine, with the report openable
3. `keystone audit <path|URL>` produces a ranked punch list with computed APCA numbers and real file:line evidence
4. The comparison harness gallery is published with 8 briefs, both skills scored by our engine, losses included
5. All 4 CI tiers green; example regression floor ≥50/58 holds
6. README + NOTICE credit Hallmark as taxonomy origin; MIT license

The thesis is proven when the comparison harness shows our engine finding failures in Hallmark's output that Hallmark's own model claimed passed.