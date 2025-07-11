import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseComponentProps } from '../types';
import { InstagramIcon, GitHubIcon, EmailIcon } from './Icons/SocialIcons';

interface FooterProps extends BaseComponentProps {}

interface SocialLinkData {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface FooterLinkData {
  label: string;
  to: string;
  external?: boolean;
}

interface FooterSectionData {
  title: string;
  links: FooterLinkData[];
}

// Styled Components
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  padding: 3rem 0 1.5rem;
  margin-top: auto;
  flex: 0 0 auto;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: white;
`;

const FooterDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  font-size: 0.95rem;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLinkStyled = styled(Link)`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 1;
    color: ${props => props.theme.colors.accent || '#FFD700'};
    transform: translateX(4px);
  }
`;

const ExternalLink = styled.a`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 1;
    color: ${props => props.theme.colors.accent || '#FFD700'};
    transform: translateX(4px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
    gap: 1rem;
  }
`;

const SocialLinkStyled = styled(motion.a)<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: ${props => props.color};
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: ${props => props.color};
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const FooterDivider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 2rem 0 1rem;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
  opacity: 0.8;
  font-size: 0.85rem;
`;

const FooterCredits = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.85rem;
  opacity: 0.8;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Footer: React.FC<FooterProps> = ({ className, ...props }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLinkData[] = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/joaotdev/',
      icon: InstagramIcon,
      color: '#E4405F'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/JoaocarlosTeco',
      icon: GitHubIcon,
      color: '#333'
    },
    {
      name: 'Email',
      url: 'mailto:joao.carlosdev23@gmail.com',
      icon: EmailIcon,
      color: '#EA4335'
    }
  ];

  const footerSections: FooterSectionData[] = [
    {
      title: 'Navegação',
      links: [
        { label: 'Início', to: '/' },
        { label: 'Santos', to: '/santos' },
        { label: 'Orações', to: '/oracao' },
        { label: 'Blog', to: '/blog' },
        { label: 'Sobre', to: '/sobre' }
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Laudes', to: '/laudes' },
        { label: 'Liturgia Diária', to: '/liturgia-diaria' },
        { label: 'Calendário Litúrgico', to: '/calendario' },
        { label: 'São Francisco', to: '/santos/sao-francisco' }
      ]
    },
    {
      title: 'Links Úteis',
      links: [
        { label: 'Vaticano', to: 'https://vatican.va', external: true },
        { label: 'CNBB', to: 'https://cnbb.org.br', external: true },
        { label: 'Canção Nova', to: 'https://cancaonova.com', external: true },
        { label: 'Catecismo', to: 'https://catecismo.org', external: true }
      ]
    }
  ];

  return (
    <FooterContainer className={className} {...props}>
      <FooterContent>
        <FooterGrid>
          <FooterSectionContainer>
            <FooterTitle>Apenas um Católico</FooterTitle>
            <FooterDescription>
              Um espaço dedicado à evangelização e crescimento espiritual católico. 
              Aqui você encontra histórias de santos, orações poderosas e conteúdo 
              para fortalecer sua fé e aproximar-se de Deus.
            </FooterDescription>
            
            <SocialLinks>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <SocialLinkStyled
                    key={social.name}
                    href={social.url}
                    color={social.color}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                  >
                    <IconComponent size={24} />
                  </SocialLinkStyled>
                );
              })}
            </SocialLinks>
          </FooterSectionContainer>

          {footerSections.map((section) => (
            <FooterSectionContainer key={section.title}>
              <FooterTitle>{section.title}</FooterTitle>
              <FooterLinks>
                {section.links.map((link) => (
                  <FooterLinkItem key={link.label}>
                    {link.external ? (
                      <ExternalLink
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </ExternalLink>
                    ) : (
                      <FooterLinkStyled to={link.to}>
                        {link.label}
                      </FooterLinkStyled>
                    )}
                  </FooterLinkItem>
                ))}
              </FooterLinks>
            </FooterSectionContainer>
          ))}
        </FooterGrid>

        <FooterDivider />

        <FooterBottom>
          <Copyright>
            © {currentYear} Apenas um Católico. Todos os direitos reservados.
          </Copyright>
          
          <FooterCredits>
            <span>Feito com ❤️ para a evangelização</span>
            <span>•</span>
            <span>Ad Majorem Dei Gloriam</span>
          </FooterCredits>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 