## 11 · Catalogue

Uniform grid of variations of the same thing — typefaces, colour palettes, product SKUs. The page is a visual index of inventory.

- **Heading:** brand mark + tagline only; no big display.
- **Body:** grid of identical-sized cards (3–5 per row), each one variant of the core product.
- **Divider:** hairline rules between rows; sometimes a category label band.
- **Button:** card-internal link to detail page; no global CTA.
- **Image:** specimen thumbnail per card, or a swatch.
- **Reveal:** none.

Reach for it for foundries, palette generators, font shops, colour systems, capsule collections.

Avoid for narrative brands. Catalogue treats every item as equal — wrong for products with hierarchy.

**Gates that police this macro:** G54 (tag-left/heading-right — category labels stack above content, not beside it), G50 (image grid minmax(0,1fr) — specimen thumbnails in grid tracks).

Reference: Klim Type Foundry, Pangram Pangram, Coolors palettes.

**Sample opening lines** (imitate the specificity — Catalogue openings are inventory headers, dated, with a count):
> *"Today's loaves."* — two words, ownership of the day
> *"Five collections, in store now."* — names the count and the where
> *"Thirty-eight items · Spring 2026 · all hand-stitched."* — count, date, qualifier; no adjectives

```html
<section class="catalogue">
  <article class="card"><img src="swatch-1.png" /><p>Variant A</p></article>
  <article class="card"><img src="swatch-2.png" /><p>Variant B</p></article>
  <article class="card"><img src="swatch-3.png" /><p>Variant C</p></article>
</section>
```
