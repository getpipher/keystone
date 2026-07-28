import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import g3 from "../../../engine/gates/g3-three-col-cards.mjs"

test("G3 fails on 3-equal-col grid with icon>heading cards", () => {
  const html = readFileSync("test/fixtures/g3-fail.html", "utf8")
  const css = `.features { display: grid; grid-template-columns: 1fr 1fr 1fr; } .card { } .card .icon { } .card h3 { }`
  const results = g3({ html, css })
  assert.ok(results.some(r => !r.pass && r.gate === 3))
})

test("G3 passes on bento grid", () => {
  const html = `<section class="bento"><div class="tile">A</div><div class="tile">B</div></section>`
  const css = `.bento { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; }`
  const results = g3({ html, css })
  assert.ok(results.every(r => r.pass))
})