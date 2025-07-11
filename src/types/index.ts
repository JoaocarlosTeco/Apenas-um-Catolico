// Tipos para Dispositivos
export interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Tipos para Santos
export interface Santo {
  id: string;
  nome: string;
  dataFesta: string;
  biografia: string;
  curiosidades: string[];
  oracoes: Oracao[];
  imagem?: string;
  padroeiro?: string[];
  simbolos?: string[];
  vida?: {
    nascimento?: string;
    morte?: string;
    canonizacao?: string;
    local?: string;
  };
  milagres?: string[];
  devocoes?: string[];
}

// Tipos para Orações
export interface Oracao {
  id: string;
  titulo: string;
  texto: string;
  categoria: CategoriaOracao;
  origem?: string;
  explicacao?: string;
  beneficios?: string[];
  comoRezar?: string;
  momentosRecomendados?: string[];
  santos?: string[];
}

export type CategoriaOracao = 
  | 'tradicional' 
  | 'marianas' 
  | 'santos' 
  | 'liturgicas' 
  | 'contemplativas'
  | 'intercessao'
  | 'acao_gracas'
  | 'perdao'
  | 'protecao';

// Tipos para Liturgia
export interface LiturgiaDiaria {
  data: string;
  tempo?: TempoLiturgico;
  cor?: CorLiturgica;
  primeira_leitura?: Leitura;
  salmo?: Salmo;
  segunda_leitura?: Leitura;
  evangelho?: Leitura;
  santo_do_dia?: Santo;
}

export interface Leitura {
  referencia: string;
  titulo?: string;
  texto: string;
}

export interface Salmo {
  numero: string;
  antifona?: string;
  texto: string;
}

export type TempoLiturgico = 
  | 'advento' 
  | 'natal' 
  | 'quaresma' 
  | 'pascoa' 
  | 'comum';

export type CorLiturgica = 
  | 'branco' 
  | 'vermelho' 
  | 'verde' 
  | 'roxo' 
  | 'rosa' 
  | 'preto';

// Tipos para Blog
export interface PostBlog {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  dataPublicacao: string;
  autor: string;
  tags: string[];
  categoria: CategoriaBlog;
  imagem?: string;
  leituraEstimada?: number;
  visualizacoes?: number;
}

export type CategoriaBlog = 
  | 'espiritualidade' 
  | 'santos' 
  | 'liturgia' 
  | 'oracao' 
  | 'evangelizacao'
  | 'catequese'
  | 'familia'
  | 'juventude';

// Tipos para Estado Global da Aplicação
export interface AppState {
  santos: {
    items: Santo[];
    loading: boolean;
    error: string | null;
    favorites: string[];
  };
  oracoes: {
    items: Oracao[];
    loading: boolean;
    error: string | null;
    favorites: string[];
  };
  liturgia: {
    daily: LiturgiaDiaria | null;
    loading: boolean;
    error: string | null;
  };
  blog: {
    posts: PostBlog[];
    loading: boolean;
    error: string | null;
  };
  search: {
    query: string;
    results: SearchResult[];
    loading: boolean;
  };
  theme: {
    isDark: boolean;
  };
  user: {
    preferences: UserPreferences;
  };
}

export interface SearchResult {
  type: 'santo' | 'oracao' | 'post';
  id: string;
  title: string;
  snippet: string;
  url: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt' | 'en' | 'es';
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
  notifications: boolean;
}

// Tipos para Actions do Reducer
export type AppAction = 
  | { type: 'SET_SANTOS'; payload: Santo[] }
  | { type: 'SET_SANTOS_LOADING'; payload: boolean }
  | { type: 'SET_SANTOS_ERROR'; payload: string | null }
  | { type: 'ADD_SANTO_FAVORITE'; payload: string }
  | { type: 'REMOVE_SANTO_FAVORITE'; payload: string }
  | { type: 'SET_ORACOES'; payload: Oracao[] }
  | { type: 'SET_ORACOES_LOADING'; payload: boolean }
  | { type: 'SET_ORACOES_ERROR'; payload: string | null }
  | { type: 'ADD_ORACAO_FAVORITE'; payload: string }
  | { type: 'REMOVE_ORACAO_FAVORITE'; payload: string }
  | { type: 'SET_LITURGIA_DAILY'; payload: LiturgiaDiaria }
  | { type: 'SET_LITURGIA_LOADING'; payload: boolean }
  | { type: 'SET_LITURGIA_ERROR'; payload: string | null }
  | { type: 'SET_BLOG_POSTS'; payload: PostBlog[] }
  | { type: 'SET_BLOG_LOADING'; payload: boolean }
  | { type: 'SET_BLOG_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: SearchResult[] }
  | { type: 'SET_SEARCH_LOADING'; payload: boolean }
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: Partial<UserPreferences> };

// Tipos para Context
export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  
  // Helper functions
  addToFavorites: (type: 'santo' | 'oracao', id: string) => void;
  removeFromFavorites: (type: 'santo' | 'oracao', id: string) => void;
  isFavorite: (type: 'santo' | 'oracao', id: string) => boolean;
  searchContent: (query: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

// Tipos para Hooks
export interface UsePerformanceOptions {
  debounceDelay?: number;
  throttleDelay?: number;
  cacheSize?: number;
  enableVirtualization?: boolean;
}

export interface UsePerformanceReturn {
  debouncedValue: <T>(value: T, delay?: number) => T;
  throttledCallback: <T extends (...args: any[]) => void>(callback: T, delay?: number) => T;
  memoizedSearch: (query: string, items: any[]) => any[];
  virtualizedItems: <T>(items: T[], containerHeight: number, itemHeight: number) => {
    visibleItems: T[];
    totalHeight: number;
    offsetY: number;
  };
  performanceMetrics: {
    renderTime: number;
    memoryUsage: number;
    cacheHits: number;
    cacheMisses: number;
  };
}

export interface UseAccessibilityOptions {
  autoFocus?: boolean;
  trapFocus?: boolean;
  restoreOnUnmount?: boolean;
  announceChanges?: boolean;
}

export interface UseAccessibilityReturn {
  focusedElement: HTMLElement | null;
  saveFocus: () => void;
  restoreFocus: () => void;
  trapFocus: (container: HTMLElement) => () => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  useKeyboardNavigation: () => void;
  skipToContent: () => void;
  setHighContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

// Tipos para I18n
export type Language = 'pt' | 'en' | 'es';

export interface TranslationStrings {
  [key: string]: string | TranslationStrings;
}

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  languages: { code: Language; name: string; flag: string }[];
}

// Tipos para SEO
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  structuredData?: Record<string, any>;
  breadcrumbs?: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// Tipos para PWA
export interface PWAInstallPrompt {
  outcome: 'accepted' | 'dismissed';
  platform: string;
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  actions?: NotificationAction[];
  tag?: string;
  renotify?: boolean;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type NonNullable<T> = T extends null | undefined ? never : T;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event Types
export interface AppEvent {
  type: string;
  timestamp: number;
  data?: any;
}

export interface NavigationEvent extends AppEvent {
  type: 'navigation';
  data: {
    from: string;
    to: string;
    method: 'click' | 'keyboard' | 'programmatic';
  };
}

export interface SearchEvent extends AppEvent {
  type: 'search';
  data: {
    query: string;
    resultsCount: number;
    source: 'header' | 'page' | 'voice';
  };
}

export interface InteractionEvent extends AppEvent {
  type: 'interaction';
  data: {
    element: string;
    action: 'click' | 'focus' | 'hover';
    context?: string;
  };
}

// Componente Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ResponsiveProps {
  mobile?: React.CSSProperties;
  tablet?: React.CSSProperties;
  desktop?: React.CSSProperties;
}

export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}

export interface StyledComponentProps extends BaseComponentProps, ResponsiveProps, AccessibilityProps {
  theme?: any;
}

// Alias para compatibilidade
export type Blog = PostBlog;

// Tipos para API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
  success: boolean;
  timestamp: string;
}

// Tipo para resposta de liturgia 
export interface LiturgiaResponse {
  data: LiturgiaDiaria;
  message?: string;
  success: boolean;
  timestamp: string;
} 