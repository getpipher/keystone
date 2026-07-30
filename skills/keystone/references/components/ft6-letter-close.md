### Ft6 · Letter close
Closes the page like a letter — `Yours, the team. 2026.` Optional postscript line beneath. Sets the page as a piece of writing rather than a product.
*Use when:* the page voice is warm, hand-written, editorial-quiet.
*Don't confuse with:* Ft1 Mast-headed (which is a wordmark anchor, not a signoff).
**Gates:** G38a (italic on `<p>` is fine; italic on a heading is banned), G25 (max-width 45–75ch — the letter body lives here).

```html
<footer class="foot-letter">
  <p class="foot-letter__close">Yours,<br><span class="foot-letter__sign">— Studio</span></p>
  <p class="foot-letter__ps muted">P.S. — letters back welcome at <a href="mailto:hello@studio">hello@studio</a>.</p>
</footer>
```
```css
.foot-letter { padding: var(--space-2xl) var(--page-gutter); max-width: 60ch; }
.foot-letter__close { font-family: var(--font-display); font-style: italic; font-size: var(--text-lg); line-height: 1.4; }
.foot-letter__sign { font-style: normal; font-weight: 600; }
.foot-letter__ps { font-size: var(--text-sm); margin-top: var(--space-md); }
```
