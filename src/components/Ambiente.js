import React, { useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Efeitos das páginas dos santos: a chuva de rosas (a pedido), a vela do Padre Pio e as nuvens de Nossa Senhora. Todos são decorativos (aria-hidden),
// não capturam cliques e param sozinhos quando o sistema pede menos movimento.

const semMovimento = css`
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Camada = styled.div`
  position: ${({ $fixa }) => ($fixa ? 'fixed' : 'absolute')};
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: ${({ $fixa }) => ($fixa ? 1500 : 0)};
  ${semMovimento}
`;

// Números "aleatórios" estáveis: a mesma semente gera sempre o mesmo céu
function sorteio(semente) {
  let s = semente;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/* ---------------- Queda (pétalas e folhas) ---------------- */

const cair = keyframes`
  from { transform: translate3d(0, -60px, 0); }
  to { transform: translate3d(0, var(--altura, 110vh), 0); }
`;

const balancar = keyframes`
  0%, 100% { transform: translateX(calc(var(--balanco) * -1)) rotate(var(--giro-inicio)); }
  50% { transform: translateX(var(--balanco)) rotate(var(--giro-fim)); }
`;

const Queda = styled.span`
  position: absolute;
  top: 0;
  left: ${({ $x }) => $x}%;
  animation: ${cair} ${({ $duracao }) => $duracao}s linear
    ${({ $atraso }) => $atraso}s
    ${({ $repetir }) => ($repetir ? 'infinite' : '1 forwards')};
  will-change: transform;

  > span {
    display: block;
    --balanco: ${({ $balanco }) => $balanco}px;
    --giro-inicio: ${({ $giro }) => $giro}deg;
    --giro-fim: ${({ $giro }) => $giro + 200}deg;
    animation: ${balancar} ${({ $ritmo }) => $ritmo}s ease-in-out infinite;
  }

  svg {
    display: block;
    width: ${({ $tamanho }) => $tamanho}px;
    height: ${({ $tamanho }) => $tamanho}px;
    opacity: ${({ $opacidade }) => $opacidade};
  }
`;

const PETALA = 'M12 1 C20 6 22 15 12 23 C2 15 4 6 12 1 Z';

function useQuedas(quantidade, semente) {
  return useMemo(() => {
    const r = sorteio(semente);
    return Array.from({ length: quantidade }, (_, i) => ({
      id: i,
      x: r() * 96 + 2,
      duracao: 7 + r() * 7,
      atraso: r() * 8,
      tamanho: 14 + r() * 14,
      balanco: 18 + r() * 32,
      ritmo: 2.4 + r() * 2.4,
      giro: Math.round(r() * 360),
      cor: i % 4,
      opacidade: 0.55 + r() * 0.4,
    }));
  }, [quantidade, semente]);
}

const CORES_ROSA = [
  ['#F7A8B8', '#C2405F'],
  ['#E8577A', '#8E1E3A'],
  ['#FBC7D2', '#E07A95'],
  ['#D63A5E', '#7A1530'],
];

/** Chuva de rosas de Santa Teresinha. `fixa` cobre a tela inteira uma vez só. */
export function ChuvaDeRosas({ quantidade = 14, fixa = false, semente = 7 }) {
  const quedas = useQuedas(quantidade, semente);
  return (
    <Camada aria-hidden="true" $fixa={fixa}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {CORES_ROSA.map(([a, b], i) => (
            <linearGradient
              key={i}
              id={`petala-${semente}-${i}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor={a} />
              <stop offset="100%" stopColor={b} />
            </linearGradient>
          ))}
        </defs>
      </svg>
      {quedas.map(q => (
        <Queda
          key={q.id}
          $x={q.x}
          $duracao={fixa ? q.duracao * 0.75 : q.duracao}
          $atraso={fixa ? q.atraso * 0.4 : q.atraso}
          $repetir={!fixa}
          $tamanho={q.tamanho}
          $balanco={q.balanco}
          $ritmo={q.ritmo}
          $giro={q.giro}
          $opacidade={q.opacidade}
        >
          <span>
            <svg viewBox="0 0 24 24">
              <path d={PETALA} fill={`url(#petala-${semente}-${q.cor})`} />
            </svg>
          </span>
        </Queda>
      ))}
    </Camada>
  );
}

/* ---------------- Vela (Padre Pio) ---------------- */

const tremular = keyframes`
  0%, 100% { transform: scale(1, 1) skewX(0deg); opacity: 0.95; }
  25% { transform: scale(0.94, 1.06) skewX(-2deg); opacity: 1; }
  50% { transform: scale(1.03, 0.95) skewX(1.5deg); opacity: 0.9; }
  75% { transform: scale(0.97, 1.04) skewX(-1deg); opacity: 1; }
`;

const pulsar = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.08); }
`;

const subirFumaca = keyframes`
  0% { opacity: 0; transform: translateY(14px) scaleX(0.6); }
  20% { opacity: 0.45; }
  100% { opacity: 0; transform: translateY(-26px) scaleX(1.4); }
`;

const VelaCaixa = styled.div`
  position: absolute;
  right: 6%;
  bottom: 0;
  width: 90px;
  height: 220px;
  pointer-events: none;
  opacity: 0.9;

  @media (max-width: 767px) {
    right: 2%;
    width: 64px;
    height: 160px;
    opacity: 0.6;
  }

  .brilho {
    position: absolute;
    left: 50%;
    top: 0;
    width: 240px;
    height: 240px;
    margin-left: -120px;
    margin-top: -70px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      ${({ $cor }) => $cor}55 0%,
      transparent 65%
    );
    animation: ${pulsar} 3.5s ease-in-out infinite;
  }

  .chama {
    transform-origin: 50% 90%;
    animation: ${tremular} 1.6s ease-in-out infinite;
  }

  /* fios de fumaça subindo da chama, como de vela de igreja */
  .fumaca {
    position: absolute;
    left: 50%;
    top: -46px;
    width: 30px;
    height: 56px;
    margin-left: -15px;
  }

  .fumaca path {
    fill: none;
    stroke: #ede3d6;
    stroke-width: 1.4;
    stroke-linecap: round;
    opacity: 0;
    animation: ${subirFumaca} 5.5s ease-out infinite;
  }

  .fumaca path:nth-child(2) {
    animation-delay: 1.8s;
  }

  .fumaca path:nth-child(3) {
    animation-delay: 3.6s;
  }

  @media (prefers-reduced-motion: reduce) {
    .brilho,
    .chama,
    .fumaca path {
      animation: none;
    }
  }
`;

export function Vela({ cor = '#E0B25A' }) {
  return (
    <VelaCaixa aria-hidden="true" $cor={cor}>
      <span className="brilho" />
      <svg className="fumaca" viewBox="0 0 30 56">
        <path d="M15 56 C10 46 20 40 14 30 C9 22 18 14 15 4" />
        <path d="M15 56 C20 47 10 40 16 31 C21 23 12 15 16 5" />
        <path d="M15 56 C12 48 18 42 15 33 C12 25 17 18 14 8" />
      </svg>
      <svg
        viewBox="0 0 90 220"
        width="100%"
        height="100%"
        style={{ position: 'relative' }}
      >
        <defs>
          <linearGradient id="vela-chama" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF6D6" />
            <stop offset="55%" stopColor="#F4C056" />
            <stop offset="100%" stopColor="#D9772B" />
          </linearGradient>
          <linearGradient id="vela-cera" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EDE3CF" />
            <stop offset="60%" stopColor="#FBF6EA" />
            <stop offset="100%" stopColor="#D8CBB0" />
          </linearGradient>
        </defs>
        <g className="chama">
          <path
            d="M45 8 C56 26 58 42 45 52 C32 42 34 26 45 8 Z"
            fill="url(#vela-chama)"
          />
          <path
            d="M45 28 C49 36 49 44 45 48 C41 44 41 36 45 28 Z"
            fill="#FFFDF2"
            opacity="0.9"
          />
        </g>
        <path
          d="M45 50 L45 60"
          stroke="#3a2a1c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M26 62 Q45 56 64 62 L64 220 L26 220 Z"
          fill="url(#vela-cera)"
        />
        <path d="M58 62 Q60 76 57 84 Q55 78 55 64 Z" fill="#F4EDDD" />
      </svg>
    </VelaCaixa>
  );
}

/* ---------------- Nuvens (Nossa Senhora) ---------------- */

// Nuvens claras e meio transparentes atravessando o céu azul do topo, cada uma no seu ritmo.
// Ficam atrás do retrato e do texto (o topo precisa de isolation: isolate). Com menos movimento
// no sistema, elas ficam paradas em vez de sumir.

const atravessar = keyframes`
  from { transform: translateX(-45vw); }
  to { transform: translateX(110vw); }
`;

const CamadaNuvens = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
`;

const Nuvem = styled.svg`
  position: absolute;
  left: 0;
  top: ${({ $y }) => $y}%;
  width: clamp(
    ${({ $min }) => $min}px,
    ${({ $vw }) => $vw}vw,
    ${({ $max }) => $max}px
  );
  height: auto;
  opacity: ${({ $opacidade }) => $opacidade};
  filter: blur(${({ $desfoque }) => $desfoque}px);
  animation: ${atravessar} ${({ $duracao }) => $duracao}s linear
    ${({ $atraso }) => $atraso}s infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translateX(${({ $parada }) => $parada}vw);
  }
`;

const FORMA_NUVEM =
  'M30 70 C10 70 6 48 24 42 C22 24 44 16 56 28 C64 10 94 12 98 32 C116 26 132 40 124 56 C140 58 140 78 122 78 L34 78 C31 78 30 74 30 70 Z';

const NUVENS = [
  {
    y: 4,
    vw: 34,
    min: 150,
    max: 300,
    opacidade: 0.2,
    desfoque: 3,
    duracao: 75,
    atraso: -12,
    parada: 4,
  },
  {
    y: 22,
    vw: 24,
    min: 110,
    max: 210,
    opacidade: 0.14,
    desfoque: 4,
    duracao: 100,
    atraso: -62,
    parada: 68,
  },
  {
    y: 48,
    vw: 40,
    min: 170,
    max: 360,
    opacidade: 0.12,
    desfoque: 6,
    duracao: 125,
    atraso: -38,
    parada: -8,
  },
  {
    y: 70,
    vw: 28,
    min: 130,
    max: 250,
    opacidade: 0.16,
    desfoque: 3.5,
    duracao: 90,
    atraso: -80,
    parada: 72,
  },
];

export function Nuvens({ cor = '#FFFFFF' }) {
  return (
    <CamadaNuvens aria-hidden="true">
      {NUVENS.map((n, i) => (
        <Nuvem
          key={i}
          viewBox="0 0 144 90"
          focusable="false"
          $y={n.y}
          $vw={n.vw}
          $min={n.min}
          $max={n.max}
          $opacidade={n.opacidade}
          $desfoque={n.desfoque}
          $duracao={n.duracao}
          $atraso={n.atraso}
          $parada={n.parada}
        >
          <path d={FORMA_NUVEM} fill={cor} />
        </Nuvem>
      ))}
    </CamadaNuvens>
  );
}

/* ---------------- Pássaros (São Francisco) ---------------- */

// Um bando pequeno cruzando o céu de tempos em tempos, batendo as asas,
// lembrando o sermão aos pássaros. Cada pássaro tem seu ritmo e sua altura.

const atravessarCeu = keyframes`
  0% { left: -8%; transform: translateY(0); }
  25% { transform: translateY(-10px); }
  50% { transform: translateY(4px); }
  75% { transform: translateY(-6px); }
  100% { left: 108%; transform: translateY(0); }
`;

const baterAsas = keyframes`
  from { transform: scaleY(1); }
  to { transform: scaleY(0.35); }
`;

const Passaro = styled.svg`
  position: absolute;
  left: -8%;
  top: ${({ $y }) => $y}%;
  width: ${({ $tamanho }) => $tamanho}px;
  height: auto;
  overflow: visible;
  animation: ${atravessarCeu} ${({ $duracao }) => $duracao}s linear
    ${({ $atraso }) => $atraso}s infinite;

  path {
    transform-origin: center;
    animation: ${baterAsas} ${({ $asas }) => $asas}s ease-in-out infinite
      alternate;
  }
`;

export function Passaros({
  cor = '#6B4A2E',
  quantidade = 7,
  semente = 4,
  faixa = 46,
}) {
  const bando = useMemo(() => {
    const r = sorteio(semente);
    // o bando sai junto (atrasos próximos) e volta a cada ~26 segundos
    return Array.from({ length: quantidade }, (_, i) => ({
      id: i,
      y: 6 + r() * faixa,
      tamanho: 14 + r() * 12,
      duracao: 16 + r() * 5,
      atraso: -2 + i * 0.7 + r() * 0.8,
      asas: 0.32 + r() * 0.2,
    }));
  }, [quantidade, semente, faixa]);
  return (
    <Camada aria-hidden="true">
      {bando.map(p => (
        <Passaro
          key={p.id}
          viewBox="0 0 24 10"
          $y={p.y}
          $tamanho={p.tamanho}
          $duracao={p.duracao + 10}
          $atraso={p.atraso}
          $asas={p.asas}
        >
          <path
            d="M1 7 Q6 0 12 6 Q18 0 23 7"
            stroke={cor}
            strokeWidth="1.7"
            strokeLinecap="round"
            fill="none"
          />
        </Passaro>
      ))}
    </Camada>
  );
}

/* ---------------- Estrelas (Nossa Senhora) ---------------- */

const cintilar = keyframes`
  0%, 100% { opacity: 0.25; transform: scale(0.75); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const Estrela = styled.svg`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: ${({ $tamanho }) => $tamanho}px;
  height: auto;
  animation: ${cintilar} ${({ $duracao }) => $duracao}s ease-in-out
    ${({ $atraso }) => $atraso}s infinite;
`;

/** Doze estrelinhas piscando devagar (a coroa de doze estrelas, Apocalipse 12,1) */
export function Estrelas({ cor = '#E3C77A', semente = 12, quantidade = 12 }) {
  const estrelas = useMemo(() => {
    const r = sorteio(semente);
    return Array.from({ length: quantidade }, (_, i) => ({
      id: i,
      x: r() * 94 + 3,
      y: r() * 80 + 4,
      tamanho: 7 + r() * 8,
      duracao: 2.4 + r() * 3,
      atraso: -r() * 4,
    }));
  }, [semente, quantidade]);
  return (
    <Camada aria-hidden="true">
      {estrelas.map(e => (
        <Estrela
          key={e.id}
          viewBox="0 0 24 24"
          $x={e.x}
          $y={e.y}
          $tamanho={e.tamanho}
          $duracao={e.duracao}
          $atraso={e.atraso}
        >
          <path
            d="M12 1 L14.6 9.4 L23 12 L14.6 14.6 L12 23 L9.4 14.6 L1 12 L9.4 9.4 Z"
            fill={cor}
          />
        </Estrela>
      ))}
    </Camada>
  );
}
