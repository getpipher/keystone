### H1 · Marquee
A single statement fills the fold. No subhead, no CTA in view.
*Use when:* the brand or person *is* the message.
*Don't confuse with:* H4 Stat-Led (a number, not a statement).
**Gates:** G44 (hero fits the fold at 1280x800), G55 (all-caps line-height >= 1.0 if uppercase).

```html
<section class="hero-marquee">
  <h1 class="display-xxl">A statement.</h1>
</section>
```
```css
.hero-marquee { min-height: 80dvh; display: grid; align-content: end; padding: 0 var(--page-gutter) var(--space-2xl); }
.display-xxl { font-size: clamp(4rem, 12vw, 12rem); line-height: 0.92; }
```
