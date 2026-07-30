### N1 · Wordmark + 2 links (N1a variant)
Top-of-page bar: wordmark on the left, two text links on the right ("Pricing" / "Sign in"). No logo image, no menu icon. N1a is the minimal two-link variant; N1b is the dense SaaS bar (separate file).
*Use when:* the page has very few destinations (2 links max).
*Don't confuse with:* N1b (dense SaaS three-section), N3 Side-rail (vertical).
**Gates:** G42 (AI nav fingerprint — N1a is the most-recognised AI default; reach for it only when the page genuinely has 2 destinations, never reflexively), G49 (link labels stay single-line at all viewports).

```html
<nav class="nav-min">
  <a class="wordmark">Studio</a>
  <ul><li><a>Pricing</a></li><li><a>Sign in</a></li></ul>
</nav>
```
