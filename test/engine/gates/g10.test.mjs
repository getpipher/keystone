import { test } from "node:test"
import assert from "node:assert/strict"
import g10 from "../../../engine/gates/g10-transition-all.mjs"

test("G10 fails on transition: all", () => {
  assert.ok(g10({ css: `.btn { transition: all 200ms; }`, html: "" }).some(r => !r.pass && r.gate === 10))
  assert.ok(g10({ css: `.btn { transition-property: all; }`, html: "" }).some(r => !r.pass && r.gate === 10))
})
test("G10 passes on named-property transitions", () => {
  assert.ok(g10({ css: `.btn { transition: background-color 200ms, color 200ms; }`, html: "" }).every(r => r.pass))
})