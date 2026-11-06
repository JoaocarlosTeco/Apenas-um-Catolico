// Conteúdo de aprofundamento de cada santo: como reconhecer nas imagens, o que escreveu,
// lugares, leituras, milagres reconhecidos e uma novena de nove dias.
// As frases têm a fonte ao lado; quando uma frase famosa NÃO é do santo, isso fica dito.

export const extras = {
  'sao-francisco': {
    iconografia: {
      introducao:
        'Em pinturas e imagens, São Francisco quase sempre aparece com estes sinais:',
      itens: [
        {
          simbolo: 'Hábito marrom com capuz',
          significado:
            'A roupa dos pobres da Úmbria. Segundo seu primeiro biógrafo, ele a cortou em forma de cruz.',
        },
        {
          simbolo: 'Cordão com três nós',
          significado:
            'Os votos de pobreza, castidade e obediência dos frades.',
        },
        {
          simbolo: 'Chagas nas mãos e nos pés',
          significado: 'Os estigmas que recebeu no monte Alverne, em 1224.',
        },
        {
          simbolo: 'Pássaros, lobo e outros animais',
          significado:
            'O sermão aos pássaros, o lobo de Gubbio e o amor por toda a criação.',
        },
        {
          simbolo: 'Caveira',
          significado:
            'Lembra a "irmã morte corporal", que ele também louvou no Cântico das Criaturas.',
        },
      ],
    },
    escritos: {
      introducao:
        'Francisco escreveu pouco e com simplicidade. O que ficou é curto e direto:',
      obras: [
        {
          titulo: 'Cântico das Criaturas',
          texto:
            'Composto em 1225, já doente, no dialeto da Úmbria. É um dos primeiros textos da literatura italiana.',
        },
        {
          titulo: 'Regra dos Frades Menores',
          texto:
            'A forma de vida da ordem, aprovada pelo papa Honório III em 1223.',
        },
        {
          titulo: 'Testamento',
          texto:
            'Ditado pouco antes de morrer, em 1226, para lembrar aos frades como tudo começou.',
        },
        {
          titulo: 'Louvores ao Deus Altíssimo',
          texto:
            'Escritos no Alverne em 1224, num pergaminho que deu a frei Leão, com o Tau desenhado no verso.',
        },
      ],
      frases: [
        {
          texto:
            'Depois que o Senhor me deu irmãos, ninguém me mostrava o que eu devia fazer, mas o próprio Altíssimo me revelou que eu devia viver segundo a forma do santo Evangelho.',
          fonte: 'Testamento',
        },
        {
          texto: 'Onde há caridade e sabedoria, não há temor nem ignorância.',
          fonte: 'Admoestações, 27',
        },
        {
          texto: 'Tu és santo, Senhor, único Deus, que fazes maravilhas.',
          fonte: 'Louvores ao Deus Altíssimo',
        },
      ],
      mitos: [
        {
          frase:
            '"Pregue o Evangelho em todo tempo; se necessário, use palavras."',
          explicacao:
            'Não aparece em nenhum escrito de Francisco nem nas biografias antigas. A ideia mais próxima está na Regra não bulada: todos os frades devem pregar pelas obras.',
        },
        {
          frase: '"Senhor, fazei de mim um instrumento de vossa paz."',
          explicacao:
            'A oração é bonita e muito franciscana, mas foi publicada pela primeira vez em 1912, numa revista francesa, sem autor. Só depois passou a ser atribuída a ele.',
        },
      ],
    },
    lugares: [
      {
        nome: 'Basílica de São Francisco',
        cidade: 'Assis, Itália',
        texto:
          'Guarda o túmulo do santo e os afrescos sobre a sua vida, atribuídos a Giotto.',
      },
      {
        nome: 'Porciúncula',
        cidade: 'Santa Maria dos Anjos, Assis',
        texto:
          'A capelinha que ele restaurou e onde morreu, hoje dentro de uma grande basílica.',
      },
      {
        nome: 'São Damião',
        cidade: 'Assis, Itália',
        texto:
          'Onde ouviu o crucifixo falar. Depois virou o convento de Santa Clara.',
      },
      {
        nome: 'Santuário do Alverne',
        cidade: 'La Verna, Toscana',
        texto: 'O monte onde recebeu os estigmas.',
      },
      {
        nome: 'Santuário do Presépio',
        cidade: 'Greccio, Itália',
        texto: 'Onde montou o primeiro presépio, no Natal de 1223.',
      },
    ],
    leituras: [
      {
        titulo: 'Fioretti de São Francisco',
        autor: 'coletânea do século XIV',
        texto: 'As histórias populares sobre ele e os primeiros frades.',
      },
      {
        titulo: 'Vida de São Francisco',
        autor: 'Tomás de Celano',
        texto:
          'A primeira biografia, escrita logo depois da canonização, em 1228.',
      },
      {
        titulo: "Laudato Si'",
        autor: 'papa Francisco, 2015',
        texto:
          'Encíclica sobre o cuidado da criação. O título vem do Cântico das Criaturas.',
      },
    ],
    novena: {
      quando:
        'Tradicionalmente de 25 de setembro a 3 de outubro, véspera da festa.',
      dias: [
        {
          tema: 'A conversão',
          reflexao:
            'Francisco trocou a vida de festas pelo Evangelho. O que Deus está pedindo que eu mude?',
        },
        {
          tema: 'A pobreza',
          reflexao:
            'Ele se desfez de tudo para ser livre. Do que eu poderia me desapegar nesta semana?',
        },
        {
          tema: 'A paz',
          reflexao:
            'Chamava a todos de irmão, até o sultão em tempo de guerra. Com quem preciso fazer as pazes?',
        },
        {
          tema: 'A criação',
          reflexao:
            'Sol, lua, água e fogo eram seus irmãos. Como cuido da casa comum?',
        },
        {
          tema: 'Os pobres e doentes',
          reflexao:
            'O beijo no leproso mudou sua vida. Quem está esquecido perto de mim?',
        },
        {
          tema: 'A oração',
          reflexao:
            'Passava noites rezando nas grutas de Assis. Que tempo reservo hoje só para Deus?',
        },
        {
          tema: 'A fraternidade',
          reflexao:
            '"O Senhor me deu irmãos." Como cuido da minha comunidade e da minha família?',
        },
        {
          tema: 'A cruz',
          reflexao:
            'Os estigmas mostram um amor que chegou até o fim. Como uno minhas dores às de Cristo?',
        },
        {
          tema: 'A alegria',
          reflexao:
            'Morreu cantando e chamou a morte de irmã. Onde posso levar alegria hoje?',
        },
      ],
      oracao:
        'São Francisco de Assis, que deixastes tudo para seguir a Cristo pobre e crucificado, ensinai-me a viver com simplicidade, a cuidar da criação e a levar a paz por onde eu passar. Apresentai a Deus o pedido que hoje vos confio. Amém.',
    },
  },

  'santa-teresinha': {
    iconografia: {
      introducao:
        'Santa Teresinha é fácil de reconhecer. Quase sempre aparece assim:',
      itens: [
        {
          simbolo: 'Hábito marrom',
          significado:
            'A roupa das carmelitas descalças, a ordem reformada por Santa Teresa de Ávila.',
        },
        {
          simbolo: 'Capa branca e véu preto',
          significado: 'O traje das irmãs que já fizeram os votos no Carmelo.',
        },
        {
          simbolo: 'Rosas',
          significado:
            'A promessa de "fazer cair uma chuva de rosas" sobre a terra depois de morrer.',
        },
        {
          simbolo: 'Crucifixo coberto de rosas',
          significado:
            'Une as duas coisas que ela mais amava: Jesus crucificado e o amor que se dá em pequenos gestos.',
        },
      ],
    },
    escritos: {
      introducao:
        'Teresinha escreveu por obediência às superioras, sem imaginar que o mundo leria:',
      obras: [
        {
          titulo: 'História de uma Alma',
          texto:
            'Três manuscritos escritos entre 1895 e 1897, reunidos e publicados um ano depois da sua morte.',
        },
        {
          titulo: 'Cartas',
          texto:
            'Mais de 260 cartas à família, às irmãs e aos dois missionários que acompanhava.',
        },
        {
          titulo: 'Poesias',
          texto:
            'Cerca de 50 poemas, muitos feitos a pedido das irmãs para festas do convento.',
        },
        {
          titulo: 'Recreações piedosas',
          texto:
            "Pequenas peças de teatro para as irmãs. Numa delas, ela mesma interpretou Joana d'Arc.",
        },
        {
          titulo: 'Últimas conversas',
          texto:
            'Frases anotadas pelas irmãs nos últimos meses da sua doença, em 1897.',
        },
      ],
      frases: [
        {
          texto: 'No coração da Igreja, minha Mãe, eu serei o Amor.',
          fonte: 'História de uma Alma, Manuscrito B',
        },
        {
          texto:
            'Para mim, a oração é um impulso do coração, um simples olhar lançado ao Céu, um grito de gratidão e de amor, tanto no meio da provação como no meio da alegria.',
          fonte: 'Manuscrito C, citado no Catecismo da Igreja Católica, 2558',
        },
        { texto: 'Tudo é graça.', fonte: 'Últimas conversas' },
      ],
    },
    lugares: [
      {
        nome: 'Carmelo de Lisieux',
        cidade: 'Lisieux, França',
        texto:
          'O convento onde viveu nove anos e onde estão as suas relíquias.',
      },
      {
        nome: 'Basílica de Santa Teresa',
        cidade: 'Lisieux, França',
        texto:
          'Uma das maiores igrejas da França no século XX, consagrada em 1954.',
      },
      {
        nome: 'Les Buissonnets',
        cidade: 'Lisieux, França',
        texto: 'A casa da família, onde ela cresceu depois da morte da mãe.',
      },
      {
        nome: 'Casa natal',
        cidade: 'Alençon, França',
        texto: 'Onde nasceu, ao lado da igreja em que foi batizada.',
      },
    ],
    leituras: [
      {
        titulo: 'História de uma Alma',
        autor: 'Santa Teresinha',
        texto: 'O livro que espalhou a pequena via pelo mundo.',
      },
      {
        titulo: 'Divini Amoris Scientia',
        autor: 'São João Paulo II, 1997',
        texto: 'A carta que a declarou Doutora da Igreja.',
      },
      {
        titulo: "C'est la confiance",
        autor: 'papa Francisco, 2023',
        texto:
          'Exortação sobre a confiança no amor de Deus, nos 150 anos do nascimento dela.',
      },
    ],
    novena: {
      quando:
        'A "novena das rosas" costuma ser rezada de 22 a 30 de setembro, mas pode ser feita em qualquer época.',
      dias: [
        {
          tema: 'A pequena via',
          reflexao:
            'Santidade não é fazer coisas grandes, é fazer tudo com amor. Qual pequena coisa farei hoje por amor?',
        },
        {
          tema: 'A confiança',
          reflexao:
            'Ela se via como uma criança nos braços do Pai. Em que preciso confiar mais?',
        },
        {
          tema: 'As coisas de todo dia',
          reflexao:
            'Um sorriso para a irmã difícil também é oração. Quem precisa da minha paciência?',
        },
        {
          tema: 'A família',
          reflexao:
            'Seus pais, Luís e Zélia, também são santos. Rezo pela minha família.',
        },
        {
          tema: 'A oração simples',
          reflexao:
            '"Um simples olhar lançado ao Céu." Posso rezar assim várias vezes hoje.',
        },
        {
          tema: 'As missões',
          reflexao:
            'Sem sair do convento, ajudou missionários. Por quem rezo que está longe?',
        },
        {
          tema: 'O sofrimento oferecido',
          reflexao:
            'Na doença, ofereceu tudo com amor. O que posso oferecer em vez de reclamar?',
        },
        {
          tema: 'A misericórdia',
          reflexao:
            'Confiava mais na misericórdia de Deus do que nos próprios méritos. Deixo Deus me perdoar.',
        },
        {
          tema: 'A chuva de rosas',
          reflexao:
            'Ela prometeu passar o Céu fazendo o bem na terra. Entrego a ela o meu pedido.',
        },
      ],
      oracao:
        'Santa Teresinha do Menino Jesus, que prometestes fazer cair uma chuva de rosas sobre a terra, ensinai-me o caminho da confiança e do amor nas pequenas coisas. Apresentai a Jesus o pedido que hoje vos confio, e, se for da vontade de Deus, mandai-me uma rosa. Amém.',
    },
  },

  'padre-pio': {
    iconografia: {
      introducao:
        'Nas imagens e fotografias, Padre Pio aparece quase sempre com:',
      itens: [
        {
          simbolo: 'Hábito capuchinho marrom',
          significado:
            'Com capuz pontudo e cordão branco, como os frades capuchinhos.',
        },
        {
          simbolo: 'Barba',
          significado:
            'Os capuchinhos usavam barba como sinal de pobreza e penitência.',
        },
        {
          simbolo: 'Meias-luvas',
          significado:
            'Escondiam as chagas das mãos. Ele só as tirava para celebrar a Missa.',
        },
        {
          simbolo: 'Terço na mão',
          significado:
            'Rezava muitos terços por dia e o chamava de arma para os tempos difíceis.',
        },
      ],
    },
    escritos: {
      introducao:
        'Padre Pio não escreveu livros. O que temos dele são cartas e frases guardadas por quem o ouviu:',
      obras: [
        {
          titulo: 'Epistolário',
          texto:
            'As cartas aos seus diretores espirituais e aos filhos espirituais, reunidas em quatro volumes.',
        },
      ],
      frases: [
        {
          texto:
            'Reze, espere e não se preocupe. A preocupação é inútil. Deus é misericordioso e ouvirá a sua oração.',
          fonte: 'Conselho repetido em cartas e conversas',
        },
        {
          texto:
            'A oração é a melhor arma que temos; é a chave que abre o coração de Deus.',
          fonte: 'Frase guardada pelos seus filhos espirituais',
        },
      ],
    },
    milagres: {
      introducao:
        'Para a beatificação e a canonização, a Igreja reconheceu duas curas sem explicação médica:',
      itens: [
        {
          titulo: 'Beatificação, 1999',
          texto:
            'A cura de Consiglia de Martino, de Salerno, em 1995, depois de rezar pedindo a intercessão de Padre Pio.',
        },
        {
          titulo: 'Canonização, 2002',
          texto:
            'A cura de Matteo Pio Colella, um menino de 7 anos de San Giovanni Rotondo, que estava em coma por meningite em 2000.',
        },
      ],
    },
    lugares: [
      {
        nome: 'Santuário de São Pio',
        cidade: 'San Giovanni Rotondo, Itália',
        texto:
          'O convento onde viveu 52 anos. A nova igreja, de 2004, foi projetada por Renzo Piano, e o corpo do santo está na cripta.',
      },
      {
        nome: 'Casa Alívio do Sofrimento',
        cidade: 'San Giovanni Rotondo, Itália',
        texto: 'O hospital que ele fundou em 1956 e que funciona até hoje.',
      },
      {
        nome: 'Casa natal',
        cidade: 'Pietrelcina, Itália',
        texto: 'A casa simples onde nasceu, numa cidadezinha do sul da Itália.',
      },
    ],
    leituras: [
      {
        titulo: 'Epistolário',
        autor: 'São Pio de Pietrelcina',
        texto:
          'As cartas em que ele acompanha almas, fala da cruz e da confiança.',
      },
    ],
    novena: {
      quando:
        'Costuma ser rezada de 14 a 22 de setembro. Padre Pio mesmo rezava todos os dias uma novena ao Sagrado Coração pelos que pediam suas orações.',
      dias: [
        {
          tema: 'A oração',
          reflexao:
            '"A chave que abre o coração de Deus." Reservo um tempo de oração sem pressa.',
        },
        {
          tema: 'A confissão',
          reflexao:
            'Ele passava horas no confessionário. Há quanto tempo não me confesso?',
        },
        {
          tema: 'A Missa',
          reflexao:
            'Celebrava a Missa como quem está no Calvário. Como participo da Missa?',
        },
        {
          tema: 'O sofrimento unido a Cristo',
          reflexao:
            'Carregou as chagas por 50 anos sem reclamar. Ofereço a Deus o que me pesa.',
        },
        {
          tema: 'A obediência',
          reflexao:
            'Quando foi proibido de celebrar em público, obedeceu em silêncio. Onde preciso ceder?',
        },
        {
          tema: 'Os doentes',
          reflexao:
            'Construiu um hospital para tratar o doente como a Cristo. Rezo por um doente que conheço.',
        },
        {
          tema: 'O anjo da guarda',
          reflexao:
            '"Mande-me o seu anjo da guarda." Agradeço ao meu anjo e peço a sua proteção.',
        },
        {
          tema: 'Nossa Senhora',
          reflexao:
            'Rezava o terço o dia inteiro. Hoje rezo pelo menos uma dezena com calma.',
        },
        {
          tema: 'A confiança',
          reflexao:
            '"Reze, espere e não se preocupe." Entrego a Deus a minha maior preocupação.',
        },
      ],
      oracao:
        'São Pio de Pietrelcina, que carregastes no corpo as chagas de Cristo e passastes a vida no confessionário e na oração, ensinai-me a rezar, a esperar e a não me preocupar. Intercedei junto de Jesus pelo pedido que hoje vos confio. Amém.',
    },
  },

  'nossa-senhora': {
    iconografia: {
      introducao:
        'Cada detalhe das imagens de Maria tem um sentido, quase sempre tirado da Bíblia:',
      itens: [
        {
          simbolo: 'Manto azul',
          significado:
            'O céu e a realeza. Ela é a Rainha que cobre os filhos com o seu manto.',
        },
        {
          simbolo: 'Coroa de doze estrelas',
          significado:
            'A mulher vestida de sol do Apocalipse (Ap 12,1), e as doze tribos e os doze apóstolos.',
        },
        {
          simbolo: 'Lua e serpente sob os pés',
          significado:
            'A vitória sobre o mal anunciada no Gênesis (Gn 3,15) e a mulher do Apocalipse.',
        },
        {
          simbolo: 'Raios saindo das mãos',
          significado:
            'As graças que ela distribui, como na Medalha Milagrosa (1830), a imagem desta página.',
        },
        {
          simbolo: 'Coração com espada ou rosas',
          significado:
            'A profecia de Simeão: "uma espada traspassará a tua alma" (Lc 2,35).',
        },
      ],
    },
    escritos: {
      introducao:
        'Maria fala pouco nos Evangelhos. Estas são as palavras dela que a Bíblia guarda:',
      frases: [
        {
          texto: 'Como acontecerá isso, se eu não conheço homem algum?',
          fonte: 'Lucas 1,34',
        },
        {
          texto:
            'Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra.',
          fonte: 'Lucas 1,38',
        },
        {
          texto:
            'A minha alma engrandece o Senhor, e o meu espírito se alegra em Deus, meu Salvador.',
          fonte: 'Lucas 1,46-47',
        },
        {
          texto:
            'Meu filho, por que agiste assim conosco? Teu pai e eu te procurávamos aflitos.',
          fonte: 'Lucas 2,48',
        },
        { texto: 'Eles não têm mais vinho.', fonte: 'João 2,3' },
        { texto: 'Fazei tudo o que ele vos disser.', fonte: 'João 2,5' },
      ],
    },
    lugares: [
      {
        nome: 'Basílica de Aparecida',
        cidade: 'Aparecida, São Paulo',
        texto:
          'Guarda a imagem encontrada no rio em 1717. É apontada como o maior santuário mariano do mundo.',
      },
      {
        nome: 'Basílica de Guadalupe',
        cidade: 'Cidade do México',
        texto:
          'Onde está exposto o manto de São Juan Diego com a imagem de Maria.',
      },
      {
        nome: 'Santuário de Lourdes',
        cidade: 'Lourdes, França',
        texto:
          'A gruta de Massabielle e a fonte que atrai doentes do mundo inteiro.',
      },
      {
        nome: 'Santuário de Fátima',
        cidade: 'Fátima, Portugal',
        texto: 'A Capelinha das Aparições, no lugar exato da azinheira.',
      },
      {
        nome: 'Basílica da Anunciação',
        cidade: 'Nazaré, Israel',
        texto:
          'Construída sobre a casa onde, segundo a tradição, Maria recebeu o anúncio do anjo.',
      },
    ],
    leituras: [
      {
        titulo: 'Redemptoris Mater',
        autor: 'São João Paulo II, 1987',
        texto: 'Encíclica sobre Maria no caminho da Igreja.',
      },
      {
        titulo: 'Rosarium Virginis Mariae',
        autor: 'São João Paulo II, 2002',
        texto: 'A carta sobre o terço que criou os mistérios luminosos.',
      },
      {
        titulo: 'Marialis Cultus',
        autor: 'São Paulo VI, 1974',
        texto: 'Sobre a devoção a Maria e como vivê-la bem.',
      },
    ],
    novena: {
      quando:
        'A novena de Nossa Senhora Aparecida é rezada de 3 a 11 de outubro, mas cada dia acompanha um momento da vida de Maria.',
      dias: [
        {
          tema: 'O sim da Anunciação',
          reflexao: '"Faça-se em mim." A que Deus está me pedindo um sim?',
        },
        {
          tema: 'A visita a Isabel',
          reflexao:
            'Maria partiu às pressas para ajudar. Quem posso visitar ou ajudar?',
        },
        {
          tema: 'Mãe de Deus em Belém',
          reflexao:
            'Deus nasceu pobre, nos braços de uma mãe. Agradeço pela minha vida.',
        },
        {
          tema: 'A busca no Templo',
          reflexao:
            'Ela procurou Jesus aflita até encontrá-lo. Procuro Jesus quando o perco?',
        },
        {
          tema: 'Caná',
          reflexao:
            '"Eles não têm mais vinho." Conto a Maria o que está faltando na minha casa.',
        },
        {
          tema: 'Aos pés da cruz',
          reflexao: 'Ela ficou até o fim. Peço força para quem está sofrendo.',
        },
        {
          tema: 'Pentecostes',
          reflexao:
            'Maria rezava com os apóstolos. Rezo pela Igreja e pelo meu padre.',
        },
        {
          tema: 'A Assunção',
          reflexao:
            'Ela já está no Céu, onde queremos chegar. Peço a graça da perseverança.',
        },
        {
          tema: 'Aparecida, Mãe do Brasil',
          reflexao:
            'Encontrada por pescadores pobres. Entrego a ela o meu pedido e o meu país.',
        },
      ],
      oracao:
        'Ó Maria, Mãe de Jesus e nossa Mãe, que dissestes "fazei tudo o que ele vos disser", ensinai-me a ouvir o vosso Filho e a confiar nele. Cobri com o vosso manto a minha família e apresentai a Deus o pedido que hoje vos confio. Amém.',
    },
  },
};
