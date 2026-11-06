import React from 'react';
import styled from 'styled-components';
import { tempoLiturgico, TEMPOS } from '../services/anoLiturgico';

// A folhinha do dia, como as de parede: papel, faixa na cor litúrgica,
// o número grande do dia, a celebração e a leitura do Evangelho.

const Folha = styled.article`
  position: relative;
  width: 100%;
  max-width: 340px;
  justify-self: center;
  padding: 34px 26px 26px;
  background: #fbf8f1;
  color: #1f2430;
  text-align: center;
  border-top: 10px solid ${({ $cor }) => $cor};

  /* os dois furos de pendurar */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${({ $fundo }) => $fundo};
  }

  &::before {
    left: calc(50% - 30px);
  }

  &::after {
    right: calc(50% - 30px);
  }
`;

const Mes = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.15rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.12em;
  color: #6a5a3a;
`;

// algarismos alinhados: os de estilo antigo do Cormorant (3, 4, 5, 7, 9) desciam sobre o dia da semana
const Numero = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 600;
  font-size: clamp(5.5rem, 26vw, 7.5rem);
  font-variant-numeric: lining-nums;
  line-height: 0.95;
  margin-bottom: 6px;
  color: #14284b;
`;

const Semana = styled.p`
  font-size: 1.15rem;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
`;

const Filete = styled.hr`
  border: none;
  height: 1px;
  background: #ddd5c4;
  margin: 0 auto 16px;
  width: 70%;
`;

const Celebracao = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.2;
  color: #14284b;
  margin-bottom: 10px;
`;

const Detalhe = styled.p`
  font-size: 0.98rem;
  line-height: 1.5;
  color: #5e6370;

  i {
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin-right: 6px;
    background: ${({ $cor }) => $cor};
  }
`;

// `titulo` é o nome do dia calculado no próprio site, usado enquanto a API não responde
const Folhinha = ({ dia, liturgia, cor, fundo, titulo }) => {
  const t = tempoLiturgico(dia);
  const tempo = TEMPOS[t.tempo];
  const mes = dia.toLocaleDateString('pt-BR', { month: 'long' });
  const semana = dia.toLocaleDateString('pt-BR', { weekday: 'long' });
  const evangelho = liturgia?.leituras.evangelho[0]?.referencia;

  return (
    <Folha
      $cor={cor.hex || tempo.hex}
      $fundo={fundo}
      aria-label={`Folhinha de ${dia.toLocaleDateString('pt-BR')}`}
    >
      <Mes>
        {mes} · {dia.getFullYear()}
      </Mes>
      <Numero>{dia.getDate()}</Numero>
      <Semana>{semana}</Semana>
      <Filete />
      <Celebracao>
        {liturgia ? liturgia.titulo : titulo || tempo.nome}
      </Celebracao>
      <Detalhe $cor={cor.hex || tempo.hex}>
        <i aria-hidden="true" />
        {cor.nome || tempo.cor} · {tempo.nome}, ano {t.ciclo}
      </Detalhe>
      {evangelho && <Detalhe>Evangelho: {evangelho}</Detalhe>}
    </Folha>
  );
};

export default Folhinha;
