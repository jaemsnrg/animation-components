'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import './lenis.css';

function LenisLinkStopper() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleMouseDown = (e) => {
      const link = e.target.closest('a');
      if (link) {
        lenis.scrollTo(lenis.scroll, { immediate: true });
      }
    };

    document.addEventListener('mousedown', handleMouseDown, true);
    return () => document.removeEventListener('mousedown', handleMouseDown, true);
  }, [lenis]);

  return null;
}

const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export const SmoothScroll = ({ children, options = {} }) => {
  if (isMobile()) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.75,
      ...options
    }}>
      <LenisLinkStopper />
      {children}
    </ReactLenis>
  );
};

SmoothScroll.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object,
};
