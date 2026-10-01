'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from './lib/utils';
import { useRevealTrigger, toCssEasing } from './useRevealTrigger';
import './reveal-slide.css';

// Original slide-up (clip-masked) reveal, now driven by CSS keyframes. Used for hero/splash
// intros; the default RevealText is the fade version. Each character keeps its own static
// clip-path (see feedback: overflow:hidden cuts glyph overhang).
export const RevealTextSlide = ({
  text,
  duration = 0.8,
  delay = 0,
  stagger = 0.02,
  easing = [0.16, 1, 0.3, 1],
  inView = false,
  nowrap = false,
  className
}) => {
  const [ref, playing] = useRevealTrigger(inView);
  const characters = text.split('');

  return (
    <div
      ref={ref}
      className={cn('reveal-slide flex', nowrap ? 'flex-nowrap' : 'flex-wrap', playing && 'is-playing', className)}
      style={{
        '--reveal-duration': `${duration}s`,
        '--reveal-delay': `${delay}s`,
        '--reveal-stagger': `${stagger}s`,
        '--reveal-ease': toCssEasing(easing),
      }}
    >
      <span className="sr-only">{text}</span>
      {characters.map((char, index) => (
        <span key={index} aria-hidden="true" className="reveal-unit-clip" style={{ clipPath: 'inset(0 -0.15em -0.18em)' }}>
          <span className="reveal-unit" style={{ '--i': index }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </div>
  );
};

RevealTextSlide.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  easing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  inView: PropTypes.bool,
  nowrap: PropTypes.bool,
  className: PropTypes.string,
};
