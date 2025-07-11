import { useState, useCallback, useRef, useEffect } from 'react';

export interface QueryOptions<T> {
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  retry?: number | ((failureCount: number, error: any) => boolean);
  retryDelay?: number | ((retryAttempt: number, error: any) => number);
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onSettled?: (data: T | undefined, error: Error | null) => void;
  select?: (data: T) => any;
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
  suspense?: boolean;
}

export interface QueryState<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isStale: boolean;
  dataUpdatedAt: number;
  errorUpdatedAt: number;
  failureCount: number;
  isPaused: boolean;
  isPlaceholderData: boolean;
}

export interface MutationOptions<TData, TVariables, TContext> {
  onMutate?: (variables: TVariables) => Promise<TContext | void> | TContext | void;
  onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown;
  onError?: (error: Error, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown;
  onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown;
  retry?: number | ((failureCount: number, error: any) => boolean);
  retryDelay?: number | ((retryAttempt: number, error: any) => number);
}

export interface MutationState<TData, TVariables, TContext> {
  data: TData | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isPaused: boolean;
  variables: TVariables | undefined;
  context: TContext | undefined;
  failureCount: number;
  submittedAt: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  staleTime: number;
  cacheTime: number;
  isStale: boolean;
  error: Error | null;
  promise: Promise<T> | null;
  subscribers: Set<() => void>;
  refetchInterval?: NodeJS.Timeout;
  abortController?: AbortController;
}

class QueryClient {
  private cache = new Map<string, CacheEntry<any>>();
  // private mutations = new Map<string, any>();
  private defaultOptions: QueryOptions<any> = {
    staleTime: 0,
    cacheTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    enabled: true
  };

  constructor(defaultOptions: Partial<QueryOptions<any>> = {}) {
    this.defaultOptions = { ...this.defaultOptions, ...defaultOptions };
    this.setupGlobalListeners();
  }

  private setupGlobalListeners(): void {
    if (typeof window === 'undefined') return;

    // Refetch on window focus
    window.addEventListener('focus', () => {
      this.refetchOnWindowFocus();
    });

    // Refetch on reconnect
    window.addEventListener('online', () => {
      this.refetchOnReconnect();
    });

    // Clean up stale cache periodically
    setInterval(() => {
      this.cleanupCache();
    }, 30000); // 30 segundos
  }

  private refetchOnWindowFocus(): void {
    this.cache.forEach((entry, key) => {
      if (this.defaultOptions.refetchOnWindowFocus && entry.isStale) {
        this.invalidateQueries([key]);
      }
    });
  }

  private refetchOnReconnect(): void {
    this.cache.forEach((_entry, key) => {
      if (this.defaultOptions.refetchOnReconnect) {
        this.invalidateQueries([key]);
      }
    });
  }

  private cleanupCache(): void {
    const now = Date.now();
    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.cacheTime && entry.subscribers.size === 0) {
        if (entry.refetchInterval) {
          clearInterval(entry.refetchInterval);
        }
        if (entry.abortController) {
          entry.abortController.abort();
        }
        this.cache.delete(key);
      }
    });
  }

  getQueryData<T>(queryKey: string): T | undefined {
    const entry = this.cache.get(queryKey);
    return entry?.data;
  }

  setQueryData<T>(queryKey: string, data: T | ((oldData: T | undefined) => T)): void {
    const entry = this.cache.get(queryKey);
    const newData = typeof data === 'function' ? (data as any)(entry?.data) : data;
    
    if (entry) {
      entry.data = newData;
      entry.timestamp = Date.now();
      entry.isStale = false;
      entry.error = null;
      this.notifySubscribers(queryKey);
    } else {
      this.cache.set(queryKey, {
        data: newData,
        timestamp: Date.now(),
        staleTime: this.defaultOptions.staleTime!,
        cacheTime: this.defaultOptions.cacheTime!,
        isStale: false,
        error: null,
        promise: null,
        subscribers: new Set()
      });
    }
  }

  invalidateQueries(queryKeys?: string[]): void {
    if (queryKeys) {
      queryKeys.forEach(key => {
        const entry = this.cache.get(key);
        if (entry) {
          entry.isStale = true;
          this.notifySubscribers(key);
        }
      });
    } else {
      this.cache.forEach((entry, key) => {
        entry.isStale = true;
        this.notifySubscribers(key);
      });
    }
  }

  removeQueries(queryKeys: string[]): void {
    queryKeys.forEach(key => {
      const entry = this.cache.get(key);
      if (entry) {
        if (entry.refetchInterval) {
          clearInterval(entry.refetchInterval);
        }
        if (entry.abortController) {
          entry.abortController.abort();
        }
        this.cache.delete(key);
      }
    });
  }

  private notifySubscribers(queryKey: string): void {
    const entry = this.cache.get(queryKey);
    if (entry) {
      entry.subscribers.forEach(callback => callback());
    }
  }

  prefetchQuery<T>(
    queryKey: string,
    queryFn: () => Promise<T>,
    options: QueryOptions<T> = {}
  ): Promise<T> {
    return this.fetchQuery(queryKey, queryFn, { ...options, enabled: true });
  }

  private async fetchQuery<T>(
    queryKey: string,
    queryFn: () => Promise<T>,
    options: QueryOptions<T> = {}
  ): Promise<T> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    let entry = this.cache.get(queryKey);

    if (!entry) {
      entry = {
        data: undefined,
        timestamp: 0,
        staleTime: mergedOptions.staleTime!,
        cacheTime: mergedOptions.cacheTime!,
        isStale: true,
        error: null,
        promise: null,
        subscribers: new Set()
      };
      this.cache.set(queryKey, entry);
    }

    // Se já existe uma promise em andamento, retornar ela
    if (entry.promise) {
      return entry.promise;
    }

    // Se os dados são frescos, retornar do cache
    const now = Date.now();
    if (entry.data && !entry.isStale && (now - entry.timestamp) < entry.staleTime) {
      return entry.data;
    }

    // Cancelar requisição anterior se existir
    if (entry.abortController) {
      entry.abortController.abort();
    }
    entry.abortController = new AbortController();

    // Criar nova promise
    entry.promise = this.executeQuery(queryKey, queryFn, mergedOptions);

    try {
      const data = await entry.promise;
      entry.data = data;
      entry.timestamp = now;
      entry.isStale = false;
      entry.error = null;
      entry.promise = null;

      // Configurar refetch interval
      if (mergedOptions.refetchInterval && typeof mergedOptions.refetchInterval === 'number') {
        if (entry.refetchInterval) {
          clearInterval(entry.refetchInterval);
        }
        entry.refetchInterval = setInterval(() => {
          this.invalidateQueries([queryKey]);
        }, mergedOptions.refetchInterval);
      }

      this.notifySubscribers(queryKey);
      mergedOptions.onSuccess?.(data);
      mergedOptions.onSettled?.(data, null);

      return data;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      entry.error = errorObj;
      entry.promise = null;
      
      this.notifySubscribers(queryKey);
      mergedOptions.onError?.(errorObj);
      mergedOptions.onSettled?.(undefined, errorObj);

      throw errorObj;
    }
  }

  private async executeQuery<T>(
    queryKey: string,
    queryFn: () => Promise<T>,
    options: QueryOptions<T>,
    retryCount = 0
  ): Promise<T> {
    try {
      return await queryFn();
    } catch (error) {
      const shouldRetry = this.shouldRetry(retryCount, error, options.retry);
      
      if (shouldRetry) {
        const delay = this.getRetryDelay(retryCount, error, options.retryDelay);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.executeQuery(queryKey, queryFn, options, retryCount + 1);
      }
      
      throw error;
    }
  }

  private shouldRetry(retryCount: number, error: any, retry: QueryOptions<any>['retry']): boolean {
    if (typeof retry === 'number') {
      return retryCount < retry;
    }
    if (typeof retry === 'function') {
      return retry(retryCount, error);
    }
    return retryCount < 3; // default
  }

  private getRetryDelay(retryCount: number, error: any, retryDelay: QueryOptions<any>['retryDelay']): number {
    if (typeof retryDelay === 'number') {
      return retryDelay;
    }
    if (typeof retryDelay === 'function') {
      return retryDelay(retryCount, error);
    }
    return Math.min(1000 * 2 ** retryCount, 30000); // default backoff
  }

  subscribe(queryKey: string, callback: () => void): () => void {
    let entry = this.cache.get(queryKey);
    if (!entry) {
      entry = {
        data: undefined,
        timestamp: 0,
        staleTime: this.defaultOptions.staleTime!,
        cacheTime: this.defaultOptions.cacheTime!,
        isStale: true,
        error: null,
        promise: null,
        subscribers: new Set()
      };
      this.cache.set(queryKey, entry);
    }

    entry.subscribers.add(callback);

    return () => {
      entry!.subscribers.delete(callback);
    };
  }

  // Mutation methods
  async executeMutation<TData, TVariables, TContext>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    variables: TVariables,
    options: MutationOptions<TData, TVariables, TContext> = {}
  ): Promise<TData> {
    let context: TContext | undefined;

    try {
      // onMutate
      const mutateResult = await options.onMutate?.(variables);
      context = mutateResult as TContext | undefined;

      // Execute mutation
      const data = await mutationFn(variables);

      // onSuccess
      await options.onSuccess?.(data, variables, context);
      await options.onSettled?.(data, null, variables, context);

      return data;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      
      await options.onError?.(errorObj, variables, context);
      await options.onSettled?.(undefined, errorObj, variables, context);

      throw errorObj;
    }
  }
}

// Hook para usar queries
export const useQuery = <T>(
  queryKey: string,
  queryFn: () => Promise<T>,
  options: QueryOptions<T> = {}
) => {
  const [state, setState] = useState<QueryState<T>>({
    data: undefined,
    error: null,
    isLoading: true,
    isError: false,
    isSuccess: false,
    isFetching: false,
    isStale: false,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    isPaused: false,
    isPlaceholderData: false
  });

  const clientRef = useRef<QueryClient>();
  if (!clientRef.current) {
    clientRef.current = new QueryClient();
  }

  const updateState = useCallback(() => {
    const client = clientRef.current!;
    const cachedData = client.getQueryData<T>(queryKey);
    const entry = (client as any).cache.get(queryKey);

    setState(prev => ({
      ...prev,
      data: cachedData,
      error: entry?.error || null,
      isLoading: !cachedData && !entry?.error,
      isError: !!entry?.error,
      isSuccess: !!cachedData && !entry?.error,
      isStale: entry?.isStale || false,
      dataUpdatedAt: entry?.timestamp || 0
    }));
  }, [queryKey]);

  useEffect(() => {
    const client = clientRef.current!;
    
    if (!options.enabled) return;

    const unsubscribe = client.subscribe(queryKey, updateState);

    // Initial fetch
    client.prefetchQuery(queryKey, queryFn, options)
      .then(() => updateState())
      .catch(() => updateState());

    return unsubscribe;
  }, [queryKey, queryFn, options.enabled, updateState]);

  const refetch = useCallback(() => {
    const client = clientRef.current!;
    client.invalidateQueries([queryKey]);
  }, [queryKey]);

  return {
    ...state,
    refetch
  };
};

// Hook para mutations
export const useMutation = <TData, TVariables, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData, TVariables, TContext> = {}
) => {
  const [state, setState] = useState<MutationState<TData, TVariables, TContext>>({
    data: undefined,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isPaused: false,
    variables: undefined,
    context: undefined,
    failureCount: 0,
    submittedAt: 0
  });

  const clientRef = useRef<QueryClient>();
  if (!clientRef.current) {
    clientRef.current = new QueryClient();
  }

  const mutate = useCallback(async (variables: TVariables) => {
    const client = clientRef.current!;
    
    setState(prev => ({
      ...prev,
      isLoading: true,
      isError: false,
      isSuccess: false,
      variables,
      submittedAt: Date.now()
    }));

    try {
      const data = await client.executeMutation(mutationFn, variables, options);
      
      setState(prev => ({
        ...prev,
        data,
        isLoading: false,
        isSuccess: true,
        error: null
      }));

      return data;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      
      setState(prev => ({
        ...prev,
        error: errorObj,
        isLoading: false,
        isError: true,
        failureCount: prev.failureCount + 1
      }));

      throw errorObj;
    }
  }, [mutationFn, options]);

  const reset = useCallback(() => {
    setState({
      data: undefined,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      isPaused: false,
      variables: undefined,
      context: undefined,
      failureCount: 0,
      submittedAt: 0
    });
  }, []);

  return {
    ...state,
    mutate,
    mutateAsync: mutate,
    reset
  };
};

export default QueryClient; 