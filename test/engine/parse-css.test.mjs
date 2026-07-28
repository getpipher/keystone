import { test } from "node:test"
import assert from "node:assert/strict"
import { parseCss } from "../../engine/parse-css.mjs"

test("parseCss splits tokens from rules", () => {
  const css = `
:root {
  --color-accent: oklch(60% 0.15 250);
  --font-display: "Newsreader";
}
.btn { color: var(--color-accent); background: #c0392b; }
@media (max-width: 48rem) { .nav { display: none; } }
`
  const { tokens, rules } = parseCss(css)
  assert.equal(tokens.length, 2)
  assert.equal(tokens[0].name, "--color-accent")
  assert.equal(rules.length, 2)
  assert.equal(rules[0].declarations[1].prop, "background")
  assert.equal(rules[0].declarations[1].value, "#c0392b")
})