import React from 'react';
import { getSantoImagePath } from '../utils/imageUtils';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, CardGrid } from '../components/Card';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

interface SantoItem {
  id: string | number;
  name: string;
  image: string;
  description: string;
  link?: string;
}

const santos: SantoItem[] = [
  {
    id: 'sao-francisco-de-assis',
    name: 'São Francisco de Assis',
    image: getSantoImagePath('sao-francisco.jpg'),
    description: 'Padroeiro dos animais e da ecologia',
    link: '/santos/sao-francisco'
  },
  {
    id: 'santa-teresinha',
    name: 'Santa Teresinha',
    image: getSantoImagePath('santa-teresinha.jpg'),
    description: 'Doutora da Igreja e padroeira das missões.'
  },
  {
    id: 'padre-pio',
    name: 'São Padre Pio',
    image: getSantoImagePath('padre-pio.webp'),
    description: 'Padre estigmatizado e confessor.'
  },
  {
    id: 'nossa-senhora',
    name: 'Nossa Senhora',
    image: getSantoImagePath('nossa-senhora.webp'),
    description: 'Mãe de Jesus e nossa intercessora.'
  }
];

const PageContainer = styled.div`
  padding: 40px 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px 0;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  margin: ${props => props.theme.spacing.xxl} 0;
  color: ${props => props.theme.colors.primary};
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  position: relative;
  font-weight: 800;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin: ${props => props.theme.spacing.xl} 0;
  }

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

const SantoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px 10px;
  }
`;

const SantoCard = styled(Card)<{ isClickable: boolean }>`
  overflow: hidden;
  position: relative;
  padding: 0;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: ${props => props.theme.colors.glass.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.strong};
    
    img {
      transform: scale(1.1);
    }
  }
`;

const SantoInfo = styled.div`
  padding: 24px;
  text-align: center;
  background: transparent;

  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 800;
    font-family: ${props => props.theme.fonts.heading};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.95rem;
    line-height: 1.6;
    font-family: ${props => props.theme.fonts.body};
  }
  
  .badge {
    display: inline-block;
    padding: 4px 12px;
    background: ${props => props.theme.colors.secondary}20;
    color: ${props => props.theme.colors.secondary};
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const Santos: React.FC = () => {
  return (
    <PageContainer>
      <SEO
        title="Santos que Inspiram"
        description="Conheça a história dos santos católicos. Exemplos de fé, amor e devoção que inspiram nossa jornada espiritual."
        keywords="santos católicos, São Francisco, Santa Teresinha, Padre Pio, Nossa Senhora, fé, devoção"
        url="https://joaocarlosteco.github.io/Apenas-um-Catolico/santos"
      />
      <PageTitle>Santos que Inspiram</PageTitle>
      <SantoContainer>
        <CardGrid>
          {santos.map((santo, idx) => (
            <SantoCard
              key={santo.id}
              isClickable={!!santo.link}
              hover={!!santo.link}
              shadow="soft"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {santo.link ? (
                <Link to={santo.link}>
                  <OptimizedImage src={santo.image} alt={santo.name} height="300px" hover />
                  <SantoInfo>
                    <span className="badge">Conheça sua História</span>
                    <h2>{santo.name}</h2>
                    <p>{santo.description}</p>
                  </SantoInfo>
                </Link>
              ) : (
                <>
                  <OptimizedImage src={santo.image} alt={santo.name} height="300px" hover />
                  <SantoInfo>
                    <span className="badge">Em Breve</span>
                    <h2>{santo.name}</h2>
                    <p>{santo.description}</p>
                  </SantoInfo>
                </>
              )}
            </SantoCard>
          ))}
        </CardGrid>
      </SantoContainer>
    </PageContainer>
  );
};

export default Santos;
