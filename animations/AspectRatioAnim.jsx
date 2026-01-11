'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AspectRatioAnim = () => {
  const [aspect, setAspect] = useState(16 / 9);

  const ratios = [
    { label: '16:9', value: 16 / 9 },
    { label: '4:3', value: 4 / 3 },
    { label: '1:1', value: 1 / 1 },
    { label: '9:16', value: 9 / 16 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', padding: '100px', background: '#ffffff', minHeight: '600px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        {ratios.map((r) => (
          <button
            key={r.label}
            onClick={() => setAspect(r.value)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: aspect === r.value ? '#000000' : '#f1f5f9',
              color: aspect === r.value ? '#ffffff' : '#000000',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: '500px',
          maxWidth: '90vw',
          background: '#000000',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: aspect,
        }}
      >
        <motion.span 
          layout
          style={{ color: '#ffffff', fontWeight: 900, fontSize: '2rem' }}
        >
          LAYOUT TRANSITION
        </motion.span>
      </motion.div>

    </div>
  );
};
