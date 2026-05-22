'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PropTypes from 'prop-types';

export const ScrollSectionOverlap = ({ first, second }) => {
  const transitionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ['start end', 'end end'],
  });

  const rawY = useTransform(scrollYProgress, [0.5, 1], [100, 0]);
  const springY = useSpring(rawY, { stiffness: 40, damping: 18, mass: 0.8 });
  const y = useTransform(springY, v => `${v}vh`);

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={transitionRef}
        style={isDesktop ? { height: '100vh' } : undefined}
      >
        <div
          style={
            isDesktop
              ? { position: 'sticky', top: 0, height: '100vh', zIndex: 1 }
              : undefined
          }
        >
          {first}
        </div>
      </div>

      <motion.div
        style={
          isDesktop
            ? { position: 'relative', zIndex: 2, marginTop: '-100vh', y }
            : undefined
        }
      >
        {second}
      </motion.div>
    </div>
  );
};

ScrollSectionOverlap.propTypes = {
  first: PropTypes.node.isRequired,
  second: PropTypes.node.isRequired,
};
