import React from 'react';
import { getHeroImagePath } from '../../utils/imageUtils';
import styled from 'styled-components';
import { BaseHeroSection, BaseHeroContent, BaseHeroText } from './BaseHero';
import { mobileStyles } from '../../styles/theme';

const MobileHeroSection = styled(BaseHeroSection)`
  height: 60vh;
  min-height: 400px;
  background-image: url(${props => getHeroImagePath('hero-jesus.png')});
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(27, 51, 88, 0.7);
  }
`;

const MobileHeroContent = styled(BaseHeroContent)`
  padding: ${mobileStyles.spacing.xl} ${mobileStyles.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;

  h1 {
    font-size: ${mobileStyles.typography.hero.title};
    margin-bottom: ${mobileStyles.spacing.md};
  }

  p {
    font-size: ${mobileStyles.typography.hero.subtitle};
    line-height: 1.5;
    padding: 0 ${mobileStyles.spacing.sm};
    margin-bottom: ${mobileStyles.spacing.lg};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${mobileStyles.spacing.md};
  width: 100%;
  max-width: 300px;
  margin-top: ${mobileStyles.spacing.lg};
`;

const Button = styled.button`
  padding: ${mobileStyles.spacing.md};
  border-radius: 8px;
  font-size: ${mobileStyles.typography.body.normal};
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;

  &.primary {
    background-color: ${mobileStyles.colors.secondary};
    color: white;
    border: none;

    &:hover {
      opacity: 0.9;
    }
  }

  &.secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const MobileHero = ({ title, subtitle }) => {
  return (
    <MobileHeroSection>
      <MobileHeroContent>
        <BaseHeroText>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <ButtonContainer>
            <Button className="primary">Começar Agora</Button>
            <Button className="secondary">Saiba Mais</Button>
          </ButtonContainer>
        </BaseHeroText>
      </MobileHeroContent>
    </MobileHeroSection>
  );
};

export default MobileHero; 