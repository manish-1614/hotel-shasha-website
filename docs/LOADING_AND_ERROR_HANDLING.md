# Loading States and Error Handling Documentation

This document describes the loading states and error handling components implemented for the Hotel Shasha website.

## Components Overview

### 1. Loading Spinner (`LoadingSpinner`)

A versatile loading spinner component with multiple size and color variants.

**Usage:**
```tsx
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Basic usage
<LoadingSpinner />

// With text
<LoadingSpinner text="Loading..." />

// Full screen overlay
<LoadingSpinner fullScreen text="Please wait..." />

// Different sizes and colors
<LoadingSpinner size="lg" color="primary" />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'primary' | 'secondary' | 'white' | 'gray'
- `text`: Optional loading text
- `fullScreen`: Boolean for full-screen overlay
- `className`: Additional CSS classes

### 2. Skeleton Loading (`Skeleton`, `SkeletonCard`)

Skeleton loading components for content placeholders.

**Usage:**
```tsx
import Skeleton, { SkeletonCard } from '@/components/ui/Skeleton';

// Basic skeleton
<Skeleton width="200px" height="20px" />

// Text skeleton with multiple lines
<Skeleton variant="text" lines={3} />

// Card skeleton
<SkeletonCard showImage showTitle showDescription descriptionLines={3} />
```

**Skeleton Props:**
- `variant`: 'text' | 'rectangular' | 'circular' | 'card'
- `width`, `height`: Size specifications
- `lines`: Number of text lines (for text variant)
- `animate`: Boolean to enable/disable animation

**SkeletonCard Props:**
- `showImage`: Boolean to show image placeholder
- `showTitle`: Boolean to show title placeholder
- `showDescription`: Boolean to show description placeholder
- `descriptionLines`: Number of description lines

### 3. Error Boundary (`ErrorBoundary`)

React Error Boundary component for catching and handling component errors.

**Usage:**
```tsx
import ErrorBoundary from '@/components/ui/ErrorBoundary';

<ErrorBoundary
  fallback={<CustomErrorComponent />}
  onError={(error, errorInfo) => console.log(error)}
  showDetails={process.env.NODE_ENV === 'development'}
>
  <YourComponent />
</ErrorBoundary>
```

**Props:**
- `fallback`: Custom error UI component
- `onError`: Error callback function
- `showDetails`: Boolean to show technical error details

### 4. Optimized Image (`OptimizedImage`)

Enhanced image component with loading states and error handling.

**Usage:**
```tsx
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/images/photo.jpg"
  alt="Description"
  width={400}
  height={300}
  showLoadingSpinner={true}
  retryable={true}
  fallbackSrc="/images/placeholder.svg"
/>
```

**Props:**
- `showLoadingSpinner`: Show spinner during loading
- `retryable`: Allow retry on error
- `fallbackSrc`: Fallback image URL
- `errorFallback`: Custom error component
- All standard Next.js Image props

## Section-Specific Skeletons

### Rooms Skeleton (`RoomsSkeleton`)

Skeleton loading for the rooms section.

```tsx
import RoomsSkeleton from '@/components/sections/Rooms/RoomsSkeleton';

<RoomsSkeleton count={3} />
```

### Amenities Skeleton (`AmenitiesSkeleton`)

Skeleton loading for the amenities section.

```tsx
import AmenitiesSkeleton from '@/components/sections/Amenities/AmenitiesSkeleton';

<AmenitiesSkeleton count={6} />
```

## Hooks

### useErrorHandler

Hook for managing error states in components.

```tsx
import useErrorHandler from '@/hooks/useErrorHandler';

const MyComponent = () => {
  const { errorState, setError, clearError, handleAsyncError, isError } = useErrorHandler();

  const handleSubmit = async () => {
    const result = await handleAsyncError(async () => {
      return await submitForm();
    });
    
    if (result) {
      // Success
    }
  };

  if (isError) {
    return <div>Error: {errorState.errorMessage}</div>;
  }

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### useLoadingState

Hook for managing multiple loading states.

```tsx
import useLoadingState from '@/hooks/useLoadingState';

const MyComponent = () => {
  const { isLoading, withLoading, startLoading, stopLoading } = useLoadingState();

  const handleAction = async () => {
    await withLoading('submit', async () => {
      await performAction();
    });
  };

  return (
    <button 
      onClick={handleAction}
      disabled={isLoading('submit')}
    >
      {isLoading('submit') ? 'Loading...' : 'Submit'}
    </button>
  );
};
```

## Form Loading States

Both the Contact form and Newsletter components already implement loading states:

- Loading spinners on submit buttons
- Disabled form fields during submission
- Success/error message handling
- Form validation with real-time feedback

## Error Scenarios Tested

1. **Image Loading Errors**: Automatic fallback to placeholder images
2. **Form Submission Errors**: Network errors and validation errors
3. **Component Errors**: Error boundaries catch and display component crashes
4. **Async Operation Errors**: Proper error handling for API calls

## Accessibility Features

- Proper ARIA labels for loading states
- Screen reader compatible error messages
- Keyboard navigation support
- Reduced motion support for animations
- High contrast mode compatibility

## Performance Considerations

- Lazy loading for images
- Optimized animations with Framer Motion
- Skeleton loading reduces perceived loading time
- Error boundaries prevent entire app crashes
- Efficient re-rendering with proper React patterns

## Browser Support

- Modern browsers with ES6+ support
- Graceful degradation for older browsers
- CSS animations fallback for reduced motion
- Progressive enhancement approach

## Testing

The components include:
- Error boundary testing utilities
- Loading state simulation
- Image error handling tests
- Form submission error scenarios
- Accessibility testing support

## Future Enhancements

Potential improvements:
- Integration with error monitoring services (Sentry, LogRocket)
- Advanced retry mechanisms with exponential backoff
- Offline state handling
- Progressive loading for large datasets
- Custom loading animations per section