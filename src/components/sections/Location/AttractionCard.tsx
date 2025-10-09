'use client';

import React from 'react';
import { Attraction } from '@/types';
import Card from '@/components/ui/Card/Card';
import SimpleImage from '@/components/ui/SimpleImage/SimpleImage';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nature':
        return 'bg-forest-100 text-forest-800';
      case 'adventure':
        return 'bg-secondary-100 text-secondary-800';
      case 'cultural':
        return 'bg-primary-100 text-primary-800';
      case 'religious':
        return 'bg-mountain-100 text-mountain-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nature':
        return '🌲';
      case 'adventure':
        return '⛰️';
      case 'cultural':
        return '🏛️';
      case 'religious':
        return '🕉️';
      default:
        return '📍';
    }
  };

  return (
    <div className="cursor-pointer" onClick={() => {/* Handle attraction details */}}>
      <Card hover className="h-full flex flex-col overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
        <SimpleImage
          src={attraction.image}
          alt={attraction.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(attraction.category)}`}>
            <span className="mr-1">{getCategoryIcon(attraction.category)}</span>
            {attraction.category.charAt(0).toUpperCase() + attraction.category.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-gray-800">
            📍 {attraction.distance}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
          {attraction.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {attraction.description}
        </p>

        {/* Activities */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Activities:</h4>
          <div className="flex flex-wrap gap-1">
            {attraction.activities.slice(0, 3).map((activity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
              >
                {activity}
              </span>
            ))}
            {attraction.activities.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                +{attraction.activities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button 
            type="button"
            className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200 flex items-center justify-center"
          >
            <span className="mr-1">🗺️</span>
            Get Directions
          </button>
        </div>
      </div>
      </Card>
    </div>
  );
};

export default AttractionCard;