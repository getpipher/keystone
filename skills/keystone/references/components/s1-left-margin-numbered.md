### S1 · Left-margin numbered
A narrow left column holds `01 — LABEL.`; the wide right column holds the heading and content.
*Use when:* the page is editorial / specimen.
*Don't confuse with:* S5 Bottom-anchored (label under, not beside).
**Gates:** G54 (tag-left/heading-right ban — the numbered label and heading must STACK vertically in the same column, never a two-column `grid-template-columns: 10rem 1fr` head; the label goes above the heading).

```html
<header class="head-margin">
  <p class="num-label">01 — Foundations</p>
  <h2>…</h2>
</header>
```
```css
.head-margin { display: block; }
.head-margin .num-label { letter-spacing: 0.06em; font-variant-caps: all-small-caps; }
```
