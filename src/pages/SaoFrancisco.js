import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/SEO';

const ParchmentGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap');
`;

const ParchmentContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  background-size: 100% auto;
  padding: 60px 20px;
  font-family: 'EB Garamond', serif;
  color: ${({ theme }) => theme.colors.text};
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 40px;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 3.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.titleColor};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  line-height: 1.8;
  font-size: 1.2rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.titleColor};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  
  h3 {
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.titleColor};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  p {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.25rem;
  }

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }
`;

const SantoImage = styled.img`
  width: 100%;
  max-width: 400px;
  display: block;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 5px solid ${({ theme }) => theme.colors.secondary};
  filter: brightness(0.95) contrast(1.1);
`;

const VideoWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  iframe {
    width: 100%;
    max-width: 560px;
    height: 315px;
    border-radius: 10px;
    border: 3px solid ${({ theme }) => theme.colors.secondary};
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const List = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem;
  li {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.text};
    &::before {
      content: "•";
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const Oration = styled.div`
  font-style: italic;
  line-height: 2;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 2rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 5px;
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

const SaoFrancisco = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <ParchmentGlobalStyle />
      <ParchmentContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <SEO
          title="São Francisco de Assis"
          description="Conheça a história, curiosidades e oração de São Francisco de Assis, o santo padroeiro dos animais e da ecologia."
          keywords="São Francisco de Assis, santo, padroeiro dos animais, ecologia, franciscanos, oração"
          url="https://apenas-um-catolico.vercel.app/santos/sao-francisco"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "São Francisco de Assis",
            "description": "Santo católico, fundador dos franciscanos e padroeiro dos animais",
            "birthDate": "1182",
            "deathDate": "1226",
            "birthPlace": "Assis, Itália",
            "nationality": "Italiana",
            "religion": "Católica Romana",
            "occupation": "Frade, Fundador dos Franciscanos",
            "url": "https://apenas-um-catolico.vercel.app/santos/sao-francisco"
          }}
        />
        <ContentWrapper>
          <Title>São Francisco de Assis</Title>
          <Section>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              Aqui você vai conhecer a história de um santo muito amado. E no final, prepare-se para descobrir algumas curiosidades especiais sobre ele!
            </motion.p>
          </Section>
          <Section>
            <h2>História de São Francisco</h2>
            <p>
              São Francisco de Assis nasceu em Assis, Itália, em 1182. Era filho de Pedro Bernardone, um rico comerciante, e Pia, de família nobre da Provença. Na juventude, Francisco era muito rico e esbanjava dinheiro com ostentações. Porém, os negócios de seu pai não lhe despertaram interesse, muito menos os estudos. O que ele queria mesmo era se divertir. Porém, São Boaventura, seu contemporâneo, escreveu sobre ele: "Mas, com o auxílio divino, jamais se deixou levar pelo ardor das paixões que dominavam os jovens de sua companhia".
            </p>
            <p>
              Ambicioso, desejava ser cavaleiro e conquistar honra nas batalhas. Contudo, após uma longa doença e experiências espirituais profundas, Francisco começou a repensar o sentido da vida. Um dia, ao rezar na igreja de São Damião, ouviu a voz de Cristo lhe dizendo: <em>"Francisco, reconstrói a minha Igreja"</em>.
            </p>
            <SantoImage src="/images/santos/sao-francisco-jovem.webp" alt="São Francisco jovem" />
            <p>
              Num dia simples, mas muito especial, num momento em que Francisco rezava sozinho na Igreja de São Damião, em Assis, ele sentiu que o crucifixo falava com ele, repetindo por três vezes a frase que ficou famosa: "Francisco, repara minha casa, pois olhas que está em ruínas". O santo vendeu tudo o que tinha e levou o dinheiro ao padre da Igreja de São Damião, e pediu permissão para viver com ele. Francisco tinha vinte e cinco anos. Pedro Bernardone, ao saber o que seu filho tinha feito, foi buscá-lo indignado, levou-o para casa, bateu nele e acorrentou-o pelos pés. A mãe, porém, o libertou na ausência do marido, e o jovem retornou a São Damião. Seu pai foi de novo buscá-lo. Mandou que ele voltasse para casa ou que renunciasse à sua herança. Francisco então renunciou a toda a herança e disse: "As roupas que levo pertencem também a meu pai, tenho que devolvê-las". Em seguida se desnudou e entregou suas roupas a seu pai, dizendo-lhe: "Até agora tu tem sido meu pai na terra, mas agora poderei dizer: 'Pai nosso, que estais nos céus".
            </p>
            <SantoImage src="/images/santos/sao-francisco-com-animais.png" alt="São Francisco com animais" />
            <h3>Vídeo sobre São Francisco</h3>
            <VideoWrapper>
              <iframe src="https://www.youtube.com/embed/YnaV24Z1_Oo" title="São Francisco de Assis" allowFullScreen></iframe>
            </VideoWrapper>
          </Section>
          <Section>
            <h2>Curiosidades sobre São Francisco</h2>
            <List>
              <li>É conhecido como o protetor dos animais e da natureza.</li>
              <li>Fundou a Ordem dos Franciscanos.</li>
              <li>
                Chamava o Sol e a Lua de irmãos.
                <VideoWrapper>
                  <iframe src="https://www.youtube.com/embed/DxaqKfATuj4" title="Irmão Sol e Irmã Lua" allowFullScreen></iframe>
                </VideoWrapper>
              </li>
              <li>Recebeu os estigmas (as marcas da Paixão de Cristo).</li>
            </List>
          </Section>
          <Section>
            <h2>São Francisco de Assis, um exemplo de vida</h2>
            <p>
              São Francisco de Assis manifestava seu amor a Deus por uma alegria imensa, que se expressava muitas vezes em cânticos ardorosos. A quem lhe perguntava qual a razão de tal alegria, respondia que "ela deriva da pureza do coração e da constância na oração".
            </p>
          </Section>
          <Section>
            <h2>Oração a São Francisco de Assis</h2>
            <Oration>
              Senhor, fazei-me instrumento de vossa paz.<br />
              Onde houver ódio, que eu leve o amor;<br />
              Onde houver ofensa, que eu leve o perdão;<br />
              Onde houver discórdia, que eu leve a união;<br />
              Onde houver dúvida, que eu leve a fé;<br />
              Onde houver erro, que eu leve a verdade;<br />
              Onde houver desespero, que eu leve a esperança;<br />
              Onde houver tristeza, que eu leve a alegria;<br />
              Onde houver trevas, que eu leve a luz.<br /><br />
              Ó Mestre, fazei que eu procure mais<br />
              Consolar, que ser consolado;<br />
              Compreender, que ser compreendido;<br />
              Amar, que ser amado.<br /><br />
              Pois, é dando que se recebe,<br />
              É perdoando que se é perdoado,<br />
              E é morrendo que se vive para a vida eterna.
            </Oration>
          </Section>
        </ContentWrapper>
      </ParchmentContainer>
    </>
  );
};

export default SaoFrancisco; 