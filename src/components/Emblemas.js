import React, { useId } from 'react';

// Emblemas dos santos em traço fino, como medalhas gravadas.
// O traço usa a cor do texto (currentColor); só pequenos detalhes levam cor.
// viewBox 200 x 200: anel externo com a inscrição e o desenho dentro do círculo central.

const traco = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Medalha({ titulo, inscricao, children, estrelas, corEstrelas }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={titulo}>
      <title>{titulo}</title>
      <circle cx="100" cy="100" r="96" {...traco} strokeWidth="1.6" />
      <circle cx="100" cy="100" r="92" {...traco} strokeWidth="0.6" />
      <circle cx="100" cy="100" r="76" {...traco} strokeWidth="0.9" />
      {inscricao && (
        <>
          <defs>
            <path
              id={`anel-${id}`}
              d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0"
            />
          </defs>
          <text
            fill="currentColor"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="12.5"
            fontWeight="600"
            letterSpacing="3.2"
            textAnchor="middle"
          >
            <textPath href={`#anel-${id}`} startOffset="25%">
              {inscricao}
            </textPath>
          </text>
          {/* pequenos losangos fechando a inscrição embaixo */}
          {[-14, 0, 14].map(a => {
            const rad = (a * Math.PI) / 180;
            const x = 100 + Math.sin(rad) * 84;
            const y = 100 + Math.cos(rad) * 84;
            return (
              <path
                key={a}
                d={`M${x} ${y - 2.6} L${x + 2.6} ${y} L${x} ${y + 2.6} L${x - 2.6} ${y} Z`}
                fill="currentColor"
              />
            );
          })}
        </>
      )}
      {estrelas &&
        Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x = 100 + Math.cos(a) * 84;
          const y = 100 + Math.sin(a) * 84;
          return (
            <path
              key={i}
              d={`M${x} ${y - 5.5} L${x + 1.6} ${y - 1.6} L${x + 5.5} ${y} L${x + 1.6} ${y + 1.6} L${x} ${y + 5.5} L${x - 1.6} ${y + 1.6} L${x - 5.5} ${y} L${x - 1.6} ${y - 1.6} Z`}
              fill={corEstrelas || 'currentColor'}
            />
          );
        })}
      {children}
    </svg>
  );
}

/* São Francisco: o Tau com o cordão de três nós e dois ramos */
export function EmblemaFrancisco({ cor = '#8a5a3c' }) {
  return (
    <Medalha titulo="Emblema de São Francisco: o Tau" inscricao="PAZ · E · BEM">
      <path
        d="M56 54 H144 L138 63 L144 72 H108 V144 L113 152 H87 L92 144 V72 H56 L62 63 Z"
        {...traco}
        strokeWidth="2.2"
      />
      {/* hachuras de gravura no braço e na haste */}
      {[60, 66].map(y => (
        <path
          key={y}
          d={`M68 ${y} H132`}
          {...traco}
          strokeWidth="0.6"
          opacity="0.55"
        />
      ))}
      {[96, 100, 104].map(x => (
        <path
          key={x}
          d={`M${x} 78 V140`}
          {...traco}
          strokeWidth="0.6"
          opacity="0.55"
        />
      ))}
      {/* cordão franciscano */}
      <path
        d="M126 72 C124 92 132 106 126 122 C122 132 124 140 128 146"
        {...traco}
        strokeWidth="1.8"
        stroke={cor}
      />
      {[
        [127, 96],
        [126, 117],
        [126, 136],
      ].map(([x, y]) => (
        <circle
          key={y}
          cx={x}
          cy={y}
          r="3.4"
          {...traco}
          strokeWidth="1.6"
          stroke={cor}
        />
      ))}
      {/* ramos de oliveira na base */}
      {[-1, 1].map(lado => (
        <g key={lado} transform={`translate(100 158) scale(${lado} 1)`}>
          <path
            d="M-14 0 C-26 -2 -36 -8 -44 -18"
            {...traco}
            strokeWidth="1.2"
          />
          {[
            [-22, -2, -20],
            [-31, -6, -35],
            [-39, -12, -50],
          ].map(([x, y, g]) => (
            <ellipse
              key={x}
              cx={x}
              cy={y - 4}
              rx="5.5"
              ry="2.2"
              {...traco}
              strokeWidth="1"
              transform={`rotate(${g} ${x} ${y - 4})`}
            />
          ))}
        </g>
      ))}
    </Medalha>
  );
}

// rosa em botão: a taça de pétalas, as duas pétalas de cima e o miolo enrolado
function Rosa({ x, y, r = 8, cor }) {
  const p = (dx, dy) => `${x + dx * r} ${y + dy * r}`;
  return (
    <g {...traco} stroke={cor} strokeWidth="1.4">
      <path d={`M${p(-1, -0.15)} C${p(-1, 0.85)} ${p(1, 0.85)} ${p(1, -0.15)}`} />
      <path
        d={`M${p(-1, -0.15)} C${p(-0.75, -0.95)} ${p(-0.1, -0.8)} ${p(0, -0.4)} C${p(0.1, -0.8)} ${p(0.75, -0.95)} ${p(1, -0.15)}`}
      />
      <path
        d={`M${p(-0.4, 0)} C${p(-0.4, -0.45)} ${p(0.4, -0.45)} ${p(0.4, 0.02)} C${p(0.38, 0.32)} ${p(-0.12, 0.36)} ${p(-0.1, 0.05)}`}
      />
      <path d={`M${p(-0.7, 0.42)} C${p(-0.3, 0.62)} ${p(0.3, 0.62)} ${p(0.7, 0.42)}`} strokeWidth="0.8" />
    </g>
  );
}

function Folha({ x, y, giro }) {
  return (
    <g transform={`rotate(${giro} ${x} ${y})`}>
      <path
        d={`M${x - 8} ${y} Q${x} ${y - 5} ${x + 8} ${y} Q${x} ${y + 5} ${x - 8} ${y} Z`}
        {...traco}
        strokeWidth="1"
      />
      <path d={`M${x - 7} ${y} H${x + 7}`} {...traco} strokeWidth="0.5" />
    </g>
  );
}

/* Santa Teresinha: o crucifixo coberto de rosas */
export function EmblemaTeresinha({ cor = '#a8456b' }) {
  return (
    <Medalha
      titulo="Emblema de Santa Teresinha: o crucifixo com rosas"
      inscricao="TUDO · É · GRAÇA"
    >
      <path
        d="M94 38 H106 V68 H134 V80 H106 V160 H94 V80 H66 V68 H94 Z"
        {...traco}
        strokeWidth="2.2"
      />
      <path
        d="M100 42 V156 M70 74 H130"
        {...traco}
        strokeWidth="0.6"
        opacity="0.5"
      />
      {/* ramo de rosas atravessando a cruz */}
      <path
        d="M62 132 C80 120 92 104 104 92 C116 80 128 70 140 66"
        {...traco}
        strokeWidth="1.2"
      />
      <Folha x={72} y={124} giro={-30} />
      <Folha x={118} y={84} giro={-40} />
      <Folha x={134} y={74} giro={-15} />
      <Folha x={88} y={112} giro={40} />
      <Rosa x={100} y={96} r={10} cor={cor} />
      <Rosa x={80} y={118} r={7.5} cor={cor} />
      <Rosa x={124} y={72} r={7} cor={cor} />
      <Rosa x={66} y={136} r={5.5} cor={cor} />
    </Medalha>
  );
}

/* Padre Pio: o cálice e a hóstia da Missa que ele celebrava com as chagas */
export function EmblemaPio({ cor = '#b3261e' }) {
  return (
    <Medalha
      titulo="Emblema de Padre Pio: o cálice e a hóstia"
      inscricao="FICA COMIGO, SENHOR"
    >
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 100 + Math.cos(a) * 25;
        const y1 = 62 + Math.sin(a) * 25;
        const x2 = 100 + Math.cos(a) * (i % 2 ? 31 : 36);
        const y2 = 62 + Math.sin(a) * (i % 2 ? 31 : 36);
        return (
          <path
            key={i}
            d={`M${x1} ${y1} L${x2} ${y2}`}
            {...traco}
            strokeWidth="1"
          />
        );
      })}
      <circle cx="100" cy="62" r="20" {...traco} strokeWidth="1.8" />
      <circle cx="100" cy="62" r="16.5" {...traco} strokeWidth="0.6" />
      <path d="M100 52 V72 M92 59 H108" {...traco} strokeWidth="1.6" />
      {/* cálice */}
      <path
        d="M70 94 H130 C130 116 118 128 100 130 C82 128 70 116 70 94 Z"
        {...traco}
        strokeWidth="2"
      />
      <path
        d="M74 102 C80 104 120 104 126 102 M77 110 C84 112 116 112 123 110"
        {...traco}
        strokeWidth="0.6"
        opacity="0.55"
      />
      <path
        d="M100 108 V122 M95 114 H105"
        {...traco}
        stroke={cor}
        strokeWidth="1.6"
      />
      <path d="M96 130 V140 M104 130 V140" {...traco} strokeWidth="1.6" />
      <ellipse cx="100" cy="143" rx="9" ry="4" {...traco} strokeWidth="1.6" />
      <path d="M97 147 V158 M103 147 V158" {...traco} strokeWidth="1.6" />
      <path d="M76 168 C80 158 120 158 124 168 Z" {...traco} strokeWidth="2" />
    </Medalha>
  );
}

/* Nossa Senhora: o verso da Medalha Milagrosa (1830), com o M, a cruz, os dois corações e as doze estrelas */
export function EmblemaMaria({ cor = '#9c7c38', corCoracao = '#a32d2d' }) {
  return (
    <Medalha
      titulo="Emblema de Nossa Senhora: o monograma da Medalha Milagrosa"
      estrelas
      corEstrelas={cor}
    >
      <path d="M100 34 V70 M90 46 H110" {...traco} strokeWidth="2.2" />
      <path d="M70 70 H130" {...traco} strokeWidth="2.2" />
      <path d="M74 118 V76 L100 108 L126 76 V118" {...traco} strokeWidth="3" />
      <path d="M68 118 H80 M120 118 H132" {...traco} strokeWidth="2" />
      {/* Sagrado Coração: coroa de espinhos e chama com a cruz */}
      <g transform="translate(82 146)">
        <path
          d="M0 12 C-14 2 -12 -10 -3 -10 C0 -10 0 -7 0 -6 C0 -7 0 -10 3 -10 C12 -10 14 2 0 12 Z"
          {...traco}
          stroke={corCoracao}
          strokeWidth="1.8"
        />
        <path
          d="M-11 -2 C-6 2 6 2 11 -2"
          {...traco}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M0 -11 C-4 -15 -1 -19 0 -22 C1 -19 4 -15 0 -11 Z M0 -22 V-28 M-2.5 -25.5 H2.5"
          {...traco}
          stroke={cor}
          strokeWidth="1.2"
        />
      </g>
      {/* Imaculado Coração: atravessado pela espada */}
      <g transform="translate(118 146)">
        <path
          d="M0 12 C-14 2 -12 -10 -3 -10 C0 -10 0 -7 0 -6 C0 -7 0 -10 3 -10 C12 -10 14 2 0 12 Z"
          {...traco}
          stroke={corCoracao}
          strokeWidth="1.8"
        />
        <path d="M-12 -12 L12 14 M-9 -7 L-5 -11" {...traco} strokeWidth="1.3" />
        <path
          d="M0 -11 C-4 -15 -1 -19 0 -22 C1 -19 4 -15 0 -11 Z"
          {...traco}
          stroke={cor}
          strokeWidth="1.2"
        />
      </g>
    </Medalha>
  );
}

/* Padre Pio: mãos abertas com as chagas, em traço fino */
export function MaosChagadas({ cor = '#9f1d24' }) {
  return (
    <svg viewBox="0 0 160 120" role="img" aria-label="Mãos com as chagas">
      <title>Mãos com as chagas</title>
      {Array.from({ length: 14 }, (_, i) => -90 + (i - 6.5) * 14).map(g => (
        <path
          key={g}
          d="M80 64 L80 10"
          {...traco}
          strokeWidth="0.6"
          opacity="0.5"
          transform={`rotate(${g} 80 64)`}
        />
      ))}
      {[-1, 1].map(lado => (
        <g
          key={lado}
          transform={`translate(${80 + lado * 24} 0) scale(${lado} 1)`}
        >
          <path
            d="M-14 106 L-16 76 C-17 68 -14 60 -10 56 L-10 36 a4 4 0 0 1 8 0 L-2 52 L-2 30 a4 4 0 0 1 8 0 L6 52 L6 34 a4 4 0 0 1 8 0 L14 60 L18 52 a4 4 0 0 1 7 3 L16 80 L14 106"
            {...traco}
            strokeWidth="1.6"
          />
          <path
            d="M-12 100 C-6 98 6 98 12 100"
            {...traco}
            strokeWidth="0.6"
            opacity="0.6"
          />
          <circle cx="2" cy="72" r="3.4" fill={cor} />
        </g>
      ))}
    </svg>
  );
}

const EMBLEMAS = {
  'sao-francisco': EmblemaFrancisco,
  'santa-teresinha': EmblemaTeresinha,
  'padre-pio': EmblemaPio,
  'nossa-senhora': EmblemaMaria,
};

export const Emblema = ({ slug, ...props }) => {
  const Desenho = EMBLEMAS[slug];
  return Desenho ? <Desenho {...props} /> : null;
};
