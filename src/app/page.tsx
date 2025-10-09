'use client';

import { Layout, Hero, Newsletter } from '@/components';
import { Rooms, Dining, Amenities, Location, Contact } from '@/components/sections';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useScrollNavigation } from '@/hooks/useScrollNavigation';

export default function Home() {
  const { scrollToTop, isScrolled } = useScrollNavigation();

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />

      {/* Rooms Section */}
      <Rooms />

      {/* Dining Section */}
      <Dining />

      {/* Amenities Section */}
      <Amenities />

      {/* Location Section */}
      <Location />

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 lg:py-24 bg-mountain-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Scroll to Top Button */}
      <ScrollToTop 
        isVisible={isScrolled} 
        onClick={scrollToTop}
      />
    </Layout>
  );
}
