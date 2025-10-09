'use client';

import { useState, useCallback } from 'react';

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorMessage: string;
  errorCode?: string;
}

interface UseErrorHandlerReturn {
  errorState: ErrorState;
  setError: (error: Error | string, code?: string) => void;
  clearError: () => void;
  handleAsyncError: <T>(asyncFn: () => Promise<T>) => Promise<T | null>;
  isError: boolean;
}

const useErrorHandler = (): UseErrorHandlerReturn => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorMessage: '',
    errorCode: undefined
  });

  const setError = useCallback((error: Error | string, code?: string) => {
    const errorObj = error instanceof Error ? error : new Error(error);
    
    setErrorState({
      hasError: true,
      error: errorObj,
      errorMessage: errorObj.message,
      errorCode: code
    });

    // Log error for debugging
    console.error('Error handled:', errorObj, code ? `Code: ${code}` : '');
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      errorMessage: '',
      errorCode: undefined
    });
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>
  ): Promise<T | null> => {
    try {
      clearError();
      return await asyncFn();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      setError(errorObj);
      return null;
    }
  }, [setError, clearError]);

  return {
    errorState,
    setError,
    clearError,
    handleAsyncError,
    isError: errorState.hasError
  };
};

export default useErrorHandler;