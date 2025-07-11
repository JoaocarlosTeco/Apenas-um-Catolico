import React from 'react';
import { getSantoImagePath } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiHeart, FiStar } from 'react-icons/fi';
import OptimizedImage from '../../components/OptimizedImage';

const Section = styled.section`
  padding: 120px 24px;
  background: linear-gradient(
    135deg,
    rgba(27, 51, 88, 0.03) 0%,
    rgba(255, 255, 255, 0.98) 50%,
    rgba(27, 51, 88, 0.03) 100%
  );
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.2'%3E%3Cpath d='M40 40c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zm-16 0c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zm32 0c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
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

const SantosGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 60px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SantoCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(27, 51, 88, 0.06);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    z-index: 3;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.06);
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .image-container {
    position: relative;
    height: 280px;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      z-index: 2;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      height: 250px;
    }
  }
`;

const SantoInfo = styled.div`
  padding: 32px;
  text-align: center;
  position: relative;

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 12px;
    font-size: clamp(18px, 2.5vw, 22px);
    font-weight: 600;
    line-height: 1.3;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 20px;
  }
`;

const SantoIcon = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  z-index: 3;
  transition: all 0.3s ease;
  
  ${SantoCard}:hover & {
    transform: scale(1.1);
  }
`;

const SeeAllButton = styled(motion.div)`
  text-align: center;
  margin-top: 50px;
`;

const StyledButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(27, 51, 88, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(27, 51, 88, 0.4);
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

const santos = [
  {
    id: 4,
    name: 'São Francisco de Assis',
          image: getSantoImagePath('São franciso.jpg'),
    description: 'Padroeiro dos animais e da ecologia, fundador da Ordem Franciscana',
    link: '/santos/sao-francisco',
    objectPosition: 'center 20%',
    icon: <FiHeart />
  },
  {
    id: 2,
    name: 'Santa Teresinha',
          image: getSantoImagePath('Santa terezinha.jpg'),
    description: 'Doutora da Igreja e padroeira das missões, exemplo de simplicidade',
    objectPosition: 'center 30%',
    icon: <FiStar />
  },
  {
    id: 3,
    name: 'São Padre Pio',
          image: getSantoImagePath('Padre-Pio.webp'),
    description: 'Padre estigmatizado e confessor, exemplo de oração e penitência',
    objectPosition: 'center 25%',
    icon: <FiHeart />
  },
  {
    id: 1,
    name: 'Nossa Senhora',
          image: getSantoImagePath('Nossa senhora.webp'),
    description: 'Mãe de Jesus e nossa intercessora, Rainha do Céu e da Terra',
    objectPosition: 'center 40%',
    icon: <FiStar />
  }
];

const SantosSection = () => {
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
          Santos Católicos
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
          {santos.map((santo, index) => (
            <SantoCard
              key={santo.id}
              isClickable={!!santo.link}
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
                    <h3>{santo.name}</h3>
                    <p>{santo.description}</p>
                    <SantoIcon>
                      {santo.icon}
                    </SantoIcon>
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
                    <h3>{santo.name}</h3>
                    <p>{santo.description}</p>
                    <SantoIcon>
                      {santo.icon}
                    </SantoIcon>
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
            Ver Todos os Santos
            <FiArrowRight />
          </StyledButton>
        </SeeAllButton>
      </ContentWrapper>
    </Section>
  );
};

export default SantosSection; 