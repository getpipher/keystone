import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** @param {import("../types.mjs").DetectorContext} ctx @returns {GateResult[]} */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    let hasClip = false, hasGradient = false, line = 0
    for (const d of r.declarations) {
      if (d.prop.includes("background-clip") && d.value.includes("text")) { hasClip = true; line = d.line }
      if (d.prop === "background" && /gradient/.test(d.value)) { hasGradient = true; line = d.line }
      if (d.prop === "background-image" && /gradient/.test(d.value)) { hasGradient = true; line = d.line }
    }
    if (hasClip && hasGradient) {
      results.push(fail(2, "Gradient text", `${r.selector}: background-clip:text + gradient`, "no genre allows gradient text", undefined, line))
    }
  }
  if (results.length === 0) results.push(pass(2, "Gradient text"))
  return results
}