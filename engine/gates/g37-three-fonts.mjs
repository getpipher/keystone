import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G37 · More than three font families. Count distinct font-family families
 *  (same family at different weights = one). > 3 distinct = fail. */
function familyKey(value) {
  // normalize: lowercase, strip quotes/spaces, take the first family name (the primary)
  // but keep comma-separated list distinct (a multi-family stack counts as the first primary)
  const first = value.split(",")[0].trim().toLowerCase().replace(/^["']|["']$/g, "")
  return first
}

export default function detect(ctx) {
  const { rules, tokens } = parseCss(ctx.css)
  const families = new Set()
  for (const t of tokens) {
    if (/^--font-/.test(t.name)) families.add(familyKey(t.value))
  }
  for (const r of rules) {
    for (const d of r.declarations) {
      if (d.prop !== "font-family") continue
      if (/var\(/.test(d.value)) continue // token reference, already counted
      families.add(familyKey(d.value))
    }
  }
  if (families.size > 3) {
    return [fail(37, "More than three font families", `${families.size} distinct families: ${[...families].slice(0, 4).join(", ")}…`, "drop the fourth family back to the body or display face — three is the ceiling", undefined, undefined)]
  }
  return [pass(37, "More than three font families")]
}