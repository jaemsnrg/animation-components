'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from './lib/utils';
import { useRevealTrigger, toCssEasing, FADE_DURATION_SCALE, FADE_EASING } from './useRevealTrigger';
import './reveal-fade.css';

// Per-word fade reveal, driven by CSS keyframes.
export const RevealWords = ({
  text,
  duration = 0.7,
  delay = 0,
  stagger = 0.05,
  easing = FADE_EASING,
  inView = false,
  className,
}) => {
  const [ref, playing] = useRevealTrigger(inView);
  const words = text.split(' ');

  return (
    <div
      ref={ref}
      className={cn('reveal-fade flex flex-wrap', playing && 'is-playing', className)}
      style={{
        '--reveal-duration': `${duration * FADE_DURATION_SCALE}s`,
        '--reveal-delay': `${delay}s`,
        '--reveal-stagger': `${stagger}s`,
        '--reveal-ease': toCssEasing(easing),
      }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span key={index} aria-hidden="true" className="reveal-unit" style={{ '--i': index, marginRight: '0.25em' }}>
          {word}
        </span>
      ))}
    </div>
  );
};

RevealWords.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
  stagger: PropTypes.number,
  easing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  inView: PropTypes.bool,
  className: PropTypes.string,
};
