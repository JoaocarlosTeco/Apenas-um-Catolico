import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 104px 16px 72px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 128px 16px 96px;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.titleColor};
  font-size: clamp(2.2rem, 8vw, 3rem);
  line-height: 1.1;

  &::after {
    content: '';
    display: block;
    width: 44px;
    height: 1px;
    margin: 22px auto 0;
    background: ${({ theme }) => theme.colors.gold};
  }
`;

const Text = styled.p`
  margin: 22px 0 32px;
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 22px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.primary} 85%, black)`};
  }
`;

const NaoEncontrada = () => (
  <Container>
    <Helmet>
      <title>Página não encontrada - Apenas um Católico</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <Title>Página não encontrada</Title>
    <Text>O endereço que você abriu não existe ou mudou de lugar.</Text>
    <HomeLink to="/">Voltar para o início</HomeLink>
  </Container>
);

export default NaoEncontrada;
