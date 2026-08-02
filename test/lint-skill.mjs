import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = join(import.meta.dirname, "..", "skills", "keystone");
const read = (p) => readFileSync(p, "utf8");

// 1. Every gate in gates.md has a **Checker:** line.
test("every gate heading in gates.md has a Checker line", () => {
  const gates = read(join(ROOT, "references", "gates.md"));
  const lines = gates.split("\n");
  let currentGate = null;
  let foundChecker = false;
  let gateCount = 0;
  let checkedCount = 0;
  for (const line of lines) {
    const m = line.match(/^### (G\d+[a-z]?)\b/);
    if (m) {
      if (currentGate && !foundChecker) {
        assert.fail(`Gate ${currentGate} has no **Checker:** line`);
      }
      currentGate = m[1];
      foundChecker = false;
      gateCount++;
    } else if (currentGate && line.includes("**Checker:**")) {
      foundChecker = true;
      checkedCount++;
    }
  }
  if (currentGate && !foundChecker) {
    assert.fail(`Gate ${currentGate} has no **Checker:** line`);
  }
  assert.ok(gateCount >= 50, `expected at least 50 gates, got ${gateCount}`);
  assert.equal(checkedCount, gateCount, `all ${gateCount} gates must have a Checker line`);
});

// 2. Every theme stub has 3 axes + palette + fonts.
const THEMES = ["midnight", "cobalt", "garden", "hum", "manifesto", "riso", "specimen", "terminal"];
for (const theme of THEMES) {
  test(`theme ${theme} has axes + palette + fonts`, () => {
    const content = read(join(ROOT, "references", "themes", `${theme}.md`));
    assert.match(content, /## Axes \(diversification\)/, "missing ## Axes heading");
    assert.match(content, /Paper band/, "missing Paper band axis");
    assert.match(content, /Display style/, "missing Display style axis");
    assert.match(content, /Accent hue/, "missing Accent hue axis");
    assert.match(content, new RegExp(`data-theme="${theme}"`), `missing data-theme="${theme}"`);
    assert.match(content, /--color-paper/, "missing --color-paper token");
    assert.match(content, /--color-accent/, "missing --color-accent token");
    assert.match(content, /--font-display/, "missing --font-display token");
  });
}

// 3. Macro slugs stable — 21 per-macro files exist.
const MACRO_SLUGS = [
  "01-bento-grid", "02-long-document", "03-marquee-hero", "04-stat-led",
  "05-workbench", "06-conversational-faq", "07-manifesto", "08-photographic",
  "09-quote-led", "10-specimen", "11-catalogue", "12-letter", "13-index-first",
  "14-narrative-workflow", "15-split-studio", "16-feature-stack", "17-type-specimen",
  "18-portfolio-grid", "19-map-diagram", "20-ecosystem-index", "21-component-playground",
];
for (const slug of MACRO_SLUGS) {
  test(`macro ${slug}.md exists`, () => {
    assert.ok(existsSync(join(ROOT, "references", "macrostructures", `${slug}.md`)), `missing ${slug}.md`);
  });
}

// 4. Component codes stable — 50 files exist.
const COMPONENTS = [
  "h1-marquee", "h2-split-diptych", "h3-quote-led", "h4-stat-led", "h5-letter-hero",
  "h6-photographic-fold", "h7-demo-video-clipped-by-viewport-edge", "h8-mockup-split-browser-framed",
  "h9-custom-illustration-centerpiece", "s1-left-margin-numbered", "s2-hanging", "s3-sticky-pinned",
  "s4-inline-no-break", "s5-bottom-anchored", "f1-bento-grid", "f2-sticky-scroll-stack",
  "f3-tabular-spec-sheet", "f4-step-sequence", "f5-annotated-screenshot", "f6-product-card-grid",
  "c1-outlined-chip", "c2-inline-form-as-cta", "c3-typographic-link", "c4-sticky-bottom-bar",
  "t1-pull-quote-with-marginalia", "t2-logo-wall-hairline", "t3-single-huge-quote",
  "t4-numbered-stat-strip", "ft1-mast-headed", "ft2-inline-rule-single-line",
  "ft3-index-style-category-list", "ft4-dense-typographic", "ft5-statement", "ft6-letter-close",
  "ft7-newsletter-first", "ft8-marquee-scroll", "n1-wordmark-2-links", "n1b-saas-three-section",
  "n2-floating-chip", "n3-side-rail", "n4-hidden-behind-k", "n5-floating-pill",
  "n6-newspaper-masthead", "n7-brutal-slab", "n8-terminal-command", "n9-edge-aligned-minimal",
  "n10-floating-on-scroll-morph", "n11-mega-menu", "n12-banner-retract", "n13-inline-cmdk-pill",
];
for (const slug of COMPONENTS) {
  test(`component ${slug}.md exists`, () => {
    assert.ok(existsSync(join(ROOT, "references", "components", `${slug}.md`)), `missing ${slug}.md`);
  });
}

// 5. No Hallmark leftover in Keystone prose (except NOTICE + README attribution).
test("no Hallmark leftover in keystone prose", () => {
  function walk(dir) {
    const results = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...walk(full));
      } else if (entry.name.endsWith(".md")) {
        results.push(full);
      }
    }
    return results;
  }
  const files = walk(join(import.meta.dirname, "..", "skills"));
  const violations = [];
  for (const file of files) {
    const name = basename(file);
    if (name === "NOTICE.md" || name === "README.md" || name === "SKILL.md" || name === "gates.md") continue;
    const content = read(file);
    if (/\bHallmark\b/.test(content)) {
      violations.push(file);
    }
  }
  assert.deepEqual(violations, [], `Files with leftover Hallmark: ${violations.join(", ")}`);
});

// 6. EOF newline on every .md and .mjs file.
test("every .md and .mjs file has EOF newline", () => {
  function walk(dir) {
    const results = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...walk(full));
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mjs")) {
        results.push(full);
      }
    }
    return results;
  }
  const files = walk(join(import.meta.dirname, "..", "skills"));
  files.push(import.meta.filename);
  const missing = [];
  for (const file of files) {
    const buf = readFileSync(file);
    if (buf.length === 0 || buf[buf.length - 1] !== 0x0a) {
      missing.push(file);
    }
  }
  assert.deepEqual(missing, [], `Files missing EOF newline: ${missing.join(", ")}`);
});
