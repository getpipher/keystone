// engine/driver-playwright.mjs — RenderDriver over playwright-core.
//
// Used by (a) the CLI child process (check-gates.mjs --render, audit.mjs) and
// (b) the pi extension tool. NOT imported by omp's extension path — omp skips
// tool registration there and the skill renders via driver-omp-native.mjs
// through omp's built-in browser.
//
// The playwright-core specifier is assembled at runtime (["playwright","-core"].join(""))
// because omp's guarded extension loader preloads every statically resolvable
// import specifier at startup — a static reference costs ~20s per omp start
// (getpipher/keystone#21). Harmless in a plain node child process; kept uniform.

/**
 * @typedef {Object} RenderPage
 * @property {(url: string) => Promise<void>} goto
 * @property {() => Promise<string>} url
 * @property {(path: string) => Promise<void>} screenshot   PNG to path
 * @property {(expr: string) => Promise<any>} evaluate       page-context expression (string!)
 * @property {() => Promise<string>} content                 serialized DOM
 * @property {() => Promise<void>} close
 *
 * @typedef {Object} RenderDriver
 * @property {(viewport: {width: number, height: number}) => Promise<RenderPage>} openPage
 * @property {() => Promise<void>} close
 */

let cachedChromium

async function loadChromium() {
  const spec = ["playwright", "-core"].join("")
  const mod = await import(spec)
  return mod.chromium
}

async function getChromium() {
  cachedChromium ??= await loadChromium()
  return cachedChromium
}

/** @returns {Promise<RenderDriver>} */
export async function createPlaywrightDriver() {
  const chromium = await getChromium()
  const browser = await chromium.launch({ headless: true })
  return {
    async openPage({ width, height }) {
      // fresh context per viewport: cookies/storage isolated between passes
      const ctx = await browser.newContext({ viewport: { width, height } })
      const page = await ctx.newPage()
      return {
        goto: (url) => page.goto(url, { waitUntil: "networkidle" }),
        url: () => Promise.resolve(page.url()),
        screenshot: (path) => page.screenshot({ path, fullPage: false }),
        evaluate: (expr) => page.evaluate(expr),
        content: () => page.content(),
        async close() {
          await ctx.close()
        },
      }
    },
    async close() {
      await browser.close()
    },
  }
}
