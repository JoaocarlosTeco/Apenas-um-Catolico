// @ts-nocheck
import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '../types';

interface StyledProps {
  height?: string | undefined;
  borderRadius?: string | undefined;
  objectFit?: string | undefined;
  objectPosition?: string | undefined;
  loaded?: boolean;
  show?: boolean;
  theme?: any;
}

const ImageContainer = styled.div<StyledProps>`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  overflow: hidden;
  border-radius: ${props => props.borderRadius || '8px'};
  background-color: ${props => props.theme.colors.borderColor};
`;

const Image = styled.img<StyledProps>`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  object-position: ${props => props.objectPosition || 'center'};
  transition: all 0.3s ease;
  opacity: ${props => props.loaded ? 1 : 0};
  transform: ${props => props.loaded ? 'scale(1)' : 'scale(1.02)'};
`;

const PlaceholderContainer = styled.div<StyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.borderColor} 25%, 
    ${props => props.theme.colors.background} 50%, 
    ${props => props.theme.colors.borderColor} 75%
  );
  background-size: 200% 100%;
  animation: ${props => props.show ? 'loading-shimmer 2s infinite' : 'none'};
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;

  @keyframes loading-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const PlaceholderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.textSecondary};
  opacity: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '📷';
    font-size: 20px;
  }
`;

const ErrorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
`;

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

// Hook para Intersection Observer
const useIntersectionObserver = (options: IntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [hasIntersected, setHasIntersected] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasIntersected, options]);

  return [elementRef, isIntersecting, hasIntersected] as const;
};

interface OptimizedImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  borderRadius?: string;
  placeholder?: boolean;
  lazy?: boolean;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  style?: React.CSSProperties;
  sizes?: string;
  srcSet?: string;
}

const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  objectPosition = 'center',
  borderRadius = '8px',
  placeholder = true,
  lazy = true,
  onLoad,
  onError,
  className,
  style,
  sizes,
  srcSet,
  ...props
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [imageRef, , hasIntersected] = useIntersectionObserver();

  // Determinar se deve carregar a imagem
  const shouldLoad = lazy ? hasIntersected : true;

  const handleLoad = useCallback((e: Event) => {
    setLoaded(true);
    setError(false);
    onLoad?.(e as any);
  }, [onLoad]);

  const handleError = useCallback((e: Event) => {
    setError(true);
    setLoaded(false);
    onError?.(e as any);
  }, [onError]);

  // Preload da imagem quando deve carregar
  useEffect(() => {
    if (!shouldLoad || !src) return;

    const img = document.createElement('img');
    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [shouldLoad, src, handleLoad, handleError]);

  return (
    <ImageContainer 
      ref={imageRef}
      height={height || '100%'}
      borderRadius={borderRadius}
      className={className}
      style={style}
      {...props}
    >
      {shouldLoad && src && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height || '100%'}
          objectFit={objectFit}
          objectPosition={objectPosition}
          loaded={loaded && !error}
          sizes={sizes}
          srcSet={srcSet}
          loading="lazy"
          decoding="async"
        />
      )}

      {placeholder && !loaded && !error && (
        <PlaceholderContainer show={true}>
          <PlaceholderIcon />
        </PlaceholderContainer>
      )}

      {error && (
        <ErrorContainer>
          <PlaceholderIcon />
          <div style={{ marginTop: '8px', fontSize: '0.8rem' }}>
            Erro ao carregar imagem
          </div>
        </ErrorContainer>
      )}
    </ImageContainer>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;

// HOC para adicionar otimização de imagem a componentes existentes
export const withImageOptimization = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & OptimizedImageProps> => {
  const WrappedComponent: React.FC<P & OptimizedImageProps> = (props) => {
    const { src, alt, ...restProps } = props;
    
    return (
      <Component {...(restProps as P)}>
        <OptimizedImage src={src} alt={alt} />
      </Component>
    );
  };

  WrappedComponent.displayName = `withImageOptimization(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}; 