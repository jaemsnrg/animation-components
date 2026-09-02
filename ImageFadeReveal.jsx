'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const EASE = [0.25, 0.1, 0.25, 1];

// Simple fade-in once an image has loaded.
export function ImageFadeReveal({
  src,
  alt,
  duration = 1.6,
  borderRadius = 12,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    if (sessionStorage.getItem('page-transitioning') === '1') {
      setIsLoaded(true);
      return;
    }
    if (imgRef.current?.complete) setIsLoaded(true);
  }, []);

  if (!src) return null;

  return (
    <div style={{ borderRadius, overflow: 'hidden' }}>
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration, ease: EASE }}
        onLoad={() => setIsLoaded(true)}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}

ImageFadeReveal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  duration: PropTypes.number,
  borderRadius: PropTypes.number,
};
