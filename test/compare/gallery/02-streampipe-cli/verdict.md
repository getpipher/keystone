# Verdict · Brief 02 — streampipe CLI (docs landing, Terminal)

> "Make a docs landing for an open-source CLI called Streampipe. It does stream parsing for log/event pipelines. Use the Terminal theme. Audience: backend developers. Use case: install the tool and read the docs. Tone: technical, terse."

## Engine (48 gates, deterministic)

| Side | Score | Failed gates | Failing rows |
|---|---|---|---|
| Hallmark | 44/48 | G20, G26, G40, G49 | 43/61 |
| Keystone | **48/48** | none | 47/47 |

Hallmark's real failures: G26 (`.btn` missing `:hover`/`:active`), G40 (a
contrast pair below floor), G49 (clickable text wraps to two lines at a
mobile width). G20 = stamp metadata (PROTOCOL.md).

## Vision (18-question prompt, 1280 + 375)

| Row | Hallmark | Keystone |
|---|---|---|
| S1 | NO (0.35) — dark-terminal is a genre default; the empty right half of the page reads as unbalanced rather than austere | NO (0.30) — the green radial glow and `$ RUN` pill are the most decorative moves on the page |
| S2 | YES — terse, install-first, correct vocabulary | YES — docs index + run panel; verb-first |
| G38a | PASS | PASS |
| G46 | clean (version 0.9.2 self-declared) | clean w/ note — `events 18,204 / 212 ev` is illustrative command output in a demo panel, not marketing claims |
| G47 re-drawn chrome | PASS — plain typographic `<pre>` blocks, no fake window chrome | PASS — ASCII summary box is the terminal genre itself, not fake IDE chrome |
| G44 hero fit | PASS (headline + lede + Install visible) | PASS (headline + output panel + RUN visible) |
| Mobile 375 | clean | clean |

Skill picks: both sides honoured the pinned Terminal theme (Hallmark Index-First, Keystone Terminal/Index-First).

**Engine winner: Keystone (+4).** Same theme, same genre — the separation is
state coverage (G26), one contrast pair (G40), and a two-line clickable (G49):
exactly the failures prose self-grading doesn't catch.
