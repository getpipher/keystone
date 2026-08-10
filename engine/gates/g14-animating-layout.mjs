import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const LAYOUT_PROPS = new Set(["width", "height", "top", "left", "right", "bottom", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left"])

/** G14 · Animating layout properties — @keyframes or transition animating
 *  width/height/top/left/margin/padding (layout thrash). */
export default function detect(ctx) {
  // parseCss flattens @media but @keyframes is an at-rule with children — check
  // rules' declarations for transition-prop mentions, AND scan the raw css for
  // @keyframes blocks animating layout props.
  const { rules } = parseCss(ctx.css)
  const results = []
  // transitions naming a layout prop
  for (const r of rules) {
    for (const d of r.declarations) {
      if (d.prop !== "transition" && d.prop !== "transition-property") continue
      const props = d.value.split(",").map((s) => s.trim().split(/\s+/)[0])
      const hit = props.find((p) => LAYOUT_PROPS.has(p))
      if (hit) {
        results.push(fail(14, "Animating layout properties", `${r.selector} ${d.prop}: animating ${hit}`, "animate transform: translateX/Y/scale and opacity instead — compositor-only, no layout thrash", undefined, d.line))
      }
    }
  }
  // @keyframes animating layout props — scan raw CSS (postcss flattens at-rules
  // for @media but @keyframes keeps its child rules under a keyframes at-rule).
  const keyframeBlocks = ctx.css.match(/@keyframes\s+([-\w]+)\s*\{[^@]*?\}\s*\}/gi) || []
  for (const block of keyframeBlocks) {
    const name = (block.match(/@keyframes\s+([-\w]+)/i) || [])[1]
    const decls = block.match(/(?:width|height|top|left|right|bottom|margin(?:-\w+)?|padding(?:-\w+)?):\s*[^;}]+/gi) || []
    if (decls.length > 0) {
      results.push(fail(14, "Animating layout properties", `@keyframes ${name} animates ${decls[0].split(":")[0]}`, "animate transform + opacity, not layout box properties", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(14, "Animating layout properties"))
  return results
}