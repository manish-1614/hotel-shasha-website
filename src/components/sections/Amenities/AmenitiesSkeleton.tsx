'use client';

import React from 'react';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import styles from './AmenitiesSkeleton.module.css';

interface AmenitiesSkeletonProps {
  count?: number;
  className?: string;
}

const AmenitiesSkeleton: React.FC<AmenitiesSkeletonProps> = ({
  count = 6,
  className = ''
}) => {
  return (
    <section className={`${styles.amenitiesSkeletonSection} ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header Skeleton */}
        <div className={styles.headerSkeleton}>
          <Skeleton variant="text" height="3rem" width="250px" className={styles.titleSkeleton} />
          <div className={styles.descriptionSkeleton}>
            <Skeleton variant="text" lines={3} />
          </div>
        </div>

        {/* Amenities Grid Skeleton */}
        <div className={styles.amenitiesGrid}>
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className={styles.amenityCardSkeleton}>
              <div className={styles.amenityIconSkeleton}>
                <Skeleton variant="circular" width="60px" height="60px" />
              </div>
              <div className={styles.amenityContent}>
                <Skeleton variant="text" height="1.5rem" width="80%" className={styles.amenityTitle} />
                <Skeleton variant="text" lines={2} className={styles.amenityDescription} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSkeleton;