import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { orchestrate } from "./orchestrate.mjs"
import { extractStamp } from "./extract-stamp.mjs"

// Parse args: --flag value pairs + boolean flags (--render)
const rawArgs = process.argv.slice(2)
const args = {}
for (let i = 0; i < rawArgs.length; i++) {
  if (rawArgs[i].startsWith("--")) {
    const key = rawArgs[i].slice(2)
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith("--")) {
      args[key] = rawArgs[i + 1]
      i++
    } else {
      args[key] = true
    }
  }
}

const html = args.html ? readFileSync(args.html, "utf8") : ""
const css = args.css ? readFileSync(args.css, "utf8") : ""
const out = args.out || "."

// Parse --viewports (csv → numbers)
const viewportsArg = args.viewports
  ? args.viewports.split(",").map(s => parseInt(s.trim(), 10))
  : args.render
    ? [1280, 375, 320, 414, 768]
    : []

// Build the base ctx
const ctx = { html, css, viewports: [], computedPairs: [] }

// --log: read + parse the log file → populate projectMemory
if (args.log) {
  const logRaw = readFileSync(args.log, "utf8")
  const log = JSON.parse(logRaw)
  ctx.projectMemory = { stamp: extractStamp(css), log }
}

async function main() {
  // --render: bootstrap the TS render extension via tsx, run Chromium
  if (args.render) {
    let renderModule
    try {
      const { tsImport } = await import("tsx/esm/api")
      // check-gates.mjs lives in engine/, so resolve UP to the repo root's extensions/
      renderModule = await tsImport(new URL("../extensions/render.ts", import.meta.url).href, import.meta.url)
    } catch (e) {
      // Log the real error so a path/config issue isn't masked as a missing-tsx message.
      console.error("--render failed to load the render extension:", e instanceof Error ? e.message : String(e))
      console.error("(requires the tsx runtime — run via pi, or: npm i tsx)")
      process.exit(1)
    }

    let out2
    try {
      out2 = await renderModule.render({
        htmlPath: args.html,
        viewports: viewportsArg,
        outDir: join(out, "keystone-render"),
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes("executable") || msg.includes("chromium") || msg.includes("browser")) {
        console.error("Chromium not found — run: npx playwright-core install chromium")
      } else {
        console.error("Render failed:", msg)
      }
      process.exit(1)
    }

    ctx.computedPairs = JSON.parse(readFileSync(out2.computedStylesPath, "utf8"))
    ctx.viewports = out2.viewportMetrics
  }

  const summary = orchestrate(ctx)
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

  const renderMode = args.render ? "on" : "off"
  console.log(`PASS ${summary.pass}/${summary.total} · FAIL ${summary.fail}/${summary.total} — ${out}/keystone-report.html (render: ${renderMode})`)
}

main()
