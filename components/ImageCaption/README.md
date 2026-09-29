# ImageCaption

Caption laid over photography: a plain title with a frosted-glass credit pill beneath it. Use it for attribution on full-bleed images ("Photograph from Unformen der Kunst" / "Karl Blossfeldt").

## Anatomy
Centred column, `space-3` gap. Title `body` (16px) in `text-onmedia`, with a faint 12px dark text shadow for legibility on light images. Credit pill: `radius-2xl`, padding `space-5` `space-3`, fill `text-onmedia` at 25%, `backdrop-blur` (12px) and 150% saturation.

## States
None. The credit is not interactive; wrap it in a link yourself if it needs to be.

## Do / don't
- Do place it on an image; the glass fill has nothing to blur on a flat ground.
- Do keep the credit to a name or a short source.
- Don't theme the type: it stays `text-onmedia` in light and dark because the image supplies the ground.
- Don't use it for interactive filters; that is a Chip.
