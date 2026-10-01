# Chip

40px pill that scopes or filters: the profile scope inside the search bar, filter tags, removable selections.

## Anatomy
0.5px `border-primary`, `bg-primary` fill, padding `space-2` `space-3` `space-2` `space-2`, `space-1-5` gap; optional leading `Avatar--xs` and trailing 16px close icon in `text-tertiary`. Label `body-small` (14px), truncated at 12 characters.

## States
Hover `hover-tertiary`. `cx-chip--selected` inverts to `bg-inverted` / `text-inverted`. `cx-chip--glass` is a frosted variant for placing over imagery: 25% white fill, blurred backdrop, white text, no border; hover lifts the fill to 35%.

## Do / don't
- Do lowercase handles exactly as the user wrote them.
- Don't stack more than one row of chips inside the search bar.
