import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiX, FiHeart, FiBookOpen } from 'react-icons/fi';

const HomeContainer = styled.div`
  /* Container para layout desktop */
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  overflow: hidden;
  background-image: url('/images/heroes/hero-jesus.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

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

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 660px;
  width: 100%;
  text-align: center;
  padding: 0 13px;
  opacity: 0;
  animation: fadeIn 1s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(13px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 34px;
    color: white;
    margin-bottom: 11px;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-weight: 700;
  }

  p {
    font-size: 13px;
    color: white;
    margin-bottom: 16px;
    line-height: 1.5;
    opacity: 0.9;
    max-width: 462px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ContentSection = styled.section`
  padding: 48px 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  padding: 48px 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease forwards;
  animation-delay: ${props => props.delay || '0s'};

  @keyframes fadeInUp {
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

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 32px;
  font-size: clamp(2rem, 5vw, 3rem);
  color: #1B3358;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #C09553;
    border-radius: 2px;
  }
`;

const SectionParagraph = styled(motion.p)`
  text-align: center; 
  font-size: 1.2rem; 
  max-width: 800px; 
  margin: -1.5rem auto 2rem auto;
  color: #718096;
  line-height: 1.8;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  gap: 16px;
  
  .line {
    flex: 1;
    max-width: 200px;
    height: 2px;
    background: #C09553;
    opacity: 0.5;
  }
  
  .cross {
    color: #C09553;
    font-size: 2rem;
  }
`;

const Versiculo = styled(motion.div)`
  background: linear-gradient(135deg, #1B3358, #4B7BE5);
  color: white;
  padding: 32px;
  border-radius: 15px;
  text-align: center;
  margin: 32px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(0);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  p {
    font-size: 1.4rem;
    font-style: italic;
    margin-bottom: 16px;
    color: white;
    line-height: 1.8;
  }
  
  a {
    color: #C09553;
    font-weight: 600;
    
    &:hover {
      color: white;
    }
  }
`;

const SantosGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 32px;
`;

const SantoCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);

    img {
      transform: scale(1.05);
    }

    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(27, 51, 88, 0) 0%,
      rgba(27, 51, 88, 0.8) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const SantoImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 3px solid #C09553;
  transition: transform 0.3s ease;
`;

const SantoInfo = styled.div`
  padding: 24px;
  text-align: center;
  position: relative;
  z-index: 2;
  background: white;
  
  h3 {
    color: #1B3358;
    margin-bottom: 8px;
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }
  
  p {
    color: #718096;
    font-size: 1rem;
    transition: color 0.3s ease;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 32px;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 32px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    font-size: 3rem;
    color: #C09553;
    margin-bottom: 24px;
  }
  
  h3 {
    color: #1B3358;
    margin-bottom: 16px;
    font-size: 1.5rem;
  }
  
  p {
    color: #718096;
    line-height: 1.8;
    font-size: 1.1rem;
  }
`;

const DesktopLayout = () => {
  const santos = [
    {
      id: 4,
      name: 'São Francisco de Assis',
      image: '/images/santos/São franciso.jpg',
      description: 'Padroeiro dos animais e da ecologia',
      link: '/santos/sao-francisco'
    },
    {
      id: 2,
      name: 'Santa Teresinha',
      image: '/images/santos/Santa terezinha.jpg',
      description: 'Doutora da Igreja e padroeira das missões'
    },
    {
      id: 3,
      name: 'São Padre Pio',
      image: '/images/santos/Padre-Pio.webp',
      description: 'Padre estigmatizado e confessor'
    },
    {
      id: 1,
      name: 'Nossa Senhora',
      image: '/images/santos/Nossa senhora.webp',
      description: 'Mãe de Jesus e nossa intercessora'
    }
  ];

  const features = [
    {
      icon: <FiX />,
      title: 'Orações Diárias',
      description: 'Acesse orações tradicionais e contemporâneas para fortalecer sua fé diariamente.'
    },
    {
      icon: <FiBookOpen />,
      title: 'Histórias dos Santos',
      description: 'Conheça a vida e os milagres dos santos que nos inspiram a seguir Cristo.'
    },
    {
      icon: <FiHeart />,
      title: 'Reflexões Espirituais',
      description: 'Meditações e reflexões para aprofundar sua vida espiritual.'
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <h1>Jesus:<br />Nosso Senhor e Salvador</h1>
            <p>"Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim."</p>
          </HeroText>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            O que a Bíblia diz sobre imagens?
          </SectionTitle>
          <SectionParagraph
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
             As imagens nos ajudam a lembrar das obras de Deus e dos santos que seguiram a Cristo.
          </SectionParagraph>
          <Versiculo
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>
              "Faze para ti imagens de querubins..."
            </p>
            <a 
              href="https://www.bibliaonline.com.br/nvi/ex/25/18" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              (Êxodo 25:18)
            </a>
          </Versiculo>

          <Divider>
            <div className="line"></div>
            <span className="cross">✝</span>
            <div className="line"></div>
          </Divider>

          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Por que veneramos os Santos?
          </SectionTitle>

          <SectionParagraph
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Homens e mulheres de fé que trilharam os caminhos de Jesus, os santos deixaram um legado de amor, 
            serviço e dedicação que transcende o tempo e continua a inspirar milhões.
          </SectionParagraph>
        </Section>

        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            História dos Santos
          </SectionTitle>

          <SantosGrid
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {santos.map((santo, index) => (
              <SantoCard
                key={santo.id}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {santo.link ? (
                  <Link to={santo.link}>
                    <SantoImage src={santo.image} alt={santo.name} />
                    <SantoInfo>
                      <h3>{santo.name}</h3>
                      <p>{santo.description}</p>
                    </SantoInfo>
                  </Link>
                ) : (
                  <>
                    <SantoImage src={santo.image} alt={santo.name} />
                    <SantoInfo>
                      <h3>{santo.name}</h3>
                      <p>{santo.description}</p>
                    </SantoInfo>
                  </>
                )}
              </SantoCard>
            ))}
          </SantosGrid>
        </Section>

        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Recursos Espirituais
          </SectionTitle>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Section>
      </ContentSection>
    </HomeContainer>
  );
};

export default DesktopLayout; 