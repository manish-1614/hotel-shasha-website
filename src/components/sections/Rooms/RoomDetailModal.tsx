'use client';

import React from 'react';
import { Room } from '@/types';
import { Modal, Button } from '@/components/ui';
import RoomGallery from './RoomGallery';

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  isOpen,
  onClose
}) => {
  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="max-h-[90vh] overflow-y-auto">
        {/* Room Gallery */}
        <RoomGallery 
          images={room.images} 
          roomName={room.name}
          className="mb-0"
        />

        {/* Room Details */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-serif font-bold text-3xl text-gray-900 mb-2">
                {room.name}
              </h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="flex items-center">
                  <span className="mr-1">👥</span>
                  Up to {room.maxOccupancy} guests
                </span>
                <span className="flex items-center">
                  <span className="mr-1">📐</span>
                  {room.size}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                ₹{room.priceRange.min.toLocaleString()} - ₹{room.priceRange.max.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">per night</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 text-lg mb-3">About this room</h3>
            <p className="text-gray-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Room Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {room.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">
              Book Now
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              Check Availability
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoomDetailModal;