import { parseCss } from "../parse-css.mjs"
import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

/** G53 · CSS-only radio tabs that scroll-jump. A <input type="radio"> used for
 *  tab toggling with position:absolute; top:0 (off-flow, causes scroll-jump) and
 *  no JS preventScroll handler. Det: DOM radio with abs-position + CSS rule. */
export default function detect(ctx) {
  const doc = parseHtml(ctx.html)
  const { rules } = parseCss(ctx.css)
  const results = []
  const radios = [...doc.querySelectorAll('input[type="radio"]')]
  if (radios.length === 0) return [pass(53, "CSS-only radio tabs that scroll-jump")]
  for (const radio of radios) {
    // find a CSS rule matching this radio's class/id that sets position:absolute + top:0
    const cls = (radio.getAttribute("class") || "").split(/\s+/)[0]
    const id = radio.getAttribute("id")
    const candidates = rules.filter((r) => {
      const sel = r.selector.toLowerCase()
      return (cls && sel.includes(cls)) || (id && sel.includes("#" + id)) || /input\[type=.radio.\]/i.test(r.selector) || /radio/i.test(sel)
    })
    const isAbsTop0 = candidates.some((r) => {
      const pos = r.declarations.find((d) => d.prop === "position" && d.value === "absolute")
      const top = r.declarations.find((d) => d.prop === "top" && /^0(px)?$/.test(d.value.trim()))
      return pos && top
    })
    if (isAbsTop0) {
      // no way to detect a JS preventScroll handler from CSS/DOM alone — flag for review
      results.push(fail(53, "CSS-only radio tabs that scroll-jump", "radio tab with position:absolute; top:0 (scroll-jump risk)", "keep radios in normal flow (zero size + opacity:0) or add a JS handler that intercepts with { preventScroll: true }", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(53, "CSS-only radio tabs that scroll-jump"))
  return results
}