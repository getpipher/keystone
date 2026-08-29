import { test } from "node:test"
import assert from "node:assert/strict"
import g25 from "../../../engine/gates/g25-prose-maxwidth.mjs"

test("G25 fails on prose max-width below 45ch", () => {
  assert.ok(g25({ css: `p { max-width: 30ch; }`, html: `<p>text</p>` }).some(r => !r.pass && r.gate === 25))
})
test("G25 passes at 65ch", () => {
  assert.ok(g25({ css: `p { max-width: 65ch; }`, html: `<p>text</p>` }).every(r => r.pass))
})
