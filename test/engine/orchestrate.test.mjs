import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { orchestrate } from "../../engine/orchestrate.mjs"
import { extractStamp } from "../../engine/extract-stamp.mjs"

test("orchestrate runs all detectors and returns a summary", () => {
  const css = readFileSync("test/fixtures/full-fail.css", "utf8")
  const html = readFileSync("test/fixtures/full-fail.html", "utf8")
  const summary = orchestrate({ css, html, viewports: [], computedPairs: [] })
  assert.ok(summary.total > 0)
  assert.ok(summary.fail > 0)
  assert.equal(summary.pass + summary.fail, summary.total)
})

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

test("orchestrate does not mutate ctx.projectMemory", () => {
  const css = readFileSync("test/fixtures/full-fail.css", "utf8")
  const html = readFileSync("test/fixtures/full-fail.html", "utf8")
  const ctx = { css, html, viewports: [], computedPairs: [] }
  assert.equal(ctx.projectMemory, undefined)
  orchestrate(ctx)
  assert.equal(ctx.projectMemory, undefined, "orchestrate must not set ctx.projectMemory")
})

test("orchestrate catches a malformed CSS parse error instead of crashing", () => {
  const html = readFileSync("test/fixtures/full-fail.html", "utf8")
  // Unclosed block — postcss throws CssSyntaxError. Each CSS-parsing gate would
  // throw independently; orchestrate dedupes to ONE synthetic parse-error row.
  const css = "a { color: red"
  const computedPairs = [{ selector: ".btn", color: "oklch(40% 0 0)", backgroundColor: "oklch(45% 0 0)" }]
  const summary = orchestrate({ css, html, viewports: [], computedPairs })
  const parseErrors = summary.results.filter(r => r.gate === 0 && !r.pass)
  assert.equal(parseErrors.length, 1, "exactly one synthetic parse-error row")
  assert.match(parseErrors[0].name, /parse error/i)
  // CSS-independent gates still ran off computedPairs → G40 still produced a result.
  assert.ok(summary.results.some(r => r.gate === 40), "G40 (computedPairs) ran despite the CSS parse error")
})

test("orchestrate honours a supplied projectMemory.log (G8-32)", () => {
  const css = readFileSync("test/fixtures/stamp-valid.css", "utf8")
  const stamp = extractStamp(css)
  const log = [{ date: "2026-08-01", macrostructure: "Long Document", theme: "Garden", nav: "N5", footer: "Ft5" }]
  const ctx = { css, html: "", viewports: [], computedPairs: [], projectMemory: { stamp, log } }
  const summary = orchestrate(ctx)
  // stamp-valid.css macrostructure is "Long Document" → matches the log's last entry → G8 reuse FAIL
  assert.ok(summary.results.some(r => r.gate === 8 && !r.pass), "G8 should fail on macro reuse")
})
