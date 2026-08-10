import { parseHtml } from "../parse-html.mjs"
import { pass, fail } from "../types.mjs"

// Card-indicative class heuristic: .card, .__card, .panel, .tile, .feature-card, etc.
const CARD_CLASS = /\b(card|__card|panel|tile|feature|surface)\b/i

function isCard(el) {
  const cls = el.getAttribute("class") || ""
  return CARD_CLASS.test(cls)
}

/** G4 · Nested cards — a card-in-card is a tell. */
export default function detect(ctx) {
  const doc = parseHtml(ctx.html)
  const cards = [...doc.querySelectorAll("[class]")]
    .filter(isCard)
  const results = []
  for (const card of cards) {
    const nested = [...card.querySelectorAll("[class]")].filter(isCard)
    if (nested.length > 0) {
      const outer = (card.getAttribute("class") || "").split(/\s+/)[0] || card.tagName.toLowerCase()
      const inner = (nested[0].getAttribute("class") || "").split(/\s+/)[0] || nested[0].tagName.toLowerCase()
      results.push(fail(4, "Nested cards", `.${outer} contains .${inner}`, "flatten the structure — the outer card becomes a section, the inner cards stand alone", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(4, "Nested cards"))
  return results
}