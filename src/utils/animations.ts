import { Variants } from 'framer-motion';

// Fade in animation variants with GPU acceleration
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: 'translateZ(0)', // Force GPU acceleration
  },
  visible: {
    opacity: 1,
    transform: 'translateZ(0)',
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Slide up animation variants with GPU acceleration
export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    transform: 'translateZ(0)', // Force GPU acceleration
  },
  visible: {
    opacity: 1,
    y: 0,
    transform: 'translateZ(0)',
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Slide in from left variants
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Slide in from right variants
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Scale animation variants
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Staggered container variants
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Staggered item variants
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Card hover animation variants
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.03,
    y: -12,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Button hover animation variants
export const buttonHoverVariants: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Image reveal animation variants
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Text reveal animation variants (for typewriter effect)
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Floating animation variants
export const floatingVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Pulse animation variants
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Image hover animation variants with zoom and overlay
export const imageHoverVariants: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Image overlay animation variants
export const imageOverlayVariants: Variants = {
  rest: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Navigation item hover variants
export const navItemHoverVariants: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Enhanced button hover variants with shadow
export const enhancedButtonHoverVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Icon hover animation variants
export const iconHoverVariants: Variants = {
  rest: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Custom easing functions
export const customEasing = {
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  menuSlide: [0.4, 0, 0.2, 1], // Cubic-bezier for smooth menu transitions
  menuBackdrop: [0.25, 0.46, 0.45, 0.94], // Smooth backdrop fade
  menuStagger: [0.215, 0.61, 0.355, 1], // Staggered menu items
} as const;

// Enhanced mobile menu animation variants with proper easing
export const mobileMenuVariants: Variants = {
  closed: {
    x: '-100%',
    transition: {
      duration: 0.4,
      ease: customEasing.menuSlide,
    },
  },
  open: {
    x: '0%',
    transition: {
      duration: 0.4,
      ease: customEasing.menuSlide,
    },
  },
};

// Enhanced backdrop animation variants
export const mobileMenuBackdropVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: customEasing.menuBackdrop,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: customEasing.menuBackdrop,
    },
  },
};

// Enhanced mobile navigation item variants with staggered animation
export const mobileNavItemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -30,
    y: 20,
    transition: {
      duration: 0.3,
      ease: customEasing.menuStagger,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: customEasing.menuStagger,
    },
  },
};

// Mobile menu container with staggered children
export const mobileMenuContainerVariants: Variants = {
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Mobile menu header animation
export const mobileMenuHeaderVariants: Variants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: customEasing.menuStagger,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: customEasing.menuStagger,
      delay: 0.1,
    },
  },
};

// Enhanced interactive hover effects
export const interactiveHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Logo hover animation with rotation
export const logoHoverVariants: Variants = {
  rest: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.1,
    rotate: 8,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
    rotate: 0,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Navigation item hover with slide effect
export const navItemSlideHoverVariants: Variants = {
  rest: {
    x: 0,
    scale: 1,
    backgroundColor: 'rgba(34, 197, 94, 0)',
    color: 'rgb(55, 65, 81)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    x: 12,
    scale: 1.02,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    color: 'rgb(22, 163, 74)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// CTA button hover with enhanced shadow and scale
export const ctaButtonHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
    backgroundColor: 'rgb(34, 197, 94)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: '0 8px 25px rgba(34, 197, 94, 0.4)',
    backgroundColor: 'rgb(22, 163, 74)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Hamburger button hover effect
export const hamburgerHoverVariants: Variants = {
  rest: {
    scale: 1,
    backgroundColor: 'rgba(34, 197, 94, 0)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Video control button hover effects
export const videoControlHoverVariants: Variants = {
  rest: {
    scale: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Slide indicator hover effects
export const slideIndicatorHoverVariants: Variants = {
  rest: {
    scale: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Active slide indicator variants
export const activeSlideIndicatorVariants: Variants = {
  rest: {
    scale: 1.25,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.35,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 1.15,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
};

// Enhanced hero entrance animations
export const heroEntranceContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Hero logo entrance with bounce
export const heroLogoVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Hero title entrance with typewriter effect
export const heroTitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
};

// Hero subtitle with slide up
export const heroSubtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.4,
    },
  },
};

// Hero location text
export const heroLocationVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.6,
    },
  },
};

// Hero buttons container with stagger
export const heroButtonsContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.8,
      staggerChildren: 0.1,
    },
  },
};

// Individual hero button entrance
export const heroButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Video panel entrance with parallax effect
export const videoPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    x: 100,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
};

// Video slide transition with smooth crossfade
export const videoSlideVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Video controls entrance
export const videoControlsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 1.5,
      staggerChildren: 0.1,
    },
  },
};

// Enhanced parallax background effect with scroll-based animation
export const parallaxBackgroundVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0.8,
    scale: 1.05,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Enhanced parallax content overlay
export const parallaxContentOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3,
    },
  },
};

// Floating parallax elements
export const floatingParallaxVariants: Variants = {
  animate: {
    y: [-8, 8, -8],
    x: [-4, 4, -4],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      times: [0, 0.5, 1],
    },
  },
};

// Enhanced video transition with crossfade and scale
export const enhancedVideoTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    filter: 'blur(2px)',
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Performance-optimized entrance animations
export const performanceOptimizedEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Staggered hero content with enhanced timing
export const enhancedHeroStaggerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// Enhanced hero element entrance with spring physics
export const enhancedHeroElementVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

// Smooth video carousel transition
export const smoothVideoCarouselVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 1.05,
    x: 100,
  },
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    x: -100,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Reduced motion variants for accessibility
export const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Reduced motion hero variants
export const reducedMotionHeroVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};