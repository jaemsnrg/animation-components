import React from 'react';
import { motion } from 'framer-motion';

export const SVGDrawing = () => {
  return (
    <div style={{ padding: '40px' }}>
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#000000"
          strokeWidth="4"
          fill="transparent"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { duration: 2, bounce: 0 },
                opacity: { duration: 0.1 }
              }
            }
          }}
        />
        <motion.path
          d="M60 100 L90 130 L140 70"
          stroke="#000000"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                delay: 1.5,
                pathLength: { duration: 0.8, bounce: 0 },
                opacity: { duration: 0.1 }
              }
            }
          }}
        />
      </motion.svg>
    </div>
  );
};
