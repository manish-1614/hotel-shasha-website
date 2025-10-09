'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SimpleImage from '@/components/ui/SimpleImage/SimpleImage';
import { Room } from '@/types';
import { Button } from '@/components/ui';
import { clsx } from 'clsx';
import { cardHoverVariants, imageHoverVariants, imageOverlayVariants } from '@/utils/animations';

interface RoomCardProps {
  room: Room;
  onViewDetails: (room: Room) => void;
  className?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onViewDetails, className }) => {
  return (
    <motion.div
      className={clsx(
        'bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden',
        'group cursor-pointer',
        className
      )}
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={() => onViewDetails(room)}
    >
      {/* Room Image */}
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        {room.images && room.images.length > 0 ? (
          <div className="relative w-full h-full">
            <motion.div
              className="w-full h-full"
              variants={imageHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <SimpleImage
                src={room.images[0]}
                alt={room.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            
            {/* Image Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-4"
              variants={imageOverlayVariants}
              initial="rest"
              whileHover="hover"
            >
              <motion.span 
                className="text-white font-medium text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                View Details
              </motion.span>
            </motion.div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Room Image</span>
          </div>
        )}
        
        {/* Price Badge */}
        <motion.div 
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-sm font-semibold text-gray-900">
            ₹{room.priceRange.min.toLocaleString()} - ₹{room.priceRange.max.toLocaleString()}
          </span>
        </motion.div>
      </div>

      {/* Room Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif font-semibold text-gray-900 text-xl group-hover:text-primary-600 transition-colors">
            {room.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">👥</span>
            <span>{room.maxOccupancy} guests</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Room Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {room.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700"
              >
                {feature}
              </span>
            ))}
            {room.features.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{room.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Room Size */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Room Size</span>
          <span className="text-sm font-medium text-gray-900">{room.size}</span>
        </div>

        {/* Action Button */}
        <Button 
          variant="outline" 
          size="sm" 
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(room);
          }}
          className="group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default RoomCard;