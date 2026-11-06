// Liturgia diária da Missa.
// Fonte: API pública liturgia-diaria (https://github.com/Dancrf/liturgia-diaria),
// rota v2, que aceita data e traz as leituras alternativas quando existem.

const API = 'https://liturgia.up.railway.app/v2/';
const TEMPO_LIMITE_MS = 10000;
const PREFIXO_CACHE = 'liturgia:';

// Mesma data, mesma resposta: guarda na memória e na sessão do navegador
const memoria = new Map();

const doisDigitos = n => String(n).padStart(2, '0');

/** "2026-11-05" no fuso do usuário (toISOString usaria UTC e erraria à noite). */
export function chaveDaData(data) {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`;
}

export function dataDaChave(chave) {
  const [ano, mes, dia] = chave.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

const lista = valor => (Array.isArray(valor) ? valor : []).filter(item => item && item.texto);

function normalizar(bruto) {
  const leituras = bruto.leituras || {};
  const oracoes = bruto.oracoes || {};
  return {
    titulo: bruto.liturgia || 'Liturgia Diária',
    cor: bruto.cor || '',
    leituras: {
      primeira: lista(leituras.primeiraLeitura),
      salmo: lista(leituras.salmo),
      segunda: lista(leituras.segundaLeitura),
      evangelho: lista(leituras.evangelho),
    },
    oracoes: {
      coleta: oracoes.coleta || '',
      oferendas: oracoes.oferendas || '',
      comunhao: oracoes.comunhao || '',
    },
    antifonas: {
      entrada: bruto.antifonas?.entrada || '',
      comunhao: bruto.antifonas?.comunhao || '',
    },
  };
}

function lerSessao(chave) {
  try {
    const salvo = window.sessionStorage.getItem(PREFIXO_CACHE + chave);
    return salvo ? JSON.parse(salvo) : null;
  } catch {
    return null;
  }
}

function gravarSessao(chave, valor) {
  try {
    window.sessionStorage.setItem(PREFIXO_CACHE + chave, JSON.stringify(valor));
  } catch {
    // sessão cheia ou bloqueada: segue só com a memória
  }
}

/**
 * Busca a liturgia de uma data. Lança erro se a API falhar ou demorar demais.
 * @param {Date} data
 * @param {{ signal?: AbortSignal }} opcoes
 */
export async function buscarLiturgia(data = new Date(), { signal } = {}) {
  const chave = chaveDaData(data);
  if (memoria.has(chave)) return memoria.get(chave);

  const daSessao = lerSessao(chave);
  if (daSessao) {
    memoria.set(chave, daSessao);
    return daSessao;
  }

  const controle = new AbortController();
  const cancelar = () => controle.abort();
  signal?.addEventListener('abort', cancelar);
  const limite = setTimeout(cancelar, TEMPO_LIMITE_MS);

  try {
    const url = `${API}?dia=${doisDigitos(data.getDate())}&mes=${doisDigitos(
      data.getMonth() + 1
    )}&ano=${data.getFullYear()}`;
    const resposta = await fetch(url, { signal: controle.signal });
    if (!resposta.ok) throw new Error(`A API respondeu ${resposta.status}`);
    const liturgia = normalizar(await resposta.json());
    memoria.set(chave, liturgia);
    gravarSessao(chave, liturgia);
    return liturgia;
  } finally {
    clearTimeout(limite);
    signal?.removeEventListener('abort', cancelar);
  }
}

/**
 * Os próximos dias a partir de hoje, numa chamada só (?periodo=N da API).
 * Cada dia também fica guardado no cache, então abrir a liturgia de um deles é instantâneo.
 * @returns {Promise<Array<{ chave: string, data: Date, liturgia: object }>>}
 */
export async function buscarSemana(dias = 7, { signal } = {}) {
  const controle = new AbortController();
  const cancelar = () => controle.abort();
  signal?.addEventListener('abort', cancelar);
  const limite = setTimeout(cancelar, TEMPO_LIMITE_MS);

  try {
    const resposta = await fetch(`${API}?periodo=${dias}`, { signal: controle.signal });
    if (!resposta.ok) throw new Error(`A API respondeu ${resposta.status}`);
    const lista = await resposta.json();
    return (Array.isArray(lista) ? lista : []).map(bruto => {
      const [dia, mes, ano] = String(bruto.data).split('/').map(Number);
      const data = new Date(ano, mes - 1, dia);
      const chave = chaveDaData(data);
      const liturgia = normalizar(bruto);
      memoria.set(chave, liturgia);
      gravarSessao(chave, liturgia);
      return { chave, data, liturgia };
    });
  } finally {
    clearTimeout(limite);
    signal?.removeEventListener('abort', cancelar);
  }
}

// Cores litúrgicas. O branco vira dourado claro para aparecer sobre fundo branco.
const CORES = {
  verde: { nome: 'Verde', hex: '#2E7D4F' },
  roxo: { nome: 'Roxo', hex: '#6B3FA0' },
  branco: { nome: 'Branco', hex: '#C9A54C' },
  vermelho: { nome: 'Vermelho', hex: '#B3261E' },
  rosa: { nome: 'Rosa', hex: '#C2588A' },
  preto: { nome: 'Preto', hex: '#3A3A3A' },
};

export function corLiturgica(nome) {
  const chave = String(nome || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
  return CORES[chave] || { nome: nome || '', hex: '#C09553' };
}

/**
 * A API cola o número do versículo na palavra ("3os verdadeiros").
 * Separa em pedaços para mostrar o número pequeno, sem usar HTML vindo de fora.
 */
export function separarVersiculos(texto) {
  const partes = [];
  const regra = /(\d+)(?=[A-Za-zÀ-ÿ“"‘'«(–—])/g;
  let inicio = 0;
  let achado;
  while ((achado = regra.exec(texto)) !== null) {
    if (achado.index > inicio) partes.push({ versiculo: false, texto: texto.slice(inicio, achado.index) });
    partes.push({ versiculo: true, texto: achado[1] });
    inicio = achado.index + achado[1].length;
  }
  if (inicio < texto.length) partes.push({ versiculo: false, texto: texto.slice(inicio) });
  return partes;
}
