/**
 * @typedef {Object} GateResult
 * @property {number} gate
 * @property {string} name
 * @property {boolean} pass
 * @property {string} [evidence]
 * @property {string} [fix]
 * @property {string} [file]
 * @property {number} [line]
 */

/**
 * @typedef {Object} DetectorContext
 * @property {string} html        — raw HTML string
 * @property {string} css        — raw CSS string
 * @property {string} [cssFile]  — path/URL the CSS came from (audit mode; gates fall back to "tokens.css" when absent)
 * @property {{width: number, scrollWidth: number, innerHeight: number}[]} [viewports] — Playwright dump
 * @property {Record<string, string>[]} [computedPairs] — {selector, color, backgroundColor} from Playwright
 * @property {{stamp: Object|null, log: Object[]}} [projectMemory] — stamp + log.json
 */

/** @param {number} gate @param {string} name @returns {GateResult} */
export function pass(gate, name) {
  return { gate, name, pass: true }
}

/** @param {number} gate @param {string} name @param {string} evidence @param {string} fix @param {string} [file] @param {number} [line] @returns {GateResult} */
export function fail(gate, name, evidence, fix, file, line) {
  return { gate, name, pass: false, evidence, fix, file, line }
}