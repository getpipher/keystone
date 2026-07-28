import { test } from "node:test"
import assert from "node:assert/strict"
import { extractStamp } from "../../engine/extract-stamp.mjs"
import { readFileSync } from "node:fs"

test("extractStamp parses a valid Keystone stamp", () => {
  const css = readFileSync("test/fixtures/stamp-valid.css", "utf8")
  const s = extractStamp(css)
  assert.equal(s.macrostructure, "Long Document")
  assert.equal(s.theme, "Garden")
  assert.equal(s.nav, "N5")
  assert.equal(s.footer, "Ft5")
  assert.equal(s.gates, "58/58 engine-verified")
})

test("extractStamp returns null when no stamp present", () => {
  const css = readFileSync("test/fixtures/stamp-missing.css", "utf8")
  assert.equal(extractStamp(css), null)
})