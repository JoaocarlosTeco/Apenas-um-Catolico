import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BaseComponentProps } from '../types';

interface LoadingScreenProps extends BaseComponentProps {
  message?: string;
  variant?: 'fullscreen' | 'inline';
}

// Animações
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const LoadingContainer = styled.div<{ variant?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.background};
  animation: ${fadeIn} 0.3s ease-in;
  
  ${props => props.variant === 'fullscreen' ? `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: ${props.theme.zIndex.modal || 1000};
  ` : `
    padding: 3rem 1rem;
    min-height: 200px;
  `}
`;

const SpinnerContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${props => props.theme.colors.surface};
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
    border-width: 3px;
  }
`;

const CrossContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  font-weight: bold;
  animation: ${pulse} 2s ease-in-out infinite;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const SubText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
  opacity: 0.8;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    padding: 0 1rem;
  }
`;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Carregando...",
  variant = "fullscreen",
  className,
  ...props 
}) => {
  return (
    <LoadingContainer 
      variant={variant} 
      className={className}
      {...props}
    >
      <SpinnerContainer>
        <Spinner />
        <CrossContainer>✝</CrossContainer>
      </SpinnerContainer>
      
      <LoadingText>{message}</LoadingText>
      
      {variant === 'fullscreen' && (
        <SubText>
          Preparando conteúdo espiritual para você...
        </SubText>
      )}
    </LoadingContainer>
  );
};

export default LoadingScreen; 