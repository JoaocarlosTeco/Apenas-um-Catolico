import React, { useEffect, useId, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Acender uma vela por uma intenção, como na igreja. A vela fica acesa por 24 horas,
// com a chama tremulando e a fumaça subindo, e depois se apaga sozinha.
// A intenção fica só neste aparelho (localStorage); nada é enviado.

const CHAVE = 'vela-intencao';
const DURACAO_MS = 24 * 60 * 60 * 1000;
const LIMITE = 140;

function lerVela() {
  try {
    const salva = JSON.parse(window.localStorage.getItem(CHAVE) || 'null');
    if (salva && Date.now() - salva.acesaEm < DURACAO_MS) return salva;
  } catch {
    // sem localStorage ou dado estragado: começa apagada
  }
  return null;
}

const tremular = keyframes`
  0%, 100% { transform: scale(1, 1) skewX(0deg); }
  25% { transform: scale(0.92, 1.08) skewX(-3deg); }
  50% { transform: scale(1.04, 0.95) skewX(2deg); }
  75% { transform: scale(0.96, 1.05) skewX(-1deg); }
`;

const acender = keyframes`
  from { transform: scale(0.1, 0.1); opacity: 0; }
  to { transform: scale(1, 1); opacity: 1; }
`;

const pulsar = keyframes`
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50% { opacity: 0.75; transform: scale(1.1); }
`;

const subir = keyframes`
  0% { opacity: 0; transform: translateY(10px) scaleX(0.6); }
  25% { opacity: 0.4; }
  100% { opacity: 0; transform: translateY(-24px) scaleX(1.3); }
`;

const Caixa = styled.section`
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 20px;
  align-items: center;
  padding: 22px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.cardBackground};

  @media (min-width: 640px) {
    grid-template-columns: 120px minmax(0, 1fr);
    gap: 28px;
    padding: 28px 32px;
  }

  h2 {
    font-size: clamp(1.5rem, 5vw, 1.9rem);
    line-height: 1.15;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  p {
    margin-top: 6px;
    font-size: 1.04rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  small {
    display: block;
    margin-top: 10px;
    font-size: 0.9rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Vela = styled.div`
  position: relative;
  justify-self: center;
  width: 70px;
  height: 150px;

  .brilho {
    position: absolute;
    left: 50%;
    top: -10px;
    width: 150px;
    height: 150px;
    margin-left: -75px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(244, 192, 86, 0.38) 0%,
      transparent 65%
    );
    animation: ${pulsar} 3.2s ease-in-out infinite;
  }

  .chama {
    transform-box: fill-box;
    transform-origin: 50% 95%;
    animation:
      ${acender} 0.7s ease-out,
      ${tremular} 1.5s ease-in-out 0.7s infinite;
  }

  .fumaca path {
    fill: none;
    stroke: ${({ theme }) => theme.colors.textSecondary};
    stroke-width: 1.2;
    stroke-linecap: round;
    opacity: 0;
    animation: ${subir} 5s ease-out infinite;
  }

  .fumaca path:nth-child(2) {
    animation-delay: 2.5s;
  }

  ${({ $acesa }) =>
    !$acesa &&
    css`
      .brilho {
        display: none;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    .brilho,
    .chama,
    .fumaca path {
      animation: none;
    }
  }
`;

const Formulario = styled.form`
  margin-top: 14px;
  display: grid;
  gap: 10px;

  label {
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  textarea {
    width: 100%;
    min-height: 72px;
    padding: 10px 12px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.04rem;
    resize: vertical;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.accent};
      outline-offset: 1px;
    }
  }
`;

const Botao = styled.button`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.92rem;
  ${({ $leve, theme }) =>
    $leve
      ? css`
          border: 1px solid ${theme.colors.borderColor};
          color: ${theme.colors.titleColor};
        `
      : css`
          background: ${theme.colors.primary};
          color: #fff;
        `}
`;

const Intencao = styled.blockquote`
  margin-top: 10px;
  padding-left: 12px;
  border-left: 2px solid ${({ theme }) => theme.colors.gold};
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  overflow-wrap: anywhere;
`;

function tempoDesde(ms) {
  const horas = Math.floor(ms / 3600000);
  if (horas < 1) return 'acesa há menos de uma hora';
  return horas === 1 ? 'acesa há 1 hora' : `acesa há ${horas} horas`;
}

const VelaDeIntencao = () => {
  const id = useId();
  const [vela, setVela] = useState(lerVela);
  const [texto, setTexto] = useState('');
  const [, setRelogio] = useState(0);

  // de minuto em minuto, atualiza o "acesa há" e apaga a vela depois de 24 horas
  useEffect(() => {
    if (!vela) return undefined;
    const t = setInterval(() => {
      if (Date.now() - vela.acesaEm >= DURACAO_MS) setVela(null);
      else setRelogio(n => n + 1);
    }, 60000);
    return () => clearInterval(t);
  }, [vela]);

  const acenderVela = evento => {
    evento.preventDefault();
    const nova = {
      intencao: texto.trim().slice(0, LIMITE),
      acesaEm: Date.now(),
    };
    setVela(nova);
    setTexto('');
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(nova));
    } catch {
      // sem localStorage, a vela fica acesa só enquanto a página estiver aberta
    }
  };

  const apagar = () => {
    setVela(null);
    try {
      window.localStorage.removeItem(CHAVE);
    } catch {
      // nada a fazer
    }
  };

  const restante = vela ? DURACAO_MS - (Date.now() - vela.acesaEm) : 0;
  const horasRestantes = Math.max(1, Math.ceil(restante / 3600000));

  return (
    <Caixa aria-labelledby={`${id}-titulo`}>
      <Vela $acesa={Boolean(vela)} aria-hidden="true">
        <span className="brilho" />
        <svg
          viewBox="0 0 70 150"
          width="70"
          height="150"
          style={{ position: 'relative', overflow: 'visible' }}
        >
          {vela && (
            <>
              <g className="fumaca" transform="translate(23 -26)">
                <path d="M12 30 C7 22 17 16 11 8 C7 2 14 -4 12 -10" />
                <path d="M12 30 C17 23 7 16 13 9 C17 3 10 -3 13 -9" />
              </g>
              <g className="chama">
                <path
                  d="M35 6 C45 22 46 36 35 44 C24 36 25 22 35 6 Z"
                  fill="#F4C056"
                />
                <path
                  d="M35 22 C39 29 39 36 35 40 C31 36 31 29 35 22 Z"
                  fill="#FFF6D6"
                />
              </g>
            </>
          )}
          <path
            d="M35 42 V52"
            stroke="#3a2a1c"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 54 Q35 48 52 54 L52 146 L18 146 Z"
            fill="#F7F0E2"
            stroke="#E2D6BC"
          />
          <path d="M45 54 Q47 68 44 76 Q42 70 42 56 Z" fill="#EFE5D2" />
          <rect x="12" y="144" width="46" height="5" rx="1" fill="#C9A54C" />
        </svg>
      </Vela>

      <div aria-live="polite">
        <h2 id={`${id}-titulo`}>
          {vela ? 'Sua vela está acesa' : 'Acenda uma vela'}
        </h2>
        {vela ? (
          <>
            {vela.intencao ? (
              <Intencao>{vela.intencao}</Intencao>
            ) : (
              <p>Por todas as intenções que você leva no coração.</p>
            )}
            <small>
              {tempoDesde(Date.now() - vela.acesaEm)}, apaga em {horasRestantes}{' '}
              {horasRestantes === 1 ? 'hora' : 'horas'}.
            </small>
            <div style={{ marginTop: 14 }}>
              <Botao type="button" $leve onClick={apagar}>
                Acender outra
              </Botao>
            </div>
          </>
        ) : (
          <>
            <p>
              Como na igreja: deixe uma intenção e a vela fica acesa por um dia.
            </p>
            <Formulario onSubmit={acenderVela}>
              <label htmlFor={`${id}-intencao`}>Sua intenção (opcional)</label>
              <textarea
                id={`${id}-intencao`}
                value={texto}
                maxLength={LIMITE}
                placeholder="Pela saúde da minha mãe"
                onChange={evento => setTexto(evento.target.value)}
              />
              <Botao type="submit">Acender a vela</Botao>
            </Formulario>
            <small>A intenção fica só neste aparelho, ninguém mais vê.</small>
          </>
        )}
      </div>
    </Caixa>
  );
};

export default VelaDeIntencao;
