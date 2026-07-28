import { test } from "node:test"
import assert from "node:assert/strict"
import g54 from "../../../engine/gates/g54-tag-left-heading-right.mjs"

test("G54 fails on section head with eyebrow+heading + 2-col grid", () => {
  const html = `<header class="section__head"><span class="eyebrow">01</span><h2>Title</h2></header>`
  const css = `.section__head { display: grid; grid-template-columns: 1fr 2fr; }`
  const results = g54({ html, css })
  assert.ok(results.some(r => !r.pass && r.gate === 54))
})

test("G54 passes on single-column head", () => {
  const html = `<header class="section__head"><span class="eyebrow">01</span><h2>Title</h2></header>`
  const css = `.section__head { display: flex; flex-direction: column; }`
  const results = g54({ html, css })
  assert.ok(results.every(r => r.pass))
})