import { test } from "node:test"
import assert from "node:assert/strict"
import g4 from "../../../engine/gates/g4-nested-cards.mjs"

test("G4 fails when a card contains another card", () => {
  const html = `<div class="card"><div class="card-inner"><div class="panel">x</div></div></div>`
  assert.ok(g4({ html, css: "" }).some(r => !r.pass && r.gate === 4))
})
test("G4 passes when no card is nested in a card", () => {
  const html = `<section class="card"><p>ok</p></section><div class="tile">x</div>`
  assert.ok(g4({ html, css: "" }).every(r => r.pass))
})