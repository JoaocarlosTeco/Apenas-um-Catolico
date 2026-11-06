import { santoPorSlug } from './santos';

// Categorias na ordem em que aparecem nos filtros e na lista completa
export const categorias = [
  {
    id: 'essenciais',
    rotulo: 'Essenciais',
    descricao: 'As orações que se aprendem no catecismo e se rezam a vida inteira.',
  },
  {
    id: 'do-dia',
    rotulo: 'Do dia',
    descricao: 'Orações curtas para o acordar, a mesa e o fim do dia.',
  },
  {
    id: 'marianas',
    rotulo: 'Marianas',
    descricao: 'Com Maria e pela sua intercessão, para chegar mais perto de Jesus.',
  },
  {
    id: 'espirito-santo',
    rotulo: 'Ao Espírito Santo',
    descricao: 'Para pedir luz antes de estudar, decidir ou começar um trabalho.',
  },
  {
    id: 'falecidos',
    rotulo: 'Pelos falecidos',
    descricao: 'A Igreja reza pelos que partiram e os confia à misericórdia de Deus.',
  },
  {
    id: 'santos',
    rotulo: 'Com os santos',
    descricao: 'Orações que os santos nos deixaram e pedidos à sua intercessão.',
  },
];

// Roteiro do filtro "Do dia": cada momento lista as orações na ordem em que se rezam
export const momentos = [
  {
    id: 'manha',
    rotulo: 'Ao acordar',
    descricao: 'Antes do celular e das primeiras tarefas, entregue o dia a Deus.',
    oracoes: ['sinal-da-cruz', 'santo-anjo'],
    link: { para: '/laudes', rotulo: 'Rezar as Laudes, a oração da manhã' },
  },
  {
    id: 'meio-dia',
    rotulo: 'Ao meio-dia',
    descricao: 'Uma pausa no trabalho para lembrar que Deus se fez homem. Também se reza às 6h e às 18h.',
    oracoes: ['angelus'],
  },
  {
    id: 'refeicao',
    rotulo: 'Nas refeições',
    descricao: 'Abençoar o alimento antes de comer e agradecer ao terminar, em família ou sozinho.',
    oracoes: ['antes-das-refeicoes', 'depois-das-refeicoes'],
  },
  {
    id: 'noite',
    rotulo: 'Antes de dormir',
    descricao:
      'Faça antes um breve exame de consciência: reveja o dia, agradeça o bem recebido e reconheça as faltas. Depois, peça perdão e entregue a noite a Deus.',
    oracoes: ['ato-de-contricao', 'santo-anjo', 'salve-rainha'],
  },
];

// As orações de santos já existem nas páginas de cada um; reaproveita o mesmo texto
const deSanto = (slug, campos = {}) => {
  const santo = santoPorSlug(slug);
  if (!santo?.oracao?.texto) return null;
  return {
    id: slug,
    titulo: santo.oracao.titulo,
    categoria: 'santos',
    texto: santo.oracao.texto,
    origem: santo.oracao.nota,
    link: { para: `/santos/${slug}`, rotulo: `Conhecer a vida de ${santo.nome}` },
    ...campos,
  };
};

export const oracoes = [
  // Essenciais
  {
    id: 'sinal-da-cruz',
    titulo: 'Sinal da Cruz',
    categoria: 'essenciais',
    apelidos: ['Pelo sinal', 'persignação', 'persignar'],
    texto: `Pelo sinal da Santa Cruz,
livrai-nos, Deus, nosso Senhor,
dos nossos inimigos.
Em nome do Pai, e do Filho
e do Espírito Santo.
Amém.`,
    origem:
      'A invocação final retoma o envio de Jesus para batizar “em nome do Pai e do Filho e do Espírito Santo” (Mt 28,19). Por volta do ano 200, Tertuliano já conta que os cristãos traçavam a cruz na testa ao longo do dia.',
    comoRezar:
      'Na primeira parte, traçam-se três pequenas cruzes com o polegar: na testa, na boca e no peito. Na segunda, a cruz grande: da testa ao peito e do ombro esquerdo ao direito.',
  },
  {
    id: 'pai-nosso',
    titulo: 'Pai-Nosso',
    categoria: 'essenciais',
    apelidos: ['Pai Nosso', 'Oração do Senhor'],
    texto: `Pai nosso que estais nos céus,
santificado seja o vosso nome;
venha a nós o vosso reino;
seja feita a vossa vontade,
assim na terra como no céu.
O pão nosso de cada dia nos dai hoje;
perdoai-nos as nossas ofensas,
assim como nós perdoamos
a quem nos tem ofendido;
e não nos deixeis cair em tentação,
mas livrai-nos do mal.
Amém.`,
    origem: 'É a oração que o próprio Jesus ensinou aos discípulos, registrada em Mt 6,9-13 e Lc 11,2-4.',
  },
  {
    id: 'ave-maria',
    titulo: 'Ave-Maria',
    categoria: 'essenciais',
    apelidos: ['Ave Maria'],
    texto: `Ave Maria, cheia de graça,
o Senhor é convosco;
bendita sois vós entre as mulheres
e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus,
rogai por nós, pecadores,
agora e na hora de nossa morte.
Amém.`,
    origem:
      'Une a saudação do anjo Gabriel (Lc 1,28) e a de Isabel (Lc 1,42). A súplica “Santa Maria, Mãe de Deus” foi acrescentada depois e se firmou na forma atual no século XVI.',
  },
  {
    id: 'gloria',
    titulo: 'Glória ao Pai',
    categoria: 'essenciais',
    apelidos: ['Glória', 'doxologia'],
    texto: `Glória ao Pai, ao Filho e ao Espírito Santo,
como era no princípio, agora e sempre.
Amém.`,
    origem:
      'É a chamada doxologia menor, louvor à Santíssima Trindade usado desde os primeiros séculos. Na Liturgia das Horas, encerra cada salmo.',
  },
  {
    id: 'credo',
    titulo: 'Credo',
    categoria: 'essenciais',
    apelidos: ['Creio', 'Símbolo dos Apóstolos', 'Creio em Deus Pai'],
    texto: `Creio em Deus Pai todo-poderoso,
criador do céu e da terra.
E em Jesus Cristo, seu único Filho, nosso Senhor,
que foi concebido pelo poder do Espírito Santo;
nasceu da Virgem Maria;
padeceu sob Pôncio Pilatos,
foi crucificado, morto e sepultado;
desceu à mansão dos mortos;
ressuscitou ao terceiro dia;
subiu aos céus;
está sentado à direita de Deus Pai todo-poderoso,
donde há de vir a julgar os vivos e os mortos.
Creio no Espírito Santo,
na santa Igreja Católica,
na comunhão dos santos,
na remissão dos pecados,
na ressurreição da carne,
na vida eterna.
Amém.`,
    origem:
      'É o Símbolo dos Apóstolos, o antigo credo do batismo da Igreja de Roma. Leva esse nome por ser um resumo fiel da fé que os apóstolos pregaram (Catecismo, 194).',
  },
  {
    id: 'ato-de-contricao',
    titulo: 'Ato de Contrição',
    categoria: 'essenciais',
    apelidos: ['contrição', 'arrependimento', 'confissão', 'Meu Deus, eu me arrependo'],
    texto: `Meu Deus, eu me arrependo
de todo o coração de vos ter ofendido,
porque sois tão bom e amável.
Prometo, com a vossa graça,
esforçar-me para ser bom.
Meu Jesus, misericórdia!`,
    origem:
      'A Igreja chama de contrição a dor da alma e a detestação do pecado cometido, com o propósito de não pecar mais (Catecismo, 1451). Esta oração dá palavras a esse propósito.',
    comoRezar:
      'Na Confissão, é rezado depois de dizer os pecados e receber a penitência, antes da absolvição. À noite, depois do exame de consciência.',
  },
  {
    id: 'ato-de-contricao-longo',
    titulo: 'Ato de Contrição (forma longa)',
    categoria: 'essenciais',
    apelidos: ['Senhor meu, Jesus Cristo', 'contrição', 'arrependimento', 'confissão'],
    texto: `Senhor meu, Jesus Cristo,
Deus e Homem verdadeiro,
Criador e Redentor meu,
por serdes vós quem sois, sumamente bom
e digno de ser amado sobre todas as coisas,
e porque vos amo e estimo,
pesa-me, Senhor, de todo o meu coração
de vos ter ofendido;
pesa-me também por ter perdido o céu
e merecido o inferno;
e proponho firmemente,
ajudado com os auxílios da vossa divina graça,
emendar-me e nunca mais vos tornar a ofender,
e espero alcançar o perdão de minhas culpas
pela vossa infinita misericórdia.
Amém.`,
    comoRezar:
      'Pode substituir a forma breve na Confissão. Ela reúne os dois motivos do arrependimento que a Igreja reconhece: o amor a Deus e o temor de perder o céu (Catecismo, 1452-1453).',
  },

  // Do dia
  {
    id: 'santo-anjo',
    titulo: 'Santo Anjo',
    categoria: 'do-dia',
    apelidos: ['Anjo da guarda', 'Santo Anjo do Senhor'],
    texto: `Santo Anjo do Senhor,
meu zeloso guardador,
se a ti me confiou a piedade divina,
sempre me rege, me guarda,
me governa e me ilumina.
Amém.`,
    origem:
      'Versão em português da oração latina Angele Dei. A devoção ao anjo da guarda se apoia em Mt 18,10, onde Jesus diz que os anjos dos pequeninos contemplam sem cessar a face do Pai.',
  },
  {
    id: 'antes-das-refeicoes',
    titulo: 'Antes das refeições',
    categoria: 'do-dia',
    apelidos: ['bênção da mesa', 'refeição', 'almoço', 'jantar', 'comida'],
    texto: `Abençoai-nos, Senhor,
e a estes dons que da vossa bondade
vamos receber.
Por Cristo, nosso Senhor.
Amém.`,
    origem:
      'Tradução da bênção latina tradicional Benedic, Domine. O próprio Jesus erguia os olhos ao céu e abençoava o pão antes de reparti-lo (Mc 6,41).',
  },
  {
    id: 'depois-das-refeicoes',
    titulo: 'Depois das refeições',
    categoria: 'do-dia',
    apelidos: ['ação de graças', 'refeição', 'almoço', 'jantar', 'comida'],
    texto: `Nós vos damos graças, Deus todo-poderoso,
por todos os vossos benefícios.
Vós que viveis e reinais
pelos séculos dos séculos.
Amém.`,
    origem: 'Tradução da ação de graças latina Agimus tibi gratias, rezada tradicionalmente ao terminar a refeição.',
  },

  // Marianas
  {
    id: 'salve-rainha',
    titulo: 'Salve-Rainha',
    categoria: 'marianas',
    apelidos: ['Salve Rainha', 'Salve Regina'],
    texto: `Salve, Rainha, Mãe de misericórdia,
vida, doçura e esperança nossa, salve!
A vós bradamos, os degredados filhos de Eva;
a vós suspiramos, gemendo e chorando
neste vale de lágrimas.
Eia, pois, advogada nossa,
esses vossos olhos misericordiosos a nós volvei;
e depois deste desterro
mostrai-nos Jesus, bendito fruto do vosso ventre.
Ó clemente, ó piedosa,
ó doce sempre Virgem Maria.

V. Rogai por nós, santa Mãe de Deus.
R. Para que sejamos dignos das promessas de Cristo.
Amém.`,
    origem:
      'Antífona mariana medieval, em latim Salve Regina. É uma das antífonas que encerram as Completas, a oração da noite da Igreja, e no Brasil costuma fechar o Terço.',
  },
  {
    id: 'angelus',
    titulo: 'O Anjo do Senhor (Angelus)',
    categoria: 'marianas',
    apelidos: ['Angelus', 'Ângelus', 'Anjo do Senhor', 'Anunciação'],
    texto: `V. O Anjo do Senhor anunciou a Maria.
R. E ela concebeu do Espírito Santo.
Ave Maria, cheia de graça...

V. Eis aqui a serva do Senhor.
R. Faça-se em mim segundo a vossa palavra.
Ave Maria, cheia de graça...

V. E o Verbo se fez carne.
R. E habitou entre nós.
Ave Maria, cheia de graça...

V. Rogai por nós, santa Mãe de Deus.
R. Para que sejamos dignos das promessas de Cristo.

Oremos: Infundi, Senhor, nós vos pedimos,
a vossa graça em nossas almas,
para que nós, que pela anunciação do Anjo
conhecemos a encarnação de Jesus Cristo, vosso Filho,
por sua paixão e morte na cruz
sejamos conduzidos à glória da ressurreição.
Pelo mesmo Cristo, Senhor nosso.
Amém.`,
    origem:
      'Rezado tradicionalmente às 6h, ao meio-dia e às 18h, ao toque dos sinos. Recorda a Anunciação (Lc 1,26-38) e a Encarnação do Verbo (Jo 1,14).',
    comoRezar:
      'Quem conduz diz o V., os demais respondem o R., e todos rezam a Ave-Maria inteira. No tempo pascal, dá lugar à Rainha do Céu (Regina Caeli).',
  },
  {
    id: 'lembrai-vos',
    titulo: 'Lembrai-vos',
    categoria: 'marianas',
    apelidos: ['Memorare', 'Lembrai vos'],
    texto: `Lembrai-vos, ó piíssima Virgem Maria,
que nunca se ouviu dizer
que algum daqueles que têm recorrido à vossa proteção,
implorado a vossa assistência
e reclamado o vosso socorro
fosse por vós desamparado.
Animado eu, pois, com igual confiança,
a vós, ó Virgem entre todas singular,
como a Mãe recorro, de vós me valho
e, gemendo sob o peso dos meus pecados,
me prostro aos vossos pés.
Não desprezeis as minhas súplicas,
ó Mãe do Verbo de Deus humanado,
mas dignai-vos de as ouvir propícia
e de me alcançar o que vos rogo.
Amém.`,
    origem:
      'Conhecida em latim como Memorare, é tradicionalmente atribuída a São Bernardo de Claraval. Foi muito difundida no século XVII pelo padre francês Claude Bernard.',
  },
  {
    id: 'magnificat',
    titulo: 'Magnificat',
    categoria: 'marianas',
    apelidos: ['Cântico de Maria', 'A minha alma engrandece o Senhor'],
    texto: `A minha alma engrandece o Senhor
e se alegrou o meu espírito em Deus, meu Salvador,
pois ele viu a pequenez de sua serva,
desde agora as gerações hão de chamar-me de bendita.
O Poderoso fez em mim maravilhas
e Santo é o seu nome!
Seu amor, de geração em geração,
chega a todos que o respeitam.
Demonstrou o poder de seu braço,
dispersou os orgulhosos.
Derrubou os poderosos de seus tronos
e os humildes exaltou.
De bens saciou os famintos
e despediu, sem nada, os ricos.
Acolheu Israel, seu servidor,
fiel ao seu amor,
como havia prometido aos nossos pais,
em favor de Abraão e de seus filhos, para sempre.

Glória ao Pai e ao Filho e ao Espírito Santo.
Como era no princípio, agora e sempre. Amém.`,
    origem:
      'É o cântico de Maria ao visitar sua prima Isabel (Lc 1,46-55). A Igreja o reza todos os dias nas Vésperas, a oração da tarde.',
  },

  // Ao Espírito Santo
  {
    id: 'vinde-espirito-santo',
    titulo: 'Vinde, Espírito Santo',
    categoria: 'espirito-santo',
    apelidos: ['Veni Sancte Spiritus', 'Espírito Santo'],
    texto: `Vinde, Espírito Santo,
enchei os corações dos vossos fiéis
e acendei neles o fogo do vosso amor.

V. Enviai o vosso Espírito e tudo será criado.
R. E renovareis a face da terra.

Oremos: Ó Deus, que instruístes os corações dos vossos fiéis
com a luz do Espírito Santo,
fazei que apreciemos retamente todas as coisas
segundo o mesmo Espírito
e gozemos sempre da sua consolação.
Por Cristo, Senhor nosso.
Amém.`,
    origem:
      'Vem da antiga antífona latina Veni, Sancte Spiritus. O versículo “Enviai o vosso Espírito” retoma o Salmo 104(103),30.',
    comoRezar: 'É costume rezá-la antes de estudar, de uma decisão importante ou de começar uma reunião.',
  },

  // Pelos falecidos
  {
    id: 'eterno-descanso',
    titulo: 'Eterno descanso',
    categoria: 'falecidos',
    apelidos: ['Requiem', 'Dai-lhes, Senhor', 'mortos', 'defuntos', 'luto'],
    texto: `Dai-lhes, Senhor, o eterno descanso,
e a luz perpétua os ilumine.
Descansem em paz.
Amém.`,
    origem:
      'Tradução da oração latina Requiem aeternam, da liturgia dos fiéis defuntos. A Igreja reza pelos mortos desde a Antiguidade, como já se lê em 2Mc 12,46 (Catecismo, 1032).',
    comoRezar:
      'Por uma só pessoa, use o singular: “Dai-lhe, Senhor, o eterno descanso, e a luz perpétua o (ou a) ilumine. Descanse em paz. Amém.”',
  },

  // Com os santos
  deSanto('sao-francisco', {
    titulo: 'Oração de São Francisco',
    apelidos: ['Oração pela paz', 'instrumento de vossa paz', 'Francisco de Assis'],
    origem:
      'Tradicionalmente atribuída a São Francisco, não aparece entre os seus escritos: o registro mais antigo conhecido é de uma revista francesa de 1912. Ficou ligada a ele por traduzir bem o espírito franciscano.',
  }),
  deSanto('santa-teresinha', { apelidos: ['Teresinha do Menino Jesus', 'Santa Teresa de Lisieux', 'rosas'] }),
  deSanto('padre-pio', { apelidos: ['Padre Pio', 'Pio de Pietrelcina', 'comunhão'] }),
  {
    id: 'sao-miguel',
    titulo: 'São Miguel Arcanjo',
    categoria: 'santos',
    apelidos: ['Miguel', 'Arcanjo', 'proteção', 'combate espiritual'],
    texto: `São Miguel Arcanjo,
defendei-nos no combate;
sede o nosso refúgio
contra as maldades e ciladas do demônio.
Ordene-lhe Deus, instantemente o pedimos;
e vós, príncipe da milícia celeste,
pela virtude divina,
precipitai no inferno a Satanás
e a todos os espíritos malignos
que andam pelo mundo para perder as almas.
Amém.`,
    origem:
      'Composta pelo Papa Leão XIII, que no fim do século XIX mandou rezá-la depois das Missas rezadas. A figura de São Miguel vem de Dn 12,1 e Ap 12,7-9.',
  },
].filter(Boolean);
