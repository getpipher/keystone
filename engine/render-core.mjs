// engine/render-core.mjs — the render flow, driver-parameterized.
//
// Split out of extensions/render.ts (v1.0.x) in v1.1.0 so the same orchestration
// runs behind three drivers: playwright (CLI child process + the pi extension
// tool) and omp-native (omp's built-in browser via the eval kernel — see
// driver-omp-native.mjs). The flow is a behavioral port: viewports loop, hero
// metrics at 1280 only, computed-pairs + DOM dump on the 1280 pass, clickable
// metrics at 1280 + 375, OKLCH-canonicalized colors, artifacts on disk.
//
// NOTE: every page.evaluate body is a STRING (not an arrow fn) on purpose —
// transpilers inject __name() helpers that don't exist in the page context
// (ReferenceError: __name is not defined). Raw strings are not transpiled.
import { writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { pathToFileURL } from "node:url"
import { toOklchString } from "./color.mjs"

/**
 * @typedef {Object} RenderInput
 * @property {string} htmlPath
 * @property {string} [url]        audit URL mode: goto this live URL instead of htmlPath
 * @property {number[]} [viewports] CSS px widths; default [1280, 375, 320, 414, 768]
 * @property {string} [outDir]     default ./keystone-render
 *
 * @typedef {Object} HeroRect
 * @property {{top:number,bottom:number}|null} eyebrow
 * @property {{top:number,bottom:number}} headline
 * @property {{top:number,bottom:number}|null} lede
 * @property {{top:number,bottom:number}|null} cta
 *
 * @typedef {Object} ViewportMetric
 * @property {number} width
 * @property {number} scrollWidth
 * @property {number} innerWidth
 * @property {number} innerHeight
 * @property {HeroRect} [hero]     attached at the 1280px pass only (G44 is desktop-only)
 *
 * @typedef {Object} RenderOutput
 * @property {{width:number,path:string}[]} screenshots
 * @property {string} computedStylesPath
 * @property {string} domSnapshotPath
 * @property {ViewportMetric[]} viewportMetrics
 * @property {string} finalUrl      URL the browser ended on after redirects (audit re-check)
 * @property {{viewport:number,selector:string,offsetHeight:number,lineHeight:number}[]} clickableMetrics
 */

// Page-context probe: viewport metrics + hero band rects (G44, G34).
const METRICS_EXPR = `(() => {
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
})()`

// Page-context probe: computed color pairs for G40-41 contrast + G23 accent area.
// body * skips <head> children (style/meta/title/link/script) — they have no
// visible text but produce computed styles, which spuriously fail G40 (APCA Lc 0
// on transparent/empty pairs). Plan 1b-1 CF1. Background resolves up the tree
// while transparent so text-on-transparent contrasts against the nearest
// painting ancestor (usually the body page color). Capped at 200 pairs.
const PAIRS_EXPR = `(() => {
  const out = []
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el)
    let bg = cs.backgroundColor
    let node = el
    while (bg === "transparent" || /,\\s*0\\)$/.test(bg)) {
      node = node.parentElement
      if (!node) break
      bg = getComputedStyle(node).backgroundColor
    }
    if (cs.color || bg) {
      const r = el.getBoundingClientRect()
      out.push({ selector: el.tagName.toLowerCase(), color: cs.color, backgroundColor: bg, width: Math.round(r.width), height: Math.round(r.height) })
    }
  }
  return out.slice(0, 200)
})()`

// Page-context probe: clickable line-metrics for G49 (two-line clickable text).
const CLICKABLES_EXPR = `(() => {
  const sel = "button, a.btn, a.cta, [role=button], nav a"
  const out = []
  for (const el of document.querySelectorAll(sel)) {
    const cs = getComputedStyle(el)
    out.push({ selector: el.tagName.toLowerCase() + (el.className ? "." + el.className.split(" ")[0] : ""), offsetHeight: el.offsetHeight, lineHeight: parseFloat(cs.lineHeight) || 0 })
  }
  return out
})()`

/**
 * Run the render flow against a driver.
 *
 * @param {RenderInput} input
 * @param {import("./driver-playwright.mjs").RenderDriver} driver
 * @returns {Promise<RenderOutput>}
 */
export async function renderWithDriver(input, driver) {
  const viewports = input.viewports ?? [1280, 375, 320, 414, 768]
  const outDir = input.outDir ?? "./keystone-render"
  mkdirSync(outDir, { recursive: true })
  const screenshots = []
  const computedPairs = []
  const viewportMetrics = []
  const clickableMetrics = []
  let domSnapshot = ""
  let finalUrl = "" // captured after the first navigation (reflects redirects)

  for (const w of viewports) {
    const page = await driver.openPage({ width: w, height: Math.round(w * 0.625) })
    // audit URL mode: goto the live URL; otherwise the file:// path (build flow).
    const target = input.url ?? pathToFileURL(input.htmlPath).href
    await page.goto(target)
    if (!finalUrl) finalUrl = await page.url()
    const shotPath = join(outDir, `screenshot-${w}.png`)
    await page.screenshot(shotPath)
    screenshots.push({ width: w, path: shotPath })

    const metrics = await page.evaluate(METRICS_EXPR)
    viewportMetrics.push({
      width: w,
      scrollWidth: metrics.scrollWidth,
      innerWidth: metrics.innerWidth,
      innerHeight: metrics.innerHeight,
      ...(w === 1280 ? { hero: metrics.hero } : {}),
    })

    // On the 1280 pass, dump computed color pairs + DOM (G40-41, G23, dom.html).
    if (w === 1280) {
      const pairs = await page.evaluate(PAIRS_EXPR)
      for (const p of pairs) {
        computedPairs.push({
          selector: p.selector,
          color: toOklchString(p.color) ?? p.color,
          backgroundColor: toOklchString(p.backgroundColor) ?? p.backgroundColor,
          width: p.width,
          height: p.height,
        })
      }
      domSnapshot = await page.content()
    }
    // Clickable line-metrics for G49 at 1280 + 375 only.
    if (w === 1280 || w === 375) {
      const clickables = await page.evaluate(CLICKABLES_EXPR)
      for (const c of clickables) clickableMetrics.push({ viewport: w, ...c })
    }
    await page.close()
  }
  await driver.close()

  const computedStylesPath = join(outDir, "computed.json")
  writeFileSync(computedStylesPath, JSON.stringify(computedPairs, null, 2))
  const domSnapshotPath = join(outDir, "dom.html")
  writeFileSync(domSnapshotPath, domSnapshot)
  const viewportsPath = join(outDir, "viewports.json")
  writeFileSync(viewportsPath, JSON.stringify(viewportMetrics, null, 2))
  const clickablePath = join(outDir, "clickable.json")
  writeFileSync(clickablePath, JSON.stringify(clickableMetrics, null, 2))
  return { screenshots, computedStylesPath, domSnapshotPath, viewportMetrics, finalUrl, clickableMetrics }
}
