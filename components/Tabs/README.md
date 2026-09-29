# Tabs

Segmented pill control that switches between views of the same page (Profile / Collections).

## Anatomy
- `.cx-tabs`: 48px pill, 0.5px `border-primary`, 3.5px inner padding.
- `.cx-tab`: 40px, 14px/14px weight 500, padding `space-2` `space-3` `space-2` `space-4-5` (asymmetric to balance a trailing `CountBadge`); `cx-tab--plain` is symmetric for tabs without a count.
- Inactive label `text-tertiary`, hover `text-primary`. Selected: `text-primary` on a `bg-elevation` pill; its `CountBadge` flips to `gray-0` / `gray-1000`.
- In the source the selected pill is a single indicator that slides between tabs with `ease-out-quint`; animate `translate` and `width` if you reproduce it.

## What the consumer provides
`role="tablist"` / `role="tab"` / `aria-selected`, and the panel switching.

## Do / don't
- Do keep to 2–4 tabs; beyond that use a menu.
- Don't use Tabs for page-level navigation between unrelated sections.
