## 20 · Ecosystem Index

Multiple discovery surfaces — featured / latest / by category / by people. The platform's value is emergence and browsing, not declaration.

- **Heading:** brief positioning paragraph; no display.
- **Body:** several horizontal rails or grids — each surfacing a different cut of the platform's content.
- **Divider:** rail-titled bands.
- **Button:** "See more →" at each rail's edge; rarely a global CTA.
- **Image:** thumbnails everywhere; the page is dense imagery.
- **Reveal:** none.

Reach for it for community platforms, content marketplaces, design-asset stores, any UGC/curated catalogue front page.

Avoid for single-product pages. Ecosystem needs multiple things to surface.

**Gates that police this macro:** G50 (image grid minmax(0,1fr) — thumbnails in rail grids), G45 (decorative without purpose — every thumbnail must link to real content, not ornament).

Reference: Are.na, Figma Community, Behance.

**Sample opening lines** (imitate the specificity — Ecosystem Index openings are surface labels, dated, with a count):
> *"Featured · Latest · By category."* — three discovery surfaces named, divided
> *"What's on this week · Editor's pick · The whole catalogue."* — names cadence, curation, breadth
> *"A toolkit for assembling new worlds from the scraps of the old."* — are.na — second-position copy

```html
<section class="rail">
  <h2 class="rail-title">Featured</h2>
  <div class="rail-grid">
    <article class="card"><img src="item-1.jpg" /></article>
    <article class="card"><img src="item-2.jpg" /></article>
    <article class="card"><img src="item-3.jpg" /></article>
  </div>
  <a class="see-more">See more →</a>
</section>
<section class="rail">…</section>
```
