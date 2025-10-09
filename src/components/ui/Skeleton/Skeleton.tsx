'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  lines?: number;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className = '',
  variant = 'rectangular',
  lines = 1,
  animate = true
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return styles.skeletonText;
      case 'circular':
        return styles.skeletonCircular;
      case 'card':
        return styles.skeletonCard;
      default:
        return styles.skeletonRectangular;
    }
  };

  const skeletonStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const animationVariants = {
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1] as const
      }
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`${styles.skeletonContainer} ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`${styles.skeletonBase} ${getVariantStyles()}`}
            style={{
              ...skeletonStyle,
              width: index === lines - 1 ? '75%' : '100%',
              marginBottom: index < lines - 1 ? '8px' : '0'
            }}
            variants={animate ? animationVariants : undefined}
            animate={animate ? 'pulse' : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${styles.skeletonBase} ${getVariantStyles()} ${className}`}
      style={skeletonStyle}
      {...(animate ? {
        variants: animationVariants,
        animate: 'pulse'
      } : {})}
    />
  );
};

export default Skeleton;