import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 20px 100px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 40px 15px 60px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 7vw, 3.5rem);
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  font-weight: 800;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${props => props.theme.colors.secondary};
    border-radius: 2px;
  }
`;

const IntroText = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  text-align: center;
  max-width: 700px;
  margin: 2rem auto 0;
  
  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 5rem;
`;

const InfoCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid ${props => props.theme.colors.secondary}15;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    font-weight: 700;
  }

  p {
    line-height: 1.7;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.05rem;
  }
`;

const ContactSection = styled.div`
  margin-top: 6rem;
  text-align: center;
  background: ${props => props.theme.colors.background};
  padding: 4rem;
  border-radius: 20px;
  border: 1px dashed ${props => props.theme.colors.secondary}40;

  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }

  p {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 2rem;
  }

  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    font-weight: 700;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;

  a {
    background: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    box-shadow: ${props => props.theme.shadows.soft};
    border: 1px solid ${props => props.theme.colors.secondary}20;
    
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
      text-decoration: none;
    }
  }
`;

const Sobre: React.FC = () => (
  <Container>
    <SEO
      title="Sobre o Projeto - Apenas um Católico"
      description="Conheça a missão, visão e o propósito por trás do projeto Apenas um Católico. Dedicado à evangelização e crescimento espiritual."
      keywords="sobre, missão católico, evangelização, católico online, projeto católico"
      url="https://joaocarlosteco.github.io/Apenas-um-Catolico/sobre"
    />
    
    <Header>
      <Title>Sobre o Projeto</Title>
      <IntroText>
        <strong>Apenas um Católico</strong> nasceu do desejo de compartilhar a beleza da fé católica de uma 
        forma contemporânea, autêntica e acessível a todos que buscam a Deus.
      </IntroText>
    </Header>

    <ContentGrid>
      <InfoCard
        initial={{ opacity: 0, x: -30 }} // Fixed special character
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2>Missão</h2>
        <p>
          Compartilhar a riqueza da Tradição Católica, a vida dos santos e a beleza da liturgia, 
          ajudando cada fiel a aprofundar seu relacionamento pessoal com Jesus Cristo através 
          da Igreja.
        </p>
      </InfoCard>

      <InfoCard
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2>Visão</h2>
        <p>
          Ser um porto seguro de espiritualidade na internet, oferecendo conteúdos que nutram a alma, 
          instruam a mente e inspirem o coração a buscar a santidade no cotidiano.
        </p>
      </InfoCard>
    </ContentGrid>

    <ContactSection>
      <h2>Fale Conosco</h2>
      <p>
        Dúvidas, sugestões de conteúdo ou apenas quer partilhar um testemunho? 
        Estamos prontos para ouvir você.
      </p>
      
      <p>
        E-mail: <a href="mailto:contato@apenasumcatolico.com">contato@apenasumcatolico.com</a>
      </p>

      <SocialLinks>
        <a href="https://www.instagram.com/joaocarlostdm/?hl=pt-br" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </SocialLinks>
    </ContactSection>

    <p style={{ textAlign: 'center', marginTop: '4rem', fontStyle: 'italic', color: '#666' }}>
      Que a Virgem Maria interceda por nossa jornada!
    </p>
  </Container>
);

export default Sobre;
