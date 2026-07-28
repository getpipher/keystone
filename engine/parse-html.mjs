import { parseHTML } from "linkedom"

/** @param {string} html @returns {Document} */
export function parseHtml(html) {
  const { document } = parseHTML(html)
  return document
}