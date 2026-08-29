import { test } from "node:test"
import assert from "node:assert/strict"
import g38 from "../../../engine/gates/g38-outlier-slots.mjs"

test("G38 fails when --font-outlier appears in 3 selectors", () => {
  const css = `.wordmark { font-family: var(--font-outlier); } .stat { font-family: var(--font-outlier); } .pull-quote { font-family: var(--font-outlier); }`
  assert.ok(g38({ css, html: "" }).some(r => !r.pass && r.gate === 38))
})
test("G38 passes with 2 outlier slots", () => {
  const css = `.wordmark { font-family: var(--font-outlier); } .stat { font-family: var(--font-outlier); }`
  assert.ok(g38({ css, html: "" }).every(r => r.pass))
})
