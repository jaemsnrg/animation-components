'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

/**
 * VerticalScrollList
 * A vertically scrolling list that steps through items infinitely.
 * 
 * @param {Array} items - Array of JSX components to display
 * @param {number} visibleRows - Number of rows to show at once
 * @param {number} interval - Time in seconds between transitions
 * @param {string} className - Optional container class
 * @param {number} itemHeight - Height of each item in pixels (default 40)
 */
export const VerticalScrollList = ({ 
  items = [], 
  visibleRows = 3, 
  interval = 2,
  className,
  itemHeight = 50 
}) => {
  const [index, setIndex] = useState(0);

  // For infinite scroll, we duplicate the items to create a seamless loop
  // We need at least enough items to fill the view plus one for the transition
  const [isAnimating, setIsAnimating] = useState(true);

  const extendedItems = useMemo(() => {
    if (items.length === 0) return [];
    // Append the visibleRows items to the end to enable seamless looping
    return [...items, ...items.slice(0, visibleRows)];
  }, [items, visibleRows]);

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
      setIsAnimating(true);
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  const handleAnimationComplete = () => {
    if (index >= items.length) {
      setIsAnimating(false);
      setIndex(0);
    }
  };

  return (
    <div 
      className={cn("relative overflow-hidden flex flex-col items-center", className)}
      style={{ 
        height: visibleRows * itemHeight,
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <motion.div
        animate={{ 
          y: -(index * itemHeight) 
        }}
        transition={isAnimating ? { 
          duration: 0.8, 
          ease: [0.32, 0.72, 0, 1] 
        } : { duration: 0 }}
        onAnimationComplete={handleAnimationComplete}
        className="flex flex-col w-full"
      >
        {extendedItems.map((item, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center w-full"
            style={{ height: itemHeight }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

VerticalScrollList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  visibleRows: PropTypes.number,
  interval: PropTypes.number,
  className: PropTypes.string,
  itemHeight: PropTypes.number,
};
