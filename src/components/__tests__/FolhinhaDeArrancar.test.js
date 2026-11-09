import React from 'react';
import { fireEvent, render, screen } from '../../test/utils';
import FolhinhaDeArrancar from '../FolhinhaDeArrancar';

const HOJE = new Date(2026, 10, 9);

const montar = () =>
  render(
    <FolhinhaDeArrancar
      hoje={HOJE}
      liturgia={null}
      cor="#2E6B45"
      titulo="Dedicação da Basílica do Latrão"
      fundo="#F6F2EA"
    />
  );

const folha = () => screen.getByRole('button', { name: /arrancar a folha/i });

const deslizar = (el, de, ate) => {
  fireEvent.touchStart(el, { touches: [{ clientX: de[0], clientY: de[1] }] });
  fireEvent.touchEnd(el, { changedTouches: [{ clientX: ate[0], clientY: ate[1] }] });
};

describe('FolhinhaDeArrancar', () => {
  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  it('não troca de dia quando o dedo rola a página por cima da folha', () => {
    montar();
    deslizar(folha(), [200, 600], [210, 300]);
    deslizar(folha(), [200, 300], [190, 650]);
    expect(folha()).toHaveAccessibleName('Arrancar a folha e ver amanhã');
  });

  it('não troca de dia se a página rolou durante o gesto', () => {
    montar();
    const el = folha();
    fireEvent.touchStart(el, { touches: [{ clientX: 320, clientY: 500 }] });
    Object.defineProperty(window, 'scrollY', { value: 240, writable: true, configurable: true });
    fireEvent.touchEnd(el, { changedTouches: [{ clientX: 180, clientY: 520 }] });
    expect(folha()).toHaveAccessibleName('Arrancar a folha e ver amanhã');
  });

  it('arranca a folha quando o dedo desliza para o lado', () => {
    montar();
    deslizar(folha(), [320, 500], [150, 520]);
    expect(folha()).toHaveAccessibleName('Arrancar a folha e ver o dia seguinte');
  });

  it('arranca a folha com um toque', () => {
    montar();
    fireEvent.click(folha());
    expect(folha()).toHaveAccessibleName('Arrancar a folha e ver o dia seguinte');
  });
});
