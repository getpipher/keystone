// Type declarations for engine/render-core.mjs.

export interface RenderInput {
  htmlPath: string
  url?: string
  viewports?: number[]
  outDir?: string
}

export interface HeroRect {
  eyebrow: { top: number; bottom: number } | null
  headline: { top: number; bottom: number }
  lede: { top: number; bottom: number } | null
  cta: { top: number; bottom: number } | null
}

export interface ViewportMetric {
  width: number
  scrollWidth: number
  innerWidth: number
  innerHeight: number
  hero?: HeroRect
}

export interface RenderOutput {
  screenshots: { width: number; path: string }[]
  computedStylesPath: string
  domSnapshotPath: string
  viewportMetrics: ViewportMetric[]
  finalUrl: string
  clickableMetrics: { viewport: number; selector: string; offsetHeight: number; lineHeight: number }[]
}

export declare function renderWithDriver(
  input: RenderInput,
  driver: import("./driver-playwright.mjs").RenderDriver,
): Promise<RenderOutput>
