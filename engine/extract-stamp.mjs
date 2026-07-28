/**
 * Parse the first Keystone stamp comment from a CSS string.
 * @param {string} css
 * @returns {{macrostructure:string, theme:string, nav?:string, footer?:string, gates?:string, raw:string}|null}
 */
export function extractStamp(css) {
  const m = css.match(/\/\*\s*Keystone\s*·\s*(.+?)\s*\*\//)
  if (!m) return null
  const raw = m[1]
  const out = { raw }
  for (const part of raw.split("·")) {
    const [k, ...rest] = part.trim().split(":")
    if (!k || rest.length === 0) continue
    out[k.trim()] = rest.join(":").trim()
  }
  return out
}