'use client';

import React, { useState } from 'react';
import Button from '../Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import useErrorHandler from '@/hooks/useErrorHandler';
import useLoadingState from '@/hooks/useLoadingState';
import styles from './ErrorTestComponent.module.css';

const ErrorTestComponent: React.FC = () => {
  const { errorState, setError, clearError, handleAsyncError } = useErrorHandler();
  const { isLoading, withLoading } = useLoadingState();
  const [showComponent, setShowComponent] = useState(false);

  const triggerError = () => {
    setError('This is a test error to demonstrate error handling');
  };

  const triggerAsyncError = async () => {
    await handleAsyncError(async () => {
      throw new Error('This is a test async error');
    });
  };

  const simulateLoading = async () => {
    await withLoading('test', async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
    });
  };

  const ThrowingComponent = () => {
    throw new Error('Component error for testing error boundary');
  };

  if (!showComponent) {
    return (
      <div className={styles.testContainer}>
        <h3>Error & Loading State Testing</h3>
        <p>This component is for testing error handling and loading states.</p>
        <Button onClick={() => setShowComponent(true)}>
          Show Test Component
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.testContainer}>
      <h3>Error & Loading State Testing</h3>
      
      {/* Error Display */}
      {errorState.hasError && (
        <div className={styles.errorDisplay}>
          <p><strong>Error:</strong> {errorState.errorMessage}</p>
          <Button onClick={clearError} size="sm">Clear Error</Button>
        </div>
      )}

      {/* Test Buttons */}
      <div className={styles.testButtons}>
        <Button onClick={triggerError} variant="outline">
          Trigger Error
        </Button>
        
        <Button onClick={triggerAsyncError} variant="outline">
          Trigger Async Error
        </Button>
        
        <Button 
          onClick={simulateLoading} 
          loading={isLoading('test')}
          disabled={isLoading('test')}
        >
          {isLoading('test') ? 'Loading...' : 'Simulate Loading'}
        </Button>
        
        <Button 
          onClick={() => setShowComponent(false)} 
          variant="ghost"
        >
          Hide Component
        </Button>
      </div>

      {/* Loading Spinner Examples */}
      <div className={styles.loadingExamples}>
        <h4>Loading Spinner Examples:</h4>
        <div className={styles.spinnerRow}>
          <LoadingSpinner size="sm" />
          <LoadingSpinner size="md" />
          <LoadingSpinner size="lg" />
          <LoadingSpinner size="xl" />
        </div>
        <div className={styles.spinnerRow}>
          <LoadingSpinner color="primary" text="Primary" />
          <LoadingSpinner color="secondary" text="Secondary" />
          <LoadingSpinner color="gray" text="Gray" />
        </div>
      </div>

      {/* Image Error Testing */}
      <div className={styles.imageTests}>
        <h4>Image Error Handling:</h4>
        <div className={styles.imageRow}>
          <div className={styles.imageTest}>
            <p>Valid Image:</p>
            <OptimizedImage
              src="/images/hero/hero-1.jpg"
              alt="Valid image"
              width={200}
              height={150}
              showLoadingSpinner={true}
            />
          </div>
          <div className={styles.imageTest}>
            <p>Invalid Image (with fallback):</p>
            <OptimizedImage
              src="/images/invalid-image.jpg"
              alt="Invalid image"
              width={200}
              height={150}
              showLoadingSpinner={true}
              retryable={true}
            />
          </div>
        </div>
      </div>

      {/* Component Error Boundary Test */}
      <div className={styles.errorBoundaryTest}>
        <h4>Error Boundary Test:</h4>
        <p>Click the button below to trigger a component error:</p>
        <Button 
          onClick={() => {
            // This will trigger the error boundary
            const ErrorComponent = ThrowingComponent;
            return <ErrorComponent />;
          }}
          variant="outline"
        >
          Trigger Component Error
        </Button>
      </div>
    </div>
  );
};

export default ErrorTestComponent;