import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseAsyncDataOptions<T> {
  cacheKey?: string;
  cacheTTL?: number; // em milissegundos
  retryAttempts?: number;
  retryDelay?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  refetchOnWindowFocus?: boolean;
  staleTime?: number;
}

export interface UseAsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isStale: boolean;
  lastFetch: number | null;
}

export interface UseAsyncDataReturn<T> extends UseAsyncDataState<T> {
  refetch: () => Promise<void>;
  mutate: (newData: T | ((prev: T | null) => T)) => void;
  reset: () => void;
}

// Cache global simples
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

// Função para limpar cache expirado
const cleanExpiredCache = (): void => {
  const now = Date.now();
  Array.from(cache.entries()).forEach(([key, entry]) => {
    if (now - entry.timestamp > entry.ttl) {
      cache.delete(key);
    }
  });
};

export const useAsyncData = <T>(
  asyncFunction: () => Promise<T>,
  deps: React.DependencyList = [],
  options: UseAsyncDataOptions<T> = {}
): UseAsyncDataReturn<T> => {
  const {
    cacheKey,
    cacheTTL = 5 * 60 * 1000, // 5 minutos default
    retryAttempts = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    refetchOnWindowFocus = false,
    staleTime = 30 * 1000 // 30 segundos
  } = options;

  const [state, setState] = useState<UseAsyncDataState<T>>({
    data: null,
    loading: false,
    error: null,
    isStale: false,
    lastFetch: null
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função para verificar se os dados estão no cache e são válidos
  const getCachedData = useCallback((): T | null => {
    if (!cacheKey) return null;
    
    cleanExpiredCache();
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    
    return null;
  }, [cacheKey]);

  // Função para armazenar dados no cache
  const setCachedData = useCallback((data: T): void => {
    if (cacheKey) {
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        ttl: cacheTTL
      });
    }
  }, [cacheKey, cacheTTL]);

  // Função principal de busca com retry
  const fetchData = useCallback(async (attemptCount = 0): Promise<void> => {
    // Cancelar requisição anterior se existir
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setState(prev => ({ 
        ...prev, 
        loading: true, 
        error: null 
      }));

      const data = await asyncFunction();

      // Verificar se a requisição foi cancelada
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setCachedData(data);
      
      setState({
        data,
        loading: false,
        error: null,
        isStale: false,
        lastFetch: Date.now()
      });

      onSuccess?.(data);

    } catch (error: any) {
      // Verificar se a requisição foi cancelada
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      const errorObj = error instanceof Error ? error : new Error(String(error));

      // Tentar novamente se ainda há tentativas restantes
      if (attemptCount < retryAttempts) {
        retryTimeoutRef.current = setTimeout(() => {
          fetchData(attemptCount + 1);
        }, retryDelay * Math.pow(2, attemptCount)); // Backoff exponencial
        return;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorObj
      }));

      onError?.(errorObj);
    }
  }, [asyncFunction, retryAttempts, retryDelay, onSuccess, onError, setCachedData]);

  // Função de refetch manual
  const refetch = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetchData]);

  // Função para mutar dados localmente
  const mutate = useCallback((newData: T | ((prev: T | null) => T)): void => {
    setState(prev => {
      const updatedData = typeof newData === 'function' 
        ? (newData as (prev: T | null) => T)(prev.data)
        : newData;
      
      // Atualizar cache também
      setCachedData(updatedData);
      
      return {
        ...prev,
        data: updatedData,
        isStale: false,
        lastFetch: Date.now()
      };
    });
  }, [setCachedData]);

  // Função para resetar estado
  const reset = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    setState({
      data: null,
      loading: false,
      error: null,
      isStale: false,
      lastFetch: null
    });

    if (cacheKey) {
      cache.delete(cacheKey);
    }
  }, [cacheKey]);

  // Verificar se dados estão stale
  const checkStaleData = useCallback((): void => {
    const { lastFetch } = state;
    if (lastFetch && Date.now() - lastFetch > staleTime) {
      setState(prev => ({ ...prev, isStale: true }));
    }
  }, [state.lastFetch, staleTime]);

  // Effect principal
  useEffect(() => {
    const cachedData = getCachedData();
    
    if (cachedData) {
      setState({
        data: cachedData,
        loading: false,
        error: null,
        isStale: false,
        lastFetch: Date.now()
      });
    } else {
      fetchData();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, deps);

  // Effect para verificar dados stale
  useEffect(() => {
    const interval = setInterval(checkStaleData, staleTime / 2);
    return () => clearInterval(interval);
  }, [checkStaleData, staleTime]);

  // Effect para refetch quando a janela ganha foco
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = (): void => {
      if (state.data && state.isStale) {
        fetchData();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, state.data, state.isStale, fetchData]);

  return {
    ...state,
    refetch,
    mutate,
    reset
  };
};

// Hook específico para listas com paginação
export interface UsePaginatedDataOptions<T> extends UseAsyncDataOptions<T[]> {
  pageSize?: number;
  initialPage?: number;
}

export interface UsePaginatedDataReturn<T> extends Omit<UseAsyncDataReturn<T[]>, 'mutate'> {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  addItem: (item: T) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<T>) => void;
}

export const usePaginatedData = <T extends { id: string }>(
  asyncFunction: (page: number, pageSize: number) => Promise<T[]>,
  options: UsePaginatedDataOptions<T> = {}
): UsePaginatedDataReturn<T> => {
  const { pageSize = 10, initialPage = 1, ...asyncOptions } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const {
    data,
    loading,
    error,
    isStale,
    lastFetch,
    refetch,
    reset
  } = useAsyncData(
    () => asyncFunction(currentPage, pageSize),
    [currentPage, pageSize],
    asyncOptions
  );

  const totalPages = Math.ceil((data?.length || 0) / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const nextPage = useCallback((): void => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const prevPage = useCallback((): void => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPrevPage]);

  const goToPage = useCallback((page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

    const addItem = useCallback((item: T): void => {
    if (!data) return;

    // const newData = [item, ...data];
    // Aqui você implementaria a lógica para atualizar o cache/estado
    console.log('Adding item:', item);
  }, [data]);

  const removeItem = useCallback((id: string): void => {
    if (!data) return;

    // const newData = data.filter(item => item.id !== id);
    // Aqui você implementaria a lógica para atualizar o cache/estado
    console.log('Removing item with id:', id);
  }, [data]);

  const updateItem = useCallback((id: string, updates: Partial<T>): void => {
    if (!data) return;

    // const newData = data.map(item =>
    //   item.id === id ? { ...item, ...updates } : item
    // );
    // Aqui você implementaria a lógica para atualizar o cache/estado
    
    // Exemplo de implementação (comentado para não quebrar)
    // setCachedData(cacheKey, newData);
    console.log('Updating item:', id, 'with updates:', updates);
  }, [data]);

  return {
    data,
    loading,
    error,
    isStale,
    lastFetch,
    refetch,
    reset,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
    addItem,
    removeItem,
    updateItem
  };
}; 