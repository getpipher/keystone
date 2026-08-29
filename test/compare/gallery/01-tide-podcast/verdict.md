# Brief 01 · Tide — blind vision judgment

Brief (verbatim): "build me a landing page for my indie podcast called Tide."
Judged from the fold captures: hallmark/keystone-render/screenshot-{1280,375}.png and
keystone/keystone-render/screenshot-{1280,375}.png (18-question prompt, gates.md
§ The vision pass). Engine rows below are from verdict.json — recorded separately,
not judged here.

## Engine scores (harness, for context)

- Hallmark — 41/57 rows · **42/48** · failed gates: 18, 20, 26, 40, 51, 54
- Keystone — 47/47 rows · **48/48** · no failed gate numbers

## Vision judgment — Candidate A (Hallmark)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | masthead is centred but the headline/lede are left-anchored — not one centred axis |
| G9 equal-whitespace sections | PASS (1280) | nothing above the fold repeats; the void → headline sequence is one rhythm, not two identical ones |
| G29 abstract background | PASS (1280) | flat warm cream; a single blue accent word in the headline |
| G42 nav fingerprint | PASS (1280) | centred masthead with 3 links beneath — not wordmark-left + 4–5 links + button + hairline |
| G43 footer fingerprint | PASS | no footer visible in the fold; no link grid or social row anywhere in the capture |
| G44 hero fit | FAIL (1280) | no primary CTA visible without scrolling; a ~340px dead band separates the masthead from the headline, and the lede is clipped at the fold edge |
| G45 decorative-without-purpose | PASS (1280) | no ornament — the dead band is empty space, not decoration |
| G38a italic headers | PASS (both) | masthead and headline roman |
| G30 icon tells | PASS (both) | no icons, no emoji |
| G46 invented metrics | clean (both) | no numeric claims visible in the fold |
| G47 re-drawn chrome | PASS (both) | no frames |
| G35 highlighter band | PASS (both) | no highlighter band; the accent is a coloured word in the headline |
| G36 flex align | PASS (1280) | nav links align with the masthead text; no button/text height mismatch |
| S1 looks AI-generated? | NO 0.25 | tells: the dead band mid-fold reads like a layout artifact, and the lede is clipped at the fold edge; the serif masthead and restrained palette otherwise read hand-made |
| S2 feels like this brief? | YES | "Conversations that come in with the tide," ferrymen, marine researchers, lighthouse keepers — the Tide brief, not a generic page |

Mobile (375): masthead stacks cleanly (est. line wraps to two lines, wordmark, 3
single-line links), hairline, headline begins immediately — no dead band, no
overflow. Structure gates unaffected.

## Vision judgment — Candidate B (Keystone)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | masthead is centred but the lede and episode list sit left in the measure — off-axis content carries the page |
| G9 equal-whitespace sections | PASS (1280) | nav → letter lede → hairline-separated episode rows: three distinct rhythms |
| G29 abstract background | PASS (1280) | flat rose paper; the cyan/magenta inks are foreground punctuation (wordmark shadow, double rule), the background is one flat colour |
| G42 nav fingerprint | PASS (1280) | centred masthead + 3 links beneath; not the wordmark-left + 4–5-link + button + hairline cluster |
| G43 footer fingerprint | PASS | no footer visible in the fold; no link grid or social row anywhere in the capture |
| G44 hero fit | PASS (1280) | est. line, wordmark, nav, lede, and the first listen link all sit inside the fold |
| G45 decorative-without-purpose | PASS (1280) | the off-register wordmark shadow and two-ink double rule are the page's identity device — motivated by the print/tide idea |
| G38a italic headers | PASS (both) | everything roman |
| G30 icon tells | PASS (both) | no icons, no emoji |
| G46 invented metrics | clean (both) | only episode metadata (№ 14 · 28 min · 12 June 2026) — episode facts, not proof-metrics |
| G47 re-drawn chrome | PASS (both) | bare typographic rows; no window frames |
| G35 highlighter band | PASS (both) | no highlighter band |
| G36 flex align | PASS (1280) | nav links align; no button/text height mismatch |
| S1 looks AI-generated? | NO 0.15 | tells: the two-ink shadow is unusual (reads deliberate), episode-row rhythm is uniform; otherwise reads hand-set |
| S2 feels like this brief? | YES | fortnightly sea-walks, Falmouth chandlery, lighthouse-keeper's ledger — this brief, not a generic page |

Mobile (375): masthead stacks (est. line, wordmark, 3 single-line links), two-ink
rule intact, no overflow. Structure gates unaffected.

## Judgment summary

Vision concurs with the engine: Keystone 48/48 vs Hallmark 42/48, and the vision's
one FAIL (A/G44 — no CTA in the fold, dead band above the headline) is the fold-level
version of Hallmark's own engine findings (G51 wrap guards missing across eight
masthead/hero rules; G54 episode label-beside-heading). Losses published: Hallmark
loses brief 01.
