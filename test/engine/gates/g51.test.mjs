import { test } from "node:test"
import assert from "node:assert/strict"
import g51 from "../../../engine/gates/g51-display-wrap.mjs"

test("G51 fails on h1 without overflow-wrap/min-width", () => {
  assert.ok(g51({ css: `h1 { font-size: clamp(32px, 6vw, 64px); }`, html: "" }).some(r => !r.pass && r.gate === 51))
})
test("G51 passes with both overflow-wrap + min-width", () => {
  assert.ok(g51({ css: `h1 { overflow-wrap: anywhere; min-width: 0; }`, html: "" }).every(r => r.pass))
})
