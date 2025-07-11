import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiArrowLeft } from 'react-icons/fi';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

const PostContainer = styled.div`
  max-width: 800px;
  width: calc(100% - 40px);
  margin: 100px auto 30px;
  padding: 30px;
  color: #333;
  font-size: 16px;
  line-height: 1.7;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    width: calc(100% - 24px);
    margin: 80px auto 20px;
    padding: 20px;
    border-radius: 12px;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
    transform: translateX(-4px);
  }

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;

const PostHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.borderColor || 'rgba(0, 0, 0, 0.1)'};

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }
`;

const PostTitle = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  line-height: 1.3;
  font-weight: 700;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

const PostMeta = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PostContent = styled.div`
  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;

    @media (max-width: 768px) {
      margin-bottom: 1.2rem;
    }
  }

  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      padding-left: 1.2rem;
      
      li {
        margin-bottom: 0.6rem;
      }
    }
  }

  blockquote {
    margin: 2rem 0;
    padding: 1.5rem 2rem;
    border-left: 4px solid ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background || '#f8f9fa'};
    font-style: italic;
    border-radius: 0 8px 8px 0;
    position: relative;
    
    &::before {
      content: '"';
      position: absolute;
      top: -10px;
      left: 10px;
      font-size: 3rem;
      color: ${props => props.theme.colors.primary};
      opacity: 0.3;
    }
    
    @media (max-width: 768px) {
      margin: 1.5rem 0;
      padding: 1rem 1.5rem;
    }
  }
`;

const Highlight = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}10, 
    ${props => props.theme.colors.secondary}10
  );
  border-radius: ${props => props.theme.borderRadius?.lg || '12px'};
  border-left: 4px solid ${props => props.theme.colors.primary};
  font-style: italic;
  color: ${props => props.theme.colors.text};
  position: relative;

  &::before {
    content: '💭';
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    margin: 1.5rem 0;
    padding: 1.5rem;
  }
`;

const Signature = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.borderColor || 'rgba(0, 0, 0, 0.1)'};
  font-style: italic;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
`;

const AudioContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  pointer-events: auto;
  
  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

const MuteButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: ${props => props.theme.shadows?.medium || '0 4px 12px rgba(0, 0, 0, 0.2)'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows?.heavy || '0 8px 20px rgba(0, 0, 0, 0.3)'};
  }
  
  svg {
    font-size: 18px;
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 12px;
    gap: 6px;
    
    svg {
      font-size: 16px;
    }
  }
`;

const YouTubeContainer = styled.div`
  position: fixed;
  bottom: -9999px;
  right: -9999px;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
  
  iframe {
    width: 1px;
    height: 1px;
  }
`;

const EndNote = styled.div`
  text-align: center;
  margin: 3rem 0 0;
  padding: 2rem;
  background: ${props => props.theme.colors.background || '#f8f9fa'};
  border-radius: ${props => props.theme.borderRadius?.lg || '12px'};
  border: 1px solid ${props => props.theme.colors.borderColor || 'rgba(0, 0, 0, 0.1)'};

  @media (max-width: 768px) {
    margin: 2rem 0 0;
    padding: 1.5rem;
  }
`;

const EndLine = styled.div`
  height: 2px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  margin: 2rem 0 1rem;
  border-radius: 1px;
  opacity: 0.7;
`;

const CelularPost = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);

  const opts = {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      start: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      mute: 0,
    },
  };

  const onReady = (event) => {
    try {
      playerRef.current = event.target;
      event.target.unMute();
      event.target.setVolume(15);
      event.target.playVideo();
      setIsPlayerReady(true);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Erro ao inicializar player:', error);
      }
    }
  };

  const onEnd = (event) => {
    try {
      event.target.seekTo(0);
      event.target.playVideo();
          } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Erro ao reiniciar vídeo:', error);
        }
    }
  };

  const toggleMute = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          playerRef.current.setVolume(15);
        } else {
          playerRef.current.mute();
        }
        setIsMuted(!isMuted);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Erro ao alterar volume:', error);
        }
      }
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('CelularPost carregado com sucesso');
    }
    // Garantir que a página comece no topo
    window.scrollTo(0, 0);
    
    // Forçar o reposicionamento após o carregamento
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      // Cleanup para parar o vídeo quando sair da página
      if (playerRef.current) {
        try {
          playerRef.current.pauseVideo();
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Erro ao pausar vídeo:', error);
          }
        }
      }
    };
  }, []);

  return (
    <>
      <PostContainer>
        <Helmet>
          <title>Seu celular está destruindo sua vida - Blog Católico</title>
          <meta name="description" content="Uma reflexão sincera sobre como o uso do celular está afetando nossa capacidade de viver o momento presente e crescer espiritualmente." />
          <meta name="keywords" content="celular, tecnologia, espiritualidade católica, reflexão, vida presente, São Josemaría Escrivá" />
          <meta property="og:title" content="Seu celular está destruindo sua vida - Blog Católico" />
          <meta property="og:description" content="Uma reflexão sobre como o celular está impedindo nossa capacidade de estar inteiro em alguma coisa." />
          <meta property="og:type" content="article" />
        </Helmet>

        <BackButton to="/blog">
          <FiArrowLeft />
          Voltar ao Blog
        </BackButton>

        <PostHeader>
          <PostTitle>Seu celular está destruindo sua vida (e não é do jeito que você pensa)</PostTitle>
          <PostMeta>Por João - Apenas um Católico • 15 de março de 2024</PostMeta>
        </PostHeader>

        <PostContent>
          <p>Oi, aqui é o João — o "Apenas um Católico" — e hoje eu queria trocar uma ideia sincera com você sobre algo que parece inofensivo, mas está minando muita coisa boa da nossa vida: o celular.</p>

          <p>Antes de qualquer coisa, não quero vir com aquele papo batido que você já escutou mil vezes. Todo mundo já sabe que o TikTok vicia, que o Instagram prende, que o WhatsApp acelera nossa ansiedade... beleza, isso já tá no automático. Mas e se eu te disser que o problema é mais profundo — e mais perigoso?</p>

          <p>O celular não está só te distraindo. Ele está te impedindo de estar inteiro em alguma coisa. É como se ele tivesse quebrado sua capacidade de dar 100% de você a qualquer atividade.</p>

          <p>Você percebe isso no dia a dia: você não pega um ônibus, você pega o ônibus ouvindo música, respondendo mensagem, vendo reels... tudo ao mesmo tempo. Você não estuda, você estuda com o celular do lado. A cada notificação, sua atenção vai embora. E quando não tem nenhuma, você mesmo abre o celular pra procurar alguma coisa. É automático.</p>

          <blockquote>
            "Faz o que deves, e está no que fazes." — São Josemaría Escrivá
          </blockquote>

          <p>Parece simples, né? Mas olha que profundo: estar no que fazes. Isso significa estar por inteiro, e hoje em dia, quantas vezes no dia você realmente está 100% presente no que está fazendo?</p>

          <p>Poucas, né? Talvez nenhuma.</p>

          <p>A verdade é que a gente se acostumou a viver fragmentado. Metade aqui, metade em outra aba, metade no Instagram, metade numa conversa. Nunca inteiro. E isso vai matando a profundidade, a concentração, o prazer genuíno de viver uma coisa de verdade.</p>

          <Highlight>
            E sabe o pior? A gente acha normal.
            Acha que carregar o celular pra todo canto é normal. Dormir com ele do lado, acordar e já abrir o WhatsApp. E aí, meu amigo, você já começa o dia perdendo. Porque se a primeira coisa que você faz ao acordar é pegar o celular… você já acordou derrotado.
          </Highlight>

          <p>Olha, não tô dizendo pra você deletar tudo, virar monge, jogar o celular no lixo. Não é isso. Mas a mudança começa com uma coisa só: comece a dar o seu 100% em algo.</p>

          <p>Quer ver um exemplo simples? Se for estudar por 20 minutos, estuda por 20 minutos. Sem abrir outra aba, sem olhar o celular, sem responder ninguém. Só isso. Vinte minutos inteiros seus. Depois responde mensagem, depois vê vídeo, depois relaxa.</p>

          <p>O problema não é o celular. O problema é quando ele vira uma extensão de você — e você perde o controle. Então, comece com atitudes pequenas:</p>

          <ul>
            <li>Não leve o celular pro banheiro.</li>
            <li>Não comece o dia com ele.</li>
            <li>Não responda mensagem no meio do filme.</li>
            <li>Não durma com ele debaixo do travesseiro.</li>
          </ul>

          <p>Deixa o celular ser ferramenta, não coleira. E quando você conseguir fazer isso, quando você conseguir estar 100% numa coisa só… parabéns. Porque nesse momento, você começa a viver de verdade. E viver de verdade não dá tempo pra se prender numa vida falsa de tela e notificação.</p>

          <p>Seja inteiro.<br />
          Faz o que deves. Esteja no que fazes.<br />
          Só por hoje, tenta dar o seu 100%. No estudo, no descanso, na oração, no trabalho. E depois me conta como foi.</p>

          <Signature>
            Com fé,<br />
            João – Apenas um Católico
          </Signature>

          <EndNote>
            <p style={{ 
              fontStyle: 'italic', 
              color: '#888',
              fontSize: '0.9rem',
              margin: '0 0 1rem 0'
            }}>
              Até aqui, se você não percebeu, você usou outras coisas... usou o lo-fi vulgo música de fundo... 
              {isMuted ? " (música mutada)" : " (música tocando)"}
            </p>

            <EndLine />

            <p style={{ 
              textAlign: 'center', 
              fontStyle: 'italic', 
              color: '#888',
              fontSize: '1rem',
              margin: '1rem 0 0 0',
              fontWeight: '500'
            }}>
              — Fim da reflexão —
            </p>
          </EndNote>
        </PostContent>

        <YouTubeContainer>
          <YouTube
            videoId="dAv_8bg4LcY"
            opts={opts}
            onReady={onReady}
            onEnd={onEnd}
            onError={(error) => {
              if (process.env.NODE_ENV === 'development') {
                console.log('Erro no YouTube:', error);
              }
            }}
          />
        </YouTubeContainer>

        {isPlayerReady && (
          <AudioContainer>
            <MuteButton onClick={toggleMute} title={isMuted ? 'Ativar música' : 'Silenciar música'}>
              {isMuted ? <FiVolumeX /> : <FiVolume2 />}
              {isMuted ? 'Ativar' : 'Silenciar'}
            </MuteButton>
          </AudioContainer>
        )}
      </PostContainer>
    </>
  );
};

export default CelularPost; 