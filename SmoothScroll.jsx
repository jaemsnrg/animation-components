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

  // Force manual scroll restoration to prevent browser/Next.js interference
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Hide the page before paint when navigating to a hash route.
  // This prevents any flash of the wrong scroll position during positioning.
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

    // Safety: ensure the page is always revealed even if lenis fails to initialise
    const safetyTimeout = setTimeout(reveal, 1000);

    if (!lenis) return () => clearTimeout(safetyTimeout);

    // Cancellation flag to prevent stale retries firing after navigation
    let cancelled = false;

    const performScroll = (targetHash, isSmooth = false) => {
      if (!targetHash || targetHash.length <= 1) {
        lenis.scrollTo(0, { immediate: !isSmooth, force: true });
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
          const targetTop = rect.top + window.scrollY;

          lenis.scrollTo(targetTop, {
            offset: -100,
            immediate: !isSmooth,
            force: true
          });

          // Retry to account for layout shifts. The page stays hidden during retries
          // so the user never sees the intermediate positions — only the final one.
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

    // Initial check on route change (Snap)
    performScroll(window.location.hash, false);

    // Listen for manual hash changes (Smooth)
    const handleHashChange = () => performScroll(window.location.hash, true);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      cancelled = true;
      clearTimeout(safetyTimeout);
      window.removeEventListener('hashchange', handleHashChange);
      // Don't call reveal() here — useLayoutEffect cleanup handles visibility restoration,
      // and calling it here would undo the hiding before positioning completes.
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
