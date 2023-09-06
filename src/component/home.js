import styles from "./../css/home.module.css";
import iconLogo from "./../asset/icons/Logo.tripify.svg";
import iconLinea from "../asset/icons/linea.icon.svg";

import { userSignin } from "../lib/firebase";

function home(navigateTo) {
  const sectionHome = document.createElement("section");
  sectionHome.className = styles.contenedor_home;

  const logo = document.createElement("img");
  logo.className = styles.img_logo;
  
  const errorGoogle = document.createElement('p');
  
  const formContainer = document.createElement("form");
  formContainer.className = styles.contenedor_form;

  const labelEmail = document.createElement("label");
  const inputEmail = document.createElement("input");
  const labelPass = document.createElement("label");
  const inputPass = document.createElement("input");

  const buttonGoogle = document.createElement("input");
  buttonGoogle.className = styles.button_google;
  
  const lineaIcon = document.createElement("img");
  lineaIcon.className = styles.img_linea;

  const buttonLogin = document.createElement("button");
  buttonLogin.className = styles.button_login;

  const forgetPass = document.createElement("p");

  const newAccount = document.createElement("button");
  newAccount.className = styles.btn_crear_cuenta;

  logo.src = iconLogo;
  lineaIcon.src = iconLinea;

  buttonLogin.textContent = "Iniciar Sesión";
  buttonLogin.addEventListener("click", () => {
    navigateTo("/login");
  });

  labelEmail.textContent = "Nombre de usuario o correo";
  labelPass.textContent = "Contraseña";

  errorGoogle.textContent = 'Error al iniciar sesión en Google';
  errorGoogle.style.display = "none";

  
  buttonGoogle.setAttribute('type', 'submit');
  buttonGoogle.setAttribute('value', '');
  buttonGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    userSignin()
      .then((user) => {
       navigateTo('/login', user);
      })
      .catch((error) => {
        //navigateTo('/');
        errorGoogle.style.display = 'block', error;
        console.error('Error', error);
      });
  });
/*buttonGoogle.addEventListener('click', () => {
    userSignInGoogle()
    .then(() => {
      navigateTo('/login');
    }).catch((error) => {
      errorGoogle.style.display = 'block', error;
    })
  }
  )*/
  
  forgetPass.textContent = "¿Olvidaste tu contraseña?";

  newAccount.textContent = "Crear nueva cuenta";
  newAccount.addEventListener("click", () => {
    navigateTo("/new_account");
  });

  formContainer.append(
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    buttonLogin,
    lineaIcon,
    buttonGoogle,
    forgetPass,
    newAccount
  );
  sectionHome.append(logo, errorGoogle, formContainer);

  return sectionHome;

}

export default home;
