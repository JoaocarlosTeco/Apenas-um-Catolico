import { Santo, Oracao, LiturgiaResponse, Blog, ApiResponse, PaginatedResponse } from '../types';

// Configuração base da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean | undefined> | undefined;
  timeout?: number;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;
  private requestInterceptors: ((config: RequestConfig) => RequestConfig)[] = [];
  private responseInterceptors: ((response: any) => any)[] = [];

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.timeout = 10000; // 10 segundos
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    let {
      method = 'GET',
      headers = {},
      body,
      params,
      timeout = this.timeout
    } = config;

    // Aplicar interceptors de request
    for (const interceptor of this.requestInterceptors) {
      const interceptedConfig = interceptor({ method, headers, body, params, timeout });
      method = interceptedConfig.method || method;
      headers = interceptedConfig.headers || headers;
      body = interceptedConfig.body || body;
      params = interceptedConfig.params || params;
      timeout = interceptedConfig.timeout || timeout;
    }

    const url = this.buildURL(endpoint, params);
    const controller = new AbortController();
    
    // Timeout
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP Error: ${response.status}`,
          response.status,
          errorData
        );
      }

      let data = await response.json();
      
      // Aplicar interceptors de response
      for (const interceptor of this.responseInterceptors) {
        data = interceptor(data);
      }
      
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError('Requisição cancelada por timeout', 408);
        }
        throw new ApiError(error.message, 0);
      }
      
      throw new ApiError('Erro desconhecido na requisição', 0);
    }
  }

  // Santos endpoints
  async getSantos(params?: {
    categoria?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Santo>> {
    return this.request<PaginatedResponse<Santo>>('/santos', { params });
  }

  async getSanto(id: string): Promise<ApiResponse<Santo>> {
    return this.request<ApiResponse<Santo>>(`/santos/${id}`);
  }

  async createSanto(santo: Omit<Santo, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<ApiResponse<Santo>> {
    return this.request<ApiResponse<Santo>>('/santos', {
      method: 'POST',
      body: santo
    });
  }

  async updateSanto(id: string, updates: Partial<Santo>): Promise<ApiResponse<Santo>> {
    return this.request<ApiResponse<Santo>>(`/santos/${id}`, {
      method: 'PUT',
      body: updates
    });
  }

  async deleteSanto(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/santos/${id}`, {
      method: 'DELETE'
    });
  }

  // Orações endpoints
  async getOracoes(params?: {
    categoria?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Oracao>> {
    return this.request<PaginatedResponse<Oracao>>('/oracoes', { params });
  }

  async getOracao(id: string): Promise<ApiResponse<Oracao>> {
    return this.request<ApiResponse<Oracao>>(`/oracoes/${id}`);
  }

  async createOracao(oracao: Omit<Oracao, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<ApiResponse<Oracao>> {
    return this.request<ApiResponse<Oracao>>('/oracoes', {
      method: 'POST',
      body: oracao
    });
  }

  async updateOracao(id: string, updates: Partial<Oracao>): Promise<ApiResponse<Oracao>> {
    return this.request<ApiResponse<Oracao>>(`/oracoes/${id}`, {
      method: 'PUT',
      body: updates
    });
  }

  async deleteOracao(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/oracoes/${id}`, {
      method: 'DELETE'
    });
  }

  // Liturgia endpoints
  async getLiturgia(data: string): Promise<ApiResponse<LiturgiaResponse>> {
    return this.request<ApiResponse<LiturgiaResponse>>(`/liturgia/${data}`);
  }

  async getLiturgiaRange(dataInicio: string, dataFim: string): Promise<ApiResponse<LiturgiaResponse[]>> {
    return this.request<ApiResponse<LiturgiaResponse[]>>('/liturgia/range', {
      params: { dataInicio, dataFim }
    });
  }

  // Blog endpoints
  async getPosts(params?: {
    categoria?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
    published?: boolean;
  }): Promise<PaginatedResponse<Blog>> {
    return this.request<PaginatedResponse<Blog>>('/blog', { params });
  }

  async getPost(id: string): Promise<ApiResponse<Blog>> {
    return this.request<ApiResponse<Blog>>(`/blog/${id}`);
  }

  async createPost(post: Omit<Blog, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<ApiResponse<Blog>> {
    return this.request<ApiResponse<Blog>>('/blog', {
      method: 'POST',
      body: post
    });
  }

  async updatePost(id: string, updates: Partial<Blog>): Promise<ApiResponse<Blog>> {
    return this.request<ApiResponse<Blog>>(`/blog/${id}`, {
      method: 'PUT',
      body: updates
    });
  }

  async deletePost(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/blog/${id}`, {
      method: 'DELETE'
    });
  }

  // Busca global
  async search(query: string, filters?: {
    tipos?: ('santos' | 'oracoes' | 'blog')[];
    limite?: number;
  }): Promise<ApiResponse<{
    santos: Santo[];
    oracoes: Oracao[];
    blog: Blog[];
    total: number;
  }>> {
    return this.request<ApiResponse<{
      santos: Santo[];
      oracoes: Oracao[];
      blog: Blog[];
      total: number;
    }>>('/search', {
      params: {
        q: query,
        tipos: filters?.tipos?.join(','),
        limite: filters?.limite
      }
    });
  }

  // Upload de arquivos
  async uploadFile(file: File, type: 'image' | 'audio' = 'image'): Promise<ApiResponse<{ url: string; filename: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const url = this.buildURL('/upload');
    const controller = new AbortController();
    
    // Timeout
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          // Não definir Content-Type para FormData
          'Accept': 'application/json',
          // Adicionar apenas headers de autenticação se existirem
          ...(this.defaultHeaders['Authorization'] ? { 'Authorization': this.defaultHeaders['Authorization'] } : {})
        },
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `Upload failed: ${response.status}`,
          response.status,
          errorData
        );
      }

      const data = await response.json();
      
      // Aplicar interceptors de response
      let processedData = data;
      for (const interceptor of this.responseInterceptors) {
        processedData = interceptor(processedData);
      }
      
      return processedData;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError('Upload cancelado por timeout', 408);
        }
        throw new ApiError(error.message, 0);
      }
      
      throw new ApiError('Erro desconhecido no upload', 0);
    }
  }

  // Configurar headers de autenticação
  setAuthHeader(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remover headers de autenticação
  removeAuthHeader(): void {
    delete this.defaultHeaders['Authorization'];
  }

  // Interceptors para request
  addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig): void {
    this.requestInterceptors.push(interceptor);
  }

  // Interceptors para response
  addResponseInterceptor(interceptor: (response: any) => any): void {
    this.responseInterceptors.push(interceptor);
  }
}

// Instância global do cliente
export const apiClient = new ApiClient();

// Hooks específicos para cada entidade
export const santosApi = {
  getAll: (params?: any) => apiClient.getSantos(params),
  getById: (id: string) => apiClient.getSanto(id),
  create: (data: any) => apiClient.createSanto(data),
  update: (id: string, data: any) => apiClient.updateSanto(id, data),
  delete: (id: string) => apiClient.deleteSanto(id)
};

export const oracoesApi = {
  getAll: (params?: any) => apiClient.getOracoes(params),
  getById: (id: string) => apiClient.getOracao(id),
  create: (data: any) => apiClient.createOracao(data),
  update: (id: string, data: any) => apiClient.updateOracao(id, data),
  delete: (id: string) => apiClient.deleteOracao(id)
};

export const liturgiaApi = {
  getByDate: (data: string) => apiClient.getLiturgia(data),
  getRange: (inicio: string, fim: string) => apiClient.getLiturgiaRange(inicio, fim)
};

export const blogApi = {
  getAll: (params?: any) => apiClient.getPosts(params),
  getById: (id: string) => apiClient.getPost(id),
  create: (data: any) => apiClient.createPost(data),
  update: (id: string, data: any) => apiClient.updatePost(id, data),
  delete: (id: string) => apiClient.deletePost(id)
};

export default apiClient; 