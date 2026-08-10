import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = join(import.meta.dirname, "..", "skills", "keystone");
const read = (p) => readFileSync(p, "utf8");
const gates = read(join(ROOT, "references", "gates.md"));
const skill = read(join(ROOT, "SKILL.md"));
const engine = read(join(ROOT, "references", "engine.md"));
const audit = read(join(ROOT, "references", "verbs", "audit.md"));
const { TIER_MAP, EFFORT_MAP, EXCLUDED_GATES } = await import("../engine/audit-report.mjs");

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

// 2b. Every deep theme spec has all 11 required sections.
const DEEP_SECTIONS = [
  "## Axes (diversification)",
  "## Palette",
  "## Fonts (free)",
  "## Signature moves",
  "## Macrostructure affinity",
  "## Voice fixtures",
  "## Anti-patterns (theme-specific)",
  "## Nav & footer routing",
  "## Worked example",
  "## Gate overrides",
  "## Engine cross-ref",
];
for (const theme of THEMES) {
  test(`theme ${theme} deep spec has all 11 sections`, () => {
    const content = read(join(ROOT, "references", "themes", `${theme}.md`));
    for (const heading of DEEP_SECTIONS) {
      assert.ok(content.includes(heading), `theme ${theme} missing heading: ${heading}`);
    }
    assert.ok(!content.includes("## Macrostructure affinity (short"),
      `theme ${theme} still has the 2a short-affinity heading — rename to "## Macrostructure affinity"`);
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

// 7. Plan-3 structural assertions (vision prompt + Step 7 + engine flags).

test("gates.md has the vision-pass prompt section", () => {
  assert.match(gates, /## The vision pass — the 18-question prompt/);
});

test("gates.md vision-prompt block lists all 16 gate tokens", () => {
  const start = gates.indexOf("## The vision pass");
  assert.ok(start !== -1, "vision pass section not found");
  let end = gates.indexOf("## ", start + 10);
  if (end === -1) end = gates.length;
  const region = gates.slice(start, end);
  const tokens = ["G6","G9","G29","G42","G43","G44","G45","G38a","G30","G46","G47","G35","G36","S1","S2","S3"];
  for (const tok of tokens) {
    assert.ok(region.includes(tok), `vision prompt block missing token: ${tok}`);
  }
});

test("SKILL.md Step 7.2 names keystone_render + describe_image + cap 2", () => {
  const start = skill.indexOf("7.2 VISION");
  assert.ok(start !== -1, "Step 7.2 not found");
  let end = skill.indexOf("7.3", start);
  if (end === -1) end = skill.length;
  const block = skill.slice(start, end);
  assert.ok(block.includes("keystone_render"), "Step 7.2 missing keystone_render");
  assert.ok(block.includes("describe_image"), "Step 7.2 missing describe_image");
  assert.ok(block.includes("Cap: 2"), "Step 7.2 missing Cap: 2");
});

test("SKILL.md has no stale pending Plan 3", () => {
  assert.ok(!/pending Plan 3/.test(skill), "SKILL.md still contains 'pending Plan 3'");
});

test("gates.md vision Checker lines point to the vision pass", () => {
  assert.ok(!/vision: `describe_image`[\s\S]*?\(Plan 3\)/.test(gates),
    "a vision Checker line still references (Plan 3)");
});

test("engine.md documents the Plan-3 CLI flags + non-mutating orchestrator", () => {
  assert.ok(engine.includes("--render"), "engine.md missing --render");
  assert.ok(engine.includes("--viewports"), "engine.md missing --viewports");
  assert.ok(engine.includes("--log"), "engine.md missing --log");
  assert.match(engine, /does \*\*not\*\* mutate/i, "engine.md missing non-mutating statement");
});

// 8. Plan-4 structural assertions (audit verb wired to the real engine).

test("audit.md is wired to the real CLI (engine/audit.mjs)", () => {
  assert.match(audit, /node engine\/audit\.mjs/, "audit.md must reference the real CLI");
  assert.match(audit, /--allow-private/, "audit.md missing --allow-private");
  assert.match(audit, /--no-render/, "audit.md missing --no-render");
  assert.match(audit, /N\/A/, "audit.md must note the excluded gates as N/A");
});

test("audit.md describes the Tier-4 vision split (model-callable, not engine-called)", () => {
  assert.match(audit, /describe_image/, "audit.md must mention describe_image for Tier 4");
  assert.match(audit, /TIER 4/i, "audit.md must reference Tier 4");
  assert.match(audit, /never auto-fail alone/i, "audit.md must state Tier 4 never auto-fails alone");
});

test("engine.md has the audit-path section", () => {
  assert.match(engine, /## The audit path/, "engine.md missing the audit-path section");
  assert.match(engine, /engine\/audit\.mjs/, "engine.md audit path must reference the CLI");
  assert.match(engine, /assertSafeUrl/, "engine.md audit path must reference the SSRF guard");
});

test("SKILL.md audit section points at the real CLI + the vision split", () => {
  const start = skill.indexOf("## `keystone audit`");
  assert.ok(start !== -1, "SKILL.md missing the audit section");
  let end = skill.indexOf("## Output contract", start);
  if (end === -1) end = skill.length;
  const block = skill.slice(start, end);
  assert.match(block, /node engine\/audit\.mjs/, "SKILL.md audit section must reference the real CLI");
  assert.match(block, /describe_image/, "SKILL.md audit section must mention the vision pass");
  assert.match(block, /TIER 4/i, "SKILL.md audit section must reference Tier 4");
});

test("audit-report tier + effort maps cover all 13 implemented gates", () => {
  const implemented = [1, 2, 3, 7, 22, 26, 34, 40, 41, 44, 48, 50, 54];
  for (const g of implemented) {
    assert.ok(g in TIER_MAP, `gate ${g} has no tier`);
    assert.ok(g in EFFORT_MAP, `gate ${g} has no effort`);
  }
});

test("audit excludes G8 + G32 (diversification — meaningless on external code)", () => {
  const nums = EXCLUDED_GATES.map((e) => e.gate).sort((a, b) => a - b);
  assert.deepEqual(nums, [8, 32]);
});
