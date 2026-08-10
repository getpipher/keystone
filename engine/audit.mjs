// engine/audit.mjs — `keystone audit <target>`: read-only ranked punch-list verb.
//
// Points the same engine as Build's Step 7 at EXTERNAL code — a local path
// (file or dir) or a live URL. No iterate loop, no --fix. The report IS the
// deliverable. See docs/superpowers/plans/2026-08-04-keystone-audit-verb-4.md
// and skills/keystone/references/verbs/audit.md.
//
// Two input modes:
//   path  — target is a file or dir on disk. Resolve the HTML file, read linked
//           <link> stylesheets from disk + inline <style>, render via file://,
//           orchestrate, format.
//   url   — target is http(s)://. assertSafeUrl (SSRF guard) → render via goto →
//           fetch linked stylesheets + inline <style> from the DOM snapshot,
//           orchestrate, format.
//
// Excluded gates (G8/G32 — meaningless on external code) are filtered out of
// the results before formatting.

import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from "node:fs"
import { join, resolve, dirname, isAbsolute, basename } from "node:path"
import { pathToFileURL, fileURLToPath } from "node:url"
import { orchestrate } from "./orchestrate.mjs"
import { parseHtml } from "./parse-html.mjs"
import { assertSafeUrl } from "./safety.mjs"
import { formatReport, EXCLUDED_GATES } from "./audit-report.mjs"

const EXCLUDE_SET = new Set(EXCLUDED_GATES.map((e) => e.gate))

// Parse args: --flag value pairs + boolean flags + a positional <target>.
function parseArgs(argv) {
  const raw = argv.slice(2)
  const positional = []
  const opts = {}
  for (let i = 0; i < raw.length; i++) {
    if (raw[i].startsWith("--")) {
      const key = raw[i].slice(2)
      if (i + 1 < raw.length && !raw[i + 1].startsWith("--")) {
        opts[key] = raw[i + 1]
        i++
      } else {
        opts[key] = true
      }
    } else {
      positional.push(raw[i])
    }
  }
  return { positional, opts }
}

/** Extract { link hrefs, inline css } from an HTML string (pure — no network). */
export function extractCssSources(html) {
  const doc = parseHtml(html)
  const links = [...doc.querySelectorAll('link[rel~="stylesheet"][href]')].map((l) => l.getAttribute("href"))
  const inline = [...doc.querySelectorAll("style")].map((s) => s.textContent || "").join("\n")
  return { links, inline }
}

/** Path mode: read linked <link> stylesheets from disk (resolve against baseDir). Skips http(s) URLs. */
export function readLinkedCssFromDisk(links, baseDir) {
  let css = ""
  for (const href of links) {
    if (/^https?:\/\//i.test(href) || href.startsWith("//")) continue // external URL — skip in path mode
    const p = isAbsolute(href) ? href : resolve(baseDir, href)
    try {
      css += readFileSync(p, "utf8") + "\n"
    } catch {
      // unreachable local file — skip silently; the inline + other sheets still score
    }
  }
  return css
}

/** URL mode: fetch linked <link> stylesheets (resolve against the page URL). Returns { css, sheets, warnings }. */
export async function fetchLinkedCss(links, baseUrl) {
  const sheets = []
  const warnings = []
  let css = ""
  for (const href of links) {
    let url
    try {
      url = new URL(href, baseUrl).href
    } catch {
      warnings.push(`unparseable stylesheet href: ${href}`)
      continue
    }
    if (!/^https?:/i.test(url)) continue
    try {
      const res = await fetch(url, { redirect: "follow" })
      if (!res.ok) {
        warnings.push(`stylesheet ${url} returned ${res.status}`)
        sheets.push({ url, css: "", ok: false })
        continue
      }
      const text = await res.text()
      css += `/* ${url} */\n${text}\n`
      sheets.push({ url, css: text, ok: true })
    } catch (e) {
      warnings.push(`stylesheet ${url} unreachable: ${e.message}`)
      sheets.push({ url, css: "", ok: false })
    }
  }
  return { css, sheets, warnings }
}

/** Resolve a path-mode target to an HTML file path (file → file; dir → index.html). */
function resolveHtmlPath(target) {
  if (!existsSync(target)) throw new Error(`keystone audit: target not found: ${target}`)
  const st = statSync(target)
  if (st.isDirectory()) {
    const idx = resolve(target, "index.html")
    if (!existsSync(idx)) throw new Error(`keystone audit: directory has no index.html: ${target}`)
    return idx
  }
  return resolve(target)
}

/** Filter excluded gates out of an orchestrate summary; recompute pass/fail/total. */
export function filterExcluded(summary) {
  const results = summary.results.filter((r) => !EXCLUDE_SET.has(r.gate))
  const pass = results.filter((r) => r.pass).length
  const fail = results.filter((r) => !r.pass).length
  return { results, pass, fail, total: results.length }
}

async function main() {
  const { positional, opts } = parseArgs(process.argv)
  if (positional.length === 0 || opts.help) {
    console.error(`usage: node engine/audit.mjs <target> [--viewports 1280,375,320,414,768] [--out .] [--no-render] [--allow-private]
  target  a local path (file or dir) OR an http(s):// URL`)
    process.exit(1)
  }
  const target = positional[0]
  const isUrl = /^https?:\/\//i.test(target)
  const noRender = !!opts["no-render"]
  const outDir = opts.out || "."
  const viewports = opts.viewports ? opts.viewports.split(",").map((s) => parseInt(s.trim(), 10)) : [1280, 375, 320, 414, 768]
  const rawDataDir = "keystone-audit"
  const rawDataPath = join(outDir, rawDataDir)
  mkdirSync(rawDataPath, { recursive: true })

  let html, css, cssFile, htmlPath, url, screenshots = []
  let warnings = []

  if (isUrl) {
    // ---- URL mode ----
    const parsed = await assertSafeUrl(target, { allowPrivate: !!opts["allow-private"] })
    url = parsed.href
    if (!noRender) {
      const renderModule = await loadRender()
      const out = await renderModule.render({ htmlPath: "", url, viewports, outDir: rawDataPath })
      screenshots = out.screenshots
      html = readFileSync(out.domSnapshotPath, "utf8")
      // CSS: fetch linked sheets + inline <style> from the rendered DOM.
      const { links, inline } = extractCssSources(html)
      const fetched = await fetchLinkedCss(links, url)
      css = fetched.css + "\n" + inline
      warnings = fetched.warnings
      cssFile = fetched.sheets.find((s) => s.ok)?.url || url
    } else {
      // --no-render URL mode: we can't get the HTML without Playwright. Refuse.
      console.error("keystone audit: --no-render is not supported in URL mode (the HTML must be fetched)")
      process.exit(1)
    }
  } else {
    // ---- Path mode ----
    htmlPath = resolveHtmlPath(target)
    html = readFileSync(htmlPath, "utf8")
    const { links, inline } = extractCssSources(html)
    css = readLinkedCssFromDisk(links, dirname(htmlPath)) + "\n" + inline
    const localLinks = links.filter((h) => !/^https?:|^\/\//i.test(h))
    cssFile = localLinks.length ? resolve(dirname(htmlPath), localLinks[0]) : htmlPath
    if (!noRender) {
      const renderModule = await loadRender()
      const out = await renderModule.render({ htmlPath, viewports, outDir: rawDataPath })
      screenshots = out.screenshots
      // Use the rendered DOM (post-JS) if Playwright ran — reflects what's shown.
      // But CSS comes from disk (already read). Keep html = disk HTML for gate source fidelity.
    }
  }

  // Computed pairs + viewport metrics come from the render dump (if rendered).
  let computedPairs = []
  let viewportMetrics = []
  if (!noRender) {
    const computedPath = join(rawDataPath, "computed.json")
    if (existsSync(computedPath)) computedPairs = JSON.parse(readFileSync(computedPath, "utf8"))
    const viewportsPath = join(rawDataPath, "viewports.json")
    if (existsSync(viewportsPath)) viewportMetrics = JSON.parse(readFileSync(viewportsPath, "utf8"))
  }

  const summary = orchestrate({ html, css, cssFile, viewports: viewportMetrics, computedPairs })
  const filtered = filterExcluded(summary)

  const reportMd = formatReport({
    results: filtered.results,
    pass: filtered.pass,
    fail: filtered.fail,
    excluded: EXCLUDED_GATES,
    target: isUrl ? url : htmlPath,
    screenshots: screenshots.map((s) => ({ width: s.width, path: s.path })),
    rawDataDir,
  })

  // Prepend unreachable-stylesheet warnings above the report (Tier-0 signals).
  let out = ""
  if (warnings.length > 0) {
    out += "⚠ UNREACHABLE STYLESHEETS (those gates were scored on the remaining CSS):\n"
    for (const w of warnings) out += `  - ${w}\n`
    out += "\n"
  }
  out += reportMd

  writeFileSync(join(outDir, "keystone-audit-report.md"), out)
  writeFileSync(join(outDir, "keystone-audit-report.json"), JSON.stringify({
    target: isUrl ? url : htmlPath,
    timestamp: new Date().toISOString(),
    pass: filtered.pass,
    fail: filtered.fail,
    total: filtered.total,
    excluded: EXCLUDED_GATES,
    warnings,
    results: filtered.results,
  }, null, 2))

  console.log(out)
  const renderMode = noRender ? "off" : "on"
  console.error(`\n— ${outDir}/keystone-audit-report.md (render: ${renderMode})`)
}

async function loadRender() {
  try {
    const { tsImport } = await import("tsx/esm/api")
    return await tsImport(new URL("../extensions/render.ts", import.meta.url).href, import.meta.url)
  } catch (e) {
    console.error("audit: failed to load the render extension:", e instanceof Error ? e.message : String(e))
    console.error("(requires the tsx runtime — run via pi, or: npm i tsx)")
    process.exit(1)
  }
}

// Only run main() when audit.mjs is the entry module (not when imported for its exports).
const isEntry = (() => {
  try { return process.argv[1] === fileURLToPath(import.meta.url) }
  catch { return false }
})()

if (isEntry) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : String(e))
    process.exit(1)
  })
}