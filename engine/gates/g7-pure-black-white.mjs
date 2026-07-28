import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const PURE = [/#000\b/i, /#fff\b/i, /oklch\(\s*0\s+0\s+0\s*\)/i, /oklch\(\s*100\s*%\s+0\s+0\s*\)/i]

export default function detect(ctx) {
  const { tokens, rules } = parseCss(ctx.css)
  const results = []
  for (const t of tokens) {
    if (!t.name.startsWith("--color-")) continue
    if (PURE.some(p => p.test(t.value))) {
      results.push(fail(7, "Pure #000/#fff base", `${t.name}: ${t.value}`, "use a near-black/near-white oklch with chroma ≥ 0.005", "tokens.css", t.line))
    }
  }
  if (results.length === 0) results.push(pass(7, "Pure black/white base"))
  return results
}