### C1 · Outlined chip
A bordered, transparent button with a typographic verb ("Save changes").
*Use when:* the page has one primary action; you want it visible but quiet.
*Don't confuse with:* C2 Inline form (which submits, not navigates).
**Gates:** G26 (needs `:hover`, `:focus-visible`, `:active`, `:disabled`), G49 (label must stay single-line at all viewports).

```html
<a class="cta-outline">Open your studio →</a>
```
```css
.cta-outline { display: inline-flex; align-items: center; gap: 0.4em; padding: 0.7rem 1.2rem; border: 1px solid var(--color-ink); min-height: 44px; }
```
