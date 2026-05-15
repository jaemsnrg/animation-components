'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Expo-out easing for a dynamic, smooth reveal feel
const EASE = [0.16, 1, 0.3, 1];

export const ImageBoxView = ({
  src,
  alt,
  width = 400,
  height = 520,
  initialScale = 1.3,
  borderRadius = 20,
}) => {
  return (
    <div style={{ width }}>
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: EASE }}
        style={{
          width,
          overflow: 'hidden',
          borderRadius,
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: initialScale }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: EASE }}
          style={{
            width: '100%',
            height,
            objectFit: 'cover',
            transformOrigin: 'center center',
            display: 'block',
          }}
        />
      </motion.div>
    </div>
  );
};

ImageBoxView.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  initialScale: PropTypes.number,
  borderRadius: PropTypes.number,
};
