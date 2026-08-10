import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

const REQUIRED = [":hover", ":focus-visible", ":active", ":disabled"]
const INTERACTIVE = /^(a|button|\.btn|\.cta|input|select|textarea|\[role=["']button["']\])/i

/** Strip the trailing pseudo-class (e.g. `.btn:hover` → `.btn`). Returns {base, state|null}. */
function splitState(sel) {
  const m = sel.match(/^(.*?)(:[a-z-]+)$/i)
  if (!m) return { base: sel, state: null }
  return { base: m[1].trim(), state: m[2] }
}

export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  // Track which required states each interactive base has. Split each rule's
  // selector on "," so combined selectors (`.btn:hover, .btn:focus-visible`)
  // register BOTH states for `.btn` — the old exact-match `r.selector === base+state`
  // missed combined selectors (Phase-1 carryover, fixed in Plan 1b-1 CF2).
  const baseStates = new Map()
  for (const r of rules) {
    for (const part of r.selector.split(",").map((s) => s.trim())) {
      if (!INTERACTIVE.test(part)) continue
      const { base, state } = splitState(part)
      if (!baseStates.has(base)) baseStates.set(base, new Set())
      if (state && REQUIRED.includes(state)) baseStates.get(base).add(state)
    }
  }
  for (const [base, states] of baseStates) {
    // Only flag bases that have at least one state defined (so we know they're
    // being styled as interactive). A bare `.btn { border-radius }` with no
    // state rules isn't flagged — it has no states to check.
    if (states.size === 0) continue
    const present = REQUIRED.filter((s) => states.has(s))
    const missing = REQUIRED.filter((s) => !states.has(s))
    if (missing.length > 0) {
      results.push(fail(26, "Missing interaction states", `${base} has ${present.join(",") || "none"}; missing ${missing.join(",")}`, `add ${missing.join(", ")} rules`, undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(26, "Missing interaction states"))
  return results
}