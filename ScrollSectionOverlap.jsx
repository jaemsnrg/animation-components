'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ScrollSectionOverlap = ({ first, second }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div style={isDesktop ? { position: 'sticky', top: 0, zIndex: 1 } : undefined}>
        {first}
      </div>
      <div style={isDesktop ? { position: 'relative', zIndex: 2 } : undefined}>
        {second}
      </div>
    </div>
  );
};

ScrollSectionOverlap.propTypes = {
  first: PropTypes.node.isRequired,
  second: PropTypes.node.isRequired,
};
