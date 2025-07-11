import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FiPlus, FiMinus, FiShare2 } from 'react-icons/fi';

const LaudesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px 10px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const DateInfo = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 1rem;
  margin-bottom: 8px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const LaudesTitle = styled.h2`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1rem;
  margin-top: 8px;
  font-style: italic;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const TabContainer = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  margin-bottom: 24px;
`;

const TabHeader = styled.div`
  display: flex;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  overflow-x: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }
`;

const TabButton = styled.button`
  flex: 1;
  min-width: 120px;
  padding: 16px 20px;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : 'rgba(27, 51, 88, 0.1)'};
  }

  &:not(:last-child) {
    border-right: 1px solid ${props => props.theme.colors.borderColor};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex: 1 1 50%;
    min-width: auto;
    padding: 12px 16px;
    font-size: 0.8rem;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    
    &:nth-child(odd) {
      border-right: 1px solid ${props => props.theme.colors.borderColor};
    }
  }
`;

const TabContent = styled(motion.div)`
  padding: 32px;
  min-height: 400px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px;
    min-height: 300px;
  }
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  margin-bottom: 20px;
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
`;

const ContentText = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  font-size: ${props => props.fontSize}px;
  margin-bottom: 24px;

  p {
    margin-bottom: 16px;
  }

  .antiphon {
    color: ${props => props.theme.colors.secondary};
    font-style: italic;
    font-weight: 500;
    margin-bottom: 12px;
    padding: 8px 12px;
    background: rgba(192, 149, 83, 0.1);
    border-left: 3px solid ${props => props.theme.colors.secondary};
    border-radius: 0 4px 4px 0;
  }

  .psalm-verse {
    margin-bottom: 8px;
    text-indent: 20px;
  }

  .response {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    text-align: center;
    margin: 16px 0;
    padding: 8px;
    background: rgba(27, 51, 88, 0.1);
    border-radius: 4px;
  }

  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    line-height: 1.6;
    font-size: ${props => Math.max(props.fontSize * 0.9, 14)}px;
  }
`;

const ContentReference = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  font-size: ${props => Math.max(props.fontSize - 2, 12)}px;
  text-align: right;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.colors.borderColor};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => Math.max((props.fontSize - 2) * 0.9, 11)}px;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.soft};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  }
`;

const FontControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FontLabel = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  margin-right: 8px;
`;

const FontButton = styled.button`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.borderColor};
  color: ${props => props.theme.colors.text};
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ShareButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.theme.colors.background};
  border-top: 3px solid ${props => props.theme.colors.secondary};
  border-radius: 50%;
  margin: 40px auto;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  padding: 32px;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: ${props => props.theme.shadows.soft};
`;

// Função para gerar conteúdo dinâmico baseado no dia
const generateDynamicLaudes = (dayOfWeek, dayOfMonth) => {
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
    },
    {
      title: "Salmo 118 (117) - Hino de ação de graças",
      ant: "Este é o dia que o Senhor fez para nós, alegremo-nos e exultemos.",
      psalm: `Dai graças ao Senhor, porque ele é bom,
      porque é eterna a sua misericórdia!
      Este é o dia que o Senhor fez para nós,
      alegremo-nos e exultemos neste dia!`
    }
  ];

  const leituras = [
    {
      reading: "Irmãos, tudo o que é verdadeiro, tudo o que é nobre, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, se alguma virtude há e se algum louvor existe, seja isso o que ocupe os vossos pensamentos.",
      reference: "Fl 4, 8"
    },
    {
      reading: "Despertai, vós que dormis, levantai-vos dentre os mortos, e Cristo vos iluminará.",
      reference: "Ef 5, 14"
    },
    {
      reading: "Renovai o vosso espírito e a vossa mentalidade. Revesti o homem novo, criado segundo Deus na justiça e santidade verdadeiras.",
      reference: "Ef 4, 23-24"
    }
  ];

  const hinos = [
    `Ó esplendor da glória do Pai,
    ó luz da luz e fonte de luz,
    ó dia que iluminas o dia,
    ó sol que brilhas no meio-dia.`,
    `Cristo, luz do mundo,
    dissipai as trevas da noite,
    fazei brilhar em nós
    a luz da vossa ressurreição.`,
    `Senhor, que criastes a manhã,
    e nos dais um novo dia,
    enchei nossos corações
    de vossa paz e alegria.`
  ];

  // Selecionar conteúdo baseado no dia
  const salmoIndex = dayOfWeek % salmos.length;
  const leituraIndex = (dayOfMonth - 1) % leituras.length;
  const hinoIndex = Math.floor(dayOfMonth / 10) % hinos.length;

  return {
    invitatorium: {
      ant: "Vinde, adoremos o Senhor, nosso Rei e Salvador.",
      psalm: `Vinde, exultemos de alegria no Senhor,
      aclamemos o Rochedo que nos salva!
      Apresentemo-nos a ele com louvores
      e com cantos o nosso júbilo expressemos!`
    },
    hymn: hinos[hinoIndex],
    psalms: [
      salmos[salmoIndex],
      salmos[(salmoIndex + 1) % salmos.length]
    ],
    lectioBrevis: leituras[leituraIndex],
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
      "Vós que aparecestes aos discípulos e lhes dissestes: 'A paz esteja convosco', dai-nos a vossa paz.",
      "Vós que mandastes os Apóstolos anunciar o Evangelho, tornai-nos hoje vossas testemunhas."
    ],
    oratio: `Ó Deus, que fizestes brilhar sobre nós a luz do novo dia, concedei-nos passar este dia sem cair em pecado, para que, ao chegar à tarde, vos possamos louvar com alegria. Por nosso Senhor Jesus Cristo, vosso Filho, na unidade do Espírito Santo. Amém.`
  };
};

const Laudes = () => {
  const [laudes, setLaudes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const fetchLaudes = async () => {
      try {
        const today = new Date();
        const dateString = today.toISOString().split('T')[0]; // formato YYYY-MM-DD
        
        // Tentativa 1: API de Liturgia das Horas
        try {
          const response = await fetch(`https://api-liturgia-diaria.vercel.app/laudes?date=${dateString}`);
          if (response.ok) {
            const data = await response.json();
            if (data && data.laudes) {
              setLaudes(data.laudes);
              setLoading(false);
              return;
            }
          }
        } catch (apiError) {
          console.log('API principal falhou, tentando alternativa...');
        }

        // Tentativa 2: API alternativa com liturgia.up.railway.app
        try {
          const response = await fetch(`https://liturgia.up.railway.app/laudes/${dateString}`);
          if (response.ok) {
            const data = await response.json();
            if (data) {
              setLaudes(data);
              setLoading(false);
              return;
            }
          }
        } catch (apiError) {
          console.log('API alternativa falhou, usando conteúdo dinâmico...');
        }

        // Fallback: Conteúdo que varia por dia da semana e data
        const dayOfWeek = today.getDay(); // 0 = domingo, 1 = segunda, etc.
        const dayOfMonth = today.getDate();
        
        // Variação de conteúdo baseada no dia
        const dynamicLaudes = generateDynamicLaudes(dayOfWeek, dayOfMonth);
        
        setLaudes(dynamicLaudes);
        setLoading(false);
      } catch (err) {
        setError('Não foi possível carregar as Laudes. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchLaudes();
  }, []);

  const handleFontSizeChange = (delta) => {
    setFontSize(prevSize => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 12), 24);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Laudes - Oração da Manhã',
        text: 'Reze as Laudes de hoje',
        url: window.location.href,
      }).catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <LaudesContainer>
        <Header>
          <DateInfo>Carregando...</DateInfo>
          <LaudesTitle>Laudes</LaudesTitle>
          <Subtitle>Oração da Manhã</Subtitle>
        </Header>
        <LoadingSpinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </LaudesContainer>
    );
  }

  if (error) {
    return (
      <LaudesContainer>
        <Header>
          <DateInfo>
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </DateInfo>
          <LaudesTitle>Laudes</LaudesTitle>
          <Subtitle>Oração da Manhã</Subtitle>
        </Header>
        <ErrorMessage>{error}</ErrorMessage>
      </LaudesContainer>
    );
  }

  // Preparar as abas das Laudes
  const tabs = [
    {
      title: 'Invitátorio',
      content: {
        title: 'Invitátorio',
        text: `<div class="antiphon">Ant. ${laudes?.invitatorium?.ant}</div>
               <div class="psalm-verse">${laudes?.invitatorium?.psalm?.replace(/\n/g, '<br/>')}</div>`,
        reference: 'Salmo 95 (94)'
      }
    },
    {
      title: 'Hino',
      content: {
        title: 'Hino',
        text: laudes?.hymn?.replace(/\n/g, '<br/>'),
        reference: ''
      }
    }
  ];

  // Adicionar salmos
  if (laudes?.psalms) {
    laudes.psalms.forEach((psalm, index) => {
      tabs.push({
        title: `Salmo ${index + 1}`,
        content: {
          title: psalm.title || `Salmo ${index + 1}`,
          text: `<div class="antiphon">Ant. ${psalm.ant}</div>
                 <div class="psalm-verse">${psalm.psalm?.replace(/\n/g, '<br/>')}</div>`,
          reference: ''
        }
      });
    });
  }

  // Adicionar outras partes
  if (laudes?.lectioBrevis) {
    tabs.push({
      title: 'Leitura Breve',
      content: {
        title: 'Leitura Breve',
        text: laudes.lectioBrevis.reading,
        reference: laudes.lectioBrevis.reference
      }
    });
  }

  if (laudes?.benedictus) {
    tabs.push({
      title: 'Benedictus',
      content: {
        title: 'Cântico de Zacarias',
        text: `<div class="antiphon">Ant. ${laudes.benedictus.ant}</div>
               <div class="psalm-verse">${laudes.benedictus.psalm?.replace(/\n/g, '<br/>')}</div>`,
        reference: 'Lc 1, 68-79'
      }
    });
  }

  if (laudes?.preces && laudes.preces.length > 0) {
    tabs.push({
      title: 'Preces',
      content: {
        title: 'Preces',
        text: `<div class="response">R. Senhor, tende piedade de nós.</div>
               ${laudes.preces.map(prece => `<p>— ${prece}</p>`).join('')}`,
        reference: ''
      }
    });
  }

  if (laudes?.oratio) {
    tabs.push({
      title: 'Oração',
      content: {
        title: 'Oração Conclusiva',
        text: laudes.oratio,
        reference: ''
      }
    });
  }

  return (
    <LaudesContainer>
      <Helmet>
        <title>Laudes - Apenas um Católico</title>
        <meta name="description" content="Reze as Laudes, a oração da manhã da Liturgia das Horas" />
      </Helmet>

      <Header>
        <DateInfo>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </DateInfo>
        <LaudesTitle>Laudes</LaudesTitle>
        <Subtitle>Oração da Manhã - Liturgia das Horas</Subtitle>
      </Header>

      <Controls>
        <FontControls>
          <FontLabel>Tamanho da fonte:</FontLabel>
          <FontButton onClick={() => handleFontSizeChange(-1)} aria-label="Diminuir fonte">
            <FiMinus />
          </FontButton>
          <FontButton onClick={() => handleFontSizeChange(1)} aria-label="Aumentar fonte">
            <FiPlus />
          </FontButton>
        </FontControls>
        <ShareButton onClick={handleShare}>
          <FiShare2 />
          Compartilhar
        </ShareButton>
      </Controls>

      {tabs.length > 0 && (
        <TabContainer>
          <TabHeader>
            {tabs.map((tab, index) => (
              <TabButton
                key={index}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </TabButton>
            ))}
          </TabHeader>

          <TabContent
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle>{tabs[activeTab]?.content.title}</SectionTitle>
            <ContentText 
              fontSize={fontSize}
              dangerouslySetInnerHTML={{ 
                __html: tabs[activeTab]?.content.text || '' 
              }} 
            />
            {tabs[activeTab]?.content.reference && (
              <ContentReference fontSize={fontSize}>
                {tabs[activeTab]?.content.reference}
              </ContentReference>
            )}
          </TabContent>
        </TabContainer>
      )}

      {tabs.length === 0 && (
        <ErrorMessage>
          Não há Laudes disponíveis para hoje. Por favor, tente novamente mais tarde.
        </ErrorMessage>
      )}
    </LaudesContainer>
  );
};

export default Laudes;