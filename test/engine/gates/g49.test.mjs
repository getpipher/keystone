import { test } from "node:test"
import assert from "node:assert/strict"
import g49 from "../../../engine/gates/g49-two-line-clickable.mjs"

test("G49 fails when a CTA wraps to 2 lines at 375px", () => {
  const clickableMetrics = [{ selector: "a.cta", viewport: 375, offsetHeight: 48, lineHeight: 24 }]
  assert.ok(g49({ clickableMetrics, css: "", html: "" }).some(r => !r.pass && r.gate === 49))
})
test("G49 passes on single-line clickables", () => {
  const clickableMetrics = [{ selector: "button", viewport: 1280, offsetHeight: 24, lineHeight: 24 }]
  assert.ok(g49({ clickableMetrics, css: "", html: "" }).every(r => r.pass))
})
