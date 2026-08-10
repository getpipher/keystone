// engine/audit-report.mjs — the audit-verb ranked punch-list report.
//
// The audit verb's deliverable is a ranked punch list (not a pass/fail card):
// FAIL rows grouped by severity tier, highest-impact first, each with gate #,
// name, evidence value, fix suggestion, effort, and file:line or selector.
// See docs/superpowers/specs/2026-07-27-keystone-design.md §6 for the golden shape.
//
// Tier 4 (subjective / vision) is NOT produced here — it's model-callable. The
// report notes where the model should append Tier 4 after running describe_image
// on the screenshots with the 18-question prompt (gates.md § The vision pass).

/** gate number → severity tier (1 = structural, 2 = a11y, 3 = craft). */
export const TIER_MAP = {
  1: 1, // banned display fonts
  2: 1, // gradient text
  3: 1, // 3-equal-col card grid
  4: 1, // nested cards
  5: 1, // card side-stripe border
  6: 1, // hero centred-everything (det half)
  7: 1, // pure black/white
  10: 3, // transition: all (motion)
  11: 3, // uniform hover-scale (motion)
  12: 3, // bouncy/overshoot easing (motion)
  13: 3, // multiple simultaneous hover effects (motion)
  14: 3, // animating layout properties (motion)
  15: 2, // focus ring fades in (a11y)
  17: 2, // tooltip hover-delay = focus-delay (a11y)
  18: 2, // auto-rotating without pause (a11y)
  19: 1, // placeholder names / startup clichés
  22: 3, // zero-chroma neutrals
  26: 2, // missing interaction states
  34: 3, // horizontal scroll
  40: 2, // contrast (APCA)
  41: 2, // contrast (large/icons)
  42: 1, // nav fingerprint (det half)
  44: 3, // hero fit
  47: 1, // re-drawn UI chrome (det half)
  48: 3, // token improvisation
  50: 3, // image-grid minmax
  54: 1, // tag-left/heading-right
}

/** gate number → default effort (v1 lookup; refined in Plan 1b). */
export const EFFORT_MAP = {
  1: "low",
  2: "low",
  3: "medium",
  4: "trivial",
  5: "trivial",
  6: "medium",
  7: "low",
  10: "trivial",
  11: "low",
  12: "low",
  13: "low",
  14: "low",
  15: "trivial",
  17: "medium",
  18: "medium",
  19: "trivial",
  22: "trivial",
  26: "low",
  34: "trivial",
  40: "medium",
  41: "medium",
  42: "medium",
  44: "high",
  47: "medium",
  48: "low",
  50: "trivial",
  54: "low",
}

/** Audit excludes gates that are meaningless on external code (spec §6). */
export const EXCLUDED_GATES = [
  { gate: 8, name: "Diversification (macro reuse)", reason: "meaningless on external code — no Keystone log" },
  { gate: 20, name: "Missing CSS stamp", reason: "external code has no Keystone stamp" },
  { gate: 21, name: "Specimen fall-through", reason: "depends on the Keystone stamp" },
  { gate: 32, name: "Diversification (theme/nav/footer reuse)", reason: "meaningless on external code — no Keystone log" },
]

const TIER_LABELS = {
  1: "TIER 1 · STRUCTURAL TELLS (fix first)",
  2: "TIER 2 · ACCESSIBILITY",
  3: "TIER 3 · CRAFT",
}

/** All gates the deterministic engine knows about that the audit reports on. */
export const AUDITED_GATES = Object.keys(TIER_MAP).map(Number).sort((a, b) => a - b)

/**
 * Format the audit report as markdown (matches spec §6's golden shape).
 *
 * @param {{results: import("./types.mjs").GateResult[], pass: number, fail: number, excluded: {gate:number,name:string,reason:string}[], target: string, timestamp?: string, screenshots?: {width:number,path:string}[], rawDataDir?: string}} input
 * @returns {string} markdown report
 */
export function formatReport(input) {
  const {
    results,
    pass,
    fail,
    excluded,
    target,
    timestamp = new Date().toISOString(),
    screenshots = [],
    rawDataDir = "keystone-audit",
  } = input

  const failsByTier = { 1: [], 2: [], 3: [] }
  const parseErrors = []
  for (const r of results) {
    if (r.pass) continue
    if (r.gate === 0) {
      parseErrors.push(r)
      continue
    }
    const tier = TIER_MAP[r.gate]
    if (tier) failsByTier[tier].push(r)
  }

  const total = pass + fail
  const lines = []
  lines.push(`Keystone · audit report · ${target} · ${timestamp}`)
  lines.push(`${total} gates run · ${pass} PASS · ${fail} FAIL · ${excluded.length} N/A`)
  lines.push("")
  lines.push("RANKED PUNCH LIST (highest-impact first)")
  lines.push("")

  if (parseErrors.length > 0) {
    lines.push("PARSE ERROR (blocks CSS-gate scoring — fix first)")
    for (const r of parseErrors) {
      lines.push(`  ✗ G0   ${r.name}`)
      lines.push(`        ${r.evidence || ""}`)
      if (r.fix) lines.push(`        fix: ${r.fix}`)
    }
    lines.push("")
  }

  for (const tier of [1, 2, 3]) {
    const rows = failsByTier[tier]
    if (rows.length === 0) continue
    lines.push(TIER_LABELS[tier])
    for (const r of rows) {
      const effort = EFFORT_MAP[r.gate] || "low"
      lines.push(`  ✗ G${r.gate}   ${r.name}`)
      const loc = r.file ? `  (${r.file}${r.line ? ":" + r.line : ""})` : ""
      lines.push(`        ${r.evidence || ""}${loc}`)
      if (r.fix) lines.push(`        fix: ${r.fix} · effort: ${effort}`)
    }
    lines.push("")
  }

  // Tier 4 — subjective / vision. Not computed deterministically; the model
  // appends rows here after running describe_image on the screenshots.
  lines.push("TIER 4 · SUBJECTIVE (vision-verdict, confidence-weighted, never auto-fail alone)")
  lines.push("  run `describe_image` on the screenshots with the 18-question prompt (gates.md § The vision pass),")
  lines.push("  then append rows here: S1-S3, G38a italic-headers, G46 invented-metrics.")
  lines.push("")

  if (excluded.length > 0) {
    const list = excluded.map((e) => `G${e.gate} ${e.name}`).join(", ")
    lines.push(`N/A (${excluded.length}): ${list}`)
    lines.push("")
  }

  if (screenshots.length > 0) {
    const dims = screenshots.map((s) => `[${s.width}]`).join(" ")
    lines.push(`SCREENSHOTS: ${dims}`)
  }
  lines.push(`RAW DATA: ./${rawDataDir}/{computed.json, dom.html, viewports.json}`)
  lines.push("")

  return lines.join("\n")
}