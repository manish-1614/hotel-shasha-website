'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: options.threshold || 0.1,
    once: options.triggerOnce !== false
  });

  return { ref, isInView };
};

export const useStaggeredAnimation = (itemCount: number, delay: number = 0.1) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { ref, isInView } = useScrollAnimation();

  useEffect(() => {
    if (isInView && visibleItems.length === 0) {
      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * delay * 1000);
        
        timeouts.push(timeout);
      }

      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [isInView, itemCount, delay, visibleItems.length]);

  const isItemVisible = (index: number) => visibleItems.includes(index);

  return { ref, isInView, isItemVisible };
};