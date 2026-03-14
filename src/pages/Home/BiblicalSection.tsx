import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { FiBookOpen, FiHeart, FiStar } from 'react-icons/fi';

const Section = styled.section`
  padding: 80px 24px;
  background: transparent;
  position: relative;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 60px 16px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.heading};
  text-align: center;
  margin-bottom: 20px;
  font-size: clamp(32px, 6vw, 48px);
  color: ${props => props.theme.colors.primary};
  font-weight: 800;
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
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 60px 40px;
  border-radius: 24px;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.heavy};
  border: 1px solid ${props => props.theme.colors.secondary}15;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '†';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
  margin: 0 auto 25px;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(27, 51, 88, 0.2);
`;

const VerseText = styled.p`
  font-family: ${props => props.theme.fonts.sacred};
  font-size: clamp(24px, 4vw, 36px);
  color: ${props => props.theme.colors.primary};
  line-height: 1.4;
  margin-bottom: 30px;
  font-style: italic;
  font-weight: 500;
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
  gap: 32px;
  margin-top: 80px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 60px;
  }
`;

const TopicCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 1px solid ${props => props.theme.colors.secondary}10;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: translateY(-10px);
    border-color: ${props => props.theme.colors.secondary}30;
    box-shadow: ${props => props.theme.shadows.heavy};
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
  box-shadow: 0 4px 15px rgba(27, 51, 88, 0.2);
`;

const TopicTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(20px, 2.5vw, 24px);
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
  font-weight: 700;
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
  margin: 100px 0 40px;

  .line {
    flex: 1;
    max-width: 250px;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.secondary}40, transparent);
    margin: 0 24px;
  }

  .cross {
    color: ${props => props.theme.colors.secondary};
    font-size: 28px;
    font-weight: 300;
    opacity: 0.8;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 60px 0 20px;
    
    .line {
      max-width: 120px;
      margin: 0 15px;
    }
  }
`;

const BiblicalSection: React.FC = () => {
  const cardVariants: Variants = {
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
          <span className="cross">†</span>
          <div className="line"></div>
        </Divider>
      </ContentWrapper>
    </Section>
  );
};

export default BiblicalSection;
