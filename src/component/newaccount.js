function newAccount() {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const form = document.createElement("form");
  const labelEmail = document.createElement("label");
  const inputEmail = document.createElement("input");
  const labelPass = document.createElement("label");
  const inputPass = document.createElement("input");
  const labelRepeatPass = document.createElement("label");
  const inputRepeatPass = document.createElement("input");
  const buttonNewAccount = document.createElement("button");
  const linkLogin = document.createElement("p");
  const singIn = document.createElement("a");

  title.textContent = "Crea tu cuenta";

  labelEmail.textContent = "Nombre de usuario o correo";
  labelPass.textContent = "Contraseña";
  labelRepeatPass.textContent = "Repetir contraseña";

  buttonNewAccount.textContent = "Registrarse";

  linkLogin.textContent = "¿Ya tienes una cuenta";
  singIn.textContent = " Inicia sesión";
  singIn.setAttribute("href", "/");

  form.append(
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    labelRepeatPass,
    inputRepeatPass,
    buttonNewAccount
  );
  linkLogin.append(singIn);

  return section;
}
export default newAccount;
