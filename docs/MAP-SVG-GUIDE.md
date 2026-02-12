# World Map SVG – How to Adjust

The hero map is **inline SVG** in `index.html` (inside `.audience-sketch`). No external images or JS.

## Dot size (dotted land)

In the `<pattern id="dots">`:

- **Larger dots:** increase `r` on the `<circle>` (e.g. `r="2.2"` → `r="3"`).
- **Spacing:** change `width` and `height` on the `<pattern>` (e.g. `12` → `14` for wider spacing).

## Pin color

Each pin is a `<g class="pin-g" style="color:#...">`. Change the hex:

- OEMs: `#6366f1`
- Operators: `#0ea5e9`
- Platforms: `#8b5cf6`
- Networks: `#06b6d4`
- Locals: `#4f46e5`

## Pin position

Each pin uses `transform="translate(X,Y)"` and the label uses `x="..." y="..."`. ViewBox is `0 0 1000 500`:

- **X:** 0 = left, 1000 = right.
- **Y:** 0 = top, 500 = bottom.

Example: first pin is `translate(220,100)` and label `x="258" y="145"`. Move the pin by changing the translate values; move the label by changing the label `x` and `y` so it stays next to the pin.

## Animation speed

In the SVG `<style>` block:

```css
.pin-g { animation: ping 2.5s ease-in-out infinite }
```

- **Slower:** e.g. `3.5s` or `4s`.
- **Faster:** e.g. `1.5s` or `2s`.

To turn off: remove `animation: ping ...` from `.pin-g`, or remove the whole `<style>` block.

## Land shape (clipPath)

The `<path>` inside `<clipPath id="land">` is a simplified land outline. To use another shape (e.g. from Natural Earth): replace the `d="..."` with your path data and keep the same `clipPath` and `id="land"`.
