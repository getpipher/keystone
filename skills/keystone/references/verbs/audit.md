# `keystone audit`

Same engine as Build's Step 7, pointed at someone else's code. Read-only ranked punch list — no edits, no iterate loop. "Point it at your real site, get a computed score the build can't give you."

## What it does

Runs the 52 applicable gates against external HTML/CSS (local files or a live URL). Renders via Playwright + vision model. Outputs a ranked punch list grouped by severity tier. No code emitted, no edits, no iteration loop — audit scores, doesn't fix.

## Build vs Audit

| | Build | Audit |
|---|---|---|
| Engine | identical (`check-gates.mjs` + render + vision) | identical |
| Target | freshly-emitted HTML/CSS | existing HTML/CSS — local path OR live URL |
| Diversification gates (G8, G20, G21, G32, G57) | apply | **excluded** — meaningless externally |
| Stamp gate (G20) | applies | excluded — external code has no Keystone stamp |
| Honest-copy gate (G46) | applies (did we invent?) | applies, **read-only flag** — can't know what user supplied |
| Token gate (G48) | applies (did we improvise?) | applies (does their CSS have inline values outside tokens?) — real audit finding |
| Output | page + pass/fail stamp + log | **report IS the deliverable** — no code emitted, no edits |
| Iteration loop | yes (3+2) | **no** — audit scores, doesn't fix |
| Gate count | 58 | **52** (58 minus 6: G8, G20, G21, G32, G57 + stamp) |

## Two input modes

| Mode | Invocation | How |
|---|---|---|
| Path mode | `keystone audit ./site` or `keystone audit index.html styles.css` | Playwright loads local file(s) via `file://` or temp `http-server` |
| URL mode | `keystone audit https://yourapp.com` | Playwright navigates headless, waits network-idle, extracts rendered DOM + computed styles + reachable CSS. Renders the real site — catches rendering-only gates (hero fit, horizontal scroll, mobile breakpoints) that static code analysis can't. |

URL mode reuses the adversarial-fetch safety posture from the `study` verb: refuse private IPs, localhost, metadata endpoints (`169.254.169.254`), and non-web schemes. Same class of risk, same guardrails.

## The audit report

Ranked punch list, not pass/fail card. Grouped by severity tier, highest-impact first:

| Tier | What | Gates | Ranking signal |
|---|---|---|---|
| **1 · Structural tells** | gates that scream "AI-generated" in 2s | G3, G6, G7, G30, G42, G43, G45, G47, G54 | perceptual auto-fails |
| **2 · Accessibility** | WCAG/legal + real-user harm | G40-41, G26, G27, G15 | contrast, states, reduced-motion, focus ring |
| **3 · Craft** | polish — page works but reads sloppy | G24, G25, G22, G23, G35, G49, G50-53 | spacing, max-width, neutrals, accent, stroke, clickables, mobile |
| **4 · Subjective** | vision-verdict, confidence-weighted | S1-S3, G38a, G46 | never auto-fail alone |

Each FAIL row in the report:
- **Gate #** + name
- **File:line** or selector (e.g. `styles.css:142` or `header.nav`)
- **Evidence value** (actual APCA number, actual `grid-template-columns` string, actual computed pair)
- **Fix suggestion** (one-line concrete correction)
- **Effort** (trivial / low / medium / high — heuristic from files + rules touched)

Tier 4 findings are confidence-weighted and never auto-fail alone — they flag for the user, not gate the page.

## `--fix` deliberately NOT in v1

`keystone audit --fix` blurs into `redesign`. Audit stays read-only in v1 — the user reads the report, then runs `redesign` (v2) or fixes manually. This matches the read-only contract: audit scores, doesn't edit.

## Run it

```bash
keystone audit ./site          # path mode — local files
keystone audit https://app.com # URL mode — live site
```
