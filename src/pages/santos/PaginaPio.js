import React from 'react';
import styled, { css } from 'styled-components';
import { PiArrowUpRight } from 'react-icons/pi';
import BotaoMusica from '../../components/BotaoMusica';
import { Vela } from '../../components/Ambiente';
import { EmblemaPio, MaosChagadas } from '../../components/Emblemas';
import Novena from '../../components/Novena';
import { musicas } from '../../data/musicas';
import { CascaDoSanto, CopiarOracao, OutrosSantos, Video } from './comum';

// Página de São Padre Pio: uma capela à luz de vela. Noite, a cela de um frade,
// tudo centrado e em silêncio. O retrato fica num arco de capela entre duas velas,
// as chagas vêm logo depois, as três palavras aparecem gravadas como em pedra
// e a linha do tempo é marcada por pequenas chamas.
// O ouro e o vinho vêm de santo.cores; o fundo escuro vem da paleta do santo (sempre escura).

const NOITE = '#120d0a';
const SERIFA = "'Cormorant Garamond', Georgia, serif";

const cor =
  nome =>
  ({ theme }) =>
    theme.colors[nome];

// algarismos alinhados: o corpo do site usa os de estilo antigo, que somem nos números grandes
const algarismos = css`
  font-feature-settings: 'kern', 'liga', 'lnum';
  font-variant-numeric: lining-nums;
`;

const versalete = css`
  font-family: ${SERIFA};
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.1em;
`;

/* ---------- Ornamento: a chama ---------- */

/** Chama em traço fino com o miolo cheio, como gravada no metal */
const Chama = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 20 32"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M10 1 C14 8 18 13.5 18 20 C18 26.5 14.4 31 10 31 C5.6 31 2 26.5 2 20 C2 13.5 6 8 10 1 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M10 13 C12.4 17 14 20 14 23 C14 26 12.2 28 10 28 C7.8 28 6 26 6 23 C6 20 7.6 17 10 13 Z"
      fill="currentColor"
    />
  </svg>
);

/* ---------- Estrutura ---------- */

const Capela = styled.div`
  color: ${cor('text')};

  /* o contorno de foco em ouro, para aparecer sobre o fundo escuro */
  & *:focus-visible {
    outline-color: var(--ouro);
  }
`;

const Oculto = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

// faixa de largura total, no tom mais escuro da noite
const Faixa = styled.div`
  background: ${NOITE};
  border-top: 1px solid ${cor('borderColor')};
  border-bottom: 1px solid ${cor('borderColor')};
`;

const Secao = styled.section`
  max-width: ${({ $largura }) => $largura + 32}px;
  margin: 0 auto;
  padding: 64px 16px;

  @media (min-width: 768px) {
    max-width: ${({ $largura }) => $largura + 48}px;
    padding: 104px 24px;
  }
`;

const Titulo = styled.h2`
  text-align: center;
  font-size: clamp(1.95rem, 6.6vw, 2.75rem);
  line-height: 1.1;
  color: ${cor('titleColor')};
  text-wrap: balance;

  &::after {
    content: '';
    display: ${({ $semFilete }) => ($semFilete ? 'none' : 'block')};
    width: 28px;
    height: 1px;
    margin: 20px auto 0;
    background: var(--ouro);
  }
`;

const Intro = styled.p`
  max-width: 30em;
  margin: 20px auto 0;
  text-align: center;
  font-style: italic;
  font-size: 1.08rem;
  line-height: 1.6;
  color: ${cor('textSecondary')};
`;

/** Uma seção da página: título centrado, introdução opcional e o conteúdo */
const Capitulo = ({
  id,
  titulo,
  introducao,
  largura = 720,
  antes,
  semFilete = false,
  children,
}) => (
  <Secao id={id} aria-labelledby={`${id}-titulo`} $largura={largura}>
    {antes}
    <Titulo id={`${id}-titulo`} $semFilete={semFilete}>
      {titulo}
    </Titulo>
    {introducao && <Intro>{introducao}</Intro>}
    {children}
  </Secao>
);

/* ---------- Topo: o retrato num arco de capela, entre duas velas ---------- */

const Topo = styled.section`
  position: relative;
  overflow: hidden;
  padding: 104px 16px 64px;
  text-align: center;
  background: ${NOITE};
  border-bottom: 1px solid ${cor('borderColor')};

  @media (min-width: 768px) {
    padding: 144px 32px 96px;
  }
`;

// o altar: o arco e as velas de pé sobre o mesmo filete
const Nicho = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  max-width: 600px;
  margin: 0 auto;
  border-bottom: 1px solid var(--ouro-filete);
`;

const Arco = styled.figure`
  position: relative;
  z-index: 1;
  width: min(232px, 62vw);
  padding: 7px 7px 0;
  border: 1px solid var(--ouro);
  border-bottom: none;
  border-radius: 999px 999px 0 0;

  img {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    object-position: ${({ $posicao }) => $posicao || 'center 20%'};
    border-radius: 999px 999px 0 0;
  }

  @media (min-width: 768px) {
    width: 300px;
    padding: 9px 9px 0;
  }
`;

// a Vela vem pronta para ficar no canto do topo; aqui ela fica de pé sobre o altar
const Castical = styled.div`
  position: relative;
  justify-self: center;
  width: 40px;
  height: 98px;

  & > div {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  && .brilho {
    width: 130px;
    height: 130px;
    margin-left: -65px;
    margin-top: -50px;
  }

  ${({ $par }) =>
    $par &&
    css`
      display: none;
    `}

  @media (min-width: 768px) {
    display: block;
    width: 64px;
    height: 156px;

    && .brilho {
      width: 210px;
      height: 210px;
      margin-left: -105px;
      margin-top: -84px;
    }
  }
`;

const Origem = styled.p`
  ${versalete}
  ${algarismos}
  margin-top: 40px;
  font-size: 1.05rem;
  color: var(--ouro);
`;

const Nome = styled.h1`
  max-width: 14em;
  margin: 10px auto 0;
  font-size: clamp(2.3rem, 8.4vw, 3.9rem);
  line-height: 1.04;
  color: ${cor('titleColor')};
  text-wrap: balance;
`;

const Lema = styled.blockquote`
  max-width: 17em;
  margin: 28px auto 0;
  font-family: ${SERIFA};
  font-style: italic;
  font-weight: 500;
  font-size: clamp(1.65rem, 6.2vw, 2.6rem);
  line-height: 1.22;
  text-wrap: balance;
`;

const Dados = styled.dl`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 28px;
  margin-top: 28px;
  font-size: 1rem;
  line-height: 1.5;
  color: ${cor('textSecondary')};

  dt,
  dd {
    display: inline;
  }

  dt {
    ${versalete}
    margin-right: 8px;
    color: var(--ouro);
  }
`;

const Musica = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;

  > div {
    justify-items: center;
    max-width: 34em;
    text-align: center;
  }
`;

/* ---------- As chagas ---------- */

const Maos = styled.div`
  width: min(100%, 400px);
  margin: 44px auto 0;
  color: ${cor('titleColor')};

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Coluna = styled.div`
  max-width: 32em;
  margin: 40px auto 0;
  font-size: 1.12rem;
  line-height: 1.85;

  p + p {
    margin-top: 1.1em;
  }

  @media (min-width: 768px) {
    text-align: center;
  }
`;

const Numeros = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 56px;
  text-align: center;
  border-top: 1px solid var(--ouro-filete);
  border-bottom: 1px solid var(--ouro-filete);

  li {
    padding: 24px 6px 22px;
  }

  li + li {
    border-left: 1px solid var(--ouro-tenue);
  }

  strong {
    ${algarismos}
    display: block;
    font-family: ${SERIFA};
    font-weight: 500;
    font-size: clamp(2.5rem, 11vw, 4.4rem);
    line-height: 1;
    color: var(--ouro);
  }

  span {
    display: block;
    max-width: 12em;
    margin: 12px auto 0;
    font-size: 0.9rem;
    line-height: 1.4;
    color: ${cor('textSecondary')};
  }
`;

/* ---------- Três palavras, gravadas como em pedra ---------- */

const Palavras = styled.ol`
  list-style: none;
  margin-top: 56px;
  text-align: center;

  h3 {
    padding-left: 0.06em;
    font-family: ${SERIFA};
    font-weight: 500;
    font-size: clamp(2.9rem, 13vw, 6rem);
    line-height: 1;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${cor('titleColor')};
    text-wrap: balance;
  }

  p {
    max-width: 26em;
    margin: 18px auto 0;
    font-style: italic;
    font-size: 1.16rem;
    line-height: 1.6;
  }
`;

const Separador = styled(Chama)`
  display: block;
  width: 16px;
  height: 26px;
  margin: 48px auto;
  color: var(--ouro);

  @media (min-width: 768px) {
    margin: 64px auto;
  }
`;

/* ---------- Quem foi ---------- */

const Relato = styled.div`
  max-width: 34em;
  margin: 0 auto;
  font-size: 1.14rem;
  line-height: 1.85;

  p + p {
    margin-top: 1.1em;
  }
`;

const Aspas = styled.span`
  display: block;
  height: 0.5em;
  margin: 28px 0 8px;
  font-family: ${SERIFA};
  font-size: 7rem;
  line-height: 1;
  text-align: center;
  color: var(--ouro);
`;

/* ---------- O dia a dia do frade ---------- */

const Testemunhos = styled.ul`
  list-style: none;
  margin-top: 48px;

  li {
    padding-left: 20px;
    border-left: 1px solid var(--ouro-filete);
  }

  li + li {
    margin-top: 40px;
  }

  h3 {
    ${versalete}
    font-size: 1.45rem;
    line-height: 1.2;
    letter-spacing: 0.05em;
    color: var(--ouro);
  }

  p {
    margin-top: 10px;
    line-height: 1.75;
  }

  @media (min-width: 768px) {
    li {
      max-width: 540px;
      padding-left: 28px;
    }

    li:nth-child(even) {
      margin-left: auto;
      padding-left: 0;
      padding-right: 28px;
      text-align: right;
      border-left: none;
      border-right: 1px solid var(--ouro-filete);
    }

    li + li {
      margin-top: 56px;
    }
  }
`;

/* ---------- Linha do tempo, marcada por chamas ---------- */

const Marco = styled.span`
  position: absolute;
  top: 2px;
  left: 0;
  width: 24px;
  display: flex;
  justify-content: center;
  padding: 5px 0;
  background: ${cor('background')};
  color: var(--ouro);

  svg {
    width: 13px;
    height: 21px;
  }
`;

const Linha = styled.ol`
  position: relative;
  list-style: none;
  margin-top: 52px;

  &::before {
    content: '';
    position: absolute;
    top: 6px;
    bottom: 24px;
    left: 12px;
    width: 1px;
    transform: translateX(-50%);
    background: var(--ouro-filete);
  }

  li {
    position: relative;
    padding: 0 0 34px 44px;
  }

  li:last-child {
    padding-bottom: 0;
  }

  strong {
    ${algarismos}
    display: block;
    font-family: ${SERIFA};
    font-weight: 600;
    font-size: 1.7rem;
    line-height: 1.1;
    color: var(--ouro);
  }

  p {
    margin-top: 4px;
    line-height: 1.6;
  }

  @media (min-width: 768px) {
    &::before {
      left: 50%;
    }

    li {
      width: 50%;
      padding: 0 48px 44px 0;
      text-align: right;
    }

    li:nth-child(even) {
      margin-left: 50%;
      padding: 0 0 44px 48px;
      text-align: left;
    }

    li:last-child {
      padding-bottom: 0;
    }

    li:nth-child(odd) ${Marco} {
      left: auto;
      right: -12px;
    }

    li:nth-child(even) ${Marco} {
      left: -12px;
    }
  }
`;

/* ---------- Milagres: dois autos de processo ---------- */

const Processos = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 48px;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
`;

const Processo = styled.article`
  padding: 40px 26px 34px;
  text-align: center;
  background: ${cor('cardBackground')};
  border: 1px solid var(--ouro-filete);
  border-radius: 2px;
  outline: 1px solid var(--ouro-tenue);
  outline-offset: -8px;

  h3 span {
    ${versalete}
    display: block;
    font-size: 1.05rem;
    letter-spacing: 0.14em;
    color: var(--ouro);
  }

  h3 strong {
    ${algarismos}
    display: block;
    margin-top: 6px;
    font-weight: 500;
    font-size: 3.2rem;
    line-height: 1;
    color: ${cor('titleColor')};
  }

  /* um pequeno selo cor de vinho, como lacre */
  h3::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    margin: 20px auto 0;
    transform: rotate(45deg);
    background: var(--vinho);
  }

  p {
    margin-top: 18px;
    line-height: 1.7;
  }
`;

/** "Beatificação, 1999" vira o tipo do processo e o ano em destaque */
const partesDoTitulo = titulo => {
  const corte = titulo.lastIndexOf(', ');
  return corte > 0
    ? [titulo.slice(0, corte), titulo.slice(corte + 2)]
    : [titulo, null];
};

/* ---------- Como reconhecer nas imagens ---------- */

const PainelIcones = styled.div`
  display: grid;
  margin-top: 48px;
  overflow: hidden;
  background: ${cor('cardBackground')};
  border: 1px solid ${cor('borderColor')};
  border-radius: 4px;

  @media (min-width: 768px) {
    grid-template-columns: minmax(240px, 5fr) 7fr;
  }
`;

const Detalhe = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-bottom: 1px solid var(--ouro-filete);

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 57% 42%;
    transform: scale(1.3);
    transform-origin: 57% 45%;
  }

  @media (min-width: 768px) {
    aspect-ratio: auto;
    min-height: 420px;
    border-bottom: none;
    border-right: 1px solid var(--ouro-filete);

    img {
      transform: scale(1.4);
    }
  }
`;

const Simbolos = styled.ol`
  list-style: none;
  padding: 8px 20px;

  li {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 10px;
    padding: 20px 0;
  }

  li + li {
    border-top: 1px solid ${cor('borderColor')};
  }

  li > span {
    ${algarismos}
    font-family: ${SERIFA};
    font-weight: 500;
    font-size: 2.3rem;
    line-height: 0.9;
    color: var(--ouro);
  }

  strong {
    display: block;
    font-family: ${SERIFA};
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 1.2;
    color: ${cor('titleColor')};
  }

  p {
    margin-top: 4px;
    line-height: 1.6;
  }

  @media (min-width: 768px) {
    padding: 16px 36px;
  }
`;

/* ---------- Palavras e escritos ---------- */

const Frases = styled.div`
  margin-top: 48px;
  text-align: center;

  figure + figure::before {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    margin: 48px auto;
    background: var(--ouro-filete);
  }

  blockquote {
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 500;
    font-size: clamp(1.5rem, 5.2vw, 2.15rem);
    line-height: 1.3;
    color: ${cor('titleColor')};
    text-wrap: balance;
  }

  figcaption {
    margin-top: 16px;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: ${cor('textSecondary')};
  }
`;

const Obras = styled.div`
  max-width: 30em;
  margin: 64px auto 0;
  padding-top: 32px;
  text-align: center;
  border-top: 1px solid ${cor('borderColor')};

  h3 {
    ${versalete}
    font-size: 1.05rem;
    letter-spacing: 0.14em;
    color: var(--ouro);
  }

  cite {
    display: block;
    margin-top: 14px;
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 600;
    font-size: 1.35rem;
    color: ${cor('titleColor')};
  }

  p {
    margin-top: 4px;
    font-size: 0.98rem;
    line-height: 1.6;
    color: ${cor('textSecondary')};
  }
`;

/* ---------- Lugares e leituras ---------- */

const ListaLugares = styled.ul`
  list-style: none;
  margin-top: 44px;
  text-align: center;

  li {
    padding: 26px 0;
  }

  li + li {
    border-top: 1px solid ${cor('borderColor')};
  }

  h3 {
    font-size: 1.45rem;
    line-height: 1.25;
  }

  a,
  a:hover {
    color: ${cor('titleColor')};
  }

  a {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 6px;
    text-decoration-color: var(--ouro-filete);
  }

  a:hover {
    text-decoration-color: var(--ouro);
  }

  a svg {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    vertical-align: -1px;
  }

  small {
    ${versalete}
    display: block;
    margin-top: 8px;
    font-size: 1rem;
    letter-spacing: 0.06em;
    color: var(--ouro);
  }

  p {
    max-width: 24em;
    margin: 10px auto 0;
    line-height: 1.6;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid var(--ouro-tenue);
    border-bottom: 1px solid var(--ouro-tenue);

    li {
      padding: 32px 24px;
    }

    li + li {
      border-top: none;
      border-left: 1px solid ${cor('borderColor')};
    }
  }
`;

const Livros = styled.ul`
  list-style: none;
  margin-top: 40px;
  text-align: center;

  li + li {
    margin-top: 32px;
  }

  cite {
    display: block;
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.2;
    color: ${cor('titleColor')};
  }

  small {
    ${versalete}
    display: block;
    margin-top: 6px;
    font-size: 1rem;
    letter-spacing: 0.06em;
    color: var(--ouro);
  }

  p {
    max-width: 28em;
    margin: 10px auto 0;
    line-height: 1.65;
  }
`;

const Videos = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 40px;
`;

/* ---------- Novena ---------- */

// a Novena usa o vinho nos botões; o rótulo do dia e o dia aberto ganham o ouro, que aparece no escuro
const MolduraNovena = styled.div`
  margin-top: 40px;

  && small {
    color: var(--ouro);
  }

  && button[aria-pressed='true'] {
    border-color: var(--ouro);
  }
`;

/* ---------- Oração ---------- */

const Medalha = styled.div`
  width: 112px;
  margin: 0 auto 28px;
  color: var(--ouro);

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const Prece = styled.div`
  max-width: 30em;
  margin: 32px auto 0;
  text-align: center;

  &::before,
  &::after {
    content: '';
    display: block;
    width: min(220px, 60%);
    height: 1px;
    margin: 0 auto;
    background: var(--ouro);
  }

  p {
    padding: 36px 0;
    font-family: ${SERIFA};
    font-style: italic;
    font-weight: 500;
    font-size: clamp(1.3rem, 4.6vw, 1.6rem);
    line-height: 1.7;
    white-space: pre-line;
  }
`;

const Nota = styled.p`
  max-width: 30em;
  margin: 22px auto 0;
  text-align: center;
  font-size: 0.95rem;
  font-style: italic;
  color: ${cor('textSecondary')};
`;

const Copiar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  color: var(--ouro);
`;

const Outros = styled.div`
  margin-top: 36px;
`;

/* ---------- Página ---------- */

const PaginaPio = ({ santo }) => {
  const c = santo.cores;
  const musica = musicas[santo.slug];
  const {
    chagas,
    destaque,
    historias,
    iconografia,
    escritos,
    milagres,
    lugares,
    leituras,
    novena,
    oracao,
  } = santo;

  // o ouro e o vinho do santo, com transparências para os filetes
  const coresDaCapela = {
    '--ouro': c.brilho,
    '--ouro-filete': `${c.brilho}73`,
    '--ouro-tenue': `${c.brilho}33`,
    '--vinho': c.principal,
  };

  return (
    <CascaDoSanto santo={santo}>
      <Capela style={coresDaCapela}>
        <Topo aria-labelledby="santo-nome">
          <Nicho>
            <Castical>
              <Vela cor={c.brilho} />
            </Castical>
            <Arco $posicao={santo.posicaoImagem}>
              <img
                src={santo.imagem}
                alt={`Retrato de ${santo.nome}`}
                loading="eager"
              />
            </Arco>
            <Castical $par>
              <Vela cor={c.brilho} />
            </Castical>
          </Nicho>

          <Origem>{santo.origem}</Origem>
          <Nome id="santo-nome">{santo.nome}</Nome>
          {santo.frase && (
            <Lema>
              <p>“{santo.frase.texto}”</p>
            </Lema>
          )}
          <Dados>
            <div>
              <dt>Festa</dt>
              <dd>{santo.festa}</dd>
            </div>
            {santo.padroeiro?.length > 0 && (
              <div>
                <dt>{santo.rotuloPadroeiro || 'Padroeiro'}</dt>
                <dd>{santo.padroeiro.join(', ')}</dd>
              </div>
            )}
          </Dados>
          {musica && (
            <Musica>
              <BotaoMusica musica={musica} claro />
            </Musica>
          )}
        </Topo>

        {chagas && (
          <Capitulo id="as-chagas" titulo={chagas.titulo}>
            <Maos>
              <MaosChagadas cor={c.principal} />
            </Maos>
            <Coluna>
              {chagas.texto.map(paragrafo => (
                <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
              ))}
            </Coluna>
            {chagas.fatos?.length > 0 && (
              <Numeros>
                {chagas.fatos.map(fato => (
                  <li key={fato.rotulo}>
                    <strong>{fato.numero}</strong>
                    <span>{fato.rotulo}</span>
                  </li>
                ))}
              </Numeros>
            )}
          </Capitulo>
        )}

        {destaque?.itens?.length > 0 && (
          <Faixa>
            <Capitulo
              id="tres-palavras"
              titulo={destaque.titulo}
              introducao={destaque.introducao}
              largura={960}
            >
              <Palavras>
                {destaque.itens.map((item, i) => (
                  <li key={item.titulo}>
                    {i > 0 && <Separador />}
                    <h3>{item.titulo}</h3>
                    <p>{item.texto}</p>
                  </li>
                ))}
              </Palavras>
            </Capitulo>
          </Faixa>
        )}

        <Capitulo id="quem-foi" titulo="Quem foi" largura={640}>
          <Relato>
            <Aspas aria-hidden="true">“</Aspas>
            {santo.historia.map(paragrafo => (
              <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
            ))}
          </Relato>
        </Capitulo>

        {historias?.itens?.length > 0 && (
          <Capitulo
            id="dia-a-dia"
            titulo={historias.titulo}
            introducao={historias.introducao}
            largura={880}
          >
            <Testemunhos>
              {historias.itens.map(item => (
                <li key={item.titulo}>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </li>
              ))}
            </Testemunhos>
          </Capitulo>
        )}

        {santo.linhaDoTempo?.length > 0 && (
          <Capitulo
            id="linha-do-tempo"
            titulo={santo.tituloLinhaDoTempo || 'Linha do tempo'}
            largura={880}
          >
            <Linha>
              {santo.linhaDoTempo.map(marco => (
                <li key={marco.ano}>
                  <Marco>
                    <Chama />
                  </Marco>
                  <strong>{marco.ano}</strong>
                  <p>{marco.texto}</p>
                </li>
              ))}
            </Linha>
          </Capitulo>
        )}

        {milagres?.itens?.length > 0 && (
          <Capitulo
            id="milagres"
            titulo="Milagres reconhecidos"
            introducao={milagres.introducao}
            largura={880}
          >
            <Processos>
              {milagres.itens.map(item => {
                const [tipo, ano] = partesDoTitulo(item.titulo);
                return (
                  <Processo key={item.titulo}>
                    <h3>
                      <span>{tipo}</span>
                      {ano && <strong>{ano}</strong>}
                    </h3>
                    <p>{item.texto}</p>
                  </Processo>
                );
              })}
            </Processos>
          </Capitulo>
        )}

        {iconografia?.itens?.length > 0 && (
          <Capitulo
            id="nas-imagens"
            titulo="Como reconhecer nas imagens"
            introducao={iconografia.introducao}
            largura={960}
          >
            <PainelIcones>
              <Detalhe>
                <img
                  src={santo.imagem}
                  alt={`Detalhe do retrato de ${santo.nome}: o rosto, a barba e o capuz do hábito`}
                  loading="lazy"
                />
              </Detalhe>
              <Simbolos>
                {iconografia.itens.map((item, i) => (
                  <li key={item.simbolo}>
                    <span aria-hidden="true">{i + 1}</span>
                    <div>
                      <strong>{item.simbolo}</strong>
                      <p>{item.significado}</p>
                    </div>
                  </li>
                ))}
              </Simbolos>
            </PainelIcones>
          </Capitulo>
        )}

        {escritos && (
          <Capitulo
            id="palavras"
            titulo="Palavras e escritos"
            introducao={escritos.introducao}
            largura={760}
          >
            {escritos.frases?.length > 0 && (
              <Frases>
                {escritos.frases.map(frase => (
                  <figure key={frase.texto}>
                    <blockquote>
                      <p>“{frase.texto}”</p>
                    </blockquote>
                    <figcaption>{frase.fonte}</figcaption>
                  </figure>
                ))}
              </Frases>
            )}
            {escritos.obras?.length > 0 && (
              <Obras>
                <h3>O que deixou escrito</h3>
                {escritos.obras.map(obra => (
                  <div key={obra.titulo}>
                    <cite>{obra.titulo}</cite>
                    <p>{obra.texto}</p>
                  </div>
                ))}
              </Obras>
            )}
          </Capitulo>
        )}

        {lugares?.length > 0 && (
          <Capitulo id="lugares" titulo="Lugares para visitar" largura={960}>
            <ListaLugares>
              {lugares.map(lugar => (
                <li key={lugar.nome}>
                  <h3>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lugar.nome}, ${lugar.cidade}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lugar.nome}
                      <PiArrowUpRight aria-hidden="true" />
                      <Oculto> (abre o mapa em outra aba)</Oculto>
                    </a>
                  </h3>
                  <small>{lugar.cidade}</small>
                  <p>{lugar.texto}</p>
                </li>
              ))}
            </ListaLugares>
          </Capitulo>
        )}

        {leituras?.length > 0 && (
          <Capitulo id="para-ler" titulo="Para ler" largura={640}>
            <Livros>
              {leituras.map(livro => (
                <li key={livro.titulo}>
                  <cite>{livro.titulo}</cite>
                  <small>{livro.autor}</small>
                  <p>{livro.texto}</p>
                </li>
              ))}
            </Livros>
          </Capitulo>
        )}

        {santo.videos?.length > 0 && (
          <Capitulo id="assistir" titulo="Para assistir" largura={760}>
            <Videos>
              {santo.videos.map(video => (
                <Video key={video.id} id={video.id} titulo={video.titulo} />
              ))}
            </Videos>
          </Capitulo>
        )}

        {novena && (
          <Capitulo id="novena" titulo="Novena de nove dias" largura={680}>
            <MolduraNovena>
              <Novena slug={santo.slug} novena={novena} cor={c.principal} />
            </MolduraNovena>
          </Capitulo>
        )}

        <Faixa>
          <Capitulo
            id="oracao"
            titulo={oracao.titulo}
            largura={640}
            semFilete
            antes={
              <Medalha>
                <EmblemaPio cor={c.principal} />
              </Medalha>
            }
          >
            <Prece>
              <p>{oracao.texto}</p>
            </Prece>
            {oracao.nota && <Nota>{oracao.nota}</Nota>}
            <Copiar>
              <CopiarOracao oracao={oracao} />
            </Copiar>
          </Capitulo>
        </Faixa>

        <Capitulo id="outros" titulo="Conheça também" largura={560}>
          <Outros>
            <OutrosSantos atual={santo.slug} />
          </Outros>
        </Capitulo>
      </Capela>
    </CascaDoSanto>
  );
};

export default PaginaPio;
