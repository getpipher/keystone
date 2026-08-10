# Plan 4 — The audit verb

**Project:** @getpipher/keystone
**Branch:** `feat/audit-verb-4` (off `master` `92b28f0`)
**Date:** 2026-08-04
**Predecessor:** Plan 3 (build-flow integration, PR #4 merged)
**Execution model:** subagent-driven-development — glm-5.2:cloud implementers for mechanical/code tasks; controller (CIPHER) authors contract-surface prose + fiddly TS directly. SCOPE GUARD on every dispatch. Controller verifies every reviewer finding against the actual file before acting. `KEYSTONE_RENDER_TEST=1` for any render-touching task.

---

## Goal

Ship `keystone audit <target>` — the read-only ranked punch-list verb that points the now-wired engine at **external** code (a local path or a live URL). Same engine as Build's Step 7, no iterate loop, no `--fix`. The report IS the deliverable. This is the user-facing differentiator vs Hallmark: a *computed* score on someone else's site, not an imagined one.

## Locked constraints (do not re-litigate)

- pi-first (skill + extension in one `@getpipher/keystone` package). MIT + NOTICE (shipped).
- **Do NOT change the Plan-3 engine wiring** (the `--render`/`--viewports`/`--log` flags, `orchestrate()` API, build-flow Step 7). Additive only.
- **Do NOT change the 8 deep theme specs** (Plan 2b, frozen).
- 2-space indent, trailing newline at EOF, no AI attribution. Author `RECTOR <rector@rectorspace.com>`, GPG `BF47B9DC1FA320FA`.
- One commit per logical unit. Open PR #5, merge `--merge --delete-branch`. Branch + remote deletes after merge.
- v1 audit runs the **13 shipped gates** (not the spec's 52 — those land in Plan 1b). The report honestly frames the count. `--fix` deliberately NOT in v1.

## Design decisions (resolved here — no separate brainstorm needed; spec §6 + audit.md lock ~90%)

### D1 — Both modes flow through Playwright; render extension gets ONE additive optional field

| Mode | Target resolution | Playwright goto | CSS source | HTML source |
|---|---|---|---|---|
| **Path** (file or dir) | resolve to an HTML file path | `pathToFileURL(htmlPath)` (existing `file://` path, unchanged) | read linked `<link rel=stylesheet>` files from disk + concatenate inline `<style>` blocks | read the HTML file from disk |
| **URL** | adversarial-safety check → URL as-is | `page.goto(url, {waitUntil:"networkidle"})` (new `url` field) | Node `fetch` each linked stylesheet URL + concatenate inline `<style>` from DOM snapshot | DOM snapshot (`page.content()`) |

The render extension (`extensions/render.ts`) gains exactly ONE optional input field: `url?: string`. If set, `page.goto(url)`; else fall back to `pathToFileURL(htmlPath)` (the Plan-3 build path, byte-identical). No existing build-flow behavior changes.

**Why no temp http-server:** `file://` with a directory's `index.html` resolves relative `href="styles.css"` → `file:///dir/styles.css` correctly. So path-mode-dir works through the existing `htmlPath` path with zero new infra. (A temp http-server was considered and rejected — extra moving parts, no benefit over `file://` for local audit.)

### D2 — URL-mode reachable CSS extraction

Gates that parse CSS (G1, G2, G3, G7, G22, G26, G48, G50, G54) need raw CSS **text** (selectors + declarations), not computed styles. For URL mode:

1. After Playwright renders, take the DOM snapshot (`page.content()`).
2. Parse it for `<link rel="stylesheet" href>` → resolve each href against the page URL.
3. Node `fetch` each stylesheet URL (Node 20+ global fetch; same user-agent, no cookies in v1).
4. Concatenate fetched CSS + inline `<style>` block contents (extracted from the snapshot).
5. If a fetch fails (CORS/404/network), skip that sheet and record a warning row in the report ("G0 stylesheet unreachable: <url>"), don't crash.

This gives CSS-parsing gates real text + real source lines (line numbers within each fetched sheet; `file` = the stylesheet URL).

### D3 — Adversarial-fetch safety posture (SSRF guard) — defined fresh (study verb doesn't exist yet)

URL mode refuses, before any network call:

| Block | Examples |
|---|---|
| non-http(s) schemes | `file:`, `ftp:`, `gopher:`, `data:`, `blob:`, `dict:`, `ws:` |
| loopback / private / link-local IPs | `127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16` (link-local + cloud metadata `169.254.169.254`), `::1`, `fc00::/7` (unique-local), `fe80::/10` (link-local v6) |
| localhost hostnames | `localhost`, `*.localhost` |
| `metadata.*` hostnames (defence-in-depth) | `metadata.google.internal`, `metadata`, `metadata.aws.internal` |

Implementation: `dns.lookup` the hostname → for each resolved address, `ipaddr`-check against the blocklist (no new deps — use `node:net` `isIP` + manual CIDR checks, or a tiny inline helper). Refuse with a clear error before Playwright launches. **Post-navigation re-check:** after `page.goto`, compare `page.url()`'s host against the blocklist again (catches redirects to internal hosts); if blocked, abort + report. v1 limitation: redirect chains that hop through internal then back out are not per-hop audited — documented as a known issue.

`--allow-private` escape hatch (default false) for auditing a local dev server (`http://localhost:3000`). Off by default so the verb is safe against copy-pasted URLs.

### D4 — Audit-mode gate filter (excludes meaningless-externally gates)

Per spec §6 / audit.md, audit excludes diversification + stamp gates: **G8, G20, G21, G32, G57, stamp**. Of the 13 implemented, only **G8/32** is relevant (G20/G21/G57 + stamp aren't implemented yet). The audit CLI passes an `excludedGates` set to a new `orchestrate(ctx, { exclude })` overload — OR, cleaner, the audit CLI runs `orchestrate` then filters `results` by the exclude set. **Decision: filter post-orchestrate** — keeps `orchestrate()` signature unchanged (Plan-3 frozen) and the exclude list lives in audit code where it belongs. Excluded gates show as `N/A` in the report footer.

### D5 — Severity tier map (covers all 13 shipped gates)

From spec §6 tiers, mapped onto the 13 implemented gates (unimplemented gates listed for completeness, marked `(Plan 1b)`):

| Tier | Gates (implemented) | Gates (not yet) |
|---|---|---|
| **1 · Structural tells** | G1, G2, G3, G7, G54 | G6, G30, G42, G43, G45, G47 (Plan 1b / vision) |
| **2 · Accessibility** | G26, G40-41 | G15, G27 (Plan 1b) |
| **3 · Craft** | G22, G34, G44, G48, G50 | G24, G25, G23, G35, G49, G50-53 (Plan 1b) |
| **4 · Subjective** | *(vision pass — model-callable, not in the deterministic report)* | S1-S3, G38a, G46 (vision) |
| **Excluded** | G8/32 (diversification) | G20, G21, G57, stamp |

G34 (horizontal scroll) lands in Tier 3 (craft — page works but reads sloppy on mobile), not Tier 2 (it's a polish bug, not WCAG). G44 (hero fit) likewise Tier 3. G48 (token improvisation) Tier 3 (craft — inline values outside tokens).

### D6 — Effort heuristic (v1 lookup table)

Each gate gets a default effort from a small lookup (refined in Plan 1b when more gates land). v1 values:

| Effort | Gates |
|---|---|
| trivial | G22, G34, G50 |
| low | G1, G2, G7, G26, G48, G54 |
| medium | G3, G40-41 |
| high | G44 (hero re-layout) |

Effort is per-gate (not per-finding) in v1. A gate with 4 failing rows still shows one effort. Keep simple.

### D7 — Vision pass stays protocol-level (Plan-3 decision, unchanged)

The audit CLI produces the **deterministic Tier 1-3 punch list** + screenshots. The **vision pass (Tier 4) is model-callable** — the SKILL.md audit flow instructs the model to run the CLI, then `describe_image` on the screenshots with the 18-question prompt, then append Tier 4 rows to the report. The engine does NOT call vision. No CI vision test (no API key); structural lint asserts the audit.md flow describes this split.

### D8 — Report output

- **stdout:** the full ranked punch-list markdown (Tier 1-3 grouped, highest-impact first; footer with counts + N/A + screenshots list + raw-data path).
- **`--out <dir>` (default `.`):** writes `keystone-audit-report.md` (the same markdown) + `keystone-audit-report.json` (raw `{ results, pass, fail, total, excluded, target, tiers, timestamp }`) + the render outputs (screenshots, `computed.json`, `dom.html`, `viewports.json`) under `<out>/keystone-audit/`.
- Matches the spec §6 report layout verbatim (the example block is the golden output shape).

### D9 — Malformed-CSS hardening (Task 1, folded in)

Wrap the detector loop in `orchestrate()` with try/catch: if a detector throws (e.g. postcss `CssSyntaxError`), emit a synthetic `GateResult { gate: 0, name: "parse-error", pass: false, evidence: <msg>, fix: "fix the CSS syntax error", file, line }` and continue — don't crash. Protects BOTH build and audit. (The Plan-3 carry-forward.)

---

## Architecture

```
engine/audit.mjs              (NEW) — CLI entry: arg parse, target detect, mode dispatch,
                                          exclude filter, tier grouping, report format, write out.
engine/audit-report.mjs       (NEW) — tier map + effort table + formatReport(summary, target) → markdown
engine/safety.mjs             (NEW) — URL safety check (scheme + IP/hostname blocklist + --allow-private)
engine/orchestrate.mjs        (MOD) — try/catch around detector loop → synthetic parse-error result
extensions/render.ts          (MOD) — additive optional `url?: string` field; build path unchanged
skills/keystone/references/verbs/audit.md  (MOD) — wire to the real CLI + the Tier-4 vision split
skills/keystone/references/engine.md       (MOD) — document the audit path
skills/keystone/SKILL.md                    (MOD) — audit section points at the real CLI
test/engine/audit.test.mjs              (NEW) — tier/effort map, report formatter, exclude filter
test/engine/safety.test.mjs             (NEW) — URL safety blocklist (unit, no network)
test/engine/orchestrate.test.mjs        (MOD) — malformed-CSS → synthetic fail (new case)
test/extensions/render.test.mjs         (MOD) — url-mode render (env-guarded, KEYSTONE_RENDER_TEST=1)
test/lint-skill.mjs                     (MOD) — audit.md wired to real CLI; tier map covers 13 gates
test/fixtures/audit-site/               (NEW) — index.html + styles.css (a deliberately sloppy page)
```

## CLI shape

```bash
# path mode — single file
node engine/audit.mjs index.html
# path mode — explicit html + css
node engine/audit.mjs index.html styles.css
# path mode — directory (finds index.html)
node engine/audit.mjs ./site
# URL mode
node engine/audit.mjs https://yourapp.com
# URL mode — local dev server (escapes the private-IP guard)
node engine/audit.mjs http://localhost:3000 --allow-private
# flags
node engine/audit.mjs <target> [--viewports 1280,375,320,414,768] [--out .] [--no-render] [--allow-private]
```

`--no-render` runs only the 9 CSS/HTML-only gates (no Playwright) — fast static audit. Default (`--render`) runs the full 13.

---

## Task breakdown (TDD, subagent-driven)

**T1 — Malformed-CSS hardening (orchestrate try/catch).** MOD `engine/orchestrate.mjs`: wrap `d(localCtx)` in try/catch, push synthetic `{gate:0, name:"parse-error", pass:false, evidence:<err.message>, fix:"fix the CSS syntax error", file, line}`. Add test in `test/engine/orchestrate.test.mjs`: a gate that throws → one synthetic fail in results, loop continues. *(controller: small + fiddly — author directly.)*

**T2 — Render extension: additive `url` field.** MOD `extensions/render.ts`: `url?: string`; `const target = input.url ?? pathToFileURL(input.htmlPath).href`. Build path (no `url`) byte-identical. Add env-guarded render test (`KEYSTONE_RENDER_TEST=1`) for url mode (point at a `file://` URL of a fixture — keeps it offline + deterministic). *(dispatch glm-5.2:cloud, maxTurns 18.)*

**T3 — URL safety module (`engine/safety.mjs`).** NEW. `assertSafeUrl(url, { allowPrivate })` → throws on blocked scheme/IP/hostname; resolves hostname via `dns.lookup`, checks each IP against inline CIDR blocklist (no deps — `node:net` isIP + a `privateCidrs` array + `inCidr` helper). Add `test/engine/safety.test.mjs` (unit, no network — mock dns.lookup via dependency injection or test the `isBlockedIp`/`isBlockedHost` pure helpers directly). *(dispatch glm-5.2:cloud, maxTurns 20. SCOPE GUARD.)*

**T4 — Audit CLI scaffold + path mode (`engine/audit.mjs`).** NEW. Arg parse; target detection (URL if `^https?://`, else path); path mode: resolve HTML file (file or dir→`index.html`), extract CSS (linked `<link>` files from disk + inline `<style>`), call render (existing `htmlPath`) + orchestrate, filter excluded gates (G8/32). Write report + JSON + render outputs. Add `test/engine/audit.test.mjs` with the `test/fixtures/audit-site/` fixture (path mode, no render — `--no-render` path, deterministic). *(dispatch glm-5.2:cloud, maxTurns 24. SCOPE GUARD.)*

**T5 — URL mode + reachable-CSS fetch.** MOD `engine/audit.mjs`: URL branch — `assertSafeUrl` → render with `url` → Node `fetch` linked stylesheets + inline `<style>` from DOM snapshot → orchestrate. Post-navigation re-check of `page.url()`. Unreachable-sheet warning row. Extend `test/engine/audit.test.mjs` (URL-mode CSS-extraction logic as a pure unit test against a parsed-HTML fixture — no network). *(dispatch glm-5.2:cloud, maxTurns 24. SCOPE GUARD.)*

**T6 — Tier map + effort + report formatter (`engine/audit-report.mjs`).** NEW. `TIER_MAP` (gate→tier), `EFFORT_MAP` (gate→effort), `formatReport({summary, target, timestamp})` → markdown string matching the spec §6 example shape. Group FAIL rows by tier (1→3), each row: gate # + name, file:line OR selector, evidence, fix, effort. Footer: counts + N/A list + screenshots list + raw-data path. Tier 4 note ("run `describe_image` for the vision pass"). Add snapshot-style test in `test/engine/audit.test.mjs` (formatted output for a fixed result set). *(dispatch glm-5.2:cloud, maxTurns 22. SCOPE GUARD.)*

**T7 — Wire audit.md + engine.md + SKILL.md to the real CLI.** MOD `skills/keystone/references/verbs/audit.md`: replace the structural-only "Run it" stub with the real CLI invocations + the Tier-4 vision split (run CLI → `describe_image` on screenshots → append Tier 4). MOD `engine.md`: add `## The audit path` section. MOD `SKILL.md` audit section: point at the real CLI. *(controller: prose — author directly.)*

**T8 — Lint assertions.** MOD `test/lint-skill.mjs`: audit.md references `node engine/audit.mjs`; tier map covers all 13 implemented gates; audit.md describes the Tier-4 vision split; engine.md has the audit-path section. *(controller: small — author directly.)*

**T9 — Dogfood.** Audit a real sloppy landing page — path mode (the fixture + a real cloned Hallmark example) AND URL mode (a live AI-generated site). Capture screenshots, run `describe_image` with the 18-question prompt, produce a real report. Record findings + any engine rough edges. *(controller + glm-5.2 vision via describe_image.)*

**T10 — Final whole-branch review.** Dispatch glm-5.2:cloud reviewer over the full branch (maxTurns 26+). Controller verifies every finding against the file. Merge-ready = no Critical/Important. *(dispatch glm-5.2:cloud, maxTurns 26. SCOPE GUARD.)*

**T11 — PR #5 + merge.** Push `feat/audit-verb-4`, open PR #5, `gh pr merge --merge --delete-branch`, delete local branch. Update handoff for Plan 5 / 1b. *(controller.)*

## Test strategy

- **Unit (no network):** safety blocklist pure helpers; tier/effort map completeness (all 13 gates mapped); report formatter snapshot; orchestrate malformed-CSS; audit path-mode CSS extraction (fixture); audit URL-mode CSS extraction (parsed-HTML fixture, no fetch).
- **Env-guarded render:** `KEYSTONE_RENDER_TEST=1` url-mode render test (offline `file://` URL of a fixture).
- **Lint:** 96 existing + new audit assertions (target ~104).
- **Dogfood:** real path + URL audits (evidence, not assertion).

Green bar = engine (60 + new audit/safety/orchestrate cases) + render (2 + 1 url) + lint (~104). Exact count finalized after implementation.

## Acceptance criteria

- [ ] `node engine/audit.mjs test/fixtures/audit-site/` produces a ranked punch-list report with real file:line evidence + the fixture's known fails (G3, G7, G40-41, etc.).
- [ ] `node engine/audit.mjs <live-url>` produces a report with selector evidence + fetched-CSS file:line evidence (or unreachable-sheet warnings), SSRF guard refuses `http://169.254.169.254` + `http://localhost` (without `--allow-private`).
- [ ] Malformed CSS → synthetic `parse-error` fail row, no crash.
- [ ] Build flow (`check-gates.mjs --html … --css … --render`) unchanged — Plan-3 tests still green.
- [ ] `npm test` green (engine + render + lint). `KEYSTONE_RENDER_TEST=1` render test green.
- [ ] audit.md + engine.md + SKILL.md wired to the real CLI; lint asserts it.
- [ ] PR #5 merged to master, GPG-signed, branch deleted local + remote.
- [ ] Handoff updated for Plan 5 (examples + publish) or Plan 1b (remaining gates).

## Known issues / carry-forwards (acknowledged, not blocked on)

- G26 combined-selector heuristic (Phase-1 carryover) — audit inherits it.
- `fullPage:false` screenshots miss footer for G43 vision eval — audit could add a full-page capture; defer to Plan 1b.
- Vision is a second-opinion (may misread gate semantics) — Tier 4 is confidence-weighted, never auto-fail alone.
- URL-mode redirect re-check is initial-URL + post-navigation only (not per-hop) — documented known issue.