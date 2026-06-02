'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const SCORES = [
  { label: 'Performance' },
  { label: 'Accessibility' },
  { label: 'Best Practices' },
  { label: 'SEO' },
];

const R = 80;
const CIRC = 2 * Math.PI * R;
const SIZE = 200;
// Counts start after the rings have animated in
const COUNT_START_DELAY = 0.45;

function ScoreRing({ label, isActive, index }) {
  const [count, setCount] = useState(0);
  const progress = useMotionValue(0);
  const strokeDashoffset = useTransform(progress, [0, 100], [CIRC, 0]);
  const entryDelay = index * 0.08;

  useEffect(() => {
    if (!isActive) {
      progress.set(0);
      setCount(0);
      return;
    }
    let animControls;
    const timer = setTimeout(() => {
      animControls = animate(progress, 100, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setCount(Math.round(v)),
      });
    }, (COUNT_START_DELAY + entryDelay) * 1000);
    return () => {
      clearTimeout(timer);
      animControls?.stop();
    };
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={isActive
        ? { duration: 0.6, delay: entryDelay, ease: [0.16, 1, 0.3, 1] }
        : { duration: 0 }
      }
      style={{ position: 'relative', width: SIZE, height: SIZE }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="7"
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="#BA6A63"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          style={{ strokeDashoffset, rotate: -90, transformOrigin: `${SIZE / 2}px ${SIZE / 2}px` }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}
      >
        <span
          style={{
            fontSize: '2.75rem',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--text-primary)',
            letterSpacing: '-0.04em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {count}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: 120,
            lineHeight: 1.3,
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export function PerformanceCounter({ isActive }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2.5rem',
      }}
    >
      {SCORES.map((score, i) => (
        <ScoreRing key={score.label} label={score.label} isActive={isActive} index={i} />
      ))}
    </div>
  );
}
