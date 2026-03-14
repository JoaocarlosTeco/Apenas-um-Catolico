import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useDeviceType } from '../hooks/useDeviceType';
import { useAccessibility } from '../hooks/useAccessibility';
import { getLogoPath } from '../utils/imageUtils';

import { BaseComponentProps } from '../types';

interface StyledProps {
  isMobile?: boolean;
  isOpen?: boolean;
  theme: any;
}

const HeaderContainer = styled.header<StyledProps>`
  background-color: ${props => props.theme.colors.headerBg};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: ${props => props.isMobile ? '0.5rem 1.25rem' : '0.85rem 2.5rem'};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  border-bottom: ${props => props.theme.colors.glass.border};
  box-shadow: ${props => props.theme.colors.glass.shadow};
`;

const HeaderContent = styled.div<StyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${props => props.isMobile ? '100%' : '1400px'};
  margin: 0 auto;
  height: ${props => props.isMobile ? '50px' : '60px'};
`;

const Logo = styled(Link)<StyledProps>`
  display: flex;
  align-items: center;
  
  img {
    height: ${props => props.isMobile ? '40px' : '55px'};
    width: auto;
    margin-right: ${props => props.isMobile ? '0' : '1.25rem'};
    transition: transform 0.3s ease;
    object-fit: contain;
    object-position: center;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Nav = styled.nav<StyledProps>`
  display: flex;
  align-items: center;
  gap: ${props => props.isMobile ? '1rem' : '1.5rem'};
  margin-left: auto;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.headerBg};
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid ${props => props.theme.colors.secondary}15;
  }
`;

const NavLink = styled(Link)<StyledProps>`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.85rem;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  display: block;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  &[aria-current="page"], &.active {
    background-color: ${props => props.theme.colors.secondary};
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    font-size: 1.1rem;
    padding: 1rem;
  }
`;

const SkipLinks = styled.div`
  position: absolute;
  top: -40px;
  left: 6px;
  z-index: 2000;

  &:focus-within {
    top: 6px;
  }
`;

const SkipLink = styled.a`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;

  &:focus {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
  }
`;

const MenuButton = styled.button<StyledProps>`
  display: none;
  background: ${props => props.theme.colors.primary}10;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

interface HeaderProps extends BaseComponentProps {}

const Header: React.FC<HeaderProps> = ({ className, ...rest }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isMobile } = useDeviceType();
  const { 
    saveFocus, 
    restoreFocus, 
    useKeyboardNavigation,
    announce 
  } = useAccessibility();

  const toggleMenu = (): void => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    
    if (newState) {
      saveFocus();
      announce('Menu principal aberto');
    } else {
      restoreFocus();
      announce('Menu principal fechado');
    }
  };

  // Navegação por teclado para o menu
  useKeyboardNavigation();

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
      restoreFocus();
      announce('Menu principal fechado');
    }
  };

  return (
    <HeaderContainer 
      isMobile={isMobile} 
      className={className}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <SkipLinks>
        <SkipLink href="#main-content">
          Pular para o conteúdo principal
        </SkipLink>
        <SkipLink href="#navigation">
          Pular para a navegação
        </SkipLink>
      </SkipLinks>

      <HeaderContent isMobile={isMobile}>
        <Logo to="/" isMobile={isMobile} aria-label="Apenas um Católico - Página inicial">
          <img 
            src={getLogoPath("logo-apenas-um-catolico.png")} 
            alt="Logo Apenas um Católico"
            loading="eager"
          />
        </Logo>

        <MenuButton
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
          <span className="sr-only">
            {isMenuOpen ? 'Fechar' : 'Abrir'} menu de navegação
          </span>
        </MenuButton>

        <Nav 
          id="main-navigation"
          role="navigation"
          aria-label="Navegação principal"
          isOpen={isMenuOpen}
          isMobile={isMobile}
        >
          <NavLink 
            to="/santos" 
            isMobile={isMobile}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            Santos
          </NavLink>
          <NavLink 
            to="/laudes" 
            isMobile={isMobile}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            Laudes
          </NavLink>
          <NavLink 
            to="/calendario" 
            isMobile={isMobile}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            Calendário
          </NavLink>
          <NavLink 
            to="/liturgia-diaria" 
            isMobile={isMobile}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            Liturgia Diária
          </NavLink>
          <NavLink 
            to="/oracao" 
            isMobile={isMobile}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            Orações
          </NavLink>
          <NavLink 
            to="/blog" 
            isMobile={isMobile}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/sobre" 
            isMobile={isMobile}
            onClick={() => isMobile && setIsMenuOpen(false)}
          >
            Sobre
          </NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;