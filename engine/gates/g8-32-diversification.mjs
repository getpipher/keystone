import { pass, fail } from "../types.mjs"

export default function detect(ctx) {
  const pm = ctx.projectMemory
  if (!pm || !pm.stamp) return [pass(8, "Diversification"), pass(32, "Nav/footer rotation")]
  const last3 = (pm.log || []).slice(0, 3)
  const results = []
  const curMacro = pm.stamp.macrostructure
  if (last3.some(e => e.macrostructure === curMacro)) {
    results.push(fail(8, "Macrostructure reuse", `current ${curMacro} matches a prior run`, "pick a different macrostructure per .keystone/log.json"))
  } else {
    results.push(pass(8, "Macrostructure reuse"))
  }
  const curNav = pm.stamp.nav
  const curFooter = pm.stamp.footer
  const navReuse = last3.length && last3[0].nav === curNav
  const footerReuse = last3.length && last3[0].footer === curFooter
  if (navReuse || footerReuse) {
    results.push(fail(32, "Nav/footer rotation", `nav ${curNav} or footer ${curFooter} matches last run`, "rotate nav + footer per the routing table"))
  } else {
    results.push(pass(32, "Nav/footer rotation"))
  }
  return results
}