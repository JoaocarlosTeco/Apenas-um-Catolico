import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  PiArticle,
  PiBookOpenText,
  PiBookOpenTextFill,
  PiCalendarBlank,
  PiCaretRight,
  PiDotsThreeOutline,
  PiDotsThreeOutlineFill,
  PiHandsPraying,
  PiHandsPrayingFill,
  PiHouse,
  PiHouseFill,
  PiInfo,
  PiList,
  PiMoon,
  PiStarFour,
  PiStarFourFill,
  PiSunDim,
  PiSunHorizon,
  PiX,
} from 'react-icons/pi';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

interface Destino {
  to: string;
  rotulo: string;
  descricao: string;
  Icone: IconType;
}

const DESTINOS: Destino[] = [
  { to: '/liturgia-diaria', rotulo: 'Liturgia', descricao: 'Leituras e orações da Missa de hoje', Icone: PiBookOpenText },
  { to: '/laudes', rotulo: 'Laudes', descricao: 'Roteiro da oração da manhã', Icone: PiSunHorizon },
  { to: '/santos', rotulo: 'Santos', descricao: 'Vida, linha do tempo e oração', Icone: PiStarFour },
  { to: '/oracao', rotulo: 'Orações', descricao: 'Orações tradicionais para cada momento', Icone: PiHandsPraying },
  { to: '/calendario', rotulo: 'Calendário', descricao: 'Festas e tempos do ano litúrgico', Icone: PiCalendarBlank },
  { to: '/blog', rotulo: 'Blog', descricao: 'Reflexões e textos', Icone: PiArticle },
  { to: '/sobre', rotulo: 'Sobre', descricao: 'Quem faz o Apenas um Católico', Icone: PiInfo },
];

/* ---------- Barra do topo ---------- */

const Barra = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  /* as páginas dos santos trocam a cor do topo por --topo-fundo */
  background: var(--topo-fundo, ${({ theme }) => theme.colors.headerBg});
  transition: background 0.3s ease;
  backdrop-filter: saturate(160%) blur(12px);
  -webkit-backdrop-filter: saturate(160%) blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Conteudo = styled.div`
  max-width: 1200px;
  height: 64px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const Marca = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: auto;
  color: #fff;

  &:hover {
    color: #fff;
  }
`;

const NavTopo = styled.nav`
  display: none;
  align-items: center;
  gap: 4px;

  @media (min-width: 1024px) {
    display: flex;
  }

  a {
    position: relative;
    padding: 8px 12px;
    border-radius: 3px;
    color: rgba(255, 255, 255, 0.82);
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s ease, background 0.2s ease;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }

    &.active {
      color: #fff;
    }

    &.active::after {
      content: '';
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 2px;
      height: 2px;
      border-radius: 2px;
      background: #7fb2ee;
    }
  }
`;

const BotaoIcone = styled.button`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: #fff;
  font-size: 1.35rem;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const BotaoMenu = styled(BotaoIcone)`
  display: none;

  @media (min-width: 769px) and (max-width: 1023px) {
    display: inline-flex;
  }
`;

/* ---------- Barra inferior (celular) ---------- */

const BarraInferior = styled.nav`
  position: fixed;
  inset: auto 0 0 0;
  z-index: 1000;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 6px 4px calc(6px + env(safe-area-inset-bottom));
  background: var(--barra-fundo, ${({ theme }) => (theme.modo === 'escuro' ? 'rgba(6, 14, 28, 0.94)' : 'rgba(255, 255, 255, 0.94)')});
  backdrop-filter: saturate(160%) blur(12px);
  -webkit-backdrop-filter: saturate(160%) blur(12px);
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 769px) {
    display: none;
  }
`;

const itemInferior = `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-height: 48px;
  justify-content: center;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ItemInferior = styled(NavLink)`
  ${itemInferior}
  color: var(--barra-texto, ${({ theme }) => theme.colors.textSecondary});

  .cheio {
    display: none;
  }

  &.active {
    color: var(--barra-destaque, ${({ theme }) => theme.colors.secondary});

    .cheio {
      display: block;
    }

    .vazio {
      display: none;
    }
  }
`;

const BotaoInferior = styled.button<{ $ativo: boolean }>`
  ${itemInferior}
  color: ${({ theme, $ativo }) =>
    $ativo ? `var(--barra-destaque, ${theme.colors.secondary})` : `var(--barra-texto, ${theme.colors.textSecondary})`};
`;

/* ---------- Menu completo ---------- */

const Folha = styled.div<{ $aberta: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  background: #10203c;
  color: #fff;
  padding: 0 16px calc(24px + env(safe-area-inset-bottom));
  overflow-y: auto;
  opacity: ${({ $aberta }) => ($aberta ? 1 : 0)};
  visibility: ${({ $aberta }) => ($aberta ? 'visible' : 'hidden')};
  transform: translateY(${({ $aberta }) => ($aberta ? '0' : '12px')});
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
`;

const FolhaTopo = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
`;

const ListaMenu = styled.ul`
  list-style: none;
  max-width: 640px;
  width: 100%;
  margin: 8px auto 0;
  border-top: 1px solid rgba(244, 239, 228, 0.16);

  li {
    border-bottom: 1px solid rgba(244, 239, 228, 0.16);
  }

  /* índice de livro: título em serifa, descrição em itálico, sem caixas */
  a {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 4px;
    color: #f4efe4;
    font-family: 'EB Garamond', Georgia, serif;

    &:hover,
    &.active {
      color: #fff;
    }

    &.active strong::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: 4px;
      background: #d9bb6a;
    }

    > svg:first-child {
      width: 22px;
      height: 22px;
      color: #d9bb6a;
      flex-shrink: 0;
      opacity: 0.85;
    }

    > svg:last-child {
      margin-left: auto;
      opacity: 0.4;
    }
  }

  strong {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.15;
  }

  small {
    display: block;
    font-size: 0.98rem;
    font-style: italic;
    opacity: 0.7;
  }
`;

const TrocaTema = styled.button`
  max-width: 640px;
  width: 100%;
  margin: 16px auto 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const SaltarParaConteudo = styled.a`
  position: absolute;
  left: 8px;
  top: -48px;
  z-index: 2000;
  padding: 8px 16px;
  border-radius: 3px;
  background: #fff;
  color: #122b52;
  font-weight: 600;

  &:focus {
    top: 8px;
  }
`;

const Header: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // fecha o menu ao trocar de página
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  // Esc fecha o menu e a página de trás não rola enquanto ele está aberto
  useEffect(() => {
    if (!menuAberto) return undefined;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setMenuAberto(false);
    };
    const overflowAntes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = overflowAntes;
      window.removeEventListener('keydown', aoTeclar);
    };
  }, [menuAberto]);

  const IconeTema = isDarkMode ? PiSunDim : PiMoon;
  const rotuloTema = isDarkMode ? 'Usar tema claro' : 'Usar tema escuro';
  const noMenuMais = !['/', '/liturgia-diaria', '/santos', '/oracao'].some(rota =>
    rota === '/' ? location.pathname === '/' : location.pathname.startsWith(rota)
  );

  return (
    <>
      <SaltarParaConteudo href="#main-content">Pular para o conteúdo</SaltarParaConteudo>

      <Barra>
        <Conteudo>
          <Marca to="/" aria-label="Apenas um Católico, página inicial">
            <Logo tamanho={36} animar />
          </Marca>

          <NavTopo aria-label="Navegação principal">
            {DESTINOS.map(({ to, rotulo }) => (
              <NavLink key={to} to={to}>
                {rotulo}
              </NavLink>
            ))}
          </NavTopo>

          <BotaoIcone type="button" onClick={toggleTheme} aria-label={rotuloTema} title={rotuloTema}>
            <IconeTema />
          </BotaoIcone>
          <BotaoMenu type="button" onClick={() => setMenuAberto(true)} aria-label="Abrir menu" aria-expanded={menuAberto}>
            <PiList />
          </BotaoMenu>
        </Conteudo>
      </Barra>

      <BarraInferior aria-label="Navegação">
        <ItemInferior to="/" end>
          <PiHouse className="vazio" aria-hidden="true" />
          <PiHouseFill className="cheio" aria-hidden="true" />
          Início
        </ItemInferior>
        <ItemInferior to="/liturgia-diaria">
          <PiBookOpenText className="vazio" aria-hidden="true" />
          <PiBookOpenTextFill className="cheio" aria-hidden="true" />
          Liturgia
        </ItemInferior>
        <ItemInferior to="/santos">
          <PiStarFour className="vazio" aria-hidden="true" />
          <PiStarFourFill className="cheio" aria-hidden="true" />
          Santos
        </ItemInferior>
        <ItemInferior to="/oracao">
          <PiHandsPraying className="vazio" aria-hidden="true" />
          <PiHandsPrayingFill className="cheio" aria-hidden="true" />
          Orações
        </ItemInferior>
        <BotaoInferior
          type="button"
          $ativo={noMenuMais}
          onClick={() => setMenuAberto(true)}
          aria-expanded={menuAberto}
          aria-controls="menu-completo"
        >
          {noMenuMais ? <PiDotsThreeOutlineFill aria-hidden="true" /> : <PiDotsThreeOutline aria-hidden="true" />}
          Mais
        </BotaoInferior>
      </BarraInferior>

      <Folha
        id="menu-completo"
        $aberta={menuAberto}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuAberto}
      >
        <FolhaTopo>
          <Logo tamanho={36} />
          <BotaoIcone type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu">
            <PiX />
          </BotaoIcone>
        </FolhaTopo>
        <ListaMenu>
          <li>
            <NavLink to="/" end tabIndex={menuAberto ? 0 : -1}>
              <PiHouse aria-hidden="true" />
              <span>
                <strong>Início</strong>
                <small>O dia de hoje na liturgia</small>
              </span>
              <PiCaretRight aria-hidden="true" />
            </NavLink>
          </li>
          {DESTINOS.map(({ to, rotulo, descricao, Icone }) => (
            <li key={to}>
              <NavLink to={to} tabIndex={menuAberto ? 0 : -1}>
                <Icone aria-hidden="true" />
                <span>
                  <strong>{rotulo}</strong>
                  <small>{descricao}</small>
                </span>
                <PiCaretRight aria-hidden="true" />
              </NavLink>
            </li>
          ))}
        </ListaMenu>
        <TrocaTema type="button" onClick={toggleTheme} tabIndex={menuAberto ? 0 : -1}>
          <IconeTema aria-hidden="true" />
          {rotuloTema}
        </TrocaTema>
      </Folha>
    </>
  );
};

export default Header;
