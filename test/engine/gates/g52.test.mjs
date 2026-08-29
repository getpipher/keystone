import { test } from "node:test"
import assert from "node:assert/strict"
import g52 from "../../../engine/gates/g52-section-head-collapse.mjs"

test("G52 fails on a section-head grid without mobile collapse", () => {
  const css = `.section__head { grid-template-columns: 1fr 2fr; }`
  assert.ok(g52({ css, html: "" }).some(r => !r.pass && r.gate === 52))
})
test("G52 passes with a max-width:48rem collapse", () => {
  const css = `.section__head { grid-template-columns: 1fr 2fr; } @media (max-width: 48rem) { .section__head { grid-template-columns: 1fr; } }`
  assert.ok(g52({ css, html: "" }).every(r => r.pass))
})
