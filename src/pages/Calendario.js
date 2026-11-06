import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { PiArrowRight, PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import RodaLiturgica from '../components/RodaLiturgica';
import { Emblema } from '../components/Emblemas';
import { santoPorSlug } from '../data/santos';
import {
  TEMPOS,
  diasEntre,
  proximasCelebracoes,
} from '../services/anoLiturgico';
import {
  CORES,
  ROTULO_TIPO,
  chave,
  diaLiturgico,
  semanasDoMes,
} from '../services/calendarioLiturgico';

// Calendário de parede: o mês em grade, cada dia com o fundo na cor litúrgica,
// marquinhas nas solenidades, festas e memórias, e o dia escolhido aberto ao lado.

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
const ROMANOS = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
];
const SEMANA = [
  ['D', 'Domingo'],
  ['S', 'Segunda'],
  ['T', 'Terça'],
  ['Q', 'Quarta'],
  ['Q', 'Quinta'],
  ['S', 'Sexta'],
  ['S', 'Sábado'],
];

const hexDaCor = cor => (CORES[cor] || CORES.verde).hex;
const soDia = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const mesmoDia = (a, b) => a && b && chave(a) === chave(b);

function lerData(texto) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto || '')) return null;
  const [a, m, d] = texto.split('-').map(Number);
  const data = new Date(a, m - 1, d);
  return Number.isNaN(data.getTime()) || data.getDate() !== d ? null : data;
}

// a marca de cada dia na grade, pela celebração mais importante
function marcaDoDia(info) {
  const c = info.principal;
  const tipo = c ? c.tipo : info.tipo;
  if (
    tipo === 'solenidade' ||
    tipo === 'comemoracao' ||
    info.tempo === 'triduo'
  )
    return 'estrela';
  if (tipo === 'festa' || tipo === 'festa-senhor') return 'ponto';
  if (tipo === 'memoria') return 'anel';
  if (info.outras.length) return 'anelzinho';
  return null;
}

const rubrica = theme => (theme.modo === 'escuro' ? '#e08a72' : '#9b2d20');

/* ---------- Página ---------- */

const Pagina = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 96px 16px 72px;

  @media (min-width: 768px) {
    padding-top: 120px;
  }
`;

const Topo = styled.header`
  text-align: center;
  margin-bottom: 28px;
`;

const Sobretitulo = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 4px;
`;

const Titulo = styled.h1`
  font-size: clamp(2.3rem, 8vw, 3.2rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.titleColor};
`;

// "Faltam tantos dias": uma linha que rola de lado no celular
const Contagens = styled.ul`
  list-style: none;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin: 18px -16px 0;
  padding: 0 16px 4px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    margin: 18px 0 0;
    padding: 0;
  }

  li {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    background: ${({ theme }) => theme.colors.cardBackground};
    font-size: 0.98rem;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.text};
  }

  b {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.15rem;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  span {
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Layout = styled.div`
  display: grid;
  gap: 24px;
  align-items: start;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 32px;
  }
`;

/* ---------- A folha do mês ---------- */

const Folha = styled.section`
  position: relative;
  padding: 26px 12px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 560px) {
    padding: 30px 22px 20px;
  }
`;

// as argolas do calendário de parede
const Argolas = styled.div`
  position: absolute;
  top: -9px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 56px;
  pointer-events: none;

  i {
    width: 10px;
    height: 20px;
    border-radius: 6px;
    border: 2px solid ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.background};
  }
`;

const CabecalhoMes = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  text-align: center;
`;

const NomeMes = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.9rem, 7vw, 2.4rem);
  font-weight: 600;
  font-style: italic;
  line-height: 1;
  color: ${({ theme }) => theme.colors.titleColor};

  small {
    display: block;
    margin-top: 4px;
    font-size: 1rem;
    font-style: normal;
    font-variant: small-caps;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const Seta = styled.button`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.titleColor};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.sky};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

// a faixa com os tempos litúrgicos do mês, na cor de cada um
const Faixa = styled.div`
  display: flex;
  gap: 3px;
  margin: 0 2px 6px;

  span {
    height: 6px;
    border-radius: 999px;
  }
`;

const NomesDaFaixa = styled.div`
  display: flex;
  gap: 3px;
  margin: 0 2px 14px;

  span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.92rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;

  @media (min-width: 560px) {
    gap: 6px;
  }
`;

const DiaDaSemana = styled.abbr`
  padding-bottom: 4px;
  text-align: center;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ theme, $domingo }) =>
    $domingo ? rubrica(theme) : theme.colors.textSecondary};
`;

const Celula = styled.button`
  position: relative;
  min-width: 0;
  aspect-ratio: 1 / 1.08;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  padding-top: 6px;
  border-radius: 10px;
  background: ${({ $cor, theme }) =>
    `color-mix(in srgb, ${$cor} ${theme.modo === 'escuro' ? 22 : 13}%, ${theme.colors.cardBackground})`};
  color: ${({ theme }) => theme.colors.text};
  transition:
    transform 0.15s ease,
    background 0.2s ease;

  &:hover {
    background: ${({ $cor, theme }) =>
      `color-mix(in srgb, ${$cor} ${theme.modo === 'escuro' ? 32 : 22}%, ${theme.colors.cardBackground})`};
  }

  &:active {
    transform: scale(0.96);
  }

  ${({ $passou }) =>
    $passou &&
    css`
      opacity: 0.62;
    `}

  ${({ $escolhido, theme }) =>
    $escolhido &&
    css`
      box-shadow: inset 0 0 0 2px ${theme.colors.titleColor};
      opacity: 1;
    `}

  @media (min-width: 560px) {
    aspect-ratio: 1 / 0.92;
    padding-top: 8px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active {
      transform: none;
    }
  }
`;

const Numero = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1;
  color: ${({ theme, $domingo }) =>
    $domingo ? rubrica(theme) : theme.colors.titleColor};

  ${({ $hoje, theme }) =>
    $hoje &&
    css`
      background: ${theme.colors.primary};
      color: #fff;
    `}

  @media (min-width: 560px) {
    width: 32px;
    height: 32px;
    font-size: 1.3rem;
  }
`;

// nome curto da celebração dentro do quadradinho, só onde cabe
const NomeNaCelula = styled.span`
  display: none;

  @media (min-width: 1000px) {
    display: block;
    max-width: 100%;
    padding: 0 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: 0.62rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Marca = ({ tipo, cor }) => {
  if (!tipo) return <span style={{ height: 8 }} aria-hidden="true" />;
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      aria-hidden="true"
      style={{ flex: '0 0 auto' }}
    >
      {tipo === 'estrela' && (
        <path
          d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z"
          fill={cor}
        />
      )}
      {tipo === 'ponto' && <circle cx="5" cy="5" r="3.4" fill={cor} />}
      {tipo === 'anel' && (
        <circle
          cx="5"
          cy="5"
          r="3"
          fill="none"
          stroke={cor}
          strokeWidth="1.6"
        />
      )}
      {tipo === 'anelzinho' && (
        <circle
          cx="5"
          cy="5"
          r="2"
          fill="none"
          stroke={cor}
          strokeWidth="1.2"
          opacity="0.7"
        />
      )}
    </svg>
  );
};

const PeDaFolha = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
  margin-top: 16px;
`;

const Legenda = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  li {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
`;

const BotaoHoje = styled.button`
  min-height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.titleColor};

  &:hover {
    border-color: currentColor;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

/* ---------- O dia aberto ---------- */

const Painel = styled.aside`
  position: relative;
  padding: 30px 22px 22px;
  border-radius: 14px;
  background: #fbf8f1;
  color: #1f2430;
  border-top: 10px solid ${({ $cor }) => $cor};
  scroll-margin-top: 88px;

  /* os dois furos de pendurar, como a folhinha da home */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background};
  }

  &::before {
    left: calc(50% - 30px);
  }

  &::after {
    right: calc(50% - 30px);
  }

  @media (min-width: 900px) {
    position: sticky;
    top: 96px;
  }
`;

const CabecaDoDia = styled.div`
  text-align: center;
  margin-bottom: 16px;

  p {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-variant: small-caps;
    letter-spacing: 0.1em;
    font-size: 1.1rem;
    font-weight: 600;
    color: #6a5a3a;
  }

  strong {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 4.6rem;
    font-weight: 600;
    line-height: 0.95;
    color: #14284b;
  }
`;

const Selo = styled.span`
  display: inline-block;
  margin-top: 8px;
  padding: 2px 12px;
  border-radius: 999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
  background: #14284b;
`;

const NomeDoDia = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  color: #14284b;
`;

const Grau = styled.p`
  margin-top: 4px;
  text-align: center;
  font-size: 1.02rem;
  font-variant: small-caps;
  letter-spacing: 0.06em;
  color: #6a5a3a;
`;

const Linha = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  line-height: 1.55;
  color: #4c5260;
  text-align: center;

  i {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 50%;
    vertical-align: 0;
    background: ${({ $cor }) => $cor};
  }

  em {
    color: #6a5a3a;
  }
`;

const Filete = styled.hr`
  border: none;
  height: 1px;
  width: 70%;
  margin: 18px auto;
  background: #ddd5c4;
`;

const Bloco = styled.div`
  & + & {
    margin-top: 16px;
  }

  h4 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.05rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: #6a5a3a;
    margin-bottom: 6px;
  }

  ul {
    list-style: none;
    display: grid;
    gap: 8px;
  }

  li {
    font-size: 1rem;
    line-height: 1.45;
    color: #1f2430;
  }

  li small {
    display: block;
    font-size: 0.92rem;
    font-style: italic;
    color: #5e6370;
  }
`;

const Santinho = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e6dcc8;
  color: #14284b;
  text-decoration: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #9c7c38;
  }

  svg {
    flex: 0 0 auto;
    width: 46px;
    height: 46px;
  }

  span {
    font-size: 1rem;
    line-height: 1.35;
  }
`;

const LinkLiturgia = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  margin-top: 20px;
  border-radius: 999px;
  background: #14284b;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: #1d3a6b;
  }
`;

/* ---------- Neste mês ---------- */

const Secao = styled.section`
  margin-top: 48px;

  h2 {
    font-size: clamp(1.6rem, 5.5vw, 2rem);
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  > p {
    margin-top: 6px;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ListaDoMes = styled.ul`
  list-style: none;
  margin-top: 16px;
  display: grid;
  gap: 0 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    border-top: none;
  }
`;

const ItemDoMes = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    &:nth-child(-n + 2) {
      border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
  }

  button {
    width: 100%;
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    align-items: center;
    gap: 14px;
    padding: 12px 0;
    text-align: left;
    font-family: ${({ theme }) => theme.fonts.body};
  }

  button:hover strong {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const Bolinha = styled.span`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.titleColor};
  background: ${({ $cor, theme }) =>
    `color-mix(in srgb, ${$cor} ${theme.modo === 'escuro' ? 30 : 18}%, ${theme.colors.cardBackground})`};
  border: 1.5px solid ${({ $cor }) => $cor};
`;

const TextoDoItem = styled.span`
  min-width: 0;

  strong {
    display: block;
    font-weight: ${({ $forte }) => ($forte ? 600 : 400)};
    font-size: 1.06rem;
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  small {
    font-size: 0.95rem;
    font-variant: small-caps;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const OcultoNaTela = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

/* ---------- Componentes ---------- */

const DiaAberto = React.forwardRef(({ info, hoje }, ref) => {
  const d = info.data;
  const cor = hexDaCor(info.cor);
  const tempo = TEMPOS[info.tempo];
  const faltam = diasEntre(hoje, d);
  const quando =
    faltam === 0
      ? 'Hoje'
      : faltam === 1
        ? 'Amanhã'
        : faltam === -1
          ? 'Ontem'
          : faltam > 0
            ? `Daqui a ${faltam} dias`
            : `Há ${-faltam} dias`;

  const celebracoes = [info.principal, ...info.outras].filter(Boolean);
  const santo = celebracoes.map(c => c.santo).find(Boolean);
  const dadosSanto = santo ? santoPorSlug(santo) : null;
  const leituras = info.domingo
    ? `Leituras do ano ${info.ciclo} dos domingos`
    : `Leituras do ano ${info.ferial === 'II' ? 'par' : 'ímpar'} dos dias de semana`;

  return (
    <Painel ref={ref} $cor={cor} aria-live="polite" aria-label="Dia escolhido">
      <CabecaDoDia>
        <p>{d.toLocaleDateString('pt-BR', { weekday: 'long' })}</p>
        <strong>{d.getDate()}</strong>
        <p>
          {MESES[d.getMonth()].toLowerCase()} de {d.getFullYear()}
        </p>
        <Selo>{quando}</Selo>
      </CabecaDoDia>

      <NomeDoDia>{info.titulo}</NomeDoDia>
      {info.principal && <Grau>{ROTULO_TIPO[info.principal.tipo]}</Grau>}
      {info.principal && <Linha>{info.doTempo}</Linha>}
      {info.principal?.nota && (
        <Linha>
          <em>{info.principal.nota}</em>
        </Linha>
      )}

      <Linha $cor={cor}>
        <i aria-hidden="true" />
        {CORES[info.cor]?.nome} · {tempo.nome}
        <br />
        {leituras}
      </Linha>

      {(info.outras.length > 0 || info.novenas.length > 0 || dadosSanto) && (
        <Filete />
      )}

      {info.outras.length > 0 && (
        <Bloco>
          <h4>Também neste dia</h4>
          <ul>
            {info.outras.map(c => (
              <li key={c.nome}>
                {c.nome}
                <small>
                  {ROTULO_TIPO[c.tipo]}, {c.situacao}
                </small>
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {info.novenas.length > 0 && (
        <Bloco>
          <h4>Novena</h4>
          <ul>
            {info.novenas.map(n => (
              <li key={n.nome}>
                {n.nome}
                <small>
                  {n.numero === 1 ? 'Começa hoje' : `${n.numero}º dia de 9`}
                </small>
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {dadosSanto && (
        <Bloco>
          <Santinho to={`/santos/${dadosSanto.slug}`}>
            <Emblema slug={dadosSanto.slug} />
            <span>
              Conhecer{' '}
              {dadosSanto.slug === 'nossa-senhora'
                ? 'Nossa Senhora'
                : dadosSanto.nome}
            </span>
          </Santinho>
        </Bloco>
      )}

      <LinkLiturgia to={`/liturgia-diaria?data=${chave(d)}`}>
        Ler a liturgia deste dia <PiArrowRight aria-hidden="true" />
      </LinkLiturgia>
    </Painel>
  );
});

// os trechos de cada tempo dentro do mês, para a faixa colorida
function trechosDoMes(dias) {
  const trechos = [];
  dias.forEach(info => {
    const ultimo = trechos[trechos.length - 1];
    if (ultimo && ultimo.tempo === info.tempo) ultimo.dias += 1;
    else trechos.push({ tempo: info.tempo, dias: 1 });
  });
  return trechos;
}

const Calendario = () => {
  const [params, setParams] = useSearchParams();
  const hoje = useMemo(() => soDia(new Date()), []);
  const escolhido = lerData(params.get('data')) || hoje;
  const ano = escolhido.getFullYear();
  const mes = escolhido.getMonth();

  const grade = useRef(null);
  const painel = useRef(null);
  const focarDepois = useRef(false);
  const toque = useRef(null);

  const semanas = useMemo(() => semanasDoMes(ano, mes), [ano, mes]);
  const diasDoMes = useMemo(
    () => semanas.flat().filter(Boolean).map(diaLiturgico),
    [semanas]
  );
  const porChave = useMemo(
    () => new Map(diasDoMes.map(i => [chave(i.data), i])),
    [diasDoMes]
  );
  const info = porChave.get(chave(escolhido)) || diaLiturgico(escolhido);
  const trechos = useMemo(() => trechosDoMes(diasDoMes), [diasDoMes]);
  const proximas = useMemo(() => proximasCelebracoes(hoje, 3), [hoje]);

  const celebracoesDoMes = useMemo(
    () =>
      diasDoMes.flatMap(i =>
        [i.principal, ...i.outras]
          .filter(Boolean)
          .filter(c => c.tipo !== 'memoria-facultativa' || c.santo || c.mariana)
          .map(c => ({
            ...c,
            data: i.data,
            corDoDia: i.cor,
            celebrada: c === i.principal,
          }))
      ),
    [diasDoMes]
  );

  const escolher = (data, { focar = false } = {}) => {
    focarDepois.current = focar;
    setParams(mesmoDia(data, hoje) ? {} : { data: chave(data) }, {
      replace: true,
    });
  };

  // ao trocar de mês, fica o dia de hoje (se for o mês atual) ou o dia 1
  const irParaMes = delta => {
    const alvo = new Date(ano, mes + delta, 1);
    const ehMesAtual =
      alvo.getFullYear() === hoje.getFullYear() &&
      alvo.getMonth() === hoje.getMonth();
    escolher(ehMesAtual ? hoje : alvo);
  };

  // depois de andar pelas setas do teclado, o foco acompanha o dia escolhido
  useEffect(() => {
    if (!focarDepois.current) return;
    focarDepois.current = false;
    grade.current?.querySelector('[data-escolhido="true"]')?.focus();
  });

  const teclado = evento => {
    const passos = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (passos[evento.key]) {
      evento.preventDefault();
      const novo = new Date(ano, mes, escolhido.getDate() + passos[evento.key]);
      escolher(novo, { focar: true });
    } else if (evento.key === 'PageUp' || evento.key === 'PageDown') {
      evento.preventDefault();
      const delta = evento.key === 'PageUp' ? -1 : 1;
      const ultimo = new Date(ano, mes + delta + 1, 0).getDate();
      escolher(
        new Date(ano, mes + delta, Math.min(escolhido.getDate(), ultimo)),
        { focar: true }
      );
    }
  };

  // no celular, deslizar o dedo troca de mês
  const inicioDoToque = evento => {
    const t = evento.touches[0];
    toque.current = { x: t.clientX, y: t.clientY };
  };
  const fimDoToque = evento => {
    if (!toque.current) return;
    const t = evento.changedTouches[0];
    const dx = t.clientX - toque.current.x;
    const dy = t.clientY - toque.current.y;
    toque.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
      irParaMes(dx < 0 ? 1 : -1);
  };

  const abrirDia = data => {
    escolher(data);
    // no celular o painel fica embaixo da grade: leva a pessoa até ele
    if (window.matchMedia('(max-width: 899px)').matches) {
      window.requestAnimationFrame(() =>
        painel.current?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'auto'
            : 'smooth',
          block: 'start',
        })
      );
    }
  };

  const ehMesAtual = ano === hoje.getFullYear() && mes === hoje.getMonth();
  const solenidades = celebracoesDoMes.filter(
    c => c.celebrada && c.tipo === 'solenidade'
  ).length;

  return (
    <Pagina>
      <Helmet>
        <title>Calendário Litúrgico - Apenas um Católico</title>
        <meta
          name="description"
          content="Calendário litúrgico do Brasil mês a mês: a cor de cada dia, solenidades, festas, memórias dos santos e novenas, com as datas móveis já calculadas."
        />
      </Helmet>

      <Topo>
        <Sobretitulo>Folhinha do ano</Sobretitulo>
        <Titulo>Calendário</Titulo>
        <Contagens aria-label="Próximas celebrações">
          {proximas.map(p => (
            <li key={p.nome}>
              <b>
                {p.faltam === 0
                  ? 'Hoje'
                  : p.faltam === 1
                    ? 'Amanhã'
                    : `${p.faltam} dias`}
              </b>
              <span>{p.faltam > 1 ? 'para' : ''}</span> {p.nome}
            </li>
          ))}
        </Contagens>
      </Topo>

      <Layout>
        <Folha
          aria-labelledby="mes-visivel"
          onTouchStart={inicioDoToque}
          onTouchEnd={fimDoToque}
        >
          <Argolas aria-hidden="true">
            <i />
            <i />
          </Argolas>

          <CabecalhoMes>
            <Seta
              type="button"
              onClick={() => irParaMes(-1)}
              aria-label="Mês anterior"
            >
              <PiCaretLeft aria-hidden="true" />
            </Seta>
            <NomeMes id="mes-visivel" aria-live="polite">
              {MESES[mes]}
              <small>
                {ROMANOS[mes]} · {ano}
              </small>
            </NomeMes>
            <Seta
              type="button"
              onClick={() => irParaMes(1)}
              aria-label="Próximo mês"
            >
              <PiCaretRight aria-hidden="true" />
            </Seta>
          </CabecalhoMes>

          <Faixa aria-hidden="true">
            {trechos.map((t, i) => (
              <span
                key={i}
                style={{ flex: t.dias, background: TEMPOS[t.tempo].hex }}
              />
            ))}
          </Faixa>
          <NomesDaFaixa>
            {trechos.map((t, i) => (
              <span key={i} style={{ flex: t.dias }}>
                {t.dias >= 5 ? TEMPOS[t.tempo].nome : ''}
              </span>
            ))}
          </NomesDaFaixa>

          <Grade
            ref={grade}
            role="grid"
            aria-label={`${MESES[mes]} de ${ano}`}
            onKeyDown={teclado}
          >
            {SEMANA.map(([letra, nome], i) => (
              <DiaDaSemana
                key={nome}
                title={nome}
                $domingo={i === 0}
                role="columnheader"
              >
                {letra}
              </DiaDaSemana>
            ))}
            {semanas.flat().map((data, i) => {
              if (!data) return <span key={`vazio-${i}`} aria-hidden="true" />;
              const d = porChave.get(chave(data));
              const ehHoje = mesmoDia(data, hoje);
              const ehEscolhido = mesmoDia(data, escolhido);
              const marca = marcaDoDia(d);
              const destaque =
                d.principal && d.principal.tipo !== 'memoria'
                  ? d.principal.nome
                  : '';
              return (
                <Celula
                  key={chave(data)}
                  type="button"
                  role="gridcell"
                  $cor={hexDaCor(d.cor)}
                  $escolhido={ehEscolhido}
                  $passou={data < hoje}
                  data-escolhido={ehEscolhido}
                  tabIndex={ehEscolhido ? 0 : -1}
                  aria-selected={ehEscolhido}
                  aria-current={ehHoje ? 'date' : undefined}
                  aria-label={`${data.getDate()} de ${MESES[mes].toLowerCase()}, ${d.titulo}`}
                  onClick={() => abrirDia(data)}
                >
                  <Numero
                    $domingo={data.getDay() === 0}
                    $hoje={ehHoje}
                    aria-hidden="true"
                  >
                    {data.getDate()}
                  </Numero>
                  <Marca
                    tipo={marca}
                    cor={
                      marca === 'estrela'
                        ? '#9C7C38'
                        : hexDaCor(d.principal?.cor || 'branco')
                    }
                  />
                  {destaque && (
                    <NomeNaCelula aria-hidden="true">{destaque}</NomeNaCelula>
                  )}
                </Celula>
              );
            })}
          </Grade>

          <PeDaFolha>
            <Legenda aria-label="Legenda">
              <li>
                <Marca tipo="estrela" cor="#9C7C38" /> Solenidade
              </li>
              <li>
                <Marca tipo="ponto" cor="#C9A54C" /> Festa
              </li>
              <li>
                <Marca tipo="anel" cor="#C9A54C" /> Memória
              </li>
            </Legenda>
            {!mesmoDia(escolhido, hoje) && (
              <BotaoHoje type="button" onClick={() => escolher(hoje)}>
                Voltar para hoje
              </BotaoHoje>
            )}
          </PeDaFolha>
          <OcultoNaTela>
            Use as setas do teclado para andar pelos dias e Page Up ou Page Down
            para trocar de mês.
          </OcultoNaTela>
        </Folha>

        <DiaAberto ref={painel} info={info} hoje={hoje} />
      </Layout>

      <Secao aria-labelledby="neste-mes">
        <h2 id="neste-mes">Em {MESES[mes].toLowerCase()}</h2>
        <p>
          {ehMesAtual ? 'Este mês tem' : 'O mês tem'} {solenidades}{' '}
          {solenidades === 1 ? 'solenidade' : 'solenidades'} e{' '}
          {celebracoesDoMes.length - solenidades} outras festas e memórias.
          Toque numa delas para abrir o dia.
        </p>
        <ListaDoMes>
          {celebracoesDoMes.map(c => (
            <ItemDoMes key={`${chave(c.data)}-${c.nome}`}>
              <button type="button" onClick={() => abrirDia(c.data)}>
                <Bolinha $cor={hexDaCor(c.cor)} aria-hidden="true">
                  {c.data.getDate()}
                </Bolinha>
                <TextoDoItem $forte={c.tipo === 'solenidade'}>
                  <OcultoNaTela>
                    {c.data.getDate()} de {MESES[mes].toLowerCase()}:{' '}
                  </OcultoNaTela>
                  <strong>{c.nome}</strong>
                  <small>
                    {ROTULO_TIPO[c.tipo]}
                    {!c.celebrada && c.tipo !== 'memoria-facultativa'
                      ? ' · não celebrada neste ano'
                      : ''}
                    {c.brasil ? ' · do Brasil' : ''}
                  </small>
                </TextoDoItem>
              </button>
            </ItemDoMes>
          ))}
        </ListaDoMes>
      </Secao>

      <Secao aria-labelledby="ano-inteiro">
        <h2 id="ano-inteiro">O ano inteiro</h2>
        <p>Os tempos do ano litúrgico, do Advento a Cristo Rei.</p>
        <div style={{ marginTop: 16 }}>
          <RodaLiturgica dia={escolhido} mostrarProximas={false} />
        </div>
      </Secao>
    </Pagina>
  );
};

export default Calendario;
