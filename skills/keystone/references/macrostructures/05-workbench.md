## 05 · Workbench

Product screenshots in frames are the primary content. The page is a guided tour of the app in use. Less marketing copy, more "here's what you do with it."

- **Heading:** small, functional — workbench pages don't shout.
- **Body:** sequence of screenshot blocks, each with a short caption and inline annotation arrow.
- **Divider:** the screenshot frame *is* the divider; sections separate by gap and frame.
- **Button:** sticky-bottom CTA bar after the third screenshot ("Try it →"), once context is built.
- **Image:** central — browser/device frames around real product captures, with annotation arrows.
- **Reveal:** type-unmask on captions; screenshots load instantly.

Reach for it for SaaS, developer tools, IDE extensions — anywhere seeing the product in motion is the sale.

Avoid when the product is conceptual or services-led. Workbench needs a UI to show.

**Gates that police this macro:** G47 (re-drawn UI chrome — use real screenshots, not fake browser bars), G50 (image grid minmax(0,1fr) — screenshots in grid tracks).

Reference: Linear.app, Vercel, Raycast, Arc Browser.

**Sample opening lines** (imitate the specificity — the page walks the user through):
> *"$ streampipe parse access.log --filter status=5xx | jq"* — open on a real command
> *"Read anything that emits lines. Files, pipes, sockets, kubectl logs."* — names the inputs
> *"Open the trace, find the span, fix the regression. No glossary required."* — three verbs, then a refusal

```html
<header class="lite">…</header>
<section class="screenshot-frame">
  <figure><img src="step-1.png" /><figcaption>Open a project.</figcaption></figure>
</section>
<section class="screenshot-frame">…</section>
<aside class="sticky-cta">Try it free →</aside>
```
