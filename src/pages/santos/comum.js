import React, { useEffect, useMemo, useState } from 'react';
import styled, { ThemeProvider, useTheme as useTemaAtual } from 'styled-components';
import { Link } from 'react-router-dom';
import { PiArrowRight, PiCheck, PiCopy } from 'react-icons/pi';
import SEO from '../../components/SEO';
import { Emblema } from '../../components/Emblemas';
import { santos } from '../../data/santos';

// Peças comuns às páginas dos santos. Cada santo tem o seu próprio arquivo de página
// (PaginaFrancisco, PaginaTeresinha, PaginaPio, PaginaMaria) com desenho diferente;
// aqui ficam só o tema, as cores do topo, o SEO e pequenos utilitários.

export const SITE = 'https://joaocarlosteco.github.io/Apenas-um-Catolico';

export const ROMANOS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI'];

/** No tema escuro a cor do santo clareia para continuar legível */
export const tom = (theme, cor) => (theme.modo === 'escuro' ? `color-mix(in srgb, ${cor} 55%, white)` : cor);

/** Uma porcentagem da cor misturada ao fundo da página */
export const tinta = (theme, cor, quanto) => `color-mix(in srgb, ${cor} ${quanto}%, ${theme.colors.background})`;

/** O tema do site com as cores do santo: fundo, cartões, texto e bordas da paleta dele */
export function temaDoSanto(base, santo) {
  const p = santo.paleta?.[base.modo === 'escuro' ? 'escuro' : 'claro'];
  if (!p) return base;
  return {
    ...base,
    modo: p.modo || base.modo,
    colors: {
      ...base.colors,
      background: p.fundo,
      cardBackground: p.cartao,
      surface: p.cartao,
      text: p.texto,
      textLight: p.suave,
      textSecondary: p.suave,
      titleColor: p.titulo,
      borderColor: p.borda,
      secondary: santo.cores.principal,
      accent: santo.cores.principal,
    },
  };
}

const Fundo = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

/**
 * Envolve a página do santo: aplica a paleta dele ao tema, pinta o topo do site,
 * a barra de baixo e a cor do navegador, e cuida do SEO.
 */
export function CascaDoSanto({ santo, children }) {
  const temaSite = useTemaAtual();
  const tema = useMemo(() => temaDoSanto(temaSite, santo), [temaSite, santo]);

  useEffect(() => {
    const raiz = document.documentElement.style;
    const p = santo.paleta?.[temaSite.modo === 'escuro' ? 'escuro' : 'claro'];
    if (!p) return undefined;
    const destaque =
      santo.estilo === 'vela' ? santo.cores.brilho : tema.modo === 'escuro' ? tom(tema, santo.cores.principal) : santo.cores.principal;
    const valores = {
      '--topo-fundo': p.topo,
      '--fundo-pagina': p.fundo,
      '--barra-destaque': destaque,
      '--barra-fundo': tema.modo === 'escuro' ? p.topo : '',
      '--barra-texto': tema.modo === 'escuro' ? 'rgba(237, 227, 214, 0.62)' : '',
    };
    Object.entries(valores).forEach(([nome, valor]) => valor && raiz.setProperty(nome, valor));
    const meta = document.querySelector('meta[name="theme-color"]');
    const corAntes = meta?.getAttribute('content');
    meta?.setAttribute('content', p.topo.replace(/rgba\((\d+), (\d+), (\d+), [\d.]+\)/, 'rgb($1, $2, $3)'));
    return () => {
      Object.keys(valores).forEach(nome => raiz.removeProperty(nome));
      if (meta && corAntes) meta.setAttribute('content', corAntes);
    };
  }, [santo, tema, temaSite.modo]);

  return (
    <ThemeProvider theme={tema}>
      <Fundo>
        <SEO
          title={santo.nome}
          description={`${santo.resumo} História, escritos, lugares, novena e oração.`}
          image={santo.imagem}
          url={`${SITE}/santos/${santo.slug}`}
          structuredData={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: santo.nome,
            description: santo.resumo,
            url: `${SITE}/santos/${santo.slug}`,
          }}
        />
        {children}
      </Fundo>
    </ThemeProvider>
  );
}

/** Copia um texto e devolve [copiado, copiar] para mostrar "copiado" por 2 segundos */
export function useCopiar() {
  const [copiado, setCopiado] = useState(false);
  const copiar = async texto => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // sem acesso à área de transferência
    }
  };
  return [copiado, copiar];
}

const BotaoCopiar = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 3px;
  font-size: 0.88rem;
  font-weight: 600;
  color: inherit;
  border: 1px solid currentColor;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }
`;

/** Botão "Copiar oração" com o estado de copiado */
export function CopiarOracao({ oracao }) {
  const [copiado, copiar] = useCopiar();
  return (
    <BotaoCopiar type="button" onClick={() => copiar(`${oracao.titulo}\n\n${oracao.texto}`)}>
      {copiado ? <PiCheck aria-hidden="true" /> : <PiCopy aria-hidden="true" />}
      {copiado ? 'Oração copiada' : 'Copiar oração'}
    </BotaoCopiar>
  );
}

/** Vídeo do YouTube sem cookies, carregado só quando aparece na tela */
export const Video = ({ id, titulo }) => (
  <div style={{ position: 'relative', aspectRatio: '16 / 9', background: '#000' }}>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={titulo}
      loading="lazy"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
    />
  </div>
);

const ListaOutros = styled.nav`
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

  a {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    color: ${({ theme }) => theme.colors.text};
  }

  a > svg:first-child {
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  span {
    flex: 1;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    font-weight: 600;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.titleColor};
  }
`;

/** Os outros santos, com a medalha de cada um */
export function OutrosSantos({ atual }) {
  return (
    <ListaOutros aria-label="Outros santos">
      {santos
        .filter(s => s.slug !== atual)
        .map(outro => (
          <Link key={outro.slug} to={`/santos/${outro.slug}`}>
            <Emblema slug={outro.slug} />
            <span>{outro.nome}</span>
            <PiArrowRight aria-hidden="true" />
          </Link>
        ))}
    </ListaOutros>
  );
}
