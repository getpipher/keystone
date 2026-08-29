// Plan 5a comparison-harness runner — CONSUMES pre-built candidate pages,
// renders both at 5 viewports, scores both with the same engine, and writes
// gallery entries + a combined verdict. It never invokes a model: how the
// candidates were built is Plan 5b's protocol (see README.md in this directory).
//
// Candidate layout (per brief dir, both sides required):
//   <candidates>/<NN-slug>/hallmark/{index.html, style.css[, tokens.css]}
//   <candidates>/<NN-slug>/keystone/{index.html, style.css[, tokens.css]}
//
// Usage:
//   node --import tsx test/compare/run-comparison.mjs --candidates <dir> --out <dir>
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const args = {}
for (let i = 2; i < process.argv.length; i += 2) {
  const k = process.argv[i]
  if (!k?.startsWith("--")) throw new Error(`unexpected arg: ${k}`)
  args[k.slice(2)] = process.argv[i + 1]
}
const candidatesDir = args.candidates
const outDir = args.out ?? "test/compare/gallery"
if (!candidatesDir || !existsSync(candidatesDir)) {
  console.error("usage: node --import tsx test/compare/run-comparison.mjs --candidates <dir> [--out <dir>]")
  process.exit(1)
}

const { orchestrate } = await import("../../engine/orchestrate.mjs")
const { tsImport } = await import("tsx/esm/api")
const renderModule = await tsImport(new URL("../../extensions/render.ts", import.meta.url).href, import.meta.url)

const briefs = readdirSync(candidatesDir).filter((d) => /^\d{2}-/.test(d)).sort()
if (briefs.length === 0) {
  console.error(`no brief dirs (NN-slug) found in ${candidatesDir}`)
  process.exit(1)
}

function failedGates(results) {
  return [...new Set(results.filter((r) => !r.pass).map((r) => r.gate))]
}

async function scoreSide(briefDir, sideDir, sideOut) {
  const indexHtml = join(sideDir, "index.html")
  const styleCss = join(sideDir, "style.css")
  if (!existsSync(indexHtml) || !existsSync(styleCss)) {
    throw new Error(`${sideDir}: index.html + style.css required`)
  }
  mkdirSync(sideOut, { recursive: true })
  const rendered = await renderModule.render({
    htmlPath: indexHtml,
    viewports: [1280, 375, 320, 414, 768],
    outDir: join(sideOut, "keystone-render"),
  })
  const computedPairs = JSON.parse(readFileSync(rendered.computedStylesPath, "utf8"))
  const viewportMetrics = JSON.parse(readFileSync(join(sideOut, "keystone-render", "viewports.json"), "utf8"))
  const clickablePath = join(sideOut, "keystone-render", "clickable.json")
  const clickableMetrics = existsSync(clickablePath) ? JSON.parse(readFileSync(clickablePath, "utf8")) : []
  const summary = orchestrate({
    html: readFileSync(indexHtml, "utf8"),
    css: readFileSync(styleCss, "utf8"),
    viewports: viewportMetrics,
    computedPairs,
    clickableMetrics,
  })
  const score = {
    rowsPass: summary.pass,
    rowsTotal: summary.total,
    distinctFailedGates: failedGates(summary.results),
    score48: 48 - failedGates(summary.results).length,
    results: summary.results,
  }
  writeFileSync(join(sideOut, "score.json"), JSON.stringify(score, null, 2))
  return score
}

const verdicts = []
for (const brief of briefs) {
  const briefDir = join(candidatesDir, brief)
  const briefOut = join(outDir, brief)
  mkdirSync(briefOut, { recursive: true })
  const verdict = { brief }
  for (const side of ["hallmark", "keystone"]) {
    const sideDir = join(briefDir, side)
    if (!existsSync(sideDir)) {
      console.warn(`${brief}/${side}: missing — skipped (both sides required for a verdict)`)
      verdict[side] = null
      continue
    }
    process.stdout.write(`${brief}/${side} ... `)
    const score = await scoreSide(briefDir, sideDir, join(briefOut, side))
    console.log(`${score.score48}/48 (rows ${score.rowsPass}/${score.rowsTotal}, failed gates: ${score.distinctFailedGates.join(", ") || "none"})`)
    verdict[side] = score
  }
  writeFileSync(join(briefOut, "verdict.json"), JSON.stringify(verdict, null, 2))
  verdicts.push(verdict)
}

writeFileSync(join(outDir, "index.json"), JSON.stringify(verdicts, null, 2))
console.log(`\n${verdicts.length} brief(s) scored → ${outDir}`)
console.log("next: apply the gallery template (gallery/index.template.html) over index.json")
