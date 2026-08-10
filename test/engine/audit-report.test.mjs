import { test } from "node:test"
import assert from "node:assert/strict"
import { formatReport, TIER_MAP, EFFORT_MAP, EXCLUDED_GATES, AUDITED_GATES } from "../../engine/audit-report.mjs"
import { fail, pass } from "../../engine/types.mjs"

test("TIER_MAP covers all 13 implemented gates", () => {
  const implemented = [1, 2, 3, 7, 22, 26, 34, 40, 41, 44, 48, 50, 54]
  for (const g of implemented) assert.ok(g in TIER_MAP, `gate ${g} must be tiered`)
  assert.equal(implemented.length, AUDITED_GATES.length)
})

test("EFFORT_MAP covers all tiered gates", () => {
  for (const g of Object.keys(TIER_MAP).map(Number)) {
    assert.ok(g in EFFORT_MAP, `gate ${g} has no effort`)
  }
})

test("excluded gates are 8 + 32 (diversification, meaningless externally)", () => {
  const nums = EXCLUDED_GATES.map((e) => e.gate)
  assert.deepEqual(nums.sort((a, b) => a - b), [8, 32])
})

test("formatReport groups FAIL rows by tier, highest-impact first", () => {
  const results = [
    pass(1, "Banned display fonts"),
    fail(3, "3-equal-col card grid", ".features grid-template-columns: 1fr 1fr 1fr", "bento grid or asymmetric spans", "styles.css", 142),
    fail(22, "Zero-chroma neutrals", "3 surfaces", "add chroma to neutrals", "styles.css", 10),
    fail(40, "Contrast", ".btn: APCA Lc 45 < 60", "raise text lightness", undefined, undefined),
    fail(26, "Missing interaction states", ".btn has :hover but no :focus-visible", "add the four state rules", "styles.css", 88),
  ]
  const md = formatReport({ results, pass: 1, fail: 4, excluded: EXCLUDED_GATES, target: "test/fixtures/audit-site/" })
  // Tier 1 (G3) before Tier 2 (G26, G40) before Tier 3 (G22)
  const i3 = md.indexOf("G3   3-equal-col")
  const i26 = md.indexOf("G26   Missing")
  const i40 = md.indexOf("G40   Contrast")
  const i22 = md.indexOf("G22   Zero-chroma")
  assert.ok(i3 < i26 && i3 < i40, "Tier 1 before Tier 2")
  assert.ok(i26 < i22 && i40 < i22, "Tier 2 before Tier 3")
})

test("formatReport renders file:line when present, omits when absent", () => {
  const md = formatReport({
    results: [fail(3, "x", "ev", "fix", "styles.css", 142), fail(40, "Contrast", ".btn: APCA Lc 45 < 60", "fix")],
    pass: 0, fail: 2, excluded: [], target: "x",
  })
  assert.match(md, /\(styles\.css:142\)/)
  assert.doesNotMatch(md, /\.btn: APCA Lc 45 < 60\s*\(/, "no trailing () when file absent")
})

test("formatReport header + footer shape matches spec §6", () => {
  const md = formatReport({ results: [], pass: 13, fail: 0, excluded: EXCLUDED_GATES, target: "https://x.com", screenshots: [{ width: 1280 }, { width: 375 }] })
  assert.match(md, /^Keystone · audit report · https:\/\/x\.com · /)
  assert.match(md, /13 gates run · 13 PASS · 0 FAIL · 2 N\/A/)
  assert.match(md, /RANKED PUNCH LIST \(highest-impact first\)/)
  assert.match(md, /TIER 4 · SUBJECTIVE/)
  assert.match(md, /N\/A \(2\): G8 Diversification \(macro reuse\), G32 Diversification/)
  assert.match(md, /SCREENSHOTS: \[1280\] \[375\]/)
  assert.match(md, /RAW DATA: \.\/keystone-audit\/{computed\.json, dom\.html, viewports\.json}/)
})

test("formatReport surfaces a parse error above the tiers", () => {
  const md = formatReport({
    results: [{ gate: 0, name: "CSS parse error", pass: false, evidence: "Unclosed block", fix: "fix the CSS syntax error" }, fail(3, "3-equal-col card grid", "ev", "fix", "styles.css", 5)],
    pass: 0, fail: 2, excluded: [], target: "x",
  })
  const iParse = md.indexOf("PARSE ERROR")
  const iTier1 = md.indexOf("TIER 1 · STRUCTURAL TELLS")
  assert.ok(iParse > -1, "parse-error block present")
  assert.ok(iTier1 > -1, "tier 1 present (has a G3 fail)")
  assert.ok(iParse < iTier1, "parse error before tiers")
  assert.match(md, /Unclosed block/)
})