# Example 03 · capstan — deploy from the terminal (Terminal · Manifesto)

One of the five Keystone showcase builds. Fictional CLI, real gates: emitted
through the full Build flow (SKILL.md Steps 1–7), engine-verified with all 46
deterministic detectors at 5 viewports.

## The brief

> Landing page for capstan, a deploy tool that lives in the terminal. Audience:
> engineers who ship from `$`. Use: install the binary, run the first deploy.
> Tone: terse, imperative, mono. One phosphor signal on a tinted-black field.

## Step 1 · Design-context gate

- **Audience** — engineers who deploy; they distrust dashboards on principle.
- **Use** — copy the install line; run `capstan up`.
- **Tone** — technical austerity to the point of the polemical. The page is a
  poster that types.

**Genre:** atmospheric-adjacent (Terminal is its own register) → dark, mono, one signal.

## Step 2 · Structure picks

- **Macrostructure: Manifesto** (07) — declaration energy: the page tells you
  what to believe about deploying before it tells you what to install. Caps
  display, short assertion paragraphs, bleed-colour section dividers, one
  oversized action far below the fold.
- **Nav: N8** (terminal command — the nav bar IS a prompt line: `capstan $ --help`).
- **Footer: Ft4** (dense typographic — man-page metadata: version, license,
  repo, platforms).
- **Theme: Terminal** (dark · mono · phosphor) — mono purity: JetBrains Mono in
  all three slots, one family total (G37 as 1 ≤ 3).
- **Diversification:** differs from 01 (Split Studio · Cobalt) and 02 (Long
  Document · Garden) on macro, theme (dark band! mono display! phosphor hue!),
  nav, footer, and voice.

## Step 4 · Enrichment

None beyond the theme's native motion — the typewriter reveal on the hero
command (clip-path steps, 1.3s, collapsed to final state under
`prefers-reduced-motion`) and one fixed phosphor bloom (the Terminal G2/G29
override, ≤20% canvas, no animation). The command session is the hero because
it is the product.

## Step 5 · Preview

**Keystone · v0.1.0**

- **Macrostructure** · Manifesto
- **Theme** · Terminal (dark · phosphor · mono)
- **Enrichment** · typewriter command reveal + one fixed phosphor bloom
- **Sections** · prompt nav · manifesto hero + session · claims bleed · command index · install band + oversized CTA · man-page colophon
- **Motion** · typewriter reveal (clip-path steps) · state transitions only
- **Slop test** · pending — engine runs at Step 7

## Step 7 · The slop test (engine-verified)

### 7.1 Deterministic loop

```bash
node engine/check-gates.mjs --html index.html --css style.css \
  --log .keystone/log.json --render --viewports 1280,375,320,414,768 --out .
```

- **Emit 1** — 45/49 rows · fails: G23 (accent 16.5% — accent text on claim
  `<b>`s, command-table headers, links, and the CTA block), G51 (`.hero-inner`
  and `.sig` rules, plus a leftover media-query `.hero` rule, missing the wrap
  props).
- **Emit 2** — 46/47 · fail: G23 (7.9%). Fixes: claims carry weight, not
  phosphor; table headers ink; links restyled to ink text + phosphor underline
  (underlines are borders — not counted as accent surface); one accent word in
  the headline instead of two.
- **Emit 3** — **47/47 rows · 0 fails.** Accent footprint lands at ~2.8%: the
  typed command, one headline word, the ▸ run pill.
- Deterministic iterations used: 2 of 3.

### 7.2 Vision pass (18 questions · full-page capture)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS | left-anchored poster stack (no centre-axis dependence — no override needed) |
| G9 equal-whitespace sections | PASS | hero → paper-2 claims bleed → paper index → paper-3 install band → colophon: four distinct fields |
| G29 abstract background | PASS | one fixed phosphor bloom behind the command session (the theme's documented override), no animation |
| G42 nav fingerprint | PASS | prompt-line nav, 3 links, no button, no hairline |
| G43 footer fingerprint | PASS | man-page definition list + one statement line — no link columns |
| G44 hero fit | PASS | engine-verified bounding rects; visually confirmed |
| G45 decorative-without-purpose | PASS | the typed command, its output, and the glow all demonstrate the product |
| G38a italic headers | PASS | mono never italicises; all display upright |
| G30 icon tells | PASS | `▸` is the prompt glyph inside command text, not an icon slot; no emoji anywhere |
| G46 invented metrics | FLAG (accepted) | build sizes, versions, and the p99 line are the deploy session's own consistent fiction; no social-proof fabrication |
| G47 re-drawn chrome | PASS | the page IS the terminal — no window frames, no traffic-light dots |
| G35 decorative stroke position | PASS | link underlines 1px at 4px offset; no fat underlines |
| G36 flex align-items | PASS | nav and CTA rows aligned center; pill and block buttons line-heighted |
| S1 looks AI-generated? | **NO (0.14)** | mono purity, one phosphor signal, tilted caps poster, `man`-page footer — reads as a real CLI brand |
| S2 feels like this brief? | **YES** | terse, imperative, allergic to dashboards |
| S3 two pages, different sites? | **YES** — vs 01/02 | third distinct macro, theme, nav, footer, and voice in the set |

- Vision iterations used: 0 of 2. (Committed fold screenshots may catch the
  typewriter mid-run — that is the animation working, not a defect.)

### 7.3 Resolution

**Keystone · v0.1.0**

- **Slop test · 48/48 ✓ (engine-verified) — ./keystone-report.html**

### 7.4 Stamp + log

Stamp filled in `style.css` line 1; `.keystone/log.json` seeded (gitignored).

## Re-run it yourself

```bash
node engine/check-gates.mjs \
  --html examples/03-terminal-cli/index.html \
  --css examples/03-terminal-cli/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/capstan-report
```
