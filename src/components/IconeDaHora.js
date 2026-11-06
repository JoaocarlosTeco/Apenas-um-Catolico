import React from 'react';
import styled, { keyframes } from 'styled-components';

// O ícone do bloco "Agora" da home, animado conforme a hora: o sol nascendo de manhã,
// o sino do Angelus balançando ao meio-dia e às seis, as contas do terço girando à tarde
// e a lua com estrelas piscando à noite.

const balancarSino = keyframes`
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(16deg); }
  35% { transform: rotate(-13deg); }
  55% { transform: rotate(9deg); }
  75% { transform: rotate(-5deg); }
`;

const badalo = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
`;

const nascer = keyframes`
  0%, 100% { transform: translateY(2px); }
  50% { transform: translateY(-1px); }
`;

const girar = keyframes`
  to { transform: rotate(360deg); }
`;

const piscar = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

const Icone = styled.svg`
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  overflow: visible;
  color: ${({ theme }) => theme.colors.gold};

  .sino {
    transform-box: fill-box;
    transform-origin: 50% 8%;
    animation: ${balancarSino} 2.6s ease-in-out infinite;
  }

  .badalo {
    transform-box: fill-box;
    transform-origin: 50% 0;
    animation: ${badalo} 2.6s ease-in-out infinite;
  }

  .sol {
    animation: ${nascer} 4s ease-in-out infinite;
  }

  .raios {
    transform-box: view-box;
    transform-origin: 17px 22px;
    animation: ${girar} 24s linear infinite;
  }

  .contas {
    transform-box: view-box;
    transform-origin: 17px 17px;
    animation: ${girar} 18s linear infinite;
  }

  .estrela {
    animation: ${piscar} 2.4s ease-in-out infinite;
  }

  .estrela:nth-of-type(2) {
    animation-delay: -0.8s;
  }

  .estrela:nth-of-type(3) {
    animation-delay: -1.6s;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
  }
`;

const IconeDaHora = ({ tipo }) => {
  if (tipo === 'sino')
    return (
      <Icone viewBox="0 0 34 34" aria-hidden="true">
        <g className="sino">
          <path
            d="M17 3 V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 24 C9 14 11 7 17 7 C23 7 25 14 25 24 L27 26 H7 Z"
            fill="currentColor"
            opacity="0.9"
          />
          <circle
            className="badalo"
            cx="17"
            cy="28.5"
            r="2.2"
            fill="currentColor"
          />
        </g>
      </Icone>
    );
  if (tipo === 'sol')
    return (
      <Icone viewBox="0 0 34 34" aria-hidden="true">
        <g className="raios" opacity="0.7">
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={17 + Math.cos(a) * 10}
                y1={22 + Math.sin(a) * 10}
                x2={17 + Math.cos(a) * 14}
                y2={22 + Math.sin(a) * 14}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            );
          })}
        </g>
        <circle className="sol" cx="17" cy="22" r="7" fill="currentColor" />
        <path
          d="M2 27 H32"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.6"
        />
      </Icone>
    );
  if (tipo === 'terco')
    return (
      <Icone viewBox="0 0 34 34" aria-hidden="true">
        <g className="contas">
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i * Math.PI) / 5;
            return (
              <circle
                key={i}
                cx={17 + Math.cos(a) * 11}
                cy={17 + Math.sin(a) * 11}
                r="2.2"
                fill="currentColor"
              />
            );
          })}
        </g>
        <path
          d="M17 13 V21 M14 16 H20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </Icone>
    );
  return (
    <Icone viewBox="0 0 34 34" aria-hidden="true">
      <path
        d="M21 5 A12 12 0 1 0 29 23 A10 10 0 1 1 21 5 Z"
        fill="currentColor"
      />
      <circle className="estrela" cx="8" cy="7" r="1.4" fill="currentColor" />
      <circle className="estrela" cx="5" cy="15" r="1" fill="currentColor" />
      <circle className="estrela" cx="13" cy="3" r="1.1" fill="currentColor" />
    </Icone>
  );
};

export default IconeDaHora;
