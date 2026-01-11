'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

const Letter = ({ char, mouseX, mouseY, proximity = 150 }) => {
  const ref = useRef(null);
  
  // Motion value for this letter's specific weight
  // Manrope supports 200 to 800
  const weight = useMotionValue(200);
  
  // Smooth out the weight changes with a more fluid spring config
  const smoothWeight = useSpring(weight, {
    stiffness: 120,
    damping: 20,
    mass: 0.2
  });

  useEffect(() => {
    const updateWeight = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX.get() - centerX, 2) + 
        Math.pow(mouseY.get() - centerY, 2)
      );

      // Exponential falloff for finer control
      const distanceFactor = Math.max(0, 1 - distance / proximity);
      const easedFactor = Math.pow(distanceFactor, 2.5);
      
      // Map to Manrope range: 200 (ExtraLight) to 800 (ExtraBold)
      const newWeight = 200 + (easedFactor * 600);
      weight.set(newWeight);
    };

    const unsubscribeX = mouseX.on("change", updateWeight);
    const unsubscribeY = mouseY.on("change", updateWeight);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, proximity]);

  return (
    <motion.span
      ref={ref}
      style={{ 
        fontWeight: smoothWeight,
        display: 'inline-block',
        fontFamily: "'Manrope', sans-serif",
        fontVariationSettings: `"wght" \${smoothWeight.get()}`,
        willChange: 'font-weight, font-variation-settings'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};



export const VariableFontHover = ({ text, className, proximity = 150 }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("flex flex-wrap cursor-default select-none justify-center", className)}
    >
      {text.split('').map((char, i) => (
        <Letter 
          key={i} 
          char={char} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          proximity={proximity}
        />
      ))}
    </div>
  );
};

VariableFontHover.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  proximity: PropTypes.number,
};
