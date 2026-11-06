import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';

import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalStyles, { lightTheme, darkTheme } from './styles/GlobalStyles.js';
import { ThemeModeProvider, useTheme } from './context/ThemeContext';

// Cada página só é baixada quando alguém abre a rota
const Home = React.lazy(() => import('./pages/Home'));
const Santos = React.lazy(() => import('./pages/Santos'));
const Santo = React.lazy(() => import('./pages/Santo'));
const Oracao = React.lazy(() => import('./pages/Oracao'));
const Calendario = React.lazy(() => import('./pages/Calendario'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Sobre = React.lazy(() => import('./pages/Sobre'));
const Laudes = React.lazy(() => import('./pages/Laudes'));
const LiturgiaDiaria = React.lazy(() => import('./pages/LiturgiaDiaria'));
const CelularPost = React.lazy(() => import('./pages/Blog/CelularPost'));
const NaoEncontrada = React.lazy(() => import('./pages/NaoEncontrada'));

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
  overflow-x: hidden;

  /* Páginas com max-width + margin auto encolhiam para o tamanho do conteúdo, e as abas
     roláveis da liturgia alargavam a tela no celular. Largura fixa em 100% resolve. */
  > * {
    width: 100%;
    min-width: 0;
  }
`;

const ThemedApp: React.FC = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // O React Router não volta ao topo sozinho: sem isto, a página nova abria rolada
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <ErrorBoundary>
      <AppContainer>
        <Helmet>
          <title>Apenas um Católico - Evangelização e Devoção</title>
          <meta
            name="description"
            content="Site católico dedicado à evangelização e devoção aos santos. Conheça a história dos santos, orações e reflexões espirituais."
          />
        </Helmet>

        <Header />

        <MainContent
          id="main-content"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <ErrorBoundary>
            <Suspense fallback={<LoadingScreen variant="inline" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/santos" element={<Santos />} />
                <Route path="/santos/:slug" element={<Santo />} />
                <Route path="/oracao" element={<Oracao />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/celular" element={<CelularPost />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/laudes" element={<Laudes />} />
                <Route path="/liturgia-diaria" element={<LiturgiaDiaria />} />
                <Route path="*" element={<NaoEncontrada />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </MainContent>

        <Footer />
      </AppContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <ThemeModeProvider>
    <ThemedApp />
  </ThemeModeProvider>
);

export default App;
