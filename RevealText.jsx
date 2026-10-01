'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from './lib/utils';
import { useRevealTrigger, toCssEasing, FADE_DURATION_SCALE, FADE_EASING } from './useRevealTrigger';
import './reveal-fade.css';

// Per-character fade reveal, driven by CSS keyframes (no JS animation per character).
export const RevealText = ({
  text,
  duration = 0.8,
  delay = 0,
  stagger = 0.02,
  easing = FADE_EASING,
  inView = false,
  nowrap = false,
  className
}) => {
  const [ref, playing] = useRevealTrigger(inView);
  const characters = text.split('');

  return (
    <div
      ref={ref}
      className={cn('reveal-fade flex', nowrap ? 'flex-nowrap' : 'flex-wrap', playing && 'is-playing', className)}
      style={{
        '--reveal-duration': `${duration * FADE_DURATION_SCALE}s`,
        '--reveal-delay': `${delay}s`,
        '--reveal-stagger': `${stagger}s`,
        '--reveal-ease': toCssEasing(easing),
      }}
    >
      <span className="sr-only">{text}</span>
      {characters.map((char, index) => (
        <span key={index} aria-hidden="true" className="reveal-unit" style={{ '--i': index }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </div>
  );
};

RevealText.propTypes = {
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
