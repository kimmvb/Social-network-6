import styles from "./../css/home.module.css";
import iconLogo from "./../asset/icons/logo.svg";
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

  const buttonGoogle = document.createElement("button");
  buttonGoogle.className = styles.button_google;
  

  const buttonLogin = document.createElement("button");
  buttonLogin.className = styles.button_login;

  const forgetPass = document.createElement("p");

  const newAccount = document.createElement("button");
  newAccount.className = styles.crear_cuenta;

  logo.src = iconLogo;

  buttonLogin.textContent = "Iniciar Sesión";
  buttonLogin.addEventListener("click", () => {
    navigateTo("/login");
  });

  labelEmail.textContent = "Nombre de usuario o correo";
  labelPass.textContent = "Contraseña";

  buttonGoogle.textContent = "Continuar con Google";
  buttonGoogle.addEventListener('click', () => {
    userSignin()
      .then((user) => {
        navigateTo('/login', user);
      })
      .catch((error) => {
        errorGoogle.style.display = 'block', error;
      });
  });
  
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
    buttonGoogle,
    forgetPass,
    newAccount
  );
  sectionHome.append(logo, errorGoogle, formContainer);

  return sectionHome;

}

export default home;
