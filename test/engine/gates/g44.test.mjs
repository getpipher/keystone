import { test } from "node:test"
import assert from "node:assert/strict"
import g44 from "../../../engine/gates/g44-hero-fit.mjs"

test("G44 fails when hero CTA bottom exceeds innerHeight at 1280", () => {
  const hero = { eyebrow: { bottom: 120 }, headline: { bottom: 280 }, lede: { bottom: 380 }, cta: { bottom: 950 } }
  const desktop = { width: 1280, innerHeight: 800, hero }
  assert.ok(g44({ viewports: [desktop] }).some(r => !r.pass && r.gate === 44))
})
test("G44 passes when hero fits in 800px", () => {
  const hero = { eyebrow: { bottom: 120 }, headline: { bottom: 280 }, lede: { bottom: 380 }, cta: { bottom: 720 } }
  const desktop = { width: 1280, innerHeight: 800, hero }
  assert.ok(g44({ viewports: [desktop] }).every(r => r.pass))
})