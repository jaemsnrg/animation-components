'use client';

import React from 'react';
import PropTypes from 'prop-types';

export const ScrollSectionOverlap = ({ first, second }) => {
  return (
    <div className="relative">
      <div className="md:sticky md:top-0 md:z-[1]">
        {first}
      </div>
      <div className="md:relative md:z-[2]">
        {second}
      </div>
    </div>
  );
};

ScrollSectionOverlap.propTypes = {
  first: PropTypes.node.isRequired,
  second: PropTypes.node.isRequired,
};
