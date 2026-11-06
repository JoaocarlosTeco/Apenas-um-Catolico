import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCopy,
  FiSearch,
  FiX,
} from 'react-icons/fi';
import { categorias, momentos, oracoes } from '../data/oracoes';
import VelaDeIntencao from '../components/VelaDeIntencao';

const TODAS = 'todas';
const DO_DIA = 'do-dia';
// Mesma preferência de tamanho de letra da Liturgia Diária
const CHAVE_FONTE = 'tamanhoFonte';
const FONTE_MIN = 14;
const FONTE_MAX = 24;
const FONTE_PADRAO = 17;
// A partir desta largura o leitor vira um painel no centro em vez de folha de baixo
const TELA_LARGA = '(min-width: 768px)';
const FOCAVEIS = 'a[href], button:not([disabled]), [tabindex="0"]';

// Sugestão de cada faixa de horário, válida até a hora "ate" (sem incluir)
const HORARIOS = [
  { ate: 5, momento: 'noite' },
  { ate: 11, momento: 'manha', oracao: 'santo-anjo' },
  { ate: 14, momento: 'meio-dia' },
  { ate: 17, rotulo: 'À tarde', oracao: 'magnificat' },
  { ate: 19, rotulo: 'Ao entardecer', oracao: 'angelus' },
  { ate: 24, momento: 'noite' },
];

// Minúsculas, sem acento e sem pontuação, letra a letra: o índice continua batendo com o texto original
const normalizar = texto =>
  texto
    .split('')
    .map(
      letra =>
        letra
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]/g, ' ')
          .charAt(0) || ' '
    )
    .join('');

// Palavras da busca separadas por qualquer quantidade de espaço ou pontuação
const montarPadrao = busca => {
  const palavras = normalizar(busca).split(' ').filter(Boolean);
  return palavras.length ? new RegExp(palavras.join(' +'), 'g') : null;
};

const indiceBusca = new Map(
  oracoes.map(oracao => [
    oracao.id,
    normalizar(
      [oracao.titulo, ...(oracao.apelidos || []), oracao.texto].join('\n')
    ),
  ])
);

const combina = (oracao, padrao) => {
  padrao.lastIndex = 0;
  return padrao.test(indiceBusca.get(oracao.id));
};

const casa = (texto, padrao) => {
  padrao.lastIndex = 0;
  return padrao.test(normalizar(texto));
};

const porId = new Map(oracoes.map(oracao => [oracao.id, oracao]));

// Primeira linha, sem "V." e sem a pontuação do fim, como num índice de missal
const primeiraLinha = texto =>
  texto
    .split('\n')[0]
    .replace(/^[VR]\.\s+/, '')
    .replace(/[,;:.]+$/, '');

// Na busca, se a palavra só aparece mais para dentro do texto, mostra a linha onde ela está
const linhaDaLista = (oracao, padrao) => {
  const inicio = primeiraLinha(oracao.texto);
  if (!padrao || casa(oracao.titulo, padrao) || casa(inicio, padrao)) {
    return inicio;
  }
  const linha = oracao.texto.split('\n').find(cada => casa(cada, padrao));
  if (!linha) return inicio;
  // Achado no fim de uma linha longa: começa um pouco antes dele para caber na tela
  padrao.lastIndex = 0;
  const { index } = padrao.exec(normalizar(linha));
  const corte = index > 36 ? linha.indexOf(' ', index - 28) : -1;
  return corte > 0 && corte < index ? `…${linha.slice(corte + 1)}` : linha;
};

function sugestaoDaHora() {
  const hora = new Date().getHours();
  const faixa = HORARIOS.find(item => hora < item.ate);
  const momento = momentos.find(item => item.id === faixa?.momento);
  const oracao = porId.get(faixa?.oracao || momento?.oracoes[0]);
  const rotulo = faixa?.rotulo || momento?.rotulo;
  return oracao && rotulo ? { oracao, rotulo } : null;
}

function lerTamanhoFonte() {
  try {
    const salvo = Number(window.localStorage.getItem(CHAVE_FONTE));
    if (salvo >= FONTE_MIN && salvo <= FONTE_MAX) return salvo;
  } catch {
    // sem localStorage, fica o padrão
  }
  return FONTE_PADRAO;
}

async function copiarTexto(texto) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(texto);
      return;
    } catch {
      // permissão negada: tenta o jeito antigo abaixo
    }
  }
  // Navegadores sem a API de área de transferência
  const campo = document.createElement('textarea');
  campo.value = texto;
  campo.setAttribute('readonly', '');
  campo.style.position = 'fixed';
  campo.style.opacity = '0';
  document.body.appendChild(campo);
  campo.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(campo);
  if (!ok) throw new Error('copia indisponivel');
}

// Animações do leitor, em CSS. Celular: folha que sobe de baixo. Computador: painel que aparece
// no lugar. Com movimento reduzido no sistema, só esmaece. Na saída, o leitor fica montado o tempo
// da animação (SAIDA_MS) e só depois some da página.
const SAIDA_MS = 330;
const aparecer = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const sumir = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;
const subir = keyframes`
  from { transform: translateY(100%); }
  to { transform: none; }
`;
const descer = keyframes`
  from { transform: none; }
  to { transform: translateY(100%); }
`;
const surgir = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
`;
const afundar = keyframes`
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: translateY(16px); }
`;

/* ---------- Estilos comuns ---------- */

const ocultoNaTela = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SomenteLeitor = styled.span`
  ${ocultoNaTela}
`;

// Trechos encontrados pela busca
const marcaBusca = css`
  mark {
    background: ${({ theme }) => theme.colors.sky};
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.gold} 35%,
      transparent
    );
    color: inherit;
    border-radius: 2px;
    padding: 0 1px;
  }
`;

const umaLinha = css`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const rotuloVersalete = css`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.08rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.06em;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.accent};
`;

const sublinhadoOuro = css`
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  text-decoration-color: ${({ theme }) => theme.colors.gold};
`;

// Ações em forma de texto: serifa do livro, sublinhado discreto
const linkDeTexto = ({ theme }) => `
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font-family: ${theme.fonts.body};
  font-size: 1.05rem;
  color: ${theme.colors.accent};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  text-decoration-color: ${theme.colors.borderColor};
  transition: text-decoration-color 0.2s ease, color 0.2s ease;

  &:hover {
    color: ${theme.colors.titleColor};
    text-decoration-color: currentColor;
  }

  svg {
    flex: 0 0 auto;
  }
`;

const LinkInterno = styled(Link)`
  ${linkDeTexto}
`;

/* ---------- Página e cabeçalho ---------- */

const Pagina = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 96px 16px 56px;

  @media (min-width: 768px) {
    padding-top: 120px;
  }

  /* duas colunas de orações no computador */
  @media (min-width: 900px) {
    max-width: 880px;
  }
`;

const Topo = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Sobretitulo = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 2px;
`;

const Titulo = styled.h1`
  font-size: clamp(2.2rem, 7vw, 2.8rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.titleColor};
  margin-bottom: 8px;
`;

const Subtitulo = styled.p`
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* ---------- Sugestão da hora ---------- */

const NomeAgora = styled.span`
  min-width: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.titleColor};
`;

const Agora = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 52px;
  padding: 8px 2px;
  margin-bottom: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.2s ease;

  &:active {
    background: ${({ theme }) => theme.colors.sky};
  }

  > svg {
    flex: 0 0 auto;
  }

  @media (hover: hover) {
    &:hover ${NomeAgora} {
      ${sublinhadoOuro}
    }
  }
`;

const TextoAgora = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 10px;
`;

const RotuloAgora = styled.span`
  ${rotuloVersalete}
  white-space: nowrap;
`;

/* ---------- Busca e filtros ---------- */

const CampoBusca = styled.div`
  position: relative;
  margin-bottom: 8px;

  > svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }

  input {
    width: 100%;
    min-height: 48px;
    padding: 0 48px 0 42px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    background: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    appearance: none;
    transition: border-color 0.2s ease;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    &::-webkit-search-cancel-button {
      appearance: none;
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.titleColor};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.accent};
      outline-offset: 2px;
    }
  }
`;

const BotaoLimpar = styled.button`
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

// No celular vira uma faixa que rola de lado sem alargar a página; no computador quebra linha
const Filtros = styled.div`
  display: flex;
  gap: 22px;
  overflow-x: auto;
  margin: 0 -16px;
  padding: 0 16px;
  scroll-padding-inline: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 2px 26px;
    overflow: visible;
    margin: 0;
    padding: 0;
    border-bottom: none;
  }
`;

const Filtro = styled.button`
  flex: 0 0 auto;
  min-height: 44px;
  padding: 0 2px;
  margin-bottom: -1px;
  border-bottom: 2px solid
    ${({ $ativo, theme }) => ($ativo ? theme.colors.titleColor : 'transparent')};
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $ativo, theme }) =>
    $ativo ? theme.colors.titleColor : theme.colors.textSecondary};
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.titleColor};
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Contagem = styled.p`
  margin-top: 14px;
  font-size: 1rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};

  ${({ $oculta }) => $oculta && ocultoNaTela}
`;

/* ---------- Índice ---------- */

const TituloGrupo = styled.h2`
  ${rotuloVersalete}
  padding: 22px 0 8px;
`;

const Linhas = styled.ul`
  list-style: none;

  li {
    min-width: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  }

  li:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  }

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 40px;

    li:nth-child(2) {
      border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
  }

  ${marcaBusca}
`;

const NomeLinha = styled.span`
  ${umaLinha}
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.22rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.titleColor};
`;

const Incipit = styled.span`
  ${umaLinha}
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.98rem;
  font-style: italic;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Linha = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  width: 100%;
  min-height: 68px;
  padding: 10px 2px;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.2s ease;

  &:active {
    background: ${({ theme }) => theme.colors.sky};
  }

  @media (hover: hover) {
    &:hover ${NomeLinha} {
      ${sublinhadoOuro}
    }
  }
`;

const LinkGrupo = styled(LinkInterno)`
  margin-top: 4px;
  font-size: 1rem;
`;

const Vazio = styled.div`
  margin-top: 20px;
  padding: 24px 0;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  p:first-child {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  p + p {
    margin-top: 6px;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const AcoesVazio = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
`;

const BotaoVazio = styled.button`
  min-height: 44px;
  padding: 0 16px;
  border-radius: 3px;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1px solid
    ${({ $principal, theme }) =>
      $principal ? theme.colors.primary : theme.colors.borderColor};
  background: ${({ $principal, theme }) =>
    $principal ? theme.colors.primary : 'transparent'};
  color: ${({ $principal, theme }) =>
    $principal ? theme.colors.white : theme.colors.titleColor};

  &:hover {
    border-color: ${({ $principal, theme }) =>
      $principal ? theme.colors.primary : theme.colors.titleColor};
  }
`;

/* ---------- Leitor ---------- */

// Acima do topo fixo e da barra de baixo do celular
const Camada = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  pointer-events: ${({ $saindo }) => ($saindo ? 'none' : 'auto')};

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }
`;

const Fundo = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) =>
    theme.modo === 'escuro' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(16, 32, 60, 0.5)'};
  animation: ${({ $saindo }) =>
    $saindo
      ? css`
          ${sumir} 0.2s ease forwards
        `
      : css`
          ${aparecer} 0.2s ease
        `};
`;

const Painel = styled.div`
  animation: ${({ $saindo }) =>
    $saindo
      ? css`
          ${descer} 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards
        `
      : css`
          ${subir} 0.32s cubic-bezier(0.22, 1, 0.36, 1)
        `};

  @media ${TELA_LARGA} {
    animation: ${({ $saindo }) =>
      $saindo
        ? css`
            ${afundar} 0.22s cubic-bezier(0.2, 0.8, 0.2, 1) forwards
          `
        : css`
            ${surgir} 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)
          `};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: ${({ $saindo }) =>
      $saindo
        ? css`
            ${sumir} 0.15s ease forwards
          `
        : css`
            ${aparecer} 0.15s ease
          `};
  }

  position: absolute;
  inset: calc(12px + env(safe-area-inset-top)) 0 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 4px 4px 0 0;

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    position: relative;
    inset: auto;
    width: 100%;
    max-width: 640px;
    max-height: calc(100vh - 80px);
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 4px;
  }
`;

const BarraLeitor = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 2px;
  min-height: 56px;
  padding: 0 6px 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    padding: 0 10px 0 36px;
  }
`;

const CategoriaLeitor = styled.p`
  ${rotuloVersalete}
  ${umaLinha}
  flex: 1 1 auto;
  min-width: 0;
`;

const ControlesFonte = styled.div`
  display: flex;
  align-items: center;
  padding-right: 6px;
  margin-right: 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const botaoDaBarra = css`
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.titleColor};
  transition: background-color 0.2s ease;

  @media (hover: hover) {
    &:hover:not([aria-disabled='true']) {
      background: ${({ theme }) => theme.colors.sky};
    }
  }
`;

const BotaoFonte = styled.button`
  ${botaoDaBarra}
  font-size: ${({ $menor }) => ($menor ? '0.82rem' : '1rem')};
  font-weight: 600;

  &[aria-disabled='true'] {
    opacity: 0.35;
    cursor: default;
  }
`;

const BotaoFechar = styled.button`
  ${botaoDaBarra}

  svg {
    width: 22px;
    height: 22px;
  }
`;

const CorpoLeitor = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 24px 20px calc(32px + env(safe-area-inset-bottom));

  @media (min-width: 768px) {
    padding: 28px 36px 32px;
  }

  ${marcaBusca}
`;

const TituloLeitor = styled.h2`
  font-size: clamp(1.75rem, 6vw, 2.2rem);
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.titleColor};
  margin-bottom: 18px;

  &:focus {
    outline: none;
  }
`;

const TextoOracao = styled.p`
  white-space: pre-line;
  overflow-wrap: break-word;
  font-size: ${({ $tamanho }) => $tamanho}px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
`;

const BotaoCopiar = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  margin-top: 20px;
  padding: 0 14px;
  border-radius: 3px;
  border: 1px solid
    ${({ theme, $copiada }) =>
      $copiada ? theme.colors.titleColor : theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.titleColor};
  font-size: 0.85rem;
  font-weight: 600;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: currentColor;
  }
`;

const Notas = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Nota = styled.div`
  font-size: 1rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    ${rotuloVersalete}
    margin-bottom: 2px;
  }
`;

const LinkLeitor = styled(LinkInterno)`
  margin-top: 10px;
`;

const Navegacao = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 28px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Passo = styled.button`
  grid-column: ${({ $proxima }) => ($proxima ? 2 : 1)};
  display: flex;
  flex-direction: column;
  align-items: ${({ $proxima }) => ($proxima ? 'flex-end' : 'flex-start')};
  gap: 2px;
  min-width: 0;
  min-height: 64px;
  padding: 12px 0;
  text-align: ${({ $proxima }) => ($proxima ? 'right' : 'left')};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};

  > span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  strong {
    ${umaLinha}
    max-width: 100%;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.12rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  @media (hover: hover) {
    &:hover strong {
      ${sublinhadoOuro}
    }
  }
`;

// Envolve em <mark> os trechos que casam com a busca
const Marcado = ({ texto, padrao }) => {
  if (!padrao) return texto;
  const normal = normalizar(texto);
  const partes = [];
  let ultimo = 0;
  padrao.lastIndex = 0;
  for (const achado of normal.matchAll(padrao)) {
    const inicio = achado.index;
    const fim = inicio + achado[0].length;
    if (inicio > ultimo) partes.push(texto.slice(ultimo, inicio));
    partes.push(<mark key={inicio}>{texto.slice(inicio, fim)}</mark>);
    ultimo = fim;
  }
  if (!partes.length) return texto;
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
};

const Leitor = ({
  oracao,
  padrao,
  anterior,
  proxima,
  aoIr,
  aoFechar,
  tamanho,
  aoMudarFonte,
  saindo,
}) => {
  const idTitulo = useId();
  const painel = useRef(null);
  const corpo = useRef(null);
  const titulo = useRef(null);
  const idVisto = useRef(null);
  const temporizador = useRef(null);
  const [copiada, setCopiada] = useState(false);
  const [aviso, setAviso] = useState('');
  const presente = !saindo;

  useEffect(() => () => clearTimeout(temporizador.current), []);

  // Ao abrir, o foco entra no diálogo; ao trocar de oração, vai para o título e o texto volta ao topo
  useEffect(() => {
    const trocou = idVisto.current !== null && idVisto.current !== oracao.id;
    idVisto.current = oracao.id;
    clearTimeout(temporizador.current);
    setCopiada(false);
    setAviso('');
    if (!trocou) {
      painel.current?.focus({ preventScroll: true });
      return;
    }
    if (corpo.current) corpo.current.scrollTop = 0;
    titulo.current?.focus({ preventScroll: true });
  }, [oracao.id]);

  const copiar = async evento => {
    const botao = evento.currentTarget;
    try {
      await copiarTexto(oracao.texto);
      setCopiada(true);
      setAviso(`Oração copiada: ${oracao.titulo}.`);
      clearTimeout(temporizador.current);
      temporizador.current = setTimeout(() => setCopiada(false), 2000);
    } catch {
      setAviso(
        'Não foi possível copiar. Selecione o texto e copie manualmente.'
      );
    }
    // A cópia sem a API da área de transferência tira o foco do diálogo
    if (!painel.current?.contains(document.activeElement)) botao.focus();
  };

  const teclar = evento => {
    if (!presente) return;
    if (evento.key === 'Escape') {
      evento.preventDefault();
      aoFechar();
      return;
    }
    if (evento.key !== 'Tab' || !painel.current) return;
    // O Tab circula só dentro do diálogo
    const focaveis = Array.from(painel.current.querySelectorAll(FOCAVEIS));
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    const atual = document.activeElement;
    if (evento.shiftKey && (atual === primeiro || atual === painel.current)) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && atual === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  };

  const categoria = categorias.find(item => item.id === oracao.categoria);

  return (
    <Camada onKeyDown={teclar} $saindo={!presente}>
      <Fundo aria-hidden="true" $saindo={saindo} onClick={aoFechar} />
      <Painel
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        tabIndex={-1}
        $saindo={saindo}
      >
        <BarraLeitor>
          <CategoriaLeitor>{categoria?.rotulo}</CategoriaLeitor>
          <ControlesFonte role="group" aria-label="Tamanho do texto">
            <BotaoFonte
              type="button"
              $menor
              aria-label="Diminuir texto"
              aria-disabled={tamanho <= FONTE_MIN}
              onClick={() => aoMudarFonte(-1)}
            >
              A−
            </BotaoFonte>
            <BotaoFonte
              type="button"
              aria-label="Aumentar texto"
              aria-disabled={tamanho >= FONTE_MAX}
              onClick={() => aoMudarFonte(1)}
            >
              A+
            </BotaoFonte>
          </ControlesFonte>
          <BotaoFechar type="button" onClick={aoFechar} aria-label="Fechar">
            <FiX aria-hidden="true" />
          </BotaoFechar>
        </BarraLeitor>

        <CorpoLeitor ref={corpo}>
          <TituloLeitor id={idTitulo} ref={titulo} tabIndex={-1}>
            {oracao.titulo}
          </TituloLeitor>
          <TextoOracao $tamanho={tamanho}>
            <Marcado texto={oracao.texto} padrao={padrao} />
          </TextoOracao>

          <BotaoCopiar type="button" $copiada={copiada} onClick={copiar}>
            {copiada ? (
              <FiCheck aria-hidden="true" />
            ) : (
              <FiCopy aria-hidden="true" />
            )}
            {copiada ? 'Copiada' : 'Copiar'}
          </BotaoCopiar>

          {(oracao.origem || oracao.comoRezar) && (
            <Notas>
              {oracao.origem && (
                <Nota>
                  <h3>Origem</h3>
                  <p>{oracao.origem}</p>
                </Nota>
              )}
              {oracao.comoRezar && (
                <Nota>
                  <h3>Como rezar</h3>
                  <p>{oracao.comoRezar}</p>
                </Nota>
              )}
            </Notas>
          )}

          {oracao.link && (
            <LinkLeitor to={oracao.link.para}>
              {oracao.link.rotulo} <FiArrowRight aria-hidden="true" />
            </LinkLeitor>
          )}

          {(anterior || proxima) && (
            <Navegacao aria-label="Outras orações da lista">
              {anterior && (
                <Passo type="button" onClick={() => aoIr(-1)}>
                  <span>
                    <FiArrowLeft aria-hidden="true" /> Anterior
                  </span>
                  <strong>{anterior.titulo}</strong>
                </Passo>
              )}
              {proxima && (
                <Passo type="button" $proxima onClick={() => aoIr(1)}>
                  <span>
                    Próxima <FiArrowRight aria-hidden="true" />
                  </span>
                  <strong>{proxima.titulo}</strong>
                </Passo>
              )}
            </Navegacao>
          )}

          <SomenteLeitor aria-live="polite">{aviso}</SomenteLeitor>
        </CorpoLeitor>
      </Painel>
    </Camada>
  );
};

/* ---------- Página ---------- */

const Oracao = () => {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pedido = params.get('categoria');
  // ?categoria=do-dia abre direto no filtro pedido, para outras páginas poderem linkar
  const filtro = categorias.some(categoria => categoria.id === pedido)
    ? pedido
    : TODAS;
  // ?oracao=angelus abre a oração no leitor; id desconhecido mostra só a lista
  const aberta = porId.get(params.get('oracao')) || null;

  // Ao fechar, o leitor continua na tela com a última oração durante a animação de saída
  const [ultima, setUltima] = useState(aberta);
  useEffect(() => {
    if (aberta) {
      setUltima(aberta);
      return undefined;
    }
    const espera = setTimeout(() => setUltima(null), SAIDA_MS);
    return () => clearTimeout(espera);
  }, [aberta]);
  const noLeitor = aberta || ultima;

  const [busca, setBusca] = useState('');
  const [tamanho, setTamanho] = useState(lerTamanhoFonte);
  const [posicao, setPosicao] = useState(-1);
  const [sugestao] = useState(sugestaoDaHora);
  const listaRef = useRef(null);
  const origem = useRef(null);
  const leitura = useRef(null);
  const fechando = useRef(false);

  const padrao = useMemo(() => montarPadrao(busca), [busca]);

  // Cada grupo guarda onde começa na lista corrida, usada por "anterior" e "próxima"
  const secoes = useMemo(() => {
    const passa = oracao => !padrao || combina(oracao, padrao);

    const grupos =
      filtro === DO_DIA
        ? momentos.map(momento => ({
            ...momento,
            itens: momento.oracoes
              .map(id => porId.get(id))
              .filter(Boolean)
              .filter(passa),
          }))
        : categorias
            .filter(categoria => filtro === TODAS || categoria.id === filtro)
            .map(categoria => ({
              ...categoria,
              itens: oracoes.filter(
                oracao => oracao.categoria === categoria.id && passa(oracao)
              ),
            }));

    let inicio = 0;
    return grupos
      .filter(grupo => grupo.itens.length)
      .map(grupo => {
        const secao = { ...grupo, inicio };
        inicio += grupo.itens.length;
        return secao;
      });
  }, [filtro, padrao]);

  const lista = useMemo(() => secoes.flatMap(secao => secao.itens), [secoes]);
  const total = new Set(lista.map(oracao => oracao.id)).size;

  // No "Do dia" a mesma oração aparece em dois momentos: vale a linha que foi tocada
  let indice = -1;
  if (aberta) {
    indice =
      lista[posicao]?.id === aberta.id
        ? posicao
        : lista.findIndex(oracao => oracao.id === aberta.id);
  }
  const leitorAberto = Boolean(aberta);

  // Com o leitor aberto, a página de trás não rola nem recebe foco
  useEffect(() => {
    if (!leitorAberto) return undefined;
    const { body } = document;
    const raiz = document.getElementById('root');
    const antes = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const barra = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (barra > 0) body.style.paddingRight = `${barra}px`;
    if (raiz) raiz.inert = true;
    return () => {
      body.style.overflow = antes.overflow;
      body.style.paddingRight = antes.paddingRight;
      if (raiz) raiz.inert = false;
    };
  }, [leitorAberto]);

  useEffect(() => {
    fechando.current = false;
  }, [aberta]);

  // Ao fechar, o foco volta para quem abriu ou para a linha da última oração lida
  useEffect(() => {
    if (aberta) {
      leitura.current = { id: aberta.id, indice };
      return;
    }
    const ultima = leitura.current;
    const abriu = origem.current;
    leitura.current = null;
    origem.current = null;
    if (!ultima) return;
    const container = listaRef.current;
    const alvo =
      abriu?.id === ultima.id && abriu.elemento?.isConnected
        ? abriu.elemento
        : container?.querySelector(
            `[data-indice="${ultima.indice}"][data-oracao="${ultima.id}"]`
          ) || container?.querySelector(`[data-oracao="${ultima.id}"]`);
    alvo?.focus();
  }, [aberta, indice]);

  const abrir = (id, novaPosicao, elemento) => {
    origem.current = { id, elemento };
    setPosicao(novaPosicao);
    const novos = new URLSearchParams(params);
    novos.set('oracao', id);
    // Entrada nova no histórico: o "voltar" do celular fecha o leitor
    setParams(novos, { state: { leitor: true } });
  };

  const irPara = novaPosicao => {
    const destino = lista[novaPosicao];
    if (!destino) return;
    setPosicao(novaPosicao);
    const novos = new URLSearchParams(params);
    novos.set('oracao', destino.id);
    setParams(novos, { replace: true, state: location.state });
  };

  const fechar = () => {
    if (!aberta || fechando.current) return;
    fechando.current = true;
    if (location.state?.leitor) {
      navigate(-1);
      return;
    }
    // Aberto por link direto: não há para onde voltar, só tira a oração do endereço
    const novos = new URLSearchParams(params);
    novos.delete('oracao');
    setParams(novos, { replace: true });
  };

  const escolherFiltro = id => {
    const novos = new URLSearchParams(params);
    if (id === TODAS) novos.delete('categoria');
    else novos.set('categoria', id);
    setParams(novos, { replace: true });
  };

  const mudarFonte = delta => {
    setTamanho(atual => {
      const novo = Math.min(FONTE_MAX, Math.max(FONTE_MIN, atual + delta));
      try {
        window.localStorage.setItem(CHAVE_FONTE, String(novo));
      } catch {
        // sem localStorage, vale só nesta visita
      }
      return novo;
    });
  };

  const contagem = padrao
    ? `${total} ${total === 1 ? 'oração encontrada' : 'orações encontradas'}`
    : `${total} ${total === 1 ? 'oração' : 'orações'}`;

  const rotuloSugestao = sugestao
    ? sugestao.rotulo.charAt(0).toLowerCase() + sugestao.rotulo.slice(1)
    : '';

  return (
    <Pagina>
      <Helmet>
        <title>
          {aberta
            ? `${aberta.titulo} - Orações - Apenas um Católico`
            : 'Orações - Apenas um Católico'}
        </title>
        <meta
          name="description"
          content="Pai-Nosso, Ave-Maria, Credo, Salve-Rainha, Angelus e outras orações católicas tradicionais, organizadas por momento do dia e com a origem de cada uma."
        />
      </Helmet>

      <Topo>
        <Sobretitulo>Para rezar todos os dias</Sobretitulo>
        <Titulo>Orações</Titulo>
        <Subtitulo>As orações de sempre, para cada momento do dia.</Subtitulo>
      </Topo>

      {sugestao && (
        <Agora
          type="button"
          aria-label={`Agora, ${rotuloSugestao}: ${sugestao.oracao.titulo}`}
          onClick={evento =>
            abrir(
              sugestao.oracao.id,
              lista.findIndex(oracao => oracao.id === sugestao.oracao.id),
              evento.currentTarget
            )
          }
        >
          <TextoAgora>
            <RotuloAgora>Agora · {sugestao.rotulo}</RotuloAgora>
            <NomeAgora>{sugestao.oracao.titulo}</NomeAgora>
          </TextoAgora>
          <FiArrowRight aria-hidden="true" />
        </Agora>
      )}

      <form
        role="search"
        onSubmit={evento => {
          // Enter só fecha o teclado do celular; a lista já filtra enquanto se digita
          evento.preventDefault();
          evento.currentTarget.querySelector('input')?.blur();
        }}
      >
        <CampoBusca>
          <SomenteLeitor as="label" htmlFor="busca-oracao">
            Buscar oração
          </SomenteLeitor>
          <FiSearch aria-hidden="true" />
          <input
            id="busca-oracao"
            type="search"
            placeholder="Buscar oração"
            autoComplete="off"
            enterKeyHint="search"
            value={busca}
            onChange={evento => setBusca(evento.target.value)}
            onKeyDown={evento => {
              if (evento.key === 'Escape') setBusca('');
            }}
          />
          {busca && (
            <BotaoLimpar
              type="button"
              onClick={() => setBusca('')}
              aria-label="Limpar busca"
            >
              <FiX aria-hidden="true" />
            </BotaoLimpar>
          )}
        </CampoBusca>
      </form>

      <Filtros role="group" aria-label="Categorias de oração">
        {[{ id: TODAS, rotulo: 'Todas' }, ...categorias].map(categoria => (
          <Filtro
            key={categoria.id}
            type="button"
            $ativo={categoria.id === filtro}
            aria-pressed={categoria.id === filtro}
            onClick={() => escolherFiltro(categoria.id)}
          >
            {categoria.rotulo}
          </Filtro>
        ))}
      </Filtros>

      <Contagem aria-live="polite" $oculta={!padrao || total === 0}>
        {contagem}
      </Contagem>

      {total === 0 && (
        <Vazio>
          <p>Nenhuma oração encontrada para “{busca.trim()}”.</p>
          <p>Tente outra palavra, como “Maria”, “perdão” ou “anjo”.</p>
          <AcoesVazio>
            {filtro !== TODAS && (
              <BotaoVazio
                type="button"
                $principal
                onClick={() => escolherFiltro(TODAS)}
              >
                Buscar em todas
              </BotaoVazio>
            )}
            <BotaoVazio
              type="button"
              $principal={filtro === TODAS}
              onClick={() => setBusca('')}
            >
              Limpar busca
            </BotaoVazio>
          </AcoesVazio>
        </Vazio>
      )}

      <div ref={listaRef}>
        {secoes.map(secao => (
          <section key={secao.id} aria-labelledby={`grupo-${secao.id}`}>
            <TituloGrupo id={`grupo-${secao.id}`}>{secao.rotulo}</TituloGrupo>
            <Linhas>
              {secao.itens.map((oracao, ordem) => {
                const posicaoNaLista = secao.inicio + ordem;
                return (
                  <li key={oracao.id}>
                    <Linha
                      type="button"
                      data-oracao={oracao.id}
                      data-indice={posicaoNaLista}
                      onClick={evento =>
                        abrir(oracao.id, posicaoNaLista, evento.currentTarget)
                      }
                    >
                      <NomeLinha>
                        <Marcado texto={oracao.titulo} padrao={padrao} />
                      </NomeLinha>
                      <Incipit>
                        <Marcado
                          texto={linhaDaLista(oracao, padrao)}
                          padrao={padrao}
                        />
                      </Incipit>
                    </Linha>
                  </li>
                );
              })}
            </Linhas>
            {secao.link && (
              <LinkGrupo to={secao.link.para}>
                {secao.link.rotulo} <FiArrowRight aria-hidden="true" />
              </LinkGrupo>
            )}
          </section>
        ))}
      </div>

      <div style={{ marginTop: 56 }}>
        <VelaDeIntencao />
      </div>

      {createPortal(
        noLeitor ? (
          <Leitor
            oracao={noLeitor}
            padrao={padrao}
            anterior={indice > 0 ? lista[indice - 1] : null}
            proxima={indice >= 0 ? lista[indice + 1] || null : null}
            aoIr={passo => irPara(indice + passo)}
            aoFechar={fechar}
            tamanho={tamanho}
            aoMudarFonte={mudarFonte}
            saindo={!aberta}
          />
        ) : null,
        document.body
      )}
    </Pagina>
  );
};

export default Oracao;
