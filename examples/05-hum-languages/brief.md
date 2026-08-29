# Example 05 · Lingua Potluck — language co-op (Hum · Bento Grid)

The last of the five Keystone showcase builds. Fictional co-op, real gates:
emitted through the full Build flow (SKILL.md Steps 1–7), engine-verified with
all 46 deterministic detectors at 5 viewports.

## The brief

> Landing page for Lingua Potluck, a community language-learning co-op.
> Audience: neighbours who want to keep a language alive or pick one up
> without an app. Use: join this week's table. Tone: warm, communal,
> unstressed — a dinner invitation, not a growth funnel.

## Step 1 · Design-context gate

- **Audience** — everyday polyglots and first-timers; the co-op has no teachers.
- **Use** — one action: save a seat at a table.
- **Tone** — playful but grounded. Post-Linear soft school with dinner-table manners.

**Genre:** playful → `references/genres/playful.md`.

## Step 2 · Structure picks

- **Macrostructure: Bento Grid** (01) — "many small things to show": how it
  works, this week's tables, a new-table badge, a member quote, the free-forever
  promise, the language chips, the signup. Mixed spans (1×2 tall, 2×1 wide),
  gaps as the only divider.
- **Nav: N5** (floating pill — soft shadow, no hairline; 3 links + press-button CTA).
- **Footer: Ft8** (marquee scroll — a slow greetings ticker in the co-op's
  languages; pauses on hover/focus-within, static under reduced motion).
- **Theme: Hum** (light · rounded-sans · multi-accent) — pear fills under dark
  ink, cyan links, coral reserved for the one new-table badge.
- **Diversification:** differs from 01–04 on macro, theme (rounded-sans, warm
  multi), nav, footer, and voice.

## Step 4 · Enrichment

The theme's press-button system (edge + ground shadow, 140ms hover lift, 70ms
press-down — no scale, no overshoot) is the interaction craft; the marquee is
the footer's own archetype. Nothing else moves.

## Step 5 · Preview

**Keystone · v0.1.0**

- **Macrostructure** · Bento Grid
- **Theme** · Hum (light · warm multi · rounded-sans)
- **Enrichment** · press-feedback buttons (theme signature) + marquee footer (Ft8)
- **Sections** · pill nav · hero · bento (7 cells) · where · marquee footer
- **Motion** · button press feedback · marquee drift (slow, pausable, reduced-motion-safe)
- **Slop test** · pending — engine runs at Step 7

## Step 7 · The slop test (engine-verified)

### 7.1 Deterministic loop

```bash
node engine/check-gates.mjs --html index.html --css style.css \
  --log .keystone/log.json --render --viewports 1280,375,320,414,768 --out .
```

- **Emit 1** — 43/47 rows · fails: G18 (marquee paused on hover but not
  `:focus-within`), G23 (13.2% — the pear-filled cell was a wash), G40 (the
  coral badge's text lost a specificity fight to `.cell p` — and nothing
  readable passes on saturated coral anyway), G51 (`.hero .btn` rule).
- **Emit 2** — **47/47 rows · 0 fails.** Fixes: `:focus-within` pause; the pear
  cell becomes a pear top-edge (pear survives on buttons alone, ~2.5% of the
  viewport); badge restyled as a coral outline chip with ink text; wrap props
  on the last hero rule.
- Deterministic iterations used: 2 of 3.

### 7.2 Vision pass (18 questions · full-page capture)

| Gate | Verdict | Evidence |
|---|---|---|
| G6 hero centred-everything | PASS | left-anchored hero stack; CTA sits under the lede, off any centred axis |
| G9 equal-whitespace sections | PASS | hero → bento field → where note → marquee footer: four distinct movements |
| G29 abstract background | PASS | flat cream; shadows do the lifting, no gradients or mesh |
| G42 nav fingerprint | PASS | floating pill, 3 links + press CTA, soft shadow instead of a hairline |
| G43 footer fingerprint | PASS | greetings marquee + one meta row; no link columns |
| G44 hero fit | PASS | engine-verified bounding rects; visually confirmed |
| G45 decorative-without-purpose | PASS | the marquee is the co-op's actual dinner-table greeting; buttons press because buttons should |
| G38a italic headers | PASS | everything roman; quote cite is upright mono |
| G30 icon tells | PASS | no icons, no emoji; the coral badge is typography |
| G46 invented metrics | FLAG (accepted) | table times and seat counts are the co-op's own weekly fiction; no streaks, no user counts, no social-proof fabrication |
| G47 re-drawn chrome | PASS | no frames; the timetable is a real table |
| G35 decorative stroke position | PASS | underlines 2px at 3px offset |
| G36 flex align-items | PASS | pill and button rows aligned center; press-buttons line-heighted to a single line at every width |
| S1 looks AI-generated? | **NO (0.13)** | pear press-buttons with a real 3-state feel, a dinner-table voice, Toki Pona in the chip row — nothing here reads generated |
| S2 feels like this brief? | **YES** | a warm co-op invitation with dinner manners |
| S3 two pages, different sites? | **YES** — vs 01–04 | fifth distinct macro, theme, nav, footer, and voice in the set |

- Vision iterations used: 0 of 2.

### 7.3 Resolution

**Keystone · v0.1.0**

- **Slop test · 48/48 ✓ (engine-verified) — ./keystone-report.html**

### 7.4 Stamp + log

Stamp filled in `style.css` line 1; `.keystone/log.json` seeded (gitignored).

## Re-run it yourself

```bash
node engine/check-gates.mjs \
  --html examples/05-hum-languages/index.html \
  --css examples/05-hum-languages/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/potluck-report
```
