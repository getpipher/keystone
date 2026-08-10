import { test } from "node:test"
import assert from "node:assert/strict"
import g6 from "../../../engine/gates/g6-hero-centred.mjs"

test("G6 fails when hero centres 3+ children (text-align center + margin auto)", () => {
  const html = `<section class="hero"><small class="eyebrow">NEW</small><h1>Hi</h1><p>Lede</p><a class="cta">Go</a></section>`
  const css = `.hero .eyebrow { text-align: center; } .hero h1 { text-align: center; } .hero p { text-align: center; } .hero .cta { margin: 0 auto; }`
  assert.ok(g6({ html, css }).some(r => !r.pass && r.gate === 6))
})
test("G6 passes when hero is left-aligned / off-axis", () => {
  const html = `<section class="hero"><small class="eyebrow">NEW</small><h1>Hi</h1><p>Lede</p><a class="cta">Go</a></section>`
  const css = `.hero .eyebrow { text-align: left; } .hero h1 { text-align: left; } .hero p { text-align: left; } .hero .cta { text-align: left; }`
  assert.ok(g6({ html, css }).every(r => r.pass))
})