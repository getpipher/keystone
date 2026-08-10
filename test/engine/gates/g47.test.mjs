import { test } from "node:test"
import assert from "node:assert/strict"
import g47 from "../../../engine/gates/g47-redrawn-chrome.mjs"

test("G47 fails on a fake browser bar with traffic-light dots", () => {
  const html = `<div class="browser-bar"><span></span><span></span><span></span><div class="url">https://app.com</div></div>`
  assert.ok(g47({ html, css: "" }).some(r => !r.pass && r.gate === 47))
})
test("G47 fails on a phone-frame class", () => {
  const html = `<div class="phone-frame"><div class="notch"></div><img src="screen.png"></div>`
  assert.ok(g47({ html, css: "" }).some(r => !r.pass && r.gate === 47))
})
test("G47 passes on a plain figure with no chrome class", () => {
  const html = `<figure><img src="screenshot.png"><figcaption>the app</figcaption></figure>`
  assert.ok(g47({ html, css: "" }).every(r => r.pass))
})