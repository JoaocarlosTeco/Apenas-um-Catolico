import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { datasMoveis, diasEntre } from '../services/anoLiturgico';
import { diaLiturgico } from '../services/calendarioLiturgico';

// Um enfeite pequeno na home que muda com o tempo litúrgico, como a igreja muda de enfeite:
// a coroa do Advento acende uma vela por semana, a estrela de Belém no Natal, o pano roxo na
// cruz da Quaresma, o círio aceso na Páscoa, as chamas em Pentecostes e o ramo verde no Tempo Comum.

const tremular = keyframes`
  0%, 100% { transform: scale(1, 1) skewX(0deg); }
  30% { transform: scale(0.9, 1.1) skewX(-4deg); }
  60% { transform: scale(1.05, 0.94) skewX(3deg); }
`;

const cintilar = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.7); }
  50% { opacity: 1; transform: scale(1.15); }
`;

const balancar = keyframes`
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
`;

const girar = keyframes`
  to { transform: rotate(360deg); }
`;

const ondular = keyframes`
  0%, 100% { transform: skewX(0deg); }
  50% { transform: skewX(-5deg); }
`;

const Caixa = styled.figure`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 22px;

  svg {
    flex: 0 0 auto;
    width: 92px;
    height: 76px;
    overflow: visible;
  }

  figcaption {
    font-size: 1.04rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  figcaption b {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  .chama {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: ${tremular} 1.4s ease-in-out infinite;
  }

  .chama:nth-of-type(2n) {
    animation-duration: 1.7s;
    animation-delay: -0.4s;
  }

  .brilho {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${cintilar} 2.6s ease-in-out infinite;
  }

  .ramo {
    transform-box: fill-box;
    transform-origin: 10% 90%;
    animation: ${balancar} 4.5s ease-in-out infinite;
  }

  .raios {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${girar} 40s linear infinite;
  }

  .pano {
    transform-box: fill-box;
    transform-origin: 50% 0;
    animation: ${ondular} 5s ease-in-out infinite;
  }

  ${({ $apagado }) =>
    $apagado &&
    css`
      svg {
        opacity: 0.85;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    .chama,
    .brilho,
    .ramo,
    .raios,
    .pano {
      animation: none;
    }
  }
`;

const ROXO = '#6B3FA0';
const ROSA = '#C2588A';
const OURO = '#D9A441';
const VERDE = '#2E7D4F';

const Chama = ({ x, y, escala = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${escala})`}>
    <path
      className="chama"
      d="M0 -12 C5 -5 5 0 0 3 C-5 0 -5 -5 0 -12 Z"
      fill={OURO}
    />
  </g>
);

function CoroaDoAdvento({ acesas }) {
  const velas = [
    { x: 22, cor: ROXO },
    { x: 38, cor: ROXO },
    { x: 54, cor: ROSA },
    { x: 70, cor: ROXO },
  ];
  return (
    <svg viewBox="0 0 92 76" aria-hidden="true">
      {velas.map((v, i) => (
        <g key={v.x}>
          <rect
            x={v.x - 4}
            y={22 + (i % 2) * 4}
            width="8"
            height={38 - (i % 2) * 4}
            rx="1.5"
            fill={v.cor}
          />
          <line
            x1={v.x}
            y1={22 + (i % 2) * 4}
            x2={v.x}
            y2={18 + (i % 2) * 4}
            stroke="#3a2a1c"
            strokeWidth="1.2"
          />
          {i < acesas && <Chama x={v.x} y={16 + (i % 2) * 4} />}
        </g>
      ))}
      {/* a guirlanda de folhas em volta */}
      <ellipse
        cx="46"
        cy="62"
        rx="42"
        ry="9"
        fill="none"
        stroke={VERDE}
        strokeWidth="5"
      />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <ellipse
            key={i}
            cx={46 + Math.cos(a) * 42}
            cy={62 + Math.sin(a) * 9}
            rx="5"
            ry="2.4"
            fill={i % 3 === 0 ? '#1f5a37' : '#3f8f5c'}
            transform={`rotate(${(a * 180) / Math.PI + 30} ${46 + Math.cos(a) * 42} ${62 + Math.sin(a) * 9})`}
          />
        );
      })}
      {[0, 4, 8].map(i => {
        const a = (i / 12) * Math.PI * 2 + 0.3;
        return (
          <circle
            key={i}
            cx={46 + Math.cos(a) * 42}
            cy={62 + Math.sin(a) * 9}
            r="2.2"
            fill="#B3261E"
          />
        );
      })}
    </svg>
  );
}

function EstrelaDeBelem() {
  return (
    <svg viewBox="0 0 92 76" aria-hidden="true">
      <path
        d="M50 30 L88 72"
        stroke={OURO}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M50 30 L80 74"
        stroke={OURO}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />
      <g className="brilho">
        <path
          d="M50 6 L54 26 L74 30 L54 34 L50 54 L46 34 L26 30 L46 26 Z M50 16 L52 28 L64 30 L52 32 L50 44 L48 32 L36 30 L48 28 Z"
          fill={OURO}
          fillRule="evenodd"
        />
        <circle cx="50" cy="30" r="3" fill="#FFF3C8" />
      </g>
      {[
        [18, 14],
        [80, 12],
        [12, 50],
      ].map(([x, y], i) => (
        <circle
          key={i}
          className="brilho"
          cx={x}
          cy={y}
          r="1.8"
          fill={OURO}
          style={{ animationDelay: `${-i * 0.8}s` }}
        />
      ))}
    </svg>
  );
}

function CruzComPano({ cor = ROXO }) {
  return (
    <svg viewBox="0 0 92 76" aria-hidden="true">
      <rect x="43" y="4" width="6" height="70" rx="1" fill="#7a5a3a" />
      <rect x="26" y="18" width="40" height="6" rx="1" fill="#7a5a3a" />
      <path
        className="pano"
        d="M30 22 Q46 30 62 22 L58 46 Q52 40 46 48 Q40 40 34 46 Z"
        fill={cor}
        opacity="0.92"
      />
    </svg>
  );
}

function CirioPascal() {
  return (
    <svg viewBox="0 0 92 76" aria-hidden="true">
      <g className="raios" opacity="0.35">
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1="46"
            y1="14"
            x2={46 + Math.cos((i * Math.PI) / 6) * 26}
            y2={14 + Math.sin((i * Math.PI) / 6) * 26}
            stroke={OURO}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}
      </g>
      <rect
        x="38"
        y="24"
        width="16"
        height="52"
        rx="1.5"
        fill="#FBF6EA"
        stroke="#E2D6BC"
      />
      <line
        x1="46"
        y1="24"
        x2="46"
        y2="18"
        stroke="#3a2a1c"
        strokeWidth="1.2"
      />
      <Chama x={46} y={17} escala={1.2} />
      {/* a cruz vermelha, alfa e ômega e os cinco grãos de incenso */}
      <path d="M46 36 V58 M39 44 H53" stroke="#B3261E" strokeWidth="1.6" />
      <text
        x="40"
        y="34"
        fontSize="5"
        fill="#B3261E"
        fontFamily="Georgia, serif"
      >
        A
      </text>
      <text
        x="48.5"
        y="34"
        fontSize="5"
        fill="#B3261E"
        fontFamily="Georgia, serif"
      >
        Ω
      </text>
      {[
        [46, 40],
        [46, 47],
        [46, 54],
        [42, 44],
        [50, 44],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.1" fill="#7a1d18" />
      ))}
    </svg>
  );
}

function ChamasDePentecostes() {
  return (
    <svg viewBox="0 0 92 76" aria-hidden="true">
      {[14, 30, 46, 62, 78].map((x, i) => (
        <g
          key={x}
          transform={`translate(${x} ${46 - (i % 2) * 10}) scale(1.6)`}
        >
          <path
            className="chama"
            d="M0 -12 C5 -5 5 0 0 3 C-5 0 -5 -5 0 -12 Z"
            fill={i % 2 ? '#E05A2B' : OURO}
          />
        </g>
      ))}
      <path
        d="M8 64 Q46 54 84 64"
        stroke="#B3261E"
        strokeWidth="1.4"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function RamoVerde() {
  return (
    <svg viewBox="0 0 92 76" aria-hidden="true">
      <g className="ramo">
        <path
          d="M14 70 Q40 46 80 14"
          stroke="#6b5a3a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 1) / 8;
          const x = 14 + (80 - 14) * t;
          const y = 70 - (70 - 14) * t - Math.sin(t * Math.PI) * 6;
          return (
            <g key={i}>
              <ellipse
                cx={x - 5}
                cy={y - 5}
                rx="7"
                ry="2.8"
                fill={VERDE}
                transform={`rotate(-60 ${x - 5} ${y - 5})`}
              />
              <ellipse
                cx={x + 6}
                cy={y + 2}
                rx="7"
                ry="2.8"
                fill="#3f8f5c"
                transform={`rotate(20 ${x + 6} ${y + 2})`}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

const EnfeiteDoTempo = ({ dia }) => {
  const info = diaLiturgico(dia);
  const m = datasMoveis(dia.getFullYear());
  const natal = new Date(dia.getFullYear(), 11, 25);
  const faltam = (alvo, nome) => {
    const n = diasEntre(dia, alvo);
    return n === 1
      ? `Falta 1 dia para ${nome}.`
      : `Faltam ${n} dias para ${nome}.`;
  };

  let desenho;
  let titulo;
  let texto;

  if (info.tempo === 'advento') {
    const acesas = Math.min(4, Math.max(1, info.semana || 1));
    desenho = <CoroaDoAdvento acesas={acesas} />;
    titulo =
      `${acesas}ª vela do Advento ${acesas === 3 ? '(a rosa, da alegria)' : ''}`.trim();
    texto = faltam(natal, 'o Natal');
  } else if (info.tempo === 'natal') {
    desenho = <EstrelaDeBelem />;
    titulo =
      dia.getMonth() === 11 && dia.getDate() === 25
        ? 'Feliz Natal!'
        : 'Tempo do Natal';
    texto = 'O Verbo se fez carne e habitou entre nós.';
  } else if (info.tempo === 'quaresma') {
    desenho = <CruzComPano />;
    titulo = 'Quaresma';
    texto = `Oração, jejum e caridade. ${faltam(m.pascoa, 'a Páscoa')}`;
  } else if (info.tempo === 'triduo') {
    desenho = <CruzComPano cor="#B3261E" />;
    titulo = 'Tríduo Pascal';
    texto =
      'A paixão, a morte e a ressurreição do Senhor: o centro de todo o ano.';
  } else if (info.tempo === 'pascoa' && info.titulo.includes('Pentecostes')) {
    desenho = <ChamasDePentecostes />;
    titulo = 'Pentecostes';
    texto = 'Vinde, Espírito Santo, enchei os corações dos vossos fiéis.';
  } else if (info.tempo === 'pascoa') {
    desenho = <CirioPascal />;
    titulo = 'Cristo ressuscitou, aleluia!';
    texto = `Tempo Pascal. ${faltam(m.pentecostes, 'Pentecostes')}`;
  } else {
    desenho = <RamoVerde />;
    titulo = 'Tempo Comum';
    texto = 'O verde da esperança: a fé que cresce no dia a dia.';
  }

  return (
    <Caixa aria-label={`${titulo}. ${texto}`}>
      {desenho}
      <figcaption>
        <b>{titulo}</b>
        {texto}
      </figcaption>
    </Caixa>
  );
};

export default EnfeiteDoTempo;
