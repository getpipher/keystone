### S2 · Hanging
Heading floats above the section in negative space; no border, no rule.
*Use when:* the content has a quiet, room-to-breathe energy.
*Don't confuse with:* S3 Sticky-pinned (which moves with scroll).
**Gates:** G9 (equal-whitespace ban — vary section padding so the hanging head doesn't sit in identical rhythm with adjacent sections).

```html
<header class="head-hang">
  <h2>…</h2>
</header>
```
```css
.head-hang { padding-block: var(--space-3xl) var(--space-xl); }
```
