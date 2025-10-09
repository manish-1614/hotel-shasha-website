'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
  text,
  fullScreen = false
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return styles.spinnerSm;
      case 'lg':
        return styles.spinnerLg;
      case 'xl':
        return styles.spinnerXl;
      default:
        return styles.spinnerMd;
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'secondary':
        return styles.spinnerSecondary;
      case 'white':
        return styles.spinnerWhite;
      case 'gray':
        return styles.spinnerGray;
      default:
        return styles.spinnerPrimary;
    }
  };

  const spinnerElement = (
    <motion.div
      className={`${styles.spinner} ${getSizeClass()} ${getColorClass()} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <div className={styles.spinnerInner} />
    </motion.div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className={styles.fullScreenContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.fullScreenContent}>
          {spinnerElement}
          {text && (
            <motion.p
              className={styles.loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {text}
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  }

  if (text) {
    return (
      <div className={styles.spinnerWithText}>
        {spinnerElement}
        <span className={styles.spinnerText}>{text}</span>
      </div>
    );
  }

  return spinnerElement;
};

export default LoadingSpinner;