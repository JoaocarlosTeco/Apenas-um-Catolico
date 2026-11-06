import React from 'react';
import styled from 'styled-components';
import { PiArrowUpRight } from 'react-icons/pi';
import BotaoMusica from '../../components/BotaoMusica';
import Novena from '../../components/Novena';
import { Emblema } from '../../components/Emblemas';
import { musicas } from '../../data/musicas';
import {
  CascaDoSanto,
  CopiarOracao,
  OutrosSantos,
  ROMANOS,
  Video,
} from './comum';

// São Francisco: um manuscrito iluminado. Rubricas em vermelho, o sinal ¶ dos copistas,
// texto em colunas com a cronologia na margem e a capitular desenhada.

const RUBRICA = ({ theme }) =>
  theme.modo === 'escuro' ? '#e08a72' : '#9b2d20';
const OURO = '#b8892f';

// Títulos dos capítulos no jeito das crônicas antigas
const CAPITULOS = {
  lobo: 'Como São Francisco amansou o lobo de Gubbio',
  passaros: 'Como São Francisco pregou aos pássaros',
  presepio: 'Como São Francisco fez o presépio em Greccio',
  tau: 'Do sinal do Tau com que São Francisco assinava',
};

// Onde estão, na pintura do topo, os sinais explicados em "Como reconhecer"
const MARCAS = {
  'Hábito marrom com capuz': { x: 46, y: 62 },
  'Chagas nas mãos e nos pés': { x: 33, y: 37 },
  'Pássaros, lobo e outros animais': { x: 14, y: 22 },
};

/* ---------- Página e topo ---------- */

const Folha = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 18px;
`;

const Topo = styled.header`
  padding: 104px 0 56px;
  display: grid;
  gap: 40px;
  align-items: center;
  border-bottom: 3px double ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 860px) {
    grid-template-columns: 400px 1fr;
    gap: 64px;
    padding: 136px 0 72px;
  }
`;

const Quadro = styled.figure`
  position: relative;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    object-position: ${({ $posicao }) => $posicao};
    border: 9px solid #7a5236;
    outline: 1px solid #3b2a1c;
    outline-offset: 0;
  }

  figcaption {
    margin-top: 10px;
    font-size: 0.9rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
  }
`;

const Marca = styled.span`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  width: 26px;
  height: 26px;
  margin: -13px 0 0 -13px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #fbf6ea;
  background: #9b2d20;
  border: 2px solid #fbf6ea;
`;

const Rubrica = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  color: ${RUBRICA};
`;

const Nome = styled.h1`
  font-size: clamp(2.6rem, 9vw, 4.2rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.titleColor};
  margin: 6px 0 22px;
`;

const Lema = styled.blockquote`
  font-style: italic;
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  line-height: 1.5;
  margin-bottom: 8px;
`;

const Linha = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Selo = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 26px;

  > svg {
    width: 78px;
    height: 78px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

/* ---------- Capítulos ---------- */

const Capitulo = styled.section`
  scroll-margin-top: 84px;
  padding: 56px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 860px) {
    padding: 72px 0;
  }
`;

const Cabeca = styled.header`
  margin-bottom: 28px;

  p {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.05rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${RUBRICA};
  }

  h2 {
    font-size: clamp(1.9rem, 6vw, 2.6rem);
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  h2::before {
    content: '¶ ';
    color: ${RUBRICA};
  }
`;

/* Vida: texto em colunas com a cronologia na margem */

const Vida = styled.div`
  display: grid;
  gap: 36px;

  @media (min-width: 860px) {
    grid-template-columns: 1fr 260px;
    gap: 56px;
  }
`;

const Texto = styled.div`
  font-size: 1.15rem;
  line-height: 1.8;
  hyphens: auto;

  @media (min-width: 760px) {
    text-align: justify;
  }

  @media (min-width: 1000px) {
    columns: 2;
    column-gap: 40px;
  }

  p + p {
    text-indent: 1.4em;
  }
`;

const Capitular = styled.span`
  float: left;
  width: 76px;
  height: 76px;
  margin: 6px 14px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #6b4a2e;
  border: 2px solid ${OURO};
  outline: 1px solid ${OURO};
  outline-offset: 3px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 1;
  color: #f5ecd6;

  svg {
    position: absolute;
    inset: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    color: ${OURO};
    opacity: 0.8;
  }

  span {
    position: relative;
  }
`;

const Margem = styled.aside`
  font-size: 1rem;
  border-left: 1px solid ${RUBRICA};
  padding-left: 18px;

  h3 {
    font-size: 1.25rem;
    color: ${RUBRICA};
    font-variant: small-caps;
    margin-bottom: 10px;
  }

  ol {
    list-style: none;
    display: grid;
    gap: 10px;
  }

  strong {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.15rem;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  span {
    line-height: 1.45;
  }
`;

/* Cântico em versos, com a rubrica "Louvado sejas" */

const Hino = styled.ol`
  list-style: none;
  max-width: 680px;
  counter-reset: verso;

  li {
    counter-increment: verso;
    position: relative;
    padding: 12px 0 12px 44px;
    font-size: 1.18rem;
    line-height: 1.7;
  }

  li::before {
    content: counter(verso, upper-roman);
    position: absolute;
    left: 0;
    top: 14px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 600;
    font-size: 1.05rem;
    color: ${RUBRICA};
  }

  em {
    font-style: normal;
    color: ${RUBRICA};
  }
`;

const Introducao = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 22px;
  max-width: 680px;
`;

/* Fioretti: capítulos em duas colunas */

const Fioretti = styled.div`
  display: grid;
  gap: 34px;

  @media (min-width: 760px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px 48px;
  }

  article p {
    font-size: 1.1rem;
    line-height: 1.75;
    hyphens: auto;

    @media (min-width: 760px) {
      text-align: justify;
    }
  }

  h3 {
    font-size: 1.45rem;
    line-height: 1.2;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  small {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 600;
    font-size: 1rem;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${RUBRICA};
  }
`;

/* Como reconhecer: legenda numerada da pintura */

const Reconhecer = styled.div`
  display: grid;
  gap: 28px;
  align-items: start;

  @media (min-width: 760px) {
    grid-template-columns: 320px 1fr;
    gap: 44px;
  }
`;

const Legenda = styled.ol`
  list-style: none;
  display: grid;
  gap: 14px;

  li {
    display: grid;
    grid-template-columns: 30px 1fr;
    gap: 10px;
  }

  b {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #fbf6ea;
    background: #9b2d20;
  }

  b[data-sem-marca] {
    color: ${RUBRICA};
    background: transparent;
    border: 1px solid currentColor;
  }

  strong {
    display: block;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

/* Palavras: citações, obras com ¶ e os apócrifos riscados */

const Citacoes = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 36px;

  blockquote {
    font-size: 1.25rem;
    font-style: italic;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  cite {
    display: block;
    margin-top: 4px;
    font-style: normal;
    font-variant: small-caps;
    letter-spacing: 0.05em;
    color: ${RUBRICA};
  }
`;

const Obras = styled.dl`
  display: grid;
  gap: 14px;
  margin-bottom: 36px;

  dt {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  dt::before {
    content: '¶ ';
    color: ${RUBRICA};
  }

  dd {
    line-height: 1.6;
  }
`;

const Apocrifos = styled.div`
  padding: 22px;
  border: 1px solid ${RUBRICA};

  h3 {
    font-size: 1.4rem;
    color: ${RUBRICA};
    margin-bottom: 12px;
  }

  div + div {
    margin-top: 16px;
  }

  s {
    display: block;
    font-style: italic;
    font-size: 1.15rem;
    text-decoration-color: ${RUBRICA};
    text-decoration-thickness: 1px;
    color: ${({ theme }) => theme.colors.titleColor};
    margin-bottom: 4px;
  }
`;

/* Itinerário: as paradas ligadas por uma linha pontilhada */

const Itinerario = styled.ol`
  list-style: none;
  position: relative;
  max-width: 680px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 10px;
    bottom: 10px;
    border-left: 2px dotted ${RUBRICA};
  }

  li {
    position: relative;
    padding: 0 0 26px 50px;
  }

  li > span {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    color: ${RUBRICA};
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid currentColor;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  small {
    display: block;
    font-variant: small-caps;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Livros = styled.ul`
  list-style: none;
  display: grid;
  gap: 16px;

  cite {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  small {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-left: 8px;
  }
`;

const Oracao = styled.div`
  max-width: 560px;
  margin: 0 auto;
  text-align: center;

  > svg {
    width: 92px;
    height: 92px;
    margin: 0 auto 18px;
    display: block;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  p {
    font-style: italic;
    font-size: 1.22rem;
    line-height: 1.85;
    white-space: pre-line;
    margin-bottom: 14px;
  }

  small {
    display: block;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 18px;
  }
`;

/* Vinheta de ramagem dentro da capitular */
const Ramagem = () => (
  <svg viewBox="0 0 70 70" aria-hidden="true">
    <path
      d="M6 64 C14 50 10 40 20 34 M64 6 C56 20 60 30 50 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    {[
      [12, 50],
      [18, 40],
      [58, 20],
      [52, 30],
    ].map(([x, y]) => (
      <ellipse
        key={`${x}-${y}`}
        cx={x}
        cy={y}
        rx="4"
        ry="1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        transform={`rotate(-40 ${x} ${y})`}
      />
    ))}
  </svg>
);

const verso = item => {
  const artigo = item.titulo.startsWith('Irmã') ? 'pela' : 'pelo';
  const nome = item.titulo.charAt(0).toLowerCase() + item.titulo.slice(1);
  return (
    <>
      <em>Louvado sejas, meu Senhor, {artigo} </em>
      {nome}: {item.texto.charAt(0).toLowerCase() + item.texto.slice(1)}
    </>
  );
};

const PaginaFrancisco = ({ santo }) => {
  const musica = musicas[santo.slug];
  const [primeiro, ...resto] = santo.historia;

  return (
    <CascaDoSanto santo={santo}>
      <Folha>
        <Topo>
          <Quadro $posicao={santo.posicaoImagem}>
            <img
              src={santo.imagem}
              alt="São Francisco de Assis entre pássaros e animais"
            />
            {santo.iconografia.itens.map((item, i) =>
              MARCAS[item.simbolo] ? (
                <Marca
                  key={item.simbolo}
                  $x={MARCAS[item.simbolo].x}
                  $y={MARCAS[item.simbolo].y}
                  aria-hidden="true"
                >
                  {i + 1}
                </Marca>
              ) : null
            )}
            <figcaption>
              Os números são explicados em "Como reconhecer nas imagens".
            </figcaption>
          </Quadro>
          <div>
            <Rubrica>{santo.origem}</Rubrica>
            <Nome>{santo.nome}</Nome>
            <Lema>“{santo.frase.texto}”</Lema>
            <Linha>{santo.frase.autor}</Linha>
            <Selo>
              <Emblema slug={santo.slug} />
              <Linha>
                Festa em {santo.festa}. Padroeiro da {santo.padroeiro[0]}, da
                ecologia e dos animais.
              </Linha>
            </Selo>
            {musica && (
              <div style={{ marginTop: 22 }}>
                <BotaoMusica musica={musica} />
              </div>
            )}
          </div>
        </Topo>

        <Capitulo id="vida">
          <Cabeca>
            <p>Capítulo primeiro</p>
            <h2>A vida de Francisco</h2>
          </Cabeca>
          <Vida>
            <Texto>
              <p>
                <Capitular aria-hidden="true">
                  <Ramagem />
                  <span>{primeiro.charAt(0)}</span>
                </Capitular>
                <span style={{ position: 'absolute', left: -9999 }}>
                  {primeiro.charAt(0)}
                </span>
                {primeiro.slice(1)}
              </p>
              {resto.map(p => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </Texto>
            <Margem aria-label="Cronologia">
              <h3>Cronologia</h3>
              <ol>
                {santo.linhaDoTempo.map(marco => (
                  <li key={marco.ano}>
                    <strong>{marco.ano}</strong>
                    <span>{marco.texto}</span>
                  </li>
                ))}
              </ol>
            </Margem>
          </Vida>
        </Capitulo>

        <Capitulo id="cantico">
          <Cabeca>
            <p>Capítulo segundo</p>
            <h2>{santo.destaque.titulo}</h2>
          </Cabeca>
          <Introducao>{santo.destaque.introducao}</Introducao>
          <Hino>
            {santo.destaque.itens.map(item => (
              <li key={item.titulo}>{verso(item)}</li>
            ))}
          </Hino>
        </Capitulo>

        <Capitulo id="historias">
          <Cabeca>
            <p>Capítulo terceiro</p>
            <h2>Histórias de Francisco</h2>
          </Cabeca>
          <Introducao>
            Dos Fioretti e das primeiras biografias, como o povo contava.
          </Introducao>
          <Fioretti>
            {santo.historias.itens.map((item, i) => (
              <article key={item.titulo}>
                <small>Capítulo {ROMANOS[i]}</small>
                <h3>{CAPITULOS[item.ilustracao] || item.titulo}</h3>
                <p>{item.texto}</p>
              </article>
            ))}
          </Fioretti>
        </Capitulo>

        <Capitulo id="nas-imagens">
          <Cabeca>
            <p>Capítulo quarto</p>
            <h2>Como reconhecer nas imagens</h2>
          </Cabeca>
          <Reconhecer>
            <Introducao style={{ margin: 0 }}>
              {santo.iconografia.introducao} Os sinais marcados com número
              aparecem na pintura do alto da página.
            </Introducao>
            <Legenda>
              {santo.iconografia.itens.map((item, i) => (
                <li key={item.simbolo}>
                  <b data-sem-marca={MARCAS[item.simbolo] ? undefined : true}>
                    {i + 1}
                  </b>
                  <div>
                    <strong>{item.simbolo}</strong>
                    <span>{item.significado}</span>
                  </div>
                </li>
              ))}
            </Legenda>
          </Reconhecer>
        </Capitulo>

        <Capitulo id="palavras">
          <Cabeca>
            <p>Capítulo quinto</p>
            <h2>Palavras e escritos</h2>
          </Cabeca>
          <Introducao>{santo.escritos.introducao}</Introducao>
          <Citacoes>
            {santo.escritos.frases.map(f => (
              <figure key={f.texto}>
                <blockquote>“{f.texto}”</blockquote>
                <cite>{f.fonte}</cite>
              </figure>
            ))}
          </Citacoes>
          <Obras>
            {santo.escritos.obras.map(o => (
              <div key={o.titulo}>
                <dt>{o.titulo}</dt>
                <dd>{o.texto}</dd>
              </div>
            ))}
          </Obras>
          <Apocrifos>
            <h3>Frases que não são dele</h3>
            {santo.escritos.mitos.map(m => (
              <div key={m.frase}>
                <s>{m.frase}</s>
                <p>{m.explicacao}</p>
              </div>
            ))}
          </Apocrifos>
        </Capitulo>

        <Capitulo id="itinerario">
          <Cabeca>
            <p>Capítulo sexto</p>
            <h2>Itinerário de peregrino</h2>
          </Cabeca>
          <Itinerario>
            {santo.lugares.map((lugar, i) => (
              <li key={lugar.nome}>
                <span>{i + 1}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lugar.nome}, ${lugar.cidade}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lugar.nome} <PiArrowUpRight size={16} aria-hidden="true" />
                </a>
                <small>{lugar.cidade}</small>
                <p>{lugar.texto}</p>
              </li>
            ))}
          </Itinerario>
        </Capitulo>

        <Capitulo id="ler-e-ver">
          <Cabeca>
            <p>Capítulo sétimo</p>
            <h2>Para ler e assistir</h2>
          </Cabeca>
          <Livros>
            {santo.leituras.map(l => (
              <li key={l.titulo}>
                <cite>{l.titulo}</cite>
                <small>{l.autor}</small>
                <p>{l.texto}</p>
              </li>
            ))}
          </Livros>
          <div style={{ display: 'grid', gap: 16, marginTop: 28 }}>
            {santo.videos.map(v => (
              <Video key={v.id} id={v.id} titulo={v.titulo} />
            ))}
          </div>
        </Capitulo>

        <Capitulo id="novena">
          <Cabeca>
            <p>Capítulo oitavo</p>
            <h2>Novena a São Francisco</h2>
          </Cabeca>
          <Novena
            slug={santo.slug}
            novena={santo.novena}
            cor={santo.cores.principal}
          />
        </Capitulo>

        <Capitulo id="oracao">
          <Oracao>
            <Emblema slug={santo.slug} />
            <Rubrica>{santo.oracao.titulo}</Rubrica>
            <p>{santo.oracao.texto}</p>
            {santo.oracao.nota && <small>{santo.oracao.nota}</small>}
            <CopiarOracao oracao={santo.oracao} />
          </Oracao>
        </Capitulo>

        <section style={{ padding: '48px 0 80px' }}>
          <Cabeca>
            <p>Para continuar</p>
            <h2>Conheça também</h2>
          </Cabeca>
          <OutrosSantos atual={santo.slug} />
        </section>
      </Folha>
    </CascaDoSanto>
  );
};

export default PaginaFrancisco;
