import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

/** G28 · LCP-killing demo video. A <video> with autoplay + no muted, no poster,
 *  or an <img loading="lazy"> in the hero section. */
export default function detect(ctx) {
  const doc = parseHtml(ctx.html)
  const results = []
  for (const v of doc.querySelectorAll("video")) {
    if (v.hasAttribute("autoplay") && !v.hasAttribute("muted")) {
      results.push(fail(28, "LCP-killing demo video", "<video autoplay> without muted", "mute autoplay (autoplay muted) — never autoplay with sound", undefined, undefined))
    }
    if (!v.hasAttribute("poster")) {
      results.push(fail(28, "LCP-killing demo video", "<video> without poster", "add a poster image so the LCP frame paints immediately", undefined, undefined))
    }
  }
  // hero img with loading=lazy
  const hero = doc.querySelector('[class*="hero"], section, header')
  if (hero) {
    for (const img of hero.querySelectorAll("img")) {
      if (img.getAttribute("loading") === "lazy") {
        results.push(fail(28, "LCP-killing demo video", "hero <img loading=\"lazy\"> — lazy-loads the LCP", "remove loading=\"lazy\" from the hero LCP image; add fetchpriority=\"high\"", undefined, undefined))
      }
    }
  }
  if (results.length === 0) results.push(pass(28, "LCP-killing demo video"))
  return results
}