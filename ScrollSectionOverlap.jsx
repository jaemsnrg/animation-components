'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Section 2 holds position until 0.3 progress, then slides up into place
  const y = useTransform(scrollYProgress, [0.3, 1], ['100vh', '0vh']);

  return (
    <div style={{ position: 'relative' }}>
      {/* 100vh wrapper — transition spans exactly one viewport height of scroll */}
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
