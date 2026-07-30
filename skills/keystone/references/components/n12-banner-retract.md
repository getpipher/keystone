### N12 · Announcement banner + retracting nav
A coloured promo banner stacked above one real nav. On scroll-down the banner retracts, leaving a clean nav docked to the top; on scroll-up it slides back. A dismiss × removes the banner (height zeroes, no gap). The banner is a *banner*, not a second nav — colour contrast keeps them distinct.
*Use when:* there's a genuine, time-bound announcement (launch, sale, free shipping) over a product/marketing page.
*Don't confuse with:* a static announcement bar that never moves (not N12), N1b (single bar, no banner).
**Gates:** G14 (animate `transform` on the whole `.nav`, not banner height directly), G27 (reduced-motion fallback), G26 (banner links + dismiss button need interaction states), G48 (token discipline — `--color-accent` for banner fill).

```html
<header class="nav" id="nav">
  <div class="nav__banner" id="banner">
    <p class="nav__banner-text">New — <b>shared habits</b>. <a class="nav__banner-link">Try it →</a></p>
    <button class="nav__banner-x" id="banner-x" aria-label="Dismiss"><span></span></button>
  </div>
  <div class="nav__bar"><div class="nav__bar-inner">
    <a class="nav__brand">Tally</a>
    <nav class="nav__links">…</nav>
    <a class="btn btn--accent">Start</a>
  </div></div>
</header>
```
```css
:root { --banner-h: 42px; --bar-h: 64px; }
.nav { position: fixed; inset: 0 0 auto; z-index: 500; transform: translateY(0); transition: transform 320ms var(--ease-out); }
.nav.is-compact   { transform: translateY(calc(var(--banner-h) * -1)); }
.nav.is-dismissed { transform: none; }
.nav.is-dismissed .nav__banner { display: none; }
.nav__banner { height: var(--banner-h); display: flex; align-items: center; justify-content: center;
  background: linear-gradient(100deg, var(--color-accent), var(--color-accent-deep)); color: var(--color-paper); }
```
