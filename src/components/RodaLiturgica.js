import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  proximasCelebracoes,
  segmentosDoAno,
  tempoLiturgico,
  TEMPOS,
  diasEntre,
} from '../services/anoLiturgico';

// Roda do ano litúrgico: cada tempo ocupa o arco proporcional aos seus dias,
// com a cor litúrgica, e um marcador mostra onde está o dia de hoje.

const RAIO = 92;
const CENTRO = 120;

function ponto(angulo, raio = RAIO) {
  const rad = ((angulo - 90) * Math.PI) / 180;
  return [CENTRO + raio * Math.cos(rad), CENTRO + raio * Math.sin(rad)];
}

function arco(inicio, fim) {
  const [x1, y1] = ponto(inicio);
  const [x2, y2] = ponto(fim);
  const grande = fim - inicio > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${RAIO} ${RAIO} 0 ${grande} 1 ${x2} ${y2}`;
}

const Caixa = styled.div`
  display: grid;
  gap: 24px;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    grid-template-columns: 280px 1fr;
    padding: 28px;
    gap: 36px;
  }
`;

const Roda = styled.svg`
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  display: block;
`;

const Texto = styled.div`
  small {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.02rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: ${({ $cor }) => $cor};
    margin-bottom: 6px;
  }

  h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.4rem, 5vw, 1.8rem);
    color: ${({ theme }) => theme.colors.titleColor};
    margin-bottom: 10px;
  }

  > p {
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 16px;
  }
`;

const Ciclos = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 18px;

  div {
    padding: 10px;
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.background};
    text-align: center;
  }

  dt {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  dd {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

const Proximas = styled.ol`
  list-style: none;
  display: grid;
  gap: 8px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.92rem;
  }

  time {
    flex-shrink: 0;
    min-width: 64px;
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.secondary};
  }

  span {
    flex: 1;
    color: ${({ theme }) => theme.colors.text};
  }

  em {
    font-style: normal;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    white-space: nowrap;
  }
`;

const Legenda = styled.p`
  margin-top: 14px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const faltaTexto = n =>
  n === 0 ? 'hoje' : n === 1 ? 'amanhã' : `em ${n} dias`;

const RodaLiturgica = ({ dia, mostrarProximas = true }) => {
  const hoje = useMemo(() => dia || new Date(), [dia]);
  const atual = tempoLiturgico(hoje);
  const info = TEMPOS[atual.tempo];
  const trechos = segmentosDoAno(hoje);
  const total = trechos.reduce((soma, t) => soma + t.dias, 0);
  const proximas = mostrarProximas ? proximasCelebracoes(hoje, 4) : [];

  let acumulado = 0;
  const arcos = trechos.map(t => {
    const inicio = (acumulado / total) * 360;
    acumulado += t.dias;
    return { ...t, inicio, fim: (acumulado / total) * 360 };
  });
  const anguloHoje = ((diasEntre(trechos[0].inicio, hoje) + 0.5) / total) * 360;
  const [mx, my] = ponto(anguloHoje);
  const semana =
    atual.semana === null
      ? ''
      : atual.semana === 0
        ? 'Depois das Cinzas'
        : `${atual.semana}ª semana`;

  return (
    <Caixa>
      <Roda
        viewBox="0 0 240 240"
        role="img"
        aria-label={`Ano litúrgico: hoje é ${info.nome}`}
      >
        <circle
          cx={CENTRO}
          cy={CENTRO}
          r={RAIO}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="24"
        />
        {arcos.map((a, i) => (
          <path
            key={i}
            d={arco(a.inicio + 0.8, a.fim - 0.8)}
            fill="none"
            stroke={TEMPOS[a.tempo].hex}
            strokeWidth={a.tempo === atual.tempo ? 24 : 18}
            strokeLinecap="butt"
            opacity={a.tempo === atual.tempo ? 1 : 0.55}
          />
        ))}
        <circle
          cx={mx}
          cy={my}
          r="9"
          fill="#fff"
          stroke={info.hex}
          strokeWidth="4"
        />
        <text
          x={CENTRO}
          y={CENTRO - 6}
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={info.hex}
          fontFamily="Inter, sans-serif"
        >
          {info.nome}
        </text>
        <text
          x={CENTRO}
          y={CENTRO + 14}
          textAnchor="middle"
          fontSize="12"
          fill="currentColor"
          opacity="0.7"
          fontFamily="Inter, sans-serif"
        >
          {semana || `Ano ${atual.ciclo}`}
        </text>
      </Roda>

      <Texto $cor={info.hex}>
        <small>Hoje no ano litúrgico</small>
        <h3>
          {info.nome}
          {semana ? `, ${semana.toLowerCase()}` : ''}
        </h3>
        <p>{info.texto}</p>
        <Ciclos>
          <div>
            <dt>Cor</dt>
            <dd style={{ color: info.hex }}>{info.cor}</dd>
          </div>
          <div>
            <dt>Domingos</dt>
            <dd>Ano {atual.ciclo}</dd>
          </div>
          <div>
            <dt>Dias de semana</dt>
            <dd>Ano {atual.ferial}</dd>
          </div>
        </Ciclos>
        {proximas.length > 0 && (
          <Proximas aria-label="Próximas celebrações">
            {proximas.map(p => (
              <li key={p.nome + p.data.getTime()}>
                <time dateTime={p.data.toISOString().slice(0, 10)}>
                  {p.data
                    .toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'short',
                    })
                    .replace('.', '')}
                </time>
                <span>{p.nome}</span>
                <em>{faltaTexto(p.faltam)}</em>
              </li>
            ))}
          </Proximas>
        )}
        <Legenda>
          Os domingos seguem um ciclo de três anos (A, B e C) com os Evangelhos
          de Mateus, Marcos e Lucas. Os dias de semana alternam os anos I e II.
        </Legenda>
      </Texto>
    </Caixa>
  );
};

export default RodaLiturgica;
