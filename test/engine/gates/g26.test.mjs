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

test("G26 handles combined selectors (.btn:hover, .btn:focus-visible)", () => {
  // Plan 1b-1 CF2: combined selectors must register both states for .btn.
  const css = `.btn {} .btn:hover, .btn:focus-visible {} .btn:active, .btn:disabled {}`
  const results = g26({ css })
  assert.ok(results.every(r => r.pass), "all four states present via combined selectors")
})

test("G26 fails a combined selector missing two states", () => {
  const css = `.btn {} .btn:hover, .btn:focus-visible {}`
  const results = g26({ css })
  assert.ok(results.some(r => !r.pass && r.gate === 26), ".btn missing :active/:disabled")
  assert.match(results.find(r => !r.pass).evidence, /missing.*:active.*:disabled|:disabled.*:active/)
})