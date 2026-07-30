### N10 · Floating-on-scroll morph
A sticky bar at the top that morphs into a floating pill as the user scrolls past a threshold. Two visual modes share one DOM — `.nav` owns the bar look, `.nav__inner` owns the pill look. Cross-faded on a single class toggle (`.is-floating`) with one timing curve.
*Use when:* atmospheric / modern-minimal pages where the kinetic micro-moment earns its place.
*Don't confuse with:* N5 Floating pill (always-on, no scroll behaviour). N10 is N5 plus a default-bar state that morphs into it.
**Gates:** G27 (reduced-motion fallback — disable the morph, keep the bar static), G14 (animate `transform`, not `width`/`height`/`margin`), G56 (sticky `top: 0` — if a page-level nav is also sticky, split z-index levels).

```html
<header class="nav">
  <div class="nav__inner">
    <a class="wordmark">Keystone</a>
    <ul class="nav__links">…</ul>
  </div>
</header>
```
```css
.nav { position: fixed; inset: 0 0 auto; z-index: 500; transition: transform 320ms var(--ease-out); }
.nav.is-floating .nav__inner { border-radius: 999px; backdrop-filter: blur(14px) saturate(120%); }
```
