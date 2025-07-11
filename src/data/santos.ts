import { Santo, Oracao } from '../types';

// Orações específicas para os santos
const oracaoSaoFrancisco: Oracao = {
  id: 'oracao-sao-francisco',
  titulo: 'Oração de São Francisco',
  texto: `Senhor, fazei de mim um instrumento de vossa paz.
Onde houver ódio, que eu leve o amor;
Onde houver ofensa, que eu leve o perdão;
Onde houver discórdia, que eu leve a união;
Onde houver dúvida, que eu leve a fé;
Onde houver erro, que eu leve a verdade;
Onde houver desespero, que eu leve a esperança;
Onde houver tristeza, que eu leve a alegria;
Onde houver trevas, que eu leve a luz.

Ó Mestre, fazei que eu procure mais
Consolar, que ser consolado;
compreender, que ser compreendido;
amar, que ser amado.

Pois é dando que se recebe,
é perdoando que se é perdoado,
e é morrendo que se vive para a vida eterna. Amém.`,
  categoria: 'santos',
  origem: 'Atribuída a São Francisco de Assis',
  explicacao: 'Uma das orações mais conhecidas do cristianismo, expressa o ideal franciscano de paz, humildade e serviço.',
  beneficios: ['Promove a paz interior', 'Desenvolve virtudes cristãs', 'Inspira o serviço aos outros'],
  comoRezar: 'Pode ser rezada diariamente como meditação ou em momentos de busca por paz.',
  momentosRecomendados: ['Ao acordar', 'Em momentos de conflito', 'Antes de decisões importantes']
};

const oracaoNossaSenhoraAparecida: Oracao = {
  id: 'oracao-nossa-senhora-aparecida',
  titulo: 'Oração a Nossa Senhora Aparecida',
  texto: `Ó Santíssima Virgem Maria, Nossa Senhora Aparecida,
que fostes concebida sem pecado original,
dignai-vos olhar com bondade
para esta nação brasileira,
que vos ama e venera.

Intercedei por nossas famílias,
para que vivam unidas no amor de Jesus.
Protegei nossos jovens dos perigos do mundo,
iluminai nossos governantes,
para que promovam a justiça e a paz.

Ó Mãe Aparecida,
alcançai-nos as graças de que necessitamos
e fortalecei nossa fé,
para que sejamos verdadeiros cristãos.

Por Jesus Cristo, vosso Filho,
que convosco e com o Espírito Santo
vive e reina pelos séculos dos séculos. Amém.`,
  categoria: 'marianas',
  origem: 'Devoção brasileira a Nossa Senhora Aparecida',
  explicacao: 'Oração dirigida à Padroeira do Brasil, pedindo proteção e intercessão.',
  beneficios: ['Proteção da família', 'Fortalecimento da fé nacional', 'Intercessão materna'],
  comoRezar: 'Tradicionalmente rezada diante da imagem de Nossa Senhora Aparecida.',
  momentosRecomendados: ['12 de outubro', 'Em dificuldades familiares', 'Pela nação brasileira']
};

const oracaoSantaTeresinha: Oracao = {
  id: 'oracao-santa-teresinha',
  titulo: 'Oração a Santa Teresinha do Menino Jesus',
  texto: `Ó gloriosa Santa Teresinha do Menino Jesus,
que na terra vivestes escondida e ignorada,
mas que no céu sois uma das maiores santas,
obtende-me a graça de seguir o vosso "pequeno caminho".

Ensinai-me a fazer como vós fazíeis,
as pequenas coisas com grande amor,
e a confiar sempre na misericórdia infinita de Deus,
como uma criança se confia em seu pai.

Ó querida Santa,
que prometestes passar o vosso céu
fazendo o bem sobre a terra,
fazei chover sobre mim uma chuva de rosas,
atendei ao meu pedido (faça seu pedido).

Aumentai a minha fé, fortalecei a minha esperança,
abrasai o meu coração no amor de Jesus,
para que eu possa amá-Lo e servi-Lo
até o fim da minha vida. Amém.`,
  categoria: 'santos',
  origem: 'Devoção a Santa Teresinha de Lisieux',
  explicacao: 'Oração baseada na "pequena via" espiritual de Santa Teresinha.',
  beneficios: ['Simplicidade espiritual', 'Confiança em Deus', 'Crescimento na santidade'],
  comoRezar: 'Com simplicidade e confiança filial, seguindo o exemplo da santa.',
  momentosRecomendados: ['1º de outubro', 'Em busca de simplicidade', 'Para missionários']
};

// Dados dos Santos
export const santos: Santo[] = [
  {
    id: 'sao-francisco-de-assis',
    nome: 'São Francisco de Assis',
    dataFesta: '4 de outubro',
    biografia: `São Francisco de Assis (1181-1226) foi um frade católico italiano, fundador da Ordem Franciscana. Nascido Giovanni di Pietro di Bernardone, em uma família rica de comerciantes de tecidos em Assis, Francisco experimentou uma conversão espiritual radical em sua juventude.

    Depois de uma experiência mística em que ouviu Cristo falar com ele através de um crucifixo na capela de São Damião, Francisco renunciou à sua herança familiar e abraçou uma vida de pobreza extrema, dedicando-se ao cuidado dos pobres e leprosos.

    Fundou a Ordem dos Frades Menores (Franciscanos) em 1209, baseada nos princípios de pobreza, castidade e obediência. Sua espiritualidade enfatizava a imitação literal de Cristo, o amor à natureza e a paz universal.

    Francisco foi pioneiro no movimento de renovação da Igreja Católica e é considerado um dos maiores santos da cristandade. Foi canonizado em 1228, apenas dois anos após sua morte.`,
    curiosidades: [
      'Recebeu os estigmas (chagas de Cristo) em 1224, sendo o primeiro caso registrado na história',
      'Escreveu o famoso "Cântico das Criaturas", considerado uma das primeiras obras poéticas em italiano',
      'É o patrono da ecologia e dos animais, sendo invocado para a proteção do meio ambiente',
      'Inspirou três ordens religiosas: masculina, feminina (Clarissas) e secular (Ordem Franciscana Secular)',
      'Sua vida inspirou inúmeras obras de arte, literatura e cinema ao longo dos séculos'
    ],
    oracoes: [oracaoSaoFrancisco],
    imagem: '/images/sao-francisco.jpg',
    padroeiro: ['Ecologia', 'Animais', 'Meio Ambiente', 'Itália', 'Comerciantes'],
    simbolos: ['Cruz', 'Lobo', 'Pássaros', 'Estigmas', 'Hábito marrom'],
    vida: {
      nascimento: '1181',
      morte: '3 de outubro de 1226',
      canonizacao: '16 de julho de 1228',
      local: 'Assis, Itália'
    },
    milagres: [
      'Recebimento dos estigmas no Monte Alverne',
      'Cura de leprosos através do toque',
      'Domesticação do lobo de Gúbio',
      'Multiplicação de alimentos para os pobres'
    ],
    devocoes: [
      'Via Sacra Franciscana',
      'Oração diante do Crucifixo de São Damião',
      'Terço Franciscano',
      'Devoção aos estigmas'
    ]
  },
  {
    id: 'nossa-senhora-aparecida',
    nome: 'Nossa Senhora da Conceição Aparecida',
    dataFesta: '12 de outubro',
    biografia: `Nossa Senhora da Conceição Aparecida é a padroeira do Brasil. Sua devoção começou em 1717, quando três pescadores - Domingos Garcia, Filipe Pedroso e João Alves - encontraram uma pequena imagem de terracota de Nossa Senhora no Rio Paraíba do Sul, em Guaratinguetá, São Paulo.

    Inicialmente, os pescadores não conseguiam pescar nada, mas após encontrarem a imagem (primeiro o corpo, depois a cabeça), suas redes se encheram miraculosamente de peixes. Este foi considerado o primeiro milagre de Nossa Senhora Aparecida.

    A devoção cresceu rapidamente, especialmente após diversos milagres atribuídos à intercessão da Virgem. Em 1743, foi construída a primeira capela dedicada à Nossa Senhora Aparecida.

    Em 1930, o Papa Pio XI proclamou Nossa Senhora Aparecida como Padroeira Principal do Brasil. O Santuário Nacional de Aparecida é hoje um dos maiores centros de peregrinação do mundo católico, recebendo milhões de fiéis anualmente.`,
    curiosidades: [
      'A imagem original mede apenas 40 centímetros de altura e é feita de terracota',
      'A cor escura da imagem a tornou símbolo da devoção afro-brasileira',
      'O Santuário Nacional é a segunda maior basílica do mundo em área construída',
      'Recebe cerca de 12 milhões de peregrinos por ano',
      'É invocada especialmente por famílias e em momentos de dificuldades nacionais',
      'Sua festa coincide com o Dia das Crianças no Brasil'
    ],
    oracoes: [oracaoNossaSenhoraAparecida],
    imagem: '/images/nossa-senhora-aparecida.jpg',
    padroeiro: ['Brasil', 'Famílias brasileiras', 'Pescadores', 'Navegação'],
    simbolos: ['Manto azul', 'Coroa imperial', 'Rosas', 'Pesca milagrosa'],
    vida: {
      nascimento: 'Eternidade (como Mãe de Deus)',
      canonizacao: 'Venerada desde 1717',
      local: 'Aparecida, São Paulo, Brasil'
    },
    milagres: [
      'Pesca milagrosa dos três pescadores em 1717',
      'Inúmeras curas físicas e espirituais',
      'Proteção em momentos de calamidades nacionais',
      'Libertação de escravos que se refugiavam em seu santuário'
    ],
    devocoes: [
      'Romaria ao Santuário de Aparecida',
      'Novena de Nossa Senhora Aparecida',
      'Terço de Nossa Senhora Aparecida',
      'Consagração das famílias brasileiras'
    ]
  },
  {
    id: 'santa-teresinha-do-menino-jesus',
    nome: 'Santa Teresinha do Menino Jesus',
    dataFesta: '1º de outubro',
    biografia: `Santa Teresa de Lisieux (1873-1897), conhecida como Santa Teresinha do Menino Jesus ou Doutora da Igreja, foi uma freira carmelita francesa que desenvolveu a "Pequena Via" - um caminho espiritual baseado na confiança e abandono total em Deus.

    Nascida Marie-Françoise-Thérèse Martin, ingressou no Carmelo de Lisieux aos 15 anos. Apesar de sua vida aparentemente comum, desenvolveu uma espiritualidade profunda baseada na simplicidade, humildade e amor confiante a Deus como um Pai.

    Sua autobiografia "História de uma Alma" se tornou um dos livros espirituais mais lidos do mundo. Morreu aos 24 anos, vítima de tuberculose, prometendo "passar seu céu fazendo o bem na terra".

    Foi canonizada em 1925 por Pio XI e proclamada Doutora da Igreja em 1997 por João Paulo II, sendo a terceira mulher a receber esse título. É padroeira das missões e dos missionários.`,
    curiosidades: [
      'Prometeu que após a morte "faria chover rosas" como sinal de suas graças',
      'Desenvolveu a "Pequena Via", caminho espiritual de simplicidade e confiança',
      'É Doutora da Igreja, título raramente concedido a mulheres',
      'Sua autobiografia foi traduzida para mais de 60 idiomas',
      'Nunca saiu de seu convento, mas é padroeira das missões mundiais',
      'Inspirou milhares de vocações missionárias através de seus escritos'
    ],
    oracoes: [oracaoSantaTeresinha],
    imagem: '/images/santa-teresinha.jpg',
    padroeiro: ['Missões', 'Missionários', 'França', 'Tuberculosos', 'Floricultores'],
    simbolos: ['Rosas', 'Crucifixo', 'Hábito carmelita', 'Livro (autobiografia)'],
    vida: {
      nascimento: '2 de janeiro de 1873',
      morte: '30 de setembro de 1897',
      canonizacao: '17 de maio de 1925',
      local: 'Lisieux, França'
    },
    milagres: [
      'Inúmeras curas espirituais através de suas intercessões',
      'Chuva de rosas como sinal de graças alcançadas',
      'Conversões extraordinárias de pecadores',
      'Proteção especial de missionários em terras distantes'
    ],
    devocoes: [
      'Novena das Rosas a Santa Teresinha',
      'Pequena Via de infância espiritual',
      'Consagração missionária',
      'Oração pelos missionários'
    ]
  }
];

// Funções utilitárias tipadas
export const buscarSantoPorId = (id: string): Santo | undefined => {
  return santos.find(santo => santo.id === id);
};

export const buscarSantosPorNome = (nome: string): Santo[] => {
  const termoBusca = nome.toLowerCase();
  return santos.filter(santo => 
    santo.nome.toLowerCase().includes(termoBusca)
  );
};

export const buscarSantosPorDataFesta = (data: string): Santo[] => {
  return santos.filter(santo => santo.dataFesta === data);
};

export const obterSantosDoMes = (mes: number): Santo[] => {
  return santos.filter(santo => {
    const dataParts = santo.dataFesta.split(' de ');
    const nomeMes = dataParts[1];
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return meses[mes - 1] === nomeMes.toLowerCase();
  });
};

export const obterSantosComOracoes = (): Santo[] => {
  return santos.filter(santo => santo.oracoes && santo.oracoes.length > 0);
};

export const obterPadroeiros = (): string[] => {
  const todosPatrocinios = santos.flatMap(santo => santo.padroeiro || []);
  return Array.from(new Set(todosPatrocinios)).sort();
};

export const buscarSantosPorPatrocinio = (patrocinio: string): Santo[] => {
  return santos.filter(santo => 
    santo.padroeiro?.some(p => 
      p.toLowerCase().includes(patrocinio.toLowerCase())
    )
  );
}; 