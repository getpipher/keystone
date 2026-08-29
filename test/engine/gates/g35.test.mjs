import { test } from "node:test"
import assert from "node:assert/strict"
import g35 from "../../../engine/gates/g35-text-effect-position.mjs"

test("G35 fails on a highlighter band at the baseline", () => {
  const css = `mark { background-image: linear-gradient(180deg, transparent 85%, accent 85%); }`
  assert.ok(g35({ css, html: "" }).some(r => !r.pass && r.gate === 35))
})
test("G35 passes on a band behind the x-height", () => {
  const css = `mark { background-image: linear-gradient(180deg, transparent 38%, accent 38%, accent 92%, transparent 92%); }`
  assert.ok(g35({ css, html: "" }).every(r => r.pass))
})
