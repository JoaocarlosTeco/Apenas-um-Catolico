import React, { useId, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PiArrowCounterClockwise, PiArrowRight } from 'react-icons/pi';

// Terço interativo: mostra os mistérios do dia e conta as Ave-Marias de cada dezena.
// Distribuição dos mistérios pela semana como na carta Rosarium Virginis Mariae (2002).
// As contas rezadas acendem em ouro. Tudo que se mexe (e a vibração) para quando
// o sistema pede menos movimento.

const MISTERIOS = {
  gozosos: {
    nome: 'Gozosos',
    lista: [
      'A Anunciação do anjo a Maria',
      'A visita de Maria a Isabel',
      'O nascimento de Jesus em Belém',
      'A apresentação de Jesus no Templo',
      'Jesus encontrado no Templo',
    ],
  },
  luminosos: {
    nome: 'Luminosos',
    lista: [
      'O Batismo de Jesus no Jordão',
      'As bodas de Caná',
      'O anúncio do Reino de Deus',
      'A Transfiguração',
      'A instituição da Eucaristia',
    ],
  },
  dolorosos: {
    nome: 'Dolorosos',
    lista: [
      'A agonia de Jesus no Horto',
      'A flagelação',
      'A coroação de espinhos',
      'Jesus carrega a cruz',
      'A crucifixão e morte de Jesus',
    ],
  },
  gloriosos: {
    nome: 'Gloriosos',
    lista: [
      'A Ressurreição de Jesus',
      'A Ascensão de Jesus ao Céu',
      'A vinda do Espírito Santo',
      'A Assunção de Maria',
      'A coroação de Maria no Céu',
    ],
  },
};

// domingo = 0
const DO_DIA = [
  'gloriosos',
  'gozosos',
  'dolorosos',
  'gloriosos',
  'luminosos',
  'dolorosos',
  'gozosos',
];
const DIAS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];

// Ouro velho do missal
const OURO = '#C9A54C';
const OURO_CLARO = '#D9BB6A';
const OURO_ESCURO = '#9C7C38';

// Comprimento do fio (raio 84) e do rastro de luz que corre a dezena completa
const FIO = 2 * Math.PI * 84;
const RASTRO = 70;

const poucoMovimento = () =>
  typeof window !== 'undefined' &&
  Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);

// Vibração discreta no celular, só quando o sistema não pede menos movimento
const vibrar = padrao => {
  if (
    typeof navigator === 'undefined' ||
    typeof navigator.vibrate !== 'function' ||
    poucoMovimento()
  )
    return;
  try {
    navigator.vibrate(padrao);
  } catch {
    // sem permissão para vibrar, o terço segue normalmente
  }
};

// Números "aleatórios" estáveis: a festa é sempre a mesma
const sorteio = semente => {
  let s = semente;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

// Estrelinhas e cruzes que sobem do terço concluído, em leque para cima
const FAISCAS = (() => {
  const r = sorteio(11);
  return Array.from({ length: 16 }, (_, i) => {
    const angulo =
      -Math.PI / 2 + (i / 15 - 0.5) * Math.PI * 1.1 + (r() - 0.5) * 0.3;
    const distancia = 45 + r() * 45;
    const tamanho = 7 + Math.round(r() * 5);
    return {
      cruz: i % 4 === 1,
      estilo: {
        left: `calc(50% + ${Math.round((r() - 0.5) * 32)}px)`,
        top: `calc(50% + 32px + ${Math.round((r() - 0.5) * 24)}px)`,
        width: tamanho,
        height: tamanho,
        marginLeft: -tamanho / 2,
        marginTop: -tamanho / 2,
        color: [OURO, OURO_CLARO, OURO_ESCURO][i % 3],
        animationDelay: `${Math.round(r() * 300)}ms`,
        animationDuration: `${1000 + Math.round(r() * 200)}ms`,
        '--dx': `${Math.round(Math.cos(angulo) * distancia)}px`,
        '--dy': `${Math.round(Math.sin(angulo) * distancia - 45 - r() * 30)}px`,
        '--giro': `${Math.round((r() - 0.5) * 240)}deg`,
      },
    };
  });
})();

// A conta recém-rezada cresce um pouco e assenta
const acender = keyframes`
  0% { transform: scale(1); }
  45% { transform: scale(1.22); }
  100% { transform: scale(1); }
`;

// A conta da vez respira devagar...
const respirar = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
`;

// ...e solta um anel de luz que se desfaz
const pulsar = keyframes`
  0% { opacity: 0.7; transform: scale(1); }
  75%, 100% { opacity: 0; transform: scale(2); }
`;

// Dezena completa: cada conta cintila quando o brilho passa por ela
const cintilar = keyframes`
  0%, 100% { transform: scale(1); }
  35% { transform: scale(1.25); }
`;

// O brilho corre o fio uma vez, começando no alto
const correr = keyframes`
  0% { stroke-dashoffset: ${(-FIO * 0.75).toFixed(1)}px; opacity: 0; }
  15%, 80% { opacity: 1; }
  100% { stroke-dashoffset: ${(-FIO * 1.75).toFixed(1)}px; opacity: 0; }
`;

// Uma auréola suave envolve o terço
const aureola = keyframes`
  0% { opacity: 0; transform: scale(0.94); }
  40% { opacity: 0.3; }
  100% { opacity: 0; transform: scale(1.05); }
`;

const subir = keyframes`
  0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
  18%, 65% { opacity: 1; }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--giro));
  }
`;

const surgir = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
`;

const Caixa = styled.div`
  border-radius: 4px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    padding: 28px;
  }
`;

const Grupos = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 20px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Grupo = styled.button`
  flex: 0 0 auto;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid
    ${({ $ativo, $cor, theme }) => ($ativo ? $cor : theme.colors.borderColor)};
  background: ${({ $ativo, $cor }) => ($ativo ? $cor : 'transparent')};
  color: ${({ $ativo, theme }) => ($ativo ? '#fff' : theme.colors.text)};
`;

const Corpo = styled.div`
  display: grid;
  gap: 24px;
  align-items: center;

  @media (min-width: 640px) {
    grid-template-columns: 220px 1fr;
  }
`;

// O anel e a camada da festa ficam juntos, para as estrelinhas saírem do terço
const MolduraAnel = styled.div`
  position: relative;
`;

const Anel = styled.svg`
  width: 100%;
  max-width: 220px;
  margin: 0 auto;
  display: block;

  .conta,
  .conta circle,
  .aureola {
    transform-box: fill-box;
    transform-origin: center;
  }

  .contorno {
    fill: none;
    stroke: ${({ $cor }) => $cor};
    stroke-width: 2.5;
  }

  .ouro {
    opacity: 0;
    transform: scale(0.5);
  }

  .halo {
    fill: none;
    stroke: ${OURO};
    stroke-width: 2;
    opacity: 0;
  }

  /* conta rezada: acesa em ouro */
  .conta[data-acesa='true'] .ouro {
    opacity: 1;
    transform: scale(1);
  }

  .conta[data-acesa='true'] .contorno {
    stroke: ${OURO_ESCURO};
  }

  /* conta da vez: sem movimento, fica um anel fixo em volta */
  .conta[data-atual='true'] .halo {
    opacity: 0.55;
    transform: scale(1.5);
  }

  @media (prefers-reduced-motion: no-preference) {
    .ouro {
      transition:
        opacity 0.35s ease,
        transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .contorno {
      transition: stroke 0.35s ease;
    }

    .conta[data-acesa='true'] {
      animation: ${acender} 0.45s ease-out;
    }

    .conta[data-atual='true'] .contorno {
      animation: ${respirar} 1.8s ease-in-out infinite;
    }

    .conta[data-atual='true'] .halo {
      animation: ${pulsar} 1.8s ease-out infinite;
    }

    [data-dezena='true'] .conta[data-acesa='true'] .ouro {
      animation: ${cintilar} 0.36s ease-out calc(var(--ordem) * 72ms);
    }

    .varredura {
      animation: ${correr} 0.8s ease-in-out forwards;
    }

    .aureola {
      animation: ${aureola} 0.8s ease-out forwards;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .brilho {
      display: none;
    }
  }
`;

// Camada da festa: decorativa, não ocupa lugar nem recebe toques
const Festa = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: -64px;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Faisca = styled.span`
  position: absolute;
  display: block;
  opacity: 0;
  animation: ${subir} 1.2s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Mensagem = styled.span`
  display: block;
  margin-bottom: 4px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.titleColor};

  @media (prefers-reduced-motion: no-preference) {
    animation: ${surgir} 0.6s ease-out 0.3s backwards;
  }
`;

const Lista = styled.ol`
  list-style: none;
  display: grid;
  gap: 6px;
  margin-bottom: 18px;

  li {
    display: flex;
    gap: 10px;
    align-items: baseline;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  li[data-atual='true'] {
    color: ${({ theme }) => theme.colors.titleColor};
    font-weight: 700;
  }

  li[data-feito='true'] {
    text-decoration: line-through;
    opacity: 0.6;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 18px;
  }
`;

const Orientacao = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 14px;
  min-height: 2.9em;
`;

const Botoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Botao = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 3px;
  font-weight: 700;
  font-size: 1rem;
  background: ${({ $cor, $leve }) => ($leve ? 'transparent' : $cor)};
  color: ${({ $leve, theme }) => ($leve ? theme.colors.text : '#fff')};
  border: 1px solid
    ${({ $cor, $leve, theme }) => ($leve ? theme.colors.borderColor : $cor)};
`;

// Uma conta: o anel da vez (atrás), o ouro que acende e o contorno
const Conta = ({ x, y, r, ordem, acesa, atual = false, ouro }) => (
  <g
    className="conta"
    data-acesa={acesa}
    data-atual={atual}
    style={{ '--ordem': ordem }}
  >
    <circle className="halo" cx={x} cy={y} r={r} />
    <circle className="ouro" cx={x} cy={y} r={r} fill={ouro} />
    <circle className="contorno" cx={x} cy={y} r={r} />
  </g>
);

const Terco = ({ cor, brilho }) => {
  const hoje = new Date().getDay();
  const [grupo, setGrupo] = useState(DO_DIA[hoje]);
  const [misterio, setMisterio] = useState(0);
  const [contas, setContas] = useState(0);
  const terminou = misterio === 5;
  // id do degradê de ouro, único mesmo com dois terços na página
  const idOuro = `terco-ouro-${useId().replace(/:/g, '')}`;

  const recomecar = (novoGrupo = grupo) => {
    setGrupo(novoGrupo);
    setMisterio(0);
    setContas(0);
  };

  const rezar = () => {
    if (contas < 10) {
      // forma de função: toques muito rápidos não se perdem
      setContas(c => Math.min(10, c + 1));
      vibrar(12);
    }
  };

  const proximo = () => {
    setMisterio(misterio + 1);
    setContas(0);
    // fim da dezena, depois do Glória: vibração um pouco mais longa
    vibrar([15, 60, 15]);
  };

  const dados = MISTERIOS[grupo];
  const contasAnel = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + ((i + 1) / 11) * Math.PI * 2;
    return { x: 110 + Math.cos(a) * 84, y: 110 + Math.sin(a) * 84 };
  });

  let orientacao;
  if (terminou)
    orientacao = (
      <>
        <Mensagem>
          Terço concluído. Que Nossa Senhora interceda por você.
        </Mensagem>{' '}
        Termine com a Salve-Rainha e entregue a ela as suas intenções.
      </>
    );
  else if (contas === 0)
    orientacao = `${misterio + 1}º mistério: ${dados.lista[misterio]}. Reze um Pai-Nosso e comece as Ave-Marias.`;
  else if (contas < 10)
    orientacao = `${dados.lista[misterio]}. Ave-Maria ${contas} de 10.`;
  else
    orientacao =
      'Dezena completa. Reze o Glória ao Pai e siga para o próximo mistério.';

  return (
    <Caixa>
      <Grupos role="group" aria-label="Mistérios">
        {Object.entries(MISTERIOS).map(([id, m]) => (
          <Grupo
            key={id}
            type="button"
            $cor={cor}
            $ativo={id === grupo}
            aria-pressed={id === grupo}
            onClick={() => recomecar(id)}
          >
            {m.nome}
            {id === DO_DIA[hoje] ? ' (hoje)' : ''}
          </Grupo>
        ))}
      </Grupos>

      <Corpo>
        <MolduraAnel>
          <Anel viewBox="0 0 220 220" aria-hidden="true" $cor={cor}>
            <defs>
              <radialGradient id={idOuro} cx="38%" cy="34%" r="70%">
                <stop offset="0%" stopColor={OURO_CLARO} />
                <stop offset="60%" stopColor={OURO} />
                <stop offset="100%" stopColor={OURO_ESCURO} />
              </radialGradient>
            </defs>
            <circle
              cx="110"
              cy="110"
              r="84"
              fill="none"
              stroke={brilho}
              strokeWidth="1.5"
              opacity="0.6"
            />
            {/* dezena completa (ou terço concluído): auréola e brilho correndo o fio */}
            {(contas === 10 || terminou) && (
              <g
                className="brilho"
                key={terminou ? 'fim' : `dezena-${misterio}`}
              >
                <circle
                  className="aureola"
                  cx="110"
                  cy="110"
                  r="84"
                  fill="none"
                  stroke={OURO}
                  strokeWidth="18"
                  opacity="0"
                />
                <circle
                  className="varredura"
                  cx="110"
                  cy="110"
                  r="84"
                  fill="none"
                  stroke={OURO_CLARO}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${RASTRO} ${FIO - RASTRO}`}
                  opacity="0"
                />
              </g>
            )}
            <g data-dezena={contas === 10 || terminou}>
              <Conta
                x={110}
                y={26}
                r={11}
                ordem={0}
                acesa={contas > 0 || terminou}
                ouro={`url(#${idOuro})`}
              />
              {contasAnel.map((p, i) => (
                <Conta
                  key={i}
                  x={p.x}
                  y={p.y}
                  r={8.5}
                  ordem={i + 1}
                  acesa={i < contas || terminou}
                  atual={!terminou && i === contas}
                  ouro={`url(#${idOuro})`}
                />
              ))}
            </g>
            <text
              x="110"
              y="104"
              textAnchor="middle"
              fontSize="34"
              fontWeight="700"
              fill={cor}
              fontFamily="'Cormorant Garamond', Georgia, serif"
            >
              {terminou ? '5/5' : `${misterio + 1}º`}
            </text>
            <text
              x="110"
              y="128"
              textAnchor="middle"
              fontSize="13"
              fill={cor}
              fontFamily="Inter, sans-serif"
            >
              {terminou ? 'mistérios' : 'mistério'}
            </text>
            <path
              d="M110 194 V218 M101 203 H119"
              stroke={brilho}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </Anel>
          {terminou && (
            <Festa aria-hidden="true">
              {FAISCAS.map((f, i) => (
                <Faisca key={i} style={f.estilo}>
                  <svg viewBox="0 0 10 10" focusable="false">
                    {f.cruz ? (
                      <path
                        d="M5 .6v8.8M1.9 3.6h6.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="M5 0C5.4 3.6 6.4 4.6 10 5 6.4 5.4 5.4 6.4 5 10 4.6 6.4 3.6 5.4 0 5 3.6 4.6 4.6 3.6 5 0Z"
                        fill="currentColor"
                      />
                    )}
                  </svg>
                </Faisca>
              ))}
            </Festa>
          )}
        </MolduraAnel>

        <div>
          <Lista>
            {dados.lista.map((nome, i) => (
              <li
                key={nome}
                data-atual={i === misterio}
                data-feito={i < misterio}
              >
                <span>{i + 1}º</span>
                {nome}
              </li>
            ))}
          </Lista>
          <Orientacao aria-live="polite">{orientacao}</Orientacao>
          <Botoes>
            {!terminou && contas < 10 && (
              <Botao type="button" $cor={cor} onClick={rezar}>
                Rezei uma Ave-Maria
              </Botao>
            )}
            {!terminou && contas === 10 && (
              <Botao type="button" $cor={cor} onClick={proximo}>
                {misterio === 4 ? 'Concluir o terço' : 'Próximo mistério'}{' '}
                <PiArrowRight aria-hidden="true" />
              </Botao>
            )}
            {(misterio > 0 || contas > 0) && (
              <Botao type="button" $cor={cor} $leve onClick={() => recomecar()}>
                <PiArrowCounterClockwise aria-hidden="true" /> Recomeçar
              </Botao>
            )}
          </Botoes>
        </div>
      </Corpo>
      <Orientacao
        as="small"
        style={{ display: 'block', marginTop: 16, minHeight: 0 }}
      >
        Hoje é {DIAS[hoje]}: a Igreja sugere os mistérios{' '}
        {MISTERIOS[DO_DIA[hoje]].nome.toLowerCase()}.
      </Orientacao>
    </Caixa>
  );
};

export default Terco;
