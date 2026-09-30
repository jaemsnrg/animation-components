'use client';

import { useEffect, useState } from 'react';

// The Mux player bundle is ~300KB. Bundling it statically inflates load-time JS, and the
// package's /lazy entry parses it mid-scroll (a ~500-1000ms main-thread stall). Instead,
// fetch it once the page has loaded and the browser is idle, so it is ready before the
// user starts scrolling. The import is shared, so several videos cost one fetch.
let playerPromise;
function loadPlayer() {
  playerPromise ??= import('@mux/mux-player-react').then((m) => m.default);
  return playerPromise;
}

export function useMuxPlayer(enabled = true) {
  const [Player, setPlayer] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let idleId;
    const run = () => loadPlayer().then((P) => { if (!cancelled) setPlayer(() => P); });
    const start = () => {
      idleId = 'requestIdleCallback' in window
        ? window.requestIdleCallback(run, { timeout: 2000 })
        : setTimeout(run, 1000);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    };
  }, [enabled]);

  return Player;
}
