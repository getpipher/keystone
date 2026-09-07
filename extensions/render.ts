// extensions/render.ts — registers the `keystone_render` tool on pi hosts.
//
// omp hosts SKIP registration (engine/host.mjs): omp's extension runtime has no
// browser API (can1357/oh-my-pi#11091), so the tool can't render there without
// bundling a second Chromium stack. On omp the skill renders through omp's
// built-in browser instead — SKILL.md § 7.2 imports engine/render-omp.mjs from
// the eval kernel. The render flow itself lives in engine/render-core.mjs,
// shared by every driver.
//
// NOTE: no module in this file may statically reference playwright-core — not
// even `import type`. omp's guarded extension loader preloads every import
// specifier it sees at load time; the ~9 MB graph cost ~20 s per startup
// (getpipher/keystone#21). driver-playwright.mjs keeps the import lazy.
import { Type } from "typebox"

import { renderWithDriver } from "../engine/render-core.mjs"
import { createPlaywrightDriver } from "../engine/driver-playwright.mjs"
import { isOmpRuntime } from "../engine/host.mjs"

interface RenderInput {
  htmlPath: string
  url?: string          // optional: render a live URL (audit URL mode) instead of htmlPath. If set, page.goto(url); else the existing file:// path (build flow, unchanged).
  viewports?: number[]  // default [1280, 375, 320, 414, 768]
  outDir?: string       // default ./keystone-render
}

// pi extension registration (the pi extension API — see getpipher/AGENTS.md for gotchas)
export default function (pi: any) {
  if (isOmpRuntime()) return // omp renders via engine/render-omp.mjs in its eval kernel

  pi.registerTool({
    name: "keystone_render",
    description: "Render an HTML file with headless Chromium at given viewports. Returns screenshots + computed styles + DOM snapshot for the Keystone gate engine.",
    parameters: Type.Object({
      htmlPath: Type.String({ description: "Absolute path to the HTML file to render" }),
      url: Type.Optional(Type.String({ description: "Optional live URL to render instead of htmlPath (audit URL mode). If set, htmlPath is ignored." })),
      viewports: Type.Optional(Type.Array(Type.Number({ description: "CSS pixel widths to screenshot" }))),
      outDir: Type.Optional(Type.String({ description: "Directory to write outputs" })),
    }),
    async execute(_toolCallId: string, input: RenderInput) {
      const result = await renderWithDriver(input, await createPlaywrightDriver())
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }], details: result }
    },
  })
}
