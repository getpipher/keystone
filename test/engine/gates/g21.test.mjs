import { test } from "node:test"
import assert from "node:assert/strict"
import g21 from "../../../engine/gates/g21-specimen-fallthrough.mjs"

test("G21 fails when the stamp macrostructure is Specimen", () => {
  const css = `/* Keystone · macrostructure: Specimen · theme: Garden · gates: 58/58 engine-verified */`
  assert.ok(g21({ css, html: "" }).some(r => !r.pass && r.gate === 21))
})
test("G21 passes on a non-Specimen macrostructure", () => {
  const css = `/* Keystone · macrostructure: Long Document · theme: Garden · gates: 58/58 engine-verified */`
  assert.ok(g21({ css, html: "" }).every(r => r.pass))
})