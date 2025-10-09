'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInVariants, slideUpVariants } from '@/utils/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'custom';
  variants?: Variants;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  variants,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold, triggerOnce });

  const getVariants = (): Variants => {
    if (variants) return variants;
    
    switch (animation) {
      case 'slideUp':
        return slideUpVariants;
      case 'fadeIn':
      default:
        return fadeInVariants;
    }
  };

  const animationVariants = getVariants();

  // Add delay to the variants if specified
  const delayedVariants: Variants = delay > 0 ? {
    ...animationVariants,
    visible: {
      ...animationVariants.visible,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay,
      },
    },
  } : animationVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={delayedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;