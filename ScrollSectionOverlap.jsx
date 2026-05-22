'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PropTypes from 'prop-types';

export const ScrollSectionOverlap = ({ first, second }) => {
  const transitionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: transitionRef,
    // Start: when the top of this section reaches the bottom of the viewport
    // (i.e. the moment the preceding section's bottom aligns with the screen bottom)
    // End: when the bottom of this section reaches the bottom of the viewport
    offset: ['start end', 'end end'],
  });

  // Section 2 holds until 0.65 progress, then eases in via spring (no extra scroll space needed)
  const rawY = useTransform(scrollYProgress, [0.65, 1], [100, 0]);
  const springY = useSpring(rawY, { stiffness: 40, damping: 18, mass: 0.8 });
  const y = useTransform(springY, v => `${v}vh`);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={transitionRef} style={{ height: '100vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
          {first}
        </div>
      </div>

      {/* Section 2 overlaps the transition space and slides up into it, then scrolls normally */}
      <motion.div style={{ position: 'relative', zIndex: 2, marginTop: '-100vh', y }}>
        {second}
      </motion.div>
    </div>
  );
};

ScrollSectionOverlap.propTypes = {
  first: PropTypes.node.isRequired,
  second: PropTypes.node.isRequired,
};
