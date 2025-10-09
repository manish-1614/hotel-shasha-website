'use client';

import { useState, useEffect, useCallback } from 'react';

interface HeaderScrollState {
  isScrolled: boolean;
  scrollProgress: number;
  logoScale: number;
  headerOpacity: number;
  showScrollProgress: boolean;
}

interface UseHeaderScrollAnimationsReturn extends HeaderScrollState {
  scrollToTop: () => void;
}

export const useHeaderScrollAnimations = (): UseHeaderScrollAnimationsReturn => {
  const [scrollState, setScrollState] = useState<HeaderScrollState>({
    isScrolled: false,
    scrollProgress: 0,
    logoScale: 1,
    headerOpacity: 0,
    showScrollProgress: false,
  });
  const [isClient, setIsClient] = useState(false);

  const scrollToTop = useCallback(() => {
    if (!isClient) return;
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [isClient]);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track scroll position and calculate animation values
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = documentHeight - windowHeight;
      const scrollProgress = Math.min(scrollPosition / maxScroll, 1);
      
      // Header background transition (starts at 50px scroll)
      const isScrolled = scrollPosition > 50;
      const headerOpacity = Math.min(scrollPosition / 100, 0.95);
      
      // Logo scale animation (scales from 1 to 0.8 over first 200px)
      const logoScale = Math.max(1 - (scrollPosition / 500) * 0.2, 0.8);
      
      // Show scroll progress indicator after scrolling 200px
      const showScrollProgress = scrollPosition > 200;
      
      setScrollState({
        isScrolled,
        scrollProgress,
        logoScale,
        headerOpacity,
        showScrollProgress,
      });
    };

    // Initial call
    handleScroll();

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [isClient]);

  return {
    ...scrollState,
    scrollToTop,
  };
};