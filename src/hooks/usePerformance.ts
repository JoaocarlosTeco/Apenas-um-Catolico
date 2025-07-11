import { useCallback, useRef, useState, useEffect } from 'react';
import { UsePerformanceOptions, UsePerformanceReturn } from '../types';

const DEFAULT_OPTIONS: UsePerformanceOptions = {
  debounceDelay: 300,
  throttleDelay: 100,
  cacheSize: 50,
  enableVirtualization: true
};

export const usePerformance = (options: UsePerformanceOptions = {}): UsePerformanceReturn => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Cache refs
  const debounceTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const throttleTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const searchCache = useRef<Map<string, any[]>>(new Map());
  const cacheOrder = useRef<string[]>([]);
  
  // Performance metrics state
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    cacheHits: 0,
    cacheMisses: 0
  });

  // Debounced value hook
  const debouncedValue = useCallback(<T>(value: T, delay?: number): T => {
    const [debouncedVal, setDebouncedVal] = useState<T>(value);
    const timeoutDelay = delay || opts.debounceDelay || 300;

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedVal(value);
      }, timeoutDelay);

      return () => clearTimeout(timer);
    }, [value, timeoutDelay]);

    return debouncedVal;
  }, [opts.debounceDelay]);

  // Throttled callback
  const throttledCallback = useCallback(<T extends (...args: any[]) => void>(
    callback: T, 
    delay?: number
  ): T => {
    const timeoutDelay = delay || opts.throttleDelay || 100;
    
    return useCallback((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      
      if (!throttleTimers.current.has(key)) {
        callback(...args);
        throttleTimers.current.set(key, setTimeout(() => {
          throttleTimers.current.delete(key);
        }, timeoutDelay));
      }
    }, [callback, timeoutDelay]) as T;
  }, [opts.throttleDelay]);

  // Memoized search with cache
  const memoizedSearch = useCallback((query: string, items: any[]): any[] => {
    const startTime = performance.now();
    const cacheKey = `${query}_${items.length}`;
    
    // Check cache first
    if (searchCache.current.has(cacheKey)) {
      setPerformanceMetrics(prev => ({
        ...prev,
        cacheHits: prev.cacheHits + 1,
        renderTime: performance.now() - startTime
      }));
      return searchCache.current.get(cacheKey)!;
    }

    // Perform search
    const normalizedQuery = query.toLowerCase().trim();
    const results = items.filter(item => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(normalizedQuery);
      }
      
      if (item && typeof item === 'object') {
        return Object.values(item).some(value => 
          value && typeof value === 'string' && 
          value.toLowerCase().includes(normalizedQuery)
        );
      }
      
      return false;
    });

    // Cache management
    if (searchCache.current.size >= (opts.cacheSize || 50)) {
      const oldestKey = cacheOrder.current.shift();
      if (oldestKey) {
        searchCache.current.delete(oldestKey);
      }
    }

    // Store in cache
    searchCache.current.set(cacheKey, results);
    cacheOrder.current.push(cacheKey);

    setPerformanceMetrics(prev => ({
      ...prev,
      cacheMisses: prev.cacheMisses + 1,
      renderTime: performance.now() - startTime
    }));

    return results;
  }, [opts.cacheSize]);

  // Virtual scrolling for large lists
  const virtualizedItems = useCallback(<T>(
    items: T[], 
    containerHeight: number, 
    itemHeight: number
  ): { visibleItems: T[]; totalHeight: number; offsetY: number } => {
    if (!opts.enableVirtualization || items.length < 50) {
      return {
        visibleItems: items,
        totalHeight: items.length * itemHeight,
        offsetY: 0
      };
    }

    const [scrollTop] = useState(0);
    const totalHeight = items.length * itemHeight;
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
    const visibleItems = items.slice(startIndex, endIndex);
    const offsetY = startIndex * itemHeight;

    return {
      visibleItems,
      totalHeight,
      offsetY
    };
  }, [opts.enableVirtualization]);

  // Memory usage monitoring
  useEffect(() => {
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        setPerformanceMetrics(prev => ({
          ...prev,
          memoryUsage: memInfo.usedJSHeapSize / 1024 / 1024 // MB
        }));
      }
    };

    const interval = setInterval(updateMemoryUsage, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debounceTimers.current.forEach(timer => clearTimeout(timer));
      throttleTimers.current.forEach(timer => clearTimeout(timer));
      debounceTimers.current.clear();
      throttleTimers.current.clear();
      searchCache.current.clear();
      cacheOrder.current = [];
    };
  }, []);

  return {
    debouncedValue,
    throttledCallback,
    memoizedSearch,
    virtualizedItems,
    performanceMetrics
  };
}; 