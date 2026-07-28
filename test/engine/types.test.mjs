import { test } from "node:test"
import assert from "node:assert/strict"
import { fail, pass } from "../../engine/types.mjs"

test("fail() builds a failing GateResult", () => {
  const r = fail(3, "3-equal-col card grid", ".features: 1fr 1fr 1fr", "bento or asymmetric spans", "styles.css", 142)
  assert.equal(r.gate, 3)
  assert.equal(r.pass, false)
  assert.equal(r.evidence, ".features: 1fr 1fr 1fr")
  assert.equal(r.line, 142)
})

test("pass() builds a passing GateResult", () => {
  const r = pass(1, "Banned display fonts")
  assert.equal(r.pass, true)
  assert.equal(r.gate, 1)
})