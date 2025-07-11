import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, CardGrid } from '../components/Card';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

const santos = [
  {
    id: 4,
    name: 'São Francisco de Assis',
    image: '/images/santos/São franciso.jpg',
    description: 'Padroeiro dos animais e da ecologia',
    link: '/santos/sao-francisco'
  },
  {
    id: 2,
    name: 'Santa Teresinha',
    image: '/images/santos/Santa terezinha.jpg',
    description: 'Doutora da Igreja e padroeira das missões.'
  },
  {
    id: 3,
    name: 'São Padre Pio',
    image: '/images/santos/Padre-Pio.webp',
    description: 'Padre estigmatizado e confessor.'
  },
  {
    id: 1,
    name: 'Nossa Senhora',
    image: '/images/santos/Nossa senhora.webp',
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
  font-size: clamp(2rem, 5vw, 3rem);
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    margin: ${props => props.theme.spacing.xl} 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
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

const SantoCard = styled(Card)`
  overflow: hidden;
  position: relative;
  padding: 0;
  cursor: pointer;

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }

    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(27, 51, 88, 0) 0%,
      rgba(27, 51, 88, 0.8) 100%
    );
    opacity: 0;
    transition: opacity ${props => props.theme.transitions.normal};
  }
`;

const SantoImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 3px solid ${props => props.theme.colors.secondary};
  transition: transform ${props => props.theme.transitions.normal};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 200px;
    border-bottom-width: 2px;
  }
`;

const SantoInfo = styled.div`
  padding: 24px;
  text-align: center;
  position: relative;
  z-index: 2;
  background: ${props => props.theme.colors.white};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 16px;
  }

  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    transition: color ${props => props.theme.transitions.normal};

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 1rem;
    transition: color ${props => props.theme.transitions.normal};

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 0.85rem;
    }
  }
`;

const PlaceholderText = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  margin-top: 1rem;
  font-size: 0.9rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    margin-top: 0.8rem;
  }
`;

const Santos = () => {
  return (
    <PageContainer>
      <SEO
        title="Santos"
        description="Conheça a história dos santos católicos. Exemplos de fé, amor e devoção que inspiram nossa jornada espiritual."
        keywords="santos católicos, São Francisco, Santa Teresinha, Padre Pio, Nossa Senhora, fé, devoção"
        url="https://apenas-um-catolico.vercel.app/santos"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Santos que Inspiram",
          "description": "Conheça a história dos santos católicos. Exemplos de fé, amor e devoção que inspiram nossa jornada espiritual.",
          "url": "https://apenas-um-catolico.vercel.app/santos"
        }}
      />
      <PageTitle>Santos que Inspiram</PageTitle>
      <SantoContainer>
        <CardGrid>
          {santos.map((santo, idx) => (
            <SantoCard
              key={santo.id}
              isClickable={!!santo.link}
              whileHover={santo.link ? { y: -10 } : {}}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {santo.link ? (
                <Link to={santo.link}>
                  <OptimizedImage src={santo.image} alt={santo.name} height="300px" hover />
                  <SantoInfo>
                    <h2>{santo.name}</h2>
                    <p>{santo.description}</p>
                  </SantoInfo>
                </Link>
              ) : (
                <>
                  <OptimizedImage src={santo.image} alt={santo.name} height="300px" hover />
                  <SantoInfo>
                    <h2>{santo.name}</h2>
                    <p>{santo.description}</p>
                    <PlaceholderText>
                      O nosso querido católico está trabalhando nisso ainda.
                    </PlaceholderText>
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