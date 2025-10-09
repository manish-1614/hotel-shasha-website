'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import {
  videoPanelVariants,
  videoControlsVariants,
  videoControlHoverVariants,
  slideIndicatorHoverVariants,
  activeSlideIndicatorVariants,
  reducedMotionVariants,
  enhancedHeroStaggerVariants,
  enhancedHeroElementVariants,
  parallaxBackgroundVariants,
  parallaxContentOverlayVariants,
  floatingParallaxVariants,
  enhancedVideoTransitionVariants,
  performanceOptimizedEntranceVariants,
  reducedMotionHeroVariants,
} from '@/utils/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useParallax, useVideoTransition } from '@/hooks/useParallax';
import { useVideoOptimization } from '@/hooks/useVideoOptimization';
import OptimizedVideo from '@/components/ui/OptimizedVideo';
import ClientOnly from '@/components/ui/ClientOnly/ClientOnly';

export interface HeroProps {
  className?: string;
}

interface HeroMedia {
  type: 'video' | 'image';
  src: string;
  poster?: string;
  alt: string;
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Hero background videos and images - using videos for immersive experience
  const heroMedia: HeroMedia[] = [
    {
      type: 'video',
      src: '/videos/tirthan-valley.mp4',
      poster: '/images/hero-1.jpg',
      alt: 'Hotel Shasha Valley View',
      title: 'Welcome to Hotel Shasha',
      subtitle: 'Experience Serenity in Jibhi Valley',
    },
    {
      type: 'video',
      src: '/videos/jibhi-waterfall.mp4',
      poster: '/images/hero-1.jpg',
      alt: 'Hotel Shasha Luxury Suite',
      title: 'Luxury Mountain Retreat',
      subtitle: 'Comfort Meets Nature',
    },
    {
      type: 'video',
      src: '/videos/jalori-pass.mp4',
      poster: '/images/hero-1.jpg',
      alt: 'Hotel Shasha Dining Experience',
      title: 'Authentic Himachali Experience',
      subtitle: 'Taste the Mountains',
    },
  ];

  // Enhanced parallax and video optimization hooks
  const { parallaxTransform } = useParallax({ 
    speed: 0.3, 
    disabled: prefersReducedMotion 
  });
  const { transitionToVideo } = useVideoTransition(
    heroMedia.map(media => media.src)
  );
  const { 
    preloadVideos, 
    observeElement
  } = useVideoOptimization(
    heroMedia.map(media => media.src),
    {
      preloadDistance: 1,
      maxConcurrentLoads: 2,
      enableLazyLoading: true,
      fallbackDelay: 3000,
    }
  );

  // Enhanced auto-play carousel with video optimization
  useEffect(() => {
    if (!isAutoPlaying || !isHeroVisible) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % heroMedia.length;
        transitionToVideo(nextSlide);
        // Preload videos around the new current slide
        preloadVideos(nextSlide);
        return nextSlide;
      });
    }, 8000); // Longer duration for videos

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroMedia.length, isHeroVisible, transitionToVideo, preloadVideos]);

  // Enhanced intersection observer with video optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Start preloading videos when hero becomes visible
          preloadVideos(currentSlide);
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1,
      }
    );

    const heroElement = document.getElementById('home');
    if (heroElement) {
      observer.observe(heroElement);
      // Also observe with video optimization hook
      observeElement(heroElement);
    }

    return () => observer.disconnect();
  }, [currentSlide, preloadVideos, observeElement]);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % heroMedia.length;
    transitionToVideo(nextIndex);
    preloadVideos(nextIndex);
    setCurrentSlide(nextIndex);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + heroMedia.length) % heroMedia.length;
    transitionToVideo(prevIndex);
    preloadVideos(prevIndex);
    setCurrentSlide(prevIndex);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    transitionToVideo(index);
    preloadVideos(index);
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
      // Only handle keyboard events when hero is visible and focused
      const heroElement = document.getElementById('home');
      if (!isHeroVisible || !heroElement?.contains(document.activeElement)) return;

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
        case 'Spacebar':
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(heroMedia.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isHeroVisible, isAutoPlaying, heroMedia.length, prevSlide, nextSlide, goToSlide]);

  return (
    <section
      id="home"
      className={`relative overflow-hidden h-screen ${className}`}
      aria-label="Hotel Shasha hero section with video carousel"
      role="region"
    >
      {/* Responsive Grid Layout - Mobile first, then split-screen on desktop with widescreen optimization */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-3 h-full min-h-screen max-w-none xl:max-w-7xl 2xl:max-w-none xl:mx-auto">
        {/* Left Panel - Content */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 order-2 md:order-1 min-h-[50vh] md:min-h-full xl:col-span-2 2xl:col-span-1">
          {/* Enhanced parallax background with floating elements */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary-300/20 opacity-50"
            variants={prefersReducedMotion ? reducedMotionVariants : parallaxBackgroundVariants}
            initial="hidden"
            animate="visible"
            style={{ transform: parallaxTransform }}
          />
          
          {/* Floating parallax decorative elements */}
          {!prefersReducedMotion && (
            <>
              <motion.div
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-300/30 rounded-full"
                variants={floatingParallaxVariants}
                animate="animate"
              />
              <motion.div
                className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-primary-400/20 rounded-full"
                variants={floatingParallaxVariants}
                animate="animate"
                transition={{ delay: 2 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/6 w-1 h-1 bg-primary-200/40 rounded-full"
                variants={floatingParallaxVariants}
                animate="animate"
                transition={{ delay: 4 }}
              />
            </>
          )}
          
          {/* Enhanced content overlay with parallax */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-transparent to-primary-100/60"
            variants={prefersReducedMotion ? reducedMotionVariants : parallaxContentOverlayVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Primary gradient boundary overlay for smooth transition - Desktop only */}
          <div className="absolute right-0 top-0 bottom-0 w-32 xl:w-40 2xl:w-48 bg-gradient-to-r from-transparent via-primary-100/60 to-primary-200/40 z-10 hidden md:block" />

          {/* Secondary blur effect for smoother transition - Desktop only */}
          <div className="absolute right-0 top-0 bottom-0 w-16 xl:w-20 2xl:w-24 bg-gradient-to-r from-transparent to-white/20 backdrop-blur-sm z-10 hidden md:block" />

          {/* Final edge blur for seamless blend - Desktop only */}
          <div className="absolute right-0 top-0 bottom-0 w-8 xl:w-10 2xl:w-12 bg-gradient-to-r from-transparent to-primary-50/30 backdrop-blur-md z-10 hidden md:block" />

          {/* Mobile bottom gradient for smooth transition to video */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-primary-200/60 z-10 md:hidden" />

          {/* Enhanced Content Container with staggered animations */}
          <motion.div
            className="relative z-20 px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 md:py-12 text-center md:text-left max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full"
            variants={
              prefersReducedMotion
                ? reducedMotionHeroVariants
                : enhancedHeroStaggerVariants
            }
            initial="hidden"
            animate={isHeroVisible ? "visible" : "hidden"}
          >
            {/* Enhanced Hotel Logo with spring animation */}
            <motion.div
              className="mb-6 md:mb-8"
              variants={
                prefersReducedMotion ? reducedMotionVariants : enhancedHeroElementVariants
              }
            >
              <Image
                src="/Shasha_logo-without-background.png"
                alt="Hotel Shasha Logo"
                priority
                width={96}
                height={96}
                className="h-12 sm:h-16 lg:h-20 w-auto mx-auto md:mx-0"
              />
            </motion.div>

            {/* Enhanced Main Heading with spring physics */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold mb-4 md:mb-6 xl:mb-8 text-primary-900 leading-tight tracking-tight"
              variants={
                prefersReducedMotion ? reducedMotionVariants : enhancedHeroElementVariants
              }
              key={currentSlide}
            >
              {heroMedia[currentSlide].title}
            </motion.h1>

            {/* Enhanced Subtitle with smooth transitions */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light mb-3 md:mb-4 xl:mb-6 text-primary-800 leading-relaxed max-w-md xl:max-w-lg 2xl:max-w-xl"
              variants={
                prefersReducedMotion ? reducedMotionVariants : enhancedHeroElementVariants
              }
              key={`subtitle-${currentSlide}`}
            >
              {heroMedia[currentSlide].subtitle}
            </motion.p>

            {/* Enhanced Location with spring animation */}
            <motion.p
              className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-primary-700 mb-8 md:mb-10 xl:mb-12 leading-relaxed font-medium tracking-wide"
              variants={
                prefersReducedMotion ? reducedMotionVariants : enhancedHeroElementVariants
              }
            >
              Nestled in the Heart of Jibhi Valley, Himachal Pradesh
            </motion.p>

            {/* Enhanced Call to Action Buttons with improved staggering */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start items-stretch sm:items-center"
              variants={
                prefersReducedMotion ? reducedMotionVariants : enhancedHeroStaggerVariants
              }
            >
              <motion.div
                variants={
                  prefersReducedMotion ? reducedMotionVariants : enhancedHeroElementVariants
                }
                whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  type="button"
                  size="lg"
                  onClick={handleBookNow}
                  className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 xl:px-10 2xl:px-12 py-4 xl:py-5 2xl:py-6 text-base xl:text-lg 2xl:text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation rounded-lg"
                  aria-label="Book your stay at Hotel Shasha - Navigate to contact section"
                  title="Book Your Stay"
                >
                  Book Your Stay
                </Button>
              </motion.div>

              <motion.div
                variants={
                  prefersReducedMotion ? reducedMotionVariants : enhancedHeroElementVariants
                }
                whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleExploreRooms}
                  className="w-full sm:w-auto border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 xl:px-10 2xl:px-12 py-4 xl:py-5 2xl:py-6 text-base xl:text-lg 2xl:text-xl font-semibold transition-all duration-300 touch-manipulation rounded-lg backdrop-blur-sm bg-white/80 hover:bg-primary-600"
                  aria-label="Explore hotel rooms - Navigate to rooms section"
                  title="Explore Rooms"
                >
                  Explore Rooms
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Right Panel - Video Carousel with parallax */}
        <motion.div
          className="relative overflow-hidden order-1 md:order-2 min-h-[50vh] md:min-h-full xl:col-span-3 2xl:col-span-2"
          variants={
            prefersReducedMotion ? reducedMotionVariants : videoPanelVariants
          }
          initial="hidden"
          animate={isHeroVisible ? "visible" : "hidden"}
          style={{ 
            transform: prefersReducedMotion ? 'none' : `translateY(${parallaxTransform})` 
          }}
        >
          {/* Video Carousel Container */}
          <ClientOnly
            fallback={
              <div className="absolute inset-0 bg-primary-900">
                {heroMedia.map((media, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105'
                    }`}
                  >
                    <Image
                      src={media.poster || '/images/hero-1.jpg'}
                      alt={media.alt}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Subtle overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ))}
              </div>
            }
          >
            <div className="absolute inset-0">
              {heroMedia.map((media, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 ${
                    index === currentSlide ? 'z-10' : 'z-0'
                  }`}
                  variants={
                    prefersReducedMotion 
                      ? reducedMotionVariants 
                      : enhancedVideoTransitionVariants
                  }
                  initial="hidden"
                  animate={index === currentSlide ? 'visible' : 'hidden'}
                  exit="exit"
                  role="tabpanel"
                  id={`video-panel-${index}`}
                  aria-labelledby={`video-tab-${index}`}
                  aria-hidden={index !== currentSlide}
                >
                  {media.type === 'video' ? (
                    <OptimizedVideo
                      key={`video-${index}-${currentSlide}`}
                      src={media.src}
                      poster={media.poster || '/images/hero-1.jpg'}
                      alt={media.alt}
                      autoPlay={isHeroVisible && index === currentSlide}
                      muted
                      loop
                      playsInline
                      priority={index === 0}
                      lazy={index !== 0}
                      fallbackDelay={3000}
                      className="w-full h-full"
                      onLoadStart={() => {
                        // Video loading started
                      }}
                      onLoadEnd={() => {
                        // Video loaded successfully
                      }}
                      onError={() => {
                        // Video failed to load, fallback will be shown
                      }}
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
                  {/* Enhanced overlay with parallax effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </ClientOnly>

          {/* Enhanced Video Controls with performance optimization */}
          <motion.div
            className="absolute inset-0 z-20"
            variants={
              prefersReducedMotion ? reducedMotionVariants : videoControlsVariants
            }
            initial="hidden"
            animate={isHeroVisible ? "visible" : "hidden"}
          >
            {/* Navigation Arrows - Touch optimized */}
            <motion.button
              type="button"
              onClick={prevSlide}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 backdrop-blur-md rounded-full p-2 sm:p-3 group touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              variants={videoControlHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-label={`Previous video - ${heroMedia[(currentSlide - 1 + heroMedia.length) % heroMedia.length].title}`}
              title="Previous video"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-white transition-colors" />
            </motion.button>

            <motion.button
              type="button"
              onClick={nextSlide}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 backdrop-blur-md rounded-full p-2 sm:p-3 group touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              variants={videoControlHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-label={`Next video - ${heroMedia[(currentSlide + 1) % heroMedia.length].title}`}
              title="Next video"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-white transition-colors" />
            </motion.button>

            {/* Enhanced Slide Indicators - Mobile optimized */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3" role="tablist" aria-label="Video carousel navigation">
              {heroMedia.map((media, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  variants={
                    index === currentSlide
                      ? activeSlideIndicatorVariants
                      : slideIndicatorHoverVariants
                  }
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap="tap"
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-controls={`video-panel-${index}`}
                  aria-label={`${media.title} - Video ${index + 1} of ${heroMedia.length}`}
                  title={media.title}
                >
                  {/* Visible indicator dot */}
                  <div className={`w-full h-full rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`} />
                  
                  {/* Progress ring for auto-play */}
                  {index === currentSlide && isAutoPlaying && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/30"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        ease: 'linear',
                        repeat: Infinity,
                      }}
                      style={{
                        background: `conic-gradient(from 0deg, white 0%, transparent 100%)`,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Enhanced Auto-play control - Mobile optimized */}
            <motion.button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 backdrop-blur-md rounded-full p-2 sm:p-2.5 group touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              variants={videoControlHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-label={isAutoPlaying ? 'Pause automatic slideshow' : 'Start automatic slideshow'}
              title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              aria-pressed={isAutoPlaying}
            >
              <Play
                className={`w-3 h-3 sm:w-4 sm:h-4 text-white transition-all duration-300 ${
                  isAutoPlaying
                    ? 'opacity-50 scale-90'
                    : 'opacity-100 scale-100'
                }`}
              />
            </motion.button>

            {/* Enhanced Video title overlay - Mobile optimized with staggered animation */}
            <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-6 right-4 sm:right-6 text-white md:hidden">
              <motion.h3
                key={`mobile-title-${currentSlide}`}
                className="text-base sm:text-lg font-semibold mb-1 drop-shadow-lg"
                variants={
                  prefersReducedMotion ? reducedMotionVariants : performanceOptimizedEntranceVariants
                }
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                {heroMedia[currentSlide].title}
              </motion.h3>
              <motion.p
                key={`mobile-subtitle-${currentSlide}`}
                className="text-xs sm:text-sm text-white/90 drop-shadow-md"
                variants={
                  prefersReducedMotion ? reducedMotionVariants : performanceOptimizedEntranceVariants
                }
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
              >
                {heroMedia[currentSlide].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
