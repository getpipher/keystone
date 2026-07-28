import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const desktop = (ctx.viewports || []).find(v => v.width === 1280)
  const results = []
  if (desktop && desktop.hero) {
    const { hero, innerHeight } = desktop
    const parts = ["eyebrow","headline","lede","cta"].filter(k => hero[k])
    const maxBottom = Math.max(...parts.map(k => hero[k].bottom))
    if (maxBottom > innerHeight) {
      results.push(fail(44, "Hero fit", `hero bottom ${maxBottom}px > ${innerHeight}px at 1280×800`, "trim display clamp, set line-height 1.0–1.1, hold lede ≤2 lines", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(44, "Hero fit"))
  return results
}