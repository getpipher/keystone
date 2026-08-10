import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync, mkdtempSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { execFileSync } from "node:child_process"
import { extractCssSources, readLinkedCssFromDisk, fetchLinkedCss, filterExcluded } from "../../engine/audit.mjs"
import { EXCLUDED_GATES } from "../../engine/audit-report.mjs"

const FIXTURE = "test/fixtures/audit-site"

test("extractCssSources pulls linked <link> hrefs + inline <style>", () => {
  const html = readFileSync(`${FIXTURE}/index.html`, "utf8")
  const { links, inline } = extractCssSources(html)
  assert.deepEqual(links, ["styles.css"])
  // fixture has no inline <style> → empty
  assert.equal(inline, "")
})

test("extractCssSources reads inline <style> blocks too", () => {
  const html = `<html><head><link rel="stylesheet" href="a.css"><style>h1{color:red}</style><style>p{color:blue}</style></head><body></body></html>`
  const { links, inline } = extractCssSources(html)
  assert.deepEqual(links, ["a.css"])
  assert.match(inline, /color:red/)
  assert.match(inline, /color:blue/)
})

test("readLinkedCssFromDisk reads relative + skips http(s) links", () => {
  const links = ["styles.css", "https://cdn.example/x.css", "//other.css"]
  const css = readLinkedCssFromDisk(links, FIXTURE)
  assert.match(css, /--font-display: Inter/)       // from styles.css
  assert.doesNotMatch(css, /cdn\.example/)
  assert.doesNotMatch(css, /other\.css/)
})

test("fetchLinkedCss fetches reachable sheets + records warnings on failure (mocked fetch, no network)", async () => {
  const realFetch = globalThis.fetch
  const calls = []
  globalThis.fetch = async (url) => {
    calls.push(url)
    if (url.includes("ok.css")) return { ok: true, status: 200, text: async () => "h1{color:red}" }
    if (url.includes("404.css")) return { ok: false, status: 404, text: async () => "" }
    throw new Error("ECONNREFUSED")
  }
  try {
    const links = ["https://site.test/ok.css", "https://site.test/404.css", "https://site.test/dead.css"]
    const { css, sheets, warnings } = await fetchLinkedCss(links, "https://site.test/")
    assert.match(css, /color:red/, "ok sheet CSS concatenated")
    assert.equal(sheets.filter((s) => s.ok).length, 1)
    assert.ok(warnings.some((w) => w.includes("404")), "404 recorded as warning")
    assert.ok(warnings.some((w) => w.includes("ECONNREFUSED") || w.includes("unreachable")), "dead sheet recorded")
  } finally {
    globalThis.fetch = realFetch
  }
})

test("filterExcluded drops G8/G32 from results + recomputes counts", () => {
  const summary = {
    results: [
      { gate: 3, name: "x", pass: false },
      { gate: 8, name: "Diversification", pass: true },
      { gate: 32, name: "Diversification", pass: true },
      { gate: 40, name: "Contrast", pass: false },
    ],
    pass: 2, fail: 2, total: 4,
  }
  const f = filterExcluded(summary)
  assert.equal(f.results.length, 2, "G8 + G32 dropped")
  assert.ok(!f.results.some((r) => r.gate === 8 || r.gate === 32))
  assert.equal(f.pass, 0)
  assert.equal(f.fail, 2)
  assert.equal(f.total, 2)
})

test("path-mode --no-render audit: produces a ranked report with the fixture's fails, G8/G32 excluded", () => {
  const outDir = mkdtempSync(join(tmpdir(), "keystone-audit-"))
  const report = execFileSync(
    process.execPath,
    ["engine/audit.mjs", FIXTURE, "--no-render", "--out", outDir],
    { encoding: "utf8", cwd: process.cwd() },
  )
  // Expected deterministic fails from the fixture CSS (no render → CSS/HTML gates only):
  assert.match(report, /G1   Banned display fonts/, "G1 catches the banned Inter font")
  assert.match(report, /G3   3-equal-col card grid/, "G3 catches the 1fr 1fr 1fr card grid")
  assert.match(report, /G7   Pure #000\/#fff base/, "G7 catches the pure black/white tokens")
  assert.match(report, /G22   Zero-chroma neutral/, "G22 catches the oklch(98% 0 0) surface")
  assert.match(report, /G26   Missing interaction states/, "G26 catches .btn missing states")
  assert.match(report, /G54   Tag-left\/heading-right/, "G54 catches the 1fr 1fr pitch grid")
  // G8/G32 are excluded → N/A footer, not in the punch list
  assert.match(report, /N\/A \(2\): G8 Diversification \(macro reuse\), G32/)
  // parse-error block should NOT appear (the fixture CSS is valid)
  assert.doesNotMatch(report, /PARSE ERROR/)
  // Tier 4 subjective note present
  assert.match(report, /TIER 4 · SUBJECTIVE/)
  // The report file was written
  assert.ok(existsSync(join(outDir, "keystone-audit-report.md")))
  assert.ok(existsSync(join(outDir, "keystone-audit-report.json")))
  // file:line evidence uses the audited CSS path, not "tokens.css"
  assert.match(report, /audit-site[\/\\]styles\.css:\d+/)
})