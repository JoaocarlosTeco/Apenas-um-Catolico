import React from 'react';
import styled from 'styled-components';
import { useDeviceType } from '../../hooks/useDeviceType';
import SEO from '../../components/SEO';
import HeroSection from './HeroSection';
import LaudesLiturgiaSection from './LaudesLiturgiaSection';
import BiblicalSection from './BiblicalSection';
import SantosSection from './SantosSection';
import ResourcesSection from './ResourcesSection';

const HomeContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;

const ContentSection = styled.section<{ isMobile: boolean }>`
  padding: ${props => props.isMobile ? '40px 16px' : '80px 24px'};
  max-width: 1200px;
  margin: 0 auto;
`;

const Home: React.FC = () => {
  const { isMobile } = useDeviceType();

  return (
    <HomeContainer>
      <SEO
        title="Início - Apenas um Católico"
        description="Site católico dedicado à evangelização e devoção aos santos. Acompanhe as Laudes, Liturgia Diária e fortaleça sua fé com Jesus Cristo."
        keywords="católico, santos, orações, evangelização, fé, devoção, Jesus Cristo, laudes, liturgia diária, oração"
        url="https://joaocarlosteco.github.io/Apenas-um-Catolico"
      />

      <HeroSection />
      
      <LaudesLiturgiaSection />

      <ContentSection isMobile={isMobile}>
        <BiblicalSection />
        <SantosSection />
        <ResourcesSection />
      </ContentSection>
    </HomeContainer>
  );
};

export default Home;
