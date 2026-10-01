import { byType, page, esc, codeChip } from '../lib.js';

export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Type styles from the `typography` tokens, rendered with the generated Tailwind `text-*` utilities.' } } },
  argTypes: {
    text: { control: 'text', description: 'Override sample text (blank uses each style\'s sample).' },
  },
  args: { text: '' },
};

const px = (d) => `${d.value}${d.unit}`;

export const Scale = {
  render: ({ text }) => {
    const groups = {};
    for (const t of byType('typography')) (groups[t.group] ??= []).push(t);
    const body = Object.entries(groups)
      .map(
        ([g, list]) => `
      <section class="mb-10">
        <h2 class="text-heading mb-2 text-text-primary">${esc(g)}</h2>
        ${list
          .map((t) => {
            const v = t.typography;
            const mono = t.path === 'type.mono' ? ' font-mono' : '';
            return `
          <div class="grid grid-cols-[minmax(0,1fr)_minmax(220px,300px)] items-baseline gap-8 border-t-[0.5px] border-border-primary py-5">
            <div class="text-text-primary${mono} ${t.tailwind[0]} overflow-hidden whitespace-nowrap text-ellipsis">${esc(text || t.sample)}</div>
            <div class="text-caption flex flex-col gap-1 text-text-tertiary">
              <span class="text-body-regular text-text-primary">${esc(t.path.replace('type.', ''))}</span>
              <span class="text-mono">${px(v.fontSize)} / ${v.lineHeight} / ${px(v.letterSpacing)} / ${v.fontWeight}</span>
              <span>${esc(t.description)}</span>
              <span>${codeChip(t.tailwind[0] + (mono ? ' font-mono' : ''))}</span>
            </div>
          </div>`;
          })
          .join('')}
      </section>`,
      )
      .join('');
    return page('Type scale', 'Size / line-height / letter-spacing / weight. Body and headings track tight; weight 500 is reserved for controls.', body);
  },
};

export const Families = {
  render: () =>
    page(
      'Font families',
      'Geist and Geist Mono stand in for the source site\'s proprietary faces.',
      byType('fontFamily')
        .map(
          (t) => `
      <section class="mb-8 rounded-3xl border-[0.5px] border-border-primary bg-bg-card p-8 shadow-medium">
        <div class="text-caption mb-2 text-text-tertiary">${esc(t.path)} ${codeChip(t.tailwind[0])}</div>
        <div class="text-display-large ${t.tailwind[0]} text-text-primary">Aa Bb Cc 0123</div>
        <p class="text-body ${t.tailwind[0]} mt-4 text-text-secondary">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz</p>
        <p class="text-mono mt-4 text-text-tertiary">${esc(t.light)}</p>
      </section>`,
        )
        .join(''),
    ),
};
