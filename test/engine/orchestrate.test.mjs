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