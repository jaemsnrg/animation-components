
import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export const KineticText = ({ text, speed = 1, baseVelocity = 100 }) => {

  const ScrollText = [<span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>]
  return (
    <div className="kinetic-text-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
      <motion.div 
        className="kinetic-text-scroller"
        style={{ display: 'flex', gap: '2rem' }}
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 20 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

KineticText.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
};
