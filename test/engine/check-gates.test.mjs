import { test } from "node:test"
import assert from "node:assert/strict"
import { writeFileSync, readFileSync, mkdtempSync } from "node:fs"
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