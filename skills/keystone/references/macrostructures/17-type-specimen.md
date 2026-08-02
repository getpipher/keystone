## 17 · Type Specimen

The typeface IS the design. Foundry homepage or design-system marketing where a custom typeface is the brand's proof.

- **Heading:** the typeface set at multiple sizes, demonstrating what it does.
- **Body:** progressive demonstration — display size, body size, italic, language coverage, OpenType features.
- **Divider:** centred caption labels between specimens.
- **Button:** outlined "Buy" or "Use it" at the foot.
- **Image:** none — typography is the imagery.
- **Reveal:** type-unmask on first paint of each specimen block.

Reach for it for type foundries, design systems where a custom face is the differentiator, font product pages.

Avoid when the brand uses an off-the-shelf face. Type Specimen needs something distinctive to celebrate.

**Gates that police this macro:** G37 (2+1 rule — three families max; the specimen face is display, a workhorse is body, and at most one outlier), G48 (token discipline — every `font-family` references a `--font-*` token, no inline names).

Reference: Klim Type Foundry, Pangram Pangram, Geist Pixel announcement pages.

**Sample opening lines** (imitate the specificity — Type Specimen openings are foundry-voice: name the typeface, the weights, the use):
> *"Reckless Display, set in 96pt."* — names the face and the size, nothing else
> *"Eight weights. Three optical sizes. One good italic."* — counts the system in three short phrases
> *"A type system for editorial."* — refusal of the verb, single noun phrase

```html
<section class="specimen-block">
  <p class="specimen-display" style="font-size: 8rem;">Aa</p>
  <p class="caption">Reckless Display · 96pt</p>
</section>
<section class="specimen-block">
  <p class="specimen-body" style="font-size: 1.25rem;">The quick brown fox…</p>
  <p class="caption">Reckless Text · 20pt</p>
</section>
```
