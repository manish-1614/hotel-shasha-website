'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Room } from '@/types';
import RoomCard from './RoomCard';
import RoomDetailModal from './RoomDetailModal';
import { AnimatedSection } from '@/components/ui';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

// Placeholder room data
const roomsData: Room[] = [
  {
    id: '1',
    name: 'Deluxe Valley View',
    description: 'Spacious rooms with panoramic valley views, modern amenities, and traditional Himachali decor. Perfect for couples seeking a romantic getaway with stunning mountain vistas.',
    images: [
      '/images/rooms/deluxe-valley-1.jpg',
      '/images/rooms/deluxe-valley-2.jpg',
      '/images/rooms/deluxe-valley-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Mini Bar',
      'Room Service',
      'Tea/Coffee Maker',
      'Safe Deposit Box',
      'Hair Dryer',
      'Complimentary Toiletries'
    ],
    maxOccupancy: 2,
    size: '350 sq ft',
    priceRange: {
      min: 4500,
      max: 6500,
      currency: 'INR'
    },
    features: [
      'King Size Bed',
      'Valley View',
      'Private Balcony',
      'Traditional Decor',
      'Mountain Views',
      'Wooden Flooring'
    ]
  },
  {
    id: '2',
    name: 'Premium Mountain Suite',
    description: 'Luxurious suites with separate living area, mountain views, and premium furnishings. Ideal for families or guests who prefer extra space and comfort.',
    images: [
      '/images/rooms/premium-suite-1.jpg',
      '/images/rooms/premium-suite-2.jpg',
      '/images/rooms/premium-suite-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Mini Bar',
      '24/7 Room Service',
      'Tea/Coffee Maker',
      'Safe Deposit Box',
      'Hair Dryer',
      'Premium Toiletries',
      'Bathrobe & Slippers',
      'Welcome Fruit Basket'
    ],
    maxOccupancy: 4,
    size: '550 sq ft',
    priceRange: {
      min: 7500,
      max: 9500,
      currency: 'INR'
    },
    features: [
      'Separate Living Area',
      'Mountain View',
      'Premium Amenities',
      'King Size Bed',
      'Sofa Bed',
      'Large Balcony',
      'Luxury Furnishing'
    ]
  },
  {
    id: '3',
    name: 'Traditional Cottage',
    description: 'Authentic wooden cottages with traditional architecture and modern comfort. Experience the charm of Himachali culture while enjoying contemporary amenities.',
    images: [
      '/images/rooms/cottage-1.jpg',
      '/images/rooms/cottage-2.jpg',
      '/images/rooms/cottage-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Heating',
      'Tea/Coffee Maker',
      'Room Service',
      'Safe Deposit Box',
      'Hair Dryer',
      'Complimentary Toiletries',
      'Fireplace'
    ],
    maxOccupancy: 3,
    size: '400 sq ft',
    priceRange: {
      min: 5500,
      max: 7500,
      currency: 'INR'
    },
    features: [
      'Wooden Architecture',
      'Garden View',
      'Fireplace',
      'Traditional Decor',
      'Queen Size Bed',
      'Private Entrance',
      'Rustic Charm'
    ]
  },
  {
    id: '4',
    name: 'Family Garden Room',
    description: 'Spacious family rooms overlooking the beautiful gardens, perfect for families with children. Features connecting rooms and child-friendly amenities.',
    images: [
      '/images/rooms/family-garden-1.jpg',
      '/images/rooms/family-garden-2.jpg',
      '/images/rooms/family-garden-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Mini Fridge',
      'Room Service',
      'Tea/Coffee Maker',
      'Safe Deposit Box',
      'Hair Dryer',
      'Complimentary Toiletries',
      'Baby Cot (on request)',
      'Children\'s Amenities'
    ],
    maxOccupancy: 5,
    size: '450 sq ft',
    priceRange: {
      min: 6000,
      max: 8000,
      currency: 'INR'
    },
    features: [
      'Garden View',
      'Family Friendly',
      'Twin Beds',
      'Extra Bed Available',
      'Child Safety Features',
      'Play Area Access',
      'Connecting Rooms'
    ]
  },
  {
    id: '5',
    name: 'Luxury Riverside Villa',
    description: 'Exclusive riverside villas with private access to the stream, offering the ultimate in privacy and luxury. Perfect for special occasions and honeymoons.',
    images: [
      '/images/rooms/riverside-villa-1.jpg',
      '/images/rooms/riverside-villa-2.jpg',
      '/images/rooms/riverside-villa-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Mini Bar',
      '24/7 Butler Service',
      'Tea/Coffee Maker',
      'Safe Deposit Box',
      'Hair Dryer',
      'Premium Toiletries',
      'Bathrobe & Slippers',
      'Welcome Champagne',
      'Private Dining',
      'Jacuzzi'
    ],
    maxOccupancy: 2,
    size: '650 sq ft',
    priceRange: {
      min: 12000,
      max: 15000,
      currency: 'INR'
    },
    features: [
      'Riverside Location',
      'Private Stream Access',
      'Luxury Amenities',
      'King Size Bed',
      'Private Deck',
      'Jacuzzi',
      'Butler Service',
      'Premium Location'
    ]
  },
  {
    id: '6',
    name: 'Cozy Mountain Retreat',
    description: 'Intimate mountain retreat rooms perfect for solo travelers or couples seeking tranquility. Features stunning mountain views and cozy interiors.',
    images: [
      '/images/rooms/mountain-retreat-1.jpg',
      '/images/rooms/mountain-retreat-2.jpg',
      '/images/rooms/mountain-retreat-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Heating',
      'Tea/Coffee Maker',
      'Room Service',
      'Safe Deposit Box',
      'Hair Dryer',
      'Complimentary Toiletries',
      'Reading Nook'
    ],
    maxOccupancy: 2,
    size: '300 sq ft',
    priceRange: {
      min: 3500,
      max: 5000,
      currency: 'INR'
    },
    features: [
      'Mountain Views',
      'Cozy Interiors',
      'Reading Nook',
      'Queen Size Bed',
      'Compact Design',
      'Budget Friendly',
      'Solo Traveler Friendly'
    ]
  }
];

const Rooms: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection animation="slideUp" className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Rooms & Suites
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience comfort and luxury in our thoughtfully designed accommodations, 
            each offering stunning views of the Jibhi Valley and surrounding mountains.
          </p>
        </AnimatedSection>

        {/* Rooms Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {roomsData.map((room) => (
            <motion.div
              key={room.id}
              variants={staggerItemVariants}
            >
              <RoomCard
                room={room}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <AnimatedSection animation="fadeIn" delay={0.3} className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            All rooms include complimentary breakfast, WiFi, and access to hotel amenities.
          </p>
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              'Free Cancellation',
              'Best Price Guarantee',
              '24/7 Support'
            ].map((feature) => (
              <motion.span
                key={feature}
                className="flex items-center"
                variants={staggerItemVariants}
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Rooms;