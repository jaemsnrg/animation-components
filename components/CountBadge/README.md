# CountBadge

Small pill holding a compact number (26, 4.6K) beside a tab or label.

## Anatomy
20px tall, min-width 20px, `space-1-5` side padding, `radius-4xl`. Text: `numerical` style (10px/14px, 500, tabular numbers) in `text-tertiary` on `bg-elevation`.

## Variants
- default: neutral count.
- `cx-count--badge`: `bg-badge` blue with white text for unread / new counts.
- `cx-count--dot`: 8px blue dot with no number; give it an `aria-label`.

## Do / don't
- Do abbreviate large numbers (4.6K, 12M).
- Don't use it for status words; this system has no status pill in the source.
