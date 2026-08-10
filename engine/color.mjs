// engine/color.mjs — shared color helpers (Plan 3 — G40-41 RGB dump fix).
// Pure, no deps. Converts rgb/hex/oklch strings to OKLCH for the contrast gate.

/**
 * sRGB channel (0–255) → linear (0–1).
 */
function srgbToLinear(c) {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : ((cs + 0.055) / 1.055) ** 2.4;
}

/**
 * Linear sRGB → OKLab via the Björn Ottosson matrix.
 */
function linearSrgbToOklab(r, g, b) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514409963 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  return { L, a, b: b_ };
}

/**
 * OKLab → OKLCH.
 */
function oklabToOklch(L, a, b) {
  const C = Math.sqrt(a * a + b * b);
  let H = 0;
  if (C >= 1e-6) {
    H = (Math.atan2(b, a) * 180) / Math.PI;
    if (H < 0) H += 360;
  }
  return { L, C, H };
}

/**
 * rgb(r,g,b) / rgba(r,g,b,a) / #rrggbb / #rgb → {r,g,b} in 0–255 sRGB.
 */
export function parseRgb(str) {
  str = str.trim();

  // rgb(r,g,b) or rgba(r,g,b,a)
  const rgbMatch = str.match(/^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*[\d.]+\s*)?\)$/i);
  if (rgbMatch) {
    return {
      r: parseFloat(rgbMatch[1]),
      g: parseFloat(rgbMatch[2]),
      b: parseFloat(rgbMatch[3]),
    };
  }

  // rgb(r g b) space-separated (Chromium sometimes emits this)
  const rgbSpaceMatch = str.match(/^rgba?\(\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*(?:\/\s*[\d.]+\s*)?\)$/i);
  if (rgbSpaceMatch) {
    return {
      r: parseFloat(rgbSpaceMatch[1]),
      g: parseFloat(rgbSpaceMatch[2]),
      b: parseFloat(rgbSpaceMatch[3]),
    };
  }

  // #rrggbb
  const hexLong = str.match(/^#([0-9a-f]{6})$/i);
  if (hexLong) {
    const h = hexLong[1];
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }

  // #rgb
  const hexShort = str.match(/^#([0-9a-f]{3})$/i);
  if (hexShort) {
    const h = hexShort[1];
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }

  return null;
}

/**
 * r255,g255,b255 → { L: 0–1, C, H (degrees) }
 */
export function rgbToOklch(r255, g255, b255) {
  const lr = srgbToLinear(r255);
  const lg = srgbToLinear(g255);
  const lb = srgbToLinear(b255);
  const lab = linearSrgbToOklab(lr, lg, lb);
  return oklabToOklch(lab.L, lab.a, lab.b);
}

/**
 * Parse an OKLCH string → { L: 0–1, C, H }.
 */
function parseOklch(str) {
  str = str.trim();
  const match = str.match(/^oklch\(\s*([\d.]+)\s*(%?)\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s*\)$/i);
  if (!match) return null;
  let L = parseFloat(match[1]);
  if (match[2] === "%") L /= 100;
  const C = parseFloat(match[3]);
  const H = parseFloat(match[4]);
  return { L, C, H };
}

/**
 * lightnessOf(str) → number (0–100) | null.
 */
export function lightnessOf(str) {
  if (!str) return null;

  // oklch percent form: oklch(45% ...)
  let m = str.match(/^oklch\(\s*([\d.]+)%\s/i);
  if (m) return Math.round(parseFloat(m[1]) * 100) / 100;

  // oklch unit form: oklch(0.45 ...)
  m = str.match(/^oklch\(\s*([\d.]+)\s/i);
  if (m) return Math.round(parseFloat(m[1]) * 100 * 100) / 100;

  // rgb / hex
  const rgb = parseRgb(str);
  if (rgb) {
    const { L } = rgbToOklch(rgb.r, rgb.g, rgb.b);
    return Math.round(L * 10000) / 100; // round to 2 decimal places (99.9999 → 100)
  }

  // bare oklch(...) that didn't match above (e.g. no space after L)
  const ok = parseOklch(str);
  if (ok) return Math.round(ok.L * 100 * 100) / 100;

  return null;
}

/**
 * toOklchString(str) → canonical "oklch(L% C H)" string, or null.
 */
export function toOklchString(str) {
  if (!str) return null;

  // Already oklch — normalise
  const ok = parseOklch(str);
  if (ok) {
    const Lpct = ok.L * 100;
    const Cs = ok.C < 1e-4 ? "0" : Number(ok.C.toPrecision(6)).toString();
    const Hs = ok.C < 1e-4 ? 0 : Math.round(ok.H * 100) / 100;
    return `oklch(${Lpct}% ${Cs} ${Hs})`;
  }

  // rgb / hex
  const rgb = parseRgb(str);
  if (rgb) {
    const { L, C, H } = rgbToOklch(rgb.r, rgb.g, rgb.b);
    const Lpct = Math.round(L * 10000) / 100; // 2 decimal places on the percentage
    const Cs = C < 1e-4 ? "0" : Number(C.toPrecision(6)).toString();
    const Hs = C < 1e-4 ? 0 : Math.round(H * 100) / 100;
    return `oklch(${Lpct}% ${Cs} ${Hs})`;
  }

  return null;
}

/**
 * parseColor(str) → { kind, components, L, C, H } | null.
 */
export function parseColor(str) {
  if (!str) return null;

  const ok = parseOklch(str);
  if (ok) {
    return {
      kind: "oklch",
      components: [ok.L, ok.C, ok.H],
      L: ok.L,
      C: ok.C,
      H: ok.H,
    };
  }

  const rgb = parseRgb(str);
  if (rgb) {
    const { L, C, H } = rgbToOklch(rgb.r, rgb.g, rgb.b);
    return {
      kind: "rgb",
      components: [rgb.r, rgb.g, rgb.b],
      L,
      C,
      H,
    };
  }

  return null;
}
