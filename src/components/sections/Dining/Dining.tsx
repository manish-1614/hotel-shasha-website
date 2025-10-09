'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DiningInfo } from '@/types';
import { Button } from '@/components/ui';
import { AnimatedSection } from '@/components/ui';
import DiningGallery from './DiningGallery';
import { useParallax } from '@/hooks/useParallax';
import ClientOnly from '@/components/ui/ClientOnly/ClientOnly';
import { slideInLeftVariants, slideInRightVariants, staggerContainerVariants, staggerItemVariants } from '@/utils/animations';
import styles from './Dining.module.css';

// Placeholder dining data
const diningData: DiningInfo = {
  restaurantName: "Valley View Restaurant",
  cuisineType: ["Himachali", "North Indian", "Continental", "Chinese"],
  description: "Experience the authentic flavors of Himachal Pradesh in our cozy restaurant overlooking the pristine Jibhi Valley. Our chefs craft each dish using locally sourced organic ingredients, traditional recipes passed down through generations, and modern culinary techniques to create an unforgettable dining experience.",
  images: [
    '/images/dining/restaurant-interior-1.svg',
    '/images/dining/restaurant-interior-2.svg',
    '/images/dining/food-platter-1.svg',
    '/images/dining/chef-cooking.svg',
    '/images/dining/outdoor-dining.svg',
    '/images/dining/local-ingredients.svg'
  ],
  specialties: [
    "Himachali Dham - Traditional feast served on special occasions",
    "Trout Fish Curry - Fresh trout from local streams",
    "Siddu - Steamed bread stuffed with poppy seeds and walnuts",
    "Chana Madra - Chickpeas in yogurt-based gravy",
    "Babru - Local version of kachori with black gram filling",
    "Aktori - Buckwheat pancakes with local herbs"
  ],
  mealTimes: {
    breakfast: "7:00 AM - 10:30 AM",
    lunch: "12:30 PM - 3:30 PM",
    dinner: "7:00 PM - 10:30 PM"
  },
  features: [
    "Farm-to-table ingredients",
    "Traditional wood-fired cooking",
    "Panoramic valley views",
    "Open kitchen concept",
    "Vegetarian & vegan options",
    "Local organic produce"
  ]
};

const Dining: React.FC = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Parallax effects for background elements
  const { ref: sectionRef, y: backgroundY } = useParallax({ speed: 0.4 });
  const { ref: imageRef, y: imageY } = useParallax({ speed: 0.2 });

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <section id="dining" ref={sectionRef} className={styles.dining}>
      {/* Parallax Background Elements */}
      <ClientOnly>
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-2xl" />
          <div className="absolute bottom-32 left-16 w-32 h-32 bg-gradient-to-br from-red-200 to-orange-200 rounded-full blur-xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-lg" />
        </motion.div>
      </ClientOnly>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="slideUp" className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Culinary Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Savor the authentic flavors of Himachal Pradesh while enjoying breathtaking valley views
          </p>
        </AnimatedSection>

        {/* Split Screen Layout */}
        <div className={styles.splitScreen}>
          {/* Left Side - Content */}
          <motion.div 
            className={styles.contentSide}
            variants={slideInLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className={styles.contentWrapper}>
              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">
                {diningData.restaurantName}
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {diningData.description}
              </p>

              {/* Cuisine Types */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Cuisine Types</h4>
                <div className="flex flex-wrap gap-3">
                  {diningData.cuisineType.map((cuisine, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chef Specialties */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Chef&apos;s Specialties</h4>
                <div className="space-y-3">
                  {diningData.specialties.slice(0, 4).map((specialty, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-gray-600">{specialty}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meal Times */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Dining Hours</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-1">Breakfast</h5>
                    <p className="text-sm text-gray-600">{diningData.mealTimes.breakfast}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-1">Lunch</h5>
                    <p className="text-sm text-gray-600">{diningData.mealTimes.lunch}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-1">Dinner</h5>
                    <p className="text-sm text-gray-600">{diningData.mealTimes.dinner}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1">
                  View Menu
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Make Reservation
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Images with Parallax */}
          <ClientOnly
            fallback={
              <div className={styles.imageSide}>
                <div className={styles.imageGrid}>
                  {/* Main large image */}
                  <div 
                    className={styles.mainImage}
                    onClick={() => handleImageClick(0)}
                  >
                    <div className={styles.imagePlaceholder}>
                      <span className="text-gray-500 text-lg">Restaurant Interior</span>
                    </div>
                    <div className={styles.imageOverlay}>
                      <span className="text-white text-sm font-medium">View Gallery</span>
                    </div>
                  </div>

                  {/* Smaller images grid */}
                  <div className={styles.smallImagesGrid}>
                    {diningData.images.slice(1, 5).map((image, index) => (
                      <div
                        key={index + 1}
                        className={styles.smallImage}
                        onClick={() => handleImageClick(index + 1)}
                      >
                        <div className={styles.imagePlaceholder}>
                          <span className="text-gray-500 text-xs">
                            {index === 0 ? 'Food' : index === 1 ? 'Chef' : index === 2 ? 'Outdoor' : 'Ingredients'}
                          </span>
                        </div>
                        <div className={styles.imageOverlay}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          >
            <motion.div 
              ref={imageRef}
              className={styles.imageSide}
              variants={slideInRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ y: imageY }}
            >
              <div className={styles.imageGrid}>
                {/* Main large image */}
                <div 
                  className={styles.mainImage}
                  onClick={() => handleImageClick(0)}
                >
                  <div className={styles.imagePlaceholder}>
                    <span className="text-gray-500 text-lg">Restaurant Interior</span>
                  </div>
                  <div className={styles.imageOverlay}>
                    <span className="text-white text-sm font-medium">View Gallery</span>
                  </div>
                </div>

                {/* Smaller images grid */}
                <div className={styles.smallImagesGrid}>
                  {diningData.images.slice(1, 5).map((image, index) => (
                    <div
                      key={index + 1}
                      className={styles.smallImage}
                      onClick={() => handleImageClick(index + 1)}
                    >
                      <div className={styles.imagePlaceholder}>
                        <span className="text-gray-500 text-xs">
                          {index === 0 ? 'Food' : index === 1 ? 'Chef' : index === 2 ? 'Outdoor' : 'Ingredients'}
                        </span>
                      </div>
                      <div className={styles.imageOverlay}></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ClientOnly>
        </div>

        {/* Features Section */}
        <AnimatedSection animation="fadeIn" delay={0.4} className="mt-20">
          <h4 className="text-2xl font-serif font-bold text-gray-900 text-center mb-12">
            What Makes Our Dining Special
          </h4>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {diningData.features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={staggerItemVariants}
              >
                <motion.div 
                  className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'var(--primary-200)',
                    rotate: 5
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-primary-600 text-2xl">
                    {index === 0 ? '🌱' : index === 1 ? '🔥' : index === 2 ? '🏔️' : 
                     index === 3 ? '👨‍🍳' : index === 4 ? '🥗' : '🚜'}
                  </span>
                </motion.div>
                <h5 className="font-semibold text-gray-900 mb-2">{feature}</h5>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Image Gallery Modal */}
      <DiningGallery
        images={diningData.images}
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        initialIndex={selectedImageIndex}
      />
    </section>
  );
};

export default Dining;