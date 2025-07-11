import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import useDeviceType from './useDeviceType';
import { useAccessibility } from '../hooks/useAccessibility';
import { getLogoPath } from '../utils/imageUtils';

import { BaseComponentProps } from '../types';

interface StyledProps {
  isMobile?: boolean;
  isOpen?: boolean;
  theme: any;
}

const HeaderContainer = styled.header<StyledProps>`
  background-color: ${props => props.theme.colors?.primary || '#1B3358'};
  padding: ${props => props.isMobile ? '0.5rem 1rem' : '0.75rem 2rem'};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
    height: ${props => props.isMobile ? '32px' : '45px'};
    width: auto;
    margin-right: ${props => props.isMobile ? '0' : '1rem'};
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
    background: ${props => props.theme.colors?.primary || '#1B3358'};
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)<StyledProps>`
  color: white;
  text-decoration: none;
  font-size: ${props => props.isMobile ? '1rem' : '1.1rem'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
  display: block;
  border: 2px solid transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.1);
  }

  &[aria-current="page"] {
    background-color: ${props => props.theme.colors?.secondary || '#C09553'};
    font-weight: 700;
  }

  &.active {
    background-color: ${props => props.theme.colors?.secondary || '#C09553'};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
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
    left: auto;
    top: auto;
  }
`;

const MenuButton = styled.button<StyledProps>`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
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
            src={getLogoPath("Logo tipo apenas um catolico.png")} 
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