# Example 04 · Two Drum Press — risograph studio (Riso · Catalogue)

One of the five Keystone showcase builds. Fictional studio, real gates:
emitted through the full Build flow (SKILL.md Steps 1–7), engine-verified with
all 46 deterministic detectors at 5 viewports.

## The brief

> Landing page for Two Drum Press, a two-person risograph studio. Audience:
> print buyers, zine fair-goers, neighbours. Use: read the autumn catalogue,
> order a print or visit the open studio. Tone: tactile, hand-made, proud of
> its own imperfection.

## Step 1 · Design-context gate

- **Audience** — people who buy prints with their eyes and their hands.
- **Use** — browse six editions; come Saturday or email.
- **Tone** — print-shop directness. The misregistration is the signature.

**Genre:** editorial (print-feel rebellion) with a catalogue spine.

## Step 2 · Structure picks

- **Macrostructure: Catalogue** (11) — a visual index of inventory: six
  editions of the same thing, dated, counted, priced. Irregular 12-column spans
  (4/8 · 4/4 · 5/7 rhythm) so the register never reads as a 3-equal card row.
- **Nav: N7** (brutal slab — chunky ink bar with a magenta plate-edge).
- **Footer: Ft3** (catalogue index — rows with mono row-labels, the print-catalogue
  case the cookbook names as Ft3's legitimate use).
- **Theme: Riso** (light · risograph-bold · chromatic-other — cyan + magenta).
- **Diversification:** differs from 01–03 on macro, theme axes (risograph-bold
  display, chromatic-other hue), nav, footer, voice — and on ornament philosophy:
  this is the one build where the background carries grain.

## Step 4 · Enrichment

The theme's own craft: off-register two-ink headlines (`text-shadow` plates,
never a gradient — G2) and a static SVG grain overlay at 5% (`aria-hidden`,
never animated — G33/G27). No photos: the editions are described, not mocked.

## Step 5 · Preview

**Keystone · v0.1.0**

- **Macrostructure** · Catalogue
- **Theme** · Riso (light · cyan+magenta · risograph-bold)
- **Enrichment** · off-register text shadows + static grain (theme signature moves)
- **Sections** · slab nav · catalogue head · six editions · ink plates · process (two passes) · visit band · index footer
- **Motion** · none — the catalogue is still; state transitions only
- **Slop test** · pending — engine runs at Step 7

## Step 7 · The slop test (engine-verified)

### 7.1 Deterministic loop

```bash
node engine/check-gates.mjs --html index.html --css style.css \
  --log .keystone/log.json --render --viewports 1280,375,320,414,768 --out .
```

- **Emit 1** — 45/55 rows · fails: G40 (slab containers inherited dark ink
  against the dark slab — explicit light color; ink-2 at Lc 59 on paper-3,
  darkened a step), G54 (the process list's number-beside-heading grid read as
  the tag-left tell — steps now stack with inline numbers).
- **Emit 2** — **47/47 rows · 0 fails.** The saturated inks (cyan 68 / magenta
  65) live only in shadows, rules, borders, and decoration — invisible to the
  contrast pairs by construction; text and fills use the 40/38 deep steps.
- Deterministic iterations used: 1 of 3.

### 7.2 Vision pass (18 questions · full-page capture)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS | left-anchored catalogue head |
| G9 equal-whitespace sections | PASS | head → edition grid → paper-3 ink band → process list → paper-2 visit band → index footer |
| G29 abstract background | PASS | static 5% grain only (the documented Riso ornament); no gradients or mesh |
| G42 nav fingerprint | PASS | ink slab, 3 links, no button, 4px plate edge — not the hairline default |
| G43 footer fingerprint | PASS | index rows with mono labels; no 4-column link grid |
| G44 hero fit | PASS | engine-verified bounding rects; visually confirmed |
| G45 decorative-without-purpose | PASS | grain and misregistration ARE the studio's product story |
| G38a italic headers | PASS | Bricolage stays upright; no italics in any heading |
| G30 icon tells | PASS | no icons, no emoji; numbers are typographic |
| G46 invented metrics | FLAG (accepted) | edition runs and prices are the catalogue's own consistent fiction — a shop index, not a proof wall |
| G47 re-drawn chrome | PASS | no frames; editions are bordered cards, not fake prints |
| G35 decorative stroke position | PASS | underlines 2px at 3px offset; no fat underlines |
| G36 flex align-items | PASS | slab row centred; chips and meta rows aligned |
| S1 looks AI-generated? | **NO (0.15)** | off-register plates, grain, pencil-numbered editions, a shop cat's absence notwithstanding — reads pulled, not generated |
| S2 feels like this brief? | **YES** | a specific street's print studio, not "a brand" |
| S3 two pages, different sites? | **YES** — vs 01–03 | fourth distinct macro/theme/nav/footer/voice in the set |

- Vision iterations used: 0 of 2.

### 7.3 Resolution

**Keystone · v0.1.0**

- **Slop test · 48/48 ✓ (engine-verified) — ./keystone-report.html**

### 7.4 Stamp + log

Stamp filled in `style.css` line 1; `.keystone/log.json` seeded (gitignored).

## Re-run it yourself

```bash
node engine/check-gates.mjs \
  --html examples/04-riso-printstudio/index.html \
  --css examples/04-riso-printstudio/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/riso-report
```
