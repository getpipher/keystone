# Plan 5b-01 · Tide — Keystone comparison candidate

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the Keystone-side candidate for comparison brief 01 (`candidates/01-tide-podcast/keystone/{index.html, style.css}`) — an indie-podcast landing page that passes the real engine at 48/48 gate numbers with a recorded vision pass.

**Architecture:** Single-page static site (vanilla HTML + one self-contained CSS file), built in a scratch workspace, engine-verified via `engine/check-gates.mjs --render` at 5 viewports, vision-passed by reading the rendered PNGs against the 18-question prompt, then packaged into the repo's `candidates/` tree. Design system: Riso theme (editorial · light · risograph-bold · chromatic-other) on the Long Document macrostructure (02) with an N6 newspaper-masthead nav and Ft1 mast-headed footer.

**Tech Stack:** None at runtime (vanilla HTML/CSS). Build-time: Node ≥20 (`engine/check-gates.mjs`), headless Chromium via the repo's render extension, Google Fonts (Bricolage Grotesque 600, Geist 400/500, IBM Plex Mono 400/500).

**Execution status:** Executed once end-to-end on 2026-08-29 by the brainstorm phase; the shipped candidate at `candidates/01-tide-podcast/keystone/` is the ground truth this plan reproduces. Re-execution from a clean scratch must use the embedded files verbatim — every non-obvious rule in them exists because a gate demanded it (see Task 6 trap list).

## Global Constraints

- Brief, verbatim, no reinterpretation: `build me a landing page for my indie podcast called Tide. just go ahead, you pick.`
- ALL work artifacts stay in `/tmp/keystone-5b/01/keystone-work/` (including `.keystone/log.json`). Never write the repo's `.keystone/`.
- Repo writes are limited to `candidates/01-tide-podcast/keystone/` (plus this plan doc).
- The engine is frozen — build within it, never edit `engine/`.
- Iteration caps: 3 deterministic engine iterations, 2 vision iterations. Ship with declared failures rather than imagined passes. NEVER fabricate an S1 verdict.
- Honest copy: no invented proof-metrics, no testimonials, no placeholder names (G19/G46). The show's own fiction (host name, episode titles, dates, durations) is allowed and must be labelled as fiction in `brief.md`.
- 2-space indent, EOF newline on every emitted file.
- Design decisions are locked (do not re-derive): genre **editorial**; macrostructure **Long Document (02)**; nav **N6**; footer **Ft1**; theme **Riso**; enrichment **none (typography only)**; pre-emit critique `P5 H4 E4 S4 R5 V5`.

---

### Task 1: Scaffold the scratch workspace

**Files:**
- Create: `/tmp/keystone-5b/01/keystone-work/` (dir)
- Create: `/tmp/keystone-5b/01/keystone-work/.keystone/log.json`

**Interfaces:**
- Produces: `WORK=/tmp/keystone-5b/01/keystone-work` — every later task reads/writes here. The engine's `--log` flag MUST point at `$WORK/.keystone/log.json`.

- [ ] **Step 1: Create the workspace and an empty first-run log**

```bash
mkdir -p /tmp/keystone-5b/01/keystone-work/.keystone
printf '[]\n' > /tmp/keystone-5b/01/keystone-work/.keystone/log.json
```

- [ ] **Step 2: Verify**

Run: `cat /tmp/keystone-5b/01/keystone-work/.keystone/log.json`
Expected: `[]`

(An empty log = first run in this project → G8/G32 impose no diversification constraint. The log is seeded with this build's entry only AFTER the passing render — seeding earlier makes G8 self-fail by construction.)

---

### Task 2: Emit `index.html` (Long Document + N6 masthead)

**Files:**
- Create: `/tmp/keystone-5b/01/keystone-work/index.html`

**Interfaces:**
- Consumes: `style.css` (Task 3) via `<link rel="stylesheet" href="style.css">`.
- Produces: DOM hooks the CSS selectors in Task 3 target: `.grain`, `.nav-mast > .mast-line/.mast-name/.mast-nav/.mast-rule`, `.prose > .lede/.inline-head`, `.episode > .ep-title(.ep-ord)/.ep-meta/.ep-desc/.ep-action(.link)`, `.pull > blockquote/.pull-attr`, `.foot-mast > .foot-word/.foot-tag/.foot-links/.foot-meta`.

**Copy decisions (locked):** host "Noor Haddad", Falmouth/above-a-chandlery specificity; 4 episodes (№ 11–14) with mono ordinals, durations, 2026 dates; one pulled quote from episode 14; "no sponsors, no ad reads" positioning; open-RSS listening paragraph. Curly quotes and em-dashes throughout (`’` `“”` `—`), `&nbsp;` before `·` separators and `→`.

- [ ] **Step 1: Write the file with exactly this content**

```html
<!doctype html>
<html lang="en" data-theme="riso">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <!-- Keystone · pre-emit critique: P5 H4 E4 S4 R5 V5 -->
  <meta name="description" content="Tide — an independent podcast about the sea, released every other Thursday. Written, recorded, and edited by Noor Haddad in Falmouth.">
  <title>Tide — an independent podcast about the sea</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600&family=Geist:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="grain" aria-hidden="true"></div>

  <header class="nav-mast">
    <p class="mast-line">An independent podcast about the sea&nbsp;·&nbsp;fortnightly</p>
    <h1 class="mast-name">Tide</h1>
    <nav class="mast-nav" aria-label="Primary">
      <ul>
        <li><a href="#episodes">Episodes</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#listen">Listen</a></li>
      </ul>
    </nav>
    <hr class="mast-rule" aria-hidden="true">
  </header>

  <main>
    <article class="prose">
      <p class="lede">
        Tide is a half-hour walk along some edge of the sea, released every other
        Thursday since March 2025. Noor Haddad writes it, records it on a
        hand-me-down recorder, and edits it late at night in a rented room above a
        chandlery in Falmouth.
      </p>

      <h2 id="episodes" class="inline-head">Episodes</h2>

      <section class="episodes">
        <article class="episode">
          <h3 class="ep-title"><span class="ep-ord">№&nbsp;14</span> The lighthouse keeper’s ledger</h3>
          <p class="ep-meta">28 min&nbsp;·&nbsp;12 June 2026</p>
          <p class="ep-desc">What a century of lighthouse logbooks says about weather,
          routine, and the people who chose the rock.</p>
          <p class="ep-action"><a class="link" href="#">Listen to episode fourteen&nbsp;→</a></p>
        </article>

        <article class="episode">
          <h3 class="ep-title"><span class="ep-ord">№&nbsp;13</span> Salt in the cables</h3>
          <p class="ep-meta">31 min&nbsp;·&nbsp;29 May 2026</p>
          <p class="ep-desc">Ninety-nine percent of the internet travels under the sea.
          This is the story of the first time it was cut.</p>
          <p class="ep-action"><a class="link" href="#">Listen to episode thirteen&nbsp;→</a></p>
        </article>

        <article class="episode">
          <h3 class="ep-title"><span class="ep-ord">№&nbsp;12</span> What the tide table knows</h3>
          <p class="ep-meta">24 min&nbsp;·&nbsp;15 May 2026</p>
          <p class="ep-desc">Predicting the tide is the oldest data job in the world.
          The chart is never finished.</p>
          <p class="ep-action"><a class="link" href="#">Listen to episode twelve&nbsp;→</a></p>
        </article>

        <article class="episode">
          <h3 class="ep-title"><span class="ep-ord">№&nbsp;11</span> A field guide to fog</h3>
          <p class="ep-meta">33 min&nbsp;·&nbsp;1 May 2026</p>
          <p class="ep-desc">Fog has names — sea smoke, haar, fog devil. A walk through
          the ones you can hear.</p>
          <p class="ep-action"><a class="link" href="#">Listen to episode eleven&nbsp;→</a></p>
        </article>
      </section>

      <figure class="pull">
        <blockquote>
          <p>“She kept the ledger the way sailors keep knots — because forgetting
          is how you lose the coast.”</p>
        </blockquote>
        <figcaption class="pull-attr">From episode fourteen&nbsp;·&nbsp;The lighthouse keeper’s ledger</figcaption>
      </figure>

      <h2 id="about" class="inline-head">About the show</h2>
      <p>
        Every episode starts from a real place — a harbour, an archive, a beached
        wreck — and follows it until it turns into a story. Fifteen minutes of
        walking, fifteen of talking. The wind is left in on purpose; it is the
        cheapest sound effect there is, and the truest.
      </p>
      <p>
        There are no sponsors and no ad reads. The show is kept afloat by the
        people who listen to it, which is both a budget and a promise.
      </p>

      <h2 id="listen" class="inline-head">Where to listen</h2>
      <p>
        Every app that carries podcasts carries Tide. The feed is open — no
        exclusives, no paywall. Start with
        <a class="link" href="#">Apple Podcasts&nbsp;→</a>,
        <a class="link" href="#">Spotify&nbsp;→</a>, or
        <a class="link" href="#">the RSS feed&nbsp;→</a> if that is still how
        you do things. It is still how the show does things.
      </p>
    </article>
  </main>

  <footer class="foot-mast">
    <p class="foot-word">Tide</p>
    <p class="foot-tag">Written, recorded, and edited by one person.</p>
    <p class="foot-links"><a href="#">Contact</a>&nbsp;·&nbsp;<a href="#">RSS</a>&nbsp;·&nbsp;<a href="#">Imprint</a></p>
    <p class="foot-meta">© 2026 Tide&nbsp;·&nbsp;new episodes every other Thursday</p>
  </footer>
</body>
</html>
```

Structural notes (why it looks this way — do not "simplify"):
- The episode ordinal lives **inside** the `h3` as a `<span>` — a sibling label element beside a heading in anything other than a `1fr` grid is the G54 fingerprint.
- Exactly **3** nav links — 4–5 links + a button is the G42 fingerprint; there is no nav button at all.
- The `hr` carries `aria-hidden="true"` (decorative) and gets an explicit CSS `color` in Task 3 (G40).

- [ ] **Step 2: Verify EOF newline and structure**

Run: `tail -c 8 /tmp/keystone-5b/01/keystone-work/index.html | od -c | tail -2`
Expected: last bytes are `<html>\n` (trailing newline present).

---

### Task 3: Emit `style.css` (Riso tokens + all gate-mandated rules)

**Files:**
- Create: `/tmp/keystone-5b/01/keystone-work/style.css`

**Interfaces:**
- Consumes: the DOM hooks from Task 2.
- Produces: the self-contained stylesheet the engine scores and the candidate ships. Line 1 is the Keystone stamp with `gates: pending` (filled at Task 7).

Gate-mandated rules embedded below — **do not remove or "tidy" any of these**, each one closed a real engine failure:
1. Stamp is line 1 (G20). `overflow-x: clip` on both `html` and `body` (G34).
2. `.mast-rule` sets **explicit `color` + `background-color`** — the UA stylesheet otherwise injects a zero-chroma gray (`oklch(60% 0 0)`) that the computed-pair dump reads as a G40 contrast failure.
3. **No inline comments inside rule blocks** — the CSS parser drops declarations after them (G51 trap). Comments go above the rule.
4. Every display-size rule carries `overflow-wrap: anywhere; min-width: 0` — **including rules inside `@media` blocks**, which the parser scores as standalone rules (G51).
5. `.grain` is `position: fixed`, `opacity: 0.03`, static, with `aria-hidden="true"` in the markup (G29/G33/G45; Riso signature).
6. Link states: one hover property-group only (G13), transitions name their properties (G10), focus ring has no transition (G15), all four states present for `a` (G26).
7. Every color/font references a token (G48); all spacing values are on the 4pt scale or `--space-*` tokens (G24); links are `white-space: nowrap` (G49).

- [ ] **Step 1: Write the file with exactly this content**

```css
/* Keystone · macrostructure: Long Document · theme: Riso · tone: editorial-tactile · anchor hue: 195/350 two-ink · nav: N6 · footer: Ft1 · gates: pending */
:root[data-theme="riso"] {
  --color-paper:      oklch(95% 0.02 15);
  --color-paper-2:    oklch(91% 0.025 15);
  --color-ink:        oklch(25% 0.03 30);
  --color-muted:      oklch(42% 0.03 30);
  --color-rule:       oklch(80% 0.03 25);
  --color-accent:     oklch(68% 0.22 195);   /* cyan ink */
  --color-accent-2:   oklch(65% 0.20 350);   /* magenta ink */
  --color-accent-ink: oklch(25% 0.03 30);
  --color-link:       oklch(42% 0.11 220);   /* deep sea-cyan — body-size link ink */
  --color-focus:      oklch(68% 0.22 195);
  --font-display:     "Bricolage Grotesque", sans-serif;
  --font-body:        "Geist", sans-serif;
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
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:     cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;
  --z-grain: 500;
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

/* Riso grain — static, motivated (the print metaphor), invisible to AT */
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
  z-index: var(--z-grain);
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
/* off-register two-ink pass — a shadow offset, never a gradient (G2) */
.mast-name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(3.5rem, 8vw, 6rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--color-ink);
  text-shadow: 2px 0 var(--color-accent), -2px 0 var(--color-accent-2);
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
/* two-ink double rule — the plates sit a hair apart, on purpose.
   `color` is set explicitly so the UA's default gray never reaches the dump (G40) */
.mast-rule {
  border: 0;
  border-top: 2px solid var(--color-accent);
  border-bottom: 2px solid var(--color-accent-2);
  color: var(--color-ink);
  background-color: var(--color-paper);
  height: 6px;
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
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-md);
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: var(--space-2xl) 0 var(--space-lg);
  overflow-wrap: anywhere;
  min-width: 0;
}

/* Episodes — list rows separated by hairlines, no cards */
.episodes { display: grid; }
.episode {
  padding-block: var(--space-lg);
  border-top: 1px solid var(--color-rule);
}
.episodes .episode:first-child { border-top: 0; padding-block-start: 0; }
.ep-title {
  margin: 0 0 var(--space-2xs);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-md);
  line-height: 1.25;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
  min-width: 0;
}
.ep-ord {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: var(--text-sm);
  letter-spacing: 0.06em;
  color: var(--color-muted);
  margin-inline-end: var(--space-sm);
}
.ep-meta {
  margin: 0 0 var(--space-xs);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}
.ep-desc {
  margin: 0 0 var(--space-sm);
  max-width: 55ch;
}

/* Pulled line — one grid-break, hanging into the margin */
.pull {
  margin: var(--space-2xl) 0 0 calc(-1 * var(--space-lg));
  padding-inline-start: var(--space-lg);
  border-inline-start: 3px solid var(--color-accent);
}
.pull blockquote {
  margin: 0;
}
.pull blockquote p {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-lg);
  line-height: 1.3;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
  min-width: 0;
}
.pull-attr {
  margin: var(--space-sm) 0 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-muted);
}

/* ── C3 · Typographic link ───────────────────────────────── */
.link,
.mast-nav a,
.foot-links a {
  color: var(--color-link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color var(--dur-micro) var(--ease-out);
}
.link:hover,
.mast-nav a:hover,
.foot-links a:hover {
  color: var(--color-accent-ink);
  text-decoration-color: var(--color-accent);
}
.link:focus-visible,
.mast-nav a:focus-visible,
.foot-links a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
.link:active,
.mast-nav a:active,
.foot-links a:active {
  color: var(--color-muted);
}
.link:disabled,
.mast-nav a:disabled,
.foot-links a:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── Ft1 · Mast-headed footer ────────────────────────────── */
.foot-mast {
  display: grid;
  justify-items: center;
  gap: var(--space-2xs);
  padding: var(--space-2xl) var(--page-gutter);
  background-color: var(--color-paper-2);
  border-top: 1px solid var(--color-rule);
  text-align: center;
}
.foot-word {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-md);
  letter-spacing: -0.01em;
  line-height: 1.2;
  overflow-wrap: anywhere;
  min-width: 0;
}
.foot-tag {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-muted);
}
.foot-links {
  margin: var(--space-xs) 0 0;
  font-size: var(--text-sm);
}
.foot-meta {
  margin: var(--space-sm) 0 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.04em;
  color: var(--color-muted);
}

/* Mobile collapse — 40rem type breakpoint */
@media (max-width: 40rem) {
  .mast-name {
    font-size: clamp(3rem, 16vw, 4rem);
    overflow-wrap: anywhere;
    min-width: 0;
  }
  .lede { font-size: var(--text-base); }
  .pull { margin-inline: 0; }
}

/* Reduced motion — belt and suspenders: nothing here moves anyway */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 150ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 150ms !important;
  }
}
```

- [ ] **Step 2: Verify EOF newline**

Run: `tail -c 4 /tmp/keystone-5b/01/keystone-work/style.css | od -c | tail -2`
Expected: ends with `}` `\n` (trailing newline present).

---

### Task 4: Emit `tokens.css` + the pre-run `brief.md`

**Files:**
- Create: `/tmp/keystone-5b/01/keystone-work/tokens.css`
- Create: `/tmp/keystone-5b/01/keystone-work/brief.md`

**Interfaces:**
- Produces: `tokens.css` — the portable token block (skill output contract). `brief.md` — the design doc; Task 7 appends its §7 engine/vision record.

- [ ] **Step 1: Extract `tokens.css` from the token block of `style.css`**

```bash
sed -n '2,32p' /tmp/keystone-5b/01/keystone-work/style.css > /tmp/keystone-5b/01/keystone-work/tokens.css
printf '\n' >> /tmp/keystone-5b/01/keystone-work/tokens.css
```

- [ ] **Step 2: Verify**

Run: `head -2 /tmp/keystone-5b/01/keystone-work/tokens.css && tail -c 20 /tmp/keystone-5b/01/keystone-work/tokens.css | od -c | tail -2`
Expected: first line `:root[data-theme="riso"] {`; file ends with `}\n`.

- [ ] **Step 3: Write `brief.md` (pre-run sections — Steps 1–5, preview, honest-copy note)**

```markdown
# Brief · Tide — indie podcast landing

User brief, verbatim: "build me a landing page for my indie podcast called Tide. just go ahead, you pick."

## Step 1 · Design-context gate (waved through — stated inferences)

- **Audience** — casual podcast listeners who discover shows by word of mouth; they know their podcast app, not the jargon.
- **Use** — one action: listen/subscribe to the show in the player of their choice.
- **Tone** — editorial, tactile, handmade. "Indie" reads as self-published: personal voice, no marketing scaffolding, wind left in the recording.

**Genre:** editorial (silent default — no soft/friendly or enterprise signal in the brief; content-led brief) → `references/genres/editorial.md`.

## Step 2 · Structure picks

- **Macrostructure: Long Document** (02) — a podcast sells its voice; the page reads like a letter from the host with the episode list as its spine. Quote-Led was considered and rejected: the macro itself warns against it for new products without real testimonials (G19/G46).
- **Nav: N6** Newspaper masthead — the print-feel masthead is native to Riso; 3 inline links (outside the G42 4–5-link + button fingerprint).
- **Footer: Ft1** Mast-headed — editorial default; Riso explicitly rejects Ft7 (too SaaS), and the quiet colophon matches Long Document's "the page is just there."
- **Theme: Riso** (editorial · light · risograph-bold · chromatic-other) — two-ink off-register print feel; "indie" self-published energy.
- **Diversification:** first build in this project — no prior log; log.json seeded at Step 7.4.

## Step 4 · Enrichment

None — typography only. The two-ink misregistration on the wordmark, the two-ink double rule, and the static grain ARE the visual content. Riso signature moves shipped: (1) off-register cyan+magenta text-shadow on the wordmark, (2) Bricolage Grotesque 600 chunky display, (3) static SVG grain overlay at 3%.

## Step 5 · Preview

**Keystone · v0.1.0**

- **Macrostructure** · Long Document
- **Theme** · Riso (light · chromatic-other · risograph-bold)
- **Enrichment** · none (typography only)
- **Sections** · N6 masthead · lede · episodes · pulled-quote · about · where-to-listen · Ft1 footer
- **Motion** · none in fold — link color-shift micro only; reduced-motion block shipped
- **Slop test** · pending — engine runs at Step 7

## Honest-copy note

Tide, Noor Haddad, Falmouth, the episode titles/dates/durations, and the pulled quote are the show's own consistent fiction — a fictional indie podcast built to a one-line brief. No invented proof-metrics anywhere: no download counts, no rankings, no "trusted by", no testimonials. (G46 expected: FLAG accepted.)
```

---

### Task 5: Engine deterministic loop (Step 7.1)

**Files:**
- Read: `/tmp/keystone-5b/01/keystone-work/{index.html, style.css}`
- Create: `/tmp/keystone-5b/01/keystone-work/report/` (engine output)

**Interfaces:**
- Consumes: engine at repo root — run from `/Users/rector/local-dev/getpipher/keystone`.
- Produces: `report/keystone-report.json` (47 rows; 0 failed gate numbers = 48/48), `report/keystone-report.html`, `report/keystone-render/screenshot-{1280,768,414,375,320}.png` + `computed.json` + `viewports.json` + `clickable.json` + `dom.html`.

- [ ] **Step 1: Full render run**

```bash
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html /tmp/keystone-5b/01/keystone-work/index.html \
  --css /tmp/keystone-5b/01/keystone-work/style.css \
  --log /tmp/keystone-5b/01/keystone-work/.keystone/log.json \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/01/keystone-work/report
```

Expected (with the Task 2/3 files verbatim): `PASS 47/47 · FAIL 0/47` on the **first** run. (Executed history with intermediate versions: emit 1 = 45/47 with G40 `hr` UA-gray + G51 comment-trap; emit 2 = 46/47 with G51 media-query rule; emit 3 = 47/47. The embedded files already contain those three fixes.)

- [ ] **Step 2: If any gate fails** — read the JSON evidence + fix suggestions, apply, re-run; cap 3 deterministic iterations. Fast path between full renders (token-only fixes): drop `--render` and `--viewports`, and pre-create the out dir (`mkdir -p <out>`) — the source-only run writes no render data and needs the dir to exist. Never edit the engine.

```bash
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/01/keystone-work/report/keystone-report.json","utf8")); console.log(r.results.filter(x=>!x.pass))'
```

Expected at pass: `[]`

---

### Task 6: Vision pass (Step 7.2)

**Files:**
- Read: `/tmp/keystone-5b/01/keystone-work/report/keystone-render/screenshot-1280.png` and `screenshot-375.png`
- Modify: `/tmp/keystone-5b/01/keystone-work/brief.md` (append §7.2)

- [ ] **Step 1: Read both PNGs yourself** and answer the 18-question prompt from `skills/keystone/references/gates.md` § The vision pass — for BOTH viewports, one-sentence evidence per gate. If image reading is unavailable, mark the vision rows unavailable and proceed — NEVER fabricate an S1 verdict.

- [ ] **Step 2: Record the verdict table as `## Step 7 · The slop test (engine-verified)` § 7.2 in `brief.md`.** Recorded verdicts from the executed run (re-affirm or amend from your own read — do not copy blindly):

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | masthead is centred but lede/links/episodes sit left in the measure — not one centred axis |
| G9 equal-whitespace | PASS (1280) | tight masthead → airy lede → hairline-separated episode rows → quote → paper-2 footer band: four distinct rhythms |
| G29 abstract background | PASS | flat warm paper + static 3% grain (the documented Riso ornament); two inks only as shadow/rule/links |
| G42 nav fingerprint | PASS | centred masthead, 3 links, no button, no hairline-bottom bar |
| G43 footer fingerprint | PASS | Ft1 single mast-headed band on paper-2; no link columns, no social row |
| G44 hero fit | PASS (1280) | mast-line + wordmark + nav + lede + first listen link inside the 800px fold |
| G45 decorative-without-purpose | PASS | grain = the print metaphor; two-ink rule and off-register wordmark are the theme's signature |
| G38a italic headers | PASS (both) | all display roman |
| G30 icon tells | PASS | zero icons, zero emoji |
| G46 invented metrics | FLAG (accepted) | "ninety-nine percent of the internet travels under the sea" is a real, widely-cited factoid used as an episode description — not a product proof-claim |
| G47 re-drawn chrome | PASS | no frames anywhere |
| G35 stroke position | PASS | 1px link underlines offset 3px; no highlighter bands |
| G36 flex align | PASS | nav row `align-items: center` |
| S1 looks AI-generated? | **NO (~0.15)** | off-register wordmark, warm toothy paper, mono edition marks read pulled, not generated |
| S2 feels like this brief? | **YES** | indie sea-podcast register: Falmouth, the chandlery, nautical episode titles |
| S3 two pages, different sites? | **YES** | differs from the Riso catalogue build on macro (Long Document vs Catalogue), nav (N6 vs ink slab), footer (Ft1 vs index rows) |

Note the fold limit honestly: the captured PNGs are viewport-height; later sections (quote/about/footer) are judged from visible rhythm plus the shipped structure.

- [ ] **Step 3: Any vision FAIL (except flag-only G46)** — apply the fix, re-render (Task 5 command), re-vision. Cap 2 vision iterations.

---

### Task 7: Resolution + stamp + log (Steps 7.3/7.4)

**Files:**
- Modify: `/tmp/keystone-5b/01/keystone-work/style.css:1` (fill `gates:` field)
- Modify: `/tmp/keystone-5b/01/keystone-work/brief.md` (§7.3 resolution row)
- Modify: `/tmp/keystone-5b/01/keystone-work/.keystone/log.json`

- [ ] **Step 1: Fill the stamp's gates field** (47/47 rows · 0 failed gate numbers = 48/48; G40/G41 share one row)

```
gates: pending  →  gates: 48/48 engine-verified
```

- [ ] **Step 2: Update the brief's preview row** to `- **Slop test** · 48/48 ✓ (engine-verified) — ./report/keystone-report.html` and add §7.3 (resolution) + §7.4 (stamp + log), noting that a post-seed source-only re-check self-fails G8 by construction (log now contains this build).

- [ ] **Step 3: Seed the log (newest first)**

```bash
cat > /tmp/keystone-5b/01/keystone-work/.keystone/log.json << 'EOF'
[
  {
    "date": "2026-08-29",
    "macrostructure": "Long Document",
    "theme": "Riso",
    "enrichment": "none",
    "brief": "Tide — indie podcast about the sea; two-ink off-register print feel; host-letter register"
  }
]
EOF
```

- [ ] **Step 4: Verify the stamp edit introduced nothing (source-only run; G8 self-match is expected and acceptable)**

```bash
mkdir -p /tmp/keystone-5b/01/keystone-work/report-source
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html /tmp/keystone-5b/01/keystone-work/index.html \
  --css /tmp/keystone-5b/01/keystone-work/style.css \
  --log /tmp/keystone-5b/01/keystone-work/.keystone/log.json \
  --out /tmp/keystone-5b/01/keystone-work/report-source
```

Expected: `PASS 46/47 · FAIL 1/47` where the single fail is exactly `{"gate": 8, "evidence": "current Long Document matches a prior run"}`. Any OTHER fail = a real regression introduced by the stamp edit — fix before packaging.

---

### Task 8: Package the candidate

**Files:**
- Create: `/Users/rector/local-dev/getpipher/keystone/candidates/01-tide-podcast/keystone/index.html`
- Create: `/Users/rector/local-dev/getpipher/keystone/candidates/01-tide-podcast/keystone/style.css`

- [ ] **Step 1: Copy the final (post-engine, post-vision) files**

```bash
mkdir -p /Users/rector/local-dev/getpipher/keystone/candidates/01-tide-podcast/keystone
cp /tmp/keystone-5b/01/keystone-work/index.html \
   /tmp/keystone-5b/01/keystone-work/style.css \
   /Users/rector/local-dev/getpipher/keystone/candidates/01-tide-podcast/keystone/
```

- [ ] **Step 2: Verify packaging**

```bash
ls /Users/rector/local-dev/getpipher/keystone/candidates/01-tide-podcast/keystone/
head -1 /Users/rector/local-dev/getpipher/keystone/candidates/01-tide-podcast/keystone/style.css | grep -o "48/48 engine-verified"
tail -c 4 /Users/rector/local-dev/getpipher/keystone/candidates/01-tide-podcast/keystone/style.css | od -c | tail -1
tail -c 8 /Users/rector/local-dev/getpipher/keystone/candidates/01-tide-podcast/keystone/index.html | od -c | tail -1
```

Expected: exactly `index.html` + `style.css`; stamp contains `48/48 engine-verified`; both files end with `\n`.

- [ ] **Step 3: Commit** (the comparison gallery commits everything later; this commit only lands the candidate + plan)

```bash
cd /Users/rector/local-dev/getpipher/keystone
git add candidates/01-tide-podcast docs/superpowers/plans/2026-08-29-keystone-5b-tide-candidate.md
git commit -m "feat(5b): 01-tide-podcast keystone candidate — 48/48 engine-verified"
```

---

## Self-review

- **Coverage:** brainstorm deliverable ①(engine loop, cap 3) → Task 5; ②(vision pass, honesty rule) → Task 6; ③(packaging paths) → Task 8; ④(report-back content: theme/macro/score/verdicts/paths) → Tasks 5–8 + this header; design decisions → Global Constraints + Tasks 2–4. Scratch-dir + repo-write rules → Global Constraints + Task 1.
- **Placeholders:** none — both shipped files embedded verbatim; every command has an expected output.
- **Consistency:** `WORK` / repo-root run directory / `candidates/` paths used identically across tasks; the stamp's `gates:` states `pending` in Task 3 and `48/48 engine-verified` in Task 7 (intentional sequencing, matches SKILL.md Step 7.4).

**Execution handoff:** this plan was already executed once (2026-08-29) by the brainstorm phase — the candidate at `candidates/01-tide-podcast/keystone/` is its product. A fresh execution (subagent-driven or inline per superpowers:executing-plans) reproduces it from a clean scratch; a reviewer can verify the shipped artifact directly via Task 5 Step 1 (expect 47/47 on first run) and Task 8 Step 2.
