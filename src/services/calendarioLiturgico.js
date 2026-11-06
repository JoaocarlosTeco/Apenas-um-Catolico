// O que a Igreja celebra em cada dia do ano, calculado no navegador.
// Junta o tempo litúrgico (anoLiturgico.js) com as celebrações fixas e móveis
// e escolhe a que prevalece pela tabela de precedência, de forma simplificada:
// o suficiente para a folhinha, sem os casos raros de calendários próprios.
// As regras do Brasil foram conferidas com a API da liturgia diária:
// Epifania e Ascensão no domingo; Pedro e Paulo, Assunção e Todos os Santos passam para o domingo.

import { datasMoveis, somarDias, tempoLiturgico } from './anoLiturgico';
import { FIXAS, NOVENAS } from '../data/calendario';

// Quanto menor, mais forte (segue a ordem da tabela dos dias litúrgicos)
const GRAU = {
  solenidade: 3,
  comemoracao: 3,
  'festa-senhor': 5,
  festa: 7,
  memoria: 10,
  'memoria-facultativa': 12,
};
const FERIA = 13;
// Dias de semana que não cedem lugar às memórias (fim do Advento, oitava do Natal, Quaresma)
const FERIA_PRIVILEGIADA = 8.5;

export const ROTULO_TIPO = {
  solenidade: 'Solenidade',
  comemoracao: 'Comemoração',
  'festa-senhor': 'Festa do Senhor',
  festa: 'Festa',
  memoria: 'Memória',
  'memoria-facultativa': 'Memória facultativa',
};

export const CORES = {
  verde: { nome: 'Verde', hex: '#2E7D4F' },
  roxo: { nome: 'Roxo', hex: '#6B3FA0' },
  branco: { nome: 'Branco', hex: '#C9A54C' },
  vermelho: { nome: 'Vermelho', hex: '#B3261E' },
  rosa: { nome: 'Rosa', hex: '#C2588A' },
};

const DIAS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const doisDigitos = n => String(n).padStart(2, '0');
export const chave = d =>
  `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}`;
const mesmoDia = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** O domingo entre duas datas (inclusive) */
const domingoEntre = (inicio, fim) => {
  for (let d = inicio; d <= fim; d = somarDias(d, 1))
    if (d.getDay() === 0) return d;
  return inicio;
};

/** Onde cada solenidade fixa cai neste ano, com as transferências */
function dataDaFixa(item, ano, m) {
  const d = new Date(ano, item.mes - 1, item.dia);
  const ehDomingo = d.getDay() === 0;

  switch (item.id) {
    // no Brasil, no domingo entre 28 de junho e 4 de julho
    case 'pedro-e-paulo':
      return {
        data: domingoEntre(new Date(ano, 5, 28), new Date(ano, 6, 4)),
        nota: 'No Brasil, é celebrada no domingo.',
      };
    // no Brasil, no domingo seguinte a 15 de agosto
    case 'assuncao':
      return {
        data: domingoEntre(d, new Date(ano, 7, 21)),
        nota: 'No Brasil, é celebrada no domingo.',
      };
    // no Brasil, no domingo seguinte a 1º de novembro, a não ser que esse domingo seja o dia de Finados
    case 'todos-os-santos': {
      const domingo = domingoEntre(d, new Date(ano, 10, 7));
      return domingo.getDate() === 2
        ? { data: d }
        : { data: domingo, nota: 'No Brasil, é celebrada no domingo.' };
    }
    // num domingo do Advento passa para a segunda-feira
    case 'imaculada':
      return ehDomingo
        ? {
            data: somarDias(d, 1),
            nota: 'Neste ano cai num domingo do Advento e passa para a segunda-feira.',
          }
        : { data: d };
    case 'sao-jose':
      if (d >= m.ramos && d < m.pascoa)
        return {
          data: somarDias(m.ramos, -1),
          nota: 'Neste ano cai na Semana Santa e é antecipada.',
        };
      return ehDomingo
        ? {
            data: somarDias(d, 1),
            nota: 'Neste ano cai num domingo da Quaresma e passa para a segunda-feira.',
          }
        : { data: d };
    case 'anunciacao':
      if (d >= m.ramos && d <= m.misericordia)
        return {
          data: somarDias(m.misericordia, 1),
          nota: 'Neste ano cai na Semana Santa ou na oitava da Páscoa e passa para depois dela.',
        };
      return ehDomingo
        ? {
            data: somarDias(d, 1),
            nota: 'Neste ano cai num domingo da Quaresma e passa para a segunda-feira.',
          }
        : { data: d };
    default:
      return { data: d };
  }
}

const cache = new Map();

/** Todas as celebrações (fixas e móveis) de um ano civil, por chave "AAAA-MM-DD" */
export function celebracoesDoAno(ano) {
  if (cache.has(ano)) return cache.get(ano);
  const m = datasMoveis(ano);
  const porDia = new Map();
  const incluir = (data, celebracao) => {
    const k = chave(data);
    if (!porDia.has(k)) porDia.set(k, []);
    porDia.get(k).push({ grau: GRAU[celebracao.tipo], ...celebracao });
  };

  FIXAS.forEach(item => {
    const { data, nota } = dataDaFixa(item, ano, m);
    incluir(data, { ...item, nota });
  });

  // móveis que não são dias do próprio tempo
  incluir(m.epifania, {
    nome: 'Epifania do Senhor',
    tipo: 'solenidade',
    cor: 'branco',
    grau: 2,
    nota: 'No Brasil, no domingo entre 2 e 8 de janeiro.',
  });
  incluir(m.batismo, {
    nome: 'Batismo do Senhor',
    tipo: 'festa-senhor',
    cor: 'branco',
  });
  incluir(m.trindade, {
    nome: 'Santíssima Trindade',
    tipo: 'solenidade',
    cor: 'branco',
  });
  incluir(m.corpusChristi, {
    nome: 'Santíssimo Corpo e Sangue de Cristo (Corpus Christi)',
    tipo: 'solenidade',
    cor: 'branco',
  });
  incluir(m.sagradoCoracao, {
    nome: 'Sagrado Coração de Jesus',
    tipo: 'solenidade',
    cor: 'branco',
  });
  incluir(m.imaculadoCoracao, {
    nome: 'Imaculado Coração de Maria',
    tipo: 'memoria',
    cor: 'branco',
    mariana: true,
  });
  incluir(somarDias(m.pentecostes, 1), {
    nome: 'Nossa Senhora, Mãe da Igreja',
    tipo: 'memoria',
    cor: 'branco',
    mariana: true,
  });
  incluir(m.cristoRei, {
    nome: 'Nosso Senhor Jesus Cristo, Rei do Universo',
    tipo: 'solenidade',
    cor: 'branco',
  });
  incluir(m.sagradaFamilia, {
    nome: 'Sagrada Família de Jesus, Maria e José',
    tipo: 'festa-senhor',
    cor: 'branco',
  });

  cache.set(ano, porDia);
  return porDia;
}

/** O dia do próprio tempo: nome, força e cor, quando não há celebração por cima */
export function diaDoTempo(d) {
  const t = tempoLiturgico(d);
  const ano = d.getFullYear();
  const m = datasMoveis(ano);
  const semana = d.getDay();
  const domingo = semana === 0;
  const dia = DIAS[semana];
  const base = {
    tempo: t.tempo,
    semana: t.semana,
    ciclo: t.ciclo,
    ferial: t.ferial,
  };

  switch (t.tempo) {
    case 'advento':
      if (domingo)
        return {
          ...base,
          nome: `${t.semana}º Domingo do Advento`,
          grau: 2,
          cor: t.semana === 3 ? 'rosa' : 'roxo',
        };
      if (d.getMonth() === 11 && d.getDate() === 24)
        return {
          ...base,
          nome: 'Véspera do Natal',
          grau: FERIA_PRIVILEGIADA,
          cor: 'roxo',
          nota: 'À noite começa o Natal, com a Missa do Galo.',
        };
      return {
        ...base,
        nome: `${dia} da ${t.semana}ª Semana do Advento`,
        // de 17 a 24 de dezembro as memórias ficam só como lembrança
        grau:
          d.getMonth() === 11 && d.getDate() >= 17 ? FERIA_PRIVILEGIADA : FERIA,
        cor: 'roxo',
      };

    case 'natal': {
      if (d.getMonth() === 11 && d.getDate() > 25)
        return {
          ...base,
          nome: `${d.getDate() - 24}º dia da Oitava do Natal`,
          grau: FERIA_PRIVILEGIADA,
          cor: 'branco',
        };
      if (domingo)
        return {
          ...base,
          nome: 'Domingo do Tempo do Natal',
          grau: 6,
          cor: 'branco',
        };
      const depois = d > m.epifania ? ' depois da Epifania' : '';
      return {
        ...base,
        nome: `${dia} do Tempo do Natal${depois}`,
        grau: FERIA,
        cor: 'branco',
      };
    }

    case 'quaresma': {
      if (mesmoDia(d, m.cinzas))
        return {
          ...base,
          nome: 'Quarta-feira de Cinzas',
          grau: 2,
          cor: 'roxo',
        };
      if (mesmoDia(d, m.ramos))
        return {
          ...base,
          nome: 'Domingo de Ramos e da Paixão do Senhor',
          grau: 2,
          cor: 'vermelho',
        };
      if (d > m.ramos)
        return { ...base, nome: `${dia} Santa`, grau: 2, cor: 'roxo' };
      if (t.semana === 0)
        return {
          ...base,
          nome: `${dia} depois das Cinzas`,
          grau: FERIA_PRIVILEGIADA,
          cor: 'roxo',
        };
      if (domingo)
        return {
          ...base,
          nome: `${t.semana}º Domingo da Quaresma`,
          grau: 2,
          cor: t.semana === 4 ? 'rosa' : 'roxo',
        };
      return {
        ...base,
        nome: `${dia} da ${t.semana}ª Semana da Quaresma`,
        grau: FERIA_PRIVILEGIADA,
        cor: 'roxo',
      };
    }

    case 'triduo':
      if (semana === 4)
        return {
          ...base,
          nome: 'Quinta-feira Santa, Ceia do Senhor',
          grau: 1,
          cor: 'branco',
        };
      if (semana === 5)
        return {
          ...base,
          nome: 'Sexta-feira da Paixão do Senhor',
          grau: 1,
          cor: 'vermelho',
        };
      return {
        ...base,
        nome: 'Sábado Santo e Vigília Pascal',
        grau: 1,
        cor: 'branco',
      };

    case 'pascoa': {
      if (mesmoDia(d, m.pascoa))
        return {
          ...base,
          nome: 'Domingo de Páscoa da Ressurreição do Senhor',
          grau: 1,
          cor: 'branco',
        };
      if (d < m.misericordia)
        return {
          ...base,
          nome: `${dia} da Oitava da Páscoa`,
          grau: 2,
          cor: 'branco',
        };
      if (mesmoDia(d, m.misericordia))
        return {
          ...base,
          nome: '2º Domingo da Páscoa, da Divina Misericórdia',
          grau: 2,
          cor: 'branco',
        };
      if (mesmoDia(d, m.ascensao))
        return {
          ...base,
          nome: 'Ascensão do Senhor',
          grau: 2,
          cor: 'branco',
          tipo: 'solenidade',
        };
      if (mesmoDia(d, m.pentecostes))
        return {
          ...base,
          nome: 'Domingo de Pentecostes',
          grau: 2,
          cor: 'vermelho',
          tipo: 'solenidade',
        };
      if (domingo)
        return {
          ...base,
          nome: `${t.semana}º Domingo da Páscoa`,
          grau: 2,
          cor: 'branco',
        };
      return {
        ...base,
        nome: `${dia} da ${t.semana}ª Semana da Páscoa`,
        grau: FERIA,
        cor: 'branco',
      };
    }

    default:
      if (domingo)
        return {
          ...base,
          nome: `${t.semana}º Domingo do Tempo Comum`,
          grau: 6,
          cor: 'verde',
        };
      return {
        ...base,
        nome: `${dia} da ${t.semana}ª Semana do Tempo Comum`,
        grau: FERIA,
        cor: 'verde',
      };
  }
}

/** Novenas que estão sendo rezadas no dia, com o número do dia (1 a 9) */
export function novenasDoDia(d) {
  const ano = d.getFullYear();
  const m = datasMoveis(ano);
  const lista = [
    ...NOVENAS.map(n => ({ ...n, inicio: new Date(ano, n.mes - 1, n.dia) })),
    { nome: 'Novena da Divina Misericórdia', inicio: m.sextaSanta },
    {
      nome: 'Novena ao Espírito Santo, antes de Pentecostes',
      inicio: somarDias(m.pentecostes, -9),
    },
  ];
  return lista
    .map(n => ({ ...n, numero: Math.round((d - n.inicio) / 86400000) + 1 }))
    .filter(n => n.numero >= 1 && n.numero <= 9);
}

/**
 * Tudo o que se sabe de um dia: o tempo, a celebração que prevalece, a cor e o que mais se lembra nele.
 * @returns {{ data: Date, tempo, semana, ciclo, ferial, titulo, tipo, cor, principal, outras, novenas }}
 */
export function diaLiturgico(d) {
  const proprio = diaDoTempo(d);
  const celebracoes = celebracoesDoAno(d.getFullYear()).get(chave(d)) || [];

  // as memórias facultativas nunca tiram o lugar do dia: ficam como sugestão
  const obrigatorias = celebracoes.filter(
    c => c.tipo !== 'memoria-facultativa'
  );
  const vencedora = obrigatorias.reduce(
    (melhor, c) => (c.grau < melhor.grau ? c : melhor),
    proprio
  );
  const principal = vencedora === proprio ? null : vencedora;

  const outras = celebracoes
    .filter(c => c !== principal)
    .map(c => {
      if (c.tipo === 'memoria-facultativa')
        return { ...c, situacao: 'pode ser celebrada' };
      if (
        c.tipo === 'memoria' &&
        proprio.grau === FERIA_PRIVILEGIADA &&
        !principal
      )
        return { ...c, situacao: 'neste tempo, fica só como lembrança' };
      return {
        ...c,
        situacao: `neste ano cede lugar a ${principal ? principal.nome : proprio.nome}`,
      };
    });

  return {
    data: d,
    tempo: proprio.tempo,
    semana: proprio.semana,
    ciclo: proprio.ciclo,
    ferial: proprio.ferial,
    domingo: d.getDay() === 0,
    titulo: principal ? principal.nome : proprio.nome,
    tipo: principal ? principal.tipo : proprio.tipo || null,
    cor: principal ? principal.cor : proprio.cor,
    principal,
    // o nome do dia no tempo, para mostrar debaixo de uma celebração
    doTempo: proprio.nome,
    outras,
    novenas: novenasDoDia(d),
  };
}

/** As semanas de um mês para a grade, começando no domingo; dias de fora do mês ficam null */
export function semanasDoMes(ano, mes) {
  const primeiro = new Date(ano, mes, 1);
  const dias = new Date(ano, mes + 1, 0).getDate();
  const celulas = [...Array(primeiro.getDay()).fill(null)];
  for (let n = 1; n <= dias; n += 1) celulas.push(new Date(ano, mes, n));
  while (celulas.length % 7) celulas.push(null);
  const semanas = [];
  for (let i = 0; i < celulas.length; i += 7)
    semanas.push(celulas.slice(i, i + 7));
  return semanas;
}
