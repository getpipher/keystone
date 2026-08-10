import { test } from "node:test";
import assert from "node:assert/strict";

import { lightnessOf, rgbToOklch, toOklchString, parseColor } from "../../engine/color.mjs";

test("lightnessOf oklch percent form", () => {
  assert.equal(lightnessOf("oklch(45% 0.1 240)"), 45);
});

test("lightnessOf oklch unit form (0.L)", () => {
  assert.equal(lightnessOf("oklch(0.45 0.1 240)"), 45);
});

test("lightnessOf rgb white → 100", () => {
  assert.equal(lightnessOf("rgb(255, 255, 255)"), 100);
});

test("lightnessOf rgb black → 0", () => {
  assert.equal(lightnessOf("rgb(0, 0, 0)"), 0);
});

test("lightnessOf rgb mid-grey → ~54–56", () => {
  const l = lightnessOf("rgb(128, 128, 128)");
  assert.ok(l > 50 && l < 60, `mid grey L=${l} expected 50–60`);
});

test("lightnessOf hex white → 100", () => {
  assert.equal(lightnessOf("#ffffff"), 100);
});

test("lightnessOf hex black → 0", () => {
  assert.equal(lightnessOf("#000"), 0);
});

test("lightnessOf rgba (alpha ignored)", () => {
  assert.equal(lightnessOf("rgba(0, 0, 0, 0.5)"), 0);
});

test("lightnessOf not a color → null", () => {
  assert.equal(lightnessOf("not a color"), null);
});

test("toOklchString rgb(255,255,255) → oklch(100% 0 0)", () => {
  assert.match(toOklchString("rgb(255,255,255)"), /oklch\(100% 0 0\)/);
});

test("rgbToOklch white", () => {
  const { L, C, H } = rgbToOklch(255, 255, 255);
  assert.ok(Math.abs(L - 1.0) < 0.001, `white L=${L} ≈ 1.0`);
  assert.ok(C < 0.001, `white C=${C} ≈ 0`);
});

test("rgbToOklch black", () => {
  const { L, C } = rgbToOklch(0, 0, 0);
  assert.ok(Math.abs(L) < 0.001, `black L=${L} ≈ 0`);
  assert.ok(C < 0.001, `black C=${C} ≈ 0`);
});

test("rgbToOklch red anchor rgb(176,42,42)", () => {
  const { L, C, H } = rgbToOklch(176, 42, 42);
  // Pinned regression anchor — exact computed values
  assert.ok(Math.abs(L - 0.5005) < 0.001, `red L=${L} expected ~0.5005`);
  assert.ok(Math.abs(C - 0.1708) < 0.001, `red C=${C} expected ~0.1708`);
  assert.ok(Math.abs(H - 25.93) < 0.1, `red H=${H} expected ~25.93`);
});

test("parseColor oklch", () => {
  const p = parseColor("oklch(45% 0.1 240)");
  assert.equal(p.kind, "oklch");
  assert.ok(p.L != null);
});

test("parseColor rgb", () => {
  const p = parseColor("rgb(176, 42, 42)");
  assert.equal(p.kind, "rgb");
  assert.ok(p.L != null);
});

test("parseColor not a color → null", () => {
  assert.equal(parseColor("not a color"), null);
});
