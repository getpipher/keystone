import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import g1 from "../../../engine/gates/g1-banned-fonts.mjs"

test("G1 fails on Inter display font", () => {
  const css = readFileSync("test/fixtures/g1-fail.css", "utf8")
  const results = g1({ css })
  const failed = results.filter(r => !r.pass)
  assert.equal(failed.length, 1)
  assert.equal(failed[0].gate, 1)
  assert.match(failed[0].evidence, /Inter/)
})

test("G1 passes on Newsreader", () => {
  const css = readFileSync("test/fixtures/g1-pass.css", "utf8")
  const results = g1({ css })
  assert.ok(results.every(r => r.pass))
})