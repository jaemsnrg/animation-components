# Migrating consumers

Three changes affect other repos that use this library. Everything else (file names, exports, props, CSS) is unchanged.

1. **The design system moved in here.** `design-system-minimal` (separate repo) is now `design-systems/minimal/`.
2. **The library is self-contained.** Components used to import `cn` from `../lib/utils`, a file the *host* app had to provide next to the mount folder. They now import `./lib/utils` (shipped here). Where you mount this folder no longer matters.

3. **Shared tooling moved to this repo's root.** What used to sit inside the design system now lives here: `package.json`, `.storybook/`, `tsconfig.json`, `.gitignore`, `package-lock.json`, `pnpm-lock.yaml`. Per-system files (`tokens.json`, terrazzo config, `scripts/build-tokens.mjs`, `dist/`, `src/`, `stories/`, `components.json`) stay in `design-systems/<name>/`.

## Who breaks

| Consumer | Breaks? |
|---|---|
| Pinned to an older commit of animation-components | No. Nothing changes until you bump the submodule. |
| Bumps animation-components, mounts it somewhere with a `../lib/utils` | No. Still works; that host file is just no longer used. |
| Bumps animation-components, mounts it somewhere *without* `../lib/utils` | Previously broken, now fixed. |
| Uses the `design-system-minimal` repo/submodule | Not broken, but frozen: that repo is no longer updated. Follow B below. |

Moving the tooling doesn't affect how components are imported, so consumers need no import changes for it. It matters only for people who run the design system's own scripts or Storybook, see D.

Requirements are unchanged, plus one to confirm: the host must have `clsx` and `tailwind-merge` installed (used by `lib/utils.js`).

## A. Update an existing animation-components consumer

1. Bump the submodule to a commit containing `design-systems/` and `lib/utils.js`:
   ```sh
   git -C <path-to>/animation-components fetch && git -C <path-to>/animation-components checkout <commit-or-main>
   git add <path-to>/animation-components
   ```
2. `pnpm add clsx tailwind-merge` if not already present.
3. Optional: delete your host `lib/utils.js` if nothing else uses it.
4. Build. No import changes are needed.

## B. Move from design-system-minimal to design-systems/minimal

1. Remove the old submodule:
   ```sh
   git submodule deinit -f <path-to>/design-system-minimal
   git rm -f <path-to>/design-system-minimal
   rm -rf .git/modules/<path-to>/design-system-minimal
   ```
2. Add (or bump) animation-components as above. The design system is at `<path-to>/animation-components/design-systems/minimal`.
3. Add an alias so imports stay short. `tsconfig.json` / `jsconfig.json`:
   ```json
   "paths": { "@ds/*": ["<path-to>/animation-components/design-systems/*"] }
   ```
4. Rewrite imports:
   ```diff
   - import { Button } from '<path-to>/design-system-minimal/src/components/ui/button'
   + import { Button } from '@ds/minimal/src/components/ui/button'
   ```
   Always import by file. Don't add barrel files; that is what keeps unused components out of the bundle.
5. If you use `@import "./design-system/src/styles/theme.css"` in CSS, point it at `design-systems/minimal/src/styles/theme.css`.
6. If you generate CSS from `dist/` (like agency's `scripts/sync-design-system.mjs`), change that script's root to `.../animation-components/design-systems/minimal`.
7. Exclude the system's `stories/` and `.storybook/` from your TypeScript `include`, since they use Storybook-only types.
8. Build and confirm nothing from the design system you don't import shows up in the client bundle.

## C. Mounting the library elsewhere

Free to move now. After moving, update only your own imports, the `@ds/*` alias, and `.gitmodules` (`git mv` updates the path; edit the `[submodule "..."]` name to match).

## D. Tooling now runs from the library root

Run scripts from `animation-components/` (not `design-systems/minimal/`):

| Before (in design-system-minimal) | Now (in animation-components) |
|---|---|
| `npm run storybook` | `npm run storybook` |
| `npm run build-storybook` | `npm run build-storybook` |
| `npm run tokens:build` | `npm run tokens:build` (builds `design-systems/minimal`) |
| `npm run tokens:check` | `npm run tokens:check` (runs inside `design-systems/minimal`) |

- Run `npm install` in `animation-components/` once. Dependencies for the design system and Storybook are declared in the root `package.json`.
- There is no `package.json` inside `design-systems/<name>/` any more. Don't add one: the root's `"sideEffects": ["**/*.css"]` is what keeps unused modules out of bundles, and a nested `package.json` would override it.
- Storybook finds stories in `design-systems/*/stories`. In a story, `@/` resolves to that system's `src/`.
- Storybook previews one system at a time: `.storybook/preview.tsx` imports the tokens and `globals.css` of `minimal`. To preview another system, change those two imports.
- If you have local tooling that pointed at `design-system-minimal/{package.json,.storybook,tsconfig.json}` (CI, editor config, scripts), point it at the library root.

### node_modules inside the submodule

`npm install` in `animation-components/` creates `node_modules/` there. It is git-ignored, but the host app's bundler can pick up packages from it for the animation and design-system files (not React: Next resolves its own copy). Only run it when you need Storybook. If the host's bundle grows or you see two versions of `radix-ui`, `lucide-react` or `clsx`, delete `animation-components/node_modules`.
