'use client';

import React, { useState } from 'react';
import { Reorder, motion } from 'framer-motion';

export const ReorderDemo = () => {
  const [items, setItems] = useState(['🎨 Design', '🚀 Launch', '⚙️ Develop', '✨ Polish']);

  return (
    <div style={{ padding: '100px', background: '#ffffff', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: '#000000', marginBottom: '40px', fontSize: '2rem' }}>Reorderable List</h2>
      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={setItems}
        style={{ listStyle: 'none', padding: 0, width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        {items.map((item) => (
          <Reorder.Item 
            key={item} 
            value={item}
            whileDrag={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
            style={{
              padding: '20px',
              background: '#ffffff',
              color: '#000000',
              borderRadius: '12px',
              cursor: 'grab',
              fontSize: '1.25rem',
              fontWeight: '500',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>{item}</span>
            <div style={{ opacity: 0.3 }}>☰</div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>

  );
};
