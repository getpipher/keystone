import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const REQUIRED = [":hover", ":focus-visible", ":active", ":disabled"]
const INTERACTIVE = /^(a|button|\.btn|\.cta|input|select|textarea|\[role=["']button["']\])/i

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  const baseSelectors = new Set()
  for (const r of rules) {
    const base = r.selector.replace(/:[a-z-]+$/i, "").trim()
    if (INTERACTIVE.test(r.selector) && !r.selector.includes(":")) baseSelectors.add(r.selector.trim())
  }
  for (const base of baseSelectors) {
    const present = REQUIRED.filter(state => rules.some(r => r.selector === `${base}${state}`))
    const missing = REQUIRED.filter(s => !present.includes(s))
    if (missing.length > 0) {
      results.push(fail(26, "Missing interaction states", `${base} has ${present.join(",") || "none"}; missing ${missing.join(",")}`, `add ${missing.join(", ")} rules`, undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(26, "Missing interaction states"))
  return results
}