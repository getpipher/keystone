import { test } from "node:test"
import assert from "node:assert/strict"
import g13 from "../../../engine/gates/g13-multiple-hover-effects.mjs"

test("G13 fails when 3+ property groups change on one :hover", () => {
  const css = `.card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px #000; color: #fff; background: #333; }`
  assert.ok(g13({ css, html: "" }).some(r => !r.pass && r.gate === 13))
})
test("G13 passes when 1-2 groups change", () => {
  const css = `.btn:hover { background-color: #333; color: #fff; }`
  assert.ok(g13({ css, html: "" }).every(r => r.pass))
})