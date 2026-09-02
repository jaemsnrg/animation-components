'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import './lenis.css';

function LenisLinkStopper() {
  const lenis = useLenis();

  useEffect(() => {
    // On mobile/Safari the gate below destroys `lenis`, but this closure keeps
    // referencing the dead instance — guard the same way rather than calling
    // scrollTo() on a destroyed Lenis.
    if (!lenis || isMobile() || isSafari()) return;

    const handleMouseDown = (e) => {
      const link = e.target.closest('a');
      if (link) {
        lenis.scrollTo(lenis.scroll, { immediate: true });
      }
    };

    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.hash) {
          e.preventDefault();
          e.stopPropagation();
          const target = document.querySelector(url.hash);
          if (target) {
            const paddingTop = parseInt(window.getComputedStyle(target).paddingTop, 10) || 0;
            lenis.scrollTo(target, {
              duration: 0.8,
              offset: paddingTop / 2,
              easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
            });
          }
        }
      } catch { /* noop */ }
    };

    document.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [lenis]);

  return null;
}

const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const isSafari = () =>
  typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Tears down the already-mounted Lenis instance on mobile/Safari instead of
// conditionally rendering <ReactLenis>, which would swap the tree's root
// element type and force a remount (and re-play) of every child animation on
// load. Uses destroy() rather than stop(): stop() adds the `lenis-stopped`
// class, which lenis.css maps to `overflow: hidden` on <html> — that's meant
// for modal-style scroll locking, not "fall back to native scroll", and it
// froze the page entirely on mobile. destroy() removes Lenis's listeners and
// classes so native scrolling just takes over.
function LenisAvailabilityGate() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (isMobile() || isSafari()) {
      lenis.destroy();
    }
  }, [lenis]);

  return null;
}

export const SmoothScroll = ({ children, options = {} }) => {
  // syncTouch hijacks touchmove (preventDefault) to drive scroll via JS transforms;
  // keep it off for mobile/Safari, which LenisAvailabilityGate tears down anyway,
  // to avoid a hijacked-then-abandoned touchmove listener during the gap before
  // that effect runs.
  const disableLenis = isMobile() || isSafari();

  return (
    <ReactLenis root options={{
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
      syncTouch: !disableLenis,
      touchMultiplier: 1.75,
      ...options
    }}>
      <LenisAvailabilityGate />
      <LenisLinkStopper />
      {children}
    </ReactLenis>
  );
};

SmoothScroll.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object,
};
