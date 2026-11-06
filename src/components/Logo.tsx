import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Logo tipográfico: "Apenas um" em versalete e "Católico" em Cormorant itálico,
// com o "t" desenhado como uma cruz. Sem ícone, sem gradiente: só letra.
// No topo, a cruz se desenha sozinha na primeira vez que o site abre na sessão.

const CREME = '#F3EBDD';
const OURO = '#D9BB6A';
const CHAVE_SESSAO = 'logo-tracada';

const tracar = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`;

const balancar = keyframes`
  0%, 100% { transform: skewX(-11deg) rotate(0deg); }
  30% { transform: skewX(-11deg) rotate(-7deg); }
  65% { transform: skewX(-11deg) rotate(5deg); }
`;

// pathLength="1" deixa o traço medir 1: o tracejado de 1 esconde e revela a cruz inteira
const Traco = styled.path<{ $animar: boolean }>`
  ${({ $animar }) =>
    $animar &&
    css`
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: ${tracar} 1s 0.3s cubic-bezier(0.6, 0, 0.2, 1) forwards;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
        stroke-dashoffset: 0;
      }
    `}
`;

// a cruz dá um balanço curto quando o mouse passa pelo logo (o link do topo)
const Cruz = styled.svg`
  transform: skewX(-11deg);
  transform-origin: 50% 85%;

  a:hover &,
  a:focus-visible & {
    animation: ${balancar} 0.7s ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    a:hover &,
    a:focus-visible & {
      animation: none;
    }
  }
`;

function jaTracouNestaSessao() {
  try {
    return Boolean(window.sessionStorage.getItem(CHAVE_SESSAO));
  } catch {
    return true;
  }
}

interface LogoProps {
  tamanho?: number;
  /** Texto creme para fundo escuro (topo e rodapé). Em fundo claro, usa a cor do texto. */
  claro?: boolean;
  /** Desenha a cruz ao aparecer, uma vez por sessão (usado no topo do site). */
  animar?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  tamanho = 40,
  claro = true,
  animar = false,
}) => {
  const corTexto = claro ? CREME : 'currentColor';
  const corCruz = claro ? OURO : 'currentColor';
  const corpo = tamanho * 0.8;
  // decidido uma vez, na montagem: renderizações seguintes não podem cancelar a animação no meio
  const [tracarAgora] = useState(() => animar && !jaTracouNestaSessao());

  // marca depois de montar, para o modo estrito do React (que renderiza duas vezes) não cancelar a animação
  useEffect(() => {
    if (!tracarAgora) return;
    try {
      window.sessionStorage.setItem(CHAVE_SESSAO, '1');
    } catch {
      // sem sessionStorage, a cruz se desenha a cada visita
    }
  }, [tracarAgora]);

  return (
    <span
      role="img"
      aria-label="Apenas um Católico"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        lineHeight: 1,
        color: corTexto,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: Math.round(tamanho * 0.12),
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: Math.max(10, Math.round(tamanho * 0.26)),
          fontWeight: 600,
          letterSpacing: '0.34em',
          opacity: 0.82,
          marginBottom: Math.round(tamanho * 0.02),
        }}
      >
        APENAS UM
        {/* filete fino que liga o versalete ao nome */}
        <span
          style={{
            flex: 1,
            height: 1,
            minWidth: tamanho * 0.3,
            background: 'currentColor',
            opacity: 0.4,
          }}
        />
      </span>
      <span
        aria-hidden="true"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: corpo,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        Ca
        {/* o "t" é uma cruz, inclinada como as letras em itálico ao redor */}
        <Cruz
          width={corpo * 0.34}
          height={corpo * 0.92}
          viewBox="0 0 16 40"
          style={{ margin: `0 ${corpo * 0.01}px ${corpo * 0.15}px` }}
        >
          <Traco
            d="M8 2 V37 M2.5 13 H13.5"
            pathLength={1}
            stroke={corCruz}
            strokeWidth="2.6"
            strokeLinecap="round"
            $animar={tracarAgora}
          />
        </Cruz>
        ólico
      </span>
    </span>
  );
};

/** Selo simples (anel duplo e cruz) usado nos ícones do app e no favicon */
export const Selo: React.FC<{ tamanho?: number }> = ({ tamanho = 40 }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="24" r="24" fill="#0D2140" />
    <circle
      cx="24"
      cy="24"
      r="20"
      fill="none"
      stroke={CREME}
      strokeWidth="1.2"
    />
    <circle
      cx="24"
      cy="24"
      r="16.5"
      fill="none"
      stroke={CREME}
      strokeWidth="0.6"
    />
    <path
      d="M24 12 V36 M17 19.5 H31"
      stroke={OURO}
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export default Logo;
