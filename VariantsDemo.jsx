'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

export const VariantsDemo = () => {
  const [key, setKey] = useState(0); // Used to restart animation

  return (
    <div style={{ padding: '100px', background: '#ffffff', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button 
        onClick={() => setKey(prev => prev + 1)}
        style={{ marginBottom: '40px', padding: '10px 20px', background: '#000000', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Replay Animation
      </button>

      <motion.div
        key={key}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: '20px',
        }}
      >
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.1, backgroundColor: '#333333' }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100px',
              height: '100px',
              background: '#000000',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ color: '#000000', marginTop: '40px', opacity: 0.5, fontSize: '0.9rem' }}
      >
        Staggered entry using parent & child variants
      </motion.div>
    </div>

  );
};
