'use client';

import React from 'react';
import Skeleton from './Skeleton';
import styles from './SkeletonCard.module.css';

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  descriptionLines?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = '',
  showImage = true,
  showTitle = true,
  showDescription = true,
  descriptionLines = 3
}) => {
  return (
    <div className={`${styles.skeletonCard} ${className}`}>
      {showImage && (
        <div className={styles.imageContainer}>
          <Skeleton variant="rectangular" height="200px" />
        </div>
      )}
      
      <div className={styles.content}>
        {showTitle && (
          <div className={styles.titleContainer}>
            <Skeleton variant="text" height="24px" width="80%" />
          </div>
        )}
        
        {showDescription && (
          <div className={styles.descriptionContainer}>
            <Skeleton variant="text" lines={descriptionLines} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SkeletonCard;