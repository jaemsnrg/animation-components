# Button

Pill-shaped text button for every action, from Sign up to Follow; always `radius-full`, label in `body-medium` (15px/22px, 500).

## Anatomy
`<button class="cx-btn cx-btn--primary">Label</button>`. Optional 16px leading icon (`.cx-icon--sm`), `space-1` gap.

## Variants
| class | fill | label | use |
| --- | --- | --- | --- |
| `cx-btn--primary` | `button-primary` → `hover-primary` | `text-inverted` | The one main action in a view: Sign up, Follow, Save. |
| `cx-btn--secondary` | `button-secondary` → `hover-secondary` | `text-primary` | Supporting actions and toggled-on states (Following). |
| `cx-btn--outline` | transparent, 0.5px `border-primary` → `border-hover` + `hover-tertiary` | `text-primary` | Tertiary actions beside content. |
| `cx-btn--ghost` | none | `text-secondary` → `text-primary` | Quiet header actions such as Log in. |

## Sizes
Default 48px tall (`space-4` × `space-6` padding). `cx-btn--sm` is 44px, used for Follow in profile headers. `cx-btn--block` stretches to its container.

## States
Disabled: `bg-elevation` fill with `text-tertiary`. Focus: 2px `border-active` ring, 2px offset. Colour transitions run `duration-fast`.

## Do / don't
- Do keep one primary button per region; the palette is monochrome, so black fill is the emphasis.
- Don't tint buttons with blue, green or orange; colour is reserved for links and status.
- Don't square the corners.
