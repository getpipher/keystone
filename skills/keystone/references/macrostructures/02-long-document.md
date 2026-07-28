## 02 · Long Document

Reads like a memo, a letter, or a journal entry. No marketing structure. Continuous prose with inline section heads. The page is *literature* about the product.

- **Heading:** inline with body — section heads emerge from paragraph flow as small caps or bold short phrases.
- **Body:** single column, generous line-height (1.65+), measure 60–65ch.
- **Divider:** negative space; the gap is the divider; occasionally a centred ornament.
- **Button:** typographic link inside a paragraph, not a separate block.
- **Image:** inline, sized to text measure; never full-bleed.
- **Reveal:** none. The page is just *there*.

Reach for it for case studies, founder posts, mission pages, products whose sale is philosophical. Brief signal: "tell a story", not "list features".

Avoid when there's a single decisive action — Long Document hides CTAs, wrong for transactional pages.

**Gates that police this macro:** G25 (prose max-width 45–75ch — Long Document lives here), G9 (equal-whitespace sections — vary the rhythm).

Reference: Frank Chimero's site, long-form Substack essays in product disguise.

**Sample opening lines** (imitate the specificity, not the wording):
> *"Saturday, 6:14 a.m. The dough went in at midnight."* — opens with a time-stamp
> *"A monthly art publication featuring contributions by some of the most engaged thinkers working today."* — e-flux.com/journal
> *"We design everything for everyone."* — pentagram.com — refusal of the verb

```html
<article class="prose">
  <p class="lede">…</p>
  <p>…</p>
  <h2 class="inline">A small heading.</h2>
  <p>…</p>
  <blockquote>…</blockquote>
  <p>… <a href="">read more →</a> …</p>
</article>
```
