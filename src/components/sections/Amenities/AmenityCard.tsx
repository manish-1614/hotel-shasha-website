'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Amenity } from '@/types';
import SimpleImage from '@/components/ui/SimpleImage/SimpleImage';
import Card from '@/components/ui/Card/Card';
import { cardHoverVariants, iconHoverVariants } from '@/utils/animations';

interface AmenityCardProps {
  amenity: Amenity;
  onViewDetails?: (amenity: Amenity) => void;
}

const AmenityCard: React.FC<AmenityCardProps> = ({ amenity, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(amenity);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div 
      onClick={handleCardClick} 
      className="cursor-pointer"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        hover 
        className="h-full flex flex-col"
      >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <motion.div 
          className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
          variants={iconHoverVariants}
          initial="rest"
          whileHover="hover"
          style={{
            background: 'linear-gradient(135deg, var(--primary-100), var(--primary-200))',
          }}
        >
          <motion.span 
            className="text-2xl" 
            role="img" 
            aria-label={amenity.name}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          >
            {amenity.icon}
          </motion.span>
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-serif font-semibold text-gray-900 text-center mb-3">
        {amenity.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-center mb-4 flex-grow">
        {amenity.description}
      </p>

      {/* Additional Info */}
      <div className="space-y-2">
        {/* Complimentary Badge */}
        {amenity.isComplimentary && (
          <div className="flex justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-forest-100 text-forest-800">
              Complimentary
            </span>
          </div>
        )}

        {/* Operating Hours */}
        {amenity.operatingHours && (
          <div className="text-sm text-gray-500 text-center">
            <span className="font-medium">Hours:</span> {amenity.operatingHours}
          </div>
        )}

        {/* Booking Required */}
        {amenity.bookingRequired && (
          <div className="text-sm text-secondary-600 text-center font-medium">
            Advance booking required
          </div>
        )}
      </div>

      {/* Expandable Content */}
      {isExpanded && amenity.image && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="relative w-full h-32 rounded-lg overflow-hidden">
            <SimpleImage
              src={amenity.image}
              alt={amenity.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}

      {/* View Details Button */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button type="button" className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200">
          {isExpanded ? 'Show Less' : 'Learn More'}
        </button>
      </div>
    </Card>
    </motion.div>
  );
};

export default AmenityCard;