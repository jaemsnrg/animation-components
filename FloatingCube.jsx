
import React from 'react';
import { motion } from 'framer-motion';
import './floating-cube.css';

export const FloatingCube = () => {
  return (
    <div className="scene">
      <motion.div 
        className="cube"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="cube__face cube__face--front">front</div>
        <div className="cube__face cube__face--back">back</div>
        <div className="cube__face cube__face--right">right</div>
        <div className="cube__face cube__face--left">left</div>
        <div className="cube__face cube__face--top">top</div>
        <div className="cube__face cube__face--bottom">bottom</div>
      </motion.div>
    </div>
  );
};
