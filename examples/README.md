# Examples — five builds, engine-verified

Five complete Keystone builds, each one emitted through the full Build flow
(SKILL.md Steps 1–7) and scored by the real engine: 46 deterministic detectors,
headless Chromium renders at 1280 / 768 / 414 / 375 / 320 px, and a vision pass
on the actual screenshots. Every directory carries its own proof — the final
`keystone-report.html` is openable, the committed screenshots are what the
vision pass judged, and `brief.md` records the picks, iterations, and verdicts.

**All five score 48/48 — every gate number passes.** None shipped with declared
failures; iteration counts ranged 1–3 against the cap of 3.

| # | Build | Theme | Genre | Macrostructure | Score | Vision S1 | Evidence |
|---|---|---|---|---|---|---|---|
| 01 | [Kestrel · observability](01-cobalt-observability/) | Cobalt | modern-minimal | Split Studio | **48/48** | NO (0.12) | [report](01-cobalt-observability/keystone-report.html) · [audit](01-cobalt-observability/keystone-audit-report.md) · [brief](01-cobalt-observability/brief.md) |
| 02 | [Fern & Fog · plant shop](02-garden-plantshop/) | Garden | editorial | Long Document | **48/48** | NO (0.10) | [report](02-garden-plantshop/keystone-report.html) · [brief](02-garden-plantshop/brief.md) |
| 03 | [capstan · deploy CLI](03-terminal-cli/) | Terminal | atmospheric | Manifesto | **48/48** | NO (0.14) | [report](03-terminal-cli/keystone-report.html) · [brief](03-terminal-cli/brief.md) |
| 04 | [Two Drum Press · riso studio](04-riso-printstudio/) | Riso | editorial | Catalogue | **48/48** | NO (0.15) | [report](04-riso-printstudio/keystone-report.html) · [brief](04-riso-printstudio/brief.md) |
| 05 | [Lingua Potluck · language co-op](05-hum-languages/) | Hum | playful | Bento Grid | **48/48** | NO (0.13) | [report](05-hum-languages/keystone-report.html) · [brief](05-hum-languages/brief.md) |

## What the set proves

- **The S3 question** — *would two pages from this skill feel like different
  sites?* Five briefs, five different macrostructures, five themes spanning all
  four genres, both paper bands, and seven display styles. A cobalt diptych for
  SREs, a serif shop journal, a phosphor manifesto, a two-ink print catalogue,
  and a cream bento for a dinner-table co-op. No two share a nav, a footer, or
  a voice.
- **Self-audit** — example 01 additionally runs `keystone audit` on its own
  output: 43/43 audited gates pass, 4 N/A (the diversification/stamp gates that
  are meaningless on external code). The audit report is committed.
- **Honest fiction** — every build is a fictional product, so every number in
  them (latencies, prices, edition runs) is labelled in the brief as the
  product's own consistent spec. No invented social proof anywhere: no customer
  counts, no logo walls, no testimonials from people who don't exist.

## Re-run the engine on any example

```bash
node engine/check-gates.mjs \
  --html examples/01-cobalt-observability/index.html \
  --css examples/01-cobalt-observability/style.css \
  --render --viewports 1280,375,320,414,768 \
  --out /tmp/report-01
```

Each directory also keeps `tokens.css` — the portable token export of that
build's theme, ready to lift into another project.
