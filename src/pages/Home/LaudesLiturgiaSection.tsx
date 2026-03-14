import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSun, FiBook, FiCalendar, FiArrowRight } from 'react-icons/fi';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    ${props => props.theme.colors.accent}15 100%
  );
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    z-index: 1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 60px 15px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(32px, 6vw, 48px);
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: clamp(16px, 2.5vw, 20px);
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 25px;
    margin-bottom: 40px;
  }
`;

const DailyCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: ${props => props.theme.shadows.heavy};
  border: 1px solid ${props => props.theme.colors.secondary}20;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    opacity: 0.8;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: ${props => props.theme.colors.secondary}50;
    background: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  color: white;
  font-size: 24px;
  box-shadow: 0 8px 16px rgba(27, 51, 88, 0.2);
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(24px, 3.5vw, 30px);
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 25px;
  font-size: 16px;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ReadMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const TodayHighlight = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, #2E5984);
  color: white;
  padding: 60px 40px;
  border-radius: 32px;
  text-align: center;
  margin-top: 60px;
  box-shadow: 0 20px 40px rgba(27, 51, 88, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 40px;
    font-size: 150px;
    font-family: ${props => props.theme.fonts.sacred};
    opacity: 0.1;
    line-height: 1;
  }
  
  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: clamp(24px, 4vw, 36px);
    margin-bottom: 20px;
    font-weight: 700;
  }
  
  p {
    font-family: ${props => props.theme.fonts.sacred};
    font-size: clamp(18px, 3vw, 24px);
    opacity: 0.95;
    line-height: 1.5;
    max-width: 800px;
    margin: 0 auto;
    font-style: italic;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    &::before { display: none; }
  }
`;

const LaudesLiturgiaSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [liturgicalSeason, setLiturgicalSeason] = useState<string>('');
  
  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(dateString);
    
    // Simular temporada litúrgica
    const seasons = ['Tempo Comum', 'Advento', 'Natal', 'Quaresma', 'Páscoa'];
    setLiturgicalSeason(seasons[Math.floor(Math.random() * seasons.length)]);
  }, []);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <SectionContainer>
      <ContentWrapper>
        <SectionTitle>Oração Diária</SectionTitle>
        <SectionSubtitle>
          Acompanhe as Laudes e a Liturgia Diária para fortalecer sua vida de oração
        </SectionSubtitle>
        
        <CardsGrid>
          <DailyCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <CardIcon>
              <FiSun />
            </CardIcon>
            <CardTitle>Laudes - Oração da Manhã</CardTitle>
            <DateInfo>
              <FiCalendar />
              <span>{currentDate}</span>
            </DateInfo>
            <CardDescription>
              Comece seu dia com as Laudes, a oração oficial da manhã da Igreja Católica. 
              Contemple os salmos e cânticos que elevam nossa alma a Deus desde o amanhecer.
            </CardDescription>
            <ReadMoreButton to="/laudes">
              Rezar as Laudes
              <FiArrowRight />
            </ReadMoreButton>
          </DailyCard>
          
          <DailyCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CardIcon>
              <FiBook />
            </CardIcon>
            <CardTitle>Liturgia Diária</CardTitle>
            <DateInfo>
              <FiCalendar />
              <span>{liturgicalSeason}</span>
            </DateInfo>
            <CardDescription>
              Medite nas leituras bíblicas de hoje e aprofunde-se na Palavra de Deus. 
              Inclui as leituras da Missa e reflexões para sua vida espiritual.
            </CardDescription>
            <ReadMoreButton to="/liturgia-diaria">
              Ver Liturgia de Hoje
              <FiArrowRight />
            </ReadMoreButton>
          </DailyCard>
        </CardsGrid>
        
        <TodayHighlight>
          <h3>Reflexão do Dia</h3>
          <p>
            "A oração é a respiração da alma. Assim como o corpo precisa de ar para viver, 
            a alma precisa da oração para manter-se unida a Deus e crescer em santidade."
          </p>
        </TodayHighlight>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default LaudesLiturgiaSection;
