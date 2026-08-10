import { test } from "node:test"
import assert from "node:assert/strict"
import g18 from "../../../engine/gates/g18-auto-rotate-pause.mjs"

test("G18 fails when a marquee animates without pause-on-hover/focus", () => {
  const html = `<div class="marquee">scrolling</div>`
  const css = `.marquee { animation: scroll 10s linear infinite; } @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }`
  assert.ok(g18({ html, css }).some(r => !r.pass && r.gate === 18))
})
test("G18 passes when the marquee pauses on :hover and :focus-within", () => {
  const html = `<div class="marquee">scrolling</div>`
  const css = `.marquee { animation: scroll 10s linear infinite; } .marquee:hover { animation-play-state: paused; } .marquee:focus-within { animation-play-state: paused; } @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }`
  assert.ok(g18({ html, css }).every(r => r.pass))
})