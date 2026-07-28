import { test } from "node:test"
import assert from "node:assert/strict"
import g7 from "../../../engine/gates/g7-pure-black-white.mjs"

test("G7 fails on pure #000 as base", () => {
  const css = `:root { --color-ink: #000; } body { background: var(--color-ink); }`
  assert.ok(g7({ css }).some(r => !r.pass && r.gate === 7))
})
test("G7 passes on oklch(20% 0.01 250)", () => {
  const css = `:root { --color-ink: oklch(20% 0.01 250); }`
  assert.ok(g7({ css }).every(r => r.pass))
})