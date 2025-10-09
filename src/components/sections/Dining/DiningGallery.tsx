'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui';
import SimpleImage from '@/components/ui/SimpleImage/SimpleImage';

interface DiningGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const DiningGallery: React.FC<DiningGalleryProps> = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const imageDescriptions = [
    'Restaurant Interior - Cozy dining space with valley views',
    'Elegant Dining Area - Traditional decor meets modern comfort',
    'Signature Dish - Himachali Dham traditional feast',
    'Chef at Work - Fresh preparation with local ingredients',
    'Outdoor Dining - Al fresco dining with mountain backdrop',
    'Local Ingredients - Fresh organic produce from nearby farms',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <div className="relative w-full h-full bg-black flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black bg-opacity-50 text-white">
          <div>
            <h3 className="text-lg font-semibold">Dining Gallery</h3>
            <p className="text-sm text-gray-300">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            aria-label="Close gallery"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Main Image Display */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Current Image */}
          <div className="max-w-full max-h-full flex items-center justify-center">
            <div className="relative bg-gray-200 rounded-lg overflow-hidden max-w-4xl max-h-[70vh] aspect-video">
              <SimpleImage
                src={images[currentIndex]}
                alt={imageDescriptions[currentIndex]}
                fill
                className="object-cover"
                priority
                sizes="80vw"
              />
            </div>
          </div>
        </div>

        {/* Image Description */}
        <div className="p-4 bg-black bg-opacity-50 text-white text-center">
          <p className="text-lg">{imageDescriptions[currentIndex]}</p>
        </div>

        {/* Thumbnail Navigation */}
        <div className="p-4 bg-black bg-opacity-50">
          <div className="flex justify-center space-x-2 overflow-x-auto">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-white'
                    : 'border-transparent hover:border-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              >
                <SimpleImage
                  src={images[index]}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="p-2 bg-black bg-opacity-30 text-center text-gray-300 text-sm">
          Use arrow keys to navigate • Press ESC to close
        </div>
      </div>
    </Modal>
  );
};

export default DiningGallery;
