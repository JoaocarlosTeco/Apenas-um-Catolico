import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  PiArrowUpRight,
  PiCheckBold,
  PiGithubLogo,
  PiInstagramLogo,
} from 'react-icons/pi';

// A página do projeto contada em primeira pessoa: uma carta, a linha do tempo,
// o que já existe, o que ainda está no caderno, como foi feito e a loja do autor.

const Pagina = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 16px 72px;

  @media (min-width: 768px) {
    padding-top: 120px;
  }
`;

const Topo = styled.header`
  text-align: center;
  margin-bottom: 40px;
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
  font-size: clamp(2.4rem, 8vw, 3.3rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.titleColor};
  margin-bottom: 14px;
`;

const Introducao = styled.p`
  max-width: 30em;
  margin: 0 auto;
  font-size: 1.18rem;
  font-style: italic;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* ---------- A carta ---------- */

const Carta = styled.section`
  padding: 28px 20px 26px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 640px) {
    padding: 40px 48px 36px;
  }

  p {
    font-size: 1.16rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text};
  }

  p + p {
    margin-top: 16px;
  }

  /* capitular na primeira letra, como nos livros antigos */
  p:first-of-type::first-letter {
    float: left;
    margin: 6px 10px 0 0;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 4.2rem;
    font-weight: 600;
    line-height: 0.8;
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const Assinatura = styled.p`
  margin-top: 24px !important;
  text-align: right;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.6rem !important;
  font-style: italic;
  color: ${({ theme }) => theme.colors.titleColor} !important;
`;

/* ---------- Seções ---------- */

const Secao = styled.section`
  margin-top: 56px;

  @media (min-width: 768px) {
    margin-top: 72px;
  }
`;

const TituloSecao = styled.h2`
  font-size: clamp(1.7rem, 6vw, 2.2rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.titleColor};

  span {
    display: block;
    margin-bottom: 4px;
    font-size: 1.05rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Texto = styled.p`
  margin-top: 14px;
  font-size: 1.12rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

/* ---------- Linha do tempo ---------- */

const Linha = styled.ol`
  list-style: none;
  margin-top: 24px;
  position: relative;

  /* o fio que liga os anos */
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 7px;
    width: 1px;
    background: ${({ theme }) => theme.colors.borderColor};
  }

  li {
    position: relative;
    padding: 0 0 26px 34px;
  }

  li:last-child {
    padding-bottom: 0;
  }

  /* a conta de cada marco */
  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 7px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.gold};
  }

  li[data-futuro='true']::before {
    border-style: dashed;
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.45rem;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.titleColor};
  }

  h3 small {
    margin-left: 8px;
    font-size: 1.05rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.gold};
  }

  p {
    margin-top: 4px;
    font-size: 1.08rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

/* ---------- O que existe e o que está no caderno ---------- */

const Colunas = styled.div`
  display: grid;
  gap: 36px;
  margin-top: 24px;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.3rem;
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.colors.accent};
    padding-bottom: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  }
`;

const Lista = styled.ul`
  list-style: none;
  margin-top: 14px;
  display: grid;
  gap: 12px;

  li {
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    font-size: 1.08rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Caixinha = styled.span`
  width: 20px;
  height: 20px;
  margin-top: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 1.5px solid
    ${({ theme, $feita }) =>
      $feita ? theme.colors.gold : theme.colors.textSecondary};
  background: ${({ theme, $feita }) =>
    $feita ? theme.colors.gold : 'transparent'};
  color: ${({ theme }) => theme.colors.cardBackground};
  opacity: ${({ $feita }) => ($feita ? 1 : 0.7)};

  svg {
    width: 13px;
    height: 13px;
  }
`;

const Nota = styled.p`
  margin-top: 18px;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* ---------- Contato ---------- */

const Botoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const Botao = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  color: ${({ theme }) => theme.colors.titleColor};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 0.9rem;
  font-weight: 600;
  transition: border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.titleColor};
    border-color: currentColor;
  }

  svg {
    font-size: 1.15rem;
  }
`;

/* ---------- A loja ---------- */

// cartão de papel claro nos dois temas, para o logo azul e dourado da Santus aparecer sempre
const Loja = styled.a`
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  margin-top: 20px;
  padding: 16px 18px;
  border-radius: 4px;
  background: #fbf8f1;
  border: 1px solid #e1d7c2;
  color: #1f2430;
  transition: border-color 0.2s ease;

  &:hover {
    color: #1f2430;
    border-color: #c5a059;
  }

  img {
    width: 84px;
    height: auto;
  }

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.1;
    color: #0d2b45;
  }

  p {
    margin-top: 4px;
    font-size: 1.02rem;
    line-height: 1.5;
    color: #4c5260;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: 0.86rem;
    font-weight: 600;
    color: #85662a;
  }

  @media (min-width: 560px) {
    grid-template-columns: 108px minmax(0, 1fr);
    gap: 22px;
    padding: 20px 24px;

    img {
      width: 108px;
    }
  }
`;

const Bencao = styled.p`
  margin-top: 72px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.45rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.titleColor};

  &::before {
    content: '';
    display: block;
    width: 44px;
    height: 1px;
    margin: 0 auto 20px;
    background: ${({ theme }) => theme.colors.gold};
  }
`;

const MARCOS = [
  {
    quando: '2024',
    titulo: 'A ideia',
    texto:
      'Muita coisa pensada e anotada: liturgia, santos, orações. Faltava saber como transformar aquilo em código.',
  },
  {
    quando: 'abril de 2025',
    titulo: 'O primeiro commit',
    texto:
      'No dia 6 de abril saíram as primeiras páginas. Ainda simples, mas já era o projeto de pé.',
  },
  {
    quando: 'julho de 2025',
    titulo: 'No ar',
    texto:
      'A primeira versão foi publicada no GitHub Pages, aberta para quem quisesse usar.',
  },
  {
    quando: 'novembro de 2026',
    titulo: 'Tudo de novo',
    texto:
      'O site foi refeito do zero: liturgia de qualquer dia, ano litúrgico calculado, uma página diferente para cada santo, calendário em folhinha, orações para cada momento e música.',
  },
  {
    quando: 'depois',
    titulo: 'Quem sabe',
    texto: 'Ainda tem muita ideia no caderno. Algumas estão logo abaixo.',
    futuro: true,
  },
];

const JA_EXISTE = [
  'Liturgia diária de qualquer data, com as leituras alternativas',
  'Ano litúrgico calculado no próprio site, com as regras do Brasil',
  'Calendário com a cor de cada dia, os santos e as novenas',
  'Uma página própria para São Francisco, Santa Teresinha, Padre Pio e Nossa Senhora',
  'Terço com os mistérios do dia',
  'Novenas que lembram em que dia você parou',
  'Orações para o acordar, a mesa e a noite',
  'Funciona bem no celular e pode ser instalado como aplicativo',
];

const NO_CADERNO = [
  'Mais santos: Santo Antônio, São José, Santa Rita, São Bento, São Carlo Acutis',
  'A Liturgia das Horas completa, se aparecer uma fonte aberta em português',
  'Um exame de consciência para preparar a confissão',
  'O terço rezado em áudio, para acompanhar no caminho',
  'Um lembrete do Angelus ao meio-dia',
  'Um caderno de intenções, guardado só no seu aparelho',
  'A liturgia da semana disponível mesmo sem internet',
];

const Sobre = () => (
  <Pagina>
    <Helmet>
      <title>Sobre - Apenas um Católico</title>
      <meta
        name="description"
        content="A história do Apenas um Católico: um projeto pessoal que nasceu como ideia em 2024, foi ao ar em 2025 e foi refeito em 2026. O que já existe e o que ainda vem."
      />
    </Helmet>

    <Topo>
      <Sobretitulo>Sobre o projeto</Sobretitulo>
      <Titulo>Um projeto pessoal</Titulo>
      <Introducao>
        Feito nas horas vagas, sem anúncio e sem pressa, para rezar todo dia com
        a Igreja.
      </Introducao>
    </Topo>

    <Carta aria-label="Carta de quem fez o site">
      <p>
        A ideia do Apenas um Católico vem de 2024. Eu já tinha pensado em muita
        coisa: um lugar para ler a liturgia do dia, conhecer a vida dos santos,
        ter as orações à mão no celular. Ideia não faltava. O que faltava era
        saber como escrever tudo isso.
      </p>
      <p>
        Fui aprendendo aos poucos. Em 2025 o site foi ao ar pela primeira vez,
        simples do jeito que dava. Agora, em 2026, ele foi refeito inteiro, com
        cuidado em cada página, e ainda tem coisa que ficou no caderno para
        depois.
      </p>
      <p>
        O nome diz o que ele é: não é o site de uma paróquia nem de um teólogo.
        É de apenas um católico, que quis juntar num lugar só o que ajuda a
        rezar. Não ganho dinheiro com ele, e a ideia é que continue assim.
      </p>
      <p>Se ele ajudar você a rezar um pouco mais, já valeu.</p>
      <Assinatura>João Carlos</Assinatura>
    </Carta>

    <Secao aria-labelledby="sobre-caminho">
      <TituloSecao id="sobre-caminho">
        <span>de 2024 até aqui</span>O caminho
      </TituloSecao>
      <Linha>
        {MARCOS.map(marco => (
          <li
            key={marco.quando}
            data-futuro={marco.futuro ? 'true' : undefined}
          >
            <h3>
              {marco.titulo}
              <small>{marco.quando}</small>
            </h3>
            <p>{marco.texto}</p>
          </li>
        ))}
      </Linha>
    </Secao>

    <Secao aria-labelledby="sobre-ideias">
      <TituloSecao id="sobre-ideias">
        <span>o que saiu do papel e o que ainda não</span>O caderno de ideias
      </TituloSecao>
      <Colunas>
        <div>
          <h3>Já existe</h3>
          <Lista>
            {JA_EXISTE.map(item => (
              <li key={item}>
                <Caixinha $feita aria-hidden="true">
                  <PiCheckBold />
                </Caixinha>
                {item}
              </li>
            ))}
          </Lista>
        </div>
        <div>
          <h3>Quem sabe, um dia</h3>
          <Lista>
            {NO_CADERNO.map(item => (
              <li key={item}>
                <Caixinha aria-hidden="true" />
                {item}
              </li>
            ))}
          </Lista>
          <Nota>
            São vontades, não promessas. Se tiver uma ideia, me conte.
          </Nota>
        </div>
      </Colunas>
    </Secao>

    <Secao aria-labelledby="sobre-como">
      <TituloSecao id="sobre-como">
        <span>para quem programa</span>Como foi feito
      </TituloSecao>
      <Texto>
        React, styled-components e a API pública{' '}
        <a
          href="https://github.com/Dancrf/liturgia-diaria"
          target="_blank"
          rel="noopener noreferrer"
        >
          liturgia-diaria
        </a>
        . A data da Páscoa, as festas móveis e a celebração de cada dia são
        calculadas no próprio navegador, com testes automatizados conferidos
        contra a liturgia oficial. Os desenhos dos santos são feitos em SVG, à
        mão, em código. O código é aberto no GitHub.
      </Texto>
      <Texto>
        Sem cadastro, sem anúncio e sem rastreamento. O que o site guarda (o
        tema, o tamanho da letra, o progresso das novenas) fica só no seu
        aparelho.
      </Texto>
    </Secao>

    <Secao aria-labelledby="sobre-contato">
      <TituloSecao id="sobre-contato">
        <span>sugestões, erros, ideias</span>Fale comigo
      </TituloSecao>
      <Texto>
        Achou um erro numa oração ou numa data? Tem uma ideia para o caderno?
        Pode mandar.
      </Texto>
      <Botoes>
        <Botao
          href="https://www.instagram.com/joaocarlostdm/?hl=pt-br"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiInstagramLogo aria-hidden="true" /> Instagram
        </Botao>
        <Botao
          href="https://github.com/JoaocarlosTeco/Apenas-um-Catolico"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiGithubLogo aria-hidden="true" /> Código no GitHub
        </Botao>
      </Botoes>
    </Secao>

    <Secao aria-labelledby="sobre-loja">
      <TituloSecao id="sobre-loja">
        <span>aproveitando o espaço</span>A minha loja
      </TituloSecao>
      <Texto>
        Eu também tenho uma loja de roupa católica, a Santus. Se quiser comprar
        alguma coisa, pode ir lá dar uma olhada. Vou ficar muito feliz.
      </Texto>
      <Loja
        href="https://www.santus.shop"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/santus.png`}
          alt=""
          width="108"
          height="107"
          loading="lazy"
        />
        <div>
          <strong>Santus</strong>
          <p>
            Roupa católica com propósito: camisetas, linha infantil e
            acessórios.
          </p>
          <span>
            Visitar santus.shop <PiArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </Loja>
      <Nota>
        O site continua sem anúncio. Isso aqui é só um amigo indicando a própria
        loja.
      </Nota>
    </Secao>

    <Bencao>Que Deus abençoe você!</Bencao>
  </Pagina>
);

export default Sobre;
