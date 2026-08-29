# Plan 5b · Brief 03 Maple Bakery — blind A/B verdict record & commit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land the blind-labeled A/B judgment for comparison brief 03 (`test/compare/gallery/03-maple-bakery/verdict-blind.md`) as the canonical record of the blind judging dispatch, after proving the judged renders are byte-identical to the committed ones.

**Architecture:** The brainstorm phase judged the two committed renders blind (A = `hallmark/keystone-render/*`, B = `keystone/keystone-render/*` — labels assigned by directory provenance, recorded after judging) and wrote `verdict-blind.md` (7 lines, the exact A/B record shape). This plan adds no design work and no re-judging: Task 1 proves hash continuity between the judged PNGs and the committed tree (so the record describes the committed bytes), Task 2 commits the record with exact paths. The pre-existing derived `verdict.md` (summary pass, committed at `cf8d79b`) stays untouched — the two files coexist: the blind record is the canonical judgment, the derived file remains the summary-pass artifact.

**Tech Stack:** shasum/git one-liners · git exact-path adds.

**Execution status:** Executed 2026-08-29 — `verdict-blind.md` written by the brainstorm dispatch (7 lines, A/B lines exactly per protocol); the candidate pair + renders were committed at `37a6f52` and verified twice since (hash chain + fresh-log engine reproduction in the gallery finalize).

## Global Constraints

- **Blind protocol:** the A/B labels in `verdict-blind.md` are by directory provenance, recorded after judging; do not relabel, re-grade, or merge it with the derived `verdict.md` — the two records coexist by design.
- **No design edits:** nothing under `candidates/03-maple-bakery/` is touched.
- **Commit scope — exact paths only:** `test/compare/gallery/03-maple-bakery/verdict-blind.md` + this plan document. Never a directory sweep (brief-01 lesson).
- **Commit message:** no AI attribution, no Co-Authored-By; one focused commit.
- **Working directory:** `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.

---

### Task 1: Pre-commit integrity — judged bytes == committed bytes

**Files:**
- Verify only: `test/compare/gallery/03-maple-bakery/{hallmark,keystone}/keystone-render/screenshot-{1280,375}.png` (the 4 judged renders)
- Verify only: `candidates/03-maple-bakery/{hallmark,keystone}/{index.html,style.css}` (the 2 committed candidates)
- Verify only: `test/compare/gallery/03-maple-bakery/verdict-blind.md` (the record being landed)

- [ ] **Step 1: Hash continuity — the 4 judged renders are the committed renders**

```bash
cd /Users/rector/local-dev/getpipher/keystone && for s in hallmark keystone; do for v in 1280 375; do
  echo "$s/$v committed: $(git show HEAD:test/compare/gallery/03-maple-bakery/$s/keystone-render/screenshot-$v.png | shasum | cut -d' ' -f1)"
  echo "$s/$v working:  $(shasum test/compare/gallery/03-maple-bakery/$s/keystone-render/screenshot-$v.png | cut -d' ' -f1)"
done; done
```

Expected: for each of the 4 renders, committed == working. Any divergence = the record describes bytes that are not the committed ones — stop and escalate.

- [ ] **Step 2: Candidate files unchanged since the verified state**

```bash
git status --short candidates/03-maple-bakery/
```

Expected: empty (the candidate pair was verified at `37a6f52` and re-verified twice; any entry here means a post-verification mutation — stop and escalate).

- [ ] **Step 3: The blind record's scores agree with the harness record**

```bash
grep -o "S1 [A-Z]* [0-9.]*" test/compare/gallery/03-maple-bakery/verdict-blind.md
node -e 'const v=require("./test/compare/gallery/03-maple-bakery/verdict.json"); const k=v.keystone, h=v.hallmark; console.log("keystone", k.score48+"/48 — failed:", k.distinctFailedGates.join(",")||"none"); console.log("hallmark", h.score48+"/48 — failed:", h.distinctFailedGates.join(",")||"none")'
```

Expected: blind record reads `S1 NO 0.15` (A) / `S1 NO 0.20` (B); harness reads keystone 48/48 (failed: none) and hallmark 42/48 (failed: 18,20,26,40,51,54). Consistency check only — the blind record's gate rows (all P) are the vision judgment; the engine findings live in the derived `verdict.md`.

---

### Task 2: Commit the blind record

**Files:**
- Commit: `test/compare/gallery/03-maple-bakery/verdict-blind.md` + this plan document

- [ ] **Step 1: Stage exact paths (never a directory sweep)**

```bash
git add test/compare/gallery/03-maple-bakery/verdict-blind.md \
        docs/superpowers/plans/2026-08-29-5b-brief03-blind-verdict-record.md
```

- [ ] **Step 2: Commit**

```bash
git commit -m "gallery(03): blind A/B verdict record — both candidates judged pass, S1 NO (hallmark 0.15 / keystone 0.20)"
```

(Executed-run note: if `git commit` reports nothing staged, a parallel lane has already landed the record — verify with `git log --oneline -- test/compare/gallery/03-maple-bakery/verdict-blind.md` and `git diff HEAD -- <file>` (must be empty) before accepting, per the brief-02/04 resolution path.)

- [ ] **Step 3: Verify the commit contents**

```bash
git show --stat --oneline HEAD
git status --short
git ls-files test/compare/gallery/03-maple-bakery/
```

Expected: the commit lists exactly `verdict-blind.md` + this plan doc (the derived `verdict.md`, renders, and scores were already tracked at `cf8d79b`); status shows only the known foreign untracked lanes (`brief02-keystone-verify.md`, `build-gallery.mjs`, any newer sibling artifacts); `git ls-files` now lists `verdict-blind.md`, `verdict.json`, `verdict.md` + the two render dirs.

---

## Final verification

1. `git log --oneline -1 -- test/compare/gallery/03-maple-bakery/verdict-blind.md` shows this plan's commit.
2. `git ls-files test/compare/gallery/03-maple-bakery/` includes `verdict-blind.md` alongside the pre-existing `verdict.md`, `verdict.json`, and renders.
3. `git status --short` shows no mutation to `candidates/03-maple-bakery/` and no file created outside `test/compare/gallery/03-maple-bakery/`, `docs/superpowers/plans/`, and `.superpowers/sdd/`.
4. The derived `verdict.md` (summary pass) is untouched — `git diff HEAD -- test/compare/gallery/03-maple-bakery/verdict.md` is empty.

## Out of scope (owned elsewhere)

- **Merging or re-grading the derived `verdict.md`** — the summary pass and the blind record coexist by design.
- **Keystone/hallmark rebuilds** — blind protocol; the records describe the verbatim outputs.
- **Harness re-runs, gallery template application, orchestrator tooling** — `run-comparison.mjs` / `build-gallery.mjs` lanes.
