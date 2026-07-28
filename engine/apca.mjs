// engine/apca.mjs

// APCA (Accessible Perceptual Contrast Algorithm) — OKLCH-lightness approximation.
// Input: text and bg as OKLCH lightness L (0-100). Returns Lc (can be negative).
// Convention: dark text on light bg → negative Lc (matches the W3 APCA sign convention
// used in the test suite). |Lc| ~106 for pure black-on-white.
//
// This is an APPROXIMATION suitable for gate-catching (we want to catch low-contrast
// failures, not match the W3 reference to 0.01). OKLCH L is perceptual lightness
// (CIE Lab L*), so we convert via the CIELAB L→Y relationship and apply the APCA
// perceptual-contrast formula. See https://github.com/Myndex/apca-w3 for the reference.

/** CIELAB L* (0-100) → relative luminance Y (0-1), per the standard L→Y transform. */
function YfromL(L) {
  const fy = (L + 16) / 116
  const y = fy * fy * fy
  return y < 0 ? 0 : y
}

/**
 * A perceptual contrast value (Lc) for a (text, bg) OKLCH-lightness pair.
 * Negative = dark text on light bg; positive = light text on dark bg; ~±106 for pure black/white.
 * @param {number} textL  OKLCH lightness of the text (0-100)
 * @param {number} bgL    OKLCH lightness of the background (0-100)
 * @returns {number} Lc
 */
export function apcaLc(textL, bgL) {
  const Yt = YfromL(textL)
  const Yb = YfromL(bgL)
  if (Math.abs(Yb - Yt) < 0.0005) return 0
  // APCA perceptual contrast: text-minus-bg (so dark-on-light is negative).
  // Scale ~90 lands pure black/white at ~±105, inside the W3 -106/+106 envelope.
  const lc = (Math.cbrt(Yt + 0.025) - Math.cbrt(Yb + 0.025)) * 1.66 * 90
  return Math.round(lc)
}

/**
 * WCAG 2.1 contrast ratio (simplified — uses OKLCH L as a luminance proxy).
 * @param {number} textL
 * @param {number} bgL
 * @returns {number} ratio (1-21)
 */
export function wcagRatio(textL, bgL) {
  const l1 = (textL / 100) ** 2.4 + 0.05
  const l2 = (bgL / 100) ** 2.4 + 0.05
  return Math.max(l1, l2) / Math.min(l1, l2)
}