import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';
import SEO from '../components/SEO';
import { Emblema } from '../components/Emblemas';
import { santos } from '../data/santos';
import { somarDias } from '../services/anoLiturgico';
import { diaLiturgico } from '../services/calendarioLiturgico';
import { tom } from './santos/comum';

// A lista dos santos como um livro de santinhos: a medalha de cada um numa placa com a cor
// da página dele, a festa com a contagem de dias, quem ele protege, uma frase e o caminho.
// Fica na ordem das próximas festas, então a de cima é sempre a que está chegando.

const SITE = 'https://joaocarlosteco.github.io/Apenas-um-Catolico';

// a próxima data de cada santo no calendário (para Nossa Senhora, a próxima festa mariana do site)
function proximasFestas(hoje) {
  const faltam = {};
  for (
    let n = 0;
    n <= 366 && Object.keys(faltam).length < santos.length;
    n += 1
  ) {
    const info = diaLiturgico(somarDias(hoje, n));
    [info.principal, ...info.outras].forEach(c => {
      if (c?.santo && !(c.santo in faltam))
        faltam[c.santo] = { dias: n, nome: c.nome, data: info.data };
    });
  }
  return faltam;
}

const quando = n =>
  n === 0 ? 'hoje' : n === 1 ? 'amanhã' : `daqui a ${n} dias`;

const Pagina = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 96px 16px 72px;

  @media (min-width: 768px) {
    padding-top: 120px;
  }
`;

const Topo = styled.header`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 36px;

  p:first-child {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.1rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 4px;
  }

  h1 {
    font-size: clamp(2.4rem, 8vw, 3.2rem);
    line-height: 1.05;
    color: ${({ theme }) => theme.colors.titleColor};
    margin-bottom: 12px;
  }

  p:last-child {
    font-size: 1.15rem;
    font-style: italic;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Lista = styled.ol`
  list-style: none;
  display: grid;
  gap: 18px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

const Santinho = styled(Link)`
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 18px;
  height: 100%;
  padding: 18px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-top: 4px solid ${({ $cor }) => $cor};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ $cor }) => $cor};
  }

  &:hover .chamada {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  @media (min-width: 560px) {
    grid-template-columns: 148px minmax(0, 1fr);
    gap: 24px;
    padding: 24px;
  }
`;

// a placa da medalha, na cor de fundo da página do santo
const Placa = styled.div`
  align-self: start;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background: ${({ $fundo }) => $fundo};
  border: 1px solid ${({ $borda }) => $borda};
  /* as medalhas desenham parte dos traços com currentColor: usa a tinta da página do santo */
  color: ${({ $tinta }) => $tinta};

  svg {
    width: 82%;
    height: auto;
  }
`;

const Texto = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;

  small {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.02rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: ${({ theme, $cor }) => tom(theme, $cor)};
  }

  h2 {
    margin-top: 2px;
    font-size: clamp(1.45rem, 5vw, 1.8rem);
    line-height: 1.15;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  p {
    margin-top: 8px;
    font-size: 1.04rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  blockquote {
    display: none;
    margin-top: 12px;
    padding-left: 12px;
    border-left: 2px solid ${({ theme, $cor }) => tom(theme, $cor)};
    font-size: 1.04rem;
    font-style: italic;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
  }

  blockquote cite {
    display: block;
    margin-top: 4px;
    font-style: normal;
    font-size: 0.92rem;
    font-variant: small-caps;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .chamada {
    margin-top: auto;
    padding-top: 12px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: 0.88rem;
    font-weight: 600;
    color: ${({ theme, $cor }) => tom(theme, $cor)};
  }

  @media (min-width: 560px) {
    blockquote {
      display: block;
    }
  }
`;

const Caderno = styled.p`
  max-width: 560px;
  margin: 40px auto 0;
  text-align: center;
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const juntar = lista =>
  lista.length > 1
    ? `${lista.slice(0, -1).join(', ')} e ${lista[lista.length - 1]}`
    : lista[0];

const Santos = () => {
  const hoje = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);
  const festas = useMemo(() => proximasFestas(hoje), [hoje]);
  const ordem = useMemo(
    () =>
      [...santos].sort(
        (a, b) => (festas[a.slug]?.dias ?? 999) - (festas[b.slug]?.dias ?? 999)
      ),
    [festas]
  );

  return (
    <Pagina>
      <SEO
        title="Santos"
        description="São Francisco, Santa Teresinha, Padre Pio e Nossa Senhora: a vida, os escritos, a novena e a oração de cada um, numa página desenhada para ele."
        keywords="santos católicos, São Francisco, Santa Teresinha, Padre Pio, Nossa Senhora"
        url={`${SITE}/santos`}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Santos',
          url: `${SITE}/santos`,
        }}
      />

      <Topo>
        <p>Os santos da casa</p>
        <h1>Santos</h1>
        <p>
          Quatro vidas, quatro jeitos de viver o Evangelho. Cada página foi
          desenhada para combinar com quem ela conta.
        </p>
      </Topo>

      <Lista>
        {ordem.map(santo => {
          const cor = santo.cores.principal;
          const placa = santo.paleta?.claro || {};
          const festa = festas[santo.slug];
          const nomeDaFesta =
            santo.slug === 'nossa-senhora' && festa ? festa.nome : null;
          return (
            <li key={santo.slug}>
              <Santinho to={`/santos/${santo.slug}`} $cor={cor}>
                <Placa
                  $fundo={placa.fundo || '#fbf8f1'}
                  $borda={placa.borda || '#e1d7c2'}
                  $tinta={placa.titulo || '#14284b'}
                  aria-hidden="true"
                >
                  <Emblema slug={santo.slug} />
                </Placa>
                <Texto $cor={cor}>
                  <small>
                    {nomeDaFesta
                      ? `${nomeDaFesta}, ${festa.data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}`
                      : `Festa em ${santo.festa}`}
                    {festa ? ` · ${quando(festa.dias)}` : ''}
                  </small>
                  <h2>{santo.nome}</h2>
                  <p>
                    {santo.rotuloPadroeiro || 'Padroeiro'}:{' '}
                    {juntar(santo.padroeiro)}. {santo.resumo}
                  </p>
                  {santo.frase?.texto && (
                    <blockquote>
                      “{santo.frase.texto}”<cite>{santo.frase.autor}</cite>
                    </blockquote>
                  )}
                  <span className="chamada">
                    Conhecer{' '}
                    {santo.slug === 'nossa-senhora'
                      ? 'Nossa Senhora'
                      : 'a vida'}{' '}
                    <PiArrowRight aria-hidden="true" />
                  </span>
                </Texto>
              </Santinho>
            </li>
          );
        })}
      </Lista>

      <Caderno>
        Mais santos estão no <Link to="/sobre">caderno de ideias</Link>: Santo
        Antônio, São José, Santa Rita, São Bento e São Carlo Acutis.
      </Caderno>
    </Pagina>
  );
};

export default Santos;
