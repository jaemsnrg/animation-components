'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const PathAnimations = () => {
  const [isCircle, setIsCircle] = useState(true);

  // Path data for a circle and a star-ish shape
  const circlePath = "M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0";
  const squarePath = "M 10,10 L 90,10 L 90,90 L 10,90 Z";

  return (
    <div style={{ padding: '100px', background: '#ffffff', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {/* Path Morphing */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#000000', marginBottom: '20px' }}>Path Morphing</h3>
          <svg width="200" height="200" viewBox="0 0 100 100" style={{ cursor: 'pointer' }} onClick={() => setIsCircle(!isCircle)}>
            <motion.path
              d={isCircle ? circlePath : squarePath}
              fill="none"
              stroke="#000000"
              strokeWidth="4"
              animate={{ d: isCircle ? circlePath : squarePath }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
          <p style={{ color: '#000000', fontSize: '0.8rem', marginTop: '10px', opacity: 0.5 }}>Click the shape to morph</p>
        </div>

        {/* Motion along a path */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#000000', marginBottom: '20px' }}>Motion Along Path</h3>
          <svg width="200" height="200" viewBox="0 0 100 100">
            {/* The Path */}
            <path
              id="motionPath"
              d="M 10,50 Q 50,-20 90,50 T 10,50"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="2"
            />
            {/* The Drawing Animation */}
            <motion.path
              d="M 10,50 Q 50,-20 90,50 T 10,50"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* The Moving Object */}
            <motion.circle
              r="4"
              fill="#000000"
              animate={{
                offsetDistance: ["0%", "100%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                offsetPath: "path('M 10,50 Q 50,-20 90,50 T 10,50')",
              }}
            />
          </svg>
        </div>
      </div>
    </div>

  );
};
