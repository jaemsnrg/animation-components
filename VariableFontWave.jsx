'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, animate } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

const WaveLetter = ({ char, progress, index, total, proximity = 0.15 }) => {
  const weight = useMotionValue(200);
  const smoothWeight = useSpring(weight, {
    stiffness: 100,
    damping: 15,
    mass: 0.1
  });

  useEffect(() => {
    const updateWeight = (v) => {
      // progress (v) goes from 0 to 1
      // letter position is index / total
      const letterPos = index / total;
      const distance = Math.abs(v - letterPos);

      // Exponential falloff based on distance in the 0-1 range
      const distanceFactor = Math.max(0, 1 - distance / proximity);
      const easedFactor = Math.pow(distanceFactor, 2.5);
      
      const newWeight = 200 + (easedFactor * 600);
      weight.set(newWeight);
    };

    const unsubscribe = progress.on("change", updateWeight);
    return () => unsubscribe();
  }, [progress, index, total, proximity]);

  return (
    <motion.span
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

export const VariableFontWave = ({ 
  text, 
  className, 
  duration = 2, 
  interval = 3,
  proximity = 0.2 
}) => {
  const progress = useMotionValue(-0.2); // Start off-screen left

  useEffect(() => {
    const runAnimation = () => {
      // Animate from left (-20%) to right (120%)
      animate(progress, 1.2, {
        duration: duration,
        ease: "easeInOut",
        onComplete: () => {
          // Reset to start and wait for interval
          setTimeout(() => {
            progress.set(-0.2);
            runAnimation();
          }, interval * 1000);
        }
      });
    };

    runAnimation();
  }, [duration, interval, progress]);

  const chars = text.split('');

  return (
    <div className={cn("flex flex-wrap justify-center select-none cursor-default", className)}>
      {chars.map((char, i) => (
        <WaveLetter 
          key={i} 
          char={char} 
          progress={progress} 
          index={i} 
          total={chars.length}
          proximity={proximity}
        />
      ))}
    </div>
  );
};

VariableFontWave.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
  interval: PropTypes.number,
  proximity: PropTypes.number,
};
