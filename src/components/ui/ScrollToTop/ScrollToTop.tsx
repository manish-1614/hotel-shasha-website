'use client';

import React from 'react';
import { ChevronUp } from 'lucide-react';
import styles from './ScrollToTop.module.css';

interface ScrollToTopProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  isVisible, 
  onClick, 
  className = '' 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''} ${className}`}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUp className={styles.icon} />
    </button>
  );
};

export default ScrollToTop;