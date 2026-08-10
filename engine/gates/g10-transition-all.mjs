import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G10 · `transition: all` — specifies "all" instead of named properties. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    for (const d of r.declarations) {
      if (d.prop !== "transition" && d.prop !== "transition-property") continue
      // "all" as a whole-word property keyword (not part of a color name etc.)
      if (/(^|\s|,)all($|\s|,)/i.test(d.value) || /\btransition-all\b/i.test(r.selector)) {
        results.push(fail(10, "`transition: all`", `${r.selector} ${d.prop}: ${d.value}`, "list only the properties that actually change (transition: background-color 200ms, color 200ms)", undefined, d.line))
      }
    }
  }
  if (results.length === 0) results.push(pass(10, "`transition: all`"))
  return results
}