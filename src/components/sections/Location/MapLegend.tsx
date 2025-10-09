import React from 'react';
import styles from './MapLegend.module.css';

const MapLegend: React.FC = () => {
  const legendItems = [
    {
      type: 'hotel',
      label: 'Hotel Shasha',
      color: '#dc2626',
      icon: '🏨',
    },
    {
      type: 'attraction',
      label: 'Natural Attractions',
      color: '#059669',
      icon: '🏞️',
    },
    {
      type: 'landmark',
      label: 'Cultural Landmarks',
      color: '#2563eb',
      icon: '📍',
    },
  ];

  return (
    <div className={styles.mapLegend}>
      <h4 className={styles.legendTitle}>Map Legend</h4>
      <div className={styles.legendItems}>
        {legendItems.map((item) => (
          <div key={item.type} className={styles.legendItem}>
            <div 
              className={styles.legendMarker}
              style={{ backgroundColor: item.color }}
            >
              <span className={styles.legendIcon}>{item.icon}</span>
            </div>
            <span className={styles.legendLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;