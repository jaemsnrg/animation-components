# Header

The sticky top bar: logo and Menu on the left, `SearchBar` centred, account actions on the right.

## Anatomy
- `.cx-header`: `layout-header-outer-height` (92px) tall, `space-6` × `space-8` padding, `bg-primary`.
- Start: 24px logo slot, `space-5` gap, then a `Menu` trigger (15px/500 `text-primary` with a 16px chevron).
- Centre: `SearchBar`, absolutely centred on wide screens.
- End: `cx-btn--ghost` Log in + `cx-btn--primary` Sign up, `space-1` apart. Signed in, swap for an `Avatar`.

## What the consumer provides
The logo (not included in this system), menu contents, search handler, auth links.

## Do / don't
- Do keep the header on the page ground with no bottom border; content scrolls under it.
- Don't add more than two actions on the right.
