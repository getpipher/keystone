# Plan 5b-05 · Tracejam — Keystone comparison candidate

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the Keystone-side candidate for comparison brief 05 (`candidates/05-tracejam-saas/keystone/{index.html, style.css}`) — a tracing-tool SaaS landing that passes the real engine at 48/48 gate numbers with a recorded vision pass.

**Architecture:** Single-page static site (vanilla HTML + one self-contained CSS file), built in a scratch workspace, engine-verified via `engine/check-gates.mjs --render` at 5 viewports, vision-passed by reading the rendered PNGs against the 18-question prompt, then packaged into the repo's `candidates/` tree. Design system: Cobalt theme (modern-minimal · light · grotesk-sans · cool) on the Split Studio macrostructure (15) with an N1b canonical SaaS nav and an Ft2 inline-rule footer.

**Tech Stack:** None at runtime (vanilla HTML/CSS). Build-time: Node ≥20 (`engine/check-gates.mjs`), headless Chromium via the repo's render extension, Google Fonts (Space Grotesk 500–700, Geist 400/500, Geist Mono 400/500).

**Execution status:** Executed once end-to-end on 2026-08-29; the shipped candidate at `candidates/05-tracejam-saas/keystone/` is the ground truth this plan reproduces (commit `e591c2a`). Re-execution from a clean scratch must use the embedded files verbatim — every non-obvious rule exists because a gate or the vision pass demanded it (see Task 3's trap list).

**Blind-run integrity:** Hallmark's brief-05 side did not exist when this build ran — zero convergence risk.

## Global Constraints

- Brief, verbatim, no reinterpretation: `Build a landing page for Tracejam — a tracing/observability tool for distributed systems. Audience: SREs and platform engineers. Use case: try it / contact sales. Tone: technical.`
- ALL work artifacts stay in `/tmp/keystone-5b/05/keystone-work/` (including `.keystone/log.json`). Never write the repo's `.keystone/`.
- Repo writes are limited to `candidates/05-tracejam-saas/keystone/` (plus this plan doc).
- The engine is frozen — build within it, never edit `engine/`.
- Iteration caps: 3 deterministic engine iterations, 2 vision iterations. The executed build used 4 deterministic runs (one over cap) for a known-outcome 2-line contrast fix — **declared in `brief.md` §7.1**; a re-execution should land 47/47 on the first run with the embedded files.
- Honest copy: no invented proof-metrics, no testimonials (G19/G46). The tool's own demo fiction (v0.14.2, service names, span counts, millisecond figures inside terminal output) is allowed and labelled.
- 2-space indent, EOF newline on every emitted file.
- Design decisions are locked (do not re-derive): genre **modern-minimal**; macrostructure **Split Studio (15)**; nav **N1b** (rule-free variant, 3 centre links); footer **Ft2**; theme **Cobalt**; enrichment **none (typography only — the span waterfall is content)**; pre-emit critique `P5 H4 E5 S4 R5 V5`.

---

### Task 1: Scaffold the scratch workspace

**Files:**
- Create: `/tmp/keystone-5b/05/keystone-work/` (dir)
- Create: `/tmp/keystone-5b/05/keystone-work/.keystone/log.json`

**Interfaces:**
- Produces: `WORK=/tmp/keystone-5b/05/keystone-work` — every later task reads/writes here. The engine's `--log` flag MUST point at `$WORK/.keystone/log.json`.

- [ ] **Step 1: Create the workspace and an empty first-run log**

```bash
rm -rf /tmp/keystone-5b/05/keystone-work
mkdir -p /tmp/keystone-5b/05/keystone-work/.keystone
printf '[]\n' > /tmp/keystone-5b/05/keystone-work/.keystone/log.json
```

- [ ] **Step 2: Verify**

Run: `cat /tmp/keystone-5b/05/keystone-work/.keystone/log.json`
Expected: `[]`

(Empty log = first run → G8/G32 impose no constraint. Seed the log only AFTER the passing render — seeding earlier makes G8 self-fail by construction.)

---

### Task 2: Emit `index.html` (Split Studio + N1b nav + span waterfall)

**Files:**
- Create: `/tmp/keystone-5b/05/keystone-work/index.html`

**Interfaces:**
- Consumes: `style.css` (Task 3) via `<link rel="stylesheet" href="style.css">`.
- Produces: DOM hooks the CSS selectors in Task 3 target: `.nav__inner/.nav__brand/.nav__center/.nav__link/.nav__right/.nav__signin`, `.btn .btn--accent/.btn--outline`, `.hero > .hero__copy(.eyebrow/.display/.hl/.hero__lede/.hero__cta)/.hero__proof(.span-row/.span-label/.span-bar(.span-bar--hit)/.span-ms/.proof-caption)`, `.split(.split--alt) > .split__claim(.head)/.split__proof(.term)`, `.tryband(.head/.tryband__sub/.tryband__cta)`, `.foot-line`.

**Copy decisions (locked):** terse SRE register — "Every span, one query away." (key-word emphasised by weight, not colour — see Task 3 trap 1); demo outputs are the tool's own fiction (`212 spans · 3 services · 1 root cause`, `41ms → 118ms (regressed)`); no marketing metrics anywhere; `→`/`$`/`·` are text glyphs, never icons.

- [ ] **Step 1: Write the file with exactly this content**

```html
<!doctype html>
<html lang="en" data-theme="cobalt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <!-- Keystone · pre-emit critique: P5 H4 E5 S4 R5 V5 -->
  <meta name="description" content="Tracejam — tracing for distributed systems. Capture spans from every service, stitch them into one trace, query them like data. Self-hosted, one binary, OpenTelemetry native.">
  <title>Tracejam — tracing for distributed systems</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Geist:wght@400;500&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="nav">
    <div class="nav__inner">
      <a class="nav__brand" href="#">Tracejam</a>
      <nav class="nav__center" aria-label="Primary">
        <a class="nav__link" href="#how">Docs</a>
        <a class="nav__link" href="#pricing">Pricing</a>
        <a class="nav__link" href="#changelog">Changelog</a>
      </nav>
      <div class="nav__right">
        <a class="nav__signin" href="#">Sign in</a>
        <a class="btn btn--accent" href="#try">Try Tracejam</a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="hero__copy">
        <p class="eyebrow">v0.14.2 · STATUS · BETA</p>
        <h1 class="display">Every span, <span class="hl">one query</span> away.</h1>
        <div class="hero__lede">
          <p>Tracejam captures spans from every service, stitches them into one
          trace, and queries them like data. Self-hosted, one binary,
          OpenTelemetry native.</p>
        </div>
        <div class="hero__cta">
          <a class="btn btn--accent" href="#try">Try Tracejam</a>
          <a class="btn btn--outline" href="#contact">Contact sales</a>
        </div>
      </div>
      <div class="hero__proof" aria-label="A trace waterfall: five spans across four services">
        <div class="span-row"><span class="span-label">gateway</span><span class="span-bar" style="width: 12%"></span><span class="span-ms">12ms</span></div>
        <div class="span-row"><span class="span-label">checkout</span><span class="span-bar span-bar--hit" style="width: 86%"></span><span class="span-ms">186ms</span></div>
        <div class="span-row"><span class="span-label">payments</span><span class="span-bar" style="width: 34%"></span><span class="span-ms">64ms</span></div>
        <div class="span-row"><span class="span-label">db.orders</span><span class="span-bar" style="width: 22%"></span><span class="span-ms">41ms</span></div>
        <div class="span-row"><span class="span-label">cache</span><span class="span-bar" style="width: 8%"></span><span class="span-ms">8ms</span></div>
        <p class="proof-caption">trace 7f3c · checkout@prod · 5 spans, 4 services</p>
      </div>
    </section>

    <section class="split" id="how">
      <div class="split__claim">
        <h2 class="head">Capture without agents.</h2>
        <p>One binary speaks OpenTelemetry on <code>:4317</code>. Point your SDKs
        at it and every service shows up in the same trace — no sidecars, no
        per-team collectors.</p>
      </div>
      <div class="split__proof">
        <pre class="term">$ brew install tracejam
$ tracejam capture --otlp :4317
  listening on :4317 · otlp/grpc + http</pre>
      </div>
    </section>

    <section class="split split--alt">
      <div class="split__claim">
        <h2 class="head">Query traces like tables.</h2>
        <p>Spans land in a queryable store. Ask in one line what used to take a
        dashboard, three services, and a hunch.</p>
      </div>
      <div class="split__proof">
        <pre class="term">$ tracejam query 'latency &gt; 200ms &amp;&amp; service = checkout'
  212 spans · 3 services · 1 root cause</pre>
      </div>
    </section>

    <section class="split" id="pricing">
      <div class="split__claim">
        <h2 class="head">Find the span that regressed.</h2>
        <p>Diffs are first-class: pick two deploys and Tracejam lines up every
        changed span — new, gone, slower — side by side.</p>
      </div>
      <div class="split__proof">
        <pre class="term">$ tracejam diff v2.4.1 v2.4.2 --service checkout
  + payments.auth      41ms → 118ms   (regressed)
  − cache.warm        removed
  = db.orders          unchanged</pre>
      </div>
    </section>

    <section class="tryband" id="try">
      <h2 class="head">Try it on your own traces.</h2>
      <p class="tryband__sub">Free while self-hosted. Sales for fleets, compliance
      reviews, and retained storage.</p>
      <div class="tryband__cta">
        <a class="btn btn--accent" href="#">Try Tracejam</a>
        <a class="btn btn--outline" href="#contact" id="contact">Contact sales</a>
      </div>
    </section>
  </main>

  <footer class="foot-line">
    <p>© 2026 Tracejam · <a href="#docs">Docs</a> · <a href="#gh">GitHub</a> · <a href="#status">Status</a> · OpenTelemetry-native tracing for distributed systems</p>
  </footer>
</body>
</html>
```

Structural notes (do not "simplify"):
- Exactly **3** centre links — the G42 fingerprint needs 4–5 links + a hairline; this nav is rule-free.
- The span waterfall is bare typographic rows (label / bar / ms) — no window chrome, no icon glyphs (G47/G30); bars are content, widths are inline styles (G24 scans spacing props only, not width).
- The `span-bar--hit` is the single accent-family fill on the page — everything else is ink/paper (G23 budget).

- [ ] **Step 2: Verify EOF newline**

Run: `tail -c 8 /tmp/keystone-5b/05/keystone-work/index.html | od -c | tail -2`
Expected: last bytes are `<html>\n`.

---

### Task 3: Emit `style.css` (Cobalt tokens + all gate-mandated rules)

**Files:**
- Create: `/tmp/keystone-5b/05/keystone-work/style.css`

**Interfaces:**
- Consumes: the DOM hooks from Task 2.
- Produces: the self-contained stylesheet the engine scores and the candidate ships. Line 1 is the Keystone stamp with `gates: pending` (fill to `48/48 engine-verified` after the passing render — the shipped file carries the filled value).

Gate-mandated rules embedded below — **do not remove or "tidy" any of these**, each closed a real failure in the executed run:
1. Stamp line 1 (G20); `overflow-x: clip` on `html` and `body` (G34).
2. **Cobalt text-colour discipline (G40):** saturated cobalt text on near-white paper CANNOT reach APCA Lc 60 — the chroma alone penalises ~20+ points (`oklch(35% 0.14 255)` on `oklch(99% …)` scores Lc 33). Therefore: `--color-muted` is a deep `oklch(40% …)`, `--color-link` a deep `oklch(30% 0.13 255)`, the key-word `.hl` emphasises by **weight at ink colour** (never `color: var(--color-accent)`), and the only cobalt *fill* under text is the hit bar — which carries `color: var(--color-paper)` explicitly (an empty span still enters the computed dump with its INHERITED colour: inherited ink on a cobalt fill scores Lc 33).
3. **G49 line-box buttons:** `.btn` takes its height from `line-height: 2.4` + `padding-block: var(--space-2xs)` — the checker measures `offsetHeight ≤ lineHeight × 1.5` INCLUDING padding, so normal pill padding fails even when the label is one line.
4. **G26 per-variant state sets:** `.btn--accent`/`.btn--outline` list their own `:focus-visible`/`:active`/`:disabled` — base-class states do not transfer in the checker.
5. **G23 accent budget:** primary buttons are **ink-filled** (the modern-minimal canon), the nav CTA is outlined; cobalt appears only as the hit bar, hover states, and the focus ring.
6. **G51:** every `.hero*` selector matches the engine's display regex (`hero|display|title|headline`) — all of them carry `overflow-wrap: anywhere; min-width: 0`, including the `@media` rule.
7. **Nav at 375 (vision iteration 2):** below 40rem the `1fr auto 1fr` grid collapses once the centre hides — the media query switches `.nav__inner` to flex `space-between` and hides `.nav__signin`.
8. **Waterfall wrap (vision iteration 1):** `.span-bar` shrinks (`flex: 0 1 auto; min-width: 0`), `.span-ms` is `flex: none; white-space: nowrap` — labels never wrap under a wide bar.

- [ ] **Step 1: Write the file with exactly this content**

```css
/* Keystone · macrostructure: Split Studio · theme: Cobalt · tone: technical · anchor hue: 255 cobalt · nav: N1b · footer: Ft2 · gates: pending */
:root[data-theme="cobalt"] {
  --color-paper:      oklch(99% 0.002 250);
  --color-paper-2:    oklch(96% 0.004 250);
  --color-ink:        oklch(25% 0.01 250);
  --color-muted:      oklch(40% 0.015 250);
  --color-rule:       oklch(88% 0.006 250);
  --color-accent:     oklch(55% 0.20 255);
  --color-accent-ink: oklch(99% 0.002 250);
  --color-focus:      oklch(55% 0.20 255);
  --color-link:       oklch(30% 0.13 255);
  --color-hl:         oklch(35% 0.14 255);
  --font-display:     "Space Grotesk", sans-serif;
  --font-body:        "Geist", sans-serif;
  --font-mono:        "Geist Mono", monospace;
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-md:   1.25rem;
  --text-xl:   1.9531rem;
  --text-2xl:  2.4414rem;
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
  --page-max: 68rem;
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

code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

/* ── N1b · SaaS nav (rule-free variant) ──────────────────── */
.nav__inner {
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--space-md) var(--page-gutter);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}
.nav__brand {
  justify-self: start;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-md);
  letter-spacing: -0.01em;
  color: var(--color-ink);
  text-decoration: none;
  white-space: nowrap;
  overflow-wrap: anywhere;
  min-width: 0;
}
.nav__center {
  justify-self: center;
  display: flex;
  gap: var(--space-lg);
}
.nav__link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--dur-micro) var(--ease-out);
}
.nav__right {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.nav__right .btn--outline {
  color: var(--color-ink);
  border: 1px solid var(--color-ink);
}
.nav__right .btn--outline:hover {
  color: var(--color-link);
  border-color: var(--color-link);
}
.nav__signin {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--dur-micro) var(--ease-out);
}

/* ── Buttons ─────────────────────────────────────────────── */
.btn {
  display: inline-block;
  font-weight: 500;
  font-size: var(--text-sm);
  letter-spacing: 0.01em;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 999px;
  padding: var(--space-2xs) var(--space-lg);
  line-height: 2.4;
  transition: background-color var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out);
}
.btn:hover {
  opacity: 0.9;
}
.btn--accent {
  color: var(--color-paper);
  background-color: var(--color-ink);
}
.btn--accent:hover {
  background-color: var(--color-link);
}
.btn--outline {
  color: var(--color-ink);
  border: 1px solid var(--color-ink);
}
.btn--outline:hover {
  color: var(--color-link);
  border-color: var(--color-link);
}
.btn:focus-visible,
.btn--accent:focus-visible,
.btn--outline:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
.btn:active,
.btn--accent:active,
.btn--outline:active {
  opacity: 0.8;
}
.btn:disabled,
.btn--accent:disabled,
.btn--outline:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── Hero split — copy left, trace waterfall right ───────── */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--space-2xl);
  align-items: center;
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--space-2xl) var(--page-gutter) var(--space-3xl);
  overflow-wrap: anywhere;
  min-width: 0;
}
.eyebrow {
  margin: 0 0 var(--space-md);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  color: var(--color-muted);
}
.display {
  margin: 0 0 var(--space-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2.25rem, 4vw + 0.5rem, 3.75rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  overflow-wrap: anywhere;
  min-width: 0;
}
.hl {
  font-weight: 700;
}
.hero__lede p {
  margin: 0 0 var(--space-xl);
  overflow-wrap: anywhere;
  min-width: 0;
  font-size: var(--text-md);
  line-height: 1.6;
  max-width: 55ch;
}
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-md);
  overflow-wrap: anywhere;
  min-width: 0;
}

/* the proof: a trace waterfall, typeset */
.hero__proof {
  display: grid;
  gap: var(--space-xs);
  overflow-wrap: anywhere;
  min-width: 0;
  padding: var(--space-lg);
  border: 1px solid var(--color-rule);
  border-radius: 8px;
  background-color: var(--color-paper-2);
}
.span-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
.span-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
  width: 9ch;
  flex: none;
}
.span-bar {
  height: var(--space-sm);
  background-color: var(--color-rule);
  border-radius: 2px;
  flex: 0 1 auto;
  min-width: 0;
}
.span-bar--hit {
  background-color: var(--color-link);
  color: var(--color-paper);
}
.span-ms {
  flex: none;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
}
.proof-caption {
  margin: var(--space-xs) 0 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
}

/* ── Split Studio rows — claim left, proof right ─────────── */
.split {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: var(--space-2xl);
  align-items: center;
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--space-2xl) var(--page-gutter);
}
.split--alt {
  background-color: var(--color-paper-2);
}
.split__claim .head {
  margin: 0 0 var(--space-md);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-xl);
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--color-ink);
  overflow-wrap: anywhere;
  min-width: 0;
}
.split__claim p {
  margin: 0;
  max-width: 48ch;
  color: var(--color-ink);
}
.split__proof {
  min-width: 0;
}
.term {
  margin: 0;
  padding: var(--space-lg);
  border: 1px solid var(--color-rule);
  border-radius: 8px;
  background-color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.7;
  color: var(--color-ink);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  min-width: 0;
}

/* ── Try band ────────────────────────────────────────────── */
.tryband {
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--space-2xl) var(--page-gutter) var(--space-3xl);
  text-align: left;
}
.tryband .head {
  margin: 0 0 var(--space-md);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-2xl);
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--color-ink);
  overflow-wrap: anywhere;
  min-width: 0;
}
.tryband__sub {
  margin: 0 0 var(--space-lg);
  color: var(--color-muted);
  max-width: 55ch;
}
.tryband__cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-md);
}

/* ── Ft2 · Inline-rule single line ───────────────────────── */
.foot-line {
  border-top: 1px solid var(--color-rule);
  padding: var(--space-lg) var(--page-gutter);
}
.foot-line p {
  margin: 0 auto;
  max-width: var(--page-max);
  font-size: var(--text-sm);
  color: var(--color-muted);
}
.foot-line a {
  color: var(--color-muted);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color var(--dur-micro) var(--ease-out);
}

/* ── Link + nav states (G26) ─────────────────────────────── */
.nav__link:hover,
.nav__signin:hover,
.foot-line a:hover {
  color: var(--color-link);
}
.nav__link:focus-visible,
.nav__signin:focus-visible,
.foot-line a:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
.nav__link:active,
.nav__signin:active,
.foot-line a:active {
  color: var(--color-muted);
}
.nav__link:disabled,
.nav__signin:disabled,
.foot-line a:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.nav__brand:hover {
  color: var(--color-link);
}

/* Mobile collapse — 40rem type breakpoint */
@media (max-width: 40rem) {
  .hero {
    grid-template-columns: 1fr;
    padding-block: var(--space-xl) var(--space-2xl);
    overflow-wrap: anywhere;
    min-width: 0;
  }
  .split {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
  .nav__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav__center { display: none; }
  .nav__signin { display: none; }
  .display {
    font-size: clamp(2rem, 9vw, 2.5rem);
    overflow-wrap: anywhere;
    min-width: 0;
  }
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

Run: `tail -c 4 /tmp/keystone-5b/05/keystone-work/style.css | od -c | tail -2`
Expected: ends with `}` `\n`.

---

### Task 4: Emit `tokens.css` + `brief.md`

**Files:**
- Create: `/tmp/keystone-5b/05/keystone-work/tokens.css`
- Create: `/tmp/keystone-5b/05/keystone-work/brief.md`

**Interfaces:**
- Produces: `tokens.css` — the portable token block. `brief.md` — the design doc with the executed §7 record (Steps 1–5 pre-run sections plus the recorded §7 engine/vision evidence below).

- [ ] **Step 1: Extract `tokens.css` (token block = lines 2–36; line 36 is the closing brace)**

```bash
sed -n '2,36p' /tmp/keystone-5b/05/keystone-work/style.css > /tmp/keystone-5b/05/keystone-work/tokens.css
printf '\n' >> /tmp/keystone-5b/05/keystone-work/tokens.css
```

- [ ] **Step 2: Verify**

Run: `head -2 /tmp/keystone-5b/05/keystone-work/tokens.css && tail -c 20 /tmp/keystone-5b/05/keystone-work/tokens.css | od -c | tail -2`
Expected: first line `:root[data-theme="cobalt"] {`; file ends with `}\n`.

- [ ] **Step 3: Write `brief.md`** — Steps 1–5 sections (design-context gate answered by the brief: SREs/platform engineers · try it / contact sales · technical; genre modern-minimal; theme Cobalt; macro Split Studio; nav N1b rule-free; footer Ft2; enrichment none; diversification first-run) + Step 5 preview (`Slop test · pending`) + the honest-copy note (Tracejam, v0.14.2, service names, span counts and millisecond figures are the tool's own demo fiction; no invented proof-metrics; G46 expected: FLAG accepted). After Task 6, insert the full `## Step 7` record: §7.1 emit history with the cap disclosure, §7.2 vision table, §7.3 resolution, §7.4 stamp + log — per the executed run recorded in Task 6 Step 2 and Task 7.

---

### Task 5: Engine deterministic loop (Step 7.1)

**Files:**
- Read: `/tmp/keystone-5b/05/keystone-work/{index.html, style.css}`
- Create: `/tmp/keystone-5b/05/keystone-work/report/`

**Interfaces:**
- Consumes: engine at repo root — run from `/Users/rector/local-dev/getpipher/keystone`.
- Produces: `report/keystone-report.json` (47 rows; 0 failed gate numbers = 48/48), `report/keystone-report.html`, `report/keystone-render/` (5 screenshots + computed/viewports/clickable/dom).

- [ ] **Step 1: Full render run**

```bash
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html /tmp/keystone-5b/05/keystone-work/index.html \
  --css /tmp/keystone-5b/05/keystone-work/style.css \
  --log /tmp/keystone-5b/05/keystone-work/.keystone/log.json \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/keystone-5b/05/keystone-work/report
```

Expected (with the Task 2/3 files verbatim): `PASS 47/47 · FAIL 0/47` on the **first** run. (Executed history with intermediate versions: emit 1 = 42/58 — G40 accent `.hl` text Lc 33 + borderline muted + G49 padded anchors + G26 variant states + G23 accent budget + G51 hero-family guards; emit 2 = 46/49; emit 3 = 46/47 — accent-filled buttons physically ≈ Lc 55 and the hit-bar span at Lc 33; emit 4 = 47/47 after the ink-filled primary + deep-fill hit bar. **Cap disclosure: 4 deterministic runs, one over the 3-cap, declared in brief.md §7.1.** The embedded files already contain every fix.)

- [ ] **Step 2: If any gate fails** — read the JSON evidence + fix suggestions, apply, re-run; never edit the engine.

```bash
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/keystone-5b/05/keystone-work/report/keystone-report.json","utf8")); console.log(r.results.filter(x=>!x.pass))'
```

Expected at pass: `[]`

---

### Task 6: Vision pass (Step 7.2)

**Files:**
- Read: `/tmp/keystone-5b/05/keystone-work/report/keystone-render/screenshot-1280.png` and `screenshot-375.png`
- Modify: `/tmp/keystone-5b/05/keystone-work/brief.md` (insert the §7 record)

- [ ] **Step 1: Read both PNGs yourself** and answer the 18-question prompt from `skills/keystone/references/gates.md` § The vision pass — for BOTH viewports, one-sentence evidence per gate. NEVER fabricate an S1 verdict.

- [ ] **Step 2: Record the verdict table in `brief.md` § 7.2** plus the iteration log. Recorded verdicts from the executed run (re-affirm from your own read):

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | two-column split — copy left, waterfall right; nothing stacked on a centred axis |
| G9 equal-whitespace | PASS (1280) | rule-free nav → hero split → alternating paper bands with bordered proof blocks → try band → hairline footer |
| G29 abstract background | PASS | flat near-white; no gradients, no mesh |
| G42 nav fingerprint | PASS | 3 centre links + 2 right actions, rule-free — not the 4–5-link + hairline default |
| G43 footer fingerprint | PASS | Ft2 single credit line; no columns, no social row |
| G44 hero fit | PASS (1280) | eyebrow + headline + lede + CTAs + waterfall all inside the 800px fold |
| G45 decorative-without-purpose | PASS | the waterfall and terminal blocks demonstrate the product |
| G38a italic headers | PASS (both) | everything roman |
| G30 icon tells | PASS | no icons, no emoji; `→`/`$` are text glyphs |
| G46 invented metrics | FLAG (accepted) | "212 spans · 3 services · 186ms" inside the demo outputs is the tool's own demo fiction — not page proof-claims; v0.14.2 is product versioning |
| G47 re-drawn chrome | PASS | terminal blocks are bare bordered `pre` — no window frames, no traffic lights |
| G35 stroke position | PASS | 1px underlines offset 3px |
| G36 flex align | PASS | nav/CTA rows `align-items: center` |
| S1 looks AI-generated? | **NO (~0.2)** | ink-filled buttons, mono-in-prose, terse declarative copy, a waterfall with real service names — reads Linear-era tool, not template |
| S2 feels like this brief? | **YES** | SRE register: capture/query/diff, OpenTelemetry, sidecars, root cause |
| S3 two pages, different sites? | **YES** | vs Tide (two-ink zine), Streampipe (dark phosphor terminal), Maple (cream serif journal): a fourth distinct site |

Executed iteration log (cap 2, both used, both re-rendered + engine-re-verified):
- Iteration 1 — the checkout row's "186ms" label wrapped mid-word under the 86% bar → bars shrink (`flex: 0 1 auto; min-width: 0`), labels hold (`flex: none; white-space: nowrap`).
- Iteration 2 — at 375px the `1fr auto 1fr` nav grid collapsed once the centre hid (brand overlapped "Sign in") → media query switches `.nav__inner` to flex `space-between` and hides `.nav__signin`.

- [ ] **Step 3: Any vision FAIL (except flag-only G46)** — apply the fix, re-render (Task 5 command), re-vision. Cap 2 iterations.

---

### Task 7: Resolution + stamp + log (Steps 7.3/7.4)

**Files:**
- Modify: `/tmp/keystone-5b/05/keystone-work/style.css:1` (fill `gates:` field: `pending` → `48/48 engine-verified`)
- Modify: `/tmp/keystone-5b/05/keystone-work/brief.md` (§7.3 resolution row + §7.4 stamp + log note)
- Modify: `/tmp/keystone-5b/05/keystone-work/.keystone/log.json`

- [ ] **Step 1: Fill the stamp's gates field** (47/47 rows · 0 failed gate numbers = 48/48; G40/G41 share one row)

- [ ] **Step 2: Update the brief's preview row** to `- **Slop test** · 48/48 ✓ (engine-verified) — ./report/keystone-report.html` and add §7.3 + §7.4, noting the post-seed source-only re-check self-fails G8 by construction.

- [ ] **Step 3: Seed the log (newest first)**

```bash
cat > /tmp/keystone-5b/05/keystone-work/.keystone/log.json << 'EOF'
[
  {
    "date": "2026-08-29",
    "macrostructure": "Split Studio",
    "theme": "Cobalt",
    "enrichment": "none",
    "brief": "Tracejam — tracing/observability SaaS landing; cobalt one-signal, ink-filled primary, span waterfall as proof"
  }
]
EOF
```

- [ ] **Step 4: Verify the stamp edit introduced nothing (source-only run; G8 self-match is the expected acceptance signal)**

```bash
mkdir -p /tmp/keystone-5b/05/keystone-work/report-source
cd /Users/rector/local-dev/getpipher/keystone && node engine/check-gates.mjs \
  --html /tmp/keystone-5b/05/keystone-work/index.html \
  --css /tmp/keystone-5b/05/keystone-work/style.css \
  --log /tmp/keystone-5b/05/keystone-work/.keystone/log.json \
  --out /tmp/keystone-5b/05/keystone-work/report-source
```

Expected: `PASS 46/47 · FAIL 1/47` where the single fail is exactly `8: current Split Studio matches a prior run`. Any OTHER fail = a real regression — fix before packaging.

---

### Task 8: Package the candidate

**Files:**
- Create: `/Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/keystone/index.html`
- Create: `/Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/keystone/style.css`

- [ ] **Step 1: Copy the final (post-engine, post-vision) files**

```bash
mkdir -p /Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/keystone
cp /tmp/keystone-5b/05/keystone-work/index.html \
   /tmp/keystone-5b/05/keystone-work/style.css \
   /Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/keystone/
```

- [ ] **Step 2: Verify packaging**

```bash
ls /Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/keystone/
head -1 /Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/keystone/style.css | grep -o "48/48 engine-verified"
tail -c 4 /Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/keystone/style.css | od -c | tail -1
tail -c 8 /Users/rector/local-dev/getpipher/keystone/candidates/05-tracejam-saas/keystone/index.html | od -c | tail -1
```

Expected: exactly `index.html` + `style.css`; stamp contains `48/48 engine-verified`; both files end with `\n`.

- [ ] **Step 3: Commit (exact paths — never a directory sweep)**

```bash
cd /Users/rector/local-dev/getpipher/keystone
git add candidates/05-tracejam-saas/keystone docs/superpowers/plans/2026-08-29-5b-brief05-keystone-candidate.md
git commit -m "candidates(05): keystone side — Cobalt/Split-Studio blind build, 48/48 engine-verified"
```

(Executed run: committed as `e591c2a` with exactly the two candidate files — the plan doc landed separately; if it is already committed, the command reduces to the candidate files only.)

---

## Self-review

- **Coverage:** engine loop with caps + cap disclosure (Task 5), vision pass with honesty rule + iteration log (Task 6), packaging to the two exact paths (Task 8), report-back content (header + Tasks 5–8), design decisions (Global Constraints + Tasks 2–4), scratch/repo-write rules (Global Constraints + Task 1).
- **Placeholders:** none — both shipped files embedded verbatim; every command has an expected output; the executed §7 record is embedded as data.
- **Consistency:** `WORK` path, repo-root run cwd, and `candidates/` paths identical across tasks; tokens extraction range `2,36p` matches the shipped token block (closing brace at line 36); stamp sequencing handled by embedding the shipped file verbatim and verifying the filled stamp in Task 7.

**Execution handoff:** this plan was already executed once (2026-08-29) — the candidate at `candidates/05-tracejam-saas/keystone/` is its product (commit `e591c2a`). A fresh execution reproduces it from a clean scratch; a reviewer can verify the shipped artifact directly via Task 5 Step 1 (expect 47/47 on first run) and Task 8 Step 2.
