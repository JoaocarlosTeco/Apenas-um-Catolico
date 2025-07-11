import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Card, CardGrid, CardTitle, CardText } from '../components/Card';

const oracoes = [
  {
    titulo: 'Pai Nosso',
    texto: `Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.`
  },
  {
    titulo: 'Ave Maria',
    texto: `Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.`
  },
  {
    titulo: 'Glória ao Pai',
    texto: `Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.`
  },
  {
    titulo: 'Vinde, Espírito Santo',
    texto: `Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do Vosso amor. Enviai o Vosso Espírito e tudo será criado, e renovareis a face da terra.

Oremos: Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo, Senhor nosso. Amém.`
  },
  {
    titulo: 'Oração de São Francisco',
    texto: `Senhor, fazei-me instrumento de vossa paz. Onde houver ódio, que eu leve o amor... (veja completa na página de São Francisco)`
  }
];

const OracaoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px 10px;
  }
`;

const OracaoCard = styled(Card)`
  position: relative;
`;

const OracaoTitle = styled(CardTitle)`
  padding-right: 40px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-right: 20px;
    font-size: 1.1rem;
  }
`;

const OracaoText = styled(CardText)``;

const CopyButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: 0.8rem;
    right: 0.8rem;
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
  font-size: clamp(2rem, 5vw, 3rem);
  position: relative;

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

const Grid = styled(CardGrid)``;

const Oracao = () => {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <OracaoContainer>
      <Helmet>
        <title>Orações - Apenas um Católico</title>
        <meta name="description" content="Orações católicas tradicionais para fortalecer sua fé." />
      </Helmet>
      <Title>Orações</Title>
      <Grid>
        {oracoes.map((oracao, idx) => (
          <OracaoCard key={oracao.titulo}>
            <OracaoTitle>{oracao.titulo}</OracaoTitle>
            <OracaoText>{oracao.texto}</OracaoText>
            <CopyButton onClick={() => handleCopy(oracao.texto, idx)} aria-label="Copiar oração">
              {copiedIdx === idx ? <FiCheck /> : <FiCopy />}
            </CopyButton>
          </OracaoCard>
        ))}
      </Grid>
    </OracaoContainer>
  );
};

export default Oracao; 