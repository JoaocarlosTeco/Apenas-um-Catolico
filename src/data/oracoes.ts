import { Oracao, CategoriaOracao } from '../types';

export const oracoes: Oracao[] = [
  {
    id: 'pai-nosso',
    titulo: 'Pai Nosso',
    texto: `Pai nosso que estais nos céus,
santificado seja o vosso nome,
venha a nós o vosso reino,
seja feita a vossa vontade
assim na terra como no céu.

O pão nosso de cada dia nos dai hoje,
perdoai-nos as nossas ofensas
assim como nós perdoamos
a quem nos tem ofendido,
e não nos deixeis cair em tentação,
mas livrai-nos do mal. Amém.`,
    categoria: 'tradicional' as CategoriaOracao,
    origem: 'Ensinada por Jesus Cristo (Mt 6,9-13; Lc 11,2-4)',
    explicacao: 'A oração fundamental do cristianismo, ensinada pelo próprio Jesus aos seus discípulos. Contém os elementos essenciais da vida cristã: adoração, submissão, pedido e perdão.',
    beneficios: [
      'Estabelece comunicação direta com Deus Pai',
      'Ensina a ordem correta das prioridades espirituais',
      'Promove a humildade e dependência de Deus',
      'Desenvolve o espírito de perdão'
    ],
    comoRezar: 'Pode ser rezada individualmente ou em comunidade, com devoção e atenção às palavras.',
    momentosRecomendados: [
      'Diariamente pela manhã e à noite',
      'Antes das refeições',
      'Em momentos de dificuldade',
      'Como parte do Terço ou Rosário'
    ]
  },
  {
    id: 'ave-maria',
    titulo: 'Ave Maria',
    texto: `Ave Maria, cheia de graça,
o Senhor é convosco,
bendita sois vós entre as mulheres,
e bendito é o fruto do vosso ventre, Jesus.

Santa Maria, Mãe de Deus,
rogai por nós pecadores,
agora e na hora da nossa morte. Amém.`,
    categoria: 'marianas' as CategoriaOracao,
    origem: 'Baseada na saudação do Anjo Gabriel (Lc 1,28) e de Isabel (Lc 1,42)',
    explicacao: 'Oração mariana fundamental que combina as palavras do Anjo Gabriel na Anunciação com as de Isabel na Visitação, completada pela invocação da Igreja.',
    beneficios: [
      'Fortalece a devoção a Nossa Senhora',
      'Obtém a intercessão materna de Maria',
      'Promove a meditação dos mistérios da vida de Cristo',
      'Desenvolve a humildade e confiança filial'
    ],
    comoRezar: 'Com devoção mariana, meditando sobre os mistérios da vida de Jesus e Maria.',
    momentosRecomendados: [
      'Durante o Terço ou Rosário',
      'Ao acordar e antes de dormir',
      'Em momentos de angústia ou medo',
      'Nas festas marianas'
    ]
  },
  {
    id: 'gloria-ao-pai',
    titulo: 'Glória ao Pai',
    texto: `Glória ao Pai,
e ao Filho,
e ao Espírito Santo.

Como era no princípio,
agora e sempre,
e por todos os séculos dos séculos. Amém.`,
    categoria: 'liturgicas' as CategoriaOracao,
    origem: 'Doxologia menor da tradição cristã primitiva',
    explicacao: 'Oração de louvor à Santíssima Trindade, reconhecendo a glória eterna de Deus em suas três pessoas.',
    beneficios: [
      'Glorifica a Santíssima Trindade',
      'Expressa a fé trinitária',
      'Eleva a alma em louvor a Deus',
      'Completa outras orações com adoração'
    ],
    comoRezar: 'Como conclusão de outras orações ou como ato de adoração espontâneo.',
    momentosRecomendados: [
      'Após cada dezena do Terço',
      'No final de outras orações',
      'Durante a Liturgia das Horas',
      'Como oração de louvor espontâneo'
    ]
  },
  {
    id: 'credo',
    titulo: 'Creio em Deus Pai (Credo Apostólico)',
    texto: `Creio em Deus Pai todo-poderoso,
criador do céu e da terra;
e em Jesus Cristo, seu único Filho, nosso Senhor,
que foi concebido pelo poder do Espírito Santo,
nasceu da Virgem Maria,
padeceu sob Pôncio Pilatos,
foi crucificado, morto e sepultado;
desceu à mansão dos mortos,
ressuscitou ao terceiro dia,
subiu aos céus,
está sentado à direita de Deus Pai todo-poderoso,
donde há de vir a julgar os vivos e os mortos.

Creio no Espírito Santo,
na santa Igreja Católica,
na comunhão dos santos,
na remissão dos pecados,
na ressurreição da carne,
na vida eterna. Amém.`,
    categoria: 'tradicional' as CategoriaOracao,
    origem: 'Símbolo dos Apóstolos, formulado nos primeiros séculos da Igreja',
    explicacao: 'Profissão de fé fundamental do cristianismo, resumindo os principais artigos da fé católica.',
    beneficios: [
      'Fortalece e confirma a fé',
      'Resume os principais mistérios da fé cristã',
      'Une os fiéis na mesma profissão de fé',
      'Serve como catequese fundamental'
    ],
    comoRezar: 'Com fé firme e consciência do que se professa.',
    momentosRecomendados: [
      'Durante a Santa Missa',
      'No Terço (alguns mistérios)',
      'Em momentos de dúvida na fé',
      'Como renovação dos votos batismais'
    ]
  },
  {
    id: 'salve-rainha',
    titulo: 'Salve Rainha',
    texto: `Salve, Rainha,
Mãe de misericórdia,
vida, doçura
e esperança nossa, salve!

A vós bradamos,
os degredados filhos de Eva.
A vós suspiramos,
gemendo e chorando
neste vale de lágrimas.

Eia, pois, advogada nossa,
esses vossos olhos misericordiosos
a nós volvei.
E, depois deste desterro,
nos mostrai Jesus,
bendito fruto do vosso ventre.

Ó clemente,
ó piedosa,
ó doce sempre Virgem Maria!

Rogai por nós, Santa Mãe de Deus,
para que sejamos dignos das promessas de Cristo. Amém.`,
    categoria: 'marianas' as CategoriaOracao,
    origem: 'Antífona mariana do século XI, atribuída a Hermano de Reichenau',
    explicacao: 'Uma das mais belas orações marianas, que expressa confiança filial em Maria como Mãe de misericórdia e advogada dos pecadores.',
    beneficios: [
      'Desenvolve a devoção filial a Maria',
      'Oferece consolação em momentos difíceis',
      'Fortalece a esperança na intercessão materna',
      'Promove a humildade diante de Deus'
    ],
    comoRezar: 'Com ternura filial e confiança na misericórdia materna de Maria.',
    momentosRecomendados: [
      'No final do Terço',
      'Em momentos de aflição',
      'Durante as Completas',
      'Nas festas marianas'
    ]
  },
  {
    id: 'anjo-de-deus',
    titulo: 'Anjo de Deus',
    texto: `Anjo de Deus,
que sois o meu guardião,
e a quem a bondade divina me confiou,
iluminai-me, guardai-me,
regei-me e governai-me. Amém.`,
    categoria: 'protecao' as CategoriaOracao,
    origem: 'Oração tradicional ao Anjo da Guarda',
    explicacao: 'Oração dirigida ao Anjo da Guarda, pedindo sua proteção, orientação e cuidado.',
    beneficios: [
      'Fortalece a devoção aos Anjos',
      'Oferece proteção espiritual',
      'Desenvolve a consciência da presença divina',
      'Promove a humildade e dependência de Deus'
    ],
    comoRezar: 'Com confiança na proteção angélica, especialmente pelas crianças.',
    momentosRecomendados: [
      'Pelas crianças antes de dormir',
      'Ao sair de casa',
      'Em momentos de perigo',
      'Como oração de proteção diária'
    ]
  },
  {
    id: 'jesus-cristo-filho-de-deus',
    titulo: 'Jesus Cristo, Filho de Deus',
    texto: `Jesus Cristo, Filho de Deus,
tende piedade de mim, pecador.`,
    categoria: 'contemplativas' as CategoriaOracao,
    origem: 'Oração de Jesus ou Oração do coração, tradição oriental',
    explicacao: 'Oração contemplativa fundamental do cristianismo oriental, baseada na súplica do publicano (Lc 18,13).',
    beneficios: [
      'Desenvolve a oração contemplativa',
      'Promove a união com Jesus',
      'Cultiva a humildade',
      'Facilita a oração constante'
    ],
    comoRezar: 'Repetidamente, com o ritmo da respiração, como oração do coração.',
    momentosRecomendados: [
      'Durante a meditação',
      'Em momentos de oração silenciosa',
      'Como jaculatória ao longo do dia',
      'Para desenvolver a oração constante'
    ]
  },
  {
    id: 'vinde-espirito-santo',
    titulo: 'Vinde, Espírito Santo',
    texto: `Vinde, Espírito Santo,
enchei os corações dos vossos fiéis
e acendei neles o fogo do vosso amor.

Enviai o vosso Espírito e tudo será criado,
e renovareis a face da terra.

Oremos:
Ó Deus, que instruístes os corações dos vossos fiéis
com a luz do Espírito Santo,
fazei que pelo mesmo Espírito
sintamos retamente todas as coisas
e gozemos sempre da sua consolação.
Por Cristo nosso Senhor. Amém.`,
    categoria: 'liturgicas' as CategoriaOracao,
    origem: 'Antífona litúrgica de Pentecostes',
    explicacao: 'Invocação ao Espírito Santo pedindo seus dons e renovação espiritual.',
    beneficios: [
      'Invoca a ação do Espírito Santo',
      'Pede renovação espiritual',
      'Desenvolve a docilidade aos dons do Espírito',
      'Fortalece para o testemunho cristão'
    ],
    comoRezar: 'Com abertura e docilidade à ação do Espírito Santo.',
    momentosRecomendados: [
      'Na festa de Pentecostes',
      'Antes de decisões importantes',
      'No início de estudos ou trabalhos',
      'Durante retiros espirituais'
    ]
  }
];

// Funções utilitárias tipadas
export const buscarOracaoPorId = (id: string): Oracao | undefined => {
  return oracoes.find(oracao => oracao.id === id);
};

export const buscarOracoesPorCategoria = (categoria: CategoriaOracao): Oracao[] => {
  return oracoes.filter(oracao => oracao.categoria === categoria);
};

export const buscarOracoesPorTitulo = (titulo: string): Oracao[] => {
  const termoBusca = titulo.toLowerCase();
  return oracoes.filter(oracao => 
    oracao.titulo.toLowerCase().includes(termoBusca)
  );
};

export const obterCategorias = (): CategoriaOracao[] => {
  const categorias = oracoes.map(oracao => oracao.categoria);
  return Array.from(new Set(categorias)).sort();
};

export const buscarOracoesPorTexto = (termo: string): Oracao[] => {
  const termoBusca = termo.toLowerCase();
  return oracoes.filter(oracao => 
    oracao.texto.toLowerCase().includes(termoBusca) ||
    oracao.titulo.toLowerCase().includes(termoBusca) ||
    oracao.explicacao?.toLowerCase().includes(termoBusca)
  );
};

export const obterOracoesRecomendadas = (momento: string): Oracao[] => {
  return oracoes.filter(oracao => 
    oracao.momentosRecomendados?.some(m => 
      m.toLowerCase().includes(momento.toLowerCase())
    )
  );
};

export const obterOracoesPorOrigem = (origem: string): Oracao[] => {
  return oracoes.filter(oracao => 
    oracao.origem?.toLowerCase().includes(origem.toLowerCase())
  );
}; 