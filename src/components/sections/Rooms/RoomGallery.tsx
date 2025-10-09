'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleImage from '@/components/ui/SimpleImage/SimpleImage';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface RoomGalleryProps {
  images: string[];
  roomName: string;
  className?: string;
}

const RoomGallery: React.FC<RoomGalleryProps> = ({
  images,
  roomName,
  className = ''
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const openLightbox = (index?: number) => {
    if (index !== undefined) {
      setCurrentImageIndex(index);
    }
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLightboxOpen) {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-lg">No images available</span>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery Display */}
      <div className={`relative ${className}`}>
        {/* Primary Image */}
        <div className="relative h-80 bg-gray-100 group cursor-pointer" onClick={() => openLightbox()}>
          <SimpleImage
            src={images[currentImageIndex]}
            alt={`${roomName} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          
          {/* Overlay with Gallery Button */}
          <motion.div
            className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center"
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
            >
              <span className="text-gray-900 font-medium flex items-center">
                <Maximize2 className="w-5 h-5 mr-2" />
                View Gallery ({images.length} photos)
              </span>
            </motion.div>
          </motion.div>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
        
        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  index === currentImageIndex 
                    ? 'ring-2 ring-primary-500 scale-105' 
                    : 'opacity-70 hover:opacity-90'
                }`}
              >
                <SimpleImage
                  src={image}
                  alt={`${roomName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Main Image */}
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh] w-full h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SimpleImage
                src={images[currentImageIndex]}
                alt={`${roomName} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
                sizes="90vw"
              />
            </motion.div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2 max-w-[90vw] overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 ${
                      index === currentImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                  >
                    <SimpleImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoomGallery;