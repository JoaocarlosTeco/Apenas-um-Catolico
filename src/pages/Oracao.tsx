import React, { useState } from 'react';
import styled from 'styled-components';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Card, CardGrid, CardTitle, CardText } from '../components/Card';
import SEO from '../components/SEO';
import { oracoes } from '../data/oracoes';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 30px 15px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  position: relative;
  margin-bottom: 1.5rem;
  font-weight: 800;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${props => props.theme.colors.secondary};
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const OracaoCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 3.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid ${props => props.theme.colors.secondary}40;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.$active ? 'white' : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.secondary}40;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const OracaoText = styled(CardText)`
  white-space: pre-line;
  font-family: 'EB Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.text};
  margin-top: 1rem;
  flex-grow: 1;
`;

const InfoSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed ${props => props.theme.colors.secondary}40;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};

  strong {
    color: ${props => props.theme.colors.primary};
  }
`;

const Oracao: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <PageContainer>
      <SEO
        title="Orações Católicas - Apenas um Católico"
        description="Encontre as orações católicas mais tradicionais e poderosas para fortalecer sua fé diária."
        keywords="orações católicas, pai nosso, ave maria, credo, oração são francisco, fé, devoção"
        url="https://joaocarlosteco.github.io/Apenas-um-Catolico/oracao"
      />
      
      <PageHeader>
        <Title>Orações</Title>
        <Subtitle>
          A oração é o diálogo da alma com Deus. Encontre aqui orações para todos os momentos do seu dia.
        </Subtitle>
      </PageHeader>

      <CardGrid minWidth="340px">
        {oracoes.map((oracao) => (
          <OracaoCard key={oracao.id} shadow="soft">
            <CategoryTag>{oracao.categoria}</CategoryTag>
            
            <ActionButtons>
              <IconButton 
                onClick={() => handleCopy(oracao.texto, oracao.id)} 
                $active={copiedId === oracao.id}
                title="Copiar oração"
              >
                {copiedId === oracao.id ? <FiCheck /> : <FiCopy />}
              </IconButton>
            </ActionButtons>

            <CardTitle style={{ marginBottom: '1rem' }}>{oracao.titulo}</CardTitle>
            <OracaoText>{oracao.texto}</OracaoText>
            
            {oracao.origem && (
              <InfoSection>
                <strong>Origem:</strong> {oracao.origem}
              </InfoSection>
            )}
          </OracaoCard>
        ))}
      </CardGrid>
    </PageContainer>
  );
};

export default Oracao;
