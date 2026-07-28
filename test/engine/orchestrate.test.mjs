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