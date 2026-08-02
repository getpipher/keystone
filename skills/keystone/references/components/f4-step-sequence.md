### F4 · Step sequence
Numbered stages (`1.0 -> 2.0 -> 3.0`) flow vertically. Each stage has a heading, a paragraph, sometimes a small visual.
*Use when:* the product is a workflow, not a single moment.
*Don't confuse with:* F2 Sticky-scroll (which doesn't number stages).
**Gates:** G54 (stage labels stack above content, never beside -- never a two-column `grid-template-columns: auto 1fr` head).

```html
<ol class="steps">
  <li><span class="stage">1.0</span><h3>Intake.</h3><p>…</p></li>
  <li><span class="stage">2.0</span><h3>Plan.</h3><p>…</p></li>
</ol>
```
```css
.steps { list-style: none; padding: 0; display: grid; gap: var(--space-2xl); }
.steps .stage { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-muted); }
```
