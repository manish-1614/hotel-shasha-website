import { useMemo } from 'react';
import { MapLocation, MapConfig } from '@/types';

// Hotel Shasha coordinates (Jibhi, Himachal Pradesh)
const HOTEL_COORDINATES = {
  latitude: 31.5204,
  longitude: 77.2077,
};

// Nearby attractions and landmarks with approximate coordinates
const JIBHI_ATTRACTIONS: MapLocation[] = [
  {
    id: 'hotel-shasha',
    name: 'Hotel Shasha',
    coordinates: HOTEL_COORDINATES,
    type: 'hotel',
    description: 'Your home away from home in the beautiful Jibhi Valley',
  },
  {
    id: 'jibhi-waterfall',
    name: 'Jibhi Waterfall',
    coordinates: {
      latitude: 31.5180,
      longitude: 77.2050,
    },
    type: 'attraction',
    description: 'A stunning cascade hidden in the dense forest, perfect for nature photography',
  },
  {
    id: 'serolsar-lake',
    name: 'Serolsar Lake',
    coordinates: {
      latitude: 31.5350,
      longitude: 77.1950,
    },
    type: 'attraction',
    description: 'A pristine high-altitude lake surrounded by dense deodar forests',
  },
  {
    id: 'chehni-kothi',
    name: 'Chehni Kothi',
    coordinates: {
      latitude: 31.5100,
      longitude: 77.1800,
    },
    type: 'landmark',
    description: 'An ancient 1500-year-old tower built in traditional Himachali architecture',
  },
  {
    id: 'jalori-pass',
    name: 'Jalori Pass',
    coordinates: {
      latitude: 31.5500,
      longitude: 77.1600,
    },
    type: 'landmark',
    description: 'A high mountain pass offering panoramic views of the Himalayas',
  },
  {
    id: 'tirthan-river',
    name: 'Tirthan River',
    coordinates: {
      latitude: 31.5150,
      longitude: 77.2100,
    },
    type: 'attraction',
    description: 'Crystal clear river perfect for trout fishing and riverside camping',
  },
  {
    id: 'shringa-rishi-temple',
    name: 'Shringa Rishi Temple',
    coordinates: {
      latitude: 31.5250,
      longitude: 77.1900,
    },
    type: 'landmark',
    description: 'Ancient temple featuring traditional Himachali architecture',
  },
  {
    id: 'ghnp-entrance',
    name: 'Great Himalayan National Park',
    coordinates: {
      latitude: 31.4800,
      longitude: 77.1500,
    },
    type: 'attraction',
    description: 'UNESCO World Heritage site home to diverse flora and fauna',
  },
];

export const useMapData = () => {
  const mapConfig: MapConfig = useMemo(() => ({
    center: HOTEL_COORDINATES,
    zoom: 12,
    markers: JIBHI_ATTRACTIONS,
  }), []);

  const hotelLocation = useMemo(() => 
    JIBHI_ATTRACTIONS.find(location => location.type === 'hotel'),
    []
  );

  const nearbyAttractions = useMemo(() => 
    JIBHI_ATTRACTIONS.filter(location => location.type === 'attraction'),
    []
  );

  const landmarks = useMemo(() => 
    JIBHI_ATTRACTIONS.filter(location => location.type === 'landmark'),
    []
  );

  return {
    mapConfig,
    hotelLocation,
    nearbyAttractions,
    landmarks,
    allLocations: JIBHI_ATTRACTIONS,
  };
};