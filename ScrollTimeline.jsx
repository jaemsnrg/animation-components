'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';

export const ScrollTimeline = ({ title = "Scroll Experience" }) => {
  const containerRef = useRef(null);
  
  // Track scroll progress within the container
  // offset: ["start end", "end end"] means progress starts when container top hits bottom of viewport
  // and ends when container bottom hits bottom of viewport. 
  // For "pinning" style, we usually want it relative to the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Box 1 Transformations (roughly 0-40% scroll)
  const box1X = useTransform(scrollYProgress, [0, 0.4], [0, 300]);
  const box1Rotation = useTransform(scrollYProgress, [0, 0.4], [0, 360]);
  const box1Radius = useTransform(scrollYProgress, [0, 0.4], ["8px", "50%"]);
  const box1Color = useTransform(scrollYProgress, [0, 0.4], ["#000000", "#333333"]);
  const box1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.5]);

  // Box 2 Transformations (roughly 30-70% scroll)
  const box2X = useTransform(scrollYProgress, [0.3, 0.7], [0, -200]);
  const box2Y = useTransform(scrollYProgress, [0.3, 0.7], [0, -200]);
  const box2Rotation = useTransform(scrollYProgress, [0.3, 0.7], [0, -180]);
  const box2Color = useTransform(scrollYProgress, [0.3, 0.7], ["#000000", "#666666"]);
  const box2Scale = useTransform(scrollYProgress, [0.3, 0.7], [1, 0.5]);

  // Text Transformations (roughly 60-90% scroll)
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.8], [20, -50]);
  const textLetterSpacing = useTransform(scrollYProgress, [0.6, 0.9], ["0em", "0.5em"]);

  // Background transformation
  const bgColor = useTransform(scrollYProgress, [0.8, 1], ["rgba(255, 255, 255, 0)", "#f8fafc"]);

  return (
    <div 
      ref={containerRef} 
      className="scroll-timeline-wrapper" 
      style={{ height: '300vh', position: 'relative', background: '#ffffff' }} // 300vh provides the "scroll room"
    >
      {/* Sticky container provides the "pinned" look */}
      <motion.div 
        style={{ 
          height: '100vh', 
          width: '100%', 
          position: 'sticky', 
          top: 0, 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: bgColor
        }}
      >
        <motion.h2 
          style={{ 
            fontSize: '4rem', 
            fontWeight: 900, 
            color: 'black', 
            position: 'absolute', 
            top: '20%',
            opacity: textOpacity,
            y: textY,
            letterSpacing: textLetterSpacing
          }}
        >
          {title}
        </motion.h2>

        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            style={{ 
              width: '100px', 
              height: '100px', 
              backgroundColor: box1Color, 
              borderRadius: box1Radius,
              x: box1X,
              rotate: box1Rotation,
              scale: box1Scale
            }} 
          />
          <motion.div 
            style={{ 
              width: '100px', 
              height: '100px', 
              backgroundColor: box2Color, 
              borderRadius: '8px',
              x: box2X,
              y: box2Y,
              rotate: box2Rotation,
              scale: box2Scale
            }} 
          />
        </div>

        {/* Scroll Progress Indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', width: '200px', height: '4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '2px' }}>
          <motion.div 
            style={{ 
              height: '100%', 
              backgroundColor: '#000000', 
              scaleX: scrollYProgress, 
              transformOrigin: 'left' 
            }} 
          />
        </div>
      </motion.div>
    </div>

  );
};

ScrollTimeline.propTypes = {
  title: PropTypes.string,
};
