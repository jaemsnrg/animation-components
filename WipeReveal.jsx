'use client';

import React from 'react';
import { toCssEasing } from './useRevealTrigger';

// Left-to-right wipe using nested translates: an overflow-hidden window slides in from the
// left while its content counter-slides, so the content stays anchored and the window's
// right edge is the wipe boundary. Both layers use the same CSS transition, so it runs
// entirely on the compositor (no clip-path / mask repaint per frame, no JS). When `active`
// goes false it snaps back instantly.
export function WipeReveal({
  active,
  delay = 0,
  duration = 1,
  easing = [0.87, 0, 0.13, 1],
  style,
  innerStyle,
  children,
}) {
  const t = active
    ? `transform ${duration}s ${toCssEasing(easing)} ${delay}s`
    : 'none';
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        transform: active ? 'translate3d(0,0,0)' : 'translate3d(-100%,0,0)',
        transition: t,
        willChange: 'transform',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: active ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)',
          transition: t,
          willChange: 'transform',
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
