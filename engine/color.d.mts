// Type declarations for engine/color.mjs (consumed by extensions/render.ts under
// strict tsc; the implementation is plain JS and stays the source of truth).

export declare function parseRgb(
  str: string,
): { r: number; g: number; b: number } | null

export declare function rgbToOklch(
  r255: number,
  g255: number,
  b255: number,
): { L: number; C: number; H: number }

export declare function lightnessOf(str: string): number | null

export declare function toOklchString(str: string): string | null

export declare function parseColor(
  str: string,
):
  | { kind: "oklch"; L: number | null; C: number | null; H: number | null }
  | { kind: "rgb"; r: number; g: number; b: number; L: number | null }
  | { kind: "hex"; r: number; g: number; b: number; L: number | null }
  | null
