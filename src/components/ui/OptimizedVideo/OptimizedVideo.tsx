'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface OptimizedVideoProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
  priority?: boolean;
  lazy?: boolean;
  fallbackDelay?: number;
  style?: React.CSSProperties;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  alt,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  onLoadStart,
  onLoadEnd,
  onError,
  priority = false,
  lazy = true,
  fallbackDelay = 3000,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [loadProgress, setLoadProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Initialize intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || typeof window === 'undefined') {
      setIsInView(true);
      return;
    }

    intersectionObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          intersectionObserverRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    if (videoRef.current?.parentElement) {
      intersectionObserverRef.current.observe(videoRef.current.parentElement);
    }

    return () => {
      intersectionObserverRef.current?.disconnect();
    };
  }, [lazy]);

  // Handle video loading
  const handleVideoLoad = useCallback(() => {
    if (!videoRef.current || !isInView) return;

    const video = videoRef.current;
    setIsLoading(true);
    onLoadStart?.();

    // Set up fallback timeout
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }
    fallbackTimeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
        setShowFallback(true);
        setIsLoading(false);
        onError?.();
      }
    }, fallbackDelay);

    const handleLoadedMetadata = () => {
      setLoadProgress(25);
    };

    const handleCanPlay = () => {
      setLoadProgress(75);
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      setIsLoading(false);
      setLoadProgress(100);
      onLoadEnd?.();
      
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }

      // Auto-play if enabled and in view
      if (autoPlay && isInView) {
        video.play().catch(() => {
          // Fallback if autoplay fails (e.g., browser policy)
          console.warn('Autoplay failed, showing poster image');
        });
      }
    };

    const handleError = () => {
      setHasError(true);
      setShowFallback(true);
      setIsLoading(false);
      onError?.();
      
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
    };

    const handleProgress = () => {
      if (video.buffered.length > 0 && video.duration > 0) {
        const progress = (video.buffered.end(0) / video.duration) * 100;
        setLoadProgress(Math.min(progress * 0.7, 70)); // Cap at 70% until fully loaded
      }
    };

    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('progress', handleProgress);

    // Start loading
    video.load();

    // Cleanup function
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('progress', handleProgress);
      
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, [isInView, isLoaded, autoPlay, onLoadStart, onLoadEnd, onError, fallbackDelay]);

  // Load video when in view
  useEffect(() => {
    if (isInView && !isLoaded && !isLoading && !hasError) {
      const cleanup = handleVideoLoad();
      return cleanup;
    }
  }, [isInView, isLoaded, isLoading, hasError, handleVideoLoad]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, []);

  // Show fallback image if reduced motion is preferred or video failed
  const shouldShowFallback = prefersReducedMotion || showFallback || hasError;

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      <AnimatePresence mode="wait">
        {shouldShowFallback ? (
          // Fallback Image
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={poster}
              alt={alt}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ) : (
          // Optimized Video
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              autoPlay={autoPlay && isInView}
              muted={muted}
              loop={loop}
              playsInline={playsInline}
              poster={poster}
              className="w-full h-full object-cover"
              style={{
                filter: prefersReducedMotion ? 'none' : 'brightness(1.05) contrast(1.1)',
              }}
            >
              <source src={src} type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <Image
                src={poster}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </video>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center space-y-2">
                  {/* Progress bar */}
                  <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium">
                    Loading video...
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Poster image overlay for smooth transition */}
      {!shouldShowFallback && !isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <Image
            src={poster}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedVideo;