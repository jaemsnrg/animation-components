import { byType, isSemantic, semanticGroup, SEMANTIC_GROUPS, page, esc, codeChip } from '../lib.js';

export default {
  title: 'Foundations/Colors',
  parameters: { docs: { description: { component: 'Primitive palette and the semantic roles built on it, resolved for both themes. Use the semantic tokens in components; primitives exist to define them.' } } },
};

const checker = 'background-image:conic-gradient(var(--gray-200) 25%,transparent 0 50%,var(--gray-200) 0 75%,transparent 0);background-size:8px 8px';
const swatch = (css, size = 'size-10') =>
  `<span class="${size} inline-block shrink-0 rounded-full border-[0.5px] border-border-primary" style="${checker}"><span class="block size-full rounded-full" style="background:${css}"></span></span>`;

const primitives = () => {
  const groups = {};
  for (const t of byType('color').filter((t) => !isSemantic(t))) {
    const g = t.path.split('.')[1];
    (groups[g] ??= []).push(t);
  }
  return Object.entries(groups)
    .map(
      ([g, list]) => `
      <section class="mb-10">
        <h2 class="text-heading mb-4 capitalize text-text-primary">${esc(g.replace(/-/g, ' '))}</h2>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
          ${list
            .map(
              (t) => `
            <div class="rounded-2xl border-[0.5px] border-border-primary bg-bg-card p-3" title="${esc(t.description)}">
              <div class="mb-3 h-16 rounded-xl border-[0.5px] border-border-primary" style="background:var(${t.cssVar})"></div>
              <div class="text-body-medium text-text-primary">${esc(t.cssVar.slice(2))}</div>
              <div class="text-mono text-text-secondary">${esc(t.light)}</div>
              <div class="text-mono text-text-tertiary">${esc(t.cssVar)}</div>
            </div>`,
            )
            .join('')}
        </div>
      </section>`,
    )
    .join('');
};

const semantic = () =>
  SEMANTIC_GROUPS.map((g) => {
    const list = byType('color').filter((t) => isSemantic(t) && semanticGroup(t) === g);
    return `
    <section class="mb-10">
      <h2 class="text-heading mb-4 capitalize text-text-primary">${g}</h2>
      <div class="overflow-hidden rounded-2xl border-[0.5px] border-border-primary bg-bg-card">
        <div class="text-caption grid grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-4 border-b-[0.5px] border-border-primary px-4 py-2 text-text-tertiary">
          <span>Token</span><span>Light</span><span>Dark</span><span>Tailwind</span>
        </div>
        ${list
          .map(
            (t) => `
          <div class="grid grid-cols-[1.4fr_1fr_1fr_1.4fr] items-center gap-4 border-b-[0.5px] border-border-primary px-4 py-3 last:border-b-0" title="${esc(t.description)}">
            <div><div class="text-body-medium text-text-primary">${esc(t.cssVar.slice(2))}</div><div class="text-caption text-text-tertiary">${esc(t.description.split('. ')[0])}</div></div>
            <div class="flex items-center gap-2">${swatch(t.light)}<span class="text-mono text-text-secondary">${esc(t.aliasOf?.replace('color.', '') ?? '')}<br>${esc(t.light)}</span></div>
            <div class="flex items-center gap-2">${swatch(t.dark)}<span class="text-mono text-text-secondary">${esc((t.aliasOfDark ?? t.aliasOf)?.replace('color.', '') ?? '')}<br>${esc(t.dark)}</span></div>
            <div class="flex flex-wrap gap-1">${t.tailwind.map(codeChip).join('')}</div>
          </div>`,
          )
          .join('')}
      </div>
    </section>`;
  }).join('');

export const Semantic = {
  render: () =>
    page('Semantic colours', 'Roles used by components. Values are shown for both themes; toggle the toolbar theme to see live CSS variables switch.', semantic()),
};

export const Primitives = {
  render: () =>
    page('Primitive palette', 'Raw colour values. Never use these directly in components; reference the semantic roles so dark mode comes for free.', primitives()),
};
