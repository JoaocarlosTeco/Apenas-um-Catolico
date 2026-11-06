import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { PiArrowCounterClockwise } from 'react-icons/pi';

// Novena de nove dias. O progresso fica salvo neste aparelho (localStorage),
// para a pessoa voltar no dia seguinte e continuar de onde parou.
// Cada dia rezado ganha um aro de ouro e um visto. Tudo que se mexe para quando
// o sistema pede menos movimento.

const lerFeitos = chave => {
  try {
    const salvo = JSON.parse(window.localStorage.getItem(chave) || '[]');
    return Array.isArray(salvo)
      ? salvo.filter(n => Number.isInteger(n) && n >= 0 && n < 9)
      : [];
  } catch {
    return [];
  }
};

// Ouro velho do missal
const OURO = '#C9A54C';
const OURO_CLARO = '#D9BB6A';
const OURO_ESCURO = '#9C7C38';

// Comprimentos do aro (raio 15) e do visto, desenhados num quadro de 40
const ARO = 2 * Math.PI * 15;
const VISTO = 19;

const poucoMovimento = () =>
  typeof window !== 'undefined' &&
  Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);

// Números "aleatórios" estáveis: a festa é sempre a mesma
const sorteio = semente => {
  let s = semente;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

// Estrelinhas e cruzes que sobem dos nove dias, da esquerda para a direita
const FAISCAS = (() => {
  const r = sorteio(9);
  return Array.from({ length: 18 }, (_, i) => {
    const tamanho = 7 + Math.round(r() * 5);
    return {
      cruz: i % 4 === 1,
      estilo: {
        left: `${(6 + (i / 17) * 88 + (r() - 0.5) * 6).toFixed(1)}%`,
        top: `calc(50% + 60px + ${Math.round((r() - 0.5) * 24)}px)`,
        width: tamanho,
        height: tamanho,
        marginLeft: -tamanho / 2,
        marginTop: -tamanho / 2,
        color: [OURO, OURO_CLARO, OURO_ESCURO][i % 3],
        animationDelay: `${Math.round(i * 22 + r() * 100)}ms`,
        animationDuration: `${900 + Math.round(r() * 200)}ms`,
        '--dx': `${Math.round((r() - 0.5) * 36)}px`,
        '--dy': `${-Math.round(60 + r() * 60)}px`,
        '--giro': `${Math.round((r() - 0.5) * 240)}deg`,
      },
    };
  });
})();

// Ao voltar com progresso salvo, os nove dias acendem um depois do outro
const acenderDia = keyframes`
  0% {
    opacity: 0.2;
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(201, 165, 76, 0);
  }
  55% {
    opacity: 1;
    transform: scale(1.08);
    box-shadow: 0 0 0 5px rgba(201, 165, 76, 0.35);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 9px rgba(201, 165, 76, 0);
  }
`;

// O número da contagem entra por baixo quando sobe e por cima quando desce
const entrarSubindo = keyframes`
  from { opacity: 0; transform: translateY(0.6em); }
  to { opacity: 1; transform: none; }
`;

const entrarDescendo = keyframes`
  from { opacity: 0; transform: translateY(-0.6em); }
  to { opacity: 1; transform: none; }
`;

const surgir = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
`;

const subir = keyframes`
  0% { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
  18%, 65% { opacity: 1; }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--giro));
  }
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

const Quando = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 18px;
`;

const Progresso = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.titleColor};
`;

const Numero = styled.span`
  display: inline-block;
  min-width: 0.65em;
  text-align: center;
  font-variant-numeric: tabular-nums;

  @media (prefers-reduced-motion: no-preference) {
    ${({ $sentido }) =>
      $sentido !== 0 &&
      css`
        animation: ${$sentido > 0 ? entrarSubindo : entrarDescendo} 0.3s
          ease-out;
      `}
  }
`;

// Região viva: fica vazia e só fala quando a novena se completa
const Mensagem = styled.span`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 600;
  line-height: 1.25;

  > span {
    display: inline-block;
  }

  @media (prefers-reduced-motion: no-preference) {
    > span {
      animation: ${surgir} 0.6s ease-out 0.25s backwards;
    }
  }
`;

// Envolve os dias e a camada da festa
const Fileira = styled.div`
  position: relative;
`;

const Dias = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  row-gap: 8px;
  max-width: 300px;
  margin: 0 auto 20px;

  /* no celular, cinco em cima e quatro embaixo: cada dia com 44px de toque */
  > * {
    grid-column: span 2;
  }

  > :nth-child(6) {
    grid-column: 2 / span 2;
  }

  @media (min-width: 600px) {
    grid-template-columns: repeat(9, minmax(0, 1fr));
    gap: 8px;
    max-width: none;

    > :nth-child(n) {
      grid-column: auto;
    }
  }
`;

const Dia = styled.button`
  position: relative;
  isolation: isolate;
  aspect-ratio: 1;
  width: 100%;
  max-width: 44px;
  justify-self: center;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  border: 2px solid
    ${({ $cor, $aberto, theme }) => ($aberto ? $cor : theme.colors.borderColor)};
  background: transparent;
  color: ${({ $feito, theme }) => ($feito ? '#fff' : theme.colors.text)};

  /* o disco que enche o dia rezado */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 50%;
    background: ${({ $cor }) => $cor};
    transform: scale(${({ $feito }) => ($feito ? 1 : 0)});
  }

  .numero {
    display: inline-block;
    opacity: ${({ $feito }) => ($feito ? 0 : 1)};
    transform: scale(${({ $feito }) => ($feito ? 0.4 : 1)});
  }

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .aro {
    fill: none;
    stroke: ${OURO};
    stroke-width: 1.6;
    stroke-dasharray: ${ARO.toFixed(2)};
    stroke-dashoffset: ${({ $feito }) => ($feito ? 0 : ARO.toFixed(2))};
  }

  .visto {
    fill: none;
    stroke: #fff;
    stroke-width: 2.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: ${VISTO};
    stroke-dashoffset: ${({ $feito }) => ($feito ? 0 : VISTO)};
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      border-color 0.2s ease,
      color 0.2s ease;

    /* ao marcar: o disco enche, o aro de ouro se desenha e depois o visto */
    ${({ $feito }) =>
      $feito
        ? css`
            &::before {
              transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .numero {
              transition:
                opacity 0.15s ease,
                transform 0.2s ease;
            }
            .aro {
              transition: stroke-dashoffset 0.55s ease-out 0.1s;
            }
            .visto {
              transition: stroke-dashoffset 0.3s ease-out 0.35s;
            }
          `
        : css`
            &::before {
              transition: transform 0.25s ease-in;
            }
            .numero {
              transition:
                opacity 0.2s ease 0.1s,
                transform 0.25s ease 0.1s;
            }
            .aro {
              transition: stroke-dashoffset 0.3s ease-in;
            }
            .visto {
              transition: stroke-dashoffset 0.2s ease-in;
            }
          `}

    ${({ $intro }) =>
      $intro &&
      css`
        animation: ${acenderDia} 0.5s cubic-bezier(0.2, 0.7, 0.3, 1)
          calc(var(--ordem) * 40ms) backwards;
        animation-play-state: ${$intro === 'espera' ? 'paused' : 'running'};
      `}
  }
`;

// Camada da festa: decorativa, não ocupa lugar nem recebe toques
const Festa = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: -120px;
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
  animation: ${subir} 1s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const DiaAberto = styled.div`
  small {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.05rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: ${({ $cor }) => $cor};
    margin-bottom: 2px;
  }

  h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    color: ${({ theme }) => theme.colors.titleColor};
    margin-bottom: 10px;
  }

  > p {
    line-height: 1.7;
    margin-bottom: 14px;
  }

  blockquote {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    line-height: 1.75;
    padding: 14px 16px;
    border-left: 3px solid ${({ $cor }) => $cor};
    background: ${({ theme }) => theme.colors.background};
    margin-bottom: 8px;
  }
`;

const Passos = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 18px;
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
  min-height: 46px;
  padding: 0 20px;
  border-radius: 3px;
  font-weight: 700;
  background: ${({ $cor, $leve }) => ($leve ? 'transparent' : $cor)};
  color: ${({ $leve, theme }) => ($leve ? theme.colors.text : '#fff')};
  border: 1px solid
    ${({ $cor, $leve, theme }) => ($leve ? theme.colors.borderColor : $cor)};
`;

const Novena = ({ slug, novena, cor }) => {
  const chave = `novena:${slug}`;
  const [feitos, setFeitos] = useState(() => lerFeitos(chave));
  const primeiroPendente = [...Array(9).keys()].find(i => !feitos.includes(i));
  const [aberto, setAberto] = useState(primeiroPendente ?? 8);
  // direção da última mudança na contagem (0 = ainda não mudou)
  const [sentido, setSentido] = useState(0);
  // cada novena completada aqui conta uma festa nova
  const [festa, setFesta] = useState(0);
  // com progresso salvo, os dias esperam aparecer na tela para acender
  const [intro, setIntro] = useState(() =>
    feitos.length > 0 && !poucoMovimento() ? 'espera' : null
  );
  const fileira = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(feitos));
    } catch {
      // sem localStorage, o progresso vale só nesta visita
    }
  }, [chave, feitos]);

  useEffect(() => {
    if (intro !== 'espera') return undefined;
    const alvo = fileira.current;
    if (!alvo || typeof IntersectionObserver === 'undefined') {
      setIntro('rodando');
      return undefined;
    }
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setIntro('rodando');
          observador.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observador.observe(alvo);
    return () => observador.disconnect();
  }, [intro]);

  const dia = novena.dias[aberto];
  const feito = feitos.includes(aberto);
  const completa = feitos.length === 9;

  const marcar = () => {
    if (feito) {
      setSentido(-1);
      setFeitos(feitos.filter(n => n !== aberto));
      return;
    }
    const novos = [...feitos, aberto].sort((a, b) => a - b);
    setSentido(1);
    setFeitos(novos);
    if (novos.length === 9) setFesta(f => f + 1);
    const proximo = [...Array(9).keys()].find(i => !novos.includes(i));
    if (proximo !== undefined) setAberto(proximo);
  };

  const recomecar = () => {
    setSentido(-1);
    setFesta(0);
    setFeitos([]);
  };

  return (
    <Caixa>
      <Quando>{novena.quando}</Quando>
      <Progresso>
        <span>
          {!completa && (
            <>
              <Numero key={feitos.length} $sentido={sentido}>
                {feitos.length}
              </Numero>{' '}
              de 9 dias rezados
            </>
          )}
          <Mensagem aria-live="polite">
            {completa && (
              <span key={festa}>Novena completa! Nove dias de oração.</span>
            )}
          </Mensagem>
        </span>
        {feitos.length > 0 && (
          <Botao
            type="button"
            $leve
            $cor={cor}
            style={{ minHeight: 44, padding: '0 12px', fontSize: '0.8rem' }}
            onClick={recomecar}
          >
            <PiArrowCounterClockwise aria-hidden="true" /> Recomeçar
          </Botao>
        )}
      </Progresso>

      <Fileira ref={fileira}>
        <Dias role="group" aria-label="Dias da novena">
          {novena.dias.map((d, i) => (
            <Dia
              key={d.tema}
              type="button"
              $cor={cor}
              $feito={feitos.includes(i)}
              $aberto={i === aberto}
              $intro={intro}
              style={{ '--ordem': i }}
              aria-pressed={i === aberto}
              aria-label={`Dia ${i + 1}: ${d.tema}${feitos.includes(i) ? ', rezado' : ''}`}
              onClick={() => setAberto(i)}
            >
              <span className="numero">{i + 1}</span>
              <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
                <circle
                  className="aro"
                  cx="20"
                  cy="20"
                  r="15"
                  transform="rotate(-90 20 20)"
                />
                <path className="visto" d="M13.5 20.5l4.5 4.5 8.5-9" />
              </svg>
            </Dia>
          ))}
        </Dias>
        {festa > 0 && (
          <Festa key={festa} aria-hidden="true">
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
      </Fileira>

      <DiaAberto $cor={cor} aria-live="polite">
        <small>{`${aberto + 1}º dia`}</small>
        <h3>{dia.tema}</h3>
        <p>{dia.reflexao}</p>
        <blockquote>{novena.oracao}</blockquote>
        <Passos>Depois, reze um Pai-Nosso, uma Ave-Maria e um Glória.</Passos>
        <Botoes>
          <Botao type="button" $cor={cor} $leve={feito} onClick={marcar}>
            {feito ? 'Desmarcar este dia' : `Rezei o ${aberto + 1}º dia`}
          </Botao>
        </Botoes>
      </DiaAberto>
    </Caixa>
  );
};

export default Novena;
