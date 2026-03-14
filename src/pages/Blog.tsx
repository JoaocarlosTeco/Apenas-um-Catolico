import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { CardGrid, CardTitle, CardText } from '../components/Card';
import SEO from '../components/SEO';

interface Post {
  id: number;
  titulo: string;
  resumo: string;
  data: string;
  path: string | null;
  categoria: string;
  image?: string;
}

const posts: Post[] = [
  {
    id: 1,
    titulo: 'Como rezar o Terço com devoção',
    resumo: 'Dicas práticas para rezar o terço diariamente e crescer na fé.',
    data: '10 de Abril, 2025',
    path: null,
    categoria: 'Orações'
  },
  {
    id: 2,
    titulo: 'A importância da Eucaristia',
    resumo: 'Reflexão sobre o valor da Santa Missa e da comunhão.',
    data: '02 de Abril, 2025',
    path: null,
    categoria: 'Reflexões'
  },
  {
    id: 3,
    titulo: 'O exemplo de Santa Teresinha',
    resumo: 'Como a pequena via pode transformar sua vida espiritual.',
    data: '25 de Março, 2025',
    path: null,
    categoria: 'Santos'
  },
  {
    id: 4,
    titulo: "Seu celular está destruindo sua vida",
    resumo: "Uma reflexão sincera sobre como nosso relacionamento com o celular está afetando nossa capacidade de viver o momento presente.",
    data: "15 de Março, 2024",
    path: "/blog/celular",
    categoria: 'Reflexões'
  }
];

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 40px 15px 20px;
  }
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const BlogTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: clamp(2.5rem, 7vw, 3.5rem);
  margin-bottom: 1.5rem;
  font-weight: 800;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${props => props.theme.colors.secondary};
    border-radius: 2px;
  }
`;

const BlogSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.15rem;
  max-width: 650px;
  margin: 2rem auto 0;
  line-height: 1.6;
`;

const BlogPostCard = styled(motion.div)<{ $clickable: boolean }>`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid ${props => props.theme.colors.secondary}15;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.medium};
    border-color: ${props => props.theme.colors.secondary}40;
  }
`;

const CardContent = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const CategoryTag = styled.span`
  display: inline-block;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid ${props => props.theme.colors.secondary}30;
`;

const PostTitle = styled(CardTitle)<{ $clickable: boolean }>`
  margin-bottom: 1.25rem;
  font-size: 1.5rem;
  line-height: 1.3;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  
  ${props => props.$clickable && `
    &:hover {
      color: ${props.theme.colors.secondary};
    }
  `}
`;

const PostExcerpt = styled(CardText)`
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  flex-grow: 1;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.secondary}15;
`;

const PostDate = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.85rem;
  font-weight: 500;
`;

const ReadMore = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
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
      transform: translateX(5px);
    }
  }
`;

const PlaceholderOverlay = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px dashed ${props => props.theme.colors.secondary}40;
  
  span {
    font-size: 0.85rem;
    color: ${props => props.theme.colors.textLight};
    font-style: italic;
  }
`;

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const content = (
    <BlogPostCard
      $clickable={!!post.path}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <CardContent>
        <CategoryTag>{post.categoria}</CategoryTag>
        <PostTitle $clickable={!!post.path}>{post.titulo}</PostTitle>
        <PostExcerpt>{post.resumo}</PostExcerpt>
        
        {!post.path && (
          <PlaceholderOverlay>
            <span role="img" aria-label="pen">📝</span>
            <span>Conteúdo em preparação. Em breve aqui!</span>
          </PlaceholderOverlay>
        )}
        
        <PostMeta>
          <PostDate>{post.data}</PostDate>
          {post.path && <ReadMore>Continuar lendo</ReadMore>}
        </PostMeta>
      </CardContent>
    </BlogPostCard>
  );

  if (post.path) {
    return (
      <Link to={post.path} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </Link>
    );
  }

  return content;
};

const Blog: React.FC = () => (
  <BlogContainer>
    <SEO
      title="Blog Católico - Reflexões e Fé"
      description="Reflexões, dicas e artigos católicos para sua vida espiritual. Conteúdo autêntico sobre fé, santos e crescimento espiritual."
      keywords="blog católico, reflexões católicas, artigos católicos, fé, espiritualidade, santos, orações"
      url="https://joaocarlosteco.github.io/Apenas-um-Catolico/blog"
    />

    <BlogHeader>
      <BlogTitle>Blog Católico</BlogTitle>
      <BlogSubtitle>
        Um espaço dedicado a reflexões profundas e conselhos práticos para quem deseja 
        viver a plenitude da fé católica no mundo contemporâneo.
      </BlogSubtitle>
    </BlogHeader>

    <CardGrid minWidth="340px" gap="2.5rem">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </CardGrid>
  </BlogContainer>
);

export default Blog;
