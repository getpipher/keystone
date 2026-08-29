# Brief 02 · streampipe-cli — blind vision judgment

Brief (verbatim): "Make a docs landing for an open-source CLI called Streampipe. It does
stream parsing for log/event pipelines. Use the Terminal theme. Audience: backend
developers. Use case: install the tool and read the docs. Tone: technical, terse."
Judged from the fold captures: hallmark/keystone-render/screenshot-{1280,375}.png and
keystone/keystone-render/screenshot-{1280,375}.png (18-question prompt, gates.md
§ The vision pass). Engine rows below are from verdict.json — recorded separately,
not judged here. Candidate labels are blind-judging order; the A→Keystone /
B→Hallmark mapping is by directory provenance, recorded after judging.

## Engine scores (harness, for context)

- Keystone — 47/47 rows · **48/48** · no failed gate numbers
- Hallmark — 43/61 rows · **44/48** · failed gates: 20, 26, 40, 49

## Vision judgment — Candidate A (Keystone)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | two-column split — copy left, waterfall right; nothing stacked on a centred axis |
| G9 equal-whitespace sections | PASS (1280) | rule-free nav → glowing hero split → darker intro band → hairline-separated index rows: distinct rhythms |
| G29 abstract background | PASS (1280) | near-black field with one phosphor-green accent and a fixed top-left bloom; no mesh, no second accent |
| G42 nav fingerprint | PASS (1280) | prompt-line nav — `> streampipe --docs --install --gh` — no wordmark-left + 4–5-link + button + hairline cluster |
| G43 footer fingerprint | PASS | no footer visible in the fold; no link grid or social row anywhere in the capture |
| G44 hero fit | PASS (1280) | command line, output box, and `$ RUN` pill all sit inside the top ~460px of the fold |
| G45 decorative-without-purpose | PASS (1280) | the phosphor bloom and output box demonstrate the product — the command is the demo |
| G38a italic headers | PASS (both) | everything upright mono |
| G30 icon tells | PASS (both) | no icons, no emoji; `>` and `$` are text glyphs |
| G46 invented metrics | flag (both) | "events 18,204 · 212 ev" inside the demo output box — the command's own stdout simulation, not a page proof-claim; flagged for completeness |
| G47 re-drawn chrome | PASS (both) | the output box is a hairline-bordered `pre` — no window frame, no traffic lights |
| G35 highlighter band | PASS (both) | no highlighter bands |
| G36 flex align | PASS (1280) | nav prompt text and flags align; the pill sits alone, no text/height mismatch |
| S1 looks AI-generated? | NO 0.18 | phosphor-on-black, mono-in-prose, real service names and terse flags read authored; closest tells are the demo box's neat table and the quiet right half at 1280 |
| S2 feels like this brief? | YES | terse phosphor CLI docs for SREs — install and docs are one hop from the fold, exactly the brief's two uses |

Mobile (375): prompt-line nav fits; the command wraps cleanly inside its measure
(`access.log --` / `format ndjson`); the output box follows; no horizontal
overflow. Structure gates unaffected.

## Vision judgment — Candidate B (Hallmark)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS (1280) | left-aligned headline block with green `$` sigil — no centred stack |
| G9 equal-whitespace sections | PASS (1280) | headline block → Install section → One pipeline section: near-identical label+block+hairline rhythm, but content weight differs (5-line block vs 1-line command) — borderline, passed on the hairline dividers and differing density |
| G29 abstract background | PASS (1280) | flat near-black; single green accent token; no mesh |
| G42 nav fingerprint | PASS (1280) | prompt-line nav with 3 flag links and no button — not the wordmark-left + 4–5-link + button + hairline cluster |
| G43 footer fingerprint | PASS | no footer visible in the fold; no link grid or social row anywhere in the capture |
| G44 hero fit | PASS (1280) | headline, lede, and the install command block (the page's primary action for this use case) all inside the fold; no button CTA exists anywhere on the page |
| G45 decorative-without-purpose | PASS (1280) | nothing decorative at all — no ornament to motivate |
| G38a italic headers | PASS (both) | everything upright mono |
| G30 icon tells | PASS (both) | no icons, no emoji |
| G46 invented metrics | clean (both) | only "streampipe 0.9.2" product versioning visible; no counts, percentages, or speedup claims |
| G47 re-drawn chrome | PASS (both) | bare text blocks and hairlines; no window frames |
| G35 highlighter band | PASS (both) | no highlighter bands |
| G36 flex align | PASS (1280) | no flex rows mixing buttons with text |
| S1 looks AI-generated? | YES 0.55 | tells: the entire right half-canvas is empty at 1280 while content hugs the left 620px; no brand mark, no CTA, generic "Install"/"One pipeline" labels — reads as an unfinished draft more than a designed page |
| S2 feels like this brief? | YES | technical, terse, install-first — it matches the register, but reads as a bare draft of a CLI docs page rather than a designed one |

Mobile (375): prompt-line nav fits; headline wraps cleanly; lede begins in the
fold; no horizontal overflow. Structure gates unaffected.

## Engine scores — the moat check

Official harness rows from verdict.json ( losses published per README):

| Side | Rows | Score /48 | Failed gates |
|---|---|---|---|
| keystone (A) | 47/47 | **48** | none |
| hallmark (B) | 43/61 | **44** | 20 (Hallmark stamp vs Keystone stamp — convention), 26 (variant buttons missing :hover/:focus-visible/:active/:disabled), 40 (muted text on dark, APCA Lc < 60), 49 (two-line clickable text) |

G20 is a cross-skill convention difference; G26/40/49 are substantive craft
failures the engine caught in the Hallmark output — the moat working as designed.
