import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardGrid, CardTitle, CardText } from '../components/Card';

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

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 60px 10px 20px;
  }
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 2.5rem;
  }
`;

const BlogTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 0.5rem;
    
    &::after {
      width: 60px;
      height: 3px;
      bottom: -10px;
    }
  }
`;

const BlogSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0 10px;
  }
`;

const BlogGrid = styled(CardGrid)`
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 1.5rem;
  }
`;

const BlogPostCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface || props.theme.colors.cardBackground || 'white'};
  border-radius: ${props => props.theme.borderRadius?.lg || '16px'};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows?.light || '0 2px 8px rgba(0, 0, 0, 0.1)'};
  border: 1px solid ${props => props.theme.colors.borderColor || 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows?.medium || '0 8px 25px rgba(0, 0, 0, 0.15)'};

    &::before {
      transform: scaleX(1);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const CardContent = styled.div`
  padding: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const CategoryTag = styled.span`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
`;

const PostTitle = styled(CardTitle)`
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  font-size: 1.4rem;
  line-height: 1.3;

  ${BlogPostCard}:hover & {
    color: ${props => props.clickable ? props.theme.colors.secondary : 'inherit'};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`;

const PostExcerpt = styled(CardText)`
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-size: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.borderColor || 'rgba(0, 0, 0, 0.1)'};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const PostDate = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const ReadMore = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }

  ${BlogPostCard}:hover & {
    color: ${props => props.theme.colors.secondary};
    
    &::after {
      transform: translateX(4px);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const PlaceholderText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: 1rem 0;
  font-size: 0.9rem;
  background: ${props => props.theme.colors.background || '#f8f9fa'};
  padding: 1rem;
  border-radius: 8px;
  border: 1px dashed ${props => props.theme.colors.borderColor || 'rgba(0, 0, 0, 0.1)'};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    padding: 0.75rem;
  }
`;

const PostCard = ({ post }) => {
  const content = (
    <BlogPostCard
      clickable={!!post.path}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardContent>
        <CategoryTag>{post.categoria}</CategoryTag>
        <PostTitle clickable={!!post.path}>{post.titulo}</PostTitle>
        <PostExcerpt>{post.resumo}</PostExcerpt>
        
        {!post.path && (
          <PlaceholderText>
            📝 Nosso querido católico está preparando este conteúdo especial para você. Em breve!
          </PlaceholderText>
        )}
        
        <PostMeta>
          <PostDate>{post.data}</PostDate>
          {post.path && <ReadMore>Ler mais</ReadMore>}
        </PostMeta>
      </CardContent>
    </BlogPostCard>
  );

  if (post.path) {
    return (
      <Link to={post.path} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
};

const Blog = () => (
  <BlogContainer>
    <Helmet>
      <title>Blog Católico - Apenas um Católico</title>
      <meta name="description" content="Reflexões, dicas e artigos católicos para sua vida espiritual. Conteúdo autêntico sobre fé, santos e crescimento espiritual." />
      <meta name="keywords" content="blog católico, reflexões católicas, artigos católicos, fé, espiritualidade, santos, orações" />
      <meta property="og:title" content="Blog Católico - Apenas um Católico" />
      <meta property="og:description" content="Reflexões, dicas e artigos católicos para sua vida espiritual." />
      <meta property="og:type" content="website" />
    </Helmet>

    <BlogHeader>
      <BlogTitle>Blog Católico</BlogTitle>
      <BlogSubtitle>
        Reflexões, dicas práticas e artigos para fortalecer sua fé e crescimento espiritual. 
        Conteúdo autêntico para católicos que buscam viver sua fé no dia a dia.
      </BlogSubtitle>
    </BlogHeader>

    <BlogGrid>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </BlogGrid>
  </BlogContainer>
);

export default Blog; 