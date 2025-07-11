import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../components/useDeviceType';
import SEO from '../components/SEO';
import HeroSection from './Home/HeroSection';
import LaudesLiturgiaSection from './Home/LaudesLiturgiaSection';
import BiblicalSection from './Home/BiblicalSection';
import SantosSection from './Home/SantosSection';
import ResourcesSection from './Home/ResourcesSection';

const HomeContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;

const ContentSection = styled.section`
  padding: ${props => props.isMobile ? '20px 0' : '40px 0'};
  max-width: 1200px;
  margin: 0 auto;
`;

const Home = () => {
  const { isMobile } = useDeviceType();

  return (
    <HomeContainer>
      <SEO
        title="Início - Apenas um Católico"
        description="Site católico dedicado à evangelização e devoção aos santos. Acompanhe as Laudes, Liturgia Diária e fortaleça sua fé com Jesus Cristo."
        keywords="católico, santos, orações, evangelização, fé, devoção, Jesus Cristo, laudes, liturgia diária, oração"
        url="https://apenas-um-catolico.vercel.app/"
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