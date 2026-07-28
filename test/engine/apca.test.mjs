import { test } from "node:test"
import assert from "node:assert/strict"
import { apcaLc, wcagRatio } from "../../engine/apca.mjs"

test("apcaLc black-on-white ~ -106", () => {
  const lc = apcaLc(0, 100)
  assert.ok(lc < -100 && lc > -108, `got ${lc}`)
})
test("apcaLc white-on-black ~ +106", () => {
  const lc = apcaLc(100, 0)
  assert.ok(lc > 100 && lc < 108, `got ${lc}`)
})
test("wcagRatio black-on-white = 21", () => {
  assert.equal(Math.round(wcagRatio(0, 100)), 21)
})
test("apcaLc mid-grey-on-grey ~ 0 (low contrast)", () => {
  const lc = apcaLc(60, 62)
  assert.ok(Math.abs(lc) < 20, `got ${lc}`)
})