'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Shared with ImageBoxView — smooth cinematic ease
const EASE = [0.448, 0.067, 0.119, 0.994];

const outgoing = {
  rest: { y: '0%' },
  hover: { y: '-105%' },
};

const incoming = {
  rest: { y: '105%' },
  hover: { y: '0%' },
};

const transition = {
  duration: 0.55,
  ease: EASE,
};

export const HoverReveal = ({
  children,
  duration = 0.55,
  style = {},
  className = '',
  animate: externalAnimate,
}) => {
  const t = { ...transition, duration };

  return (
    <motion.div
      initial="rest"
      animate={externalAnimate ?? 'rest'}
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
      {/* ghost spacer — invisible, sizes the container so both animated
          divs get identical dimensions via inset:0 */}
      <div
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>

      {/* outgoing — visible at rest, exits upward on hover */}
      <motion.div
        variants={outgoing}
        transition={t}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </motion.div>

      {/* incoming — hidden below at rest, rises into view on hover */}
      <motion.div
        variants={incoming}
        transition={t}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

HoverReveal.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  animate: PropTypes.string,
};
