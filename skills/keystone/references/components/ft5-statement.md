### Ft5 · Statement
One large display sentence dominates the footer — a closing line, not a sitemap. Wordmark, minimal links, copyright sit beneath in muted small type.
*Use when:* the page wants a *closing line* — editorial, manifesto, atmospheric. The sentence pairs with the page's argument.
*Don't confuse with:* Ft1 Mast-headed (which leads with the wordmark, not a sentence).
**Gates:** G48 (token discipline — sentence uses `--font-display`), G38a (no italic on the sentence if it's a heading-level element; use `<p>` not `<h2>`).

```html
<footer class="foot-stmt">
  <p class="foot-stmt__line">Build something they'll remember.</p>
  <div class="foot-stmt__meta">
    <span class="wordmark">Studio</span>
    <span class="muted">© 2026 · MIT</span>
  </div>
</footer>
```
```css
.foot-stmt { padding: var(--space-2xl) var(--page-gutter) var(--space-xl); display: grid; gap: var(--space-lg); }
.foot-stmt__line { font-family: var(--font-display); font-size: clamp(1.75rem, 5vw, 3.25rem); line-height: 1.0; letter-spacing: -0.02em; max-width: 28ch; margin: 0; }
.foot-stmt__meta { display: flex; justify-content: space-between; align-items: baseline; padding-block-start: var(--space-sm); border-top: var(--rule-hair) solid var(--color-rule); }
```
