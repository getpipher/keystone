# Brief 02 · streampipe-cli — blind-critique verdicts

Two candidate renders, judged blind (Candidate A / Candidate B) from the five-viewport
renders in this directory. A = `keystone/keystone-render/`, B = `hallmark/keystone-render/`
(mapping by directory provenance, recorded after judging).

Brief (verbatim): "Make a docs landing for an open-source CLI called Streampipe. It does
stream parsing for log/event pipelines. Use the Terminal theme. Audience: backend
developers. Use case: install the tool and read the docs. Tone: technical, terse."

## Gate verdicts

A: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 flag:
"events 18,204 · 212 ev" — demo-output fiction inside the terminal box, not a page claim |
G47 P | G35 P | G36 P | S1 NO 0.18 | S2 Feels exactly like the brief — a terse phosphor CLI
docs page for SREs, with the command as hero and install/docs one hop away.

B: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 clean: only
"streampipe 0.9.2" versioning visible | G47 P | G35 P | G36 P | S1 YES 0.55: dead right
half-canvas at 1280; no brand, no CTA, generic "Install"/"One pipeline" labels | S2 Matches
the brief's register — technical, terse, install-first — but reads as a bare draft of it
rather than a designed docs landing.

## Gate notes (per gate, where the one-word verdict needs the sentence)

- **G44 (both)**: desktop folds carry eyebrow/nav, headline, lede, and the primary action
  (A: the `$ RUN` pill + install links; B: the install command block) — nothing critical
  below the fold.
- **G43 (both)**: the footer is below the fold in both captures; judged from the shipped
  structure (A: single-line credits; B: no footer visible in the captured region) — no
  4-column fingerprint on either side.
- **G46 (A)**: all figures ("events 18,204", "212 ev") sit inside the demo output box — the
  command's own stdout simulation, not a page proof-claim. Flagged for completeness.
- **G46 (B)**: "streampipe 0.9.2" is product versioning; clean.
- **G38a (both)**: all type upright mono/serif; zero italics in either render.
- **S1 (A)**: phosphor-on-black with mono-in-prose and real service names reads authored;
  closest tell is the demo box's neat table.
- **S1 (B)**: reads as an unfinished draft more than a designed page — the empty right
  half-canvas at 1280 is the strongest single tell.

## Official engine scores (from verdict.json — the moat check)

| Side | Rows | Score /48 | Failed gates |
|---|---|---|---|
| keystone (A) | 47/47 | **48** | none |
| hallmark (B) | 43/61 | **44** | 20 (no Keystone stamp — convention), 26 (missing :disabled + :hover on variant buttons), 40 (muted text on dark, Lc < 60), 49 (two-line clickable text) |

G20 is a cross-skill convention difference (Hallmark ships its own stamp format); G26/40/49
are substantive craft failures the engine caught in the Hallmark output — the moat working
as designed. Losses published per README.
