import { pass, fail } from "../types.mjs"

/** G49 · Two-line clickable text. A button/nav-link/CTA/tab/breadcrumb wraps to
 *  2+ lines at any viewport. Needs the render dump (clickableMetrics:
 *  {viewport, selector, offsetHeight, lineHeight}). offsetHeight > line-height*1.5
 *  ≈ 2 lines. */
export default function detect(ctx) {
  const metrics = (ctx.clickableMetrics || []).filter((m) => m.lineHeight > 0)
  const results = []
  const seen = new Set()
  for (const m of metrics) {
    if (m.offsetHeight > m.lineHeight * 1.5) {
      const key = `${m.selector}@${m.viewport}`
      if (seen.has(key)) continue
      seen.add(key)
      results.push(fail(49, "Two-line clickable text", `${m.selector} at ${m.viewport}px: offsetHeight ${m.offsetHeight}px > line-height ${m.lineHeight}px × 1.5 (2+ lines)`, "shorten the label, set white-space: nowrap on the affordance, or collapse the nav into a sheet/menu at narrow widths", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(49, "Two-line clickable text"))
  return results
}