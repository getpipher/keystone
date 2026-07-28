## 12 · Letter

First-person, written, intimate. Opens with a greeting ("Dear friend,"). No buttons in the fold. Reads as a personal note from the founder.

- **Heading:** salutation in serif italic ("Dear reader,"), 1.5–2× body size.
- **Body:** prose, single column, narrow measure (50ch), as if typed.
- **Divider:** paragraph spacing only, occasional `* * *` separator.
- **Button:** sign-off link at the foot ("p.s. join us if you'd like →").
- **Image:** maybe one signature scan, or a quiet inline photograph.
- **Reveal:** none.

Reach for it for personal brands, indie founder announcements, sabbatical or pivot pages, donation appeals.

Avoid for transactional commerce. Letter is intimate; commerce is functional.

**Gates that police this macro:** G25 (prose max-width 45–75ch — Letter's 50ch sits at the narrow end), G38a (no italic headers — the salutation is italic display but it's a blockquote/greeting, not an h1; use `<p>` not a heading tag).

Reference: Frank Chimero's site, founder farewell posts, indie newsletter front pages.

**Sample opening lines** (imitate the specificity — Letter openings are first-person greetings, dated, with a place if relevant):
> *"Hello, I'm Anya."* — single line, name, full stop
> *"Saturday, 6:14 a.m. The dough went in at midnight."* — opens on a moment, then explains it
> *"Hey there. This page is soft because the surface should be soft."* — Keystone Hum — colloquial open + a principle

```html
<article class="letter">
  <p class="salutation">Dear reader,</p>
  <p>…</p>
  <p>…</p>
  <p class="signoff">p.s. join us if you'd like →</p>
</article>
```
