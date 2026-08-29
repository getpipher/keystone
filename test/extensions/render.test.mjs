// test/extensions/render.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { writeFileSync, mkdtempSync, readFileSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { render } from "../../extensions/render.ts" // via tsx or compiled

test("render produces screenshots at 2 viewports", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-render-"))
  const html = "<html><body><h1>Hi</h1></body></html>"
  const htmlPath = join(dir, "page.html")
  writeFileSync(htmlPath, html)
  const out = await render({ htmlPath, viewports: [1280, 375], outDir: dir })
  assert.equal(out.screenshots.length, 2)
  assert.ok(existsSync(out.screenshots[0].path))
  assert.ok(existsSync(out.computedStylesPath))
  assert.ok(existsSync(out.domSnapshotPath))
})

test("render computed-pairs dump skips head children (Plan 1b-1 CF1)", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-render-"))
  // A <style> in <head> + a visible <h1> in <body>. The head <style> must NOT
  // produce a computed pair (it has no visible text → would spuriously fail G40).
  const html = `\u003chtml><head><style>head,meta{color:red}</style></head><body><h1>Hi</h1></body></html>`
  const htmlPath = join(dir, "page.html")
  writeFileSync(htmlPath, html)
  const out = await render({ htmlPath, viewports: [1280], outDir: dir })
  const computed = JSON.parse(readFileSync(out.computedStylesPath, "utf8"))
  const tags = computed.map((p) => p.selector)
  assert.ok(!tags.includes("style"), "<style> in head must not be dumped")
  assert.ok(tags.includes("h1"), "visible body content still dumped")
})

test("render url mode: goto a file:// URL of a fixture (audit URL-mode branch)", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-render-"))
  const html = "<html><body><h1>URL mode</h1></body></html>"
  const htmlPath = join(dir, "page.html")
  writeFileSync(htmlPath, html)
  // Exercise the `url` branch with an offline file:// URL — deterministic, no network.
  const fileUrl = new URL(`file://${htmlPath}`).href
  const out = await render({ htmlPath, url: fileUrl, viewports: [1280], outDir: dir })
  assert.equal(out.screenshots.length, 1)
  assert.ok(existsSync(out.screenshots[0].path))
  assert.ok(existsSync(out.computedStylesPath))
  const computed = JSON.parse(readFileSync(out.computedStylesPath, "utf8"))
  assert.ok(computed.length > 0, "url-mode render still dumps computed pairs")
})

test("render emits viewportMetrics + oklch computed pairs", async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-render-"))
  const html = `<html><body>
      <header><small class="eyebrow">NEW</small><h1>Headline</h1><p>Lede text here</p><a class="cta" href="#">Go</a></header>
    </body></html>`
  const htmlPath = join(dir, "page.html")
  writeFileSync(htmlPath, html)
  const out = await render({ htmlPath, viewports: [1280, 375], outDir: dir })
  assert.equal(out.viewportMetrics.length, 2)
  const desk = out.viewportMetrics.find(v => v.width === 1280)
  assert.ok(desk.scrollWidth >= 1280)
  assert.ok(desk.innerHeight > 0)
  assert.ok(desk.hero, "1280px pass must capture hero rects")
  assert.ok(desk.hero.headline.bottom > 0)
  assert.ok(desk.hero.cta.bottom > desk.hero.headline.bottom, "cta below headline")
  const mob = out.viewportMetrics.find(v => v.width === 375)
  assert.equal(mob.hero, undefined, "hero only captured at 1280")
  const computed = JSON.parse(readFileSync(out.computedStylesPath, "utf8"))
  assert.ok(computed.length > 0)
  // colors must be oklch strings (white body)
  assert.match(computed[0].color, /^oklch\(/)
  assert.match(computed[0].backgroundColor, /^oklch\(/)
  assert.ok(existsSync(join(dir, "viewports.json")))
  // Plan 1b-2: computed pairs carry bounding-box width/height (for G23 accent-area).
  assert.ok(typeof computed[0].width === "number" && typeof computed[0].height === "number", "pairs have width/height")
})
