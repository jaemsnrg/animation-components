A quiet, image-first interface: white ground, near-black ink, warm greys, pills everywhere, and hairlines instead of heavy chrome. The content (people's saved images) supplies all the colour, so the UI stays monochrome.

This system is a study of the public visual language of cosmos.so, measured from the live site's computed styles. It carries none of that brand's marks or licensed fonts: bring your own logo, and the type uses Geist as an open substitute.

## Content fundamentals

- Voice is calm and brief. Labels are one or two words: "Sign up", "Log in", "Follow", "Menu", "Profile", "Collections".
- Sentence case everywhere. Handles and collection names keep the user's own casing ("lucasworcel", "Mœbles").
- Counts are compact and unitless in badges ("4.6K", "26"), spelled out in meta lines ("99 elements", "403 Followers").
- Placeholders end in an ellipsis: "Search profile…".
- No emoji, no exclamation marks, no marketing adjectives in the product UI.

## Visual foundations

### Colour
- Page ground is `bg-primary` (white / `gray-975`). Text is `text-primary`; supporting lines `text-secondary`; meta `text-tertiary`.
- Emphasis comes from inversion, not hue: the primary action is `button-primary` (black in light, white in dark) with `text-inverted`.
- Raised fills step through `bg-light-elevation` (fields) and `bg-elevation` (secondary buttons, the selected tab, count badges).
- Hue is reserved: `text-link` / `bg-badge` blue for links and unread, `text-critical` orange for errors, `text-warning` amber, `text-success` green. Never decorate with them.
- `text-tertiary` misses 4.5:1 in light (2.9:1 on white): keep it to captions and meta that are not essential. `text-link` misses in dark (3.9:1): underline links there.
- Both themes are complete. Use the semantic tokens, never the `gray-*` primitives, in component code, so dark mode comes for free.

### Type
- One sans family (`--font-sans`, Geist standing in for the source's proprietary grotesque) and one mono (`--font-mono`) for metadata.
- Tight tracking throughout: -2% on body and headings, -3% on display, -4% on `heading-xxlarge`.
- Headings stay light (400); weight 500 is for controls (`body-medium` buttons, tab labels) and card titles.
- Default copy is `body` (16px / 1.4). Handles and links use `body-regular` (14px). Card meta uses `caption` (12px) in `text-tertiary`. Counts use `numerical` (10px, tabular).

### Shape
- `radius-full` for every interactive control: buttons, icon buttons, chips, tabs, the search bar, inputs, avatars.
- `radius-3xl` (24px) for collection cards; `radius-2xl` (16px) for element tiles and textareas; `radius-xl` for menus.
- Borders are 0.5px `border-primary` hairlines (ink at 12%). Hover strengthens to `border-hover`; selection uses `border-active`.

### Depth
- `shadow-small` under the search bar, `shadow-medium` under collection cards, `shadow-large` for anything floating. `shadow-field-inset` gives fields a soft bevel.
- No gradients in chrome.

### Spacing and layout
- 4px base (`space-1`). Page margins `layout-padding-horizontal` (32px). Header `layout-header-outer-height` (92px) holding 56px controls (`layout-header-height`).
- Card grids: `space-6` column gap, `space-8` row gap; masonry: `space-4`.

### Motion
- Colour and border changes: `duration-fast` (200ms). Card image zoom to 1.05 and search shadow: `duration-slow` (300ms). Sliding indicators use `ease-out-quint`. Respect `prefers-reduced-motion`.

### States and focus
- Hover darkens fills (`hover-primary`, `hover-secondary`) or adds `hover-tertiary` behind outlines.
- Focus is a solid 2px `border-active` ring with a 2px offset (this system's addition: the source ring is a 12% hairline that is too faint to meet 3:1).
- Disabled buttons use `bg-elevation` with `text-tertiary`.

## Iconography

- Line icons on a 24px grid drawn at 20px, 1.6px stroke, round caps and joins, coloured with `currentColor`.
- The icons in these previews (search, chevron, share, visual-search lens, plus, close, more, lock) are generic stand-ins drawn for this system, not the source's own set. Swap in your icon library at the same size and stroke.
- No emoji as icons.

## Components

Styles live in `components/bundle.css`, prefixed `cx-`; wrap a region in `.cx` to get the font, colour and focus ring. Button, IconButton, SearchBar, Input, Chip, Tabs, CountBadge, Avatar, CollectionCard, ElementCard and Header each have a live preview and a guideline page.

## Using in another project

Clone this repo into the consuming project (e.g. `git clone <url> design-system`, or as a submodule). There is no versioning: pull to update.

1. Install the peer deps in the consumer: `tailwindcss` (v4), `tw-animate-css`, `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`.
2. In the consumer's global CSS, after Tailwind (and load Geist yourself, see `src/styles/globals.css`):
   ```css
   @import "tailwindcss";
   @import "./design-system/src/styles/theme.css";
   ```
   `theme.css` pulls in `dist/tokens.css`, the Tailwind theme, the shadcn variable bindings, and points Tailwind at the component source.
3. Import components by path: `import { Button } from "./design-system/src/components/ui/button"`. Components use relative imports internally, so no `@/` alias is needed. The consumer's bundler must compile TSX outside its own `src` (Vite does by default).
4. Dark mode: set `data-theme="dark"` on `<html>`, or rely on the OS setting.

Edit tokens in `tokens.json` here, run `npm run tokens:build`, and commit `dist/` so consumers get the output without building.
