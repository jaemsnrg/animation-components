'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import PropTypes from 'prop-types';
import './lenis.css';

export const SmoothScroll = ({ children, options = {} }) => {
  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.5, 
      smoothWheel: true,
      ...options 
    }}>
      {children}
    </ReactLenis>
  );
};

SmoothScroll.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object,
};
