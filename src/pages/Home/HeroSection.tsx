import React from 'react';
import { getLogoPath } from '../../utils/imageUtils';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  position: relative;
  min-height: 70vh;
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
    background: radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(232, 213, 181, 0.1) 0%, transparent 50%);
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 60vh;
    margin-top: 65px;
    padding: 60px 20px;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 1000px;
  width: 100%;
  text-align: center;
  padding: 0 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 20px;
  }
`;

const HeroText = styled.div`
  h1 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: clamp(40px, 10vw, 84px);
    color: white;
    margin-bottom: 24px;
    line-height: 1.05;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  p {
    font-family: ${props => props.theme.fonts.sacred};
    font-size: clamp(20px, 4vw, 32px);
    color: ${props => props.theme.colors.accent};
    margin-bottom: 40px;
    line-height: 1.4;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    font-style: italic;
    font-weight: 400;
  }

  .verse-reference {
    font-size: clamp(14px, 2vw, 18px);
    color: rgba(255, 255, 255, 0.85);
    margin-top: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const Logo = styled(motion.img)`
  width: 100%;
  max-width: 320px;
  height: auto;
  margin-bottom: 32px;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 240px;
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
  opacity: 0.4;
`;

const FloatingCross = styled(motion.div)`
  position: absolute;
  color: rgba(255, 255, 255, 0.15);
  font-size: 180px;
  font-weight: 200;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 100px;
  }
`;

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <CatholicSymbols>
        <FloatingCross
          initial={{ top: '10%', left: '-5%', opacity: 0, rotate: -20 }}
          animate={{ top: '15%', left: '5%', opacity: 0.15, rotate: -10 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          ✝
        </FloatingCross>
        <FloatingCross
          initial={{ bottom: '5%', right: '-5%', opacity: 0, rotate: 20 }}
          animate={{ bottom: '10%', right: '8%', opacity: 0.15, rotate: 15 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        >
          ✝
        </FloatingCross>
      </CatholicSymbols>
      
      <HeroContent
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Logo 
          src={getLogoPath("Logo tipo apenas um catolico.png")} 
          alt="Apenas um Católico"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        />
        <HeroText>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Jesus Cristo:<br />Nosso Senhor e Salvador
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            "Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim."
          </motion.p>
          <motion.div 
            className="verse-reference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            João 14,6
          </motion.div>
        </HeroText>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
