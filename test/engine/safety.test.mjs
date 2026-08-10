import { test } from "node:test"
import assert from "node:assert/strict"
import { assertSafeUrl, checkUrlHost, isBlockedIpv, isBlockedHost, hasBlockedScheme } from "../../engine/safety.mjs"

test("hasBlockedScheme refuses non-http(s) schemes", () => {
  assert.ok(hasBlockedScheme("file:///etc/passwd"))
  assert.ok(hasBlockedScheme("ftp://example.com/x"))
  assert.ok(hasBlockedScheme("gopher://x"))
  assert.ok(hasBlockedScheme("data:text/html,<h1>"))
  assert.ok(hasBlockedScheme("blob:https://x"))
  assert.ok(hasBlockedScheme("dict://x"))
  assert.ok(hasBlockedScheme("ws://x"))
  assert.ok(hasBlockedScheme("not a url at all"))
  assert.ok(!hasBlockedScheme("http://example.com"))
  assert.ok(!hasBlockedScheme("https://example.com/path?q=1"))
})

test("isBlockedHost catches localhost + metadata hostnames", () => {
  assert.ok(isBlockedHost("localhost"))
  assert.ok(isBlockedHost("LOCALHOST"))
  assert.ok(isBlockedHost("foo.localhost"))
  assert.ok(isBlockedHost("metadata.google.internal"))
  assert.ok(isBlockedHost("metadata"))
  assert.ok(!isBlockedHost("example.com"))
  assert.ok(!isBlockedHost("sub.example.com"))
})

test("isBlockedIpv catches private/loopback/link-local IPv4", () => {
  assert.ok(isBlockedIpv("127.0.0.1"))
  assert.ok(isBlockedIpv("127.255.255.255"))
  assert.ok(isBlockedIpv("10.0.0.1"))
  assert.ok(isBlockedIpv("192.168.1.1"))
  assert.ok(isBlockedIpv("172.16.0.1"))
  assert.ok(isBlockedIpv("172.31.255.255"))
  assert.ok(isBlockedIpv("169.254.169.254"), "AWS/Azure/GCP metadata endpoint blocked")
  assert.ok(isBlockedIpv("169.254.170.2"), "ECS metadata endpoint blocked")
  assert.ok(isBlockedIpv("0.0.0.0"))
  assert.ok(isBlockedIpv("100.64.0.1"), "CGNAT blocked")
  // public IPs are NOT blocked
  assert.ok(!isBlockedIpv("1.1.1.1"))
  assert.ok(!isBlockedIpv("8.8.8.8"))
  assert.ok(!isBlockedIpv("93.184.216.34"), "example.com IP not blocked")
})

test("isBlockedIpv catches loopback/unique-local/link-local IPv6 + v4-mapped", () => {
  assert.ok(isBlockedIpv("::1"))
  assert.ok(isBlockedIpv("fc00::1"))
  assert.ok(isBlockedIpv("fdff:ffff::1"))
  assert.ok(isBlockedIpv("fe80::1"))
  assert.ok(isBlockedIpv("::ffff:127.0.0.1"), "v4-mapped loopback blocked via v4 list")
  assert.ok(isBlockedIpv("::ffff:169.254.169.254"), "v4-mapped metadata blocked")
  assert.ok(!isBlockedIpv("2606:4700::1"), "public v6 not blocked")
})

test("isBlockedIpv returns false for non-IP strings (hostnames)", () => {
  assert.ok(!isBlockedIpv("example.com"))
  assert.ok(!isBlockedIpv("localhost"))
  assert.ok(!isBlockedIpv("not-an-ip"))
})

test("checkUrlHost catches a redirect to a private literal IP", () => {
  assert.throws(() => checkUrlHost("http://169.254.169.254/latest/meta-data/"), "redirect landed on private")
  assert.throws(() => checkUrlHost("http://10.0.0.1/"), "redirect landed on private")
})

test("checkUrlHost catches a redirect to a metadata hostname even with --allow-private", () => {
  assert.throws(() => checkUrlHost("http://metadata.google.internal/", { allowPrivate: true }), "redirect landed on blocked hostname")
})

test("checkUrlHost allows a redirect to a public URL", () => {
  assert.doesNotThrow(() => checkUrlHost("https://example.com/path"))
  assert.doesNotThrow(() => checkUrlHost("http://127.0.0.1/", { allowPrivate: true }))
})

test("checkUrlHost refuses a redirect that leaves http(s)", () => {
  assert.throws(() => checkUrlHost("file:///etc/passwd"), "left the http(s) scheme")
})

test("assertSafeUrl refuses a literal loopback IP without --allow-private", async () => {
  await assert.rejects(
    () => assertSafeUrl("http://127.0.0.1/"),
    /refused — 127\.0\.0\.1 is a private\/loopback/,
  )
})

test("assertSafeUrl refuses the cloud metadata endpoint", async () => {
  await assert.rejects(
    () => assertSafeUrl("http://169.254.169.254/latest/meta-data/"),
    /refused — 169\.254\.169\.254 is a private\/loopback/,
  )
})

test("assertSafeUrl refuses localhost hostname without --allow-private", async () => {
  await assert.rejects(
    () => assertSafeUrl("http://localhost:3000/"),
    /blocked hostname localhost/,
  )
})

test("assertSafeUrl refuses a blocked scheme", async () => {
  await assert.rejects(() => assertSafeUrl("file:///etc/passwd"), /only http\/https/)
  await assert.rejects(() => assertSafeUrl("ftp://example.com/"), /only http\/https/)
})

test("assertSafeUrl allows a literal loopback IP WITH --allow-private", async () => {
  const u = await assertSafeUrl("http://127.0.0.1:3000/", { allowPrivate: true })
  assert.equal(u.hostname, "127.0.0.1")
})

test("assertSafeUrl still refuses metadata hostname even with --allow-private", async () => {
  await assert.rejects(
    () => assertSafeUrl("http://metadata.google.internal/", { allowPrivate: true }),
    /blocked hostname metadata\.google\.internal/,
  )
})