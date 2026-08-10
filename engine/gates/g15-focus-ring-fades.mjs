import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const RING_PROPS = new Set(["outline", "outline-color", "outline-width", "box-shadow", "border-color", "border"])

/** G15 · Focus ring fades in — :focus-visible with a transition on the ring
 *  (outline/box-shadow/border-color) of duration >0. The ring must appear
 *  instantly; keyboard users need an immediate indicator. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    if (!/:focus-visible/i.test(r.selector)) continue
    for (const d of r.declarations) {
      if (d.prop !== "transition") continue
      // a transition applies to a ring prop if it's named, or "all"
      const props = d.value.split(",").map((s) => s.trim().split(/\s+/)[0])
      const hitsRing = props.some((p) => RING_PROPS.has(p) || p === "all")
      const dur = d.value.match(/(\d+(?:\.\d+)?)\s*(ms|s)\b/i)
      const ms = dur ? (dur[2] === "s" ? parseFloat(dur[1]) * 1000 : parseFloat(dur[1])) : 0
      if (hitsRing && ms > 0) {
        results.push(fail(15, "Focus ring fades in", `${r.selector} transition: ${d.value} (on a focus-ring prop, ${ms}ms)`, "remove the transition on the focus ring — it must appear instantly on focus", undefined, d.line))
      }
    }
  }
  if (results.length === 0) results.push(pass(15, "Focus ring fades in"))
  return results
}