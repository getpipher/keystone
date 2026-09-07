// test/engine/render-core.test.mjs — renderWithDriver orchestration against a
// fake driver. No browser: proves the flow (viewport loop, hero-at-1280-only,
// computed-pairs OKLCH canon, clickable capture windows, artifacts, finalUrl,
// teardown) independent of any driver implementation.
import { test } from "node:test"
import assert from "node:assert/strict"
import { writeFileSync, mkdtempSync, readFileSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { renderWithDriver } from "../../engine/render-core.mjs"

function makeFakeDriver() {
  const calls = { openPage: [], goto: [], driverClose: 0, pageClose: 0, screenshotPaths: [], evaluateExprs: [] }
  const driver = {
    async openPage(viewport) {
      calls.openPage.push(viewport)
      return {
        async goto(url) { calls.goto.push(url) },
        async url() { return calls.goto.length === 1 ? "https://final.example/after-redirect" : "https://page.example" },
        async screenshot(path) {
          calls.screenshotPaths.push(path)
          writeFileSync(path, Buffer.from("fake-png-bytes"))
        },
        async evaluate(expr) {
          calls.evaluateExprs.push(expr) // full expr — probes are distinguished by content
          if (expr.includes("scrollWidth")) {
            // METRICS probe
            return {
              scrollWidth: viewport.width,
              innerWidth: viewport.width,
              innerHeight: viewport.height,
              hero: { eyebrow: null, headline: { top: 10, bottom: 90 }, lede: null, cta: { top: 100, bottom: 140 } },
            }
          }
          if (expr.includes("body *")) {
            // PAIRS probe — raw rgb() to prove OKLCH canonization in core
            return [
              { selector: "h1", color: "rgb(255, 0, 0)", backgroundColor: "rgb(255, 255, 255)", width: 800, height: 90 },
            ]
          }
          if (expr.includes("offsetHeight")) {
            // CLICKABLES probe
            return [{ selector: "a.cta", offsetHeight: 44, lineHeight: 22 }]
          }
          throw new Error("fake driver: unknown evaluate expr: " + expr.slice(0, 60))
        },
        async content() { return "<html><body>canned</body></html>" },
        async close() { calls.pageClose++ },
      }
    },
    async close() { calls.driverClose++ },
  }
  return { driver, calls }
}

test("render core: default viewport loop, hero only at 1280, artifacts on disk", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-core-"))
  const { driver, calls } = makeFakeDriver()
  const out = await renderWithDriver({ htmlPath: join(dir, "page.html"), outDir: join(dir, "out") }, driver)

  // writeFileSync only fakes the html; goto target is derived via pathToFileURL —
  // htmlPath need not exist for the fake driver, so a bare name is fine.
  assert.deepEqual(calls.openPage.map((v) => v.width), [1280, 375, 320, 414, 768])
  for (const v of calls.openPage) assert.equal(v.height, Math.round(v.width * 0.625))

  assert.equal(out.screenshots.length, 5)
  assert.deepEqual(out.screenshots.map((s) => s.width), [1280, 375, 320, 414, 768])
  for (const s of out.screenshots) assert.ok(existsSync(s.path), `screenshot written: ${s.path}`)

  assert.equal(out.viewportMetrics.length, 5)
  const desk = out.viewportMetrics.find((v) => v.width === 1280)
  assert.ok(desk.hero, "hero rects captured at 1280")
  assert.ok(out.viewportMetrics.filter((v) => v.width !== 1280).every((v) => v.hero === undefined), "hero omitted off-1280")

  assert.ok(existsSync(out.computedStylesPath))
  assert.ok(existsSync(out.domSnapshotPath))
  assert.ok(existsSync(join(dir, "out", "viewports.json")))
  assert.ok(existsSync(join(dir, "out", "clickable.json")))
  assert.equal(readFileSync(out.domSnapshotPath, "utf8"), "<html><body>canned</body></html>")

  assert.equal(calls.driverClose, 1)
  assert.equal(calls.pageClose, 5)
})

test("render core: computed pairs are OKLCH-canonicalized with bounding boxes", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-core-"))
  const { driver } = makeFakeDriver()
  const out = await renderWithDriver({ htmlPath: "page.html", viewports: [1280], outDir: dir }, driver)
  const computed = JSON.parse(readFileSync(out.computedStylesPath, "utf8"))
  assert.equal(computed.length, 1)
  assert.match(computed[0].color, /^oklch\(/)
  assert.match(computed[0].backgroundColor, /^oklch\(/)
  assert.equal(computed[0].width, 800)
  assert.equal(computed[0].height, 90)
})
test("render core: clickable metrics captured at 1280 + 375 only", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-core-"))
  const { driver, calls } = makeFakeDriver()
  const out = await renderWithDriver({ htmlPath: "page.html", viewports: [1280, 768, 375], outDir: dir }, driver)
  assert.equal(out.clickableMetrics.length, 2)
  assert.deepEqual(out.clickableMetrics.map((c) => c.viewport), [1280, 375])
  assert.equal(out.clickableMetrics[0].selector, "a.cta")
  assert.equal(out.clickableMetrics[0].offsetHeight, 44)
  // clickable probe ran exactly twice (1280 + 375), metrics probe 3x
  assert.equal(calls.evaluateExprs.filter((e) => e.includes("nav a")).length, 2)
  assert.equal(calls.evaluateExprs.filter((e) => e.includes('querySelector("h1")')).length, 3)
})

test("render core: finalUrl is the first navigation's URL (audit redirect tracking)", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-core-"))
  const { driver, calls } = makeFakeDriver()
  const out = await renderWithDriver({ htmlPath: "page.html", viewports: [1280, 375], outDir: dir }, driver)
  assert.equal(out.finalUrl, "https://final.example/after-redirect")
  assert.equal(calls.goto.length, 2)
})

test("render core: url mode gotos input.url and never touches htmlPath", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-core-"))
  const { driver, calls } = makeFakeDriver()
  const out = await renderWithDriver({
    htmlPath: "/definitely/not/a/real/file.html",
    url: "https://audit-target.example/",
    viewports: [1280],
    outDir: dir,
  }, driver)
  assert.deepEqual(calls.goto, ["https://audit-target.example/"])
  assert.equal(out.screenshots.length, 1)
})
