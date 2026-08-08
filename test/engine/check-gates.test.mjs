import { test } from "node:test"
import assert from "node:assert/strict"
import { writeFileSync, readFileSync, mkdtempSync, mkdirSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { execFileSync } from "node:child_process"

test("check-gates.mjs CLI writes report.json + report.html", () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-"))
  const html = readFileSync("test/fixtures/full-fail.html", "utf8")
  const css = readFileSync("test/fixtures/full-fail.css", "utf8")
  writeFileSync(join(dir, "page.html"), html)
  writeFileSync(join(dir, "page.css"), css)
  execFileSync("node", ["engine/check-gates.mjs", "--html", join(dir, "page.html"), "--css", join(dir, "page.css"), "--out", dir], { cwd: process.cwd() })
  const report = JSON.parse(readFileSync(join(dir, "keystone-report.json"), "utf8"))
  assert.ok(report.total > 0)
  assert.ok(report.fail > 0)
  const htmlReport = readFileSync(join(dir, "keystone-report.html"), "utf8")
  assert.match(htmlReport, /Keystone · gate report/)
})

test("check-gates.mjs --log loads log.json and makes G8 fire on reuse", () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-"))
  const css = readFileSync("test/fixtures/stamp-valid.css", "utf8")
  const html = ""
  writeFileSync(join(dir, "page.css"), css)
  writeFileSync(join(dir, "page.html"), html)
  const logDir = join(dir, ".keystone")
  mkdirSync(logDir, { recursive: true })
  writeFileSync(join(logDir, "log.json"), JSON.stringify([
    { date: "2026-08-01", macrostructure: "Long Document", theme: "Garden", nav: "N5", footer: "Ft5" }
  ]))
  execFileSync("node", ["engine/check-gates.mjs", "--css", join(dir, "page.css"), "--html", join(dir, "page.html"), "--log", join(logDir, "log.json"), "--out", dir], { cwd: process.cwd() })
  const report = JSON.parse(readFileSync(join(dir, "keystone-report.json"), "utf8"))
  assert.ok(report.results.some(r => r.gate === 8 && !r.pass), "--log must feed G8 a non-empty log")
})

test("check-gates.mjs --render runs the full detector suite", { skip: !process.env.KEYSTONE_RENDER_TEST }, () => {
  // Guarded: spawns Chromium via the render extension. Run with:
  //   KEYSTONE_RENDER_TEST=1 node --test test/engine/check-gates.test.mjs
  const dir = mkdtempSync(join(tmpdir(), "keystone-render-"))
  const html = `<html><body><div style="width:500px;overflow-x:auto"><div style="width:600px">wide</div></div><p style="color:rgb(80,80,80);background:rgb(90,90,90)">low contrast</p></body></html>`
  const css = ""
  writeFileSync(join(dir, "page.html"), html)
  writeFileSync(join(dir, "page.css"), css)
  execFileSync("node", ["engine/check-gates.mjs", "--html", join(dir, "page.html"), "--css", join(dir, "page.css"), "--render", "--viewports", "1280,375", "--out", dir], { cwd: process.cwd() })
  const report = JSON.parse(readFileSync(join(dir, "keystone-report.json"), "utf8"))
  assert.ok(report.results.some(r => r.gate === 34), "--render must produce G34 results")
  assert.ok(report.results.some(r => r.gate === 40), "--render must produce G40 results")
})
