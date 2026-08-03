# Theme — Terminal

Dark, mono-everywhere, phosphor-green signal. The page reads like a terminal session typeset for the web — a CLI/dev-tool register where the command IS the hero and a single green accent is the only signal on a tinted-black field.

## Axes (diversification)
- **Paper band** — dark
- **Display style** — mono
- **Accent hue** — phosphor

## Palette
```css
:root[data-theme="terminal"] {
  --color-paper:    oklch(13% 0.01 145);
  --color-paper-2:  oklch(18% 0.012 145);
  --color-paper-3:  oklch(23% 0.015 145);
  --color-ink:      oklch(92% 0.02 145);
  --color-accent:   oklch(78% 0.20 145);
  --color-accent-ink: oklch(13% 0.01 145);
  --color-focus:    oklch(78% 0.20 145);
  --font-display:   "JetBrains Mono", monospace;
  --font-body:      "JetBrains Mono", monospace;
  --font-mono:      "JetBrains Mono", monospace;
}
```

Tinted-black paper `oklch(13% 0.01 145)` — tinted toward phosphor green, never pure black (G7). One accent `oklch(78% 0.20 145)` — phosphor green, the prompt colour, the one signal. `--color-accent-ink` is the paper colour so a phosphor-filled badge keeps its label readable (G40-41).

## Fonts (free)
- **Display:** JetBrains Mono (Google Fonts)
- **Body:** JetBrains Mono (Google Fonts)
- **Mono:** JetBrains Mono (Google Fonts)

JetBrains Mono across ALL three slots — mono IS the design. The page reads like a terminal session. MONO-PURITY: Terminal is the one theme where mono in non-code contexts does NOT count as a separate family under G37, because mono is the body face itself — there is exactly ONE family in use (G37 satisfied as 1 ≤ 3). Do not introduce a sans or serif outlier.

## Signature moves

A Terminal build must exhibit at least two of these three.

### 1 — Mono everywhere: display, body, code are one face
JetBrains Mono fills every typography slot. No weight above 600 for display — the page leans on letter-spacing and line-height, not bold mass. Body sits at 400 with a 1.7 line-height so long-form prose doesn't read as a wall of code. The effect is a CLI landing page where the marketing copy and the code samples share the same grid baseline. Calibrates against a CLI tool's docs site — the visitor never context-switches between "reading marketing" and "reading docs" because the face is identical.

### 2 — Phosphor-green on tinted-black, one signal
Paper `oklch(13% 0.01 145)` (tinted toward phosphor green, never pure black — G7), accent `oklch(78% 0.20 145)` (phosphor). The accent is the prompt colour — use it for the `$` sigil, the `▸ run` pill fill, focus rings, and link underlines. Everything else is ink-on-paper. No second accent, no gradient between accents. Calibrates against an old CRT phosphor monitor and a tmux status line — one green on one dark surface, and that constraint is the identity.

### 3 — The command as the hero
The hero is a typed `$ command` followed by its output, not a headline-plus-CTA stack. The CTA is a `▸ run` pill below the output block. Motion: a single typewriter reveal on the command text (steps of 1ch, 60ms). Under `prefers-reduced-motion: reduce`, the command shows its final state instantly with no animation (G27). The typed command is motivated decoration (G45) — it demonstrates what the tool does, not décor for its own sake.

## Macrostructure affinity

**Loves:**
- **Workbench** — the terminal IS a workbench; panels of command + output + status fit naturally.
- **Component Playground** — a live input → output demo is the CLI experience translated to web.
- **Index-First** — a directory of commands reads like `ls` output; the index is the interface.
- **Map/Diagram** — ASCII-style diagrams and box-drawing characters feel native to the register.

**Rejects:**
- **Letter** — the epistolary voice is the opposite of a CLI; warmth through personality, not through register.
- **Photographic** — imagery breaks the terminal illusion; the page is typeset, not photographed.
- **Quote-Led** — pull-quotes are an editorial move; Terminal leads with commands, not testimonials.

## Voice fixtures

Technical, CLI, terse, imperative. No hype.

Headlines: "init → build → ship." · "$ keystone build --viewports 1280,375" · "One command. Rendered. Scored." · "No account. No telemetry. Just the gates."

Body: "Runs in your terminal. Returns a report." · "Pipe it in. Read the diff."

Labels (mono UPPERCASE tabular-nums): `$ RUN` · `EXIT · 0` · `GATES · 58/58` · `v4.2.0`

Never: supercharge, unlock, revolutionize, seamless, intelligent, AI-powered, transformative, journey, holistic, empower, leverage, game-changing, next-generation.

## Anti-patterns (theme-specific)

- NEVER introduce a sans or serif outlier — mono-only, one family, G37 satisfied as 1 ≤ 3 (route to Midnight for dark-sans, Garden for serif).
- NEVER use pure black paper (`#000` / `oklch(0% 0 0)`) — tint toward 145° (G7).
- NEVER use pure white ink (`#fff` / `oklch(100% 0 0)`) — tint toward phosphor (G7).
- NEVER use zero-chroma neutrals (G22) — every grey carries a faint phosphor tint at hue 145.
- NEVER add a second accent — single phosphor green only; a cyan or amber signal would break the one-signal discipline.
- NEVER apply a gradient to text (G2) — a faint phosphor radial glow behind the hero command is allowed by the atmospheric override, but never on the text itself.
- NEVER wash a surface with the accent fill (G23) — phosphor is a signal, not a background colour.
- NEVER use `font-style: italic` for emphasis (G38a) — terminal never italicises; mono italic is an AI-slop tell.
- NEVER re-draw terminal chrome (G47) — the page IS the terminal; don't fake a window frame with traffic-light dots around a code block.
- NEVER use `transition: all` (G10) — list specific properties (`transition: opacity 140ms ease, transform 140ms ease`).
- NEVER ship motion without a reduced-motion fallback (G27) — the typewriter reveal must collapse to final state under `prefers-reduced-motion: reduce`.

## Nav & footer routing

**Nav:**
- **N8 (terminal command)** — the nav bar itself is a prompt line; native to the register.
- **N13 (inline cmdk pill)** — a `⌘K` pill fits the keyboard-first CLI energy.
- **N4 (hidden behind k)** — hiding nav behind a key press mirrors a tmux prefix; maximal screen for the command hero.

**Footer:**
- **Ft4 (dense typographic)** — a footer that reads like `man` page metadata; version, flags, repo.
- **Ft5 (statement)** — one line, mono, left-aligned: "No account. No telemetry. Just the gates."

**Avoid:**
- **N6 (newspaper masthead)** — editorial register, wrong energy entirely.
- **Ft8 (marquee scroll)** — motion without purpose; a scrolling footer is the opposite of terminal stillness.

## Worked example

A command-as-hero with a typed `$ command` + output, a `▸ run` pill, and a faint phosphor radial glow behind the command block.

```html
<section class="hero">
  <div class="glow" aria-hidden="true"></div>
  <pre class="cmd" id="cmd">$ keystone build --viewports 1280,375</pre>
  <pre class="out">  ┌─────────────────────────────────┐
  │  GATES   58/58   EXIT 0         │
  │  render  1280px → PASS          │
  │  render  375px  → PASS          │
  └─────────────────────────────────┘</pre>
  <button class="run" type="button">▸ run</button>
</section>
```
```css
.hero {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
  position: relative;
  padding: 4rem 2rem;
  min-height: 60vh;
  background: var(--color-paper);
}
.glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 30% 20%,
    color-mix(in oklch, var(--color-accent) 18%, transparent),
    transparent 60%
  );
}
.cmd {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--color-accent);
  margin: 0;
  white-space: pre-wrap;
  animation: typein 1.4s steps(24) both;
}
.out {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: color-mix(in oklch, var(--color-ink) 72%, transparent);
  margin: 0;
  white-space: pre-wrap;
}
.run {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-accent-ink);
  background: var(--color-accent);
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: opacity 140ms ease;
}
.run:hover { opacity: 0.85; }
.run:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
.run:active { opacity: 0.7; }
.run:disabled { opacity: 0.4; cursor: not-allowed; }
@keyframes typein {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0 0 0); }
}
@media (prefers-reduced-motion: reduce) {
  .cmd { animation: none; }
  .run { transition: none; }
}
```

## Gate overrides

Terminal is **atmospheric** (dark, technical). The following gates receive scoped overrides:

- **G2** — radial gradients allowed on the background only (a faint phosphor glow behind the hero command). Never on text.
- **G6** — a centred hero is allowed when the canvas itself is the design (the command prompt centred on a black field is the design).
- **G23 / G29** — one phosphor bloom up to ~20% of the canvas, fixed-attached, no animation.

Everything else binds at full strength:

- **G7** — no pure black; paper is tinted toward phosphor at `oklch(13% 0.01 145)`.
- **G22** — no zero-chroma neutrals; all greys carry a phosphor tint.
- **G37** — mono-only; one family in use (JetBrains Mono), the ceiling respected as 1 ≤ 3.
- **G38a** — no italic; terminal never italicises.
- **G40-41** — contrast: verify phosphor accent on dark paper and accent-ink on phosphor fill.
- **G47** — no re-drawn terminal chrome; the page IS the terminal.
- **G27** — reduced-motion fallback for the typewriter reveal.

Stamp `overrides: { G2: "radial-gradient on background only", G6: "centred hero when canvas is the design", G23: "one phosphor bloom ≤20%", G29: "one phosphor bloom, fixed, no animation" }`.

## Engine cross-ref

| Signature move | Police gates | How the engine catches drift |
|---|---|---|
| Mono everywhere | G1 (banned fonts — mono not banned) · G37 (≤3 families — mono is ONE family here) · G38a (no italic — terminal never italicises) | The parser counts distinct `font-family` declarations; if a second family appears, G37 fires. Italic `font-style` on any selector triggers G38a. |
| Phosphor + tinted-black | G7 (no pure black) · G22 (no zero-chroma — tint toward phosphor) · G23 (accent footprint — phosphor is a signal) · G40-41 (contrast) | The contrast engine computes APCA Lc between `--color-ink` and `--color-paper`; if paper is `oklch(0% 0 0)` G7 fires. Zero-chroma neutrals trigger G22. Accent fill area is measured against the viewport; >5% triggers G23. |
| Command-as-hero + typewriter | G27 (reduced-motion fallback) · G14 (no animating layout props — animate opacity/transform only) · G45 (the typed command is motivated decoration) | The motion scanner checks for `@media (prefers-reduced-motion: reduce)` coverage on any `animation`/`transition` rule; missing coverage fires G27. `width`/`height`/`padding` in keyframes triggers G14. |
| No re-drawn chrome (cross-cutting) | G47 (the page IS the terminal; faking a frame around a code block fails) | The DOM scanner flags decorative border-radius + dot-pattern clusters that mimic OS window chrome around `<pre>` blocks. |
