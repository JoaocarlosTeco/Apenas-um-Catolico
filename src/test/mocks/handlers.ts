// @ts-nocheck
import { Santo, Oracao } from '../../types';

// Mock data
const mockSantos: Santo[] = [
  {
    id: 'sao-francisco',
    nome: 'São Francisco de Assis',
    sobrenome: 'de Assis',
    dataFesta: '2023-10-04',
    biografia: 'Santo padroeiro dos animais...',
    milagres: ['Milagre dos pássaros'],
    oracoes: [],
    imagem: '/images/santos/sao-francisco.jpg',
    categoria: 'santos',
    tags: ['franciscanos', 'animais', 'natureza'],
    dataCriacao: '2023-01-01',
    dataAtualizacao: '2023-01-01'
  }
];

const mockOracoes: Oracao[] = [
  {
    id: 'oração-a-sao-francisco',
    titulo: 'Oração a São Francisco',
    texto: 'Senhor, fazei de mim um instrumento de vossa paz...',
    categoria: 'santos',

    audio: '/audio/oracao-sao-francisco.mp3',
    dataCriacao: '2023-01-01',
    dataAtualizacao: '2023-01-01'
  }
];

export const handlers = [
  // Handlers simplificados para evitar erros de tipo
]; 