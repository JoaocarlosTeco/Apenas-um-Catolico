import React from 'react';
import { render, screen } from '../../test/utils';
import LoadingScreen from '../LoadingScreen';

describe('LoadingScreen', () => {
  it('deve renderizar a tela de carregamento com mensagem padrão', () => {
    render(<LoadingScreen />);
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    expect(screen.getByText('Preparando conteúdo espiritual para você...')).toBeInTheDocument();
  });

  it('deve renderizar mensagem customizada', () => {
    const customMessage = 'Buscando santos...';
    render(<LoadingScreen message={customMessage} />);
    
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('deve renderizar versão inline sem subtítulo', () => {
    render(<LoadingScreen variant="inline" />);
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    expect(screen.queryByText('Preparando conteúdo espiritual para você...')).not.toBeInTheDocument();
  });

  it('deve ter o símbolo da cruz', () => {
    render(<LoadingScreen />);
    
    expect(screen.getByText('✝')).toBeInTheDocument();
  });

  it('deve aplicar className customizada', () => {
    const customClass = 'custom-loading';
    render(<LoadingScreen className={customClass} />);
    
    const container = screen.getByText('Carregando...').closest('div');
    expect(container).toHaveClass(customClass);
  });
}); 