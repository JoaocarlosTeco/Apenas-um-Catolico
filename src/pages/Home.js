import React, { useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';
import SEO from '../components/SEO';
import FolhinhaDeArrancar from '../components/FolhinhaDeArrancar';
import { Emblema } from '../components/Emblemas';
import SantosSection from './Home/SantosSection';
import {
  buscarLiturgia,
  corLiturgica,
  separarVersiculos,
} from '../services/liturgia';
import {
  TEMPOS,
  proximasCelebracoes,
  somarDias,
} from '../services/anoLiturgico';
import {
  CORES,
  ROTULO_TIPO,
  chave,
  diaLiturgico,
} from '../services/calendarioLiturgico';

// A página do dia: a folhinha, a Palavra, uma oração para a hora que a pessoa abriu o site,
// a semana que vem pela frente e os santos da casa. Fundo de papel, sem bloco escuro no topo.

const SITE = 'https://joaocarlosteco.github.io/Apenas-um-Catolico/';
const DIAS_CURTOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MISTERIOS = [
  'gloriosos',
  'gozosos',
  'dolorosos',
  'gloriosos',
  'luminosos',
  'dolorosos',
  'gozosos',
];

function saudacaoDa(hora) {
  if (hora >= 5 && hora < 12) return 'Bom dia';
  if (hora >= 12 && hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

// a oração que cabe na hora em que a pessoa abriu o site
function oracaoDaHora(agora) {
  const hora = agora.getHours();
  if (hora >= 5 && hora < 11)
    return {
      quando: 'Para começar o dia',
      titulo: 'Entregue o dia a Deus',
      texto:
        'Antes do celular e das tarefas: o sinal da cruz, o Santo Anjo e, se der tempo, as Laudes.',
      links: [
        { to: '/laudes', rotulo: 'Rezar as Laudes' },
        { to: '/oracao?oracao=santo-anjo', rotulo: 'Santo Anjo' },
      ],
    };
  if (hora >= 11 && hora < 15)
    return {
      quando: 'Ao meio-dia',
      titulo: 'O Angelus',
      texto:
        'Uma pausa no meio do dia para lembrar que Deus se fez homem. Leva dois minutos.',
      links: [{ to: '/oracao?oracao=angelus', rotulo: 'Rezar o Angelus' }],
    };
  if (hora >= 15 && hora < 18)
    return {
      quando: 'À tarde',
      titulo: 'Um mistério do terço',
      texto: `Hoje são os mistérios ${MISTERIOS[agora.getDay()]}. Uma dezena já é um bom começo.`,
      links: [{ to: '/santos/nossa-senhora', rotulo: 'Abrir o terço' }],
    };
  if (hora === 18)
    return {
      quando: 'Às seis da tarde',
      titulo: 'O Angelus da tarde',
      texto:
        'O sino das seis chamava para a mesma oração do meio-dia. Ainda dá tempo.',
      links: [{ to: '/oracao?oracao=angelus', rotulo: 'Rezar o Angelus' }],
    };
  return {
    quando: 'Antes de dormir',
    titulo: 'Reveja o dia',
    texto:
      'Agradeça o bem recebido, reconheça as faltas e entregue a noite a Deus.',
    links: [
      { to: '/oracao?oracao=ato-de-contricao', rotulo: 'Ato de contrição' },
      { to: '/oracao?oracao=salve-rainha', rotulo: 'Salve-Rainha' },
    ],
  };
}

/** Primeira frase do Evangelho, sem os números dos versículos */
function trechoDoEvangelho(liturgia) {
  const evangelho = liturgia?.leituras.evangelho[0];
  if (!evangelho) return null;
  const limpo = separarVersiculos(evangelho.texto)
    .filter(parte => !parte.versiculo)
    .map(parte => parte.texto)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
  const fimDaFrase = limpo.search(/[.!?]\s/);
  const frase =
    fimDaFrase > 40 && fimDaFrase < 220
      ? limpo.slice(0, fimDaFrase + 1)
      : `${limpo.slice(0, 180).trim()}...`;
  // as falas dentro do trecho viram aspas simples, e a que ficou aberta é fechada
  let interna = frase.replace(/[“"](?=\S)/g, '‘').replace(/”|"/g, '’');
  const abertas = (interna.match(/‘/g) || []).length;
  const fechadas = (interna.match(/’/g) || []).length;
  if (abertas > fechadas) interna = interna.replace(/([.!?…]*)$/, '’$1');
  return { referencia: evangelho.referencia, frase: interna };
}

// a próxima data de um dos santos que têm página no site
function proximaFestaDaCasa(hoje) {
  for (let n = 0; n <= 366; n += 1) {
    const info = diaLiturgico(somarDias(hoje, n));
    const c = [info.principal, ...info.outras].find(item => item?.santo);
    if (c) return { ...c, data: info.data, faltam: n };
  }
  return null;
}

const quandoFalta = n =>
  n === 0 ? 'Hoje' : n === 1 ? 'Amanhã' : `Daqui a ${n} dias`;

/* ---------- Abertura ---------- */

const Pagina = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 92px 16px 0;

  @media (min-width: 768px) {
    padding: 120px 24px 0;
  }
`;

const Abertura = styled.section`
  display: grid;
  gap: 28px;
  grid-template-areas:
    'topo'
    'folha'
    'palavra';

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    grid-template-areas:
      'topo folha'
      'palavra folha';
    column-gap: 72px;
    row-gap: 32px;
    align-items: start;
  }
`;

const Topo = styled.header`
  grid-area: topo;
`;

const DataDeHoje = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.15rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gold};
`;

const Saudacao = styled.h1`
  margin-top: 2px;
  font-size: clamp(2.6rem, 9vw, 4rem);
  font-style: italic;
  line-height: 1;
  color: ${({ theme }) => theme.colors.titleColor};
`;

const OndeEstamos = styled.p`
  margin-top: 14px;
  font-size: 1.12rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textSecondary};

  i {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    border-radius: 50%;
    background: ${({ $cor }) => $cor};
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.borderColor};
    text-underline-offset: 3px;
  }
`;

// o lugar do bloquinho de parede (a folhinha que se arranca)
const Bloco = styled.div`
  grid-area: folha;
  justify-self: center;
  width: 100%;
  max-width: 340px;
  margin-bottom: 10px;

  @media (min-width: 900px) {
    margin-top: 12px;
  }
`;

const Palavra = styled.section`
  grid-area: palavra;
  padding-left: 18px;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};

  > p:first-child {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.08rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 8px;
  }

  blockquote {
    font-size: clamp(1.3rem, 4.6vw, 1.6rem);
    font-style: italic;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  cite {
    display: block;
    margin-top: 10px;
    font-style: normal;
    font-size: 1rem;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Esqueleto = styled.span`
  display: block;
  height: ${({ $altura }) => $altura}px;
  width: ${({ $largura }) => $largura || '100%'};
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.sky};
  margin-bottom: 10px;
`;

const Acoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  margin-top: 22px;
`;

const BotaoPrincipal = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;

  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const LinkDeTexto = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.08rem;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.borderColor};
  text-underline-offset: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.titleColor};
    text-decoration-color: currentColor;
  }
`;

/* ---------- Agora ---------- */

const Agora = styled.section`
  margin-top: 48px;
  padding: 22px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: grid;
  gap: 6px 40px;

  @media (min-width: 900px) {
    margin-top: 64px;
    grid-template-columns: 220px minmax(0, 1fr) auto;
    align-items: center;
  }

  > p:first-child {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.12rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.gold};
  }

  h2 {
    font-size: clamp(1.5rem, 5vw, 1.9rem);
    line-height: 1.15;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  div > p {
    margin-top: 4px;
    font-size: 1.08rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0 20px;
  }
`;

/* ---------- Semana e próxima festa ---------- */

const Secao = styled.section`
  margin-top: 56px;

  @media (min-width: 768px) {
    margin-top: 72px;
  }
`;

const Cabecalho = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

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
    font-size: clamp(1.6rem, 5vw, 2.1rem);
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

const DuasColunas = styled.div`
  display: grid;
  gap: 40px;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 56px;
    align-items: start;
  }
`;

const Tira = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px;
`;

const DiaDaTira = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 0 10px;
  border-radius: 10px;
  background: ${({ $cor, theme }) =>
    `color-mix(in srgb, ${$cor} ${theme.modo === 'escuro' ? 22 : 13}%, ${theme.colors.cardBackground})`};
  box-shadow: ${({ $hoje, theme }) =>
    $hoje ? `inset 0 0 0 2px ${theme.colors.titleColor}` : 'none'};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ $cor, theme }) =>
      `color-mix(in srgb, ${$cor} ${theme.modo === 'escuro' ? 32 : 22}%, ${theme.colors.cardBackground})`};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({ theme, $domingo }) =>
      $domingo
        ? theme.modo === 'escuro'
          ? '#e08a72'
          : '#9b2d20'
        : theme.colors.textSecondary};
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.35rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $marca }) => $marca || 'transparent'};
  }
`;

const Destaques = styled.ul`
  list-style: none;
  margin-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

  li {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr);
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    font-size: 1.05rem;
    line-height: 1.4;
  }

  li span {
    font-variant: small-caps;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  li small {
    display: block;
    font-size: 0.95rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ProximaFesta = styled(Link)`
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.gold};
  }

  svg {
    width: 88px;
    height: 88px;
  }

  small {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.02rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.gold};
  }

  strong {
    display: block;
    margin: 2px 0 4px;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.4rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  p {
    font-size: 1rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

/* ---------- Sumário ---------- */

const Sumario = styled.ol`
  list-style: none;
  display: grid;
  gap: 0 56px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  a {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr) auto;
    align-items: baseline;
    gap: 10px;
    padding: 14px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    color: ${({ theme }) => theme.colors.text};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  a:hover strong {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  b {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.05rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gold};
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  small {
    display: block;
    font-size: 1rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  svg {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const SUMARIO = [
  {
    to: '/liturgia-diaria',
    titulo: 'Liturgia diária',
    texto: 'As leituras da Missa de qualquer dia',
  },
  { to: '/laudes', titulo: 'Laudes', texto: 'A oração da manhã da Igreja' },
  {
    to: '/oracao',
    titulo: 'Orações',
    texto: 'Para o acordar, a mesa e a noite',
  },
  {
    to: '/calendario',
    titulo: 'Calendário',
    texto: 'A folhinha do ano, dia por dia',
  },
  { to: '/santos', titulo: 'Santos', texto: 'Vida, escritos e novenas' },
  { to: '/blog', titulo: 'Blog', texto: 'Textos e reflexões' },
];
const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const Home = () => {
  const theme = useTheme();
  const agora = useMemo(() => new Date(), []);
  const hoje = useMemo(
    () => new Date(agora.getFullYear(), agora.getMonth(), agora.getDate()),
    [agora]
  );

  const [liturgia, setLiturgia] = useState(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    const controle = new AbortController();
    buscarLiturgia(agora, { signal: controle.signal })
      .then(setLiturgia)
      .catch(() => !controle.signal.aborted && setFalhou(true));
    return () => controle.abort();
  }, [agora]);

  // tudo que dá para saber sem internet vem do calendário calculado no site
  const infoHoje = useMemo(() => diaLiturgico(hoje), [hoje]);
  const semana = useMemo(
    () => Array.from({ length: 7 }, (_, n) => diaLiturgico(somarDias(hoje, n))),
    [hoje]
  );
  const proxima = useMemo(() => proximasCelebracoes(hoje, 1)[0], [hoje]);
  const festaDaCasa = useMemo(() => proximaFestaDaCasa(hoje), [hoje]);
  const oracao = oracaoDaHora(agora);

  const cor = liturgia ? corLiturgica(liturgia.cor) : CORES[infoHoje.cor];
  const trecho = trechoDoEvangelho(liturgia);
  const tempo = TEMPOS[infoHoje.tempo];
  const semanaDoTempo =
    infoHoje.semana && infoHoje.tempo !== 'natal' && infoHoje.tempo !== 'triduo'
      ? `${infoHoje.semana}ª semana ${infoHoje.tempo === 'quaresma' ? 'da' : 'do'} ${tempo.nome}`
      : tempo.nome;
  const destaques = semana.filter(d => d.principal || d.domingo);

  return (
    <>
      <SEO
        title="Início"
        description="A liturgia de hoje, a vida dos santos e orações para rezar todos os dias."
        url={SITE}
      />

      <Pagina>
        <Abertura>
          <Topo>
            <DataDeHoje>
              {agora.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </DataDeHoje>
            <Saudacao>{saudacaoDa(agora.getHours())}</Saudacao>
            <OndeEstamos $cor={cor.hex}>
              <i aria-hidden="true" />
              {semanaDoTempo.charAt(0).toUpperCase() + semanaDoTempo.slice(1)}
              {proxima && proxima.faltam > 0 && (
                <>
                  , faltam{' '}
                  <Link to={`/calendario?data=${chave(proxima.data)}`}>
                    {proxima.faltam} {proxima.faltam === 1 ? 'dia' : 'dias'}{' '}
                    para {proxima.nome}
                  </Link>
                </>
              )}
              .
            </OndeEstamos>
          </Topo>

          <Bloco>
            <FolhinhaDeArrancar
              hoje={hoje}
              liturgia={liturgia}
              cor={cor}
              titulo={infoHoje.titulo}
              fundo={theme.colors.background}
            />
          </Bloco>

          <Palavra aria-live="polite">
            <p>A Palavra de hoje</p>
            {trecho ? (
              <blockquote>
                “{trecho.frase}”<cite>Evangelho · {trecho.referencia}</cite>
              </blockquote>
            ) : falhou ? (
              <blockquote>
                As leituras de hoje estão a um toque de distância.
              </blockquote>
            ) : (
              <div aria-busy="true" aria-label="Carregando o Evangelho de hoje">
                <Esqueleto $altura={24} />
                <Esqueleto $altura={24} $largura="85%" />
                <Esqueleto $altura={14} $largura="40%" />
              </div>
            )}
            <Acoes>
              <BotaoPrincipal to="/liturgia-diaria?aba=evangelho">
                Ler o Evangelho <PiArrowRight aria-hidden="true" />
              </BotaoPrincipal>
              <LinkDeTexto to="/liturgia-diaria">Todas as leituras</LinkDeTexto>
            </Acoes>
          </Palavra>
        </Abertura>

        <Agora aria-labelledby="titulo-agora">
          <p>
            {oracao.quando} · {agora.getHours()}h
          </p>
          <div>
            <h2 id="titulo-agora">{oracao.titulo}</h2>
            <p>{oracao.texto}</p>
          </div>
          <nav aria-label="Oração para agora">
            {oracao.links.map(l => (
              <LinkDeTexto key={l.to} to={l.to}>
                {l.rotulo} <PiArrowRight aria-hidden="true" />
              </LinkDeTexto>
            ))}
          </nav>
        </Agora>

        <Secao aria-labelledby="titulo-semana">
          <DuasColunas>
            <div>
              <Cabecalho>
                <div>
                  <small>Esta semana</small>
                  <h2 id="titulo-semana">Os próximos dias</h2>
                </div>
                <LinkDeTexto to="/calendario">Calendário</LinkDeTexto>
              </Cabecalho>
              <Tira>
                {semana.map((d, n) => (
                  <li key={chave(d.data)}>
                    <DiaDaTira
                      to={`/calendario?data=${chave(d.data)}`}
                      $cor={CORES[d.cor].hex}
                      $hoje={n === 0}
                      $domingo={d.domingo}
                      $marca={d.principal ? CORES[d.principal.cor].hex : null}
                      aria-label={`${n === 0 ? 'Hoje' : DIAS_CURTOS[d.data.getDay()]}, ${d.data.getDate()}: ${d.titulo}`}
                    >
                      <span aria-hidden="true">
                        {n === 0 ? 'Hoje' : DIAS_CURTOS[d.data.getDay()]}
                      </span>
                      <strong aria-hidden="true">{d.data.getDate()}</strong>
                      <i aria-hidden="true" />
                    </DiaDaTira>
                  </li>
                ))}
              </Tira>
              {destaques.length > 0 && (
                <Destaques>
                  {destaques.map(d => (
                    <li key={chave(d.data)}>
                      <span>
                        {DIAS_CURTOS[d.data.getDay()]} {d.data.getDate()}
                      </span>
                      <div>
                        {d.titulo}
                        {d.principal && (
                          <small>{ROTULO_TIPO[d.principal.tipo]}</small>
                        )}
                      </div>
                    </li>
                  ))}
                </Destaques>
              )}
            </div>

            {festaDaCasa && (
              <div>
                <Cabecalho>
                  <div>
                    <small>Na folhinha</small>
                    <h2>A próxima festa</h2>
                  </div>
                </Cabecalho>
                <ProximaFesta to={`/santos/${festaDaCasa.santo}`}>
                  <Emblema slug={festaDaCasa.santo} />
                  <div>
                    <small>{quandoFalta(festaDaCasa.faltam)}</small>
                    <strong>{festaDaCasa.nome}</strong>
                    <p>
                      {festaDaCasa.data.toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                      })}
                      .
                      {festaDaCasa.novena && festaDaCasa.faltam > 8
                        ? ' Dá tempo de rezar a novena antes.'
                        : ''}
                    </p>
                  </div>
                </ProximaFesta>
              </div>
            )}
          </DuasColunas>
        </Secao>
      </Pagina>

      <SantosSection />

      <Pagina
        as="nav"
        aria-labelledby="titulo-sumario"
        style={{ paddingTop: 0, paddingBottom: 72 }}
      >
        <Cabecalho>
          <div>
            <small>Para rezar e ler</small>
            <h2 id="titulo-sumario">Sumário</h2>
          </div>
        </Cabecalho>
        <Sumario>
          {SUMARIO.map((item, i) => (
            <li key={item.to}>
              <Link to={item.to}>
                <b aria-hidden="true">{ROMANOS[i]}</b>
                <span>
                  <strong>{item.titulo}</strong>
                  <small>{item.texto}</small>
                </span>
                <PiArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </Sumario>
      </Pagina>
    </>
  );
};

export default Home;
