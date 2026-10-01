'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import PropTypes from 'prop-types';

// Shared with ImageBoxView / HoverReveal — smooth cinematic ease
const EASE = [0.448, 0.067, 0.119, 0.994];

// Clip-path insets keyed by the edge the reveal sweeps FROM.
// 'up' sweeps from the bottom edge upward, 'down' from the top edge
// downward, etc. The image's box size never changes — only the clip.
const CLIP_HIDDEN = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};
const CLIP_VISIBLE = 'inset(0% 0% 0% 0%)';

export const ImageDirectionalReveal = ({
  src,
  alt,
  width,
  height,
  borderRadius = 0,
  direction = 'up',
  duration = 1,
  delay = 0,
  triggerOnView = true,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const inViewRaw = useInView(containerRef, { once: true, amount: 0.2 });
  const inView = !triggerOnView || inViewRaw;
  const ready = isLoaded && inView;

  useLayoutEffect(() => {
    if (imgRef.current?.complete) setIsLoaded(true);
  }, []);

  const r = `${borderRadius}px`;
  const hiddenClip = CLIP_HIDDEN[direction];

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, display: 'inline-block', ...style }}
    >
      <motion.div
        initial={{ clipPath: hiddenClip }}
        animate={{ clipPath: ready ? CLIP_VISIBLE : hiddenClip }}
        transition={{ duration, ease: EASE, delay }}
        style={{ width: '100%', height: '100%', display: 'grid', overflow: 'hidden' }}
      >
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            gridArea: '1/1',
            width: '100%',
            height: '100%',
            objectFit: height ? 'cover' : undefined,
            display: 'block',
            borderRadius: r,
          }}
        />
      </motion.div>
    </div>
  );
};

ImageDirectionalReveal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  duration: PropTypes.number,
  delay: PropTypes.number,
  triggerOnView: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
