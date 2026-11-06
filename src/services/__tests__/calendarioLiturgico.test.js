import {
  diaLiturgico,
  novenasDoDia,
  semanasDoMes,
} from '../calendarioLiturgico';

// Os casos abaixo foram conferidos com a API da liturgia diária (calendário do Brasil)
const dia = texto => {
  const [ano, mes, d] = texto.split('-').map(Number);
  return diaLiturgico(new Date(ano, mes - 1, d));
};

describe('calendário litúrgico do Brasil', () => {
  test.each([
    ['2026-06-28', 'São Pedro e São Paulo', 'vermelho'],
    ['2024-06-30', 'São Pedro e São Paulo', 'vermelho'],
    ['2027-07-04', 'São Pedro e São Paulo', 'vermelho'],
    ['2026-08-16', 'Assunção', 'branco'],
    ['2025-08-17', 'Assunção', 'branco'],
    ['2026-11-01', 'Todos os Santos', 'branco'],
    ['2025-11-01', 'Todos os Santos', 'branco'],
    ['2024-11-03', 'Todos os Santos', 'branco'],
    ['2027-11-07', 'Todos os Santos', 'branco'],
    ['2025-11-02', 'fiéis defuntos', 'roxo'],
    ['2026-11-22', 'Rei do Universo', 'branco'],
    ['2026-11-21', 'Apresentação de Nossa Senhora', 'branco'],
    ['2026-11-09', 'Latrão', 'branco'],
    ['2026-09-14', 'Exaltação da Santa Cruz', 'vermelho'],
    ['2026-12-12', 'Guadalupe', 'branco'],
    ['2026-10-07', 'Rosário', 'branco'],
    ['2026-10-12', 'Aparecida', 'branco'],
    ['2026-01-04', 'Epifania', 'branco'],
    ['2026-01-11', 'Batismo do Senhor', 'branco'],
    ['2027-04-05', 'Anunciação', 'branco'],
    ['2027-03-25', 'Quinta-feira Santa', 'branco'],
    ['2026-05-31', 'Santíssima Trindade', 'branco'],
    ['2026-09-08', 'Natividade de Nossa Senhora', 'branco'],
  ])('%s é %s (%s)', (data, nome, cor) => {
    const d = dia(data);
    expect(d.titulo).toContain(nome);
    expect(d.cor).toBe(cor);
  });

  test.each([
    ['2026-06-29', 'Segunda-feira da 13ª Semana do Tempo Comum'],
    ['2026-08-15', 'Sábado da 19ª Semana do Tempo Comum'],
    ['2024-11-01', 'Sexta-feira da 30ª Semana do Tempo Comum'],
    ['2026-11-06', 'Sexta-feira da 31ª Semana do Tempo Comum'],
  ])('%s fica com o dia do tempo comum', (data, nome) => {
    const d = dia(data);
    expect(d.titulo).toBe(nome);
    expect(d.cor).toBe('verde');
  });

  test('domingos Gaudete e Laetare são rosa', () => {
    expect(dia('2026-12-13').cor).toBe('rosa');
    expect(dia('2026-03-15').cor).toBe('rosa');
  });

  test('a solenidade transferida avisa a regra do Brasil', () => {
    expect(dia('2026-06-28').principal.nota).toMatch(/Brasil/);
  });

  test('memória que cai num domingo cede lugar ao domingo', () => {
    // Santa Cecília em 2026 cai no domingo de Cristo Rei
    const d = dia('2026-11-22');
    expect(d.outras.map(c => c.nome).join()).toContain('Santa Cecília');
  });

  test('memória facultativa não muda a cor do dia', () => {
    const d = dia('2026-05-22'); // Santa Rita, sexta-feira do Tempo Pascal
    expect(d.cor).toBe('branco');
    expect(d.principal).toBeNull();
    expect(d.outras[0].situacao).toBe('pode ser celebrada');
  });

  test('novenas contam o dia', () => {
    const [novena] = novenasDoDia(new Date(2026, 8, 30));
    expect(novena.nome).toMatch(/Teresinha/);
    expect(novena.numero).toBe(9);
  });

  test('a grade do mês começa no domingo e fecha semanas inteiras', () => {
    const semanas = semanasDoMes(2026, 10); // novembro de 2026 começa num domingo
    expect(semanas[0][0].getDate()).toBe(1);
    semanas.forEach(s => expect(s).toHaveLength(7));
  });
});
