# SearchBar

The centred pill search field in the header: 56px tall (`layout-header-height`), up to 456px wide, with an optional scope chip and trailing visual-search action.

## Anatomy
- `.cx-search`: outer pill carrying `shadow-small`; on `:focus-within` it grows to `shadow-large` over `duration-slow` with `ease-out-quint`.
- `.cx-search__field`: `bg-light-elevation` fill, 0.5px `border-primary`, `shadow-field-inset` bevel, `space-2` padding and gap.
- Leading: either a `Chip` (scoping the search to a profile or collection) or a 20px search icon in `text-tertiary` (`.cx-search__lead`).
- `.cx-search__input`: 14px `body-regular`, placeholder in `text-tertiary`, ends with an ellipsis ("Search profile…").
- `.cx-search__actions`: `IconButton--plain` items (visual search, clear).

## What the consumer provides
The scope chip content, placeholder copy, and submit / image-search handlers. Wrap in a `<form role="search">`.

## Do / don't
- Do keep the placeholder short and sentence case with a trailing ellipsis.
- Don't add a visible submit button; Enter submits.
