'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  isOpen,
  onClick,
  className = '',
  size = 24,
  strokeWidth = 2,
  color = 'currentColor',
}) => {
  // Animation variants for the hamburger lines
  const topLineVariants = {
    closed: {
      rotate: 0,
      translateY: 0,
      opacity: 1,
    },
    open: {
      rotate: 45,
      translateY: 6,
      opacity: 1,
    },
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      scaleX: 1,
    },
    open: {
      opacity: 0,
      scaleX: 0,
    },
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      translateY: 0,
      opacity: 1,
    },
    open: {
      rotate: -45,
      translateY: -6,
      opacity: 1,
    },
  };

  const containerVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 0,
    },
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center justify-center p-3 sm:p-2 rounded-lg transition-colors duration-200 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 touch-manipulation ${className}`}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls={isOpen ? "mobile-navigation-menu" : undefined}
      aria-haspopup="true"
      style={{
        minWidth: Math.max(44, size + 16), // Ensure minimum 44px touch target
        minHeight: Math.max(44, size + 16), // Ensure minimum 44px touch target
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={containerVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Top line */}
        <motion.line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={topLineVariants}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            originX: '50%',
            originY: '50%',
          }}
        />
        
        {/* Middle line */}
        <motion.line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={middleLineVariants}
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            originX: '50%',
            originY: '50%',
          }}
        />
        
        {/* Bottom line */}
        <motion.line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={bottomLineVariants}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            originX: '50%',
            originY: '50%',
          }}
        />
      </motion.svg>
    </button>
  );
};

export default HamburgerIcon;