function login(navigateTo) {
  const section = document.createElement("section");
  const logo = document.createElement("img");
  const form = document.createElement("form");
  const labelEmail = document.createElement("label");
  const inputEmail = document.createElement("input");
  const labelPass = document.createElement("label");
  const inputPass = document.createElement("input");
  const buttonLogout = document.createElement("button");
  const buttonGoogle = document.createElement("button");
  const buttonLogin = document.createElement("button");
  const forgetPass = document.createElement("p");
  const newAccount = document.createElement("button");

  logo.src = "./asset/icons/logo.svg";

  buttonLogin.textContent = "Iniciar Sesión";
  buttonLogin.addEventListener("click", () => {
    navigateTo("/home");
  });
  buttonGoogle.textContent = "Continuar con Google";
  buttonLogout.textContent = "Cerrar Sesíon";
  forgetPass.textContent = "¿Olvidaste tu contraseña?";
  newAccount.textContent = "Crear nueva cuenta";
  labelEmail.textContent = "Nombre de usuario o correo";
  labelPass.textContent = "Contraseña";

  form.append(
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    buttonLogin,
    buttonLogout
  );
  section.append(logo, form, buttonGoogle, forgetPass, newAccount);

  return section;
}

export default login;
