import { test } from "node:test"
import assert from "node:assert/strict"
import g12 from "../../../engine/gates/g12-bouncy-easing.mjs"

test("G12 fails on a cubic-bezier with a control point >1.0 on a UI element", () => {
  const css = `.btn { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }`
  assert.ok(g12({ css, html: "" }).some(r => !r.pass && r.gate === 12))
})
test("G12 passes on ease-out / non-overshoot bezier / non-UI element", () => {
  assert.ok(g12({ css: `.btn { transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }`, html: "" }).every(r => r.pass))
  assert.ok(g12({ css: `.draggable { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }`, html: "" }).every(r => r.pass), "overshoot on a non-UI element (draggable) is allowed")
})