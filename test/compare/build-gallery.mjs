// Plan 5b — apply the gallery template over the runner's index.json.
// Produces gallery/index.html with the entries INLINED (the raw template
// fetches ./index.json at runtime, which fails over file:// — inlining makes
// the committed gallery self-contained everywhere, Pages included).
//
// Usage:
//   node test/compare/build-gallery.mjs --gallery test/compare/gallery
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const args = {}
for (let i = 2; i < process.argv.length; i += 2) {
  const k = process.argv[i]
  if (!k?.startsWith("--")) throw new Error(`unexpected arg: ${k}`)
  args[k.slice(2)] = process.argv[i + 1]
}
const galleryDir = args.gallery ?? "test/compare/gallery"

const indexJson = JSON.parse(readFileSync(join(galleryDir, "index.json"), "utf8"))
const template = readFileSync(join(galleryDir, "index.template.html"), "utf8")

// Replace the runtime fetch with the inlined payload — same downstream code.
const inlined = `const res = ${JSON.stringify(indexJson)}; // inlined from index.json by build-gallery.mjs`
const fetchBlock = `const res = await fetch("./index.json").then((r) => r.json()).catch(() => null)`
if (!template.includes(fetchBlock)) {
  throw new Error("gallery template: expected the index.json fetch block — template changed?")
}
let html = template.replace(fetchBlock, inlined)
// fetch was inside an async IIFE-free module script; inlining makes `await` unused elsewhere — keep the script valid:
html = html.replace('<script type="module">', "<script>")

const totals = indexJson.map((v) => {
  const h = v.hallmark?.score48 ?? null
  const k = v.keystone?.score48 ?? null
  return `${v.brief}: hallmark ${h ?? "—"}/48 · keystone ${k ?? "—"}/48`
})

writeFileSync(join(galleryDir, "index.html"), html)
console.log(`gallery/index.html written (${indexJson.length} briefs)`)
console.log(totals.join("\n"))
