import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

/** G42 · Nav fingerprint (deterministic half). The AI-default nav:
 *  wordmark-left + 4-5 inline text links + button-right + hairline border-bottom
 *  + white background. The vision pass (describe_image Q4) judges the visual;
 *  this catches the structural fingerprint. */
export default function detect(ctx) {
  const doc = parseHtml(ctx.html)
  const nav = doc.querySelector("nav")
  if (!nav) return [pass(42, "Nav fingerprint")]
  const links = [...nav.querySelectorAll("a")]
  const buttons = [...nav.querySelectorAll("button, a.btn, a.cta, [role=button]")]
  // wordmark = the first child if it's a brand/wordmark/short link (excluded from inline-link count)
  const firstChild = nav.firstElementChild
  const isWordmark = !!(firstChild && (firstChild.matches("a, .brand, .logo, [class*=brand], [class*=wordmark]") || firstChild.textContent.trim().length < 20))
  const inlineLinks = links.filter((l) => {
    if (l.matches("button, .btn, .cta, [role=button]")) return false
    if (isWordmark && l === firstChild) return false // exclude the wordmark
    return true
  })
  const results = []
  // fingerprint: wordmark-ish first child + 4-5 inline links + a button
  if (isWordmark && inlineLinks.length >= 4 && inlineLinks.length <= 5 && buttons.length >= 1) {
    results.push(fail(42, "Nav fingerprint — AI default", "<nav>: wordmark + " + inlineLinks.length + " inline links + " + buttons.length + " button(s)", "rotate to a non-default nav pattern (N1b, N2, N3, N5, etc.) — vary the structure, not just the colors", undefined, undefined))
  }
  if (results.length === 0) results.push(pass(42, "Nav fingerprint"))
  return results
}
