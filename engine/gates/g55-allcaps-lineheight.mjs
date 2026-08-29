import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G55 · All-caps display with line-height < 1.0. Uppercase + line-height <1.0
 *  → cap-tops of line N+1 collide with the baseline of line N when it wraps. */
const DISPLAY_SEL = /^h[1-6]$|hero|display|title|headline/i

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    if (!DISPLAY_SEL.test(r.selector)) continue
    const tt = r.declarations.find((d) => d.prop === "text-transform")
    if (!tt || !/uppercase/.test(tt.value)) continue
    const lh = r.declarations.find((d) => d.prop === "line-height")
    if (!lh) continue
    const n = parseFloat(lh.value)
    if (!isNaN(n) && n < 1.0) {
      results.push(fail(55, "All-caps display with line-height < 1.0", `${r.selector} text-transform: uppercase; line-height: ${lh.value}`, "bump line-height to ≥ 1.0 (1.02–1.08) or drop text-transform: uppercase on the display element", undefined, lh.line))
    }
  }
  if (results.length === 0) results.push(pass(55, "All-caps display with line-height < 1.0"))
  return results
}