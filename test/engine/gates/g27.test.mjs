import { test } from "node:test"
import assert from "node:assert/strict"
import g27 from "../../../engine/gates/g27-reduced-motion.mjs"

test("G27 fails when motion exists without a reduced-motion block", () => {
  assert.ok(g27({ css: `.x { transition: transform 200ms; }`, html: "" }).some(r => !r.pass && r.gate === 27))
})
test("G27 passes when a reduced-motion block exists", () => {
  const css = `.x { transition: transform 200ms; } @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }`
  assert.ok(g27({ css, html: "" }).every(r => r.pass))
})
test("G27 passes with no motion at all", () => {
  assert.ok(g27({ css: `.x { color: red; }`, html: "" }).every(r => r.pass))
})
