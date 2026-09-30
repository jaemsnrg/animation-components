'use client';

import { useEffect, useRef, useState } from 'react';

// Returns [ref, playing]. Plays on mount, or once when scrolled into view (`inView`).
export function useRevealTrigger(inView = false) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!inView) {
      setPlaying(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPlaying(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  return [ref, playing];
}

export const toCssEasing = (easing) =>
  Array.isArray(easing) ? `cubic-bezier(${easing.join(',')})` : easing;

// Fades read much shorter than the number suggests with a hard ease-out, so every reveal
// stretches its duration by this factor and defaults to a gentler curve. Tune here.
export const FADE_DURATION_SCALE = 1.4;
export const FADE_EASING = [0.25, 0.1, 0.25, 1];
