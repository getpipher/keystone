# Plan 5b-03 · Maple Street Bread — Keystone comparison candidate

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the Keystone-side candidate for comparison brief 03 (`candidates/03-maple-bakery/keystone/{index.html, style.css}`) — a bakery landing page that passes the real engine at 48/48 gate numbers with a recorded vision pass.

**Architecture:** Single-page static site (vanilla HTML + one self-contained CSS file), built in a scratch workspace, engine-verified via `engine/check-gates.mjs --render` at 5 viewports, vision-passed by reading the rendered PNGs against the 18-question prompt, then packaged into the repo's `candidates/` tree. Design system: Garden theme (editorial · light · chromatic-green · roman-serif) on the Long Document macrostructure (02) with an N6 newspaper-masthead nav and an Ft6 letter-close footer.

**Tech Stack:** None at runtime (vanilla HTML/CSS). Build-time: Node ≥20 (`engine/check-gates.mjs`), headless Chromium via the repo's render extension, Google Fonts (Newsreader variable, Source Serif 4 variable, IBM Plex Mono 400/500).

**Execution status:** Executed once end-to-end on 2026-08-29 by the brainstorm phase; the shipped candidate at `candidates/03-maple-bakery/keystone/` is the ground truth this plan reproduces (commit `af16fdd`). Re-execution from a clean scratch must use the embedded files verbatim — every non-obvious rule in them exists because a gate demanded it (see Task 3's trap list).

**Blind-run integrity:** the brief is the verbatim prompt from `test/compare/briefs/03-maple-bakery.md`. Hallmark's picks for this brief (editorial/Garden/Long Document/N6) are skill-deterministic for this brief shape — convergence on picks is expected and legitimate; the implementation, copy, and structure below are Keystone's own.

## Global Constraints

- Brief, verbatim, no reinterpretation: `Landing page for Maple Street Bread. Audience: locals who want to buy bread. Use: see what's available + visit. Tone: warm, hand-set, considered.`
- ALL work artifacts stay in `/tmp/keystone-5b/03/keystone-work/` (including `.keystone/log.json`). Never write the repo's `.keystone/`.
- Repo writes are limited to `candidates/03-maple-bakery/keystone/` (plus this plan doc). Do NOT touch sibling workstreams (`candidates/03-maple-bakery/hallmark/`, brief03-hallmark plan).
- The engine is frozen — build within it, never edit `engine/`.
- Iteration caps: 3 deterministic engine iterations, 2 vision iterations. Ship with declared failures rather than imagined passes. NEVER fabricate an S1 verdict.
- Honest copy: no invented proof-metrics, no testimonials (G19/G46). The shop's own labelled fiction (name, est. 2019, address, bake list, $9–$11 prices) is allowed and must be labelled as fiction in `brief.md`.
- 2-space indent, EOF newline on every emitted file.
- Design decisions are locked (do not re-derive): genre **editorial**; macrostructure **Long Document (02)**; nav **N6**; footer **Ft6** (letter close set **roman** — Ft6 permits italic, G38a's vision surface stays clean); theme **Garden**; enrichment **none (typography only)**; pre-emit critique `P5 H4 E5 S5 R5 V5`.

---

### Task 1: Scaffold the scratch workspace

**Files:**
- Create: `/tmp/keystone-5b/03/keystone-work/` (dir)
- Create: `/tmp/keystone-5b/03/keystone-work/.keystone/log.json`

**Interfaces:**
- Produces: `WORK=/tmp/keystone-5b/03/keystone-work` — every later task reads/writes here. The engine's `--log` flag MUST point at `$WORK/.keystone/log.json`.

- [ ] **Step 1: Create the workspace and an empty first-run log**

```bash
rm -rf /tmp/keystone-5b/03/keystone-work
mkdir -p /tmp/keystone-5b/03/keystone-work/.keystone
printf '[]\n' > /tmp/keystone-5b/03/keystone-work/.keystone/log.json
```

- [ ] **Step 2: Verify**

Run: `cat /tmp/keystone-5b/03/keystone-work/.keystone/log.json`
Expected: `[]`

(An empty log = first run → G8/G32 impose no constraint. The log is seeded with this build's entry only AFTER the passing render — seeding earlier makes G8 self-fail by construction.)

---

### Task 2: Emit `index.html` (Long Document + N6 masthead + bake table)

**Files:**
- Create: `/tmp/keystone-5b/03/keystone-work/index.html`

**Interfaces:**
- Consumes: `style.css` (Task 3) via `<link rel="stylesheet" href="style.css">`.
- Produces: DOM hooks the CSS selectors in Task 3 target: `.nav-mast > .mast-line/.mast-name/.mast-nav/.mast-rule`, `.prose > .lede/.inline-head`, `.bake > thead th/.bake-name/.bake-note/.bake-price`, `.bake-note-foot`, `.foot-letter > .foot-letter__close(.foot-letter__sign)/.foot-letter__ps`.

**Copy decisions (locked):** date-anchored lede ("Tuesday. The levain went in at midnight…"); a 4-row bake table (Country loaf $9 / Maple porridge loaf $11 / Seeded rye $10 / Cardamom knots $4 — the shop's labelled fiction); visit prose (48 Maple Street, corner of Wren; Tue–Sat 7–2); about prose (two bakers, one wood-fired deck oven); Ft6 close "See you on the sidewalk." + a P.S. with a `.example` mailto. Curly apostrophes (`’`), em-dashes (`—`), `&nbsp;` before `·`.

- [ ] **Step 1: Write the file with exactly this content**

```html
<!doctype html>
<html lang="en" data-theme="garden">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <!-- Keystone · pre-emit critique: P5 H4 E5 S5 R5 V5 -->
  <meta name="description" content="Maple Street Bread — a small bakery on Maple Street. Today's bake, hours, and how to find us. Baked mornings since 2019.">
  <title>Maple Street Bread — baked mornings on Maple Street</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400..700&family=Source+Serif+4:opsz,wght@8..60,400..700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="nav-mast">
    <p class="mast-line">Baked mornings on Maple Street&nbsp;·&nbsp;est. 2019</p>
    <h1 class="mast-name">Maple Street Bread</h1>
    <nav class="mast-nav" aria-label="Primary">
      <ul>
        <li><a href="#bake">Today’s bake</a></li>
        <li><a href="#visit">Visit</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
    <hr class="mast-rule" aria-hidden="true">
  </header>

  <main>
    <article class="prose">
      <p class="lede">
        Tuesday. The levain went in at midnight and the first loaves came out at
        six. What is on the counter today is listed below — when it is gone, it
        is gone until tomorrow.
      </p>

      <h2 id="bake" class="inline-head">Today’s bake</h2>
      <table class="bake">
        <thead>
          <tr><th scope="col">Loaf</th><th scope="col">Notes</th><th scope="col" class="price">Price</th></tr>
        </thead>
        <tbody>
          <tr>
            <td class="bake-name">Country loaf</td>
            <td class="bake-note">levain, two-day ferment</td>
            <td class="bake-price">$9</td>
          </tr>
          <tr>
            <td class="bake-name">Maple porridge loaf</td>
            <td class="bake-note">rolled oats, dark syrup</td>
            <td class="bake-price">$11</td>
          </tr>
          <tr>
            <td class="bake-name">Seeded rye</td>
            <td class="bake-note">caraway, cracked rye</td>
            <td class="bake-price">$10</td>
          </tr>
          <tr>
            <td class="bake-name">Cardamom knots</td>
            <td class="bake-note">mornings only, until noon</td>
            <td class="bake-price">$4</td>
          </tr>
        </tbody>
      </table>
      <p class="bake-note-foot">The list is what came out of the oven this morning.
      It is different tomorrow — the market decides, not us.</p>

      <h2 id="visit" class="inline-head">Visit</h2>
      <p>
        48 Maple Street, corner of Wren. Tuesday to Saturday, seven until two —
        earlier close on Saturdays when the last loaf goes. Cash and card. The
        good bench is out front; there is coffee next door if the line is long.
      </p>

      <h2 id="about" class="inline-head">About</h2>
      <p>
        Two bakers, one wood-fired deck oven, and a twelve-hour ferment on
        everything. We bake what the flour wants that week and sell it on the
        street it was baked on. That is the whole business plan.
      </p>
    </article>
  </main>

  <footer class="foot-letter">
    <p class="foot-letter__close">See you on the sidewalk.<br><span class="foot-letter__sign">— Maple Street Bread</span></p>
    <p class="foot-letter__ps">P.S. — special orders by Thursday for the weekend:
    <a href="mailto:hello@maplestreetbread.example">hello@maplestreetbread.example</a>.</p>
  </footer>
</body>
</html>
```

Structural notes (do not "simplify"):
- Exactly **3** nav links — 4–5 links + a button is the G42 fingerprint; no nav button at all.
- The bake list is a **real `<table>`** with `scope="col"` headers — the "see what's available" content; never cards (G3/G4/G5).
- The Ft6 close is a `<p>` set **roman** — an italic close is legal per Ft6 but pollutes the G38a vision surface.

- [ ] **Step 2: Verify EOF newline**

Run: `tail -c 8 /tmp/keystone-5b/03/keystone-work/index.html | od -c | tail -2`
Expected: last bytes are `<html>\n` (trailing newline present).

---

### Task 3: Emit `style.css` (Garden tokens + all gate-mandated rules)

**Files:**
- Create: `/tmp/keystone-5b/03/keystone-work/style.css`

**Interfaces:**
- Consumes: the DOM hooks from Task 2.
- Produces: the self-contained stylesheet the engine scores and the candidate ships. Line 1 is the Keystone stamp with `gates: pending` (filled at Task 7).

Gate-mandated rules embedded below — **do not remove or "tidy" any of these**, each one exists because a gate demanded it:
1. Stamp is line 1 (G20). `overflow-x: clip` on both `html` and `body` (G34).
2. `.mast-rule` sets **explicit `color` + `background-color`** — the UA stylesheet otherwise injects a zero-chroma gray (`oklch(60% 0 0)`) into the `hr`'s computed pair and G40 reads `Lc 46 < 60` (this exact failure occurred during the executed run).
3. **No inline comments inside rule blocks** — the CSS parser drops declarations after them (G51 trap). Comments go above the rule.
4. Every display-size rule carries `overflow-wrap: anywhere; min-width: 0` — including rules inside `@media` blocks, which the parser scores as standalone rules (G51).
5. `--color-muted` is a **deep** leaf (`oklch(45% 0.02 130)`) and `--color-link` a **deep leaf** (`oklch(38% 0.11 145)`) — the theme accent itself (`oklch(52% 0.13 145)`) is NOT body-size-text-safe on 97% paper (contrast floor); the accent appears only as hairlines, rules, link hover, head rules, and the focus ring.
6. `--font-mono` appears in exactly **two slots** (masthead line, price column) — Garden's outlier discipline (labels + one metadata strip, no more).
7. Link states: one hover property-group only (G13), transitions name their properties (G10), focus ring has no transition (G15), all four states present (G26); `.foot-letter__ps a` is `white-space: nowrap` + `display: inline-block` so the long email never wraps to two lines (G49) and never overflows 320px.
8. Every colour/font references a token (G48); all spacing values are 4pt-scale or `--space-*` tokens (G24).

- [ ] **Step 1: Write the file with exactly this content** (stamp `gates: pending` — filled at Task 7)

```css
/* Keystone · macrostructure: Long Document · theme: Garden · tone: warm-hand-set · anchor hue: 145 leaf-green · nav: N6 · footer: Ft6 · gates: pending */
:root[data-theme="garden"] {
  --color-paper:      oklch(97% 0.015 120);
  --color-paper-2:    oklch(94% 0.02 120);
  --color-ink:        oklch(22% 0.015 140);
  --color-muted:      oklch(45% 0.02 130);
  --color-rule:       oklch(85% 0.02 120);
  --color-accent:     oklch(52% 0.13 145);   /* leaf-green — punctuation, not paint */
  --color-accent-ink: oklch(98% 0.01 120);
  --color-focus:      oklch(52% 0.13 145);
  --color-link:       oklch(38% 0.11 145);   /* deep leaf — body-size link ink */
  --font-display:     "Newsreader", ui-serif, Georgia, serif;
  --font-body:        "Source Serif 4", ui-serif, Georgia, serif;
  --font-mono:        "IBM Plex Mono", monospace;
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-md:   1.25rem;
  --text-lg:   1.5625rem;
  --space-3xs: 0.125rem;
  --space-2xs: 0.25rem;
  --space-xs:  0.5rem;
  --space-sm:  0.75rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --ease-out:  cubic-bezier(0.16, 1, 0.3, 1);
  --dur-micro: 120ms;
  --page-gutter: clamp(1rem, 4vw, 1.5rem);
}

/* Global clip — horizontal scroll is a hard fail (G34) */
html { overflow-x: clip; }
body { overflow-x: clip; }

body {
  margin: 0;
  background-color: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

/* ── N6 · Newspaper masthead ─────────────────────────────── */
.nav-mast {
  display: grid;
  justify-items: center;
  gap: var(--space-2xs);
  padding: var(--space-xl) var(--page-gutter) 0;
  text-align: center;
}
.mast-line {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-variant-caps: all-small-caps;
  letter-spacing: 0.12em;
  color: var(--color-muted);
}
.mast-name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2.75rem, 6.5vw, 4.75rem);
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--color-ink);
  overflow-wrap: anywhere;
  min-width: 0;
}
.mast-nav ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-lg);
  list-style: none;
  margin: var(--space-xs) 0 0;
  padding: 0;
}
.mast-nav a {
  font-size: var(--text-sm);
  font-weight: 500;
  white-space: nowrap;
}
/* the one accent hairline — Garden's section rule, pulled across the masthead */
.mast-rule {
  border: 0;
  border-top: 1px solid var(--color-accent);
  color: var(--color-ink);
  background-color: var(--color-paper);
  width: 100%;
  margin: var(--space-md) 0 0;
}

/* ── Long Document prose column ──────────────────────────── */
.prose {
  max-width: 62ch;
  margin-inline: auto;
  padding: var(--space-2xl) var(--page-gutter) var(--space-3xl);
}
.prose > p {
  margin: 0 0 var(--space-md);
  max-width: 62ch;
}
.lede {
  font-size: var(--text-md);
  line-height: 1.6;
  max-width: 55ch;
  margin: 0 0 var(--space-xl);
}
.inline-head {
  margin: var(--space-2xl) 0 var(--space-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-lg);
  line-height: 1.25;
  letter-spacing: -0.005em;
  color: var(--color-ink);
  overflow-wrap: anywhere;
  min-width: 0;
}
/* short accent hairline under each section head — the garden's section rule */
.inline-head::after {
  content: "";
  display: block;
  width: var(--space-xl);
  border-top: 1px solid var(--color-accent);
  margin-top: var(--space-sm);
}

/* ── Today's bake — a set table, not cards ───────────────── */
.bake {
  width: 100%;
  border-collapse: collapse;
  color: var(--color-ink);
  margin: 0 0 var(--space-md);
}
.bake th {
  text-align: left;
  font-weight: 600;
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  padding: 0 var(--space-md) var(--space-2xs) 0;
  border-bottom: 1px solid var(--color-ink);
}
.bake td {
  padding: var(--space-sm) var(--space-md) var(--space-sm) 0;
  border-bottom: 1px solid var(--color-rule);
  vertical-align: top;
}
.bake-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-md);
  line-height: 1.3;
  white-space: nowrap;
  overflow-wrap: anywhere;
  min-width: 0;
}
.bake-note {
  color: var(--color-muted);
  font-size: var(--text-sm);
  min-width: 0;
}
.bake-price {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: var(--text-sm);
  text-align: right;
  white-space: nowrap;
}
.bake-note-foot {
  font-size: var(--text-sm);
  color: var(--color-muted);
  max-width: 55ch;
  margin: 0 0 var(--space-md);
}

/* ── Ft6 · Letter close (set roman — G38a keeps the surface clean) ── */
.foot-letter {
  padding: var(--space-2xl) var(--page-gutter) var(--space-3xl);
  max-width: 60ch;
  margin-inline: auto;
  background-color: var(--color-paper-2);
  border-top: 1px solid var(--color-rule);
}
.foot-letter__close {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: var(--text-lg);
  line-height: 1.4;
  color: var(--color-ink);
  overflow-wrap: anywhere;
  min-width: 0;
}
.foot-letter__sign {
  font-weight: 600;
}
.foot-letter__ps {
  margin: var(--space-md) 0 0;
  font-size: var(--text-sm);
  color: var(--color-muted);
}

/* ── Links (C3 register — deep leaf ink, accent hover) ───── */
.mast-nav a,
.foot-letter__ps a {
  color: var(--color-link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color var(--dur-micro) var(--ease-out);
}
.mast-nav a:hover,
.foot-letter__ps a:hover {
  color: var(--color-accent);
}
.mast-nav a:focus-visible,
.foot-letter__ps a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
.mast-nav a:active,
.foot-letter__ps a:active {
  color: var(--color-muted);
}
.mast-nav a:disabled,
.foot-letter__ps a:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.foot-letter__ps a {
  white-space: nowrap;
  display: inline-block;
}

/* Mobile collapse — 40rem type breakpoint */
@media (max-width: 40rem) {
  .mast-name {
    font-size: clamp(2.25rem, 10vw, 3rem);
    overflow-wrap: anywhere;
    min-width: 0;
  }
  .bake-note { display: block; padding-top: 0; }
  .foot-letter { margin-inline: var(--space-md); }
}

/* Reduced motion — links shift color only; nothing moves (G27) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 150ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 150ms !important;
  }
}
```

- [ ] **Step 2: Verify EOF newline**

Run: `tail -c 4 /tmp/keystone-5b/03/keystone-work/style.css | od -c | tail -2`
Expected: ends with `}` `\n` (trailing newline present).

---

### Task 4: Emit `tokens.css` + the pre-run `brief.md`

**Files:**
- Create: `/tmp/keystone-5b/03/keystone-work/tokens.css`
- Create: `/tmp/keystone-5b/03/keystone-work/brief.md`

**Interfaces:**
- Produces: `tokens.css` — the portable token block (skill output contract). `brief.md` — the design doc; Task 6 appends its §7 record.

- [ ] **Step 1: Extract `tokens.css` from the token block of `style.css`**

```bash
sed -n '2,32p' /tmp/keystone-5b/03/keystone-work/style.css > /tmp/keystone-5b/03/keystone-work/tokens.css
printf '\n' >> /tmp/keystone-5b/03/keystone-work/tokens.css
```

(Line 32 is the token block's closing brace — `2,32p` captures it. The executed run used `2,31p` and produced a truncated scratch `tokens.css`; do not copy that.)

- [ ] **Step 2: Verify**

Run: `head -2 /tmp/keystone-5b/03/keystone-work/tokens.css && tail -c 20 /tmp/keystone-5b/03/keystone-work/tokens.css | od -c | tail -2`
Expected: first line `:root[data-theme="garden"] {`; file ends with `}\n`.

- [ ] **Step 3: Write `brief.md` (pre-run sections — Steps 1–5, preview, honest-copy note)**

```markdown
# Brief · Maple Street Bread — landing (comparison brief 03)

User brief, verbatim: "Landing page for Maple Street Bread. Audience: locals who want to buy bread. Use: see what's available + visit. Tone: warm, hand-set, considered."

## Step 1 · Design-context gate (answered by the brief)

- **Audience** — locals who want to buy bread.
- **Use** — see what's available + visit.
- **Tone** — warm, hand-set, considered.

**Genre:** editorial (the brief's "hand-set, considered" is the genre's own register language). Theme: **Garden** — named via register fit: warm cream paper, leaf-green anchor, organic small-batch.

## Step 2 · Structure picks

- **Macrostructure: Long Document** (02) — a bakery journal: date-anchored lede, the bake list as a set table, visit and about as prose. The theme "Loves" it; the tone is the macro's voice ("the dough went in at midnight").
- **Nav: N6** Newspaper masthead — editorial native; 3 links (outside the G42 fingerprint), accent hairline pulled across the masthead (Garden's section rule as the one green punctuation line).
- **Footer: Ft6** Letter close — "See you on the sidewalk." Set **roman** deliberately: Ft6 permits an italic close, but G38a's vision surface stays cleaner upright, and the warmth carries in the words.
- **Theme: Garden** — light warm-green paper, chromatic-green anchor, Newsreader/Source Serif 4/IBM Plex Mono (3 families = ceiling; mono in exactly two slots: masthead line + price column). Signature moves shipped: serif-led hierarchy · green anchor punctuation (hairline rules, link ink, head rules — never a wash) · long-document rhythm (varied padding, hairline table rules, paper-2 colophon band).
- **Diversification:** first build in this project — no prior log; log.json seeded at Step 7.4.

## Step 4 · Enrichment

None — typography only. The set bake table IS the "see what's available" content.

## Step 5 · Preview

**Keystone · v0.1.0**

- **Macrostructure** · Long Document
- **Theme** · Garden (light · chromatic-green · roman-serif)
- **Enrichment** · none (typography only)
- **Sections** · N6 masthead · lede · today's bake (table) · visit · about · Ft6 letter close
- **Motion** · link color-shift micro only; reduced-motion block shipped
- **Slop test** · pending — engine runs at Step 7

## Honest-copy note

Maple Street Bread, est. 2019, 48 Maple Street, the bakers, and the bake list are
the shop's own consistent fiction — a fictional bakery built to a one-line comparison
brief. Prices are the shop's labelled fiction. No invented proof-metrics: no awards,
no counts, no testimonials, no "best bakery" claims.
```

---

### Task 5: Engine deterministic loop (Step 7.1)

**Files:**
- Read: `/tmp/keystone-5b/03/keystone-work/{index.html, style.css}`
- Create: `/tmp/keystone-5b/03/keystone-work/report/` (engine output)

**Interfaces:**
- Consumes: engine at repo root — run from `/Users/rector/local-dev/getpipher/keystone`.
- Produces: `report/keystone-report.json` (47 rows; 0 failed gate numbers = 48/48), `report/keystone-report.html`, `report/keystone-render/screenshot-{1280,768,414,375,320}.png` + `computed.json` + `viewports.json` + `clickable.json` + `dom.html`.

- [ ] **Step 1: Full render run**

```bash
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html /tmp/keystone-5b/03/keystone-work/index.html \
  --css /tmp/keystone-5b/03/keystone-work/style.css \
  --log /tmp/keystone-5b/03/keystone-work/.keystone/log.json \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/03/keystone-work/report
```

Expected (with the Task 2/3 files verbatim): `PASS 47/47 · FAIL 0/47` on the **first** run. (Executed history with intermediate versions: emit 1 = 46/47 — G40, the `hr` carried the UA's default zero-chroma gray into the computed pair; emit 2 = 47/47. The embedded files already contain that fix.)

- [ ] **Step 2: If any gate fails** — read the JSON evidence + fix suggestions, apply, re-run; cap 3 deterministic iterations. Fast path between full renders (token-only fixes): drop `--render` and `--viewports`, and pre-create the out dir (`mkdir -p <out>`) — the source-only run writes no render data and needs the dir to exist. Never edit the engine.

```bash
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/03/keystone-work/report/keystone-report.json","utf8")); console.log(r.results.filter(x=>!x.pass))'
```

Expected at pass: `[]`

---

### Task 6: Vision pass (Step 7.2)

**Files:**
- Read: `/tmp/keystone-5b/03/keystone-work/report/keystone-render/screenshot-1280.png` and `screenshot-375.png`
- Modify: `/tmp/keystone-5b/03/keystone-work/brief.md` (insert §7.2 after the Step 5 preview, plus the §7.1 emit history)

- [ ] **Step 1: Read both PNGs yourself** and answer the 18-question prompt from `skills/keystone/references/gates.md` § The vision pass — for BOTH viewports, one-sentence evidence per gate. If image reading is unavailable, mark the vision rows unavailable and proceed — NEVER fabricate an S1 verdict.

- [ ] **Step 2: Record the verdict table in `brief.md` as `## Step 7 · The slop test (engine-verified)` § 7.2, plus the fold-limit note.** Recorded verdicts from the executed run (re-affirm or amend from your own read — do not copy blindly):

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | masthead centred, but lede/table/visit sit left in the measure — off-axis content carries the page |
| G9 equal-whitespace | PASS (1280) | tight masthead → airy lede → ruled table → prose → paper-2 letter band: varied rhythm |
| G29 abstract background | PASS | flat warm cream; the leaf-green appears only as hairlines, link ink, and head rules |
| G42 nav fingerprint | PASS | centred masthead, 3 links, no button — not the wordmark-left + links + button cluster |
| G43 footer fingerprint | PASS | Ft6 letter close on paper-2; no link columns, no social row |
| G44 hero fit | PASS (1280) | mast-line + wordmark + nav + lede + table head all inside the 800px fold |
| G45 decorative-without-purpose | PASS | accent hairlines are the section rules; the table is the content |
| G38a italic headers | PASS (both) | everything roman — the letter close is deliberately upright |
| G30 icon tells | PASS | no icons, no emoji |
| G46 invented metrics | FLAG (accepted) | $9–$11 prices and "est. 2019" are the shop's own labelled fiction — no invented proof-claims |
| G47 re-drawn chrome | PASS | the bake table is a real table; no frames anywhere |
| G35 stroke position | PASS | 1px underlines offset 3px; head rules sit below the text block, not at any baseline |
| G36 flex align | PASS | nav row centred with baseline text; price column right-aligned, no height mismatch |
| S1 looks AI-generated? | **NO (~0.2)** | warm cream, serif masthead, set table, terse shop voice — reads hand-set; closest tell would be the table's even rhythm |
| S2 feels like this brief? | **YES** | locals, bread, visit: the page answers both uses in the shop's voice |
| S3 two pages, different sites? | **YES** | vs the Riso Tide build and the Terminal Streampipe build: cream serif journal vs two-ink zine vs dark phosphor mono — three different sites |

Fold-limit note: the captured PNGs are viewport-height (1280 shows masthead → bake table; 375 shows
the masthead) — visit, about, and the letter close are judged from the visible rhythm plus the
shipped structure, per the same honesty rule as the shipped examples.

- [ ] **Step 3: Any vision FAIL (except flag-only G46)** — apply the fix, re-render (Task 5 command), re-vision. Cap 2 vision iterations. (Executed run used 0 of 2.)

---

### Task 7: Resolution + stamp + log (Steps 7.3/7.4)

**Files:**
- Modify: `/tmp/keystone-5b/03/keystone-work/style.css:1` (fill `gates:` field)
- Modify: `/tmp/keystone-5b/03/keystone-work/brief.md` (§7.3 resolution row)
- Modify: `/tmp/keystone-5b/03/keystone-work/.keystone/log.json`

- [ ] **Step 1: Fill the stamp's gates field** (47/47 rows · 0 failed gate numbers = 48/48; G40/G41 share one row)

```
gates: pending  →  gates: 48/48 engine-verified
```

- [ ] **Step 2: Update the brief's preview row** to `- **Slop test** · 48/48 ✓ (engine-verified) — ./report/keystone-report.html` and add §7.3 (resolution: deterministic iterations used 2 of 3; vision iterations 0 of 2) + §7.4 (stamp + log), noting that a post-seed source-only re-check self-fails G8 by construction.

- [ ] **Step 3: Seed the log (newest first)**

```bash
cat > /tmp/keystone-5b/03/keystone-work/.keystone/log.json << 'EOF'
[
  {
    "date": "2026-08-29",
    "macrostructure": "Long Document",
    "theme": "Garden",
    "enrichment": "none",
    "brief": "Maple Street Bread — neighbourhood bakery; warm hand-set journal, bake table, letter close"
  }
]
EOF
```

- [ ] **Step 4: Verify the stamp edit introduced nothing (source-only run; G8 self-match is expected and acceptable)**

```bash
mkdir -p /tmp/keystone-5b/03/keystone-work/report-source
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html /tmp/keystone-5b/03/keystone-work/index.html \
  --css /tmp/keystone-5b/03/keystone-work/style.css \
  --log /tmp/keystone-5b/03/keystone-work/.keystone/log.json \
  --out /tmp/keystone-5b/03/keystone-work/report-source
```

Expected: `PASS 46/47 · FAIL 1/47` where the single fail is exactly `{"gate": 8, "evidence": "current Long Document matches a prior run"}`. Any OTHER fail = a real regression introduced by the stamp edit — fix before packaging.

---

### Task 8: Package the candidate

**Files:**
- Create: `/Users/rector/local-dev/getpipher/keystone/candidates/03-maple-bakery/keystone/index.html`
- Create: `/Users/rector/local-dev/getpipher/keystone/candidates/03-maple-bakery/keystone/style.css`

- [ ] **Step 1: Copy the final (post-engine, post-vision) files**

```bash
mkdir -p /Users/rector/local-dev/getpipher/keystone/candidates/03-maple-bakery/keystone
cp /tmp/keystone-5b/03/keystone-work/index.html \
   /tmp/keystone-5b/03/keystone-work/style.css \
   /Users/rector/local-dev/getpipher/keystone/candidates/03-maple-bakery/keystone/
```

- [ ] **Step 2: Verify packaging**

```bash
ls /Users/rector/local-dev/getpipher/keystone/candidates/03-maple-bakery/keystone/
head -1 /Users/rector/local-dev/getpipher/keystone/candidates/03-maple-bakery/keystone/style.css | grep -o "48/48 engine-verified"
tail -c 4 /Users/rector/local-dev/getpipher/keystone/candidates/03-maple-bakery/keystone/style.css | od -c | tail -1
tail -c 8 /Users/rector/local-dev/getpipher/keystone/candidates/03-maple-bakery/keystone/index.html | od -c | tail -1
```

Expected: exactly `index.html` + `style.css`; stamp contains `48/48 engine-verified`; both files end with `\n`.

- [ ] **Step 3: Commit** (exact paths — never a directory sweep; sibling `hallmark/` files in the same candidate dir are owned by their own plan)

```bash
cd /Users/rector/local-dev/getpipher/keystone
git add candidates/03-maple-bakery/keystone docs/superpowers/plans/2026-08-29-5b-brief03-keystone-candidate.md
git commit -m "candidates(03): keystone side — Garden/Long-Document blind build, 48/48 engine-verified"
```

(Executed run: committed as `af16fdd` with exactly the two candidate files — the plan doc landed in a separate dispatch; if it is already committed, the command reduces to the candidate files only.)

---

## Self-review

- **Coverage:** brainstorm deliverables — engine loop with caps (Task 5), vision pass with honesty rule (Task 6), packaging to the two exact paths (Task 8), report-back content (header + Tasks 5–8), design decisions (Global Constraints + Tasks 2–4), scratch/repo-write rules (Global Constraints + Task 1).
- **Placeholders:** none — both shipped files embedded verbatim; every command has an expected output; the brief.md pre-run content is embedded in full.
- **Consistency:** `WORK` path, repo-root run cwd, and `candidates/` paths identical across tasks; stamp sequencing (`pending` in Task 3 → `48/48 engine-verified` in Task 7) matches SKILL.md Step 7.4; the trap list mirrors the executed run's real failures (G40 hr gray; G51 comment/media-query traps carried as prohibitions).

**Execution handoff:** this plan was already executed once (2026-08-29) — the candidate at `candidates/03-maple-bakery/keystone/` is its product (commit `af16fdd`). A fresh execution (subagent-driven or inline per superpowers:executing-plans) reproduces it from a clean scratch; a reviewer can verify the shipped artifact directly via Task 5 Step 1 (expect 47/47 on first run) and Task 8 Step 2.
