'use client';

import React from 'react';
import PropTypes from 'prop-types';

export const ScrollSectionOverlap = ({ first, second, lockDelay = 0 }) => {
  return (
    <div className="relative">
      {/* Extra scroll distance before `first` reaches the top of the viewport
          and its sticky pin engages — without it, the lock kicks in the
          instant `first` scrolls into view, with no room to breathe. */}
      {lockDelay > 0 && <div style={{ height: lockDelay }} aria-hidden="true" />}
      <div className="small:sticky small:top-0 small:z-[1]">
        {first}
      </div>
      <div className="small:relative small:z-[2]">
        {second}
      </div>
    </div>
  );
};

ScrollSectionOverlap.propTypes = {
  first: PropTypes.node.isRequired,
  second: PropTypes.node.isRequired,
  lockDelay: PropTypes.number,
};
