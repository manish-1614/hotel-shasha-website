'use client';

import React from 'react';
import { Amenity } from '@/types';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import SimpleImage from '@/components/ui/SimpleImage/SimpleImage';

interface AmenityDetailModalProps {
  amenity: Amenity | null;
  isOpen: boolean;
  onClose: () => void;
}

const AmenityDetailModal: React.FC<AmenityDetailModalProps> = ({
  amenity,
  isOpen,
  onClose
}) => {
  if (!amenity) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-xl" role="img" aria-label={amenity.name}>
              {amenity.icon}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              {amenity.name}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              {amenity.isComplimentary && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-forest-100 text-forest-800">
                  Complimentary
                </span>
              )}
              {amenity.bookingRequired && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                  Booking Required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Image */}
        {amenity.image && (
          <div className="mb-6 relative h-64 rounded-lg overflow-hidden">
            <SimpleImage
              src={amenity.image}
              alt={amenity.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {amenity.description}
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Operating Hours */}
          {amenity.operatingHours && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Operating Hours</h3>
              <p className="text-gray-600">{amenity.operatingHours}</p>
            </div>
          )}

          {/* Booking Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Booking</h3>
            <p className="text-gray-600">
              {amenity.bookingRequired 
                ? 'Advance booking required. Contact our concierge for reservations.'
                : 'No booking required. Available for all guests.'
              }
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
            <p className="text-gray-600">
              {amenity.isComplimentary 
                ? 'Complimentary for all hotel guests'
                : 'Additional charges apply. Please contact reception for current rates.'
              }
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
            <p className="text-gray-600">
              For more details or special arrangements, please contact our concierge team 
              who will be happy to assist you.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {amenity.bookingRequired && (
            <Button variant="primary">
              Book Now
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AmenityDetailModal;