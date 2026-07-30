### N11 · Mega-menu panel
A standard top bar whose triggers open a full-width multi-column panel — icon, title, description per item, grouped under column headers, often with a promoted feature card. The page dims behind a scrim.
*Use when:* the brand has many destinations that need grouping + explanation (platform with 6+ products, docs/resources hubs).
*Don't confuse with:* N1b (small single-column dropdowns), N1a (no dropdowns at all).
**Gates:** G33 (decorative SVG without aria — mega-menu icons need `aria-hidden="true"` if decorative), G26 (all triggers + links need interaction states), G48 (token discipline — panel uses `color-mix` + `--color-paper` tokens).

```html
<header class="nav">
  <div class="nav__inner">
    <a class="nav__brand">Northwind</a>
    <nav class="nav__center">
      <div class="mega" data-mega="products"><button class="nav__link" aria-controls="mega-products" aria-expanded="false">Products <span class="nav__caret"></span></button></div>
    </nav>
    <div class="nav__right"><a class="btn btn--accent">Get started</a></div>
  </div>
  <div class="mega-panel" id="mega-products" data-panel="products">
    <div class="mega-panel__inner">
      <div class="mega-col"><p class="mega-col__head">Move money</p><a class="mega-link"><span class="mega-link__ico" aria-hidden="true"></span><span><b>Payments</b><i>cards, ACH, wires</i></span></a></div>
    </div>
  </div>
</header>
<div class="nav-scrim" id="scrim"></div>
```
```css
.mega-panel { position: absolute; top: 100%; left: 0; right: 0; opacity: 0; visibility: hidden; transform: translateY(-10px);
  background: color-mix(in oklch, var(--color-paper) 96%, transparent); backdrop-filter: blur(20px) saturate(160%);
  border-bottom: 1px solid var(--color-rule); transition: opacity 240ms, transform 280ms var(--ease-out), visibility 240ms; }
.mega-panel.is-open { opacity: 1; visibility: visible; transform: none; }
.nav-scrim { position: fixed; inset: 0; z-index: 400; background: oklch(18% 0.01 250 / 0.28);
  opacity: 0; visibility: hidden; transition: opacity 260ms, visibility 260ms; }
.nav-scrim.is-active { opacity: 1; visibility: visible; }
```
