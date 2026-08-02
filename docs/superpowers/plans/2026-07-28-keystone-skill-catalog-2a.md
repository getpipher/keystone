# Keystone Skill Catalog (Plan 2a — Structure Layer) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `skills/keystone/` catalog structure layer — SKILL.md orchestrator, the 58-gate `gates.md` annotated with executable checkers (the original moat), `engine.md`, 7 discipline references, 4 genres, 21 macrostructures, 50 component archetypes, the audit verb, 8 theme tokens-only stubs, NOTICE + LICENSE + README — so a `keystone build` can load the skill and run the engine-verified Step 7. The 8 deep theme *prose* specs (signature moves, voice fixtures, anti-patterns) are deferred to Plan 2b; 2a ships each theme as a tokens-only stub with the 3 diversification axes + macrostructure affinity, exactly Hallmark's 16-shallow pattern.

**Architecture:** One pi-package (`@getpipher/keystone`), three execution tiers — Skill (markdown the model reads, `skills/keystone/`) · Engine (deterministic Node gate checkers, `engine/` — already shipped in Phase 1) · Extension (Playwright render, `extensions/render.ts` — already shipped). Plan 2a adds ONLY the Skill tier; it does not touch `engine/` or `extensions/`. The catalog is a curated rewrite of Hallmark's taxonomy (github.com/Nutlope/hallmark, MIT): reuse the 21 macro names + 50 archetype codes + 58 gate concepts + 4 genres + 7-step skeleton; rewrite ALL prose in Keystone's terse engine-aware voice; add the checker annotations (the `how it's checked`) as our original contribution. Credited in NOTICE.

**Tech Stack:** Markdown (skill references, no build step). Node `node:test` for the structural lint. ESM `.mjs` for the lint script. 2-space indent, standard semicolons, trailing newline at EOF (fixes the Phase-1 minor).

## Global Constraints

- **pi-first** — skill + extension in one `@getpipher/keystone` package; `package.json` already has `pi.skills: ["./skills"]` + `pi.extensions: ["./extensions/render.ts"]`. Do NOT change the manifest.
- **Do NOT touch `engine/` or `extensions/`** — Plan 2a adds `skills/keystone/` only. Gate checker annotations in `gates.md` cross-reference existing engine files; if a gate's checker doesn't exist yet (Plan 1b / Plan 3), annotate it as such — do not write the checker.
- **Curated rewrite** — reuse taxonomy (the *what*), rewrite all expression (the *how it's said*), add checker annotations (the *how it's checked*). Never copy Hallmark prose verbatim except short factual labels (macro names, archetype codes). Preserve ALL information density — this is not a lossy summary.
- **Keystone voice** — terse, engine-aware. Every gate cross-refs its checker. Every theme states its 3 diversification axes at the top. Every macro/archetype cross-refs the gates that police it where relevant. No Hallmark "imagine the render" language — the engine renders.
- **MIT + NOTICE** crediting Hallmark as taxonomy origin. LICENSE = standard MIT (RECTOR, 2026). NOTICE = the attribution paragraph.
- **2-space indent**, standard semicolons in `.mjs`, **trailing newline at EOF** in every file.
- **No AI attribution** anywhere. Author RECTOR `<rector@rectorspace.com>`, GPG `BF47B9DC1FA320FA`.
- **One commit per logical unit** (per task or per cohesive batch). Branch `feat/skill-catalog-2a` off `master` (8f90288).
- **Hallmark source** lives at `/tmp/hallmark/skills/hallmark/` for the duration of this plan. If missing, re-clone: `git clone https://github.com/Nutlope/hallmark /tmp/hallmark`.

## File Structure

```
skills/keystone/
├── SKILL.md                          # orchestrator (~380 lines) — Task 18
└── references/
    ├── engine.md                     # how the engine works — Task 2
    ├── gates.md                      # 58 gates × checker annotation (THE MOAT) — Task 3
    ├── anti-patterns.md              # named tells — Task 4
    ├── typography.md                 # — Task 5
    ├── color.md                      # — Task 5
    ├── copy.md                       # — Task 5
    ├── motion.md                     # — Task 6
    ├── layout-and-space.md           # — Task 6
    ├── responsive.md                 # — Task 6
    ├── macrostructures.md            # index of 21 — Task 8
    ├── macrostructures/01..21-*.md   # 21 per-macro files — Tasks 8-10
    ├── component-cookbook.md         # index of 50 + routing + knobs — Task 11
    ├── components/*.md               # 50 archetype files — Tasks 12-15
    ├── genres/{editorial,modern-minimal,atmospheric,playful}.md  # — Task 7
    ├── themes/{midnight,cobalt,garden,hum,specimen,manifesto,terminal,riso}.md  # stubs — Task 17
    └── verbs/
        ├── audit.md                  # v1 full — Task 16
        └── redesign.md               # v2 stub — Task 1
LICENSE                               # MIT — Task 1
NOTICE                                # Hallmark credit — Task 1
README.md                             # updated — Task 1
test/lint-skill.mjs                   # structural lint — Task 19
```

## How to read this plan (for the markdown-authoring tasks)

This is a **writing plan**, not a code plan. The "implementation" is markdown prose. The TDD anchor is the **structural lint** (`test/lint-skill.mjs`, Task 19) which validates cross-file consistency — every gate has a checker annotation, every theme stub has the required fields, macro slugs are stable, component codes are stable. Per-task verification is: file exists + `grep` for required sections/cross-refs + commit. The integration lint at Task 19 is the acceptance gate for the whole layer.

Each markdown task specifies: **exact path(s)**, **Hallmark source path(s)** to rewrite from, **required section outline** (the structural "code block"), **cross-refs it must carry**, and **acceptance grep**. The subagent writes the prose from the source + outline + voice rules. For the CIPHER-original files (`gates.md`, `engine.md`, `SKILL.md`), the outline is fuller since there is no direct Hallmark source.

---

### Task 1: Scaffold + LICENSE + NOTICE + README + redesign stub + manifest verify

**Files:**
- Create: `skills/keystone/` (dir tree: `references/{macrostructures,components,themes,genres,verbs}/`)
- Create: `LICENSE`, `NOTICE`, `skills/keystone/references/verbs/redesign.md`
- Modify: `README.md`
- Verify: `package.json` (no change — confirm `pi.skills` points to `./skills`)

**Interfaces:**
- Produces: the directory tree every later task writes into; the MIT + attribution files; the stale-README fix (Phase-1 known minor).

- [ ] **Step 1: Create the branch**

```bash
cd /Users/rector/local-dev/getpipher/keystone
git checkout -b feat/skill-catalog-2a master
mkdir -p skills/keystone/references/{macrostructures,components,themes,genres,verbs}
```

- [ ] **Step 2: Write `LICENSE`**

Standard MIT, copyright holder "RECTOR", year 2026. Exact text:

```
MIT License

Copyright (c) 2026 RECTOR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: Write `NOTICE`**

```
@getpipher/keystone — Anti-AI-slop design skill with an executable gate engine.

Copyright (c) 2026 RECTOR. Licensed under the MIT License (see LICENSE).

———

ATTRIBUTION

Keystone's design taxonomy — the 21 macrostructure names, the 50 component
archetype codes (H1–H9, S1–S5, F1–F6, C1–C4, T1–T4, Ft1–Ft8, N1–N13), the 58
anti-slop gate concepts, the 4 genres (editorial / modern-minimal /
atmospheric / playful), and the 7-step build-flow skeleton — is derived from
Hallmark (https://github.com/Nutlope/hallmark), authored by Hasan El Hajji
(@Nutlope) and contributors, released under the MIT License.

Per the curated-rewrite policy in Keystone's design spec:
  - Macrostructure NAMES and archetype CODES are reused (stable IDs / factual
    labels).
  - All prose is rewritten in Keystone's own voice.
  - The executable gate-checker annotations, the enforcement engine, the
    Playwright render extension, the 8 deep theme specifications, and the
    engine-verified Step 7 loop are Keystone's original contribution.

Hallmark's MIT license is preserved at /tmp/hallmark/LICENSE and acknowledged
here with thanks. See README § "How Keystone relates to Hallmark" for the
full relationship.
```

- [ ] **Step 4: Write `skills/keystone/references/verbs/redesign.md` (v2 stub)**

```markdown
# `keystone redesign` (v2 — not yet implemented)

**Status:** Planned for Keystone v2. Not shipped in v1.

`keystone redesign <target>` will take an existing page's content and intent
and rebuild the visual/interaction layer inside the existing implementation
boundaries (preserve routes, component ownership, copy intent, brand, IA;
replace only the visual/interaction layer). It reuses the Build flow's engine
at Step 7.

Until v2, use the default `keystone build` verb (build fresh) or `keystone
audit` (read-only punch list, then fix manually).
```

- [ ] **Step 5: Rewrite top-level `README.md`**

The current README says "Status: engine in development" — stale (engine-v0.1.0 shipped). Replace with an accurate overview. Structure:

```markdown
# @getpipher/keystone

Anti-AI-slop design skill with an **executable gate engine**. Beats Hallmark
by *enforcing* its gates instead of imagining them.

## Status

| Layer | Version | What |
|---|---|---|
| Engine | v0.1.0 ✅ | 13 deterministic gates + Playwright render extension + CLI (merged, PR #1) |
| Skill catalog | in development | SKILL.md + references/ (this branch) |
| Vision pass | planned | @getpipher/vision integration (Plan 3) |

## What it does

`keystone build` runs a 7-step design flow. Step 7 is the differentiator:
instead of the model claiming "58/58 ✓" on its honor, a real Node engine
parses the emitted HTML/CSS, a real headless Chromium renders it at exact CSS
px, real APCA math scores contrast, and a vision model answers "does this
look AI-generated?" on a real screenshot. The report is openable. Failures
are declared, never silently claimed.

`keystone audit <path|URL>` points the same engine at someone else's code —
a read-only ranked punch list with computed APCA numbers and real file:line
evidence.

## How Keystone relates to Hallmark

Hallmark (github.com/Nutlope/hallmark, MIT) encodes a tight anti-slop rule-set
but its gates are prose — the model "imagines the render" and self-grades.
Keystone reuses Hallmark's taxonomy (21 macrostructures, 50 archetypes, 58
gates, 4 genres, 7-step skeleton) and makes the gates executable. See NOTICE
for full attribution.

## Install (pi)

```bash
pi install npm:@getpipher/keystone
```

Exposes the `keystone` skill + the `keystone_render` tool.

## Repo

Private during development. Public flip + npm publish in Plan 5.
```

- [ ] **Step 6: Verify manifest untouched + tree created**

```bash
grep -A3 '"pi"' package.json   # confirm skills: ["./skills"] still present
find skills/keystone -type d   # confirm the 5 reference subdirs exist
```

- [ ] **Step 7: Commit**

```bash
git add LICENSE NOTICE README.md skills/keystone/references/verbs/redesign.md
git commit -m "chore: scaffold skill catalog + LICENSE + NOTICE + README"
```

---

### Task 2: `references/engine.md` — how the enforcement engine works

**Files:**
- Create: `skills/keystone/references/engine.md`
- Read (for accuracy): `engine/README.md`, `engine/orchestrate.mjs`, `engine/check-gates.mjs`, `engine/types.mjs`, `engine/gates/*.mjs`, `extensions/render.ts`

**Interfaces:**
- Consumes: the engine's actual API (CLI flags, gate file names, report shape) — read the files, don't guess.
- Produces: the document `SKILL.md` Step 7 and `gates.md` both link to as `references/engine.md`. The model reads this to orchestrate the iterate-until-pass loop.

- [ ] **Step 1: Read the engine to document it accurately**

```bash
cat engine/README.md engine/types.mjs
head -60 engine/orchestrate.mjs engine/check-gates.mjs
ls engine/gates/
```

- [ ] **Step 2: Write `references/engine.md`**

Required section outline (Keystone voice — terse, factual, engine-aware):

```markdown
# The Keystone engine

How the executable gate engine works. The model reads this to orchestrate
Step 7 (the engine-verified slop test). For the gate definitions themselves,
see gates.md. For the render extension, see the render tool.

## Three tiers (recap)

| Tier | What | Where | Runs via |
|---|---|---|---|
| Skill | rule-set, catalog, gate definitions | skills/keystone/ | the model reads it |
| Engine | deterministic gate checkers (math + DOM + CSS parse) | engine/ | `node engine/check-gates.mjs` (bash) |
| Extension | headless render + screenshot + computed-styles dump | extensions/render.ts | the `keystone_render` tool |

## The deterministic gates (Phase 1 — shipped)

13 gates are implemented as detector modules in engine/gates/:

| Gate | File | What it checks |
|---|---|---|
| G1 banned fonts | g1-banned-fonts.mjs | font-family vs ban list |
| G2 gradient text | g2-gradient-text.mjs | background-clip:text + linear-gradient co-occurring |
| G3 three-col cards | g3-three-col-cards.mjs | grid-template-columns: 1fr 1fr 1fr with card children |
| G7 pure black/white | g7-pure-black-white.mjs | color tokens for #000/#fff/oklch(0 0 0)/oklch(100 0 0) |
| G8/32 diversification | g8-32-diversification.mjs | CSS stamp vs .keystone/log.json last entries |
| G22 zero-chroma | g22-zero-chroma.mjs | oklch(L 0 H) in neutral/surface role |
| G26 missing states | g26-missing-states.mjs | :hover/:focus-visible/:active/:disabled per interactive selector |
| G34 horizontal scroll | g34-horizontal-scroll.mjs | Playwright: scrollWidth > innerWidth per viewport |
| G40-41 contrast | g40-41-contrast.mjs | APCA Lc + WCAG ratio on computed color/bg pairs |
| G44 hero fit | g44-hero-fit.mjs | Playwright 1280x800: hero bounding rect within innerHeight |
| G48 token improvisation | g48-token-improvisation.mjs | color/font-family decls outside :root referencing non-var() values |
| G50 image-grid minmax | g50-image-grid-minmax.mjs | 1fr grid track with <img> without minmax(0,1fr) |
| G54 tag-left/heading-right | g54-tag-left-heading-right.mjs | section head wrapper with eyebrow+heading AND grid-template-columns != 1fr |

The remaining ~28 deterministic gates (G4-6, G9-21, G23-25, G27-33, G35-39,
G42-43, G45-47, G49, G51-53, G55-57) ship in Plan 1b following the same
detector pattern. Vision gates (~18: G6/G29/G42/G43/G44-vis/G45/G30/G46/G47-vis/
G35-vis/G38a/S1-S3) ship in Plan 3 with the @getpipher/vision integration.

## The CLI

\`\`\`bash
node engine/check-gates.mjs --html <path> --css <path> --out <dir> \
  [--log .keystone/log.json] [--viewports 1280,375,320,414,768]
\`\`\`

Writes keystone-report.json + keystone-report.html to --out. Phase-1 CLI runs
the 11 CSS/HTML-only gates; the 2 Playwright gates (G34, G44) and the contrast
gates (G40-41) consume a render dump passed via --render/--viewports (Plan 3
wires the flags; until then pass the dump directly).

## The render extension

\`\`\`
keystone_render({ htmlPath, viewports?: [1280, 375, 320, 414, 768] })
  -> { screenshots: [{ width, path }], computedStyles: <path>, domSnapshot: <path> }
\`\`\`

Headless Chromium at exact CSS px. Returns screenshot paths + a computed-styles
dump + a DOM snapshot. Does NOT do contrast math or gate-checking — that's
check-gates.mjs. The extension is thin on purpose: rare updates when gates
change.

## The iterate-until-pass loop (Step 7)

7.1 DETERMINISTIC — run check-gates.mjs. If any Det gate FAILs, read the
    fix suggestions, apply, re-emit, re-run. Cap: 3 iterations.
7.2 VISION — keystone_render at [1280, 375], then describe_image with the
    18 vision-gate questions. If any Vis gate FAILs, fix, re-render, re-vision.
    Cap: 2 iterations. (Plan 3.)
7.3 RESOLUTION — 58/58 -> "58/58 (engine-verified) — ./keystone-report.html".
    Failures remain -> "N/58 — fails: <#s> (engine-verified)". Ship with
    declared failures, never silently claim pass.
7.4 STAMP + LOG — CSS stamp: /* Keystone · macrostructure: <name> · ... ·
    gates: 58/58 engine-verified */; append .keystone/log.json.

## The report

keystone-report.html is openable in a browser: PASS N/58, FAIL N/58, each
FAIL row with gate # + name + exact file:line or selector + evidence value +
fix suggestion + screenshots.

## Known Plan-3 deferrals (do not fix in Plan 2)

- RGB->OKLCH conversion (render returns RGB computed styles; G40-41 expects OKLCH)
- --render/--viewports/--log CLI flags (CLI currently runs only 11 gates)
- orchestrator ctx mutation (orchestrate.mjs mutates input ctx — matters for the iterate loop)
```

Adapt the table rows to match what you actually read in `engine/gates/` — the file names above are the source of truth; if a filename differs, use the real one.

- [ ] **Step 3: Verify + commit**

```bash
test -f skills/keystone/references/engine.md && grep -c '^## ' skills/keystone/references/engine.md  # expect >= 5
git add skills/keystone/references/engine.md
git commit -m "docs(skill): engine.md — how the enforcement engine works"
```

---

### Task 3: `references/gates.md` — the 58 gates × checker annotations (THE MOAT)

**Files:**
- Create: `skills/keystone/references/gates.md`
- Source (gate concepts + prose to rewrite tighter): `/tmp/hallmark/skills/hallmark/references/slop-test.md`
- Source (gate→checker mapping): `docs/superpowers/specs/2026-07-27-keystone-design.md` §4 representative mapping table
- Source (engine reality): `engine/gates/*.mjs` filenames

**Interfaces:**
- Consumes: the 58 gate concepts from Hallmark's slop-test.md; the engine gate filenames.
- Produces: the single most important file in the catalog. Every gate entry has a `**Checker:**` line. `SKILL.md` Step 7 and every macro/archetype/theme cross-refs gates by number. The structural lint (Task 19) asserts every gate 1-58 has a checker annotation.

- [ ] **Step 1: Read the source + engine**

```bash
cat /tmp/hallmark/skills/hallmark/references/slop-test.md   # the 58 gates
ls engine/gates/                                              # which checkers exist
sed -n '1,200p' docs/superpowers/specs/2026-07-27-keystone-design.md | grep -A40 'gate → checker'
```

- [ ] **Step 2: Write `references/gates.md`**

Structure: intro + the pre-emit self-critique (6 axes, rewritten tighter) + the 58 gates grouped by the same categories Hallmark uses (Visual / Structural / Microinteractions / Variety / Implementation / Hero enrichment / Diversification / Layout-safety / Typography discipline / Input-state / Contrast & readability / Nav·footer·hero structural / Honest copy / Re-drawn chrome / Token discipline / Responsive-clickable / Mobile-responsiveness). **Every gate entry follows this exact shape:**

```
### G<N> · <name>
<one-line concept, rewritten tighter than Hallmark>
**Layer:** Deterministic | Vision | Det+Vis
**Checker:** `engine/gates/g<N>-<slug>.mjs` (shipped) | `engine/gates/g<N>-*.mjs` (Plan 1b) | vision: `describe_image` Q<N> (Plan 3) | manual (no checker — human judgment)
**Genre note:** <if any, else omit>
**The check:** <2-4 lines: what the checker actually does — the regex/DOM/computed-style/vision question>
**Fix:** <one-line fix suggestion>
```

The 13 shipped gates (G1/2/3/7/8/22/26/32/34/40-41/44/48/50/54) get `**Checker:** engine/gates/gN-slug.mjs (shipped)`. The ~28 deterministic-but-unimplemented gates get `**Checker:** engine/gates/gN-*.mjs (Plan 1b — detector pattern TBD)`. The ~18 vision gates get `**Checker:** vision: describe_image Q<N> (Plan 3)`. A handful (e.g. G57 studied-DNA-discarded) are `manual`.

Map every gate to its layer using spec §4's table as the authority. The 18 vision questions are enumerated in spec §4 ("The 18 vision-gate questions") — cross-ref them as Q1-Q18.

**The pre-emit self-critique section** (6 axes A-F): rewrite tighter. Keep the six axes (Philosophy/Hierarchy/Execution/Specificity/Restraint/Variety), the 1-5 scoring, the <3-triggers-revision rule, the stamp format adapted to Keystone: `/* Keystone · pre-emit critique: P5 H4 E5 S4 R5 V5 */`.

**Intro paragraph:** state the contract — "Every answer must be NO. Unlike Hallmark, you do not imagine the render — the engine renders. Gates marked Deterministic are checked by a script you cannot fool. Gates marked Vision are checked by a vision model on a real screenshot. Gates marked manual are the only ones on your honor; they are few."

- [ ] **Step 3: Verify every gate 1-58 is present with a checker line**

```bash
for n in $(seq 1 58); do grep -q "^### G${n}\b\|^### G${n} " skills/keystone/references/gates.md || echo "MISSING G${n}"; done
grep -c '^\*\*Checker:\*\*' skills/keystone/references/gates.md   # expect >= 58 (some gates share a checker file e.g. G40-41)
```

- [ ] **Step 4: Commit**

```bash
git add skills/keystone/references/gates.md
git commit -m "docs(skill): gates.md — 58 gates annotated with executable checkers"
```

---

### Task 4: `references/anti-patterns.md` — the named tells

**Files:**
- Create: `skills/keystone/references/anti-patterns.md`
- Source: `/tmp/hallmark/skills/hallmark/references/anti-patterns.md` (418 lines, ~30 named tells grouped Critical/Major/Minor)

**Interfaces:**
- Consumes: gate numbers from gates.md (each anti-pattern cross-refs the gate that catches it).
- Produces: the named-tells reference SKILL.md loads eagerly. Each tell links to its gate.

- [ ] **Step 1: Write `references/anti-patterns.md`**

Rewrite tighter than Hallmark's 418 lines — target ~250-300. Keep the Critical/Major/Minor grouping and every named tell (purple-gradient hero, Inter-everywhere, 3-col grid, card-in-card, gradient headline, side-stripe, centred hero, pure b/w, default-attractor, Specimen fall-through, AI nav, AI footer, aurora-blob, floating-orb, sound-on autoplay, lazy-LCP, bounce easing, centred-everything, italic headers, eyebrow-on-every-section, shadow-glow, icon-tile card, glassmorphism, hover-only, non-tabular-nums, scroll-animate-everything, mismatched icons, etc.). **Each tell gains a `→ gate GN` cross-ref** (the original contribution). Voice: terse, declarative.

- [ ] **Step 2: Verify + commit**

```bash
grep -c '→ gate G' skills/keystone/references/anti-patterns.md   # expect >= 20 cross-refs
git add skills/keystone/references/anti-patterns.md
git commit -m "docs(skill): anti-patterns.md — named tells with gate cross-refs"
```

---

### Task 5: `references/typography.md` + `references/color.md` + `references/copy.md`

**Files:**
- Create: `skills/keystone/references/typography.md`, `color.md`, `copy.md`
- Sources: `/tmp/hallmark/skills/hallmark/references/{typography,color,copy}.md`

**Interfaces:**
- Consumes: gate numbers (G1 banned fonts, G37 2+1 rule, G38a italic headers, G48 token discipline, G40-41 contrast, G7 pure b/w, G22 zero-chroma, G23 accent footprint, G19 placeholder names).
- Produces: three of the seven load-per-build discipline files.

- [ ] **Step 1: Write the three files**

Rewrite each tighter, preserving every section's information. Required section outlines (match Hallmark's headings, condense prose, add gate cross-refs):

`typography.md`: # Typography > ## Principles > ## The 2+1 rule (→ G37) > ## Banned defaults (→ G1) > ## The font catalog (free display / free body / free mono — keep the actual font names: Space Grotesk, Geist, Plus Jakarta Sans, Newsreader, Fraunces, Source Serif 4, JetBrains Mono, IBM Plex Mono, Anton, Bricolage Grotesque, etc.) > ## Tone-based pairing patterns > ## Wordmark/logo typography > ## Scale > ## Hero headline sizing (match size to copy length — keep the char brackets) > ## Weights > ## Required features > ## Body text rules > ## Headings rules (→ G38a no italic) > ## Bans.

`color.md`: # Colour > ## Principles > ## Palette construction (OKLCH) > ## Contrast (→ G40-41) > ## Dark mode recipe > ## Bans (→ G7, G22) > ## Use of the accent (→ G23). Target ~70 lines (Hallmark is 95).

`copy.md`: # Copy > ## Principles > ## Buttons > ## Error messages > ## Empty states > ## Loading > ## Microcopy bans > ## Proper typography > ## Voice samples per tone (editorial/brutalist/soft/technical/luxury/playful/austere — keep all 7) > ## Banned opening lines (→ G19 placeholder names, G46 invented metrics).

- [ ] **Step 2: Verify + commit**

```bash
for f in typography color copy; do grep -q '^# ' skills/keystone/references/$f.md && echo "$f ok"; done
git add skills/keystone/references/typography.md skills/keystone/references/color.md skills/keystone/references/copy.md
git commit -m "docs(skill): typography + color + copy references"
```

---

### Task 6: `references/motion.md` + `references/layout-and-space.md` + `references/responsive.md`

**Files:**
- Create: `skills/keystone/references/{motion,layout-and-space,responsive}.md`
- Sources: `/tmp/hallmark/skills/hallmark/references/{motion,layout-and-space,responsive}.md`

**Interfaces:**
- Consumes: gate numbers (G10 transition-all, G11 hover-scale, G12 bounce easing, G13 multi-hover, G14 animate layout props, G15 focus-ring fade, G16 celebratory toast, G17 tooltip delays, G18 pause-on-hover, G27 reduced-motion, G24 spacing scale, G25 max-width, G34 horizontal scroll, G49 two-line clickables, G50 minmax, G51 overflow-wrap, G52 section-head collapse, G53 radio-tab jump, G55 cap-collision, G56 sticky bleed).

- [ ] **Step 1: Write the three files**

`motion.md`: # Motion > ## Principles > ## Easings (the 3 named + ban list → G12) > ## Durations > ## Page-load orchestration > ## Scroll-linked motion > ## State transitions (→ G13, G15, G16, G17) > ## Reduced motion (→ G27) > ## Bans (→ G10, G11, G14). Target ~85 lines.

`layout-and-space.md`: # Layout and space > ## Principles > ## The spacing scale (4pt, → G24) > ## Grids > ## Asymmetry techniques > ## Depth > ## Bans > ## Page-edge clipping (overflow-x: clip on html+body → G34) > ## When in doubt. Target ~90 lines.

`responsive.md`: # Responsive > ## Mobile — non-negotiable (→ G34, G49, G50-57) > ## Principles > ## Breakpoints (60rem layout / 40rem type) > ## Fluid scaling > ## Pointer and hover queries > ## Clickable text — never wraps (→ G49) > ## Viewport units > ## Safe areas > ## Tables on small screens > ## Images > ## Internationalisation > ## Bans. Target ~110 lines.

- [ ] **Step 2: Verify + commit**

```bash
for f in motion layout-and-space responsive; do grep -q '^# ' skills/keystone/references/$f.md && echo "$f ok"; done
git add skills/keystone/references/motion.md skills/keystone/references/layout-and-space.md skills/keystone/references/responsive.md
git commit -m "docs(skill): motion + layout-and-space + responsive references"
```

---

### Task 7: `references/genres/` — 4 genre files

**Files:**
- Create: `skills/keystone/references/genres/{editorial,modern-minimal,atmospheric,playful}.md`
- Sources: `/tmp/hallmark/skills/hallmark/references/genres/{editorial,modern-minimal,atmospheric,playful}.md` (~70 lines each)

**Interfaces:**
- Produces: the 4 genre files SKILL.md Step 1 loads eagerly. Each scopes theme rotation, gate overrides, voice.

- [ ] **Step 1: Write the 4 genre files**

Each keeps Hallmark's section shape: # Genre — <name> > ## When to pick it > ## Themes that belong (UPDATE to Keystone's 8: Midnight/Cobalt/Garden/Hum/Specimen/Manifesto/Terminal/Riso — map each to its genre per spec §7) > ## Voice > ## What this genre allows (gate overrides — state them with gate numbers) > ## What this genre disallows > ## Voice fixtures > ## Nav and footer voice (cross-ref component-cookbook routing) > ## Stamp signature > ## Reference register. Target ~60 lines each.

Genre→theme mapping (from spec §7): editorial → Garden, Specimen, Manifesto, Riso. modern-minimal → Cobalt. atmospheric → Midnight. playful → Hum. Terminal spans atmospheric-adjacent (note in its stub). State the mapping in each genre's "Themes that belong" — if a genre has only one theme in v1, say so and note Plan 2b adds depth not breadth.

- [ ] **Step 2: Verify + commit**

```bash
ls skills/keystone/references/genres/   # expect 4 files
git add skills/keystone/references/genres/
git commit -m "docs(skill): 4 genre references (editorial/modern-minimal/atmospheric/playful)"
```

---

### Task 8: `references/macrostructures.md` (index) + macros 01-07

**Files:**
- Create: `skills/keystone/references/macrostructures.md` + `macrostructures/{01-bento-grid,02-long-document,03-marquee-hero,04-stat-led,05-workbench,06-conversational-faq,07-manifesto}.md`
- Sources: `/tmp/hallmark/skills/hallmark/references/macrostructures.md` (89-line index) + `macrostructures/0N-*.md` (~23-35 lines each)

**Interfaces:**
- Produces: the 21-macro index SKILL.md Step 2 reads, + the first 7 per-macro files. Macro slugs are STABLE (the diversification stamp reads `<name>`; lint asserts the 21 slugs).

- [ ] **Step 1: Write the index `macrostructures.md`**

Rewrite Hallmark's 89-line index tighter. Sections: # Macrostructures > ## Diversification rule (→ G8, G32; reads `/* Keystone · macrostructure: <name> */` stamp + `.keystone/log.json`) > ## Hero polish patterns (HP1-HP4 — keep) > ## Nav and footer voice (cross-ref component-cookbook.md routing) > ## The 21 macrostructures — index (one-line-per-macro, KEEP the 21 names verbatim: Bento Grid, Long Document, Marquee Hero, Stat-Led, Workbench, Conversational FAQ, Manifesto, Photographic, Quote-Led, Specimen, Catalogue, Letter, Index-First, Narrative Workflow, Split Studio, Feature Stack, Type Specimen, Portfolio Grid, Map/Diagram, Ecosystem Index, Component Playground) > ## SaaS page sequence > ## How to pick. Change `Hallmark` → `Keystone` in all stamps/examples.

- [ ] **Step 2: Write macros 01-07**

Each per-macro file keeps Hallmark's shape: ## NN · <Name> > one-line concept > 6 structural axes (Heading/Body/Divider/Button/Image/Reveal) > Reach for it when > Avoid for > Reference > Sample opening lines > HTML sketch. Rewrite prose tighter (~25-35 lines each). Add a `**Gates that police this macro:** G<N>, G<N>` line where relevant (e.g. Stat-Led → G46 invented metrics; Manifesto → G55 cap-collision; Bento → G3 no-3-col).

- [ ] **Step 3: Verify + commit**

```bash
ls skills/keystone/references/macrostructures/ | wc -l   # expect 7 so far
grep -c '## 0' skills/keystone/references/macrostructures.md            # expect 21 index lines... actually grep the 21 names
git add skills/keystone/references/macrostructures.md skills/keystone/references/macrostructures/0[1-7]-*.md
git commit -m "docs(skill): macrostructures index + macros 01-07"
```

---

### Task 9: macros 08-14

**Files:**
- Create: `skills/keystone/references/macrostructures/{08-photographic,09-quote-led,10-specimen,11-catalogue,12-letter,13-index-first,14-narrative-workflow}.md`
- Sources: `/tmp/hallmark/skills/hallmark/references/macrostructures/{08-photographic,09-quote-led,10-specimen,11-catalogue,12-letter,13-index-first,14-narrative-workflow}.md`

- [ ] **Step 1: Write macros 08-14** — same shape as Task 8 Step 2. Specimen → note the fall-through ban (→ G21). Catalogue → G54 tag-left. Letter → none special.

- [ ] **Step 2: Verify + commit**

```bash
ls skills/keystone/references/macrostructures/ | wc -l   # expect 14
git add skills/keystone/references/macrostructures/0[8-9]-*.md skills/keystone/references/macrostructures/1[0-4]-*.md
git commit -m "docs(skill): macros 08-14"
```

---

### Task 10: macros 15-21

**Files:**
- Create: `skills/keystone/references/macrostructures/{15-split-studio,16-feature-stack,17-type-specimen,18-portfolio-grid,19-map-diagram,20-ecosystem-index,21-component-playground}.md`
- Sources: corresponding Hallmark files.

- [ ] **Step 1: Write macros 15-21** — same shape. Feature Stack → G56 sticky bleed. Type Specimen → G37 2+1.

- [ ] **Step 2: Verify all 21 present + commit**

```bash
ls skills/keystone/references/macrostructures/*.md | wc -l   # expect 21
git add skills/keystone/references/macrostructures/1[5-9]-*.md skills/keystone/references/macrostructures/2[0-1]-*.md
git commit -m "docs(skill): macros 15-21 (macrostructure set complete)"
```

---

### Task 11: `references/component-cookbook.md` (index of 50)

**Files:**
- Create: `skills/keystone/references/component-cookbook.md`
- Source: `/tmp/hallmark/skills/hallmark/references/component-cookbook.md` (265 lines)

**Interfaces:**
- Produces: the 50-archetype index + routing tables + variation-knob tables + mobile-collapse table. SKILL.md Step 2 reads this to pick nav/footer/archetype codes. Component codes (H1-H9, S1-S5, F1-F6, C1-C4, T1-T4, Ft1-Ft8, N1/N1a/N1b/N2-N13) are STABLE; lint asserts them.

- [ ] **Step 1: Write `component-cookbook.md`**

Rewrite Hallmark's 265 lines tighter — target ~200. Keep EVERY section: # Component cookbook > ## Archetype index (all 50, grouped Heroes/Section heads/Feature blocks/CTAs/Testimonials/Footers/Navigation — KEEP the 50 codes + names verbatim, rewrite the one-liners) > ## Within-archetype variation knobs (the full knob table — keep all rows) > ## Routing — which footer fits which genre (UPDATE genre→footer defaults for Keystone's 4 genres) > ## Routing — which nav fits which genre/theme (UPDATE for Keystone's 8 themes) > ## Picking from this file > ## Mobile collapse — per archetype (the full table — keep). Change `Hallmark` → `Keystone`.

- [ ] **Step 2: Verify + commit**

```bash
grep -cE '^\*\*(H[1-9]|S[1-5]|F[1-6]|C[1-4]|T[1-4]|Ft[1-8]|N[1-9]|N1[0-3])' skills/keystone/references/component-cookbook.md   # expect ~50
git add skills/keystone/references/component-cookbook.md
git commit -m "docs(skill): component-cookbook.md — 50 archetype index + routing + knobs"
```

---

### Task 12: components — Heroes H1-H9 (9 files)

**Files:**
- Create: `skills/keystone/references/components/{h1-marquee,h2-split-diptych,h3-quote-led,h4-stat-led,h5-letter-hero,h6-photographic-fold,h7-demo-video-clipped-by-viewport-edge,h8-mockup-split-browser-framed,h9-custom-illustration-centerpiece}.md`
- Sources: corresponding Hallmark files (8-27 lines each)

- [ ] **Step 1: Write the 9 hero archetype files**

Each keeps Hallmark's shape: ### <code> · <Name> > one-line concept > *Use when:* > *Don't confuse with:* > HTML sketch > CSS sketch. Rewrite prose tighter. Add a `**Gates:** G<N>` line where the archetype has a direct gate (H4 Stat-Led → G46; H7 clipped → G34; H8 mockup → G47 re-drawn chrome; H9 illustration → G30 icon tells, G45 decorative-without-purpose).

- [ ] **Step 2: Verify + commit**

```bash
ls skills/keystone/references/components/h*.md | wc -l   # expect 9
git add skills/keystone/references/components/h*.md
git commit -m "docs(skill): hero archetypes H1-H9"
```

---

### Task 13: components — Section heads S1-S5 + Features F1-F6 (11 files)

**Files:**
- Create: `skills/keystone/references/components/{s1-left-margin-numbered,s2-hanging,s3-sticky-pinned,s4-inline-no-break,s5-bottom-anchored,f1-bento-grid,f2-sticky-scroll-stack,f3-tabular-spec-sheet,f4-step-sequence,f5-annotated-screenshot,f6-product-card-grid}.md`
- Sources: corresponding Hallmark files (11-41 lines each)

- [ ] **Step 1: Write the 11 files** — same shape. Gates: S1 left-margin-numbered → G54 (tag-left ban — note the flatten rule); F1 Bento → G3 (no equal 3-col); F2 sticky-scroll → G56 sticky bleed; F6 product card → G50 minmax.

- [ ] **Step 2: Verify + commit**

```bash
ls skills/keystone/references/components/{s,f}*.md | wc -l   # expect 11
git add skills/keystone/references/components/s*.md skills/keystone/references/components/f*.md
git commit -m "docs(skill): section head S1-S5 + feature F1-F6 archetypes"
```

---

### Task 14: components — CTAs C1-C4 + Testimonials T1-T4 + Footers Ft1-Ft8 (16 files)

**Files:**
- Create: `skills/keystone/references/components/{c1-outlined-chip,c2-inline-form-as-cta,c3-typographic-link,c4-sticky-bottom-bar,t1-pull-quote-with-marginalia,t2-logo-wall-hairline,t3-single-huge-quote,t4-numbered-stat-strip,ft1-mast-headed,ft2-inline-rule-single-line,ft3-index-style-category-list,ft4-dense-typographic,ft5-statement,ft6-letter-close,ft7-newsletter-first,ft8-marquee-scroll}.md`
- Sources: corresponding Hallmark files (8-27 lines each)

- [ ] **Step 1: Write the 16 files** — same shape. Gates: T4 stat strip → G46; Ft3 index → G43 (AI footer fingerprint — note the "default away from Ft3" rule).

- [ ] **Step 2: Verify + commit**

```bash
ls skills/keystone/references/components/{c,t,ft}*.md | wc -l   # expect 16
git add skills/keystone/references/components/c*.md skills/keystone/references/components/t*.md skills/keystone/references/components/ft*.md
git commit -m "docs(skill): CTA C1-C4 + testimonial T1-T4 + footer Ft1-Ft8 archetypes"
```

---

### Task 15: components — Navs N1/N1a/N1b + N2-N13 (14 files)

**Files:**
- Create: `skills/keystone/references/components/{n1-wordmark-2-links,n1b-saas-three-section,n2-floating-chip,n3-side-rail,n4-hidden-behind-k,n5-floating-pill,n6-newspaper-masthead,n7-brutal-slab,n8-terminal-command,n9-edge-aligned-minimal,n10-floating-on-scroll-morph,n11-mega-menu,n12-banner-retract,n13-inline-cmdk-pill}.md`
- Sources: corresponding Hallmark files (9-40 lines each)

- [ ] **Step 1: Write the 14 nav files** — same shape. Gates: N1/N1a → G42 (AI nav fingerprint — note "default away from N1a"); N8 terminal → allowed blinking cursor (G45 decorative-without-purpose exception).

- [ ] **Step 2: Verify all 50 components present + commit**

```bash
ls skills/keystone/references/components/*.md | wc -l   # expect 50
git add skills/keystone/references/components/n*.md
git commit -m "docs(skill): nav archetypes N1-N13 (component set complete: 50)"
```

---

### Task 16: `references/verbs/audit.md` — the audit verb (v1 full)

**Files:**
- Create: `skills/keystone/references/verbs/audit.md`
- Sources: `/tmp/hallmark/skills/hallmark/references/verbs/audit.md` (25 lines — Hallmark's is thin; Keystone's is fuller per spec §6) + `docs/superpowers/specs/2026-07-27-keystone-design.md` §6 (the audit verb spec — ranked punch list, severity tiers, path/URL modes, 52-gate count)

**Interfaces:**
- Produces: the audit verb reference SKILL.md links. Reuses the Build engine, read-only, no iterate loop.

- [ ] **Step 1: Write `verbs/audit.md`**

Structure (from spec §6): # `keystone audit` > ## What it does (read-only ranked punch list; same engine as Build's Step 7 pointed at external code; no edits, no iterate loop) > ## Build vs Audit (the table from spec §6 — 52 gates = 58 minus 6 diversification/stamp gates) > ## Two input modes (Path mode: local file(s) via file://; URL mode: Playwright navigates, adversarial-fetch safety — refuse private IPs/localhost/metadata endpoints/non-web schemes, same as Hallmark's study verb) > ## The audit report (ranked punch list — the 4 severity tiers from spec §6: Structural tells / Accessibility / Craft / Subjective; each FAIL row: gate# + name + file:line + evidence + fix + effort) > ## `--fix` deliberately NOT in v1 (blurs with redesign) > ## Run it: `keystone audit ./site` | `keystone audit https://app.com`. Target ~80 lines.

- [ ] **Step 2: Verify + commit**

```bash
test -f skills/keystone/references/verbs/audit.md && grep -q 'severity\|TIER' skills/keystone/references/verbs/audit.md
git add skills/keystone/references/verbs/audit.md
git commit -m "docs(skill): audit verb (v1 full — ranked punch list, path+URL modes)"
```

---

### Task 17: 8 theme tokens-only stubs

**Files:**
- Create: `skills/keystone/references/themes/{midnight,cobalt,garden,hum,specimen,manifesto,terminal,riso}.md`
- Sources (token values to reuse/rewrite): `/tmp/hallmark/skills/hallmark/references/themes/{cobalt,hum}.md` (Hallmark has 4 deep; we reuse Cobalt's + Hum's token values, rewrite the rest)

**Interfaces:**
- Produces: 8 theme stubs SKILL.md Step 2.6 loads. Each is tokens-only (NOT the full 11-section deep spec — that's Plan 2b). Each stub MUST contain: the 3 diversification axes at the top, paper/accent OKLCH + font pairing, macrostructure affinity (loves/rejects short lists), and a `> **Deep spec:** Plan 2b` marker. The lint (Task 19) asserts each stub has the axes + palette + fonts.

- [ ] **Step 1: Write the 8 stubs using these DERIVED token values (CIPHER-derived — re-derived per theme, not copied from Hallmark except Cobalt/Hum values which are good)**

Each stub follows this exact template (fill per-theme values from the table below):

```markdown
# Theme — <Name>

<one-line register — what this theme is for>

> **Deep spec (signature moves, voice fixtures, anti-patterns, worked example):** Plan 2b. This stub ships the tokens + axes + affinity only.

## Axes (diversification)

- **Paper band** — <dark|mid|light>
- **Display style** — <axis value>
- **Accent hue** — <axis value>

## Palette

\`\`\`css
:root[data-theme="<slug>"] {
  --color-paper:   oklch(<L>% <C> <H>);
  --color-paper-2: oklch(<L>% <C> <H>);
  --color-paper-3: oklch(<L>% <C> <H>);
  --color-ink:     oklch(<L>% <C> <H>);
  --color-accent:  oklch(<L>% <C> <H>);
  --color-accent-ink: oklch(<L>% <C> <H>);   /* text on accent fill */
  --color-focus:   oklch(<L>% <C> <H>);
  --font-display:  "<display face>", sans-serif;
  --font-body:     "<body face>", sans-serif;
  --font-mono:     "<mono face>", monospace;
}
\`\`\`

## Fonts (free)

- **Display:** <face> (Google Fonts / Vercel Geist)
- **Body:** <face>
- **Mono:** <face>

## Macrostructure affinity (short — full spec in Plan 2b)

**Loves:** <3-5 macros>. **Rejects:** <2-3 macros>.
```

The 8 themes' values:

| Theme | slug | paper band | display style | accent hue | paper | paper-2 | paper-3 | ink | accent | accent-ink | display font | body font | mono font |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Midnight | midnight | dark | geometric-sans | cool | 15% 0.02 260 | 20% 0.028 260 | 25% 0.035 260 | 96% 0.008 260 | 72% 0.17 200 | 15% 0.02 260 | Space Grotesk | Geist | Geist Mono |
| Cobalt | cobalt | light | grotesk-sans | cool | 99% 0.002 250 | 96% 0.004 250 | 92% 0.006 250 | 25% 0.01 250 | 55% 0.20 255 | 99% 0.002 250 | Space Grotesk | Geist | Geist Mono |
| Garden | garden | light | roman-serif | chromatic-green | 97% 0.015 120 | 94% 0.02 120 | 90% 0.025 120 | 22% 0.015 140 | 52% 0.13 145 | 98% 0.01 120 | Newsreader | Source Serif 4 | IBM Plex Mono |
| Hum | hum | light | rounded-sans | warm (multi) | 97% 0.012 95 | 94% 0.016 95 | 91% 0.020 95 | 20% 0.012 250 | 86% 0.18 95 (pear) + accent-2 66% 0.18 235 (cyan) + accent-3 68% 0.24 18 (coral) | 20% 0.012 250 | Plus Jakarta Sans | Plus Jakarta Sans | JetBrains Mono |
| Specimen | specimen | light | high-contrast-serif | neutral-warm | 96% 0.01 80 | 93% 0.012 80 | 89% 0.015 80 | 20% 0.01 60 | 58% 0.13 45 | 98% 0.01 80 | Fraunces | Source Serif 4 | IBM Plex Mono |
| Manifesto | manifesto | light (dark variant) | grotesk-sans (condensed) | neutral | 98% 0.004 0 | 94% 0.006 0 | 88% 0.008 0 | 15% 0.005 0 | 55% 0.08 25 | 98% 0.004 0 | Anton | Geist | Geist Mono |
| Terminal | terminal | dark | mono | phosphor | 13% 0.01 145 | 18% 0.012 145 | 23% 0.015 145 | 92% 0.02 145 | 78% 0.20 145 | 13% 0.01 145 | JetBrains Mono | JetBrains Mono | JetBrains Mono |
| Riso | riso | light | risograph-bold | chromatic-other | 95% 0.02 15 | 91% 0.025 15 | 87% 0.03 15 | 25% 0.03 30 | 68% 0.22 195 (cyan) + accent-2 65% 0.20 350 (magenta) | 25% 0.03 30 | Bricolage Grotesque | Geist | IBM Plex Mono |

**Affinity (short lists — pick from the 21 macros):**
- Midnight: loves Marquee Hero, Workbench, Stat-Led, Ecosystem Index; rejects Letter, Long Document.
- Cobalt: loves Bento Grid, Workbench, Stat-Led, Feature Stack; rejects Manifesto, Letter.
- Garden: loves Long Document, Catalogue, Letter, Specimen; rejects Marquee Hero, Workbench.
- Hum: loves Marquee Hero, Bento Grid, Stat-Led, Catalogue, Narrative Workflow; rejects Long Document, Manifesto, Quote-Led, Type Specimen, Photographic.
- Specimen: loves Specimen, Type Specimen, Catalogue, Index-First; rejects Workbench, Stat-Led (when editorial brief).
- Manifesto: loves Manifesto, Letter, Marquee Hero; rejects Bento Grid, Conversational FAQ.
- Terminal: loves Workbench, Component Playground, Index-First, Map/Diagram; rejects Letter, Photographic, Quote-Led.
- Riso: loves Catalogue, Portfolio Grid, Specimen, Split Studio; rejects Workbench, Stat-Led.

**Font availability note (put once at the bottom of the index, not each stub):** all fonts are free — Space Grotesk, Geist (Vercel), Plus Jakarta Sans, JetBrains Mono, IBM Plex Mono (Google Fonts); Newsreader, Source Serif 4, Fraunces, Anton, Bricolage Grotesque (Google Fonts).

- [ ] **Step 2: Verify + commit**

```bash
ls skills/keystone/references/themes/*.md | wc -l   # expect 8
for t in midnight cobalt garden hum specimen manifesto terminal riso; do grep -q "data-theme=\"$t\"" skills/keystone/references/themes/$t.md || echo "MISSING $t"; done
git add skills/keystone/references/themes/
git commit -m "docs(skill): 8 theme tokens-only stubs (deep spec deferred to Plan 2b)"
```

---

### Task 18: `skills/keystone/SKILL.md` — the orchestrator (capstone)

**Files:**
- Create: `skills/keystone/SKILL.md`
- Source (7-step skeleton to rewrite tighter): `/tmp/hallmark/skills/hallmark/SKILL.md` (558 lines — target ~380)
- Source (Step 7 engine loop): `docs/superpowers/specs/2026-07-27-keystone-design.md` §4-§5 + `references/engine.md` (Task 2)
- Source (gate definitions it cross-refs): `references/gates.md` (Task 3)

**Interfaces:**
- Produces: the pi skill entry point. `package.json` `pi.skills: ["./skills"]` → pi loads `skills/keystone/SKILL.md`. The model reads this to run `keystone build` / `keystone audit`.

- [ ] **Step 1: Write `SKILL.md`**

Frontmatter + body. Frontmatter:
```yaml
---
name: keystone
description: "Anti-AI-slop design skill with an executable gate engine. Use when building a new landing page or web page, auditing an existing site, or when the user invokes Keystone by name. Beats Hallmark by enforcing its gates with a real engine instead of imagining the render."
version: 0.1.0
---
```

Body structure (rewrite Hallmark's 7-step flow tighter; REPLACE Step 7 with the engine loop; DROP Component-scope flow, study verb, redesign verb, design.md flow, custom-theme full protocol — those are v2 or Plan-3; keep the catalog/custom fork dispatch but point custom to a short inline note since custom-theme.md is deferred). Target ~380 lines.

Sections:
1. **Intro** — what Keystone is, the thesis (gates executable not imagined), the 3 tiers in one paragraph. Link references/engine.md, references/gates.md. Cite Hallmark lineage in one line.
2. **How to use** — table: default (build) | `keystone audit <target>`. (redesign/study = v2, note omitted from the table, mentioned in a one-line "v2" footnote.)
3. **Disciplines that hold across every verb** — the 6 disciplines (pre-emit critique, honest copy, locked tokens, no re-drawn chrome, mobile responsiveness, no italic headers), each 2-3 lines, each cross-ref its gate(s). Rewrite Hallmark's version tighter.
4. **Build flow (default)** — the 7 steps, rewritten tighter:
   - **Step 0 · Pre-flight scan** — `.keystone/preflight.json` + `.keystone/log.json`; the 6 signal sources; preserve/introduce split. (Rewrite Hallmark's, change namespace `.hallmark`→`.keystone`.)
   - **Step 1 · Design-context gate** — always ask audience/use/tone; genre detect (4 genres, link genre files); theme route dispatch (catalog 8 / custom / studied-DNA-v2). State genre + macro + theme aloud.
   - **Step 2 · Pick a macrostructure FIRST** — read macrostructures.md index, load ONE per-macro file; diversification rule (→ G8, G32; reads stamp + log.json); pick nav + footer archetypes (read component-cookbook.md routing); state the rotation aloud.
   - **Step 2.5 · Check project memory** — read `.keystone/log.json` last 3-5; state rotation.
   - **Step 2.6 · Theme route** — catalog (8 themes, load the picked theme stub) / custom (short inline note — full custom-theme.md deferred) / studied-DNA (v2).
   - **Step 3 · Load the visual ruleset** — the eager/index-then-pick/conditional/load-at-end discipline. Crucially: **load gates.md at Step 3, NOT Step 7** (Keystone change — the model pre-empts gates by knowing the checker; Hallmark loads slop-test at Step 7). Each gate file annotated with its checker so the model pre-empts. Keep the lazy-load discipline (don't load all 50 components).
   - **Step 4 · Hero enrichment** — typography-only default; the image-need check; enrichment hierarchy (Tier A-E). (Rewrite Hallmark's, defer hero-enrichment.md / custom-craft.md / assets.md / imagery-kit.md to a note that they're TODO Plan 2b — for v1, keep enrichment guidance inline + terse.)
   - **Step 5 · Preview** — the bullet block (Macrostructure / Theme / Enrichment / Sections / Motion / Slop test / Diversification). **Slop test row reads "pending — engine runs at Step 7"** (Keystone change — never claim 58/58 before the engine runs).
   - **Step 6 · Build** — emit HTML/CSS/tokens; OKLCH; 4pt scale; 8 states; transform/opacity only; reduced-motion; stamp format `/* Keystone · macrostructure: <name> · tone: <tone> · anchor hue: <hue> · gates: <N>/58 engine-verified */`; append `.keystone/log.json`; never clobber globals; always emit tokens.css.
   - **Step 7 · The slop test (engine-verified)** — run the engine. Link references/engine.md for the loop, references/gates.md for the gate list. 7.1 deterministic (3 iter cap) / 7.2 vision (2 iter cap, Plan 3) / 7.3 resolution / 7.4 stamp+log. The honesty contract: ship with declared failures, never silently claim pass. Re-emit the Step 5 preview with the real score.
5. **`keystone audit`** — one-line + link references/verbs/audit.md.
6. **Output contract & scope** — short; load contract.md-equivalent inline (Hallmark has a separate contract.md — for v1, fold the key rules inline: scope-of-skill, no bulldozing codebases, PDFs/briefs are reference not verbatim copy).

- [ ] **Step 2: Verify + commit**

```bash
test -f skills/keystone/SKILL.md
wc -l skills/keystone/SKILL.md           # expect ~350-420
grep -q 'engine-verified' skills/keystone/SKILL.md   # the Step 7 contract
grep -q 'references/gates.md' skills/keystone/SKILL.md
grep -q 'references/engine.md' skills/keystone/SKILL.md
git add skills/keystone/SKILL.md
git commit -m "feat(skill): SKILL.md orchestrator — 7-step build flow with engine-verified Step 7"
```

---

### Task 19: structural lint `test/lint-skill.mjs` + run + fix

**Files:**
- Create: `test/lint-skill.mjs`
- May modify: any file the lint flags (likely a missing cross-ref or typo'd slug)

**Interfaces:**
- Consumes: the catalog produced by Tasks 1-18.
- Produces: the CI gate (spec §8 Tier 2). Runs on every commit once Plan 5 adds CI; for now it's the Plan 2a acceptance test.

- [ ] **Step 1: Write `test/lint-skill.mjs`**

Node `node:test` ESM script. Assertions (each a `test()` block):
1. **Every gate 1-58 in gates.md has a `**Checker:**` line.** Parse gates.md, for each `### GN` heading assert a `**Checker:**` line follows within the entry.
2. **Every theme stub has the 3 axes + palette + fonts.** For each of the 8 themes/<name>.md: assert `## Axes (diversification)` + `Paper band` + `Display style` + `Accent hue` lines present; assert `data-theme="<name>"` + `--color-paper` + `--color-accent` + `--font-display` present.
3. **Macro slugs stable.** macrostructures.md index lists all 21 names; assert the 21 per-macro files exist at `macrostructures/NN-<slug>.md` for the canonical slugs (hardcode the 21 slugs from Task 8).
4. **Component codes stable.** component-cookbook.md mentions all 50 codes; assert the 50 files exist at `components/<code>-<slug>.md` (hardcode the 50 code+slug pairs).
5. **No `Hallmark` leftover in Keystone prose** (except NOTICE + README attribution sections). Grep all `skills/keystone/**/*.md` for `Hallmark` — allow only in NOTICE + README's "relates to Hallmark" section. (Catches missed rewrites.)
6. **EOF newline on every file.** For each `.md` + `.mjs` in skills/ + test/lint-skill.mjs: assert last char is `\n` (fixes the Phase-1 minor).

- [ ] **Step 2: Run the lint**

```bash
node --test test/lint-skill.mjs
```

Expected: all pass. If any fail, fix the flagged file (add the missing cross-ref / fix the slug / add the EOF newline / rewrite the missed `Hallmark` mention).

- [ ] **Step 3: Re-run until green, then commit**

```bash
node --test test/lint-skill.mjs   # green
git add test/lint-skill.mjs
git add -u   # any fixes
git commit -m "test(skill): structural lint for the catalog + fixes"
```

---

### Task 20: final verify + PR + merge

**Files:**
- None (verification + git)

- [ ] **Step 1: Full tree review**

```bash
find skills/keystone -type f | sort
echo "---"
ls LICENSE NOTICE
echo "---"
git log --oneline master..HEAD   # the commit history
```

- [ ] **Step 2: Run all tests (engine + lint)**

```bash
npm test                                                   # 39 engine tests
node --test test/lint-skill.mjs                            # structural lint
node --import tsx --test test/extensions/render.test.mjs   # 1 render test
```

All green.

- [ ] **Step 3: Challenge step (CIPHER)** — before PR, actively review: Did any gate in gates.md get the wrong layer? Are the 8 theme palettes G7/G22-safe (no pure 0 0 0 / 100 0 0; neutrals have trace chroma)? Does SKILL.md Step 7 actually link the engine loop, not re-imagine it? Are macro/component slugs exactly matching the index? Fix anything found.

- [ ] **Step 4: Push + open PR**

```bash
git push -u origin feat/skill-catalog-2a
gh pr create --base master --title "feat: skill catalog (Plan 2a — structure layer)" --body "..." 
```

PR body: summary of the 20 tasks, the Plan 2a/2b split rationale, the 8-theme-stub caveat (deep spec = Plan 2b), test results, NOTICE attribution.

- [ ] **Step 5: Merge per RECTOR's convention**

```bash
gh pr merge <N> --merge --delete-branch
git checkout master && git pull
git branch -d feat/skill-catalog-2a
```

- [ ] **Step 6: Hand off for Plan 2b (8 deep themes)**

Update the session handoff at `~/Documents/secret/strategy/keystone/session-handoff-<date>.md`: Plan 2a COMPLETE (merged), Plan 2b (8 deep theme specs at full 11-section depth) is ★ next, Plan 3 (build-flow integration) is unblocked by 2a's structure layer + theme stubs.

---

## Self-Review (run after writing, before execution)

**1. Spec coverage:** spec §3 (package architecture) → Tasks 1-18 produce every file in the `skills/keystone/` tree. spec §4 (gate engine) → Task 3 (gates.md) + Task 2 (engine.md) document the engine; the engine itself is Phase-1, not re-touched. spec §5 (build flow) → Task 18 (SKILL.md) ships the 7-step flow with engine Step 7. spec §6 (audit verb) → Task 16. spec §7 (curated catalog) → Tasks 4-15 (anti-patterns/disciplines/genres/macros/components), Task 17 (8 theme stubs — deep prose deferred to 2b as decided). spec §8 (testing) → Task 19 (Tier 2 structural lint). Gap: spec §8 Tier 3 (example regression ≥50/58) and Tier 4 (comparison harness) are Plan 5, correctly out of 2a scope. spec §8 Tier 1 (engine unit tests) = Phase 1, already green.

**2. Placeholder scan:** no TBDs in the task bodies — the 8 theme palettes are fully derived in Task 17's table; the gate→checker mapping is spec'd in Task 3 with the 13 shipped + ~28 Plan-1b + ~18 Plan-3 split; every markdown task has a section outline + source + acceptance grep.

**3. Consistency:** macro slugs in Task 8/9/10 match the 21 names in Task 8's index spec and Task 19's lint assertion. Component codes in Tasks 12-15 match the 50 in Task 11's index and Task 19's lint. Theme slugs in Task 17 match Task 19's lint and SKILL.md's Step 2.6 (Task 18). Gate numbers in Tasks 4-16 cross-refs match Task 3's gates.md and Task 19's "every gate has a checker" assertion.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-28-keystone-skill-catalog-2a.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task (minimax-m3 for the mechanical markdown batches, CIPHER-led for the originals: gates.md/engine.md/SKILL.md/audit.md/theme-stubs), review between tasks, fast iteration. ~20 dispatches.

**2. Inline Execution** — Execute tasks in this session via executing-plans, batch execution with checkpoints for review.

Which approach?