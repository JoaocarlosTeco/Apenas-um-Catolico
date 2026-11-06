import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const posts = [
  {
    id: 1,
    titulo: 'Como rezar o Terço com devoção',
    resumo: 'Dicas práticas para rezar o terço diariamente e crescer na fé.',
    data: '10/04/2025',
    path: null,
    categoria: 'Orações'
  },
  {
    id: 2,
    titulo: 'A importância da Eucaristia',
    resumo: 'Reflexão sobre o valor da Santa Missa e da comunhão.',
    data: '02/04/2025',
    path: null,
    categoria: 'Reflexões'
  },
  {
    id: 3,
    titulo: 'O exemplo de Santa Teresinha',
    resumo: 'Como a pequena via pode transformar sua vida espiritual.',
    data: '25/03/2025',
    path: null,
    categoria: 'Santos'
  },
  {
    id: 4,
    titulo: "Seu celular está destruindo sua vida",
    resumo: "Uma reflexão sincera sobre como nosso relacionamento com o celular está afetando nossa capacidade de viver o momento presente.",
    data: "15/03/2024",
    path: "/blog/celular",
    categoria: 'Reflexões'
  }
];

// Textos publicados primeiro; os que ainda estão em preparo vêm depois
const postsOrdenados = [...posts].sort((a, b) => Number(Boolean(b.path)) - Number(Boolean(a.path)));

// "15/03/2024" -> "2024-03-15" para o atributo dateTime
const dataIso = data => data.split('/').reverse().join('-');

const Pagina = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 104px 16px 72px;

  @media (min-width: 768px) {
    padding-top: 128px;
  }
`;

const Topo = styled.header`
  text-align: center;
  margin-bottom: 40px;

  &::after {
    content: '';
    display: block;
    width: 44px;
    height: 1px;
    margin: 24px auto 0;
    background: ${({ theme }) => theme.colors.gold};
  }
`;

const Sobretitulo = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 6px;
`;

const Titulo = styled.h1`
  font-size: clamp(2.4rem, 8vw, 3.2rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.titleColor};
  margin-bottom: 14px;
`;

const Subtitulo = styled.p`
  max-width: 32em;
  margin: 0 auto;
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Índice de textos, como o sumário de um livro: entradas separadas por filetes
const Lista = styled.ul`
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Entrada = styled.article`
  position: relative;
  padding: ${({ $destaque }) => ($destaque ? '30px 0 32px' : '24px 0 26px')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    padding: ${({ $destaque }) => ($destaque ? '40px 0 42px' : '28px 0 30px')};
  }
`;

const Meta = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 10px;
  margin-bottom: 6px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  time::before {
    content: '·';
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.borderColor};
  }
`;

const Categoria = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.08rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.accent};
`;

const TituloPost = styled.h2`
  font-size: ${({ $destaque }) =>
    $destaque ? 'clamp(1.75rem, 5.5vw, 2.3rem)' : 'clamp(1.4rem, 4.5vw, 1.6rem)'};
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.titleColor};
  margin-bottom: 8px;
`;

// O link cobre a entrada inteira, mas só o título é lido como texto do link
const LinkPost = styled(Link)`
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.2s ease;

  &:hover {
    color: inherit;
    text-decoration-color: currentColor;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`;

const Resumo = styled.p`
  max-width: 34em;
  font-size: ${({ $destaque }) => ($destaque ? '1.15rem' : '1.08rem')};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

const EmPreparo = styled.p`
  margin-top: 8px;
  font-size: 0.98rem;
  font-style: italic;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LerMais = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 1.05rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.accent};
`;

const CartaoPost = ({ post, emDestaque }) => {
  const publicado = Boolean(post.path);

  return (
    <li>
      <Entrada $destaque={emDestaque}>
        <Meta>
          <Categoria>{post.categoria}</Categoria>
          <time dateTime={dataIso(post.data)}>{post.data}</time>
        </Meta>
        <TituloPost $destaque={emDestaque}>
          {publicado ? <LinkPost to={post.path}>{post.titulo}</LinkPost> : post.titulo}
        </TituloPost>
        <Resumo $destaque={emDestaque}>{post.resumo}</Resumo>
        {!publicado && (
          <EmPreparo>Nosso querido católico está preparando este conteúdo especial para você. Em breve!</EmPreparo>
        )}
        {publicado && (
          <LerMais aria-hidden="true">
            Ler mais <FiArrowRight />
          </LerMais>
        )}
      </Entrada>
    </li>
  );
};

const Blog = () => (
  <Pagina>
    <Helmet>
      <title>Blog Católico - Apenas um Católico</title>
      <meta name="description" content="Reflexões, dicas e artigos católicos para sua vida espiritual. Conteúdo autêntico sobre fé, santos e crescimento espiritual." />
      <meta name="keywords" content="blog católico, reflexões católicas, artigos católicos, fé, espiritualidade, santos, orações" />
      <meta property="og:title" content="Blog Católico - Apenas um Católico" />
      <meta property="og:description" content="Reflexões, dicas e artigos católicos para sua vida espiritual." />
      <meta property="og:type" content="website" />
    </Helmet>

    <Topo>
      <Sobretitulo>Reflexões</Sobretitulo>
      <Titulo>Blog Católico</Titulo>
      <Subtitulo>
        Reflexões, dicas práticas e artigos para fortalecer sua fé e crescimento espiritual.
      </Subtitulo>
    </Topo>

    <Lista>
      {postsOrdenados.map((post, indice) => (
        <CartaoPost key={post.id} post={post} emDestaque={indice === 0 && Boolean(post.path)} />
      ))}
    </Lista>
  </Pagina>
);

export default Blog;
