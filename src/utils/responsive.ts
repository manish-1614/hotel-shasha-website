// Responsive utility functions and constants

export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Check if the current window width matches a breakpoint
 * @param breakpoint - The breakpoint to check against
 * @param direction - Whether to check 'up' (min-width) or 'down' (max-width)
 */
export const useBreakpoint = (breakpoint: Breakpoint, direction: 'up' | 'down' = 'up') => {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  const breakpointValue = breakpoints[breakpoint];
  
  return direction === 'up' ? width >= breakpointValue : width < breakpointValue;
};

/**
 * Get the current breakpoint based on window width
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

/**
 * Responsive container classes based on breakpoints
 */
export const containerClasses = {
  xs: 'max-w-none px-4',
  sm: 'max-w-screen-sm px-6',
  md: 'max-w-screen-md px-6',
  lg: 'max-w-screen-lg px-8',
  xl: 'max-w-screen-xl px-8',
  '2xl': 'max-w-screen-2xl px-8',
} as const;

/**
 * Common responsive grid patterns
 */
export const gridPatterns = {
  // Cards/items per row at different breakpoints
  cards: {
    '1-2-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '1-2-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    '1-3-6': 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    '2-4-6': 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
  },
  // Text columns
  text: {
    '1-2': 'grid-cols-1 lg:grid-cols-2',
    '1-2-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  },
} as const;

/**
 * Responsive spacing utilities
 */
export const spacing = {
  section: {
    padding: 'py-12 md:py-16 lg:py-20',
    margin: 'my-12 md:my-16 lg:my-20',
  },
  container: {
    padding: 'px-4 sm:px-6 lg:px-8',
  },
  gap: {
    small: 'gap-4 md:gap-6',
    medium: 'gap-6 md:gap-8 lg:gap-10',
    large: 'gap-8 md:gap-12 lg:gap-16',
  },
} as const;

/**
 * Responsive typography utilities
 */
export const typography = {
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl lg:text-4xl',
    h4: 'text-xl md:text-2xl lg:text-3xl',
    h5: 'text-lg md:text-xl lg:text-2xl',
    h6: 'text-base md:text-lg lg:text-xl',
  },
  body: {
    large: 'text-lg md:text-xl',
    medium: 'text-base md:text-lg',
    small: 'text-sm md:text-base',
  },
} as const;