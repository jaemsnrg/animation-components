import { createElement } from 'react';
import dictionary from '../dist/dictionary.json';

export const tokens = dictionary;
export const byType = (type) => dictionary.filter((t) => t.type === type);
export const byPrefix = (prefix) => dictionary.filter((t) => t.path.startsWith(prefix));
export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const SEMANTIC = ['bg', 'text', 'border', 'button', 'hover'];
export const semanticGroup = (t) => t.path.split('.')[1];
export const isSemantic = (t) => t.type === 'color' && SEMANTIC.includes(semanticGroup(t));
export const SEMANTIC_GROUPS = SEMANTIC;

/** Shared page chrome for foundation stories. */
const pageHtml = (title, intro, body) => `
  <div class="mx-auto max-w-5xl px-8 py-12">
    <h1 class="text-display mb-2 text-text-primary">${esc(title)}</h1>
    <p class="text-body mb-10 max-w-2xl text-text-secondary">${intro}</p>
    ${body}
  </div>`;

/** Foundation pages are authored as HTML strings and rendered as one React element. */
export const page = (title, intro, body) => createElement('div', { dangerouslySetInnerHTML: { __html: pageHtml(title, intro, body) } });

export const codeChip = (s) =>
  `<code class="text-mono rounded-sm bg-bg-elevation px-1.5 py-0.5 text-text-secondary">${esc(s)}</code>`;
