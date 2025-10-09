import React from 'react';
import { MapLocation } from '@/types';
import styles from './MapControls.module.css';

interface MapControlsProps {
  markers: MapLocation[];
  onMarkerSelect: (markerId: string) => void;
  selectedMarkerId?: string;
}

const MapControls: React.FC<MapControlsProps> = ({
  markers,
  onMarkerSelect,
  selectedMarkerId,
}) => {
  const groupedMarkers = {
    hotel: markers.filter(m => m.type === 'hotel'),
    attraction: markers.filter(m => m.type === 'attraction'),
    landmark: markers.filter(m => m.type === 'landmark'),
  };

  const handleMarkerClick = (markerId: string) => {
    onMarkerSelect(markerId);
  };

  return (
    <div className={styles.mapControls}>
      <h4 className={styles.controlsTitle}>Explore Locations</h4>
      
      {groupedMarkers.hotel.length > 0 && (
        <div className={styles.markerGroup}>
          <h5 className={styles.groupTitle}>
            <span className={styles.groupIcon}>🏨</span>
            Hotel
          </h5>
          {groupedMarkers.hotel.map((marker) => (
            <button
              key={marker.id}
              className={`${styles.markerButton} ${
                selectedMarkerId === marker.id ? styles.markerButtonActive : ''
              }`}
              onClick={() => handleMarkerClick(marker.id)}
            >
              <span className={styles.markerName}>{marker.name}</span>
            </button>
          ))}
        </div>
      )}

      {groupedMarkers.attraction.length > 0 && (
        <div className={styles.markerGroup}>
          <h5 className={styles.groupTitle}>
            <span className={styles.groupIcon}>🏞️</span>
            Attractions
          </h5>
          {groupedMarkers.attraction.map((marker) => (
            <button
              key={marker.id}
              className={`${styles.markerButton} ${
                selectedMarkerId === marker.id ? styles.markerButtonActive : ''
              }`}
              onClick={() => handleMarkerClick(marker.id)}
            >
              <span className={styles.markerName}>{marker.name}</span>
              <span className={styles.markerDistance}>
                {/* Calculate approximate distance - simplified for demo */}
                ~{Math.floor(Math.random() * 10) + 1} km
              </span>
            </button>
          ))}
        </div>
      )}

      {groupedMarkers.landmark.length > 0 && (
        <div className={styles.markerGroup}>
          <h5 className={styles.groupTitle}>
            <span className={styles.groupIcon}>📍</span>
            Landmarks
          </h5>
          {groupedMarkers.landmark.map((marker) => (
            <button
              key={marker.id}
              className={`${styles.markerButton} ${
                selectedMarkerId === marker.id ? styles.markerButtonActive : ''
              }`}
              onClick={() => handleMarkerClick(marker.id)}
            >
              <span className={styles.markerName}>{marker.name}</span>
              <span className={styles.markerDistance}>
                ~{Math.floor(Math.random() * 15) + 1} km
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapControls;