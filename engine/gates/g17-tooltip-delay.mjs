import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const TOOLTIP = /\b(tooltip|popover|tip)\b/i
function delayMs(value) {
  const m = value.match(/(\d+(?:\.\d+)?)\s*(ms|s)\b/i)
  return m ? (m[2] === "s" ? parseFloat(m[1]) * 1000 : parseFloat(m[1])) : null
}

/** G17 · Tooltip hover-delay = focus-delay. Hover-delay should be 800–1000ms;
 *  focus-delay 0ms. Equal delays > 0 fail (keyboard users wait for the tip). */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  // Collect transition-delay per tooltip selector split by :hover / :focus-visible.
  const hoverDelay = new Map() // base -> ms
  const focusDelay = new Map()
  for (const r of rules) {
    if (!TOOLTIP.test(r.selector)) continue
    for (const d of r.declarations) {
      if (d.prop !== "transition-delay" && d.prop !== "transition") continue
      const ms = delayMs(d.value)
      if (ms == null) continue
      const base = r.selector.replace(/:(hover|focus-visible|focus).*$/i, "").trim()
      if (/:hover/i.test(r.selector)) hoverDelay.set(base, Math.max(hoverDelay.get(base) ?? 0, ms))
      else if (/:focus-visible|:focus/i.test(r.selector)) focusDelay.set(base, Math.max(focusDelay.get(base) ?? 0, ms))
    }
  }
  for (const base of hoverDelay.keys()) {
    const h = hoverDelay.get(base)
    const f = focusDelay.get(base) ?? null
    if (f != null && h === f && h > 0) {
      results.push(fail(17, "Tooltip hover-delay = focus-delay", `${base}: hover-delay ${h}ms == focus-delay ${f}ms`, "set hover-delay 800–1000ms, focus-delay 0ms — keyboard users need instant access", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(17, "Tooltip hover-delay = focus-delay"))
  return results
}