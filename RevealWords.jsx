'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

export const RevealWords = ({
  text,
  duration = 0.7,
  delay = 0,
  stagger = 0.05,
  easing = [0.16, 1, 0.3, 1],
  className,
}) => {
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { y: '110%' },
    visible: {
      y: 0,
      transition: {
        duration,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      className={cn('flex flex-wrap', className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <span key={index} style={{ clipPath: 'inset(0 -0.15em)', display: 'inline-block', marginRight: '0.25em' }}>
          <motion.span variants={child} style={{ display: 'inline-block' }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
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
  className: PropTypes.string,
};
