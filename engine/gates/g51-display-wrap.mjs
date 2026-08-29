import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G51 · Display headers without long-word wrap. Display-size elements (h1/h2,
 *  .hero__display, .section__title, anything ≥ --text-2xl) need
 *  overflow-wrap: anywhere + min-width: 0. */
const DISPLAY_SEL = /^(h1|h2|html|body|\[class[^=]*=["']?[^"']*hero|section__title|display)/i

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  // collect display-ish selectors (h1/h2, or class containing hero/display/title, or font-size ≥ 2xl)
  for (const r of rules) {
    const sel = r.selector.toLowerCase()
    const isDisplay = /^h1$/.test(r.selector) || /^h2$/.test(r.selector) || /hero|display|title|headline/.test(sel) || r.declarations.some((d) => d.prop === "font-size" && /xxl|xl|2xl|3xl|4xl|clamp\(/i.test(d.value))
    if (!isDisplay) continue
    const hasWrap = r.declarations.some((d) => d.prop === "overflow-wrap" && /anywhere|break-word/.test(d.value))
    const hasMinWidth = r.declarations.some((d) => d.prop === "min-width" && /0\b/.test(d.value))
    // only flag if the element is likely to wrap long words; require both overflow-wrap + min-width
    if (!hasWrap || !hasMinWidth) {
      const missing = [!hasWrap && "overflow-wrap: anywhere", !hasMinWidth && "min-width: 0"].filter(Boolean).join(" + ")
      results.push(fail(51, "Display header without long-word wrap", `${r.selector} missing ${missing}`, "add overflow-wrap: anywhere; min-width: 0 to all display-size elements", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(51, "Display headers without long-word wrap"))
  return results
}