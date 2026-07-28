// extensions/render.ts
import { chromium } from "playwright-core"
import { pathToFileURL } from "node:url"
import { writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

interface RenderInput {
  htmlPath: string
  viewports?: number[]  // default [1280, 375, 320, 414, 768]
  outDir?: string       // default ./keystone-render
}

interface RenderOutput {
  screenshots: { width: number; path: string }[]
  computedStylesPath: string
  domSnapshotPath: string
}

export async function render(input: RenderInput): Promise<RenderOutput> {
  const viewports = input.viewports ?? [1280, 375, 320, 414, 768]
  const outDir = input.outDir ?? "./keystone-render"
  mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const screenshots: { width: number; path: string }[] = []
  const computedPairs: { selector: string; color: string; backgroundColor: string }[] = []
  let domSnapshot = ""

  for (const w of viewports) {
    const ctx = await browser.newContext({ viewport: { width: w, height: Math.round(w * 0.625) } })
    const page = await ctx.newPage()
    await page.goto(pathToFileURL(input.htmlPath).href, { waitUntil: "networkidle" })
    const shotPath = join(outDir, `screenshot-${w}.png`)
    await page.screenshot({ path: shotPath, fullPage: false })
    screenshots.push({ width: w, path: shotPath })
    // On the 1280 pass, dump computed color pairs + DOM
    if (w === 1280) {
      const pairs = await page.evaluate(() => {
        const out: { selector: string; color: string; backgroundColor: string }[] = []
        const els = document.querySelectorAll("*")
        for (const el of els) {
          const cs = getComputedStyle(el)
          if (cs.color || cs.backgroundColor) {
            out.push({ selector: el.tagName.toLowerCase(), color: cs.color, backgroundColor: cs.backgroundColor })
          }
        }
        return out.slice(0, 200) // cap
      })
      computedPairs.push(...pairs)
      domSnapshot = await page.content()
    }
    await ctx.close()
  }
  await browser.close()

  const computedStylesPath = join(outDir, "computed.json")
  writeFileSync(computedStylesPath, JSON.stringify(computedPairs, null, 2))
  const domSnapshotPath = join(outDir, "dom.html")
  writeFileSync(domSnapshotPath, domSnapshot)
  return { screenshots, computedStylesPath, domSnapshotPath }
}

// pi extension registration (the pi extension API — see getpipher/AGENTS.md for gotchas)
export default function (pi: any) {
  pi.registerTool({
    name: "keystone_render",
    description: "Render an HTML file with headless Chromium at given viewports. Returns screenshots + computed styles + DOM snapshot for the Keystone gate engine.",
    parameters: {
      htmlPath: { type: "string", description: "Absolute path to the HTML file to render" },
      viewports: { type: "array", items: { type: "number" }, description: "CSS pixel widths to screenshot", default: [1280, 375, 320, 414, 768] },
      outDir: { type: "string", description: "Directory to write outputs", default: "./keystone-render" },
    },
    async run(input: RenderInput) {
      return render(input)
    },
  })
}