'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScrollNavigationOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

interface UseScrollNavigationReturn {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
  isScrolled: boolean;
}

export const useScrollNavigation = (
  options: ScrollNavigationOptions = {}
): UseScrollNavigationReturn => {
  const { offset = 80, behavior = 'smooth' } = options;
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);



  const scrollToSection = useCallback((sectionId: string) => {
    if (!isClient) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior
      });
    }
  }, [offset, behavior, isClient]);

  const scrollToTop = useCallback(() => {
    if (!isClient) return;
    
    window.scrollTo({
      top: 0,
      behavior
    });
  }, [behavior, isClient]);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track scroll position and active section
  useEffect(() => {
    if (!isClient) return;
    
    // Define all sections that should be tracked
    const sections = ['home', 'rooms', 'dining', 'amenities', 'location', 'newsletter', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update isScrolled state
      setIsScrolled(scrollPosition > 50);

      // Find the active section
      let currentActiveSection = 'home';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          const elementBottom = elementTop + rect.height;
          
          // Check if the section is in view (with offset consideration)
          if (scrollPosition + offset >= elementTop && scrollPosition + offset < elementBottom) {
            currentActiveSection = sectionId;
          }
        }
      }

      // Special case for when we're at the very top
      if (scrollPosition < 100) {
        currentActiveSection = 'home';
      }

      // Special case for when we're at the bottom
      if (window.innerHeight + scrollPosition >= document.documentElement.scrollHeight - 100) {
        currentActiveSection = 'contact';
      }

      setActiveSection(currentActiveSection);
    };

    // Initial call
    handleScroll();

    // Add scroll listener with throttling
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
  }, [offset, isClient]);

  return {
    activeSection,
    scrollToSection,
    scrollToTop,
    isScrolled
  };
};