'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';

// Expo-out easing for a dynamic, smooth reveal feel
const EASE = [0.16, 1, 0.3, 1];

// Extra image height factor to allow parallax movement without blank edges
const PARALLAX_OVERFLOW = 1.3;

export const ImageBoxView = ({
  src,
  alt,
  width = 400,
  height = 640,
  initialScale = 1.3,
  borderRadius = 20,
  parallaxAmount = 80,
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-parallaxAmount / 2, parallaxAmount / 2]);

  return (
    <div ref={containerRef} style={{ width }}>
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
            height: height * PARALLAX_OVERFLOW,
            objectFit: 'cover',
            transformOrigin: 'center center',
            display: 'block',
            y: imageY,
            marginTop: -(height * (PARALLAX_OVERFLOW - 1)) / 2,
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
  parallaxAmount: PropTypes.number,
};
