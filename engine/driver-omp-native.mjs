// engine/driver-omp-native.mjs — RenderDriver over omp's built-in browser.
//
// omp bundles a Puppeteer-backed browser exposed as the `browser` global in its
// eval kernels (can1357/oh-my-pi#11091 tracks exposing it to extensions). This
// driver runs INSIDE that eval kernel — the skill imports engine/render-omp.mjs
// from the installed package path and calls render(); no playwright-core, no
// second Chromium stack, nothing for omp's extension loader to preload.
//
// Lifecycle: omp owns the browser (shared, headless, launch-on-first-use).
// Each openPage maps to a uniquely named tab; close() releases that tab only.
// Tab profile isolation is weaker than playwright's per-context isolation
// (tabs share the browser profile); keystone renders local files and one-off
// audit URLs, so cross-viewport cookie bleed is out of scope.

/** @returns {boolean} */
export function ompBrowserAvailable() {
  return typeof globalThis.browser === "object" && globalThis.browser !== null
    && typeof globalThis.browser.open === "function"
}
async function writeScreenshot(tab, destPath) {
  const { copyFileSync, writeFileSync } = await import("node:fs")
  const r = await tab.screenshot()
  if (typeof r === "string") {
    if (r.startsWith("data:")) {
      const comma = r.indexOf(",")
      writeFileSync(destPath, Buffer.from(r.slice(comma + 1), "base64"))
      return
    }
    // omp writes captures to a temp file and returns its path — copy it over.
    copyFileSync(r, destPath)
    return
  }
  if (r instanceof Uint8Array) { writeFileSync(destPath, r); return }
  if (r && typeof r.arrayBuffer === "function") { writeFileSync(destPath, new Uint8Array(await r.arrayBuffer())); return }
  throw new Error(`omp-native driver: unhandled screenshot return type ${Object.prototype.toString.call(r)}`)
}
/** @returns {import("./driver-playwright.mjs").RenderDriver} */
export function createOmpNativeDriver() {
  if (!ompBrowserAvailable()) {
    throw new Error("omp-native driver requires the omp eval-kernel `browser` global (run via omp's eval kernel, not node)")
  }
  const b = globalThis.browser
  const tabs = []
  let seq = 0
  return {
    async openPage({ width, height }) {
      const name = `keystone-${width}-${Date.now().toString(36)}-${seq++}`
      const tab = await b.open({ name, viewport: { width, height }, url: "about:blank" })
      tabs.push(name)
      return {
        async goto(url) {
          await tab.goto(url)
          // settle: playwright's networkidle isn't exposed on the tab helper;
          // waiting for <body> covers late-arriving document paint.
          await tab.waitForSelector("body", { timeout: 10_000 }).catch(() => {})
        },
        url: () => tab.url(),
        screenshot: (path) => writeScreenshot(tab, path),
        // tab.run serializes the fn — closures don't cross; pass the expr via args.
        evaluate: (expr) => tab.run(async ({ page }, code) => page.evaluate(code), { args: [expr] }),
        content: () => tab.run(async ({ page }) => page.content()),
        async close() {
          await b.close({ name }).catch(() => {})
        },
      }
    },
    async close() {
      // tabs are closed individually by render-core (page.close); nothing to do —
      // the browser itself is omp-owned and shared.
    },
  }
}
