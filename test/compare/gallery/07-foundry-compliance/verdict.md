# Verdict · Brief 07 — foundry compliance

> "Build a landing page for Foundry — SOC2 and ISO 27001 compliance automation for B2B SaaS. Show: how many companies got compliant, what it costs, who uses it. Audience: founders + CTOs. Tone: technical but trustworthy."

## Engine (48 gates, deterministic)

| Side | Score | Failed gates | Failing rows |
|---|---|---|---|
| Hallmark | 44/48 | G4, G20, G40, G51 | 43/53 |
| Keystone | **48/48** | none | 47/47 |

Hallmark's real failures: G4 (nested cards), G40 (a link pair below the APCA
floor), G51 (display rule missing wrap props). G20 = stamp metadata.

## Vision (18-question prompt, 1280 + 375)

| Row | Hallmark | Keystone |
|---|---|---|
| S1 | NO (0.30) — restrained black/white minimal with mono framework pills; slightly generic | NO (0.25) — corporate blue is safe; token discipline shows |
| S2 | YES — and the brief's trap ("show how many companies") is answered HONESTLY: "number to confirm before launch" with a placeholder slot | YES — same trap, the gate's own prescribed pattern: "—" + "metric to confirm" in a stat strip; "FRAMEWORKS WIRED IN 04" uses the brief's real count |
| G38a | PASS | PASS |
| G46 | clean — exemplary honest placeholder | clean — exemplary honest placeholder |
| G42 nav fingerprint | PASS (3 links + CTA, no hairline) | PASS (3 links + ⌘K + CTA; blue hairline present but link count safe) |
| G44 hero fit | PASS | PASS |
| Mobile 375 | clean (nav collapses to wordmark + CTA) | clean (same pattern) |

Skill picks: Hallmark = Coral/Bento · Keystone = Stat-Led/Cobalt.

**Engine winner: Keystone (+4).** Both skills refused to invent a customer
count — the honest-copy discipline is real on both sides. The gap is again the
invisible kind: a nested-card structure (G4), one low-contrast link pair
(G40), and a wrap-prop gap (G51) that only a render-aware checker finds.
