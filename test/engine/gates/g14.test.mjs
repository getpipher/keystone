import { test } from "node:test"
import assert from "node:assert/strict"
import g14 from "../../../engine/gates/g14-animating-layout.mjs"

test("G14 fails on a transition animating width", () => {
  assert.ok(g14({ css: `.menu { transition: width 300ms; }`, html: "" }).some(r => !r.pass && r.gate === 14))
})
test("G14 fails on a @keyframes animating margin", () => {
  const css = `@keyframes slide { from { margin-left: 0; } to { margin-left: 100px; } } .x { animation: slide 1s; }`
  assert.ok(g14({ css, html: "" }).some(r => !r.pass && r.gate === 14))
})
test("G14 passes on transform/opacity animation", () => {
  const css = `.card { transition: transform 200ms, opacity 200ms; } @keyframes fade { from { opacity: 0; transform: translateY(8px); } }`
  assert.ok(g14({ css, html: "" }).every(r => r.pass))
})