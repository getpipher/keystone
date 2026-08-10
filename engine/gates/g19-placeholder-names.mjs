import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

// Placeholder names + startup cliché terms (G19). Case-insensitive whole-word.
const CLICHES = [
  "jane doe", "john smith", "john doe",
  // startup cliché terms (spec): Acme, Nexus, Seamless, Unleash
  /\bacme\b/, /\bnexus\b/, /\bseamless\b/, /\bunleash\b/,
  // common filler compounds
  /\bnext[- ]gen(?:eration)?\b/, /\bgame[- ]changer\b/, /\bcutting[- ]edge\b/, /\bleverage\b/,
]

/** G19 · Placeholder names / startup clichés in the rendered text. */
export default function detect(ctx) {
  const doc = parseHtml(ctx.html)
  const text = (doc.documentElement?.textContent || "").replace(/\s+/g, " ").toLowerCase()
  const results = []
  for (const c of CLICHES) {
    const needle = typeof c === "string" ? c : c.source
    if (c instanceof RegExp ? c.test(text) : text.includes(c)) {
      results.push(fail(19, "Placeholder names / startup clichés", `text contains "${needle}"`, "use real names from the brief, or leave a labelled placeholder the user can replace", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(19, "Placeholder names / startup clichés"))
  return results
}