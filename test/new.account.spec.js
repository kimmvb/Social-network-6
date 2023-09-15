import newAccount from '../src/component/newaccount';

describe('Create new account', () => {
  it('should be a function', () => {
    expect(typeof newAccount).toBe('function');
  });
  it('should return a HTML element', () => {
    expect(newAccount()).toBeInstanceOf(HTMLElement);
  });
  it('should return a section element with a class name called "container_account"', () => {
    expect(newAccount().className).toBe('container_account');
  });
  it('should navigate to "/" when click "Inicia sesión"', () => {
    const navigateTo = jest.fn();
    const section = newAccount(navigateTo);
    const singIn = section.querySelector('a');
    singIn.click();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
  it('should execute "createAccount" with username, email, and password as arguments when click "Crear cuenta"', () => {
    const alert = window.alert;
    window.alert = () => {};
    const navigateTo = jest.fn();
    const section = newAccount(navigateTo);
    const btnAccount = section.querySelector('.btn_crear_cuenta');
    const createAccount = jest.fn();
    btnAccount.addEventListener('click', () => {
      createAccount('userName', 'usuario@example.com', 'Pass1234');
    });
    btnAccount.click();
    expect(createAccount).toHaveBeenCalledWith('userName', 'usuario@example.com', 'Pass1234');
    window.alert = alert;
  });
  it('should show an error alert due to invalid email', () => {
    const alert = window.alert;
    window.alert = () => {};
    const createAccount = jest.fn();
    const navigateTo = jest.fn();
    const section = newAccount(navigateTo);
    const inputEmail = section.querySelector('[type="email"]');
    const inputUserName = section.querySelector('[type="text"]');
    const inputPass = section.querySelector('[type="password"]');
    const inputRepeatPass = section.querySelectorAll('[type="password"]')[1];
    const btnAccount = section.querySelector('.btn_crear_cuenta');

    const alertSpy = jest.spyOn(window, 'alert');

    inputEmail.value = 'usuario@example'; // Correo inválido
    inputUserName.value = 'user123';
    inputPass.value = 'Pass123456';
    inputRepeatPass.value = 'Pass123456';

    btnAccount.click();

    expect(createAccount).not.toHaveBeenCalled();

    expect(navigateTo).not.toHaveBeenCalled();

    expect(alertSpy).toHaveBeenCalledTimes(1);

    alertSpy.mockRestore();
    window.alert = alert;
  });
  it('should show an error alert due to invalid username', () => {
    const alert = window.alert;
    window.alert = () => {};
    const createAccount = jest.fn();
    const navigateTo = jest.fn();
    const section = newAccount(navigateTo);
    const inputEmail = section.querySelector('[type="email"]');
    const inputUserName = section.querySelector('[type="text"]');
    const inputPass = section.querySelector('[type="password"]');
    const inputRepeatPass = section.querySelectorAll('[type="password"]')[1];
    const btnAccount = section.querySelector('.btn_crear_cuenta');

    const alertSpy = jest.spyOn(window, 'alert');

    inputEmail.value = 'usuario@example.com';
    inputUserName.value = 'u'; // Username inválido
    inputPass.value = 'Pass123456';
    inputRepeatPass.value = 'Pass123456';

    btnAccount.click();

    expect(createAccount).not.toHaveBeenCalled();

    expect(navigateTo).not.toHaveBeenCalled();

    expect(alertSpy).toHaveBeenCalledTimes(1);

    alertSpy.mockRestore();
    window.alert = alert;
  });
  it('should show an error alert due to invalid password', () => {
    const alert = window.alert;
    window.alert = () => {};
    const createAccount = jest.fn();
    const navigateTo = jest.fn();
    const section = newAccount(navigateTo);
    const inputEmail = section.querySelector('[type="email"]');
    const inputUserName = section.querySelector('[type="text"]');
    const inputPass = section.querySelector('[type="password"]');
    const inputRepeatPass = section.querySelectorAll('[type="password"]')[1];
    const btnAccount = section.querySelector('.btn_crear_cuenta');

    const alertSpy = jest.spyOn(window, 'alert');

    inputEmail.value = 'usuario@example.com';
    inputUserName.value = 'user123';
    inputPass.value = 'pass'; // Contraseña inválida
    inputRepeatPass.value = 'pass';

    btnAccount.click();

    expect(createAccount).not.toHaveBeenCalled();

    expect(navigateTo).not.toHaveBeenCalled();

    expect(alertSpy).toHaveBeenCalledTimes(1);

    alertSpy.mockRestore();
    window.alert = alert;
  });
  it('should show an error alert due to invalid repeated password', () => {
    const alert = window.alert;
    window.alert = () => {};
    const createAccount = jest.fn();
    const navigateTo = jest.fn();
    const section = newAccount(navigateTo);
    const inputEmail = section.querySelector('[type="email"]');
    const inputUserName = section.querySelector('[type="text"]');
    const inputPass = section.querySelector('[type="password"]');
    const inputRepeatPass = section.querySelectorAll('[type="password"]')[1];
    const btnAccount = section.querySelector('.btn_crear_cuenta');

    const alertSpy = jest.spyOn(window, 'alert');

    // Simula valores inválidos en los campos de entrada
    inputEmail.value = 'usuario@example.com';
    inputUserName.value = 'user123';
    inputPass.value = 'Pass12345';
    inputRepeatPass.value = 'Pass123456'; // Contraseña diferente

    // Dispara un evento clic en el botón
    btnAccount.click();

    // Verificar que no se llamó a `createAccount`
    expect(createAccount).not.toHaveBeenCalled();

    // Verificar que `navigateTo` no se llamó
    expect(navigateTo).not.toHaveBeenCalled();

    // Verificar que se mostraron alertas de error
    expect(alertSpy).toHaveBeenCalledTimes(1);

    // Limpia el espía
    alertSpy.mockRestore();
    window.alert = alert;
  });
});
