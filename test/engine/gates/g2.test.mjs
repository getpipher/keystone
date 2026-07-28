import { test } from "node:test"
import assert from "node:assert/strict"
import g2 from "../../../engine/gates/g2-gradient-text.mjs"

test("G2 fails on background-clip:text + linear-gradient", () => {
  const css = `.hero h1 { background: linear-gradient(90deg, #6366f1, #ec4899); -webkit-background-clip: text; color: transparent; }`
  const results = g2({ css })
  const failed = results.filter(r => !r.pass)
  assert.equal(failed.length, 1)
  assert.equal(failed[0].gate, 2)
})