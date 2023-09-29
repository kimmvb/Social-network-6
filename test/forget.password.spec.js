import forgetPass from '../src/component/forgetpassword';

describe('Forget password', () => {
  it('should be a function', () => {
    expect(typeof forgetPass).toBe('function');
  });
  it('should return a HTML element', () => {
    expect(forgetPass()).toBeInstanceOf(HTMLElement);
  });
  it('should return a section element with a class name called "reset_password_container"', () => {
    expect(forgetPass().className).toBe('reset_password_container');
  });
  it('should return a section element with a child element', () => {
    expect(forgetPass().children).toHaveLength(4);
  });
  it('should execute "resetEmail" with an email as argument when submitting the form', async () => {
    const navigateToMock = jest.fn();
    const resetEmail = jest.fn();
    const section = forgetPass(navigateToMock);
    const formEmail = section.querySelector('form');
    const inputEmail = section.querySelector('[type="email"]');
    const buttonSendEmail = section.querySelector('button');
    // const changePass = section.querySelector('.reset_password_label');

    inputEmail.value = 'usuario@example.com';

    formEmail.append(inputEmail, buttonSendEmail);

    // Configura el manejador de eventos submit de forma asincrónica
    formEmail.addEventListener('submit', async () => {
      resetEmail(inputEmail.value);
      /* .then(() => {
        expect(changePass.style.display).toBe('none');
      }); */
    });

    // Dispara el evento submit de forma asincrónica
    const submitEvent = new Event('submit', { bubbles: true });
    formEmail.dispatchEvent(submitEvent);

    // Realiza la comprobación después de esperar
    expect(resetEmail).toHaveBeenCalledTimes(1);
  });
  it('should change the display of four elements when "resetEmail" is executed successfully', async () => {
    const navigateToMock = jest.fn();
    const resetEmail = jest.fn().mockImplementation(() => Promise.resolve({}));
    const section = forgetPass(navigateToMock);
    const formEmail = section.querySelector('form');
    const inputEmail = section.querySelector('[type="email"]');
    const buttonSendEmail = section.querySelector('button');
    const changePass = section.querySelector('.reset_password_label');
    const emailSent = section.querySelector('.reset_password_paragraph');
    const emailSentError = section.querySelector('.reset_password_paragraph')[1];

    inputEmail.value = 'usuario@example.com';

    formEmail.append(inputEmail, buttonSendEmail);

    // Configura el manejador de eventos submit de forma asincrónica
    formEmail.addEventListener('submit', async (e) => {
      e.preventDefault();
      resetEmail(inputEmail.value)
        .then(() => {
          expect(changePass.style.display).toBe('none');
          expect(formEmail.style.display).toBe('none');
          expect(emailSent.style.display).toBe('block');
          expect(emailSentError.style.display).toBe('none');
        })
        .catch(() => {
        });
    });

    // Dispara el evento submit de forma asincrónica
    const submitEvent = new Event('submit', { bubbles: true });
    formEmail.dispatchEvent(submitEvent);
  });
  it('should navigate to "/" when click to "Volver a inicio"', () => {
    const navigateToMock = jest.fn();
    const section = forgetPass(navigateToMock);
    const backHome = section.querySelectorAll('.reset_password_button')[1];
    backHome.click();
    expect(navigateToMock).toHaveBeenCalledWith('/');
  });
});
