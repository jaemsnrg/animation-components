# CollectionCard

A square, 24px-rounded tile for a collection or board, with its title and element count underneath. Cards sit in a grid.

## Anatomy
- `.cx-card__frame`: `aspect-ratio: 1`, `radius-3xl`, 0.5px `border-primary`, `shadow-medium`, `bg-card` while loading.
- Media: a single `<img class="cx-card__media">` (cover-fit) or `.cx-card__mosaic`, a 2×2 grid of the first four elements with 2px gutters.
- `.cx-card__body`, `space-4` below the frame: title in `body` at 500, one line with truncation; meta in `caption` / `text-tertiary`, with an optional 16px icon (lock for private).
- Hover: the media scales to 1.05 over `duration-slow`; the frame stays put.

## Layout
`.cx-grid`: auto-fill columns min 180px, `space-6` column gap, `space-8` row gap, inside `layout-padding-horizontal` page margins.

## What the consumer provides
Image(s) with alt text, title, count, link.

## Do / don't
- Do let imagery carry the colour; the card chrome stays neutral.
- Don't overlay text on the image or add a coloured accent border.
