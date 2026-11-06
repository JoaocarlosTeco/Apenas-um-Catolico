import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';
import CartaoSanto from '../components/CartaoSanto';
import { santos } from '../data/santos';

const SITE = 'https://joaocarlosteco.github.io/Apenas-um-Catolico';

const Pagina = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 104px 16px 72px;

  @media (min-width: 768px) {
    padding-top: 128px;
  }
`;

const Cabecalho = styled.header`
  text-align: center;
  max-width: 620px;
  margin: 0 auto 40px;

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 6vw, 2.75rem);
    color: ${({ theme }) => theme.colors.titleColor};
    margin-bottom: 12px;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
  }
`;

const Grade = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Santos = () => (
  <Pagina>
    <SEO
      title="Santos"
      description="A vida, a linha do tempo e a oração de São Francisco, Santa Teresinha, Padre Pio e Nossa Senhora."
      keywords="santos católicos, São Francisco, Santa Teresinha, Padre Pio, Nossa Senhora"
      url={`${SITE}/santos`}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Santos que inspiram',
        url: `${SITE}/santos`,
      }}
    />
    <Cabecalho>
      <h1>Santos que inspiram</h1>
      <p>
        Cada santo viveu o Evangelho de um jeito. Conheça a história, as datas que marcaram a vida
        de cada um e uma oração para rezar com eles.
      </p>
    </Cabecalho>
    <Grade>
      {santos.map(santo => (
        <CartaoSanto key={santo.slug} santo={santo} />
      ))}
    </Grade>
  </Pagina>
);

export default Santos;
