# Plan 5b-02 · Tracejam blind-critique verdicts — record & commit gallery evidence

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Record the brief-02 blind-critique judgment (Candidate A/B gate verdicts + S1–S3) into `test/compare/gallery/02-streampipe-cli/verdict.md`, and commit the brief-02 gallery evidence (renders, scores, verdict.json, verdict.md) with exact paths.

**Architecture:** The harness already ran (`test/compare/gallery/index.json` + per-brief `verdict.json`/`score.json` exist; brief 02: keystone 47/47 rows → 48/48, hallmark 43/61 rows → 44/48, failed gates 20/26/40/49). The brainstorm phase judged the four rendered PNGs blind and produced the A/B verdict lines; this plan binds that judgment to the gallery paths (A = `…/keystone/keystone-render/*`, B = `…/hallmark/keystone-render/*` — the blind A/B labels resolve to keystone/hallmark purely by directory provenance, recorded as such), writes the human-readable verdict file, and commits exactly the brief-02 evidence. Other briefs' verdicts and the gallery builder are out of scope.

**Tech Stack:** Markdown (no build step) · git (exact-path adds).

**Execution status:** Not yet executed — this plan operationalizes the brainstorm phase's judgment from 2026-08-29 (transcript artifact: the A/B verdict lines reproduced verbatim in Task 1).

## Global Constraints

- **Blind protocol:** the judge saw only renders. The A→keystone / B→hallmark mapping in `verdict.md` is by directory provenance, recorded without grading the tools — verdicts are the skill outputs being compared, losses published as-is (`test/compare/README.md`: losses are published).
- **No design edits:** `verdict.md` records findings verbatim; no candidate file is touched.
- **Commit scope — exact paths only:** `test/compare/gallery/02-streampipe-cli/**` + this plan document. Do NOT commit: other briefs' gallery dirs (their judging dispatches are pending), `test/compare/build-gallery.mjs` (orchestrator-owned), `2026-08-29-5b-brief02-keystone-verify.md` (that lane's local artifact, untracked by its own terms).
- **Fold-limit honesty:** the captured PNGs are viewport-height; below-fold sections are judged from the visible rhythm + shipped structure, noted in the verdict file.
- **Commit message:** no AI attribution, no Co-Authored-By; one focused commit.
- Working directory for all commands: `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.

---

### Task 1: Write the verdict record

**Files:**
- Create: `test/compare/gallery/02-streampipe-cli/verdict.md`

**Interfaces:**
- Consumes: the brainstorm phase's A/B verdict lines (reproduced verbatim in Step 1); the harness `verdict.json` (keystone 47/47 → 48/48; hallmark 43/61 → 44/48, gates 20/26/40/49).
- Produces: the gallery's human-readable judgment record, cross-referenced to the official scores.

- [ ] **Step 1: Write the file with exactly this content**

```markdown
# Brief 02 · streampipe-cli — blind-critique verdicts

Two candidate renders, judged blind (Candidate A / Candidate B) from the five-viewport
renders in this directory. A = `keystone/keystone-render/`, B = `hallmark/keystone-render/`
(mapping by directory provenance, recorded after judging).

Brief (verbatim): "Make a docs landing for an open-source CLI called Streampipe. It does
stream parsing for log/event pipelines. Use the Terminal theme. Audience: backend
developers. Use case: install the tool and read the docs. Tone: technical, terse."

## Gate verdicts

A: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 flag:
"events 18,204 · 212 ev" — demo-output fiction inside the terminal box, not a page claim |
G47 P | G35 P | G36 P | S1 NO 0.18 | S2 Feels exactly like the brief — a terse phosphor CLI
docs page for SREs, with the command as hero and install/docs one hop away.

B: G6 P | G9 P | G29 P | G42 P | G43 P | G44 P | G45 P | G38a P | G30 P | G46 clean: only
"streampipe 0.9.2" versioning visible | G47 P | G35 P | G36 P | S1 YES 0.55: dead right
half-canvas at 1280; no brand, no CTA, generic "Install"/"One pipeline" labels | S2 Matches
the brief's register — technical, terse, install-first — but reads as a bare draft of it
rather than a designed docs landing.

## Gate notes (per gate, where the one-word verdict needs the sentence)

- **G44 (both)**: desktop folds carry eyebrow/nav, headline, lede, and the primary action
  (A: the `$ RUN` pill + install links; B: the install command block) — nothing critical
  below the fold.
- **G43 (both)**: the footer is below the fold in both captures; judged from the shipped
  structure (A: single-line credits; B: no footer visible in the captured region) — no
  4-column fingerprint on either side.
- **G46 (A)**: all figures ("events 18,204", "212 ev") sit inside the demo output box — the
  command's own stdout simulation, not a page proof-claim. Flagged for completeness.
- **G46 (B)**: "streampipe 0.9.2" is product versioning; clean.
- **G38a (both)**: all type upright mono/serif; zero italics in either render.
- **S1 (A)**: phosphor-on-black with mono-in-prose and real service names reads authored;
  closest tell is the demo box's neat table.
- **S1 (B)**: reads as an unfinished draft more than a designed page — the empty right
  half-canvas at 1280 is the strongest single tell.

## Official engine scores (from verdict.json — the moat check)

| Side | Rows | Score /48 | Failed gates |
|---|---|---|---|
| keystone (A) | 47/47 | **48** | none |
| hallmark (B) | 43/61 | **44** | 20 (no Keystone stamp — convention), 26 (missing :disabled + :hover on variant buttons), 40 (muted text on dark, Lc < 60), 49 (two-line clickable text) |

G20 is a cross-skill convention difference (Hallmark ships its own stamp format); G26/40/49
are substantive craft failures the engine caught in the Hallmark output — the moat working
as designed. Losses published per README.
```

- [ ] **Step 2: Verify the file**

Run: `head -12 test/compare/gallery/02-streampipe-cli/verdict.md`
Expected: the title line and the blind-protocol preamble, byte-identical to the block above.

---

### Task 2: Cross-check the recorded verdicts against the harness evidence

**Files:**
- Read only: `test/compare/gallery/02-streampipe-cli/{verdict.json, keystone/score.json, hallmark/score.json}`
- Read only: the four judged PNGs listed in the verdict file

**Interfaces:**
- Consumes: the harness run's own outputs (the plan does not re-run the harness — `run-comparison.mjs` already produced these).
- Produces: confirmation that verdict.md's "Official engine scores" table matches `verdict.json` exactly, and that all four judged PNGs exist.

- [ ] **Step 1: Cross-check scores**

```bash
node -e '
const v = JSON.parse(require("fs").readFileSync("test/compare/gallery/02-streampipe-cli/verdict.json", "utf8"));
for (const side of ["keystone", "hallmark"]) {
  const s = v[side];
  console.log(side, s.rowsPass + "/" + s.rowsTotal, "| score48:", s.score48, "| failed:", s.distinctFailedGates.join(",") || "none");
}'
```

Expected output, exactly:
```
keystone 47/47 | score48: 48 | failed: none
hallmark 43/61 | score48: 44 | failed: 20,26,40,49
```

- [ ] **Step 2: Verify the judged renders exist**

```bash
ls test/compare/gallery/02-streampipe-cli/keystone/keystone-render/screenshot-{1280,375}.png \
   test/compare/gallery/02-streampipe-cli/hallmark/keystone-render/screenshot-{1280,375}.png
```

Expected: four paths, no errors. These are the four files the brainstorm phase judged.

---

### Task 3: Commit the brief-02 gallery evidence

**Files:**
- Commit: `test/compare/gallery/02-streampipe-cli/**` (renders, dumps, scores, verdict.json, verdict.md) and `docs/superpowers/plans/2026-08-29-5b-brief02-gallery-verdicts.md` (this plan document)

**Interfaces:**
- Consumes: Tasks 1–2.
- Produces: the brief-02 evidence + verdicts committed on `feat/comparison-5b`, losses published per README.

- [ ] **Step 1: Stage exact paths (never a directory sweep above brief 02)**

```bash
cd /Users/rector/local-dev/getpipher/keystone
git add test/compare/gallery/02-streampipe-cli docs/superpowers/plans/2026-08-29-5b-brief02-gallery-verdicts.md
git status --short | head -40
```

Expected: staged files are exclusively under `test/compare/gallery/02-streampipe-cli/` plus this plan doc. Sibling lanes (`gallery/03…08` dirs once their verdicts land, `build-gallery.mjs`, `brief02-keystone-verify.md`) must remain unstaged/untracked.

- [ ] **Step 2: Commit**

```bash
git commit -m "gallery(02): streampipe-cli renders, scores, blind-critique verdicts — losses published"
```

- [ ] **Step 3: Verify the commit contents**

```bash
git show --stat --oneline HEAD | tail -30
git status --short
```

Expected: `git show` lists files under `test/compare/gallery/02-streampipe-cli/` (both sides' renders + dumps + score.json + verdict.json) and `verdict.md`; the plan doc; `git status` afterwards shows only `?? test/compare/gallery/03…08`, `?? docs/superpowers/plans/2026-08-29-5b-brief02-keystone-verify.md`, `?? test/compare/build-gallery.mjs` — all owned elsewhere.

---

## Self-review

- **Coverage:** the brainstorm artifact (A/B verdict lines) → Task 1 verbatim; cross-checks to the harness evidence (Task 2); losses-published commit per README (Task 3); out-of-scope lanes named (hallmark-finalize plan doc owned by its lane, build-gallery.mjs orchestrator, other briefs' verdicts pending their judging dispatches).
- **Placeholders:** none — the verdict content is embedded verbatim from the executed judging; every command has an expected output.
- **Consistency:** A/B↔keystone/hallmark mapping stated once in the preamble and used identically in the table; exact-path staging per the brief-01 lesson.

**Execution handoff:** run inline (four commands total). No subagent dispatch needed — every step is a verification or a single file write.
