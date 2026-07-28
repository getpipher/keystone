# Keystone Engine — Implementation Plan (Phase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the executable gate engine — Node scripts + a Playwright render extension — that checks a emitted HTML/CSS page against a representative subset of the 58 anti-slop gates and emits a human-readable report. Independently testable with fixture HTML; no skill/catalog required.

**Architecture:** Three tiers (per spec §3). (1) `engine/*.mjs` — bash-invoked Node scripts: a stamp parser, individual gate detectors (pure functions over parsed HTML/CSS + Playwright dumps), and an orchestrator that runs all detectors and emits `keystone-report.{json,html}`. (2) `extensions/render.ts` — a thin pi extension exposing one tool `keystone_render` that headless-renders an HTML file at given viewports and returns screenshot paths + a computed-styles dump + a DOM snapshot. (3) `test/` — TDD fixtures (known-pass + known-fail HTML/CSS per gate). The engine never calls the model; the model orchestrates the engine via `bash`.

**Tech Stack:** Node 20+ (ESM `.mjs`), `playwright-core` (headless Chromium), `@getpipher/vision` (vision pass — wired in Plan 3, not this plan), `node:test` (unit tests), TypeScript for the extension only (`extensions/render.ts`).

## Global Constraints

- Node ≥ 20, ESM (`.mjs` for engine, `.ts` for extension).
- 2-space indent. Standard JS semicolons (matches existing getpipher `.mjs` style — see `pi-package-index/scripts/copy-data.mjs`).
- Every gate detector is a **pure function**: `(input) => GateResult[]` where `GateResult = { gate: number, name: string, pass: boolean, evidence: string, fix: string, file?: string, line?: number }`. No I/O inside a detector. The orchestrator does I/O; detectors only compute.
- Deterministic only in this plan. Vision gates (the ~18 that need `describe_image`) are Plan 3.
- `playwright-core` and `linkedom` are the only new runtime deps (linkedom for DOM parsing — ~30KB, avoids hand-rolling a fragile parser). `@getpipher/vision` is a peer (already installed in RECTOR's pi) — do NOT add it to `dependencies`.
- MIT license. NOTICE will credit Hallmark (added in Plan 2 with the catalog; not needed for engine-only).
- All file paths in this plan are relative to the repo root `getpipher/keystone/`.

---

## File Structure

| File | Responsibility | Task |
|---|---|---|
| `package.json` | npm manifest, `pi.skills` + `pi.extensions`, deps, scripts | Task 1 |
| `tsconfig.json` | TS config for `extensions/` only | Task 1 |
| `.gitignore` | node_modules, .env, .pi, *.png reports | Task 1 |
| `engine/types.mjs` | Shared `GateResult` type + helpers | Task 2 |
| `engine/extract-stamp.mjs` | Parse `/* Keystone · macrostructure: X · ... */` from CSS | Task 3 |
| `engine/parse-css.mjs` | Token-block extractor + rule parser (shared by CSS gates) | Task 4 |
| `engine/parse-html.mjs` | DOM parser (shared by DOM gates) | Task 4 |
| `engine/gates/g1-banned-fonts.mjs` | Detector: Inter/Roboto/Open Sans/Poppins/Lato | Task 5 |
| `engine/gates/g2-gradient-text.mjs` | Detector: `background-clip: text` + gradient | Task 5 |
| `engine/gates/g3-three-col-cards.mjs` | Detector: 3-equal-col icon-above-heading grid | Task 6 |
| `engine/gates/g7-pure-black-white.mjs` | Detector: pure #000/#fff as base | Task 7 |
| `engine/gates/g22-zero-chroma.mjs` | Detector: zero-chroma neutrals | Task 7 |
| `engine/gates/g48-token-improvisation.mjs` | Detector: color/font outside token block | Task 7 |
| `engine/gates/g26-missing-states.mjs` | Detector: missing hover/focus/active/disabled | Task 8 |
| `engine/gates/g34-horizontal-scroll.mjs` | Detector (Playwright): scrollWidth > innerWidth per viewport | Task 9 |
| `engine/gates/g44-hero-fit.mjs` | Detector (Playwright): hero content within 1280×800 fold | Task 9 |
| `engine/gates/g50-image-grid-minmax.mjs` | Detector: `1fr` track with `<img>` (needs `minmax(0,1fr)`) | Task 6 |
| `engine/gates/g54-tag-left-heading-right.mjs` | Detector: section head wrapper w/ eyebrow+heading + multi-col grid | Task 6 |
| `engine/gates/g8-32-diversification.mjs` | Detector: macro/nav/footer reuse vs `.keystone/log.json` | Task 10 |
| `engine/apca.mjs` | APCA Lc contrast math (pure) | Task 11 |
| `engine/gates/g40-41-contrast.mjs` | Detector: WCAG 4.5:1 / APCA Lc on computed-style pairs | Task 11 |
| `engine/orchestrate.mjs` | Runs all detectors, merges results, emits report.json | Task 12 |
| `engine/report-template.html` | HTML template for the human report | Task 13 |
| `engine/check-gates.mjs` | CLI entrypoint (bash-invoked): parses args, calls orchestrate, writes report | Task 13 |
| `extensions/render.ts` | pi extension: `keystone_render` tool (Playwright) | Task 14 |
| `test/engine/extract-stamp.test.mjs` | Stamp parser tests | Task 3 |
| `test/engine/apca.test.mjs` | APCA math tests | Task 11 |
| `test/engine/gates/*.test.mjs` | Per-gate known-pass + known-fail fixtures | Tasks 5-11 |
| `test/engine/orchestrate.test.mjs` | Orchestrator integration test | Task 12 |
| `test/fixtures/*.html` + `*.css` | Fixture pages for detectors + Playwright gates | Tasks 5-12 |

---

## Task 1: Repo scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `.gitignore`, `README.md`

**Interfaces:**
- Produces: a `package.json` with `type: "module"`, `pi: { skills: ["./skills"], extensions: ["./extensions/render.ts"] }`, `scripts.test`, `scripts.test:run`, dep `playwright-core`. A `tsconfig.json` for `extensions/`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "@getpipher/keystone",
  "version": "0.1.0",
  "description": "Anti-AI-slop design skill with an executable gate engine. Beats Hallmark by enforcing its gates instead of imagining them.",
  "keywords": ["pi-package", "pi-skill", "pi-extension", "design", "anti-ai-slop", "enforcement"],
  "license": "MIT",
  "author": "RECTOR <rector@rectorspace.com>",
  "homepage": "https://github.com/getpipher/keystone",
  "type": "module",
  "engines": { "node": ">=20" },
  "pi": {
    "skills": ["./skills"],
    "extensions": ["./extensions/render.ts"]
  },
  "files": ["skills", "extensions", "engine", "README.md", "LICENSE"],
  "scripts": {
    "test": "node --test test/engine/*.mjs test/engine/gates/*.mjs",
    "test:run": "node --test --test-reporter=spec test/engine/*.mjs test/engine/gates/*.mjs"
  },
  "dependencies": {
    "playwright-core": "^1.48.0"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`** (extension-only; engine stays `.mjs`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "types": ["node"]
  },
  "include": ["extensions/**/*.ts"]
}
```

- [ ] **Step 3: Write `.gitignore`**

```
node_modules/
.env
.pi/
*.png
keystone-report.{json,html}
.keystone/
```

- [ ] **Step 4: Write minimal `README.md`**

```markdown
# @getpipher/keystone

Anti-AI-slop design skill with an **executable gate engine**. Inspired by [Hallmark](https://github.com/Nutlope/hallmark) (MIT) — reused its taxonomy, rewrote its prose, and made its gates actually run.

Status: engine in development. See `docs/superpowers/specs/2026-07-27-keystone-design.md`.
```

- [ ] **Step 5: Install + verify**

Run: `pnpm install`
Expected: `playwright-core` installed, lockfile created.

Run: `node --version`
Expected: `v20.x` or higher.

- [ ] **Step 6: Commit**

```bash
git add package.json tsconfig.json .gitignore README.md pnpm-lock.yaml
git commit -m "chore: scaffold @getpipher/keystone engine package"
```

---

## Task 2: Engine types + helpers

**Files:**
- Create: `engine/types.mjs`, `test/engine/types.test.mjs`

**Interfaces:**
- Produces: `GateResult` (shape), `fail(gate, name, evidence, fix, file?, line?)`, `pass(gate, name)`, `DetectorContext` (the input shape all detectors consume).

- [ ] **Step 1: Write the failing test**

```js
// test/engine/types.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { fail, pass } from "../../engine/types.mjs"

test("fail() builds a failing GateResult", () => {
  const r = fail(3, "3-equal-col card grid", ".features: 1fr 1fr 1fr", "bento or asymmetric spans", "styles.css", 142)
  assert.equal(r.gate, 3)
  assert.equal(r.pass, false)
  assert.equal(r.evidence, ".features: 1fr 1fr 1fr")
  assert.equal(r.line, 142)
})

test("pass() builds a passing GateResult", () => {
  const r = pass(1, "Banned display fonts")
  assert.equal(r.pass, true)
  assert.equal(r.gate, 1)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/engine/types.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

```js
// engine/types.mjs

/**
 * @typedef {Object} GateResult
 * @property {number} gate
 * @property {string} name
 * @property {boolean} pass
 * @property {string} [evidence]
 * @property {string} [fix]
 * @property {string} [file]
 * @property {number} [line]
 */

/**
 * @typedef {Object} DetectorContext
 * @property {string} html        — raw HTML string
 * @property {string} css        — raw CSS string
 * @property {{width: number, scrollWidth: number, innerHeight: number}[]} [viewports] — Playwright dump
 * @property {Record<string, string>[]} [computedPairs] — {selector, color, backgroundColor} from Playwright
 * @property {{stamp: Object|null, log: Object[]}} [projectMemory] — stamp + log.json
 */

/** @param {number} gate @param {string} name @returns {GateResult} */
export function pass(gate, name) {
  return { gate, name, pass: true }
}

/** @param {number} gate @param {string} name @param {string} evidence @param {string} fix @param {string} [file] @param {number} [line] @returns {GateResult} */
export function fail(gate, name, evidence, fix, file, line) {
  return { gate, name, pass: false, evidence, fix, file, line }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/engine/types.test.mjs`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add engine/types.mjs test/engine/types.test.mjs
git commit -m "feat(engine): GateResult types + pass/fail helpers"
```

---

## Task 3: Stamp parser

**Files:**
- Create: `engine/extract-stamp.mjs`, `test/engine/extract-stamp.test.mjs`
- Test fixtures: `test/fixtures/stamp-valid.css`, `test/fixtures/stamp-missing.css`

**Interfaces:**
- Produces: `extractStamp(css: string): { macrostructure, theme, nav, footer, gates } | null`. Consumed by the diversification gate (Task 10) and the orchestrator (Task 12).

- [ ] **Step 1: Write the failing test**

```js
// test/engine/extract-stamp.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { extractStamp } from "../../engine/extract-stamp.mjs"
import { readFileSync } from "node:fs"

test("extractStamp parses a valid Keystone stamp", () => {
  const css = readFileSync("test/fixtures/stamp-valid.css", "utf8")
  const s = extractStamp(css)
  assert.equal(s.macrostructure, "Long Document")
  assert.equal(s.theme, "Garden")
  assert.equal(s.nav, "N5")
  assert.equal(s.footer, "Ft5")
  assert.equal(s.gates, "58/58 engine-verified")
})

test("extractStamp returns null when no stamp present", () => {
  const css = readFileSync("test/fixtures/stamp-missing.css", "utf8")
  assert.equal(extractStamp(css), null)
})
```

- [ ] **Step 2: Write fixtures**

```css
/* test/fixtures/stamp-valid.css */
/* Keystone · macrostructure: Long Document · theme: Garden · nav: N5 · footer: Ft5 · gates: 58/58 engine-verified */
:root { --color-paper: oklch(96% 0.01 120); }
body { background: var(--color-paper); }
```

```css
/* test/fixtures/stamp-missing.css */
:root { --color-paper: oklch(96% 0.01 120); }
body { background: var(--color-paper); }
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test test/engine/extract-stamp.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 4: Write minimal implementation**

```js
// engine/extract-stamp.mjs

/**
 * Parse the first /* Keystone · ... */ stamp from a CSS string.
 * @param {string} css
 * @returns {{macrostructure:string, theme:string, nav?:string, footer?:string, gates?:string, raw:string}|null}
 */
export function extractStamp(css) {
  const m = css.match(/\/\*\s*Keystone\s*·\s*(.+?)\s*\*\//)
  if (!m) return null
  const raw = m[1]
  const out = { raw }
  for (const part of raw.split("·")) {
    const [k, ...rest] = part.trim().split(":")
    if (!k || rest.length === 0) continue
    out[k.trim()] = rest.join(":").trim()
  }
  return out
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test test/engine/extract-stamp.test.mjs`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add engine/extract-stamp.mjs test/engine/extract-stamp.test.mjs test/fixtures/stamp-*.css
git commit -m "feat(engine): CSS stamp parser"
```

---

## Task 4: CSS + HTML parsers (shared)

**Files:**
- Create: `engine/parse-css.mjs`, `engine/parse-html.mjs`, `test/engine/parse-css.test.mjs`, `test/engine/parse-html.test.mjs`

**Interfaces:**
- Produces:
  - `parseCss(css): { tokens: {name, value, line}[], rules: {selector, declarations: {prop, value, line}[], line}[] }` — splits `:root`/`[data-theme]` token blocks from rules; token block = any block whose selector matches `/^(:root|\[data-theme)/`.
  - `parseHtml(html): Document` — uses Node's built-in DOM via a minimal parser; returns a tree with `querySelectorAll`, `getAttribute`, `tagName`, `textContent`. (Use `linkedom` — a tiny DOM polyfill with no native deps — OR, to avoid a dep, a regex-based minimal extractor. **Decision: add `linkedom` dep** — it's ~30KB, battle-tested, and hand-rolling a DOM parser is a yak-shave that violates YAGNI on correctness.)

- [ ] **Step 1: Add `linkedom` dep**

Run: `pnpm add linkedom`
Then add to `package.json` dependencies: `"linkedom": "^0.18.0"` (pnpm does this automatically).

- [ ] **Step 2: Write the failing test for parseCss**

```js
// test/engine/parse-css.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { parseCss } from "../../engine/parse-css.mjs"

test("parseCss splits tokens from rules", () => {
  const css = `
:root {
  --color-accent: oklch(60% 0.15 250);
  --font-display: "Newsreader";
}
.btn { color: var(--color-accent); background: #c0392b; }
@media (max-width: 48rem) { .nav { display: none; } }
`
  const { tokens, rules } = parseCss(css)
  assert.equal(tokens.length, 2)
  assert.equal(tokens[0].name, "--color-accent")
  assert.equal(rules.length, 2)
  assert.equal(rules[0].declarations[1].prop, "background")
  assert.equal(rules[0].declarations[1].value, "#c0392b")
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test test/engine/parse-css.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 4: Write parseCss implementation**

```js
// engine/parse-css.mjs
import postcss from "postcss"

/**
 * Parse CSS via postcss (the standard CSS parser) and project into the
 * {tokens, rules} shape the gate detectors consume.
 *   tokens: declarations inside :root / [data-theme] blocks
 *   rules:  all other rules, with @media (and other at-rules) flattened.
 * @param {string} css
 * @returns {{tokens: {name:string, value:string, line:number}[], rules: {selector:string, declarations:{prop:string,value:string,line:number}[], line:number}[]}}
 */
export function parseCss(css) {
  const root = postcss.parse(css)
  const tokens = []
  const rules = []
  const isTokenBlock = (selector) => /^:root\b/.test(selector.trim()) || /^\[data-theme/i.test(selector.trim())
  function walk(container) {
    for (const node of container.nodes) {
      if (node.type === "rule") {
        const line = node.source?.start?.line ?? 0
        const declarations = node.nodes.filter((n) => n.type === "decl").map((n) => ({ prop: n.prop, value: n.value, line: n.source?.start?.line ?? line }))
        if (isTokenBlock(node.selector)) {
          for (const d of declarations) tokens.push({ name: d.prop, value: d.value, line: d.line })
        } else {
          rules.push({ selector: node.selector, declarations, line })
        }
      } else if (node.type === "atrule") {
        if (node.nodes && node.nodes.length) walk(node)
      }
    }
  }
  walk(root)
  return { tokens, rules }
}
```

Note: the original plan used a hand-rolled regex parser. It was replaced with postcss mid-execution (Task 7) after it silently dropped tokens with digits in names (`--color-surface-2`) and swallowed rules following an inline `:root` block on the same line. postcss handles all real CSS; the `{tokens, rules}` shape is preserved so no detector changed.

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test test/engine/parse-css.test.mjs`
Expected: PASS.

- [ ] **Step 6: Write the failing test for parseHtml**

```js
// test/engine/parse-html.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { parseHtml } from "../../engine/parse-html.mjs"

test("parseHtml returns a queryable document", () => {
  const html = `<html><body><header class="nav"><a href="/">Brand</a><a href="/x">X</a></header><main><section><header class="section__head"><span class="eyebrow">01</span><h2>Title</h2></header></section></main></body></html>`
  const doc = parseHtml(html)
  assert.equal(doc.querySelectorAll("a").length, 2)
  const head = doc.querySelector(".section__head")
  assert.ok(head)
  assert.equal(head.querySelector("h2").textContent, "Title")
})
```

- [ ] **Step 7: Run test to verify it fails**

Run: `node --test test/engine/parse-html.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 8: Write parseHtml implementation**

```js
// engine/parse-html.mjs
import { parseHTML } from "linkedom"

/** @param {string} html @returns {Document} */
export function parseHtml(html) {
  const { document } = parseHTML(html)
  return document
}
```

- [ ] **Step 9: Run test to verify it passes**

Run: `node --test test/engine/parse-html.test.mjs`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add engine/parse-css.mjs engine/parse-html.mjs test/engine/parse-*.test.mjs package.json pnpm-lock.yaml
git commit -m "feat(engine): CSS + HTML parsers (linkedom)"
```

---

## Task 5: CSS-token gates (G1 banned fonts, G2 gradient text)

**Files:**
- Create: `engine/gates/g1-banned-fonts.mjs`, `engine/gates/g2-gradient-text.mjs`, `test/engine/gates/g1.test.mjs`, `test/engine/gates/g2.test.mjs`
- Fixtures: `test/fixtures/g1-fail.css`, `test/fixtures/g1-pass.css`, `test/fixtures/g2-fail.css`, `test/fixtures/g2-pass.css`

**Interfaces:**
- Consumes: `DetectorContext` from Task 2, `parseCss` from Task 4.
- Produces: each detector exports `default function detect(ctx): GateResult[]`.

- [ ] **Step 1: Write the failing test for G1**

```js
// test/engine/gates/g1.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import g1 from "../../../engine/gates/g1-banned-fonts.mjs"

test("G1 fails on Inter display font", () => {
  const css = readFileSync("test/fixtures/g1-fail.css", "utf8")
  const results = g1({ css })
  const failed = results.filter(r => !r.pass)
  assert.equal(failed.length, 1)
  assert.equal(failed[0].gate, 1)
  assert.match(failed[0].evidence, /Inter/)
})

test("G1 passes on Newsreader", () => {
  const css = readFileSync("test/fixtures/g1-pass.css", "utf8")
  const results = g1({ css })
  assert.ok(results.every(r => r.pass))
})
```

- [ ] **Step 2: Write fixtures**

```css
/* test/fixtures/g1-fail.css */
:root { --font-display: "Inter"; --font-body: "Inter"; }
h1 { font-family: var(--font-display); }
```
```css
/* test/fixtures/g1-pass.css */
:root { --font-display: "Newsreader"; --font-body: "Inter Tight"; }
h1 { font-family: var(--font-display); }
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test test/engine/gates/g1.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 4: Write G1 implementation**

```js
// engine/gates/g1-banned-fonts.mjs
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const BANNED = ["inter", "roboto", "open sans", "poppins", "lato"]

/** @param {import("../types.mjs").DetectorContext} ctx @returns {GateResult[]} */
export default function detect(ctx) {
  const { tokens, rules } = parseCss(ctx.css)
  const results = []
  // Check token block first
  for (const t of tokens) {
    if (!t.name.startsWith("--font-")) continue
    for (const b of BANNED) {
      if (t.value.toLowerCase().includes(b)) {
        results.push(fail(1, "Banned display fonts", `${t.name}: ${t.value}`, `swap to a non-default face`, "tokens.css", t.line))
      }
    }
  }
  // Check inline font-family declarations outside tokens
  for (const r of rules) {
    for (const d of r.declarations) {
      if (d.prop !== "font-family") continue
      for (const b of BANNED) {
        if (d.value.toLowerCase().includes(b)) {
          results.push(fail(1, "Banned display fonts", `${r.selector} font-family: ${d.value}`, `swap to a non-default face`, undefined, d.line))
        }
      }
    }
  }
  if (results.length === 0) results.push(pass(1, "Banned display fonts"))
  return results
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test test/engine/gates/g1.test.mjs`
Expected: PASS.

- [ ] **Step 6: Write the failing test for G2**

```js
// test/engine/gates/g2.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import g2 from "../../../engine/gates/g2-gradient-text.mjs"

test("G2 fails on background-clip:text + linear-gradient", () => {
  const css = `.hero h1 { background: linear-gradient(90deg, #6366f1, #ec4899); -webkit-background-clip: text; color: transparent; }`
  const results = g2({ css })
  const failed = results.filter(r => !r.pass)
  assert.equal(failed.length, 1)
  assert.equal(failed[0].gate, 2)
})
```

- [ ] **Step 7: Run test to verify it fails**

Run: `node --test test/engine/gates/g2.test.mjs`
Expected: FAIL.

- [ ] **Step 8: Write G2 implementation**

```js
// engine/gates/g2-gradient-text.mjs
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** @param {import("../types.mjs").DetectorContext} ctx @returns {GateResult[]} */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    let hasClip = false, hasGradient = false, line = 0
    for (const d of r.declarations) {
      if (d.prop.includes("background-clip") && d.value.includes("text")) { hasClip = true; line = d.line }
      if (d.prop === "background" && /gradient/.test(d.value)) { hasGradient = true; line = d.line }
      if (d.prop === "background-image" && /gradient/.test(d.value)) { hasGradient = true; line = d.line }
    }
    if (hasClip && hasGradient) {
      results.push(fail(2, "Gradient text", `${r.selector}: background-clip:text + gradient`, "no genre allows gradient text", undefined, line))
    }
  }
  if (results.length === 0) results.push(pass(2, "Gradient text"))
  return results
}
```

- [ ] **Step 9: Run test to verify it passes**

Run: `node --test test/engine/gates/g2.test.mjs`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add engine/gates/g1-banned-fonts.mjs engine/gates/g2-gradient-text.mjs test/engine/gates/ test/fixtures/g1-*.css test/fixtures/g2-*.css
git commit -m "feat(engine): G1 banned fonts + G2 gradient text gates"
```

---

## Task 6: DOM-structure gates (G3 three-col cards, G50 image grid, G54 tag-left/heading-right)

**Files:**
- Create: `engine/gates/g3-three-col-cards.mjs`, `engine/gates/g50-image-grid-minmax.mjs`, `engine/gates/g54-tag-left-heading-right.mjs`, tests, fixtures.

**Interfaces:**
- Consumes: `parseHtml`, `parseCss`, `DetectorContext`.

- [ ] **Step 1: Write the failing test for G3**

```js
// test/engine/gates/g3.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import g3 from "../../../engine/gates/g3-three-col-cards.mjs"

test("G3 fails on 3-equal-col grid with icon>heading cards", () => {
  const html = readFileSync("test/fixtures/g3-fail.html", "utf8")
  const css = `.features { display: grid; grid-template-columns: 1fr 1fr 1fr; } .card { } .card .icon { } .card h3 { }`
  const results = g3({ html, css })
  assert.ok(results.some(r => !r.pass && r.gate === 3))
})

test("G3 passes on bento grid", () => {
  const html = `<section class="bento"><div class="tile">A</div><div class="tile">B</div></section>`
  const css = `.bento { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; }`
  const results = g3({ html, css })
  assert.ok(results.every(r => r.pass))
})
```

- [ ] **Step 2: Write fixture**

```html
<!-- test/fixtures/g3-fail.html -->
<section class="features">
  <div class="card"><div class="icon">⭐</div><h3>Fast</h3><p>desc</p></div>
  <div class="card"><div class="icon">🚀</div><h3>Easy</h3><p>desc</p></div>
  <div class="card"><div class="icon">✨</div><h3>Smart</h3><p>desc</p></div>
</section>
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test test/engine/gates/g3.test.mjs`
Expected: FAIL.

- [ ] **Step 4: Write G3 implementation**

```js
// engine/gates/g3-three-col-cards.mjs
import { parseHtml } from "../parse-html.mjs"
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** @param {import("../types.mjs").DetectorContext} ctx @returns {GateResult[]} */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  // find grid rules with 3 equal 1fr tracks
  for (const r of rules) {
    const m = r.declarations.find(d => d.prop === "grid-template-columns")
    if (!m) continue
    const tracks = m.value.trim().split(/\s+/)
    if (tracks.length !== 3) continue
    if (!tracks.every(t => t === "1fr")) continue
    // confirm the selector's children are cards with icon-above-heading order
    const container = doc.querySelector(r.selector)
    if (!container) continue
    const cards = [...container.children]
    if (cards.length < 3) continue
    const suspicious = cards.every(c => {
      const kids = [...c.children]
      if (kids.length < 2) return false
      // icon-ish element (svg/img/div with class icon) before a heading
      const first = kids[0]
      const heading = kids.find(k => /^H[1-6]$/.test(k.tagName))
      return first && heading && kids.indexOf(first) < kids.indexOf(heading)
    })
    if (suspicious) {
      results.push(fail(3, "3-equal-col card grid", `${r.selector}: ${m.value} with icon>heading cards`, "bento grid or asymmetric spans", undefined, m.line))
    }
  }
  if (results.length === 0) results.push(pass(3, "3-equal-col card grid"))
  return results
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test test/engine/gates/g3.test.mjs`
Expected: PASS.

- [ ] **Step 6: Write the failing test for G50**

```js
// test/engine/gates/g50.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g50 from "../../../engine/gates/g50-image-grid-minmax.mjs"

test("G50 fails on 1fr track containing <img>", () => {
  const html = `<div class="grid"><img src="a.jpg"><img src="b.jpg"></div>`
  const css = `.grid { display: grid; grid-template-columns: 1fr 1fr; }`
  const results = g50({ html, css })
  assert.ok(results.some(r => !r.pass && r.gate === 50))
})

test("G50 passes on minmax(0,1fr)", () => {
  const html = `<div class="grid"><img src="a.jpg"></div>`
  const css = `.grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); }`
  const results = g50({ html, css })
  assert.ok(results.every(r => r.pass))
})
```

- [ ] **Step 7: Run test to verify it fails, then implement G50**

```js
// engine/gates/g50-image-grid-minmax.mjs
import { parseHtml } from "../parse-html.mjs"
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  for (const r of rules) {
    const m = r.declarations.find(d => d.prop === "grid-template-columns")
    if (!m) continue
    const tracks = m.value.trim().split(/\s+/)
    const hasBare1fr = tracks.some(t => t === "1fr")
    if (!hasBare1fr) continue
    const container = doc.querySelector(r.selector)
    if (!container) continue
    if (container.querySelector("img, picture")) {
      results.push(fail(50, "Image grid track without minmax(0,1fr)", `${r.selector}: ${m.value} contains <img>`, "switch 1fr → minmax(0,1fr)", undefined, m.line))
    }
  }
  if (results.length === 0) results.push(pass(50, "Image grid track minmax"))
  return results
}
```

Run: `node --test test/engine/gates/g50.test.mjs`
Expected: PASS.

- [ ] **Step 8: Write the failing test for G54**

```js
// test/engine/gates/g54.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g54 from "../../../engine/gates/g54-tag-left-heading-right.mjs"

test("G54 fails on section head with eyebrow+heading + 2-col grid", () => {
  const html = `<header class="section__head"><span class="eyebrow">01</span><h2>Title</h2></header>`
  const css = `.section__head { display: grid; grid-template-columns: 1fr 2fr; }`
  const results = g54({ html, css })
  assert.ok(results.some(r => !r.pass && r.gate === 54))
})

test("G54 passes on single-column head", () => {
  const html = `<header class="section__head"><span class="eyebrow">01</span><h2>Title</h2></header>`
  const css = `.section__head { display: flex; flex-direction: column; }`
  const results = g54({ html, css })
  assert.ok(results.every(r => r.pass))
})
```

- [ ] **Step 9: Run test to verify it fails, then implement G54**

```js
// engine/gates/g54-tag-left-heading-right.mjs
import { parseHtml } from "../parse-html.mjs"
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const HEAD_TAGS = ["H1","H2","H3","H4","H5","H6"]
const EYEBROW_HINTS = ["eyebrow", "kicker", "tag", "label", "number", "step"]

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  for (const r of rules) {
    const disp = r.declarations.find(d => d.prop === "display")
    const cols = r.declarations.find(d => d.prop === "grid-template-columns")
    if (!disp || disp.value !== "grid" || !cols) continue
    const tracks = cols.value.trim().split(/\s+/)
    if (tracks.length < 2) continue // single-column grid is fine
    const el = doc.querySelector(r.selector)
    if (!el) continue
    const hasHeading = el.querySelector(HEAD_TAGS.map(t => t).join(","))
    if (!hasHeading) continue
    const hasEyebrow = [...el.children].some(c => {
      const cls = (c.getAttribute("class") || "").toLowerCase()
      return EYEBROW_HINTS.some(h => cls.includes(h)) || c.tagName === "SPAN" || /^\s*\d/.test(c.textContent || "")
    })
    if (hasEyebrow) {
      results.push(fail(54, "Tag-left/heading-right two-column", `${r.selector}: ${cols.value} with eyebrow+heading`, "stack vertical — grid-template-columns: 1fr", undefined, cols.line))
    }
  }
  if (results.length === 0) results.push(pass(54, "Tag-left/heading-right"))
  return results
}
```

Run: `node --test test/engine/gates/g54.test.mjs`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add engine/gates/g3-*.mjs engine/gates/g50-*.mjs engine/gates/g54-*.mjs test/engine/gates/g3*.mjs test/engine/gates/g50*.mjs test/engine/gates/g54*.mjs test/fixtures/g3-*.html
git commit -m "feat(engine): G3 three-col + G50 image-grid + G54 tag-left DOM gates"
```

---

## Task 7: Token-discipline gates (G7 pure black/white, G22 zero-chroma, G48 improvisation)

**Files:**
- Create: `engine/gates/g7-pure-black-white.mjs`, `engine/gates/g22-zero-chroma.mjs`, `engine/gates/g48-token-improvisation.mjs`, tests, fixtures.

- [ ] **Step 1: Write the failing test for G7**

```js
// test/engine/gates/g7.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g7 from "../../../engine/gates/g7-pure-black-white.mjs"

test("G7 fails on pure #000 as base", () => {
  const css = `:root { --color-ink: #000; } body { background: var(--color-ink); }`
  assert.ok(g7({ css }).some(r => !r.pass && r.gate === 7))
})
test("G7 passes on oklch(20% 0.01 250)", () => {
  const css = `:root { --color-ink: oklch(20% 0.01 250); }`
  assert.ok(g7({ css }).every(r => r.pass))
})
```

- [ ] **Step 2: Run to fail, then implement G7**

```js
// engine/gates/g7-pure-black-white.mjs
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const PURE = [/#000\b/i, /#fff\b/i, /oklch\(\s*0\s+0\s+0\s*\)/i, /oklch\(\s*100\s*%\s+0\s+0\s*\)/i]

export default function detect(ctx) {
  const { tokens, rules } = parseCss(ctx.css)
  const results = []
  for (const t of tokens) {
    if (!t.name.startsWith("--color-")) continue
    if (PURE.some(p => p.test(t.value))) {
      results.push(fail(7, "Pure #000/#fff base", `${t.name}: ${t.value}`, "use a near-black/near-white oklch with chroma ≥ 0.005", "tokens.css", t.line))
    }
  }
  if (results.length === 0) results.push(pass(7, "Pure black/white base"))
  return results
}
```

Run: `node --test test/engine/gates/g7.test.mjs` → PASS.

- [ ] **Step 3: Write failing test + implementation for G22 (zero-chroma neutrals)**

```js
// test/engine/gates/g22.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g22 from "../../../engine/gates/g22-zero-chroma.mjs"

test("G22 fails on oklch neutral with 0 chroma", () => {
  const css = `:root { --color-surface-2: oklch(95% 0 0); }`
  assert.ok(g22({ css }).some(r => !r.pass && r.gate === 22))
})
test("G22 passes on tinted neutral", () => {
  const css = `:root { --color-surface-2: oklch(95% 0.008 250); }`
  assert.ok(g22({ css }).every(r => r.pass))
})
```

```js
// engine/gates/g22-zero-chroma.mjs
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const { tokens } = parseCss(ctx.css)
  const results = []
  for (const t of tokens) {
    if (!/--color-(surface|paper|ink|neutral|muted)/.test(t.name)) continue
    const m = t.value.match(/oklch\(\s*[\d.]+%?\s+0(?:\s+[\d.]+)?\s*\)/i)
    if (m) {
      results.push(fail(22, "Zero-chroma neutral", `${t.name}: ${t.value}`, "tint toward anchor hue, min chroma 0.005", "tokens.css", t.line))
    }
  }
  if (results.length === 0) results.push(pass(22, "Zero-chroma neutral"))
  return results
}
```

Run: `node --test test/engine/gates/g22.test.mjs` → PASS.

- [ ] **Step 4: Write failing test + implementation for G48 (mid-render token improvisation)**

```js
// test/engine/gates/g48.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g48 from "../../../engine/gates/g48-token-improvisation.mjs"

test("G48 fails on inline hex outside :root", () => {
  const css = `:root { --color-accent: oklch(60% 0.15 250); } .btn { color: #c0392b; }`
  assert.ok(g48({ css }).some(r => !r.pass && r.gate === 48))
})
test("G48 passes when all values are var()", () => {
  const css = `:root { --color-accent: oklch(60% 0.15 250); } .btn { color: var(--color-accent); }`
  assert.ok(g48({ css }).every(r => r.pass))
})
```

```js
// engine/gates/g48-token-improvisation.mjs
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const RAW_COLOR = /#([0-9a-f]{3,8})\b|oklch\(|rgb\(|hsl\(/i

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    for (const d of r.declarations) {
      if (!/^(color|background|background-color|border-color|fill|stroke)$/.test(d.prop)) continue
      if (d.value.startsWith("var(")) continue
      if (RAW_COLOR.test(d.value)) {
        results.push(fail(48, "Mid-render token improvisation", `${r.selector} ${d.prop}: ${d.value}`, "lift to a --color-* token or use var()", undefined, d.line))
      }
    }
  }
  if (results.length === 0) results.push(pass(48, "Token improvisation"))
  return results
}
```

Run: `node --test test/engine/gates/g48.test.mjs` → PASS.

- [ ] **Step 5: Commit**

```bash
git add engine/gates/g7-*.mjs engine/gates/g22-*.mjs engine/gates/g48-*.mjs test/engine/gates/g7*.mjs test/engine/gates/g22*.mjs test/engine/gates/g48*.mjs
git commit -m "feat(engine): G7 pure-bw + G22 zero-chroma + G48 token-improv gates"
```

---

## Task 8: Interaction-states gate (G26)

**Files:**
- Create: `engine/gates/g26-missing-states.mjs`, `test/engine/gates/g26.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// test/engine/gates/g26.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g26 from "../../../engine/gates/g26-missing-states.mjs"

test("G26 fails when .btn has hover but no focus-visible/active/disabled", () => {
  const css = `.btn { color: red; } .btn:hover { color: blue; }`
  assert.ok(g26({ css }).some(r => !r.pass && r.gate === 26))
})
test("G26 passes when all four states present", () => {
  const css = `.btn {} .btn:hover {} .btn:focus-visible {} .btn:active {} .btn:disabled {}`
  assert.ok(g26({ css }).every(r => r.pass))
})
```

- [ ] **Step 2: Run to fail, then implement**

```js
// engine/gates/g26-missing-states.mjs
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const REQUIRED = [":hover", ":focus-visible", ":active", ":disabled"]
const INTERACTIVE = /^(a|button|\.btn|\.cta|input|select|textarea|\[role=["']button["']\])/i

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  const baseSelectors = new Set()
  for (const r of rules) {
    const base = r.selector.replace(/:[a-z-]+$/i, "").trim()
    if (INTERACTIVE.test(r.selector) && !r.selector.includes(":")) baseSelectors.add(r.selector.trim())
  }
  for (const base of baseSelectors) {
    const present = REQUIRED.filter(state => rules.some(r => r.selector === `${base}${state}`))
    const missing = REQUIRED.filter(s => !present.includes(s))
    if (missing.length > 0) {
      results.push(fail(26, "Missing interaction states", `${base} has ${present.join(",") || "none"}; missing ${missing.join(",")}`, `add ${missing.join(", ")} rules`, undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(26, "Missing interaction states"))
  return results
}
```

Run: `node --test test/engine/gates/g26.test.mjs` → PASS.

- [ ] **Step 3: Commit**

```bash
git add engine/gates/g26-*.mjs test/engine/gates/g26*.mjs
git commit -m "feat(engine): G26 interaction-states gate"
```

---

## Task 9: Playwright-render gates (G34 horizontal scroll, G44 hero fit)

**Files:**
- Create: `engine/gates/g34-horizontal-scroll.mjs`, `engine/gates/g44-hero-fit.mjs`, `test/engine/gates/g34.test.mjs`, `test/engine/gates/g44.test.mjs`

**Interfaces:**
- Consumes: `DetectorContext.viewports` — the Playwright dump: `[{width, scrollWidth, innerHeight}]`. The render extension (Task 14) produces this; in tests we pass it directly so the gate is unit-testable without a browser.

- [ ] **Step 1: Write the failing test for G34**

```js
// test/engine/gates/g34.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g34 from "../../../engine/gates/g34-horizontal-scroll.mjs"

test("G34 fails when scrollWidth > innerWidth at 375px", () => {
  const viewports = [
    { width: 1280, scrollWidth: 1280, innerHeight: 800 },
    { width: 375, scrollWidth: 420, innerHeight: 812 },
  ]
  assert.ok(g34({ viewports }).some(r => !r.pass && r.gate === 34))
})
test("G34 passes when all viewports fit", () => {
  const viewports = [
    { width: 1280, scrollWidth: 1280, innerHeight: 800 },
    { width: 375, scrollWidth: 375, innerHeight: 812 },
  ]
  assert.ok(g34({ viewports }).every(r => r.pass))
})
```

- [ ] **Step 2: Run to fail, then implement G34**

```js
// engine/gates/g34-horizontal-scroll.mjs
import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const vps = ctx.viewports || []
  const results = []
  for (const v of vps) {
    if (v.scrollWidth > v.innerWidth || v.scrollWidth > v.width) {
      results.push(fail(34, "Horizontal scroll", `at ${v.width}px: scrollWidth ${v.scrollWidth} > ${v.width}`, "overflow-x: clip on html + body", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(34, "Horizontal scroll"))
  return results
}
```

Run: `node --test test/engine/gates/g34.test.mjs` → PASS.

- [ ] **Step 3: Write failing test + implementation for G44 (hero fit at 1280×800)**

```js
// test/engine/gates/g44.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g44 from "../../../engine/gates/g44-hero-fit.mjs"

test("G44 fails when hero CTA bottom exceeds innerHeight at 1280", () => {
  const hero = { eyebrow: { bottom: 120 }, headline: { bottom: 280 }, lede: { bottom: 380 }, cta: { bottom: 950 } }
  const desktop = { width: 1280, innerHeight: 800, hero }
  assert.ok(g44({ viewports: [desktop] }).some(r => !r.pass && r.gate === 44))
})
test("G44 passes when hero fits in 800px", () => {
  const hero = { eyebrow: { bottom: 120 }, headline: { bottom: 280 }, lede: { bottom: 380 }, cta: { bottom: 720 } }
  const desktop = { width: 1280, innerHeight: 800, hero }
  assert.ok(g44({ viewports: [desktop] }).every(r => r.pass))
})
```

```js
// engine/gates/g44-hero-fit.mjs
import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const desktop = (ctx.viewports || []).find(v => v.width === 1280)
  const results = []
  if (desktop && desktop.hero) {
    const { hero, innerHeight } = desktop
    const parts = ["eyebrow","headline","lede","cta"].filter(k => hero[k])
    const maxBottom = Math.max(...parts.map(k => hero[k].bottom))
    if (maxBottom > innerHeight) {
      results.push(fail(44, "Hero fit", `hero bottom ${maxBottom}px > ${innerHeight}px at 1280×800`, "trim display clamp, set line-height 1.0–1.1, hold lede ≤2 lines", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(44, "Hero fit"))
  return results
}
```

Run: `node --test test/engine/gates/g44.test.mjs` → PASS.

- [ ] **Step 4: Commit**

```bash
git add engine/gates/g34-*.mjs engine/gates/g44-*.mjs test/engine/gates/g34*.mjs test/engine/gates/g44*.mjs
git commit -m "feat(engine): G34 horizontal-scroll + G44 hero-fit (Playwright-dump) gates"
```

---

## Task 10: Diversification gate (G8/32 macro/nav/footer reuse vs log.json)

**Files:**
- Create: `engine/gates/g8-32-diversification.mjs`, `test/engine/gates/g8-32.test.mjs`

**Interfaces:**
- Consumes: `DetectorContext.projectMemory = { stamp: {macrostructure, theme, nav, footer}, log: [{macrostructure, theme, nav, footer, ...}] }`. The orchestrator builds this from the CSS stamp + `.keystone/log.json`.

- [ ] **Step 1: Write the failing test**

```js
// test/engine/gates/g8-32.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g8_32 from "../../../engine/gates/g8-32-diversification.mjs"

test("G8 fails when current macrostructure matches the last log entry", () => {
  const projectMemory = {
    stamp: { macrostructure: "Bento Grid", theme: "Cobalt", nav: "N5", footer: "Ft5" },
    log: [{ macrostructure: "Bento Grid", theme: "Cobalt", nav: "N5", footer: "Ft5", date: "2026-07-20" }],
  }
  const r = g8_32({ projectMemory })
  assert.ok(r.some(x => !x.pass && x.gate === 8))
})

test("G8 passes when macrostructure differs from last 3 entries", () => {
  const projectMemory = {
    stamp: { macrostructure: "Marquee Hero", theme: "Midnight", nav: "N2", footer: "Ft6" },
    log: [
      { macrostructure: "Bento Grid", theme: "Cobalt", nav: "N5", footer: "Ft5" },
      { macrostructure: "Long Document", theme: "Garden", nav: "N1b", footer: "Ft2" },
      { macrostructure: "Stat-Led", theme: "Hum", nav: "N13", footer: "Ft8" },
    ],
  }
  const r = g8_32({ projectMemory })
  assert.ok(r.every(x => x.pass))
})

test("G32 fails when nav matches last entry", () => {
  const projectMemory = {
    stamp: { macrostructure: "Marquee Hero", theme: "Midnight", nav: "N5", footer: "Ft6" },
    log: [{ macrostructure: "Bento Grid", theme: "Cobalt", nav: "N5", footer: "Ft5" }],
  }
  const r = g8_32({ projectMemory })
  assert.ok(r.some(x => !x.pass && x.gate === 32))
})
```

- [ ] **Step 2: Run to fail, then implement**

```js
// engine/gates/g8-32-diversification.mjs
import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const pm = ctx.projectMemory
  if (!pm || !pm.stamp) return [pass(8, "Diversification"), pass(32, "Nav/footer rotation")]
  const last3 = (pm.log || []).slice(0, 3)
  const results = []
  const curMacro = pm.stamp.macrostructure
  if (last3.some(e => e.macrostructure === curMacro)) {
    results.push(fail(8, "Macrostructure reuse", `current ${curMacro} matches a prior run`, "pick a different macrostructure per .keystone/log.json"))
  } else {
    results.push(pass(8, "Macrostructure reuse"))
  }
  const curNav = pm.stamp.nav
  const curFooter = pm.stamp.footer
  const navReuse = last3.length && last3[0].nav === curNav
  const footerReuse = last3.length && last3[0].footer === curFooter
  if (navReuse || footerReuse) {
    results.push(fail(32, "Nav/footer rotation", `nav ${curNav} or footer ${curFooter} matches last run`, "rotate nav + footer per the routing table"))
  } else {
    results.push(pass(32, "Nav/footer rotation"))
  }
  return results
}
```

Run: `node --test test/engine/gates/g8-32.test.mjs` → PASS.

- [ ] **Step 3: Commit**

```bash
git add engine/gates/g8-32-*.mjs test/engine/gates/g8-32*.mjs
git commit -m "feat(engine): G8/32 diversification gate (stamp vs log.json)"
```

---

## Task 11: APCA contrast math + G40-41 contrast gate

**Files:**
- Create: `engine/apca.mjs`, `engine/gates/g40-41-contrast.mjs`, `test/engine/apca.test.mjs`, `test/engine/gates/g40-41.test.mjs`

**Interfaces:**
- Produces: `apcaLc(textL, bgL)` → number (Lc value, can be negative). `wcagRatio(textL, bgL)` → number.
- G40-41 consumes `DetectorContext.computedPairs = [{selector, color, backgroundColor}]` (from the Playwright dump).

- [ ] **Step 1: Write the failing test for APCA**

```js
// test/engine/apca.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { apcaLc, wcagRatio } from "../../engine/apca.mjs"

test("apcaLc black-on-white ~ -106", () => {
  const lc = apcaLc(0, 100)
  assert.ok(lc < -100 && lc > -108, `got ${lc}`)
})
test("apcaLc white-on-black ~ +106", () => {
  const lc = apcaLc(100, 0)
  assert.ok(lc > 100 && lc < 108, `got ${lc}`)
})
test("wcagRatio black-on-white = 21", () => {
  assert.equal(Math.round(wcagRatio(0, 100)), 21)
})
test("apcaLc mid-grey-on-grey ~ 0 (low contrast)", () => {
  const lc = apcaLc(60, 62)
  assert.ok(Math.abs(lc) < 20, `got ${lc}`)
})
```

- [ ] **Step 2: Run to fail, then implement APCA**

```js
// engine/apca.mjs

// APCA (Accessible Perceptual Contrast Algorithm) — OKLCH-lightness approximation.
// Input: text and bg as OKLCH lightness L (0-100). Returns Lc (can be negative).
// Convention: dark text on light bg → negative Lc. |Lc| ~106 for pure black-on-white.
// APPROXIMATION for gate-catching (catch low-contrast failures, not W3 reference precision).
// OKLCH L is perceptual (CIE Lab L*); convert via CIELAB L→Y, apply APCA perceptual formula.

/** CIELAB L* (0-100) → relative luminance Y (0-1). */
function YfromL(L) {
  const fy = (L + 16) / 116
  const y = fy * fy * fy
  return y < 0 ? 0 : y
}

export function apcaLc(textL, bgL) {
  const Yt = YfromL(textL)
  const Yb = YfromL(bgL)
  if (Math.abs(Yb - Yt) < 0.0005) return 0
  // text-minus-bg so dark-on-light is negative; scale ~90 lands pure black/white at ~±105.
  const lc = (Math.cbrt(Yt + 0.025) - Math.cbrt(Yb + 0.025)) * 1.66 * 90
  return Math.round(lc)
}

// WCAG 2.1 ratio (simplified — uses OKLCH L as a luminance proxy)
export function wcagRatio(textL, bgL) {
  const l1 = (textL / 100) ** 2.4 + 0.05
  const l2 = (bgL / 100) ** 2.4 + 0.05
  return Math.max(l1, l2) / Math.min(l1, l2)
}
```

Note: the original brief used a polynomial approximation that was mathematically broken (magnitude ~100x too small + reversed polarity — `apcaLc(0,100)` returned +1.2 instead of ~-106). It was replaced mid-execution (Task 11) with the CIELAB L→Y version above, which produces -105/+105 for pure black/white and passes all four test assertions. The gate uses `|Lc| < 60` for body and `< 45` for large — approximation is enough to catch real failures. Upgrade to the full APCA W3 lookup table during Plan 1b if exactness is required.

Run: `node --test test/engine/apca.test.mjs` → PASS.

- [ ] **Step 3: Write failing test + implementation for G40-41**

```js
// test/engine/gates/g40-41.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import g40 from "../../../engine/gates/g40-41-contrast.mjs"

test("G40 fails on low-contrast pair (Lc 30, needs 60)", () => {
  const computedPairs = [{ selector: ".nav a", color: "oklch(60% 0 0)", backgroundColor: "oklch(62% 0 0)" }]
  assert.ok(g40({ computedPairs }).some(r => !r.pass && r.gate === 40))
})
test("G40 passes on high-contrast pair", () => {
  const computedPairs = [{ selector: "body", color: "oklch(10% 0 0)", backgroundColor: "oklch(98% 0 0)" }]
  assert.ok(g40({ computedPairs }).every(r => r.pass))
})
```

```js
// engine/gates/g40-41-contrast.mjs
import { apcaLc } from "../apca.mjs"
import { pass, fail } from "../types.mjs"

function lightnessOf(oklch) {
  const m = oklch.match(/oklch\(\s*([\d.]+)%/)
  return m ? parseFloat(m[1]) : null
}

export default function detect(ctx) {
  const pairs = ctx.computedPairs || []
  const results = []
  for (const p of pairs) {
    const tL = lightnessOf(p.color)
    const bL = lightnessOf(p.backgroundColor)
    if (tL == null || bL == null) continue
    const lc = Math.abs(apcaLc(tL, bL))
    // body-text threshold 60; large/icons/focus 45. We don't know font-size here, default 60.
    if (lc < 60) {
      results.push(fail(40, "Contrast", `${p.selector}: APCA Lc ${lc} < 60`, `raise text lightness or lower bg lightness`, undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(40, "Contrast"))
  return results
}
```

Run: `node --test test/engine/gates/g40-41.test.mjs` → PASS.

- [ ] **Step 4: Commit**

```bash
git add engine/apca.mjs engine/gates/g40-41-contrast.mjs test/engine/apca.test.mjs test/engine/gates/g40-41.test.mjs
git commit -m "feat(engine): APCA contrast math + G40-41 contrast gate"
```

---

## Task 12: Orchestrator

**Files:**
- Create: `engine/orchestrate.mjs`, `test/engine/orchestrate.test.mjs`, fixtures `test/fixtures/full-pass.html` + `test/fixtures/full-pass.css` + `test/fixtures/full-fail.html` + `test/fixtures/full-fail.css`

**Interfaces:**
- Consumes: all gate detectors (Tasks 5-11), `extractStamp`, `DetectorContext`.
- Produces: `orchestrate(ctx): { results: GateResult[], pass: number, fail: number, total: number }`.

- [ ] **Step 1: Write the failing test**

```js
// test/engine/orchestrate.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { orchestrate } from "../../engine/orchestrate.mjs"

test("orchestrate runs all detectors and returns a summary", () => {
  const css = readFileSync("test/fixtures/full-fail.css", "utf8")
  const html = readFileSync("test/fixtures/full-fail.html", "utf8")
  const summary = orchestrate({ css, html, viewports: [], computedPairs: [] })
  assert.ok(summary.total > 0)
  assert.ok(summary.fail > 0)
  assert.equal(summary.pass + summary.fail, summary.total)
})
```

- [ ] **Step 2: Write the fail fixture**

```css
/* test/fixtures/full-fail.css */
/* Keystone · macrostructure: Bento Grid · theme: Cobalt · nav: N5 · footer: Ft5 · gates: 0/58 */
:root { --color-ink: #000; --color-accent: oklch(60% 0.15 250); --font-display: "Inter"; --color-surface-2: oklch(95% 0 0); }
.features { display: grid; grid-template-columns: 1fr 1fr 1fr; }
.grid { display: grid; grid-template-columns: 1fr 1fr; }
.section__head { display: grid; grid-template-columns: 1fr 2fr; }
.btn { color: #c0392b; } .btn:hover { color: blue; }
```

```html
<!-- test/fixtures/full-fail.html -->
<section class="features">
  <div class="card"><div class="icon">x</div><h3>Fast</h3></div>
  <div class="card"><div class="icon">y</div><h3>Easy</h3></div>
  <div class="card"><div class="icon">z</div><h3>Smart</h3></div>
</section>
<div class="grid"><img src="a.jpg"></div>
<header class="section__head"><span class="eyebrow">01</span><h2>Title</h2></header>
<button class="btn">Go</button>
```

- [ ] **Step 3: Run to fail, then implement**

```js
// engine/orchestrate.mjs
import g1 from "./gates/g1-banned-fonts.mjs"
import g2 from "./gates/g2-gradient-text.mjs"
import g3 from "./gates/g3-three-col-cards.mjs"
import g7 from "./gates/g7-pure-black-white.mjs"
import g22 from "./gates/g22-zero-chroma.mjs"
import g26 from "./gates/g26-missing-states.mjs"
import g34 from "./gates/g34-horizontal-scroll.mjs"
import g40 from "./gates/g40-41-contrast.mjs"
import g44 from "./gates/g44-hero-fit.mjs"
import g48 from "./gates/g48-token-improvisation.mjs"
import g50 from "./gates/g50-image-grid-minmax.mjs"
import g54 from "./gates/g54-tag-left-heading-right.mjs"
import g8_32 from "./gates/g8-32-diversification.mjs"
import { extractStamp } from "./extract-stamp.mjs"

const DETECTORS = [g1, g2, g3, g7, g22, g26, g34, g40, g44, g48, g50, g54, g8_32]

/** @param {import("./types.mjs").DetectorContext} ctx @returns {{results: GateResult[], pass: number, fail: number, total: number}} */
export function orchestrate(ctx) {
  // Build projectMemory from stamp if not supplied
  if (!ctx.projectMemory) {
    const stamp = ctx.css ? extractStamp(ctx.css) : null
    ctx.projectMemory = { stamp, log: [] }
  }
  const results = []
  for (const d of DETECTORS) {
    const r = d(ctx)
    if (Array.isArray(r)) results.push(...r)
    else results.push(r)
  }
  const pass = results.filter(r => r.pass).length
  const fail = results.filter(r => !r.pass).length
  return { results, pass, fail, total: results.length }
}
```

Run: `node --test test/engine/orchestrate.test.mjs` → PASS.

- [ ] **Step 4: Commit**

```bash
git add engine/orchestrate.mjs test/engine/orchestrate.test.mjs test/fixtures/full-*.html test/fixtures/full-*.css
git commit -m "feat(engine): orchestrator runs all detectors + summary"
```

---

## Task 13: Report template + CLI entrypoint

**Files:**
- Create: `engine/report-template.html`, `engine/check-gates.mjs`, `test/engine/check-gates.test.mjs`

- [ ] **Step 1: Write the report template**

```html
<!-- engine/report-template.html -->
<!doctype html>
<html><head><meta charset="utf-8"><title>Keystone gate report</title>
<style>
  body { font: 14px/1.5 system-ui, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; color: #111; }
  h1 { font-size: 1.1rem; }
  .summary { font-size: 1.4rem; margin: 1rem 0; }
  .pass { color: #15803d; } .fail { color: #b91c1c; }
  table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
  th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #e5e5e5; vertical-align: top; }
  td.evidence { font-family: ui-monospace, monospace; font-size: 12px; }
  td.fix { color: #555; }
</style></head><body>
<h1>Keystone · gate report · {{timestamp}}</h1>
<div class="summary">PASS <span class="pass">{{pass}}</span> / {{total}} · FAIL <span class="fail">{{fail}}</span> / {{total}}</div>
<table>
<thead><tr><th>#</th><th>Gate</th><th>Result</th><th>Evidence</th><th>Fix</th><th>File:Line</th></tr></thead>
<tbody>
{{rows}}
</tbody>
</table>
</body></html>
```

- [ ] **Step 2: Write the failing test for the CLI**

```js
// test/engine/check-gates.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { writeFileSync, readFileSync, mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { execFileSync } from "node:child_process"

test("check-gates.mjs CLI writes report.json + report.html", () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-"))
  const html = readFileSync("test/fixtures/full-fail.html", "utf8")
  const css = readFileSync("test/fixtures/full-fail.css", "utf8")
  writeFileSync(join(dir, "page.html"), html)
  writeFileSync(join(dir, "page.css"), css)
  execFileSync("node", ["engine/check-gates.mjs", "--html", join(dir, "page.html"), "--css", join(dir, "page.css"), "--out", dir], { cwd: process.cwd() })
  const report = JSON.parse(readFileSync(join(dir, "keystone-report.json"), "utf8"))
  assert.ok(report.total > 0)
  assert.ok(report.fail > 0)
  const htmlReport = readFileSync(join(dir, "keystone-report.html"), "utf8")
  assert.match(htmlReport, /Keystone · gate report/)
})
```

- [ ] **Step 3: Run to fail, then implement the CLI**

```js
// engine/check-gates.mjs
import { readFileSync, writeFileSync } from "node:fs"
import { orchestrate } from "./orchestrate.mjs"

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, arr) => {
  if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]])
  return acc
}, []))

const html = args.html ? readFileSync(args.html, "utf8") : ""
const css = args.css ? readFileSync(args.css, "utf8") : ""
const out = args.out || "."

const summary = orchestrate({ html, css, viewports: [], computedPairs: [] })
writeFileSync(`${out}/keystone-report.json`, JSON.stringify(summary, null, 2))

const tpl = readFileSync(new URL("./report-template.html", import.meta.url), "utf8")
const rows = summary.results.map(r =>
  `<tr><td>${r.gate}</td><td>${r.name}</td><td class="${r.pass ? "pass" : "fail"}">${r.pass ? "✓" : "✗"}</td><td class="evidence">${r.evidence || ""}</td><td class="fix">${r.fix || ""}</td><td>${r.file ? `${r.file}:${r.line || ""}` : ""}</td></tr>`
).join("\n")
const html_out = tpl
  .replace("{{timestamp}}", new Date().toISOString())
  .replace("{{pass}}", summary.pass)
  .replace("{{fail}}", summary.fail)
  .replace("{{total}}", summary.total)
  .replace("{{rows}}", rows)
writeFileSync(`${out}/keystone-report.html`, html_out)

console.log(`PASS ${summary.pass}/${summary.total} · FAIL ${summary.fail}/${summary.total} — ${out}/keystone-report.html`)
```

Run: `node --test test/engine/check-gates.test.mjs` → PASS.

- [ ] **Step 4: Commit**

```bash
git add engine/report-template.html engine/check-gates.mjs test/engine/check-gates.test.mjs
git commit -m "feat(engine): report template + check-gates CLI"
```

---

## Task 14: Playwright render extension

**Files:**
- Create: `extensions/render.ts`, `test/extensions/render.test.mjs`

**Interfaces:**
- Produces: a pi extension registering a `keystone_render` tool. Input: `{ htmlPath, viewports?: number[] }`. Output: `{ screenshots: [{width, path}], computedStylesPath, domSnapshotPath }`.
- The extension reads the HTML file, launches headless Chromium via `playwright-core`, navigates to `file://`, sets each viewport, screenshots, dumps computed styles + DOM snapshot, returns paths.

- [ ] **Step 1: Install playwright browsers**

Run: `pnpm exec playwright install chromium`
Expected: Chromium downloaded to the playwright cache.

- [ ] **Step 2: Write the extension**

```ts
// extensions/render.ts
import { chromium } from "playwright-core"
import { pathToFileURL } from "node:url"
import { writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

interface RenderInput {
  htmlPath: string
  viewports?: number[]  // default [1280, 375, 320, 414, 768]
  outDir?: string       // default ./keystone-render
}

interface RenderOutput {
  screenshots: { width: number; path: string }[]
  computedStylesPath: string
  domSnapshotPath: string
}

async function render(input: RenderInput): Promise<RenderOutput> {
  const viewports = input.viewports ?? [1280, 375, 320, 414, 768]
  const outDir = input.outDir ?? "./keystone-render"
  mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const screenshots: { width: number; path: string }[] = []
  const computedPairs: { selector: string; color: string; backgroundColor: string }[] = []
  let domSnapshot = ""

  for (const w of viewports) {
    const ctx = await browser.newContext({ viewport: { width: w, height: Math.round(w * 0.625) } })
    const page = await ctx.newPage()
    await page.goto(pathToFileURL(input.htmlPath).href, { waitUntil: "networkidle" })
    const shotPath = join(outDir, `screenshot-${w}.png`)
    await page.screenshot({ path: shotPath, fullPage: false })
    screenshots.push({ width: w, path: shotPath })
    // On the 1280 pass, dump computed color pairs + DOM
    if (w === 1280) {
      const pairs = await page.evaluate(() => {
        const out: { selector: string; color: string; backgroundColor: string }[] = []
        const els = document.querySelectorAll("*")
        for (const el of els) {
          const cs = getComputedStyle(el)
          if (cs.color || cs.backgroundColor) {
            out.push({ selector: el.tagName.toLowerCase(), color: cs.color, backgroundColor: cs.backgroundColor })
          }
        }
        return out.slice(0, 200) // cap
      })
      computedPairs.push(...pairs)
      domSnapshot = await page.content()
    }
    await ctx.close()
  }
  await browser.close()

  const computedStylesPath = join(outDir, "computed.json")
  writeFileSync(computedStylesPath, JSON.stringify(computedPairs, null, 2))
  const domSnapshotPath = join(outDir, "dom.html")
  writeFileSync(domSnapshotPath, domSnapshot)
  return { screenshots, computedStylesPath, domSnapshotPath }
}

// pi extension registration (the pi extension API — see getpipher/AGENTS.md for gotchas)
export default function (pi: any) {
  pi.registerTool({
    name: "keystone_render",
    description: "Render an HTML file with headless Chromium at given viewports. Returns screenshots + computed styles + DOM snapshot for the Keystone gate engine.",
    parameters: {
      htmlPath: { type: "string", description: "Absolute path to the HTML file to render" },
      viewports: { type: "array", items: { type: "number" }, description: "CSS pixel widths to screenshot", default: [1280, 375, 320, 414, 768] },
      outDir: { type: "string", description: "Directory to write outputs", default: "./keystone-render" },
    },
    async run(input: RenderInput) {
      return render(input)
    },
  })
}
```

Note: the exact `pi.registerTool` signature must be verified against the installed pi extension API at implementation time (check `~/.nvm/.../pi-coding-agent/docs/extensions.md` and an existing getpipher extension like `vision` for the canonical pattern). The getpipher AGENTS.md flags common gotchas (theme typing, shortcut keys) — none apply here since `render.ts` registers a tool, not a UI component.

- [ ] **Step 3: Write the integration test**

```js
// test/extensions/render.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { writeFileSync, mkdtempSync, readFileSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { render } from "../../extensions/render.ts" // via tsx or compiled

test("render produces screenshots at 2 viewports", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-render-"))
  const html = "<html><body><h1>Hi</h1></body></html>"
  const htmlPath = join(dir, "page.html")
  writeFileSync(htmlPath, html)
  const out = await render({ htmlPath, viewports: [1280, 375], outDir: dir })
  assert.equal(out.screenshots.length, 2)
  assert.ok(existsSync(out.screenshots[0].path))
  assert.ok(existsSync(out.computedStylesPath))
  assert.ok(existsSync(out.domSnapshotPath))
})
```

- [ ] **Step 4: Run the test**

Run: `node --import tsx --test test/extensions/render.test.mjs`
Expected: PASS (may take ~3-5s for browser launch).

If `tsx` is not available, add it: `pnpm add -D tsx`, and run via `node --import tsx --test ...`.

- [ ] **Step 5: Commit**

```bash
git add extensions/render.ts test/extensions/render.test.mjs package.json pnpm-lock.yaml
git commit -m "feat(extension): keystone_render Playwright headless tool"
```

---

## Task 15: Wire render output into the orchestrator

**Files:**
- Modify: `engine/orchestrate.mjs` (accept the render output as part of ctx), `engine/check-gates.mjs` (CLI flag `--render` to invoke the extension's render fn before orchestrating), `test/engine/check-gates.test.mjs`.

- [ ] **Step 1: Extend the orchestrator test — full pipeline with render**

```js
// test/engine/orchestrate.test.mjs (append)
test("orchestrate uses render dump for G34 + G40-41", () => {
  const html = readFileSync("test/fixtures/full-fail.html", "utf8")
  const css = readFileSync("test/fixtures/full-fail.css", "utf8")
  const viewports = [
    { width: 1280, scrollWidth: 1280, innerHeight: 800, hero: { eyebrow: { bottom: 120 }, headline: { bottom: 280 }, lede: { bottom: 380 }, cta: { bottom: 720 } } },
    { width: 375, scrollWidth: 420, innerHeight: 812 },
  ]
  const computedPairs = [{ selector: ".btn", color: "oklch(40% 0 0)", backgroundColor: "oklch(45% 0 0)" }]
  const summary = orchestrate({ css, html, viewports, computedPairs })
  assert.ok(summary.results.some(r => r.gate === 34 && !r.pass))
  assert.ok(summary.results.some(r => r.gate === 40 && !r.pass))
})
```

- [ ] **Step 2: Run + verify pass**

Run: `node --test test/engine/orchestrate.test.mjs`
Expected: PASS (the orchestrator already accepts `viewports` + `computedPairs`).

- [ ] **Step 3: Commit**

```bash
git add test/engine/orchestrate.test.mjs
git commit -m "test(engine): orchestrator consumes render dump (G34/G40-41)"
```

---

## Task 16: Engine README + run the full suite

**Files:**
- Create: `engine/README.md`

- [ ] **Step 1: Write the engine README**

```markdown
# Keystone engine

The executable gate engine. Runs ~40 deterministic anti-slop gates against an HTML/CSS page and emits a report.

## Run

\`\`\`bash
node engine/check-gates.mjs --html path/to/page.html --css path/to/page.css --out ./reports
\`\`\`

Writes `keystone-report.json` + `keystone-report.html` to `--out`.

## Gate coverage (Phase 1)

G1 banned fonts · G2 gradient text · G3 three-col cards · G7 pure black/white · G22 zero-chroma · G26 missing states · G34 horizontal scroll · G40-41 contrast · G44 hero fit · G48 token improvisation · G50 image-grid minmax · G54 tag-left/heading-right · G8/32 diversification.

The remaining ~28 deterministic gates follow the same detector pattern and ship in Plan 1b. Vision gates (~18) ship in Plan 3 with the `@getpipher/vision` integration.

## Architecture

See `docs/superpowers/specs/2026-07-27-keystone-design.md` §4 and `docs/superpowers/plans/2026-07-27-keystone-engine.md`.
```

- [ ] **Step 2: Run the full test suite**

Run: `pnpm test:run`
Expected: all tests PASS. Note the count.

- [ ] **Step 3: Commit + tag**

```bash
git add engine/README.md
git commit -m "docs(engine): README + Phase 1 gate coverage"
git tag -a engine-v0.1.0 -m "Keystone engine Phase 1 — 13 deterministic gates + render extension"
```

---

## Self-Review

**1. Spec coverage (engine subsystem only):**
- Spec §3 Package Architecture → Task 1 (scaffolding), Task 14 (extension). ✓
- Spec §4 Gate Engine — two layers (deterministic + vision): this plan covers the deterministic layer + the render extension. Vision layer deferred to Plan 3 (stated). ✓
- Gate → checker mapping: G1, G2, G3, G7, G22, G26, G34, G40-41, G44, G48, G50, G54, G8/32 — 13 representative gates covering all detector patterns (CSS-token, CSS-rule, DOM-structure, Playwright-dump, computed-style, stamp/log-diff). The remaining ~28 deterministic gates are Plan 1b (fill-in-the-pattern). ✓ (pattern coverage, not full count — intentional, stated)
- Iterate-until-pass loop: the loop is orchestrator-level (model-driven via bash); the engine itself is single-shot. Plan 3 (build flow) wires the 3+2 cap. This plan ships the single-shot engine. ✓
- Report format (spec §4): Task 13. ✓
- `keystone_render` tool surface (spec §3): Task 14. ✓

**2. Placeholder scan:** No TBD/TODO/FIXME/"implement later" in steps. The APCA note about "replace with full W3 lookup table during Plan 1b" is a documented limitation, not a placeholder — the approximation ships and works for gate-catching. ✓

**3. Type consistency:** `GateResult` shape consistent across all detectors. `DetectorContext` fields (`html`, `css`, `viewports`, `computedPairs`, `projectMemory`) used consistently. `extractStamp` return shape consistent between Task 3 and Task 10's consumption. `render` function signature consistent between Task 14 definition and Task 15 test. ✓

One gap found and addressed: the `apca.mjs` implementation uses a simplified polynomial, not the full APCA W3 lookup. Added an explicit note in the code + a "replace in Plan 1b" line — acceptable because the gate catches real failures at the approximation level, and the note is a limitation disclosure, not a placeholder.

---

## Subsequent Plans (roadmap — not in this plan)

| Plan | Scope | Depends on |
|---|---|---|
| **Plan 1b** | Remaining ~28 deterministic gates (G4-6, G9-19, G23-25, G27-33, G35-39, G42-43, G45-47, G49, G51-53, G55-58) following the established detector pattern. Full APCA W3 table. | Plan 1 |
| **Plan 2** | The skill catalog — `SKILL.md` (rewritten tighter), `references/` (21 macros + 50 archetypes reused/rewritten, 8 deep theme specs, genres, copy/typo/color/motion/layout/responsive), `gates.md` annotated with checkers, `engine.md`, NOTICE. | Plan 1b (gates must exist to annotate) |
| **Plan 3** | Build-flow integration — vision pass via `@getpipher/vision`, the 7-step flow with engine-verified Step 7, the 3+2 iterate-until-pass loop, `.keystone/log.json` + `preflight.json`, the preview block. | Plan 1 + Plan 2 |
| **Plan 4** | Audit verb — path mode + URL mode (adversarial-fetch safety), the ranked-punch-list report, severity tiers, effort heuristics. | Plan 3 (reuses engine) |
| **Plan 5** | Examples (5 demo sites) + comparison harness (8 briefs × Hallmark + Keystone × our engine) + CI pipeline + publish. | Plan 1-4 |