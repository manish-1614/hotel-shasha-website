'use client';

import { useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

interface UseLoadingStateReturn {
  loadingStates: LoadingState;
  isLoading: (key?: string) => boolean;
  setLoading: (key: string, loading: boolean) => void;
  startLoading: (key: string) => void;
  stopLoading: (key: string) => void;
  withLoading: <T>(key: string, asyncFn: () => Promise<T>) => Promise<T>;
  isAnyLoading: boolean;
}

const useLoadingState = (initialStates: LoadingState = {}): UseLoadingStateReturn => {
  const [loadingStates, setLoadingStates] = useState<LoadingState>(initialStates);

  const isLoading = useCallback((key?: string) => {
    if (!key) return Object.values(loadingStates).some(Boolean);
    return loadingStates[key] || false;
  }, [loadingStates]);

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading
    }));
  }, []);

  const startLoading = useCallback((key: string) => {
    setLoading(key, true);
  }, [setLoading]);

  const stopLoading = useCallback((key: string) => {
    setLoading(key, false);
  }, [setLoading]);

  const withLoading = useCallback(async <T>(
    key: string,
    asyncFn: () => Promise<T>
  ): Promise<T> => {
    try {
      startLoading(key);
      return await asyncFn();
    } finally {
      stopLoading(key);
    }
  }, [startLoading, stopLoading]);

  const isAnyLoading = Object.values(loadingStates).some(Boolean);

  return {
    loadingStates,
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
    withLoading,
    isAnyLoading
  };
};

export default useLoadingState;