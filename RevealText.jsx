'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

export const RevealText = ({
  text,
  mode = 'stagger',
  duration = 0.8,
  delay = 0,
  easing = [0.22, 1, 0.36, 1],
  className
}) => {
  const characters = text.split('');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const child = {
    visible: {
      y: 0,
      transition: {
        duration: duration,
        ease: easing
      },
    },
    hidden: {
      y: "110%", // Slightly more than 100% to ensure descenders are cleared
      transition: {
        duration: duration,
        ease: easing
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <span key={index} style={{ clipPath: "inset(0 -0.15em)", display: "inline-block" }}>
          <motion.span 
            variants={child} 
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

RevealText.propTypes = {
  text: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['stagger']),
  duration: PropTypes.number,
  delay: PropTypes.number,
  easing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  className: PropTypes.string,
};

