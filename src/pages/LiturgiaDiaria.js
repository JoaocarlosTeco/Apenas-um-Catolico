import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiShare2,
} from 'react-icons/fi';
import {
  buscarLiturgia,
  chaveDaData,
  corLiturgica,
  dataDaChave,
  separarVersiculos,
} from '../services/liturgia';
import { tempoLiturgico, TEMPOS } from '../services/anoLiturgico';

// Tempo, ciclo dos domingos (A, B, C) e ciclo dos dias de semana (I, II) da data aberta
const Ciclos = styled.p`
  margin-top: 8px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CHAVE_FONTE = 'tamanhoFonte';

// No tema escuro a cor litúrgica clareia quando vira cor de texto
const tom = (theme, cor) =>
  theme.modo === 'escuro' ? `color-mix(in srgb, ${cor} 55%, white)` : cor;
const FONTE_MIN = 15;
const FONTE_MAX = 26;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 104px 16px 72px;

  @media (min-width: 768px) {
    padding-top: 128px;
  }
`;

const Topo = styled.header`
  text-align: center;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const NavegaData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: 14px;
`;

const BotaoData = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 40px;
  padding: 0 10px;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.titleColor};
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`;

const DataExtenso = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
`;

const Titulo = styled.h1`
  color: ${({ theme }) => theme.colors.titleColor};
  font-size: clamp(1.9rem, 7vw, 2.7rem);
  line-height: 1.12;
  margin-bottom: 12px;
`;

const Cor = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $cor }) => $cor};
  }
`;

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
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const BotaoIcone = styled.button`
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.text};

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`;

const BotaoCompartilhar = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.titleColor};
  font-size: 0.88rem;
  font-weight: 600;

  &:hover {
    border-color: currentColor;
  }
`;

const Abas = styled.div`
  display: flex;
  gap: 22px;
  overflow-x: auto;
  margin-bottom: 26px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Aba = styled.button`
  flex: 0 0 auto;
  padding: 12px 0;
  margin-bottom: -1px;
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $ativa, theme }) =>
    $ativa ? theme.colors.titleColor : theme.colors.textSecondary};
  border-bottom: 2px solid
    ${({ $ativa, $cor }) => ($ativa ? $cor : 'transparent')};
`;

const Cartao = styled.article`
  padding: 4px 0 8px;
`;

const Referencia = styled.p`
  color: ${({ theme, $cor }) => tom(theme, $cor)};
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
`;

const TituloLeitura = styled.h2`
  color: ${({ theme }) => theme.colors.titleColor};
  font-size: clamp(1.45rem, 5vw, 1.8rem);
  line-height: 1.25;
  margin-bottom: 22px;
`;

const Opcoes = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Opcao = styled.button`
  min-height: 34px;
  padding: 0 4px;
  font-size: 0.85rem;
  border-bottom: 2px solid
    ${({ $ativa, $cor }) => ($ativa ? $cor : 'transparent')};
  color: ${({ $ativa, theme }) =>
    $ativa ? theme.colors.titleColor : theme.colors.textSecondary};
`;

const Texto = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ $tamanho }) => $tamanho}px;
  line-height: 1.8;

  p + p {
    margin-top: 12px;
  }

  sup {
    color: ${({ theme, $cor }) => tom(theme, $cor)};
    font-size: 0.65em;
    font-weight: 700;
    margin-right: 2px;
  }
`;

const Refrao = styled.p`
  font-style: italic;
  font-size: 1.15em;
  color: ${({ theme }) => theme.colors.titleColor};
  padding-left: 16px;
  margin-bottom: 18px;
  border-left: 2px solid ${({ $cor }) => $cor};
`;

const BlocoOracao = styled.section`
  & + & {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  }

  h3 {
    color: ${({ theme, $cor }) => tom(theme, $cor)};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.15rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
  }
`;

const Esqueleto = styled.div`
  height: ${({ $altura }) => $altura}px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.borderColor};
  opacity: 0.6;
  margin-bottom: 12px;
`;

const Erro = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: ${({ theme }) => theme.colors.text};

  button {
    margin-top: 16px;
    min-height: 40px;
    padding: 0 20px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-weight: 600;
  }
`;

const Credito = styled.p`
  margin-top: 24px;
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

function lerTamanhoFonte() {
  try {
    const salvo = Number(window.localStorage.getItem(CHAVE_FONTE));
    if (salvo >= FONTE_MIN && salvo <= FONTE_MAX) return salvo;
  } catch {
    // sem localStorage, fica o padrão
  }
  return 19;
}

const TextoComVersiculos = ({ texto }) =>
  texto
    .split('\n')
    .map((paragrafo, i) =>
      paragrafo.trim() ? (
        <p key={i}>
          {separarVersiculos(paragrafo).map((parte, j) =>
            parte.versiculo ? (
              <sup key={j}>{parte.texto}</sup>
            ) : (
              <React.Fragment key={j}>{parte.texto}</React.Fragment>
            )
          )}
        </p>
      ) : null
    );

const Leitura = ({ itens, cor, tamanho, rotuloPadrao }) => {
  const [escolhida, setEscolhida] = useState(0);
  const item = itens[Math.min(escolhida, itens.length - 1)];

  return (
    <>
      {itens.length > 1 && (
        <Opcoes role="group" aria-label="Leituras à escolha">
          {itens.map((_, i) => (
            <Opcao
              key={i}
              type="button"
              $cor={cor}
              $ativa={i === escolhida}
              onClick={() => setEscolhida(i)}
            >
              Opção {i + 1}
            </Opcao>
          ))}
        </Opcoes>
      )}
      {item.referencia && <Referencia $cor={cor}>{item.referencia}</Referencia>}
      <TituloLeitura>{item.titulo || rotuloPadrao}</TituloLeitura>
      {item.refrao && <Refrao $cor={cor}>R. {item.refrao}</Refrao>}
      <Texto $cor={cor} $tamanho={tamanho}>
        <TextoComVersiculos texto={item.texto} />
      </Texto>
    </>
  );
};

const Oracoes = ({ liturgia, cor, tamanho }) => {
  const blocos = [
    ['Antífona de entrada', liturgia.antifonas.entrada],
    ['Oração do dia', liturgia.oracoes.coleta],
    ['Sobre as oferendas', liturgia.oracoes.oferendas],
    ['Antífona da comunhão', liturgia.antifonas.comunhao],
    ['Depois da comunhão', liturgia.oracoes.comunhao],
  ].filter(([, texto]) => texto);

  return blocos.map(([titulo, texto]) => (
    <BlocoOracao key={titulo} $cor={cor}>
      <h3>{titulo}</h3>
      <Texto $cor={cor} $tamanho={tamanho}>
        <p>{texto}</p>
      </Texto>
    </BlocoOracao>
  ));
};

const LiturgiaDiaria = () => {
  const [params, setParams] = useSearchParams();
  const hoje = chaveDaData(new Date());
  const chave = /^\d{4}-\d{2}-\d{2}$/.test(params.get('data') || '')
    ? params.get('data')
    : hoje;

  const [liturgia, setLiturgia] = useState(null);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  // ?aba=evangelho abre direto na aba pedida (a home usa isso)
  const [abaAtiva, setAbaAtiva] = useState(
    () => params.get('aba') || 'primeira'
  );
  const [tamanho, setTamanho] = useState(lerTamanhoFonte);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const controle = new AbortController();
    setLiturgia(null);
    setErro(false);
    buscarLiturgia(dataDaChave(chave), { signal: controle.signal })
      .then(dados => {
        setLiturgia(dados);
        setAbaAtiva(atual =>
          atual === 'segunda' && !dados.leituras.segunda.length
            ? 'evangelho'
            : atual
        );
      })
      .catch(() => {
        if (!controle.signal.aborted) setErro(true);
      });
    return () => controle.abort();
  }, [chave, tentativa]);

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

  const irPara = useCallback(
    deslocamento => {
      const data = dataDaChave(chave);
      data.setDate(data.getDate() + deslocamento);
      const nova = chaveDaData(data);
      setParams(nova === hoje ? {} : { data: nova });
    },
    [chave, hoje, setParams]
  );

  const compartilhar = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: liturgia?.titulo || 'Liturgia Diária',
          url,
        });
      } catch {
        // pessoa cancelou o compartilhamento
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // sem acesso à área de transferência
    }
  };

  const cor = corLiturgica(liturgia?.cor);
  const dataExtenso = dataDaChave(chave).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const abas = useMemo(() => {
    if (!liturgia) return [];
    const { leituras } = liturgia;
    return [
      {
        id: 'primeira',
        rotulo: '1ª Leitura',
        itens: leituras.primeira,
        padrao: 'Primeira Leitura',
      },
      {
        id: 'salmo',
        rotulo: 'Salmo',
        itens: leituras.salmo,
        padrao: 'Salmo Responsorial',
      },
      {
        id: 'segunda',
        rotulo: '2ª Leitura',
        itens: leituras.segunda,
        padrao: 'Segunda Leitura',
      },
      {
        id: 'evangelho',
        rotulo: 'Evangelho',
        itens: leituras.evangelho,
        padrao: 'Evangelho',
      },
      { id: 'oracoes', rotulo: 'Orações', itens: [] },
    ].filter(aba => aba.id === 'oracoes' || aba.itens.length);
  }, [liturgia]);

  const aba = abas.find(a => a.id === abaAtiva) || abas[0];

  return (
    <Container>
      <Helmet>
        <title>
          {liturgia
            ? `${liturgia.titulo} - Liturgia Diária`
            : 'Liturgia Diária'}{' '}
          - Apenas um Católico
        </title>
        <meta
          name="description"
          content="Leituras, salmo, evangelho e orações da Missa de cada dia."
        />
      </Helmet>

      <Topo>
        <NavegaData>
          <BotaoData
            type="button"
            $cor={cor.hex}
            onClick={() => irPara(-1)}
            aria-label="Dia anterior"
          >
            <FiChevronLeft /> Anterior
          </BotaoData>
          <BotaoData
            type="button"
            $cor={cor.hex}
            onClick={() => setParams({})}
            disabled={chave === hoje}
          >
            Hoje
          </BotaoData>
          <BotaoData
            type="button"
            $cor={cor.hex}
            onClick={() => irPara(1)}
            aria-label="Próximo dia"
          >
            Próximo <FiChevronRight />
          </BotaoData>
        </NavegaData>
        <DataExtenso>
          {dataExtenso.charAt(0).toUpperCase() + dataExtenso.slice(1)}
        </DataExtenso>
        <Titulo>{liturgia ? liturgia.titulo : 'Liturgia Diária'}</Titulo>
        {liturgia?.cor && <Cor $cor={cor.hex}>Cor litúrgica: {cor.nome}</Cor>}
        {(() => {
          const t = tempoLiturgico(dataDaChave(chave));
          return (
            <Ciclos>
              {TEMPOS[t.tempo].nome} · Domingos: ano {t.ciclo} · Dias de semana:
              ano {t.ferial}
            </Ciclos>
          );
        })()}
      </Topo>

      {erro && (
        <Erro role="alert">
          <p>
            Não foi possível carregar a liturgia agora. Confira sua conexão e
            tente de novo.
          </p>
          <button type="button" onClick={() => setTentativa(t => t + 1)}>
            Tentar de novo
          </button>
        </Erro>
      )}

      {!erro && !liturgia && (
        <div aria-busy="true" aria-label="Carregando a liturgia">
          <Esqueleto $altura={40} />
          <Esqueleto $altura={320} />
        </div>
      )}

      {liturgia && aba && (
        <>
          <Ferramentas>
            <Fonte>
              <span>Texto</span>
              <BotaoIcone
                type="button"
                onClick={() => mudarFonte(-1)}
                disabled={tamanho <= FONTE_MIN}
                aria-label="Diminuir texto"
              >
                <FiMinus />
              </BotaoIcone>
              <BotaoIcone
                type="button"
                onClick={() => mudarFonte(1)}
                disabled={tamanho >= FONTE_MAX}
                aria-label="Aumentar texto"
              >
                <FiPlus />
              </BotaoIcone>
            </Fonte>
            <BotaoCompartilhar
              type="button"
              $cor={cor.hex}
              onClick={compartilhar}
            >
              <FiShare2 /> {copiado ? 'Link copiado' : 'Compartilhar'}
            </BotaoCompartilhar>
          </Ferramentas>

          <Abas role="tablist" aria-label="Partes da liturgia">
            {abas.map(item => (
              <Aba
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === aba.id}
                $ativa={item.id === aba.id}
                $cor={cor.hex}
                onClick={() => setAbaAtiva(item.id)}
              >
                {item.rotulo}
              </Aba>
            ))}
          </Abas>

          <Cartao $cor={cor.hex} role="tabpanel">
            {aba.id === 'oracoes' ? (
              <Oracoes liturgia={liturgia} cor={cor.hex} tamanho={tamanho} />
            ) : (
              <Leitura
                key={`${chave}-${aba.id}`}
                itens={aba.itens}
                cor={cor.hex}
                tamanho={tamanho}
                rotuloPadrao={aba.padrao}
              />
            )}
          </Cartao>

          <Credito>
            Textos da liturgia:{' '}
            <a
              href="https://github.com/Dancrf/liturgia-diaria"
              target="_blank"
              rel="noopener noreferrer"
            >
              API liturgia-diaria
            </a>
          </Credito>
        </>
      )}
    </Container>
  );
};

export default LiturgiaDiaria;
