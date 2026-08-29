import { test } from "node:test"
import assert from "node:assert/strict"
import g23 from "../../../engine/gates/g23-accent-viewport.mjs"

test("G23 fails when accent fills >5% of the viewport", () => {
  const css = `:root { --color-accent: oklch(60% 0.2 30); }`
  // a hero with accent background covering most of the viewport (1280x800 = 1,024,000; >5% = 51200)
  const computedPairs = [{ selector: "section", color: "oklch(20% 0 0)", backgroundColor: "oklch(60% 0.2 30)", width: 1280, height: 700 }]
  const viewports = [{ width: 1280, innerHeight: 800 }]
  assert.ok(g23({ css, html: "", computedPairs, viewports }).some(r => !r.pass && r.gate === 23))
})
test("G23 passes when accent is a small button", () => {
  const css = `:root { --color-accent: oklch(60% 0.2 30); }`
  const computedPairs = [{ selector: "button", color: "oklch(100% 0 0)", backgroundColor: "oklch(60% 0.2 30)", width: 120, height: 48 }]
  const viewports = [{ width: 1280, innerHeight: 800 }]
  assert.ok(g23({ css, html: "", computedPairs, viewports }).every(r => r.pass))
})
