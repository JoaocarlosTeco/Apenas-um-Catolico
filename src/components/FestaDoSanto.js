import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';
import { Emblema } from './Emblemas';
import { ChuvaDeRosas, Estrelas, Passaros } from './Ambiente';
import { santoPorSlug } from '../data/santos';
import { diaLiturgico } from '../services/calendarioLiturgico';

// No dia da festa de um dos santos do site, a home ganha uma faixa de festa com o efeito dele:
// pássaros para Francisco, rosas para Teresinha (e uma chuva de rosas na tela ao abrir),
// estrelas douradas para Padre Pio e para Nossa Senhora.

const Faixa = styled(Link)`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding: 18px 20px;
  border-radius: 4px;
  border: 1px solid ${({ $cor }) => $cor};
  background: ${({ $fundo }) => $fundo};
  color: ${({ $texto }) => $texto};

  &:hover {
    color: ${({ $texto }) => $texto};
  }

  &:hover span {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  > svg {
    width: 64px;
    height: 64px;
  }

  small {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.05rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${({ $cor }) => $cor};
  }

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(1.35rem, 5vw, 1.7rem);
    line-height: 1.15;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: 0.86rem;
    font-weight: 600;
    color: ${({ $cor }) => $cor};
  }
`;

const Efeito = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  color: ${({ $cor }) => $cor};
`;

function efeitoDo(slug, cor) {
  if (slug === 'sao-francisco')
    return <Passaros cor="currentColor" faixa={60} />;
  if (slug === 'santa-teresinha')
    return <ChuvaDeRosas quantidade={10} semente={9} />;
  if (slug === 'padre-pio')
    return <Estrelas cor="#E0B25A" quantidade={10} semente={23} />;
  return <Estrelas cor={cor} />;
}

const FestaDoSanto = ({ dia }) => {
  const info = diaLiturgico(dia);
  const celebracao = [info.principal, ...info.outras].find(c => c?.santo);
  const santo = celebracao ? santoPorSlug(celebracao.santo) : null;
  // no dia de Santa Teresinha, uma chuva de rosas cobre a tela por alguns segundos ao abrir
  const [chuva, setChuva] = useState(santo?.slug === 'santa-teresinha');

  useEffect(() => {
    if (!chuva) return undefined;
    const fim = setTimeout(() => setChuva(false), 9000);
    return () => clearTimeout(fim);
  }, [chuva]);

  if (!santo) return null;
  const claro = santo.paleta?.claro || {};
  const cor = santo.cores.principal;
  const chamada =
    santo.slug === 'nossa-senhora'
      ? 'Conhecer Nossa Senhora'
      : 'Conhecer a história';

  return (
    <>
      {chuva && <ChuvaDeRosas fixa quantidade={26} semente={31} />}
      <Faixa
        to={`/santos/${santo.slug}`}
        $cor={claro.modo === 'escuro' ? santo.cores.brilho : cor}
        $fundo={claro.fundo || '#fbf8f1'}
        $texto={claro.titulo || '#14284b'}
      >
        <Efeito
          aria-hidden="true"
          $cor={claro.modo === 'escuro' ? santo.cores.brilho : cor}
        >
          {efeitoDo(santo.slug, santo.cores.brilho)}
        </Efeito>
        <Emblema slug={santo.slug} />
        <div>
          <small>Hoje é dia de festa</small>
          <strong>{celebracao.nome}</strong>
          <span>
            {chamada} <PiArrowRight aria-hidden="true" />
          </span>
        </div>
      </Faixa>
    </>
  );
};

export default FestaDoSanto;
