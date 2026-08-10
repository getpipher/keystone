import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const { tokens } = parseCss(ctx.css)
  const results = []
  for (const t of tokens) {
    if (!/--color-(surface|paper|ink|neutral|muted)/.test(t.name)) continue
    const m = t.value.match(/oklch\(\s*[\d.]+%?\s+0(?:\s+[\d.]+)?\s*\)/i)
    if (m) {
      results.push(fail(22, "Zero-chroma neutral", `${t.name}: ${t.value}`, "tint toward anchor hue, min chroma 0.005", ctx.cssFile ?? "tokens.css", t.line))
    }
  }
  if (results.length === 0) results.push(pass(22, "Zero-chroma neutral"))
  return results
}