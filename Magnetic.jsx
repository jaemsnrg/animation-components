'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

export const Magnetic = ({ children, className, distance = 0.5 }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    x.set(deltaX * distance);
    y.set(deltaY * distance);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={cn("relative inline-block", className)}
    >
      {children}
    </motion.div>
  );
};

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  distance: PropTypes.number,
};
