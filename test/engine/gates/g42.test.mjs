import { test } from "node:test"
import assert from "node:assert/strict"
import g42 from "../../../engine/gates/g42-nav-fingerprint.mjs"

test("G42 fails on the AI-default nav (wordmark + 4-5 links + button)", () => {
  const html = `<nav><a class="brand">Acme</a><a>A</a><a>B</a><a>C</a><a>D</a><a>E</a><a class="btn">Start</a></nav>`
  assert.ok(g42({ html, css: "" }).some(r => !r.pass && r.gate === 42))
})
test("G42 passes on a non-default nav (2 links, no button, or no nav)", () => {
  assert.ok(g42({ html: `<nav><a class="brand">Acme</a><a>About</a></nav>`, css: "" }).every(r => r.pass))
  assert.ok(g42({ html: `<main>no nav here</main>`, css: "" }).every(r => r.pass))
})