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
