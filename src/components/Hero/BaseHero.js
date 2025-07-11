import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BaseHeroSection = styled.section`
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colors?.primary || '#1B3358'};
`;

export const BaseHeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  opacity: 0;
  animation: fadeIn 1s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const BaseHeroText = styled.div`
  h1 {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-weight: 700;
  }

  p {
    color: white;
    opacity: 0.9;
  }
`;

const BaseHero = ({ children }) => {
  return (
    <BaseHeroSection>
      <BaseHeroContent>
        <BaseHeroText>
          {children}
        </BaseHeroText>
      </BaseHeroContent>
    </BaseHeroSection>
  );
};

export default BaseHero; 