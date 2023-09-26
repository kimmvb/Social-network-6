import { fireEvent, getByText } from '@testing-library/dom';
import { home } from '../src/component/home';

describe('Home', () => {
  it('should be a function', () => {
    expect(typeof home).toBe('function');
  });
  it('should return a Promise', () => {
    expect(home()).toBeInstanceOf(Promise);
  });
  it('should return a section element with a class name called "section_home"', async () => {
    const sectionElement = await home();
    expect(sectionElement.classList.contains('section_home')).toBe(true);
  });
  it('should exist "Iniciar sesión" button', async () => {
    const navigateToMock = jest.fn();
    const element = await home(navigateToMock);
    const button = getByText(element, 'Iniciar Sesión');
    expect(button).not.toBeNull();
  });
  it('should sign in successfully', async () => {
    const element = await home();
    const button = getByText(element, 'Iniciar Sesión');
    fireEvent(button, new MouseEvent('click', {}));
  });
  it('should execute "signInWithEmail" with email and password as arguments when click "Iniciar Sesión"', async () => {
    const alert = window.alert;
    window.alert = () => {};
    const navigateToMock = jest.fn();
    const element = await home(navigateToMock);
    const button = getByText(element, 'Iniciar Sesión');
    const signInWithEmail = jest.fn();
    button.addEventListener('click', () => {
      signInWithEmail('usuario@example.com', 'Pass1234');
    });
    button.click();
    expect(signInWithEmail).toHaveBeenCalledWith('usuario@example.com', 'Pass1234');
    window.alert = alert;
  });
  it('should execute "singInWithGoogle" and navigate to "/feed" when click "Sing in with Google"', async () => {
    const navigateToMock = jest.fn();
    const section = await home(navigateToMock);
    const buttonGoogle = section.querySelector('#button_google');
    const singInWithGoogle = jest.fn();
    buttonGoogle.addEventListener('click', () => {
      singInWithGoogle();
    });
    buttonGoogle.click();
    expect(singInWithGoogle).toHaveBeenCalledTimes(1);
  });
  it('should navigate to "/new_account" when click "Crear nueva cuenta"', async () => {
    const navigateToMock = jest.fn();
    const section = await home(navigateToMock);
    const buttonNewAccount = section.querySelector('.btn_crear_cuenta');
    buttonNewAccount.click();
    expect(navigateToMock).toHaveBeenCalledWith('/new_account');
  });
  it('should navigate to "/forget_password" when click "¿Olvidaste tu contraseña?"', async () => {
    const navigateToMock = jest.fn();
    const section = await home(navigateToMock);
    const forgetPassword = section.querySelector('a');
    forgetPassword.click();
    expect(navigateToMock).toHaveBeenCalledWith('/forget_password');
  });
});
