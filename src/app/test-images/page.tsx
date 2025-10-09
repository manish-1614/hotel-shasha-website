'use client';

import React from 'react';
import Image from 'next/image';
import SimpleImage from '@/components/ui/SimpleImage/SimpleImage';

const TestImagesPage = () => {
  const testImages = [
    '/images/rooms/deluxe-valley-1.jpg',
    '/images/rooms/premium-suite-1.jpg',
    '/images/rooms/cottage-1.jpg',
    '/images/rooms/family-garden-1.jpg',
    '/images/rooms/riverside-villa-1.jpg',
    '/images/rooms/mountain-retreat-1.jpg'
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">Image Loading Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testImages.map((imageSrc, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <SimpleImage
                src={imageSrc}
                alt={`Test image ${index + 1}`}
                fill
                className="object-cover"
                onLoadComplete={() => console.log(`✅ Loaded: ${imageSrc}`)}
                onError={() => console.log(`❌ Failed: ${imageSrc}`)}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">Test Image {index + 1}</h3>
              <p className="text-sm text-gray-600">{imageSrc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Direct Next.js Image Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/rooms/deluxe-valley-1.jpg"
              alt="Direct Next.js Image Test"
              fill
              className="object-cover"
              onLoad={() => console.log('✅ Direct Next.js image loaded')}
              onError={() => console.log('❌ Direct Next.js image failed')}
            />
          </div>
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/placeholder.svg"
              alt="Placeholder Test"
              fill
              className="object-cover"
              onLoad={() => console.log('✅ Placeholder loaded')}
              onError={() => console.log('❌ Placeholder failed')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestImagesPage;