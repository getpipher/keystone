// engine/render-omp.mjs — render() bound to omp's built-in browser.
//
// Invoked from omp's eval kernel by the keystone skill (SKILL.md § 7.2):
//   const { render } = await import("<omp-plugins>/@getpipher/keystone/engine/render-omp.mjs")
//   await render({ htmlPath, viewports: [1280, 375], outDir })
// The omp host owns the browser; no playwright-core is loaded on this path.
import { renderWithDriver } from "./render-core.mjs"
import { createOmpNativeDriver } from "./driver-omp-native.mjs"

/** @param {import("./render-core.mjs").RenderInput} input */
export async function render(input) {
  return renderWithDriver(input, createOmpNativeDriver())
}
