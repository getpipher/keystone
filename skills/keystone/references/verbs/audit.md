# `keystone audit`

Same engine as Build's Step 7, pointed at someone else's code. Read-only ranked punch list — no edits, no iterate loop. "Point it at your real site, get a computed score the build can't give you."

## What it does

Runs the **13 shipped gates** (v1; the remaining ~28 deterministic gates land in Plan 1b, bringing the spec's 52) against external HTML/CSS (local files or a live URL). Renders via Playwright + vision model. Outputs a ranked punch list grouped by severity tier. No code emitted, no edits, no iteration loop — audit scores, doesn't fix.

The diversification gates (G8/G32) are **excluded** from audit — they compare against `.keystone/log.json`, which an external site doesn't have (meaningless externally). They show as `N/A` in the report footer.

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
| Path mode | `keystone audit ./site` or `keystone audit index.html styles.css` | Playwright loads the local HTML via `file://`; linked `<link>` stylesheets are read from disk + inline `<style>` concatenated |
| URL mode | `keystone audit https://yourapp.com` | Playwright navigates headless (networkidle), extracts the rendered DOM + computed styles + reachable CSS (Node-fetches each linked stylesheet). Renders the real site — catches rendering-only gates (hero fit, horizontal scroll, mobile breakpoints) that static code analysis can't. |

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

## The deterministic vs vision split

The audit CLI (`engine/audit.mjs`) produces the **Tier 1-3 deterministic punch list** + screenshots. **Tier 4 (subjective) is model-callable, not engine-called** — the engine never calls vision (it's protocol-level, same decision as Build's Step 7). After the CLI runs, call `describe_image` on the screenshots with the 18-question vision-gate prompt (`gates.md` § The vision pass), then append the Tier 4 rows (S1-S3, G38a, G46) to the report. Tier 4 findings are confidence-weighted and never auto-fail alone.

## Run it

```bash
# path mode — directory (finds index.html)
node engine/audit.mjs ./site --out .
# path mode — explicit html file (linked + inline CSS auto-extracted)
node engine/audit.mjs index.html --out .
# URL mode — live site (SSRF guard refuses private IPs + metadata endpoints by default)
node engine/audit.mjs https://yourapp.com --out .
# URL mode — local dev server (escapes the private-IP guard)
node engine/audit.mjs http://localhost:3000 --allow-private --out .
# fast static audit (no Playwright — only the CSS/HTML gates, no contrast/hero/scroll)
node engine/audit.mjs ./site --no-render --out .
```

Flags: `--viewports 1280,375,320,414,768` (default), `--out <dir>` (default `.`), `--no-render`, `--allow-private`.

Writes `keystone-audit-report.md` (the report) + `keystone-audit-report.json` (raw) + `keystone-audit/` (screenshots, `computed.json`, `dom.html`, `viewports.json`) under `--out`. The report is printed to stdout and the file path to stderr.

**Then** run the vision pass: `describe_image` on the `keystone-audit/screenshot-1280.png` + `keystone-audit/screenshot-375.png` with the 18-question prompt, and append the Tier 4 rows to the report. Audit never edits the target — read-only.
