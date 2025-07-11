import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSun, FiBook, FiCalendar, FiArrowRight } from 'react-icons/fi';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.98) 100%
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
  font-size: clamp(28px, 5vw, 42px);
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
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
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(27, 51, 88, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 25px;
    border-radius: 15px;
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
  margin-bottom: 20px;
  color: white;
  font-size: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(20px, 3vw, 24px);
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 16px;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const ReadMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateX(5px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const TodayHighlight = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  margin-top: 40px;
  
  h3 {
    font-size: clamp(20px, 3vw, 26px);
    margin-bottom: 15px;
    font-weight: 600;
  }
  
  p {
    font-size: clamp(16px, 2.5vw, 18px);
    opacity: 0.95;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 30px 20px;
    border-radius: 15px;
  }
`;

const LaudesLiturgiaSection = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [liturgicalSeason, setLiturgicalSeason] = useState('');
  
  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(dateString);
    
    // Simular temporada litúrgica (você pode integrar com uma API real)
    const seasons = ['Tempo Comum', 'Advento', 'Natal', 'Quaresma', 'Páscoa'];
    setLiturgicalSeason(seasons[Math.floor(Math.random() * seasons.length)]);
  }, []);

  const cardVariants = {
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