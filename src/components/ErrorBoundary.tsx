import { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '../types';

interface ErrorBoundaryProps extends BaseComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  eventId: string | null;
}

// Styled Components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 2rem;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius?.lg || '16px'};
  border: 2px solid ${props => props.theme.colors.error};
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.error};
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const ErrorTitle = styled.h2`
  color: ${props => props.theme.colors.error};
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const ErrorActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

const ErrorButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius?.md || '8px'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.colors.secondary};
      transform: translateY(-2px);
    }
  ` : `
    background: transparent;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primary};
      color: white;
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: 1rem;
  }
`;

const ErrorDetails = styled.details`
  margin-top: 2rem;
  text-align: left;
  max-width: 100%;
  
  summary {
    color: ${props => props.theme.colors.textSecondary};
    cursor: pointer;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const ErrorCode = styled.pre`
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius?.sm || '6px'};
  overflow-x: auto;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  border: 1px solid ${props => props.theme.colors.error};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.75rem;
    padding: 0.75rem;
  }
`;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const eventId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error,
      errorInfo,
      eventId
    });

    // Log do erro
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Callback customizado
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Enviar para serviço de monitoramento (se configurado)
    if (process.env.NODE_ENV === 'production') {
      // Aqui você pode integrar com Sentry, LogRocket, etc.
      console.log('Error ID:', eventId);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState): void {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;
    
    if (hasError && !prevState.hasError) {
      // Reset automático após um tempo
      this.resetTimeoutId = window.setTimeout(() => {
        this.handleReset();
      }, 30000); // 30 segundos
    }
    
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.handleReset();
    }
    
    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some((key, idx) => 
        prevProps.resetKeys![idx] !== key
      );
      
      if (hasResetKeyChanged) {
        this.handleReset();
      }
    }
  }

  componentWillUnmount(): void {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  handleReset = (): void => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }
    
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render(): ReactNode {
    const { hasError, error, errorInfo, eventId } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Fallback customizado
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          
          <ErrorTitle>Oops! Algo deu errado</ErrorTitle>
          
          <ErrorMessage>
            Ocorreu um erro inesperado. Nossos desenvolvedores foram notificados 
            e estão trabalhando para resolver o problema. Por favor, tente uma das 
            opções abaixo.
          </ErrorMessage>

          <ErrorActions>
            <ErrorButton variant="primary" onClick={this.handleReset}>
              Tentar Novamente
            </ErrorButton>
            
            <ErrorButton variant="secondary" onClick={this.handleReload}>
              Recarregar Página
            </ErrorButton>
            
            <ErrorButton variant="secondary" onClick={this.handleGoHome}>
              Ir para Início
            </ErrorButton>
          </ErrorActions>

          {process.env.NODE_ENV === 'development' && error && (
            <ErrorDetails>
              <summary>Detalhes do erro (desenvolvimento)</summary>
              <ErrorCode>
                {error.toString()}
                {errorInfo?.componentStack}
              </ErrorCode>
              {eventId && <p>Event ID: {eventId}</p>}
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return children;
  }
}

export default ErrorBoundary; 