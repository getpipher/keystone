import { readFileSync, writeFileSync } from "node:fs"
import { orchestrate } from "./orchestrate.mjs"

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, arr) => {
  if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]])
  return acc
}, []))

const html = args.html ? readFileSync(args.html, "utf8") : ""
const css = args.css ? readFileSync(args.css, "utf8") : ""
const out = args.out || "."

const summary = orchestrate({ html, css, viewports: [], computedPairs: [] })
writeFileSync(`${out}/keystone-report.json`, JSON.stringify(summary, null, 2))

const tpl = readFileSync(new URL("./report-template.html", import.meta.url), "utf8")
const rows = summary.results.map(r =>
  `<tr><td>${r.gate}</td><td>${r.name}</td><td class="${r.pass ? "pass" : "fail"}">${r.pass ? "✓" : "✗"}</td><td class="evidence">${r.evidence || ""}</td><td class="fix">${r.fix || ""}</td><td>${r.file ? `${r.file}:${r.line || ""}` : ""}</td></tr>`
).join("\n")
const html_out = tpl
  .replace("{{timestamp}}", new Date().toISOString())
  .replace("{{pass}}", summary.pass)
  .replace("{{fail}}", summary.fail)
  .replace("{{total}}", summary.total)
  .replace("{{rows}}", rows)
writeFileSync(`${out}/keystone-report.html`, html_out)

console.log(`PASS ${summary.pass}/${summary.total} · FAIL ${summary.fail}/${summary.total} — ${out}/keystone-report.html`)