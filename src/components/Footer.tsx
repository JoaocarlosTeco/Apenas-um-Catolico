import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  PiArrowUpRight,
  PiEnvelopeSimple,
  PiGithubLogo,
  PiInstagramLogo,
} from 'react-icons/pi';
import Logo from './Logo';

const Rodape = styled.footer`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.footerBg};
  color: rgba(255, 255, 255, 0.82);
  padding: 56px 16px 32px;

  /* filete dourado no alto do rodapé */
  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 1px;
    background: #b8924a;
  }

  a {
    color: rgba(255, 255, 255, 0.82);
  }

  a:hover {
    color: #fff;
  }
`;

const Grade = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
`;

const Sobre = styled.div`
  p {
    margin-top: 16px;
    max-width: 340px;
    line-height: 1.7;
    font-size: 0.95rem;
  }
`;

const Redes = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;

  a {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 1.25rem;
    transition: background 0.2s ease;
  }

  a:hover {
    background: rgba(255, 255, 255, 0.16);
  }
`;

const Coluna = styled.nav`
  /* versalete dourado, como os outros rótulos do site */
  h2 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.15rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: #d9bb6a;
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    display: grid;
    gap: 10px;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.95rem;
  }
`;

const Base = styled.div`
  max-width: 1120px;
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;

const NAVEGAR = [
  { rotulo: 'Liturgia Diária', to: '/liturgia-diaria' },
  { rotulo: 'Laudes', to: '/laudes' },
  { rotulo: 'Orações', to: '/oracao' },
  { rotulo: 'Calendário', to: '/calendario' },
  { rotulo: 'Blog', to: '/blog' },
  { rotulo: 'Sobre', to: '/sobre' },
];

const SANTOS = [
  { rotulo: 'São Francisco de Assis', to: '/santos/sao-francisco' },
  { rotulo: 'Santa Teresinha', to: '/santos/santa-teresinha' },
  { rotulo: 'São Padre Pio', to: '/santos/padre-pio' },
  { rotulo: 'Nossa Senhora', to: '/santos/nossa-senhora' },
];

const IGREJA = [
  {
    rotulo: 'Vaticano',
    href: 'https://www.vatican.va/content/vatican/pt.html',
  },
  { rotulo: 'CNBB', href: 'https://www.cnbb.org.br' },
  {
    rotulo: 'Catecismo',
    href: 'https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html',
  },
];

const Footer: React.FC = () => (
  <Rodape>
    <Grade>
      <Sobre>
        <Logo tamanho={40} />
        <p>
          Um espaço para rezar todos os dias: a liturgia de hoje, a vida dos
          santos e orações para cada momento.
        </p>
        <Redes>
          <a
            href="https://www.instagram.com/joaotdev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <PiInstagramLogo />
          </a>
          <a
            href="https://github.com/JoaocarlosTeco/Apenas-um-Catolico"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Código no GitHub"
          >
            <PiGithubLogo />
          </a>
          <a href="mailto:joao.carlosdev23@gmail.com" aria-label="E-mail">
            <PiEnvelopeSimple />
          </a>
        </Redes>
      </Sobre>

      <Coluna aria-label="Páginas">
        <h2>Navegar</h2>
        <ul>
          {NAVEGAR.map(item => (
            <li key={item.to}>
              <Link to={item.to}>{item.rotulo}</Link>
            </li>
          ))}
        </ul>
      </Coluna>

      <Coluna aria-label="Santos">
        <h2>Santos</h2>
        <ul>
          {SANTOS.map(item => (
            <li key={item.to}>
              <Link to={item.to}>{item.rotulo}</Link>
            </li>
          ))}
        </ul>
      </Coluna>

      <Coluna aria-label="Links da Igreja">
        <h2>Igreja</h2>
        <ul>
          {IGREJA.map(item => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.rotulo} <PiArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Coluna>
    </Grade>

    <Base>
      <span>© {new Date().getFullYear()} Apenas um Católico</span>
      <span>
        Liturgia via{' '}
        <a
          href="https://github.com/Dancrf/liturgia-diaria"
          target="_blank"
          rel="noopener noreferrer"
        >
          API liturgia-diaria
        </a>
      </span>
    </Base>
  </Rodape>
);

export default Footer;
