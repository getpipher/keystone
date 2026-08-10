import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const GROUPS = {
  transform: ["transform"],
  shadow: ["box-shadow", "filter"],
  color: ["color", "background-color", "background", "border-color", "fill"],
  background: ["background", "background-color", "background-image"],
  border: ["border", "border-color", "border-width"],
}

/** G13 · Multiple simultaneous hover effects — 3+ property groups change on
 *  one element's :hover (translate + scale + shadow + color + rotate). */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  for (const r of rules) {
    if (!/:hover/i.test(r.selector)) continue
    const changedGroups = new Set()
    for (const d of r.declarations) {
      for (const [group, props] of Object.entries(GROUPS)) {
        if (props.includes(d.prop)) changedGroups.add(group)
      }
    }
    if (changedGroups.size >= 3) {
      results.push(fail(13, "Multiple simultaneous hover effects", `${r.selector} :hover changes ${[...changedGroups].join(", ")} (${changedGroups.size} groups)`, "pick one hover effect — color shift OR shadow OR subtle translate, not all three", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(13, "Multiple simultaneous hover effects"))
  return results
}