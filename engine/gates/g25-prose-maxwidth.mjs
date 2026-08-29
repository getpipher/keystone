import { parseCss } from "../parse-css.mjs"
import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

/** G25 · Prose container max-width outside 45–75ch. A prose element (p/article
 *  body/lede) with max-width in ch outside 45–75 is a tell. */
const PROSE = /^(p|article|main|section|div|span)$/i

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  for (const r of rules) {
    const mw = r.declarations.find((d) => d.prop === "max-width")
    if (!mw) continue
    const m = mw.value.match(/(\d+(?:\.\d+)?)\s*ch/i)
    if (!m) continue
    const ch = parseFloat(m[1])
    if (ch >= 45 && ch <= 75) continue
    // confirm the selector matches a prose-ish element
    const el = doc.querySelector(r.selector)
    if (!el) continue
    const isProse = PROSE.test(el.tagName) || /\b(prose|body|lede|content|article|copy)\b/i.test(el.getAttribute("class") || "")
    if (isProse) {
      results.push(fail(25, "Prose max-width outside 45–75ch", `${r.selector} max-width: ${mw.value} (prose container)`, "set max-width: 65ch for body prose, 50ch for ledes — stay in 45–75ch", undefined, mw.line))
    }
  }
  if (results.length === 0) results.push(pass(25, "Prose max-width outside 45–75ch"))
  return results
}