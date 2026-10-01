// tokens.json (DTCG) -> dist/tokens.css, dist/tailwind.theme.css, dist/dictionary.json
// Style Dictionary resolves aliases and validates structure; each theme is resolved separately
// by swapping in $extensions.mode[theme] as $value before resolution.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
const THEMES = ['light', 'dark'];
const THEMED_TYPES = new Set(['color', 'shadow']);

const num = (n) => String(parseFloat(Number(n).toFixed(5)));
const isRef = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v);
const cssName = (p) => (p[0] === 'color' || p[0] === 'type' ? p.slice(1) : p).join('-');
const refVar = (ref) => `var(--${cssName(ref.slice(1, -1).split('.'))})`;

const hex2 = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
const color = (v) => {
  const base = v.hex ?? '#' + v.components.map(hex2).join('');
  return v.alpha === undefined || v.alpha === 1 ? base : base + hex2(v.alpha);
};
const dim = (v) => `${num(v.value)}${v.unit}`;
const family = (list) => list.map((f) => (/[\s\d]/.test(f) ? `"${f}"` : f)).join(', ');
const shadow = (layers) =>
  layers.map((l) => `${l.inset ? 'inset ' : ''}${dim(l.offsetX)} ${dim(l.offsetY)} ${dim(l.blur)} ${dim(l.spread)} ${color(l.color)}`).join(', ');

// CSS value for a token; single-alias tokens keep var() indirection so themes stay live.
const cssValue = (t) => {
  if (isRef(t.original.$value)) return refVar(t.original.$value);
  const v = t.$value;
  switch (t.$type) {
    case 'color': return color(v);
    case 'dimension': case 'duration': return dim(v);
    case 'shadow': return shadow(v);
    case 'cubicBezier': return `cubic-bezier(${v.join(', ')})`;
    case 'fontFamily': return family(v);
    case 'typography': return null;
    default: return String(v);
  }
};

async function resolve(theme) {
  const sd = new StyleDictionary({
    source: [path.join(root, 'tokens.json')],
    log: { verbosity: 'silent' },
    preprocessors: ['mode'],
    hooks: {
      preprocessors: {
        mode: (dictionary) => {
          const walk = (node) => {
            if (node && typeof node === 'object' && '$value' in node) {
              const m = node.$extensions?.mode?.[theme];
              if (m !== undefined) node.$value = m;
            } else if (node && typeof node === 'object') {
              for (const [k, v] of Object.entries(node)) if (!k.startsWith('$')) walk(v);
            }
          };
          walk(dictionary);
          return dictionary;
        },
      },
    },
    platforms: { css: {} },
  });
  const { allTokens } = await sd.getPlatformTokens('css');
  return allTokens;
}

const [light, dark] = await Promise.all(THEMES.map(resolve));
const darkByPath = new Map(dark.map((t) => [t.path.join('.'), t]));

const entries = light.map((t) => {
  const d = darkByPath.get(t.path.join('.'));
  const name = cssName(t.path);
  return {
    path: t.path.join('.'),
    name,
    type: t.$type,
    description: t.$description ?? '',
    extensions: t.$extensions?.['com.cosmos-study'] ?? {},
    light: cssValue(t),
    dark: cssValue(d),
    // resolved (alias-free) values for previews
    lightResolved: t.$type === 'typography' ? null : cssResolved(t),
    darkResolved: d.$type === 'typography' ? null : cssResolved(d),
    raw: t.$value,
    themed: THEMED_TYPES.has(t.$type) && JSON.stringify(t.$value) !== JSON.stringify(d.$value),
    rawDark: d.$value,
    aliasOf: isRef(t.original.$value) ? t.original.$value.slice(1, -1) : null,
    aliasOfDark: isRef(d.original.$value) ? d.original.$value.slice(1, -1) : null,
  };
});

function cssResolved(t) {
  const saved = t.original;
  t.original = { $value: t.$value };
  const v = cssValue(t);
  t.original = saved;
  return v;
}

const by = (type) => entries.filter((e) => e.type === type);
const themed = entries.filter((e) => e.themed);
const decl = (e, k) => `  --${e.name}: ${e[k]};`;

// ---------- tokens.css ----------
const themedBlock = (sel, indent = '') =>
  `${indent}${sel} {\n${themed.map((e) => indent + decl(e, 'dark')).join('\n')}\n${indent}}`;
const staticThemable = [...by('color'), ...by('shadow')];
const statics = entries.filter((e) => !THEMED_TYPES.has(e.type) && e.type !== 'typography');

const typeClasses = by('typography').map((e) => {
  const v = e.raw;
  return `.${e.name} { font-family: ${refVar(light.find((t) => t.path.join('.') === e.path).original.$value.fontFamily)}; font-size: ${dim(v.fontSize)}; line-height: ${num(v.lineHeight)}; letter-spacing: ${dim(v.letterSpacing)}; font-weight: ${v.fontWeight}; }`;
});

const tokensCss = `/* Cosmos Study tokens. Generated from tokens.json by scripts/build-tokens.mjs; do not edit. Light is default; dark via [data-theme="dark"] or the OS setting. */
:root, [data-theme="light"] {
${staticThemable.map((e) => decl(e, 'light')).join('\n')}
}
${themedBlock('[data-theme="dark"]')}
@media (prefers-color-scheme: dark) {
${themedBlock(':root:not([data-theme="light"])', '  ')}
}
:root {
${statics.map((e) => decl(e, 'light')).join('\n')}
}

${typeClasses.join('\n')}
`;

// ---------- tailwind.theme.css (Tailwind v4, CSS-first) ----------
const twKey = { space: (e) => e.name.replace(/^space-/, '').replace(/^(\d+)-(\d+)$/, '$1\\.$2') };
const colorLines = by('color').map((e) => `  --color-${e.name}: var(--${e.name});`);
const staticLines = [];
const resetLines = ['  --color-*: initial;', '  --font-sans: initial;', '  --font-serif: initial;', '  --font-mono: initial;', '  --text-*: initial;', '  --radius-*: initial;', '  --shadow-*: initial;', '  --ease-*: initial;'];
for (const e of by('fontFamily')) staticLines.push(decl(e, 'light'));
for (const e of by('typography')) {
  const v = e.raw;
  staticLines.push(
    `  --text-${e.name}: ${dim(v.fontSize)};`,
    `  --text-${e.name}--line-height: ${num(v.lineHeight)};`,
    `  --text-${e.name}--letter-spacing: ${dim(v.letterSpacing)};`,
    `  --text-${e.name}--font-weight: ${v.fontWeight};`,
  );
}
for (const e of entries.filter((x) => x.path.startsWith('space.') || x.path.startsWith('layout.')))
  staticLines.push(`  --spacing-${e.path.startsWith('space.') ? twKey.space(e) : e.name}: ${e.light};`);
for (const e of entries.filter((x) => x.path.startsWith('radius.'))) staticLines.push(decl(e, 'light'));
for (const e of by('shadow')) staticLines.push(decl(e, 'light'));
for (const e of by('cubicBezier')) staticLines.push(decl(e, 'light'));

const tailwindCss = `/* Tailwind v4 theme for Cosmos Study. Generated from tokens.json by scripts/build-tokens.mjs; do not edit.
   Use together with tokens.css, which defines the themed CSS variables these entries point at. */

/* Drop Tailwind's default palette, type scale, radii, shadows and easings first: a reset only clears entries declared before it. */
@theme {
${resetLines.join('\n')}
}

/* Colours are indirections onto themed variables, so they must be inlined into utilities. */
@theme inline {
${colorLines.join('\n')}
}

/* Everything else is theme-independent (or, for shadow-field-inset, overridden by tokens.css). */
@theme {
${staticLines.join('\n')}
}

${by('duration').map((e) => `@utility duration-${e.path.split('.').pop()} {\n  transition-duration: var(--${e.name});\n}`).join('\n')}
`;

// ---------- dictionary.json: token -> CSS variable -> Tailwind utility ----------
const utilityFor = (e) => {
  const key = e.name;
  switch (e.type) {
    case 'color': return [`bg-${key}`, `text-${key}`, `border-${key}`];
    case 'typography': return [`text-${key}`];
    case 'shadow': return [`shadow-${key.replace(/^shadow-/, '')}`];
    case 'fontFamily': return [`font-${key.replace(/^font-/, '')}`];
    case 'cubicBezier': return [`ease-${key.replace(/^ease-/, '')}`];
    case 'duration': return [`duration-${e.path.split('.').pop()}`];
    default:
      if (e.path.startsWith('radius.')) return [`rounded-${key.replace(/^radius-/, '')}`];
      if (e.path.startsWith('space.')) return [`p-${twKey.space(e).replace('\\', '')}`];
      if (e.path.startsWith('layout.')) return [`h-${key}`, `w-${key}`];
      return [];
  }
};
const dictionary = entries.map((e) => ({
  path: e.path,
  type: e.type,
  cssVar: e.type === 'typography' ? null : `--${e.name}`,
  cssClass: e.type === 'typography' ? `.${e.name}` : null,
  themed: e.themed,
  light: e.lightResolved,
  dark: e.darkResolved,
  aliasOf: e.aliasOf,
  aliasOfDark: e.aliasOfDark,
  tailwind: utilityFor(e),
  typography: e.type === 'typography' ? e.raw : undefined,
  sample: e.extensions.sample,
  group: e.extensions.group,
  description: e.description,
}));

fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'tokens.css'), tokensCss);
fs.writeFileSync(path.join(out, 'tailwind.theme.css'), tailwindCss);
fs.writeFileSync(path.join(out, 'dictionary.json'), JSON.stringify(dictionary, null, 2) + '\n');
console.log(`tokens: ${entries.length} (${themed.length} themed) -> dist/{tokens.css,tailwind.theme.css,dictionary.json}`);
