'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import HamburgerIcon from '@/components/ui/HamburgerIcon';
import { useScrollNavigation } from '@/hooks/useScrollNavigation';
import { useHeaderScrollAnimations } from '@/hooks/useHeaderScrollAnimations';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import ClientOnly from '@/components/ui/ClientOnly/ClientOnly';
import ScrollProgressIndicator from '@/components/ui/ScrollProgressIndicator';
import { 
  mobileMenuVariants, 
  mobileMenuBackdropVariants, 
  mobileNavItemVariants,
  mobileMenuContainerVariants,
  mobileMenuHeaderVariants,
  logoHoverVariants,
  ctaButtonHoverVariants,
  hamburgerHoverVariants
} from '@/utils/animations';
import styles from './Header.module.css';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { activeSection, scrollToSection } = useScrollNavigation();
  const { 
    isScrolled, 
    scrollProgress, 
    logoScale, 
    headerOpacity, 
    showScrollProgress 
  } = useHeaderScrollAnimations();
  const { isOpen: isMobileMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  
  // Refs for focus management
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerContainerRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLButtonElement>(null);

  const navigationItems = [
    { label: 'Home', href: 'home' },
    { label: 'Rooms', href: 'rooms' },
    { label: 'Dining', href: 'dining' },
    { label: 'Amenities', href: 'amenities' },
    { label: 'Location', href: 'location' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    closeMenu();
    scrollToSection(sectionId);
  };

  // Focus management for menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Focus first menu item when menu opens
      setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
    } else {
      // Return focus to hamburger button when menu closes
      const hamburgerButton = hamburgerContainerRef.current?.querySelector('button');
      hamburgerButton?.focus();
    }
  }, [isMobileMenuOpen]);

  // Enhanced keyboard navigation and focus management
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const menuElement = menuRef.current;
      if (!menuElement) return;

      const focusableElements = menuElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLElement);

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeMenu();
          break;
        
        case 'Tab':
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
          break;
        
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < focusableElements.length - 1) {
            (focusableElements[currentIndex + 1] as HTMLElement)?.focus();
          } else {
            firstElement?.focus();
          }
          break;
        
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            (focusableElements[currentIndex - 1] as HTMLElement)?.focus();
          } else {
            lastElement?.focus();
          }
          break;
        
        case 'Home':
          e.preventDefault();
          firstElement?.focus();
          break;
        
        case 'End':
          e.preventDefault();
          lastElement?.focus();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMenu]);

  // Animation variants are now imported from utils/animations

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator 
        progress={scrollProgress} 
        show={showScrollProgress} 
      />
      
      <ClientOnly
        fallback={
          <header className={`${styles.headerContainer} transition-all duration-300 bg-transparent ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className={styles.headerContent}>
                {/* Logo */}
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className="flex items-center group"
                >
                  <Image
                    src="/Shasha_logo-without-background.png"
                    alt="Hotel Shasha"
                    width={56}
                    height={56}
                    className="h-12 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </button>

                {/* Hamburger Menu Button - All Screen Sizes */}
                <HamburgerIcon
                  isOpen={isMobileMenuOpen}
                  onClick={toggleMenu}
                  className="text-mountain-700 hover:text-primary-600"
                  size={24}
                  strokeWidth={2}
                />
              </div>
            </div>
          </header>
        }
      >
        <motion.header
          className={`${styles.headerContainer} ${className}`}
          style={{
            backgroundColor: isScrolled 
              ? `rgba(255, 255, 255, ${headerOpacity})` 
              : 'transparent',
          }}
          animate={{
            backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
            boxShadow: isScrolled 
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
              : '0 0 0 0 rgba(0, 0, 0, 0)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={styles.headerContent}>
          {/* Logo */}
          <motion.button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center group p-2 -m-2 touch-manipulation min-h-[44px] min-w-[44px]"
            variants={logoHoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            aria-label="Go to home section"
            title="Hotel Shasha - Go to home"
          >
            <motion.div
              animate={{ 
                scale: logoScale,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image
                src="/Shasha_logo-without-background.png"
                alt="Hotel Shasha"
                width={56}
                height={56}
                className="h-12 lg:h-14 w-auto"
              />
            </motion.div>
          </motion.button>

          {/* Hamburger Menu Button - All Screen Sizes */}
          <motion.div 
            ref={hamburgerContainerRef}
            variants={hamburgerHoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="rounded-lg p-2 -m-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <HamburgerIcon
              isOpen={isMobileMenuOpen}
              onClick={toggleMenu}
              className={`${
                isScrolled ? 'text-mountain-800' : 'text-mountain-700'
              } hover:text-primary-600`}
              size={24}
              strokeWidth={2}
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.mobileMenuBackdrop}
              variants={mobileMenuBackdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={closeMenu}
            />

            {/* Slide-in Mobile Menu */}
            <motion.div
              ref={menuRef}
              id="mobile-navigation-menu"
              className={styles.mobileMenuPanel}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              aria-describedby="mobile-menu-description"
            >
              {/* Mobile Menu Header */}
              <div className={`${styles.mobileMenuHeader} p-8`}>
                <motion.h2 
                  className="text-2xl font-semibold text-mountain-800 text-center"
                  variants={mobileMenuHeaderVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  id="mobile-menu-title"
                >
                  Navigation
                </motion.h2>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col px-8 py-12" role="navigation" aria-label="Main navigation">
                <div id="mobile-menu-description" className="sr-only">
                  Use arrow keys to navigate between menu items, Enter to select, or Escape to close the menu.
                </div>
                <motion.div 
                  className="space-y-2"
                  variants={mobileMenuContainerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      ref={index === 0 ? firstMenuItemRef : undefined}
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className={`${styles.mobileNavItem} ${
                        activeSection === item.href ? styles.active : ''
                      }`}
                      variants={mobileNavItemVariants}
                      initial="closed"
                      animate="open"
                      whileHover={{ x: 12, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-current={activeSection === item.href ? 'page' : undefined}
                      aria-describedby={`nav-item-${item.href}-description`}
                    >
                      <span>{item.label}</span>
                      <span id={`nav-item-${item.href}-description`} className="sr-only">
                        Navigate to {item.label} section
                      </span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Mobile CTA Button */}
                <motion.button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  className={`${styles.mobileCTAButton} mt-12`}
                  variants={ctaButtonHoverVariants}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Book your stay - Navigate to contact section"
                  title="Book Your Stay"
                >
                  Book Your Stay
                </motion.button>

                {/* Mobile Menu Footer */}
                <motion.div
                  className="mt-auto pt-12 border-t border-primary-200"
                  variants={mobileNavItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <div className="text-center space-y-3">
                    <p className="text-lg font-medium text-mountain-700">Experience the serenity of Jibhi</p>
                    <div className="space-y-1">
                      <p className="text-base text-mountain-600">+91 98765 43210</p>
                      <p className="text-base text-mountain-600">info@hotelshasha.com</p>
                    </div>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
        </motion.header>
      </ClientOnly>
    </>
  );
};

export default Header;