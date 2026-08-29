import { test } from "node:test"
import assert from "node:assert/strict"
import g55 from "../../../engine/gates/g55-allcaps-lineheight.mjs"

test("G55 fails on uppercase h1 with line-height < 1.0", () => {
  assert.ok(g55({ css: `h1 { text-transform: uppercase; line-height: 0.95; }`, html: "" }).some(r => !r.pass && r.gate === 55))
})
test("G55 passes with line-height >= 1.0", () => {
  assert.ok(g55({ css: `h1 { text-transform: uppercase; line-height: 1.05; }`, html: "" }).every(r => r.pass))
})
