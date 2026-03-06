'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ScrambleText({
  text,
  duration = 200,
  delayPerLetter = 15,
  className = "",
  trigger = 0,
  triggerOnHover = false
}) {
  const words = text.split(' ');
  const [displayWords, setDisplayWords] = useState(words.map(w => w.split('')));
  const [localTrigger, setLocalTrigger] = useState(0);

  useEffect(() => {
    const wordArrays = words.map(w => w.split(''));
    const resolved = wordArrays.map(() => new Set());

    const shuffle = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const interval = setInterval(() => {
      setDisplayWords(prev =>
        prev.map((wordChars, wi) => {
          const letters = wordArrays[wi];
          const unresolved = letters.reduce((acc, _, i) => {
            if (!resolved[wi].has(i)) acc.push(i);
            return acc;
          }, []);
          if (unresolved.length === 0) return wordChars;
          const shuffled = shuffle(unresolved.map(i => letters[i]));
          const next = [...wordChars];
          unresolved.forEach((idx, i) => { next[idx] = shuffled[i]; });
          return next;
        })
      );
    }, 90);

    const timeouts = [];
    let offset = 0;
    wordArrays.forEach((letters, wi) => {
      letters.forEach((_, li) => {
        timeouts.push(setTimeout(() => {
          resolved[wi].add(li);
          setDisplayWords(prev => {
            const next = prev.map(w => [...w]);
            next[wi][li] = wordArrays[wi][li];
            return next;
          });
        }, duration + offset * delayPerLetter));
        offset++;
      });
    });

    const totalLetters = wordArrays.reduce((sum, w) => sum + w.length, 0);
    const done = setTimeout(() => clearInterval(interval), duration + totalLetters * delayPerLetter + 100);

    return () => {
      clearInterval(interval);
      clearTimeout(done);
      timeouts.forEach(clearTimeout);
    };
  }, [text, duration, delayPerLetter, trigger, localTrigger]);

  return (
    <span
      className={className}
      onMouseEnter={() => triggerOnHover && setLocalTrigger(prev => prev + 1)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <span style={{ visibility: 'hidden' }}>
        {words.map((word, i) => (
          <span key={i}>{word}{i < words.length - 1 ? ' ' : ''}</span>
        ))}
      </span>
      <span style={{ position: 'absolute', inset: 0 }}>
        {displayWords.map((wordChars, i) => (
          <span key={i}>{wordChars.join('')}{i < displayWords.length - 1 ? ' ' : ''}</span>
        ))}
      </span>
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
