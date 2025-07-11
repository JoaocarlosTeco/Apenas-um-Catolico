import { renderHook, waitFor } from '../../test/utils';
import { useAsyncData } from '../useAsyncData';

describe('useAsyncData', () => {
  it('deve executar função assíncrona e retornar dados', async () => {
    const mockData = { id: '1', name: 'Teste' };
    const asyncFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      useAsyncData(asyncFn, [], { cacheKey: 'test-key' })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it('deve capturar e retornar erros', async () => {
    const mockError = new Error('Erro de teste');
    const asyncFn = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => 
      useAsyncData(asyncFn, [], { retryAttempts: 0 })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBe(null);
  });

  it('deve usar cache quando disponível', async () => {
    const mockData = { id: '1', name: 'Teste Cached' };
    const asyncFn = jest.fn().mockResolvedValue(mockData);
    const cacheKey = 'cache-test';

    // Primeira chamada
    const { result: result1 } = renderHook(() => 
      useAsyncData(asyncFn, [], { cacheKey, cacheTTL: 10000 })
    );

    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);

    // Segunda chamada com mesma chave
    const { result: result2 } = renderHook(() => 
      useAsyncData(asyncFn, [], { cacheKey, cacheTTL: 10000 })
    );

    // Deve usar cache, não chamar função novamente
    expect(result2.current.data).toEqual(mockData);
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it('deve refetch quando refetch é chamado', async () => {
    const mockData = { id: '1', name: 'Teste' };
    const asyncFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      useAsyncData(asyncFn)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);

    // Refetch
    await result.current.refetch();

    expect(asyncFn).toHaveBeenCalledTimes(2);
  });

  it('deve mutar dados localmente', async () => {
    const mockData = { id: '1', name: 'Original' };
    const asyncFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      useAsyncData(asyncFn)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const newData = { id: '1', name: 'Mutated' };
    result.current.mutate(newData);

    expect(result.current.data).toEqual(newData);
  });

  it('deve resetar estado quando reset é chamado', async () => {
    const mockData = { id: '1', name: 'Teste' };
    const asyncFn = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      useAsyncData(asyncFn)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    result.current.reset();

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it('deve executar callbacks onSuccess e onError', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const mockData = { id: '1', name: 'Teste' };
    const asyncFn = jest.fn().mockResolvedValue(mockData);

    renderHook(() => 
      useAsyncData(asyncFn, [], { onSuccess, onError })
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData);
    });

    expect(onError).not.toHaveBeenCalled();
  });
}); 