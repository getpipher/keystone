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