import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const CARD_CLASS = /\b(card|__card|panel|tile|feature|surface)\b/i
// neutral = a gray/neutral (chroma ~0 or a gray keyword). Non-neutral = colored.
function isNeutralColor(value) {
  // neutral = chroma ~0 in oklch (0 followed by space+ hue, or closing paren), or a gray keyword.
  return /oklch\(\s*[\d.]+%?\s+0(?:\s+[\d.]+)?\s*\)/i.test(value) || /^(transparent|currentColor|inherit)$|^(#(fff|000)|gray|grey|neutral)/i.test(value)
}
function borderWidthPx(value) {
  const m = value.match(/(\d+(?:\.\d+)?)px/)
  return m ? parseFloat(m[1]) : 0
}

/** G5 · Card side-stripe border — thick coloured left/right border on a card. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    if (!CARD_CLASS.test(r.selector)) continue
    for (const d of r.declarations) {
      if (d.prop !== "border-left" && d.prop !== "border-right") continue
      const w = d.value.match(/(\d+(?:\.\d+)?)px/)
      if (w && parseFloat(w[1]) >= 4 && !isNeutralColor(d.value)) {
        results.push(fail(5, "Card side-stripe border", `${r.selector} ${d.prop}: ${d.value}`, "remove the stripe; use a top-edge accent bar (2px) or a subtle background tint", undefined, d.line))
      }
    }
  }
  if (results.length === 0) results.push(pass(5, "Card side-stripe border"))
  return results
}