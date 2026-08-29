import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G38 · Outlier face in more than two slots. The --font-outlier token must
 *  appear in at most 2 selectors (wordmark + one other). */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  const slots = new Set()
  for (const r of rules) {
    for (const d of r.declarations) {
      if (d.prop === "font-family" && /var\(\s*--font-outlier/.test(d.value)) {
        slots.add(r.selector)
      }
    }
  }
  if (slots.size > 2) {
    results.push(fail(38, "Outlier face in >2 slots", `${slots.size} selectors use --font-outlier: ${[...slots].slice(0, 3).join(", ")}…`, "collapse the third outlier usage back to the body face — wordmark + one other slot, no more", undefined, undefined))
  }
  if (results.length === 0) results.push(pass(38, "Outlier face in >2 slots"))
  return results
}