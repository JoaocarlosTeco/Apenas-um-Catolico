import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { FiCalendar, FiStar, FiHeart, FiSun, FiCross } from 'react-icons/fi';

const eventosLiturgicos = {
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
  padding: 40px 16px 80px 16px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.theme.colors.primary};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ObservacaoText = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  display: block;
  margin-top: 0.25rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.soft};
  overflow: hidden;
  margin-top: 2rem;
`;

const Th = styled.th`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  color: ${props => props.theme.colors.text};
`;

const EventoTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  background: ${props => {
    switch (props.tipo) {
      case 'solenidade': return '#FFD700';
      case 'festa': return '#98FB98';
      case 'novena': return '#87CEEB';
      case 'mariano': return '#DDA0DD';
      case 'tempo': return '#FFA07A';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => props.tipo === 'solenidade' ? '#000' : '#333'};
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
  max-width: 800px;
  margin: 0 auto 2rem auto;
`;

const Calendario = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  
  const getEventosFiltrados = () => {
    if (categoriaAtiva === 'todos') {
      return Object.values(eventosLiturgicos).flat();
    }
    return eventosLiturgicos[categoriaAtiva] || [];
  };

  const eventosOrdenados = getEventosFiltrados().sort((a, b) => {
    if (a.data === 'móvel' && b.data === 'móvel') return 0;
    if (a.data === 'móvel') return -1;
    if (b.data === 'móvel') return 1;
    const [diaA, mesA] = a.data.split('/');
    const [diaB, mesB] = b.data.split('/');
    return mesA - mesB || diaA - diaB;
  });

  return (
    <Container>
      <Helmet>
        <title>Calendário Litúrgico 2025 - Apenas um Católico</title>
        <meta 
          name="description" 
          content="Calendário completo com solenidades, festas, novenas e datas importantes do ano litúrgico católico." 
        />
      </Helmet>
      
      <Title>Calendário Litúrgico 2025</Title>
      <Description>
        Acompanhe todas as datas importantes do ano litúrgico católico, incluindo solenidades,
        festas, novenas e celebrações marianas.
      </Description>

      <TabsContainer>
        <Tab 
          active={categoriaAtiva === 'todos'} 
          onClick={() => setCategoriaAtiva('todos')}
        >
          <FiCalendar /> Todos
        </Tab>
        <Tab 
          active={categoriaAtiva === 'solenidades'} 
          onClick={() => setCategoriaAtiva('solenidades')}
        >
          <FiStar /> Solenidades
        </Tab>
        <Tab 
          active={categoriaAtiva === 'festas'} 
          onClick={() => setCategoriaAtiva('festas')}
        >
          <FiSun /> Festas
        </Tab>
        <Tab 
          active={categoriaAtiva === 'marianos'} 
          onClick={() => setCategoriaAtiva('marianos')}
        >
          <FiHeart /> Devoções Marianas
        </Tab>
        <Tab 
          active={categoriaAtiva === 'novenas'} 
          onClick={() => setCategoriaAtiva('novenas')}
        >
          <FiCross /> Novenas
        </Tab>
        <Tab 
          active={categoriaAtiva === 'santos'} 
          onClick={() => setCategoriaAtiva('santos')}
        >
          <FiStar /> Santos
        </Tab>
      </TabsContainer>

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
                {item.evento}
                {item.obs && <ObservacaoText>{item.obs}</ObservacaoText>}
              </Td>
              <Td>
                <EventoTag tipo={item.tipo}>
                  {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
                </EventoTag>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Calendario; 