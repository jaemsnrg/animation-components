
import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export const TickerTape = ({ text, speed = 1, baseVelocity = 100 }) => {
  return (
    <div className="ticker-tape-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
      <motion.div 
        className="ticker-tape-scroller"
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
        <span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>
        <span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>
        <span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>
        <span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>
        <span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>
        <span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>
        <span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>
        <span style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase' }}>{text}</span>
      </motion.div>
    </div>
  );
};

TickerTape.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
};

