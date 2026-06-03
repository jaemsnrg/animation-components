'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  const [isAnimating, setIsAnimating] = useState(true);
  const [inViewport, setInViewport] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const containerRef = useRef(null);

  const isVisible = inViewport && tabVisible;

  const extendedItems = useMemo(() => {
    if (items.length === 0) return [];
    // Append the visibleRows items to the end to enable seamless looping
    return [...items, ...items.slice(0, visibleRows)];
  }, [items, visibleRows]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (items.length <= 1 || !isVisible) return;

    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
      setIsAnimating(true);
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [items.length, interval, isVisible]);

  const handleAnimationComplete = () => {
    if (index >= items.length) {
      setIsAnimating(false);
      setIndex(0);
    }
  };

  return (
    <div
      ref={containerRef}
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
