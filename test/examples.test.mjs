import { test } from "node:test"
import assert from "node:assert/strict"
import { readdirSync, existsSync, mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { execFileSync } from "node:child_process"

// Tier-3 example regression (spec §8). Each example must survive the engine
// with render data: at most 7 distinct failed gate numbers (≥41/48 equivalent),
// and at least three of the five examples must be perfectly clean (0 fails).
// Guarded like the other render tests — needs KEYSTONE_RENDER_TEST=1 and a
// Chromium install.

const ROOT = join(import.meta.dirname, "..")
const slugs = readdirSync(join(ROOT, "examples")).filter((d) => /^\d{2}-/.test(d)).sort()

const cache = new Map()

function score(slug) {
  if (cache.has(slug)) return cache.get(slug)
  const dir = join(ROOT, "examples", slug)
  assert.ok(existsSync(join(dir, "index.html")), `${slug}: index.html missing`)
  assert.ok(existsSync(join(dir, "style.css")), `${slug}: style.css missing`)
  const out = mkdtempSync(join(tmpdir(), `keystone-ex-${slug}-`))
  execFileSync(
    "node",
    [
      "engine/check-gates.mjs",
      "--html", join(dir, "index.html"),
      "--css", join(dir, "style.css"),
      "--render", "--viewports", "1280,375,320,414,768",
      "--out", out,
    ],
    { cwd: ROOT },
  )
  const report = JSON.parse(readFileSync(join(out, "keystone-report.json"), "utf8"))
  cache.set(slug, report)
  return report
}

function failedGates(report) {
  return [...new Set(report.results.filter((r) => !r.pass).map((r) => r.gate))]
}

test("all five examples exist", () => {
  assert.equal(slugs.length, 5, `expected 5 example dirs, found: ${slugs.join(", ")}`)
})

test("each example scores >= 41/48 on the engine (with render)", { skip: !process.env.KEYSTONE_RENDER_TEST }, () => {
  for (const slug of slugs) {
    const report = score(slug)
    const fails = failedGates(report)
    assert.ok(
      48 - fails.length >= 41,
      `${slug}: ${48 - fails.length}/48 (failed gates: ${fails.join(", ") || "none"}) below the 41/48 floor`,
    )
  }
})

test("at least three examples are perfectly clean (0 failed gates)", { skip: !process.env.KEYSTONE_RENDER_TEST }, () => {
  const clean = []
  const dirty = []
  for (const slug of slugs) {
    const fails = failedGates(score(slug))
    if (fails.length === 0) clean.push(slug)
    else dirty.push(`${slug}: ${fails.join(", ")}`)
  }
  assert.ok(
    clean.length >= 3,
    `only ${clean.length}/5 examples clean (need 3); dirty: ${dirty.join(" | ")}`,
  )
})
