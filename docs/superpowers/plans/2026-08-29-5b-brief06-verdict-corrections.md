# Plan 5b-06 · Anya portfolio — verdict corrections & second-judge record

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the copy-pasted brief-02 notes in `gallery/06-anya-portfolio/verdict.md` (false for this brief), and record a second judge's independent blind verdicts of the same four renders — including the genuine divergence on the keystone side — without flattening either judgment.

**Architecture:** Brief 06's gallery records are committed (`bcd7983`) but imperfect: `verdict.md` pastes brief-02's failed-gate notes verbatim ("G40/G49/G51/G54") and a G46-flag note about demo-output figures that do not exist on this portfolio (actual hallmark failures: G20 only; G46 clean both sides). Additionally, a second independent blind judging of the same four PNGs (this plan's design artifact) diverges from the first on the keystone render: G6, G42, and S1 confidence. This plan corrects the note, appends the second-judge record labelled as such, and commits with exact paths. No candidate file is touched.

**Tech Stack:** Markdown only · git (exact-path adds).

## Global Constraints

- **Blind protocol:** records describe renders only. The two judgments are both kept — divergence between judges is documented, never averaged away or flattened.
- **No design edits:** any verification failure is recorded and escalated; candidates are never patched.
- **Commit scope — exact paths:** `test/compare/gallery/06-anya-portfolio/{verdict.md, verdict-blind.md}` + this plan document. Nothing else (parallel lanes own their files: `gallery/07…`, `gallery/08…`, `verdict-blind.md` files of other briefs).
- **Facts to preserve (from verdict.json, harness):** keystone 47/47 rows → 48/48, no failed gates; hallmark 46/47 rows → 47/48, failed gate G20 only (missing *Keystone* stamp — cross-skill convention).
- **Facts to preserve (from verdict-blind.md, first judge):** A = Hallmark (all gates P, S1 NO 0.15), B = Keystone (all gates P, S1 NO 0.20) — note this judge's A/B labels are opposite to the second judge's.
- **Commit message:** no AI attribution, no Co-Authored-By; one focused commit.
- Working directory: `/Users/rector/local-dev/getpipher/keystone`, branch `feat/comparison-5b`.

---

### Task 1: Verify current state

**Files:**
- Read only: `test/compare/gallery/06-anya-portfolio/{verdict.md, verdict-blind.md, verdict.json}`

**Interfaces:**
- Produces: confirmation the copy-paste error and both blind records are as described, so Task 2's corrections target reality.

- [ ] **Step 1: Confirm the copy-paste error**

```bash
grep -n "G40/G49/G51/G54\|demo-output figures" test/compare/gallery/06-anya-portfolio/verdict.md
```

Expected: exactly one line matching (the pasted brief-02 notes line); plus the G46-flag phrase if present. These are the lines Task 2 corrects.

- [ ] **Step 2: Confirm the first judge's record and the harness facts**

```bash
head -8 test/compare/gallery/06-anya-portfolio/verdict-blind.md
node -e 'const v=JSON.parse(require("fs").readFileSync("test/compare/gallery/06-anya-portfolio/verdict.json","utf8")); for (const s of ["keystone","hallmark"]) console.log(s, v[s].rowsPass+"/"+v[s].rowsTotal, "score48:", v[s].score48, "failed:", v[s].distinctFailedGates.join(",")||"none")'
```

Expected: `verdict-blind.md` opens with the A-line (cream portfolio, S1 NO 0.15 → A = Hallmark); scores print `keystone 47/47 score48: 48 failed: none` and `hallmark 46/47 score48: 47 failed: 20`.

---

### Task 2: Correct `verdict.md` — replace pasted brief-02 notes with brief-06 facts

**Files:**
- Modify: `test/compare/gallery/06-anya-portfolio/verdict.md`

**Interfaces:**
- Consumes: the Task 1 verified state.
- Produces: a verdict.md whose per-side notes are true for THIS brief, ready for the Task 3 second-judge appendix.

- [ ] **Step 1: Replace the false notes line and add the correct per-gate appendix**

Replace the line beginning `Hallmark failed-gate notes:` (the one matching Task 1 Step 1's grep) and the `G46 flag on Keystone's…` sentence with:

```markdown
Hallmark failed-gate notes: G20 (missing *Keystone* stamp) is a cross-skill convention
difference — Hallmark's only failed gate this brief; no craft defects in the Hallmark
output. G46: clean on both sides — the portfolio carries no figures at all (the brief
supplied none and the design invents none), so there is nothing to flag.

## Gate verdict appendix — keystone side (second judge, see Task 3)

The second independent judge failed three gates on the keystone render that the first
judge passed; both records are preserved below (Task 3) without reconciliation.
```

- [ ] **Step 2: Verify**

Run: `grep -c "G40/G49/G51/G54\|demo-output figures" test/compare/gallery/06-anya-portfolio/verdict.md`
Expected: `0` (the false notes are gone; the words may only survive inside the Task 3 appendix quote blocks, which this grep tolerates being re-checked after Task 3).

Run: `grep -c "G20 (missing \*Keystone\* stamp) is a cross-skill convention" test/compare/gallery/06-anya-portfolio/verdict.md`
Expected: `1` (the corrected note present).

---

### Task 3: Append the second-judge record (divergence preserved)

**Files:**
- Modify: `test/compare/gallery/06-anya-portfolio/verdict.md` (append at end)

**Interfaces:**
- Consumes: the corrected verdict.md from Task 2.
- Produces: the two-judge record — first judge (verdict-blind.md, A=Hallmark/B=Keystone) and second judge (this appendix, A=Keystone/B=Hallmark) — with divergences explicit.

- [ ] **Step 1: Append this block verbatim**

```markdown
---

## Second judge — independent blind record (appended; labels opposite to the first judge)

A second judge independently viewed the same four renders and labelled them
A = keystone, B = hallmark. Verdicts, verbatim:

A (keystone render): G6 F | G9 P | G29 P | G42 F | G43 P | G44 P | G45 P | G38a P |
G30 P | G46 clean: no numeric claims anywhere on the page | G47 P | G35 P | G36 F |
S1 YES 0.45: centred-everything hero; bordered-card bento; generic "Principle"/"Now"
card pair | S2 A coherent architect one-pager that answers the brief, though the
centred-hero-plus-bento presentation is the pattern's generic side.

B (hallmark render): G6 P | G9 P | G29 P | G42 P | G43 P | G44 F | G45 P | G38a P |
G30 P | G46 clean: no numeric claims anywhere on the page | G47 P | G35 P | G36 P |
S1 NO 0.12 | S2 Exactly this brief — a warm, considered one-pager in the architect's
own first-person voice, opinionated down to the numbered principles.

Judge variance (both records stand; not reconciled):
- G6 — first judge PASS, second judge FAIL: the centred eyebrow+display lede is a
  centred-everything stack to the second judge; the first judge read the bento below
  as breaking the axis.
- G42 — first judge PASS, second judge FAIL: the nav carries wordmark + 3 links +
  filled button + hairline; the fingerprint's "4–5 links" count is the only element
  missing, and the second judge weighed the visual pattern over the count.
- G36 — second judge FAIL: the filled Contact button is taller than its neighbouring
  text links; first judge did not score the row.
- S1 — first judge NO 0.20 (keystone), second judge YES 0.45 (same render): both note
  the bento; they weigh the specific copy (Ledgerline/Carepath/Stockwell) differently.

Harness facts (unaffected by judge variance): keystone 47/47 rows → 48/48, no failed
gates; hallmark 46/47 rows → 47/48, failed gate G20 only.
```

- [ ] **Step 2: Verify**

Run: `grep -c "Second judge — independent blind record" test/compare/gallery/06-anya-portfolio/verdict.md`
Expected: `1`

Run: `grep -c "G6 — first judge PASS, second judge FAIL" test/compare/gallery/06-anya-portfolio/verdict.md`
Expected: `1`

---

### Task 4: Commit

**Files:**
- Commit: `test/compare/gallery/06-anya-portfolio/{verdict.md, verdict-blind.md}` and this plan document

**Interfaces:**
- Consumes: Tasks 2–3.
- Produces: the corrected, two-judge verdict record committed on `feat/comparison-5b`.

- [ ] **Step 1: Stage exact paths and commit**

```bash
cd /Users/rector/local-dev/getpipher/keystone
git add test/compare/gallery/06-anya-portfolio/verdict.md \
        test/compare/gallery/06-anya-portfolio/verdict-blind.md \
        docs/superpowers/plans/2026-08-29-5b-brief06-verdict-corrections.md
git commit -m "docs(5b): brief06 verdict corrections — pasted brief02 notes removed, second-judge divergence recorded"
```

- [ ] **Step 2: Verify the commit contents**

```bash
git show --stat --oneline HEAD
git status --short
```

Expected: `git show` lists exactly `verdict.md`, `verdict-blind.md`, and the plan doc; `git status` afterwards shows only parallel-lane untracked files (`gallery/07…`/`gallery/08…` artifacts if any, `brief02-keystone-verify.md`, `build-gallery.mjs`).

---

## Self-review

- **Coverage:** the brainstorm artifact (the second judge's A/B lines + the three divergence notes) → Task 3 verbatim; the copy-paste correction (design artifact's "False for brief 06" finding) → Task 2; harness facts preserved verbatim (Global Constraints); exact-path commit → Task 4.
- **Placeholders:** none — the second-judge block is the executed judgment embedded verbatim; every verify command has an expected output.
- **Consistency:** the A/B label flip between judges is stated once in the appendix preamble and once in each divergence note — no silent relabelling; verdict.json facts are quoted identically in Global Constraints and Task 1 Step 2.

**Execution handoff:** run inline — three file edits and two command batches; nothing orchestrator-gated (losses for brief 06 are one gate, published in the committed record).
