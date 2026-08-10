import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

/** G47 · Re-drawn UI chrome (deterministic half). Hand-built fake browser bar,
 *  phone frame, code-block/terminal/IDE frame. Det: class-name + structure
 *  heuristics. Vision (describe_image Q11) judges the visual. */
const CHROME_PATTERNS = [
  // fake browser bar: a class with browser/url/bar + traffic-light dots (3 dots/svgs)
  { re: /browser[- ]?(bar|frame|chrome|window)/i, needsDots: true, name: "browser bar" },
  // fake phone frame
  { re: /phone[- ]?frame|device[- ]?frame|mockup[- ]?phone/i, needsDots: false, name: "phone frame" },
  // mock window-chrome around <pre> (code-block frame)
  { re: /code[- ]?(block|frame|window|editor|terminal)|terminal[- ]?frame|ide[- ]?frame/i, needsDots: false, name: "code/terminal frame" },
]
const DOT_LIKE = /^(svg|span|div|i|b)$/i

export default function detect(ctx) {
  const doc = parseHtml(ctx.html)
  const results = []
  for (const el of doc.querySelectorAll("[class]")) {
    const cls = el.getAttribute("class") || ""
    for (const pat of CHROME_PATTERNS) {
      if (!pat.re.test(cls)) continue
      let dots = 0
      if (pat.needsDots) {
        dots = [...el.querySelectorAll("*")].filter((c) => DOT_LIKE.test(c.tagName) && (c.children.length === 0)).length
        if (dots < 3) continue // not the traffic-light pattern
      }
      const head = cls.split(/\s+/)[0]
      results.push(fail(47, "Re-drawn UI chrome", `.${head} (${pat.name}${pat.needsDots ? ` + ${dots} dots` : ""})`, "use a <picture>/<figure> with a real screenshot, or omit the chrome and let the content stand on its own", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(47, "Re-drawn UI chrome"))
  return results
}