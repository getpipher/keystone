import { test } from "node:test"
import assert from "node:assert/strict"
import g48 from "../../../engine/gates/g48-token-improvisation.mjs"

test("G48 fails on inline hex outside :root", () => {
  const css = `:root { --color-accent: oklch(60% 0.15 250); } .btn { color: #c0392b; }`
  assert.ok(g48({ css }).some(r => !r.pass && r.gate === 48))
})
test("G48 passes when all values are var()", () => {
  const css = `:root { --color-accent: oklch(60% 0.15 250); } .btn { color: var(--color-accent); }`
  assert.ok(g48({ css }).every(r => r.pass))
})