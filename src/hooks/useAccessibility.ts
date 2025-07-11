import { useState, useEffect, useRef, useCallback } from 'react';
import { UseAccessibilityOptions, UseAccessibilityReturn } from '../types';

const DEFAULT_OPTIONS: UseAccessibilityOptions = {
  autoFocus: false,
  trapFocus: false,
  restoreOnUnmount: true,
  announceChanges: true
};

export const useAccessibility = (options: UseAccessibilityOptions = {}): UseAccessibilityReturn => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // State management
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
  const savedFocusRef = useRef<HTMLElement | null>(null);
  const announcementRegionRef = useRef<HTMLElement | null>(null);

  // Create announcement region for screen readers
  useEffect(() => {
    if (opts.announceChanges && !announcementRegionRef.current) {
      const region = document.createElement('div');
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.style.position = 'absolute';
      region.style.left = '-10000px';
      region.style.width = '1px';
      region.style.height = '1px';
      region.style.overflow = 'hidden';
      document.body.appendChild(region);
      announcementRegionRef.current = region;
    }

    return () => {
      if (announcementRegionRef.current) {
        document.body.removeChild(announcementRegionRef.current);
        announcementRegionRef.current = null;
      }
    };
  }, [opts.announceChanges]);

  // Save current focus
  const saveFocus = useCallback((): void => {
    savedFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  // Restore saved focus
  const restoreFocus = useCallback((): void => {
    if (savedFocusRef.current && savedFocusRef.current.focus) {
      try {
        savedFocusRef.current.focus();
      } catch (error) {
        console.warn('Failed to restore focus:', error);
      }
    }
  }, []);

  // Focus trap implementation
  const trapFocus = useCallback((container: HTMLElement): (() => void) => {
    if (!container) return () => {};

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    
    // Focus first element initially
    if (firstElement) {
      firstElement.focus();
    }

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Screen reader announcements
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    if (!announcementRegionRef.current) return;

    const region = announcementRegionRef.current;
    region.setAttribute('aria-live', priority);
    
    // Clear and then set message to ensure it's announced
    region.textContent = '';
    setTimeout(() => {
      region.textContent = message;
    }, 100);
  }, []);

  // Keyboard navigation handler - returns a function to set up keyboard navigation
  const useKeyboardNavigation = useCallback((): void => {
    // This function should be called by components that need keyboard navigation
    // The actual useEffect should be implemented in the calling component
  }, []);



  // Skip to main content
  const skipToContent = useCallback((): void => {
    const mainContent = document.querySelector('main, [role="main"], #main-content') as HTMLElement;
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // High contrast mode toggle
  const setHighContrast = useCallback((enabled: boolean): void => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Store preference
    localStorage.setItem('highContrast', enabled.toString());
    announce(enabled ? 'Alto contraste ativado' : 'Alto contraste desativado');
  }, [announce]);

  // Reduced motion toggle
  const setReducedMotion = useCallback((enabled: boolean): void => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Store preference
    localStorage.setItem('reducedMotion', enabled.toString());
    announce(enabled ? 'Animações reduzidas ativadas' : 'Animações normais ativadas');
  }, [announce]);

  // Font size adjustment
  const setFontSize = useCallback((size: 'small' | 'medium' | 'large'): void => {
    const root = document.documentElement;
    
    // Remove existing font size classes
    root.classList.remove('font-small', 'font-medium', 'font-large');
    
    // Add new font size class
    root.classList.add(`font-${size}`);
    
    // Store preference
    localStorage.setItem('fontSize', size);
    
    const sizeLabels = {
      small: 'pequena',
      medium: 'média',
      large: 'grande'
    };
    
    announce(`Fonte ${sizeLabels[size]} ativada`);
  }, [announce]);

  // Track focused element
  useEffect(() => {
    const handleFocusChange = (): void => {
      setFocusedElement(document.activeElement as HTMLElement);
    };

    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focusout', handleFocusChange);

    return () => {
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focusout', handleFocusChange);
    };
  }, []);

  // Auto focus on mount
  useEffect(() => {
    if (opts.autoFocus) {
      const firstFocusable = document.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [opts.autoFocus]);

  // Restore focus on unmount
  useEffect(() => {
    return () => {
      if (opts.restoreOnUnmount) {
        restoreFocus();
      }
    };
  }, [opts.restoreOnUnmount, restoreFocus]);

  return {
    focusedElement,
    saveFocus,
    restoreFocus,
    trapFocus,
    announce,
    useKeyboardNavigation,
    skipToContent,
    setHighContrast,
    setReducedMotion,
    setFontSize
  };
}; 