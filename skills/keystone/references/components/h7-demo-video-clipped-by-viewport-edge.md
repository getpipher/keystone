### H7 · Demo Video — Clipped-by-viewport-edge

Display headline left, demo video right, the rightmost ~10–20% extending past the viewport. The clip *is* the design — implies "there's more product than fits the screen".

*Use when:* the brief is SaaS / dev-tool / dashboard / platform AND you have real footage or a hand-built CSS-art mockup.
*Don't confuse with:* H4 Stat-Led (number-led, no video) or H8 Mockup Split (still screenshot, not video).

See `hero-enrichment.md` for the full E1 recipe (codec chain, autoplay rules, reduced-motion fallback, mobile collapse). Sketch below is the structural shape.

```html
<section class="hero hero--clipped">
  <div class="hero__copy">
    <h1>Plan, build, ship.</h1>
    <p>The project tracker your engineering team won't ignore.</p>
  </div>
  <figure class="hero__media">
    <video autoplay muted loop playsinline preload="metadata"
           poster="/hero-poster.webp" fetchpriority="high">
      <source src="/hero.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"'>
      <source src="/hero.h264.mp4" type="video/mp4">
    </video>
  </figure>
</section>
```

```css
.hero--clipped { display: grid; grid-template-columns: 1fr 1.4fr; gap: var(--space-2xl); overflow: visible; }
.hero__media   { width: calc(100% + 12vw); aspect-ratio: 16 / 10; border-radius: 12px; overflow: hidden; }
@media (max-width: 60rem) { .hero--clipped { grid-template-columns: 1fr; } .hero__media { width: 100%; } }
```

**Gates:** G34 (horizontal scroll — the rightmost 10–20% extends past viewport; needs `overflow-x: clip` on html+body pair), G28 (LCP-killing demo video — must use `autoplay muted loop playsinline`, have `poster`, and `fetchpriority="high"` on the hero video).
