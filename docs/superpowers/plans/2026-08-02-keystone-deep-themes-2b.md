# Keystone Deep Theme Specs (Plan 2b) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deepen the 8 tokens-only theme stubs shipped in Plan 2a into full 11-section deep theme specifications — signature moves, voice fixtures, theme-specific anti-patterns, nav/footer routing, worked example, per-theme gate overrides, and engine cross-refs — so a `keystone build` loads a theme and knows exactly what makes it *this* theme, in voice, and which gates the engine will catch if it drifts. Tokens, axes, and the short affinity from 2a are preserved verbatim (not re-derived); 2b adds the prose layer on top.

**Architecture:** One pi-package (`@getpipher/keystone`), three execution tiers — Skill (markdown, `skills/keystone/`) · Engine (Node, `engine/` — untouched) · Extension (Playwright, `extensions/` — untouched). Plan 2b touches ONLY `skills/keystone/references/themes/*.md` (8 files) + `test/lint-skill.mjs` (extends with an 11-section assertion). The deep spec is a curated rewrite of Hallmark's deep-theme pattern (github.com/Nutlope/hallmark, MIT): reuse the *shape* (signature moves / affinity / voice / anti-patterns / worked example), rewrite ALL prose in Keystone's terse engine-aware voice, and add the **gate-override + engine-cross-ref** sections as our original contribution (Hallmark has neither — its gates aren't executable). Credited in NOTICE (already shipped in 2a).

**Tech Stack:** Markdown (theme references, no build step). Node `node:test` for the structural lint. ESM `.mjs`. 2-space indent, trailing newline at EOF.

## Global Constraints

- **pi-first** — skill + extension in one `@getpipher/keystone` package. Do NOT change the manifest. Do NOT touch `engine/` or `extensions/`.
- **Do NOT re-derive tokens.** Each theme's `## Axes`, `## Palette`, and `## Fonts` sections are copied **verbatim** from the 2a stub (`skills/keystone/references/themes/<slug>.md`). The `## Macrostructure affinity (short — full spec in Plan 2b)` heading is renamed to `## Macrostructure affinity` and expanded with reasons; the loves/rejects lists are kept and deepened. Axes stay at the TOP (the engine reads them).
- **Exactly 11 sections per theme** (spec §7 authority, axes promoted to top). Section order is fixed:
  1. `## Axes (diversification)` — verbatim from stub
  2. `## Palette` — verbatim from stub (+ optional 2-3 line role note for multi-accent themes)
  3. `## Fonts (free)` — verbatim from stub (+ optional type-discipline note)
  4. `## Signature moves` — NEW — 2-3 numbered moves that make THIS theme this
  5. `## Macrostructure affinity` — EXPANDED — loves/rejects with one-line reasons each
  6. `## Voice fixtures` — NEW — example headlines, body patterns, label patterns, banned words
  7. `## Anti-patterns (theme-specific)` — NEW — the theme's hard NOs (disqualifiers folded here)
  8. `## Nav & footer routing` — NEW — which N#/Ft# archetypes fit / avoid
  9. `## Worked example` — NEW — a small HTML/CSS sketch (~30-60 lines) showing the signature moves
  10. `## Gate overrides` — NEW per-theme — which gates this theme's genre loosens (cite gate numbers)
  11. `## Engine cross-ref` — NEW (our original contribution) — table: signature move → gates that police it
- **One-line intro** under the `# Theme — <Name>` H1 (1-2 sentences: what this theme IS, its register). No extra sections beyond the 11. Do NOT add a "Reference register", "Motion direction", "How it differs from neighbours", or "What it refuses" section as separate headings — fold real-site calibration into the intro + signature moves, fold motion into signature moves, fold disqualifiers into `## Anti-patterns (theme-specific)`. Discipline is what separates a spec from a sprawl.
- **No "Hallmark" anywhere in theme files.** The structural lint (test #5, shipped 2a) fails any theme `.md` containing the word "Hallmark". Cite real reference sites (Brilliant, PostHog, Stripe, Linear, Vercel, Duolingo) by name where they calibrate a signature move — never name the skill we were curated from.
- **Keystone voice** — terse, engine-aware, declarative. "The engine renders; you do not imagine it." No breathless marketing copy inside the spec prose (that belongs in `## Voice fixtures` *as examples*, clearly labelled).
- **Worked-example CSS must be engine-clean** — uses the theme's `var(--...)` tokens, no gradient text (G2), no pure `#000`/`#fff` where the genre forbids (G7), no `transition: all` (G10), `:focus-visible` present on interactive elements (G26). It models good behaviour; a sloppy worked example teaches the model to emit slop.
- **MIT + NOTICE** already shipped (2a). No license work in 2b.
- **2-space indent**, trailing newline at EOF, **no AI attribution**. Author RECTOR `<rector@rectorspace.com>`, GPG `BF47B9DC1FA320FA`.
- **One commit per theme.** Branch `feat/skill-catalog-2b` off `master` (`da70449`). Open PR #3, merge `--merge --delete-branch`. Then hand off for Plan 3.
- **Hallmark source** lives at `/tmp/hallmark/skills/hallmark/references/themes/` for the depth benchmark. If missing, re-clone: `git clone --depth 1 https://github.com/Nutlope/hallmark.git /tmp/hallmark`. Use `hum.md` + `cobalt.md` as the depth calibration for the overlapping themes; use the genre register (not verbatim prose) for the 6 fresh themes.

## File Structure

```
skills/keystone/references/themes/
├── midnight.md      # dark / atmospheric   — Task 3 (CIPHER exemplar)
├── garden.md        # light / editorial    — Task 4 (CIPHER exemplar)
├── cobalt.md        # light / modern-minimal — Task 6 (dispatch)
├── hum.md           # light / playful       — Task 7 (dispatch)
├── specimen.md      # light / editorial     — Task 8 (dispatch)
├── manifesto.md     # light+dark / editorial — Task 9 (dispatch)
├── terminal.md      # dark / atmospheric    — Task 10 (dispatch)
└── riso.md          # light / editorial      — Task 11 (dispatch)
test/lint-skill.mjs  # +1 test block (11-section assertion) — Task 2, green by Task 12
docs/superpowers/plans/2026-08-02-keystone-deep-themes-2b.md  # this plan — Task 1
```

## The genre → gate-override map (authoritative, derived from gates.md genre notes)

Every theme cites its genre's row here in `## Gate overrides`. Do not invent overrides outside this map; if a theme needs a further override, flag it to the controller (it likely means a gates.md genre note is missing and belongs in Plan 1b).

| Genre | Gate | Override (what the genre allows, against the global rule) |
|---|---|---|
| modern-minimal | G7 | allows pure `#fff` / `oklch(100% 0 0)` paper |
| modern-minimal | G22 | allows zero-chroma neutrals (`oklch(L 0 H)`) |
| atmospheric | G2 | radial gradients on background only — never on text or pill buttons |
| atmospheric | G23 · G29 | accent-tinted radial blooms up to ~20% of canvas, fixed-attached, no animation |
| atmospheric | G6 | centred hero allowed when the canvas itself is the design |
| playful | G6 | centred hero allowed when the canvas itself is the design |
| editorial | G6 | centred-narrow hero allowed, but the eyebrow or CTA sits off-axis |
| editorial | G21 | Specimen macrostructure only when the brief signals editorial / foundry / journal |

Theme → genre (from spec §7 table):

| Theme | Genre | Override row(s) |
|---|---|---|
| Midnight | atmospheric | G2 · G6 · G23/G29 |
| Cobalt | modern-minimal | G7 · G22 |
| Garden | editorial | G6 · G21 |
| Hum | playful | G6 |
| Specimen | editorial | G6 · G21 |
| Manifesto | editorial | G6 · G21 |
| Terminal | atmospheric (dark, technical) | G2 · G6 · G23/G29 (+ mono-purity note) |
| Riso | editorial | G6 · G21 |

## Execution model (learned from dogfooding armory-fleet during 2a)

- **CIPHER writes the 2 exemplars first** (Midnight — dark/atmospheric; Garden — light/editorial — covers dark+light and 2 genres), then a glm-5.2:cloud reviewer reviews both and the canonical template is locked.
- **Dispatch the remaining 6** to `general-purpose` subagents with `model: "Ollama/glm-5.2:cloud"` (implementer) and the same model for review. Use `Ollama/minimax-m3:cloud` ONLY if a complete-spec transcription is needed (it is faithful for transcription, hallucinates as a reviewer — do NOT use it to review).
- **Pre-feed verified facts to reviewers** (glm-5.2 hits its ~20-40 turn budget on reading-heavy multi-source tasks; pre-feeding keeps it in budget). A reviewer dispatch receives: the file under review inlined, the 11-section template, the theme's genre-override row, and the acceptance grep — so it never has to go read 4 source files.
- **Controller verifies reviewer findings against the actual file** before acting (glm-5.2 reviewers occasionally produce false-positives by misreading).
- **Every dispatch gets the SCOPE GUARD** (mitigates a recurring context-bleed where glm-5.2 injects armory-fleet content). Verbatim text:

  > SCOPE GUARD: You are working ONLY on @getpipher/keystone (an anti-AI-slop design skill). Do NOT mention, review, or produce any content about armory-fleet, vm-realm, workflow-runner, runner.ts, fleet.ts, schema validation, or any other getpipher package — those are DIFFERENT projects. If you find yourself thinking about them, STOP — you are in the wrong context. Your output is a single markdown theme-spec file and nothing else. Also: do NOT use the word "Hallmark" anywhere in your output — a structural lint fails any theme file containing it. Cite real reference sites by name where they calibrate a signature move. 2-space indent, trailing newline at EOF, no AI attribution.

## How to read this plan (markdown-authoring tasks)

This is a **writing plan**, not a code plan. The "implementation" is markdown prose. The TDD anchor is the **structural lint** (`test/lint-skill.mjs`, Task 2) which validates that every deep theme carries all 11 required sections. Per-task verification is: file exists + `grep`/`includes` for the 11 headings + `grep` that "Hallmark" does NOT appear + commit. The full `npm test` + `node --test test/lint-skill.mjs` is the acceptance gate at Task 12.

Each theme task specifies: **exact path**, **verbatim tokens** (copied from the 2a stub — do not re-derive), **genre-override row**, **signature-move seeds** (2-3 named moves, one line each — the author develops the prose), **voice seeds**, **nav/footer routing**, **engine-cross-ref seed gates**, **Hallmark reference path** (for the overlapping themes), and **acceptance grep**. The author writes the prose from the template + seeds; CIPHER authors the 2 exemplars in-session, the dispatched subagents author the 6.

---

### Task 1: Branch + commit plan doc

**Files:**
- Create: `docs/superpowers/plans/2026-08-02-keystone-deep-themes-2b.md` (this file)
- Branch: `feat/skill-catalog-2b` off `master` (`da70449`)

**Interfaces:**
- Produces: the branch + the plan every later task executes from.

- [ ] **Step 1: Create the branch**

```bash
cd /Users/rector/local-dev/getpipher/keystone
git checkout master && git pull --ff-only
git checkout -b feat/skill-catalog-2b
```

- [ ] **Step 2: Commit the plan doc**

```bash
git add docs/superpowers/plans/2026-08-02-keystone-deep-themes-2b.md
git commit -m "docs(plan): 2b — deep theme specs implementation plan"
```

- [ ] **Step 3: Verify Hallmark clone present (depth benchmark)**

```bash
ls /tmp/hallmark/skills/hallmark/references/themes/hum.md 2>/dev/null \
  || git clone --depth 1 https://github.com/Nutlope/hallmark.git /tmp/hallmark
```

---

### Task 2: Write the structural-lint 11-section assertion (red anchor)

**Files:**
- Modify: `test/lint-skill.mjs` (append a new test block after the existing theme-axes block, test #2)

**Interfaces:**
- Produces: a failing test that drives all 8 theme tasks. Expected RED until Task 12 (all 8 deepened). This is the TDD anchor for a writing plan.

- [ ] **Step 1: Append the 11-section assertion**

Insert after the existing `theme ${theme} has axes + palette + fonts` loop (before test #3 "Macro slugs stable"):

```js
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
```

- [ ] **Step 2: Run the lint — confirm RED on the 8 stubs**

```bash
node --test test/lint-skill.mjs 2>&1 | grep -E "deep spec has all 11|tests? (pass|fail)" | head
```
Expected: 8 failing `theme <slug> deep spec has all 11 sections` tests (stubs lack Signature moves / Voice fixtures / etc.). The pre-existing 82 tests stay green. This is the intended red anchor.

- [ ] **Step 3: Commit (red is the point — TDD anchor)**

```bash
git add test/lint-skill.mjs
git commit -m "test(lint): 11-section assertion for deep theme specs (red anchor for 2b)"
```

---

### Task 3: CIPHER writes the Midnight deep spec (dark / atmospheric exemplar)

**Files:**
- Modify: `skills/keystone/references/themes/midnight.md` (deepen the 2a stub)

**Interfaces:**
- Consumes: the 2a stub (tokens + axes + short affinity — keep verbatim), the genre-override map (Midnight → atmospheric → G2/G6/G23/G29), `gates.md` for engine cross-refs.
- Produces: the FIRST exemplar — the dark/atmospheric reference that pins the canonical template for the 6 dispatched themes.

**Verbatim from stub (DO NOT re-derive):** `## Axes (diversification)` (dark / geometric-sans / cool), the `:root[data-theme="midnight"]` palette block, the `## Fonts` block (Space Grotesk / Geist / Geist Mono).

**Signature-move seeds (author develops prose, 2-3 moves):**
1. **Single warm-accent signal on a tinted-dark canvas** — one accent (cool `oklch(72% 0.17 200)`), paper never pure black (`oklch(15% 0.02 260)` — tinted toward the accent hue), the accent is a *signal* not a surface. Calibrates against Linear / Vercel dark.
2. **Atmospheric radial bloom behind a single hero** — one fixed-attachment radial gradient bloom up to ~20% of the canvas, behind the hero only; the rest of the page is flat tinted-dark. The bloom is the only background ornament.
3. **Monospaced numerals as the data voice** — Geist Mono for every number/stat/timestamp; the display (Space Grotesk) carries words, mono carries figures. Two registers, clear job split.

**Voice seeds (cool, technical, sparse — declarative, no hype):**
- Headlines: "Ship at 03:00." · "Latency you don't feel." · "The runtime is the product."
- Body: "Deploys in under a second. No build step to wait on." · "Built for the night shift."
- Label: `01 · UPTIME` · `REGION · US-EAST-2` · `P99 · 42MS`
- Never: supercharge, unlock, revolutionary, seamless, AI-powered, intelligent, transformative, journey.

**Nav & footer routing:**
- Nav: N3 (side rail) · N5 (floating pill) · N9 (edge-aligned minimal) — all avoid the hairline-bottom wordmark+links default (G42).
- Footer: Ft5 (statement) · Ft3 (index-style category list).
- Avoid: N1/N1b (the SaaS default), Ft1 (mast-headed giant meta grid).

**Engine cross-ref seed gates** (signature move → police gates): warm-accent signal → G23 (accent footprint) · G22 (zero-chroma — dark neutrals must be tinted) · G7 (no pure black) · G40-41 (contrast on dark); radial bloom → G29 (abstract bg overuse) · G2 (no gradient text) · G23 (footprint); mono numerals → G37 (≤3 families) · G38 (outlier ≤2 slots). Author fills the table.

**Genre override (Midnight → atmospheric):** G2 radial gradients on bg only · G6 centred hero when canvas is the design · G23/G29 radial blooms up to ~20% fixed-attached no animation.

- [ ] **Step 1: Write the full deep spec**

Author the file in-session (CIPHER) following the 11-section template. Keep `## Axes`, `## Palette`, `## Fonts` verbatim from the stub. Rename the affinity heading to `## Macrostructure affinity` and expand loves/rejects with one-line reasons. Add the 8 new sections.

- [ ] **Step 2: Acceptance grep**

```bash
f=skills/keystone/references/themes/midnight.md
for h in "## Axes (diversification)" "## Palette" "## Fonts (free)" "## Signature moves" \
         "## Macrostructure affinity" "## Voice fixtures" "## Anti-patterns (theme-specific)" \
         "## Nav & footer routing" "## Worked example" "## Gate overrides" "## Engine cross-ref"; do
  grep -qF "$h" "$f" && echo "OK $h" || echo "MISSING $h"
done
grep -qF "## Macrostructure affinity (short" "$f" && echo "FAIL: short heading not renamed" || echo "OK: short heading removed"
grep -qi "Hallmark" "$f" && echo "FAIL: Hallmark mentioned" || echo "OK: no Hallmark"
```
Expected: all 11 OK, short-heading removed, no Hallmark.

- [ ] **Step 3: Commit**

```bash
git add skills/keystone/references/themes/midnight.md
git commit -m "feat(theme): midnight deep spec — dark/atmospheric exemplar"
```

---

### Task 4: CIPHER writes the Garden deep spec (light / editorial exemplar)

**Files:**
- Modify: `skills/keystone/references/themes/garden.md`

**Interfaces:**
- Consumes: the 2a stub (tokens verbatim), genre map (Garden → editorial → G6/G21), `gates.md`.
- Produces: the SECOND exemplar — light/editorial reference; together with Midnight it pins dark+light + 2 genres.

**Verbatim from stub:** `## Axes` (light / roman-serif / chromatic-green), the `:root[data-theme="garden"]` block, `## Fonts` (Newsreader / Source Serif 4 / IBM Plex Mono).

**Signature-move seeds (2-3 moves):**
1. **Serif-led editorial hierarchy** — Newsreader (display) for headlines, Source Serif 4 (body) for prose; the serif IS the design. Calibrates against a botanical field-guide / a small-batch roastery site. No sans in the prose.
2. **Chromatic-green as the single editorial anchor** — one accent (`oklch(52% 0.13 145)`), used for key-words, link underlines, and section rules; never fills a surface. Green-tinted paper (`oklch(97% 0.015 120)`) — warm botanical, never pure white.
3. **Long-document rhythm with marginalia** — hanging-indent side-notes (S2), generous measure (65ch), section rules in the accent at hairline weight. The page reads like a printed journal.

**Voice seeds (warm editorial, botanical, specific — nouns over verbs):**
- Headlines: "Grown slowly, picked by hand." · "A field guide to making things." · "Notes from the garden, week twelve."
- Body: "We tend seven raised beds on a quarter-acre." · "The catalogue updates each Sunday at dawn."
- Label: `ISSUE · 04` · `SEASON · LATE SUMMER` · `№ 12`
- Never: supercharge, leverage, ecosystem, holistic, mindful, AI-powered, journey, seamless.

**Nav & footer routing:**
- Nav: N6 (newspaper masthead) · N1 (wordmark + 2 links) · N9 (edge-aligned minimal).
- Footer: Ft3 (index-style category list) · Ft6 (letter close).
- Avoid: N2/N5 (the floating-pill dev-tool nav), Ft7 (newsletter-first SaaS).

**Engine cross-ref seed gates:** serif hierarchy → G1 (banned fonts — Inter etc. banned) · G37 (≤3 families) · G38a (no italic headers); green anchor → G23 (accent footprint) · G48 (no mid-render token improv) · G22 (no zero-chroma neutrals); long-document rhythm → G25 (prose max-width 45-75ch) · G54 (no tag-left/heading-right) · G9 (no equal-whitespace sections).

**Genre override (Garden → editorial):** G6 centred-narrow hero with eyebrow/CTA off-axis · G21 Specimen only when brief signals editorial.

- [ ] **Step 1: Write the full deep spec** (CIPHER, in-session, 11 sections, stub verbatim for Axes/Palette/Fonts).

- [ ] **Step 2: Acceptance grep** (same loop as Task 3 Step 2, `f=.../garden.md`).

- [ ] **Step 3: Commit**

```bash
git add skills/keystone/references/themes/garden.md
git commit -m "feat(theme): garden deep spec — light/editorial exemplar"
```

---

### Task 5: Review both exemplars + lock the canonical template

**Files:**
- Read-only review of: `skills/keystone/references/themes/midnight.md`, `garden.md`
- Modify (fixes only): either file if the review finds a real defect

**Interfaces:**
- Produces: the locked 11-section template (this plan's template section, validated against two real examples) that the 6 dispatched themes copy. If the review reveals the template needs a tweak, update this plan doc's template section in the same commit as the fix.

- [ ] **Step 1: Dispatch a glm-5.2:cloud reviewer (pre-fed)**

`subagent` with `agent: "general-purpose"`, `model: "Ollama/glm-5.2:cloud"`. Task prompt (pre-fed — the reviewer does NOT read 4 source files):

> SCOPE GUARD: (verbatim from Global Constraints).
>
> Review TWO markdown theme specs for the @getpipher/keystone anti-AI-slop design skill. Both files are inlined below. Verify each has all 11 required sections, the tokens are preserved (not re-derived), no section beyond the 11 is present, no "Hallmark" mention, worked-example CSS uses `var(--...)` tokens and is engine-clean (no gradient text, no `transition: all`, `:focus-visible` present), voice fixtures include banned-words, anti-patterns are theme-specific (not generic), gate-override rows cite real gate numbers, and the engine-cross-ref table maps each signature move to gates that actually police it. Report ONLY concrete defects with the section name and a one-line fix. If a section is good, say nothing about it. Do not rewrite the files.
>
> FILES:
> [midnight.md full content inlined]
> [garden.md full content inlined]
>
> CANONICAL TEMPLATE (11 sections, fixed order): Axes · Palette · Fonts · Signature moves · Macrostructure affinity · Voice fixtures · Anti-patterns (theme-specific) · Nav & footer routing · Worked example · Gate overrides · Engine cross-ref.

- [ ] **Step 2: Controller verifies findings vs the actual files**

For each defect the reviewer reports, open the file and confirm the defect is real (glm-5.2 reviewers occasionally misread). Discard false-positives.

- [ ] **Step 3: Apply real fixes**

- [ ] **Step 4: Re-run acceptance grep on both files** (Task 3/4 Step 2 loop).

- [ ] **Step 5: Commit fixes (if any) + lock template**

```bash
git add skills/keystone/references/themes/midnight.md skills/keystone/references/themes/garden.md docs/superpowers/plans/2026-08-02-keystone-deep-themes-2b.md
git commit -m "review(theme): lock midnight+garden exemplars, pin canonical 11-section template"
```
If no fixes and no template change, skip the commit — the exemplars are the lock.

---

### Task 6: Dispatch Cobalt deep spec (light / modern-minimal)

**Files:**
- Modify: `skills/keystone/references/themes/cobalt.md`

**Interfaces:**
- Consumes: the locked template (Task 5), the 2a stub (tokens verbatim), genre map (Cobalt → modern-minimal → G7/G22), the Hallmark `cobalt.md` depth benchmark (`/tmp/hallmark/skills/hallmark/references/themes/cobalt.md`).

**Verbatim from stub:** `## Axes` (light / grotesk-sans / cool), `:root[data-theme="cobalt"]`, `## Fonts` (Space Grotesk / Geist / Geist Mono).

**Signature-move seeds (2-3 moves):**
1. **Engineered near-white with one electric cobalt signal** — paper `oklch(99% 0.002 250)` (near-white, the modern-minimal genre ALLOWS pure white — G7 override — but Cobalt stays a hair off it for warmth), one accent (`oklch(55% 0.20 255)`). Calibrates against Stripe / Linear / Vercel.
2. **Grotesk display + humanist body, mono for code** — Space Grotesk headlines, Geist body, Geist Mono for code/inline-commands. The dev-tool register: code is content, not decoration.
3. **Hairline rules and tabular numerals** — 1px dividers, `font-variant-numeric: tabular-nums` on every stat table, pricing, and spec sheet. Precision read.

**Voice seeds (engineered, precise, dev-tool — confident, no hype):**
- Headlines: "An API that scales to your traffic." · "Type-safe to the edge." · "Ship the types, not the typescript."
- Body: "Returns in under 40ms at the 99th percentile." · "One SDK. Three runtimes. No config."
- Label: `v4.2.0` · `P99 · 40MS` · `STATUS · STABLE`
- Never: supercharge, unlock, revolutionize, seamless, intelligent, AI-powered, transformative, journey, holistic.

**Nav & footer routing:**
- Nav: N1b (saas three-section) · N13 (inline cmdk pill) · N2 (floating chip) — dev-tool command-bar energy.
- Footer: Ft1 (mast-headed) · Ft7 (newsletter-first).
- Avoid: N6 (newspaper masthead — wrong register), Ft6 (letter close — too literary).

**Engine cross-ref seed gates:** near-white + cobalt signal → G7 (pure-white override documented) · G22 (zero-chroma override documented) · G23 (accent footprint) · G40-41 (contrast — cobalt on near-white must clear Lc 60); grotesk+mono → G1 (banned fonts) · G37 (≤3 families); hairline + tabular → G24 (spacing scale) · G48 (token discipline).

**Genre override (Cobalt → modern-minimal):** G7 allows pure `#fff` paper · G22 allows zero-chroma neutrals.

- [ ] **Step 1: Dispatch glm-5.2:cloud implementer (pre-fed)**

`subagent`, `agent: "general-purpose"`, `model: "Ollama/glm-5.2:cloud"`. Task prompt includes: SCOPE GUARD, the locked template (11 sections), the stub's verbatim Axes/Palette/Fonts, the signature-move seeds, voice seeds, nav/footer routing, genre-override row, engine-cross-ref seed gates, and `/tmp/hallmark/skills/hallmark/references/themes/cobalt.md` as the depth benchmark (rewrite tighter, in Keystone voice, add the gate-override + engine-cross-ref sections Hallmark lacks). Output: the full `skills/keystone/references/themes/cobalt.md` content. 2-space indent, trailing newline, no "Hallmark".

- [ ] **Step 2: Write the implementer's output to the file**

Controller writes the returned content to `skills/keystone/references/themes/cobalt.md` (verify EOF newline).

- [ ] **Step 3: Dispatch glm-5.2:cloud reviewer (pre-fed — file inlined)**

Same model. Prompt: SCOPE GUARD + the 11-section template + the inlined file + "report ONLY concrete defects with section name + one-line fix; do not rewrite." Controller verifies findings vs the file.

- [ ] **Step 4: Apply real fixes** (controller, after verifying each finding).

- [ ] **Step 5: Acceptance grep** (Task 3 Step 2 loop, `f=.../cobalt.md`).

- [ ] **Step 6: Commit**

```bash
git add skills/keystone/references/themes/cobalt.md
git commit -m "feat(theme): cobalt deep spec — light/modern-minimal"
```

---

### Task 7: Dispatch Hum deep spec (light / playful)

**Files:**
- Modify: `skills/keystone/references/themes/hum.md`

**Interfaces:**
- Consumes: locked template, 2a stub (tokens verbatim — note Hum is the ONLY multi-accent theme: accent / accent-2 / accent-3), genre map (Hum → playful → G6), Hallmark `hum.md` (403 lines — the flagship; `/tmp/hallmark/skills/hallmark/references/themes/hum.md`).

**Verbatim from stub:** `## Axes` (light / rounded-sans / warm (multi)), the `:root[data-theme="hum"]` block (pear/cyan/coral), `## Fonts` (Plus Jakarta Sans / Plus Jakarta Sans / JetBrains Mono). **Palette role note (add 2-3 lines under the css block):** pear = primary action, cyan = link/hover, coral = single high-energy moment per page; mint/lavender absent from the stub so do NOT add them (the stub ships exactly accent/accent-2/accent-3 — keep it three-accent, not five).

**Signature-move seeds (2-3 moves):**
1. **The press is the feedback — three-state button system** — one `.btn` base (push: solid colour edge + soft ground shadow), `:hover` lifts 2px (edge grows), `:active` presses DOWN 3px (edge shrinks to 1px). No `scale()`, no spring overshoot on the button. Calibrates against Brilliant / PostHog.
2. **Multi-accent section bands (no gradients between accents)** — sections alternate cream/pear-tint/cyan-tint/coral-tint backgrounds; each accent owns its surface. Accents never blend in a gradient (G2). Coral = one moment per page.
3. **One reacting character moment** — a single small CSS-built mark (no `<img>`, no Lottie) that pulses at rest and bursts on a CTA click. Pear-yellow by default. One per page, never more.

**Voice seeds (warm, smart, casual, direct — sentence case allowed):**
- Headlines: "Your daily 30-second curio." · "Notice yourself, in 30 seconds." · "A small daily thing, kept for a long time."
- Body: "Free for the first seven days. $5 a month after that." · "Made by three people in Lisbon and Amsterdam."
- Label: `01 · TODAY` · `STREAK · 47 DAYS` · `LEARNED · 312 THINGS`
- Never: revolutionize, supercharge, unlock, leverage, unleash, transform, journey, holistic, mindful, ecosystem, platform, AI-powered, intelligent.

**Nav & footer routing:**
- Nav: N5 (floating pill) · N2 (floating chip) · N10 (floating on scroll morph).
- Footer: Ft8 (marquee scroll) · Ft2 (inline rule single line).
- Avoid: N6 (newspaper masthead — wrong register), Ft1 (mast-headed giant meta grid).

**Engine cross-ref seed gates:** press button → G11 (no uniform hover-scale — the press is translate, not scale) · G12 (no overshoot on UI) · G13 (one hover effect) · G26 (all four states incl. :focus-visible/:active/:disabled); multi-accent bands → G2 (no gradient text/accent-to-accent) · G23 (accent footprint — three accents need area discipline) · G29 (abstract bg overuse); character moment → G33 (decorative SVG needs aria-hidden) · G45 (decoration must be motivated) · G31 (no Lottie default).

**Genre override (Hum → playful):** G6 centred hero allowed when the canvas itself is the design.

- [ ] **Step 1: Dispatch glm-5.2:cloud implementer (pre-fed)** — include the Hallmark `hum.md` path as the depth benchmark (rewrite tighter; Hum overlaps a Hallmark theme so the calibration is direct; ADD the gate-override + engine-cross-ref sections, which Hallmark lacks).
- [ ] **Step 2: Write output to file.**
- [ ] **Step 3: Dispatch glm-5.2:cloud reviewer (pre-fed, file inlined).**
- [ ] **Step 4: Apply real fixes (controller-verified).**
- [ ] **Step 5: Acceptance grep** (`f=.../hum.md`).
- [ ] **Step 6: Commit**

```bash
git add skills/keystone/references/themes/hum.md
git commit -m "feat(theme): hum deep spec — light/playful (multi-accent)"
```

---

### Task 8: Dispatch Specimen deep spec (light / editorial)

**Files:**
- Modify: `skills/keystone/references/themes/specimen.md`

**Interfaces:**
- Consumes: locked template, 2a stub (tokens verbatim), genre map (Specimen → editorial → G6/G21). No direct Hallmark overlap — calibrate against the editorial genre register + real foundry sites (Klim, Grilli Type, Pangram).

**Verbatim from stub:** `## Axes` (light / high-contrast-serif / neutral-warm), `:root[data-theme="specimen"]`, `## Fonts` (Fraunces / Source Serif 4 / IBM Plex Mono).

**Signature-move seeds (2-3 moves):**
1. **High-contrast serif as the whole identity** — Fraunces (display, optical-size axis) for headlines, Source Serif 4 for body. The type IS the product; this is the foundry/journal register. Calibrates against Klim / Grilli Type.
2. **Specimen-sheet macrostructure as the spine** — the page is a catalogue of types/specimens; each entry is a labelled specimen card with a character set, a pangram, and a metadata strip. Calibrates against a type-foundry catalogue.
3. **Neutral-warm anchor, ink-on-paper restraint** — paper `oklch(96% 0.01 80)` (warm oat), accent `oklch(58% 0.13 45)` used only for labels/rules/links; the accent is a punctuation mark, never a fill.

**Voice seeds (foundry, editorial, precise — declarative, no hype, specific):**
- Headlines: "A catalogue of type, set with care." · "Specimens, not slogans." · "Twelve faces, one workshop."
- Body: "Each cut is drawn from a single skeleton." · "The specimen book updates with each release."
- Label: `Nº 04` · `CUT · DISPLAY` · `YEAR · 2026`
- Never: supercharge, leverage, ecosystem, holistic, AI-powered, intelligent, transformative, journey, seamless, unlock.

**Nav & footer routing:**
- Nav: N1 (wordmark + 2 links) · N9 (edge-aligned minimal).
- Footer: Ft3 (index-style category list) · Ft1 (mast-headed).
- Avoid: N2/N5 (floating-pill dev-tool nav), Ft8 (marquee scroll — too playful).

**Engine cross-ref seed gates:** high-contrast serif → G1 (banned fonts) · G37 (≤3 families) · G38a (no italic headers); specimen-sheet spine → G3 (no 3-equal-col card grid — specimens are asymmetric) · G4 (no nested cards) · G54 (no tag-left/heading-right); ink-on-paper → G22 (no zero-chroma) · G48 (token discipline) · G40-41 (contrast).

**Genre override (Specimen → editorial):** G6 centred-narrow hero with eyebrow/CTA off-axis · G21 Specimen macrostructure ALLOWED when the brief signals editorial/foundry/journal (Specimen is the one theme whose namesake macro it may default to — but only on signal).

- [ ] **Step 1: Dispatch glm-5.2:cloud implementer (pre-fed)** — no Hallmark file; calibrate against the editorial register + real foundry sites named in the seed.
- [ ] **Step 2: Write output to file.**
- [ ] **Step 3: Dispatch glm-5.2:cloud reviewer (pre-fed, file inlined).**
- [ ] **Step 4: Apply real fixes (controller-verified).**
- [ ] **Step 5: Acceptance grep** (`f=.../specimen.md`).
- [ ] **Step 6: Commit**

```bash
git add skills/keystone/references/themes/specimen.md
git commit -m "feat(theme): specimen deep spec — light/editorial (foundry)"
```

---

### Task 9: Dispatch Manifesto deep spec (light+dark / editorial, polemical)

**Files:**
- Modify: `skills/keystone/references/themes/manifesto.md`

**Interfaces:**
- Consumes: locked template, 2a stub (tokens verbatim — note the stub says "light (dark variant)"; the dark variant is a `[data-theme="manifesto"][data-mode="dark"]` block added in the Palette section, derived by the author at the same hue family), genre map (Manifesto → editorial → G6/G21).

**Verbatim from stub:** `## Axes` (light (dark variant) / grotesk-sans (condensed) / neutral), `:root[data-theme="manifesto"]` (Anton / Geist / Geist Mono).

**Signature-move seeds (2-3 moves):**
1. **Condensed grotesk display at poster scale** — Anton (or a condensed grotesk) at huge clamp() sizes, ALL-CAPS allowed for the hero statement only (watch G55 — line-height ≥ 1.0 for all-caps). Polemical, declarative. "Belief before product." Calibrates against a political-poster / a punk-zine.
2. **Black-on-cream (and the inverted dark variant)** — paper `oklch(98% 0.004 0)` (near-white, warm-neutral), ink `oklch(15% 0.005 0)` (near-black, never pure — G7); the dark variant inverts to a tinted near-black paper with near-white ink. Two modes, one register.
3. **The statement as the spine** — the page is a sequence of short, numbered declarations (Manifesto macrostructure), each one line, heavy leading, generous negative space. No feature cards, no testimonials.

**Voice seeds (polemical, declarative, first-person plural — belief, not benefit):**
- Headlines: "We believe the browser is the runtime." · "Software is a position." · "No dashboards. No telemetry. No apology."
- Body: "We ship the thing, then we explain it." · "The roadmap is this page."
- Label: `01.` · `PRINCIPLE` · `§ 3`
- Never: supercharge, unlock, leverage, seamless, AI-powered, intelligent, transformative, journey, holistic, ecosystem, empower, revolutionize.

**Nav & footer routing:**
- Nav: N7 (brutal slab) · N8 (terminal command) · N9 (edge-aligned minimal).
- Footer: Ft5 (statement) · Ft2 (inline rule single line).
- Avoid: N1b (saas three-section — the opposite register), Ft7 (newsletter-first — too SaaS).

**Engine cross-ref seed gates:** condensed all-caps display → G55 (all-caps line-height ≥ 1.0) · G1 (banned fonts) · G38a (no italic); black-on-cream + dark variant → G7 (no pure black/white — both modes tinted) · G22 (no zero-chroma) · G40-41 (contrast both modes); statement spine → G3 (no 3-col cards) · G9 (no equal-whitespace sections — declarations need varied rhythm) · G46 (no invented metrics — manifestos cite real stakes).

**Genre override (Manifesto → editorial):** G6 centred-narrow hero with eyebrow/CTA off-axis · G21 Specimen only on signal.

- [ ] **Step 1: Dispatch glm-5.2:cloud implementer (pre-fed).**
- [ ] **Step 2: Write output to file.**
- [ ] **Step 3: Dispatch glm-5.2:cloud reviewer (pre-fed, file inlined).**
- [ ] **Step 4: Apply real fixes (controller-verified).**
- [ ] **Step 5: Acceptance grep** (`f=.../manifesto.md`).
- [ ] **Step 6: Commit**

```bash
git add skills/keystone/references/themes/manifesto.md
git commit -m "feat(theme): manifesto deep spec — light+dark/editorial (polemical)"
```

---

### Task 10: Dispatch Terminal deep spec (dark / atmospheric, technical)

**Files:**
- Modify: `skills/keystone/references/themes/terminal.md`

**Interfaces:**
- Consumes: locked template, 2a stub (tokens verbatim — Terminal is the ONLY mono-everywhere theme), genre map (Terminal → atmospheric → G2/G6/G23/G29 + mono-purity note).

**Verbatim from stub:** `## Axes` (dark / mono / phosphor), `:root[data-theme="terminal"]` (JetBrains Mono ×3), `## Fonts` (JetBrains Mono ×3).

**Signature-move seeds (2-3 moves):**
1. **Mono everywhere — display, body, code are one face** — JetBrains Mono across all three slots; the mono IS the design. Calibrates against a CLI landing page / a dev-tool docs site. The page reads like a terminal session typeset for the web.
2. **Phosphor-green on tinted-black, one signal** — paper `oklch(13% 0.01 145)` (tinted toward phosphor green, never pure black — G7), accent `oklch(78% 0.20 145)` (phosphor). The accent is the prompt colour; everything else is ink-on-paper. Calibrates against an old CRT phosphor / a tmux status line.
3. **The command as the hero** — the hero is a typed `$ command` + its output, not a headline+CTA stack. The CTA is a `▸ run` pill. Motion: a single typewriter reveal on the command (reduced-motion: show final state instantly — G27).

**Voice seeds (technical, CLI, terse — imperative, no hype):**
- Headlines: "init → build → ship." · "$ keystone build --viewports 1280,375" · "One command. Rendered. Scored."
- Body: "Runs in your terminal. Returns a report." · "No account. No telemetry. Just the gates."
- Label: `$ RUN` · `EXIT · 0` · `GATES · 58/58`
- Never: supercharge, unlock, revolutionize, seamless, intelligent, AI-powered, transformative, journey, holistic, empower, leverage.

**Nav & footer routing:**
- Nav: N8 (terminal command) · N13 (inline cmdk pill) · N4 (hidden behind k).
- Footer: Ft4 (dense typographic) · Ft5 (statement).
- Avoid: N6 (newspaper masthead), Ft8 (marquee scroll — wrong energy).

**Engine cross-ref seed gates:** mono everywhere → G1 (banned fonts — mono is not banned) · G37 (≤3 families — mono counts once if same family) · G38a (no italic — terminal never italicises); phosphor + tinted-black → G7 (no pure black) · G22 (no zero-chroma — tint toward phosphor) · G23 (accent footprint — phosphor is a signal) · G40-41 (contrast); command-as-hero + typewriter → G27 (reduced-motion fallback) · G14 (no animating layout props — animate opacity/transform only) · G45 (the typed command is motivated decoration).

**Genre override (Terminal → atmospheric):** G2 radial gradients on bg only (a faint phosphor glow behind the hero command is allowed) · G6 centred hero when canvas is the design (the command prompt centred on a black field is the design) · G23/G29 phosphor bloom up to ~20% fixed-attached no animation. + **mono-purity note:** Terminal is mono-only; do not introduce a sans or serif outlier (G37 — mono is the one family, used everywhere; this is the only theme where mono in non-code contexts does NOT count as a separate family because it's the body face too).

- [ ] **Step 1: Dispatch glm-5.2:cloud implementer (pre-fed).**
- [ ] **Step 2: Write output to file.**
- [ ] **Step 3: Dispatch glm-5.2:cloud reviewer (pre-fed, file inlined).**
- [ ] **Step 4: Apply real fixes (controller-verified).**
- [ ] **Step 5: Acceptance grep** (`f=.../terminal.md`).
- [ ] **Step 6: Commit**

```bash
git add skills/keystone/references/themes/terminal.md
git commit -m "feat(theme): terminal deep spec — dark/atmospheric (mono)"
```

---

### Task 11: Dispatch Riso deep spec (light / editorial, tactile-rebellion)

**Files:**
- Modify: `skills/keystone/references/themes/riso.md`

**Interfaces:**
- Consumes: locked template, 2a stub (tokens verbatim — Riso is the second two-accent theme: cyan + magenta), genre map (Riso → editorial → G6/G21).

**Verbatim from stub:** `## Axes` (light / risograph-bold / chromatic-other), `:root[data-theme="riso"]` (Bricolage Grotesque / Geist / IBM Plex Mono; accent cyan + accent-2 magenta), `## Fonts`.

**Signature-move seeds (2-3 moves):**
1. **Off-register two-colour print feel** — cyan (`oklch(68% 0.22 195)`) + magenta (`oklch(65% 0.20 350)`) as the two inks, deliberately misregistered by 1-3px on display text and shapes (a `text-shadow` / `transform` offset, not a blend). The misregistration is the signature — it reads "made, not generated". Calibrates against a risograph print / a zine cover.
2. **Bricolage Grotesque at chunky display scale** — Bricolage Grotesque (the "risograph-bold" register — chunky, slightly awkward, warm) for headlines; Geist body so the prose stays readable. The display has character; the body gets out of the way.
3. **Tactile paper + visible grain** — paper `oklch(95% 0.02 15)` (warm, slightly toothy), a subtle SVG grain overlay (aria-hidden — G33) at ~3% opacity over the whole page. The grain is the only background ornament; no gradients (G2).

**Voice seeds (tactile, print-feel, rebellion — hand-made, anti-digital, specific):**
- Headlines: "Made, not generated." · "Off-register on purpose." · "Printed in two colours, by hand."
- Body: "Each poster is pulled on a riso in a garage in Yogyakarta." · "The grain is real. The misregistration is the point."
- Label: `№ 04` · `INK · CYAN + MAGENTA` · `EDITION · 200`
- Never: supercharge, unlock, seamless, AI-powered, intelligent, transformative, journey, holistic, ecosystem, leverage, revolutionize, digital-first.

**Nav & footer routing:**
- Nav: N7 (brutal slab) · N6 (newspaper masthead) · N9 (edge-aligned minimal).
- Footer: Ft3 (index-style category list) · Ft8 (marquee scroll).
- Avoid: N13 (inline cmdk pill — too dev-tool), Ft7 (newsletter-first — too SaaS).

**Engine cross-ref seed gates:** off-register two-colour → G2 (no gradient text — the misregistration is a shadow/transform, not a gradient) · G23 (accent footprint — two inks, area discipline) · G48 (token discipline — both inks are tokens); chunky display → G1 (banned fonts) · G37 (≤3 families) · G38a (no italic); grain overlay → G29 (abstract bg overuse — grain is ≤5%, fine) · G33 (SVG aria-hidden) · G45 (grain is motivated — it's the print metaphor) · G27 (reduced-motion — grain is static, no motion issue, but if any drift animates, add fallback).

**Genre override (Riso → editorial):** G6 centred-narrow hero with eyebrow/CTA off-axis · G21 Specimen only on signal.

- [ ] **Step 1: Dispatch glm-5.2:cloud implementer (pre-fed).**
- [ ] **Step 2: Write output to file.**
- [ ] **Step 3: Dispatch glm-5.2:cloud reviewer (pre-fed, file inlined).**
- [ ] **Step 4: Apply real fixes (controller-verified).**
- [ ] **Step 5: Acceptance grep** (`f=.../riso.md`).
- [ ] **Step 6: Commit**

```bash
git add skills/keystone/references/themes/riso.md
git commit -m "feat(theme): riso deep spec — light/editorial (tactile-rebellion)"
```

---

### Task 12: Full lint green + final coherence review

**Files:**
- Verify: all 8 `skills/keystone/references/themes/*.md`, `test/lint-skill.mjs`

**Interfaces:**
- Produces: the acceptance gate — `npm test` + the lint 11-section block both green; a final coherence review confirming the 8 themes read as 8 distinct studios, not 8 colour-swaps of one template.

- [ ] **Step 1: Run the full engine + render + lint suite**

```bash
cd /Users/rector/local-dev/getpipher/keystone
npm test                                                    # 39 engine tests
node --import tsx --test test/extensions/render.test.mjs     # 1 render test
node --test test/lint-skill.mjs                              # lint incl. 8 new 11-section tests
```
Expected: 39 + 1 + (82 + 8) = 130 total, all green. The 8 `theme <slug> deep spec has all 11 sections` tests now PASS.

- [ ] **Step 2: Dispatch glm-5.2:cloud final coherence review (pre-fed)**

`subagent`, `agent: "general-purpose"`, `model: "Ollama/glm-5.2:cloud"`. Prompt (pre-fed — all 8 files inlined, no source-file reading):

> SCOPE GUARD: (verbatim).
>
> Final coherence review of 8 deep theme specs for @getpipher/keystone. All 8 files are inlined below. Verify: (a) the 8 themes read as 8 DISTINCT studios — different signature moves, different voice, different routing — not 8 colour-swaps of one template; (b) the genre-override rows are consistent with each theme's genre; (c) every engine-cross-ref gate number cited EXISTS in the gate list (gate numbers are G1-G57 + G38a); (d) no theme mentions "Hallmark"; (e) the two multi-accent themes (Hum, Riso) and the two mono/dark themes (Terminal, Midnight) are internally distinct, not duplicates. Report ONLY concrete defects with file + section + one-line fix. Do not rewrite.

- [ ] **Step 3: Controller verifies findings vs files; apply real fixes.**

- [ ] **Step 4: Re-run the suite — confirm still green.**

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "review(theme): 2b final coherence review fixes" || echo "no fixes needed"
```

---

### Task 13: PR #3, merge, handoff

**Files:**
- Push: `feat/skill-catalog-2b` → origin
- Update: `~/Documents/secret/strategy/keystone/session-handoff-2026-08-02.md` (new handoff for Plan 3)

- [ ] **Step 1: Push the branch**

```bash
git push -u origin feat/skill-catalog-2b
```

- [ ] **Step 2: Open PR #3**

```bash
gh pr create --base master --head feat/skill-catalog-2b \
  --title "feat(skill): Plan 2b — 8 deep theme specs" \
  --body "Deepens the 8 tokens-only stubs from Plan 2a (#2) into full 11-section specs: signature moves, voice fixtures, theme-specific anti-patterns, nav/footer routing, worked example, per-theme gate overrides, engine cross-refs. Adds the 11-section structural-lint assertion. 130 tests green (39 engine + 1 render + 90 lint). Does not touch engine/ or extensions/. Plan: docs/superpowers/plans/2026-08-02-keystone-deep-themes-2b.md."
```

- [ ] **Step 3: Verify CI (if any) + merge**

```bash
gh pr merge 3 --merge --delete-branch
git checkout master && git pull --ff-only
git branch -d feat/skill-catalog-2b
```

- [ ] **Step 4: Write the Plan 3 handoff**

Update `~/Documents/secret/strategy/keystone/session-handoff-2026-08-02.md` mirroring the 2026-07-30 handoff shape: progress table (2b → DONE, PR #3), starter prompt for Plan 3 (build-flow integration — the 7-step flow with the real @getpipher/vision pass, 3+2 iterate loop, RGB→OKLCH, --render/--viewports/--log CLI flags, orchestrator ctx fix). Update `~/.pi/agent/memory/-Users-rector-local-dev-getpipher-keystone/handoff-pointer.md` to point at the new handoff.

- [ ] **Step 5: Update the keystone memory handoff pointer**

```bash
cat > ~/.pi/agent/memory/-Users-rector-local-dev-getpipher-keystone/handoff-pointer.md <<'EOF'
# keystone — handoff pointer

Latest session handoff: `~/Documents/secret/strategy/keystone/session-handoff-2026-08-02.md`
(Plan 2b — 8 deep theme specs — COMPLETE, merged PR #3. 130 tests green.
Next: Plan 3 — build-flow integration. Predecessor: session-handoff-2026-07-30.md — Plan 2a.)

Project: @getpipher/keystone — anti-AI-slop design skill with an executable gate engine.
Beats Hallmark by enforcing its gates instead of imagining them. Repo: github.com/getpipher/keystone (PRIVATE until Plan 5).
Working dir: /Users/rector/local-dev/getpipher/keystone.
Spec: docs/superpowers/specs/2026-07-27-keystone-design.md. Engine plan: docs/superpowers/plans/2026-07-27-keystone-engine.md. 2a plan: docs/superpowers/plans/2026-07-28-keystone-skill-catalog-2a.md. 2b plan: docs/superpowers/plans/2026-08-02-keystone-deep-themes-2b.md.
EOF
```

---

## Self-Review

**1. Spec coverage (spec §7 "what deep means" — 11 rows):**
- Paper + accent OKLCH → preserved verbatim in every theme (Global Constraints + per-task "verbatim from stub"). ✓
- Display + body font pairing → preserved verbatim. ✓
- Signature moves → Tasks 3-11 `## Signature moves`, 2-3 seeded per theme. ✓
- Macrostructure affinity → renamed + expanded with reasons (Tasks 3-11). ✓
- Voice fixtures → Tasks 3-11 `## Voice fixtures` with headline/body/label/banned seeds. ✓
- Theme-specific anti-patterns → Tasks 3-11 `## Anti-patterns (theme-specific)` (disqualifiers folded). ✓
- Nav/footer archetype routing → Tasks 3-11 `## Nav & footer routing` (real N#/Ft# codes). ✓
- Worked example → Tasks 3-11 `## Worked example`. ✓
- 3 diversification axes at top → preserved (Global Constraints: axes stay at top). ✓
- Gate overrides per-theme → Tasks 3-11 `## Gate overrides` (genre map authoritative). ✓
- Engine cross-ref → Tasks 3-11 `## Engine cross-ref` (our original contribution). ✓
- Lint enforces the 11 sections → Task 2. ✓
- No "Hallmark" in theme files → Global Constraint + lint #5 (shipped) + SCOPE GUARD. ✓

**2. Placeholder scan:** No "TBD"/"TODO"/"fill in". Per-task seeds are concrete named moves + concrete example copy + real gate numbers + real archetype codes. The author develops the prose (established 2a pattern for markdown-authoring tasks). The lint code is complete. ✓

**3. Type consistency:** Theme slugs, gate numbers (G1-G57 + G38a), archetype codes (N1-N13, N1b, Ft1-Ft8), and the 11 heading strings are consistent across all tasks and the lint. The lint's `DEEP_SECTIONS` strings exactly match the mandated headings. ✓

**4. Known Plan-3 deferrals (do NOT fix in 2b):** RGB→OKLCH conversion; --render/--viewports/--log CLI flags; orchestrator ctx mutation. None touched. ✓

**5. Risk — glm-5.2 context-bleed:** mitigated by the SCOPE GUARD on every dispatch (Task 5, 6-11, 12). Controller verifies all reviewer findings against the file. minimax-m3 not used for review. ✓