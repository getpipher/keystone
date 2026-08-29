import { test } from "node:test"
import assert from "node:assert/strict"
import g39 from "../../../engine/gates/g39-input-states.mjs"

test("G39 fails on focus ring built from border", () => {
  const css = `.input:focus { border: 2px solid blue; }`
  assert.ok(g39({ css, html: `<input class="input">` }).some(r => !r.pass && r.gate === 39))
})
test("G39 fails on disabled via opacity alone", () => {
  const css = `.input:disabled { opacity: 0.5; }`
  assert.ok(g39({ css, html: `<input class="input">` }).some(r => !r.pass && r.gate === 39))
})
test("G39 fails on helper-text without min-height", () => {
  const css = `.helper-text { color: red; }`
  assert.ok(g39({ css, html: "" }).some(r => !r.pass && r.gate === 39))
})
