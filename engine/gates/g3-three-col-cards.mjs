import { parseHtml } from "../parse-html.mjs"
import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** @param {import("../types.mjs").DetectorContext} ctx @returns {GateResult[]} */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  // find grid rules with 3 equal 1fr tracks
  for (const r of rules) {
    const m = r.declarations.find(d => d.prop === "grid-template-columns")
    if (!m) continue
    const tracks = m.value.trim().split(/\s+/)
    if (tracks.length !== 3) continue
    if (!tracks.every(t => t === "1fr")) continue
    // confirm the selector's children are cards with icon-above-heading order
    const container = doc.querySelector(r.selector)
    if (!container) continue
    const cards = [...container.children]
    if (cards.length < 3) continue
    const suspicious = cards.every(c => {
      const kids = [...c.children]
      if (kids.length < 2) return false
      // icon-ish element (svg/img/div with class icon) before a heading
      const first = kids[0]
      const heading = kids.find(k => /^H[1-6]$/.test(k.tagName))
      return first && heading && kids.indexOf(first) < kids.indexOf(heading)
    })
    if (suspicious) {
      results.push(fail(3, "3-equal-col card grid", `${r.selector}: ${m.value} with icon>heading cards`, "bento grid or asymmetric spans", undefined, m.line))
    }
  }
  if (results.length === 0) results.push(pass(3, "3-equal-col card grid"))
  return results
}