'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import ClientOnly from '../ClientOnly/ClientOnly';

export interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
  disabled?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className = '',
  speed = 0.5,
  offset = 0,
  disabled = false,
  overlay = false,
  overlayOpacity = 0.5
}) => {
  const { ref, y } = useParallax({ speed, offset, disabled });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <ClientOnly
        fallback={
          <div className="absolute inset-0">
            {children}
            {overlay && (
              <div 
                className="absolute inset-0 bg-black z-10"
                style={{ opacity: overlayOpacity }}
              />
            )}
          </div>
        }
      >
        <motion.div
          className="absolute inset-0"
          style={{ 
            y: disabled ? 0 : y,
            scale: disabled ? 1 : 1.1 // Prevent gaps during parallax
          }}
        >
          {children}
          {overlay && (
            <div 
              className="absolute inset-0 bg-black z-10"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </motion.div>
      </ClientOnly>
    </div>
  );
};

export default ParallaxBackground;