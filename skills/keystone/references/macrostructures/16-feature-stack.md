## 16 · Feature Stack

Sticky left pane (label / description) + scroll-synced right pane (screenshots cycling through related details). Cinematic pacing.

- **Heading:** held inside the sticky pane; persists while content cycles beside it.
- **Body:** two columns — left sticky, right scrolling; the right pane plays through 3–6 detail screens per section.
- **Divider:** section bands; the sticky pane re-anchors per section.
- **Button:** in the sticky pane, set when the user reaches the section's detail count.
- **Image:** the scrolling-right column is mostly imagery.
- **Reveal:** none of the spatial-fade kind; the sticky/scroll IS the motion.

Reach for it for premium products, complex feature stories, anything where you want to control pacing as the user scrolls.

Avoid on mobile-first audiences without strong fallback. Sticky+scroll-sync is rough on small screens.

**Gates that police this macro:** G56 (sticky bleed — if a page-level nav is also sticky at `top: 0`, the sticky pane must offset by `--banner-height` or it bleeds into the nav), G51 (display headers without long-word wrap — sticky pane headings need `overflow-wrap: anywhere; min-width: 0`).

Reference: Apple product pages, some Stripe Sessions pages, Read.cv onboarding.

**Sample opening lines** (imitate the specificity — Feature Stack openings pin a single statement and then walk the user through):
> *"Plan, build, ship."* — three verbs, three sticky panes
> *"Read anything that emits lines."* — names what's possible, then walks through it
> *"From stdin, through the pipe, into your dashboard."* — names the data path, then explains each step

```html
<section class="feature-stack">
  <aside class="sticky-pane">
    <h2>Feature title</h2>
    <p>Description…</p>
    <a class="cta">Try it →</a>
  </aside>
  <div class="scroll-pane">
    <figure><img src="detail-1.png" /></figure>
    <figure><img src="detail-2.png" /></figure>
  </div>
</section>
```
