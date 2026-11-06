import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus, FiShare2 } from 'react-icons/fi';

// Mesma preferência de tamanho da Liturgia Diária
const CHAVE_FONTE = 'tamanhoFonte';
const FONTE_MIN = 14;
const FONTE_MAX = 24;

// Roteiro local: alterna salmos, leituras e hinos conforme o dia
const generateDynamicLaudes = (dayOfWeek, dayOfMonth) => {
  const salmos = [
    {
      title: "Salmo 42 (41) - Sede de Deus",
      ant: "Cantai ao Senhor um cântico novo, porque Ele fez maravilhas.",
      psalm: `Minha alma tem sede de Deus, do Deus vivo:
      quando irei contemplar a face de Deus?
      Como a corça suspira pelas águas correntes,
      assim minha alma suspira por vós, ó meu Deus.`
    },
    {
      title: "Salmo 100 (99) - Alegria dos que entram no templo",
      ant: "Servi ao Senhor com alegria, entrai em sua presença cantando de júbilo.",
      psalm: `Aclamai o Senhor, ó terra inteira,
      servi ao Senhor com alegria,
      entrai em sua presença cantando de júbilo!`
    },
    {
      title: "Salmo 118 (117) - Hino de ação de graças",
      ant: "Este é o dia que o Senhor fez para nós, alegremo-nos e exultemos.",
      psalm: `Dai graças ao Senhor, porque ele é bom,
      porque é eterna a sua misericórdia!
      Este é o dia que o Senhor fez para nós,
      alegremo-nos e exultemos neste dia!`
    }
  ];

  const leituras = [
    {
      reading: "Irmãos, tudo o que é verdadeiro, tudo o que é nobre, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, se alguma virtude há e se algum louvor existe, seja isso o que ocupe os vossos pensamentos.",
      reference: "Fl 4, 8"
    },
    {
      reading: "Despertai, vós que dormis, levantai-vos dentre os mortos, e Cristo vos iluminará.",
      reference: "Ef 5, 14"
    },
    {
      reading: "Renovai o vosso espírito e a vossa mentalidade. Revesti o homem novo, criado segundo Deus na justiça e santidade verdadeiras.",
      reference: "Ef 4, 23-24"
    }
  ];

  const hinos = [
    `Ó esplendor da glória do Pai,
    ó luz da luz e fonte de luz,
    ó dia que iluminas o dia,
    ó sol que brilhas no meio-dia.`,
    `Cristo, luz do mundo,
    dissipai as trevas da noite,
    fazei brilhar em nós
    a luz da vossa ressurreição.`,
    `Senhor, que criastes a manhã,
    e nos dais um novo dia,
    enchei nossos corações
    de vossa paz e alegria.`
  ];

  // Selecionar conteúdo baseado no dia
  const salmoIndex = dayOfWeek % salmos.length;
  const leituraIndex = (dayOfMonth - 1) % leituras.length;
  const hinoIndex = Math.floor(dayOfMonth / 10) % hinos.length;

  return {
    invitatorium: {
      ant: "Vinde, adoremos o Senhor, nosso Rei e Salvador.",
      psalm: `Vinde, exultemos de alegria no Senhor,
      aclamemos o Rochedo que nos salva!
      Apresentemo-nos a ele com louvores
      e com cantos o nosso júbilo expressemos!`
    },
    hymn: hinos[hinoIndex],
    psalms: [
      salmos[salmoIndex],
      salmos[(salmoIndex + 1) % salmos.length]
    ],
    lectioBrevis: leituras[leituraIndex],
    benedictus: {
      ant: "Bendito seja o Senhor Deus de Israel, porque visitou e redimiu o seu povo.",
      psalm: `Bendito seja o Senhor Deus de Israel,
      porque visitou e redimiu o seu povo,
      e nos suscitou uma força salvadora
      na casa de Davi, seu servo.`
    },
    preces: [
      "Cristo, sol de justiça, que iluminas todo homem que vem a este mundo, nós vos louvamos.",
      "Vós que ressuscitastes glorioso no primeiro dia da semana, renovai hoje a nossa alegria.",
      "Vós que aparecestes aos discípulos e lhes dissestes: 'A paz esteja convosco', dai-nos a vossa paz.",
      "Vós que mandastes os Apóstolos anunciar o Evangelho, tornai-nos hoje vossas testemunhas."
    ],
    oratio: `Ó Deus, que fizestes brilhar sobre nós a luz do novo dia, concedei-nos passar este dia sem cair em pecado, para que, ao chegar à tarde, vos possamos louvar com alegria. Por nosso Senhor Jesus Cristo, vosso Filho, na unidade do Espírito Santo. Amém.`
  };
};

// Os versos vêm de template strings indentadas: tira o recuo de cada linha
const versos = texto =>
  texto
    .split('\n')
    .map(linha => linha.trim())
    .filter(Boolean)
    .join('\n');

const montarPartes = laudes => [
  {
    id: 'invitatorio',
    rotulo: 'Invitatório',
    titulo: 'Invitatório',
    referencia: 'Salmo 95 (94)',
    antifona: laudes.invitatorium.ant,
    versos: versos(laudes.invitatorium.psalm)
  },
  { id: 'hino', rotulo: 'Hino', titulo: 'Hino', versos: versos(laudes.hymn) },
  ...laudes.psalms.map((salmo, indice) => ({
    id: `salmo-${indice + 1}`,
    rotulo: `Salmo ${indice + 1}`,
    titulo: salmo.title || `Salmo ${indice + 1}`,
    antifona: salmo.ant,
    versos: versos(salmo.psalm)
  })),
  {
    id: 'leitura-breve',
    rotulo: 'Leitura Breve',
    titulo: 'Leitura Breve',
    referencia: laudes.lectioBrevis.reference,
    texto: laudes.lectioBrevis.reading
  },
  {
    id: 'benedictus',
    rotulo: 'Benedictus',
    titulo: 'Cântico de Zacarias',
    referencia: 'Lc 1, 68-79',
    antifona: laudes.benedictus.ant,
    versos: versos(laudes.benedictus.psalm)
  },
  {
    id: 'preces',
    rotulo: 'Preces',
    titulo: 'Preces',
    resposta: 'R. Senhor, tende piedade de nós.',
    preces: laudes.preces
  },
  { id: 'oracao', rotulo: 'Oração', titulo: 'Oração Conclusiva', texto: laudes.oratio }
];

function lerTamanhoFonte() {
  try {
    const salvo = Number(window.localStorage.getItem(CHAVE_FONTE));
    if (salvo >= FONTE_MIN && salvo <= FONTE_MAX) return salvo;
  } catch {
    // sem localStorage, fica o padrão
  }
  return 17;
}

const preferePoucoMovimento = () => Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);

const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

/* ---------- Página e cabeçalho ---------- */

const Pagina = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 104px 16px 72px;

  @media (min-width: 768px) {
    padding-top: 128px;
  }
`;

const Topo = styled.header`
  text-align: center;
  margin-bottom: 36px;

  &::after {
    content: '';
    display: block;
    width: 44px;
    height: 1px;
    margin: 24px auto 0;
    background: ${({ theme }) => theme.colors.gold};
  }
`;

const Sobretitulo = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 6px;
`;

const Titulo = styled.h1`
  font-size: clamp(2.4rem, 8vw, 3.2rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.titleColor};
  margin-bottom: 14px;
`;

const Subtitulo = styled.p`
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Rubrica: a observação vem em itálico, presa a um filete dourado
const Aviso = styled.p`
  margin-bottom: 28px;
  padding: 2px 0 2px 16px;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};
  font-size: 1.02rem;
  font-style: italic;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textSecondary};

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    text-decoration-color: ${({ theme }) => theme.colors.borderColor};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.titleColor};
    text-decoration-color: currentColor;
  }
`;

/* ---------- Ferramentas e abas ---------- */

const Ferramentas = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Fonte = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    margin-right: 4px;
  }
`;

const BotaoIcone = styled.button`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.titleColor};
  transition: border-color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: currentColor;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const BotaoCompartilhar = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.titleColor};
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: currentColor;
  }
`;

// Faixa de abas sobre um filete; no celular rola de lado sem alargar a página
const Abas = styled.div`
  position: relative;
  display: flex;
  gap: 22px;
  overflow-x: auto;
  margin: 0 -16px;
  padding: 0 16px;
  scroll-margin-top: 88px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    flex-wrap: wrap;
    gap: 0 24px;
    overflow: visible;
    margin: 0;
    padding: 0;
  }
`;

const Aba = styled.button`
  flex: 0 0 auto;
  min-height: 44px;
  padding: 0 2px;
  margin-bottom: -1px;
  border-bottom: 2px solid
    ${({ $ativa, theme }) => ($ativa ? theme.colors.titleColor : 'transparent')};
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $ativa, theme }) =>
    $ativa ? theme.colors.titleColor : theme.colors.textSecondary};
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

/* ---------- A parte da oração ---------- */

const Painel = styled.article`
  padding-top: 36px;

  @media (min-width: 768px) {
    padding-top: 44px;
  }
`;

const CabecalhoParte = styled.header`
  margin-bottom: 26px;

  &::after {
    content: '';
    display: block;
    width: 44px;
    height: 1px;
    margin-top: 16px;
    background: ${({ theme }) => theme.colors.titleColor};
    opacity: 0.4;
  }
`;

const TituloParte = styled.h2`
  font-size: clamp(1.8rem, 6vw, 2.3rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.titleColor};

  span {
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.24em;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Referencia = styled.p`
  margin-top: 6px;
  font-size: 1.05rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Antífona e resposta: itálico, com a rubrica em versalete
const Refrao = styled.p`
  margin-bottom: 20px;
  font-size: ${({ $tamanho }) => $tamanho}px;
  font-style: italic;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.titleColor};

  span {
    font-style: normal;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.accent};
    margin-right: 6px;
  }
`;

const Texto = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ $tamanho }) => $tamanho}px;
  line-height: 1.8;
  hyphens: auto;

  p + p {
    margin-top: 14px;
  }
`;

const Versos = styled.p`
  white-space: pre-line;
`;

// Cada prece com recuo pendente, o travessão fica para fora da margem do texto
const Prece = styled.p`
  padding-left: 1.2em;
  text-indent: -1.2em;
`;

const Passos = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const BotaoPasso = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 3px;
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid
    ${({ $principal, theme }) =>
      $principal ? theme.colors.primary : theme.colors.borderColor};
  background: ${({ $principal, theme }) =>
    $principal ? theme.colors.primary : 'transparent'};
  color: ${({ $principal, theme }) =>
    $principal ? theme.colors.white : theme.colors.titleColor};
  margin-left: ${({ $principal }) => ($principal ? 'auto' : '0')};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ $principal, theme }) =>
      $principal ? theme.colors.primary : theme.colors.titleColor};
  }
`;

const ConteudoParte = ({ parte, numero, tamanho }) => (
  <>
    <CabecalhoParte>
      <TituloParte>
        <span aria-hidden="true">{ROMANOS[numero]}</span>
        {parte.titulo}
      </TituloParte>
      {parte.referencia && <Referencia>{parte.referencia}</Referencia>}
    </CabecalhoParte>
    {parte.antifona && (
      <Refrao $tamanho={tamanho}>
        <span>Ant.</span> {parte.antifona}
      </Refrao>
    )}
    {parte.resposta && <Refrao $tamanho={tamanho}>{parte.resposta}</Refrao>}
    <Texto $tamanho={tamanho}>
      {parte.versos && <Versos>{parte.versos}</Versos>}
      {parte.texto && <p>{parte.texto}</p>}
      {parte.preces && parte.preces.map(prece => <Prece key={prece}>— {prece}</Prece>)}
    </Texto>
  </>
);

const Laudes = () => {
  // Não existe API pública das Laudes em português. O roteiro abaixo é local
  // e alterna salmos e leituras conforme o dia, sem fingir ser o ofício do dia.
  const [hoje] = useState(() => new Date());
  const partes = useMemo(() => montarPartes(generateDynamicLaudes(hoje.getDay(), hoje.getDate())), [hoje]);
  const [abaAtiva, setAbaAtiva] = useState(partes[0].id);
  const [tamanho, setTamanho] = useState(lerTamanhoFonte);
  const [copiado, setCopiado] = useState(false);
  const abasRef = useRef(null);
  const temporizador = useRef(null);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  // Mantém a aba ativa visível na faixa que rola na horizontal
  useEffect(() => {
    const faixa = abasRef.current;
    const ativa = faixa?.querySelector('[aria-selected="true"]');
    if (!faixa || !ativa || faixa.scrollWidth <= faixa.clientWidth) return;
    faixa.scrollTo({
      left: ativa.offsetLeft - (faixa.clientWidth - ativa.offsetWidth) / 2,
      behavior: preferePoucoMovimento() ? 'auto' : 'smooth'
    });
  }, [abaAtiva]);

  const indice = Math.max(0, partes.findIndex(parte => parte.id === abaAtiva));
  const parte = partes[indice];
  const anterior = partes[indice - 1];
  const proxima = partes[indice + 1];

  const mudarFonte = delta => {
    setTamanho(atual => {
      const novo = Math.min(FONTE_MAX, Math.max(FONTE_MIN, atual + delta));
      try {
        window.localStorage.setItem(CHAVE_FONTE, String(novo));
      } catch {
        // ignora
      }
      return novo;
    });
  };

  // Pelos botões do fim do cartão: troca a parte e sobe até as abas se elas saíram da tela
  const irParaParte = id => {
    setAbaAtiva(id);
    const faixa = abasRef.current;
    if (faixa && faixa.getBoundingClientRect().top < 72) {
      faixa.scrollIntoView({ block: 'start', behavior: preferePoucoMovimento() ? 'auto' : 'smooth' });
    }
  };

  const compartilhar = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Laudes - Oração da Manhã', text: 'Reze as Laudes de hoje', url });
      } catch {
        // pessoa cancelou o compartilhamento
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      clearTimeout(temporizador.current);
      temporizador.current = setTimeout(() => setCopiado(false), 2000);
    } catch {
      // sem acesso à área de transferência
    }
  };

  const dataExtenso = hoje.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Pagina>
      <Helmet>
        <title>Laudes - Apenas um Católico</title>
        <meta name="description" content="Reze as Laudes, a oração da manhã da Liturgia das Horas" />
      </Helmet>

      <Topo>
        <Sobretitulo>Liturgia das Horas</Sobretitulo>
        <Titulo>Laudes</Titulo>
        <Subtitulo>
          Oração da manhã · {dataExtenso.charAt(0).toUpperCase() + dataExtenso.slice(1)}
        </Subtitulo>
      </Topo>

      <Aviso>
        Este é um roteiro para rezar as Laudes. Os salmos, a leitura breve e as preces próprios de
        cada dia estão no livro da Liturgia das Horas. As leituras da Missa de hoje ficam na{' '}
        <Link to="/liturgia-diaria">Liturgia Diária</Link>.
      </Aviso>

      <Ferramentas>
        <Fonte>
          <span>Texto</span>
          <BotaoIcone type="button" onClick={() => mudarFonte(-1)} disabled={tamanho <= FONTE_MIN} aria-label="Diminuir texto">
            <FiMinus aria-hidden="true" />
          </BotaoIcone>
          <BotaoIcone type="button" onClick={() => mudarFonte(1)} disabled={tamanho >= FONTE_MAX} aria-label="Aumentar texto">
            <FiPlus aria-hidden="true" />
          </BotaoIcone>
        </Fonte>
        <BotaoCompartilhar type="button" onClick={compartilhar}>
          <FiShare2 aria-hidden="true" /> {copiado ? 'Link copiado' : 'Compartilhar'}
        </BotaoCompartilhar>
      </Ferramentas>

      <Abas ref={abasRef} role="tablist" aria-label="Partes das Laudes">
        {partes.map(item => (
          <Aba
            key={item.id}
            id={`aba-${item.id}`}
            type="button"
            role="tab"
            aria-selected={item.id === parte.id}
            aria-controls="laudes-parte"
            $ativa={item.id === parte.id}
            onClick={() => setAbaAtiva(item.id)}
          >
            {item.rotulo}
          </Aba>
        ))}
      </Abas>

      <Painel id="laudes-parte" role="tabpanel" aria-labelledby={`aba-${parte.id}`}>
        <ConteudoParte parte={parte} numero={indice} tamanho={tamanho} />

        <Passos aria-label="Navegar entre as partes">
          {anterior && (
            <BotaoPasso type="button" onClick={() => irParaParte(anterior.id)} aria-label={`Parte anterior: ${anterior.rotulo}`}>
              <FiChevronLeft aria-hidden="true" /> {anterior.rotulo}
            </BotaoPasso>
          )}
          {proxima && (
            <BotaoPasso
              type="button"
              $principal
              onClick={() => irParaParte(proxima.id)}
              aria-label={`Próxima parte: ${proxima.rotulo}`}
            >
              {proxima.rotulo} <FiChevronRight aria-hidden="true" />
            </BotaoPasso>
          )}
        </Passos>
      </Painel>
    </Pagina>
  );
};

export default Laudes;
