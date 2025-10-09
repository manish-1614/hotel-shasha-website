'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SimpleImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  onLoadComplete?: () => void;
  onError?: () => void;
}

const SimpleImage: React.FC<SimpleImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  onLoadComplete,
  onError,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setHasError(false);
    onLoadComplete?.();
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${currentSrc}`);
    
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
      onError?.();
    }
  };

  if (hasError && currentSrc === fallbackSrc) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default SimpleImage;