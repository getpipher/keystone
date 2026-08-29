import { test } from "node:test"
import assert from "node:assert/strict"
import g24 from "../../../engine/gates/g24-off-scale-spacing.mjs"

test("G24 fails on padding not divisible by 4", () => {
  assert.ok(g24({ css: `.card { padding: 17px; }`, html: "" }).some(r => !r.pass && r.gate === 24))
})
test("G24 passes on multiples of 4 + --space-* tokens", () => {
  assert.ok(g24({ css: `:root { --space-3: 12px; } .card { padding: 16px; gap: var(--space-3); margin: 0; }`, html: "" }).every(r => r.pass))
})
