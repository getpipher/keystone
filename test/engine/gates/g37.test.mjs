import { test } from "node:test"
import assert from "node:assert/strict"
import g37 from "../../../engine/gates/g37-three-fonts.mjs"

test("G37 fails with more than 3 font families", () => {
  const css = `:root { --font-display: Georgia; --font-body: system-ui; } .code { font-family: monospace; .x { font-family: "Comic Sans"; } }`
  assert.ok(g37({ css: `body { font-family: Georgia; } h1 { font-family: system-ui; } .a { font-family: monospace; } .b { font-family: "Comic Sans"; }`, html: "" }).some(r => !r.pass && r.gate === 37))
})
test("G37 passes with 3 or fewer families", () => {
  assert.ok(g37({ css: `:root { --font-display: Georgia; --font-body: system-ui; } body { font-family: var(--font-body); }`, html: "" }).every(r => r.pass))
})
