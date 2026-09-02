'use client';

import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useInView } from 'framer-motion';
import { useLenis } from 'lenis/react';
import PropTypes from 'prop-types';

// https://easingwizard.com/
// Smooth cinematic ease — slow start, long gentle deceleration
const EASE = [0.448, 0.067, 0.119, 0.994];

// Extra image height factor to allow parallax movement without blank edges
const PARALLAX_OVERFLOW = 1.3;

// Clip-path insets keyed by the edge the reveal sweeps FROM — same scheme as
// ImageDirectionalReveal. 'up' sweeps from the bottom edge upward, etc.
const CLIP_HIDDEN = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};
const CLIP_VISIBLE = 'inset(0% 0% 0% 0%)';

function useLenisScrollProgress(ref) {
  const progress = useMotionValue(0);

  const update = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = 1 - rect.bottom / (vh + rect.height);
    progress.set(Math.max(0, Math.min(1, p)));
  }, [ref, progress]);

  // Lenis-driven (desktop)
  useLenis(update);

  // Native scroll fallback (mobile/Safari where Lenis is disabled)
  useEffect(() => {
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [update]);

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
  // When set on the fixed-height (box) mode: reveals via a directional clipPath
  // sweep instead of the height-grow + scale-zoom effect. The box height never
  // changes. One of 'up' | 'down' | 'left' | 'right'.
  revealDirection,
}) => {
  const resolvedInitialHeight = initialHeight ?? height * 0.5;
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const [effectiveParallax, setEffectiveParallax] = useState(parallaxAmount);
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setEffectiveParallax(parallaxAmount * 0.3);
    }
  }, [parallaxAmount]);
  const inViewRaw = useInView(boxRef, { once: true, amount: 0 });
  const inView = disableReveal || inViewRaw;
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    if (sessionStorage.getItem('page-transitioning') === '1') {
      setIsLoaded(true);
      return;
    }
    if (imgRef.current?.complete) setIsLoaded(true);
  }, []);

  const scrollProgress = useLenisScrollProgress(containerRef);
  const imageY = useTransform(scrollProgress, [0, 1], [-effectiveParallax, effectiveParallax]);

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
          style={{ width, display: 'grid', overflow: 'hidden' }}
        >
          {/* Blur placeholder — in normal flow so it holds the container height */}
          {blurSrc && (
            <motion.img
              src={blurSrc}
              aria-hidden
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoaded ? 0 : 1 }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                gridArea: '1/1',
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'blur(40px)',
                transform: 'scale(1.15)',
                imageRendering: 'pixelated',
              }}
            />
          )}
          {/* Real image */}
          <motion.img
            ref={imgRef}
            src={src}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            onLoad={() => setIsLoaded(true)}
            style={{
              gridArea: '1/1',
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

  // ── Fixed-height mode, directional clip reveal ────────────────────────────
  // Box height is constant throughout — only a clipPath sweep reveals the image.
  // Gated on both scroll visibility AND the image being loaded, so the clip
  // never opens onto a still-loading image (which would otherwise race an
  // independent opacity fade — there isn't one here, the clip is the only reveal).
  if (revealDirection) {
    const ready = inView && isLoaded;
    return (
      <div ref={containerRef} style={{ width }}>
        <div ref={boxRef} style={{ width, height, overflow: 'hidden', borderRadius, display: 'grid' }}>
          <motion.div
            initial={{ clipPath: CLIP_HIDDEN[revealDirection] }}
            animate={{ clipPath: ready ? CLIP_VISIBLE : CLIP_HIDDEN[revealDirection] }}
            transition={{ duration, ease: EASE, delay }}
            style={{ gridArea: '1/1', width: '100%', height: '100%', overflow: 'hidden' }}
          >
            <motion.img
              ref={imgRef}
              src={src}
              alt={alt}
              onLoad={() => setIsLoaded(true)}
              style={{
                width: '100%',
                height: height * PARALLAX_OVERFLOW,
                objectFit: 'cover',
                display: 'block',
                y: imageY,
                marginTop: -(height * (PARALLAX_OVERFLOW - 1)) / 2,
              }}
            />
          </motion.div>
        </div>
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
          display: 'grid',
        }}
      >
        {blurSrc && (
          <motion.img
            src={blurSrc}
            aria-hidden
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              gridArea: '1/1',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(40px)',
              transform: 'scale(1.15)',
              imageRendering: 'pixelated',
            }}
          />
        )}
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ scale: inView ? 1 : initialScale, opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: duration * 1.25, ease: EASE, delay, opacity: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1], delay: 0 } }}
          onLoad={() => setIsLoaded(true)}
          style={{
            gridArea: '1/1',
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
  disableReveal: PropTypes.bool,
  revealDirection: PropTypes.oneOf(['up', 'down', 'left', 'right']),
};
