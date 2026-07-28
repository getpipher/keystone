### S3 · Sticky pinned
Heading remains in viewport while content scrolls beneath. Orientation aid.
*Use when:* the section is dense and the user benefits from always seeing where they are.
*Don't confuse with:* S1 Left-margin (which doesn't move).
**Gates:** G56 (sticky bleed — if a page-level nav is also `sticky; top: 0`, offset this head by `--banner-height` so it docks beneath the nav; split `--z-sticky` from `--z-sticky-nav`).

```html
<header class="head-sticky">
  <p class="num-label">02</p>
  <h2>…</h2>
</header>
```
```css
.head-sticky { position: sticky; top: var(--banner-height, 0px); background: var(--color-paper); padding-block: var(--space-sm); border-bottom: 1px solid var(--color-ink); z-index: var(--z-sticky); }
```
