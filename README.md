# Apenas um Católico

Site católico para rezar todos os dias: a liturgia de hoje, a vida dos santos, orações e o calendário litúrgico. Pensado primeiro para o celular.

**No ar:** https://joaocarlosteco.github.io/Apenas-um-Catolico/

## O que tem

- **Início que acompanha o dia.** A saudação muda com a hora e a folhinha do dia mostra a data, a celebração, a cor litúrgica e o Evangelho, como as folhinhas de parede. Logo abaixo, a semana litúrgica com as memórias dos santos e a roda do ano.
- **Liturgia Diária.** Primeira leitura, salmo, segunda leitura, Evangelho e orações da Missa:
  - funciona para qualquer data, navegando com anterior, hoje e próximo;
  - mostra as leituras alternativas quando o dia tem mais de uma;
  - os números dos versículos aparecem destacados e o tamanho do texto pode ser ajustado;
  - o link de cada dia pode ser compartilhado.
- **Ano litúrgico calculado no navegador.** Data da Páscoa pelo cômputo gregoriano, todas as festas móveis (com as regras do Brasil para Epifania e Ascensão), o tempo litúrgico e a semana de qualquer dia, e os ciclos dos domingos (A, B, C) e dos dias de semana (I, II). Aparece numa roda do ano na home, na liturgia e no calendário, que mostra as datas reais do ano corrente. Tudo coberto por testes.
- **Uma página diferente para cada santo.** Cada santo tem o seu próprio desenho de página (não um molde com cores trocadas), a sua paleta do topo à barra de navegação e uma medalha desenhada em traço fino:
  - São Francisco: marrom e pergaminho, o Cântico das Criaturas e as histórias dos Fioretti (o lobo de Gubbio, o sermão aos pássaros, o presépio, o Tau);
  - Santa Teresinha: rosas, a pequena via, o elevador, o Natal de 1886;
  - Padre Pio: luz de vela, as chagas, o confessionário, os milagres reconhecidos na beatificação e na canonização;
  - Nossa Senhora: manto azul, as aparições (Aparecida, Guadalupe, Lourdes, Fátima) e um terço interativo com os mistérios do dia.
- **Aprofundamento em cada santo.** Como reconhecer nas imagens, palavras e escritos com a fonte, frases famosas que não são do santo, lugares para visitar, o que ler e uma novena de nove dias que guarda o progresso no aparelho.
- **Música de cada santo.** Cantos do Missionário Shalom e da Comunidade Católica Shalom, pelos vídeos oficiais no YouTube: "Nada ter pra tudo dar / Doce é sentir" para Francisco, "O Elevador" para Teresinha, "Fica, Senhor, comigo" para Pio e "Todo Teu, ó Mãe" para Nossa Senhora. O player do YouTube abre pequeno no lugar do botão, só depois de um clique, e repete a música. Cada santo também tem uma gravação em domínio público do Wikimedia Commons, que toca por baixo da página quando não há vídeo (`src/data/musicas.js`).
- **Laudes, Orações, Calendário e Blog.** As Laudes são um roteiro local, porque não existe API pública do Ofício em português.
- **Tema claro e escuro.** Segue o sistema e guarda a escolha.
- **PWA.** O site pode ser instalado no celular e abre as páginas já visitadas sem internet.
- **Navegação de aplicativo no celular.** Barra inferior com Início, Liturgia, Santos, Orações e Mais.

## Tecnologias

- React 18 (Create React App), JavaScript e TypeScript
- styled-components (tema claro e escuro por tokens)
- React Router 6, com uma cópia do `index.html` por rota para links diretos responderem 200 no GitHub Pages
- framer-motion e react-icons
- Áudio HTML5 para a música e Service Worker para o modo offline
- API pública [liturgia-diaria](https://github.com/Dancrf/liturgia-diaria) (rota v2, com `?dia=&mes=&ano=` e `?periodo=7`)

## Como rodar

```bash
npm install
npm start
```

Abre em `http://localhost:3000/Apenas-um-Catolico`.

Para ver o build do jeito que o GitHub Pages serve:

```bash
npm run build
npm run preview
```

Abre em `http://localhost:3003/Apenas-um-Catolico/`.

Testes:

```bash
npm test
```

## Publicação

```bash
npm run deploy
```

Gera o build e publica a pasta `build/` no branch `gh-pages`. O `postbuild` (`scripts/rotas-estaticas.js`) cria uma página para cada rota, inclusive as dos santos, que são lidas de `src/data/santos.js`.

## Estrutura

```
src/
  pages/        páginas (Home, LiturgiaDiaria, Santos, Laudes, ...)
  pages/santos/ uma página por santo (PaginaFrancisco, PaginaTeresinha, PaginaPio, PaginaMaria) e o que elas compartilham
  components/   Header, Footer, Logo, Emblemas (SVG), Folhinha, RodaLiturgica, Terco, Novena, BotaoMusica
  data/         santos.js: conteúdo, cores e destaque de cada santo
  services/     liturgia.js: chamadas à API, cache por data e cores litúrgicas
  styles/       tema claro e escuro
scripts/        rotas estáticas do build e servidor de prévia
```

## Créditos

Textos da liturgia: API [liturgia-diaria](https://github.com/Dancrf/liturgia-diaria). Imagens dos santos: acervo do projeto.
