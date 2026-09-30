'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';
import { useRevealTrigger, toCssEasing } from './useRevealTrigger';
import './reveal-slide.css';

// Original slide-up (clip-masked) word reveal, driven by CSS keyframes.
export const RevealWordsSlide = ({
  text,
  duration = 0.7,
  delay = 0,
  stagger = 0.05,
  easing = [0.16, 1, 0.3, 1],
  inView = false,
  className,
}) => {
  const [ref, playing] = useRevealTrigger(inView);
  const words = text.split(' ');

  return (
    <div
      ref={ref}
      className={cn('reveal-slide flex flex-wrap', playing && 'is-playing', className)}
      style={{
        '--reveal-duration': `${duration}s`,
        '--reveal-delay': `${delay}s`,
        '--reveal-stagger': `${stagger}s`,
        '--reveal-ease': toCssEasing(easing),
      }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span key={index} aria-hidden="true" className="reveal-unit-clip" style={{ clipPath: 'inset(0 -0.15em)', marginRight: '0.25em' }}>
          <span className="reveal-unit" style={{ '--i': index }}>
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};

RevealWordsSlide.propTypes = {
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
