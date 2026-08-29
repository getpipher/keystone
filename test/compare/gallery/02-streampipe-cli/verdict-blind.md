# Brief 02 · verdict — Keystone vs Hallmark

Blind-critique judgment (Candidate A / Candidate B) + harness scoring, recorded per
`docs/superpowers/plans/2026-08-29-5b-brief02-gallery-verdicts.md`. A = `keystone/keystone-render/`,
B = `hallmark/keystone-render/` (mapping by directory provenance, recorded after judging).

Engine: Keystone's check-gates, fresh empty log, 5 viewports — same rules for both sides. Scores are 48 gate numbers (G40/41 share a row). **Losses published.**

| Side | Score | Distinct failed gates |
|---|---|---|
| Keystone | **48/48 (rows 47/47)** | none |
| Hallmark | **44/48 (rows 43/61)** | G20, G26, G40, G49 |

**Winner by engine score: keystone** (delta +4 gates).

## Gate verdicts — blind judgment, both candidates

A: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 flag:
"events 18,204 · 212 ev" — demo-output fiction inside the terminal box, not a page claim |
G47 P | G35 P | G36 P | S1 NO 0.18 | S2 Feels exactly like the brief — a terse phosphor CLI
docs page for SREs, with the command as hero and install/docs one hop away.

B: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 clean: only
"streampipe 0.9.2" versioning visible | G47 P | G35 P | G36 P | S1 YES 0.55: dead right
half-canvas at 1280; no brand, no CTA, generic "Install"/"One pipeline" labels | S2 Matches
the brief's register — technical, terse, install-first — but reads as a bare draft of it
rather than a designed docs landing.

Gate notes where the one-word verdict needs the sentence:
- **G44 (both)**: desktop folds carry the headline and the primary action (A: the `$ RUN`
  pill + install links; B: the install command block — the page has no button CTA).
- **G43 (both)**: the footer is below the fold in both captures; judged from the shipped
  structure — no 4-column fingerprint on either side.
- **G46 (A)**: figures sit inside the demo output box — the command's own stdout
  simulation, not a page proof-claim. Flagged for completeness.
- **G38a (both)**: all type upright mono; zero italics in either render.

## Vision S1 — both sides, same 18-question prompt

| Side | S1 | Confidence | Evidence (1280 + 375) |
|---|---|---|---|
| Keystone | NO | ~0.20 | dark mono register with deep-cobalt hit bar and bordered term blocks — coherent CLI docs |
| Hallmark | NO | ~0.20 | coherent dark phosphor terminal; the large empty right column is the main tell |

Hallmark failed-gate notes: G20 (missing *Keystone* stamp) is a cross-skill convention
difference; G26 (variant buttons missing :hover/:focus-visible/:active/:disabled),
G40 (muted text on dark, APCA Lc < 60), and G49 (two-line clickable text) are craft
failures the moat exists to catch.

Rendered at 1280/375/320/414/768 from the committed candidates; screenshots in
`hallmark/keystone-render/` and `keystone/keystone-render/`. Below-fold sections
(nav-adjacent bands, footer) are judged from the visible rhythm plus the shipped
structure — the captures are viewport-height.

## Engine summary (appended post-hoc, from verdict.json)

| Side | Score | Distinct failed gates |
|---|---|---|
| Keystone | **48/48 (rows 47/47)** | none |
| Hallmark | **44/48 (rows 43/61)** | G20, G26, G40, G49 |

**Winner by engine score: keystone (+4 gates).** The blind S1 YES 0.55 on the
Hallmark side stands — stricter than any summary pass would have produced; kept
verbatim per the honesty clause.
