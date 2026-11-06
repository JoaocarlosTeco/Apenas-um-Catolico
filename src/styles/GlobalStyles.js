import { createGlobalStyle } from 'styled-components';

// Visual de missal: papel marfim, azul-marinho, ouro velho só em detalhes,
// texto longo em serifa de livro e cantos quase retos. Sem sombras nem gradientes.

const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px',
  large: '1440px',
};

const fonts = {
  heading: "'Cormorant Garamond', Georgia, serif",
  body: "'EB Garamond', Georgia, serif",
  ui: "'Inter', -apple-system, 'Segoe UI', sans-serif",
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
};

const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '5rem',
  '5xl': '6rem',
  section: '4rem',
  container: '2rem',
};

const transitions = {
  fast: '0.2s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
};

// sem sombras: a separação é feita por filetes
const shadows = {
  none: 'none',
  subtle: 'none',
  soft: 'none',
  medium: 'none',
  strong: 'none',
  float: 'none',
};

const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  tooltip: 1050,
};

const borderRadius = {
  sm: '2px',
  md: '3px',
  lg: '4px',
  xl: '4px',
  xxl: '6px',
  pill: '3px',
};

const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
  xxl: '2rem',
};

export const lightTheme = {
  modo: 'claro',
  colors: {
    primary: '#16325C',
    secondary: '#24467A',
    background: '#F6F2EA',
    cardBackground: '#FFFDF8',
    surface: '#FFFDF8',
    text: '#1F2430',
    textLight: '#5E6370',
    textSecondary: '#5E6370',
    white: '#FFFFFF',
    error: '#9B2C2C',
    borderColor: '#DDD5C4',
    headerBg: 'rgba(16, 32, 60, 0.97)',
    footerBg: '#10203C',
    accent: '#24467A',
    gold: '#9C7C38',
    sky: '#ECE6DA',
    titleColor: '#14284B',
    success: '#2E6B45',
    warning: '#8A6116',
    info: '#24467A',
  },
  shadows,
  zIndex,
  borderRadius,
  fontSize,
  breakpoints,
  fonts,
  spacing,
  transitions,
};

export const darkTheme = {
  modo: 'escuro',
  colors: {
    primary: '#2C4C7E',
    secondary: '#9DB7DB',
    background: '#0F1520',
    cardBackground: '#161D2A',
    surface: '#161D2A',
    text: '#E8E2D5',
    textLight: '#A8A396',
    textSecondary: '#A8A396',
    white: '#FFFFFF',
    error: '#E59A9A',
    borderColor: '#2A3240',
    headerBg: 'rgba(10, 14, 22, 0.97)',
    footerBg: '#0A0E16',
    accent: '#9DB7DB',
    gold: '#C8A963',
    sky: '#1C2433',
    titleColor: '#EFE8D8',
    success: '#7FB892',
    warning: '#D9B56A',
    info: '#9DB7DB',
  },
  shadows,
  zIndex,
  borderRadius,
  fontSize,
  breakpoints,
  fonts,
  spacing,
  transitions,
};

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    font-size: 1.08rem;
    background-color: var(--fundo-pagina, ${props => props.theme.colors.background});
    color: ${props => props.theme.colors.text};
    line-height: 1.65;
    height: 100%;
    overflow-x: hidden;
    font-feature-settings: 'kern', 'liga', 'onum';
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    letter-spacing: 0;
  }

  /* controles e navegação em sans, o resto é livro */
  button, input, select, textarea, nav, label {
    font-family: ${props => props.theme.fonts.ui};
  }

  /* espaço para a barra de navegação de baixo no celular */
  @media (max-width: 768px) {
    body {
      padding-bottom: calc(64px + env(safe-area-inset-bottom));
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ::selection {
    background: ${props => props.theme.colors.gold};
    color: #fff;
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${props => props.theme.colors.titleColor};
  }

  *:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${props => props.theme.colors.borderColor} transparent;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;
