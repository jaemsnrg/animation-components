'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { Suspense, useEffect, useLayoutEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'
import PropTypes from 'prop-types';
import './lenis.css';

function ScrollResetInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Hide before paint on hash routes so the user never sees the wrong position.
  useLayoutEffect(() => {
    if (window.location.hash && window.location.hash.length > 1) {
      document.documentElement.style.visibility = 'hidden';
    }
    return () => {
      document.documentElement.style.visibility = '';
    };
  }, [pathname]);

  useEffect(() => {
    const reveal = () => {
      document.documentElement.style.visibility = '';
    };

    const safetyTimeout = setTimeout(reveal, 1000);

    if (!lenis) return () => clearTimeout(safetyTimeout);

    let cancelled = false;

    const performScroll = (targetHash, isSmooth = false) => {
      if (!targetHash || targetHash.length <= 1) {
        lenis.scrollTo(0, { immediate: true, force: true });
        reveal();
        return;
      }

      const id = targetHash.replace('#', '');
      let attempts = 0;

      const tryScroll = () => {
        if (cancelled) return;
        const element = document.getElementById(id);

        if (element) {
          const rect = element.getBoundingClientRect();
          lenis.scrollTo(rect.top + window.scrollY, {
            offset: -100,
            immediate: !isSmooth,
            force: true
          });

          if (attempts < 3) {
            attempts++;
            setTimeout(() => requestAnimationFrame(tryScroll), 150);
          } else {
            reveal();
          }
        } else if (attempts < 10) {
          attempts++;
          setTimeout(() => requestAnimationFrame(tryScroll), 50);
        } else {
          reveal();
        }
      };

      requestAnimationFrame(tryScroll);
    };

    performScroll(window.location.hash, false);

    const handleHashChange = () => performScroll(window.location.hash, true);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      cancelled = true;
      clearTimeout(safetyTimeout);
      window.removeEventListener('hashchange', handleHashChange);
    };
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
