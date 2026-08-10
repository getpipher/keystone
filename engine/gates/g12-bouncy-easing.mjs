import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const UI_SELECTOR = /\b(btn|button|modal|dialog|tooltip|popover|nav|menu|dropdown|chip|tab)/i

/** G12 · Bouncy/overshoot easings on UI state changes. A cubic-bezier with a
 *  control point >1.0 (overshoot) on a UI element is a tell. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    for (const d of r.declarations) {
      if (d.prop !== "transition-timing-function" && d.prop !== "animation-timing-function") continue
      const m = d.value.match(/cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/i)
      if (!m) continue
      const cps = [parseFloat(m[2]), parseFloat(m[4])] // y-values of the two control points
      if (cps.some((c) => c > 1.0)) {
        const isUi = UI_SELECTOR.test(r.selector)
        if (isUi) {
          results.push(fail(12, "Bouncy/overshoot easing on UI", `${r.selector} ${d.prop}: ${d.value} (control point > 1.0)`, "use ease-out or cubic-bezier(0.22, 1, 0.36, 1) for UI state changes; reserve overshoot for drag/throw/physical", undefined, d.line))
        }
      }
    }
  }
  if (results.length === 0) results.push(pass(12, "Bouncy/overshoot easing on UI"))
  return results
}