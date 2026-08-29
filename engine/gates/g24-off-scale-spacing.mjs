import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G24 · Off-scale spacing values — padding/gap/margin px not ÷4 or not a --space-* token. */
export default function detect(ctx) {
  const { rules, tokens } = parseCss(ctx.css)
  const results = []
  const spaceTokens = new Set(tokens.filter((t) => /^--space-/.test(t.name)).map((t) => t.name))
  const SPACING_PROPS = /^(padding|margin|gap)(-top|-right|-bottom|-left|-block|-inline|-x|-y)?$/
  for (const r of rules) {
    for (const d of r.declarations) {
      if (!SPACING_PROPS.test(d.prop)) continue
      // var(--space-*) is fine
      if (/var\(\s*--space-/.test(d.value)) continue
      // "0" is fine
      if (/^(0|0px|none)$/.test(d.value.trim())) continue
      // find px values not divisible by 4
      const pxs = d.value.match(/\d+(?:\.\d+)?px/g) || []
      for (const px of pxs) {
        const n = parseFloat(px)
        if (n > 0 && n % 4 !== 0) {
          results.push(fail(24, "Off-scale spacing", `${r.selector} ${d.prop}: ${d.value} (${px} not ÷4)`, "round to the nearest spacing-scale value or use a --space-* token (multiples of 4px)", undefined, d.line))
          break
        }
      }
    }
  }
  if (results.length === 0) results.push(pass(24, "Off-scale spacing"))
  return results
}