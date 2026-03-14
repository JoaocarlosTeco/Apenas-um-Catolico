import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiShare2 } from 'react-icons/fi';
import SEO from '../components/SEO';

interface Psalm {
  title?: string;
  ant: string;
  psalm: string;
}

interface LectioBrevis {
  reading: string;
  reference: string;
}

interface LaudesData {
  invitatorium: {
    ant: string;
    psalm: string;
  };
  hymn: string;
  psalms: Psalm[];
  lectioBrevis: LectioBrevis;
  benedictus: {
    ant: string;
    psalm: string;
  };
  preces: string[];
  oratio: string;
}

const LaudesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 30px 15px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const DateInfo = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.1rem;
  margin-bottom: 12px;
  font-weight: 500;
`;

const LaudesTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 800;
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.1rem;
  margin-top: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid ${props => props.theme.colors.secondary}15;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FontControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const IconButton = styled.button`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.secondary}30;
  color: ${props => props.theme.colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const ShareButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const TabContainer = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.secondary}15;
`;

const TabHeader = styled.div`
  display: flex;
  background: ${props => props.theme.colors.background};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  min-width: 140px;
  padding: 1.25rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  border: none;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: ${props.theme.colors.secondary};
    }
  `}

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TabContent = styled(motion.div)`
  padding: 3rem;
  min-height: 400px;
  font-family: 'EB Garamond', serif;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const EntryTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-family: 'EB Garamond', serif;
  font-weight: 700;
  border-bottom: 2px solid ${props => props.theme.colors.secondary}30;
  padding-bottom: 1rem;
`;

const MainText = styled.div<{ fontSize: number }>`
  line-height: 1.8;
  font-size: ${props => props.fontSize}px;
  color: ${props => props.theme.colors.text};

  .antiphon {
    background: ${props => props.theme.colors.background};
    padding: 1rem 1.5rem;
    border-radius: 12px;
    border-left: 5px solid ${props => props.theme.colors.secondary};
    font-style: italic;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }

  .verse {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  .response {
    text-align: center;
    font-weight: 800;
    color: ${props => props.theme.colors.secondary};
    margin: 2rem 0;
    font-size: 1.1em;
  }
`;

const Reference = styled.div`
  margin-top: 3rem;
  text-align: right;
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  font-size: 0.9em;
`;

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 4px solid ${props => props.theme.colors.background};
  border-top-color: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  margin: 4rem auto;
`;

const generateDynamicLaudes = (_dayOfWeek: number, _dayOfMonth: number): LaudesData => {
  const salmos = [
    {
      title: "Salmo 63 (62) - Sede de Deus",
      ant: "Cantai ao Senhor um cântico novo, porque Ele fez maravilhas.",
      psalm: `Minha alma tem sede de Deus, do Deus vivo:
quando irei contemplar a face de Deus?
Como a corça suspira pelas águas correntes,
assim minha alma suspira por vós, ó meu Deus.`
    },
    {
      title: "Salmo 100 (99) - Alegria dos que entram no templo",
      ant: "Servi ao Senhor com alegria, entrai em sua presença cantando de júbilo.",
      psalm: `Aclamai o Senhor, ó terra inteira,
servi ao Senhor com alegria,
entrai em sua presença cantando de júbilo!`
    }
  ];

  return {
    invitatorium: {
      ant: "Vinde, adoremos o Senhor, nosso Rei e Salvador.",
      psalm: `Vinde, exultemos de alegria no Senhor,
aclamemos o Rochedo que nos salva!
Apresentemo-nos a ele com louvores
e com cantos o nosso júbilo expressemos!`
    },
    hymn: `Ó esplendor da glória do Pai,
ó luz da luz e fonte de luz,
ó dia que iluminas o dia,
ó sol que brilhas no meio-dia.`,
    psalms: salmos,
    lectioBrevis: {
      reading: "Irmãos, tudo o que é verdadeiro, tudo o que é nobre, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, se alguma virtude há e se algum louvor existe, seja isso o que ocupe os vossos pensamentos.",
      reference: "Fl 4, 8"
    },
    benedictus: {
      ant: "Bendito seja o Senhor Deus de Israel, porque visitou e redimiu o seu povo.",
      psalm: `Bendito seja o Senhor Deus de Israel,
porque visitou e redimiu o seu povo,
e nos suscitou uma força salvadora
na casa de Davi, seu servo.`
    },
    preces: [
      "Cristo, sol de justiça, que iluminas todo homem que vem a este mundo, nós vos louvamos.",
      "Vós que ressuscitastes glorioso no primeiro dia da semana, renovai hoje a nossa alegria.",
      "Vós que aparecestes aos discípulos e lhes dissestes: 'A paz esteja convosco', dai-nos a vossa paz."
    ],
    oratio: `Ó Deus, que fizestes brilhar sobre nós a luz do novo dia, concedei-nos passar este dia sem cair em pecado, para que, ao chegar à tarde, vos possamos louvar com alegria. Por nosso Senhor Jesus Cristo, vosso Filho, na unidade do Espírito Santo. Amém.`
  };
};

const Laudes: React.FC = () => {
  const [laudes, setLaudes] = useState<LaudesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const today = new Date();
    setLaudes(generateDynamicLaudes(today.getDay(), today.getDate()));
    setLoading(false);
  }, []);

  const changeFontSize = (delta: number) => {
    setFontSize(prev => Math.min(Math.max(prev + delta, 14), 28));
  };

  if (loading || !laudes) return <LoadingSpinner animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} />;

  const sections = [
    { id: 'inv', title: 'Invitatório', content: laudes.invitatorium, ref: 'Salmo 95' },
    { id: 'hymn', title: 'Hino', content: { title: 'Hino da Manhã', psalm: laudes.hymn }, ref: '' },
    ...laudes.psalms.map((p, i) => ({ id: `ps${i}`, title: `Salmo ${i + 1}`, content: p, ref: '' })),
    { id: 'reading', title: 'Leitura', content: { title: 'Leitura Breve', psalm: laudes.lectioBrevis.reading }, ref: laudes.lectioBrevis.reference },
    { id: 'ben', title: 'Benedictus', content: laudes.benedictus, ref: 'Lc 1, 68-79' },
    { id: 'pre', title: 'Preces', content: { title: 'Preces', psalm: laudes.preces.map(p => `— ${p}`).join('\n') }, ref: '' },
    { id: 'ora', title: 'Oração', content: { title: 'Oração Conclusiva', psalm: laudes.oratio }, ref: '' }
  ];

  return (
    <LaudesContainer>
      <SEO 
        title="Laudes - Oração da Manhã"
        description="Reze as Laudes, a oração oficial da manhã da Igreja Católica, e comece seu dia na presença de Deus."
        url="https://joaocarlosteco.github.io/Apenas-um-Catolico/laudes"
      />

      <Header>
        <DateInfo>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</DateInfo>
        <LaudesTitle>Liturgia das Horas</LaudesTitle>
        <Subtitle>Laudes</Subtitle>
      </Header>

      <Controls>
        <FontControls>
          <IconButton onClick={() => changeFontSize(-2)}><FiMinus /></IconButton>
          <span style={{ fontWeight: 600, minWidth: '30px', textAlign: 'center' }}>{fontSize}</span>
          <IconButton onClick={() => changeFontSize(2)}><FiPlus /></IconButton>
        </FontControls>
        <ShareButton onClick={() => navigator.share?.({ title: 'Laudes', url: window.location.href })}>
          <FiShare2 /> Compartilhar
        </ShareButton>
      </Controls>

      <TabContainer>
        <TabHeader>
          {sections.map((s, i) => (
            <TabButton key={s.id} active={activeTab === i} onClick={() => setActiveTab(i)}>
              {s.title}
            </TabButton>
          ))}
        </TabHeader>

        <AnimatePresence mode="wait">
          <TabContent
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <EntryTitle>{(sections[activeTab].content as any).title || sections[activeTab].title}</EntryTitle>
            <MainText fontSize={fontSize}>
              {'ant' in sections[activeTab].content && (
                <div className="antiphon">Ant. {sections[activeTab].content.ant}</div>
              )}
              {sections[activeTab].content.psalm.split('\n').map((line, i) => (
                <div key={i} className="verse">{line}</div>
              ))}
            </MainText>
            {sections[activeTab].ref && <Reference>{sections[activeTab].ref}</Reference>}
          </TabContent>
        </AnimatePresence>
      </TabContainer>
    </LaudesContainer>
  );
};

export default Laudes;
