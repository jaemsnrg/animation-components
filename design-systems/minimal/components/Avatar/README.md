# Avatar

Circular profile image with a 0.5px `border-primary` outline so light photos keep an edge.

## Sizes
`cx-avatar--lg` 80px (profile header), default 40px, `--sm` 32px (follower stacks), `--xs` 24px (chips).

## Anatomy
Use an `<img class="cx-avatar" alt="…">` with `object-fit: cover`. With no image, `cx-avatar--initials` shows 1–2 letters in `text-secondary` on `bg-elevation`. `cx-avatar-stack` overlaps by 8px with a 2px `bg-primary` separation ring.

## Do / don't
- Do give meaningful `alt` text (the person's name) unless the name is printed beside it.
- Don't square it.
