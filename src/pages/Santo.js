import React from 'react';
import { useParams } from 'react-router-dom';
import NaoEncontrada from './NaoEncontrada';
import { santoPorSlug } from '../data/santos';
import PaginaPio from './santos/PaginaPio';
import PaginaFrancisco from './santos/PaginaFrancisco';
import PaginaTeresinha from './santos/PaginaTeresinha';
import PaginaMaria from './santos/PaginaMaria';

// Cada santo tem uma página com desenho próprio: manuscrito (Francisco), caderno e santinho
// (Teresinha), capela à luz de vela (Pio) e manto e ladainha (Nossa Senhora).
const PAGINAS = {
  'sao-francisco': PaginaFrancisco,
  'santa-teresinha': PaginaTeresinha,
  'padre-pio': PaginaPio,
  'nossa-senhora': PaginaMaria,
};

const Santo = () => {
  const { slug } = useParams();
  const santo = santoPorSlug(slug);
  if (!santo) return <NaoEncontrada />;
  const Pagina = PAGINAS[santo.slug] || PaginaPio;
  // a key remonta a página ao trocar de santo: a música e os efeitos do anterior param
  return <Pagina key={santo.slug} santo={santo} />;
};

export default Santo;
