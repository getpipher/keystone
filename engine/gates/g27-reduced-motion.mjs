import { pass, fail } from "../types.mjs"

/** G27 · Motion without reduced-motion fallback. Any @keyframes or transition
 *  must be neutralized by a @media (prefers-reduced-motion: reduce) block. */
const MOTION = /@keyframes\b|transition\s*:|animation\s*:|animation-name\s*:/i

export default function detect(ctx) {
  const css = ctx.css || ""
  const results = []
  // Is there any motion at all?
  const hasMotion = MOTION.test(css)
  if (!hasMotion) return [pass(27, "Motion without reduced-motion fallback")]
  // Is there a reduced-motion media block?
  const hasReducedMotion = /@media\s*\([^)]*prefers-reduced-motion\s*:\s*reduce/i.test(css)
  if (!hasReducedMotion) {
    results.push(fail(27, "Motion without reduced-motion fallback", "page has transitions/animations but no @media (prefers-reduced-motion: reduce) block", "add @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } } or scope per-element", undefined, undefined))
  }
  if (results.length === 0) results.push(pass(27, "Motion without reduced-motion fallback"))
  return results
}