import { createGlobalStyle } from 'styled-components';

const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px',
  large: '1440px'
};

const fonts = {
  heading: "'Inter', sans-serif",
  body: "'Inter', sans-serif",
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  }
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
  slow: '0.5s ease'
};

export const lightTheme = {
  colors: {
    primary: '#1B3358',
    secondary: '#C09553',
    background: '#F5F7FA',
    cardBackground: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#2D3748',
    textLight: '#718096',
    textSecondary: '#718096',
    white: '#FFFFFF',
    error: '#E53E3E',
    borderColor: '#E2E8F0',
    headerBg: 'rgba(255, 255, 255, 0.9)',
    footerBg: '#1B3358',
    accent: '#4B7BE5',
    titleColor: '#1B3358',
    success: '#28A745',
    warning: '#FFC107',
    info: '#17A2B8'
  },
  shadows: {
    none: 'none',
    subtle: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
    soft: '0 4px 8px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.02)',
    medium: '0 8px 16px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.04)',
    strong: '0 16px 32px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.06)',
    float: '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06)',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    tooltip: 1050
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    pill: '50px'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem'
  },
  breakpoints,
  fonts,
  spacing,
  transitions
};

export const darkTheme = {
  colors: {
    primary: '#1B3358',
    secondary: '#C09553',
    background: '#1A202C',
    cardBackground: '#2D3748',
    surface: '#2D3748',
    text: '#E2E8F0',
    textLight: '#A0AEC0',
    textSecondary: '#A0AEC0',
    white: '#FFFFFF',
    error: '#FC8181',
    borderColor: '#4A5568',
    headerBg: 'rgba(26, 32, 44, 0.9)',
    footerBg: '#1A202C',
    accent: '#4B7BE5',
    titleColor: '#C09553',
    success: '#28A745',
    warning: '#FFC107',
    info: '#17A2B8'
  },
  shadows: {
    none: 'none',
    subtle: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08)',
    soft: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
    medium: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.12)',
    strong: '0 16px 32px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0.15)',
    float: '0 20px 40px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.15)',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    tooltip: 1050
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    pill: '50px'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem'
  },
  breakpoints,
  fonts,
  spacing,
  transitions
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
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    height: 100%;
    overflow-x: hidden;
    letter-spacing: 0.01em;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Otimizações globais para imagens */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    
    /* Melhor renderização de imagens */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
    image-rendering: crisp-edges;
  }

  /* Imagens responsivas */
  .responsive-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .responsive-image:hover {
    transform: scale(1.02);
  }

  /* Loading placeholder para imagens */
  .image-placeholder {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading-shimmer 2s infinite;
  }

  @keyframes loading-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Scrollbar customizada */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 6px;
    border: 1px solid ${props => props.theme.colors.background};
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.accent};
  }

  ::-webkit-scrollbar-corner {
    background: ${props => props.theme.colors.background};
  }

  /* Scrollbar para Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${props => props.theme.colors.secondary} ${props => props.theme.colors.background};
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Utility classes */
  .fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
  }

  .fade-in {
    animation: fadeIn 0.6s ease forwards;
  }

  /* Link styles */
  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: ${props => props.theme.colors.secondary};
  }

  /* Better focus styles */
  *:focus {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }

  /* Button reset */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Accessibility improvements */
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