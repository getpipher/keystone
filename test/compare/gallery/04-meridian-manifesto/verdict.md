# Brief 04 · Meridian — blind-critique verdicts

Two candidate renders, judged blind (Candidate A / Candidate B) from the fold captures
`keystone/keystone-render/screenshot-{1280,375}.png` and
`hallmark/keystone-render/screenshot-{1280,375}.png` (18-question prompt, gates.md
§ The vision pass). Mapping by directory provenance, recorded after judging.

Brief (verbatim): "Make me a manifesto for my new studio called Meridian. We work on
environmental products. No flashy stuff."

## Gate verdicts — blind judgment, both candidates

A: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 clean:
no numeric claims in the fold | G47 P | G35 P | G36 P | S1 NO 0.15 | S2 A manifesto for
an environmental studio that leads with durability and repair-over-replacement — the
brief, not a generic page.

B: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 clean:
no numeric claims in the fold | G47 P | G35 F | G36 P | S1 NO 0.20 | S2 "We make things
the world can keep," repair more than replace — the environmental-studio brief, precisely.

## Gate notes (where the one-word verdict needs the sentence)

- **G35 (B)**: the light-green highlighter band behind pale "KEEP." sits low — it
  extends below the serif's baseline like a fat underline, and where the band crosses
  the letters it washes the pale strokes out against the dark ground. A fails in both
  the documented senses: position (band at/below baseline, not behind the x-height of
  the caps) and legibility at the crossing.
- **G44 (A + B)**: all hero content sits inside the 800px fold on both sides; neither
  page defines a hero button (manifesto register — the nav links carry contact), so
  there is no CTA to push below the fold.
- **G43 (both)**: the footer is below the fold in both captures; judged from the
  shipped structure — neither side shows the 4-column + social-row fingerprint.
- **G29 (both)**: A is near-white with a single ink and one muted-red ordinal accent;
  B alternates a dark-green hero band with light sage prose — one green family, flat
  surfaces, no mesh.
- **G46 (both)**: clean — no counts, percentages, or multipliers anywhere in the folds.

## Vision S1 — both sides, same 18-question prompt

| Side | S1 | Confidence | Evidence (1280 + 375) |
|---|---|---|---|
| Keystone | NO | ~0.15 | near-white/black poster simplicity borders on generic brutalist; the muted-red ordinals read deliberate |
| Hallmark | NO | ~0.25 | all-caps serif display with a green band behind KEEP. — striking but theatrical; italic body emphasis |

Mobile (375): A — wordmark + Contact link hold, headline scales, no overflow; B —
wordmark + "Write to us" hold, display wraps cleanly on the dark band.

## Engine summary (from verdict.json — the moat check)

| Side | Score | Distinct failed gates |
|---|---|---|
| Keystone | **48/48 (rows 47/47)** | none |
| Hallmark | **44/48 (rows 43/48)** | G20, G27, G49, G51 |

Moat notes: G20 (missing *Keystone* stamp) is a cross-skill convention difference;
G27 (motion without reduced-motion fallback), G49 (two-line clickable text), and G51
(display headers without long-word wrap) are craft failures the moat exists to catch.
Vision concurs with the engine: keystone clean, and the vision's one FAIL (B/G35 —
highlighter band low + letter washout) is a craft finding the engine's G51 sweep on the
same page corroborates in spirit. Losses published: Hallmark loses brief 04.
