import { useState, useEffect } from 'react';

interface UseMobileMenuOptions {
  onMenuToggle?: (isOpen: boolean) => void;
}

export const useMobileMenu = (options: UseMobileMenuOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
    options.onMenuToggle?.(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    options.onMenuToggle?.(false);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Note: Removed desktop resize close functionality since hamburger menu now works on all screen sizes

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};