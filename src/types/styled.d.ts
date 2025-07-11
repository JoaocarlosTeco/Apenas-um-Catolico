import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      cardBackground: string;
      surface: string;
      text: string;
      textLight: string;
      textSecondary: string;
      white: string;
      error: string;
      borderColor: string;
      headerBg: string;
      footerBg: string;
      accent: string;
      titleColor: string;
      success: string;
      warning: string;
      info: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      large: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      section: string;
      container: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    shadows: {
      none: string;
      subtle: string;
      soft: string;
      medium: string;
      strong: string;
      float: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      pill: string;
    };
    zIndex: {
      dropdown: number;
      sticky: number;
      fixed: number;
      modal: number;
      tooltip: number;
    };
    fonts: {
      heading: string;
      body: string;
      sizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
      };
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
  }
} 