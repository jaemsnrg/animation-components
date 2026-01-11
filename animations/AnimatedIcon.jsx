'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';

export const AnimatedIcon = ({ 
  iconName = 'Settings', 
  size = 48, 
  color = 'currentColor',
  className,
  rotateY = true,
  rotateX = false,
  duration = 3
}) => {
  const IconComponent = Icons[iconName];

  if (!IconComponent) {
    return <div className="text-red-500">Icon "{iconName}" not found</div>;
  }

  return (
    <div style={{ perspective: '1000px', display: 'inline-block' }}>
      <motion.div
        animate={{
          rotateY: rotateY ? 360 : 0,
          rotateX: rotateX ? 360 : 0,
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={cn("flex items-center justify-center", className)}
      >
        <IconComponent size={size} color={color} />
      </motion.div>
    </div>
  );
};

AnimatedIcon.propTypes = {
  iconName: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  rotateY: PropTypes.bool,
  rotateX: PropTypes.bool,
  duration: PropTypes.number,
};
