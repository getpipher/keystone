import { apcaLc } from "../apca.mjs"
import { pass, fail } from "../types.mjs"
import { lightnessOf } from "../color.mjs"

export default function detect(ctx) {
  const pairs = ctx.computedPairs || []
  const results = []
  for (const p of pairs) {
    const tL = lightnessOf(p.color)
    const bL = lightnessOf(p.backgroundColor)
    if (tL == null || bL == null) continue
    const lc = Math.abs(apcaLc(tL, bL))
    // body-text threshold 60; large/icons/focus 45. We don't know font-size here, default 60.
    if (lc < 60) {
      results.push(fail(40, "Contrast", `${p.selector}: APCA Lc ${lc} < 60`, `raise text lightness or lower bg lightness`, undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(40, "Contrast"))
  return results
}
