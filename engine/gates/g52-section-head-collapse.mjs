import { parseCss } from "../parse-css.mjs"
import { pass, fail } from "../types.mjs"

/** G52 · Theme section-head override without mobile collapse. A .section__head
 *  (or [data-theme] section head) with grid-template-columns != 1fr must have
 *  a matching @media (max-width: 48rem) collapse to 1fr. parseCss flattens
 *  @media child rules, so we detect the collapse by scanning the raw CSS. */
export default function detect(ctx) {
  const { rules } = parseCss(ctx.css)
  const css = ctx.css || ""
  const results = []
  const overridden = []
  for (const r of rules) {
    if (!/section__head|section-head|__head|head\b/i.test(r.selector)) continue
    const cols = r.declarations.find((d) => d.prop === "grid-template-columns")
    if (cols && cols.value.trim() !== "1fr") overridden.push(r.selector)
  }
  if (overridden.length > 0) {
    // is there a max-width:48rem (or 768px) media block collapsing section heads to 1fr?
    const hasCollapse = /@media[^{]*max-width\s*:\s*(48rem|768px)[^{]*\{[^@]*section__head[^}]*grid-template-columns\s*:\s*1fr/is.test(css)
    if (!hasCollapse) {
      results.push(fail(52, "Section-head without mobile collapse", `${overridden[0]} grid-template-columns != 1fr with no @media (max-width:48rem) collapse`, "add @media (max-width: 48rem) { .section__head { grid-template-columns: 1fr; } } with matching specificity", undefined, undefined))
    }
  }
  if (results.length === 0) results.push(pass(52, "Section-head without mobile collapse"))
  return results
}