import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FiPlus, FiMinus, FiShare2 } from 'react-icons/fi';

const LiturgiaContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px 10px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const DateInfo = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 1rem;
  margin-bottom: 8px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const LiturgicalPeriod = styled.h2`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const TabContainer = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  margin-bottom: 24px;
`;

const TabHeader = styled.div`
  display: flex;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const TabButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : 'rgba(27, 51, 88, 0.1)'};
  }

  &:not(:last-child) {
    border-right: 1px solid ${props => props.theme.colors.borderColor};
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      border-right: none;
      border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;

const TabContent = styled(motion.div)`
  padding: 32px;
  min-height: 400px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px;
    min-height: 300px;
  }
`;

const ReadingTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  margin-bottom: 20px;
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
`;

const ReadingText = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  font-size: ${props => props.fontSize}px;
  margin-bottom: 24px;

  p {
    margin-bottom: 16px;
  }

  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    line-height: 1.6;
    font-size: ${props => Math.max(props.fontSize * 0.9, 14)}px;
  }
`;

const ReadingReference = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  font-size: ${props => Math.max(props.fontSize - 2, 12)}px;
  text-align: right;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.colors.borderColor};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => Math.max((props.fontSize - 2) * 0.9, 11)}px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.light};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  }
`;

const FontControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FontLabel = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  margin-right: 8px;
`;

const FontButton = styled.button`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.borderColor};
  color: ${props => props.theme.colors.text};
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ShareButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.theme.colors.background};
  border-top: 3px solid ${props => props.theme.colors.secondary};
  border-radius: 50%;
  margin: 40px auto;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  padding: 32px;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: ${props => props.theme.shadows.light};
`;

const formatarTextoComNumeros = (texto) => {
  if (!texto) return '';
  return texto.replace(/(\d+)/g, '<strong>$1</strong>');
};

const LiturgiaDiaria = () => {
  const [liturgia, setLiturgia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const fetchLiturgia = async () => {
      try {
        const response = await fetch('https://liturgia.up.railway.app/');
        if (!response.ok) {
          throw new Error('Erro ao carregar a liturgia');
        }
        const data = await response.json();
        console.log('Dados da API:', data);
        setLiturgia(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar liturgia:', err);
        setError('Não foi possível carregar a liturgia. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchLiturgia();
  }, []);

  const handleFontSizeChange = (delta) => {
    setFontSize(prevSize => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 12), 24);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Liturgia Diária',
        text: 'Confira a liturgia de hoje',
        url: window.location.href,
      }).catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <LiturgiaContainer>
        <Header>
          <DateInfo>Carregando...</DateInfo>
          <LiturgicalPeriod>Liturgia Diária</LiturgicalPeriod>
        </Header>
        <LoadingSpinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </LiturgiaContainer>
    );
  }

  if (error) {
    return (
      <LiturgiaContainer>
        <Header>
          <DateInfo>
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </DateInfo>
          <LiturgicalPeriod>Liturgia Diária</LiturgicalPeriod>
        </Header>
        <ErrorMessage>{error}</ErrorMessage>
      </LiturgiaContainer>
    );
  }

  // Preparar as leituras para as abas
  const tabs = [
    {
      title: '1ª Leitura',
      content: {
        title: liturgia?.primeiraLeitura?.titulo || 'Primeira Leitura',
        text: liturgia?.primeiraLeitura?.texto,
        reference: liturgia?.primeiraLeitura?.referencia
      }
    },
    {
      title: 'Salmo',
      content: {
        title: liturgia?.salmo?.titulo || 'Salmo Responsorial',
        text: liturgia?.salmo?.texto,
        reference: liturgia?.salmo?.referencia
      }
    },
    {
      title: 'Evangelho',
      content: {
        title: liturgia?.evangelho?.titulo || 'Evangelho',
        text: liturgia?.evangelho?.texto,
        reference: liturgia?.evangelho?.referencia
      }
    }
  ].filter(tab => tab.content.text && tab.content.reference);

  // Se houver segunda leitura, inserir antes do evangelho
  if (liturgia?.segundaLeitura?.texto && liturgia?.segundaLeitura?.referencia) {
    tabs.splice(2, 0, {
      title: '2ª Leitura',
      content: {
        title: liturgia?.segundaLeitura?.titulo || 'Segunda Leitura',
        text: liturgia?.segundaLeitura?.texto,
        reference: liturgia?.segundaLeitura?.referencia
      }
    });
  }

  return (
    <LiturgiaContainer>
      <Helmet>
        <title>Liturgia Diária - Apenas um Católico</title>
        <meta name="description" content="Acompanhe a liturgia diária da Igreja Católica com as leituras de hoje" />
      </Helmet>

      <Header>
        <DateInfo>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </DateInfo>
        <LiturgicalPeriod>
          {liturgia?.tempo || '11ª Semana do Tempo Comum | Sexta-feira'}
        </LiturgicalPeriod>
      </Header>

      <Controls>
        <FontControls>
          <FontLabel>Tamanho da fonte:</FontLabel>
          <FontButton onClick={() => handleFontSizeChange(-1)} aria-label="Diminuir fonte">
            <FiMinus />
          </FontButton>
          <FontButton onClick={() => handleFontSizeChange(1)} aria-label="Aumentar fonte">
            <FiPlus />
          </FontButton>
        </FontControls>
        <ShareButton onClick={handleShare}>
          <FiShare2 />
          Compartilhar
        </ShareButton>
      </Controls>

      {tabs.length > 0 && (
        <TabContainer>
          <TabHeader>
            {tabs.map((tab, index) => (
              <TabButton
                key={index}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </TabButton>
            ))}
          </TabHeader>

          <TabContent
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReadingTitle>{tabs[activeTab]?.content.title}</ReadingTitle>
            <ReadingText 
              fontSize={fontSize}
              dangerouslySetInnerHTML={{ 
                __html: formatarTextoComNumeros(tabs[activeTab]?.content.text || '') 
              }} 
            />
            <ReadingReference fontSize={fontSize}>
              {tabs[activeTab]?.content.reference}
            </ReadingReference>
          </TabContent>
        </TabContainer>
      )}

      {tabs.length === 0 && (
        <ErrorMessage>
          Não há leituras disponíveis para hoje. Por favor, tente novamente mais tarde.
        </ErrorMessage>
      )}
    </LiturgiaContainer>
  );
};

export default LiturgiaDiaria; 