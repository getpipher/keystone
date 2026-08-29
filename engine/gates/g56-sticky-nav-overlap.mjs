import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G56 · Sticky top:0 below a sticky page-level nav. Two `position: sticky;
 *  top: 0` (one a page-level nav/header) overlap — the deeper paints over the
 *  nav. Secondary sticky should offset by --banner-height. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const results = []
  const stickyTop0 = []
  for (const r of rules) {
    const pos = r.declarations.find((d) => d.prop === "position" && d.value === "sticky")
    const top = r.declarations.find((d) => d.prop === "top")
    if (pos && top && /^0(px)?$/.test(top.value.trim())) {
      stickyTop0.push(r.selector)
    }
  }
  if (stickyTop0.length >= 2) {
    const isNav = (sel) => /\b(nav|header|banner|topbar|site-nav)\b/i.test(sel)
    // if one is the page-level nav and a second sticky top:0 exists without a --banner-height offset
    const hasNav = stickyTop0.some(isNav)
    const others = stickyTop0.filter((s) => !isNav(s))
    if (hasNav && others.length > 0) {
      // check the others for a --banner-height offset (top: var(--banner-height))
      const offset = rules.filter((r) => others.includes(r.selector) && r.declarations.some((d) => d.prop === "top" && /var\(\s*--banner-height/.test(d.value)))
      if (offset.length < others.length) {
        results.push(fail(56, "Sticky top:0 below a sticky nav", `${stickyTop0.length} sticky top:0 elements (${stickyTop0.join(", ")}) — overlap risk`, "define a --banner-height token (44–64px) and offset secondary stickies to top: var(--banner-height)", undefined, undefined))
      }
    }
  }
  if (results.length === 0) results.push(pass(56, "Sticky top:0 below a sticky nav"))
  return results
}