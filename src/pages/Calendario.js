import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const datas = [
  { data: '01/01', evento: 'Santa Maria, Mãe de Deus' },
  { data: '06/01', evento: 'Epifania do Senhor' },
  { data: '14/02', evento: 'Quarta-feira de Cinzas' },
  { data: '31/03', evento: 'Páscoa' },
  { data: '09/05', evento: 'Ascensão do Senhor' },
  { data: '19/05', evento: 'Pentecostes' },
  { data: '30/05', evento: 'Corpus Christi' },
  { data: '08/12', evento: 'Imaculada Conceição' },
  { data: '25/12', evento: 'Natal do Senhor' }
];

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 16px 80px 16px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${props => props.theme.colors.white};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.soft};
  overflow: hidden;
`;

const Th = styled.th`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 1rem;
  font-size: 1.1rem;
`;

const Td = styled.td`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.text};
  border-bottom: 1px solid #eee;
`;

const Calendario = () => (
  <Container>
    <Helmet>
      <title>Calendário Litúrgico - Apenas um Católico</title>
      <meta name="description" content="Datas importantes do calendário litúrgico católico." />
    </Helmet>
    <Title>Calendário Litúrgico 2025</Title>
    <Table>
      <thead>
        <tr>
          <Th>Data</Th>
          <Th>Evento</Th>
        </tr>
      </thead>
      <tbody>
        {datas.map((item, idx) => (
          <tr key={idx}>
            <Td>{item.data}</Td>
            <Td>{item.evento}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);

export default Calendario; 