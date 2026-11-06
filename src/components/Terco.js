import React, { useState } from 'react';
import styled from 'styled-components';
import { PiArrowCounterClockwise, PiArrowRight } from 'react-icons/pi';

// Terço interativo: mostra os mistérios do dia e conta as Ave-Marias de cada dezena.
// Distribuição dos mistérios pela semana como na carta Rosarium Virginis Mariae (2002).

const MISTERIOS = {
  gozosos: {
    nome: 'Gozosos',
    lista: [
      'A Anunciação do anjo a Maria',
      'A visita de Maria a Isabel',
      'O nascimento de Jesus em Belém',
      'A apresentação de Jesus no Templo',
      'Jesus encontrado no Templo',
    ],
  },
  luminosos: {
    nome: 'Luminosos',
    lista: [
      'O Batismo de Jesus no Jordão',
      'As bodas de Caná',
      'O anúncio do Reino de Deus',
      'A Transfiguração',
      'A instituição da Eucaristia',
    ],
  },
  dolorosos: {
    nome: 'Dolorosos',
    lista: [
      'A agonia de Jesus no Horto',
      'A flagelação',
      'A coroação de espinhos',
      'Jesus carrega a cruz',
      'A crucifixão e morte de Jesus',
    ],
  },
  gloriosos: {
    nome: 'Gloriosos',
    lista: [
      'A Ressurreição de Jesus',
      'A Ascensão de Jesus ao Céu',
      'A vinda do Espírito Santo',
      'A Assunção de Maria',
      'A coroação de Maria no Céu',
    ],
  },
};

// domingo = 0
const DO_DIA = [
  'gloriosos',
  'gozosos',
  'dolorosos',
  'gloriosos',
  'luminosos',
  'dolorosos',
  'gozosos',
];
const DIAS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];

const Caixa = styled.div`
  border-radius: 4px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    padding: 28px;
  }
`;

const Grupos = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 20px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Grupo = styled.button`
  flex: 0 0 auto;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid
    ${({ $ativo, $cor, theme }) => ($ativo ? $cor : theme.colors.borderColor)};
  background: ${({ $ativo, $cor }) => ($ativo ? $cor : 'transparent')};
  color: ${({ $ativo, theme }) => ($ativo ? '#fff' : theme.colors.text)};
`;

const Corpo = styled.div`
  display: grid;
  gap: 24px;
  align-items: center;

  @media (min-width: 640px) {
    grid-template-columns: 220px 1fr;
  }
`;

const Anel = styled.svg`
  width: 100%;
  max-width: 220px;
  margin: 0 auto;
  display: block;

  circle {
    transition: fill 0.25s ease;
  }
`;

const Lista = styled.ol`
  list-style: none;
  display: grid;
  gap: 6px;
  margin-bottom: 18px;

  li {
    display: flex;
    gap: 10px;
    align-items: baseline;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  li[data-atual='true'] {
    color: ${({ theme }) => theme.colors.titleColor};
    font-weight: 700;
  }

  li[data-feito='true'] {
    text-decoration: line-through;
    opacity: 0.6;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 18px;
  }
`;

const Orientacao = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 14px;
  min-height: 2.9em;
`;

const Botoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Botao = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 3px;
  font-weight: 700;
  font-size: 1rem;
  background: ${({ $cor, $leve }) => ($leve ? 'transparent' : $cor)};
  color: ${({ $leve, theme }) => ($leve ? theme.colors.text : '#fff')};
  border: 1px solid
    ${({ $cor, $leve, theme }) => ($leve ? theme.colors.borderColor : $cor)};
`;

const Terco = ({ cor, brilho }) => {
  const hoje = new Date().getDay();
  const [grupo, setGrupo] = useState(DO_DIA[hoje]);
  const [misterio, setMisterio] = useState(0);
  const [contas, setContas] = useState(0);
  const terminou = misterio === 5;

  const recomecar = (novoGrupo = grupo) => {
    setGrupo(novoGrupo);
    setMisterio(0);
    setContas(0);
  };

  const rezar = () => {
    if (contas < 10) setContas(contas + 1);
  };

  const proximo = () => {
    setMisterio(misterio + 1);
    setContas(0);
  };

  const dados = MISTERIOS[grupo];
  const contasAnel = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + ((i + 1) / 11) * Math.PI * 2;
    return { x: 110 + Math.cos(a) * 84, y: 110 + Math.sin(a) * 84 };
  });

  let orientacao;
  if (terminou)
    orientacao =
      'Terço concluído. Termine com a Salve-Rainha e entregue suas intenções a Nossa Senhora.';
  else if (contas === 0)
    orientacao = `${misterio + 1}º mistério: ${dados.lista[misterio]}. Reze um Pai-Nosso e comece as Ave-Marias.`;
  else if (contas < 10)
    orientacao = `${dados.lista[misterio]}. Ave-Maria ${contas} de 10.`;
  else
    orientacao =
      'Dezena completa. Reze o Glória ao Pai e siga para o próximo mistério.';

  return (
    <Caixa>
      <Grupos role="group" aria-label="Mistérios">
        {Object.entries(MISTERIOS).map(([id, m]) => (
          <Grupo
            key={id}
            type="button"
            $cor={cor}
            $ativo={id === grupo}
            aria-pressed={id === grupo}
            onClick={() => recomecar(id)}
          >
            {m.nome}
            {id === DO_DIA[hoje] ? ' (hoje)' : ''}
          </Grupo>
        ))}
      </Grupos>

      <Corpo>
        <Anel viewBox="0 0 220 220" aria-hidden="true">
          <circle
            cx="110"
            cy="110"
            r="84"
            fill="none"
            stroke={brilho}
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle
            cx="110"
            cy="26"
            r="11"
            fill={contas > 0 || terminou ? cor : 'transparent'}
            stroke={cor}
            strokeWidth="2.5"
          />
          {contasAnel.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="8.5"
              fill={i < contas || terminou ? cor : 'transparent'}
              stroke={cor}
              strokeWidth="2.5"
            />
          ))}
          <text
            x="110"
            y="104"
            textAnchor="middle"
            fontSize="34"
            fontWeight="700"
            fill={cor}
            fontFamily="'Cormorant Garamond', Georgia, serif"
          >
            {terminou ? '5/5' : `${misterio + 1}º`}
          </text>
          <text
            x="110"
            y="128"
            textAnchor="middle"
            fontSize="13"
            fill={cor}
            fontFamily="Inter, sans-serif"
          >
            {terminou ? 'mistérios' : 'mistério'}
          </text>
          <path
            d="M110 194 V218 M101 203 H119"
            stroke={brilho}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </Anel>

        <div>
          <Lista>
            {dados.lista.map((nome, i) => (
              <li
                key={nome}
                data-atual={i === misterio}
                data-feito={i < misterio}
              >
                <span>{i + 1}º</span>
                {nome}
              </li>
            ))}
          </Lista>
          <Orientacao aria-live="polite">{orientacao}</Orientacao>
          <Botoes>
            {!terminou && contas < 10 && (
              <Botao type="button" $cor={cor} onClick={rezar}>
                Rezei uma Ave-Maria
              </Botao>
            )}
            {!terminou && contas === 10 && (
              <Botao type="button" $cor={cor} onClick={proximo}>
                {misterio === 4 ? 'Concluir o terço' : 'Próximo mistério'}{' '}
                <PiArrowRight aria-hidden="true" />
              </Botao>
            )}
            {(misterio > 0 || contas > 0) && (
              <Botao type="button" $cor={cor} $leve onClick={() => recomecar()}>
                <PiArrowCounterClockwise aria-hidden="true" /> Recomeçar
              </Botao>
            )}
          </Botoes>
        </div>
      </Corpo>
      <Orientacao
        as="small"
        style={{ display: 'block', marginTop: 16, minHeight: 0 }}
      >
        Hoje é {DIAS[hoje]}: a Igreja sugere os mistérios{' '}
        {MISTERIOS[DO_DIA[hoje]].nome.toLowerCase()}.
      </Orientacao>
    </Caixa>
  );
};

export default Terco;
