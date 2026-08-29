import { test } from "node:test"
import assert from "node:assert/strict"
import g53 from "../../../engine/gates/g53-radio-tabs-scroll.mjs"

test("G53 fails on a radio tab with position:absolute; top:0", () => {
  const html = `<input type="radio" class="tab-radio">`
  const css = `.tab-radio { position: absolute; top: 0; opacity: 0; }`
  assert.ok(g53({ html, css }).some(r => !r.pass && r.gate === 53))
})
test("G53 passes on a radio kept in flow", () => {
  const html = `<input type="radio" class="tab-radio">`
  const css = `.tab-radio { opacity: 0; width: 0; height: 0; }`
  assert.ok(g53({ html, css }).every(r => r.pass))
})
