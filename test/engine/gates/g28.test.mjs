import { test } from "node:test"
import assert from "node:assert/strict"
import g28 from "../../../engine/gates/g28-lcp-video.mjs"

test("G28 fails on autoplay video without muted + no poster", () => {
  const html = `<section class="hero"><video autoplay src="x.mp4"></video></section>`
  assert.ok(g28({ html, css: "" }).some(r => !r.pass && r.gate === 28))
})
test("G28 fails on hero img with loading=lazy", () => {
  const html = `<section class="hero"><img src="hero.png" loading="lazy"></section>`
  assert.ok(g28({ html, css: "" }).some(r => !r.pass && r.gate === 28))
})
test("G28 passes on a proper muted+poster video", () => {
  const html = `<section class="hero"><video autoplay muted poster="p.jpg" src="x.mp4"></video></section>`
  assert.ok(g28({ html, css: "" }).every(r => r.pass))
})
