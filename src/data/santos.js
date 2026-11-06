// Conteúdo das páginas dos santos. Cada santo tem paleta, ornamento, ambiente e
// seções próprias, que a página /santos/:slug desenha de um jeito diferente.
// scripts/rotas-estaticas.js lê os slugs deste arquivo para gerar as rotas do build.

import { getSantoImagePath } from '../utils/imageUtils';
import { extras } from './santosExtras';

const basicos = [
  {
    slug: 'sao-francisco',
    nome: 'São Francisco de Assis',
    resumo: 'Padroeiro dos animais e da ecologia, fundador da Ordem Franciscana.',
    origem: 'Assis, Itália · 1182–1226',
    festa: '4 de outubro',
    padroeiro: ['Itália', 'Ecologia', 'Animais'],
    imagem: getSantoImagePath('sao-francisco-jovem.webp'),
    posicaoImagem: 'center 20%',
    estilo: 'sol',
    cores: { principal: '#6B4A2E', secundaria: '#4E7A3A', brilho: '#D9A441' },
    // paleta da página inteira: pergaminho de dia, terra à noite
    paleta: {
      claro: { fundo: '#F5EFE3', cartao: '#FFFBF3', texto: '#3B2A1C', suave: '#6E5A47', titulo: '#4A3220', borda: '#E4D7C2', topo: 'rgba(58, 38, 22, 0.94)' },
      escuro: { fundo: '#17110B', cartao: '#221A12', texto: '#EFE6D8', suave: '#BFAE97', titulo: '#F1E2C8', borda: '#3A2C1E', topo: 'rgba(23, 17, 11, 0.94)' },
    },
    frase: {
      texto: 'Louvado sejas, meu Senhor, com todas as tuas criaturas.',
      autor: 'Cântico das Criaturas',
    },
    historia: [
      'Francisco nasceu em Assis, na Itália, filho de Pedro Bernardone, um rico comerciante de tecidos. Na juventude sonhava ser cavaleiro e gastava sem medida com festas e amigos.',
      'Depois de uma prisão de guerra e de uma longa doença, começou a procurar outro sentido para a vida. Rezando diante do crucifixo da igrejinha de São Damião, ouviu: "Francisco, vai e reconstrói a minha casa, que está em ruínas".',
      'Diante do bispo de Assis, devolveu ao pai até as roupas do corpo e passou a viver na pobreza, servindo os leprosos e reformando igrejas com as próprias mãos. Logo outros jovens quiseram seguir o mesmo caminho, e assim nasceram os Frades Menores.',
      'Chamava o sol, a lua, a água e o fogo de irmãos, e via em cada criatura um motivo para louvar a Deus. Dois anos antes de morrer, recebeu os estigmas no monte Alverne.',
    ],
    historias: {
      titulo: 'Histórias dos Fioretti',
      introducao: 'Os "Fioretti", as florzinhas de São Francisco, guardam os episódios que o povo contava sobre ele:',
      itens: [
        {
          ilustracao: 'lobo',
          titulo: 'O lobo de Gubbio',
          texto: 'Um lobo aterrorizava a cidade de Gubbio. Francisco foi ao encontro dele, chamou-o de irmão e fez um pacto: o povo daria comida ao lobo, e o lobo não atacaria mais ninguém. Dizem que ele viveu manso na cidade até morrer.',
        },
        {
          ilustracao: 'passaros',
          titulo: 'O sermão aos pássaros',
          texto: 'Perto de Bevagna, Francisco viu um bando de pássaros e começou a pregar para eles, lembrando que Deus lhes deu penas, asas e o céu inteiro. Os pássaros ficaram quietos ouvindo até ele dar a bênção.',
        },
        {
          ilustracao: 'presepio',
          titulo: 'O primeiro presépio',
          texto: 'No Natal de 1223, em Greccio, Francisco montou uma manjedoura com feno, um boi e um burro, e celebrou ali a Missa da noite. Queria que todos vissem com os olhos a pobreza em que Jesus nasceu. Assim começou a tradição do presépio.',
        },
        {
          ilustracao: 'tau',
          titulo: 'O sinal do Tau',
          texto: 'Francisco assinava suas cartas e abençoava com o Tau, a última letra do alfabeto hebraico, em forma de cruz. Para ele era o sinal dos que se convertem e pertencem a Cristo. O Tau virou o símbolo dos franciscanos.',
        },
      ],
    },
    destaque: {
      tipo: 'cantico',
      titulo: 'O Cântico das Criaturas',
      introducao:
        'Já doente e quase cego, Francisco compôs um hino em que chama toda a criação de família. Trechos traduzidos do italiano antigo:',
      itens: [
        { icone: 'sol', titulo: 'Irmão Sol', texto: 'Que é o dia, e por ele nos iluminas. Ele é belo e radiante, com grande esplendor.' },
        { icone: 'lua', titulo: 'Irmã Lua e as estrelas', texto: 'No céu as formaste claras, preciosas e belas.' },
        { icone: 'vento', titulo: 'Irmão Vento', texto: 'Pelo ar e pelas nuvens, pelo céu sereno e por todo tempo.' },
        { icone: 'agua', titulo: 'Irmã Água', texto: 'Que é muito útil e humilde, preciosa e casta.' },
        { icone: 'fogo', titulo: 'Irmão Fogo', texto: 'Com o qual iluminas a noite. Ele é belo, alegre, robusto e forte.' },
        { icone: 'terra', titulo: 'Irmã e mãe Terra', texto: 'Que nos sustenta e governa, e produz frutos diversos, com flores coloridas e ervas.' },
      ],
    },
    linhaDoTempo: [
      { ano: '1182', texto: 'Nasce em Assis, na Itália.' },
      { ano: '1205', texto: 'Ouve o crucifixo de São Damião pedir que reconstrua a Igreja.' },
      { ano: '1206', texto: 'Renuncia à herança do pai diante do bispo de Assis.' },
      { ano: '1209', texto: 'O papa Inocêncio III aprova a forma de vida dos primeiros frades.' },
      { ano: '1223', texto: 'Monta o primeiro presépio vivo, em Greccio, na noite de Natal.' },
      { ano: '1224', texto: 'Recebe os estigmas no monte Alverne.' },
      { ano: '1226', texto: 'Morre em 3 de outubro, na Porciúncula.' },
      { ano: '1228', texto: 'É canonizado pelo papa Gregório IX.' },
      { ano: '1979', texto: 'São João Paulo II o proclama padroeiro da ecologia.' },
    ],
    videos: [
      { id: 'YnaV24Z1_Oo', titulo: 'A vida de São Francisco de Assis' },
      { id: 'DxaqKfATuj4', titulo: 'Irmão Sol e Irmã Lua' },
    ],
    oracao: {
      titulo: 'Oração pela paz',
      nota: 'Tradicionalmente atribuída a São Francisco.',
      texto: `Senhor, fazei de mim um instrumento de vossa paz.
Onde houver ódio, que eu leve o amor;
onde houver ofensa, que eu leve o perdão;
onde houver discórdia, que eu leve a união;
onde houver dúvida, que eu leve a fé;
onde houver erro, que eu leve a verdade;
onde houver desespero, que eu leve a esperança;
onde houver tristeza, que eu leve a alegria;
onde houver trevas, que eu leve a luz.
Ó Mestre, fazei que eu procure mais
consolar que ser consolado,
compreender que ser compreendido,
amar que ser amado.
Pois é dando que se recebe,
é perdoando que se é perdoado,
e é morrendo que se vive para a vida eterna.`,
    },
  },
  {
    slug: 'santa-teresinha',
    nome: 'Santa Teresinha do Menino Jesus',
    resumo: 'Doutora da Igreja e padroeira das missões, mestra da pequena via.',
    origem: 'Alençon, França · 1873–1897',
    festa: '1º de outubro',
    padroeiro: ['Missões', 'França'],
    rotuloPadroeiro: 'Padroeira',
    imagem: getSantoImagePath('Santa terezinha.jpg'),
    posicaoImagem: 'center 25%',
    estilo: 'rosas',
    cores: { principal: '#A8456B', secundaria: '#5C4033', brilho: '#E8B4C4' },
    paleta: {
      claro: { fundo: '#F8F1EE', cartao: '#FFFCF9', texto: '#33232A', suave: '#76626A', titulo: '#4F2234', borda: '#E7D6D2', topo: 'rgba(92, 36, 56, 0.94)' },
      escuro: { fundo: '#1A0E12', cartao: '#26161C', texto: '#F3E4E8', suave: '#C7A8B1', titulo: '#F6D3DD', borda: '#3E2530', topo: 'rgba(26, 14, 18, 0.94)' },
    },
    frase: {
      texto: 'Quero passar o meu Céu fazendo o bem sobre a terra.',
      autor: 'Santa Teresinha, 1897',
    },
    historia: [
      'Teresa Martin nasceu em Alençon, na França, a caçula de nove filhos de Luís e Zélia Martin, hoje também santos. Perdeu a mãe aos quatro anos, e a família se mudou para Lisieux.',
      'Desde menina queria ser carmelita. Aos 14 anos, numa peregrinação a Roma, chegou a pedir ao papa Leão XIII licença para entrar no Carmelo antes da idade. Entrou no Carmelo de Lisieux aos 15.',
      'Não fez nada que o mundo chamaria de grande. Descobriu que a santidade cabe nas pequenas coisas feitas com muito amor e numa confiança de criança em Deus. Chamou isso de "pequena via".',
      'Morreu de tuberculose aos 24 anos. Prometeu "fazer cair uma chuva de rosas" sobre a terra, e por isso é lembrada com rosas. Seus escritos, reunidos em "História de uma Alma", correram o mundo.',
    ],
    historias: {
      titulo: 'Pequenos episódios',
      introducao: 'Alguns momentos que a própria Teresinha contou na "História de uma Alma":',
      itens: [
        {
          ilustracao: 'florzinha',
          titulo: 'A florzinha de Jesus',
          texto: 'Ela começa a história da própria vida contando a história de "uma florzinha branca": uma flor pequena, plantada por Deus num jardim, que só quer alegrar o olhar de Jesus. Por isso ficou conhecida como a Pequena Flor.',
        },
        {
          ilustracao: 'elevador',
          titulo: 'O elevador',
          texto: 'Achava-se pequena demais para subir a "escada" da perfeição. Lembrou dos elevadores, novidade da época, e descobriu o seu: "o elevador que deve me elevar até o Céu são os vossos braços, ó Jesus".',
        },
        {
          ilustracao: 'missoes',
          titulo: 'Missionária sem sair do convento',
          texto: 'Nunca saiu do Carmelo, mas rezava e se oferecia pelos missionários. Acompanhou por cartas dois deles, um seminarista e um padre que partiu para a China. Por isso a Igreja a declarou padroeira das missões.',
        },
        {
          ilustracao: 'natal',
          titulo: 'O Natal de 1886',
          texto: 'Aos 13 anos, depois da Missa do Galo, ouviu o pai dizer que era o último ano dos sapatinhos de presente na lareira. Em vez de chorar, como sempre fazia, sorriu. Ela chamou aquela noite de sua conversão: ali ganhou força para amar sem se fechar em si.',
        },
      ],
    },
    destaque: {
      tipo: 'pequenaVia',
      titulo: 'A pequena via',
      introducao: 'O caminho que Teresinha ensinou para quem acha que a santidade é coisa para gente grande:',
      itens: [
        { titulo: 'Fazer as pequenas coisas com amor', texto: 'Um sorriso, uma tarefa bem feita, um silêncio paciente. Nada é pequeno quando é feito por amor.' },
        { titulo: 'Confiar como uma criança', texto: 'Não depender das próprias forças, mas se deixar levar por Deus como um filho nos braços do pai.' },
        { titulo: 'Oferecer o que custa', texto: 'Transformar em oferta os pequenos sacrifícios do dia, sem fazer alarde.' },
        { titulo: 'Amar onde Deus nos pôs', texto: 'Sem esperar outro lugar ou outra vida: a santidade começa no lugar de hoje.' },
      ],
    },
    linhaDoTempo: [
      { ano: '1873', texto: 'Nasce em 2 de janeiro, em Alençon.' },
      { ano: '1877', texto: 'Morre a mãe, Zélia; a família se muda para Lisieux.' },
      { ano: '1886', texto: 'Na noite de Natal, vive o que chamou de sua conversão.' },
      { ano: '1887', texto: 'Em Roma, pede ao papa Leão XIII para entrar no Carmelo.' },
      { ano: '1888', texto: 'Entra no Carmelo de Lisieux, aos 15 anos.' },
      { ano: '1897', texto: 'Morre em 30 de setembro, aos 24 anos.' },
      { ano: '1898', texto: 'É publicada a "História de uma Alma".' },
      { ano: '1925', texto: 'É canonizada pelo papa Pio XI.' },
      { ano: '1927', texto: 'É proclamada padroeira das missões.' },
      { ano: '1997', texto: 'São João Paulo II a declara Doutora da Igreja.' },
    ],
    oracao: {
      titulo: 'Oração a Santa Teresinha',
      texto: `Santa Teresinha do Menino Jesus,
que encontrastes o caminho do Céu nas coisas pequenas,
ensinai-me a confiar em Deus como uma criança
e a fazer com amor cada tarefa deste dia.
Deixai cair sobre mim e sobre os que amo
uma das rosas que prometestes,
e intercedei por nós junto de Jesus.
Amém.`,
    },
  },
  {
    slug: 'padre-pio',
    nome: 'São Padre Pio de Pietrelcina',
    resumo: 'Frade capuchinho, confessor incansável e estigmatizado.',
    origem: 'Pietrelcina, Itália · 1887–1968',
    festa: '23 de setembro',
    padroeiro: ['Voluntários da Defesa Civil (Itália)'],
    imagem: getSantoImagePath('Padre-Pio.webp'),
    posicaoImagem: 'center 20%',
    estilo: 'vela',
    cores: { principal: '#8B2E2E', secundaria: '#4A3121', brilho: '#E0B25A' },
    // a página do Padre Pio é sempre à luz de vela, nos dois temas
    paleta: {
      claro: { fundo: '#15100C', cartao: '#211913', texto: '#EDE3D6', suave: '#B9A893', titulo: '#F1D9A8', borda: '#3A2C21', topo: 'rgba(21, 16, 12, 0.94)', modo: 'escuro' },
      escuro: { fundo: '#15100C', cartao: '#211913', texto: '#EDE3D6', suave: '#B9A893', titulo: '#F1D9A8', borda: '#3A2C21', topo: 'rgba(21, 16, 12, 0.94)', modo: 'escuro' },
    },
    frase: {
      texto: 'Reze, espere e não se preocupe.',
      autor: 'Padre Pio',
    },
    historia: [
      'Francesco Forgione nasceu numa família pobre de camponeses em Pietrelcina, no sul da Itália. Aos 15 anos entrou para os frades capuchinhos e recebeu o nome de Pio.',
      'Foi ordenado padre em 1910 e, alguns anos depois, chegou ao convento de San Giovanni Rotondo, onde passaria o resto da vida.',
      'Passava horas no confessionário e incentivou os grupos de oração. Também construiu um grande hospital, a Casa Alívio do Sofrimento, para cuidar dos doentes com dignidade.',
      'Entre 1931 e 1933, a Santa Sé o proibiu de celebrar em público e de atender confissões. Ele obedeceu em silêncio. A proibição foi retirada, e sua fama de santidade só cresceu.',
    ],
    chagas: {
      titulo: 'As chagas',
      texto: [
        'Na manhã de 20 de setembro de 1918, depois da Missa, Padre Pio rezava diante de um crucifixo no coro da igreja de San Giovanni Rotondo. Quando voltou a si, tinha nas mãos, nos pés e no lado as feridas de Cristo: os estigmas.',
        'Ele não as exibia. Pediu a Deus que as tornasse invisíveis, guardando apenas a dor, e cobria as mãos com meias-luvas marrons, que só tirava para celebrar a Missa.',
        'As feridas foram examinadas por médicos e investigadas pela Igreja durante anos. Sangraram por cinquenta anos e, nos dias antes da sua morte, em 1968, desapareceram sem deixar cicatriz.',
      ],
      fatos: [
        { numero: '1918', rotulo: 'ano em que as chagas apareceram' },
        { numero: '50', rotulo: 'anos carregando as feridas' },
        { numero: '5', rotulo: 'chagas: mãos, pés e lado' },
      ],
    },
    historias: {
      titulo: 'O dia a dia do frade',
      introducao: 'Muito do que se conta de Padre Pio aconteceu em San Giovanni Rotondo:',
      itens: [
        {
          ilustracao: 'confessionario',
          titulo: 'O confessionário',
          texto: 'Atendia confissões por até dez horas por dia. A procura era tanta que, nos anos 1950, era preciso pegar senha para se confessar com ele. Muitos contavam que ele lia o coração de quem chegava.',
        },
        {
          ilustracao: 'hospital',
          titulo: 'A Casa Alívio do Sofrimento',
          texto: 'Inaugurado em 1956 com doações do mundo inteiro, o hospital nasceu para tratar os doentes "como se tratasse o próprio Cristo". Hoje é um dos grandes hospitais do sul da Itália.',
        },
        {
          ilustracao: 'terco',
          titulo: 'O terço na mão',
          texto: 'Rezava muitos terços por dia e chamava o rosário de "a arma" para os tempos difíceis. Atendendo a um pedido do papa Pio XII durante a Segunda Guerra, incentivou os Grupos de Oração, que hoje existem em vários países.',
        },
        {
          ilustracao: 'anjo',
          titulo: '"Mande-me o seu anjo da guarda"',
          texto: 'Tinha uma devoção enorme ao anjo da guarda. A quem não podia ir até San Giovanni Rotondo, dizia: quando precisar de mim, mande-me o seu anjo da guarda.',
        },
      ],
    },
    destaque: {
      tipo: 'conselhos',
      titulo: 'Três palavras para o dia a dia',
      introducao: 'O conselho mais conhecido de Padre Pio cabe numa frase só:',
      itens: [
        { titulo: 'Reze', texto: 'A oração é a chave que abre o coração de Deus. Comece e termine o dia falando com Ele.' },
        { titulo: 'Espere', texto: 'Confie que Deus age no tempo dele, mesmo quando nada parece mudar.' },
        { titulo: 'Não se preocupe', texto: 'A preocupação não muda o amanhã. Entregue a Deus o que não está nas suas mãos.' },
      ],
    },
    linhaDoTempo: [
      { ano: '1887', texto: 'Nasce em 25 de maio, em Pietrelcina.' },
      { ano: '1903', texto: 'Entra para os frades capuchinhos e recebe o nome de Pio.' },
      { ano: '1910', texto: 'É ordenado sacerdote.' },
      { ano: '1916', texto: 'Chega ao convento de San Giovanni Rotondo.' },
      { ano: '1918', texto: 'Recebe os estigmas, em 20 de setembro.' },
      { ano: '1931', texto: 'A Santa Sé restringe seu ministério; ele obedece até 1933.' },
      { ano: '1956', texto: 'Inaugura o hospital Casa Alívio do Sofrimento.' },
      { ano: '1968', texto: 'Morre em 23 de setembro.' },
      { ano: '2002', texto: 'É canonizado por São João Paulo II.' },
    ],
    oracao: {
      titulo: 'Fica comigo, Senhor',
      nota: 'Início da oração que Padre Pio rezava depois da comunhão, traduzido do italiano.',
      texto: `Fica comigo, Senhor,
porque preciso da tua presença para não te esquecer.
Tu sabes com que facilidade eu te abandono.
Fica comigo, Senhor,
porque sou fraco e preciso da tua força
para não cair tantas vezes.
Fica comigo, Senhor,
porque tu és a minha vida,
e sem ti me falta o fervor.`,
    },
  },
  {
    slug: 'nossa-senhora',
    nome: 'Nossa Senhora',
    resumo: 'Mãe de Jesus e nossa mãe, honrada com muitos títulos pelo mundo.',
    origem: 'Nazaré, Galileia · século I',
    festa: '1º de janeiro, Santa Maria, Mãe de Deus',
    padroeiro: ['Brasil (Aparecida)', 'Américas (Guadalupe)'],
    rotuloPadroeiro: 'Padroeira',
    imagem: getSantoImagePath('Nossa senhora.webp'),
    posicaoImagem: 'center 15%',
    estilo: 'manto',
    cores: { principal: '#1F4E8C', secundaria: '#16365F', brilho: '#C9A54C' },
    paleta: {
      claro: { fundo: '#F4F1EA', cartao: '#FFFDF8', texto: '#1F2633', suave: '#5B6271', titulo: '#16325C', borda: '#DCD6C8', topo: 'rgba(22, 54, 95, 0.94)' },
      escuro: { fundo: '#0A1424', cartao: '#122038', texto: '#E3EAF5', suave: '#9FB0C8', titulo: '#DCE8F8', borda: '#22385A', topo: 'rgba(10, 20, 36, 0.94)' },
    },
    frase: {
      texto: 'Fazei tudo o que ele vos disser.',
      autor: 'João 2,5',
    },
    historia: [
      'Maria era uma jovem de Nazaré quando o anjo Gabriel lhe anunciou que seria a mãe do Salvador. Respondeu com o seu "sim": "Eis aqui a serva do Senhor".',
      'Acompanhou Jesus do nascimento em Belém à cruz no Calvário. Nas bodas de Caná, foi ela quem percebeu que faltava vinho e levou o pedido ao Filho.',
      'Aos pés da cruz, Jesus a entregou ao discípulo amado, e nele a toda a Igreja: "Eis aí tua mãe". Por isso os cristãos a chamam de mãe.',
      'Ao longo dos séculos, Maria foi honrada com muitos títulos, ligados a aparições, a lugares e a verdades da fé. Cada um mostra um jeito diferente do seu cuidado.',
    ],
    historias: {
      titulo: 'Quando a Mãe apareceu',
      introducao: 'Quatro aparições e encontros que marcaram a fé de milhões de pessoas:',
      itens: [
        {
          ilustracao: 'aparecida',
          titulo: 'Aparecida, 1717',
          texto: 'Três pescadores lançaram a rede no rio Paraíba do Sul e tiraram o corpo de uma imagem da Imaculada Conceição. Na rede seguinte veio a cabeça, e depois tantos peixes que mal cabiam no barco. É a Padroeira do Brasil.',
        },
        {
          ilustracao: 'guadalupe',
          titulo: 'Guadalupe, 1531',
          texto: 'No México, ela pediu a São Juan Diego que levasse ao bispo rosas colhidas no monte em pleno inverno. Quando ele abriu o manto diante do bispo, as rosas caíram e a imagem de Maria estava estampada no tecido.',
        },
        {
          ilustracao: 'lourdes',
          titulo: 'Lourdes, 1858',
          texto: 'Na gruta de Massabielle, na França, apareceu dezoito vezes a Santa Bernadete, uma menina pobre de 14 anos. Disse: "Eu sou a Imaculada Conceição". Da gruta brotou uma fonte que atrai peregrinos até hoje.',
        },
        {
          ilustracao: 'fatima',
          titulo: 'Fátima, 1917',
          texto: 'Sobre uma azinheira em Portugal, apareceu a três pastorinhos, Lúcia, Francisco e Jacinta, do dia 13 de maio a outubro. Pediu oração do terço e conversão.',
        },
      ],
    },
    destaque: {
      tipo: 'titulos',
      titulo: 'Alguns títulos de Maria',
      introducao: 'Uma só Mãe, muitos nomes. Alguns que a Igreja celebra ao longo do ano:',
      itens: [
        { titulo: 'Santa Maria, Mãe de Deus', data: '1º de janeiro', texto: 'O título mais antigo: o filho de Maria é Deus feito homem.' },
        { titulo: 'Nossa Senhora do Carmo', data: '16 de julho', texto: 'Ligada aos carmelitas e ao escapulário que muitos católicos usam.' },
        { titulo: 'Assunção de Nossa Senhora', data: '15 de agosto', texto: 'Ao fim da vida terrena, Maria foi levada ao Céu em corpo e alma.' },
        { titulo: 'Nossa Senhora Rainha', data: '22 de agosto', texto: 'Mãe do Rei, ela é celebrada como Rainha do Céu e da Terra.' },
        { titulo: 'Nossa Senhora das Dores', data: '15 de setembro', texto: 'Lembra a mãe que esteve de pé junto à cruz do Filho.' },
        { titulo: 'Imaculada Conceição', data: '8 de dezembro', texto: 'Maria foi preservada do pecado original desde a sua concepção.' },
      ],
    },
    terco: true,
    linhaDoTempo: [
      { ano: '431', texto: 'O Concílio de Éfeso proclama Maria Mãe de Deus.' },
      { ano: '649', texto: 'O Concílio de Latrão afirma a virgindade perpétua de Maria.' },
      { ano: '1854', texto: 'O papa Pio IX define o dogma da Imaculada Conceição.' },
      { ano: '1950', texto: 'O papa Pio XII define o dogma da Assunção.' },
    ],
    tituloLinhaDoTempo: 'Os quatro dogmas marianos',
    oracao: {
      titulo: 'Ave-Maria',
      texto: `Ave Maria, cheia de graça,
o Senhor é convosco;
bendita sois vós entre as mulheres
e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus,
rogai por nós, pecadores,
agora e na hora de nossa morte.
Amém.`,
    },
  },
];

// cada santo junta o conteúdo básico com o aprofundamento de santosExtras.js
export const santos = basicos.map(santo => ({ ...santo, ...extras[santo.slug] }));

export const santoPorSlug = slug => santos.find(santo => santo.slug === slug);
