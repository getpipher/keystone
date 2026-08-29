# Verdict · Brief 08 — cohort courses

> "Build a landing page for Cohort — the platform for cohort-based courses. Run live courses with 30 to 500 students. Built for educators, not LMS sales teams. Audience: course operators + indie creators. Tone: warm, salon-room, editorial."

## Engine (48 gates, deterministic)

| Side | Score | Failed gates | Failing rows |
|---|---|---|---|
| Hallmark | 42/48 | G6, G20, G27, G40, G49, G51 | 41/58 |
| Keystone | **48/48** | none | 47/47 |

Hallmark's real failures: **G6 — the centred-everything hero fingerprint
(eyebrow + headline + lede + CTA all on one centred axis)**, G27 (accent
area), G40 (contrast pair), G49 (two-line clickable), G51 (wrap props).
G20 = stamp metadata.

## Vision (18-question prompt, 1280 + 375)

| Row | Hallmark | Keystone |
|---|---|---|
| S1 | NO (0.35) — centred serif hero + card trio is the editorial template's home turf; pretty but predictable | **NO (0.15) — the lowest of the set**: it built a LETTER ("Dear educator," … ⁂ … "The autumn cohorts are forming now"), the anti-template choice for "salon-room" |
| S2 | YES — mirrors the brief's own words ("salon, not a system") | YES — a literal letter to educators; the room, not the system |
| G38a | PASS | PASS w/ note — the italic "Dear educator," salutation is letter-convention body styling, not a display header |
| G46 | clean (30–500 is the brief's own range) | clean |
| G6 centred-everything | **FAIL (vision agrees with engine)** — the full centred stack | n/a — no hero stack |
| G44 hero fit | PASS | n/a — letter format |
| Mobile 375 | clean | clean |

Skill picks: Hallmark = Bento/Newsprint · Keystone = Specimen/Letter.

**Engine winner: Keystone (+6), and the signature result for variety:** given
the same brief, Hallmark reached for the centred-editorial-hero template (and
tripped the exact gate that exists to catch it), while Keystone's rotation
produced a format no LLM defaults to. This is the "two pages from this skill
shouldn't feel like the same site" thesis in miniature.
