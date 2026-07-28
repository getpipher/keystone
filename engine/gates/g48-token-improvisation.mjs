import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const RAW_COLOR = /#([0-9a-f]{3,8})\b|oklch\(|rgb\(|hsl\(/i

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    for (const d of r.declarations) {
      if (!/^(color|background|background-color|border-color|fill|stroke)$/.test(d.prop)) continue
      if (d.value.startsWith("var(")) continue
      if (RAW_COLOR.test(d.value)) {
        results.push(fail(48, "Mid-render token improvisation", `${r.selector} ${d.prop}: ${d.value}`, "lift to a --color-* token or use var()", undefined, d.line))
      }
    }
  }
  if (results.length === 0) results.push(pass(48, "Token improvisation"))
  return results
}