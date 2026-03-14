import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiShare2 } from 'react-icons/fi';
import SEO from '../components/SEO';

interface Reading {
  titulo: string;
  texto: string;
  referencia: string;
}

interface LiturgiaData {
  tempo: string;
  cor: string;
  dia: string;
  primeiraLeitura: Reading;
  segundaLeitura?: Reading;
  salmo: Reading;
  evangelho: Reading;
}

const LiturgiaContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 30px 15px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const DateInfo = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.1rem;
  margin-bottom: 12px;
  font-weight: 500;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 800;
  margin: 0;
`;

const LiturgicalPeriod = styled.div<{ color?: string }>`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.1rem;
  margin-top: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.color || props.theme.colors.secondary};
    box-shadow: 0 0 8px ${props => props.color || props.theme.colors.secondary}80;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid ${props => props.theme.colors.secondary}15;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FontControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const IconButton = styled.button`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.secondary}30;
  color: ${props => props.theme.colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const ShareButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const TabContainer = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.secondary}15;
`;

const TabHeader = styled.div`
  display: flex;
  background: ${props => props.theme.colors.background};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  min-width: 140px;
  padding: 1.25rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  border: none;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: ${props.theme.colors.secondary};
    }
  `}

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TabContent = styled(motion.div)`
  padding: 3rem;
  min-height: 400px;
  font-family: 'EB Garamond', serif;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const ReadingTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 700;
  border-bottom: 2px solid ${props => props.theme.colors.secondary}30;
  padding-bottom: 1rem;
`;

const ReadingText = styled.div<{ fontSize: number }>`
  line-height: 1.8;
  font-size: ${props => props.fontSize}px;
  color: ${props => props.theme.colors.text};
  text-align: justify;

  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 800;
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

const Reference = styled.div`
  margin-top: 3rem;
  text-align: right;
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  font-size: 0.95em;
  border-top: 1px dashed ${props => props.theme.colors.secondary}30;
  padding-top: 1.5rem;
`;

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 4px solid ${props => props.theme.colors.background};
  border-top-color: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  margin: 4rem auto;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background: #FEF2F2;
  color: #DC2626;
  border-radius: 16px;
  font-weight: 600;
  border: 1px solid #FECACA;
`;

const formatarTextoComNumeros = (texto: string) => {
  if (!texto) return '';
  return texto.replace(/(\d+)/g, '<strong>$1</strong>');
};

const LiturgiaDiaria: React.FC = () => {
  const [liturgia, setLiturgia] = useState<LiturgiaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [fontSize, setFontSize] = useState(19);

  useEffect(() => {
    const fetchLiturgia = async () => {
      try {
        const response = await fetch('https://liturgia.up.railway.app/');
        if (!response.ok) throw new Error('Falha ao obter liturgia');
        const data = await response.json();
        setLiturgia(data);
      } catch (err) {
        setError('Não foi possível carregar a liturgia de hoje. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchLiturgia();
  }, []);

  const changeFontSize = (delta: number) => {
    setFontSize(prev => Math.min(Math.max(prev + delta, 14), 28));
  };

  if (loading) return <LoadingSpinner animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} />;
  if (error) return <LiturgiaContainer><ErrorMessage>{error}</ErrorMessage></LiturgiaContainer>;
  if (!liturgia) return null;

  const tabs = [
    { id: 'l1', title: '1ª Leitura', content: liturgia.primeiraLeitura },
    ...(liturgia.segundaLeitura ? [{ id: 'l2', title: '2ª Leitura', content: liturgia.segundaLeitura }] : []),
    { id: 'sal', title: 'Salmo', content: liturgia.salmo },
    { id: 'eva', title: 'Evangelho', content: liturgia.evangelho }
  ];

  return (
    <LiturgiaContainer>
      <SEO 
        title="Liturgia Diária - Apenas um Católico"
        description="Acompanhe as leituras da missa de hoje. Fortaleça sua fé com a Palavra de Deus."
        url="https://joaocarlosteco.github.io/Apenas-um-Catolico/liturgia-diaria"
      />

      <Header>
        <DateInfo>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</DateInfo>
        <Title>Liturgia Diária</Title>
        <LiturgicalPeriod color={liturgia.cor}>
          {liturgia.tempo}
        </LiturgicalPeriod>
      </Header>

      <Controls>
        <FontControls>
          <IconButton onClick={() => changeFontSize(-2)}><FiMinus /></IconButton>
          <span style={{ fontWeight: 700, minWidth: '40px', textAlign: 'center' }}>{fontSize}px</span>
          <IconButton onClick={() => changeFontSize(2)}><FiPlus /></IconButton>
        </FontControls>
        <ShareButton onClick={() => navigator.share?.({ title: 'Liturgia Diária', url: window.location.href })}>
          <FiShare2 /> Compartilhar
        </ShareButton>
      </Controls>

      <TabContainer>
        <TabHeader>
          {tabs.map((tab, i) => (
            <TabButton key={tab.id} active={activeTab === i} onClick={() => setActiveTab(i)}>
              {tab.title}
            </TabButton>
          ))}
        </TabHeader>

        <AnimatePresence mode="wait">
          <TabContent
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ReadingTitle>{tabs[activeTab].content.titulo}</ReadingTitle>
            <ReadingText 
              fontSize={fontSize}
              dangerouslySetInnerHTML={{ __html: formatarTextoComNumeros(tabs[activeTab].content.texto) }} 
            />
            <Reference>{tabs[activeTab].content.referencia}</Reference>
          </TabContent>
        </AnimatePresence>
      </TabContainer>
    </LiturgiaContainer>
  );
};

export default LiturgiaDiaria;
