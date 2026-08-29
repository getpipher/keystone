import { test } from "node:test"
import assert from "node:assert/strict"
import g56 from "../../../engine/gates/g56-sticky-nav-overlap.mjs"

test("G56 fails on two sticky top:0 (nav + sidebar)", () => {
  const css = `nav { position: sticky; top: 0; } .sidebar { position: sticky; top: 0; }`
  assert.ok(g56({ css, html: "" }).some(r => !r.pass && r.gate === 56))
})
test("G56 passes when the secondary sticky offsets by --banner-height", () => {
  const css = `nav { position: sticky; top: 0; } .sidebar { position: sticky; top: var(--banner-height); }`
  assert.ok(g56({ css, html: "" }).every(r => r.pass))
})
test("G56 passes with a single sticky nav", () => {
  assert.ok(g56({ css: `nav { position: sticky; top: 0; }`, html: "" }).every(r => r.pass))
})
