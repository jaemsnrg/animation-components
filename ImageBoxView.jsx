'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useInView } from 'framer-motion';
import { useLenis } from 'lenis/react';
import PropTypes from 'prop-types';

// https://easingwizard.com/
// Smooth cinematic ease — slow start, long gentle deceleration
const EASE = [0.448, 0.067, 0.119, 0.994];

// Extra image height factor to allow parallax movement without blank edges
const PARALLAX_OVERFLOW = 1.3;

function useLenisScrollProgress(ref) {
  const progress = useMotionValue(0);
  useLenis(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = 1 - rect.bottom / (vh + rect.height);
    progress.set(Math.max(0, Math.min(1, p)));
  });
  return progress;
}

export const ImageBoxView = ({
  src,
  alt,
  blurSrc,
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
  disableReveal = false,
}) => {
  const resolvedInitialHeight = initialHeight ?? height * 0.5;
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const inViewRaw = useInView(boxRef, { once: true, amount: 0 });
  const inView = disableReveal || inViewRaw;
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollProgress = useLenisScrollProgress(containerRef);
  const imageY = useTransform(scrollProgress, [0, 1], [-parallaxAmount, parallaxAmount]);

  const blurOverlay = blurSrc ? (
    <motion.img
      src={blurSrc}
      aria-hidden
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'blur(24px)',
        transform: 'scale(1.12)',
        pointerEvents: 'none',
      }}
    />
  ) : null;

  // ── Natural-size mode: clipPath reveal + parallax ─────────────────────────
  if (naturalSize) {
    const r = `${borderRadius}px`;
    return (
      <div ref={containerRef} style={{ width }}>
        <motion.div
          ref={boxRef}
          animate={{
            clipPath: inView
              ? `inset(0% 0% 0% 0% round ${r})`
              : `inset(55% 0% 0% 0% round ${r})`,
            y: inView ? 0 : 28,
          }}
          transition={{ duration, ease: EASE, delay }}
          style={{ width, position: 'relative', overflow: 'hidden', borderRadius: r }}
        >
          {blurOverlay}
          <motion.img
            src={src}
            alt={alt}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onLoad={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: r,
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
          position: 'relative',
        }}
      >
        {blurOverlay}
        <motion.img
          src={src}
          alt={alt}
          animate={{ scale: inView ? 1 : initialScale, opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: duration * 1.25, ease: EASE, delay, opacity: { duration: 0.7, ease: 'easeOut', delay: 0 } }}
          onLoad={() => setIsLoaded(true)}
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
  blurSrc: PropTypes.string,
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
