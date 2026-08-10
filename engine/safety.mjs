// engine/safety.mjs — URL-mode SSRF guard for `keystone audit <url>`.
//
// Refuses, before any network call:
//   - non-http(s) schemes (file:, ftp:, gopher:, data:, blob:, dict:, ws:, wss:)
//   - loopback / private / link-local / CGNAT / TEST-NET IPv4
//   - loopback / unique-local / link-local IPv6 (+ v4-mapped bypass)
//   - localhost / *.localhost hostnames + common metadata hostnames
// DNS-resolves the hostname and checks every resolved address, so a public
// hostname that points at 169.254.169.254 is still refused.
//
// `--allow-private` escapes the private/loopback block (for auditing a local
// dev server, e.g. http://localhost:3000). Scheme + metadata-endpoint checks
// ALWAYS apply, even with --allow-private.
//
// No new deps — node:net isIP + a BigInt CIDR matcher.

import { isIP } from "node:net"
import { lookup } from "node:dns/promises"

const ALLOWED_SCHEMES = new Set(["http:", "https:"])

// Hostnames blocked outright (defence-in-depth; IP resolution catches the IPs too).
const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "metadata",
  "metadata.google.internal",
  "metadata.aws.internal",
])

/** IPv4 CIDRs that are always off-limits to a URL audit (unless --allow-private). */
const PRIVATE_V4 = [
  "0.0.0.0/8", // this-network
  "10.0.0.0/8", // private
  "127.0.0.0/8", // loopback
  "169.254.0.0/16", // link-local + cloud metadata (169.254.169.254)
  "172.16.0.0/12", // private
  "192.168.0.0/16", // private
  "100.64.0.0/10", // CGNAT
  "192.0.2.0/24", "198.51.100.0/24", "203.0.113.0/24", // TEST-NET (documentation)
]

/** IPv6 CIDRs that are always off-limits (unless --allow-private). */
const PRIVATE_V6 = [
  "::1/128", // loopback
  "fc00::/7", // unique-local
  "fe80::/10", // link-local
  "::ffff:0:0/96", // v4-mapped (e.g. [::ffff:127.0.0.1]) — extract + recheck v4
]

// ---- BigInt CIDR matcher (no deps) ----

function ipv4ToBigInt(ip) {
  let n = 0n
  for (const part of ip.split(".")) n = (n << 8n) | BigInt(parseInt(part, 10))
  return n
}

function ipv6ToBigInt(ip) {
  // Expand :: shorthand, lowercase, parse 8 hextets.
  const [head, tail] = ip.split("::")
  const headParts = head ? head.split(":") : []
  const tailParts = tail != null ? (tail ? tail.split(":") : []) : null
  const hextets = [...headParts]
  if (tailParts != null) {
    const fill = 8 - headParts.length - tailParts.length
    for (let i = 0; i < fill; i++) hextets.push("0")
    hextets.push(...tailParts)
  }
  let n = 0n
  for (const h of hextets) n = (n << 16n) | BigInt(parseInt(h || "0", 16))
  return n
}

function parseCidr(cidr) {
  const [ip, bits] = cidr.split("/")
  const family = isIP(ip)
  const max = family === 4 ? 32 : 128
  const prefix = bits === undefined ? BigInt(max) : BigInt(bits)
  const base = family === 4 ? ipv4ToBigInt(ip) : ipv6ToBigInt(ip)
  const mask = prefix === 0n ? 0n : ((1n << prefix) - 1n) << BigInt(max - Number(prefix))
  return { family, base: base & mask, mask, max: BigInt(max) }
}

function ipInCidr(ip, cidrSpec) {
  const family = isIP(ip)
  if (family !== cidrSpec.family) return false
  const ipInt = family === 4 ? ipv4ToBigInt(ip) : ipv6ToBigInt(ip)
  return (ipInt & cidrSpec.mask) === cidrSpec.base
}

const PRIVATE_V4_SPECS = PRIVATE_V4.map(parseCidr)
const PRIVATE_V6_SPECS = PRIVATE_V6.map(parseCidr)

/** Is a literal IP address in a blocked range? Pure — no network. */
export function isBlockedIpv(ip) {
  const family = isIP(ip)
  if (family === 4) return PRIVATE_V4_SPECS.some((c) => ipInCidr(ip, c))
  if (family === 6) {
    // v4-mapped ::ffff:a.b.c.d → extract the v4 and check the v4 list too.
    if (ip.toLowerCase().startsWith("::ffff:")) {
      const v4 = ip.slice("::ffff:".length)
      if (isIP(v4) === 4 && PRIVATE_V4_SPECS.some((c) => ipInCidr(v4, c))) return true
    }
    return PRIVATE_V6_SPECS.some((c) => ipInCidr(ip, c))
  }
  return false // not an IP literal — caller resolves the hostname
}

/** Is a hostname blocked outright (localhost / metadata)? Pure — no network. */
export function isBlockedHost(host) {
  const h = host.toLowerCase()
  if (BLOCKED_HOSTNAMES.has(h)) return true
  if (h.endsWith(".localhost")) return true
  return false
}

/** Does the URL use a blocked (non-http/https) scheme? Pure. */
export function hasBlockedScheme(url) {
  try {
    const u = new URL(url)
    return !ALLOWED_SCHEMES.has(u.protocol)
  } catch {
    return true // not a parseable URL → treat as blocked
  }
}

/**
 * Synchronous host re-check for a post-navigation final URL (no DNS).
 * Catches redirects to internal literal IPs + metadata hostnames. Does NOT
 * re-resolve (avoids TOCTOU; the redirect already resolved). Use after Playwright
 * follows redirects to abort before emitting a report on a redirected-to-internal target.
 *
 * @param {string} url
 * @param {{ allowPrivate?: boolean }} [opts]
 */
export function checkUrlHost(url, opts = {}) {
  const { allowPrivate = false } = opts
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    throw new Error(`keystone audit: post-redirect URL not valid: ${url}`)
  }
  if (!ALLOWED_SCHEMES.has(parsed.protocol)) {
    throw new Error(`keystone audit: redirect left the http(s) scheme (${parsed.protocol}) — aborted`)
  }
  const host = parsed.hostname
  // Metadata hostnames ALWAYS blocked, even with --allow-private.
  if (isBlockedHost(host)) {
    throw new Error(`keystone audit: redirect landed on blocked hostname ${host} — aborted`)
  }
  if (!allowPrivate && isIP(host) !== 0 && isBlockedIpv(host)) {
    throw new Error(`keystone audit: redirect landed on private/loopback ${host} — aborted`)
  }
}

/**
 * Assert a URL is safe to audit. Throws on blocked. Resolves the hostname and
 * checks every resolved address, so a public hostname pointing at a metadata
 * IP is still refused.
 *
 * @param {string} url
 * @param {{ allowPrivate?: boolean }} [opts]
 * @returns {Promise<URL>} the parsed URL (host already validated) — safe to goto.
 */
export async function assertSafeUrl(url, opts = {}) {
  const { allowPrivate = false } = opts
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    throw new Error(`keystone audit: not a valid URL: ${url}`)
  }
  if (!ALLOWED_SCHEMES.has(parsed.protocol)) {
    throw new Error(`keystone audit: refused — only http/https URLs are audited (got ${parsed.protocol}//)`)
  }
  const host = parsed.hostname

  // Metadata hostnames are ALWAYS blocked, even with --allow-private.
  if (isBlockedHost(host)) {
    throw new Error(`keystone audit: refused — blocked hostname ${host}`)
  }

  // Literal IP in the URL: check directly (no DNS).
  const ipFamily = isIP(host)
  if (ipFamily !== 0) {
    if (!allowPrivate && isBlockedIpv(host)) {
      throw new Error(`keystone audit: refused — ${host} is a private/loopback address (use --allow-private to audit a local target)`)
    }
    return parsed
  }

  // Hostname: resolve and check every address. If any resolved IP is blocked,
  // refuse (DNS rebinding / metadata-via-public-name defence).
  let addrs
  try {
    addrs = await lookup(host, { all: true })
  } catch (e) {
    throw new Error(`keystone audit: could not resolve ${host}: ${e.message}`)
  }
  if (!allowPrivate) {
    for (const a of addrs) {
      if (isBlockedIpv(a.address)) {
        throw new Error(`keystone audit: refused — ${host} resolves to private/loopback ${a.address} (use --allow-private to audit a local target)`)
      }
    }
  }
  return parsed
}