import g1 from "./gates/g1-banned-fonts.mjs"
import g2 from "./gates/g2-gradient-text.mjs"
import g3 from "./gates/g3-three-col-cards.mjs"
import g4 from "./gates/g4-nested-cards.mjs"
import g5 from "./gates/g5-card-stripe.mjs"
import g6 from "./gates/g6-hero-centred.mjs"
import g7 from "./gates/g7-pure-black-white.mjs"
import g10 from "./gates/g10-transition-all.mjs"
import g11 from "./gates/g11-uniform-hoverscale.mjs"
import g12 from "./gates/g12-bouncy-easing.mjs"
import g13 from "./gates/g13-multiple-hover-effects.mjs"
import g14 from "./gates/g14-animating-layout.mjs"
import g15 from "./gates/g15-focus-ring-fades.mjs"
import g17 from "./gates/g17-tooltip-delay.mjs"
import g18 from "./gates/g18-auto-rotate-pause.mjs"
import g19 from "./gates/g19-placeholder-names.mjs"
import g20 from "./gates/g20-missing-stamp.mjs"
import g21 from "./gates/g21-specimen-fallthrough.mjs"
import g22 from "./gates/g22-zero-chroma.mjs"
import g23 from "./gates/g23-accent-viewport.mjs"
import g24 from "./gates/g24-off-scale-spacing.mjs"
import g25 from "./gates/g25-prose-maxwidth.mjs"
import g26 from "./gates/g26-missing-states.mjs"
import g27 from "./gates/g27-reduced-motion.mjs"
import g28 from "./gates/g28-lcp-video.mjs"
import g31 from "./gates/g31-lottie-default.mjs"
import g33 from "./gates/g33-decorative-aria.mjs"
import g34 from "./gates/g34-horizontal-scroll.mjs"
import g35 from "./gates/g35-text-effect-position.mjs"
import g37 from "./gates/g37-three-fonts.mjs"
import g38 from "./gates/g38-outlier-slots.mjs"
import g39 from "./gates/g39-input-states.mjs"
import g40 from "./gates/g40-41-contrast.mjs"
import g42 from "./gates/g42-nav-fingerprint.mjs"
import g44 from "./gates/g44-hero-fit.mjs"
import g47 from "./gates/g47-redrawn-chrome.mjs"
import g48 from "./gates/g48-token-improvisation.mjs"
import g49 from "./gates/g49-two-line-clickable.mjs"
import g50 from "./gates/g50-image-grid-minmax.mjs"
import g51 from "./gates/g51-display-wrap.mjs"
import g52 from "./gates/g52-section-head-collapse.mjs"
import g53 from "./gates/g53-radio-tabs-scroll.mjs"
import g54 from "./gates/g54-tag-left-heading-right.mjs"
import g55 from "./gates/g55-allcaps-lineheight.mjs"
import g56 from "./gates/g56-sticky-nav-overlap.mjs"
import g8_32 from "./gates/g8-32-diversification.mjs"
import { extractStamp } from "./extract-stamp.mjs"

const DETECTORS = [g1, g2, g3, g4, g5, g6, g7, g10, g11, g12, g13, g14, g15, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g31, g33, g34, g35, g37, g38, g39, g40, g42, g44, g47, g48, g49, g50, g51, g52, g53, g54, g55, g56, g8_32]

/** @param {import("./types.mjs").DetectorContext} ctx @returns {{results: GateResult[], pass: number, fail: number, total: number}} */
export function orchestrate(ctx) {
  // Build projectMemory locally — never mutate ctx. If supplied (CLI --log), honour as-is.
  const projectMemory = ctx.projectMemory ?? (() => {
    const stamp = ctx.css ? extractStamp(ctx.css) : null
    return { stamp, log: [] }
  })()
  const localCtx = { ...ctx, projectMemory }
  const results = []
  // A malformed CSS/HTML string makes postcss (or linkedom) throw inside a detector.
  // Catch per-detector so the CSS-independent gates (G34/G44 viewports, G40-41
  // computedPairs) still run, but dedupe to ONE synthetic parse-error row so the
  // report isn't noisy with 13 identical errors. Without this an audit of a
  // real-world site with broken CSS would crash the whole engine (Plan-3 carryover).
  let parseErrorSeen = false
  for (const d of DETECTORS) {
    let r
    try {
      r = d(localCtx)
    } catch (e) {
      if (!parseErrorSeen) {
        const msg = e instanceof Error ? e.message : String(e)
        results.push({ gate: 0, name: "CSS parse error", pass: false, evidence: msg, fix: "fix the CSS syntax error (the engine cannot score a stylesheet it can't parse)" })
        parseErrorSeen = true
      }
      continue
    }
    if (Array.isArray(r)) results.push(...r)
    else results.push(r)
  }
  const pass = results.filter(r => r.pass).length
  const fail = results.filter(r => !r.pass).length
  return { results, pass, fail, total: results.length }
}
