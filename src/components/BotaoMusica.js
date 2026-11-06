import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PiMusicNotes, PiPause } from 'react-icons/pi';

// Música do santo. Gravações livres tocam por baixo da página, num <audio> sem nada visível,
// em loop, que entra e sai com o volume subindo e descendo devagar.
// Músicas com direito autoral usam o player oficial do YouTube, visível, como pedem os termos dele.
// As duas só começam com um clique (os navegadores bloqueiam som automático) e param ao sair da página.

const VOLUME = 0.55;

export const BotaoAmbiente = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 3px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ $claro }) => ($claro ? '#f4efe4' : 'inherit')};
  background: transparent;
  border: 1px solid
    ${({ $claro }) => ($claro ? 'rgba(244, 239, 228, 0.4)' : 'currentColor')};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $claro }) =>
      $claro ? 'rgba(244, 239, 228, 0.1)' : 'rgba(0, 0, 0, 0.04)'};
  }

  &:disabled {
    opacity: 0.7;
    cursor: progress;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Bloco = styled.div`
  display: grid;
  gap: 6px;
`;

const Credito = styled.small`
  font-size: 0.82rem;
  line-height: 1.4;
  opacity: 0.72;

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

function fadeAte(audio, alvo, ms, aoTerminar) {
  const passos = 20;
  const inicio = audio.volume;
  let passo = 0;
  const id = window.setInterval(() => {
    passo += 1;
    audio.volume = Math.max(
      0,
      Math.min(1, inicio + ((alvo - inicio) * passo) / passos)
    );
    if (passo >= passos) {
      window.clearInterval(id);
      aoTerminar?.();
    }
  }, ms / passos);
  return id;
}

/** Gravação livre tocando escondida, com volume que sobe e desce devagar */
const MusicaGravada = ({ musica, claro }) => {
  const [estado, setEstado] = useState('parado'); // parado | carregando | tocando | erro
  const audio = useRef(null);
  const fade = useRef(null);

  // ao sair da página, a música para
  useEffect(
    () => () => {
      window.clearInterval(fade.current);
      if (audio.current) {
        audio.current.pause();
        audio.current.src = '';
      }
    },
    []
  );

  const tocar = () => {
    if (!audio.current) {
      const novo = new Audio();
      novo.preload = 'none';
      novo.loop = true;
      novo.src = musica.url;
      novo.addEventListener('playing', () => setEstado('tocando'));
      novo.addEventListener('waiting', () => setEstado('carregando'));
      novo.addEventListener('error', () => setEstado('erro'));
      audio.current = novo;
    }
    const a = audio.current;
    a.volume = 0;
    setEstado('carregando');
    a.play()
      .then(() => {
        window.clearInterval(fade.current);
        fade.current = fadeAte(a, VOLUME, 2000);
      })
      .catch(() => setEstado('erro'));
  };

  const pausar = () => {
    const a = audio.current;
    if (!a) return;
    window.clearInterval(fade.current);
    fade.current = fadeAte(a, 0, 800, () => a.pause());
    setEstado('parado');
  };

  const tocando = estado === 'tocando' || estado === 'carregando';

  return (
    <Bloco>
      <BotaoAmbiente
        type="button"
        $claro={claro}
        onClick={tocando ? pausar : tocar}
        aria-pressed={tocando}
      >
        {tocando ? (
          <PiPause aria-hidden="true" />
        ) : (
          <PiMusicNotes aria-hidden="true" />
        )}
        {estado === 'carregando'
          ? 'Carregando a música…'
          : estado === 'tocando'
            ? 'Pausar a música'
            : musica.rotulo}
      </BotaoAmbiente>
      <Credito>
        {estado === 'erro' ? (
          'Não foi possível tocar a música agora. Confira a conexão e tente de novo.'
        ) : (
          <>
            {musica.obra} · {musica.interprete} ·{' '}
            <a href={musica.pagina} target="_blank" rel="noopener noreferrer">
              {musica.licenca}, Wikimedia Commons
            </a>
          </>
        )}
      </Credito>
    </Bloco>
  );
};

const Player = styled.div`
  width: 100%;
  max-width: 360px;

  /* o YouTube pede no mínimo 200 por 200 pixels para o player */
  > div {
    position: relative;
    aspect-ratio: 16 / 9;
    min-height: 200px;
    border-radius: 3px;
    overflow: hidden;
    background: #000;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

/**
 * Música com direito autoral: o player oficial do YouTube, visível (exigência dos termos do YouTube).
 * Aparece pequeno onde está o botão e continua tocando enquanto a pessoa desce a página.
 */
const MusicaYoutube = ({ musica, claro }) => {
  const [aberto, setAberto] = useState(false);
  const { id, titulo, artista } = musica.youtube;

  return (
    <Bloco>
      {aberto ? (
        <Player>
          <div>
            <iframe
              // loop com playlist do próprio vídeo: a música recomeça sozinha, como as gravações livres
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&rel=0&playsinline=1`}
              title={`${titulo}, de ${artista}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Player>
      ) : null}
      <BotaoAmbiente
        type="button"
        $claro={claro}
        onClick={() => setAberto(!aberto)}
        aria-pressed={aberto}
      >
        {aberto ? (
          <PiPause aria-hidden="true" />
        ) : (
          <PiMusicNotes aria-hidden="true" />
        )}
        {aberto ? 'Fechar a música' : `Ouvir ${titulo}`}
      </BotaoAmbiente>
      <Credito>
        {titulo} · {artista} · vídeo oficial no YouTube
      </Credito>
    </Bloco>
  );
};

/** @param {{ musica: { rotulo, obra, interprete, licenca, pagina, url, youtube? }, claro?: boolean }} props */
const BotaoMusica = ({ musica, claro = false }) =>
  musica.youtube ? (
    <MusicaYoutube musica={musica} claro={claro} />
  ) : (
    <MusicaGravada musica={musica} claro={claro} />
  );

export default BotaoMusica;
