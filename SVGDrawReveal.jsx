'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function parseSvgData(text) {
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if (!svg) return null;

  const viewBox = svg.getAttribute('viewBox') || '0 0 100 100';
  const paths = [];

  svg.querySelectorAll('path').forEach((path) => {
    const transforms = [];
    let el = path.parentElement;
    while (el && el.tagName.toLowerCase() !== 'svg') {
      const t = el.getAttribute('transform');
      if (t) transforms.unshift(t);
      el = el.parentElement;
    }

    const styleStr = path.getAttribute('style') || '';
    const fill = styleStr.match(/fill:\s*([^;]+)/)?.[1]?.trim()
      || path.getAttribute('fill')
      || 'currentColor';
    const fillRule = styleStr.match(/fill-rule:\s*([^;]+)/)?.[1]?.trim() || 'nonzero';

    paths.push({
      d: path.getAttribute('d'),
      transform: transforms.length ? transforms.join(' ') : undefined,
      fill,
      fillRule,
    });
  });

  return { viewBox, paths };
}

export function SVGDrawReveal({
  src,
  strokeWidth = 8,
  drawDuration = 2,
  fillDuration = 0.9,
  fillDelay = 0.25,
  translateY = 40,
  className,
  style,
}) {
  const ref = useRef(null);
  const [svgData, setSvgData] = useState(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then((text) => setSvgData(parseSvgData(text)));
  }, [src]);

  const wrapperVariants = {
    hidden: { y: translateY, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: drawDuration * 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, fillOpacity: 0, strokeOpacity: 1 },
    visible: {
      pathLength: 1,
      fillOpacity: 1,
      strokeOpacity: 0,
      transition: {
        pathLength: { duration: drawDuration, ease: 'easeInOut' },
        fillOpacity: { duration: fillDuration, delay: drawDuration - fillDelay, ease: 'easeIn' },
        strokeOpacity: { duration: fillDuration * 0.6, delay: drawDuration - fillDelay + fillDuration * 0.5, ease: 'easeOut' },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ lineHeight: 0, ...style }}
      variants={wrapperVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {svgData && (
        <svg
          viewBox={svgData.viewBox}
          width="100%"
          height="100%"
          style={{ display: 'block', overflow: 'visible' }}
        >
          {svgData.paths.map((path, i) => (
            <g key={i} transform={path.transform}>
              <motion.path
                d={path.d}
                fill={path.fill}
                fillRule={path.fillRule}
                stroke={path.fill}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              />
            </g>
          ))}
        </svg>
      )}
    </motion.div>
  );
}
