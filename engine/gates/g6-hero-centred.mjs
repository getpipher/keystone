import { parseCss } from "../parse-css.mjs"
import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

/** G6 · Hero centred-everything (deterministic half). The hero must not centre
 *  all of eyebrow+title+lede+CTA on one axis. Det: flag a hero whose direct
 *  children all declare text-align:center or margin:*auto. The vision pass
 *  (describe_image Q1) judges the actual axis; this catches the CSS tell. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  // Find a hero section (class contains "hero", or the first <section> with an <h1>).
  const hero = doc.querySelector('[class*="hero"], section, header')
  if (!hero) return [pass(6, "Hero centred-everything")]
  const heroSelector = (hero.getAttribute("class") || "").split(/\s+/)[0]
  // Count hero children that are individually centred (text-align:center or margin auto).
  // We approximate by scanning rules whose selector matches a hero-child class.
  const children = [...hero.children]
  if (children.length < 3) return [pass(6, "Hero centred-everything")]
  let centred = 0
  for (const child of children) {
    // Match rules by the child's class word OR its tag name (so unclassed <h1>/<p> count).
    const tokens = []
    const cls = (child.getAttribute("class") || "").split(/\s+/)[0]
    if (cls) tokens.push(cls)
    tokens.push(child.tagName.toLowerCase())
    for (const r of rules) {
      if (!tokens.some((t) => r.selector.toLowerCase().includes(t))) continue
      for (const d of r.declarations) {
        if (d.prop === "text-align" && /center/.test(d.value)) { centred++; break }
        if (d.prop === "margin" && /\bauto\b/.test(d.value) && /left|right|0 auto|auto auto/.test(d.value)) { centred++; break }
        if ((d.prop === "margin-left" || d.prop === "margin-right") && /auto/.test(d.value)) { centred++; break }
      }
    }
  }
  // At most two centred elements are allowed; 3+ centred children is the tell.
  if (centred >= 3) {
    results.push(fail(6, "Hero centred-everything", `${heroSelector || "hero"}: ${centred} children centred on one axis`, "break alignment — anchor the eyebrow left, right-flush the CTA, or use a numeral anchor", undefined, undefined))
  }
  if (results.length === 0) results.push(pass(6, "Hero centred-everything"))
  return results
}