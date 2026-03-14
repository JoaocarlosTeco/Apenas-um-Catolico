import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiVolume2, FiVolumeX, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 100px auto 30px;
  padding: 3rem;
  color: ${props => props.theme.colors.text};
  background: white;
  border-radius: 24px;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 1px solid ${props => props.theme.colors.secondary}15;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    width: calc(100% - 30px);
    padding: 2rem;
    margin: 80px auto 20px;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 2.5rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    color: ${props => props.theme.colors.secondary};
    transform: translateX(-5px);
  }
`;

const PostHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.secondary}15;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 2.8rem);
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  line-height: 1.25;
  font-weight: 800;
`;

const Meta = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &::before, &::after {
    content: '';
    width: 20px;
    height: 1px;
    background: ${props => props.theme.colors.secondary}40;
  }
`;

const Content = styled.div`
  font-family: 'EB Garamond', serif;
  font-size: 1.25rem;
  line-height: 1.8;

  p {
    margin-bottom: 2rem;
  }

  blockquote {
    margin: 3rem 0;
    padding: 2rem 3rem;
    background: ${props => props.theme.colors.background};
    border-left: 5px solid ${props => props.theme.colors.secondary};
    border-radius: 12px;
    font-style: italic;
    color: ${props => props.theme.colors.primary};
    font-size: 1.4rem;
    font-weight: 500;
  }

  ul {
    margin: 2rem 0;
    padding-left: 2rem;
    list-style-type: none;

    li {
      margin-bottom: 1rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: ${props => props.theme.colors.secondary};
        font-weight: bold;
      }
    }
  }
`;

const HighlightBox = styled.div`
  margin: 3.5rem 0;
  padding: 2.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid ${props => props.theme.colors.secondary}20;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: ${props => props.theme.colors.secondary};
  }

  font-style: italic;
  font-weight: 500;
`;

const Signature = styled.div`
  margin-top: 5rem;
  text-align: center;
  font-family: 'EB Garamond', serif;
  font-style: italic;
  color: ${props => props.theme.colors.textLight};
  font-size: 1.2rem;
`;

const AudioControl = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
`;

const MuteToggle = styled.button<{ $muted: boolean }>`
  background: ${props => props.$muted ? props.theme.colors.textLight : props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
`;

const CelularPost: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <PostContainer>
      <SEO 
        title="Seu celular está destruindo sua vida - Reflexão"
        description="Uma reflexão sobre como o uso excessivo do celular afeta nossa espiritualidade e presença no mundo."
        url="https://joaocarlosteco.github.io/Apenas-um-Catolico/blog/celular"
      />
      
      <audio ref={audioRef} loop autoPlay muted={isMuted}>
        <source src={`${process.env.PUBLIC_URL}/audio/blog-background.mp3`} type="audio/mpeg" />
      </audio>

      <BackButton to="/blog">
        <FiArrowLeft /> Voltar ao Blog
      </BackButton>

      <PostHeader>
        <Title>Seu celular está destruindo sua vida (e não é do jeito que você pensa)</Title>
        <Meta>15 de Outubro, 2024 • Reflexão</Meta>
      </PostHeader>

      <Content>
        <p>Oi, aqui é o João — o "Apenas um Católico" — e hoje eu queria trocar uma ideia sincera com você sobre algo que parece inofensivo, mas está minando muita coisa boa da nossa vida: o celular.</p>

        <p>Antes de qualquer coisa, não quero vir com aquele papo batido que você já escutou mil vezes. Todo mundo já sabe que as redes sociais viciam, prendem e aceleram nossa ansiedade... beleza, isso já tá no automático. Mas e se eu te disser que o problema é mais profundo — e mais perigoso?</p>

        <p>O celular não está só te distraindo. Ele está te impedindo de estar inteiro em alguma coisa. É como se ele tivesse quebrado sua capacidade de dar 100% de você a qualquer atividade.</p>

        <blockquote>
          "Faz o que deves, e está no que fazes." — São Josemaría Escrivá
        </blockquote>

        <p>Parece simples, né? Mas olha que profundo: estar no que fazes. Isso significa estar por inteiro, e hoje em dia, quantas vezes no dia você realmente está 100% presente no que está fazendo?</p>

        <HighlightBox>
          A verdade é que a gente se acostumou a viver fragmentado. Metade aqui, metade em outra aba, metade no Instagram, metade numa conversa. Nunca inteiro. E isso vai matando a profundidade, a concentração, o prazer genuíno de viver uma coisa de verdade.
        </HighlightBox>

        <p>O problema não é o celular. O problema é quando ele vira uma extensão de você — e você perde o controle. Então, comece com atitudes pequenas:</p>

        <ul>
          <li>Não leve o celular pro banheiro.</li>
          <li>Não comece o dia com ele.</li>
          <li>Não responda mensagem no meio do filme.</li>
          <li>Não durma com ele debaixo do travesseiro.</li>
        </ul>

        <p>Deixa o celular ser ferramenta, não coleira. E quando você conseguir fazer isso, quando você conseguir estar 100% numa coisa só… parabéns. Você começa a viver de verdade.</p>

        <Signature>
          Com fé,<br />
          João – Apenas um Católico
        </Signature>
      </Content>

      <AudioControl>
        <MuteToggle $muted={isMuted} onClick={toggleMute}>
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          Background Music {isMuted ? 'Off' : 'On'}
        </MuteToggle>
      </AudioControl>
    </PostContainer>
  );
};

export default CelularPost;
