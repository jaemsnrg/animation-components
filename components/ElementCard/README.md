# ElementCard

A single saved image in a masonry grid: natural aspect ratio, `radius-2xl`, hairline border, no shadow.

## Anatomy
Add `cx-card--element` to a `cx-card`. The frame keeps the media's own height (`cx-card__media` becomes static), uses `radius-2xl` and 0.5px `border-primary`, and drops `shadow-medium`. An optional `caption` line in `text-tertiary` names the source or collection.

## Layout
CSS columns or a masonry library with `space-4` gutters; set `break-inside: avoid` on each card.

## Do / don't
- Do let images run to their natural ratio.
- Don't crop elements to squares; squares are for collections.
