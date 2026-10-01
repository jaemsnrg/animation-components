# Input

Single-line text field with label and hint, styled to match the search field: pill, `bg-light-elevation`, 0.5px hairline.

Note: derived from the search field's computed styles; the public pages surveyed show no standalone form field, so treat sizes as this system's choice.

## Anatomy
`<label class="cx-field"><span class="cx-field__label">…</span><input class="cx-input"><span class="cx-field__hint">…</span></label>`
- Input: 48px tall, `space-4-5` side padding, 15px text, `shadow-field-inset`.
- Label: 14px/500 `text-primary`. Hint: `caption` in `text-secondary`.
- `textarea.cx-input` switches to `radius-2xl` and grows vertically.

## States
Hover `border-hover`; focus `border-active`; `aria-invalid="true"` uses `border-critical` and a `cx-field__hint--error` hint in `text-critical`; disabled uses `bg-elevation` and `text-disabled`.

## Do / don't
- Do always pair errors with text, not just the orange border.
- Don't use placeholder text as the label.
