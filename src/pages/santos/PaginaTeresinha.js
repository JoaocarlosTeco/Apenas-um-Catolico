import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PiFlower } from 'react-icons/pi';
import BotaoMusica, { BotaoAmbiente } from '../../components/BotaoMusica';
import { ChuvaDeRosas } from '../../components/Ambiente';
import { Emblema } from '../../components/Emblemas';
import Novena from '../../components/Novena';
import { musicas } from '../../data/musicas';
import { CascaDoSanto, CopiarOracao, OutrosSantos, Video, tinta, tom } from './comum';

// Página de Santa Teresinha: caderno e santinho. A "História de uma Alma" nasceu em
// cadernos escritos por obediência, e o santinho de papel é o jeito brasileiro de levar
// um santo no bolso. Por isso: retrato oval, a vida em páginas pautadas, os episódios
// como bilhetes, a pequena via como uma escada e a oração impressa num santinho rendado.

const SERIFA = "'Cormorant Garamond', Georgia, serif";

/** Altura de cada linha da pauta do caderno: todo o texto do diário anda nela */
const PAUTA = '1.875rem';

/** Onde nasceu e onde morreu, com os anos */
const DATAS = 'Alençon, 1873 · Lisieux, 1897';

const DEGRAUS = ['Primeiro degrau', 'Segundo degrau', 'Terceiro degrau', 'Quarto degrau'];

// os lugares aparecem na ordem da vida dela: primeiro a cidade natal
const ORDEM_DAS_CIDADES = ['Alençon', 'Lisieux'];

// episódios em que o próprio texto mostra que é ela quem conta (a florzinha, o elevador,
// o Natal de 1886). O das missões fala também do que veio depois da morte, então fica sem fonte.
const COM_FONTE = new Set(['florzinha', 'elevador', 'natal']);

// Detalhes do retrato (Santa terezinha.jpg, 892 x 1280) para cada sinal da iconografia.
// x e y: o ponto do quadro que fica no centro do círculo, em fração da largura e da altura;
// zoom: quantas vezes o quadro é mais largo que o círculo.
// O quadro não mostra crucifixo: para esse sinal vai a medalha da página, que é o crucifixo com rosas.
const RECORTES = {
  'Hábito marrom': {
    x: 0.5,
    y: 0.66,
    zoom: 3,
    alt: 'Detalhe do retrato: o hábito marrom das carmelitas',
  },
  'Capa branca e véu preto': {
    x: 0.72,
    y: 0.43,
    zoom: 3.2,
    alt: 'Detalhe do retrato: o véu preto caindo sobre a capa branca',
  },
  Rosas: {
    x: 0.31,
    y: 0.55,
    zoom: 3.4,
    alt: 'Detalhe do retrato: a rosa que ela segura na mão',
  },
  'Crucifixo coberto de rosas': { medalha: true },
};

const RECORTE_PADRAO = { x: 0.5, y: 0.35, zoom: 1.6, alt: '' };

/* ---------- Pequenos utilitários ---------- */

/** As aspas retas dos dados viram aspas tipográficas */
const aspas = texto => texto.replace(/"([^"]*)"/g, '“$1”');

/** O título que aparece entre aspas num texto, como "História de uma Alma" */
const obraCitada = texto => {
  const achado = texto ? texto.match(/"([^"]+)"/) : null;
  return achado ? achado[1] : null;
};

const juntar = lista =>
  lista.length > 1 ? `${lista.slice(0, -1).join(', ')} e ${lista[lista.length - 1]}` : lista[0] || '';

/** O episódio do elevador: a frase que o abre e a fala dela, para fechar a pequena via */
function elevadorDe(historias) {
  const episodio = historias?.itens?.find(item => item.ilustracao === 'elevador');
  const falas = episodio ? episodio.texto.match(/"[^"]+"/g) : null;
  if (!falas) return null;
  const fala = falas[falas.length - 1].slice(1, -1);
  const fimDaPrimeira = episodio.texto.indexOf('. ');
  return {
    contexto: fimDaPrimeira > 0 ? aspas(episodio.texto.slice(0, fimDaPrimeira + 1)) : null,
    fala: fala.charAt(0).toUpperCase() + fala.slice(1),
  };
}

/** Agrupa os lugares pela cidade ("Lisieux, França" → Lisieux) */
function porCidade(lugares = []) {
  const grupos = [];
  lugares.forEach(lugar => {
    const [cidade, ...resto] = lugar.cidade.split(',');
    const nome = cidade.trim();
    let grupo = grupos.find(g => g.cidade === nome);
    if (!grupo) {
      grupo = { cidade: nome, regiao: resto.join(',').trim(), itens: [] };
      grupos.push(grupo);
    }
    grupo.itens.push(lugar);
  });
  const posicao = grupo => {
    const i = ORDEM_DAS_CIDADES.indexOf(grupo.cidade);
    return i === -1 ? ORDEM_DAS_CIDADES.length : i;
  };
  return grupos.sort((a, b) => posicao(a) - posicao(b));
}

const tamanhoDaFrase = texto => (texto.length < 40 ? 'curta' : texto.length < 110 ? 'media' : 'longa');

const TAMANHOS = {
  curta: 'clamp(2.2rem, 9vw, 3rem)',
  media: 'clamp(1.6rem, 6vw, 2.1rem)',
  longa: 'clamp(1.3rem, 4.6vw, 1.55rem)',
};

/* ---------- Cores ---------- */

// a rosa do santo; no tema escuro ela clareia para continuar legível
const rosa = ({ theme }) => tom(theme, theme.colors.accent);
const rosaClara =
  quanto =>
  ({ theme }) =>
    `color-mix(in srgb, ${tom(theme, theme.colors.accent)} ${quanto}%, transparent)`;

/* ---------- Ornamento: uma rosinha em traço fino ---------- */

const Florao = ({ filetes = true, className }) => (
  <svg
    className={className}
    viewBox={filetes ? '0 0 64 16' : '21 0 22 16'}
    aria-hidden="true"
    focusable="false"
  >
    {filetes && <path d="M2 8 H19 M45 8 H62" />}
    {/* o botão da rosa, uma espiral de meias-voltas */}
    <path d="M32 8 a1 1 0 0 1 2 0 a2 2 0 0 1 -4 0 a3 3 0 0 1 6 0 a3.5 3.5 0 0 1 -7 0" />
    <path d="M28.6 10.2 C26.7 8 24.3 8.3 22.7 10.6 C24.7 12.1 26.8 12 28.6 10.2 Z" />
    <path d="M35.4 10.2 C37.3 8 39.7 8.3 41.3 10.6 C39.3 12.1 37.2 12 35.4 10.2 Z" />
  </svg>
);

const Ornamento = styled(Florao)`
  display: block;
  width: ${({ filetes = true }) => (filetes ? '96px' : '33px')};
  height: 24px;
  margin: 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 0.9;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: ${rosa};
`;

/* ---------- Capa: o retrato oval, como um santinho grande ---------- */

// isolation: as pétalas (z-index -1) caem atrás do retrato e do texto
const Capa = styled.header`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 104px 16px 72px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 136px 32px 96px;
  }
`;

const CapaConteudo = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

// algumas pétalas caindo devagar o tempo todo na capa, mais discretas que a chuva de rosas
const PetalasDaCapa = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.55;
  pointer-events: none;
`;

const Oval = styled.figure`
  width: min(70vw, 280px);
  margin: 0 auto 36px;
  padding: 6px;
  border: 1px solid ${rosaClara(60)};
  border-radius: 50%;

  > div {
    padding: 4px;
    border: 1px solid ${rosaClara(35)};
    border-radius: 50%;
  }

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    object-position: ${({ $posicao }) => $posicao || 'center 25%'};
    border-radius: 50%;
  }

  @media (min-width: 768px) {
    width: 320px;
    margin-bottom: 44px;
  }
`;

const Nome = styled.h1`
  font-family: ${SERIFA};
  font-style: italic;
  font-weight: 500;
  font-size: clamp(2.6rem, 11vw, 4.5rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.titleColor};

  span {
    display: block;
    margin-top: 0.3em;
    font-size: 0.48em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Datas = styled.p`
  margin: 18px 0 24px;
  font-family: ${SERIFA};
  font-size: 1.12rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.12em;
  color: ${rosa};
`;

const FraseCapa = styled.figure`
  margin-top: 22px;

  blockquote {
    max-width: 30ch;
    margin: 0 auto;
    font-style: italic;
    font-size: clamp(1.25rem, 4.6vw, 1.5rem);
    line-height: 1.5;
  }

  figcaption {
    margin-top: 10px;
    font-size: 0.95rem;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Festa = styled.p`
  margin-top: 22px;
  font-size: 0.98rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    white-space: nowrap;
  }
`;

const Acoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 14px 12px;
  margin-top: 34px;
  color: ${({ theme }) => theme.colors.titleColor};

  > div,
  > button {
    width: min(100%, 300px);
  }

  button {
    justify-content: center;
  }
`;

const BotaoRosas = styled(BotaoAmbiente)`
  color: ${rosa};
`;

/* ---------- Corpo e títulos ---------- */

const Corpo = styled.div`
  max-width: 808px;
  margin: 0 auto;
  padding: 0 16px 96px;

  @media (min-width: 768px) {
    padding: 0 24px 128px;
  }
`;

const Secao = styled.section`
  margin-top: 96px;

  &:first-child {
    margin-top: 8px;
  }

  @media (min-width: 768px) {
    margin-top: 128px;
  }
`;

const Cabeca = styled.div`
  text-align: center;
  margin-bottom: 28px;

  ${Ornamento} {
    margin-bottom: 12px;
  }

  h2 {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 500;
    font-size: clamp(2rem, 7.5vw, 2.7rem);
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

const Titulo = ({ id, children }) => (
  <Cabeca>
    <Ornamento />
    <h2 id={id}>{children}</h2>
  </Cabeca>
);

const Introducao = styled.p`
  max-width: 34em;
  margin: 0 auto 40px;
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Subtitulo = styled.h3`
  margin: 64px 0 14px;
  font-family: ${SERIFA};
  font-size: 1.25rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.1em;
  text-align: center;
  color: ${rosa};
`;

/* ---------- A vida, como num diário ---------- */

const Historia = styled.div`
  max-width: 36em;
  margin: 0 auto 56px;
  font-size: 1.12rem;
  line-height: 1.8;
  hyphens: auto;

  p + p {
    margin-top: 1em;
  }

  p:first-child::first-line {
    font-variant: small-caps;
    letter-spacing: 0.03em;
  }
`;

// Papel pautado: as linhas caem a cada PAUTA e todo o texto tem essa mesma altura de linha,
// então ano e texto ficam sempre sentados na pauta. No computador, o caderno abre em duas páginas.
const Caderno = styled.div`
  position: relative;
  padding-top: ${PAUTA};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent calc(${PAUTA} - 1px),
    ${({ theme }) => `color-mix(in srgb, ${theme.colors.text} 9%, transparent)`} calc(${PAUTA} - 1px),
    ${({ theme }) => `color-mix(in srgb, ${theme.colors.text} 9%, transparent)`} ${PAUTA}
  );
  /* sobe a pauta um pouco para a letra assentar na linha, como num caderno de verdade */
  background-position: 0 -0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 3px;

  /* a linha da margem */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 2.25rem;
    width: 1px;
    background: ${rosaClara(45)};
  }

  ol {
    list-style: none;
  }

  li {
    padding: 0 1.25rem ${PAUTA} 3rem;
  }

  h3 {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: ${PAUTA};
    color: ${rosa};
  }

  p {
    font-size: 1.06rem;
    line-height: ${PAUTA};
  }

  @media (min-width: 720px) {
    &::before {
      left: 2.5rem;
    }

    /* a dobra do caderno aberto */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(50% - 2px);
      width: 5px;
      border-left: 1px solid ${({ theme }) => theme.colors.borderColor};
      border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
    }

    ol {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(${({ $linhas }) => $linhas}, auto);
      grid-auto-flow: column;
    }

    /* a margem da página da direita */
    ol::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(50% + 2.5rem);
      width: 1px;
      background: ${rosaClara(45)};
    }

    li {
      padding: 0 1.75rem ${PAUTA} 3.25rem;
    }
  }
`;

/* ---------- A pequena via: uma escada ---------- */

// os degraus se acendem um depois do outro quando a escada aparece na tela (data-subiu)
const Escada = styled.ol`
  list-style: none;

  li {
    margin-left: calc(var(--i) * 14px);
    padding: 16px 8px 22px 18px;
    background: ${({ theme }) => theme.colors.cardBackground};
    border-top: 1px solid ${rosa};
    border-left: 1px solid ${rosaClara(40)};
    transition:
      opacity 0.6s ease,
      transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1),
      background 0.8s ease;
    transition-delay: calc(var(--i) * 260ms);
  }

  &[data-subiu='nao'] li {
    opacity: 0;
    transform: translateY(22px);
  }

  &[data-subiu='sim'] li {
    background: ${({ theme }) =>
      `color-mix(in srgb, ${rosa} ${theme.modo === 'escuro' ? 10 : 5}%, ${theme.colors.cardBackground})`};
  }

  li > span {
    display: block;
    font-family: ${SERIFA};
    font-size: 1.02rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${rosa};
  }

  h3 {
    margin: 4px 0 8px;
    font-size: 1.4rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  p {
    font-size: 1.02rem;
    line-height: 1.65;
  }

  /* no computador os degraus sobem da esquerda para a direita */
  @media (min-width: 900px) {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    border-bottom: 1px solid ${rosaClara(40)};

    li {
      margin-left: 0;
      margin-top: calc((var(--total) - 1 - var(--i)) * 3.25rem);
      padding: 18px 16px 28px;
    }

    li:last-child {
      border-right: 1px solid ${rosaClara(40)};
    }
  }

  @media (min-width: 1040px) {
    margin: 0 -80px;
  }
`;

const Elevador = styled.figure`
  max-width: 34em;
  margin: 0 auto;
  text-align: center;

  /* o cabo do elevador, saindo do alto da escada: desce depois que os degraus acendem */
  &::before {
    content: '';
    display: block;
    width: 1px;
    height: 48px;
    margin: 0 auto 18px;
    background: ${rosaClara(50)};
    transform-origin: top;
    transition: transform 0.9s ease ${({ $atraso }) => $atraso || 0}ms;
  }

  &[data-subiu='nao']::before {
    transform: scaleY(0);
  }

  > p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 10px;
  }

  blockquote {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 500;
    font-size: clamp(1.4rem, 5vw, 1.75rem);
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  figcaption {
    margin-top: 10px;
    font-size: 0.95rem;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

/* ---------- Episódios: bilhetes ---------- */

const Bilhetes = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

const Bilhete = styled.article`
  position: relative;
  padding: 26px 22px 24px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 2px;

  /* o filete interno de papel de carta */
  &::before {
    content: '';
    position: absolute;
    inset: 5px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    pointer-events: none;
  }

  ${Ornamento} {
    margin: 0 0 10px;
  }

  h3 {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.2;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  p {
    font-size: 1.03rem;
    line-height: 1.75;
  }

  footer {
    margin-top: 14px;
    text-align: right;
    font-family: ${SERIFA};
    font-style: italic;
    font-size: 1.02rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

/* ---------- Como reconhecer nas imagens: detalhes redondos do retrato ---------- */

const Detalhes = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px 16px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  figure {
    text-align: center;
  }

  figcaption strong {
    display: block;
    margin-bottom: 6px;
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 600;
    font-size: 1.22rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  figcaption span {
    display: block;
    font-size: 0.96rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Circulo = styled.div`
  width: min(100%, 140px);
  margin: 0 auto 16px;
  padding: 4px;
  border: 1px solid ${rosaClara(50)};
  border-radius: 50%;
`;

const Janela = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ $medalha, theme }) => ($medalha ? theme.colors.cardBackground : '#1c1416')};
  color: ${({ theme }) => theme.colors.titleColor};

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: none;
    height: auto;
  }

  > svg {
    display: block;
    width: 100%;
    height: 100%;
    padding: 6%;
  }
`;

/* ---------- Escritos ---------- */

const Frase = styled.figure`
  text-align: center;

  blockquote {
    max-width: 30ch;
    margin: 0 auto;
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 500;
    font-size: ${({ $tamanho }) => TAMANHOS[$tamanho]};
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  figcaption {
    margin-top: 12px;
    font-size: 0.95rem;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Separador = styled.div`
  margin: 36px 0;
`;

// a estante: um livro por prateleira, e a tábua dupla embaixo
const Estante = styled.ul`
  list-style: none;
  border-bottom: 3px double ${rosaClara(45)};

  li {
    display: grid;
    gap: 2px;
    padding: 14px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  }

  cite {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 1.25;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  span {
    line-height: 1.6;
  }

  @media (min-width: 640px) {
    li {
      grid-template-columns: 13rem 1fr;
      gap: 24px;
      align-items: baseline;
    }
  }
`;

/* ---------- Lugares: Alençon | Lisieux ---------- */

const Cidades = styled.div`
  display: grid;
  gap: 48px;

  @media (min-width: 640px) {
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    gap: 0;

    > div {
      padding: 0 28px;
    }

    > div:first-child {
      padding-left: 0;
    }

    > div:last-child {
      padding-right: 0;
    }

    > div + div {
      border-left: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
  }

  p.regiao {
    font-family: ${SERIFA};
    font-size: 1.02rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.1em;
    color: ${rosa};
  }

  h3 {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 500;
    font-size: 2.2rem;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  ul {
    list-style: none;
    margin-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  }

  li {
    padding: 14px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  }

  strong {
    display: block;
    font-family: ${SERIFA};
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  li p {
    margin-top: 2px;
    font-size: 1.02rem;
    line-height: 1.6;
  }
`;

/* ---------- Para ler ---------- */

const Leituras = styled.ul`
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

  li {
    padding: 16px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  }

  cite {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 600;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  li > span {
    display: block;
    font-size: 0.98rem;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: ${rosa};
  }

  p {
    margin-top: 4px;
    line-height: 1.6;
  }
`;

const Videos = styled.div`
  display: grid;
  gap: 16px;
`;

/* ---------- A oração num santinho ---------- */

// o pano onde o santinho está apoiado, para a borda rendada aparecer
const Mesa = styled.div`
  padding: 40px 16px 36px;
  border-radius: 3px;
  background: ${({ theme }) => tinta(theme, theme.colors.accent, theme.modo === 'escuro' ? 14 : 9)};
  text-align: center;
  color: ${({ theme }) => theme.colors.titleColor};

  @media (min-width: 768px) {
    padding: 56px 24px 48px;
  }
`;

// Papel marfim com a borda recortada em meias-luas, como os santinhos de renda.
// A máscara junta círculos encostados na borda com o miolo cheio.
const Santinho = styled.div`
  --r: 6px;
  max-width: 380px;
  margin: 0 auto 26px;
  padding: var(--r);
  text-align: center;
  background: ${({ $papel, theme }) =>
    theme.modo === 'escuro' ? `color-mix(in srgb, ${$papel.cartao} 90%, ${$papel.suave})` : $papel.cartao};
  color: ${({ $papel }) => $papel.texto};
  -webkit-mask:
    radial-gradient(circle closest-side, #000 96%, transparent) 0 0 / calc(2 * var(--r)) calc(2 * var(--r))
      round,
    linear-gradient(#000 0 0) content-box;
  mask:
    radial-gradient(circle closest-side, #000 96%, transparent) 0 0 / calc(2 * var(--r)) calc(2 * var(--r))
      round,
    linear-gradient(#000 0 0) content-box;
`;

const Renda = styled.div`
  margin: 8px;
  padding: 28px 20px 30px;
  border: 1px dotted ${({ $papel }) => `color-mix(in srgb, ${$papel.rosa} 70%, transparent)`};
  outline: 1px dotted ${({ $papel }) => `color-mix(in srgb, ${$papel.rosa} 40%, transparent)`};
  outline-offset: 4px;

  > svg:first-child {
    display: block;
    width: 84px;
    height: 84px;
    margin: 0 auto 14px;
    color: ${({ $papel }) => $papel.titulo};
  }

  ${Ornamento} {
    margin: 12px auto 18px;
    color: ${({ $papel }) => $papel.rosa};
  }

  > p:first-of-type {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 600;
    font-size: 1.22rem;
    line-height: 1.25;
    color: ${({ $papel }) => $papel.titulo};
  }

  > p + p {
    font-size: 1.08rem;
    line-height: 1.75;
    white-space: pre-line;
  }

  small {
    display: block;
    margin-top: 14px;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    padding: 32px 28px 34px;
  }
`;

/* ---------- Página ---------- */

const PaginaTeresinha = ({ santo }) => {
  const [chuva, setChuva] = useState(0);
  const escada = useRef(null);
  // sem IntersectionObserver ou com menos movimento, a escada já aparece pronta
  const [subiu, setSubiu] = useState(
    () =>
      typeof IntersectionObserver === 'undefined' ||
      Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  );

  useEffect(() => {
    if (subiu || !escada.current) return undefined;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setSubiu(true);
          observador.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observador.observe(escada.current);
    return () => observador.disconnect();
  }, [subiu]);

  // a chuva de rosas cobre a tela por alguns segundos e some; outro pedido recomeça
  useEffect(() => {
    if (!chuva) return undefined;
    const fim = setTimeout(() => setChuva(0), 12000);
    return () => clearTimeout(fim);
  }, [chuva]);

  const musica = musicas[santo.slug];
  const corte = santo.nome.indexOf(' do ');
  const nomeCurto = corte > 0 ? santo.nome.slice(0, corte) : santo.nome;
  const complemento = corte > 0 ? santo.nome.slice(corte + 1) : null;

  const vida = santo.linhaDoTempo || [];
  const historias = santo.historias;
  const fonte = obraCitada(historias?.introducao);
  const elevador = elevadorDe(historias);
  const cidades = porCidade(santo.lugares);
  const escritos = santo.escritos;
  // o santinho é papel impresso: usa sempre as cores claras da paleta, nos dois temas
  const papel = { ...santo.paleta?.claro, rosa: santo.cores.principal };

  return (
    <CascaDoSanto santo={santo}>
      {chuva > 0 && <ChuvaDeRosas key={chuva} fixa quantidade={30} semente={chuva * 11} />}

      <article aria-labelledby="teresinha-nome">
        <Capa>
          <PetalasDaCapa aria-hidden="true">
            <ChuvaDeRosas quantidade={8} semente={5} />
          </PetalasDaCapa>
          <CapaConteudo>
            <Oval $posicao={santo.posicaoImagem}>
              <div>
                <img
                  src={santo.imagem}
                  alt={`Retrato de ${santo.nome} com o hábito carmelita, a capa branca, o véu preto e rosas nas mãos`}
                  loading="eager"
                />
              </div>
            </Oval>

            <Nome id="teresinha-nome">
              {nomeCurto}
              {complemento && <span> {complemento}</span>}
            </Nome>
            <Datas>{DATAS}</Datas>
            <Ornamento />

            <FraseCapa>
              <blockquote>“{santo.frase.texto}”</blockquote>
              <figcaption>{santo.frase.autor}</figcaption>
            </FraseCapa>

            <Festa>
              <span>Festa em {santo.festa}</span>
              <span aria-hidden="true"> · </span>
              <span>
                {santo.rotuloPadroeiro || 'Padroeiro'}: {juntar(santo.padroeiro)}
              </span>
            </Festa>

            <Acoes>
              {musica && <BotaoMusica musica={musica} />}
              <BotaoRosas type="button" onClick={() => setChuva(n => n + 1)}>
                <PiFlower aria-hidden="true" /> Pedir uma chuva de rosas
              </BotaoRosas>
            </Acoes>
          </CapaConteudo>
        </Capa>

        <Corpo>
          <Secao aria-labelledby="teresinha-vida">
            <Titulo id="teresinha-vida">A vida, como num diário</Titulo>
            <Historia>
              {santo.historia.map(paragrafo => (
                <p key={paragrafo.slice(0, 24)}>{aspas(paragrafo)}</p>
              ))}
            </Historia>
            {vida.length > 0 && (
              <Caderno $linhas={Math.ceil(vida.length / 2)}>
                <ol aria-label="Datas da vida">
                  {vida.map(marco => (
                    <li key={marco.ano}>
                      <h3>{marco.ano}</h3>
                      <p>{aspas(marco.texto)}</p>
                    </li>
                  ))}
                </ol>
              </Caderno>
            )}
          </Secao>

          {santo.destaque && (
            <Secao aria-labelledby="teresinha-via">
              <Titulo id="teresinha-via">{santo.destaque.titulo}</Titulo>
              <Introducao>{santo.destaque.introducao}</Introducao>
              <Escada
                ref={escada}
                data-subiu={subiu ? 'sim' : 'nao'}
                style={{ '--total': santo.destaque.itens.length }}
              >
                {santo.destaque.itens.map((passo, i) => (
                  <li key={passo.titulo} style={{ '--i': i }}>
                    <span>{DEGRAUS[i] || `${i + 1}º degrau`}</span>
                    <h3>{passo.titulo}</h3>
                    <p>{passo.texto}</p>
                  </li>
                ))}
              </Escada>
              {elevador && (
                <Elevador
                  data-subiu={subiu ? 'sim' : 'nao'}
                  $atraso={santo.destaque.itens.length * 260 + 300}
                >
                  {elevador.contexto && <p>{elevador.contexto}</p>}
                  <blockquote>“{elevador.fala}”</blockquote>
                  <figcaption>
                    Santa Teresinha
                    {fonte && (
                      <>
                        , <cite>{fonte}</cite>
                      </>
                    )}
                  </figcaption>
                </Elevador>
              )}
            </Secao>
          )}

          {historias && (
            <Secao aria-labelledby="teresinha-episodios">
              <Titulo id="teresinha-episodios">{historias.titulo}</Titulo>
              <Introducao>{aspas(historias.introducao)}</Introducao>
              <Bilhetes>
                {historias.itens.map(item => (
                  <Bilhete key={item.titulo}>
                    <Ornamento filetes={false} />
                    <h3>{item.titulo}</h3>
                    <p>{aspas(item.texto)}</p>
                    {fonte && COM_FONTE.has(item.ilustracao) && (
                      <footer>
                        Contado por ela na <cite>{fonte}</cite>
                      </footer>
                    )}
                  </Bilhete>
                ))}
              </Bilhetes>
            </Secao>
          )}

          {santo.iconografia && (
            <Secao aria-labelledby="teresinha-imagens">
              <Titulo id="teresinha-imagens">Como reconhecer nas imagens</Titulo>
              <Introducao>{santo.iconografia.introducao}</Introducao>
              <Detalhes>
                {santo.iconografia.itens.map(item => {
                  const recorte = RECORTES[item.simbolo] || RECORTE_PADRAO;
                  return (
                    <li key={item.simbolo}>
                      <figure>
                        <Circulo>
                          <Janela $medalha={recorte.medalha}>
                            {recorte.medalha ? (
                              <Emblema slug={santo.slug} />
                            ) : (
                              <img
                                src={santo.imagem}
                                alt={recorte.alt}
                                loading="lazy"
                                style={{
                                  width: `${recorte.zoom * 100}%`,
                                  transform: `translate(${-recorte.x * 100}%, ${-recorte.y * 100}%)`,
                                }}
                              />
                            )}
                          </Janela>
                        </Circulo>
                        <figcaption>
                          <strong>{item.simbolo}</strong>
                          <span>{aspas(item.significado)}</span>
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
              </Detalhes>
            </Secao>
          )}

          {escritos && (
            <Secao aria-labelledby="teresinha-escritos">
              <Titulo id="teresinha-escritos">Palavras e escritos</Titulo>
              <Introducao>{escritos.introducao}</Introducao>
              {escritos.frases?.map((frase, i) => (
                <React.Fragment key={frase.texto}>
                  {i > 0 && (
                    <Separador>
                      <Ornamento filetes={false} />
                    </Separador>
                  )}
                  <Frase $tamanho={tamanhoDaFrase(frase.texto)}>
                    <blockquote>“{frase.texto}”</blockquote>
                    <figcaption>{frase.fonte}</figcaption>
                  </Frase>
                </React.Fragment>
              ))}
              {escritos.obras?.length > 0 && (
                <>
                  <Subtitulo>O que ela escreveu</Subtitulo>
                  <Estante>
                    {escritos.obras.map(obra => (
                      <li key={obra.titulo}>
                        <cite>{obra.titulo}</cite>
                        <span>{obra.texto}</span>
                      </li>
                    ))}
                  </Estante>
                </>
              )}
            </Secao>
          )}

          {cidades.length > 0 && (
            <Secao aria-labelledby="teresinha-lugares">
              <Titulo id="teresinha-lugares">Lugares para visitar</Titulo>
              <Cidades>
                {cidades.map(grupo => (
                  <div key={grupo.cidade}>
                    {grupo.regiao && <p className="regiao">{grupo.regiao}</p>}
                    <h3>{grupo.cidade}</h3>
                    <ul>
                      {grupo.itens.map(lugar => (
                        <li key={lugar.nome}>
                          <strong>{lugar.nome}</strong>
                          <p>{lugar.texto}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Cidades>
            </Secao>
          )}

          {santo.leituras?.length > 0 && (
            <Secao aria-labelledby="teresinha-leituras">
              <Titulo id="teresinha-leituras">Para ler</Titulo>
              <Leituras>
                {santo.leituras.map(leitura => (
                  <li key={leitura.titulo}>
                    <cite>{leitura.titulo}</cite>
                    <span>{leitura.autor}</span>
                    <p>{leitura.texto}</p>
                  </li>
                ))}
              </Leituras>
            </Secao>
          )}

          {santo.videos?.length > 0 && (
            <Secao aria-labelledby="teresinha-videos">
              <Titulo id="teresinha-videos">Para assistir</Titulo>
              <Videos>
                {santo.videos.map(video => (
                  <Video key={video.id} id={video.id} titulo={video.titulo} />
                ))}
              </Videos>
            </Secao>
          )}

          {santo.novena && (
            <Secao aria-labelledby="teresinha-novena">
              <Titulo id="teresinha-novena">Novena das rosas</Titulo>
              <Novena slug={santo.slug} novena={santo.novena} cor={santo.cores.principal} />
            </Secao>
          )}

          <Secao aria-labelledby="teresinha-oracao">
            <Titulo id="teresinha-oracao">{santo.oracao.titulo}</Titulo>
            <Mesa>
              <Santinho $papel={papel}>
                <Renda $papel={papel}>
                  <Emblema slug={santo.slug} />
                  <p>{santo.nome}</p>
                  <Ornamento />
                  <p>{santo.oracao.texto}</p>
                  {santo.oracao.nota && <small>{santo.oracao.nota}</small>}
                </Renda>
              </Santinho>
              <CopiarOracao oracao={santo.oracao} />
            </Mesa>
          </Secao>

          <Secao aria-labelledby="teresinha-outros">
            <Titulo id="teresinha-outros">Conheça também</Titulo>
            <OutrosSantos atual={santo.slug} />
          </Secao>
        </Corpo>
      </article>
    </CascaDoSanto>
  );
};

export default PaginaTeresinha;
