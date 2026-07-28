## 10 · Specimen *(no longer the default)*

Numbered left-margin labels, huge serif display, asymmetric column spans, hairline rules, typographic-only CTA, generous whitespace. Editorial / type-foundry energy.

- **Heading:** numbered label (`01 — HELLO.`) **above** a large serif phrase — stacked, not beside. The tag-left/heading-right two-column pattern is banned by G54; flatten to single-column even in Specimen.
- **Body:** asymmetric spans — narrow label column / wide content column (body-level labels only, not section heads).
- **Divider:** hairline rules between sections.
- **Button:** typographic link with arrow ("Open your studio →"); no box, no fill.
- **Image:** none, or a hand-drawn SVG accent in the wide left margin.
- **Reveal:** fade-up stagger on first load.

Reach for it ONLY when the brief is explicitly editorial, type-foundry, journal, or "specimen sheet". Otherwise pick something else.

**Banned as a default.** If the brief is vague and you've defaulted here, restart. The fall-through to Specimen is the single most-repeated AI output pattern — G21 enforces this.

**Gates that police this macro:** G21 (Specimen fall-through ban — do not default here), G54 (tag-left/heading-right — the numbered label goes ABOVE the heading, stacked; never a two-column section head).

Reference: type foundry homepages (Klim, Pangram Pangram, Production Type), some editorial portfolios.

**Sample opening lines** (imitate the specificity — Specimen openings are foundry-voice, treating type as material culture):
> *"A thing well made."* — klim.co.nz — refusal of the verb, treats design as material
> *"Type, set with care."* — Keystone Specimen — three words, a colon implied
> *"Creative direction, design and type for culture since 2003."* — apracticeforeverydaylife.com — date-anchored

```html
<header class="specimen">
  <p class="num-label">01 — HELLO.</p>
  <h1 class="serif-xxl">A quiet <em>instrument.</em></h1>
  <p class="lede narrow">…</p>
  <a class="link">Open your studio →</a>
</header>
```
