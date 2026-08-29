import { test } from "node:test"
import assert from "node:assert/strict"
import g33 from "../../../engine/gates/g33-decorative-aria.mjs"

test("G33 fails on an svg without aria-label or aria-hidden", () => {
  assert.ok(g33({ html: `<svg><rect/></svg>`, css: "" }).some(r => !r.pass && r.gate === 33))
})
test("G33 passes on an aria-hidden svg", () => {
  assert.ok(g33({ html: `<svg aria-hidden="true"><rect/></svg>`, css: "" }).every(r => r.pass))
  assert.ok(g33({ html: `<svg aria-label="logo"><rect/></svg>`, css: "" }).every(r => r.pass))
})
