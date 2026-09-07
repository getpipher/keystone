// test/engine/host.test.mjs — omp-vs-pi runtime detection (engine/host.mjs).
// omp: bun-compiled binary → argv0 "omp" and/or argv[1] "/$bunfs/root/omp-*".
// Identity is injected (process.argv0 is read-only in node ≥ 24).
import { test } from "node:test"
import assert from "node:assert/strict"
import { isOmpRuntime } from "../../engine/host.mjs"

test("detects omp via bare argv0", () => {
  assert.equal(isOmpRuntime({ argv0: "omp", entry: "/$bunfs/root/omp-darwin-arm64" }), true)
})

test("detects omp via bunfs entry alone (argv0 remapped)", () => {
  assert.equal(isOmpRuntime({ argv0: "bun", entry: "/$bunfs/root/omp-darwin-arm64" }), true)
})

test("pi / plain node is not omp", () => {
  assert.equal(isOmpRuntime({ argv0: "node", entry: "/usr/local/bin/pi" }), false)
  assert.equal(isOmpRuntime({ argv0: "pi", entry: "/opt/homebrew/bin/pi" }), false)
})

test("lookalike paths are not omp", () => {
  assert.equal(isOmpRuntime({ argv0: "node", entry: "/$bunfs/root/chomp-x" }), false)
  assert.equal(isOmpRuntime({ argv0: "omputer", entry: "/usr/bin/omputer" }), false)
  assert.equal(isOmpRuntime({}), false)
})

test("defaults read the real process identity", () => {
  // this suite runs under plain node — the default identity must not claim omp
  assert.equal(isOmpRuntime(), false)
})
