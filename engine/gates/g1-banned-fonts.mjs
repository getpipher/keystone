import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const BANNED = ["inter", "roboto", "open sans", "poppins", "lato"]

/** Check if a CSS font-family value contains a banned font name (exact match per comma-separated entry). */
function hasBannedFont(value) {
  // Split by comma, strip quotes/whitespace, check exact case-insensitive match against banned list
  const fonts = value.split(",").map(s => s.trim().replace(/^["']|["']$/g, "").trim().toLowerCase())
  return fonts.some(f => BANNED.includes(f))
}

/** @param {import("../types.mjs").DetectorContext} ctx @returns {GateResult[]} */
export default function detect(ctx) {
  const { tokens, rules } = parseCss(ctx.css)
  const results = []
  // Check token block first
  for (const t of tokens) {
    if (!t.name.startsWith("--font-")) continue
    if (hasBannedFont(t.value)) {
      results.push(fail(1, "Banned display fonts", `${t.name}: ${t.value}`, `swap to a non-default face`, "tokens.css", t.line))
    }
  }
  // Check inline font-family declarations outside tokens
  for (const r of rules) {
    for (const d of r.declarations) {
      if (d.prop !== "font-family") continue
      if (hasBannedFont(d.value)) {
        results.push(fail(1, "Banned display fonts", `${r.selector} font-family: ${d.value}`, `swap to a non-default face`, undefined, d.line))
      }
    }
  }
  if (results.length === 0) results.push(pass(1, "Banned display fonts"))
  return results
}