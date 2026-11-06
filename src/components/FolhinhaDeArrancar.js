import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';
import Folhinha from './Folhinha';
import { CORES, chave, diaLiturgico } from '../services/calendarioLiturgico';

// O bloquinho de parede da home: a folha de hoje em cima de outras.
// Tocar na folha (ou puxar com o dedo, ou o botão) arranca a folha e mostra o dia seguinte,
// até uma semana à frente. Depois volta para hoje.

const MAXIMO_DIAS = 6;
const DURACAO_MS = 720;

// a folha fica inteira (opaca) quase até o fim da queda, para não misturar com a de baixo
const arrancar = keyframes`
  0% { transform: none; opacity: 1; }
  22% { transform: rotate(-3deg) translate(-4px, 8px); opacity: 1; }
  78% { opacity: 1; }
  100% { transform: rotate(16deg) translate(60px, 115%); opacity: 0; }
`;

const Pilha = styled.div`
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  /* as folhas de baixo do bloquinho */
  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 10px 0 -8px 0;
    background: #f1eadb;
    border: 1px solid #e1d7c2;
  }

  &::before {
    transform: rotate(2.2deg);
  }

  &::after {
    inset: 16px 2px -12px 2px;
    background: #ebe2cf;
    transform: rotate(-2.6deg);
    z-index: -1;
  }

  article {
    max-width: none;
    outline: 1px solid #e1d7c2;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 6px;
  }
`;

const Folha = styled.div`
  position: relative;
  z-index: 1;
`;

// a folha arrancada cai por cima da próxima, girando a partir do canto de cima
const Caindo = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  transform-origin: 90% 0;
  animation: ${arrancar} ${DURACAO_MS}ms cubic-bezier(0.5, 0, 0.75, 0.4)
    forwards;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Controles = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 16px;
  margin-top: 22px;
  font-size: 0.98rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  button,
  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 40px;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.borderColor};
    text-underline-offset: 4px;
  }

  button:hover,
  a:hover {
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

const somarDias = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

const FolhinhaDeArrancar = ({ hoje, liturgia, cor, titulo, fundo }) => {
  const [avanco, setAvanco] = useState(0);
  const [caindo, setCaindo] = useState(null);
  const toque = useRef(null);
  const temporizador = useRef(null);

  // as folhas que não são de hoje usam o calendário calculado no site
  const folha = n => {
    const dia = somarDias(hoje, n);
    if (n === 0) return { dia, liturgia, cor, titulo };
    const info = diaLiturgico(dia);
    return { dia, liturgia: null, cor: CORES[info.cor], titulo: info.titulo };
  };

  const proxima = () => {
    if (caindo !== null) return;
    const fim = avanco >= MAXIMO_DIAS;
    setCaindo(avanco);
    setAvanco(fim ? 0 : avanco + 1);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setCaindo(null), DURACAO_MS);
    if (
      navigator.vibrate &&
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      navigator.vibrate(8);
    }
  };

  const teclar = evento => {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      proxima();
    }
  };

  // puxar a folha para baixo ou para o lado também arranca
  const inicioDoToque = evento => {
    const t = evento.touches[0];
    toque.current = { x: t.clientX, y: t.clientY };
  };
  const fimDoToque = evento => {
    if (!toque.current) return;
    const t = evento.changedTouches[0];
    const distancia = Math.hypot(
      t.clientX - toque.current.x,
      t.clientY - toque.current.y
    );
    toque.current = null;
    if (distancia > 50) proxima();
  };

  const atual = folha(avanco);
  const arrancada = caindo !== null ? folha(caindo) : null;
  const dataLonga = atual.dia.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <Pilha
        role="button"
        tabIndex={0}
        aria-label={
          avanco >= MAXIMO_DIAS
            ? 'Voltar para a folha de hoje'
            : `Arrancar a folha e ver ${avanco === 0 ? 'amanhã' : 'o dia seguinte'}`
        }
        onClick={proxima}
        onKeyDown={teclar}
        onTouchStart={inicioDoToque}
        onTouchEnd={fimDoToque}
      >
        <Folha aria-live="polite">
          <Folhinha
            dia={atual.dia}
            liturgia={atual.liturgia}
            cor={atual.cor}
            titulo={atual.titulo}
            fundo={fundo}
          />
        </Folha>
        {arrancada && (
          <Caindo key={caindo} aria-hidden="true">
            <Folhinha
              dia={arrancada.dia}
              liturgia={arrancada.liturgia}
              cor={arrancada.cor}
              titulo={arrancada.titulo}
              fundo={fundo}
            />
          </Caindo>
        )}
      </Pilha>

      <Controles>
        {avanco === 0 ? (
          <span>Toque na folha para ver amanhã</span>
        ) : (
          <>
            <Link to={`/liturgia-diaria?data=${chave(atual.dia)}`}>
              Liturgia de {dataLonga} <PiArrowRight aria-hidden="true" />
            </Link>
            <button type="button" onClick={() => setAvanco(0)}>
              Voltar para hoje
            </button>
          </>
        )}
      </Controles>
    </div>
  );
};

export default FolhinhaDeArrancar;
