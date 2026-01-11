'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export const SharedLayout = () => {
  const [selectedId, setSelectedId] = useState(null);
  const items = [
    { id: '1', title: 'Creative', color: '#000000' },
    { id: '2', title: 'Animations', color: '#222222' },
    { id: '3', title: 'Interactive', color: '#444444' },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '100px', background: '#ffffff', minHeight: '400px', alignItems: 'center', justifyContent: 'center' }}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          layoutId={item.id}
          onClick={() => setSelectedId(item.id)}
          style={{
            width: '150px',
            height: '150px',
            background: item.color,
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        >
          {item.title}
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <motion.div
              layoutId={selectedId}
              style={{
                width: '400px',
                height: '400px',
                background: items.find(i => i.id === selectedId).color,
                borderRadius: '40px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <motion.h2 style={{ color: '#ffffff', fontSize: '3rem' }}>
                {items.find(i => i.id === selectedId).title}
              </motion.h2>
              <motion.p style={{ color: '#ffffff', marginTop: '20px', opacity: 0.8 }}>
                This component demonstrates Shared Layout transitions using layoutId.
                The card smoothly transitions from its list position to this modal view.
              </motion.p>
              <motion.button
                onClick={() => setSelectedId(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '2rem',
                  cursor: 'pointer',
                }}
              >
                ×
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
