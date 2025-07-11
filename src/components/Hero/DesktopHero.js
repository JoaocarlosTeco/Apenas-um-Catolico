import React from 'react';
import { getHeroImagePath } from '../../utils/imageUtils';
import styled from 'styled-components';
import { BaseHeroSection, BaseHeroContent, BaseHeroText } from './BaseHero';
import { desktopStyles } from '../../styles/theme';

const DesktopHeroSection = styled(BaseHeroSection)`
  height: 70vh;
  min-height: 500px;
  position: relative;
  overflow: hidden;
  background-image: url(${props => getHeroImagePath('clouds-bg.png')});
  background-size: cover;
  background-position: center;
  margin-top: -80px;
  padding-top: 80px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(27, 51, 88, 0.95) 0%,
      rgba(27, 51, 88, 0.8) 50%,
      rgba(27, 51, 88, 0.6) 100%
    );
  }
`;

const DesktopHeroContent = styled(BaseHeroContent)`
  padding: ${desktopStyles.spacing.xl} ${desktopStyles.spacing.xxl};
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  height: calc(70vh - 80px);
  gap: ${desktopStyles.spacing.xl};
`;

const HeroTextContent = styled(BaseHeroText)`
  text-align: left;
  padding-left: ${desktopStyles.spacing.xxl};
  z-index: 2;

  h1 {
    font-size: 72px;
    margin-bottom: ${desktopStyles.spacing.lg};
    line-height: 1.2;
    font-weight: 700;
  }

  p {
    font-size: 24px;
    margin-bottom: ${desktopStyles.spacing.xl};
    line-height: 1.6;
    max-width: 600px;
    opacity: 0.9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${desktopStyles.spacing.md};
  margin-top: ${desktopStyles.spacing.xl};
  z-index: 2;
`;

const Button = styled.button`
  padding: ${desktopStyles.spacing.md} ${desktopStyles.spacing.xl};
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 200px;

  &.primary {
    background-color: ${desktopStyles.colors.secondary};
    color: white;
    border: none;
    box-shadow: 0 4px 15px rgba(192, 149, 83, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(192, 149, 83, 0.4);
      background-color: #d4aa62;
    }
  }

  &.secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${desktopStyles.spacing.xl};

  img {
    height: 90%;
    max-height: 800px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.2));
    margin-right: -2%;
  }
`;

const DesktopHero = ({ title, subtitle }) => {
  return (
    <DesktopHeroSection>
      <DesktopHeroContent>
        <HeroTextContent>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <ButtonContainer>
            <Button className="primary">Começar Agora</Button>
            <Button className="secondary">Saiba Mais</Button>
          </ButtonContainer>
        </HeroTextContent>
        <ImageContainer>
          <img src={getHeroImagePath('hero-jesus.png')} alt="Jesus Cristo" />
        </ImageContainer>
      </DesktopHeroContent>
    </DesktopHeroSection>
  );
};

export default DesktopHero; 