import { test } from "node:test"
import assert from "node:assert/strict"
import g17 from "../../../engine/gates/g17-tooltip-delay.mjs"

test("G17 fails when tooltip hover-delay == focus-delay > 0", () => {
  const css = `.tip:hover { transition-delay: 300ms; } .tip:focus-visible { transition-delay: 300ms; }`
  assert.ok(g17({ css, html: "" }).some(r => !r.pass && r.gate === 17))
})
test("G17 passes when focus-delay is 0 and hover-delay is 800ms", () => {
  const css = `.tip:hover { transition-delay: 800ms; } .tip:focus-visible { transition-delay: 0ms; }`
  assert.ok(g17({ css, html: "" }).every(r => r.pass))
})