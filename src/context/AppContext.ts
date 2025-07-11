import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { AppState, AppAction, AppContextType, UserPreferences, SearchResult } from '../types';

// Estado inicial tipado
const initialState: AppState = {
  santos: {
    items: [],
    loading: false,
    error: null,
    favorites: JSON.parse(localStorage.getItem('santosFavoritos') || '[]')
  },
  oracoes: {
    items: [],
    loading: false,
    error: null,
    favorites: JSON.parse(localStorage.getItem('oracoesFavoritas') || '[]')
  },
  liturgia: {
    daily: null,
    loading: false,
    error: null
  },
  blog: {
    posts: [],
    loading: false,
    error: null
  },
  search: {
    query: '',
    results: [],
    loading: false
  },
  theme: {
    isDark: localStorage.getItem('darkMode') === 'true'
  },
  user: {
    preferences: {
      theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'auto') || 'auto',
      language: (localStorage.getItem('language') as 'pt' | 'en' | 'es') || 'pt',
      fontSize: (localStorage.getItem('fontSize') as 'small' | 'medium' | 'large') || 'medium',
      highContrast: localStorage.getItem('highContrast') === 'true',
      reducedMotion: localStorage.getItem('reducedMotion') === 'true',
      notifications: localStorage.getItem('notifications') !== 'false'
    }
  }
};

// Reducer tipado
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    // Santos actions
    case 'SET_SANTOS':
      return {
        ...state,
        santos: {
          ...state.santos,
          items: action.payload,
          loading: false,
          error: null
        }
      };

    case 'SET_SANTOS_LOADING':
      return {
        ...state,
        santos: {
          ...state.santos,
          loading: action.payload
        }
      };

    case 'SET_SANTOS_ERROR':
      return {
        ...state,
        santos: {
          ...state.santos,
          error: action.payload,
          loading: false
        }
      };

    case 'ADD_SANTO_FAVORITE':
      const newSantosFavorites = [...state.santos.favorites, action.payload];
      localStorage.setItem('santosFavoritos', JSON.stringify(newSantosFavorites));
      return {
        ...state,
        santos: {
          ...state.santos,
          favorites: newSantosFavorites
        }
      };

    case 'REMOVE_SANTO_FAVORITE':
      const filteredSantosFavorites = state.santos.favorites.filter(id => id !== action.payload);
      localStorage.setItem('santosFavoritos', JSON.stringify(filteredSantosFavorites));
      return {
        ...state,
        santos: {
          ...state.santos,
          favorites: filteredSantosFavorites
        }
      };

    // Orações actions
    case 'SET_ORACOES':
      return {
        ...state,
        oracoes: {
          ...state.oracoes,
          items: action.payload,
          loading: false,
          error: null
        }
      };

    case 'SET_ORACOES_LOADING':
      return {
        ...state,
        oracoes: {
          ...state.oracoes,
          loading: action.payload
        }
      };

    case 'SET_ORACOES_ERROR':
      return {
        ...state,
        oracoes: {
          ...state.oracoes,
          error: action.payload,
          loading: false
        }
      };

    case 'ADD_ORACAO_FAVORITE':
      const newOracoesFavorites = [...state.oracoes.favorites, action.payload];
      localStorage.setItem('oracoesFavoritas', JSON.stringify(newOracoesFavorites));
      return {
        ...state,
        oracoes: {
          ...state.oracoes,
          favorites: newOracoesFavorites
        }
      };

    case 'REMOVE_ORACAO_FAVORITE':
      const filteredOracoesFavorites = state.oracoes.favorites.filter(id => id !== action.payload);
      localStorage.setItem('oracoesFavoritas', JSON.stringify(filteredOracoesFavorites));
      return {
        ...state,
        oracoes: {
          ...state.oracoes,
          favorites: filteredOracoesFavorites
        }
      };

    // Liturgia actions
    case 'SET_LITURGIA_DAILY':
      return {
        ...state,
        liturgia: {
          ...state.liturgia,
          daily: action.payload,
          loading: false,
          error: null
        }
      };

    case 'SET_LITURGIA_LOADING':
      return {
        ...state,
        liturgia: {
          ...state.liturgia,
          loading: action.payload
        }
      };

    case 'SET_LITURGIA_ERROR':
      return {
        ...state,
        liturgia: {
          ...state.liturgia,
          error: action.payload,
          loading: false
        }
      };

    // Blog actions
    case 'SET_BLOG_POSTS':
      return {
        ...state,
        blog: {
          ...state.blog,
          posts: action.payload,
          loading: false,
          error: null
        }
      };

    case 'SET_BLOG_LOADING':
      return {
        ...state,
        blog: {
          ...state.blog,
          loading: action.payload
        }
      };

    case 'SET_BLOG_ERROR':
      return {
        ...state,
        blog: {
          ...state.blog,
          error: action.payload,
          loading: false
        }
      };

    // Search actions
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        search: {
          ...state.search,
          query: action.payload
        }
      };

    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        search: {
          ...state.search,
          results: action.payload,
          loading: false
        }
      };

    case 'SET_SEARCH_LOADING':
      return {
        ...state,
        search: {
          ...state.search,
          loading: action.payload
        }
      };

    // Theme actions
    case 'TOGGLE_THEME':
      const newIsDark = !state.theme.isDark;
      localStorage.setItem('darkMode', newIsDark.toString());
      return {
        ...state,
        theme: {
          ...state.theme,
          isDark: newIsDark
        }
      };

    // User preferences actions
    case 'UPDATE_USER_PREFERENCES':
      const newPreferences = { ...state.user.preferences, ...action.payload };
      
      // Save to localStorage
      Object.entries(action.payload).forEach(([key, value]) => {
        localStorage.setItem(key, value.toString());
      });

      return {
        ...state,
        user: {
          ...state.user,
          preferences: newPreferences
        }
      };

    default:
      return state;
  }
};

// Context creation
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props interface
interface AppProviderProps {
  children: ReactNode;
}

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions
  const addToFavorites = useCallback((type: 'santo' | 'oracao', id: string): void => {
    if (type === 'santo') {
      dispatch({ type: 'ADD_SANTO_FAVORITE', payload: id });
    } else {
      dispatch({ type: 'ADD_ORACAO_FAVORITE', payload: id });
    }
  }, []);

  const removeFromFavorites = useCallback((type: 'santo' | 'oracao', id: string): void => {
    if (type === 'santo') {
      dispatch({ type: 'REMOVE_SANTO_FAVORITE', payload: id });
    } else {
      dispatch({ type: 'REMOVE_ORACAO_FAVORITE', payload: id });
    }
  }, []);

  const isFavorite = useCallback((type: 'santo' | 'oracao', id: string): boolean => {
    if (type === 'santo') {
      return state.santos.favorites.includes(id);
    } else {
      return state.oracoes.favorites.includes(id);
    }
  }, [state.santos.favorites, state.oracoes.favorites]);

  const searchContent = useCallback((query: string): void => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    dispatch({ type: 'SET_SEARCH_LOADING', payload: true });

    // Simulated search logic - in real app, this would be async
    setTimeout(() => {
      const results: SearchResult[] = [];
      const normalizedQuery = query.toLowerCase().trim();

      if (normalizedQuery) {
        // Search santos
        state.santos.items.forEach(santo => {
          if (santo.nome.toLowerCase().includes(normalizedQuery) ||
              santo.biografia.toLowerCase().includes(normalizedQuery)) {
            results.push({
              type: 'santo',
              id: santo.id,
              title: santo.nome,
              snippet: santo.biografia.substring(0, 150) + '...',
              url: `/santos/${santo.id}`
            });
          }
        });

        // Search orações
        state.oracoes.items.forEach(oracao => {
          if (oracao.titulo.toLowerCase().includes(normalizedQuery) ||
              oracao.texto.toLowerCase().includes(normalizedQuery)) {
            results.push({
              type: 'oracao',
              id: oracao.id,
              title: oracao.titulo,
              snippet: oracao.texto.substring(0, 150) + '...',
              url: `/oracao/${oracao.id}`
            });
          }
        });

        // Search blog posts
        state.blog.posts.forEach(post => {
          if (post.titulo.toLowerCase().includes(normalizedQuery) ||
              post.conteudo.toLowerCase().includes(normalizedQuery)) {
            results.push({
              type: 'post',
              id: post.id,
              title: post.titulo,
              snippet: post.resumo,
              url: `/blog/${post.slug}`
            });
          }
        });
      }

      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
    }, 300);
  }, [state.santos.items, state.oracoes.items, state.blog.posts]);

  const updatePreferences = useCallback((preferences: Partial<UserPreferences>): void => {
    dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences });
  }, []);

  const contextValue: AppContextType = {
    state,
    dispatch,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    searchContent,
    updatePreferences
  };

  return React.createElement(
    AppContext.Provider,
    { value: contextValue },
    children
  );
};

// Custom hook para usar o contexto
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  
  return context;
};

// Export context para testes
export { AppContext }; 