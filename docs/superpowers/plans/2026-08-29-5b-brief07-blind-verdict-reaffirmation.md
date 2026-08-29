# Plan 5b · Brief 07 Foundry blind-record re-affirmation — verification-only (no repo changes)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the duplicate-dispatch loop for comparison brief 07: an implement dispatch re-judged the four committed renders (hallmark/keystone × 1280/375) and re-affirmed the existing blind record on every gate. This plan records that verification so the loop is auditable — **it writes nothing to the repo**.

**Architecture:** No implementation. The candidate pair shipped at `37d63b3` (keystone side) and `bcd7983` (the blind record). The re-affirmation dispatch read the four unchanged PNGs, matched every gate against `verdict-blind.md`, and emitted the standard A/B record lines. This plan pins the hashes and the verification commands so any reviewer can re-run them.

**Tech Stack:** shasum · git one-liners. No build step.

**Execution status:** Executed 2026-08-29/30 — all checks green (results inline per step). Zero files changed by the verification dispatch.

## Global Constraints

- **Read-only plan:** every task is a verification command; nothing is staged, committed, or written outside `/tmp`.
- The record at `bcd7983` is authoritative; a re-affirmation that disagrees must escalate (record both readings), never silently overwrite.
- Working directory: `/Users/rector/local-dev/getpipher/keystone`, branch `master` (post-merge; Plan 5b published through `641ca16`).

---

### Task 1: Byte-stability — the judged renders are the committed renders

**Files:**
- Verify only: `test/compare/gallery/07-foundry-compliance/{hallmark,keystone}/keystone-render/screenshot-{1280,375}.png`

- [x] **Step 1: Hash the four renders**

```bash
cd /Users/rector/local-dev/getpipher/keystone && for s in hallmark keystone; do for v in 1280 375; do
  echo "$s/$v: $(shasum test/compare/gallery/07-foundry-compliance/$s/keystone-render/screenshot-$v.png | cut -c1-12)"
done; done
```

Executed result: hallmark/1280 `f13bd23297aa` · hallmark/375 `8b1642c0f0b7` · keystone/1280 `dd69a2796435` · keystone/375 `8cc0cda1aed7`.

- [ ] **Step 2: Re-run anytime** — identical hashes confirm the judged pixels are the committed pixels; divergence escalates before any verdict re-use.

---

### Task 2: Record integrity — the committed blind record matches the fresh judgment

**Files:**
- Verify only: `test/compare/gallery/07-foundry-compliance/verdict-blind.md`

- [x] **Step 1: Confirm the record is committed and matches the A/B lines**

```bash
cd /Users/rector/local-dev/getpipher/keystone && git log --oneline -1 -- test/compare/gallery/07-foundry-compliance/verdict-blind.md && head -6 test/compare/gallery/07-foundry-compliance/verdict-blind.md
```

Executed result: last commit touching the file is `bcd7983` (the blind-record commit); the A/B lines match the re-affirmation dispatch's output gate-for-gate — all P, G46 clean on both sides ("number to confirm before launch" / "metric to confirm" — the honest em-dash pattern), S1 NO 0.20 (A) / NO 0.15 (B).

---

### Final verification

1. `git status --short` — clean; no repo mutations by this plan or the re-affirmation dispatch.
2. `git ls-files test/compare/gallery/07-foundry-compliance/` — the record, verdict.json, verdict.md, score.json, and 10 renders are tracked.
3. The verification added no artifacts — this plan doc itself is the only new record of the loop.

## Out of scope (owned elsewhere)

- **Success-criteria publication** — the measured shortfalls (gate delta +4.5 vs the predicted ≥5; hallmark S1 ~0.24 avg vs the predicted ≥0.50) are recorded in the per-brief verdicts; any summary post or criteria revision is the orchestrator's call.
- **`v1.0.0` tag / Pages hosting of the gallery** — orchestrator decisions.
- **Keystone-side rebuilds** — blind protocol; the records describe verbatim outputs.
