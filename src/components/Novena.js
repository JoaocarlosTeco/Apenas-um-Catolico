import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PiArrowCounterClockwise, PiCheckBold } from 'react-icons/pi';

// Novena de nove dias. O progresso fica salvo neste aparelho (localStorage),
// para a pessoa voltar no dia seguinte e continuar de onde parou.

const lerFeitos = chave => {
  try {
    const salvo = JSON.parse(window.localStorage.getItem(chave) || '[]');
    return Array.isArray(salvo)
      ? salvo.filter(n => Number.isInteger(n) && n >= 0 && n < 9)
      : [];
  } catch {
    return [];
  }
};

const Caixa = styled.div`
  border-radius: 4px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  @media (min-width: 768px) {
    padding: 28px;
  }
`;

const Quando = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 18px;
`;

const Progresso = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.titleColor};
`;

const Dias = styled.div`
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  gap: 4px;
  margin-bottom: 20px;

  @media (min-width: 480px) {
    gap: 8px;
  }
`;

const Dia = styled.button`
  aspect-ratio: 1;
  width: 100%;
  max-width: 44px;
  justify-self: center;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  border: 2px solid
    ${({ $cor, $aberto, theme }) => ($aberto ? $cor : theme.colors.borderColor)};
  background: ${({ $feito, $cor }) => ($feito ? $cor : 'transparent')};
  color: ${({ $feito, theme }) => ($feito ? '#fff' : theme.colors.text)};
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
`;

const DiaAberto = styled.div`
  small {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ $cor }) => $cor};
    margin-bottom: 4px;
  }

  h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    color: ${({ theme }) => theme.colors.titleColor};
    margin-bottom: 10px;
  }

  > p {
    line-height: 1.7;
    margin-bottom: 14px;
  }

  blockquote {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    line-height: 1.75;
    padding: 14px 16px;
    border-left: 3px solid ${({ $cor }) => $cor};
    background: ${({ theme }) => theme.colors.background};
    margin-bottom: 8px;
  }
`;

const Passos = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 18px;
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
  min-height: 46px;
  padding: 0 20px;
  border-radius: 3px;
  font-weight: 700;
  background: ${({ $cor, $leve }) => ($leve ? 'transparent' : $cor)};
  color: ${({ $leve, theme }) => ($leve ? theme.colors.text : '#fff')};
  border: 1px solid
    ${({ $cor, $leve, theme }) => ($leve ? theme.colors.borderColor : $cor)};
`;

const Novena = ({ slug, novena, cor }) => {
  const chave = `novena:${slug}`;
  const [feitos, setFeitos] = useState(() => lerFeitos(chave));
  const primeiroPendente = [...Array(9).keys()].find(i => !feitos.includes(i));
  const [aberto, setAberto] = useState(primeiroPendente ?? 8);

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(feitos));
    } catch {
      // sem localStorage, o progresso vale só nesta visita
    }
  }, [chave, feitos]);

  const dia = novena.dias[aberto];
  const feito = feitos.includes(aberto);
  const completa = feitos.length === 9;

  const marcar = () => {
    if (feito) {
      setFeitos(feitos.filter(n => n !== aberto));
      return;
    }
    const novos = [...feitos, aberto].sort((a, b) => a - b);
    setFeitos(novos);
    const proximo = [...Array(9).keys()].find(i => !novos.includes(i));
    if (proximo !== undefined) setAberto(proximo);
  };

  return (
    <Caixa>
      <Quando>{novena.quando}</Quando>
      <Progresso>
        <span>
          {completa ? 'Novena concluída' : `${feitos.length} de 9 dias rezados`}
        </span>
        {feitos.length > 0 && (
          <Botao
            type="button"
            $leve
            $cor={cor}
            style={{ minHeight: 34, padding: '0 12px', fontSize: '0.8rem' }}
            onClick={() => setFeitos([])}
          >
            <PiArrowCounterClockwise aria-hidden="true" /> Recomeçar
          </Botao>
        )}
      </Progresso>

      <Dias role="group" aria-label="Dias da novena">
        {novena.dias.map((d, i) => (
          <Dia
            key={d.tema}
            type="button"
            $cor={cor}
            $feito={feitos.includes(i)}
            $aberto={i === aberto}
            aria-pressed={i === aberto}
            aria-label={`Dia ${i + 1}: ${d.tema}${feitos.includes(i) ? ', rezado' : ''}`}
            onClick={() => setAberto(i)}
          >
            {feitos.includes(i) ? <PiCheckBold aria-hidden="true" /> : i + 1}
          </Dia>
        ))}
      </Dias>

      <DiaAberto $cor={cor} aria-live="polite">
        <small>{`${aberto + 1}º dia`}</small>
        <h3>{dia.tema}</h3>
        <p>{dia.reflexao}</p>
        <blockquote>{novena.oracao}</blockquote>
        <Passos>Depois, reze um Pai-Nosso, uma Ave-Maria e um Glória.</Passos>
        <Botoes>
          <Botao type="button" $cor={cor} $leve={feito} onClick={marcar}>
            {feito ? 'Desmarcar este dia' : `Rezei o ${aberto + 1}º dia`}
          </Botao>
        </Botoes>
      </DiaAberto>
    </Caixa>
  );
};

export default Novena;
