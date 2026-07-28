import postcss from "postcss"

/**
 * Parse CSS via postcss (the standard CSS parser) and project into the
 * {tokens, rules} shape the gate detectors consume.
 *
 *   tokens: { name, value, line }[]  — declarations inside :root / [data-theme] blocks
 *   rules:  { selector, declarations: [{prop, value, line}], line }[]  — all other rules,
 *           with @media (and other at-rules) flattened: child rules are emitted as flat rules.
 *
 * Token names include the leading `--` (e.g. "--color-paper-2"). Values are the
 * raw declaration value string (postcss strips trailing semicolons and comments).
 * Line numbers are 1-indexed (postcss source.start.line).
 *
 * @param {string} css
 * @returns {{tokens: {name:string, value:string, line:number}[], rules: {selector:string, declarations:{prop:string,value:string,line:number}[], line:number}[]}}
 */
export function parseCss(css) {
  const root = postcss.parse(css)
  const tokens = []
  const rules = []

  const isTokenBlock = (selector) => /^:root\b/.test(selector.trim()) || /^\[data-theme/i.test(selector.trim())

  function walk(container) {
    for (const node of container.nodes) {
      if (node.type === "rule") {
        const line = node.source?.start?.line ?? 0
        const declarations = node.nodes
          .filter((n) => n.type === "decl")
          .map((n) => ({ prop: n.prop, value: n.value, line: n.source?.start?.line ?? line }))
        if (isTokenBlock(node.selector)) {
          for (const d of declarations) tokens.push({ name: d.prop, value: d.value, line: d.line })
        } else {
          rules.push({ selector: node.selector, declarations, line })
        }
      } else if (node.type === "atrule") {
        // @media, @supports, etc. — flatten child rules out as top-level rules
        if (node.nodes && node.nodes.length) walk(node)
      }
      // decl at root level (rare, no selector) — ignore
    }
  }

  walk(root)
  return { tokens, rules }
}