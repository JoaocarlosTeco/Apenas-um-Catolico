import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 16px 80px 16px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Sobre = () => (
  <Container>
    <Helmet>
      <title>Sobre - Apenas um Católico</title>
      <meta name="description" content="Sobre o projeto Apenas um Católico. Missão, visão e contato." />
    </Helmet>
    <Title>Sobre o Projeto</Title>
    <p>
      <strong>Apenas um Católico</strong> é um projeto dedicado à evangelização, à devoção aos santos e à partilha de reflexões espirituais para todos que buscam crescer na fé católica.
    </p>
    <h2>Missão</h2>
    <p>
      Inspirar, evangelizar e fortalecer a fé dos católicos através de conteúdo acessível, bonito e fiel à doutrina da Igreja.
    </p>
    <h2>Visão</h2>
    <p>
      Ser referência online em conteúdo devocional e catequético, promovendo a comunhão e o amor a Deus e à Igreja.
    </p>
    <h2>Contato</h2>
    <p>
      Sugestões, dúvidas ou parcerias? Entre em contato pelo e-mail: <a href="mailto:contato@apenasumcatolico.com">contato@apenasumcatolico.com</a> ou pelo <a href="https://www.instagram.com/joaocarlostdm/?hl=pt-br" target="_blank" rel="noopener noreferrer">Instagram</a>.
    </p>
    <p>
      Que Deus abençoe você!
    </p>
  </Container>
);

export default Sobre; 