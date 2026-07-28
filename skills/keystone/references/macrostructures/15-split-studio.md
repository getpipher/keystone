## 15 · Split Studio

Diptych. Every major content block divides the screen — text on one side, proof on the other. The pairing alternates direction down the page.

- **Heading:** half-screen wide; the other half holds a screenshot or a quote.
- **Body:** alternating left-text/right-image and right-text/left-image modules.
- **Divider:** a clear gutter between halves; no rules.
- **Button:** outlined chip below the text half.
- **Image:** anchored to the opposite half from the text in each row.
- **Reveal:** opposite halves cross-fade in slightly staggered.

Reach for it for SaaS feature pages, dev tools that pair explanation with code, anything where every claim wants a visual proof.

Avoid for narrative or photographic brands. Split halves the attention; some pages need single focus.

**Gates that police this macro:** G36 (flex align-items — split rows mixing text + image need `align-items: center`), G50 (image grid minmax(0,1fr) — screenshots in the image half need `minmax(0, 1fr)`).

Reference: Vercel feature pages, Stripe Sessions program pages, many dev-tool homepages.

**Sample opening lines** (imitate the specificity — Split Studio openings pair a positioning statement with a proof column):
> *"A studio for what's next."* — italic display + selected-work column on the right
> *"Print discipline, on screen."* — Keystone Newsprint — two-phrase headline, masthead-style
> *"We design and build distinctive products for ambitious teams."* — names the verb, names the audience

```html
<section class="split">
  <div class="half text">…</div>
  <div class="half image"><img src="proof.png" /></div>
</section>
<section class="split reverse">
  <div class="half image"><img src="proof-2.png" /></div>
  <div class="half text">…</div>
</section>
```
