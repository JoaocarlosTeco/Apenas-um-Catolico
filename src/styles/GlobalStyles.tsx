import { createGlobalStyle } from 'styled-components';

interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  large: string;
}

const breakpoints: Breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px',
  large: '1440px'
};

const fonts = {
  heading: "'Crimson Pro', serif",
  body: "'Inter', sans-serif",
  sacred: "'EB Garamond', serif",
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
    secondary: '#D4AF37', // Gold
    accent: '#E8D5B5',   // Champagne Gold
    background: '#F8FAFC',
    cardBackground: 'rgba(255, 255, 255, 0.8)',
    surface: '#FFFFFF',
    text: '#1E293B',
    textLight: '#64748B',
    textSecondary: '#475569',
    white: '#FFFFFF',
    error: '#EF4444',
    borderColor: '#E2E8F0',
    headerBg: 'rgba(255, 255, 255, 0.7)',
    footerBg: '#0F172A',
    titleColor: '#1B3358',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    glass: {
      background: 'rgba(255, 255, 255, 0.65)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
    }
  },
  shadows: {
    none: 'none',
    subtle: '0 2px 4px rgba(0, 0, 0, 0.02)',
    soft: '0 4px 12px rgba(0, 0, 0, 0.05)',
    medium: '0 12px 24px rgba(0, 0, 0, 0.08)',
    strong: '0 20px 40px rgba(0, 0, 0, 0.12)',
    heavy: '0 32px 64px rgba(0, 0, 0, 0.16)',
    float: '0 20px 40px rgba(31, 38, 135, 0.1)',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    tooltip: 1050
  },
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    xl: '28px',
    xxl: '40px',
    pill: '100px'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2.5rem'
  },
  breakpoints,
  fonts,
  spacing,
  transitions
};

export const darkTheme = {
  colors: {
    primary: '#6366F1', // Indigo for dark mode accent
    secondary: '#D4AF37',
    accent: '#E8D5B5',
    background: '#020617',
    cardBackground: 'rgba(30, 41, 59, 0.7)',
    surface: '#1E293B',
    text: '#F8FAFC',
    textLight: '#94A3B8',
    textSecondary: '#CBD5E1',
    white: '#FFFFFF',
    error: '#F87171',
    borderColor: '#1E293B',
    headerBg: 'rgba(2, 6, 23, 0.7)',
    footerBg: '#000000',
    titleColor: '#F8FAFC',
    success: '#34D399',
    warning: '#FBBF24',
    info: '#60A5FA',
    glass: {
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }
  },
  shadows: {
    none: 'none',
    subtle: '0 2px 4px rgba(0, 0, 0, 0.2)',
    soft: '0 4px 12px rgba(0, 0, 0, 0.25)',
    medium: '0 12px 24px rgba(0, 0, 0, 0.3)',
    strong: '0 20px 40px rgba(0, 0, 0, 0.35)',
    heavy: '0 32px 64px rgba(0, 0, 0, 0.4)',
    float: '0 20px 40px rgba(0, 0, 0, 0.4)',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    tooltip: 1050
  },
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    xl: '28px',
    xxl: '40px',
    pill: '100px'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2.5rem'
  },
  breakpoints,
  fonts,
  spacing,
  transitions
};

const GlobalStyles = createGlobalStyle<any>`
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
    background-color: ${props => props.theme.colors.background};
    background-image: 
      radial-gradient(at 0% 0%, hsla(217,100%,97%,1) 0, transparent 50%), 
      radial-gradient(at 50% 0%, hsla(210,100%,96%,1) 0, transparent 50%), 
      radial-gradient(at 100% 0%, hsla(45,100%,92%,1) 0, transparent 50%);
    color: ${props => props.theme.colors.text};
    line-height: 1.7;
    min-height: 100vh;
    overflow-x: hidden;
    letter-spacing: -0.01em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [data-theme='dark'] body {
    background-image: 
      radial-gradient(at 0% 0%, rgba(30, 58, 138, 0.15) 0, transparent 50%), 
      radial-gradient(at 50% 0%, rgba(15, 23, 42, 0.15) 0, transparent 50%), 
      radial-gradient(at 100% 0%, rgba(88, 28, 135, 0.1) 0, transparent 50%);
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    padding-top: 80px; /* Offset for fixed header */
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding-top: 70px;
    }
  }

  /* Glassmorphism Classes */
  .glass {
    background: ${props => props.theme.colors.glass.background};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: ${props => props.theme.colors.glass.border};
    box-shadow: ${props => props.theme.colors.glass.shadow};
  }

  /* Otimizações globais para imagens */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
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
