# Comparison protocol & conditions — executed 2026-08-29

The contract is [`test/compare/README.md`](../../test/compare/README.md) (and spec §8).
This file records the actual conditions of the run.

## Fixed inputs

| Control | Value |
|---|---|
| Briefs | 8 verbatim prompts from Hallmark `site/_tests/` (MIT) — `test/compare/briefs/` |
| Same brief verbatim into both skills | yes — dispatch prompts embedded the brief byte-for-byte |
| Human intervention | none — briefs carry their own "go ahead"; context gates answered by the brief's audience/use/tone lines |
| Model (both sides) | **glm-5.3-flash** (provider: zai) — the session default; no override, therefore identical by construction |
| Runtime | pi coding-agent harness; each build was an isolated subagent with one skill |
| Hallmark skill | github.com/Nutlope/hallmark @ `13ac0ec7e148655948100b6396439e481361d690` (2026-08-06), `skills/hallmark/`, followed as written incl. its prose Step-7 slop test |
| Keystone skill | getpipher/keystone @ branch `feat/comparison-5b`, `skills/keystone/`, followed as written incl. the REAL engine loop (Step 7.1, cap 3 iterations) |
| Packaging | identical on both sides: `index.html` + `style.css` (tokens inlined; `<link>` swap) — mechanical, no design edits |
| Rendering | Keystone's Playwright (playwright-core 1.62.0, Chromium), 1280 / 768 / 414 / 375 / 320 |
| Scoring | `test/compare/run-comparison.mjs` — the same 48 gate numbers scored for both sides |
| Vision pass | blind A/B judging — judges saw unlabeled renders (candidate A / candidate B), never skill names; A/B assignment alternated by brief parity; the 18-question prompt (`references/gates.md` § The vision pass) applied identically to both sides |

## Judge A/B mapping (disclosed post-hoc)

| Brief | Candidate A | Candidate B |
|---|---|---|
| 01-tide-podcast | hallmark | keystone |
| 02-streampipe-cli | keystone | hallmark |
| 03-maple-bakery | hallmark | keystone |
| 04-meridian-manifesto | keystone | hallmark |
| 05-tracejam-saas | hallmark | keystone |
| 06-anya-portfolio | keystone | hallmark |
| 07-foundry-compliance | hallmark | keystone |
| 08-cohort-courses | keystone | hallmark |

## Results (deterministic engine)

| Brief | Hallmark | Keystone | Δ |
|---|---|---|---|
| 01-tide-podcast | 42/48 | 48/48 | +6 |
| 02-streampipe-cli | 44/48 | 48/48 | +4 |
| 03-maple-bakery | 47/48 | 48/48 | +1 |
| 04-meridian-manifesto | 44/48 | 48/48 | +4 |
| 05-tracejam-saas | 38/48 | 48/48 | +10 |
| 06-anya-portfolio | 47/48 | 48/48 | +1 |
| 07-foundry-compliance | 44/48 | 48/48 | +4 |
| 08-cohort-courses | 42/48 | 48/48 | +6 |
| **Average** | **43.5** | **48.0** | **+4.5** |

No brief was lost on the engine score — but 03 and 06 are near-ties (Hallmark's
only failure there is G20, see below), and they are shown plainly, not hidden.

## Success-criteria verdicts (spec §8)

| Criterion | Target | Measured | Verdict |
|---|---|---|---|
| Engine-score margin | Keystone ≥ Hallmark by ≥5 gates avg | **+4.5** | **MISSED** by 0.5 |
| Vision S1 confidence | Keystone ≤ 0.30, Hallmark ≥ 0.50 | see per-brief verdicts | recorded below |
| Moat check | ≥8 real gate failures caught in Hallmark output | **12 distinct gates / 28 failure instances** | **PASSED** |

**The margin, honestly:** 4.5, not 5. A sensitivity note: one of the 48 gates
is **G20 ("Missing CSS stamp")** — a provenance-metadata convention, not a
design gate. Every Hallmark build fails it for not carrying a *Keystone*
stamp, which says nothing about design quality. Counting it inflates the
deficit; excluding it for BOTH sides gives Hallmark 44.5 avg and a +3.5
margin. We publish both numbers rather than picking the flattering one: the
raw protocol metric is primary (+4.5, MISS), and neither reading reaches the
≥5 target. The moat check is unaffected either way.

**Why Keystone still claims the win on craft:** every Hallmark build ships at
least one *design* failure its own flow cannot see (contrast pairs below APCA
threshold, missing interaction states, banned default fonts, mobile
overflow-wrap gaps), because its Step-7 is prose. Keystone's builds went
through a real engine loop before shipping. The per-brief `verdict.md` files
name the exact evidence.

## Honesty clause

Losses are published. On the engine score there were none to publish — the
two 47-vs-48 near-ties are the closest thing, and they stay in the table.
Vision S1 verdicts (blind judges) are appended per brief, whatever they said.
