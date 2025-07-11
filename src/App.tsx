import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';

// Componentes principais (não lazy)
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading das páginas
const Home = React.lazy(() => import('./pages/Home'));
const Santos = React.lazy(() => import('./pages/Santos'));
const SaoFrancisco = React.lazy(() => import('./pages/SaoFrancisco'));
const Oracao = React.lazy(() => import('./pages/Oracao'));
const Calendario = React.lazy(() => import('./pages/Calendario'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Sobre = React.lazy(() => import('./pages/Sobre'));
const Laudes = React.lazy(() => import('./pages/Laudes'));
const LiturgiaDiaria = React.lazy(() => import('./pages/LiturgiaDiaria'));
const CelularPost = React.lazy(() => import('./pages/Blog/CelularPost'));

// Estilos e Tema
import GlobalStyles, { lightTheme, darkTheme } from './styles/GlobalStyles.js';
import { ThemeContext } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { I18nProvider } from './i18n';

// Import types from context
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

// Types
import { Variants } from 'framer-motion';

interface PageTransition {
  type: string;
  ease: string;
  duration: number;
}

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const MainContent = styled(motion.main)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 0;
  overflow-x: hidden;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #1B3358;
`;

// Animation variants
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

const pageTransition: PageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = (): void => {
    setIsDarkMode(prevMode => !prevMode);
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  const themeContextValue: ThemeContextType = { isDarkMode, toggleTheme };

  return (
    <ErrorBoundary>
      <I18nProvider>
        <AppProvider>
          <ThemeProvider theme={currentTheme}>
            <ThemeContext.Provider value={themeContextValue}>
              <GlobalStyles />
              <AppContainer>
                <Helmet>
                  <title>Apenas um Católico - Evangelização e Devoção</title>
                  <meta name="description" content="Site católico dedicado à evangelização e devoção aos santos. Conheça a história dos santos, orações e reflexões espirituais." />
                </Helmet>

                <Header />

                <MainContent
                  key={window.location.pathname}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner>Carregando...</LoadingSpinner>}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/santos" element={<Santos />} />
                        <Route path="/santos/sao-francisco" element={<SaoFrancisco />} />
                        <Route path="/oracao" element={<Oracao />} />
                        <Route path="/calendario" element={<Calendario />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/celular" element={<CelularPost />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/laudes" element={<Laudes />} />
                        <Route path="/liturgia-diaria" element={<LiturgiaDiaria />} />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                </MainContent>

                <Footer />
              </AppContainer>
            </ThemeContext.Provider>
          </ThemeProvider>
        </AppProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
};

export default App; 