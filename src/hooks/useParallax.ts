'use client';

import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ParallaxOptions {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

/**
 * Hook for creating smooth parallax scroll effects
 * Respects user's reduced motion preferences
 */
export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0, disabled = false } = options;
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const updateScrollY = useCallback(() => {
    if (disabled || prefersReducedMotion) return;
    
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      setScrollY(window.pageYOffset);
    });
  }, [disabled, prefersReducedMotion]);

  useEffect(() => {
    if (disabled || prefersReducedMotion) return;

    // Throttle scroll events for better performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollY();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    updateScrollY();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollY, disabled, prefersReducedMotion]);

  // Calculate parallax transform values
  const parallaxY = prefersReducedMotion ? 0 : (scrollY - offset) * speed;
  const parallaxTransform = prefersReducedMotion 
    ? 'none' 
    : `translate3d(0, ${parallaxY}px, 0)`;

  // Intersection observer for performance optimization
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    // We'll return the observer so components can use it
    return () => observer.disconnect();
  }, []);

  return {
    scrollY,
    parallaxY,
    parallaxTransform,
    isVisible,
    isDisabled: disabled || prefersReducedMotion,
    // For backward compatibility with existing components
    ref: null,
    y: parallaxY,
    isClient: typeof window !== 'undefined',
  };
};

/**
 * Hook for creating staggered entrance animations based on scroll position
 */
export const useScrollStagger = (elementCount: number, delay: number = 0.1) => {
  const [visibleElements, setVisibleElements] = useState<boolean[]>(
    new Array(elementCount).fill(false)
  );
  const prefersReducedMotion = useReducedMotion();

  const triggerStagger = useCallback(() => {
    if (prefersReducedMotion) {
      // Show all elements immediately if reduced motion is preferred
      setVisibleElements(new Array(elementCount).fill(true));
      return;
    }

    // Stagger the appearance of elements
    visibleElements.forEach((_, index) => {
      setTimeout(() => {
        setVisibleElements(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * delay * 1000);
    });
  }, [elementCount, delay, prefersReducedMotion, visibleElements]);

  return {
    visibleElements,
    triggerStagger,
    isReduced: prefersReducedMotion,
  };
};

/**
 * Hook for optimized video transitions with preloading
 */
export const useVideoTransition = (videoSources: string[]) => {
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [currentVideo, setCurrentVideo] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Preload videos for smooth transitions
  useEffect(() => {
    const preloadVideo = (src: string) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'metadata';
      
      video.addEventListener('loadedmetadata', () => {
        setLoadedVideos(prev => new Set([...prev, src]));
      });
    };

    // Preload current and next video
    const currentSrc = videoSources[currentVideo];
    const nextSrc = videoSources[(currentVideo + 1) % videoSources.length];
    
    if (currentSrc) preloadVideo(currentSrc);
    if (nextSrc && nextSrc !== currentSrc) preloadVideo(nextSrc);
  }, [currentVideo, videoSources]);

  const transitionToVideo = useCallback((index: number) => {
    if (prefersReducedMotion) {
      setCurrentVideo(index);
      return;
    }

    // Add smooth transition delay
    setTimeout(() => {
      setCurrentVideo(index);
    }, 100);
  }, [prefersReducedMotion]);

  return {
    currentVideo,
    loadedVideos,
    transitionToVideo,
    isVideoLoaded: (src: string) => loadedVideos.has(src),
  };
};