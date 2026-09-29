import { byPrefix, byType, page, esc, codeChip } from '../lib.js';

export default {
  title: 'Foundations/Layout',
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Spacing, radius, elevation and motion tokens.' } } },
};

const row = (t, visual) => `
  <div class="grid grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,1.4fr)] items-center gap-6 border-t-[0.5px] border-border-primary py-3">
    <div><div class="text-body-medium text-text-primary">${esc(t.cssVar.slice(2))}</div><div class="text-mono text-text-secondary">${esc(t.light)}</div></div>
    <div>${visual}</div>
    <div><div class="text-caption mb-1 text-text-tertiary">${esc(t.description)}</div>${t.tailwind.map(codeChip).join(' ')}</div>
  </div>`;

export const Spacing = {
  render: () =>
    page(
      'Spacing',
      'A 4px base. Numeric keys match Tailwind\'s default scale (space-4 = 16px = <code>p-4</code>); layout tokens are exposed as <code>h-layout-header-height</code> etc.',
      [...byPrefix('space.'), ...byPrefix('layout.')]
        .sort((a, b) => parseFloat(a.light) - parseFloat(b.light))
        .map((t) => row(t, `<div class="h-4 rounded-xs bg-button-primary" style="width:var(${t.cssVar})"></div>`))
        .join(''),
    ),
};

export const Radius = {
  render: () =>
    page(
      'Radius',
      'Every interactive control is <code>radius-full</code>. Cards step up through 2xl and 3xl.',
      byPrefix('radius.')
        .map((t) =>
          row(t, `<div class="size-16 border-[0.5px] border-border-hover bg-bg-elevation" style="border-radius:var(${t.cssVar})"></div>`),
        )
        .join(''),
    ),
};

export const Shadows = {
  render: () =>
    page(
      'Shadows',
      'Depth is sparing: small under the search bar, medium under cards, large for anything floating. <code>shadow-field-inset</code> is themed.',
      byType('shadow')
        .map((t) => row(t, `<div class="h-20 w-40 rounded-2xl bg-bg-card" style="box-shadow:var(${t.cssVar})"></div>`))
        .join(''),
    ),
};

export const Motion = {
  render: () =>
    page(
      'Motion',
      'Hover the tracks. Duration and easing tokens are theme-independent.',
      [...byType('duration'), ...byType('cubicBezier')]
        .map((t) =>
          row(
            t,
            `<div class="group h-8 w-full rounded-full bg-bg-elevation p-1">
              <div class="size-6 rounded-full bg-button-primary transition-transform group-hover:translate-x-[calc(100%*8)]" style="transition-duration:var(--duration-${t.type === 'duration' ? t.path.split('.').pop() : 'slow'});transition-timing-function:${t.type === 'cubicBezier' ? `var(${t.cssVar})` : 'ease'}"></div>
            </div>`,
          ),
        )
        .join(''),
    ),
};
