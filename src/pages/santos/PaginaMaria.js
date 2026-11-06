import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { PiArrowRight } from 'react-icons/pi';
import BotaoMusica from '../../components/BotaoMusica';
import Terco from '../../components/Terco';
import Novena from '../../components/Novena';
import { EmblemaMaria } from '../../components/Emblemas';
import { musicas } from '../../data/musicas';
import {
  CascaDoSanto,
  CopiarOracao,
  OutrosSantos,
  Video,
  tinta,
} from './comum';

// Nossa Senhora: "manto e ladainha". Faixas azul-marinho no topo e na oração,
// papel marfim no meio e ouro só nos detalhes. A vida de Maria corre ao lado das
// poucas palavras dela que os Evangelhos guardam, os títulos se rezam como uma
// ladainha e os dogmas ficam de pé como tábuas de pedra.

const AZUL = '#16325c';
const MARFIM = '#f4efe4';
const OURO = '#c9a54c';

/** Ouro legível como texto: mais escuro no papel claro, o próprio ouro no escuro */
const ouroTexto = ({ theme }) => (theme.modo === 'escuro' ? OURO : '#7d6224');
const filete = ({ theme }) => theme.colors.borderColor;
const titulo = ({ theme }) => theme.colors.titleColor;
const suave = ({ theme }) => theme.colors.textSecondary;
const SERIFA_TITULO = "'Cormorant Garamond', Georgia, serif";

/* ---------- Dados de apresentação desta página ---------- */

// Para cada parágrafo da história, a palavra de Maria que conversa com ele
// (posição em escritos.frases). As que sobram fecham a seção, lado a lado.
const PALAVRA_DO_PARAGRAFO = [0, 4, 3, 2];

// Na ladainha, o nome da festa vira invocação
const INVOCACOES = {
  'Assunção de Nossa Senhora': 'Nossa Senhora da Assunção',
};

// Onde fica cada símbolo em volta da medalha, no computador
const PRANCHA = [
  { area: 'a', lado: 'esquerda' },
  { area: 'b', lado: 'esquerda' },
  { area: 'c', lado: 'direita' },
  { area: 'd', lado: 'direita' },
  { area: 'e', lado: 'baixo' },
];

/* ---------- Desenhos: estrelas ---------- */

const ponto = (x, y, angulo, raio) =>
  `${(x + Math.cos(angulo) * raio).toFixed(2)},${(y + Math.sin(angulo) * raio).toFixed(2)}`;

/** Estrela de cinco pontas, de pé, centrada em (x, y) */
const cincoPontas = (x, y, r) =>
  Array.from({ length: 10 }, (_, i) =>
    ponto(x, y, -Math.PI / 2 + (i * Math.PI) / 5, i % 2 ? r * 0.42 : r)
  ).join(' ');

/** Estrela de oito pontas, quatro longas e quatro curtas, centrada em (0, 0) */
const OITO_PONTAS = Array.from({ length: 16 }, (_, i) =>
  ponto(
    0,
    0,
    -Math.PI / 2 + (i * Math.PI) / 8,
    i % 4 === 0 ? 10 : i % 2 === 0 ? 6 : 2.3
  )
).join(' ');

/** As doze estrelas num arco: centro (cx, cy), raio r, de um ângulo a outro (em graus) */
const arcoDeEstrelas = (cx, cy, r, de, ate) =>
  Array.from({ length: 12 }, (_, i) => {
    const a = ((de + ((ate - de) * i) / 11) * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });

// Sobre o retrato: unidades de 1% da largura do arco, cujo centro fica em (50, 50)
const COROA = arcoDeEstrelas(50, 50, 59, 190, 350);
// Sobre a oração: um arco largo e baixo
const ARCO_ORACAO = arcoDeEstrelas(120, 236, 210, 238, 302);

const Ornamento = styled.svg`
  display: block;
  width: 112px;
  height: 22px;
  margin: 0 auto;
  color: ${OURO};
`;

/** O ornamento sobre os títulos: a estrela de oito pontas entre dois filetes */
const OrnamentoTitulo = () => (
  <Ornamento viewBox="-56 -11 112 22" aria-hidden="true" focusable="false">
    <path d="M-52 0 H-18 M18 0 H52" stroke="currentColor" strokeWidth="0.75" />
    <polygon points={OITO_PONTAS} fill="currentColor" />
  </Ornamento>
);

/* ---------- Tipografia dos textos ---------- */

/** Aspas curvas e espaço que não quebra entre a sigla do livro e o versículo (Lc 2,35) */
const tipografia = texto =>
  texto
    .replace(/"([^"]*)"/g, '“$1”')
    .replace(/\b([A-Z][a-z]{1,2}) (\d)/g, '$1 $2');

const Inteira = styled.span`
  white-space: nowrap;
`;

/** Palavras com hífen (faça-se) não se partem no fim da linha */
const semPartir = texto =>
  texto
    .split(/(\S+-\S+)/)
    .map((parte, i) => (i % 2 ? <Inteira key={i}>{parte}</Inteira> : parte));

const EstrelaOito = () => (
  <svg viewBox="-11 -11 22 22" aria-hidden="true" focusable="false">
    <polygon points={OITO_PONTAS} fill="currentColor" />
  </svg>
);

/* ---------- Seções e títulos ---------- */

const Secao = styled.section`
  padding: 72px 16px;

  & + & {
    padding-top: 0;
  }

  @media (min-width: 768px) {
    padding: 104px 32px;
  }
`;

const CabecalhoCaixa = styled.header`
  max-width: 640px;
  margin: 0 auto 44px;
  text-align: center;

  h2 {
    margin-top: 16px;
    font-size: clamp(2rem, 7vw, 2.75rem);
    line-height: 1.08;
    font-weight: 500;
    color: ${titulo};
    text-wrap: balance;
  }

  p {
    max-width: 46ch;
    margin: 14px auto 0;
    font-style: italic;
    font-size: 1.08rem;
    line-height: 1.6;
    color: ${suave};
  }

  p + p {
    margin-top: 8px;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    margin-bottom: 60px;
  }
`;

const Cabecalho = ({ id, children, intro, nota }) => (
  <CabecalhoCaixa>
    <OrnamentoTitulo />
    <h2 id={id}>{children}</h2>
    {intro && <p>{intro}</p>}
    {nota && <p>{nota}</p>}
  </CabecalhoCaixa>
);

/* ---------- Topo: o manto azul, o arco e as doze estrelas ---------- */

const Topo = styled.section`
  background: ${AZUL};
  color: ${MARFIM};
  text-align: center;
  padding: 96px 16px 64px;

  @media (min-width: 768px) {
    padding: 116px 32px 88px;
  }
`;

const Retrato = styled.figure`
  position: relative;
  width: min(260px, 100%);
  margin: 36px auto 0;

  @media (min-width: 768px) {
    width: 290px;
    margin-top: 44px;
  }
`;

// a coroa fica fora do arco: margens em % contam a partir da largura do retrato
const Coroa = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 124%;
  height: auto;
  aspect-ratio: 124 / 56;
  margin: -13% 0 0 -12%;
  color: ${OURO};
  pointer-events: none;
`;

const Arco = styled.div`
  padding: 7px;
  border: 1px solid ${OURO};
  border-radius: 200px 200px 4px 4px;
`;

const Janela = styled.div`
  overflow: hidden;
  aspect-ratio: 5 / 7;
  border-radius: 190px 190px 3px 3px;
  background: #0f2443;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${({ $posicao }) => $posicao || 'center top'};
    transform: scale(1.03);
  }
`;

const Origem = styled.p`
  margin-top: 36px;
  font-family: ${SERIFA_TITULO};
  font-size: 1.05rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.12em;
  color: ${OURO};
`;

const Nome = styled.h1`
  margin-top: 6px;
  font-size: clamp(2.8rem, 12vw, 4.6rem);
  line-height: 1;
  font-weight: 500;
  color: ${MARFIM};
`;

const Frase = styled.figure`
  max-width: 560px;
  margin: 22px auto 0;

  blockquote p {
    font-style: italic;
    font-size: clamp(1.25rem, 4.4vw, 1.55rem);
    line-height: 1.45;
    text-wrap: balance;
  }

  figcaption {
    margin-top: 8px;
    font-size: 1rem;
    font-variant: small-caps;
    letter-spacing: 0.1em;
    color: ${OURO};
  }
`;

const Dados = styled.dl`
  display: grid;
  gap: 14px;
  max-width: 640px;
  margin: 34px auto 0;
  padding-top: 22px;
  border-top: 1px solid rgba(201, 165, 76, 0.35);

  dt {
    font-family: ${SERIFA_TITULO};
    font-size: 1rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.1em;
    color: ${OURO};
  }

  dd {
    padding: 0 12px;
    font-size: 1.02rem;
    line-height: 1.5;
    color: rgba(244, 239, 228, 0.88);
  }

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 0;

    div + div {
      border-left: 1px solid rgba(201, 165, 76, 0.35);
    }
  }
`;

const Musica = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  > div {
    justify-items: center;
    max-width: 560px;
    text-align: center;
  }
`;

/* ---------- A vida ao lado das palavras dela ---------- */

const Vida = styled.div`
  display: grid;
  gap: 44px;
  max-width: 920px;
  margin: 0 auto;

  @media (min-width: 760px) {
    gap: 64px;
  }
`;

const Par = styled.div`
  display: grid;
  gap: 24px;

  @media (min-width: 760px) {
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: 56px;
    align-items: start;
  }
`;

const Paragrafo = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  hyphens: auto;
  text-wrap: pretty;

  ${({ $abre }) =>
    $abre &&
    css`
      &::first-line {
        font-variant: small-caps;
        letter-spacing: 0.05em;
      }
    `}
`;

const Citacao = styled.figure`
  margin-left: 14px;
  padding-left: 20px;
  border-left: 1px solid ${OURO};

  blockquote p {
    font-family: ${SERIFA_TITULO};
    font-style: italic;
    font-weight: 500;
    font-size: 1.42rem;
    line-height: 1.38;
    color: ${titulo};
    text-wrap: pretty;
  }

  figcaption {
    margin-top: 10px;
    font-size: 0.95rem;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${ouroTexto};
  }

  @media (min-width: 760px) {
    margin: 6px 0 0;
  }

  /* as palavras que fecham a seção: centradas e um pouco maiores */
  ${({ $centro }) =>
    $centro &&
    css`
      margin: 0;
      padding: 0;
      border-left: 0;
      text-align: center;

      blockquote p {
        font-size: clamp(1.55rem, 5vw, 1.9rem);
        line-height: 1.32;
        text-wrap: balance;
      }

      figcaption {
        margin-top: 12px;
      }

      @media (min-width: 760px) {
        margin: 0;
        padding: 0 40px;
      }
    `}
`;

const Palavra = ({ frase, centro = false }) => (
  <Citacao $centro={centro}>
    <blockquote>
      <p>“{semPartir(frase.texto)}”</p>
    </blockquote>
    <figcaption>{frase.fonte}</figcaption>
  </Citacao>
);

const Fecho = styled.div`
  position: relative;
  display: grid;
  gap: 40px;
  max-width: 920px;
  margin: 72px auto 0;
  padding-top: 52px;
  border-top: 1px solid ${filete};

  > svg {
    position: absolute;
    top: -11px;
    left: 50%;
    width: 22px;
    height: 22px;
    padding: 0 6px;
    box-sizing: content-box;
    transform: translateX(-50%);
    color: ${OURO};
    background: ${({ theme }) => theme.colors.background};
  }

  @media (min-width: 760px) {
    grid-template-columns: 1fr 1fr;
    gap: 0;

    figure + figure {
      border-left: 1px solid ${filete};
    }
  }
`;

/* ---------- Aparições: linha do tempo deitada ---------- */

const Trilho = styled.div`
  margin: 0 -16px;
  padding: 12px 16px 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 16px;
  overscroll-behavior-x: contain;

  @media (min-width: 768px) {
    margin: 0 -32px;
    padding: 12px 32px 8px;
    scroll-padding-inline: 32px;
  }

  @media (min-width: 960px) {
    max-width: 1100px;
    margin: 0 auto;
    padding: 12px 0 0;
    overflow: visible;
  }
`;

const Linha = styled.ol`
  list-style: none;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(78vw, 300px);
  width: max-content;

  @media (min-width: 960px) {
    grid-auto-flow: row;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    width: auto;
  }
`;

const Aparicao = styled.li`
  position: relative;
  padding: 30px 28px 0 0;
  border-top: 1px solid ${filete};
  scroll-snap-align: start;

  > svg {
    position: absolute;
    top: -10px;
    left: -5px;
    width: 20px;
    height: 20px;
    padding: 0 5px;
    box-sizing: content-box;
    color: ${OURO};
    background: ${({ theme }) => theme.colors.background};
  }

  p {
    margin-top: 14px;
    font-size: 1.04rem;
    line-height: 1.7;
    hyphens: auto;
  }

  @media (min-width: 960px) {
    padding-right: 32px;

    &:last-child {
      padding-right: 0;
    }
  }
`;

const Ano = styled.span`
  display: block;
  font-size: clamp(3.2rem, 12vw, 4.2rem);
  line-height: 0.95;
  font-weight: 500;
  color: ${titulo};
`;

const Lugar = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 1.2rem;
  font-variant: small-caps;
  letter-spacing: 0.1em;
  color: ${ouroTexto};
`;

const Dica = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  font-style: italic;
  font-size: 0.95rem;
  color: ${suave};

  @media (min-width: 960px) {
    display: none;
  }
`;

/* ---------- Títulos: a ladainha ---------- */

const Faixa = styled.section`
  padding: 72px 16px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-top: 1px solid ${filete};
  border-bottom: 1px solid ${filete};

  @media (min-width: 768px) {
    padding: 104px 32px;
  }
`;

const Ladainha = styled.ol`
  list-style: none;
  max-width: 620px;
  margin: 0 auto;
  text-align: center;

  li + li::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    margin: 36px auto;
    background: ${OURO};
  }
`;

const DataTitulo = styled.p`
  font-size: 0.92rem;
  font-variant: small-caps;
  letter-spacing: 0.12em;
  color: ${suave};
`;

const Invocacao = styled.p`
  margin-top: 4px;
  font-family: ${SERIFA_TITULO};
  font-size: clamp(1.6rem, 5.6vw, 2.1rem);
  line-height: 1.15;
  font-weight: 500;
  color: ${titulo};
  text-wrap: balance;
`;

const Resposta = styled.p`
  margin-top: 6px;
  font-size: 1.08rem;
  font-variant: small-caps;
  letter-spacing: 0.14em;
  color: ${ouroTexto};
`;

const Nota = styled.p`
  max-width: 40ch;
  margin: 10px auto 0;
  font-style: italic;
  font-size: 1rem;
  line-height: 1.6;
  color: ${suave};
  text-wrap: balance;
`;

/* ---------- Terço ---------- */

const Moldura = styled.div`
  max-width: 780px;
  margin: 0 auto;
  padding: 7px;
  border: 1px solid ${({ theme }) => tinta(theme, OURO, 60)};
  border-radius: 4px;
`;

/* ---------- Nas imagens: a medalha no centro ---------- */

const Prancha = styled.div`
  display: grid;
  gap: 28px;
  max-width: 1040px;
  margin: 0 auto;

  ${({ $completa }) =>
    $completa &&
    css`
      @media (min-width: 920px) {
        grid-template-columns: minmax(0, 1fr) 300px minmax(0, 1fr);
        grid-template-areas:
          'a m c'
          'b m d'
          'e e e';
        gap: 0;
      }
    `}
`;

const Medalha = styled.div`
  width: min(240px, 72vw);
  margin: 0 auto 8px;
  color: ${titulo};

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  ${({ $completa }) =>
    $completa &&
    css`
      @media (min-width: 920px) {
        grid-area: m;
        align-self: center;
        width: 300px;
        margin: 0;
      }
    `}
`;

const SIMBOLOS = {
  esquerda: css`
    flex-direction: row-reverse;
    text-align: right;
  `,
  direita: css`
    flex-direction: row;
  `,
  baixo: css`
    flex-direction: column;
    text-align: center;
    padding-top: 0;

    > div {
      flex: none;
      max-width: 46ch;
    }
  `,
};

const Simbolo = styled.div`
  padding-top: 18px;
  border-top: 1px solid ${filete};

  h3 {
    font-size: 1.4rem;
    line-height: 1.2;
    color: ${titulo};
  }

  p {
    margin-top: 6px;
    line-height: 1.65;
  }

  ${({ $area, $lado }) =>
    $area &&
    css`
      @media (min-width: 920px) {
        grid-area: ${$area};
        display: flex;
        align-items: center;
        gap: 18px;
        padding: 28px 0;
        border-top: 0;

        > div {
          flex: 0 1 270px;
        }

        ${SIMBOLOS[$lado]}
      }
    `}
`;

const FIOS = {
  esquerda: css`
    margin-right: -14px;

    &::after {
      top: -3px;
      right: -3px;
    }
  `,
  direita: css`
    margin-left: -14px;

    &::after {
      top: -3px;
      left: -3px;
    }
  `,
  baixo: css`
    flex: none;
    width: 1px;
    min-width: 0;
    height: 48px;
    margin-top: -6px;

    &::after {
      top: -3px;
      left: -3px;
    }
  `,
};

// o fio que liga o símbolo à medalha, com um ponto de ouro na ponta
const Fio = styled.span`
  display: none;

  @media (min-width: 920px) {
    position: relative;
    display: block;
    flex: 1 1 56px;
    min-width: 56px;
    height: 1px;
    background: ${({ theme }) => tinta(theme, OURO, 75)};

    &::after {
      content: '';
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${OURO};
    }

    ${({ $lado }) => FIOS[$lado]}
  }
`;

/* ---------- Dogmas: tábuas de pé ---------- */

const Tabuas = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  max-width: 1000px;
  margin: 0 auto;

  @media (min-width: 860px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
  }
`;

const Tabua = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 230px;
  padding: 34px 18px 28px;
  text-align: center;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${filete};
  border-radius: 3px;
  outline: 1px solid ${({ theme }) => tinta(theme, OURO, 45)};
  outline-offset: -7px;

  strong {
    font-family: ${SERIFA_TITULO};
    font-size: clamp(2.5rem, 10vw, 3.6rem);
    line-height: 1;
    font-weight: 500;
    color: ${titulo};
  }

  strong::after {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    margin: 18px auto;
    background: ${OURO};
  }

  span {
    font-size: 0.98rem;
    line-height: 1.6;
    hyphens: auto;
  }

  @media (min-width: 860px) {
    min-height: 300px;
    padding: 56px 22px 40px;

    span {
      font-size: 1.04rem;
    }
  }
`;

/* ---------- Lugares e leituras ---------- */

const Santuarios = styled.ul`
  list-style: none;
  display: grid;
  max-width: 900px;
  margin: 0 auto;

  li {
    padding: 22px 0 24px;
    border-top: 1px solid ${filete};
  }

  h3 {
    font-size: 1.45rem;
    line-height: 1.2;
    color: ${titulo};
  }

  p {
    margin-top: 8px;
    line-height: 1.65;
  }

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 56px;
  }
`;

const Cidade = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 1rem;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  color: ${ouroTexto};
`;

const Livros = styled.ul`
  list-style: none;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;

  li {
    padding: 22px 0;
    border-top: 1px solid ${filete};
  }

  li:last-child {
    border-bottom: 1px solid ${filete};
  }

  h3 {
    font-size: 1.55rem;
    line-height: 1.2;
    font-style: italic;
    font-weight: 500;
    color: ${titulo};
  }

  p {
    margin-top: 6px;
    line-height: 1.6;
    color: ${suave};
  }
`;

const Autor = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 0.98rem;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  color: ${ouroTexto};
`;

const Medida = styled.div`
  max-width: ${({ $largura }) => $largura}px;
  margin: 0 auto;
`;

const Videos = styled.div`
  display: grid;
  gap: 16px;
`;

/* ---------- A Ave-Maria na faixa azul ---------- */

const FaixaOracao = styled.section`
  padding: 80px 16px 88px;
  text-align: center;
  background: ${AZUL};
  color: ${MARFIM};

  @media (min-width: 768px) {
    padding: 112px 32px 120px;
  }
`;

const ArcoOracao = styled.svg`
  display: block;
  width: 220px;
  height: auto;
  margin: 0 auto;
  color: ${OURO};
`;

const Rubrica = styled.h2`
  margin-top: 22px;
  font-size: 1.2rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.22em;
  color: ${OURO};
`;

const TextoOracao = styled.p`
  max-width: 720px;
  margin: 24px auto 36px;
  font-family: ${SERIFA_TITULO};
  font-style: italic;
  font-weight: 500;
  font-size: clamp(1.35rem, 5vw, 2rem);
  line-height: 1.55;
  white-space: pre-line;
`;

const NotaOracao = styled.p`
  max-width: 46ch;
  margin: -16px auto 28px;
  font-size: 0.95rem;
  color: rgba(244, 239, 228, 0.75);
`;

/* ---------- A página ---------- */

const anoDe = texto => Number((texto.match(/\d{3,4}/) || [])[0]) || 0;
const lugarDe = texto => texto.replace(/,?\s*\d{3,4}\s*$/, '');

const Conteudo = ({ santo }) => {
  const tema = useTheme();
  const escuro = tema.modo === 'escuro';
  // azul dos botões do terço e da novena: no escuro clareia, sem perder o texto branco
  const corInterativa = escuro ? '#3e6fb0' : santo.cores.principal;
  const musica = musicas[santo.slug];

  const frases = santo.escritos?.frases || [];
  const usadas = new Set();
  const pares = santo.historia.map((paragrafo, i) => {
    const frase = frases[PALAVRA_DO_PARAGRAFO[i]];
    if (frase) usadas.add(PALAVRA_DO_PARAGRAFO[i]);
    return { paragrafo, frase };
  });
  const restantes = frases.filter((_, i) => !usadas.has(i));

  const aparicoes = (santo.historias?.itens || [])
    .map(item => ({
      ...item,
      ano: anoDe(item.titulo),
      lugar: lugarDe(item.titulo),
    }))
    .sort((a, b) => a.ano - b.ano);

  const simbolos = santo.iconografia?.itens || [];
  const completa = simbolos.length === PRANCHA.length;

  return (
    <>
      <Topo aria-labelledby="maria-nome">
        <Retrato>
          <Coroa viewBox="-12 -13 124 56" aria-hidden="true" focusable="false">
            {COROA.map(([x, y], i) => (
              <polygon
                key={i}
                points={cincoPontas(x, y, 2.3)}
                fill="currentColor"
              />
            ))}
          </Coroa>
          <Arco>
            <Janela $posicao={santo.posicaoImagem}>
              <img
                src={santo.imagem}
                alt="Pintura de Nossa Senhora com manto azul, doze estrelas ao redor da cabeça e raios saindo das mãos"
                loading="eager"
              />
            </Janela>
          </Arco>
        </Retrato>

        <Origem>{santo.origem}</Origem>
        <Nome id="maria-nome">{santo.nome}</Nome>
        <Frase>
          <blockquote>
            <p>“{santo.frase.texto}”</p>
          </blockquote>
          <figcaption>{santo.frase.autor}</figcaption>
        </Frase>

        <Dados>
          <div>
            <dt>Festa</dt>
            <dd>{santo.festa}</dd>
          </div>
          <div>
            <dt>{santo.rotuloPadroeiro || 'Padroeira'}</dt>
            <dd>{santo.padroeiro.join(', ')}</dd>
          </div>
        </Dados>

        {musica && (
          <Musica>
            <BotaoMusica musica={musica} claro />
          </Musica>
        )}
      </Topo>

      <Secao aria-labelledby="maria-vida">
        <Cabecalho
          id="maria-vida"
          intro={santo.escritos?.introducao?.replace(/:\s*$/, '.')}
        >
          A serva do Senhor
        </Cabecalho>
        <Vida>
          {pares.map(({ paragrafo, frase }, i) => (
            <Par key={paragrafo.slice(0, 24)}>
              <Paragrafo $abre={i === 0}>{tipografia(paragrafo)}</Paragrafo>
              {frase && <Palavra frase={frase} />}
            </Par>
          ))}
        </Vida>
        {restantes.length > 0 && (
          <Fecho>
            <EstrelaOito />
            {restantes.map(frase => (
              <Palavra key={frase.fonte} frase={frase} centro />
            ))}
          </Fecho>
        )}
      </Secao>

      {aparicoes.length > 0 && (
        <Secao aria-labelledby="maria-aparicoes">
          <Cabecalho id="maria-aparicoes" intro={santo.historias.introducao}>
            {santo.historias.titulo}
          </Cabecalho>
          <Trilho
            role="region"
            aria-label="Aparições em ordem cronológica"
            tabIndex={0}
          >
            <Linha>
              {aparicoes.map(item => (
                <Aparicao key={item.titulo}>
                  <EstrelaOito />
                  <h3>
                    {item.ano > 0 && <Ano>{item.ano}</Ano>}{' '}
                    <Lugar>{item.lugar}</Lugar>
                  </h3>
                  <p>{tipografia(item.texto)}</p>
                </Aparicao>
              ))}
            </Linha>
          </Trilho>
          <Dica aria-hidden="true">
            Deslize para o lado para ver as outras
            <PiArrowRight />
          </Dica>
        </Secao>
      )}

      {santo.destaque?.itens?.length > 0 && (
        <Faixa aria-labelledby="maria-titulos">
          <Cabecalho id="maria-titulos" intro={santo.destaque.introducao}>
            {santo.destaque.titulo}
          </Cabecalho>
          <Ladainha>
            {santo.destaque.itens.map(item => (
              <li key={item.titulo}>
                {item.data && <DataTitulo>{item.data}</DataTitulo>}
                <Invocacao>{INVOCACOES[item.titulo] || item.titulo}</Invocacao>
                <Resposta>rogai por nós</Resposta>
                {item.texto && <Nota>{tipografia(item.texto)}</Nota>}
              </li>
            ))}
          </Ladainha>
        </Faixa>
      )}

      {santo.terco && (
        <Secao aria-labelledby="maria-terco">
          <Cabecalho
            id="maria-terco"
            intro="Toque no botão a cada Ave-Maria. O terço acompanha a dezena e mostra o mistério da vez."
          >
            Reze o terço com Maria
          </Cabecalho>
          <Moldura>
            <Terco cor={corInterativa} brilho={OURO} />
          </Moldura>
        </Secao>
      )}

      {simbolos.length > 0 && (
        <Secao aria-labelledby="maria-imagens">
          <Cabecalho
            id="maria-imagens"
            intro={santo.iconografia.introducao?.replace(/:\s*$/, '.')}
            nota="A medalha desenhada aqui é o verso da Medalha Milagrosa: a cruz, o M e os dois corações sob as doze estrelas."
          >
            Como reconhecer nas imagens
          </Cabecalho>
          <Prancha $completa={completa}>
            <Medalha $completa={completa}>
              <EmblemaMaria
                cor={OURO}
                corCoracao={escuro ? '#d98282' : '#a32d2d'}
              />
            </Medalha>
            {simbolos.map((item, i) => {
              const lugar = completa ? PRANCHA[i] : {};
              return (
                <Simbolo
                  key={item.simbolo}
                  $area={lugar.area}
                  $lado={lugar.lado}
                >
                  {completa && <Fio $lado={lugar.lado} aria-hidden="true" />}
                  <div>
                    <h3>{item.simbolo}</h3>
                    <p>{tipografia(item.significado)}</p>
                  </div>
                </Simbolo>
              );
            })}
          </Prancha>
        </Secao>
      )}

      {santo.linhaDoTempo?.length > 0 && (
        <Secao aria-labelledby="maria-dogmas">
          <Cabecalho id="maria-dogmas">
            {santo.tituloLinhaDoTempo || 'Linha do tempo'}
          </Cabecalho>
          <Tabuas>
            {santo.linhaDoTempo.map(marco => (
              <Tabua key={marco.ano}>
                <strong>{marco.ano}</strong>
                <span>{tipografia(marco.texto)}</span>
              </Tabua>
            ))}
          </Tabuas>
        </Secao>
      )}

      {santo.lugares?.length > 0 && (
        <Secao aria-labelledby="maria-lugares">
          <Cabecalho id="maria-lugares">Lugares para visitar</Cabecalho>
          <Santuarios>
            {santo.lugares.map(lugar => (
              <li key={lugar.nome}>
                <h3>{lugar.nome}</h3>
                <Cidade>{lugar.cidade}</Cidade>
                <p>{tipografia(lugar.texto)}</p>
              </li>
            ))}
          </Santuarios>
        </Secao>
      )}

      {santo.leituras?.length > 0 && (
        <Secao aria-labelledby="maria-leituras">
          <Cabecalho id="maria-leituras">Para ler</Cabecalho>
          <Livros>
            {santo.leituras.map(livro => (
              <li key={livro.titulo}>
                <h3>{livro.titulo}</h3>
                <Autor>{livro.autor}</Autor>
                <p>{tipografia(livro.texto)}</p>
              </li>
            ))}
          </Livros>
        </Secao>
      )}

      {santo.videos?.length > 0 && (
        <Secao aria-labelledby="maria-videos">
          <Cabecalho id="maria-videos">Para assistir</Cabecalho>
          <Medida $largura={760}>
            <Videos>
              {santo.videos.map(video => (
                <Video key={video.id} id={video.id} titulo={video.titulo} />
              ))}
            </Videos>
          </Medida>
        </Secao>
      )}

      {santo.novena && (
        <Secao aria-labelledby="maria-novena">
          <Cabecalho id="maria-novena">Novena de nove dias</Cabecalho>
          <Medida $largura={720}>
            <Novena
              slug={santo.slug}
              novena={santo.novena}
              cor={corInterativa}
            />
          </Medida>
        </Secao>
      )}

      <FaixaOracao aria-labelledby="maria-oracao">
        <ArcoOracao viewBox="0 18 240 46" aria-hidden="true" focusable="false">
          {ARCO_ORACAO.map(([x, y], i) => (
            <polygon
              key={i}
              points={cincoPontas(x, y, 4.5)}
              fill="currentColor"
            />
          ))}
        </ArcoOracao>
        <Rubrica id="maria-oracao">{santo.oracao.titulo}</Rubrica>
        <TextoOracao>{santo.oracao.texto}</TextoOracao>
        {santo.oracao.nota && <NotaOracao>{santo.oracao.nota}</NotaOracao>}
        <CopiarOracao oracao={santo.oracao} />
      </FaixaOracao>

      <Secao aria-labelledby="maria-outros">
        <Cabecalho id="maria-outros">Conheça também</Cabecalho>
        <Medida $largura={640}>
          <OutrosSantos atual={santo.slug} />
        </Medida>
      </Secao>
    </>
  );
};

const PaginaMaria = ({ santo }) => (
  <CascaDoSanto santo={santo}>
    <Conteudo santo={santo} />
  </CascaDoSanto>
);

export default PaginaMaria;
