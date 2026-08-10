import { test } from "node:test"
import assert from "node:assert/strict"
import g15 from "../../../engine/gates/g15-focus-ring-fades.mjs"

test("G15 fails when :focus-visible transitions the ring over >0ms", () => {
  const css = `.btn:focus-visible { outline: 2px solid blue; transition: outline 200ms; }`
  assert.ok(g15({ css, html: "" }).some(r => !r.pass && r.gate === 15))
  const css2 = `.btn:focus-visible { box-shadow: 0 0 0 3px blue; transition: all 150ms; }`
  assert.ok(g15({ css: css2, html: "" }).some(r => !r.pass && r.gate === 15), "transition: all on a ring prop counts")
})
test("G15 passes when the ring has no transition (instant)", () => {
  const css = `.btn:focus-visible { outline: 2px solid blue; } .btn:focus-visible { outline-offset: 2px; transition: outline 0ms; }`
  assert.ok(g15({ css, html: "" }).every(r => r.pass))
})