'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function ScrambleText({
  text,
  duration = 200,
  delayPerLetter = 15,
  className = "",
  trigger = 0,
  triggerOnHover = false
}) {
  const [displayText, setDisplayText] = useState(text.split(''));
  const [localTrigger, setLocalTrigger] = useState(0);

  useEffect(() => {
    const letters = text.split('');
    const resolved = new Set();

    // Function to shuffle an array
    const shuffle = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    // Main scramble interval
    const interval = setInterval(() => {
      setDisplayText(prev => {
        const next = [...prev];

        // Find indices that are not yet resolved
        const indicesToScramble = [];
        for (let i = 0; i < letters.length; i++) {
          if (!resolved.has(i)) indicesToScramble.push(i);
        }

        if (indicesToScramble.length === 0) {
          clearInterval(interval);
          return next;
        }

        // Get the pool of characters belonging to these unresolved indices
        const charPool = indicesToScramble.map(idx => letters[idx]);
        // Shuffle the pool
        const shuffledPool = shuffle(charPool);

        // Assign shuffled characters back to the next display string
        indicesToScramble.forEach((targetIdx, poolIdx) => {
          next[targetIdx] = shuffledPool[poolIdx];
        });

        return next;
      });
    }, 40);

    // Individual timers to resolve each letter
    const timeouts = letters.map((_, index) => {
      return setTimeout(() => {
        resolved.add(index);
        setDisplayText(prev => {
          const next = [...prev];
          next[index] = letters[index];
          return next;
        });
      }, duration + (index * delayPerLetter));
    });

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, [text, duration, delayPerLetter, trigger, localTrigger]);

  return (
    <span
      className={className}
      onMouseEnter={() => triggerOnHover && setLocalTrigger(prev => prev + 1)}
    >
      {displayText.join('')}
    </span>
  );
}

ScrambleText.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
  delayPerLetter: PropTypes.number,
  className: PropTypes.string,
  trigger: PropTypes.number,
  triggerOnHover: PropTypes.bool,
};
