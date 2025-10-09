'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScrollProgressIndicator.module.css';

interface ScrollProgressIndicatorProps {
  progress: number;
  show: boolean;
  className?: string;
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  progress,
  show,
  className = '',
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`${styles.progressContainer} ${className}`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.progressBar}
            style={{
              scaleX: progress,
            }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollProgressIndicator;