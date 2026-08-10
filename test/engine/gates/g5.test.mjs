import { test } from "node:test"
import assert from "node:assert/strict"
import g5 from "../../../engine/gates/g5-card-stripe.mjs"

test("G5 fails on a card with a thick coloured left border", () => {
  const css = `.card { border-left: 6px solid oklch(60% 0.2 30); }`
  assert.ok(g5({ css, html: "" }).some(r => !r.pass && r.gate === 5))
})
test("G5 passes on a neutral or thin border", () => {
  const css = `.card { border-left: 2px solid #eee; } .card { border-left: 6px solid oklch(50% 0 0); }`
  assert.ok(g5({ css, html: "" }).every(r => r.pass))
})