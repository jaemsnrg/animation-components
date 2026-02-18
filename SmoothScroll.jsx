'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'
import PropTypes from 'prop-types';
import './lenis.css';

function ScrollResetInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  // Force manual scroll restoration to prevent browser/Next.js interference
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!lenis) return;

    const performScroll = (targetHash, isSmooth = false) => {
      if (!targetHash || targetHash.length <= 1) {
        lenis.scrollTo(0, { immediate: !isSmooth, force: true });
        return;
      }

      const id = targetHash.replace('#', '');
      let attempts = 0;
      let lastTop = -1;
      
      const tryScroll = () => {
        const element = document.getElementById(id);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const currentTop = rect.top + window.scrollY;
          
          if (Math.abs(currentTop - lastTop) > 2) {
            lenis.scrollTo(currentTop, { 
              offset: -100,
              immediate: !isSmooth || attempts > 0, 
              force: true 
            });
            lastTop = currentTop;
          }

          if (attempts < 20) {
            attempts++;
            setTimeout(() => requestAnimationFrame(tryScroll), 100);
          }
        } else if (attempts < 50) {
          attempts++;
          setTimeout(() => requestAnimationFrame(tryScroll), 100);
        }
      };

      requestAnimationFrame(tryScroll);
    };

    // Initial check on route change (Snap)
    performScroll(window.location.hash, false);

    // Listen for manual hash changes (Smooth)
    const handleHashChange = () => performScroll(window.location.hash, true);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pathname, searchParams, lenis]);

  return null;
}

function ScrollReset() {
  return (
    <Suspense fallback={null}>
      <ScrollResetInner />
    </Suspense>
  );
}

export const SmoothScroll = ({ children, options = {} }) => {
  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.5, 
      smoothWheel: true,
      syncTouch: true,
      ...options 
    }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
};

SmoothScroll.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.object,
};
