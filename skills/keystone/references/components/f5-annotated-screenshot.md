### F5 · Annotated screenshot
A product capture sits centre-stage with arrows or short labels pointing to UI details.
*Use when:* the product UI itself is the explanation.
*Don't confuse with:* F2 Sticky-scroll (which uses multiple screenshots in sequence).
**Gates:** G47 (re-drawn UI chrome -- the screenshot must be a real capture, not hand-drawn fake browser chrome), G33 (decorative callout arrows as SVG need `aria-hidden="true"` if purely visual).

```html
<figure class="annotated">
  <img src="" alt="Product screenshot showing the annotated feature" />
  <span class="callout" style="--x:60%; --y:30%;">→ assigns automatically.</span>
</figure>
```
```css
.annotated { position: relative; }
.annotated .callout { position: absolute; left: var(--x); top: var(--y); font-size: var(--text-sm); color: var(--color-accent); }
```
