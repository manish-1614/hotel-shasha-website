'use client';

import React from 'react';
import SkeletonCard from '@/components/ui/Skeleton/SkeletonCard';
import styles from './RoomsSkeleton.module.css';

interface RoomsSkeletonProps {
  count?: number;
  className?: string;
}

const RoomsSkeleton: React.FC<RoomsSkeletonProps> = ({
  count = 3,
  className = ''
}) => {
  return (
    <section className={`${styles.roomsSkeletonSection} ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header Skeleton */}
        <div className={styles.headerSkeleton}>
          <div className={styles.titleSkeleton} />
          <div className={styles.descriptionSkeleton}>
            <div className={styles.descriptionLine} />
            <div className={styles.descriptionLine} />
            <div className={styles.descriptionLineShort} />
          </div>
        </div>

        {/* Room Cards Skeleton */}
        <div className={styles.roomsGrid}>
          {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard
              key={index}
              className={styles.roomCardSkeleton}
              showImage={true}
              showTitle={true}
              showDescription={true}
              descriptionLines={4}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSkeleton;