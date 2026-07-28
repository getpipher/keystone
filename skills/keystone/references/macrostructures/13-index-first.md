## 13 · Index-First

The page IS a list of links. No hero image, no narrative flow. Pure navigation as design.

- **Heading:** one short paragraph at the top introducing the index, no display type.
- **Body:** vertical list of categorised links; sometimes a sidebar of filters.
- **Divider:** hairline rules between rows; or zero rules with paper-colour bands.
- **Button:** the links themselves are the buttons.
- **Image:** none, or tiny favicons by each entry.
- **Reveal:** none.

Reach for it for documentation hubs, knowledge bases, archive front pages, design system entries, link-in-bio pages with substance.

Avoid for marketing pages. Index-First is for browsing audiences; selling needs structure.

**Gates that police this macro:** G34 (horizontal scroll — long link lists need `overflow-x: clip`), G49 (two-line clickable text — link labels must stay single-line at all viewports).

Reference: Are.na's homepage feel, archive sites, documentation indices.

**Sample opening lines** (imitate the specificity — Index-First openings are headers for what's below, sometimes nothing more than a label):
> *"Selected work · 2018 — 2026."* — date range, no preamble
> *"Things Become Other Things · Lightness above weightiness."* — craigmod.com — two phrases joined by a divider
> *"Writer + Photographer."* — craigmod.com — three words, summarises the whole site

```html
<section class="index">
  <p class="intro">Selected work · 2018 — 2026.</p>
  <ul class="links">
    <li><a href="">Project A <span class="meta">2026</span></a></li>
    <li><a href="">Project B <span class="meta">2025</span></a></li>
  </ul>
</section>
```
