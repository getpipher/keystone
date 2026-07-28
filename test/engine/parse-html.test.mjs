import { test } from "node:test"
import assert from "node:assert/strict"
import { parseHtml } from "../../engine/parse-html.mjs"

test("parseHtml returns a queryable document", () => {
  const html = `<html><body><header class="nav"><a href="/">Brand</a><a href="/x">X</a></header><main><section><header class="section__head"><span class="eyebrow">01</span><h2>Title</h2></header></section></main></body></html>`
  const doc = parseHtml(html)
  assert.equal(doc.querySelectorAll("a").length, 2)
  const head = doc.querySelector(".section__head")
  assert.ok(head)
  assert.equal(head.querySelector("h2").textContent, "Title")
})