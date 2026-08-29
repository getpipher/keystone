# Plan 5a — Examples + launch (examples, regression test, harness tooling, CI, publish)

**Project:** @getpipher/keystone
**Branch:** `feat/examples-publish-5` (off `master` `1c175ce`)
**Date:** 2026-08-10
**Predecessor:** Plan 1b-2 (craft gates, PR #7 merged — deterministic engine COMPLETE: 46 detectors / 48 gate numbers; 273 tests green)
**Successor:** Plan 5b — execute the comparison harness (8 Hallmark builds + 8 Keystone builds + gallery)

## Goal

The public launch. Five engine-verified example builds (committed evidence, ≥1 self-audit), the Tier-3 example regression test, the comparison-harness *tooling* (unexecuted — 5b runs it), CI + release workflows, and the launch sequence: merge → flip repo PUBLIC → tag `v0.1.0` → org-convention npm publish.

**Split rationale (approved):** the launch (product) must not wait on 16 comparison builds (marketing). 5a ships everything except harness *execution*; 5b executes.

## Locked constraints (do not re-litigate)

- pi-first. MIT + NOTICE (shipped — NOTICE must ship in the npm `files`).
- **Frozen:** theme specs, engine wiring, detectors — additive changes only, and 5a has none planned.
- 2-space indent, trailing newline at EOF, no AI attribution. Author `RECTOR <rector@rectorspace.com>`, GPG `BF47B9DC1FA320FA`.
- Branch `feat/examples-publish-5`, PR #8, merge `--merge --delete-branch`. Coherent-slice commits.
- Version: **0.1.0** (pre-1.0 honest — the proof gallery lands in 5b; 1.0.0 after).
- Execution model: **controller authors the 5 examples directly** (product showcase = quality-critical; providers unreliable per Plan-4 log). Dispatch only for final review.
- Render verification always with `KEYSTONE_RENDER_TEST=1`.

## The 5 examples (approved Q2; 02 re-briefed to avoid collision with Hallmark's maple-bakery test brief)

| Dir | Theme | Genre | Brief | Macro direction | Special |
|---|---|---|---|---|---|
| `examples/01-cobalt-observability/` | Cobalt | modern-minimal | Developer observability tool — "traces, not dashboards" | Split-screen / asymmetric feature lead | **Self-audit target** |
| `examples/02-garden-plantshop/` | Garden | editorial | Fern & Fog — house-plant shop (hours, care, events) | Long-document editorial | (replaces Maple bakery — that's Hallmark's test brief) |
| `examples/03-terminal-cli/` | Terminal | atmospheric | Deploy-from-the-terminal infra product | Manifesto/poster hero + dense feature index | |
| `examples/04-riso-printstudio/` | Riso | editorial | Independent risograph print studio / zine fair | Catalogue grid, irregular | |
| `examples/05-hum-languages/` | Hum | playful | Community language-learning co-op | Bento with personality | |

Coverage: genres 4/4 · papers light×4/dark×1 · display styles grotesk/roman-serif/mono/risograph-bold/rounded-sans · macros 5 distinct.

**Every example goes through the full skill flow** (SKILL.md Steps 1–7), authored against `skills/keystone/references/themes/<theme>.md`:

1. Author `tokens.css` + `style.css` + `index.html` per the theme spec (tokens → CSS, no inline values — G48).
2. **Deterministic loop (7.1)**: `node engine/check-gates.mjs --html index.html --css style.css --out . --render --viewports 1280,375,320,414,768` — fix → re-run, cap 3. Target: 48/48.
3. **Vision pass (7.2)**: read the 1280 + 375 screenshots directly (controller is multimodal — this session's describe_image equivalent), answer the 18 questions from `gates.md § The vision pass`, fix → re-render, cap 2. Verdicts recorded in `brief.md` (including honest S1).
4. **Stamp + log (7.4)**: fill the stamp `gates:` field; write `.keystone/log.json` (gitignored — build memory stays local).

**Committed evidence per example** (the "open the report" thesis — whatever the CLI emitted, verbatim):
`index.html`, `style.css`, `tokens.css`, `brief.md`, `keystone-report.json`, `keystone-report.html`, `keystone-render/*.png` (5 viewports).
NOT committed (explicitly ignored): `keystone-render/computed.json`, `dom.html`, `viewports.json`, `clickable.json` (regenerable raw data; keeps repo lean).

## Architecture (file map)

```
examples/
├── README.md                            (NEW — index: table of 5, links to evidence + scores)
├── 01-cobalt-observability/ … 05-hum-languages/   (NEW — per The 5 examples)
│   └── keystone-audit-report.{md,json}  (01 only — self-audit)
test/
├── examples.test.mjs                    (NEW — Tier-3 regression, render-guarded)
└── compare/
    ├── README.md                        (NEW — the 5b protocol: fairness methodology)
    ├── briefs/                          (NEW — 8 verbatim prompts from Hallmark _tests, MIT)
    │   └── 0N-<slug>.md × 8
    ├── run-comparison.mjs               (NEW — candidates → render → score → gallery entries)
    └── gallery/
        └── index.template.html          (NEW — side-by-side template; real runs land in 5b)
.github/workflows/
├── ci.yml                               (NEW — typecheck + all suites incl. render + examples)
└── release.yml                          (NEW — org convention: v* tag → npm publish)
README.md                               (REWRITE — public launch)
package.json                            (MOD — files += NOTICE, scripts.typecheck, pin playwright-core)
pnpm-lock.yaml                          (MOD — devDep playwright for CI browser install)
.gitignore                              (MOD — examples evidence negations)
.gitignore'd: final-branch               (DELETE — stray untracked scratch diff)
docs/superpowers/plans/2026-08-10-keystone-examples-publish-5a.md  (this plan)
```

## Tasks

### Task 1 — Branch + hygiene

- [ ] `rm final-branch` (untracked scratch; must not survive into a public repo).
- [ ] `git checkout -b feat/examples-publish-5` (off master `1c175ce`).
- [ ] `.gitignore` — append:
  ```gitignore
  # examples: committed evidence (reports + screenshots); raw data stays local
  !examples/**/keystone-report.json
  !examples/**/keystone-report.html
  !examples/**/*.png
  !examples/**/keystone-audit-report.json
  !examples/**/keystone-audit-report.md
  examples/**/keystone-render/computed.json
  examples/**/keystone-render/dom.html
  examples/**/keystone-render/viewports.json
  examples/**/keystone-render/clickable.json
  examples/**/keystone-audit/
  ```
  (negations after `*.png` / `keystone-report.*` — valid because no parent dir is excluded).
- [ ] Commit: `chore: repo hygiene for the launch branch`.

### Tasks 2–6 — Examples 01–05 (one commit each)

Per-example steps (full detail in "The 5 examples" above):

- [ ] Read the theme spec (`skills/keystone/references/themes/<Theme>.md`) + macrostructures catalog; state Step-1/2 picks in `brief.md`.
- [ ] Author `tokens.css`, `style.css`, `index.html` (production-grade: real copy in theme voice, full interaction states, responsive at all 5 viewports, semantic HTML).
- [ ] Run the deterministic loop to 48/48 (cap 3). Record iterations in `brief.md`.
- [ ] Run the vision pass; record the 18 verdicts + S1 in `brief.md` (cap 2).
- [ ] Stamp + log (7.4).
- [ ] Verify committed-evidence list (above); `git add` the example dir; commit `feat(examples): 0N-<slug> — engine-verified <theme> build`.
- [ ] **Example 01 extra:** after 48/48, run `node engine/audit.mjs examples/01-cobalt-observability --out examples/01-cobalt-observability` → commit `keystone-audit-report.{md,json}` (expect ≤4 N/A: G8/G20/G21/G32, and all 44 audited gates PASS). Include the audit command + output summary in `brief.md`.

### Task 7 — `examples/README.md` index

- [ ] Table: dir · theme · genre · macro · engine score · vision S1 · links (report.html, screenshots).
- [ ] One paragraph: what "engine-verified" means + how to re-run the engine on any example.
- [ ] Commit with Task 6's commit or standalone `docs(examples): index`.

### Task 8 — Example regression test (`test/examples.test.mjs`)

Tier-3 per spec §8. Env-guarded like the other render tests.

- [ ] Write the test:
  ```js
  import { test } from "node:test"
  import assert from "node:assert/strict"
  import { readdirSync, existsSync, mkdtempSync } from "node:fs"
  import { tmpdir } from "node:os"
  import { join } from "node:path"
  import { execFileSync } from "node:child_process"

  const ROOT = join(import.meta.dirname, "..", "examples")
  const slugs = readdirSync(ROOT).filter(d => /^\d{2}-/.test(d)).sort()

  test("all five examples exist", () => {
    assert.equal(slugs.length, 5)
  })

  test("each example scores >= 41/48 on the engine (with render)", { skip: !process.env.KEYSTONE_RENDER_TEST }, () => {
    for (const slug of slugs) {
      const dir = join(ROOT, slug)
      assert.ok(existsSync(join(dir, "index.html")), `${slug}: index.html missing`)
      assert.ok(existsSync(join(dir, "style.css")), `${slug}: style.css missing`)
      const out = mkdtempSync(join(tmpdir(), `keystone-ex-${slug}-`))
      execFileSync("node", ["engine/check-gates.mjs",
        "--html", join(dir, "index.html"), "--css", join(dir, "style.css"),
        "--render", "--viewports", "1280,375,320,414,768", "--out", out], { cwd: join(import.meta.dirname, "..") })
      const report = JSON.parse(readFileSync(join(out, "keystone-report.json"), "utf8"))
      assert.ok(report.pass >= 41, `${slug}: ${report.pass}/${report.total} below the 41/48 floor`)
    }
  })

  test("at least three examples score 48/48", { skip: !process.env.KEYSTONE_RENDER_TEST }, () => {
    let perfect = 0
    /* ... same loop, count report.pass === 48 ... */
    assert.ok(perfect >= 3, `only ${perfect}/5 examples at 48/48 (need 3)`)
  })
  ```
  (write it with the loop factored into a helper `score(slug)` returning the report — no duplication.)
- [ ] Run: `KEYSTONE_RENDER_TEST=1 node --test test/examples.test.mjs` → PASS.
- [ ] `package.json` scripts: `"test:examples"` + fold examples into `test`/`test:run`? **No** — keep `npm test` render-free (release + fast loop); CI runs the suites explicitly. Add `"test:examples": "node --test test/examples.test.mjs"`.
- [ ] Commit: `test(examples): Tier-3 regression — floor 41/48, three at 48/48`.

### Task 9 — Harness tooling (unexecuted) — `test/compare/`

- [ ] Fetch the verbatim prompts for the selected 8 of Hallmark's 13 `_tests` (MIT — raw.githubusercontent `Nutlope/hallmark/main/site/_tests/<dir>/brief.md`, prompt is the first blockquote under "The prompt (verbatim…)"): **01-tide-podcast, 02-streampipe-cli, 03-maple-bakery, 04-meridian-manifesto, 05-tracejam-saas, 06-anya-portfolio, 07-foundry-compliance, 08-cohort-courses** (spans consumer/dev/local/editorial/B2B/personal/enterprise/education; 09–13 are near-duplicate domains). Each `briefs/0N-<slug>.md`: attribution header (source URL + MIT + NOTICE cross-ref) + the verbatim prompt.
- [ ] `run-comparison.mjs` — CLI: `node test/compare/run-comparison.mjs --candidates <dir> --out <dir>`; per `<brief>/hallmark|keystone` candidate dir (`index.html` + `style.css` + optional `tokens.css`): render at 5 viewports (via `extensions/render.ts` `render()` through tsx), score via `orchestrate` on the render dump, write `gallery/<brief>/{<side>.score.json, <side>-<w>.png}` + a combined `verdict.json`. **No model invocation inside** — candidates are pre-built inputs (5b's protocol builds them).
- [ ] `gallery/index.template.html` — side-by-side index (brief → Hallmark | Keystone · scores · screenshots · links to raw reports) reading the generated JSONs; static, no build step.
- [ ] `test/compare/README.md` — the 5b protocol verbatim from spec §8: same brief verbatim, same model both sides, no human intervention, our render + our engine score both, vision S1 same prompt, **losses published** (honesty clause). Candidate-dir contract documented.
- [ ] Smoke: build one throwaway candidate pair in `/tmp` (can be two copies of an example), run `run-comparison.mjs` end-to-end, confirm gallery JSONs + PNGs. (Smoke artifacts NOT committed.)
- [ ] Commit: `feat(compare): harness tooling — 8 briefs, runner, gallery template (execution = Plan 5b)`.

### Task 10 — CI + release workflows

- [ ] `package.json`: pin `"playwright-core": "1.62.0"` (exact — browser-revision determinism), add devDep `"playwright": "1.62.0"` (CI browser install), `"files" += "NOTICE"`, `"scripts": { "typecheck": "tsc --noEmit", "test:examples": …, "test:lint": "node --test test/lint-skill.mjs", "test:render": "node --import tsx --test test/extensions/render.test.mjs" }`. `pnpm install` to sync the lockfile. Verify `pnpm typecheck` green.
- [ ] `.github/workflows/ci.yml`:
  ```yaml
  name: CI
  on:
    push: { branches: [master] }
    pull_request:
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v4
        - uses: actions/setup-node@v4
          with: { node-version: "24", cache: pnpm }
        - run: pnpm install --frozen-lockfile --ignore-scripts
        - run: pnpm exec playwright install --with-deps chromium
        - run: pnpm typecheck
        - run: pnpm test                       # engine + gates (162)
        - run: pnpm test:lint                  # structural lint (103)
        - run: pnpm test:render                # render extension (4)
        - run: pnpm test:examples              # Tier-3 regression (needs Chromium)
          env: { KEYSTONE_RENDER_TEST: "1" }
        - run: KEYSTONE_RENDER_TEST=1 node --test test/engine/check-gates.test.mjs   # 3 env-guarded CLI tests
  ```
- [ ] `.github/workflows/release.yml` — armory-todo org pattern adapted: tag `v*` + workflow_dispatch → pnpm frozen install → typecheck → `pnpm test` + `test:lint` (render suites intentionally omitted: the tagged commit already passed CI with render; keeps publish browser-download-free) → skip-if-already-published → `npm publish --access public` (`NODE_AUTH_TOKEN: secrets.NPM_TOKEN`) → `gh release create "$tag" --generate-notes`.
- [ ] Verify CI locally as far as possible: `pnpm typecheck && pnpm test && pnpm test:lint && pnpm test:render && KEYSTONE_RENDER_TEST=1 pnpm test:examples`.
- [ ] Commit: `ci: github actions — typecheck + full suites + org-convention release`.

### Task 11 — Launch README

- [ ] Rewrite `README.md` (public-facing): the thesis (Hallmark's gates are prose — Keystone's are executable; Hallmark can't ask "does this look AI-generated?" because its model never sees the page); What-you-get (build verb 7-step flow + audit verb); quickstart (`pi install npm:@getpipher/keystone` + standalone `node engine/audit.mjs <path|url>`); the 48-gate engine table summary (46 detectors, tiers); **examples table linking committed evidence**; the comparison story (methodology + honesty clause) with "gallery: Plan 5b" marker; attribution (Hallmark taxonomy origin, MIT + NOTICE); license.
- [ ] Update `skills/keystone/references/engine.md` / READMEs only where they claim "private until Plan 5" (grep `PRIVATE`/`Plan 5`).
- [ ] Commit: `docs: public launch README`.

### Task 12 — Review, merge, launch

- [ ] Full local gate: all suites green (engine 162+1skip · lint 103 · render 4 · examples 5/5-floor · typecheck).
- [ ] Dispatch one review subagent (whole-diff, SCOPE GUARD: review only). Controller verifies every finding.
- [ ] Push → PR #8 → merge `--merge --delete-branch`.
- [ ] `gh repo edit getpipher/keystone --visibility public` (accept) — **after** merge.
- [ ] `git tag v0.1.0 && git push origin v0.1.0` → watch release.yml → confirm npm `@getpipher/keystone@0.1.0` + GitHub Release.
- [ ] Verify install: `npm view @getpipher/keystone` + (informational) `pi install npm:@getpipher/keystone` in a scratch dir.
- [ ] Update `~/Documents/secret/strategy/keystone/session-handoff-2026-08-10.md`: 5a row DONE (PR #8), launch facts (public URL, npm package), 5b = harness execution.

## Acceptance criteria

1. Five examples in `examples/`, each ≥41/48 engine-verified, ≥3 at 48/48, vision verdicts recorded, evidence committed (report.html openable, 5 PNGs each).
2. `keystone audit` self-audit report committed for 01 (44 audited gates PASS, 4 N/A).
3. `KEYSTONE_RENDER_TEST=1 pnpm test:examples` green locally + in CI.
4. Harness tooling present with 8 attributed briefs; runner smoke-tested on a throwaway candidate pair; nothing executed into `gallery/`.
5. CI green on the PR (typecheck + 162 + 103 + 4 + examples). Release workflow fires on `v0.1.0` and publishes.
6. Repo PUBLIC with launch README; `@getpipher/keystone@0.1.0` on npm; GitHub Release created.
7. No engine/detector/theme-spec changes (frozen); no AI attribution anywhere.

## Out of scope (5b)

Executing the harness (8 Hallmark + 8 Keystone builds), gallery content, verdict pages, 1.0.0, Pages hosting, any engine changes.
