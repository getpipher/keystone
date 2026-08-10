// extensions/render.ts
import { chromium } from "playwright-core"
import { pathToFileURL } from "node:url"
import { writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { toOklchString } from "../engine/color.mjs"

interface RenderInput {
  htmlPath: string
  url?: string          // optional: render a live URL (audit URL mode) instead of htmlPath. If set, page.goto(url); else the existing file:// path (build flow, unchanged).
  viewports?: number[]  // default [1280, 375, 320, 414, 768]
  outDir?: string       // default ./keystone-render
}

interface HeroRect {
  eyebrow: { top: number; bottom: number } | null
  headline: { top: number; bottom: number }
  lede: { top: number; bottom: number } | null
  cta: { top: number; bottom: number } | null
}

interface ViewportMetric {
  width: number
  scrollWidth: number
  innerWidth: number
  innerHeight: number
  hero?: HeroRect | null
}

interface RenderOutput {
  screenshots: { width: number; path: string }[]
  computedStylesPath: string
  domSnapshotPath: string
  viewportMetrics: ViewportMetric[]
  finalUrl: string  // the URL Playwright ended on after redirects (audit redirect-to-internal re-check)
}

export async function render(input: RenderInput): Promise<RenderOutput> {
  const viewports = input.viewports ?? [1280, 375, 320, 414, 768]
  const outDir = input.outDir ?? "./keystone-render"
  mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const screenshots: { width: number; path: string }[] = []
  const computedPairs: { selector: string; color: string; backgroundColor: string }[] = []
  const viewportMetrics: ViewportMetric[] = []
  let domSnapshot = ""
  let finalUrl = ""  // the URL Playwright ended on after redirects (first viewport's goto)

  for (const w of viewports) {
    const ctx = await browser.newContext({ viewport: { width: w, height: Math.round(w * 0.625) } })
    const page = await ctx.newPage()
    // audit URL mode: goto the live URL; otherwise the Plan-3 file:// path (unchanged).
    const target = input.url ?? pathToFileURL(input.htmlPath).href
    await page.goto(target, { waitUntil: "networkidle" })
    if (!finalUrl) finalUrl = page.url()  // capture after the first navigation (reflects redirects)
    const shotPath = join(outDir, `screenshot-${w}.png`)
    await page.screenshot({ path: shotPath, fullPage: false })
    screenshots.push({ width: w, path: shotPath })

    // Capture viewport metrics (scrollWidth, innerHeight, hero) at every viewport.
    // Hero rects are captured at every viewport but only attached to the metric
    // at the 1280px pass (G44 is desktop-only); see the spread below.
    //
    // NOTE: the evaluate body is a STRING (not an arrow fn) on purpose. tsx/esbuild
    // transpiles arrow-fn evaluates with keepNames, injecting __name() helpers that
    // don't exist in the browser page.evaluate context (ReferenceError: __name is
    // not defined). A raw JS string is not transpiled, so no __name is injected.
    // The `)` after the closing backtick closes page.evaluate(.
    const metrics = await page.evaluate(`(() => {
      const rect = (el) => el ? { top: Math.round(el.getBoundingClientRect().top), bottom: Math.round(el.getBoundingClientRect().bottom) } : null
      const scrollWidth = document.documentElement.scrollWidth
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      const h1 = document.querySelector("h1")
      if (!h1) return { scrollWidth, innerWidth, innerHeight, hero: null }
      const headline = rect(h1)
      let eyebrow = null
      const prev = h1.previousElementSibling
      if ((prev && prev.offsetHeight < 60 && /^(P|SPAN|DIV|SMALL|B)$/.test(prev.tagName)) || (prev && /eyebrow|kicker|tag/i.test(prev.className))) {
        eyebrow = rect(prev)
      }
      let lede = null
      const next = h1.nextElementSibling
      if (next && next.tagName === "P") lede = rect(next)
      const section = h1.closest("section, header, article, main")
      const ctaEl = section ? section.querySelector("a[href], button") : null
      const cta = rect(ctaEl)
      return { scrollWidth, innerWidth, innerHeight, hero: { eyebrow, headline, lede, cta } }
    })()`)

    // Hero is only meaningful at the 1280px pass; omit it from other viewports.
    const metric: ViewportMetric = {
      width: w,
      scrollWidth: metrics.scrollWidth,
      innerWidth: metrics.innerWidth,
      innerHeight: metrics.innerHeight,
      ...(w === 1280 ? { hero: metrics.hero } : {}),
    }
    viewportMetrics.push(metric)

    // On the 1280 pass, dump computed color pairs + DOM. This evaluate has NO
    // named inner functions, so the arrow-fn form does not trigger __name.
    if (w === 1280) {
      const pairs = await page.evaluate(() => {
        const out = []
        // body * skips <head> children (style/meta/title/link/script) — they have
        // no visible text but produce computed styles, which spuriously fail G40
        // contrast (APCA Lc 0 on transparent/empty pairs). Plan 1b-1 CF1.
        const els = document.querySelectorAll("body *")
        for (const el of els) {
          const cs = getComputedStyle(el)
          // Resolve the effective background: walk up while the element's own bg
          // is transparent (rgba(...,0) or "transparent"), so text-on-transparent
          // is contrasted against the nearest ancestor that paints a bg (usually
          // the body's page color). Without this, transparent bg → oklch(0 0 0)
          // (black) and every text-on-transparent pair spuriously fails contrast.
          let bg = cs.backgroundColor
          let node = el
          while (bg === "transparent" || /,\s*0\)$/.test(bg)) {
            node = node.parentElement
            if (!node) break
            bg = getComputedStyle(node).backgroundColor
          }
          if (cs.color || bg) {
            out.push({ selector: el.tagName.toLowerCase(), color: cs.color, backgroundColor: bg })
          }
        }
        return out.slice(0, 200) // cap
      })
      // Convert RGB computed styles to canonical OKLCH strings (Plan 3 — G40-41).
      for (const p of pairs) {
        const colorOk = toOklchString(p.color)
        const bgOk = toOklchString(p.backgroundColor)
        computedPairs.push({
          selector: p.selector,
          color: colorOk ?? p.color,
          backgroundColor: bgOk ?? p.backgroundColor,
        })
      }
      domSnapshot = await page.content()
    }
    await ctx.close()
  }
  // Capture the final URL after the LAST viewport's navigation (reflects redirects).
  // (page is closed; re-derive from the last goto — simpler: track it during the loop.)
  await browser.close()

  const computedStylesPath = join(outDir, "computed.json")
  writeFileSync(computedStylesPath, JSON.stringify(computedPairs, null, 2))
  const domSnapshotPath = join(outDir, "dom.html")
  writeFileSync(domSnapshotPath, domSnapshot)
  const viewportsPath = join(outDir, "viewports.json")
  writeFileSync(viewportsPath, JSON.stringify(viewportMetrics, null, 2))
  return { screenshots, computedStylesPath, domSnapshotPath, viewportMetrics, finalUrl }
}

// pi extension registration (the pi extension API — see getpipher/AGENTS.md for gotchas)
export default function (pi: any) {
  pi.registerTool({
    name: "keystone_render",
    description: "Render an HTML file with headless Chromium at given viewports. Returns screenshots + computed styles + DOM snapshot for the Keystone gate engine.",
    parameters: {
      htmlPath: { type: "string", description: "Absolute path to the HTML file to render" },
      url: { type: "string", description: "Optional live URL to render instead of htmlPath (audit URL mode). If set, htmlPath is ignored." },
      viewports: { type: "array", items: { type: "number" }, description: "CSS pixel widths to screenshot", default: [1280, 375, 320, 414, 768] },
      outDir: { type: "string", description: "Directory to write outputs", default: "./keystone-render" },
    },
    async run(input: RenderInput) {
      return render(input)
    },
  })
}
