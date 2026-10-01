# Design systems

Each folder is a self-contained design system: its own tokens, components, styles and tooling. Nothing is shared between systems, and a system is only bundled if something imports from it.

```
design-systems/
  minimal/          # name = folder name
    tokens.json     # source of truth (DTCG)
    dist/           # generated CSS, committed
    src/components/ui/*.tsx
    src/lib/utils.ts
    package.json    # system's own tooling deps (storybook, terrazzo, ...)
```

## Treeshaking rules

- **No barrel files.** Import a component by its file: `import { Button } from '<path>/design-systems/minimal/src/components/ui/button'`. Do not add `index.ts` re-exports.
- Every `package.json` (repo root and each system) declares `"sideEffects": ["**/*.css"]`, so any unreferenced module is dropped; only CSS is kept as side-effectful.
- Modules must have no top-level side effects (no registering, no DOM access at import).
- Systems don't import from each other. Shared code is copied or moved to the repo root, never cross-linked.
- A system's CSS (tokens, theme) is opt-in: the consumer imports the one it wants. Tokens from systems that aren't imported are not shipped.

## Adding a system

Copy `minimal/`'s layout into `design-systems/<name>/`, set a unique package name (`@animation-components/design-system-<name>`), keep `sideEffects`, and import its components by path.
