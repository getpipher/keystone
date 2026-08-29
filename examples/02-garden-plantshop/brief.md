# Example 02 · Fern & Fog — house-plant shop (Garden · Long Document)

One of the five Keystone showcase builds. Fictional shop, real gates: emitted
through the full Build flow (SKILL.md Steps 1–7), engine-verified with all 46
deterministic detectors at 5 viewports.

## The brief

> Landing page for Fern & Fog, a small house-plant shop. Audience: locals who
> want a plant and honest advice. Use: read the week's stock, come visit.
> Tone: warm editorial — a field journal, not a web store.

## Step 1 · Design-context gate

- **Audience** — neighbourhood plant buyers; they want the list and the door, not a funnel.
- **Use** — read the stock list; visit before Saturday.
- **Tone** — warm, hand-set, considered. The page is literature about the shop.

**Genre:** editorial (default, signalled by "shop journal") → `references/genres/editorial.md`.

## Step 2 · Structure picks

- **Macrostructure: Long Document** (02) — the brief's energy is "tell me about
  the shop", not "convert me". Continuous prose, inline heads, no marketing
  scaffold. (Garden's own "Loves" list names it.)
- **Nav: N6** (newspaper masthead — wordmark + thin rule) with a 2-link cluster.
- **Footer: Ft1** (mast-headed — brand + tagline + one link row; the cookbook's
  editorial default).
- **Theme: Garden** (light · roman-serif · chromatic-green).
- **Diversification:** differs from example 01 (Split Studio · Cobalt) on
  macrostructure, theme (all three axes: same paper band, grotesk→roman-serif,
  cool→chromatic-green), genre, nav, footer, and voice.

## Step 4 · Enrichment

None — typography only. The drop cap, the hairline accent rules, the marginalia
note, and the italic Latin names ARE the enrichment. A photo of a ficus would
be the slop move here.

## Step 5 · Preview

**Keystone · v0.1.0**

- **Macrostructure** · Long Document
- **Theme** · Garden (light · chromatic-green · roman-serif)
- **Enrichment** · none (typography only)
- **Sections** · masthead · entry head · prose (drop cap, marginalia) · stock table · care prose · pull-quote · visit band · colophon
- **Motion** · none — the page is just *there* (Long Document reveal rule); state transitions only
- **Slop test** · pending — engine runs at Step 7

## Step 7 · The slop test (engine-verified)

### 7.1 Deterministic loop

```bash
node engine/check-gates.mjs --html index.html --css style.css \
  --log .keystone/log.json --render --viewports 1280,375,320,414,768 --out .
```

- **Emit 1** — 45/48 rows · fails: G40 (the `<hr>` carried the UA's default gray
  `color` into the computed pair), G49 (masthead links 1px over the 1.5×
  line-height bound).
- **Emit 2** — 47/47 rows · 0 fails. Fixes: explicit `color: transparent` on the
  textless rule; link line-heights to 20px.
- Deterministic iterations used: 2 of 3.

### 7.2 Vision pass (18 questions · full-page capture, both folds)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS | left-anchored entry head; no centred axis |
| G9 equal-whitespace sections | PASS | prose → stock table → accent rule → quote → paper-2 visit band — five distinct rhythms |
| G29 abstract background | PASS | warm paper throughout, no gradients or meshes |
| G42 nav fingerprint | PASS | newspaper masthead with a 2-link cluster — not the 4–5-link + button default |
| G43 footer fingerprint | PASS | brand + tagline + single link row; no 4-column grid |
| G44 hero fit | PASS | engine-verified bounding rects; visually confirmed |
| G45 decorative-without-purpose | PASS | drop cap, marginalia, and rules are all typographic devices with editorial jobs |
| G38a italic headers | PASS | headings upright; italics only on Latin names in table cells (taxonomy convention, body content) |
| G30 icon tells | PASS | zero icons, zero emoji |
| G46 invented metrics | FLAG (accepted) | prices/light/water are the shop's own consistent fiction — a shop journal, not a proof wall; no social-proof fabrication |
| G47 re-drawn chrome | PASS | no frames anywhere; the table is a real table |
| G35 decorative stroke position | PASS | link underlines 1px, offset 3px — no fat underlines |
| G36 flex align-items | PASS | masthead row centred; no height-mixed control rows |
| S1 looks AI-generated? | **NO (0.10)** | drop cap + marginalia + serif discipline + a shop cat in the colophon; nothing about this reads generated |
| S2 feels like this brief? | **YES** | a warm weekly field note from a specific street |
| S3 two pages, different sites? | **YES** — vs example 01 | Cobalt mono diptych vs Garden serif journal share nothing but the engine |

- Vision iterations used: 0 of 2.

### 7.3 Resolution

**Keystone · v0.1.0**

- **Slop test · 48/48 ✓ (engine-verified) — ./keystone-report.html**

### 7.4 Stamp + log

Stamp filled in `style.css` line 1; `.keystone/log.json` seeded (gitignored).

## Re-run it yourself

```bash
node engine/check-gates.mjs \
  --html examples/02-garden-plantshop/index.html \
  --css examples/02-garden-plantshop/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/fern-report
```
