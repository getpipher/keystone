### Ft7 · Newsletter-first
The form (label + input + submit) is the *primary* element of the footer; everything else (wordmark, links, copyright) is set in 12px muted type beneath.
*Use when:* the brand legitimately publishes — and the page above the fold has *already* offered a subscription. The footer is a final invitation, not an ambush.
*Don't confuse with:* Ft1 (which doesn't ask for anything).
**Gates:** G39 (input field states — border-width constant, focus via `outline`, input height = button height, disabled via 3 channels), G26 (submit button needs all 4 interaction states).

```html
<footer class="foot-news">
  <form class="foot-news__form" action="/subscribe" method="post">
    <label for="foot-email">Letters from the studio · monthly</label>
    <div class="foot-news__row">
      <input id="foot-email" name="email" type="email" required placeholder="you@domain">
      <button type="submit" class="cta-fill">Subscribe</button>
    </div>
  </form>
  <p class="foot-news__meta muted">Studio · © 2026 · <a href="/imprint">Imprint</a></p>
</footer>
```
```css
.foot-news { padding: var(--space-2xl) var(--page-gutter); display: grid; gap: var(--space-lg); max-width: 56ch; }
.foot-news__form label { display: block; font-size: var(--text-sm); margin-block-end: var(--space-2xs); }
.foot-news__row { display: flex; gap: var(--space-2xs); }
.foot-news__row input { flex: 1; min-height: 44px; padding-inline: var(--space-sm); border: var(--rule-hair) solid var(--color-rule); background: var(--color-paper); }
.foot-news__row input:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 1px; }
.foot-news__meta { font-size: var(--text-xs); }
```
