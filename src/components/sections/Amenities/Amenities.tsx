'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Amenity } from '@/types';
import AmenityCard from './AmenityCard';
import AmenityDetailModal from './AmenityDetailModal';
import { AnimatedSection } from '@/components/ui';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';
import styles from './Amenities.module.css';

// Placeholder amenity data
const amenitiesData: Amenity[] = [
  {
    id: '1',
    name: 'Spa & Wellness Center',
    description: 'Rejuvenate your body and mind with our traditional Ayurvedic treatments and modern wellness therapies in a serene mountain setting.',
    icon: '🧘‍♀️',
    image: '/images/amenities/spa-wellness.svg',
    isComplimentary: false,
    operatingHours: '9:00 AM - 8:00 PM',
    bookingRequired: true
  },
  {
    id: '2',
    name: 'Outdoor Swimming Pool',
    description: 'Take a refreshing dip in our heated outdoor pool while enjoying panoramic views of the Jibhi Valley and surrounding mountains.',
    icon: '🏊‍♂️',
    image: '/images/amenities/swimming-pool.svg',
    isComplimentary: true,
    operatingHours: '6:00 AM - 10:00 PM',
    bookingRequired: false
  },
  {
    id: '3',
    name: 'Fitness Center',
    description: 'Stay active during your stay with our fully equipped fitness center featuring modern cardio and strength training equipment.',
    icon: '💪',
    image: '/images/amenities/fitness-center.svg',
    isComplimentary: true,
    operatingHours: '24 Hours',
    bookingRequired: false
  },
  {
    id: '4',
    name: 'Adventure Activities',
    description: 'Explore the great outdoors with guided trekking, river rafting, paragliding, and mountain biking adventures.',
    icon: '🏔️',
    image: '/images/amenities/adventure-activities.svg',
    isComplimentary: false,
    operatingHours: '6:00 AM - 6:00 PM',
    bookingRequired: true
  },
  {
    id: '5',
    name: 'Library & Reading Lounge',
    description: 'Unwind with a good book in our cozy library featuring a collection of travel guides, local history, and contemporary literature.',
    icon: '📚',
    image: '/images/amenities/library-lounge.svg',
    isComplimentary: true,
    operatingHours: '24 Hours',
    bookingRequired: false
  },
  {
    id: '6',
    name: 'Conference Hall',
    description: 'Host your business meetings or special events in our well-equipped conference hall with modern AV facilities and mountain views.',
    icon: '🏢',
    image: '/images/amenities/conference-hall.svg',
    isComplimentary: false,
    operatingHours: '8:00 AM - 10:00 PM',
    bookingRequired: true
  },
  {
    id: '7',
    name: 'Kids Play Area',
    description: 'A safe and fun outdoor play area for children with swings, slides, and games, surrounded by beautiful gardens.',
    icon: '🎪',
    image: '/images/amenities/kids-play-area.svg',
    isComplimentary: true,
    operatingHours: '8:00 AM - 8:00 PM',
    bookingRequired: false
  },
  {
    id: '8',
    name: 'Yoga & Meditation Deck',
    description: 'Find inner peace on our dedicated yoga deck overlooking the valley, perfect for morning meditation and evening yoga sessions.',
    icon: '🕉️',
    image: '/images/amenities/yoga-deck.svg',
    isComplimentary: true,
    operatingHours: '5:00 AM - 9:00 PM',
    bookingRequired: false
  },
  {
    id: '9',
    name: 'Bonfire Area',
    description: 'Gather around our cozy bonfire area in the evenings for storytelling, music, and stargazing under the clear mountain sky.',
    icon: '🔥',
    image: '/images/amenities/bonfire-area.svg',
    isComplimentary: true,
    operatingHours: '6:00 PM - 11:00 PM',
    bookingRequired: false
  },
  {
    id: '10',
    name: 'Laundry & Dry Cleaning',
    description: 'Professional laundry and dry cleaning services to keep your clothes fresh throughout your stay.',
    icon: '👔',
    image: '/images/amenities/laundry-service.svg',
    isComplimentary: false,
    operatingHours: '8:00 AM - 6:00 PM',
    bookingRequired: false
  },
  {
    id: '11',
    name: 'Concierge Services',
    description: 'Our knowledgeable concierge team is available to help you plan local excursions, book transportation, and arrange special experiences.',
    icon: '🛎️',
    image: '/images/amenities/concierge-services.svg',
    isComplimentary: true,
    operatingHours: '24 Hours',
    bookingRequired: false
  },
  {
    id: '12',
    name: 'Gift Shop',
    description: 'Browse our curated selection of local handicrafts, souvenirs, and artisanal products to take home a piece of Himachal Pradesh.',
    icon: '🎁',
    image: '/images/amenities/gift-shop.svg',
    isComplimentary: false,
    operatingHours: '9:00 AM - 9:00 PM',
    bookingRequired: false
  }
];

const Amenities: React.FC = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAmenity(null);
  };

  // Group amenities by category for better organization
  const groupedAmenities = {
    wellness: amenitiesData.filter(a => ['1', '2', '3', '8'].includes(a.id)),
    activities: amenitiesData.filter(a => ['4', '7', '9'].includes(a.id)),
    services: amenitiesData.filter(a => ['5', '6', '10', '11', '12'].includes(a.id))
  };

  return (
    <section id="amenities" className={styles.amenitiesSection}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection animation="slideUp" className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Amenities & Services
          </h2>
          <p className={styles.sectionDescription}>
            Discover a world of comfort and convenience with our comprehensive range of 
            amenities designed to enhance your stay in the heart of Jibhi.
          </p>
        </AnimatedSection>

        {/* Wellness & Recreation */}
        <AnimatedSection animation="fadeIn" delay={0.2} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>
            Wellness & Recreation
          </h3>
          <motion.div 
            className={`${styles.amenitiesGrid} ${styles.wellnessGrid}`}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {groupedAmenities.wellness.map((amenity) => (
              <motion.div key={amenity.id} variants={staggerItemVariants}>
                <AmenityCard
                  amenity={amenity}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Activities & Entertainment */}
        <AnimatedSection animation="fadeIn" delay={0.4} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>
            Activities & Entertainment
          </h3>
          <motion.div 
            className={`${styles.amenitiesGrid} ${styles.activitiesGrid}`}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {groupedAmenities.activities.map((amenity) => (
              <motion.div key={amenity.id} variants={staggerItemVariants}>
                <AmenityCard
                  amenity={amenity}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Services & Facilities */}
        <AnimatedSection animation="fadeIn" delay={0.6} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>
            Services & Facilities
          </h3>
          <motion.div 
            className={`${styles.amenitiesGrid} ${styles.servicesGrid}`}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {groupedAmenities.services.map((amenity) => (
              <motion.div key={amenity.id} variants={staggerItemVariants}>
                <AmenityCard
                  amenity={amenity}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Additional Information */}
        <AnimatedSection animation="slideUp" delay={0.8} className={styles.additionalInfo}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              Need Something Special?
            </h3>
            <p className={styles.infoDescription}>
              Our concierge team is available 24/7 to arrange additional services, 
              local experiences, and special requests to make your stay unforgettable.
            </p>
            <motion.div 
              className={styles.infoFeatures}
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                '24/7 Concierge Service',
                'Custom Experience Planning',
                'Local Activity Booking',
                'Transportation Arrangements'
              ].map((feature) => (
                <motion.span
                  key={feature}
                  className={styles.infoFeature}
                  variants={staggerItemVariants}
                >
                  <span className={styles.featureDot}></span>
                  {feature}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      </div>

      {/* Amenity Detail Modal */}
      <AmenityDetailModal
        amenity={selectedAmenity}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Amenities;