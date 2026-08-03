# Keystone Build-Flow Integration (Plan 3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the real engine-verified Step 7 into the Build flow. Plan 2a shipped the skill catalog structure; Plan 2b shipped the 8 deep theme specs (frozen). Plan 3 closes the gap between "the model imagines 58/58 ✓" and "a script checked them" by making the deterministic CLI run the full 13-detector suite end-to-end (Chromium render → OKLCH contrast → viewport scroll → hero-fit → diversification vs log.json), wiring the vision pass as a model-callable `describe_image` protocol on the Playwright screenshots, and rewriting SKILL.md Step 7 to the real 3+2 iterate-until-pass loop with the ship-with-declared-failures honesty contract.

**Architecture:** No new tiers. Plan 3 touches all three existing tiers — Engine (a new color helper + ctx-mutation fix + CLI flags), Extension (render.ts gains viewport metrics + OKLCH-emitting computed pairs), Skill (gates.md gains the consolidated 18-question prompt; engine.md documents the resolved deferrals; SKILL.md Step 7 is rewritten). The vision pass is **protocol-level, not programmatic**: `describe_image` is a model-callable tool (provided by `@getpipher/vision`, already a package); the engine does not call vision. So "wiring vision" = the model renders via `keystone_render`, calls `describe_image` with the 18-question prompt on the screenshots, reads the verdicts, and iterates (cap 2). The deterministic pass is programmatic: `node engine/check-gates.mjs --html … --css … --render --viewports … --log …` runs Chromium itself and scores all 13 gates in one shot.

**Tech Stack:** Node 20 ESM (`.mjs`). TypeScript for the render extension (`extensions/render.ts`, run via tsx). `node:test` for TDD. `playwright-core` for headless Chromium. No new dependencies (tsx moves from devDependencies → dependencies so the CLI's `--render` path can bootstrap it at runtime; tsx is already present in any pi install). 2-space indent, standard semicolons, trailing newline at EOF.

## Global Constraints

- **pi-first** — skill + extension in one `@getpipher/keystone` package. Do NOT change `package.json`'s `pi.skills` / `pi.extensions` manifest (only the `dependencies`/`devDependencies` split for tsx).
- **Do NOT touch the 8 deep theme specs** (`skills/keystone/references/themes/*.md`) — Plan 2b is the frozen thesis artifact. Plan 3 wires the engine *around* them, not *into* them.
- **Do NOT change gate definitions** — the 58 gates in `gates.md` are frozen (semantics locked in Plan 2a). Plan 3 adds the consolidated vision *prompt* (prose the model uses), it does not add/relabel gates. Engine detectors that already exist stay binary-compatible (the ctx shape they read is unchanged or only *enriched*).
- **TDD for all engine/extension code.** Write the failing test first, run it red, implement, run green. The render test already exists (`test/extensions/render.test.mjs`) and spawns real Chromium — extend it, don't stub it.
- **Controller-written vs subagent:** the integration glue (color math, ctx fix, CLI flags, render viewport metrics, SKILL.md/engine.md/gates.md flow prose) is **controller-written** (CIPHER) — it's small, exact, and touches the contract surface. Larger mechanical pieces (test fixtures, lint assertions, the final review) can dispatch to glm-5.2:cloud subagents per the 2b execution model. SCOPE GUARD every dispatch: *"You are working ONLY on @getpipher/keystone. Do NOT mention/review/produce any content about armory-fleet, vm-realm, workflow-runner, runner.ts, fleet.ts, schema validation — those are DIFFERENT projects. If you think about them, STOP — wrong context."*
- **No AI attribution.** Author RECTOR `<rector@rectorspace.com>`, GPG `BF47B9DC1FA320FA`.
- **One commit per logical unit.** Branch `feat/build-flow-3` off `master` (`1e7a028`). Open PR #4, merge `--merge --delete-branch`.
- **Build/test commands:**
  - `npm test` → engine tests (currently 39)
  - `node --import tsx --test test/extensions/render.test.mjs` → render test (currently 1)
  - `node --test test/lint-skill.mjs` → structural lint (currently 90)
  - `node engine/check-gates.mjs --html <p> --css <p> --render --viewports 1280,375,320,414,768 --log .keystone/log.json --out <dir>` → the full CLI (new)

## Resolved design decisions (do not re-litigate)

1. **Where to convert RGB→OKLCH.** Two layers, both clean: (a) `engine/color.mjs` — a pure helper `lightnessOf(str)` that accepts `oklch()`/`rgb()`/`rgba()`/`#hex` and returns `L` (0–100) or `null`; (b) the render extension emits OKLCH strings into `computed.json` at the boundary (so the dump is canonical OKLCH). G40-41 imports `lightnessOf` from the helper (robust even if RGB sneaks through). The conversion lives at the boundary *and* the gate is color-format-agnostic — defence in depth.
2. **How the CLI loads the TS render extension.** `tsx/esm/api` exports `tsImport(modulePath, parentURL)` which transpiles+imports a `.ts` file at runtime under plain `node` (no `--import tsx` flag). The CLI's `--render` path does `const { tsImport } = await import("tsx/esm/api"); const { render } = await tsImport("./extensions/render.ts", import.meta.url)`. If tsx is not resolvable, fail with a clear message (`--render requires the tsx runtime — run via pi or npm i tsx`). tsx moves to `dependencies` so a published CLI install has it.
3. **Hero element detection for G44.** The render extension captures hero part bounding rects by heuristic (no new markup convention required — the theme specs don't emit `data-keystone-hero`): at the 1280px pass, find the first `<h1>` (headline); its **immediately preceding** element sibling, if it is a short text node (`<p>`, `<span>`, `<div>`, `<small>`, or a tag with class matching `/eyebrow|kicker|tag/i`) with `offsetHeight < 60` → eyebrow; the first `<p>` sibling after the h1 → lede; the first `<a>` or `<button>` inside the h1's nearest `<section>`/`<header>`/`<article>` ancestor → cta. Capture `{ top, bottom }` for each. If no `<h1>`, `hero` is `null` → G44 passes (no hero to fit). This is heuristic and documented as such; Plan 1b can refine.
4. **The iterate loop lives in SKILL.md, not in the engine.** The 3+2 cap is a model-orchestration concern (the model re-runs the CLI / re-renders / re-visions). The engine is a single-shot scorer. `orchestrate()` is pure + idempotent; the model calls it up to 3× (det) and the vision protocol up to 2×. No in-process loop in the engine — keeps it testable + keeps the caps enforceable in prose.
5. **Vision pass is not unit-tested with a real model.** No API key in CI. The test for vision is *structural*: gates.md contains the 18-question prompt block (lint assertion), SKILL.md Step 7.2 names `describe_image` + the 18 questions + cap 2 (lint assertion). The actual `describe_image` call is a model-runtime concern, exercised by dogfooding (Task 11), not by `node:test`.

---

## File Structure

```
engine/
├── color.mjs                        # NEW — RGB→OKLCH + lightnessOf helper (Task 2)
├── orchestrate.mjs                  # MODIFIED — no ctx mutation (Task 4)
├── check-gates.mjs                  # MODIFIED — --render/--viewports/--log flags (Task 6)
└── gates/g40-41-contrast.mjs        # MODIFIED — use shared lightnessOf (Task 3)
extensions/
└── render.ts                        # MODIFIED — OKLCH-emitting pairs + viewport metrics (Task 5)
test/
├── engine/color.test.mjs            # NEW (Task 2)
├── engine/orchestrate.test.mjs       # MODIFIED — ctx-mutation + --log tests (Tasks 4, 6)
├── engine/check-gates.test.mjs      # MODIFIED — --render/--log CLI integration (Task 6)
├── extensions/render.test.mjs       # MODIFIED — viewportMetrics assertion (Task 5)
└── lint-skill.mjs                   # MODIFIED — vision-prompt + Step-7 + engine-flags assertions (Task 10)
skills/keystone/
├── SKILL.md                         # MODIFIED — Step 7 rewrite (Task 9)
└── references/
    ├── gates.md                     # MODIFIED — consolidated 18-question vision prompt (Task 7)
    └── engine.md                    # MODIFIED — resolved deferrals + flag docs (Task 8)
package.json                          # MODIFIED — tsx devDep → dep (Task 6)
```

---

### Task 1: Branch + plan doc commit

**Files:** `docs/superpowers/plans/2026-08-03-keystone-build-flow-3.md` (this file)
**Interfaces:** Produces the branch + the committed plan as the source of truth for subagents.

- [ ] **Step 1:** Confirm branch off master.
```bash
cd /Users/rector/local-dev/getpipher/keystone
git checkout feat/build-flow-3   # already created
git log --oneline -1   # expect 1e7a028 at HEAD of master behind this branch
```
- [ ] **Step 2:** Commit this plan doc.
```bash
git add docs/superpowers/plans/2026-08-03-keystone-build-flow-3.md
git commit -m "docs(plan): keystone build-flow-3 — engine-verified Step 7"
```
- [ ] **Acceptance:** `git log --oneline -1` shows the plan commit on `feat/build-flow-3`.

---

### Task 2: RGB→OKLCH color helper (TDD)

**Files:** Create `engine/color.mjs`; create `test/engine/color.test.mjs`.
**Interfaces:** Exports `lightnessOf(str)` → `number (0–100) | null`, `rgbToOklch(r, g, b)` → `{ L, C, H }` (L 0–1, H degrees), `toOklchString(str)` → `string | null` (canonical `oklch(L% C H)`), `parseColor(str)` → `{ kind, components, L, C, H } | null`.

**Why:** G40-41's inline `lightnessOf` matches only `oklch(\s*([\d.]+)%%`; Chromium's `getComputedStyle().color` returns `rgb(r, g, b)`, so every contrast pair from the render dump is silently skipped (no results = a vacuous PASS). This is the #1 Plan-3 deferral.

- [ ] **Step 1: Write the failing test.** `test/engine/color.test.mjs`:
  - `lightnessOf("oklch(45% 0.1 240)")` → `45`
  - `lightnessOf("oklch(0.45 0.1 240)")` → `45` (unit-form L)
  - `lightnessOf("rgb(255, 255, 255)")` → `100` (white)
  - `lightnessOf("rgb(0, 0, 0)")` → `0` (black)
  - `lightnessOf("rgb(128, 128, 128)")` → a value in ~54–56 (mid grey; assert `> 50 && < 60`)
  - `lightnessOf("#ffffff")` → `100`; `lightnessOf("#000")` → `0`
  - `lightnessOf("rgba(0, 0, 0, 0.5)")` → `0` (alpha ignored for lightness)
  - `lightnessOf("not a color")` → `null`
  - `toOklchString("rgb(255,255,255)")` → matches `/oklch\(100% 0 0\)/` (chroma ~0 for grey)
  - `rgbToOklch(255, 255, 255)` → `{ L: close to 1.0, C: close to 0, H: 0 or NaN }`
  - `rgbToOklch(0, 0, 0)` → `{ L: close to 0.0, C: close to 0 }`
  - Use a known reference pair: `rgb(176, 42, 42)` (a red) → L ≈ 0.42–0.50 (assert range; OKLCH reds land ~0.45–0.55 L). Pin exact values once the implementation lands (update the test to the exact computed values — these become the regression anchors).
  Run: `node --test test/engine/color.test.mjs` → RED (module missing).

- [ ] **Step 2: Implement `engine/color.mjs`.**
  - `parseRgb(str)` → handles `rgb(r,g,b)`, `rgba(r,g,b,a)`, `#rrggbb`, `#rgb` (r,g,b integers 0–255 or percentages). Returns `{ r, g, b }` 0–1 linear or 0–255 sRGB — choose sRGB 0–255 then linearize.
  - `srgbToLinear(c)` = `c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4`.
  - `linearSrgbToOklab(r, g, b)` — the standard Björn Ottosson matrix (l=0.4122214708 r+0.5363325363 g+0.0514409963 b, m=0.2119034982 r+0.6806995451 g+0.1073969566 b, s=0.0883024619 r+0.2817188376 g+0.6299787005 b; then l_=cbrt(l), m_=cbrt(m), s_=cbrt(s); L=0.2104542553 l_+0.7936177850 m_-0.0040720468 s_; a=1.9779984951 l_-2.4285922050 m_+0.4505937099 s_; b=0.0259040371 l_+0.7827717662 m_-0.8086757660 s_).
  - `oklabToOklch(L, a, b)` → `C = sqrt(a*a+b*b)`, `H = atan2(b, a)` in degrees (0–360; if C < 1e-6, H = 0).
  - `rgbToOklch(r255, g255, b255)` → returns `{ L: 0..1, C, H }`.
  - `toOklchString(str)` → if `oklch(...)` input, normalise to `oklch(L% C H)`; else parse → rgbToOklch → `oklch((L*100)% C H)` (C to 6 sig fig, H rounded to 2 dp; chroma 0 → `0` not `0.000000`).
  - `lightnessOf(str)` → try `oklch(L% …)` regex first (returns L); then `oklch(0.L …)` unit form (returns L*100); else parse rgb/hex → rgbToOklch → L*100; else null.
  Run: `node --test test/engine/color.test.mjs` → GREEN. Then pin exact values for the red regression anchor.

- [ ] **Step 3: Commit.**
```bash
git add engine/color.mjs test/engine/color.test.mjs
git commit -m "feat(engine): rgb→oklch color helper (Plan 3 — G40-41 RGB dump fix)"
```

- [ ] **Acceptance:** `node --test test/engine/color.test.mjs` GREEN; `lightnessOf` handles all four input forms; no other test changed yet.

---

### Task 3: G40-41 uses the shared color helper

**Files:** Modify `engine/gates/g40-41-contrast.mjs`; the inline `lightnessOf` is replaced by the import.
**Interfaces:** `g40-41-contrast.mjs` imports `lightnessOf` from `../color.mjs`; behaviour for OKLCH inputs unchanged; RGB inputs now produce results (the fix).

- [ ] **Step 1:** In `g40-41-contrast.mjs`, delete the local `lightnessOf` function, add `import { lightnessOf } from "../color.mjs"`. The rest of the detector is unchanged.
- [ ] **Step 2:** Extend `test/engine/gates/g40-41-contrast.test.mjs` (or the orchestrate test that asserts a G40 fail on a low-contrast pair) with an RGB pair: `computedPairs: [{ selector: ".btn", color: "rgb(80,80,80)", backgroundColor: "rgb(90,90,90)" }]` → expect a G40 FAIL (low contrast, both ~mid-grey). Run the existing OKLCH assertion too (regression). Run `npm test` → GREEN (engine 39 + new assertions, still 39 gate-tests since G40-41 test gains an assertion not a new test, or +1 test — either is fine).
- [ ] **Step 3:** Commit.
```bash
git add engine/gates/g40-41-contrast.mjs test/engine/gates/g40-41-contrast.test.mjs test/engine/orchestrate.test.mjs
git commit -m "fix(g40-41): contrast gate scores RGB computed pairs via shared lightnessOf"
```
- [ ] **Acceptance:** `npm test` GREEN; a render-dump RGB pair now produces a contrast result (no longer silently skipped).

---

### Task 4: Orchestrator ctx-mutation fix (TDD)

**Files:** Modify `engine/orchestrate.mjs`; extend `test/engine/orchestrate.test.mjs`.
**Interfaces:** `orchestrate(ctx)` no longer mutates `ctx`. If `ctx.projectMemory` is supplied (by the CLI via `--log`), it is used as-is. If not, a local `projectMemory` is built from the stamp and used internally — never written back to `ctx`.

**Why:** the iterate loop (model re-running the CLI) is naturally fresh per invocation, but the programmatic orchestrator API path + future in-process loops would carry stale `projectMemory` across iterations. Pure + non-mutating is the contract.

- [ ] **Step 1: Write the failing test.** In `test/engine/orchestrate.test.mjs`:
  ```js
  test("orchestrate does not mutate ctx.projectMemory", () => {
    const css = readFileSync("test/fixtures/full-fail.css", "utf8")
    const html = readFileSync("test/fixtures/full-fail.html", "utf8")
    const ctx = { css, html, viewports: [], computedPairs: [] }
    assert.equal(ctx.projectMemory, undefined)
    orchestrate(ctx)
    assert.equal(ctx.projectMemory, undefined, "orchestrate must not set ctx.projectMemory")
  })

  test("orchestrate honours a supplied projectMemory.log (G8-32)", () => {
    const css = readFileSync("test/fixtures/stamp-valid.css", "utf8")
    const html = ""
    const log = [{ date: "2026-08-01", macrostructure: "spotlight-lede", theme: "cobalt", nav: "N1a", footer: "Ft3" }]
    const ctx = { css, html, viewports: [], computedPairs: [], projectMemory: { stamp: null, log } }
    const summary = orchestrate(ctx)
    // stamp-valid.css macrostructure must match the log's last entry → G8 reuse FAIL
    assert.ok(summary.results.some(r => r.gate === 8 && !r.pass), "G8 should fail on macro reuse")
  })
  ```
  Run `npm test` → RED (orchestrate mutates; the G8 test fails because today log is always `[]`).

- [ ] **Step 2: Fix `orchestrate.mjs`.**
  ```js
  export function orchestrate(ctx) {
    const projectMemory = ctx.projectMemory ?? (() => {
      const stamp = ctx.css ? extractStamp(ctx.css) : null
      return { stamp, log: [] }
    })()
    const localCtx = { ...ctx, projectMemory }
    const results = []
    for (const d of DETECTORS) {
      const r = d(localCtx)
      if (Array.isArray(r)) results.push(...r)
      else results.push(r)
    }
    const pass = results.filter(r => r.pass).length
    const fail = results.filter(r => !r.pass).length
    return { results, pass, fail, total: results.length }
  }
  ```
  (No `ctx.projectMemory = ...` assignment. `localCtx` is a shallow clone — detectors only read it.)

- [ ] **Step 3:** Run `npm test` → GREEN. Verify the existing "orchestrate uses render dump for G34 + G40-41" test still passes (it passes `viewports` + `computedPairs` but no `projectMemory` → local build-from-stamp → G8/G32 pass).

- [ ] **Step 4: Commit.**
```bash
git add engine/orchestrate.mjs test/engine/orchestrate.test.mjs
git commit -m "fix(orchestrate): do not mutate ctx.projectMemory (Plan 3 — fresh ctx per iteration)"
```
- [ ] **Acceptance:** `npm test` GREEN; `ctx.projectMemory` is `undefined` after `orchestrate(ctx)`; a supplied `projectMemory.log` makes G8 fire on reuse.

---

### Task 5: Render extension — OKLCH pairs + viewport metrics (TDD)

**Files:** Modify `extensions/render.ts`; extend `test/extensions/render.test.mjs`.
**Interfaces:** `render(input)` return gains `viewportMetrics: { width, scrollWidth, innerWidth, innerHeight, hero? }[]` and writes `viewports.json` to outDir. `computed.json` holds OKLCH `color`/`backgroundColor` strings (converted via the new helper). The hero object (1280px only) = `{ eyebrow: {top, bottom}, headline: {top, bottom}, lede: {top, bottom}, cta: {top, bottom} } | null`.

**Why:** G34 reads `{ width, scrollWidth, innerWidth }`; G44 reads `{ width, innerHeight, hero: {eyebrow, headline, lede, cta}.{bottom} }` at 1280. The render extension currently dumps only color pairs — so G34/G44 get empty `viewports` and silently PASS. This is the gap the handoff under-specifies.

- [ ] **Step 1: Write the failing test.** In `test/extensions/render.test.mjs` (extends the existing test; spawns real Chromium):
  ```js
  test("render emits viewportMetrics + oklch computed pairs", async () => {
    const dir = mkdtempSync(join(tmpdir(), "keystone-render-"))
    const html = `<html><body>
      <header><small class="eyebrow">NEW</small><h1>Headline</h1><p>Lede text here</p><a class="cta" href="#">Go</a></header>
    </body></html>`
    const htmlPath = join(dir, "page.html")
    writeFileSync(htmlPath, html)
    const out = await render({ htmlPath, viewports: [1280, 375], outDir: dir })
    assert.equal(out.viewportMetrics.length, 2)
    const desk = out.viewportMetrics.find(v => v.width === 1280)
    assert.ok(desk.scrollWidth >= 1280)
    assert.ok(desk.innerHeight > 0)
    assert.ok(desk.hero, "1280px pass must capture hero rects")
    assert.ok(desk.hero.headline.bottom > 0)
    assert.ok(desk.hero.cta.bottom > desk.hero.headline.bottom, "cta below headline")
    const mob = out.viewportMetrics.find(v => v.width === 375)
    assert.equal(mob.hero, undefined, "hero only captured at 1280")
    const computed = JSON.parse(readFileSync(out.computedStylesPath, "utf8"))
    assert.ok(computed.length > 0)
    // colors must be oklch strings (white body)
    assert.match(computed[0].color, /^oklch\(/)
    assert.match(computed[0].backgroundColor, /^oklch\(/)
    assert.ok(existsSync(join(dir, "viewports.json")))
  })
  ```
  Run `node --import tsx --test test/extensions/render.test.mjs` → RED (no `viewportMetrics`; colors are `rgb(...)`).

- [ ] **Step 2: Extend `extensions/render.ts`.**
  - Import the OKLCH helper. Since the extension is TS and the helper is `.mjs`, import via the relative path: `import { toOklchString } from "../engine/color.mjs"`. (tsx resolves `.mjs` fine.)
  - In the per-viewport `page.evaluate`, additionally capture:
    ```js
    const metrics = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      const hero = (() => {
        const h1 = document.querySelector("h1")
        if (!h1) return null
        const rect = (el) => el ? { top: Math.round(el.getBoundingClientRect().top), bottom: Math.round(el.getBoundingClientRect().bottom) } : null
        const headline = rect(h1)
        // eyebrow: immediately preceding element sibling, short text
        let eyebrow = null
        let prev = h1.previousElementSibling
        if (prev && prev.offsetHeight < 60 && /^(P|SPAN|DIV|SMALL|B)$/.test(prev.tagName) || (prev && /eyebrow|kicker|tag/i.test(prev.className))) {
          eyebrow = rect(prev)
        }
        // lede: first <p> sibling after h1
        let lede = null
        let next = h1.nextElementSibling
        if (next && next.tagName === "P") lede = rect(next)
        // cta: first <a>/<button> in the nearest section/header/article ancestor
        const section = h1.closest("section, header, article, main")
        const ctaEl = section ? section.querySelector("a[href], button") : null
        const cta = rect(ctaEl)
        return { eyebrow, headline, lede, cta }
      })()
      return { scrollWidth, innerWidth, innerHeight, hero }
    })
    ```
    Push `{ width: w, ...metrics }` into a `viewportMetrics` array.
  - In the color-pairs dump, convert via `toOklchString(cs.color)` / `toOklchString(cs.backgroundColor)`; if conversion returns null (unparseable), keep the raw string (don't drop the pair).
  - Write `viewports.json` (`JSON.stringify(viewportMetrics, null, 2)`) to outDir.
  - Add `viewportMetrics` to the returned object.

- [ ] **Step 3:** Run `node --import tsx --test test/extensions/render.test.mjs` → GREEN. Run the existing render test too (regression — screenshots + dom snapshot still produced).

- [ ] **Step 4: Commit.**
```bash
git add extensions/render.ts test/extensions/render.test.mjs
git commit -m "feat(render): viewport metrics (G34/G44) + oklch computed pairs"
```
- [ ] **Acceptance:** render test GREEN; `computed.json` colors are `oklch(...)`; `viewports.json` + `viewportMetrics` present; hero rects captured at 1280 only.

---

### Task 6: CLI --render / --viewports / --log flags (TDD)

**Files:** Modify `engine/check-gates.mjs`; extend `test/engine/check-gates.test.mjs`; modify `package.json` (tsx devDep → dep).
**Interfaces:** New flags: `--render` (bool — runs Chromium via the extension), `--viewports 1280,375,320,414,768` (csv widths, default `1280,375,320,414,768` when `--render` set), `--log <path>` (path to `.keystone/log.json`, populates `projectMemory.log`). When `--render` is set, the CLI loads the render extension via tsx, runs it, reads `computed.json` + `viewports.json`, and feeds `computedPairs` + `viewports` into `orchestrate` (cloned ctx). Without `--render`, behaviour is unchanged (the 11 CSS/HTML-only gates run; `viewports`/`computedPairs` stay `[]`).

- [ ] **Step 1: Move tsx to dependencies.** In `package.json`, move `"tsx": "^4.23.1"` from `devDependencies` to `dependencies`. (Rationale: the published CLI's `--render` path needs it at runtime; it's already present in any pi install. Keep `pnpm install` clean.) Run `pnpm install` to refresh the lockfile.

- [ ] **Step 2: Write the failing CLI test.** In `test/engine/check-gates.test.mjs` (extends existing; spawns `node`):
  ```js
  test("check-gates.mjs --log loads log.json and makes G8 fire on reuse", () => {
    const dir = mkdtempSync(join(tmpdir(), "keystone-"))
    const css = readFileSync("test/fixtures/stamp-valid.css", "utf8")  // macrostructure matches the log entry
    const html = ""
    writeFileSync(join(dir, "page.css"), css)
    writeFileSync(join(dir, "page.html"), html)
    const logDir = join(dir, ".keystone")
    mkdirSync(logDir, { recursive: true })
    writeFileSync(join(logDir, "log.json"), JSON.stringify([
      { date: "2026-08-01", macrostructure: "<the stamp's macro>", theme: "cobalt", nav: "N1a", footer: "Ft3" }
    ]))
    execFileSync("node", ["engine/check-gates.mjs", "--css", join(dir, "page.css"), "--html", join(dir, "page.html"), "--log", join(logDir, "log.json"), "--out", dir], { cwd: process.cwd() })
    const report = JSON.parse(readFileSync(join(dir, "keystone-report.json"), "utf8"))
    assert.ok(report.results.some(r => r.gate === 8 && !r.pass), "--log must feed G8 a non-empty log")
  })
  ```
  (Use the macro name actually in `stamp-valid.css` — read it first; the fixture is the source of truth.)
  For `--render`, add a test guarded by an env check (Chromium may be absent in CI):
  ```js
  test("check-gates.mjs --render runs the full detector suite", { skip: !process.env.KEYSTONE_RENDER_TEST }, () => {
    // build a small HTML/CSS fixture with a low-contrast pair + horizontal overflow,
    // run node engine/check-gates.mjs --render --viewports 1280,375 --out <dir>,
    // assert report.results contains G34 and G40 entries (not just the 11 CSS-only gates)
  })
  ```
  (The skip keeps CI green without a browser; `KEYSTONE_RENDER_TEST=1` runs it locally. Document this in the test comment.)
  Run `node --test test/engine/check-gates.test.mjs` → RED for the `--log` test.

- [ ] **Step 3: Implement the flag parsing + render bootstrap in `check-gates.mjs`.**
  - Parse `--viewports` (split on `,`, map to numbers); default `[]` unless `--render`.
  - Parse `--log` (path, optional); `--render` (boolean flag — presence-based, no value).
  - Build the base ctx: `{ html, css, viewports: [], computedPairs: [], projectMemory: undefined }`.
  - If `--log` provided: read + JSON.parse the file → `projectMemory = { stamp: extractStamp(css), log: parsed }`.
  - If `--render`:
    ```js
    let renderModule
    try {
      const { tsImport } = await import("tsx/esm/api")
      renderModule = await tsImport(new URL("./extensions/render.ts", import.meta.url).href, import.meta.url)
    } catch {
      console.error("--render requires the tsx runtime — run via pi, or: npm i tsx")
      process.exit(1)
    }
    const out = await renderModule.render({ htmlPath: args.html, viewports: widths, outDir: join(out, "keystone-render") })
    const computedPairs = JSON.parse(readFileSync(out.computedStylesPath, "utf8"))
    const viewports = JSON.parse(readFileSync(join(out, "keystone-render", "viewports.json"), "utf8"))
    // merge into ctx
    ctx.computedPairs = computedPairs; ctx.viewports = viewports
    ```
    (The CLI becomes async — wrap the body in an async IIFE or top-level await. Node 20 supports top-level await in ESM.)
  - Call `orchestrate(ctx)` (now non-mutating — Task 4) and write reports as before. If `--render` ran, also copy/symlink the screenshot paths into the report (so the HTML report can link them).
  - Update the console line to include the mode: `PASS n/total · FAIL n/total — <out>/keystone-report.html (render: on/off)`.

- [ ] **Step 4:** Run `node --test test/engine/check-gates.test.mjs` → GREEN (the `--log` test; the `--render` test stays skipped). Run `KEYSTONE_RENDER_TEST=1 node --test test/engine/check-gates.test.mjs` locally to confirm the full suite (Chromium present) → GREEN. Run `npm test` → all engine tests GREEN.

- [ ] **Step 5: Commit.**
```bash
git add engine/check-gates.mjs test/engine/check-gates.test.mjs package.json pnpm-lock.yaml
git commit -m "feat(cli): --render/--viewports/--log flags (full detector suite end-to-end)"
```
- [ ] **Acceptance:** `node engine/check-gates.mjs --html <p> --css <p> --log .keystone/log.json` makes G8 fire on reuse; `--render --viewports 1280,375` (with `KEYSTONE_RENDER_TEST=1`) produces a report with G34 + G40 entries; without `--render`, the 11 CSS-only gates run unchanged.

---

### Task 7: gates.md — consolidated 18-question vision prompt

**Files:** Modify `skills/keystone/references/gates.md`.
**Interfaces:** A new section `## The vision pass — the 18-question prompt` (near the top, after the layer-legend preamble) containing the canonical structured prompt block (copied verbatim from spec §2) that the model pastes into `describe_image` with `image_paths: [1280.png, 375.png]`. Each of the 18 questions cross-refs its gate row (already annotated Q1–Q14, S1–S3).

- [ ] **Step 1:** Add the section. The prompt block (from spec §2, verbatim — it is the authoritative wording):
  ```markdown
  ## The vision pass — the 18-question prompt

  Step 7.2 renders the page via `keystone_render({ htmlPath, viewports: [1280, 375] })` then calls `describe_image({ image_paths: [<1280.png>, <375.png>], prompt: <below> })`. The vision model answers each gate PASS or FAIL with one-sentence evidence, for both desktop (1280) and mobile (375).

  ```
  You are a design critic. For each gate, answer PASS or FAIL with one-sentence evidence.
  Answer for BOTH desktop (1280) and mobile (375) screenshots.

  STRUCTURE
    G6  Hero centred-everything: eyebrow+title+lede+CTA all on one centred axis?
    G9  Equal-whitespace sections: any two adjacent sections identical in rhythm?
    G29 Abstract background: >1 accent colour, or animating mesh on whole page?
    G42 Nav fingerprint: wordmark-left + 4-5 inline links + button-right + hairline border?
    G43 Footer fingerprint: 4-col links + social row + tiny copyright?
    G44 Hero fit: eyebrow+headline+lede+primary CTA visible without scrolling (1280 only)?
    G45 Decorative-without-purpose: ornament with no semantic anchor?
  TYPOGRAPHY
    G38a Italic headers: any heading/display in italic? (italic emphasis word in upright headline = FAIL)
  CHROME & CONTENT
    G30 Icon tells: mixed libraries, or emoji-as-feature-icon (✨🚀⚡)?
    G46 Invented metrics: "10× faster", "50,000+ teams", "99.9% uptime"? (flag, not auto-fail)
    G47 Re-drawn chrome: fake browser/phone/code-block/IDE frame?
  CRAFT
    G35 Decorative stroke position: highlighter band at baseline (fat underline) vs behind x-height?
    G36 Flex align-items: any nav/toolbar/CTA row where button is taller than sibling text?
  SUBJECTIVE (confidence-weighted, never auto-fail alone)
    S1  Does this page look AI-generated? (if yes, name top 3 tells)
    S2  Does this feel like this specific brief, or a generic page?
    S3  Two pages from this skill for two briefs — would they feel like different sites?
  ```

  The S1 question (*"does this look AI-generated?"*) is the one Hallmark cannot ask its model — its model never sees the page. Read each verdict; any FAIL (except G46, which is flag-only) triggers a fix → re-render → re-vision, cap 2 iterations (see SKILL.md §7.2).
  ```
  (The inner triple-backtick block is the verbatim model prompt — keep its exact wording; it is the contract the vision model is graded against.)

- [ ] **Step 2:** Ensure each per-gate row's `**Checker:**` line that says `vision: describe_image QN (Plan 3)` is updated to `vision: describe_image QN (see § The vision pass)` — i.e. cross-ref the consolidated block instead of the stale "Plan 3" pointer. (Search-replace ` (Plan 3)` → ` (see § The vision pass)` for vision-gate rows only — be precise, do not touch the deterministic `(Plan 1b)` annotations.)

- [ ] **Step 3: Commit.**
```bash
git add skills/keystone/references/gates.md
git commit -m "docs(gates): consolidated 18-question vision prompt + cross-ref from gate rows"
```
- [ ] **Acceptance:** `grep -c "The vision pass" skills/keystone/references/gates.md` ≥ 1; the 18 gates (G6,G9,G29,G42,G43,G44,G45,G38a,G30,G46,G47,G35,G36,S1,S2,S3) all appear in the prompt block; no ` (Plan 3)` remains on a vision-gate `Checker:` line.

---

### Task 8: engine.md — document resolved deferrals + new flags

**Files:** Modify `skills/keystone/references/engine.md`.
**Interfaces:** The "Known Plan-3 deferrals" section is replaced by a "Plan-3 wiring (shipped)" section documenting: the OKLCH conversion (boundary + gate), the `--render`/`--viewports`/`--log` flags (with the full CLI example from spec §2), the viewport-metrics render dump, the ctx-clone contract, and the vision pass as a model-callable `describe_image` protocol (not an engine API). The CLI section + orchestrator-API section are updated to match the new code.

- [ ] **Step 1:** Rewrite the `## The CLI` section to show the full flags:
  ```bash
  node engine/check-gates.mjs --html <path> --css <path> \
    --log .keystone/log.json \
    --render --viewports 1280,375,320,414,768 \
    --out <dir>
  ```
  Document each flag: `--html`/`--css` (required), `--out` (default `.`), `--log` (path to `.keystone/log.json`; feeds G8/G32), `--render` (runs headless Chromium via the render extension; without it only the 11 CSS/HTML-only gates run), `--viewports` (csv widths; default `1280,375,320,414,768` when `--render` set).
- [ ] **Step 2:** Rewrite the `## The orchestrator API` note: state `orchestrate()` does **not** mutate `ctx` (builds `projectMemory` on a local clone); a supplied `ctx.projectMemory` (with `.log`) is honoured.
- [ ] **Step 3:** Rewrite the `## The render extension` section: document the new `viewportMetrics` return + `viewports.json` write + OKLCH-emitting `computed.json`. Note the hero-element heuristic (Task 5 decision #3) explicitly.
- [ ] **Step 4:** Replace `## Known Plan-3 deferrals (do not fix in Plan 2)` with `## Plan-3 wiring (shipped)`:
  - **RGB→OKLCH** — the render extension emits OKLCH into `computed.json` (boundary); `engine/color.mjs` `lightnessOf` accepts oklch/rgb/hex so G40-41 scores any computed pair.
  - **CLI flags** — `--render`/`--viewports`/`--log` ship the full 13-detector suite end-to-end.
  - **ctx mutation** — `orchestrate()` is non-mutating; fresh ctx per iteration is the caller's default.
  - **Vision pass** — protocol-level: the model calls `keystone_render` then `describe_image` with the 18-question prompt (gates.md § The vision pass). The engine does not call vision.
- [ ] **Step 5:** Update the Phase-1 note that says vision gates "ship in Plan 3 with the @getpipher/vision integration" → "ship as a model-callable `describe_image` protocol (see gates.md § The vision pass)".

- [ ] **Step 6: Commit.**
```bash
git add skills/keystone/references/engine.md
git commit -m "docs(engine): document Plan-3 wiring (resolved deferrals + flags)"
```
- [ ] **Acceptance:** `grep -c "Known Plan-3 deferrals" skills/keystone/references/engine.md` = 0; `grep -c "Plan-3 wiring" …` = 1; the full CLI example with all four flags appears; the orchestrator section states non-mutating.

---

### Task 9: SKILL.md — Step 7 rewrite (real engine-verified flow)

**Files:** Modify `skills/keystone/SKILL.md` (Step 7 + the preview/honesty-contract wording). **Controller-written** — this is the canonical flow doc; CIPHER authors it.
**Interfaces:** Step 7 becomes the real 3+2 iterate-until-pass loop. Step 7.1 runs the full CLI with `--render --viewports --log`. Step 7.2 runs the vision pass via `keystone_render` + `describe_image` (the 18-question prompt from gates.md), cap 2. Step 7.3 resolution (ship-with-declared-failures). Step 7.4 stamp + log. The "vision: pending Plan 3" parenthetical is removed.

- [ ] **Step 1:** Replace the `### 7. The slop test (engine-verified)` section. New text:
  ```markdown
  ### 7. The slop test (engine-verified)

  **Run the engine — do not imagine the render.** Hallmark's Step 7 asks the model to "run 58 gates in your head"; Keystone's Step 7 runs a real engine. See [`references/engine.md`](references/engine.md) for the loop and [`references/gates.md`](references/gates.md) for the gate list (and § The vision pass for the 18-question prompt).

  - **7.1 DETERMINISTIC PASS**
    `bash: node engine/check-gates.mjs --html <path> --css <path> --log .keystone/log.json --render --viewports 1280,375,320,414,768 --out <dir>`
    → `keystone-report.json` + `keystone-report.html` + `keystone-render/` (screenshots + `computed.json` + `viewports.json`).
    All 13 detectors run: the 11 CSS/HTML-only gates parse the source; G34 (horizontal scroll) + G44 (hero fit) read the viewport metrics; G40-41 (contrast) read the OKLCH computed pairs; G8/G32 (diversification) diff the CSS stamp against `.keystone/log.json`.
    If any Deterministic gate FAILs: read the fix suggestions, apply, re-emit, re-run.
    **Cap: 3 deterministic iterations.** (Fast path: drop `--render` to run only the 11 source-only gates between full renders — cheaper iteration for pure-token fixes.)

  - **7.2 VISION PASS**
    `keystone_render({ htmlPath, viewports: [1280, 375] })` → `describe_image({ image_paths: [<1280.png>, <375.png>], prompt: <the 18-question prompt from gates.md § The vision pass> })`.
    Read each verdict. Any FAIL (except G46, which flags rather than auto-fails) → apply the fix, re-render, re-vision.
    **Cap: 2 vision iterations.** S1 (*"does this look AI-generated?"*) is the thesis gate Hallmark cannot ask.

  - **7.3 RESOLUTION**
    - 58/58 pass → preview row: `Slop test · 58/58 ✓ (engine-verified) — ./keystone-report.html`
    - Failures remain → preview row: `Slop test · N/58 — fails: <gate #s> (engine-verified)` — **ship with declared failures, never silently claim pass.**

  - **7.4 STAMP + LOG**
    - Fill the CSS stamp's `gates:` field: `gates: 58/58 engine-verified` (or `gates: 52/58 — fails: 3,47,54 engine-verified`).
    - Append the gate result to `.keystone/log.json`.

  **The honesty contract:** unlimited iterations are token inferno. 3 + 2 is the cap. Saying "52/58, here's what I couldn't fix" is better than claiming 58/58 on imagination. Re-emit the Step 5 preview block with the real score after the engine runs — the preview is the durable summary; it's wrong to ship if it lies.
  ```
- [ ] **Step 2:** Remove the `(Plan 3 — @getpipher/vision integration; until then, run the deterministic gates and declare vision gates as "vision: pending Plan 3")` parenthetical (now resolved).

- [ ] **Step 3:** Commit.
```bash
git add skills/keystone/SKILL.md
git commit -m "feat(skill): real engine-verified Step 7 (3+2 iterate loop, vision pass)"
```
- [ ] **Acceptance:** `grep -c "pending Plan 3" skills/keystone/SKILL.md` = 0; Step 7.2 names `keystone_render` + `describe_image` + the 18 questions + cap 2; Step 7.1 shows the full CLI with all four flags.

---

### Task 10: Structural lint assertions (vision prompt + Step 7 + engine flags)

**Files:** Modify `test/lint-skill.mjs`.
**Interfaces:** New lint tests asserting: (a) `gates.md` contains the "The vision pass — the 18-question prompt" heading + all 18 gate tokens in the prompt block; (b) `SKILL.md` Step 7.2 references `describe_image` + `keystone_render` + a cap of 2 vision iterations; (c) `engine.md` documents `--render`, `--viewports`, `--log` + states the orchestrator is non-mutating; (d) no `pending Plan 3` remains in SKILL.md or gates.md.

- [ ] **Step 1:** Add the assertions to `test/lint-skill.mjs` (follow the existing pattern — `readFileSync` + `assert.match` / `assert.ok`):
  - `gates.md` includes `## The vision pass — the 18-question prompt`.
  - The prompt block in gates.md contains all of: `G6`, `G9`, `G29`, `G42`, `G43`, `G44`, `G45`, `G38a`, `G30`, `G46`, `G47`, `G35`, `G36`, `S1`, `S2`, `S3` (16 gate tokens; G6..S3 — assert each appears in the vision-prompt section region).
  - `SKILL.md` Step 7.2 block contains `describe_image`, `keystone_render`, `Cap: 2 vision iterations` (or equivalent cap wording).
  - `SKILL.md` does NOT contain `pending Plan 3`.
  - `gates.md` does NOT contain `pending Plan 3` on a vision `Checker:` line (the `(Plan 3)` → `(see § The vision pass)` swap from Task 7).
  - `engine.md` contains `--render`, `--viewports`, `--log`, and `does not mutate` (the ctx-clone statement).
- [ ] **Step 2:** Run `node --test test/lint-skill.mjs` → GREEN (was 90; now 90 + new assertions; the count grows by the number of `test(...)` blocks added — track it for the final tally).
- [ ] **Step 3:** Commit.
```bash
git add test/lint-skill.mjs
git commit -m "test(lint): assert vision-prompt block + Step 7 + engine flags (Plan 3)"
```
- [ ] **Acceptance:** lint suite GREEN; new assertions present; total lint count recorded for the handoff.

---

### Task 11: Final coherence review + dogfood + PR #4 + handoff

**Files:** Full-suite test run; a dogfood render of one theme's worked example; PR; handoff doc.
**Interfaces:** All tests green; one end-to-end dogfood (render a worked-example HTML from a Plan 2b theme through the full CLI with `--render` + a `describe_image` vision pass) proves the loop; PR #4 merged; handoff updated for Plan 4/1b.

- [ ] **Step 1: Full test suite.**
  ```bash
  npm test                                                  # engine (39 + new)
  node --import tsx --test test/extensions/render.test.mjs  # render (1 + new)
  node --test test/lint-skill.mjs                           # lint (90 + new)
  ```
  All GREEN. Record the three counts for the handoff.

- [ ] **Step 2: Dogfood — one theme's worked example through the full loop.** Pick `midnight.md` (CIPHER's exemplar — its worked example is engine-clean). Build the worked-example HTML/CSS into `/tmp/keystone-dogfood/`, create `.keystone/log.json` with one prior differing macro (so G8 passes — proves the `--log` path). Run:
  ```bash
  node engine/check-gates.mjs --html /tmp/keystone-dogfood/index.html --css /tmp/keystone-dogfood/index.css --log /tmp/keystone-dogfood/.keystone/log.json --render --viewports 1280,375,320,414,768 --out /tmp/keystone-dogfood/out
  ```
  Confirm the report includes G34, G40, G44, G8 results (the render-dependent gates now score). Then run the vision pass by hand: call `describe_image` with `image_paths: [<1280.png>, <375.png>]` (from `out/keystone-render/`) + the 18-question prompt (copy from gates.md). Read the verdicts. This proves the protocol end-to-end. (This is a manual model step — CIPHER does it in-session; record the verdict count in the handoff.)

- [ ] **Step 3: Final coherence review (challenge step).** Re-read the four changed prose files (gates.md vision block, engine.md, SKILL.md Step 7) + the four changed code files (color.mjs, orchestrate.mjs, check-gates.mjs, render.ts). Ask: what could break? what did I miss? Specifically check: (a) does the `--render` path's tsx bootstrap work under plain `node` (not just `--import tsx`)? test it; (b) does the hero heuristic false-positive on pages with no `<header>`/`<section>` (the `closest()` falls back to `null` → `cta` null → G44 passes — confirm); (c) does the OKLCH conversion produce sane C/H for pure greys (chroma ~0, H=0 not NaN)? (d) does the `--log` test's fixture macro name actually match `stamp-valid.css`?

- [ ] **Step 4: Push + PR.**
  ```bash
  git push -u origin feat/build-flow-3
  gh pr create --title "feat: engine-verified Step 7 (build-flow integration · Plan 3)" \
    --body "Plan 3 — wires the real engine-verified Step 7: RGB→OKLCH (G40-41), --render/--viewports/--log CLI flags, viewport metrics for G34/G44, ctx-clone fix, the describe_image vision pass protocol, SKILL.md Step 7 rewrite. 130+ tests green. Closes the Plan-3 deferrals from engine.md." \
    --base master
  ```
  Wait for CI (none yet — Plan 5), self-review the diff, then:
  ```bash
  gh pr merge 4 --merge --delete-branch
  git checkout master && git pull && git branch -d feat/build-flow-3
  ```

- [ ] **Step 5: Update the handoff.** Write `~/Documents/secret/strategy/keystone/session-handoff-2026-08-03.md` (Plan 3 shipped + merged; record the new test counts, the dogfood verdicts, the resolved deferrals, and what remains — Plan 1b / Plan 4 / Plan 5). Update the progress table: Phase 3 → `[x] DONE | #4 (merged)`. Point the memory handoff-pointer to the new file.

- [ ] **Acceptance:** all tests green; PR #4 merged; master advances; handoff + pointer updated; the next session's starter prompt names Plan 4 (audit verb) or Plan 1b (remaining gates) as ★ next — RECTOR's call.

---

## Out of scope (explicit)

- **Plan 1b (remaining ~28 deterministic gates)** — mechanical fill-in + full APCA W3 lookup. Open; can run before/after Plan 3. Not touched here.
- **Plan 4 (audit verb)** — path + URL modes, ranked punch list, severity tiers. Uses the same engine; no iterate loop. Not touched here.
- **Plan 5 (examples + publish)** — 5 demos, 8-brief gallery, CI, flip to public, npm publish. Not touched here.
- **The 8 deep theme specs** — frozen (Plan 2b). Plan 3 does not edit them.
- **A programmatic vision API in the engine** — deliberately out. Vision is a model-callable `describe_image` protocol; the engine stays deterministic + scriptable. (Revisit only if a future plan wants CI-graded vision — would need a stable vision API key + a fixtures corpus.)
- **Hero-element markup convention (`data-keystone-hero`)** — deliberately not added. The render extension uses a heuristic (decision #3) so theme specs don't have to emit extra attributes. Plan 1b can refine if the heuristic proves fragile.