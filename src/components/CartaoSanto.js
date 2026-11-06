import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';

// Cor do santo mais clara no tema escuro, para continuar legível
const tom = (theme, cor) =>
  theme.modo === 'escuro' ? `color-mix(in srgb, ${cor} 55%, white)` : cor;

const Cartao = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  color: ${({ theme }) => theme.colors.text};
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    color: ${({ theme }) => theme.colors.text};
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover,
    &:hover img {
      transform: none;
    }
  }
`;

const Foto = styled.div`
  position: relative;
  aspect-ratio: ${({ $compacto }) => ($compacto ? '3 / 4' : '4 / 3')};
  overflow: hidden;
  background: ${({ $cor }) => $cor};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${({ $posicao }) => $posicao || 'center'};
    transition: transform 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background: ${({ $cor }) => $cor};
  }
`;

const Texto = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${({ $compacto }) => ($compacto ? '12px' : '20px')};

  small {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.02rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: ${({ theme, $cor }) => tom(theme, $cor)};
    margin-bottom: 6px;
  }

  h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: ${({ theme }) => theme.colors.titleColor};
    line-height: 1.25;
    ${({ $compacto }) =>
      $compacto
        ? css`
            font-size: 1rem;
          `
        : css`
            font-size: 1.3rem;
            margin-bottom: 8px;
          `}
  }

  p {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    font-weight: 600;
    font-size: 0.9rem;
    color: ${({ theme, $cor }) => tom(theme, $cor)};
  }
`;

const CartaoSanto = ({ santo, compacto = false }) => (
  <Cartao to={`/santos/${santo.slug}`}>
    <Foto
      $cor={santo.cores.principal}
      $posicao={santo.posicaoImagem}
      $compacto={compacto}
    >
      <img src={santo.imagem} alt="" loading="lazy" />
    </Foto>
    <Texto $cor={santo.cores.principal} $compacto={compacto}>
      <small>Festa · {santo.festa.split(',')[0]}</small>
      <h3>{santo.nome}</h3>
      {!compacto && (
        <>
          <p>{santo.resumo}</p>
          <span>
            Conhecer a história <PiArrowRight aria-hidden="true" />
          </span>
        </>
      )}
    </Texto>
  </Cartao>
);

export default CartaoSanto;
