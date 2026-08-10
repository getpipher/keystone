import { test } from "node:test"
import assert from "node:assert/strict"
import g40 from "../../../engine/gates/g40-41-contrast.mjs"

test("G40 fails on low-contrast pair (Lc 30, needs 60)", () => {
  const computedPairs = [{ selector: ".nav a", color: "oklch(60% 0 0)", backgroundColor: "oklch(62% 0 0)" }]
  assert.ok(g40({ computedPairs }).some(r => !r.pass && r.gate === 40))
})
test("G40 passes on high-contrast pair", () => {
  const computedPairs = [{ selector: "body", color: "oklch(10% 0 0)", backgroundColor: "oklch(98% 0 0)" }]
  assert.ok(g40({ computedPairs }).every(r => r.pass))
})

test("G40 fails on low-contrast RGB pair (Chromium computed-style form)", () => {
  const computedPairs = [{ selector: ".btn", color: "rgb(80,80,80)", backgroundColor: "rgb(90,90,90)" }]
  assert.ok(g40({ computedPairs }).some(r => !r.pass && r.gate === 40), "RGB low-contrast pair must produce a G40 fail")
})
