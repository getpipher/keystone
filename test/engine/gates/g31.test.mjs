import { test } from "node:test"
import assert from "node:assert/strict"
import g31 from "../../../engine/gates/g31-lottie-default.mjs"

test("G31 fails on a lottie-player", () => {
  assert.ok(g31({ html: `<lottie-player src="x.json"></lottie-player>`, css: "" }).some(r => !r.pass && r.gate === 31))
})
test("G31 passes with no lottie", () => {
  assert.ok(g31({ html: `<svg></svg>`, css: "" }).every(r => r.pass))
})
