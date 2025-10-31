'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface HeroProps {
  className?: string;
}

interface HeroMedia {
  type: 'video' | 'image';
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hero media data with videos
  const heroMedia: HeroMedia[] = [
    {
      type: 'video',
      src: '/videos/tirthan-valley.mp4',
      alt: 'Hotel Shasha Valley View - Tirthan Valley',
      title: 'Welcome to Hotel Shasha',
      subtitle: 'Experience Serenity in Jibhi Valley',
    },
    {
      type: 'video',
      src: '/videos/jibhi-waterfall.mp4',
      alt: 'Hotel Shasha Luxury Suite - Jibhi Waterfall',
      title: 'Luxury Mountain Retreat',
      subtitle: 'Comfort Meets Nature',
    },
    {
      type: 'video',
      src: '/videos/jalori-pass.mp4',
      alt: 'Hotel Shasha Dining Experience - Jalori Pass',
      title: 'Authentic Himachali Experience',
      subtitle: 'Taste the Mountains',
    },
  ];

  // Auto-play carousel with longer duration for videos
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
    }, 8000); // Longer duration for videos

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroMedia.length]);

  // Component mount animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroMedia.length) % heroMedia.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleBookNow = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleExploreRooms = () => {
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      const elementPosition = roomsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Keyboard navigation for hero carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== document.body) return; // Only handle when no input is focused

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isAutoPlaying]);

  return (
    <section
      id="home"
      className={`relative overflow-hidden min-h-screen pt-16 lg:pt-20 ${className}`}
      aria-label="Hotel Shasha hero section"
    >
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left Panel - Content */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 order-2 md:order-1 min-h-[50vh] md:min-h-full">
          {/* Subtle background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary-300/20 opacity-50" />

          {/* Desktop edge gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-primary-200/40 z-10 hidden md:block" />

          {/* Mobile bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-primary-200/60 z-10 md:hidden" />

          {/* Content Container */}
          <div
            className={`relative z-20 px-6 sm:px-8 lg:px-12 py-8 md:py-12 text-center md:text-left max-w-lg w-full transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Hotel Logo */}
            <div className="mb-6 md:mb-8">
              <Image
                src="/Shasha_logo-without-background.png"
                alt="Hotel Shasha Logo"
                priority
                width={96}
                height={96}
                className="h-12 sm:h-16 lg:h-20 w-auto mx-auto md:mx-0"
              />
            </div>

            {/* Main Heading */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6 text-primary-900 leading-tight tracking-tight transition-all duration-500"
              key={currentSlide}
            >
              {heroMedia[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-3 md:mb-4 text-primary-800 leading-relaxed max-w-md transition-all duration-500"
              key={`subtitle-${currentSlide}`}
            >
              {heroMedia[currentSlide].subtitle}
            </p>

            {/* Location */}
            <p className="text-sm sm:text-base md:text-lg text-primary-700 mb-8 md:mb-10 leading-relaxed font-medium tracking-wide">
              Nestled in the Heart of Jibhi Valley, Himachal Pradesh
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start items-stretch sm:items-center">
              <Button
                type="button"
                size="lg"
                onClick={handleBookNow}
                className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg hover:scale-105"
                aria-label="Book your stay at Hotel Shasha"
              >
                Book Your Stay
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleExploreRooms}
                className="w-full sm:w-auto border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 text-base font-semibold transition-all duration-300 rounded-lg backdrop-blur-sm bg-white/80 hover:scale-105"
                aria-label="Explore hotel rooms"
              >
                Explore Rooms
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Video Carousel */}
        <div className="relative overflow-hidden order-1 md:order-2 min-h-[50vh] md:min-h-full">
          {/* Video Carousel Container */}
          <div className="absolute inset-0">
            {heroMedia.map((media, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                {media.type === 'video' ? (
                  <video
                    src={media.src}
                    autoPlay={index === currentSlide}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label={media.alt}
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="absolute inset-0 z-20">
            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next video"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
              {heroMedia.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                    index === currentSlide
                      ? 'bg-white shadow-lg'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play control */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2.5 text-white hover:bg-black/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>

            {/* Mobile title overlay */}
            <div className="absolute bottom-16 left-4 right-4 text-white md:hidden">
              <h3
                className="text-lg font-semibold mb-1 drop-shadow-lg transition-all duration-500"
                key={`mobile-title-${currentSlide}`}
              >
                {heroMedia[currentSlide].title}
              </h3>
              <p
                className="text-sm text-white/90 drop-shadow-md transition-all duration-500"
                key={`mobile-subtitle-${currentSlide}`}
              >
                {heroMedia[currentSlide].subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
