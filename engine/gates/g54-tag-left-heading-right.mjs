import { parseHtml } from "../parse-html.mjs"
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const HEAD_TAGS = ["H1","H2","H3","H4","H5","H6"]
const EYEBROW_HINTS = ["eyebrow", "kicker", "tag", "label", "number", "step"]

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  for (const r of rules) {
    const disp = r.declarations.find(d => d.prop === "display")
    const cols = r.declarations.find(d => d.prop === "grid-template-columns")
    if (!disp || disp.value !== "grid" || !cols) continue
    const tracks = cols.value.trim().split(/\s+/)
    if (tracks.length < 2) continue // single-column grid is fine
    const el = doc.querySelector(r.selector)
    if (!el) continue
    const hasHeading = el.querySelector(HEAD_TAGS.map(t => t).join(","))
    if (!hasHeading) continue
    const hasEyebrow = [...el.children].some(c => {
      const cls = (c.getAttribute("class") || "").toLowerCase()
      return EYEBROW_HINTS.some(h => cls.includes(h)) || c.tagName === "SPAN" || /^\s*\d/.test(c.textContent || "")
    })
    if (hasEyebrow) {
      results.push(fail(54, "Tag-left/heading-right two-column", `${r.selector}: ${cols.value} with eyebrow+heading`, "stack vertical — grid-template-columns: 1fr", undefined, cols.line))
    }
  }
  if (results.length === 0) results.push(pass(54, "Tag-left/heading-right"))
  return results
}