### N13 · Inline ⌘K search pill
A visible search pill sits inline in the bar — placeholder text plus a `⌘K` kbd hint — alongside the links. Click it, or press ⌘K, to open a spotlight modal with grouped, keyboard-navigable results. The visible opposite of N4 (which hides nav behind the shortcut).
*Use when:* the product is search-heavy or docs-heavy and search is a primary action.
*Don't confuse with:* N4 (no visible nav, ⌘K only), a plain search icon that just focuses an input in place.
**Gates:** G26 (search pill + links need interaction states), G48 (token discipline — `--color-paper-2`, `--color-rule` tokens), G49 (search pill label stays single-line), G33 (decorative icon in the pill needs `aria-hidden="true"` if not labelled).

```html
<header class="nav" id="nav"><div class="nav__inner">
  <a class="nav__brand">Crank</a>
  <button class="searchpill" id="searchpill" aria-label="Search (⌘K)">
    <span class="searchpill__ico" aria-hidden="true"></span><span class="searchpill__text">Search docs…</span>
    <span class="searchpill__kbd"><kbd>⌘</kbd><kbd>K</kbd></span>
  </button>
  <nav class="nav__right"><a class="nav__link">Docs</a><a class="btn btn--accent">Start</a></nav>
</div></header>
<div class="cmdk" id="cmdk" aria-hidden="true">
  <div class="cmdk__backdrop" data-close></div>
  <div class="cmdk__panel" role="dialog" aria-modal="true">
    <div class="cmdk__field"><span class="cmdk__field-ico" aria-hidden="true"></span><input id="cmdk-input" placeholder="Search docs…"><kbd>esc</kbd></div>
    <div class="cmdk__results"><p class="cmdk__group">Suggested</p><button class="cmdk__item is-active">…</button></div>
  </div>
</div>
```
```css
.searchpill { display: flex; align-items: center; gap: 0.6rem; height: 40px; padding: 0 0.55rem 0 0.85rem;
  background: var(--color-paper-2); border: 1px solid var(--color-rule); border-radius: 999px; color: var(--color-muted); }
.searchpill:hover { border-color: var(--color-rule-2); box-shadow: 0 4px 16px -10px oklch(0% 0 0 / 0.3); }
.cmdk { position: fixed; inset: 0; z-index: 700; opacity: 0; visibility: hidden; transition: opacity 200ms, visibility 200ms; }
.cmdk.is-open { opacity: 1; visibility: visible; }
.cmdk__panel { position: absolute; top: 14vh; left: 50%; transform: translateX(-50%) translateY(-8px) scale(0.98);
  width: min(560px, calc(100vw - 2rem)); transition: transform 240ms var(--ease-out); }
.cmdk.is-open .cmdk__panel { transform: translateX(-50%) translateY(0) scale(1); }
```
