function login(navigateTo) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const form = document.createElement("form");
  const inputEmail = document.createElement("input");
  const inputPass = document.createElement("input");
  const buttonLogin = document.createElement("button");
  const buttonGoogle = document.createElement("button");
  const forgetPass = document.createElement("p");
  const newAccount = document.createElement("button");

  title.textContent = "Tripify";

  buttonLogin.textContent = "Iniciar Sesión";
  buttonLogin.addEventListener("click", () => {
    navigateTo("/home");
  });
  buttonGoogle.textContent = "Continuar con Google";
  forgetPass.textContent = "¿Olvidaste tu contraseña?";
  newAccount.textContent = "Crear nueva cuenta";

  form.append(inputEmail, inputPass, buttonLogin);
  section.append(title, form, buttonGoogle, forgetPass, newAccount);

  return section;
}

export default login;
