'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Attraction } from '@/types';
import AttractionCard from './AttractionCard';

import { useParallax } from '@/hooks/useParallax';
import { useMapData } from '@/hooks/useMapData';
import ClientOnly from '@/components/ui/ClientOnly/ClientOnly';
import { Map } from '@/components/ui';
import MapLegend from './MapLegend';
import MapControls from './MapControls';
import styles from './Location.module.css';

// Placeholder attraction data for Jibhi area
const attractionsData: Attraction[] = [
  {
    id: '1',
    name: 'Jibhi Waterfall',
    description:
      'A stunning cascade hidden in the dense forest, perfect for nature photography and peaceful meditation. The trek to the waterfall offers breathtaking views of the valley.',
    image: '/images/attractions/jibhi-waterfall.jpg',
    distance: '2 km',
    category: 'nature',
    activities: ['Trekking', 'Photography', 'Nature Walk', 'Meditation'],
  },
  {
    id: '2',
    name: 'Serolsar Lake',
    description:
      'A pristine high-altitude lake surrounded by dense deodar forests. Legend says the lake has healing properties and is considered sacred by locals.',
    image: '/images/attractions/serolsar-lake.jpg',
    distance: '5 km',
    category: 'nature',
    activities: ['Trekking', 'Camping', 'Bird Watching', 'Photography'],
  },
  {
    id: '3',
    name: 'Chehni Kothi',
    description:
      "An ancient 1500-year-old tower built in traditional Himachali architecture. This historical monument offers insights into the region's rich cultural heritage.",
    image: '/images/attractions/chehni-kothi.jpg',
    distance: '8 km',
    category: 'cultural',
    activities: [
      'Heritage Walk',
      'Photography',
      'Cultural Tour',
      'Architecture Study',
    ],
  },
  {
    id: '4',
    name: 'Jalori Pass',
    description:
      'A high mountain pass offering panoramic views of the Himalayas. Popular among adventure enthusiasts for trekking and as a gateway to various trails.',
    image: '/images/attractions/jalori-pass.jpg',
    distance: '12 km',
    category: 'adventure',
    activities: [
      'Mountain Biking',
      'Trekking',
      'Scenic Drive',
      'Sunrise Viewing',
    ],
  },
  {
    id: '5',
    name: 'Raghupur Fort',
    description:
      'Ancient ruins of a fort perched on a hilltop, offering spectacular views of the Tirthan Valley. A perfect spot for history enthusiasts and photographers.',
    image: '/images/attractions/raghupur-fort.jpg',
    distance: '6 km',
    category: 'cultural',
    activities: ['Historical Tour', 'Photography', 'Hiking', 'Sunset Viewing'],
  },
  {
    id: '6',
    name: 'Tirthan River',
    description:
      'Crystal clear river flowing through the valley, perfect for trout fishing and riverside camping. The river offers a serene environment for relaxation.',
    image: '/images/attractions/tirthan-river.jpg',
    distance: '3 km',
    category: 'nature',
    activities: ['Trout Fishing', 'River Rafting', 'Camping', 'Picnicking'],
  },
  {
    id: '7',
    name: 'Shringa Rishi Temple',
    description:
      'An ancient temple dedicated to Sage Shringa, featuring traditional Himachali architecture and spiritual significance for the local community.',
    image: '/images/attractions/shringa-rishi-temple.jpg',
    distance: '4 km',
    category: 'religious',
    activities: [
      'Temple Visit',
      'Spiritual Tour',
      'Cultural Experience',
      'Photography',
    ],
  },
  {
    id: '8',
    name: 'Great Himalayan National Park',
    description:
      'A UNESCO World Heritage site home to diverse flora and fauna. Perfect for wildlife enthusiasts and nature lovers seeking pristine wilderness.',
    image: '/images/attractions/ghnp.jpg',
    distance: '15 km',
    category: 'nature',
    activities: [
      'Wildlife Safari',
      'Bird Watching',
      'Nature Photography',
      'Eco-trekking',
    ],
  },
];

const Location: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMarkerId, setSelectedMarkerId] = useState<string>('');

  // Parallax effects for different elements
  const { ref: sectionRef, y: backgroundY } = useParallax({ speed: 0.3 });
  const { ref: overviewRef, y: overviewY } = useParallax({ speed: 0.2 });

  // Map data
  const { mapConfig } = useMapData();

  const handleMarkerSelect = (markerId: string) => {
    setSelectedMarkerId(markerId);
  };

  const categories = [
    { id: 'all', name: 'All Attractions', icon: '🏔️' },
    { id: 'nature', name: 'Nature', icon: '🌲' },
    { id: 'adventure', name: 'Adventure', icon: '⛰️' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️' },
    { id: 'religious', name: 'Religious', icon: '🕉️' },
  ];

  const filteredAttractions =
    selectedCategory === 'all'
      ? attractionsData
      : attractionsData.filter(
          (attraction) => attraction.category === selectedCategory
        );

  return (
    <section id="location" ref={sectionRef} className={styles.locationSection}>
      {/* Parallax Background Elements */}
      <ClientOnly>
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary-200 to-forest-200 rounded-full blur-xl" />
          <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-full blur-lg" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-forest-200 to-secondary-200 rounded-full blur-2xl" />
        </motion.div>
      </ClientOnly>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Discover Jibhi Valley</h2>
          <p className={styles.sectionDescription}>
            Nestled in the heart of Himachal Pradesh, Jibhi offers a perfect
            blend of natural beauty, cultural heritage, and adventure
            activities. Explore the pristine landscapes and rich traditions of
            this hidden gem in the Himalayas.
          </p>
        </div>

        {/* Location Overview with Parallax */}
        <ClientOnly
          fallback={
            <div className={styles.locationOverview}>
              <div className={styles.overviewContent}>
                <div className={styles.overviewText}>
                  <h3 className={styles.overviewTitle}>
                    The Hidden Paradise of Himachal
                  </h3>
                  <p className={styles.overviewDescription}>
                    Jibhi Valley is a serene hamlet located in the Banjar region
                    of Himachal Pradesh, surrounded by dense deodar forests and
                    snow-capped peaks. This untouched paradise offers a perfect
                    escape from city life, with crystal-clear streams, ancient
                    temples, and warm hospitality that defines the mountain
                    culture.
                  </p>
                  <div className={styles.locationHighlights}>
                    <div className={styles.highlight}>
                      <span className={styles.highlightIcon}>🏔️</span>
                      <span>Altitude: 1,600m above sea level</span>
                    </div>
                    <div className={styles.highlight}>
                      <span className={styles.highlightIcon}>🌡️</span>
                      <span>Climate: Pleasant year-round</span>
                    </div>
                    <div className={styles.highlight}>
                      <span className={styles.highlightIcon}>🚗</span>
                      <span>Distance from Delhi: 520 km</span>
                    </div>
                    <div className={styles.highlight}>
                      <span className={styles.highlightIcon}>✈️</span>
                      <span>Nearest Airport: Bhuntar (60 km)</span>
                    </div>
                  </div>
                </div>
                <div className={styles.mapContainer}>
                  <div className={styles.mapPlaceholder}>
                    <div className={styles.mapIcon}>🗺️</div>
                    <p className={styles.mapText}>Loading Interactive Map</p>
                    <p className={styles.mapSubtext}>Please wait...</p>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <motion.div
            ref={overviewRef}
            className={styles.locationOverview}
            style={{ y: overviewY }}
          >
            <div className={styles.overviewContent}>
              <motion.div
                className={styles.overviewText}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className={styles.overviewTitle}>
                  The Hidden Paradise of Himachal
                </h3>
                <p className={styles.overviewDescription}>
                  Jibhi Valley is a serene hamlet located in the Banjar region
                  of Himachal Pradesh, surrounded by dense deodar forests and
                  snow-capped peaks. This untouched paradise offers a perfect
                  escape from city life, with crystal-clear streams, ancient
                  temples, and warm hospitality that defines the mountain
                  culture.
                </p>
                <div className={styles.locationHighlights}>
                  <motion.div
                    className={styles.highlight}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className={styles.highlightIcon}>🏔️</span>
                    <span>Altitude: 1,600m above sea level</span>
                  </motion.div>
                  <motion.div
                    className={styles.highlight}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className={styles.highlightIcon}>🌡️</span>
                    <span>Climate: Pleasant year-round</span>
                  </motion.div>
                  <motion.div
                    className={styles.highlight}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <span className={styles.highlightIcon}>🚗</span>
                    <span>Distance from Delhi: 520 km</span>
                  </motion.div>
                  <motion.div
                    className={styles.highlight}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <span className={styles.highlightIcon}>✈️</span>
                    <span>Nearest Airport: Bhuntar (60 km)</span>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className={styles.mapContainer}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <ClientOnly
                  fallback={
                    <div className={styles.mapPlaceholder}>
                      <div className={styles.mapIcon}>🗺️</div>
                      <p className={styles.mapText}>Loading Interactive Map</p>
                      <p className={styles.mapSubtext}>Please wait...</p>
                    </div>
                  }
                >
                  <div className={styles.mapSection}>
                    <div className={styles.mapWrapper}>
                      <Map
                        center={mapConfig.center}
                        zoom={mapConfig.zoom}
                        markers={mapConfig.markers}
                        height="400px"
                        className={styles.interactiveMap}
                        selectedMarkerId={selectedMarkerId}
                        onMarkerClick={handleMarkerSelect}
                      />
                    </div>
                    <div className={styles.mapSidebar}>
                      <MapLegend />
                      <MapControls
                        markers={mapConfig.markers}
                        onMarkerSelect={handleMarkerSelect}
                        selectedMarkerId={selectedMarkerId}
                      />
                    </div>
                  </div>
                </ClientOnly>
              </motion.div>
            </div>
          </motion.div>
        </ClientOnly>

        {/* Category Filter */}
        <div className={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.id
                  ? styles.categoryButtonActive
                  : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Attractions Grid */}
        <div className={styles.attractionsGrid}>
          {filteredAttractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

        {/* Additional Information */}
        <div className={styles.additionalInfo}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Plan Your Adventure</h3>
            <p className={styles.infoDescription}>
              Our concierge team can help you plan the perfect itinerary based
              on your interests and fitness level. From gentle nature walks to
              challenging treks, we&apos;ll ensure you experience the best of Jibhi
              Valley.
            </p>
            <div className={styles.infoFeatures}>
              <span className={styles.infoFeature}>
                <span className={styles.featureDot}></span>
                Guided Tours Available
              </span>
              <span className={styles.infoFeature}>
                <span className={styles.featureDot}></span>
                Transportation Arrangements
              </span>
              <span className={styles.infoFeature}>
                <span className={styles.featureDot}></span>
                Equipment Rental
              </span>
              <span className={styles.infoFeature}>
                <span className={styles.featureDot}></span>
                Local Guide Services
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
