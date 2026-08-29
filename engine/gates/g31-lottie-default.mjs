import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

/** G31 · Lottie as default. <lottie-player> / <lottie-viewer> / lottie-web
 *  container — Lottie is last resort, not the default. */
const LOTTIE = /^lottie-(player|viewer)$/i

export default function detect(ctx) {
  const doc = parseHtml(ctx.html)
  const results = []
  for (const el of doc.querySelectorAll("lottie-player, lottie-viewer, [data-lottie], .lottie")) {
    const tag = el.tagName.toLowerCase()
    results.push(fail(31, "Lottie as default", `<${tag}>`, "replace with a hand-built SVG or pure-CSS shape — Lottie is last resort", undefined, undefined))
  }
  if (results.length === 0) results.push(pass(31, "Lottie as default"))
  return results
}