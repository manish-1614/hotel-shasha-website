'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SimpleImage from '@/components/ui/SimpleImage/SimpleImage';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
  thumbnailClassName?: string;
  priority?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  alt,
  className = '',
  thumbnailClassName = '',
  priority = false
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImageIndex !== null) {
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

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid gap-4 ${className}`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative cursor-pointer overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 ${thumbnailClassName}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            aria-label={`Open image ${index + 1} of ${images.length} in gallery`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <SimpleImage
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority={priority && index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label={`Image gallery - ${alt} - Image ${selectedImageIndex + 1} of ${images.length}`}
            aria-describedby="gallery-instructions"
          >
            <div id="gallery-instructions" className="sr-only">
              Use arrow keys to navigate between images, or press Escape to close the gallery.
            </div>
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full"
              onClick={closeLightbox}
              aria-label="Close image gallery"
              title="Close gallery (Escape)"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label={`Previous image - ${selectedImageIndex > 0 ? selectedImageIndex : images.length} of ${images.length}`}
                  title="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label={`Next image - ${selectedImageIndex < images.length - 1 ? selectedImageIndex + 2 : 1} of ${images.length}`}
                  title="Next image"
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
                src={images[selectedImageIndex]}
                alt={`${alt} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                priority
                sizes="90vw"
              />
            </motion.div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
                {selectedImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2 max-w-[90vw] overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                      index === selectedImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                    aria-label={`View image ${index + 1} of ${images.length}`}
                    aria-current={index === selectedImageIndex ? 'true' : 'false'}
                    title={`Image ${index + 1}`}
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

export default ImageGallery;