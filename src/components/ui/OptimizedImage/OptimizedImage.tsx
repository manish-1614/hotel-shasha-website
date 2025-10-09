'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './OptimizedImage.module.css';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  containerClassName?: string;
  onLoadComplete?: () => void;
  onError?: () => void;
  showLoadingSpinner?: boolean;
  errorFallback?: React.ReactNode;
  retryable?: boolean;
  webpSrc?: string;
  avifSrc?: string;
  enableLazyLoading?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  containerClassName = '',
  onLoadComplete,
  onError,
  className = '',
  showLoadingSpinner = false,
  errorFallback,
  retryable = true,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoadComplete?.();
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${currentSrc} (attempt ${retryCount + 1})`);
    
    if (currentSrc !== fallbackSrc && retryCount < 2) {
      // Try fallback image
      setCurrentSrc(fallbackSrc);
      setRetryCount(prev => prev + 1);
      onError?.();
    } else {
      // Give up and show error state
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setCurrentSrc(src);
    setRetryCount(prev => prev + 1);
  };

  const renderErrorFallback = () => {
    if (errorFallback) {
      return errorFallback;
    }

    return (
      <motion.div
        className={styles.errorFallback}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.errorIcon}>
          <span role="img" aria-label="Image failed to load">🖼️</span>
        </div>
        <p className={styles.errorText}>
          Image failed to load
        </p>
        {retryable && retryCount < 3 && (
          <button
            onClick={handleRetry}
            className={styles.retryButton}
            type="button"
            aria-label="Retry loading image"
            title="Try Again"
          >
            Try Again
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className={`${styles.imageContainer} ${containerClassName}`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            className={styles.loadingOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {showLoadingSpinner ? (
              <LoadingSpinner size="md" color="gray" />
            ) : (
              <div className={styles.skeletonLoader}>
                <div className={styles.skeletonShimmer} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {hasError && currentSrc === fallbackSrc ? (
        renderErrorFallback()
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={currentSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={className}
            unoptimized={hasError}
            {...props}
          />
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedImage;