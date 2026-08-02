## 03 · Marquee Hero

The hero IS the page above the fold. A single bold statement or visual fills the viewport. No subhead, no CTA in fold. Below the fold the page becomes something else.

- **Heading:** display fills the fold — 8–14vw type, hugging viewport edges.
- **Body:** below-fold becomes a list of work or a content block; the hero doesn't continue.
- **Divider:** thick rule between hero and below-fold, OR a hard colour change.
- **Button:** none in fold; first CTA arrives below.
- **Image:** none in fold (typography is the visual), OR a single full-bleed photograph as the fold background.
- **Reveal:** the fold is static; below-fold may sweep in horizontally.

Reach for it when the brand or person *is* the message — designer/director portfolios, indie products with a single declarative voice, any "this is who we are" page.

Avoid for products whose value requires explanation in seconds. Marquee makes the user scroll before they understand.

**Gates that police this macro:** G44 (hero fits the fold — Marquee must still fit at 1280×800), G55 (all-caps display line-height ≥ 1.0).

Reference: 14islands.com, many design studio homepages.

**Sample opening lines** (imitate the specificity, not the wording):
> *"Type, set with care."* — Keystone Specimen
> *"A studio for what's next."* — names the practice without explaining it
> *"Design like print: warm, off-register, intentional."* — Keystone Riso

```html
<section class="marquee">
  <h1 class="display-xxl">A statement.</h1>
</section>
<hr class="rule-thick" />
<section class="below-fold">…</section>
```
