// engine/host.mjs — which host is this module running in?
//
// omp and pi share the extension API, so the keystone extension needs a hard
// signal for "this is omp" to skip tool registration there (omp renders via the
// omp-native driver from its eval kernel instead — see render-omp.mjs).
//
// Env vars are useless: omp mirrors OMP_* to PI_* and neither leaves reliable
// markers in extension runtime env. What IS stable: omp ships as a bun-compiled
// single binary — argv0 is the bare "omp" name and argv[1] is the embedded
// bunfs entry point ("/$bunfs/root/omp-<platform>"). pi (node-based) matches
// neither. Verified against omp 18.1.12 on darwin-arm64.

/**
 * @param {{ argv0?: string, entry?: string }} [identity] defaults to the real
 *   process identity; injectable for tests (process.argv0 is read-only).
 * @returns {boolean} true when running inside the omp host
 */
export function isOmpRuntime(identity = { argv0: process.argv0, entry: process.argv[1] }) {
  if (identity.argv0 === "omp") return true
  return (identity.entry ?? "").startsWith("/$bunfs/root/omp-")
}
