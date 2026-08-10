import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G11 · Uniform hover-scale — the same transform: scale() on 3+ unrelated
 *  selectors' :hover is a tell (every card jumps the same way). */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  const scaleUses = new Map() // scaleValue -> Set of base selectors
  for (const r of rules) {
    if (!/:hover/i.test(r.selector)) continue
    for (const d of r.declarations) {
      if (d.prop !== "transform") continue
      const m = d.value.match(/scale\(\s*([^)]+)\)/i)
      if (!m) continue
      const scale = m[1].trim()
      const base = r.selector.replace(/:hover.*$/i, "").trim()
      if (!scaleUses.has(scale)) scaleUses.set(scale, new Set())
      scaleUses.get(scale).add(base)
    }
  }
  for (const [scale, bases] of scaleUses) {
    if (bases.size >= 3) {
      results.push(fail(11, "Uniform hover-scale", `scale(${scale}) on ${bases.size} unrelated selectors (${[...bases].slice(0, 3).join(", ")}…)`, "use varied hover effects per element type — color shift on buttons, underline on links, shadow on cards", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(11, "Uniform hover-scale"))
  return results
}