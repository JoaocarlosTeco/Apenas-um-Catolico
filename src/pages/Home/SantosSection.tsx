import React from 'react';
import { getSantoImagePath } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { FiArrowRight, FiHeart, FiStar } from 'react-icons/fi';
import OptimizedImage from '../../components/OptimizedImage';

const Section = styled.section`
  padding: 120px 24px;
  background: transparent;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 10% 10%, ${props => props.theme.colors.accent}10 0%, transparent 40%),
                radial-gradient(circle at 90% 90%, ${props => props.theme.colors.accent}10 0%, transparent 40%);
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 80px 20px;
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
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    margin: 24px auto 0;
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

const SantosGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 60px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SantoCard = styled(motion.div)`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.colors.glass.shadow};
  border: ${props => props.theme.colors.glass.border};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: ${props => props.theme.shadows.strong};
    border-color: ${props => props.theme.colors.secondary}40;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .image-container {
    position: relative;
    height: 320px;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 120px;
      background: linear-gradient(transparent, rgba(27, 51, 88, 0.6));
      z-index: 2;
    }
  }
`;

const SantoInfo = styled.div`
  padding: 32px 24px;
  text-align: center;
  position: relative;

  h3 {
    font-family: ${props => props.theme.fonts.heading};
    color: ${props => props.theme.colors.primary};
    margin-bottom: 12px;
    font-size: clamp(20px, 2.5vw, 24px);
    font-weight: 700;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 0;
  }
`;

const SantoIcon = styled.div`
  position: absolute;
  top: -25px;
  right: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  z-index: 3;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.8);
`;

const SeeAllButton = styled(motion.div)`
  text-align: center;
  margin-top: 50px;
`;

const StyledButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 36px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, #2E5984);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px rgba(27, 51, 88, 0.25);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(27, 51, 88, 0.35);
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.primary});
  }
  
  svg {
    transition: transform 0.3s ease;
    font-size: 1.2rem;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const santosData = [
  {
    id: 4,
    name: 'São Francisco de Assis',
    image: getSantoImagePath('sao-francisco.jpg'),
    description: 'Padroeiro dos animais e da ecologia, fundador da Ordem Franciscana',
    link: '/santos/sao-francisco',
    objectPosition: 'center 20%',
    icon: <FiHeart />
  },
  {
    id: 2,
    name: 'Santa Teresinha',
    image: getSantoImagePath('santa-teresinha.jpg'),
    description: 'Doutora da Igreja e padroeira das missões, exemplo de simplicidade',
    objectPosition: 'center 30%',
    icon: <FiStar />
  },
  {
    id: 3,
    name: 'São Padre Pio',
    image: getSantoImagePath('padre-pio.webp'),
    description: 'Padre estigmatizado e confessor, exemplo de oração e penitência',
    objectPosition: 'center 25%',
    icon: <FiHeart />
  },
  {
    id: 1,
    name: 'Nossa Senhora',
    image: getSantoImagePath('nossa-senhora.webp'),
    description: 'Mãe de Jesus e nossa intercessora, Rainha do Céu e da Terra',
    objectPosition: 'center 40%',
    icon: <FiStar />
  }
];

const SantosSection: React.FC = () => {
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
          Exemplos de Santidade
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Conheça a vida e os exemplos de fé dos santos que nos inspiram na caminhada cristã
        </SectionSubtitle>

        <SantosGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {santosData.map((santo, index) => (
            <SantoCard
              key={santo.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {santo.link ? (
                <Link to={santo.link}>
                  <div className="image-container">
                    <OptimizedImage 
                      src={santo.image} 
                      alt={santo.name} 
                      height="100%"
                      hover
                      objectPosition={santo.objectPosition}
                    />
                  </div>
                  <SantoInfo>
                    <SantoIcon>
                      {santo.icon}
                    </SantoIcon>
                    <h3>{santo.name}</h3>
                    <p>{santo.description}</p>
                  </SantoInfo>
                </Link>
              ) : (
                <>
                  <div className="image-container">
                    <OptimizedImage 
                      src={santo.image} 
                      alt={santo.name} 
                      height="100%"
                      hover
                      objectPosition={santo.objectPosition}
                    />
                  </div>
                  <SantoInfo>
                    <SantoIcon>
                      {santo.icon}
                    </SantoIcon>
                    <h3>{santo.name}</h3>
                    <p>{santo.description}</p>
                  </SantoInfo>
                </>
              )}
            </SantoCard>
          ))}
        </SantosGrid>

        <SeeAllButton
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <StyledButton to="/santos">
            Explorar Todos os Santos
            <FiArrowRight />
          </StyledButton>
        </SeeAllButton>
      </ContentWrapper>
    </Section>
  );
};

export default SantosSection;
