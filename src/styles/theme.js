const sharedStyles = {
  colors: {
    primary: '#1B3358', // Azul marinho
    secondary: '#C09553', // Dourado
    accent: '#4B7BE5', // Azul vibrante
    white: '#FFFFFF',
    error: '#E53E3E',
  },
  transitions: {
    normal: '0.3s ease',
  },
  shadows: {
    light: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    heavy: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

// Tema claro
export const lightTheme = {
  ...sharedStyles,
  colors: {
    ...sharedStyles.colors,
    background: '#FFFFFF',
    text: '#2D3748',
    textLight: '#4A5568',
    titleColor: '#1A202C',
    cardBackground: '#FFFFFF',
    borderColor: '#E2E8F0',
    inputBackground: '#F7FAFC',
    inputBorder: '#CBD5E0',
  },
};

// Tema escuro
export const darkTheme = {
  ...sharedStyles,
  colors: {
    ...sharedStyles.colors,
    background: '#1A202C',
    text: '#E2E8F0',
    textLight: '#A0AEC0',
    titleColor: '#F7FAFC',
    cardBackground: '#2D3748',
    borderColor: '#4A5568',
    inputBackground: '#2D3748',
    inputBorder: '#4A5568',
  },
};

export const desktopStyles = {
  ...sharedStyles,
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    hero: {
      title: '64px',
      subtitle: '24px',
    },
    heading: {
      h1: '48px',
      h2: '36px',
      h3: '24px',
    },
    body: {
      large: '18px',
      normal: '16px',
      small: '14px',
    }
  }
};

export const mobileStyles = {
  ...sharedStyles,
  spacing: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
  },
  typography: {
    hero: {
      title: '21px',
      subtitle: '12px',
    },
    heading: {
      h1: '20px',
      h2: '16px',
      h3: '14px',
    },
    body: {
      large: '14px',
      normal: '12px',
      small: '10px',
    }
  }
}; 