'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface VideoOptimizationOptions {
  preloadDistance?: number;
  maxConcurrentLoads?: number;
  enableLazyLoading?: boolean;
  fallbackDelay?: number;
}

interface VideoState {
  isLoaded: boolean;
  isLoading: boolean;
  hasError: boolean;
  canPlay: boolean;
  loadProgress: number;
}

/**
 * Hook for optimizing video loading with lazy loading, preloading, and fallback handling
 */
export const useVideoOptimization = (
  videoSources: string[],
  options: VideoOptimizationOptions = {}
) => {
  const {
    preloadDistance = 1,
    maxConcurrentLoads = 2,
    enableLazyLoading = true,
    fallbackDelay = 3000,
  } = options;

  const [videoStates, setVideoStates] = useState<Map<string, VideoState>>(
    new Map(videoSources.map(src => [src, {
      isLoaded: false,
      isLoading: false,
      hasError: false,
      canPlay: false,
      loadProgress: 0,
    }]))
  );

  const [currentLoadingCount, setCurrentLoadingCount] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const loadingQueue = useRef<string[]>([]);
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  // Initialize intersection observer for lazy loading
  useEffect(() => {
    if (!enableLazyLoading || typeof window === 'undefined') return;

    intersectionObserver.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1,
      }
    );

    return () => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, [enableLazyLoading]);

  // Update video state
  const updateVideoState = useCallback((src: string, updates: Partial<VideoState>) => {
    setVideoStates(prev => {
      const newMap = new Map(prev);
      const currentState = newMap.get(src) || {
        isLoaded: false,
        isLoading: false,
        hasError: false,
        canPlay: false,
        loadProgress: 0,
      };
      newMap.set(src, { ...currentState, ...updates });
      return newMap;
    });
  }, []);

  // Load video with optimization
  const loadVideo = useCallback((src: string, priority: boolean = false) => {
    const currentState = videoStates.get(src);
    if (!currentState || currentState.isLoaded || currentState.isLoading || currentState.hasError) {
      return Promise.resolve();
    }

    // Check concurrent loading limit
    if (!priority && currentLoadingCount >= maxConcurrentLoads) {
      if (!loadingQueue.current.includes(src)) {
        loadingQueue.current.push(src);
      }
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;

      updateVideoState(src, { isLoading: true });
      setCurrentLoadingCount(prev => prev + 1);

      // Progress tracking
      const updateProgress = () => {
        if (video.buffered.length > 0) {
          const progress = (video.buffered.end(0) / video.duration) * 100;
          updateVideoState(src, { loadProgress: Math.min(progress, 100) });
        }
      };

      // Success handlers
      const handleLoadedMetadata = () => {
        updateProgress();
      };

      const handleCanPlay = () => {
        updateVideoState(src, { 
          canPlay: true,
          loadProgress: 100,
        });
      };

      const handleLoadedData = () => {
        updateVideoState(src, { 
          isLoaded: true,
          isLoading: false,
          canPlay: true,
          loadProgress: 100,
        });
        videoRefs.current.set(src, video);
        setCurrentLoadingCount(prev => prev - 1);
        resolve();
        
        // Process queue
        if (loadingQueue.current.length > 0) {
          const nextSrc = loadingQueue.current.shift();
          if (nextSrc) {
            setTimeout(() => loadVideo(nextSrc), 100);
          }
        }
      };

      // Error handlers
      const handleError = () => {
        updateVideoState(src, { 
          hasError: true,
          isLoading: false,
        });
        setCurrentLoadingCount(prev => prev - 1);
        reject(new Error(`Failed to load video: ${src}`));
        
        // Process queue even on error
        if (loadingQueue.current.length > 0) {
          const nextSrc = loadingQueue.current.shift();
          if (nextSrc) {
            setTimeout(() => loadVideo(nextSrc), 100);
          }
        }
      };

      // Fallback timeout
      const fallbackTimeout = setTimeout(() => {
        if (!videoStates.get(src)?.isLoaded) {
          handleError();
        }
      }, fallbackDelay);

      // Event listeners
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      video.addEventListener('progress', updateProgress);

      // Cleanup function
      const cleanup = () => {
        clearTimeout(fallbackTimeout);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
        video.removeEventListener('progress', updateProgress);
      };

      // Start loading
      video.src = src;
      video.load();

      // Store cleanup function
      video.addEventListener('loadeddata', cleanup, { once: true });
      video.addEventListener('error', cleanup, { once: true });
    });
  }, [videoStates, currentLoadingCount, maxConcurrentLoads, updateVideoState, fallbackDelay]);

  // Preload videos based on current index and distance
  const preloadVideos = useCallback((currentIndex: number) => {
    if (!isIntersecting && enableLazyLoading) return;

    const indicesToLoad = [];
    
    // Current video (highest priority)
    indicesToLoad.push(currentIndex);
    
    // Next videos within preload distance
    for (let i = 1; i <= preloadDistance; i++) {
      const nextIndex = (currentIndex + i) % videoSources.length;
      indicesToLoad.push(nextIndex);
    }
    
    // Previous videos within preload distance
    for (let i = 1; i <= preloadDistance; i++) {
      const prevIndex = (currentIndex - i + videoSources.length) % videoSources.length;
      indicesToLoad.push(prevIndex);
    }

    // Load current video with priority
    const currentSrc = videoSources[currentIndex];
    if (currentSrc) {
      loadVideo(currentSrc, true);
    }

    // Load other videos without priority
    indicesToLoad.slice(1).forEach(index => {
      const src = videoSources[index];
      if (src) {
        setTimeout(() => loadVideo(src, false), index * 200);
      }
    });
  }, [videoSources, preloadDistance, isIntersecting, enableLazyLoading, loadVideo]);

  // Get video element for playback
  const getVideoElement = useCallback((src: string): HTMLVideoElement | null => {
    return videoRefs.current.get(src) || null;
  }, []);

  // Check if video is ready to play
  const isVideoReady = useCallback((src: string): boolean => {
    const state = videoStates.get(src);
    return Boolean(state?.canPlay && !state?.hasError);
  }, [videoStates]);

  // Check if video has error
  const hasVideoError = useCallback((src: string): boolean => {
    const state = videoStates.get(src);
    return Boolean(state?.hasError);
  }, [videoStates]);

  // Get video loading progress
  const getVideoProgress = useCallback((src: string): number => {
    const state = videoStates.get(src);
    return state?.loadProgress || 0;
  }, [videoStates]);

  // Observe element for lazy loading
  const observeElement = useCallback((element: HTMLElement | null) => {
    if (!element || !intersectionObserver.current || !enableLazyLoading) return;

    intersectionObserver.current.observe(element);

    return () => {
      if (intersectionObserver.current && element) {
        intersectionObserver.current.unobserve(element);
      }
    };
  }, [enableLazyLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      videoRefs.current.clear();
      loadingQueue.current = [];
    };
  }, []);

  return {
    preloadVideos,
    getVideoElement,
    isVideoReady,
    hasVideoError,
    getVideoProgress,
    observeElement,
    isIntersecting,
    videoStates: Object.fromEntries(videoStates),
    isOptimizationDisabled: prefersReducedMotion,
  };
};

/**
 * Hook for creating optimized video elements with fallback support
 */
export const useOptimizedVideo = (src: string, poster: string) => {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const createVideoElement = useCallback(() => {
    if (prefersReducedMotion) return null;

    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = poster;

    const handleLoad = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);

    video.src = src;
    setVideoElement(video);

    return () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
      video.remove();
    };
  }, [src, poster, prefersReducedMotion]);

  useEffect(() => {
    const cleanup = createVideoElement();
    return cleanup || undefined;
  }, [createVideoElement]);

  return {
    videoElement,
    hasError,
    isLoaded,
    shouldUseFallback: hasError || prefersReducedMotion,
  };
};