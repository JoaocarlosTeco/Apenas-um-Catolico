import {
  batismoDoSenhor,
  datasMoveis,
  pascoa,
  primeiroDomingoDoAdvento,
  proximasCelebracoes,
  sagradaFamilia,
  segmentosDoAno,
  tempoLiturgico,
} from '../anoLiturgico';

const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dia = (texto) => {
  const [a, m, d] = texto.split('-').map(Number);
  return new Date(a, m - 1, d);
};

describe('data da Páscoa', () => {
  it.each([
    [2019, '2019-04-21'],
    [2024, '2024-03-31'],
    [2025, '2025-04-20'],
    [2026, '2026-04-05'],
    [2027, '2027-03-28'],
    [2030, '2030-04-21'],
  ])('%i cai em %s', (ano, esperado) => {
    expect(iso(pascoa(ano))).toBe(esperado);
  });
});

describe('festas móveis de 2026', () => {
  const m = datasMoveis(2026);
  it('Cinzas, Pentecostes e Corpus Christi', () => {
    expect(iso(m.cinzas)).toBe('2026-02-18');
    expect(iso(m.pentecostes)).toBe('2026-05-24');
    expect(iso(m.corpusChristi)).toBe('2026-06-04');
  });
  it('Ascensão no domingo, como no Brasil', () => {
    expect(iso(m.ascensao)).toBe('2026-05-17');
  });
  it('Advento e Cristo Rei', () => {
    expect(iso(primeiroDomingoDoAdvento(2026))).toBe('2026-11-29');
    expect(iso(primeiroDomingoDoAdvento(2025))).toBe('2025-11-30');
    expect(iso(m.cristoRei)).toBe('2026-11-22');
  });
  it('Batismo do Senhor e Sagrada Família', () => {
    expect(iso(batismoDoSenhor(2026))).toBe('2026-01-11');
    // Epifania em 7/1/2024 (domingo): o Batismo passa para a segunda-feira
    expect(iso(batismoDoSenhor(2024))).toBe('2024-01-08');
    expect(iso(sagradaFamilia(2026))).toBe('2026-12-27');
    // Natal num domingo: Sagrada Família em 30/12
    expect(iso(sagradaFamilia(2022))).toBe('2022-12-30');
  });
});

describe('tempo litúrgico de um dia', () => {
  it('5/11/2026: 31ª semana do Tempo Comum, ano A, ciclo II', () => {
    expect(tempoLiturgico(dia('2026-11-05'))).toMatchObject({ tempo: 'comum', semana: 31, ciclo: 'A', ferial: 'II' });
  });
  it('1/12/2026 já é Advento do ano B, ciclo I', () => {
    expect(tempoLiturgico(dia('2026-12-01'))).toMatchObject({ tempo: 'advento', semana: 1, ciclo: 'B', ferial: 'I' });
  });
  it('Natal, Quaresma, Tríduo e Páscoa', () => {
    expect(tempoLiturgico(dia('2026-12-26')).tempo).toBe('natal');
    expect(tempoLiturgico(dia('2026-01-05')).tempo).toBe('natal');
    expect(tempoLiturgico(dia('2026-03-01'))).toMatchObject({ tempo: 'quaresma', semana: 2 });
    expect(tempoLiturgico(dia('2026-04-03')).tempo).toBe('triduo');
    expect(tempoLiturgico(dia('2026-04-12'))).toMatchObject({ tempo: 'pascoa', semana: 2 });
  });
  it('Tempo Comum depois do Batismo começa na semana 1', () => {
    expect(tempoLiturgico(dia('2026-01-12'))).toMatchObject({ tempo: 'comum', semana: 1 });
    expect(tempoLiturgico(dia('2026-01-18'))).toMatchObject({ tempo: 'comum', semana: 2 });
  });
});

describe('roda do ano e próximas celebrações', () => {
  it('os tempos somam o ano litúrgico inteiro, sem buracos', () => {
    const trechos = segmentosDoAno(dia('2026-11-05'));
    const total = trechos.reduce((soma, t) => soma + t.dias, 0);
    // de 30/11/2025 a 28/11/2026
    expect(total).toBe(364);
    expect(trechos.map(t => t.tempo)).toEqual(['advento', 'natal', 'comum', 'quaresma', 'triduo', 'pascoa', 'comum']);
  });
  it('lista as próximas datas a partir de hoje', () => {
    const lista = proximasCelebracoes(dia('2026-11-05'), 3);
    expect(lista.map(c => c.nome)).toEqual(['Cristo Rei', '1º Domingo do Advento', 'Imaculada Conceição']);
    expect(lista[0].faltam).toBe(17);
  });
});
