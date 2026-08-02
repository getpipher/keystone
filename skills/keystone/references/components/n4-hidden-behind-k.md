### N4 · Hidden behind ⌘K
No visible nav. The user opens a command palette via `⌘K` to get anywhere. Designed for keyboard-first audiences.
*Use when:* the page is for technical users who expect this affordance.
*Don't confuse with:* N2 Floating chip (which is visible always), N13 (visible ⌘K pill).
**Gates:** G26 (the `⌘K` hint button needs interaction states), G49 (command palette items stay single-line).

```html
<button class="kbd-hint">⌘ K</button>
<dialog class="palette">…</dialog>
```
