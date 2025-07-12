import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBookOpen, FiHeart, FiStar } from 'react-icons/fi';

const Section = styled.section`
  padding: 100px 20px;
  background: linear-gradient(
    180deg,
    ${props => props.theme.colors.background} 0%,
    rgba(27, 51, 88, 0.02) 50%,
    ${props => props.theme.colors.background} 100%
  );
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm16 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.4;
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 80px 15px;
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

const VerseCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin: 50px auto;
  max-width: 800px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
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
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  }
  
  &::after {
    content: '"';
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 80px;
    color: rgba(27, 51, 88, 0.1);
    font-family: serif;
    line-height: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 30px 25px;
    margin: 40px auto;
    
    &::after {
      font-size: 60px;
      right: 20px;
      top: 15px;
    }
  }
`;

const VerseIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  color: white;
  font-size: 20px;
`;

const VerseText = styled.p`
  font-size: clamp(18px, 3vw, 22px);
  font-style: italic;
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
  line-height: 1.7;
  position: relative;
  z-index: 2;
`;

const VerseReference = styled.a`
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    transform: translateX(5px);
  }
  
  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`;

const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 80px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 25px;
    margin-top: 60px;
  }
`;

const TopicCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(27, 51, 88, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 25px 20px;
  }
`;

const TopicIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 24px;
`;

const TopicTitle = styled.h3`
  font-size: clamp(18px, 2.5vw, 22px);
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
  font-weight: 600;
`;

const TopicDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  font-size: 15px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 0;

  .line {
    flex: 1;
    max-width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.secondary}, transparent);
    margin: 0 20px;
  }

  .cross {
    color: ${props => props.theme.colors.secondary};
    font-size: 24px;
    font-weight: 300;
    background: white;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 60px 0;
    
    .line {
      max-width: 100px;
      margin: 0 15px;
    }
  }
`;

const BiblicalSection = () => {
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
          Palavra de Deus
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Descubra o que a Sagrada Escritura nos ensina sobre a fé, os santos e a tradição católica
        </SectionSubtitle>
        
        <VerseCard
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <VerseIcon>
            <FiBookOpen />
          </VerseIcon>
          <VerseText>
            "Faze para ti dois querubins de ouro; de ouro batido os farás, nas duas extremidades do propiciatório."
          </VerseText>
          <VerseReference 
            href="https://www.bibliaonline.com.br/nvi/ex/25/18" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Êxodo 25,18
          </VerseReference>
        </VerseCard>

        <TopicGrid>
          <TopicCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TopicIcon>
              <FiHeart />
            </TopicIcon>
            <TopicTitle>Veneração dos Santos</TopicTitle>
            <TopicDescription>
              A Igreja honra os santos como exemplos de fé e virtude, reconhecendo sua intercessão junto a Deus.
            </TopicDescription>
          </TopicCard>

          <TopicCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TopicIcon>
              <FiBookOpen />
            </TopicIcon>
            <TopicTitle>Sagrada Tradição</TopicTitle>
            <TopicDescription>
              A Tradição Apostólica preserva e transmite os ensinamentos de Cristo através dos séculos.
            </TopicDescription>
          </TopicCard>

          <TopicCard
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <TopicIcon>
              <FiStar />
            </TopicIcon>
            <TopicTitle>Comunhão dos Santos</TopicTitle>
            <TopicDescription>
              Unidos na fé, formamos uma só família com os santos no céu, na terra e no purgatório.
            </TopicDescription>
          </TopicCard>
        </TopicGrid>

        <Divider>
          <div className="line"></div>
          <span className="cross">✝</span>
          <div className="line"></div>
        </Divider>
      </ContentWrapper>
    </Section>
  );
};

export default BiblicalSection; 