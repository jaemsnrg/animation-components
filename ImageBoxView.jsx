'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import PropTypes from 'prop-types';

// https://easingwizard.com/
// Smooth cinematic ease — slow start, long gentle deceleration
const EASE = [0.448, 0.067, 0.119, 0.994];

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
  duration = 2,
  delay = 0.3,
  // When true: uses clipPath reveal so image shows at natural size — no cropping
  naturalSize = false,
}) => {
  const resolvedInitialHeight = initialHeight ?? height * 0.5;
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const inView = useInView(boxRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-parallaxAmount / 2, parallaxAmount / 2]);

  // ── Natural-size mode: clipPath reveal + parallax ─────────────────────────
  if (naturalSize) {
    const r = `${borderRadius}px`;
    // The image rests at a slight scale so overflow:hidden has room to clip
    // parallax movement without showing blank edges
    const restingScale = 1 + (parallaxAmount / 2) / 500;
    return (
      <div ref={containerRef} style={{ width, overflow: 'hidden', borderRadius: r }}>
        <motion.div
          ref={boxRef}
          animate={{
            clipPath: inView
              ? `inset(0% 0% 0% 0% round ${r})`
              : `inset(55% 0% 0% 0% round ${r})`,
            y: inView ? 0 : 28,
          }}
          transition={{ duration, ease: EASE, delay }}
          style={{ width }}
        >
          <motion.img
            src={src}
            alt={alt}
            animate={{ scale: inView ? restingScale : initialScale }}
            transition={{ duration: duration * 1.25, ease: EASE, delay }}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transformOrigin: 'center center',
              y: imageY,
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
        transition={{ duration, ease: EASE, delay }}
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
          transition={{ duration: duration * 1.25, ease: EASE, delay }}
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
  duration: PropTypes.number,
  delay: PropTypes.number,
  naturalSize: PropTypes.bool,
};
