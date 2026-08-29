# Verdict · Brief 04 — meridian manifesto

> "Make me a manifesto for my new studio called Meridian. We work on environmental products. No flashy stuff."

## Engine (48 gates, deterministic)

| Side | Score | Failed gates | Failing rows |
|---|---|---|---|
| Hallmark | 44/48 | G20, G27, G49, G51 | 43/48 |
| Keystone | **48/48** | none | 47/47 |

Hallmark's real failures: G27 (accent area over budget), G49 (two-line
clickable at mobile width), G51 (display rule missing wrap props). G20 = stamp
metadata.

## Vision (18-question prompt, 1280 + 375)

| Row | Hallmark | Keystone |
|---|---|---|
| S1 | **YES (0.55)** — top tells: (1) the mint highlighter band occludes the lower half of "KEEP." — reads as a rendering defect the author never saw; (2) serif-caps-on-dark manifesto trope; (3) italic accent phrase ("a decade.") | NO (0.30) — condensed-caps manifesto is also a trope, but the numbered points (01./02.) and scale discipline read deliberate |
| S2 | YES — dark-green environmental register fits "no flashy stuff" | YES — brutalist type manifesto; loud but not flashy (no motion/ornament) |
| G38a | PASS (headline roman; italic is body-copy emphasis, allowed) | PASS |
| G46 | clean | clean |
| G35 highlighter position | **FAIL (vision)** — the band sits over the glyph lower half, masking rather than highlighting | n/a — no highlighter |
| G44 hero fit | PASS ("Write to us →" visible) | PASS ("Contact →" visible) |
| Mobile 375 | clean wrap | clean wrap |

Skill picks: Hallmark = Manifesto/Garden · Keystone = Manifesto.

**Engine winner: Keystone (+4), and the vision pass agrees here:** Hallmark's
highlighter masking is exactly the failure mode of a skill whose Step-7 runs
"in your head" — the model never saw the render, so a visible defect shipped.
Keystone's loop renders before it claims.
