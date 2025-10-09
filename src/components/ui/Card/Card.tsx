'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { cardHoverVariants } from '@/utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  if (hover) {
    return (
      <motion.div
        className={clsx(
          'bg-white rounded-xl border border-mountain-200',
          paddingClasses[padding],
          className
        )}
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-lg border border-mountain-200',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;