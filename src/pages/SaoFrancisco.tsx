import React from 'react';
import { getSantoImagePath } from '../utils/imageUtils';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const ParchmentGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap');
`;

const ParchmentContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  padding: 60px 20px;
  font-family: 'EB Garamond', serif;
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 60px 50px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.strong};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.titleColor};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
  font-family: 'Crimson Pro', serif;
`;

const Section = styled.section`
  margin-bottom: 4rem;
  line-height: 1.8;
  font-size: 1.25rem;

  h2 {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    margin-bottom: 2rem;
    padding-bottom: 0.75rem;
    border-bottom: 3px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.titleColor};
    font-family: 'Crimson Pro', serif;
  }
  
  h3 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.titleColor};
    font-family: 'Crimson Pro', serif;
  }

  p {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: 'EB Garamond', serif;
    text-align: justify;
  }

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
  }
`;

const SantoImage = styled(motion.img)`
  width: 100%;
  max-width: 500px;
  display: block;
  margin: 3rem auto;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 8px solid white;
  outline: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const VideoWrapper = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
  
  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    max-width: 700px;
    border-radius: 12px;
    border: none;
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const List = styled.ul`
  margin-top: 2rem;
  padding-left: 1.5rem;
  list-style: none;

  li {
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    padding-left: 2rem;

    &::before {
      content: "✝";
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: bold;
    }
  }
`;

const Oration = styled(motion.div)`
  font-style: italic;
  line-height: 2;
  text-align: center;
  font-size: 1.4rem;
  margin-top: 3rem;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border-top: 4px solid ${({ theme }) => theme.colors.secondary};
  border-bottom: 4px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  font-family: 'EB Garamond', serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2rem 1rem;
    font-size: 1.2rem;
  }
`;

const SaoFrancisco: React.FC = () => {
  return (
    <>
      <ParchmentGlobalStyle />
      <ParchmentContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <SEO
          title="São Francisco de Assis - História e Oração"
          description="Conheça a história inspiradora de São Francisco de Assis, sua vida de pobreza, amor à natureza e a famosa Oração da Paz."
          keywords="São Francisco de Assis, santo, padroeiro dos animais, ecologia, franciscanos, oração da paz"
          url="https://joaocarlosteco.github.io/Apenas-um-Catolico/santos/sao-francisco"
        />
        <ContentWrapper>
          <Title>São Francisco de Assis</Title>
          
          <Section>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
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
            
            <SantoImage 
              src={getSantoImagePath('sao-francisco-jovem.webp')} 
              alt="São Francisco jovem" 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            
            <p>
              Num dia simples, mas muito especial, num momento em que Francisco rezava sozinho na Igreja de São Damião, em Assis, ele sentiu que o crucifixo falava com ele, repetindo por três vezes a frase que ficou famosa: "Francisco, repara minha casa, pois olhas que está em ruínas". O santo vendeu tudo o que tinha e levou o dinheiro ao padre da Igreja de São Damião, e pediu permissão para viver com ele. Francisco tinha vinte e cinco anos. Pedro Bernardone, ao saber o que seu filho tinha feito, foi buscá-lo indignado, levou-o para casa, bateu nele e acorrentou-o pelos pés. A mãe, porém, o libertou na ausência do marido, e o jovem retornou a São Damião. Seu pai foi de novo buscá-lo. Mandou que ele voltasse para casa ou que renunciasse à sua herança. Francisco então renunciou a toda a herança e disse: "As roupas que levo pertencem também a meu pai, tenho que devolvê-las". Em seguida se desnudou e entregou suas roupas a seu pai, dizendo-lhe: "Até agora tu tem sido meu pai na terra, mas agora poderei dizer: 'Pai nosso, que estais nos céus".
            </p>
            
            <SantoImage 
              src={getSantoImagePath('sao-francisco-com-animais.png')} 
              alt="São Francisco com animais" 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            
            <h3>Vídeo sobre São Francisco</h3>
            <VideoWrapper>
              <iframe 
                src="https://www.youtube.com/embed/YnaV24Z1_Oo" 
                title="São Francisco de Assis" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoWrapper>
          </Section>

          <Section>
            <h2>Curiosidades sobre São Francisco</h2>
            <List>
              <li>É conhecido como o protetor dos animais e da natureza.</li>
              <li>Fundou a Ordem dos Franciscanos (Ordem dos Frades Menores).</li>
              <li>
                Chamava o Sol e a Lua de irmãos, reconhecendo a presença de Deus em toda a criação.
                <VideoWrapper>
                  <iframe 
                    src="https://www.youtube.com/embed/DxaqKfATuj4" 
                    title="Irmão Sol e Irmã Lua" 
                    allowFullScreen
                  ></iframe>
                </VideoWrapper>
              </li>
              <li>Recebeu os estigmas (as marcas da Paixão de Cristo), o primeiro caso registrado na história.</li>
            </List>
          </Section>

          <Section>
            <h2>Um Exemplo de Vida</h2>
            <p>
              São Francisco de Assis manifestava seu amor a Deus por uma alegria imensa, que se expressava muitas vezes em cânticos ardorosos. A quem lhe perguntava qual a razão de tal alegria, respondia que "ela deriva da pureza do coração e da constância na oração".
            </p>
          </Section>

          <Section>
            <h2>Oração a São Francisco de Assis</h2>
            <Oration
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Senhor, fazei-me instrumento de vossa paz.<br />
              Onde houver ódio, que eu leve o amor;<br />
              Onde houver ofensa, que eu leve o perdão;<br />
              Onde houver discórdia, que eu leve a união;<br />
              Onde houver duda, que eu leve a fé;<br />
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
              E é morrendo que se vive para a vida eterna.<br />
              Amém.
            </Oration>
          </Section>
        </ContentWrapper>
      </ParchmentContainer>
    </>
  );
};

export default SaoFrancisco;
