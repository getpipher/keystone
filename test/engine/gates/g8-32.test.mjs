import { test } from "node:test"
import assert from "node:assert/strict"
import g8_32 from "../../../engine/gates/g8-32-diversification.mjs"

test("G8 fails when current macrostructure matches the last log entry", () => {
  const projectMemory = {
    stamp: { macrostructure: "Bento Grid", theme: "Cobalt", nav: "N5", footer: "Ft5" },
    log: [{ macrostructure: "Bento Grid", theme: "Cobalt", nav: "N5", footer: "Ft5", date: "2026-07-20" }],
  }
  const r = g8_32({ projectMemory })
  assert.ok(r.some(x => !x.pass && x.gate === 8))
})

test("G8 passes when macrostructure differs from last 3 entries", () => {
  const projectMemory = {
    stamp: { macrostructure: "Marquee Hero", theme: "Midnight", nav: "N2", footer: "Ft6" },
    log: [
      { macrostructure: "Bento Grid", theme: "Cobalt", nav: "N5", footer: "Ft5" },
      { macrostructure: "Long Document", theme: "Garden", nav: "N1b", footer: "Ft2" },
      { macrostructure: "Stat-Led", theme: "Hum", nav: "N13", footer: "Ft8" },
    ],
  }
  const r = g8_32({ projectMemory })
  assert.ok(r.every(x => x.pass))
})

test("G32 fails when nav matches last entry", () => {
  const projectMemory = {
    stamp: { macrostructure: "Marquee Hero", theme: "Midnight", nav: "N5", footer: "Ft6" },
    log: [{ macrostructure: "Bento Grid", theme: "Cobalt", nav: "N5", footer: "Ft5" }],
  }
  const r = g8_32({ projectMemory })
  assert.ok(r.some(x => !x.pass && x.gate === 32))
})