### N1b · Canonical SaaS three-section
Wordmark hard-left, centred 4–6 link cluster (some with hover dropdowns), sign-in + filled CTA hard-right. The dominant marketing nav of 2024–26. Dense and balanced — the structural opposite of N1's minimal two-link variant.
*Use when:* SaaS / product / dev-tool with several destinations and a clear primary action. The default reach for modern-minimal and playful product pages.
*Don't confuse with:* N1a (wordmark + 2 links, no centre cluster), N5 (detached pill), N11 (mega-menu panels, not small dropdowns).
**Gates:** G42 (AI nav fingerprint — N1b is the dense, balanced canonical bar; prefer it over N1a for real products), G26 (all links + buttons need interaction states), G49 (link labels stay single-line).

```html
<header class="nav"><div class="nav__inner">
  <a class="nav__brand">Conduit</a>
  <nav class="nav__center">
    <div class="nav__item nav__item--menu">
      <button class="nav__link" aria-expanded="false">Product <span class="nav__caret"></span></button>
      <div class="nav__dropdown"><a class="nav__dropitem"><b>Gateway</b><i>one endpoint</i></a></div>
    </div>
    <a class="nav__link">Docs</a><a class="nav__link">Pricing</a>
  </nav>
  <div class="nav__right"><a class="btn btn--text">Sign in</a><a class="btn btn--accent">Start</a></div>
</div></header>
```
```css
.nav { position: fixed; inset: 0 0 auto; z-index: 500; background: transparent; border-bottom: 1px solid transparent;
  transition: background 240ms, border-color 240ms, box-shadow 240ms; }
.nav.is-scrolled { background: color-mix(in oklch, var(--color-paper) 72%, transparent);
  backdrop-filter: blur(18px) saturate(160%); border-bottom-color: var(--color-rule); }
.nav__inner { max-width: var(--page-max); margin: 0 auto; padding-inline: var(--page-gutter); height: 64px;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
.nav__brand { justify-self: start; } .nav__center { justify-self: center; display: flex; gap: 0.35rem; } .nav__right { justify-self: end; }
.nav__dropdown { position: absolute; opacity: 0; visibility: hidden; transform: translateY(-6px) scale(0.98);
  transition: opacity 200ms, transform 220ms var(--ease-out), visibility 200ms; }
.nav__item--menu:hover .nav__dropdown, .nav__item--menu:focus-within .nav__dropdown { opacity: 1; visibility: visible; transform: none; }
```
