import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

/** G33 · Decorative SVG/canvas without aria. A visual-only <svg>/<canvas> or
 *  decorative div (role=img or class with art/decorative) lacking both aria-label
 *  and aria-hidden="true". */
function isDecorative(el) {
  const tag = el.tagName.toLowerCase()
  if (tag === "svg" || tag === "canvas") return true
  const role = el.getAttribute("role")
  if (role === "img") return true
  const cls = el.getAttribute("class") || ""
  return /\b(art|decorative|ornament| flourish|shape|graphic)\b/i.test(cls)
}

export default function detect(ctx) {
  const doc = parseHtml(ctx.html)
  const results = []
  for (const el of doc.querySelectorAll("svg, canvas, [role=img], [class]")) {
    if (!isDecorative(el)) continue
    const hasLabel = el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby")
    const hasHidden = el.getAttribute("aria-hidden") === "true"
    if (!hasLabel && !hasHidden) {
      const tag = el.tagName.toLowerCase() + (el.getAttribute("class") ? "." + el.getAttribute("class").split(/\s+/)[0] : "")
      results.push(fail(33, "Decorative element without aria", `<${tag}>`, 'add aria-hidden="true" to decorative elements, or aria-label="<description>" if it conveys information', undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(33, "Decorative element without aria"))
  return results
}