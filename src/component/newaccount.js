import styles from "./../css/new.account.module.css";
import iconLogo from "./../asset/icons/Logo.tripify.svg";

function newAccount () {
  const sectionAccount= document.createElement('section');
  sectionAccount.className = styles.contenedor;

  const logo = document.createElement("img");
  logo.className = styles.img_logo;

  const formContainer = document.createElement("form");
  formContainer.className = styles.contenedor_form;
 
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const labelUserName = document.createElement('label');
  const inputUserName = document.createElement('input');
  const labelPass = document.createElement('label');
  const inputPass = document.createElement('input');
  const labelRepeatPass = document.createElement('label');
  const inputRepeatPass = document.createElement('input');

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

  formContainer.append(labelEmail, inputEmail, labelUserName, inputUserName, labelPass, inputPass, labelRepeatPass, inputRepeatPass, btnAccount);
  linkLogin.append(singIn)
  sectionAccount.append(logo, formContainer, linkLogin);

  return sectionAccount;
}


export default newAccount