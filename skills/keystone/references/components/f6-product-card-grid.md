### F6 · Product card grid
Each card is a product: image, name, price, one micro-action. Reads like a shop floor, not a marketing site.
*Use when:* commerce, catalogue, lookbook, marketplace -- the page sells *things*, not *features*.
*Don't confuse with:* F1 Bento (which sells *features*; tiles vary in size). Product cards are uniform on purpose -- rhythm comes from the products, not the layout.
**Gates:** G50 (image grid minmax(0,1fr) -- product images in grid tracks must use `minmax(0, 1fr)`, not bare `1fr`), G26 (missing interaction states -- the Add button needs `:hover`, `:focus-visible`, `:active`).

```html
<section class="product-grid">
  <article class="product">
    <a class="product__media" href=""><img src="" alt="" loading="lazy" /></a>
    <div class="product__meta">
      <h3 class="product__name">Linen Apron · Indigo</h3>
      <p class="product__price tabular-nums">¥ 6,400</p>
    </div>
    <button class="product__add" aria-label="Add Linen Apron to bag">+</button>
  </article>
</section>
```
```css
.product-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-xl) var(--space-lg); }
@media (max-width: 60rem) { .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.product { display: grid; gap: var(--space-sm); position: relative; }
.product__media { display: block; aspect-ratio: 3 / 4; background: var(--color-paper-2); overflow: hidden; }
.product__media img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-long) var(--ease-out); }
.product__media:hover img { transform: scale(1.02); }
.product__add { position: absolute; top: var(--space-sm); right: var(--space-sm); width: 32px; height: 32px; opacity: 0; transition: opacity var(--dur-short) var(--ease-out); }
.product:hover .product__add, .product:focus-within .product__add { opacity: 1; }
@media (pointer: coarse) { .product__add { opacity: 1; } }
```
