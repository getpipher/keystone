import g1 from "./gates/g1-banned-fonts.mjs"
import g2 from "./gates/g2-gradient-text.mjs"
import g3 from "./gates/g3-three-col-cards.mjs"
import g7 from "./gates/g7-pure-black-white.mjs"
import g22 from "./gates/g22-zero-chroma.mjs"
import g26 from "./gates/g26-missing-states.mjs"
import g34 from "./gates/g34-horizontal-scroll.mjs"
import g40 from "./gates/g40-41-contrast.mjs"
import g44 from "./gates/g44-hero-fit.mjs"
import g48 from "./gates/g48-token-improvisation.mjs"
import g50 from "./gates/g50-image-grid-minmax.mjs"
import g54 from "./gates/g54-tag-left-heading-right.mjs"
import g8_32 from "./gates/g8-32-diversification.mjs"
import { extractStamp } from "./extract-stamp.mjs"

const DETECTORS = [g1, g2, g3, g7, g22, g26, g34, g40, g44, g48, g50, g54, g8_32]

/** @param {import("./types.mjs").DetectorContext} ctx @returns {{results: GateResult[], pass: number, fail: number, total: number}} */
export function orchestrate(ctx) {
  // Build projectMemory locally — never mutate ctx. If supplied (CLI --log), honour as-is.
  const projectMemory = ctx.projectMemory ?? (() => {
    const stamp = ctx.css ? extractStamp(ctx.css) : null
    return { stamp, log: [] }
  })()
  const localCtx = { ...ctx, projectMemory }
  const results = []
  for (const d of DETECTORS) {
    const r = d(localCtx)
    if (Array.isArray(r)) results.push(...r)
    else results.push(r)
  }
  const pass = results.filter(r => r.pass).length
  const fail = results.filter(r => !r.pass).length
  return { results, pass, fail, total: results.length }
}
