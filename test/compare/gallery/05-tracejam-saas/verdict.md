# Verdict · Brief 05 — tracejam SaaS (the widest gap)

> "Build a landing page for Tracejam — a tracing/observability tool for distributed systems. Audience: SREs and platform engineers. Use case: try it / contact sales. Tone: technical."

## Engine (48 gates, deterministic)

| Side | Score | Failed gates | Failing rows |
|---|---|---|---|
| Hallmark | 38/48 | G1, G4, G20, G23, G26, G39, G40, G49, G51, G54 | 37/114 |
| Keystone | **48/48** | none | 47/47 |

Hallmark's real failures — nine design gates, the set's worst: G1 (banned
default faces — `Inter` body, `Space Grotesk` display), G4 (nested cards:
`.panel-row` contains `.panel`), G23 (accent covers 5.2% of viewport), G26
(partial interaction states), G39 (helper text collapses when empty), G40
(contrast pairs, incl. one at APCA Lc 10 — unreadable), G49, G51, G54.
Seventy-seven failing rows total. G20 = stamp metadata.

## Vision (18-question prompt, 1280 + 375)

| Row | Hallmark | Keystone |
|---|---|---|
| S1 | **YES (0.75)** — top tells: (1) the ⌘K command palette renders OPEN at load, floating over and obscuring the hero headline, with the whole page stuck under a gray modal wash — on mobile (375) the palette IS the page; (2) invented five-company logo wall (Harbourline, Mainsail, Ferrous, Tidewater, Packet & Co) = fabricated social proof; (3) generic SaaS blue | NO (0.25) — the mock trace waterfall and terminal snippet are slightly generic; otherwise composed |
| S2 | generic-leaning — could be any dev tool; the palette breaks the "try it / contact sales" path | YES — SRE vocabulary (spans, OTLP, sidecars, self-hosted, one binary) |
| G38a | PASS | PASS |
| G46 | **FLAG** — the logo wall is invented customers (the classic slop pattern this gate exists for) | clean w/ note — trace timings are illustrative product-panel content, not social proof |
| G42 nav fingerprint | **FAIL (vision)** — wordmark-left + 3 links + ⌘K pill + button-right + hairline: the full fingerprint | PASS — 3 links + CTA, no hairline (safe count) |
| G44 hero fit | **FAIL** — headline partially obscured by the open palette | PASS — everything visible |
| Mobile 375 | **broken** — palette covers the page | clean |

Skill picks: Hallmark = Workbench/Cobalt · Keystone = Cobalt/Split Studio.

**Engine winner: Keystone (+10). The thesis brief.** A page whose hero is
unreachable behind a stuck modal is something the author would have caught by
looking at their own render even once. Hallmark's flow never looks; Keystone's
Step 7 cannot skip looking.
