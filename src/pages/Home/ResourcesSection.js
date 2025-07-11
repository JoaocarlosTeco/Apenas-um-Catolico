import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSun, FiBookOpen, FiHeart, FiCalendar, FiStar, FiArrowRight } from 'react-icons/fi';

const Section = styled.section`
  padding: 120px 24px;
  background: linear-gradient(
    180deg,
    ${props => props.theme.colors.background} 0%,
    rgba(27, 51, 88, 0.02) 100%
  );
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zm-20 0c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zm40 0c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.4;
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 100px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 20px;
  font-size: clamp(28px, 5vw, 42px);
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
  letter-spacing: -0.02em;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: clamp(16px, 2.5vw, 20px);
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
  margin-bottom: 80px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 40px 32px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(27, 51, 88, 0.06);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.06);
  }

  .icon {
    font-size: 28px;
    color: white;
    margin-bottom: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 4px 15px rgba(27, 51, 88, 0.2);
  }

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 16px;
    font-size: clamp(18px, 2.5vw, 22px);
    font-weight: 600;
    line-height: 1.3;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
    font-size: 15px;
    margin-bottom: 24px;
  }
`;

const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    transform: translateX(5px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const CallToAction = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: 50px 40px;
  border-radius: 20px;
  text-align: center;
  margin-top: 60px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    opacity: 0.5;
    z-index: 1;
  }
  
  h3 {
    font-size: clamp(20px, 3vw, 28px);
    margin-bottom: 15px;
    font-weight: 600;
    position: relative;
    z-index: 2;
  }
  
  p {
    font-size: clamp(16px, 2.5vw, 18px);
    opacity: 0.95;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto 25px;
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 40px 25px;
    margin-top: 50px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 12px 25px;
    font-size: 15px;
  }
`;

const features = [
  {
    icon: <FiSun />,
    title: 'Laudes Diárias',
    description: 'Comece cada dia com as orações oficiais da Igreja Católica, elevando sua alma a Deus.',
    link: '/laudes'
  },
  {
    icon: <FiBookOpen />,
    title: 'Liturgia Diária',
    description: 'Acompanhe as leituras bíblicas de cada dia e aprofunde-se na Palavra de Deus.',
    link: '/liturgia-diaria'
  },
  {
    icon: <FiHeart />,
    title: 'Orações Católicas',
    description: 'Descubra orações tradicionais e devoções que fortalecem nossa fé e esperança.',
    link: '/oracao'
  },
  {
    icon: <FiCalendar />,
    title: 'Calendário Litúrgico',
    description: 'Conheça as festividades e tempos sagrados que marcam o ano litúrgico.',
    link: '/calendario'
  },
  {
    icon: <FiStar />,
    title: 'Vidas dos Santos',
    description: 'Inspire-se com as histórias de fé e santidade dos grandes exemplos cristãos.',
    link: '/santos'
  },
  {
    icon: <FiBookOpen />,
    title: 'Reflexões e Blog',
    description: 'Leia artigos e reflexões que nutrem o espírito e fortalecem a vida católica.',
    link: '/blog'
  }
];

const ResourcesSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Section>
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Recursos Espirituais
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ferramentas e conteúdos para enriquecer sua vida de fé e crescimento espiritual
        </SectionSubtitle>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <FeatureLink to={feature.link}>
                Explorar
                <FiArrowRight />
              </FeatureLink>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        
        <CallToAction
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
                          <h3>Fortaleça sua Fé Diariamente</h3>
          <p>
            Junte-se à nossa comunidade católica e descubra como a oração, os santos e a liturgia 
            podem transformar sua vida espiritual e aproximá-lo de Jesus Cristo.
          </p>
          <CTAButton to="/sobre">
            Saiba Mais
            <FiArrowRight />
          </CTAButton>
        </CallToAction>
      </ContentWrapper>
    </Section>
  );
};

export default ResourcesSection; 