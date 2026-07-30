### N5 · Floating pill
A rounded full-pill nav, visibly detached from the page edges, sitting ~`var(--space-md)` from the top, soft blur backdrop, soft shadow. Contemporary modern-minimal — Vercel, Linear, Framer, Raycast.
*Use when:* the page is modern-minimal / atmospheric and the hero has a distinct surface beneath the pill for the blur to sit over.
*Don't confuse with:* N1 Wordmark + 2 links (full-width), N2 Floating chip (corner-anchored).
**Gates:** G42 (AI nav fingerprint — N5 is a non-default, acceptable for rotation), G48 (token discipline — `color-mix` + `--color-paper` tokens, no inline hex), G26 (pill links need interaction states).

```html
<nav class="nav-pill" aria-label="Primary">
  <a class="wordmark">Studio</a>
  <ul class="nav-pill__links"><li><a>Catalog</a></li><li><a>Voice</a></li></ul>
  <a class="cta-fill">Get →</a>
</nav>
```
```css
.nav-pill {
  position: fixed; inset: var(--space-md) auto auto 50%;
  transform: translateX(-50%);
  display: inline-flex; align-items: center; gap: var(--space-md);
  padding: 0.5rem 0.875rem;
  background: color-mix(in oklch, var(--color-paper) 78%, transparent);
  backdrop-filter: blur(14px) saturate(120%);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: 999px;
  box-shadow: 0 8px 24px -12px oklch(0% 0 0 / 0.18);
  z-index: 20;
}
```
