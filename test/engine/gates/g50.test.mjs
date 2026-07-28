import { test } from "node:test"
import assert from "node:assert/strict"
import g50 from "../../../engine/gates/g50-image-grid-minmax.mjs"

test("G50 fails on 1fr track containing <img>", () => {
  const html = `<div class="grid"><img src="a.jpg"><img src="b.jpg"></div>`
  const css = `.grid { display: grid; grid-template-columns: 1fr 1fr; }`
  const results = g50({ html, css })
  assert.ok(results.some(r => !r.pass && r.gate === 50))
})

test("G50 passes on minmax(0,1fr)", () => {
  const html = `<div class="grid"><img src="a.jpg"></div>`
  const css = `.grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); }`
  const results = g50({ html, css })
  assert.ok(results.every(r => r.pass))
})