import { test } from "node:test"
import assert from "node:assert/strict"
import g22 from "../../../engine/gates/g22-zero-chroma.mjs"

test("G22 fails on oklch neutral with 0 chroma", () => {
  const css = `:root { --color-surface-2: oklch(95% 0 0); }`
  assert.ok(g22({ css }).some(r => !r.pass && r.gate === 22))
})
test("G22 passes on tinted neutral", () => {
  const css = `:root { --color-surface-2: oklch(95% 0.008 250); }`
  assert.ok(g22({ css }).every(r => r.pass))
})