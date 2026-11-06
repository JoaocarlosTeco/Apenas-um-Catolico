import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'tema';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Primeiro vale a escolha salva; sem ela, segue o tema do sistema.
function readInitialMode(): boolean {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'escuro') return true;
    if (saved === 'claro') return false;
  } catch {
    // localStorage indisponível (aba anônima, por exemplo)
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(readInitialMode);

  const toggleTheme = useCallback(() => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? 'escuro' : 'claro');
    } catch {
      // sem persistência, o tema vale só até recarregar
    }
  }, [isDarkMode]);

  const value = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeModeProvider');
  }
  return context;
};
