## 18 · Portfolio Grid

Filterable cards of projects. Studio or designer homepages where the work is the product.

- **Heading:** short tagline above the grid; no display.
- **Body:** responsive grid of project cards, all same size or with subtle size variation.
- **Divider:** filter bar above the grid; no internal rules.
- **Button:** card-internal "View case study"; no global CTA.
- **Image:** thumbnail per card.
- **Reveal:** card-fade on filter change.

Reach for it for design studios, agencies, photographer portfolios, any creative business where work is the pitch.

Avoid for products. Portfolio Grid is service-business shape.

**Gates that police this macro:** G50 (image grid minmax(0,1fr) — project thumbnails in grid tracks), G33 (decorative SVG without aria — any decorative card ornament needs `aria-hidden="true"`).

Reference: Pentagram, 14islands, Locomotive, Bureau Borsche.

**Sample opening lines** (imitate the specificity — Portfolio Grid openings name the volume and the era):
> *"Selected work · 2018 — 2026."* — date range, two characters of meta
> *"Twelve projects, six clients, two countries."* — three counts, no adjective
> *"Work, indexed by year."* — five-word label, the index is the whole site

```html
<section class="portfolio">
  <nav class="filters">All · Web · Print · Brand</nav>
  <div class="grid">
    <article class="card"><img src="project-1.jpg" /><p>Project A</p></article>
    <article class="card"><img src="project-2.jpg" /><p>Project B</p></article>
    <article class="card"><img src="project-3.jpg" /><p>Project C</p></article>
  </div>
</section>
```
