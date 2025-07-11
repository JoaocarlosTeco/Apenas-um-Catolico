import React from 'react';
import { getLogoPath } from '../../utils/imageUtils';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  position: relative;
  min-height: 65vh;
  margin-top: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #1B3358 0%,
    #2E5984 25%,
    #4B7BE5 50%,
    #2E5984 75%,
    #1B3358 100%
  );
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    z-index: 1;
  }

  &::after {
    content: '✝';
    position: absolute;
    top: 15%;
    right: 10%;
    font-size: 120px;
    color: rgba(255, 255, 255, 0.08);
    z-index: 1;
    font-weight: 300;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 55vh;
    margin-top: 65px;
    padding: 60px 20px;
    
    &::after {
      font-size: 80px;
      top: 10%;
      right: 5%;
    }
  }

  @media (max-width: 480px) {
    min-height: 45vh;
    
    &::after {
      font-size: 60px;
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1000px;
  width: 100%;
  text-align: center;
  padding: 0 24px;
  opacity: 0;
  animation: fadeIn 1.5s ease forwards;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 20px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: clamp(32px, 8vw, 64px);
    color: white;
    margin-bottom: 32px;
    line-height: 1.2;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  p {
    font-size: clamp(18px, 3vw, 24px);
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 40px;
    line-height: 1.6;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    font-style: italic;
  }

  .verse-reference {
    font-size: clamp(14px, 2vw, 16px);
    color: rgba(255, 255, 255, 0.8);
    margin-top: 16px;
    font-weight: 500;
  }
`;

const Logo = styled.img`
  width: 100%;
  max-width: 320px;
  height: auto;
  margin-bottom: 40px;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.6));
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 250px;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    max-width: 200px;
    margin-bottom: 24px;
  }
`;

const CatholicSymbols = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  
  &::before,
  &::after {
    content: '✝';
    position: absolute;
    color: rgba(255, 255, 255, 0.06);
    font-size: 200px;
    font-weight: 200;
  }
  
  &::before {
    top: 20%;
    left: 5%;
    transform: rotate(-15deg);
  }
  
  &::after {
    bottom: 20%;
    right: 8%;
    transform: rotate(15deg);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &::before,
    &::after {
      font-size: 120px;
    }
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <CatholicSymbols />
      <HeroContent>
        <Logo src={getLogoPath("Logo tipo apenas um catolico.png")} alt="Apenas um Católico" />
        <HeroText>
          <h1>Jesus Cristo:<br />Nosso Senhor e Salvador</h1>
          <p>"Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim."</p>
          <div className="verse-reference">João 14:6</div>
        </HeroText>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection; 