import { test } from "node:test"
import assert from "node:assert/strict"
import g34 from "../../../engine/gates/g34-horizontal-scroll.mjs"

test("G34 fails when scrollWidth > innerWidth at 375px", () => {
  const viewports = [
    { width: 1280, scrollWidth: 1280, innerHeight: 800 },
    { width: 375, scrollWidth: 420, innerHeight: 812 },
  ]
  assert.ok(g34({ viewports }).some(r => !r.pass && r.gate === 34))
})
test("G34 passes when all viewports fit", () => {
  const viewports = [
    { width: 1280, scrollWidth: 1280, innerHeight: 800 },
    { width: 375, scrollWidth: 375, innerHeight: 812 },
  ]
  assert.ok(g34({ viewports }).every(r => r.pass))
})