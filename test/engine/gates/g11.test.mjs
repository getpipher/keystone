import { test } from "node:test"
import assert from "node:assert/strict"
import g11 from "../../../engine/gates/g11-uniform-hoverscale.mjs"

test("G11 fails when scale() on 3+ unrelated :hover selectors", () => {
  const css = `.card { } .card:hover { transform: scale(1.05); } .btn { } .btn:hover { transform: scale(1.05); } .tile { } .tile:hover { transform: scale(1.05); }`
  assert.ok(g11({ css, html: "" }).some(r => !r.pass && r.gate === 11))
})
test("G11 passes when only 2 selectors share the scale (or none)", () => {
  const css = `.card:hover { transform: scale(1.05); } .btn:hover { transform: scale(1.05); }`
  assert.ok(g11({ css, html: "" }).every(r => r.pass))
})