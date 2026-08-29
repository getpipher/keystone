import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G35 · Decorative text-effect position (deterministic half). A highlighter
 *  band (linear-gradient on background-image/box-shadow on a text element)
 *  should sit behind the x-height, not at the baseline (fat underline). Det:
 *  flag a linear-gradient on a text element whose band sits at the very bottom
 *  (the last stop starts near 80–100%). Vision (describe_image Q13) confirms. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    for (const d of r.declarations) {
      if (d.prop !== "background-image" && d.prop !== "background") continue
      const grad = d.value.match(/linear-gradient\(([^)]+)\)/i)
      if (!grad) continue
      // text element heuristic: a selector on mark/em/strong/span/a/heading, or background-clip:text elsewhere
      const isTextEl = /^(mark|em|strong|span|a|h[1-6]|\.highlight|\.accent-text|mark$)/i.test(r.selector) || rules.some((rr) => rr.selector === r.selector && rr.declarations.some((dd) => dd.prop === "background-clip" && /text/i.test(dd.value)))
      if (!isTextEl) continue
      // parse the gradient stops: if a solid band sits at the bottom (last color stop near 80–100%)
      const stops = grad[1]
      const pct = stops.match(/(\d+(?:\.\d+)?)\s*%/g) || []
      const nums = pct.map((p) => parseFloat(p))
      // a baseline band: a transparent→accent→transparent where the accent starts near the bottom (e.g. 60-90%) or a single stop near 100%
      const lastStop = nums.length ? nums[nums.length - 1] : null
      const firstStop = nums.length ? nums[0] : null
      // A baseline band sits at the bottom: its first color stop starts at/after ~60%.
      // A band behind the x-height starts higher (~38%). So: firstStop >= 60 = baseline.
      const isBaselineBand = firstStop != null && firstStop >= 60
      if (isBaselineBand) {
        results.push(fail(35, "Decorative text-effect at baseline", `${r.selector} linear-gradient band near the baseline (${lastStop}%+)`, "position the band behind the x-height: linear-gradient(180deg, transparent ~38%, accent ~38%, accent ~92%, transparent ~92%); underlines 1-2px, offset 1-2px from baseline", undefined, d.line))
      }
    }
  }
  if (results.length === 0) results.push(pass(35, "Decorative text-effect position"))
  return results
}