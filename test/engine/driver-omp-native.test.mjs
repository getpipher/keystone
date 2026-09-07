// test/engine/driver-omp-native.test.mjs — the omp-native driver mapped onto a
// stubbed globalThis.browser. Proves the wiring (viewport passthrough, unique
// tab names, string-evaluate bridging, screenshot temp-path copy, tab release)
// without omp present. The stub mirrors omp's real contract: screenshot()
// writes a temp file and returns its path; run(fn, {args}) spreads args after
// the ctx param (closures don't cross the serialization boundary).
import { test } from "node:test"
import assert from "node:assert/strict"
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { createOmpNativeDriver, ompBrowserAvailable } from "../../engine/driver-omp-native.mjs"

function stubBrowser() {
  const state = { opened: [], closed: [], evaluateExprs: [], runFns: 0, lastGoto: null }
  const browser = {
    async open({ name, viewport }) {
      state.opened.push({ name, viewport })
      return {
        async goto(u) { state.lastGoto = u },
        async url() { return "https://tab.example/final" },
        async waitForSelector() {},
        async screenshot() {
          const p = join(tmpdir(), `omp-shot-${Math.random().toString(36).slice(2)}.bin`)
          writeFileSync(p, Buffer.from([1, 2, 3, 4]))
          return p
        },
        async run(fn, opts) {
          state.runFns++
          return fn({
            page: {
              evaluate: async (expr) => { state.evaluateExprs.push(expr); return { via: "page-evaluate", expr } },
              content: async () => "<html>stub-content</html>",
            },
          }, ...(opts?.args ?? []))
        },
      }
    },
    async close({ name }) { state.closed.push(name) },
  }
  return { browser, state }
}

async function withStub(fn) {
  const saved = globalThis.browser
  const { browser, state } = stubBrowser()
  globalThis.browser = browser
  try {
    await fn(state)
  } finally {
    if (saved === undefined) delete globalThis.browser
    else globalThis.browser = saved
  }
}

test("omp-native driver: unavailable without the browser global", () => {
  const saved = globalThis.browser
  delete globalThis.browser
  try {
    assert.equal(ompBrowserAvailable(), false)
    assert.throws(() => createOmpNativeDriver(), /omp eval-kernel/)
  } finally {
    if (saved !== undefined) globalThis.browser = saved
  }
})

test("omp-native driver: openPage wires viewport + unique tab names; evaluate bridges as string", () => withStub(async (state) => {
  const driver = createOmpNativeDriver()
  const page = await driver.openPage({ width: 375, height: 234 })
  assert.equal(state.opened.length, 1)
  assert.equal(state.opened[0].viewport.width, 375)
  assert.equal(state.opened[0].viewport.height, 234)

  const page2 = await driver.openPage({ width: 1280, height: 800 })
  assert.notEqual(state.opened[0].name, state.opened[1].name, "tab names unique per page")

  const result = await page.evaluate("(() => 1)()")
  assert.deepEqual(result, { via: "page-evaluate", expr: "(() => 1)()" })
  assert.equal(state.evaluateExprs.length, 1)

  assert.equal(await page.url(), "https://tab.example/final")
  assert.equal(await page.content(), "<html>stub-content</html>")

  await page2.close()
  assert.deepEqual(state.closed, [state.opened[1].name])
  await driver.close() // omp owns the browser — driver close is a no-op
}))

test("omp-native driver: screenshot temp-path bytes land on disk as the artifact", () => withStub(async () => {
  const dir = mkdtempSync(join(tmpdir(), "keystone-omp-"))
  const driver = createOmpNativeDriver()
  const page = await driver.openPage({ width: 1280, height: 800 })
  await page.goto("https://tab.example/")
  const shot = join(dir, "screenshot-1280.png")
  await page.screenshot(shot)
  assert.deepEqual([...readFileSync(shot)], [1, 2, 3, 4])
}))
