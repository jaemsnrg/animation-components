'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Shared with ImageBoxView — smooth cinematic ease
const EASE = [0.448, 0.067, 0.119, 0.994];

// Split children into per-character segments so each can be staggered.
// Non-string children (icons, elements) animate as a single unit.
// Regular spaces are swapped for non-breaking spaces so they render inside
// `display: inline-flex` segments (flex layout collapses whitespace-only items).
function toSegments(children) {
  const segments = [];
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      [...child].forEach((char) => segments.push(char === ' ' ? ' ' : char));
    } else {
      segments.push(child);
    }
  });
  return segments;
}

export const HoverReveal = ({
  children,
  duration = 0.55,
  stagger = 0.009,
  style = {},
  className = '',
  animate: externalAnimate,
}) => {
  const [hovered, setHovered] = useState(false);
  const isHovered = externalAnimate === 'hover' || hovered;
  const segments = toSegments(children);

  const renderSegments = (restY, hoverY) =>
    segments.map((seg, i) => (
      <motion.span
        key={i}
        // height: 100% locks each segment to the wrapper height so translateY %
        // is always relative to the wrapper, not the segment's intrinsic size.
        // Without this, mixed-size children (e.g. small text + big icon) make
        // the wrapper taller than text segments and `y: 105%` doesn't fully
        // clip the incoming layer — content leaks at the wrapper bottom.
        style={{ display: 'inline-flex', alignItems: 'center', height: '100%', whiteSpace: 'pre' }}
        initial={{ y: restY }}
        animate={{ y: isHovered ? hoverY : restY }}
        transition={{ duration, ease: EASE, delay: i * stagger }}
      >
        {seg}
      </motion.span>
    ));

  return (
    <motion.div
      initial="rest"
      animate={externalAnimate ?? 'rest'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      {...(!externalAnimate && { whileHover: 'hover' })}
      style={{
        display: 'inline-flex',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        ...style,
      }}
      className={className}
    >
      {/* ghost spacer — sizes the container; paddingBlock absorbs glyph
          ink that bleeds outside the line-height box (ascenders/descenders) */}
      <div
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          visibility: 'hidden',
          pointerEvents: 'none',
          paddingBlock: '0.15em',
        }}
      >
        {children}
      </div>

      {/* outgoing — visible at rest, exits upward on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderSegments('0%', '-105%')}
      </div>

      {/* incoming — hidden below at rest, rises into view on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderSegments('105%', '0%')}
      </div>
    </motion.div>
  );
};

HoverReveal.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number,
  stagger: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  animate: PropTypes.string,
};
