# Verdict · Brief 01 — tide podcast

> "build me a landing page for my indie podcast called Tide. just go ahead, you pick."

## Engine (48 gates, deterministic)

| Side | Score | Failed gates | Failing rows |
|---|---|---|---|
| Hallmark | 42/48 | G18, G20, G26, G40, G51, G54 | 41/57 |
| Keystone | **48/48** | none | 47/47 |

Hallmark's real failures: G26 (button missing `:hover`/`:active` states), G40
(a contrast pair under the APCA floor), G51 (a clamp/display rule without
`overflow-wrap: anywhere; min-width: 0`), G54, G18. G20 is the stamp-metadata
gate (see PROTOCOL.md — excluded from the sensitivity reading).

## Vision (18-question prompt, 1280 + 375)

| Row | Hallmark | Keystone |
|---|---|---|
| S1 "looks AI-generated?" | NO (0.25) — centred masthead + hairline double-rule is template-adjacent; otherwise composed | NO (0.20) — overprint wordmark is a deliberate move; mono underlines slightly trendy |
| S2 feels like this brief? | YES — unhurried maritime editorial ("ferrymen, marine researchers, lighthouse keepers") | YES — riso-print zine voice, Falmouth lore, episode ledger |
| G38a italic headers | PASS | PASS |
| G46 invented metrics | clean ("EST. 2023", self-declared cadence) | clean (episode numbers/durations, internally consistent) |
| G44 hero fit (1280) | **FAIL** — lede visible, no CTA visible without scrolling | PASS (masthead + intro + episode list + listen links in fold) |
| Mobile 375 | clean wrap, no overflow | clean wrap, no overflow |

Skill picks: Hallmark = editorial / Almanac / Marquee Hero · Keystone = Riso / Long Document.

**Engine winner: Keystone (+6).** Both pages are genuinely good; Hallmark's
defects are the invisible kind its prose Step-7 can't see (state coverage,
contrast pair, wrap props).
