# Design systems

Each folder is a self-contained design system: its own tokens, components, styles and tooling. Nothing is shared between systems, and a system is only bundled if something imports from it.

```
package.json, .storybook/, tsconfig.json   # shared tooling at the library root
design-systems/
  minimal/          # name = folder name
    tokens.json     # source of truth (DTCG)
    terrazzo.config.mjs, scripts/build-tokens.mjs
    dist/           # generated CSS, committed
    src/components/ui/*.tsx
    stories/        # picked up by the root Storybook
    components.json # shadcn config for this system
```

Root scripts: `npm run storybook`, `npm run tokens:build`, `npm run tokens:check`. A new system's build/check scripts get added there.

## Treeshaking rules

- **No barrel files.** Import a component by its file: `import { Button } from '<path>/design-systems/minimal/src/components/ui/button'`. Do not add `index.ts` re-exports.
- The root `package.json` declares `"sideEffects": ["**/*.css"]` and covers every system (don't add a nested `package.json`, which would override it), so any unreferenced module is dropped; only CSS is kept as side-effectful.
- Modules must have no top-level side effects (no registering, no DOM access at import).
- Systems don't import from each other. Shared code is copied or moved to the repo root, never cross-linked.
- A system's CSS (tokens, theme) is opt-in: the consumer imports the one it wants. Tokens from systems that aren't imported are not shipped.

## Adding a system

Copy `minimal/`'s layout into `design-systems/<name>/`, add its token scripts to the root `package.json`, and import its components by path. Stories in `<name>/stories` are picked up automatically; `@/` in a story resolves to that system's `src/`.
