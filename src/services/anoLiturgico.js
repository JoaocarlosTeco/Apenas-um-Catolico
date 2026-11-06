// Calendário litúrgico calculado no próprio navegador, sem API:
// data da Páscoa (cômputo gregoriano), festas móveis, tempo litúrgico de qualquer dia,
// semana, ciclo dominical (A, B, C) e ciclo ferial (I, II).
// Segue as regras do Brasil: Epifania e Ascensão são celebradas no domingo.

const DIA = 24 * 60 * 60 * 1000;

const data = (ano, mes, dia) => new Date(ano, mes - 1, dia);
export const somarDias = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const soDia = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const diasEntre = (a, b) => Math.round((soDia(b) - soDia(a)) / DIA);

/** Domingo de Páscoa pelo algoritmo gregoriano (Meeus/Jones/Butcher) */
export function pascoa(ano) {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return data(ano, mes, dia);
}

/** 1º domingo do Advento: quatro domingos antes do Natal */
export function primeiroDomingoDoAdvento(ano) {
  const natal = data(ano, 12, 25);
  const quartoDomingo = somarDias(
    natal,
    -(natal.getDay() === 0 ? 7 : natal.getDay())
  );
  return somarDias(quartoDomingo, -21);
}

/** Epifania no Brasil: domingo entre 2 e 8 de janeiro */
export function epifania(ano) {
  const dois = data(ano, 1, 2);
  return somarDias(dois, (7 - dois.getDay()) % 7);
}

/** Batismo do Senhor: domingo depois da Epifania, ou segunda-feira se a Epifania cair em 7 ou 8 */
export function batismoDoSenhor(ano) {
  const ep = epifania(ano);
  return ep.getDate() >= 7 ? somarDias(ep, 1) : somarDias(ep, 7);
}

/** Sagrada Família: domingo entre 26 e 31 de dezembro, ou 30/12 se o Natal cair num domingo */
export function sagradaFamilia(ano) {
  const natal = data(ano, 12, 25);
  if (natal.getDay() === 0) return data(ano, 12, 30);
  return somarDias(natal, 7 - natal.getDay());
}

/** Todas as celebrações móveis de um ano civil */
export function datasMoveis(ano) {
  const p = pascoa(ano);
  const advento = primeiroDomingoDoAdvento(ano);
  return {
    batismo: batismoDoSenhor(ano),
    epifania: epifania(ano),
    cinzas: somarDias(p, -46),
    ramos: somarDias(p, -7),
    quintaSanta: somarDias(p, -3),
    sextaSanta: somarDias(p, -2),
    pascoa: p,
    misericordia: somarDias(p, 7),
    ascensao: somarDias(p, 42),
    pentecostes: somarDias(p, 49),
    trindade: somarDias(p, 56),
    corpusChristi: somarDias(p, 60),
    sagradoCoracao: somarDias(p, 68),
    imaculadoCoracao: somarDias(p, 69),
    cristoRei: somarDias(advento, -7),
    advento,
    sagradaFamilia: sagradaFamilia(ano),
  };
}

export const TEMPOS = {
  advento: {
    nome: 'Advento',
    cor: 'roxo',
    hex: '#6B3FA0',
    texto:
      'Quatro semanas de espera pelo Natal e pela vinda de Cristo no fim dos tempos. A coroa do Advento ganha uma vela acesa a cada domingo.',
  },
  natal: {
    nome: 'Tempo do Natal',
    cor: 'branco',
    hex: '#C9A54C',
    texto:
      'Celebra o nascimento de Jesus e as primeiras manifestações dele ao mundo: aos pastores, aos magos na Epifania e no Batismo no Jordão.',
  },
  comum: {
    nome: 'Tempo Comum',
    cor: 'verde',
    hex: '#2E7D4F',
    texto:
      'O tempo mais longo do ano. As leituras acompanham a vida pública de Jesus e o crescimento da fé no dia a dia. O verde lembra a esperança.',
  },
  quaresma: {
    nome: 'Quaresma',
    cor: 'roxo',
    hex: '#6B3FA0',
    texto:
      'Quarenta dias de oração, jejum e caridade, da Quarta-feira de Cinzas à Semana Santa, em preparação para a Páscoa.',
  },
  triduo: {
    nome: 'Tríduo Pascal',
    cor: 'vermelho',
    hex: '#B3261E',
    texto:
      'Da Missa da Ceia do Senhor, na Quinta-feira Santa, à Vigília Pascal: a paixão, morte e ressurreição de Jesus, o centro de todo o ano.',
  },
  pascoa: {
    nome: 'Tempo Pascal',
    cor: 'branco',
    hex: '#C9A54C',
    texto:
      'Cinquenta dias de alegria pela Ressurreição, que vão do Domingo de Páscoa até Pentecostes, quando a Igreja celebra a vinda do Espírito Santo.',
  },
};

/** Ano civil em que termina o ano litúrgico que contém a data (o ano começa no Advento anterior) */
function anoLiturgicoDe(d) {
  const ano = d.getFullYear();
  return soDia(d) >= primeiroDomingoDoAdvento(ano) ? ano + 1 : ano;
}

/**
 * Onde a data cai no ano litúrgico.
 * @returns {{ tempo: string, semana: number|null, ciclo: 'A'|'B'|'C', ferial: 'I'|'II', anoLiturgico: number }}
 */
export function tempoLiturgico(dia = new Date()) {
  const d = soDia(dia);
  const ano = d.getFullYear();
  const m = datasMoveis(ano);
  const anoLiturgico = anoLiturgicoDe(d);
  const ciclo = ['C', 'A', 'B'][anoLiturgico % 3];
  const ferial = anoLiturgico % 2 === 0 ? 'II' : 'I';
  const semanaDesde = inicio => Math.floor(diasEntre(inicio, d) / 7) + 1;
  const base = { ciclo, ferial, anoLiturgico };

  if (d >= m.advento) {
    if (d < data(ano, 12, 25))
      return { ...base, tempo: 'advento', semana: semanaDesde(m.advento) };
    return { ...base, tempo: 'natal', semana: null };
  }
  if (d <= m.batismo) return { ...base, tempo: 'natal', semana: null };
  if (d < m.cinzas) {
    // a semana 1 começa depois do Batismo; o domingo seguinte já é o 2º domingo
    const ancora = m.batismo.getDay() === 0 ? m.batismo : m.epifania;
    return { ...base, tempo: 'comum', semana: semanaDesde(ancora) };
  }
  if (d < m.quintaSanta) {
    const primeiroDomingo = somarDias(m.cinzas, 4);
    return {
      ...base,
      tempo: 'quaresma',
      semana: d < primeiroDomingo ? 0 : semanaDesde(primeiroDomingo),
    };
  }
  if (d < m.pascoa) return { ...base, tempo: 'triduo', semana: null };
  if (d <= m.pentecostes)
    return { ...base, tempo: 'pascoa', semana: semanaDesde(m.pascoa) };
  // depois de Pentecostes, a contagem vem de trás: a semana de Cristo Rei é a 34ª
  const domingoDaSemana = somarDias(d, -d.getDay());
  return {
    ...base,
    tempo: 'comum',
    semana: 34 - Math.round(diasEntre(domingoDaSemana, m.cristoRei) / 7),
  };
}

/** Os tempos do ano litúrgico que contém a data, com início, fim e duração em dias (para a roda) */
export function segmentosDoAno(dia = new Date()) {
  const fim = anoLiturgicoDe(soDia(dia));
  const anterior = datasMoveis(fim - 1);
  const atual = datasMoveis(fim);
  const trechos = [
    ['advento', anterior.advento, data(fim - 1, 12, 24)],
    ['natal', data(fim - 1, 12, 25), atual.batismo],
    ['comum', somarDias(atual.batismo, 1), somarDias(atual.cinzas, -1)],
    ['quaresma', atual.cinzas, somarDias(atual.quintaSanta, -1)],
    ['triduo', atual.quintaSanta, somarDias(atual.pascoa, -1)],
    ['pascoa', atual.pascoa, atual.pentecostes],
    ['comum', somarDias(atual.pentecostes, 1), somarDias(atual.advento, -1)],
  ];
  return trechos.map(([tempo, inicio, termino]) => ({
    tempo,
    inicio,
    fim: termino,
    dias: diasEntre(inicio, termino) + 1,
  }));
}

const SOLENIDADES_FIXAS = [
  [1, 1, 'Santa Maria, Mãe de Deus'],
  [3, 19, 'São José'],
  [3, 25, 'Anunciação do Senhor'],
  [6, 24, 'Natividade de São João Batista'],
  [6, 29, 'São Pedro e São Paulo'],
  [8, 15, 'Assunção de Nossa Senhora'],
  [10, 12, 'Nossa Senhora Aparecida'],
  [11, 1, 'Todos os Santos'],
  [11, 2, 'Fiéis Defuntos'],
  [12, 8, 'Imaculada Conceição'],
  [12, 25, 'Natal do Senhor'],
];

/** As próximas grandes celebrações a partir de hoje, já com a data deste ano */
export function proximasCelebracoes(dia = new Date(), quantidade = 6) {
  const hoje = soDia(dia);
  const lista = [];
  [hoje.getFullYear(), hoje.getFullYear() + 1].forEach(ano => {
    const m = datasMoveis(ano);
    lista.push(
      { nome: 'Epifania do Senhor', data: m.epifania },
      { nome: 'Batismo do Senhor', data: m.batismo },
      { nome: 'Quarta-feira de Cinzas', data: m.cinzas },
      { nome: 'Domingo de Ramos', data: m.ramos },
      { nome: 'Sexta-feira da Paixão', data: m.sextaSanta },
      { nome: 'Domingo de Páscoa', data: m.pascoa },
      { nome: 'Domingo da Divina Misericórdia', data: m.misericordia },
      { nome: 'Ascensão do Senhor', data: m.ascensao },
      { nome: 'Pentecostes', data: m.pentecostes },
      { nome: 'Santíssima Trindade', data: m.trindade },
      { nome: 'Corpus Christi', data: m.corpusChristi },
      { nome: 'Sagrado Coração de Jesus', data: m.sagradoCoracao },
      { nome: 'Cristo Rei', data: m.cristoRei },
      { nome: '1º Domingo do Advento', data: m.advento },
      { nome: 'Sagrada Família', data: m.sagradaFamilia },
      ...SOLENIDADES_FIXAS.map(([mes, d, nome]) => ({
        nome,
        data: data(ano, mes, d),
      }))
    );
  });
  return lista
    .filter(item => item.data >= hoje)
    .sort((a, b) => a.data - b.data)
    .slice(0, quantidade)
    .map(item => ({ ...item, faltam: diasEntre(hoje, item.data) }));
}

/** Data de uma celebração móvel pelo nome usado no calendário do site (ou null) */
export function dataMovelPorNome(nome, ano) {
  const m = datasMoveis(ano);
  const mapa = {
    'Domingo de Ramos': m.ramos,
    'Tríduo Pascal': m.quintaSanta,
    'Páscoa da Ressurreição': m.pascoa,
    'Ascensão do Senhor': m.ascensao,
    Pentecostes: m.pentecostes,
    'Santíssima Trindade': m.trindade,
    'Corpus Christi': m.corpusChristi,
    'Sagrado Coração de Jesus': m.sagradoCoracao,
    'Imaculado Coração de Maria': m.imaculadoCoracao,
    'Sagrada Família': m.sagradaFamilia,
    'Novena da Divina Misericórdia': m.sextaSanta,
  };
  return mapa[nome] || null;
}
