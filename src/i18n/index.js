import React, { createContext, useContext, useState, useEffect } from 'react';
import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';
import es from './locales/es.json';

// Idiomas disponíveis
export const AVAILABLE_LANGUAGES = {
  'pt-BR': {
    name: 'Português (Brasil)',
    flag: '🇧🇷',
    code: 'pt-BR',
    direction: 'ltr'
  },
  'en': {
    name: 'English',
    flag: '🇺🇸',
    code: 'en',
    direction: 'ltr'
  },
  'es': {
    name: 'Español',
    flag: '🇪🇸',
    code: 'es',
    direction: 'ltr'
  }
};

// Traduções
const translations = {
  'pt-BR': ptBR,
  'en': en,
  'es': es
};

// Contexto
const I18nContext = createContext();

// Detectar idioma do usuário
const detectUserLanguage = () => {
  // 1. Verificar localStorage
  const savedLanguage = localStorage.getItem('preferred-language');
  if (savedLanguage && AVAILABLE_LANGUAGES[savedLanguage]) {
    return savedLanguage;
  }

  // 2. Verificar navegador
  const browserLanguage = navigator.language || navigator.languages?.[0];
  if (browserLanguage) {
    // Verificar correspondência exata
    if (AVAILABLE_LANGUAGES[browserLanguage]) {
      return browserLanguage;
    }
    
    // Verificar correspondência parcial (ex: 'pt' para 'pt-BR')
    const languageCode = browserLanguage.split('-')[0];
    for (const [key, lang] of Object.entries(AVAILABLE_LANGUAGES)) {
      if (key.startsWith(languageCode)) {
        return key;
      }
    }
  }

  // 3. Fallback padrão
  return 'pt-BR';
};

// Função para interpolação de variáveis
const interpolate = (text, variables = {}) => {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
};

// Função para pluralização
const pluralize = (count, translations) => {
  if (typeof translations === 'string') return translations;
  
  if (translations.zero !== undefined && count === 0) {
    return translations.zero;
  }
  
  if (translations.one !== undefined && count === 1) {
    return translations.one;
  }
  
  if (translations.many !== undefined && count > 1) {
    return translations.many;
  }
  
  return translations.other || translations.one || translations.zero || '';
};

// Provider
export const I18nProvider = ({ children, defaultLanguage = 'pt-BR' }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return detectUserLanguage() || defaultLanguage;
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Carregar traduções dinamicamente se necessário
  const loadTranslations = async (language) => {
    if (translations[language]) {
      return translations[language];
    }

    try {
      setIsLoading(true);
      const module = await import(`./locales/${language}.json`);
      translations[language] = module.default;
      return translations[language];
    } catch (error) {
      console.warn(`Failed to load translations for ${language}:`, error);
      return translations[defaultLanguage];
    } finally {
      setIsLoading(false);
    }
  };

  // Função de tradução principal
  const t = (key, options = {}) => {
    const { variables = {}, count, defaultValue = key } = options;
    const currentTranslations = translations[currentLanguage] || translations[defaultLanguage];
    
    // Navegar pela estrutura de chaves (ex: 'santos.title')
    const keys = key.split('.');
    let value = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value[k] !== undefined) {
        value = value[k];
      } else {
        value = defaultValue;
        break;
      }
    }

    // Se não encontrar a tradução, tentar no idioma padrão
    if (value === defaultValue && currentLanguage !== defaultLanguage) {
      const defaultTranslations = translations[defaultLanguage];
      let defaultValue = defaultTranslations;
      
      for (const k of keys) {
        if (defaultValue && typeof defaultValue === 'object' && defaultValue[k] !== undefined) {
          defaultValue = defaultValue[k];
        } else {
          defaultValue = key;
          break;
        }
      }
      value = defaultValue;
    }

    // Aplicar pluralização se count for fornecido
    if (count !== undefined) {
      value = pluralize(count, value);
    }

    // Aplicar interpolação de variáveis
    if (typeof value === 'string' && Object.keys(variables).length > 0) {
      value = interpolate(value, variables);
    }

    return value;
  };

  // Mudar idioma
  const changeLanguage = async (language) => {
    if (!AVAILABLE_LANGUAGES[language]) {
      console.warn(`Language ${language} is not available`);
      return;
    }

    await loadTranslations(language);
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
    
    // Atualizar atributos HTML
    document.documentElement.lang = language;
    document.documentElement.dir = AVAILABLE_LANGUAGES[language].direction;
  };

  // Configurar idioma inicial
  useEffect(() => {
    const lang = AVAILABLE_LANGUAGES[currentLanguage];
    if (lang) {
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = lang.direction;
    }
  }, [currentLanguage]);

  const value = {
    currentLanguage,
    availableLanguages: AVAILABLE_LANGUAGES,
    changeLanguage,
    t,
    isLoading,
    // Helpers adicionais
    formatDate: (date, options = {}) => {
      const locale = currentLanguage === 'pt-BR' ? 'pt-BR' : 
                    currentLanguage === 'es' ? 'es-ES' : 'en-US';
      return new Intl.DateTimeFormat(locale, options).format(new Date(date));
    },
    formatNumber: (number, options = {}) => {
      const locale = currentLanguage === 'pt-BR' ? 'pt-BR' : 
                    currentLanguage === 'es' ? 'es-ES' : 'en-US';
      return new Intl.NumberFormat(locale, options).format(number);
    },
    getCurrentLanguageInfo: () => AVAILABLE_LANGUAGES[currentLanguage],
    isRTL: () => AVAILABLE_LANGUAGES[currentLanguage]?.direction === 'rtl'
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook para usar i18n
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// HOC para componentes que precisam de tradução
export const withTranslation = (Component) => {
  return function TranslatedComponent(props) {
    const i18n = useI18n();
    return <Component {...props} {...i18n} />;
  };
};

// Hook para tradução simples
export const useTranslation = () => {
  const { t, currentLanguage } = useI18n();
  return { t, currentLanguage };
};

export default I18nContext; 