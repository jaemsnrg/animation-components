'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import PropTypes from 'prop-types';

// https://easingwizard.com/
// Smooth cinematic ease — slow start, long gentle deceleration
const EASE = [0.448, 0.067, 0.119, 0.994];
// anticipate [0.8, -0.4, 0.5, 1]; 6
// quant [0.44, 0, 0.56, 1]; 7
// custom (like a quant) [0.448, 0.067, 0.119, 0.994]; 9


// Extra image height factor to allow parallax movement without blank edges
const PARALLAX_OVERFLOW = 1.3;

export const ImageBoxView = ({
  src,
  alt,
  width = 400,
  height = 720,
  initialHeight,
  initialScale = 1.3,
  borderRadius = 0,
  parallaxAmount = 80,
  // When true: uses clipPath reveal so image shows at natural size — no cropping
  naturalSize = false,
}) => {
  const resolvedInitialHeight = initialHeight ?? height * 0.5;
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const inView = useInView(boxRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-parallaxAmount / 2, parallaxAmount / 2]);

  // ── Natural-size mode: clipPath reveal, image at full natural height ───────
  if (naturalSize) {
    const r = `${borderRadius}px`;
    return (
      <div ref={containerRef} style={{ width }}>
        <motion.div
          ref={boxRef}
          animate={{
            clipPath: inView
              ? `inset(0% 0% 0% 0% round ${r})`
              : `inset(50% 0% 0% 0% round ${r})`,
            y: inView ? 0 : 24,
          }}
          transition={{ duration: 2, ease: EASE, delay: 0.3 }}
          style={{ width }}
        >
          <motion.img
            src={src}
            alt={alt}
            animate={{ scale: inView ? 1 : initialScale }}
            transition={{ duration: 2.5, ease: EASE, delay: 0.3 }}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transformOrigin: 'center center',
              borderRadius,
            }}
          />
        </motion.div>
      </div>
    );
  }

  // ── Fixed-height mode (original behaviour) ────────────────────────────────
  return (
    <div ref={containerRef} style={{ width }}>
      <motion.div
        ref={boxRef}
        animate={{ height: inView ? height : resolvedInitialHeight, y: inView ? 0 : height * 0.15 }}
        transition={{ duration: 2, ease: EASE, delay: 0.3 }}
        style={{
          width,
          overflow: 'hidden',
          borderRadius,
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          animate={{ scale: inView ? 1 : initialScale }}
          transition={{ duration: 2.5, ease: EASE, delay: 0.3 }}
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.number,
  initialHeight: PropTypes.number,
  initialScale: PropTypes.number,
  borderRadius: PropTypes.number,
  parallaxAmount: PropTypes.number,
  naturalSize: PropTypes.bool,
};
