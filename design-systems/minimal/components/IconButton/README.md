# IconButton

Circular button carrying a single 20px line icon: share, more, add, visual search.

## Anatomy
`<button class="cx-icon-btn" aria-label="Share"><svg class="cx-icon">…</svg></button>`. Always give an `aria-label`.

## Variants
- default: 44px, transparent with a 0.5px `border-primary` hairline; hover `border-hover` + `hover-tertiary`.
- `cx-icon-btn--sm`: 40px, for profile headers beside `cx-btn--sm`.
- `cx-icon-btn--primary`: `button-primary` fill, `text-inverted` icon.
- `cx-icon-btn--plain`: 34px, borderless, icon in `text-tertiary`; hover `hover-secondary`. Used inside the search bar and toolbars.

## Do / don't
- Do use line icons at 1.6px stroke drawn with `currentColor`.
- Don't put text inside; use `Button` with a leading icon instead.
