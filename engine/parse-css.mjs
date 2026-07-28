/**
 * Minimal CSS parser. Extracts :root/[data-theme] token blocks and all other rules.
 * Does NOT handle nested rules fully (treats @media contents as flat rules — fine for our detectors).
 * @param {string} css
 * @returns {{tokens: {name:string, value:string, line:number}[], rules: {selector:string, declarations:{prop:string,value:string,line:number}[], line:number}[]}}
 */
export function parseCss(css) {
  const tokens = []
  const rules = []
  const lines = css.split("\n")
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const tokenMatch = line.match(/^\s*(--[a-z-]+)\s*:\s*(.+?)\s*;?\s*$/)
    // Token blocks: collect while inside :root / [data-theme]
    const blockOpen = line.match(/(^\s*:root\b|^\s*\[data-theme[^\]]*\])\s*\{\s*(.*)\}\s*$/)
    const blockOpenMulti = line.match(/(^\s*:root\b|^\s*\[data-theme[^\]]*\])\s*\{\s*$/)
    if (blockOpen) {
      // inline single-line token block: parse tokens from the inline body
      const inlineBody = blockOpen[2]
      const startLine = i + 1
      if (inlineBody) {
        for (const d of inlineBody.split(";")) {
          const tm = d.match(/^\s*(--[a-z-]+)\s*:\s*(.+?)\s*$/)
          if (tm) tokens.push({ name: tm[1], value: tm[2], line: startLine })
        }
      }
      i++
      continue
    }
    if (blockOpenMulti) {
      i++
      while (i < lines.length && !lines[i].includes("}")) {
        const tm = lines[i].match(/^\s*(--[a-z-]+)\s*:\s*(.+?)\s*;?\s*$/)
        if (tm) tokens.push({ name: tm[1], value: tm[2], line: i + 1 })
        i++
      }
      i++
      continue
    }
    // Rule: selector { ... } (multi-line OR single-line inline)
    const ruleOpen = line.match(/^\s*(.+?)\s*\{\s*(.*)\}\s*$/)
    if (ruleOpen) {
      const selector = ruleOpen[1].trim()
      const startLine = i + 1
      const declarations = []
      const inlineBody = ruleOpen[2]
      if (inlineBody) {
        // single-line inline rule: parse declarations from the inline body
        for (const d of inlineBody.split(";")) {
          const dm = d.match(/^\s*([a-z-]+)\s*:\s*(.+?)\s*$/)
          if (dm) declarations.push({ prop: dm[1], value: dm[2], line: startLine })
        }
      } else {
        // multi-line rule: collect declarations until closing }
        i++
        while (i < lines.length && !lines[i].includes("}")) {
          const dm = lines[i].match(/^\s*([a-z-]+)\s*:\s*(.+?)\s*;?\s*$/)
          if (dm) declarations.push({ prop: dm[1], value: dm[2], line: i + 1 })
          i++
        }
      }
      rules.push({ selector, declarations, line: startLine })
      i++
      continue
    }
    i++
  }
  return { tokens, rules }
}