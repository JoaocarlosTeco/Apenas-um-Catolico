import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Emblema } from '../../components/Emblemas';
import { santos } from '../../data/santos';

// Os santos da casa na home: a medalha de cada um, o nome, a festa e uma frase.
// Sem foto e sem cartão: as medalhas lado a lado, como numa vitrine de santinhos.

const Secao = styled.section`
  margin-top: 64px;
  padding: 56px 16px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    margin-top: 88px;
    padding: 72px 24px;
  }
`;

const Conteudo = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const Cabecalho = styled.div`
  text-align: center;
  margin-bottom: 36px;

  small {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.05rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 2px;
  }

  h2 {
    font-size: clamp(1.8rem, 6vw, 2.4rem);
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

const Vitrine = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px 16px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;

    li + li {
      border-left: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
  }
`;

// a cor de cada santo, mais clara no tema escuro
const tom = (theme, cor) =>
  theme.modo === 'escuro' ? `color-mix(in srgb, ${cor} 55%, white)` : cor;

const Santo = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 900px) {
    padding: 8px 24px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  /* a medalha gira como moeda ao passar o mouse, tocar ou focar pelo teclado */
  svg {
    width: 104px;
    height: 104px;
    transition: transform 0.9s cubic-bezier(0.3, 1.4, 0.5, 1);
  }

  &:hover svg,
  &:focus-visible svg,
  &:active svg {
    transform: perspective(400px) rotateY(360deg);
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }

    &:hover svg,
    &:focus-visible svg,
    &:active svg {
      transform: none;
    }
  }

  small {
    margin-top: 12px;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: ${({ theme, $cor }) => tom(theme, $cor)};
  }

  strong {
    margin-top: 2px;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.3rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  q {
    display: none;
    margin-top: 10px;
    font-size: 1.02rem;
    font-style: italic;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (min-width: 640px) {
    q {
      display: block;
    }
  }
`;

const SantosSection = () => (
  <Secao aria-labelledby="titulo-santos">
    <Conteudo>
      <Cabecalho>
        <small>Os santos da casa</small>
        <h2 id="titulo-santos">Quatro vidas para conhecer</h2>
      </Cabecalho>
      <Vitrine>
        {santos.map(santo => (
          <li key={santo.slug}>
            <Santo to={`/santos/${santo.slug}`} $cor={santo.cores.principal}>
              <Emblema slug={santo.slug} />
              <small>{santo.festa.split(',')[0]}</small>
              <strong>{santo.nome}</strong>
              {santo.frase?.texto && <q>{santo.frase.texto}</q>}
            </Santo>
          </li>
        ))}
      </Vitrine>
    </Conteudo>
  </Secao>
);

export default SantosSection;
