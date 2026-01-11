'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import PropTypes from 'prop-types';

export const Counter = ({ from = 0, to = 100, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: duration });
    return controls.stop;
  }, [count, to, duration]);

  return (
    <motion.div style={{ fontSize: '5rem', fontWeight: 800, color: '#000000', fontVariantNumeric: 'tabular-nums' }}>
      {rounded}
    </motion.div>
  );
};

Counter.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  duration: PropTypes.number,
};
