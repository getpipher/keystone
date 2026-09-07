// Type declarations for engine/driver-playwright.mjs (consumed by
// extensions/render.ts under strict tsc; the implementation is plain JS and
// stays the source of truth).

export interface RenderPage {
  goto(url: string): Promise<void>
  url(): Promise<string>
  screenshot(path: string): Promise<void>
  evaluate(expr: string): Promise<unknown>
  content(): Promise<string>
  close(): Promise<void>
}

export interface RenderDriver {
  openPage(viewport: { width: number; height: number }): Promise<RenderPage>
  close(): Promise<void>
}

export declare function createPlaywrightDriver(): Promise<RenderDriver>
