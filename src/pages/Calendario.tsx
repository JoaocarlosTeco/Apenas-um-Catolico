import React, { useState } from 'react';
import styled from 'styled-components';
import { FiCalendar, FiStar, FiHeart, FiSun, FiPlus } from 'react-icons/fi';
import SEO from '../components/SEO';

interface Evento {
  data: string;
  evento: string;
  tipo: string;
  obs?: string;
}

interface EventosLiturgicos {
  [key: string]: Evento[];
}

const eventosLiturgicos: EventosLiturgicos = {
  solenidades: [
    { data: '01/01', evento: 'Santa Maria, Mãe de Deus', tipo: 'solenidade' },
    { data: '06/01', evento: 'Epifania do Senhor', tipo: 'solenidade', obs: 'ou domingo entre 2 e 8 jan' },
    { data: '02/02', evento: 'Apresentação do Senhor', tipo: 'solenidade' },
    { data: '19/03', evento: 'São José, Esposo da Virgem Maria', tipo: 'solenidade' },
    { data: '25/03', evento: 'Anunciação do Senhor', tipo: 'solenidade' },
    { data: 'móvel', evento: 'Domingo de Ramos', tipo: 'solenidade', obs: 'domingo antes da Páscoa' },
    { data: 'móvel', evento: 'Tríduo Pascal', tipo: 'solenidade', obs: 'quinta-feira santa à vigília pascal' },
    { data: 'móvel', evento: 'Páscoa da Ressurreição', tipo: 'solenidade', obs: 'data móvel (março/abril)' },
    { data: 'móvel', evento: 'Ascensão do Senhor', tipo: 'solenidade', obs: '40 dias após a Páscoa' },
    { data: 'móvel', evento: 'Pentecostes', tipo: 'solenidade', obs: '50 dias após a Páscoa' },
    { data: 'móvel', evento: 'Santíssima Trindade', tipo: 'solenidade', obs: 'domingo após Pentecostes' },
    { data: 'móvel', evento: 'Corpus Christi', tipo: 'solenidade', obs: 'quinta-feira após a Santíssima Trindade' },
    { data: 'móvel', evento: 'Sagrado Coração de Jesus', tipo: 'solenidade', obs: 'sexta-feira após Corpus Christi' },
    { data: '24/06', evento: 'Natividade de São João Batista', tipo: 'solenidade' },
    { data: '29/06', evento: 'São Pedro e São Paulo', tipo: 'solenidade' },
    { data: '15/08', evento: 'Assunção de Nossa Senhora', tipo: 'solenidade' },
    { data: '01/11', evento: 'Todos os Santos', tipo: 'solenidade' },
    { data: '08/12', evento: 'Imaculada Conceição de Maria', tipo: 'solenidade' },
    { data: '25/12', evento: 'Natal do Senhor', tipo: 'solenidade' },
    { data: 'móvel', evento: 'Sagrada Família', tipo: 'solenidade', obs: 'domingo entre Natal e 1º de janeiro (ou 30 dez)' }
  ],
  festas: [
    { data: '02/01', evento: 'São Basílio Magno e São Gregório Nazianzeno', tipo: 'festa' },
    { data: '28/01', evento: 'São Tomás de Aquino', tipo: 'festa' },
    { data: '22/02', evento: 'Cátedra de São Pedro', tipo: 'festa' },
    { data: '25/04', evento: 'São Marcos', tipo: 'festa' },
    { data: '29/04', evento: 'Santa Catarina de Sena', tipo: 'festa' },
    { data: '03/07', evento: 'São Tomé', tipo: 'festa' },
    { data: '11/07', evento: 'São Bento', tipo: 'festa' },
    { data: '25/07', evento: 'São Tiago Maior', tipo: 'festa' },
    { data: '06/08', evento: 'Transfiguração do Senhor', tipo: 'festa' },
    { data: '14/09', evento: 'Exaltação da Santa Cruz', tipo: 'festa' },
    { data: '21/09', evento: 'São Mateus', tipo: 'festa' },
    { data: '29/09', evento: 'Santos Arcanjos Miguel, Gabriel e Rafael', tipo: 'festa' },
    { data: '18/10', evento: 'São Lucas', tipo: 'festa' },
    { data: '15/10', evento: 'Santa Teresa de Jesus', tipo: 'festa' },
    { data: '22/10', evento: 'São João Paulo II', tipo: 'festa' },
    { data: '18/11', evento: 'Dedicação das Basílicas de São Pedro e São Paulo', tipo: 'festa' },
    { data: '22/11', evento: 'Santa Cecília', tipo: 'festa' },
    { data: '06/12', evento: 'São Nicolau', tipo: 'festa' },
    { data: '13/12', evento: 'Santa Luzia', tipo: 'festa' },
    { data: '14/12', evento: 'São João da Cruz', tipo: 'festa' },
    { data: '27/12', evento: 'São João Evangelista', tipo: 'festa' }
  ],
  marianos: [
    { data: '11/02', evento: 'Nossa Senhora de Lourdes', tipo: 'mariano' },
    { data: '13/05', evento: 'Nossa Senhora de Fátima', tipo: 'mariano' },
    { data: '24/05', evento: 'Nossa Senhora Auxiliadora', tipo: 'mariano' },
    { data: 'móvel', evento: 'Imaculado Coração de Maria', tipo: 'mariano', obs: 'sábado após o Sagrado Coração' },
    { data: '16/07', evento: 'Nossa Senhora do Carmo', tipo: 'mariano' },
    { data: '22/08', evento: 'Nossa Senhora Rainha', tipo: 'mariano' },
    { data: '15/09', evento: 'Nossa Senhora das Dores', tipo: 'mariano' },
    { data: '12/10', evento: 'Nossa Senhora Aparecida (Padroeira do Brasil)', tipo: 'mariano' },
    { data: '21/11', evento: 'Apresentação de Maria', tipo: 'mariano' }
  ],
  novenas: [
    { data: '10/03', evento: 'Início da Novena a São José', tipo: 'novena', obs: '10 a 18 de março' },
    { data: '04/06', evento: 'Início da Novena de Santo Antônio', tipo: 'novena', obs: '4 a 12 de junho' },
    { data: '22/09', evento: 'Início da Novena de Santa Teresinha', tipo: 'novena', obs: '22 a 30 de setembro' },
    { data: '29/11', evento: 'Início da Novena da Imaculada Conceição', tipo: 'novena', obs: '29 de novembro a 7 de dezembro' },
    { data: 'móvel', evento: 'Novena da Divina Misericórdia', tipo: 'novena', obs: 'da Sexta-feira Santa ao Domingo da Misericórdia' }
  ],
  santos: [
    { data: '17/03', evento: 'São Patrício', tipo: 'santo' },
    { data: '23/09', evento: 'São Pio de Pietrelcina (Padre Pio)', tipo: 'santo' },
    { data: '03/12', evento: 'São Francisco Xavier', tipo: 'santo' }
  ]
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 80px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px 15px 60px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 800;
  font-family: ${props => props.theme.fonts.heading};
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: ${props => props.theme.colors.secondary};
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 4rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  font-size: 1.1rem;
  font-family: ${props => props.theme.fonts.body};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.85rem 1.75rem;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.glass.background};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.pill};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: ${props => props.active ? `2px solid ${props.theme.colors.primary}` : props.theme.colors.glass.border};
  font-weight: 700;
  font-size: 0.95rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: ${props => props.active ? props.theme.shadows.medium : props.theme.colors.glass.shadow};

  &:hover {
    transform: translateY(-3px);
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
    box-shadow: ${props => props.theme.shadows.medium};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const TableWrapper = styled.div`
  background: ${props => props.theme.colors.glass.background};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: ${props => props.theme.colors.glass.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.colors.glass.shadow};
  overflow: hidden;
  margin-bottom: 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1.5rem;
  font-size: 0.9rem;
  text-align: left;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Td = styled.td`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.borderColor}40;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.body};
  
  &:first-child {
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    width: 140px;
  }
`;

const ObservacaoText = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  display: block;
  margin-top: 0.4rem;
`;

const EventoTag = styled.span<{ tipo: string }>`
  padding: 0.5rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  
  background: ${props => {
    switch (props.tipo) {
      case 'solenidade': return '#FEF9C3';
      case 'festa': return '#DCFCE7';
      case 'novena': return '#E0F2FE';
      case 'mariano': return '#F3E8FF';
      case 'santo': return '#F1F5F9';
      default: return '#F1F5F9';
    }
  }};
  color: ${props => {
    switch (props.tipo) {
      case 'solenidade': return '#A16207';
      case 'festa': return '#15803D';
      case 'novena': return '#0369A1';
      case 'mariano': return '#7E22CE';
      case 'santo': return '#475569';
      default: return '#475569';
    }
  }};
  border: 1px solid rgba(0,0,0,0.05);
`;

const Calendario: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todos');
  
  const getEventosFiltrados = (): Evento[] => {
    if (categoriaAtiva === 'todos') {
      return Object.values(eventosLiturgicos).flat();
    }
    return eventosLiturgicos[categoriaAtiva] || [];
  };

  const eventosOrdenados = getEventosFiltrados().sort((a, b) => {
    if (a.data === 'móvel' && b.data === 'móvel') return 0;
    if (a.data === 'móvel') return 1;
    if (b.data === 'móvel') return -1;
    
    const [diaA, mesA] = a.data.split('/').map(Number);
    const [diaB, mesB] = b.data.split('/').map(Number);
    
    if (mesA !== mesB) return mesA - mesB;
    return diaA - diaB;
  });

  const categories = [
    { id: 'todos', name: 'Todos', icon: <FiCalendar /> },
    { id: 'solenidades', name: 'Solenidades', icon: <FiStar /> },
    { id: 'festas', name: 'Festas', icon: <FiSun /> },
    { id: 'marianos', name: 'Devoções Marianas', icon: <FiHeart /> },
    { id: 'novenas', name: 'Novenas', icon: <FiPlus /> },
    { id: 'santos', name: 'Santos', icon: <FiStar /> }
  ];

  return (
    <Container>
      <SEO 
        title="Calendário Litúrgico 2025 - Apenas um Católico"
        description="Fique por dentro de todas as solenidades, festas e memórias do calendário católico em 2025."
        keywords="calendário litúrgico, católico, festas católicas, solenidades, 2025, novenas"
        url="https://joaocarlosteco.github.io/Apenas-um-Catolico/calendario"
      />
      
      <Title>Calendário Litúrgico 2025</Title>
      <Description>
        Acompanhe o ritmo da Igreja através do tempo. Aqui você encontrará as principais datas 
        que marcam a nossa vida de fé ao longo do ano.
      </Description>

      <TabsContainer>
        {categories.map(cat => (
          <Tab 
            key={cat.id}
            active={categoriaAtiva === cat.id} 
            onClick={() => setCategoriaAtiva(cat.id)}
          >
            {cat.icon} {cat.name}
          </Tab>
        ))}
      </TabsContainer>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Data</Th>
              <Th>Celebração</Th>
              <Th>Categoria</Th>
            </tr>
          </thead>
          <tbody>
            {eventosOrdenados.map((item, idx) => (
              <tr key={idx}>
                <Td>{item.data}</Td>
                <Td>
                  <span style={{ fontWeight: 600 }}>{item.evento}</span>
                  {item.obs && <ObservacaoText>{item.obs}</ObservacaoText>}
                </Td>
                <Td>
                  <EventoTag tipo={item.tipo}>
                    {item.tipo}
                  </EventoTag>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default Calendario;
