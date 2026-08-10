import { extractStamp } from "../extract-stamp.mjs"
import { pass, fail } from "../types.mjs"

/** G20 · Missing CSS stamp — the Keystone macrostructure stamp comment
 *  must be at the top of the CSS. Build-flow only (audit excludes G20 —
 *  external code has no Keystone stamp). */
export default function detect(ctx) {
  if (!ctx.css) return [pass(20, "Missing CSS stamp")]
  const stamp = extractStamp(ctx.css)
  if (!stamp) {
    return [fail(20, "Missing CSS stamp", "no Keystone stamp comment at the top of the CSS", "add the stamp: /* Keystone · macrostructure: <name> · theme: <name> · gates: <n>/58 engine-verified */", ctx.cssFile ?? "tokens.css", 1)]
  }
  return [pass(20, "Missing CSS stamp")]
}