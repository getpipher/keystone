// engine/render.mjs — render() bound to the playwright driver.
// The CLI (check-gates.mjs --render, audit.mjs) and the pi extension import
// this. Runs headless Chromium from playwright-core in THIS (child) process.
import { renderWithDriver } from "./render-core.mjs"
import { createPlaywrightDriver } from "./driver-playwright.mjs"

/** @param {import("./render-core.mjs").RenderInput} input */
export async function render(input) {
  return renderWithDriver(input, await createPlaywrightDriver())
}
