import styled from 'styled-components';
import { BaseComponentProps, ResponsiveProps } from '../types';

interface CardProps extends BaseComponentProps, ResponsiveProps {
  padding?: string;
  shadow?: 'none' | 'subtle' | 'soft' | 'medium' | 'strong';
  hover?: boolean;
  maxWidth?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

interface CardGridProps extends BaseComponentProps {
  columns?: number;
  gap?: string;
  minWidth?: string;
}

export const Card = styled.div<CardProps>`
  background: ${props => props.theme.colors.surface || 'white'};
  border-radius: ${props => props.theme.borderRadius?.lg || '16px'};
  padding: ${props => props.padding || '2rem'};
  border: ${props => props.variant === 'outlined' ? `1px solid ${props.theme.colors.textSecondary || 'rgba(0, 0, 0, 0.1)'}` : 'none'};
  
  box-shadow: ${props => {
    const shadows = {
      none: 'none',
      subtle: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
      soft: '0 4px 8px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.02)',
      medium: '0 8px 16px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.04)',
      strong: '0 16px 32px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.06)'
    };
    
    if (props.variant === 'elevated') {
      return shadows.medium;
    }
    
    return shadows[props.shadow || 'soft'];
  }};
  
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: ${props => props.maxWidth || 'none'};
  position: relative;
  overflow: hidden;
  
  /* Sutil highlight interno */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  
  ${props => props.hover && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.06);
      
      &::before {
        opacity: 1;
      }
    }
    
    &:active {
      transform: translateY(0);
      transition: transform 0.1s ease;
    }
  `}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.padding || '1.5rem'};
    border-radius: ${props => props.theme.borderRadius?.md || '12px'};
    
    ${props => props.hover && `
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04);
      }
    `}
  }
`;

export const CardGrid = styled.div<CardGridProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit, 
    minmax(${props => props.minWidth || '300px'}, 1fr)
  );
  gap: ${props => props.gap || '2rem'};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.gap || '1.5rem'};
    padding: 0 1rem;
  }
`;

export const CardTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: ${props => props.theme.fontSize?.lg || '1.25rem'};
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSize?.md || '1.125rem'};
    margin-bottom: 0.75rem;
  }
`;

export const CardText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  font-size: ${props => props.theme.fontSize?.md || '1rem'};
  margin: 0;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSize?.sm || '0.9rem'};
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 0.75rem;
    margin-top: 1rem;
  }
`;

export const CardImage = styled.div`
  margin: -2rem -2rem 1.5rem -2rem;
  border-radius: ${props => props.theme.borderRadius?.lg || '16px'} ${props => props.theme.borderRadius?.lg || '16px'} 0 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: -1.5rem -1.5rem 1rem -1.5rem;
    border-radius: ${props => props.theme.borderRadius?.md || '12px'} ${props => props.theme.borderRadius?.md || '12px'} 0 0;
    
    img {
      height: 160px;
    }
  }
`; 