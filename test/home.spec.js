import { fireEvent, getByText } from '@testing-library/dom';
import home from '../src/component/home.js';

it('Existe el botón de iniciar sesión', () => {
  const navigateTo = jest.fn();
  const element = home(navigateTo);
  const button = getByText(element, 'Iniciar Sesión');
  expect(button).not.toBeNull();
});

it('Inicia sesion correctamente', () => {
  const element = home();
  const button = getByText(element, 'Iniciar Sesión');
  fireEvent(button, new MouseEvent('click', {}));
});
