import { useEffect } from 'react';

// As seções de cada página surgem de leve (sobem e aparecem) quando entram na tela.
// Vale para o site inteiro: depois que a página carrega, marca as <section> de primeiro nível
// que estão abaixo da dobra e as revela com um IntersectionObserver.
// O que já está visível ao abrir não é tocado, e quem pede menos movimento não vê nada disso.

const CLASSE = 'revelar';
const VISIVEL = 'revelar-visivel';
const DURACAO_MS = 900;

function candidatas(raiz) {
  // só a seção mais de fora: uma seção dentro de outra não anima duas vezes
  return Array.from(raiz.querySelectorAll('section')).filter(
    s => !s.parentElement?.closest('section') && !s.dataset.revelada
  );
}

export default function useRevelarAoRolar(chave) {
  useEffect(() => {
    const raiz = document.getElementById('main-content');
    if (!raiz || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
      return undefined;

    const temporizadores = new Set();
    const observador = new IntersectionObserver(
      entradas => {
        entradas.forEach(entrada => {
          if (!entrada.isIntersecting) return;
          const el = entrada.target;
          observador.unobserve(el);
          el.classList.add(VISIVEL);
          // terminada a animação, tira as classes: o transform não pode ficar (atrapalha position: fixed)
          const t = setTimeout(() => {
            el.classList.remove(CLASSE, VISIVEL);
            temporizadores.delete(t);
          }, DURACAO_MS);
          temporizadores.add(t);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    const marcar = () => {
      // aba em segundo plano ou tela sem altura: o observador não roda, então nada é escondido
      const altura =
        window.innerHeight || document.documentElement.clientHeight;
      if (document.visibilityState === 'hidden' || !altura) return;
      candidatas(raiz).forEach(s => {
        s.dataset.revelada = '1';
        // o que já aparece na tela ao abrir fica como está
        if (s.getBoundingClientRect().top < altura * 0.92) return;
        s.classList.add(CLASSE);
        observador.observe(s);
      });
    };

    // as páginas carregam sob demanda: espera o conteúdo chegar no main
    marcar();
    const mutacoes = new MutationObserver(() => marcar());
    mutacoes.observe(raiz, { childList: true, subtree: true });

    return () => {
      mutacoes.disconnect();
      observador.disconnect();
      temporizadores.forEach(clearTimeout);
    };
  }, [chave]);
}
