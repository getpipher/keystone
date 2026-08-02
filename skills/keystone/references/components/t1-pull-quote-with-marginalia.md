### T1 · Pull-quote with marginalia
A quote sits in the wide column; the attribution and source link float in the narrow margin column.
*Use when:* the page already has a marginalia rhythm (Tufte-leaning, editorial).
*Don't confuse with:* T3 Single huge quote (which is centred and dominates).
**Gates:** G19 (real names + roles — never "Jane Doe"), G38a (italic display on `<blockquote>` is fine; italic on a heading is banned).

```html
<aside class="proof-margin">
  <blockquote class="serif-italic">"…"</blockquote>
  <p class="attribution muted">— Name<br />Role, Company</p>
</aside>
```
