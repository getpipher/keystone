### F3 · Tabular spec sheet
Each row is a feature; columns hold name, value, footnote. Hairline rules between rows. Tabular numerics.
*Use when:* features compare quantitatively.
*Don't confuse with:* F1 Bento (which is non-tabular and visually rhythmic).
**Gates:** G24 (spacing scale -- tabular-nums + on-scale row padding), G48 (token discipline -- every colour references a named token).

```html
<table class="spec-sheet tnum">
  <tr><th>Latency</th><td>p99 &lt; 50 ms</td><td class="muted">measured externally</td></tr>
  <tr>…</tr>
</table>
```
```css
.spec-sheet { width: 100%; border-collapse: collapse; }
.spec-sheet th, .spec-sheet td { padding: var(--space-sm) var(--space-md); border-bottom: 1px solid var(--color-rule); text-align: left; }
.spec-sheet .tnum { font-variant-numeric: tabular-nums; }
```
