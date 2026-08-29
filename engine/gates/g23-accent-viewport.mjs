import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"
import { toOklchString } from "../color.mjs"

/** G23 · Accent >5% viewport. Sum the bounding-box area of all elements whose
 *  computed color/bg matches the accent token; if > 5% of the viewport area, fail.
 *  Needs the render dump (computedPairs with width/height). The accent token is
 *  read from CSS (--color-accent / --accent) + converted to OKLCH for matching. */
function accentOklch(tokens) {
  const t = tokens.find((x) => x.name === "--color-accent" || x.name === "--accent")
  if (!t) return null
  return toOklchString(t.value)
}

export default function detect(ctx) {
  const { tokens } = parseCss(ctx.css)
  const pairs = (ctx.computedPairs || []).filter((p) => p.width && p.height)
  if (pairs.length === 0) return [pass(23, "Accent >5% viewport")]
  const accent = accentOklch(tokens)
  if (!accent) return [pass(23, "Accent >5% viewport")]
  const results = []
  let area = 0
  for (const p of pairs) {
    const colorMatch = p.color && p.color === accent
    const bgMatch = p.backgroundColor && p.backgroundColor === accent
    if (colorMatch || bgMatch) {
      area += p.width * p.height
    }
  }
  // viewport area: use the 1280 viewport metric if available, else 1280×800
  const vp = (ctx.viewports || []).find((v) => v.width === 1280)
  const vpArea = vp ? vp.width * vp.innerHeight : 1280 * 800
  if (area > 0.05 * vpArea) {
    const pct = ((area / vpArea) * 100).toFixed(1)
    results.push(fail(23, "Accent >5% viewport", `accent covers ${pct}% of the viewport (>${5}%)`, "retreat the accent — use it for emphasis (links, key buttons, small accents), not for filling surfaces", undefined, undefined))
  }
  if (results.length === 0) results.push(pass(23, "Accent >5% viewport"))
  return results
}