# Motion

Most AI-generated motion is scattered — hover lifts on every card, fade-in on every scroll, bouncing icons. Quiet it. One orchestrated moment beats ten small ones.

## Principles

- **Animate only `transform` and `opacity`.** GPU-composited, no layout trigger. Anything else is a performance bug.
- **Duration is three buckets.** Micro (100–150ms), minor (200–300ms), major (300–500ms). Exits are ~75% of the enter.
- **Easing is exponential ease-out.** Elements entering slow down into place. Elements leaving accelerate away.
- **Motion serves perception.** If you can't explain what a transition communicates, cut it.
- **Reduced motion is non-optional.** `@media (prefers-reduced-motion: reduce)` collapses all spatial motion to opacity crossfade.

## Easings

Use these three. Name them as tokens.

```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* elements entering */
  --ease-in:  cubic-bezier(0.7, 0, 0.84, 0);      /* elements leaving  */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* state toggles     */
}
```

`ease`, `ease-in-out` (default), `cubic-bezier(0.25, 0.1, 0.25, 1)` — browser defaults, read as uncrafted. Bounce / elastic / overshoot (`cubic-bezier(0.34, 1.56, ...)`) on UI elements is banned — dated, signals "template". → gate G12

## Durations

```css
:root {
  --dur-micro: 120ms;   /* button press, toggle tick, color shift  */
  --dur-short: 220ms;   /* hover lift, tooltip, menu open          */
  --dur-long:  420ms;   /* modal, drawer, accordion, page reveal   */
}
```

Exits use ~75% of the enter:

```css
.menu.is-open  { transition: transform var(--dur-short) var(--ease-out); }
.menu.is-close { transition: transform calc(var(--dur-short) * 0.75) var(--ease-in); }
```

## Page-load orchestration

One sequence on page load. Stagger by DOM index via CSS custom property, not JS.

```css
.reveal {
  opacity: 0;
  transform: translateY(8px);
  animation: reveal var(--dur-long) var(--ease-out) forwards;
  animation-delay: calc(var(--i, 0) * 60ms);
}
@keyframes reveal { to { opacity: 1; transform: none; } }
```

Cap total stagger at ~500ms. Beyond that the page feels slow to settle.

## Scroll-linked motion

- Use IntersectionObserver, **never** `scroll` event listeners.
- Reveal-once effects only. No parallax. No scroll-scrubbed animations without a specific reason.
- Every scroll-triggered motion must have a reduced-motion fallback.

## State transitions

- **Button hover / active:** micro duration, `--ease-out`, `translateY(-1px)` on hover, `translateY(0)` on active. No `box-shadow` transition on hover on dark backgrounds (glow). Never stack multiple hover effects on one element. → gate G13
- **Menu / tooltip / dropdown:** short duration, `--ease-out` on open, `--ease-in` on close. Use the popover API or `inert` to manage focus.
- **Modal:** long duration, scale-in (0.96 → 1) + opacity crossfade. Backdrop fades at same duration.
- **Accordion:** animate `grid-template-rows: 0fr → 1fr` (not `height`), `--ease-in-out`.
- **Focus rings:** appear instantly. Never transition `outline` or `box-shadow` on focus gain. → gate G15
- **Toasts:** silent success. Celebratory toast for a visible action is banned. → gate G16
- **Tooltips:** hover-delay 800–1000ms, focus-delay 0ms. Equal delays fail. → gate G17

## Reduced motion → gate G27

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 150ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 150ms !important;
  }
  .reveal { animation: reveal-reduced 150ms linear forwards; }
  @keyframes reveal-reduced { to { opacity: 1; transform: none; } }
}
```

Functional motion (progress bars, spinners, skeletons) still runs — just slower. Every motion must have a reduced-motion counterpart or the gate fails. → gate G27

## Bans

- `transition: all` — specify properties, not `all`. → gate G10
- `ease` (browser default, mediocre).
- `linear` on anything except progress bars and ticking loaders.
- Bounce / elastic / overshoot on UI elements. → gate G12
- Animating `width`, `height`, `top`, `left`, `margin`, `padding`. → gate G14
- `hover:scale-105` applied uniformly across unrelated elements. → gate G11
- `will-change` set preemptively across a whole class. Only on the element, only while animating.
- Parallax. Custom cursors.
- Scroll-driven animations without a reduced-motion fallback. → gate G27
- Infinite loops (other than functional loaders) — they pull the eye and never let go.
