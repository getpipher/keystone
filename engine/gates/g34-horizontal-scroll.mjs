import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const vps = ctx.viewports || []
  const results = []
  for (const v of vps) {
    if (v.scrollWidth > v.innerWidth || v.scrollWidth > v.width) {
      results.push(fail(34, "Horizontal scroll", `at ${v.width}px: scrollWidth ${v.scrollWidth} > ${v.width}`, "overflow-x: clip on html + body", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(34, "Horizontal scroll"))
  return results
}