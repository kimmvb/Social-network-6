import styles from "./../css/new.account.module.css";
import iconLogo from "./../asset/icons/Logo.tripify.svg";
import { userSaveData } from "./../lib/firebase";
import { saveUserSession } from ".//../lib/index";

function newAccount (navigateTo) {
  const sectionAccount= document.createElement('section');
  sectionAccount.className = styles.contenedor_account;

  const logo = document.createElement("img");
  logo.className = styles.img_logo;


  const formGrilla = document.createElement("form");
  formGrilla.className = styles.grilla_form;
 
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  const labelUserName = document.createElement('label');
  const inputUserName = document.createElement('input');
  inputUserName.type = 'text';
  const labelPass = document.createElement('label');
  const inputPass = document.createElement('input');
  inputPass.type = 'password';
  const labelRepeatPass = document.createElement('label');
  const inputRepeatPass = document.createElement('input');
  inputRepeatPass.type = 'password';

  const btnAccount = document.createElement("button");
  btnAccount.className = styles.btn_crear_cuenta;

  const linkLogin = document.createElement('p');
  const singIn = document.createElement('a');

  logo.src = iconLogo;

  labelEmail.textContent = 'Correo electrónico';
  labelUserName.textContent = 'Nombre de usuario'
  labelPass.textContent = 'Contraseña';
  labelRepeatPass.textContent = 'Repetir contraseña';

  btnAccount.textContent = 'Crear Cuenta';

  linkLogin.innerHTML = '¿Ya tienes una cuenta? <br>';
  singIn.innerHTML = ' <br> Inicia sesión';
  singIn.setAttribute("href", "/");

  btnAccount.addEventListener('click', async (e) => {
    e.preventDefault();
    btnAccount.disabled = true;
    if (
      inputEmail.value.trim() !== '' 
      && inputUserName.value.trim() !== '' 
      && inputPass.value.trim() !== '' 
      && inputRepeatPass.value.trim() !== '') {
        const user = await userSaveData(inputUserName.value, inputEmail.value, inputPass.value);
        saveUserSession(user);
        navigateTo('/feed');
      } 
  });

  formGrilla.append(labelEmail, inputEmail, labelUserName, inputUserName, labelPass, inputPass, labelRepeatPass, inputRepeatPass, btnAccount);
  linkLogin.append(singIn)
  sectionAccount.append(logo, formGrilla, linkLogin);

  return sectionAccount;
}


export default newAccount
