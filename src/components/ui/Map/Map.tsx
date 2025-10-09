'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapLocation } from '@/types';
import styles from './Map.module.css';

interface MapProps {
  center: {
    latitude: number;
    longitude: number;
  };
  zoom?: number;
  markers: MapLocation[];
  height?: string;
  className?: string;
  selectedMarkerId?: string;
  onMarkerClick?: (markerId: string) => void;
}

// Dynamically import the MapComponent to avoid SSR issues
const DynamicMapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className={styles.mapPlaceholder} style={{ height: '400px' }}>
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
        <p>Loading map...</p>
      </div>
    </div>
  ),
});

const Map: React.FC<MapProps> = (props) => {
  return <DynamicMapComponent {...props} />;
};

export default Map;