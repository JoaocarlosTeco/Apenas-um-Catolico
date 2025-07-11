import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { I18nProvider } from '../i18n';
import { AppProvider } from '../context/AppContext';
import { ThemeContext } from '../context/ThemeContext';
import { lightTheme } from '../styles/GlobalStyles.js';

// Props do wrapper personalizado
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  isDarkMode?: boolean;
}

// Context mock para testes
const mockThemeContext = {
  isDarkMode: false,
  toggleTheme: jest.fn()
};

// Wrapper que inclui todos os providers necessários
const AllTheProviders = ({ 
  children, 
  isDarkMode = false 
}: { 
  children: ReactNode;
  isDarkMode?: boolean;
}) => {
  const themeContextValue = {
    ...mockThemeContext,
    isDarkMode
  };

  return (
    <BrowserRouter>
      <I18nProvider>
        <AppProvider>
          <ThemeProvider theme={lightTheme}>
            <ThemeContext.Provider value={themeContextValue}>
              {children}
            </ThemeContext.Provider>
          </ThemeProvider>
        </AppProvider>
      </I18nProvider>
    </BrowserRouter>
  );
};

// Função de render customizada
const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { isDarkMode, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AllTheProviders isDarkMode={isDarkMode ?? false}>
      {children}
    </AllTheProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Utilitários para testes
export const createMockSanto = (overrides = {}) => ({
  id: 'test-santo',
  nome: 'Santo Teste',
  sobrenome: 'de Teste',
  dataFesta: '2023-01-01',
  biografia: 'Biografia de teste...',
  milagres: ['Milagre de teste'],
  oracoes: [],
  imagem: '/test-image.jpg',
  categoria: 'santos' as const,
  tags: ['teste'],
  dataCriacao: '2023-01-01',
  dataAtualizacao: '2023-01-01',
  ...overrides
});

export const createMockOracao = (overrides = {}) => ({
  id: 'test-oracao',
  titulo: 'Oração de Teste',
  texto: 'Texto da oração de teste...',
  categoria: 'santos' as const,
  dataCriacao: '2023-01-01',
  dataAtualizacao: '2023-01-01',
  ...overrides
});

export const waitForLoadingToFinish = () =>
  new Promise(resolve => setTimeout(resolve, 0));

// Mock de localStorage para testes
export const createMockLocalStorage = () => {
  const store: { [key: string]: string } = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    })
  };
};

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render }; 