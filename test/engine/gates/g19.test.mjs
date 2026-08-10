import { test } from "node:test"
import assert from "node:assert/strict"
import g19 from "../../../engine/gates/g19-placeholder-names.mjs"

test("G19 fails on placeholder names + startup clichés", () => {
  assert.ok(g19({ html: `<p>Meet Jane Doe, our CEO.</p>`, css: "" }).some(r => !r.pass && r.gate === 19))
  assert.ok(g19({ html: `<p>Acme — the seamless platform.</p>`, css: "" }).some(r => !r.pass && r.gate === 19))
})
test("G19 passes on real, specific names", () => {
  assert.ok(g19({ html: `<p>Lina Park runs operations from Bandung.</p>`, css: "" }).every(r => r.pass))
})