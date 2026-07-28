import { parseHtml } from "../parse-html.mjs"
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  for (const r of rules) {
    const m = r.declarations.find(d => d.prop === "grid-template-columns")
    if (!m) continue
    const tracks = m.value.trim().split(/\s+/)
    const hasBare1fr = tracks.some(t => t === "1fr")
    if (!hasBare1fr) continue
    const container = doc.querySelector(r.selector)
    if (!container) continue
    if (container.querySelector("img, picture")) {
      results.push(fail(50, "Image grid track without minmax(0,1fr)", `${r.selector}: ${m.value} contains <img>`, "switch 1fr → minmax(0,1fr)", undefined, m.line))
    }
  }
  if (results.length === 0) results.push(pass(50, "Image grid track minmax"))
  return results
}