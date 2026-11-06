import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { FiArrowLeft, FiPause, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const VOLUME = 0.15;

const Pagina = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 104px 16px 72px;

  @media (min-width: 768px) {
    padding-top: 128px;
  }
`;

const Voltar = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  margin-bottom: 20px;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 0.88rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

const Topo = styled.header`
  text-align: center;
  margin-bottom: 36px;

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
  font-size: clamp(2rem, 7vw, 2.8rem);
  line-height: 1.12;
  color: ${({ theme }) => theme.colors.titleColor};
  margin-bottom: 14px;
`;

const Meta = styled.p`
  font-size: 1.02rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// A música é opcional: uma linha entre filetes, com o botão ao lado
const Musica = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 40px;
  padding: 14px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  p {
    min-width: 0;
    font-size: 1rem;
    font-style: italic;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

const BotaoTocar = styled.button`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.titleColor};
  font-size: 0.88rem;
  font-weight: 600;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: currentColor;
  }
`;

const ErroMusica = styled.p`
  margin: -28px 0 28px;
  font-size: 0.98rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.error};
`;

// Só aparece com a música tocando, para dar pausa de qualquer ponto do texto.
// No celular fica acima da barra de navegação de baixo.
const PausaFlutuante = styled(BotaoTocar)`
  position: fixed;
  right: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: ${({ theme }) => theme.zIndex.sticky};
  border-color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    bottom: calc(76px + env(safe-area-inset-bottom, 0px));
  }
`;

const Cartao = styled.article`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.14rem;
  line-height: 1.8;
  hyphens: auto;

  p + p,
  ul + p,
  p + ul {
    margin-top: 1.1em;
  }

  /* capitular na primeira letra, como abertura de capítulo */
  > p:first-of-type::first-letter {
    float: left;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 600;
    font-size: 4.1em;
    line-height: 0.78;
    padding: 6px 10px 0 0;
    color: ${({ theme }) => theme.colors.accent};
  }

  ul {
    padding-left: 1.25rem;
  }

  li + li {
    margin-top: 0.5em;
  }

  li::marker {
    color: ${({ theme }) => theme.colors.accent};
  }

  blockquote {
    margin: 1.75em 0;
    padding: 4px 0 4px 20px;
    border-left: 2px solid ${({ theme }) => theme.colors.accent};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.4rem;
    font-style: italic;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

const Destaque = styled.p`
  margin: 1.75em 0;
  padding: 22px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  font-size: 1.18rem;
  font-style: italic;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.titleColor};

  && {
    margin-top: 1.75em;
  }
`;

const Assinatura = styled.p`
  margin-top: 2.5em;
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};

  && {
    margin-top: 2.5em;
  }

  &::before {
    content: '';
    display: block;
    width: 44px;
    height: 1px;
    margin: 0 auto 24px;
    background: ${({ theme }) => theme.colors.borderColor};
  }
`;

const NotaFinal = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 0.98rem;
  font-style: italic;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Fim = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.12rem;
  font-style: normal;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.titleColor};

  &::before {
    content: '';
    display: block;
    width: 44px;
    height: 1px;
    margin: 20px auto 16px;
    background: ${({ theme }) => theme.colors.gold};
  }
`;

const CelularPost = () => {
  const audioRef = useRef(null);
  const [tocando, setTocando] = useState(false);
  const [erroAudio, setErroAudio] = useState(false);

  // A música só começa quando a pessoa pede; ao sair da página ela para
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const alternarMusica = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setErroAudio(false);
    audio.volume = VOLUME;
    try {
      await audio.play();
    } catch (erro) {
      // AbortError só significa que a pessoa pausou antes de carregar
      if (erro?.name !== 'AbortError') setErroAudio(true);
    }
  };

  return (
    <Pagina>
      <Helmet>
        <title>Seu celular está destruindo sua vida - Blog Católico</title>
        <meta name="description" content="Uma reflexão sincera sobre como o uso do celular está afetando nossa capacidade de viver o momento presente e crescer espiritualmente." />
        <meta name="keywords" content="celular, tecnologia, espiritualidade católica, reflexão, vida presente, São Josemaría Escrivá" />
        <meta property="og:title" content="Seu celular está destruindo sua vida - Blog Católico" />
        <meta property="og:description" content="Uma reflexão sobre como o celular está impedindo nossa capacidade de estar inteiro em alguma coisa." />
        <meta property="og:type" content="article" />
      </Helmet>

      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/audio/blog-background.mp3`}
        loop
        preload="none"
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
      />

      <Voltar to="/blog">
        <FiArrowLeft aria-hidden="true" />
        Voltar ao Blog
      </Voltar>

      <Topo>
        <Sobretitulo>Reflexões</Sobretitulo>
        <Titulo>Seu celular está destruindo sua vida (e não é do jeito que você pensa)</Titulo>
        <Meta>
          Por João - Apenas um Católico · <time dateTime="2024-03-15">15 de março de 2024</time>
        </Meta>
      </Topo>

      <Musica>
        <p>
          <strong>Música de fundo</strong>
          Um lo-fi para ouvir enquanto lê, se quiser.
        </p>
        <BotaoTocar type="button" onClick={alternarMusica}>
          {tocando ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
          {tocando ? 'Pausar' : 'Tocar'}
        </BotaoTocar>
      </Musica>
      {erroAudio && <ErroMusica role="alert">Não foi possível tocar a música agora.</ErroMusica>}

      <Cartao>
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

        <Destaque>
          E sabe o pior? A gente acha normal.
          Acha que carregar o celular pra todo canto é normal. Dormir com ele do lado, acordar e já abrir o WhatsApp. E aí, meu amigo, você já começa o dia perdendo. Porque se a primeira coisa que você faz ao acordar é pegar o celular… você já acordou derrotado.
        </Destaque>

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

        <Assinatura>
          Com fé,<br />
          João – Apenas um Católico
        </Assinatura>

        <NotaFinal>
          <p>
            Até aqui, se você não percebeu, você usou outras coisas... usou o lo-fi vulgo música de fundo...
            {tocando ? ' (música tocando)' : ' (música desligada)'}
          </p>
          <Fim>— Fim da reflexão —</Fim>
        </NotaFinal>
      </Cartao>

      {tocando && (
        <PausaFlutuante type="button" onClick={alternarMusica}>
          <FiPause aria-hidden="true" /> Pausar música
        </PausaFlutuante>
      )}
    </Pagina>
  );
};

export default CelularPost;
