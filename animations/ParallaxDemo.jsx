'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxDemo = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={containerRef} style={{ height: '200vh', background: '#ffffff', padding: '50vh 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '100px', position: 'relative' }}>
      <div style={{ position: 'sticky', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
        <h2 style={{ color: '#000000', fontSize: '3rem', opacity: 0.1 }}>Parallax Experience</h2>
      </div>

      <div style={{ display: 'flex', gap: '40px', zIndex: 2 }}>
        <motion.div
          style={{
            y: y1,
            rotate,
            width: '200px',
            height: '300px',
            background: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400) center/cover',
            filter: 'grayscale(100%) brightness(0.8)',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)',
          }}
        />
        <motion.div
          style={{
            y: y2,
            opacity,
            width: '250px',
            height: '350px',
            background: 'url(https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400) center/cover',
            filter: 'grayscale(100%)',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)',
          }}
        />
      </div>

      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: '#000000',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: 0.2,
          y: y2,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: '#000000',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.1,
          y: y1,
        }}
      />

    </div>
  );
};
