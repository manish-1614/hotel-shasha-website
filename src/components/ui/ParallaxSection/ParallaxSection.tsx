'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

export interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  backgroundElements?: React.ReactNode;
  backgroundSpeed?: number;
  id?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.3,
  backgroundElements,
  backgroundSpeed = 0.5,
  id
}) => {
  const { ref: sectionRef, y: contentY, isClient } = useParallax({ speed });
  const { ref: backgroundRef, y: backgroundY, isClient: backgroundIsClient } = useParallax({ speed: backgroundSpeed });

  return (
    <section 
      id={id}
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Elements with Parallax */}
      {backgroundElements && (
        <motion.div
          ref={backgroundRef}
          className="absolute inset-0 pointer-events-none"
          style={{ y: backgroundIsClient ? backgroundY : 0 }}
        >
          {backgroundElements}
        </motion.div>
      )}
      
      {/* Content with Parallax */}
      <motion.div
        className="relative z-10"
        style={{ y: isClient ? contentY : 0 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ParallaxSection;