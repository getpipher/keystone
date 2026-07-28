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