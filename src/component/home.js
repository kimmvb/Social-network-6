import styles from "./../css/home.module.css";
import iconLogo from "./../asset/icons/Logo.tripify.svg";
import iconLinea from "../asset/icons/linea.icon.svg";
import { saveUserSession } from ".//../lib/index";
import { userSignin } from "../lib/firebase";

function home(navigateTo) {
  const sectionHome = document.createElement("section");
  sectionHome.className = styles.contenedor_home;

  const logo = document.createElement("img");
  logo.className = styles.img_logo;
  
  const errorGoogle = document.createElement('p');
  
  const formGrilla = document.createElement("form");
  formGrilla.className = styles.grilla_form;
  

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
  
  buttonGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const user = await userSignin();
      saveUserSession(user);
      navigateTo('/feed');
    } catch (error) {
      console.log(error);
    }
  });
  
  forgetPass.textContent = "¿Olvidaste tu contraseña?";

  newAccount.textContent = "Crear nueva cuenta";
  newAccount.addEventListener("click", () => {
    navigateTo("/new_account");
  });

  formGrilla.append(
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
  sectionHome.append(logo, errorGoogle, formGrilla);

  return sectionHome;

}

export default home;
