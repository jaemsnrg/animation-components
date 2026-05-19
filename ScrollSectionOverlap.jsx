'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';

export const ScrollSectionOverlap = ({ first, second }) => {
  const transitionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ['start start', 'end end'],
  });

  // Section 2 slides from fully below the viewport to its final position
  const y = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh']);

  return (
    <div style={{ position: 'relative' }}>
      {/* 200vh wrapper: 100vh to view section 1, 100vh of scroll room for the slide-up */}
      <div ref={transitionRef} style={{ height: '165vh' }}>
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
