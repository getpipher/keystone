#!/usr/bin/env node
// `keystone` CLI dispatcher (the standalone entry point installed by npm).
//   keystone audit <path|url> [flags]   → engine/audit.mjs (read-only punch list)
//   keystone check [flags]              → engine/check-gates.mjs (the build-flow gates)
// `build` is a skill verb (the model follows SKILL.md), not a CLI.
import { spawnSync } from "node:child_process"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const verb = process.argv[2]
const rest = process.argv.slice(3)

const scripts = {
  audit: "audit.mjs",
  check: "check-gates.mjs",
  gates: "check-gates.mjs",
}

const script = scripts[verb]
if (!script) {
  console.error(`usage: keystone audit <path|url> [--no-render] [--allow-private] [--out <dir>]
       keystone check [--gates] --html <page.html> --css <page.css> [--render] [--viewports 1280,375,320,414,768] [--log .keystone/log.json] [--out <dir>]`)
  process.exit(1)
}

const r = spawnSync(process.execPath, [join(here, script), ...rest], { stdio: "inherit" })
if (r.error) {
  console.error("keystone: failed to launch the engine:", r.error.message)
  process.exit(1)
}
process.exit(r.status ?? 1)
