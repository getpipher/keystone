import { parseCss } from "../parse-css.mjs"
import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

const ROTATE_CLASS = /\b(carousel|marquee|banner|slider|ticker|scroller|rotat)\b/i
const ANIMATES = /@keyframes|animation\s*:|animation-name\s*:/i

/** G18 · Auto-rotating content without pause-on-hover/focus (WCAG 2.2.2). A
 *  carousel/marquee/banner that animates but lacks :hover and :focus-within
 *  pause rules. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const doc = parseHtml(ctx.html)
  const results = []
  // Candidates: elements whose class hints at rotation AND a rule animates them.
  const candidates = new Set()
  for (const el of doc.querySelectorAll("[class]")) {
    const cls = (el.getAttribute("class") || "").split(/\s+/)[0]
    if (ROTATE_CLASS.test(cls)) {
      // confirm an animation rule targets this class
      if (rules.some((r) => r.selector.includes(cls) && r.declarations.some((d) => ANIMATES.test(d.prop + ": " + d.value)))) {
        candidates.add(cls)
      }
    }
  }
  for (const cls of candidates) {
    const hoverRe = new RegExp("\\." + cls + "\\s*:hover", "i")
    const focusRe = new RegExp("\\." + cls + "\\s*:focus-within", "i")
    const hasHoverPause = rules.some((r) => hoverRe.test(r.selector) && r.declarations.some((d) => d.prop === "animation-play-state" && /paused/i.test(d.value)))
    const hasFocusPause = rules.some((r) => focusRe.test(r.selector) && r.declarations.some((d) => d.prop === "animation-play-state" && /paused/i.test(d.value)))
    if (!hasHoverPause || !hasFocusPause) {
      const missing = [!hasHoverPause && ":hover", !hasFocusPause && ":focus-within"].filter(Boolean).join(", ")
      results.push(fail(18, "Auto-rotating content without pause", "." + cls + " auto-rotates; missing " + missing + " pause", "add animation-play-state: paused on :hover and :focus-within for the rotating element", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(18, "Auto-rotating content without pause"))
  return results
}
