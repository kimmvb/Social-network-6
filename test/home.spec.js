import { fireEvent, getByText } from '@testing-library/dom';
import home from '../src/component/home.js';

describe('Home', () => {
  it('should be a function', () => {
    expect(typeof home).toBe('function');
  });
  it('should return a HTML element', () => {
    expect(home()).toBeInstanceOf(HTMLElement);
  });
  it('should return a section element with a class name called "section_home"', () => {
    expect(home().className).toBe('section_home');
  });
  it('should exist "Iniciar sesión" button', () => {
    const navigateToMock = jest.fn();
    const element = home(navigateToMock);
    const button = getByText(element, 'Iniciar Sesión');
    expect(button).not.toBeNull();
  });
  it('should sign in successfully', () => {
    const element = home();
    const button = getByText(element, 'Iniciar Sesión');
    fireEvent(button, new MouseEvent('click', {}));
  });
  it('should execute "signInWithEmail" with email and password as arguments when click "Iniciar Sesión"', () => {
    const alert = window.alert;
    window.alert = () => {};
    const navigateToMock = jest.fn();
    const element = home(navigateToMock);
    const button = getByText(element, 'Iniciar Sesión');
    const signInWithEmail = jest.fn();
    button.addEventListener('click', () => {
      signInWithEmail('usuario@example.com', 'Pass1234');
    });
    button.click();
    expect(signInWithEmail).toHaveBeenCalledWith('usuario@example.com', 'Pass1234');
    window.alert = alert;
  });
  it('should execute "singInWithGoogle" and navigate to "/feed" when click "Sing in with Google"', () => {
    const navigateToMock = jest.fn();
    const section = home(navigateToMock);
    const buttonGoogle = section.querySelector('.button_google');
    const singInWithGoogle = jest.fn();
    buttonGoogle.addEventListener('click', () => {
      singInWithGoogle();
    });
    buttonGoogle.click();
    expect(singInWithGoogle).toHaveBeenCalledTimes(1);
  });
  it('should navigate to "/new_account" when click "Crear nueva cuenta"', () => {
    const navigateToMock = jest.fn();
    const section = home(navigateToMock);
    const buttonNewAccount = section.querySelector('.btn_crear_cuenta');
    buttonNewAccount.click();
    expect(navigateToMock).toHaveBeenCalledWith('/new_account');
  });
  it('should navigate to "/forget_password" when click "¿Olvidaste tu contraseña?"', () => {
    const navigateToMock = jest.fn();
    const section = home(navigateToMock);
    const forgetPassword = section.querySelector('a');
    forgetPassword.click();
    expect(navigateToMock).toHaveBeenCalledWith('/forget_password');
  });
});
