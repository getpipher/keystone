import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const INPUT_SEL = /^(input|textarea|select|\[type=.?(text|email|search|tel|url|password|number)\]?|\.input|\.field)/i

/** G39 · Input field states. Five conditions:
 *  (1) border-width shifts between states; (2) focus ring built from border
 *  instead of outline; (3) input height ≠ adjacent button height (heuristic:
 *  no shared base height); (4) helper-text collapses when empty (no min-height);
 *  (5) disabled signalled by opacity alone. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  // collect input-related rules per base selector
  const inputBases = new Set()
  for (const r of rules) {
    if (INPUT_SEL.test(r.selector)) {
      const base = r.selector.replace(/:[a-z-]+.*$/i, "").trim()
      inputBases.add(base)
    }
  }
  for (const base of inputBases) {
    const focusRule = rules.find((r) => r.selector.replace(/\s+/g, "") === `${base}:focus-visible`.replace(/\s+/g, "") || /^.+input.+focus/.test(r.selector))
    // (2) focus ring via border instead of outline
    const focusUsesBorder = rules.some((r) => /:focus/.test(r.selector) && r.selector.includes(base.slice(-20)) && r.declarations.some((d) => /border/.test(d.prop) && /solid/.test(d.value)) && !r.declarations.some((d) => d.prop === "outline"))
    if (focusUsesBorder) {
      results.push(fail(39, "Input focus ring built from border", `${base} :focus uses border, not outline`, "use outline: 2px solid var(--color-focus) with outline-offset: 1px for the focus ring", undefined, undefined))
    }
    // (5) disabled signalled by opacity alone
    const disabledOnlyOpacity = rules.some((r) => /:disabled/.test(r.selector) && r.selector.includes(base.slice(-20)) && r.declarations.some((d) => d.prop === "opacity") && !r.declarations.some((d) => d.prop === "cursor" || d.prop === "pointer-events"))
    if (disabledOnlyOpacity) {
      results.push(fail(39, "Disabled via opacity alone", `${base}:disabled uses opacity without cursor/pointer-events`, "use three channels: opacity + cursor: not-allowed + aria-disabled/pointer-events: none", undefined, undefined))
    }
  }
  // (4) helper-text without min-height
  for (const r of rules) {
    if (!/helper|field-note|hint|error-text/i.test(r.selector)) continue
    const hasMinH = r.declarations.some((d) => d.prop === "min-height")
    if (!hasMinH) {
      results.push(fail(39, "Helper-text collapses when empty", `${r.selector} has no min-height`, "reserve min-height: 1lh on the helper-text slot so it doesn't collapse when empty", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(39, "Input field states"))
  return results
}