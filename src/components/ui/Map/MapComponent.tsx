'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { MapLocation } from '@/types';
import styles from './Map.module.css';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
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

// Custom marker icons
const createCustomIcon = (type: MapLocation['type']) => {
  const iconConfig = {
    hotel: {
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" width="32" height="32">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `),
      iconSize: [32, 32] as [number, number],
      iconAnchor: [16, 32] as [number, number],
      popupAnchor: [0, -32] as [number, number],
    },
    attraction: {
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#059669" width="28" height="28">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `),
      iconSize: [28, 28] as [number, number],
      iconAnchor: [14, 28] as [number, number],
      popupAnchor: [0, -28] as [number, number],
    },
    landmark: {
      iconUrl: 'data:image/svg+xml;base64=' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb" width="24" height="24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `),
      iconSize: [24, 24] as [number, number],
      iconAnchor: [12, 24] as [number, number],
      popupAnchor: [0, -24] as [number, number],
    },
  };

  return new Icon(iconConfig[type]);
};

// Component to handle map bounds and selected marker
const MapController: React.FC<{ 
  markers: MapLocation[];
  selectedMarkerId?: string;
}> = ({ markers, selectedMarkerId }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 1) {
      const bounds = markers.map(marker => [
        marker.coordinates.latitude,
        marker.coordinates.longitude
      ] as [number, number]);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, markers]);

  useEffect(() => {
    if (selectedMarkerId) {
      const selectedMarker = markers.find(m => m.id === selectedMarkerId);
      if (selectedMarker) {
        map.setView(
          [selectedMarker.coordinates.latitude, selectedMarker.coordinates.longitude],
          15,
          { animate: true, duration: 1 }
        );
      }
    }
  }, [map, markers, selectedMarkerId]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom = 13,
  markers,
  height = '400px',
  className = '',
  selectedMarkerId,
  onMarkerClick,
}) => {
  const mapCenter: LatLngExpression = [center.latitude, center.longitude];

  return (
    <div className={`${styles.mapWrapper} ${className}`} style={{ height }}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        className={styles.mapContainer}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.coordinates.latitude, marker.coordinates.longitude]}
            icon={createCustomIcon(marker.type)}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(marker.id);
                }
              },
            }}
          >
            <Popup className={styles.popup}>
              <div className={styles.popupContent}>
                <h3 className={styles.popupTitle}>{marker.name}</h3>
                {marker.description && (
                  <p className={styles.popupDescription}>{marker.description}</p>
                )}
                <span className={styles.popupType}>
                  {marker.type === 'hotel' && '🏨 Hotel'}
                  {marker.type === 'attraction' && '🏞️ Attraction'}
                  {marker.type === 'landmark' && '📍 Landmark'}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapController markers={markers} selectedMarkerId={selectedMarkerId} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;