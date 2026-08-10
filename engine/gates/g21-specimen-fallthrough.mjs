import { extractStamp } from "../extract-stamp.mjs"
import { pass, fail } from "../types.mjs"

/** G21 · Specimen fall-through — defaulting to the Specimen macrostructure when
 *  the brief did not call for editorial/foundry/specimen energy is banned. Det:
 *  read the stamp's macrostructure; if Specimen, flag (the engine can't see
 *  the genre or brief signal — the model resolves at design time). Build-only
 *  (audit excludes G21 — external code has no stamp). */
export default function detect(ctx) {
  if (!ctx.css) return [pass(21, "Specimen fall-through")]
  const stamp = extractStamp(ctx.css)
  if (!stamp) return [pass(21, "Specimen fall-through")] // G20 covers the missing-stamp case
  const macro = (stamp.macrostructure || "").toLowerCase()
  if (macro === "specimen") {
    return [fail(21, "Specimen fall-through", "macrostructure: Specimen", "confirm the genre is editorial AND the brief signalled specimen/editorial energy; else pick a macrostructure appropriate to the genre", ctx.cssFile ?? "tokens.css", 1)]
  }
  return [pass(21, "Specimen fall-through")]
}