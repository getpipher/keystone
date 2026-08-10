import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import g20 from "../../../engine/gates/g20-missing-stamp.mjs"

test("G20 fails when the CSS has no Keystone stamp", () => {
  const css = `body { color: red; }`
  assert.ok(g20({ css, html: "" }).some(r => !r.pass && r.gate === 20))
})
test("G20 passes when the stamp is present", () => {
  const css = readFileSync("test/fixtures/stamp-valid.css", "utf8")
  assert.ok(g20({ css, html: "" }).every(r => r.pass))
})